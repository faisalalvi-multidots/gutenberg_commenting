import Comment from "./comment";

const {removeFormat} = wp.richText;

export default class Board extends React.Component {

    constructor(props) {

        super(props);
        this.displayComments = this.displayComments.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.removeComment = this.removeComment.bind(this);
        this.addNewComment = this.addNewComment.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
        this.enableUpdateBtn = this.enableUpdateBtn.bind(this);
        const currentPostID = wp.data.select('core/editor').getCurrentPostId();
        const postSelections = [];
        let selectedText;
        let txtselectedText;
        let metaselectedText;

        // `this` is the div
        selectedText = this.props.datatext;
        txtselectedText = 'txt' + selectedText;
        metaselectedText = '_' + selectedText;
        setTimeout(function () {
            jQuery('#' + selectedText + ' textarea').attr('id', txtselectedText);
        }, 3000);

        this.commentedOnText = this.props.commentedOnText;

        if (1 !== this.props.freshBoard) {
            const allPosts = wp.apiFetch({path: 'cf/cf-get-comments-api/?currentPostID=' + currentPostID + '&elID=' + metaselectedText}).then(fps => {

                const {userDetails, resolved, commentedOnText} = fps;

                // Update the 'commented on text' if not having value.
                this.commentedOnText = undefined !== this.commentedOnText ? this.commentedOnText : commentedOnText;

                if ('true' === resolved || 0 === userDetails.length) {
                    let elIDRemove = selectedText
                    let removed_comments = jQuery('body').attr('remove-comment');
                    removed_comments = undefined !== removed_comments ? removed_comments + ',' + elIDRemove : elIDRemove;
                    jQuery('body').attr('remove-comment', removed_comments);
                    jQuery('body').append('<style>body [datatext="' + elIDRemove + '"] {background-color:transparent !important;}</style>');
                    jQuery('[datatext="' + elIDRemove + '"]').addClass('removed');
                    jQuery('#' + elIDRemove).remove();

                    return false;
                }

                jQuery.each(userDetails, function (key, val) {
                    postSelections.push(val);
                });

                // Add text that the comment is removed.
                if (0 !== postSelections.length) {
                    this.hasComments = 1;
                } else {
                    this.hasComments = 0;
                }

                this.state = {comments: [postSelections]};
                this.setState({comments: postSelections});
            });
        }

        // Actions on load.
        if (1 === this.props.onLoadFetch) {

            // Handling Older WordPress Versions.
            // The function wp.data.select("core").getCurrentUser() is not
            // defined for v5.2.2, so getting data from PHP.
            try {
                wp.data.select("core").getCurrentUser().id;
            } catch (e) {

                // Fetch User details from AJAX.
                jQuery.post(ajaxurl, {
                    'action': 'cf_get_user'
                }, function (user) {
                    user = JSON.parse(user);
                    localStorage.setItem("userID", user.id);
                    localStorage.setItem("userName", user.name);
                    localStorage.setItem("userURL", user.url);
                });
            }

        }

        this.state = {comments: []};
    }

    enableUpdateBtn() {
        // Removing disabled attribute from "Update" button on load.
        // Doing so to handle the process even when content is not changed but comments are modified/added.
        // The custom function is added in 'commenting_block-admin.js', find there 'custom_publish_handle' label.
        jQuery('button.components-button.editor-post-publish-button').removeAttr('aria-disabled');
    }

    removeComment(idx, cTimestamp, elID) {

        this.enableUpdateBtn();

        var arr = this.state.comments;

        arr.splice(idx, 1);
        const CurrentPostID = wp.data.select('core/editor').getCurrentPostId();
        const {value, onChange} = this.props;
        elID = '_' + elID;
        var data = {
            'action': 'cf_delete_comment',
            'currentPostID': CurrentPostID,
            'timestamp': cTimestamp,
            metaId: elID
        };
        // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
        jQuery.post(ajaxurl, data, function (response) {

        });
        this.setState({comments: arr});
    }

    updateComment(newText, idx, cTimestamp, dateTime, metaID) {

        this.enableUpdateBtn();

        var arr = this.state.comments;

        try {
            var userID = wp.data.select("core").getCurrentUser().id;
            var userName = wp.data.select("core").getCurrentUser().name;
            var userProfile = wp.data.select("core").getCurrentUser().avatar_urls;
            userProfile = userProfile[Object.keys(userProfile)[1]];
        } catch (e) {
            var userID = localStorage.getItem("userID");
            var userName = localStorage.getItem("userName");
            var userProfile = localStorage.getItem("userURL");
        }

        var newArr = {};
        newArr['userName'] = userName;
        newArr['profileURL'] = userProfile;
        newArr['dtTime'] = dateTime;
        newArr['thread'] = newText;
        newArr['userData'] = userID;
        newArr['index'] = idx;
        newArr['status'] = 'draft reverted_back';
        newArr['timestamp'] = cTimestamp;
        arr[idx] = newArr;
        const CurrentPostID = wp.data.select('core/editor').getCurrentPostId();
        metaID = '_' + metaID;
        var data = {
            'action': 'cf_update_comment',
            'currentPostID': CurrentPostID,
            'editedComment': JSON.stringify(newArr),
            'metaId': metaID
        };
        // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
        let _this = this;

        jQuery.post(ajaxurl, data, function () {
        });
        this.setState({comments: arr})
    }

