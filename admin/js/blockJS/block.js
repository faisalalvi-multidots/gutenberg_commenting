import Board from './component/board';

const {__} = wp.i18n;
const {addFilter} = wp.hooks;
const {Fragment, Component} = wp.element;
const {toggleFormat} = wp.richText;
const {RichTextToolbarButton} = wp.blockEditor;
const {registerFormatType, applyFormat, removeFormat} = wp.richText;
const $ = jQuery;

// Window Load functions.
$(window).load(function () {

    // Add history button.
    const customHistoryButton = '<div class="components-dropdown custom-buttons"><button type="button" aria-expanded="false" class="components-button has-icon" aria-label="Tools"><span class="dashicons dashicons-text-page" id="history-toggle"></span></button></div>';
    $('.edit-post-header-toolbar').append(customHistoryButton);

    // Add comments toggle button.
    const customCommentsToggleButton = '<div class="components-dropdown custom-buttons"><button type="button" aria-expanded="false" class="components-button has-icon" aria-label="Tools"><span class="dashicons dashicons-admin-comments" id="comments-toggle"></span></button></div>';
    $('.edit-post-header-toolbar').append(customCommentsToggleButton);

    const customHistoryPopup = '<div id="custom-history-popup"></div>';
    $('.edit-post-layout').append(customHistoryPopup);

    fetchComments();

    $(document).on('click', '.components-notice__action', function () {

        if ('View the autosave' === $(this).text()) {
            bring_back_comments();
        }
        if ('Restore the backup' === $(this).text()) {

            setTimeout(function () {
                // Sync popups with highlighted texts.
                $('.wp-block mdspan').each(function () {
                    var selectedText = $(this).attr('datatext');
                    if ($('#' + selectedText).length === 0) {
                        createBoard(selectedText, 'value', 'onChange');
                    }
                });

                bring_back_comments();
            }, 500);

        }

    });

});

function fetchComments() {

    var newNode = document.createElement('div');
    newNode.setAttribute("id", 'md-span-comments');
    newNode.setAttribute("class", 'comments-loader');
    var referenceNode = document.querySelector('.block-editor-writing-flow');
    if (null !== referenceNode) {
        referenceNode.appendChild(newNode);

        let selectedText;
        let txtselectedText;
        var allThreads = [];

        // If no comment tag exist, remove the loader and temp style tag immediately.
        const span_count = $('.wp-block mdspan').length;
        if( 0 === span_count ) {
            $('#md-span-comments').removeClass('comments-loader');
            $('#loader_style').remove();
        } else {
            $('.wp-block mdspan').each(function () {

                selectedText = $(this).attr('datatext');

                if ($('#' + selectedText).length === 0) {

                    var newNode = document.createElement('div');
                    newNode.setAttribute("id", selectedText);
                    newNode.setAttribute("class", "cls-board-outer is_active");

                    var referenceNode = document.getElementById('md-span-comments');
                    referenceNode.appendChild(newNode);

                    ReactDOM.render(
                        <Board datatext={selectedText} onLoadFetch={1}/>,
                        document.getElementById(selectedText)
                    )
                }
                allThreads.push(selectedText);
            });

            var loadAttempts = 0;
            const loadComments = setInterval(function () {
                loadAttempts++;
                if (1 <= $('.commentContainer').length) {
                    clearInterval(loadComments);
                    $('#loader_style').remove();
                    $('#md-span-comments').removeClass('comments-loader');
                }
                if (loadAttempts >= 10) {
                    clearInterval(loadComments);
                    $('#loader_style').remove();
                    $('#md-span-comments').removeClass('comments-loader');
                }
            }, 1000);
        }

        //$('.cls-board-outer').addClass('is_active');

        // Reset Draft Comments Data.
        const CurrentPostID = wp.data.select('core/editor').getCurrentPostId();
        var data = {
            'action': 'cf_reset_drafts_meta',
            'currentPostID': CurrentPostID,
        };
        $.post(ajaxurl, data, function (response) {
        });
    }
}

function bring_back_comments() {

    // Reset Draft Comments Data.
    const CurrentPostID = wp.data.select('core/editor').getCurrentPostId();
    var data = {
        'action': 'cf_merge_draft_stacks',
        'currentPostID': CurrentPostID,
    };
    $.post(ajaxurl, data, function (response) {

        response = JSON.parse(response);

        if (response.resolved) {
            $.each(response.resolved, function (k, el) {
                el = el.replace('_', '');
                $('#' + el).addClass('reverted_back resolved');
                // Hide popups if their tags don't exist.
                if (0 === $('[datatext="' + el + '"]').length) {
                    $('#' + el).hide();
                }
            });
        }

        if (response.comments) {
            $.each(response.comments, function (el, timestamps) {
                $.each(timestamps, function (el, t) {
                    $('#' + t).removeClass('publish').addClass('reverted_back added');
                    /*taking extra care to display new threads*/
                    $('head').append('<style>[id="'+t+'"]{display: block !important}</style>');
                });
            });
        }

        if (response.deleted) {
            $.each(response.deleted, function (el, timestamps) {
                $.each(timestamps, function (el, t) {
                    $('#' + t).remove();
                });
            });
        }

        if (response.edited) {
            $.each(response.edited, function (el, timestamps) {

                $.each(timestamps, function (el, t) {
                    $('#' + t).removeClass('publish').addClass('reverted_back edited');

                    // Update the component with new text.
                    const someElement = document.getElementById(t);
                    const myComp = FindReact(someElement);
                    myComp.setState({showEditedDraft: true});

                    $('#' + t + ' .commentText').append(' <i style="font-size:12px;color:#23282dba">(edited)</i>');
                });
            });
        }

    });

    return false;
}

