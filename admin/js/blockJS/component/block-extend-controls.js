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
      let suggestionHistory = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_suggestion_history'];
      let commentNode = document.getElementById('md-suggestion-comments');

      if ( null === commentNode ) {
        commentNode = document.createElement('div');
        commentNode.setAttribute('id', 'md-suggestion-comments');
        commentNode.setAttribute('class', 'comments-loader');
        let wpEditoNode = document.querySelector('.block-editor-writing-flow');
        wpEditoNode.appendChild(commentNode);
        this.addEvents();
      }

      if ( 0 < suggestionHistory.length && '' !== oldClientId && displayInitialSuggestion ) {
        let displayHistory = JSON.parse(suggestionHistory);
        if ( undefined !== displayHistory[oldClientId] && -1 === loadInitialSuggestion.indexOf( oldClientId ) ) {
          loadInitialSuggestion.push(oldClientId);
          this.renderAllSuggestion( displayHistory, commentNode );
        }
      }
    }

    componentDidUpdate() {
      if ( 'core/paragraph' === this.props.name ) {

        const { attributes, setAttributes, clientId, isSelected } = this.props;
        const { oldClientId } = attributes;
        const postStatus = wp.data.select('core/editor').getCurrentPost().status;
        let suggestionHistory = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_suggestion_history'];

        if ( 'publish' !== postStatus && isSelected ) {
          if ( wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_is_suggestion_mode'] ) {
            let editRecord = wp.data.select('core').getUndoEdit();
            const currentBlockIndex = select( 'core/block-editor' ).getBlockIndex( clientId );
            if (editRecord && editRecord.edits && editRecord.edits.blocks) {
              if (editRecord.edits.blocks[currentBlockIndex] && editRecord.edits.blocks[currentBlockIndex].name === 'core/paragraph') {
                let attr = editRecord.edits.blocks[currentBlockIndex].attributes;
                let currentAttr = wp.data.select('core/block-editor').getBlockAttributes(clientId);
                if ( currentNewContent !== currentAttr.content ) {
                  displayInitialSuggestion = false;
                  if ( 0 === Object.keys(beforeChangeContent).length || undefined === beforeChangeContent[clientId] ) {
                    beforeChangeContent[clientId] = attr.content;
                  }
                  if ( currentAttr.content !== attr.content ) {

                    const currentUser = wp.data.select('core').getCurrentUser().id;
                    const userName = wp.data.select('core').getCurrentUser().name;
                    const userAvtars = wp.data.select('core').getCurrentUser().avatar_urls;
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

                    let filterContent = currentAttr.content;
                    if ( ! patternResult ) {
                      filterContent = currentAttr.content.replace(/<\/?ins[^>]*>/g,"").replace(/<\/?del[^>]*>/g,"");
                    }

                    let objClientId = oldClientId;

                    if ( '' === oldClientId ) {
                      setAttributes({ oldClientId: clientId });
                      objClientId = clientId;
                    }

                    let diff = dmp.diff_main(beforeChangeContent[clientId], filterContent);

                    let tagArray = ['strong', 'em', 'a', 's', 'code', 'span'];
                    let matchRegex = false;
                    let ignoreCleanUp = false;

                    console.log(diff[0][1]);

                    for ( let v = 0; v < diff.length; v++) {

                      let operation = diff[v][0];
                      let diffText = diff[v][1];

                      if ( DiffMatchPatch.DIFF_INSERT === operation ) {
                        let nextDiffText = diff[v+1] ? diff[v+1][1].substring(0, 6) : '';
                        if ( '</del>' === nextDiffText ) {
                          if ( 0 === diff[v+1][0] && diff[v-1] ) {
                            diff[v+1][1] = diff[v+1][1].substring(6);
                            diff[v-1][1] += nextDiffText ;
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
                      }

                      if ( DiffMatchPatch.DIFF_EQUAL !== operation ) {

                        let currentDiff = diff[v][1].substring(0,3);
                        let prevDiff = diff[v-1] ? diff[v-1][1].slice(-1) : '';
                        let nextDiff = diff[v+1] ? diff[v+1][1].substring(0,3) : '';
                        let currentLastdiff = diff[v][1].slice(-1);
                        if ( ( ( 'ins' === currentDiff || 'del' === currentDiff ) && '<' === prevDiff ) && ( ( 'ins' === nextDiff || 'del' ) && '<' === currentLastdiff ) ) {
                          let prevLastIndex = diff[v-1][1].lastIndexOf(prevDiff);
                          let currentLastIndex = diff[v][1].lastIndexOf(currentLastdiff);
                          diff[v-1][1] = diff[v-1][1].substring(0,prevLastIndex);
                          diff[v][1] = prevDiff + diff[v][1].substring(0,currentLastIndex);
                          diff[v+1][1] = currentLastdiff + diff[v+1][1];
                          ignoreCleanUp = true;
                        }

                        diffText = diffText.replace(/<\/?ins[^>]*>/g,"").replace(/<\/?del[^>]*>/g,"");

                        for ( let i = 0; i < tagArray.length; i++ ) {
                          let dynamicRegex;
                          if ( DiffMatchPatch.DIFF_INSERT === operation ) {
                            dynamicRegex = "<(" + tagArray[i] + "|\/" + tagArray[i] + ")";
                          } else {
                            dynamicRegex = 'a' === tagArray[i] ? "a [^>]*>" : "(" + tagArray[i] + "|\/" + tagArray[i] + ")>";
                          }

                          let regex = new RegExp( dynamicRegex, "g");
                          if ( regex.test(diffText) ) {
                            matchRegex = true;
                            break;
                          }
                        }
                      }
                    }
                    if ( ! matchRegex && ! ignoreCleanUp ) {
                      dmp.diff_cleanupSemantic(diff);
                    }

                    let html = [];
                    let updateOldContent = false;
                    let isFormating = false;
                    let nextFomatingIndex = 0;
                    for ( let x = 0; x < diff.length; x++) {
                      let op = diff[x][0];
                      let text = diff[x][1];
                      let tagFound = false;
                      if ( ( patternResult || matchRegex ) && DiffMatchPatch.DIFF_EQUAL !== op ) {
                        text = text.replace(/<\/?ins[^>]*>/g,"").replace(/<\/?del[^>]*>/g,"");
                        if ( ! isFormating ) {
                          tagArray.forEach(( tagName ) => {
                            let dynamicRegex;
                            if ( DiffMatchPatch.DIFF_INSERT === op ) {
                              dynamicRegex = "<(" + tagName + "|\/" + tagName + ")";
                            } else {
                              dynamicRegex = 'a' === tagName ? "a [^>]*>" : "(" + tagName + "|\/" + tagName + ")>";
                            }

                            let regex = new RegExp( dynamicRegex, "g");
                            if ( regex.test(text) ) {
                              tagFound = true;
                            }
                          });
                        }
                      }

                      let uniqueId = Math.floor(Math.random() * 100).toString() + Date.now().toString();
                      let today = new Date();
                      let date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
                      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                      let dateTime = date + ' ' + time;

                      switch (op) {
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

                            html[x] = '<ins id="' + uniqueId + '" style="color: #008000;">' + text + '</ins>';
                            let tempObject = {};
                            tempObject[uniqueId] = [{'name' : userName, 'uid': currentUser, 'avtar': avtarUrl, 'action': 'Add', 'text': text, 'time': dateTime}]
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
                            nextFomatingIndex = x + 2;
                          } else if( isFormating && nextFomatingIndex === x ) {
                            isFormating = false;
                            nextFomatingIndex = 0;
                          } else {
                            html[x] = '<del id="' + uniqueId + '" style="color: #ff0000;">' + text + '</del>';
                            let tempObject = {};
                            tempObject[uniqueId] = [{'name' : userName, 'uid': currentUser, 'avtar': avtarUrl, 'action': 'Delete', 'text': text, 'time': dateTime}];
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
                          referenceNode.appendChild(clientIdNode);

                          ReactDOM.render(
                            <SuggestionBoard oldClientId={objClientId} clientId={clientId} suggestionID={suggestionChildKey[i]} suggestedOnText={suggestionHistory[objClientId][suggestionChildKey[i]]} />,
                            document.getElementById('sg' + suggestionChildKey[i])
                          );
                        }
                      }
                    }
                    if ( '' !== finalDiff ) {
                      setAttributes({content: finalDiff});
                      wp.data.dispatch('core/editor').editPost({meta: {sb_suggestion_history: JSON.stringify(suggestionHistory) } });
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
      jQuery(document).on('keyup', '.wp-block-paragraph', function () {
       if ( 0 < jQuery(this).find('[data-rich-text-format-boundary="true"]').length && undefined !== jQuery(this).find('[data-rich-text-format-boundary="true"]').attr('id') ) {
        jQuery('#sg'+ jQuery(this).find('[data-rich-text-format-boundary="true"]').attr('id') ).addClass('focus');
       } else {
         jQuery('#md-suggestion-comments .cls-board-outer').removeClass('focus');
       }
      });
      jQuery(document).on('mouseup', '.wp-block-paragraph', function () {
        if ( 0 < jQuery(this).find('[data-rich-text-format-boundary="true"]').length && undefined !== jQuery(this).find('[data-rich-text-format-boundary="true"]').attr('id') ) {
          jQuery('#sg'+ jQuery(this).find('[data-rich-text-format-boundary="true"]').attr('id') ).addClass('focus');
        } else {
          jQuery('#md-suggestion-comments .cls-board-outer').removeClass('focus');
        }
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
    }

    renderAllSuggestion( displayHistory, commentNode ) {

      const { attributes, clientId } = this.props;
      const { oldClientId } = attributes;

      let suggestionChildKey = Object.keys( displayHistory[oldClientId] );
      let clientIdNode = document.getElementById(oldClientId);
      if ( ! clientIdNode ) {
        clientIdNode = document.createElement('div');
        clientIdNode.setAttribute('id', oldClientId);
      }

      for ( let i = 0; i < suggestionChildKey.length; i++ ) {
        let newNode = document.createElement('div');
        newNode.setAttribute('id', 'sg' + suggestionChildKey[i]);
        newNode.setAttribute('data-sid', suggestionChildKey[i]);
        newNode.setAttribute('class', 'cls-board-outer');
        clientIdNode.appendChild(newNode);
        commentNode.appendChild(clientIdNode);

        ReactDOM.render(
          <SuggestionBoard oldClientId={oldClientId} clientId={clientId} suggestionID={suggestionChildKey[i]} suggestedOnText={displayHistory[oldClientId][suggestionChildKey[i]]} />,
          document.getElementById('sg' + suggestionChildKey[i])
        );
      }
    }
    render() {
      return (
        <BlockEdit {...this.props} />
      )
    }
  }
}, 'withBlockExtendControls' );
