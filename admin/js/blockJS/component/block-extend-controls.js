import SuggestionBoard from './suggestion-board'
import DiffMatchPatch from 'diff-match-patch';
const dmp = new DiffMatchPatch();

const { createHigherOrderComponent } = wp.compose;
const { Component } = wp.element;
const { select } = wp.data;
let beforeChangeContent = {};
let currentNewContent = '';
let loadInitialSuggestion = [];
let displayInitialSuggestion = true;
let currentUserRole = suggestionBlock ? suggestionBlock.userRole : '';
let dateFormat = suggestionBlock ? suggestionBlock.dateFormat : 'F j, Y';
let timeFormat = suggestionBlock ? suggestionBlock.timeFormat : 'g:i a';

export default createHigherOrderComponent( ( BlockEdit ) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.handleLoad = this.handleLoad.bind(this);
    }

    componentDidMount() {
      window.addEventListener('load', this.handleLoad);
    }

    handleLoad() {
      const { oldClientId } = this.props.attributes;
      let suggestionHistory = select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_suggestion_history'];
      let commentNode = document.getElementById('md-suggestion-comments');

      if ( null === commentNode ) {
        commentNode = document.createElement('div');
        commentNode.setAttribute('id', 'md-suggestion-comments');
        commentNode.style.display = 'none';
        let wpEditoNode = document.getElementById('md-comments-suggestions-parent');
        wpEditoNode.appendChild(commentNode);
        this.addEvents();
      }

      if ( undefined !== suggestionHistory && 0 < suggestionHistory.length && '' !== oldClientId && displayInitialSuggestion ) {
        let displayHistory = JSON.parse(suggestionHistory);
        if ( undefined !== displayHistory[oldClientId] && -1 === loadInitialSuggestion.indexOf( oldClientId ) ) {
          loadInitialSuggestion.push(oldClientId);
          this.renderAllSuggestion( displayHistory, commentNode );
        }
      }
    }

    componentDidUpdate(prevProps) {
      if ( 'core/paragraph' === this.props.name || 'core/heading' === this.props.name || 'core/list' === this.props.name ) {
        const { attributes, setAttributes, clientId, isSelected } = this.props;
        const { oldClientId } = attributes;
        const postStatus = select('core/editor').getCurrentPost().status;
        let suggestionHistory = select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_suggestion_history'];

        if ( 'publish' !== postStatus && isSelected ) {
          if ( select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_is_suggestion_mode'] ) {
            let editRecord = select('core').getUndoEdit();
            const currentBlockIndex = select( 'core/block-editor' ).getBlockIndex( clientId );
            let finalBlockProps;
            if (editRecord && editRecord.edits && editRecord.edits.blocks && 0 < editRecord.edits.blocks.length ) {
              if ( -1 === currentBlockIndex ) {
                let blockParents = select('core/block-editor').getBlockParents(clientId);
                if ( 0 < blockParents.length ) {
                  for ( let b = 0; b < blockParents.length; b++ ) {
                    if ( 0 === b ) {
                      finalBlockProps = editRecord.edits.blocks[select('core/block-editor').getBlockIndex(blockParents[b])];
                      if ( 1 === blockParents.length ) {
                        finalBlockProps = finalBlockProps.innerBlocks[select('core/block-editor').getBlockIndex(clientId, blockParents[b])];
                      }
                    } else if ( ( b + 1 ) === blockParents.length ) {
                      finalBlockProps = finalBlockProps.innerBlocks ? finalBlockProps.innerBlocks[select('core/block-editor').getBlockIndex(blockParents[b], blockParents[b -1])] :  finalBlockProps.innerBlocks;
                      finalBlockProps = finalBlockProps.innerBlocks[select('core/block-editor').getBlockIndex(clientId, blockParents[b])];
                    } else {
                      finalBlockProps = finalBlockProps.innerBlocks[select('core/block-editor').getBlockIndex(blockParents[b], blockParents[b - 1])];
                    }
                  }
                }
              } else {
                finalBlockProps = editRecord.edits.blocks[currentBlockIndex];
              }
              if ( 'core/paragraph' === finalBlockProps.name || 'core/heading' === finalBlockProps.name || 'core/list' === finalBlockProps.name ) {
                let oldAttrContent = 'core/list' === finalBlockProps.name ? finalBlockProps.attributes.values : finalBlockProps.attributes.content;
                let currentAttrContent = 'core/list' === finalBlockProps.name ? select('core/block-editor').getBlockAttributes(clientId).values : select('core/block-editor').getBlockAttributes(clientId).content;
                if ( '' === currentAttrContent || currentNewContent !== currentAttrContent ) {
                  displayInitialSuggestion = false;
                  if ( 0 === Object.keys(beforeChangeContent).length || undefined === beforeChangeContent[clientId] ) {
                    beforeChangeContent[clientId] = oldAttrContent;
                  } else if ( 'core/list' === finalBlockProps.name && currentAttrContent.match(/<li><\/li>/) ) {
                    beforeChangeContent[clientId] = oldAttrContent;
                  }
                  if ( currentAttrContent !== oldAttrContent ) {
                    const currentUser = select('core').getCurrentUser().id;
                    const userName = select('core').getCurrentUser().name;
                    const userAvtars = select('core').getCurrentUser().avatar_urls;
                    const avtarUrl = userAvtars[Object.keys(userAvtars)[1]];

                    if ( 0 < suggestionHistory.length ) {
                      suggestionHistory = JSON.parse(suggestionHistory);
                    }

                    let insRegPattern = /<(ins|\/ins)/g;
                    let delRegPattern = /<(del|\/del)/g;
                    let patternResult = false;
                    if ( insRegPattern.test( beforeChangeContent[clientId] ) ) {
                      patternResult = true;
                    } else if ( delRegPattern.test( beforeChangeContent[clientId] ) ) {
                      patternResult = true;
                    }

                    let filterContent = currentAttrContent;
                    if ( ! patternResult ) {
                      filterContent = currentAttrContent.replace(/<\/?ins[^>]*>/g,"").replace(/<\/?del[^>]*>/g,"");
                    }

                    let objClientId = oldClientId;

                    if ( '' === oldClientId ) {
                      setAttributes({ oldClientId: clientId });
                      objClientId = clientId;
                    }

                    let diff = dmp.diff_main(beforeChangeContent[clientId], filterContent);

                    if ( 0 < diff.length ) {
                      let tagArray = ['strong', 'em', 'a', 's', 'code', 'span'];
                      let formatName = {'strong': 'bold', 'em': 'italic', 's': 'strikethrough', 'span': 'underline', 'code': 'code', 'a': 'link'};
                      let matchRegex = false;
                      let ignoreCleanUp = false;
                      let isComment = false;

                      if ( '' !== currentAttrContent ) {
                        for ( let v = 0; v < diff.length; v++) {

                          let operation = diff[v][0];
                          let diffText = diff[v][1];

                          if ( DiffMatchPatch.DIFF_INSERT === operation ) {
                            let nextDiffText = diff[v+1] ? diff[v+1][1].substring(0, 6) : '';
                            if ( '</del>' === nextDiffText ) {
                              if ( 0 === diff[v+1][0] && diff[v-1] ) {
                                diff[v+1][1] = diff[v+1][1].substring(6);
                                diff[v-1][1] += nextDiffText;
                              }
                            } else {
                              nextDiffText = diff[v+1] ? diff[v+1][1].substring(0, 20) : '';
                              let diffMatchPattern = /<\/del>/;
                              let prevLastChar = diff[v-1] ? diff[v-1][1].slice(-3) : '';
                              let prevTagIndex = diff[v-1] ? diff[v-1][1].lastIndexOf('<del') : -1;
                              if ( -1 !== prevTagIndex && ';">' === prevLastChar && diffMatchPattern.test( nextDiffText ) ) {
                                let lastDelTag =  diff[v-1][1].substring(prevTagIndex);
                                diff[v-1][1] = diff[v-1][1].substring(0,prevTagIndex);
                                diff[v+1][1] = lastDelTag + diff[v+1][1];
                              }
                            }
                          }

                          let diffCurrentLastTag = diff[v][1].slice(-5);
                          let missingCurrentLastTag = diff[v][1].match(/<ins id="[\d]{0,1}$/);
                          let diffNextCloseTag = diff[v+1] ? diff[v+1][1].substring(0, 1) : '';
                          let diffNextTagId = diff[v+1] ? diff[v+1][1].substring(0, 3) : '';
                          let diffCommentNode = diff[v][1].slice(-8);
                          let diffCommentLastNode = diff[v+2] ? diff[v+2][1].substring(0,6) : '';

                          if ( ( '</del' === diffCurrentLastTag || '</ins' === diffCurrentLastTag ) && '>' === diffNextCloseTag ) {
                            diff[v][1] += diffNextCloseTag;
                            diff[v+1][1] = diff[v+1][1].substring(1);
                            ignoreCleanUp = true;
                          } else if ( '<ins ' === diffCurrentLastTag && 'id=' === diffNextTagId ) {
                            diff[v][1] = diff[v][1].substring(0, diff[v][1].lastIndexOf(diffCurrentLastTag));
                            diff[v+1][1] = diffCurrentLastTag + diff[v+1][1];
                            ignoreCleanUp = true;
                          } else if ( null !== missingCurrentLastTag ) {
                            diff[v][1] = diff[v][1].substring(0, diff[v][1].lastIndexOf(missingCurrentLastTag));
                            diff[v+1][1] = missingCurrentLastTag + diff[v+1][1];
                            ignoreCleanUp = true;
                          } else if ( null !== diff[v][1].match(/<del id="[\d]{0,1}$/) ) {
                            let missDelLastTag = diff[v][1].match(/<del id="[\d]{0,1}$/);
                            diff[v][1] = diff[v][1].substring(0, diff[v][1].lastIndexOf(missDelLastTag));
                            diff[v+1][1] = missDelLastTag + diff[v+1][1];
                            ignoreCleanUp = true;
                          } else if ( null !== diff[v][1].match(/<del id=".*">$/) && '' !== diffNextCloseTag ) {
                            let diffNextOfNext = diff[v+2] ? diff[v+2][1] : '';
                            if ( 1 === diffNextCloseTag.length && '' !== diffNextOfNext ) {
                              let matchDelTag = diff[v][1].match(/<del id=".*">$/);
                              diff[v][1] = diff[v][1].substring(0,diff[v][1].lastIndexOf(matchDelTag));
                              diff[v+2][1] = matchDelTag + diff[v+2][1];
                              ignoreCleanUp = true;
                            }
                          } else if ( '<mdspan ' === diffCommentNode && 'dat' === diffNextTagId && 'class=' === diffCommentLastNode ) {
                            diff[v+1][0] = 0;
                            ignoreCleanUp = true;
                            isComment = true;
                          } else if ( ' target=' === diff[v][1].substring(0,8) && 'noopener"' === diff[v][1].slice(-9) && DiffMatchPatch.DIFF_EQUAL !== operation  ) {
                            diff[v][0] = 0;
                            diff[v][1] = DiffMatchPatch.DIFF_INSERT === operation ? diff[v][1] : '';
                          }

                          if ( DiffMatchPatch.DIFF_EQUAL !== operation ) {

                            let currentDiff = diff[v][1].substring(0,3);
                            let prevDiff = diff[v-1] ? diff[v-1][1].slice(-1) : '';
                            let nextDiff = diff[v+1] ? diff[v+1][1].substring(0,3) : '';
                            let currentLastdiff = diff[v][1].slice(-1);
                            if ( ( ( 'ins' === currentDiff || 'del' === currentDiff ) && '<' === prevDiff ) && ( ( 'ins' === nextDiff || 'del' === nextDiff || '/li' === nextDiff ) && '<' === currentLastdiff ) ) {
                              let prevLastIndex = diff[v-1][1].lastIndexOf(prevDiff);
                              let currentLastIndex = diff[v][1].lastIndexOf(currentLastdiff);
                              diff[v-1][1] = diff[v-1][1].substring(0,prevLastIndex);
                              diff[v][1] = prevDiff + diff[v][1].substring(0,currentLastIndex);
                              diff[v+1][1] = currentLastdiff + diff[v+1][1];
                              ignoreCleanUp = true;
                            } else if ( null !== diff[v][1].match(/<mdspan (.*)">$/) ) {
                              let nextMdSpan = diff[v+2] ? diff[v+2][1] : '';
                              if ( '</mdspan>' === nextMdSpan ) {
                                diff[v][0] = 0;
                                diff[v][1] = '';
                                diff[v+2][0] = 0;
                                diff[v+2][1] = '';
                                isComment = true;
                              }

                            } else if ( DiffMatchPatch.DIFF_INSERT === operation && null !== diff[v][1].match(/<li>(.*)<\/li>$/) ) {
                              ignoreCleanUp = true;
                            } else if ( DiffMatchPatch.DIFF_INSERT === operation && null !== diff[v][1].match(/<\/li><li>$/) ) {
                              let prevListLastTag = diff[v-1] ? diff[v-1][1].slice(-4) : '';
                              let currentListLastTag = diff[v] ? diff[v][1].slice(-4) : '';
                              if ( '<li>' === prevListLastTag && '<li>' === currentListLastTag && diff[v+1] ) {
                                diff[v-1][1] = diff[v-1][1].substring(0, diff[v-1][1].lastIndexOf(prevListLastTag));
                                diff[v][1] = currentListLastTag + diff[v][1].substring(0, diff[v][1].lastIndexOf(currentListLastTag));
                                diff[v+1][1] = prevListLastTag + diff[v+1][1];
                                ignoreCleanUp = true;
                              }
                            }
                            diffText = diffText.replace(/<\/?ins[^>]*>/g,"").replace(/<\/?del[^>]*>/g,"");

                            for ( let i = 0; i < tagArray.length; i++ ) {
                              let dynamicRegex;
                              if ( DiffMatchPatch.DIFF_INSERT === operation ) {
                                let tagMatchPattern = 'a' === tagArray[i] ? '<\/' + tagArray[i] + '>(.*)<' + tagArray[i] + ' (.*)>$': '<\/' + tagArray[i] + '>(.*)<' + tagArray[i] + '>$';
                                let tagMatchPatternRegex = new RegExp(tagMatchPattern);
                                if ( null !== diff[v][1].match(tagMatchPatternRegex) ) {
                                  let replaceTagPatter = '<\/?' + tagArray[i] + '[^>]*>';
                                  let replaceTagRegex = new RegExp(replaceTagPatter, 'g');
                                  diff[v][1] = diff[v][1].replace(replaceTagRegex, '');
                                }
                                dynamicRegex = "<(" + tagArray[i] + "|\/" + tagArray[i] + ")";
                                let fullTagRegex = 'a' === tagArray[i] ? '<' + tagArray[i] + ' (.*)>(.*)<\/' + tagArray[i] + '>' : '<' + tagArray[i] + '>(.*)<\/' + tagArray[i] + '>';
                                let fullTagFinalRegex = new RegExp(fullTagRegex);
                                if ( null !== diffText.match(fullTagFinalRegex) ) {
                                  break;
                                }
                              } else {
                                dynamicRegex = 'a' === tagArray[i] ? "a [^>]*>" : "(" + tagArray[i] + "|\/" + tagArray[i] + ")>";
                              }

                              let regex = new RegExp( dynamicRegex, 'g');
                              if ( regex.test(diffText) ) {
                                matchRegex = true;
                                break;
                              }
                            }
                          }
                        }
                      }
                      if ( ! matchRegex && ! ignoreCleanUp ) {
                        dmp.diff_cleanupSemantic(diff);
                      }
                      if ( ! isComment ) {
                        let html = [];
                        let updateOldContent = false;
                        let isFormating = false;
                        let nextFomatingIndex = 0;
                        let formatTagName = '';
                        let isDelete = false;
                        let deleteUniqueId = '';
                        for ( let x = 0; x < diff.length; x++) {
                          let op = diff[x][0];
                          let text = diff[x][1];
                          let tagFound = false;
                          if ( ( patternResult || matchRegex ) && DiffMatchPatch.DIFF_EQUAL !== op && '' !== currentAttrContent ) {
                            text = text.replace(/<\/?ins[^>]*>/g,"").replace(/<\/?del[^>]*>/g,"");
                            if ( ! isFormating ) {
                              for ( let h = 0; h < tagArray.length; h++ ) {
                                let fullTagRegex = 'a' === tagArray[h] ? '<' + tagArray[h] + ' (.*)>(.*)<\/' + tagArray[h] + '>' : '<' + tagArray[h] + '>(.*)<\/' + tagArray[h] + '>';
                                let fullTagFinalRegex = new RegExp(fullTagRegex);
                                if ( null !== text.match(fullTagFinalRegex) ) {
                                  break;
                                }
                                let dynamicRegex;
                                if ( DiffMatchPatch.DIFF_INSERT === op ) {
                                  dynamicRegex = "<(" + tagArray[h] + "|\/" + tagArray[h] + ")";
                                } else {
                                  dynamicRegex = 'a' === tagArray[h] ? "a [^>]*>" : "(" + tagArray[h] + "|\/" + tagArray[h] + ")>";
                                }

                                let regex = new RegExp( dynamicRegex, "g");
                                if ( regex.test(text) ) {
                                  tagFound = true;
                                  formatTagName = tagArray[h];
                                  break;
                                }
                              }
                            }
                          }

                          let uniqueId = Math.floor(Math.random() * 100).toString() + Date.now().toString();
                          let dateTime = wp.date.gmdate(timeFormat + ' ' + dateFormat );

                          switch ( op ) {
                            case DiffMatchPatch.DIFF_INSERT:
                              if ( ! isFormating && tagFound ) {
                                isFormating = true;
                                nextFomatingIndex = x + 2;
                                diff[x+1][0] = 1;
                                html[x] = text;
                                updateOldContent = true;
                              } else if( isFormating && nextFomatingIndex === x ) {
                                isFormating = false;
                                nextFomatingIndex = 0;
                                html[x] = text;
                              } else {
                                if ( null !== text.match(/<li><\/li>$/) ) {
                                  html[x] = text;
                                } else if ( null !== text.match(/<li>(.*)<\/li>$/) ) {
                                  html[x] = '<li><ins id="' + uniqueId + '" data-uid="' + currentUser + '" style="color: #008000;">' + text.replace(/<\/?li[^>]*>/g,'') + '</ins></li>';
                                } else {
                                  html[x] = '<ins id="' + uniqueId + '" data-uid="' + currentUser + '" style="color: #008000;">' + text + '</ins>';
                                }
                                let tempObject = {};
                                if ( isFormating && '' !== formatTagName ) {
                                  tempObject[uniqueId] = [{'name' : userName, 'uid': currentUser, 'role': currentUserRole, 'avtar': avtarUrl, 'action': 'Format', 'mode': 'Add', 'text': formatName[formatTagName], 'time': dateTime}];
                                  formatTagName = '';
                                } else {
                                  tempObject[uniqueId] = [{'name' : userName, 'uid': currentUser, 'role': currentUserRole, 'avtar': avtarUrl, 'action': 'Add', 'mode': 'Add', 'text': text.replace(/<[^>]*>/g, ''), 'time': dateTime}];
                                }
                                if ( 0 === suggestionHistory.length ) {
                                  suggestionHistory = {};
                                  suggestionHistory[objClientId] = tempObject;
                                } else if ( ! suggestionHistory[objClientId] ) {
                                  suggestionHistory[objClientId] = tempObject;
                                } else {
                                  Object.assign(suggestionHistory[objClientId], tempObject)
                                }
                              }
                              break;
                            case DiffMatchPatch.DIFF_DELETE:
                              if ( ! isFormating && tagFound ) {
                                isFormating = true;
                                html[x] = text;
                                diff[x+1][0] = -1;
                                nextFomatingIndex = x + 2;
                              } else if( isFormating && nextFomatingIndex === x ) {
                                isFormating = false;
                                html[x] = text;
                                nextFomatingIndex = 0;
                              } else {
                                html[x] = '<del id="' + uniqueId + '" data-uid="' + currentUser + '" style="color: #ff0000;">' + text + '</del>';
                                isDelete = true;
                                deleteUniqueId = uniqueId;
                                let tempObject = {};
                                if ( isFormating && '' !== formatTagName ) {
                                  tempObject[uniqueId] = [{'name' : userName, 'uid': currentUser, 'role': currentUserRole, 'avtar': avtarUrl, 'action': 'Format', 'mode': 'Delete', 'text': formatName[formatTagName], 'time': dateTime}];
                                  formatTagName = '';
                                } else {
                                  tempObject[uniqueId] = [{'name' : userName, 'uid': currentUser, 'role': currentUserRole, 'avtar': avtarUrl, 'action': 'Delete', 'mode': 'Delete', 'text': text.replace(/<[^>]*>/g, ''), 'time': dateTime}];
                                }
                                if ( 0 === suggestionHistory.length ) {
                                  suggestionHistory = {};
                                  suggestionHistory[objClientId] = tempObject;
                                } else if ( ! suggestionHistory[objClientId] ) {
                                  suggestionHistory[objClientId] = tempObject;
                                } else {
                                  Object.assign(suggestionHistory[objClientId], tempObject)
                                }
                              }
                              updateOldContent = true;
                              break;
                            case DiffMatchPatch.DIFF_EQUAL:
                              html[x] =  text;
                              break;
                          }

                        }
                        let finalDiff = html.join('');
                        if ( isDelete && '' !== deleteUniqueId && '' !== finalDiff ) {
                          let tempDiv = document.createElement('div');
                          tempDiv.innerHTML = finalDiff;
                          let nextNodeId = jQuery('del#' + deleteUniqueId +'[data-uid="' + currentUser + '"]', tempDiv).next('del[data-uid="' + currentUser + '"]').attr('id');
                          let currentChildNodeIndex = 0;
                          let nextChildNodeIndex = 0;
                          if ( undefined !== nextNodeId && 0 < tempDiv.childNodes.length ) {
                            for ( let i = 0; i < tempDiv.childNodes.length; i++ ) {
                              if ( undefined !== tempDiv.childNodes[i].id  && deleteUniqueId === tempDiv.childNodes[i].id ) {
                                currentChildNodeIndex = i;
                              } else if ( undefined !== tempDiv.childNodes[i].id  && nextNodeId === tempDiv.childNodes[i].id ) {
                                nextChildNodeIndex = i;
                              }
                            }
                          }
                          if ( currentChildNodeIndex + 1 === nextChildNodeIndex ) {
                            let currentElementHtml = jQuery('del#' + deleteUniqueId +'[data-uid="' + currentUser + '"]', tempDiv).html();
                            let nextElementHtml = jQuery('del#' + nextNodeId +'[data-uid="' + currentUser + '"]', tempDiv).html();
                            jQuery('del#' + deleteUniqueId +'[data-uid="' + currentUser + '"]', tempDiv).html( currentElementHtml + nextElementHtml );
                            jQuery('del#' + nextNodeId +'[data-uid="' + currentUser + '"]', tempDiv).remove();
                            delete suggestionHistory[objClientId][nextNodeId];
                            suggestionHistory[objClientId][deleteUniqueId][0]['text'] = (currentElementHtml + nextElementHtml).replace(/<[^>]*>/g, '');
                            finalDiff = tempDiv.innerHTML;
                          }
                        }
                        if ( updateOldContent ) {
                          beforeChangeContent[clientId] = finalDiff;
                        }
                        currentNewContent = finalDiff;

                        if ( suggestionHistory[objClientId] ) {
                          let suggestionChildKey = Object.keys( suggestionHistory[objClientId] );

                          let clientIdNode = document.getElementById(objClientId);
                          if ( ! clientIdNode ) {
                            clientIdNode = document.createElement('div');
                            clientIdNode.setAttribute('id', objClientId);
                          } else {
                            clientIdNode.innerHTML = '';
                          }

                          for ( let i = 0; i < suggestionChildKey.length; i++ ) {
                            let findItem = 'id="' + suggestionChildKey[i] + '"';

                            if ( -1 === finalDiff.indexOf(findItem) ) {
                              delete suggestionHistory[objClientId][suggestionChildKey[i]];
                            } else {
                              let newNode = document.createElement('div');
                              newNode.setAttribute('id', 'sg' + suggestionChildKey[i]);
                              newNode.setAttribute('data-sid', suggestionChildKey[i]);
                              newNode.setAttribute('class', 'cls-board-outer'); // need to change class
                              clientIdNode.appendChild(newNode);

                              let referenceNode = document.getElementById('md-suggestion-comments');
                              if ( null === referenceNode ) {
                                this.handleLoad();
                                referenceNode = document.getElementById('md-suggestion-comments');
                              }
                              referenceNode.appendChild(clientIdNode);

                              ReactDOM.render(
                                <SuggestionBoard oldClientId={objClientId} clientId={clientId} suggestionID={suggestionChildKey[i]} suggestedOnText={suggestionHistory[objClientId][suggestionChildKey[i]]} />,
                                document.getElementById('sg' + suggestionChildKey[i])
                              );
                            }
                          }
                        }
                        if ( '' !== finalDiff ) {
                          'core/list' === finalBlockProps.name  ? setAttributes({values: finalDiff}) : setAttributes({content: finalDiff});
                          wp.data.dispatch('core/editor').editPost({meta: {sb_suggestion_history: JSON.stringify(suggestionHistory) } });
                        }
                      } else {
                        beforeChangeContent[clientId] = currentAttrContent;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    addEvents() {
      const _this = this;
      jQuery(document).on('keyup', '.wp-block[data-type="core/paragraph"], .wp-block[data-type="core/heading"], .wp-block[data-type="core/list"]', function () {
        _this.activeSuggestionBox(jQuery(this));
      });
      jQuery(document).on('mouseup', '.wp-block[data-type="core/paragraph"], .wp-block[data-type="core/heading"], .wp-block[data-type="core/list"]', function () {
        _this.activeSuggestionBox(jQuery(this));
      });
      jQuery(document).on('click', '#md-suggestion-comments .cls-board-outer:not(".focus")', function (e) {
        let sid = jQuery(this).attr('data-sid');
        if ( undefined !== sid && null !== sid && 0 < jQuery('#' + sid).length ) {
          jQuery('.wp-block').removeClass('is-selected');
          jQuery('#' + sid).parents('.wp-block').addClass('is-selected');
          jQuery('#' + sid).attr('data-rich-text-format-boundary', true);
        }
        jQuery('#md-suggestion-comments .cls-board-outer').removeClass('focus');
        jQuery(this).addClass('focus');
      });
      jQuery(document).on('click', '#md-comments-suggestions-parent #md-tabs span', function () {
        jQuery(this).parents('#md-tabs').find('span').removeClass('active');
        jQuery(this).addClass('active');
        if ( jQuery(this).hasClass('suggestion') ) {
          jQuery(this).parents('#md-comments-suggestions-parent').find('#md-span-comments').hide().siblings('#md-suggestion-comments').show();
        } else {
          jQuery(this).parents('#md-comments-suggestions-parent').find('#md-suggestion-comments').hide().siblings('#md-span-comments').show();
        }
      });
    }

    activeSuggestionBox($this) {
      if ( 0 < $this.find('[data-rich-text-format-boundary="true"]').length && undefined !== $this.find('[data-rich-text-format-boundary="true"]').attr('id') ) {
        jQuery('#sg'+ $this.find('[data-rich-text-format-boundary="true"]').attr('id') ).addClass('focus');
        if ( ! jQuery('#md-tabs .suggestion').hasClass('active') ) {
          jQuery('#md-tabs').find('span').removeClass('active').end().find('span.suggestion').addClass('active');
          jQuery('#md-comments-suggestions-parent').find('#md-span-comments').hide().siblings('#md-suggestion-comments').show();
        }
      } else {
        jQuery('#md-suggestion-comments .cls-board-outer').removeClass('focus');
      }
    }

    renderAllSuggestion( displayHistory, commentNode ) {

      const { attributes, clientId } = this.props;
      const { oldClientId } = attributes;
      const content = 'core/list' === this.props.name ? attributes.values : attributes.content;

      let suggestionChildKey = Object.keys( displayHistory[oldClientId] );
      let clientIdNode = document.getElementById(oldClientId);
      if ( ! clientIdNode ) {
        clientIdNode = document.createElement('div');
        clientIdNode.setAttribute('id', oldClientId);
      }

      for ( let i = 0; i < suggestionChildKey.length; i++ ) {
        let findItem = 'id="' + suggestionChildKey[i] + '"';

        if ( -1 === content.indexOf(findItem) ) {
          delete displayHistory[oldClientId][suggestionChildKey[i]];
        } else {
          let newNode = document.createElement('div');
          newNode.setAttribute('id', 'sg' + suggestionChildKey[i]);
          newNode.setAttribute('data-sid', suggestionChildKey[i]);
          newNode.setAttribute('class', 'cls-board-outer');
          clientIdNode.appendChild(newNode);
          commentNode.appendChild(clientIdNode);
        }
        ReactDOM.render(
          <SuggestionBoard oldClientId={oldClientId} clientId={clientId} suggestionID={suggestionChildKey[i]} suggestedOnText={displayHistory[oldClientId][suggestionChildKey[i]]} />,
          document.getElementById('sg' + suggestionChildKey[i])
        );
      }
      wp.data.dispatch('core/editor').editPost({meta: {sb_suggestion_history: JSON.stringify(displayHistory) } });
    }
    render() {
      return (
        <BlockEdit {...this.props} />
      )
    }
  }
}, 'withBlockExtendControls' );