function FindReact(dom, traverseUp = 0) {
    const key = Object.keys(dom).find(key => key.startsWith("__reactInternalInstance$"));
    const domFiber = dom[key];
    if (domFiber == null) return null;

    // react <16
    if (domFiber._currentElement) {
        let compFiber = domFiber._currentElement._owner;
        for (let i = 0; i < traverseUp; i++) {
            compFiber = compFiber._currentElement._owner;
        }
        return compFiber._instance;
    }

    // react 16+
    const GetCompFiber = fiber => {
        //return fiber._debugOwner; // this also works, but is __DEV__ only
        let parentFiber = fiber.return;
        while (typeof parentFiber.type == "string") {
            parentFiber = parentFiber.return;
        }
        return parentFiber;
    };
    let compFiber = GetCompFiber(domFiber);
    for (let i = 0; i < traverseUp; i++) {
        compFiber = GetCompFiber(compFiber);
    }
    return compFiber.stateNode;
}

function createBoard(selectedText, value, onChange) {
    var referenceNode = document.getElementById('md-span-comments');
    var newNode = document.createElement('div');
    newNode.setAttribute("id", selectedText);
    newNode.setAttribute("class", "cls-board-outer is_active");

    referenceNode.appendChild(newNode);
    ReactDOM.render(
        <Board datatext={selectedText} lastVal={value} onChanged={onChange}/>,
        document.getElementById(selectedText)
    )
}