    addNewComment(event) {

        this.enableUpdateBtn();

        event.preventDefault();

        const {datatext} = this.props;

        var currentTextID = 'txt' + datatext;

        var newText = jQuery('#' + currentTextID).val();

        if ('' !== newText) {

            try {
                var userID = wp.data.select("core").getCurrentUser().id;
                var userName = wp.data.select("core").getCurrentUser().name;
                var userProfile = wp.data.select("core").getCurrentUser().avatar_urls;
                userProfile = userProfile[Object.keys(userProfile)[1]];
            } catch (e) {
                var userID = localStorage.getItem("userID");
                var userName = localStorage.getItem("userName");
                var userProfile = localStorage.getItem("userURL");
            }

            var arr = this.state.comments;
            var newArr = {};
            newArr['userData'] = userID;
            newArr['thread'] = newText;
            newArr['commentedOnText'] = undefined !== this.commentedOnText ? this.commentedOnText : '';
            newArr['userName'] = userName;
            newArr['profileURL'] = userProfile;
            newArr['status'] = 'draft reverted_back';

            arr.push(newArr);

            const CurrentPostID = wp.data.select('core/editor').getCurrentPostId();

            var el = currentTextID.substring(3);
            var metaId = '_' + el;
            var data = {
                'action': 'cf_add_comment',
                'currentPostID': CurrentPostID,
                'commentList': JSON.stringify(arr),
                'metaId': metaId
            };

            jQuery('#' + el + ' .shareCommentContainer').addClass('loading');
            let _this = this;
            jQuery.post(ajaxurl, data, function (data) {

                jQuery('#' + el + ' .shareCommentContainer').removeClass('loading');

                data = jQuery.parseJSON(data);
                if (undefined !== data.error) {
                    alert(data.error);
                    return false;
                }
                arr[arr.length - 1]['dtTime'] = data.dtTime;
                arr[arr.length - 1]['timestamp'] = data.timestamp;

                // Update hasComment prop for dynamic button text.
                _this.hasComments = 1;

                // Set the state.
                _this.setState({comments: arr});

                // Flushing the text from the textarea
                jQuery('#' + currentTextID).val('');
                jQuery('#' + datatext + ' .no-comments').remove();

            });

        } else alert("Please write a comment to share!")

    }

    displayComments(text, i) {

        const {isActive, inputValue, myval2, value} = this.props; /*onChange*/
        const {lastVal, onChanged, selectedText, suserProfile, suserName} = this.props;

        let username, postedTime, postedComment, profileURL, userID, status, cTimestamp, editedDraft; /*value, onChange*/
        Object.keys(text).map(i => {
            if ('userName' === i) {
                username = text[i];
            } else if ('dtTime' === i) {
                postedTime = text[i];
            } else if ('thread' === i) {
                postedComment = text[i];
            } else if ('profileURL' === i) {
                profileURL = text[i];
            } else if ('userData' === i) {
                userID = text[i];
            } else if ('status' === i) {
                status = text[i];
            } else if ('timestamp' === i) {
                cTimestamp = text[i];
            } else if ('editedDraft' === i) {
                editedDraft = text[i];
            }
        });

        return (

            <Comment
                key={i}
                index={i}
                removeCommentFromBoard={this.removeComment}
                updateCommentFromBoard={this.updateComment}
                userName={username}
                dateTime={postedTime}
                profileURL={profileURL}
                userID={userID}
                status={status}
                lastVal={lastVal}
                onChanged={onChanged}
                /*lastVal={value}
                onChanged={onChange}*/
                selectedText={selectedText}
                timestamp={cTimestamp}
                editedDraft={editedDraft}
            >{
                postedComment = postedComment ? postedComment : text
            }
            </Comment>

        );

    }

    cancelComment() {
        const {datatext, onChanged, lastVal} = this.props;
        const name = 'multidots/comment';
        jQuery('#'+ datatext).removeClass('focus');

        if ( 0 === jQuery('#'+ datatext + ' .boardTop .commentContainer').length ) {
            onChanged(removeFormat(lastVal, name));
        }

    }

    render() {
        const {isActive, inputValue, onChange, value, myval2, selectedText, datatext} = this.props;
        const buttonText = 1 === this.hasComments && 1 !== this.props.freshBoard ? 'Reply' : 'Comment';

        return (
            <div className="board">
                <div className="boardTop">
                    {0 === this.hasComments &&
                    <div className="no-comments"><i>The are no comments!</i></div>
                    }
                    {
                        this.state.comments && this.state.comments.map((item, index) => {
                            return this.displayComments(item, index);
                        })
                    }
                </div>

                <div className="shareCommentContainer">
                    <textarea id={"txt" + datatext} placeholder="Write a comment.."></textarea>
                    <button onClick={this.addNewComment} className="btn btn-success">{buttonText}</button>
                    <button onClick={this.cancelComment} className="btn btn-cancel">Cancel</button>
                </div>
            </div>


        );
    }
}