// Register Custom Format Type: Comment.
const name = 'multidots/comment';
const title = __('Comment');
const mdComment = {
    name,
    title,
    tagName: 'mdspan',
    className: 'mdspan-comment',
    attributes: {
        datatext: 'datatext',
        style: 'style'
    },
    edit: (class myClass extends Component {
        constructor(props) {
            super(props);

            this.onToggle = this.onToggle.bind(this);
            this.getSelectedText = this.getSelectedText.bind(this);
            this.storeSelectionValue = this.storeSelectionValue.bind(this);
            this.removeSuggestion = this.removeSuggestion.bind(this);
            this.hidethread = this.hidethread.bind(this);
            this.floatComments = this.floatComments.bind(this);

            this.latestValue = this.latestBoard = '';

        }

        onToggle() {

            var currentTime = Date.now();
            currentTime = 'el' + currentTime;
            var newNode = document.createElement('div');
            newNode.setAttribute("id", currentTime);
            newNode.setAttribute("class", 'cls-board-outer');

            var referenceNode = document.getElementById('md-span-comments');

            referenceNode.appendChild(newNode);

            const simpleCurrentPostID = wp.data.select('core/editor').getCurrentPostId();
            const {value, onChange} = this.props;
            let {text, start, end} = value;

            const commentedOnText = text.substring(start, end);

            onChange(toggleFormat(value, {type: name}),
                ReactDOM.render(
                    <Board datatext={currentTime} onChanged={onChange} lastVal={value} freshBoard={1} commentedOnText={commentedOnText}/>,
                    document.getElementById(currentTime)
                )
            );

            onChange(applyFormat(value, {type: name, attributes: {datatext: currentTime, style: 'background:#fdf0b6'}}));

            this.latestBoard = currentTime;
            this.latestValue = value;

        }

        getSelectedText() {

            var referenceNode = document.getElementById('md-span-comments');

            const {onChange, value, activeAttributes} = this.props;

            // Remove tags if selected tag ID exist in 'remove-comment' attribute of body.
            let removedComments = $('body').attr('remove-comment');
            if (undefined !== activeAttributes.datatext &&
                ( undefined !== removedComments && removedComments.indexOf(activeAttributes.datatext) !== -1  )
            ) {
                onChange(removeFormat(value, name));
            }

            if (undefined !== this.props.value.start && null !== referenceNode) {
                let selectedText;
                let txtselectedText;

                $('.cls-board-outer').removeClass('has_text');

                // Sync popups with highlighted texts.
                $('.wp-block mdspan').each(function () {

                    selectedText = $(this).attr('datatext');

                    // This will help to create CTRL-Z'ed Text's popup.
                    // remove this logic... <-- ne_pending, instead, remove highlight after CTRL-Z
                    // because we will not have comments in Board so we should not create new!
                    // user will have to add comment from scratch.
                    if (undefined !== selectedText && $('#' + selectedText).length === 0) {

                        let removedComments = $('body').attr('remove-comment');
                        if ( undefined === removedComments ||
                            ( undefined !== removedComments && removedComments.indexOf(selectedText) === -1 )
                        ) {
                            createBoard(selectedText, value, onChange);
                        } else {
                            $('[datatext="' + selectedText + '"]').css('background', 'transparent');
                        }
                    }

                    $('#' + selectedText).addClass('has_text').show();
                });

                //selectedText = $('mdspan[data-rich-text-format-boundary="true"]').attr('datatext');
                selectedText = activeAttributes.datatext;

                // Delete the popup and its highlight if user
                // leaves the new popup without adding comment.
                if (
                    '' !== this.latestBoard
                    && selectedText !== this.latestBoard
                    && 0 !== $('#' + this.latestBoard).length
                    && 0 === $('#' + this.latestBoard + ' .commentContainer').length
                ) {
                    onChange(removeFormat(this.latestValue, name));
                    $('#' + this.latestBoard).remove();
                }

                // If the text removed, remove comment from db and its popup.
                // new_logic ->
                // just hide these popups and only display on CTRLz
                $('#md-span-comments .cls-board-outer:not(.has_text):not([data-sid])').each(function () {
                    $(this).hide();
                });

                // Adding lastVal and onChanged props to make it deletable,
                // these props were not added on load.
                // It also helps to 'correct' the lastVal of CTRL-Z'ed Text's popup.
                if ($('#' + selectedText).length !== 0) {
                    ReactDOM.render(
                        <Board datatext={selectedText} lastVal={value} onChanged={onChange}/>,
                        document.getElementById(selectedText)
                    )
                }

                // Adding focus on selected text's popup.
                $('.cls-board-outer').removeClass('focus');
                $('#' + selectedText + '.cls-board-outer').addClass('focus');

                // Removing dark highlights from other texts.
                $('mdspan:not([datatext="' + selectedText + '"])').removeAttr('data-rich-text-format-boundary');

                // Removing dark highlights from other texts.
                //$('mdspan:not([datatext="' + selectedText + '"]), del:not([id="' + selectedText + '"]), ins:not([id="' + selectedText + '"])').removeAttr('data-rich-text-format-boundary');

                // update id if
                /*if(undefined === selectedText && 0 !== $('[data-rich-text-format-boundary="true"]').length) {
                    selectedText = 'sg' + $('[data-rich-text-format-boundary="true"]').attr('id');
                }*/

                // Float comments column.
                if(undefined !== selectedText) {
                    this.floatComments(selectedText);
                }

            }
        }

        storeSelectionValue(value) {
            var objValue = JSON.stringify(value);
            localStorage.setItem('commentVal', objValue);
        }

        floatComments(selectedText) {

            if ($('mdspan[data-rich-text-format-boundary="true"]').length !== 0) {

                var scrollTop = '';
                if( 0 !== $('.block-editor-editor-skeleton__content').length ) {
                    // Latest WP Version
                    scrollTop = $('.block-editor-editor-skeleton__content').scrollTop();

                } else if( 0 !== $('.edit-post-layout__content').length ) {
                    // Old WP Versions
                    scrollTop = $('.edit-post-layout__content').scrollTop();

                } else {
                    // Default
                    scrollTop = $('body').scrollTop();
                }

                let commentTop = $('mdspan[data-rich-text-format-boundary="true"]').offset().top;
                let currentPopupTop = $('#' + selectedText + '.cls-board-outer').offset().top;
                let commentColTop = $('#md-span-comments').offset().top;
                let diff = commentTop - currentPopupTop;
                diff = commentColTop + diff + scrollTop;

                $('#md-span-comments').css({
                    'top': diff - 150
                });
            }

        }

        removeSuggestion() {
            const {onChange, value} = this.props;
            onChange(removeFormat(value, name));
        }

        hidethread() {
            $('.cls-board-outer').removeClass('is_active');

        }

        render() {
            const {isActive, inputValue, onChange, value} = this.props;

            return (
                <Fragment>
                    <RichTextToolbarButton
                        title={__('Comment')}
                        isActive={isActive}
                        icon="admin-links"
                        onClick={this.onToggle}
                        shortcutType="primary"
                        shortcutCharacter="m"
                        className={`toolbar-button-with-text toolbar-button__${name}`}
                    />
                    {
                        <Fragment>
                            {this.getSelectedText()}
                        </Fragment>
                    }

                    {!isActive &&
                    <Fragment>
                        {/*{this.hidethread()}*/}
                    </Fragment>
                    }

                </Fragment>
            );
        }
    }),
};
registerFormatType(name, mdComment);

import './component/suggestion-sidebar';
import withBlockExtendControls from './component/block-extend-controls';

addFilter( 'editor.BlockEdit', 'md/block-extend-controls', withBlockExtendControls );
addFilter( 'blocks.registerBlockType', 'md/suggestionBlockAttributes', addCustomAttributes );

function addCustomAttributes( settings, name ) {

  if ( 'core/paragraph' === name ) {
    if ( settings.attributes ) {
      settings.attributes.oldClientId = {
        type: 'string',
        default: ''
      };
    }
  }
  return settings;
}
