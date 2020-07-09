const {Fragment} = wp.element;
import React from 'react'
import PropTypes from 'prop-types';
 
export default class Comment extends React.Component {

    constructor(props) {

        super(props);

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.resolve = this.resolve.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.state = {editing: false, showEditedDraft: false};

    }

    edit() {
        this.setState({editing: true})
    }

    save(event) {

        var newText = this.newText.value;
        if ('' === newText) {
            alert("Please write a comment to share!");
            return false;
        }
        var elID = event.currentTarget.parentElement.parentElement.parentElement.parentElement.id;
        this.props.updateCommentFromBoard(newText, this.props.index, this.props.timestamp, this.props.dateTime, elID);

        this.setState({editing: false})
    }

    remove(event) {

        if (confirm('Are you sure you want to delete this comment ?')) {
            var elID = jQuery(event.currentTarget).closest('.cls-board-outer');
            //	var elID = event.currentTarget.parentElement.parentElement.parentElement.id;

            this.props.removeCommentFromBoard(this.props.index, this.props.timestamp, elID[0].id);
        }
    }

    resolve(event) {
        //const myvalue = this.props.myval2;
        if (confirm('Are you sure you want to resolve this thread ?')) {
            var elID = jQuery(event.currentTarget).closest('.cls-board-outer');
            elID = elID[0].id;
            var elIDRemove = elID;
            const CurrentPostID = wp.data.select('core/editor').getCurrentPostId();
            elID = '_' + elID;

            var data = {
                'action': 'cf_resolve_thread',
                'currentPostID': CurrentPostID,
                'metaId': elID
            };
            // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
            jQuery.post(ajaxurl, data, function () {
                jQuery('div#' + elIDRemove).remove();
            });

            // Remove Tag.
            this.removeTag(elIDRemove);
        }
    }

    removeTag(elIDRemove) {

        const clientId = jQuery('[datatext="' + elIDRemove + '"]').parents('[data-block]').attr('data-block');

        const blockAttributes = wp.data.select('core/block-editor').getBlockAttributes(clientId);
        const { content } = blockAttributes;
        if ( '' !== content ) {
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            let childElements = tempDiv.getElementsByTagName('mdspan');
            for ( let i = 0; i < childElements.length; i++ ) {
                if ( elIDRemove === childElements[i].attributes.datatext.value ) {
                    childElements[i].parentNode.replaceChild(document.createTextNode(childElements[i].innerText), childElements[i]);
                    let finalContent = tempDiv.innerHTML;
                    wp.data.dispatch( 'core/editor' ).updateBlock( clientId, {
                        attributes: {
                            content: finalContent
                        }
                    });
                    break;
                }
            }
        }
    }

    cancelEdit() {
        this.setState({editing: false})
    }

    renderNormalMode() {
        const {index} = this.props;
        const commentStatus = this.props.status ? this.props.status : 'draft';

        var owner = '';
        try {
            owner = wp.data.select("core").getCurrentUser().id;
        } catch (e) {
            owner = localStorage.getItem("userID");
        }

        let str = this.state.showEditedDraft ? this.props.editedDraft : this.props.children;
        let readmoreStr = '';
        const maxLength = 100;
        if(maxLength < str.length) {
            readmoreStr = str;
            str = str.substring(0, maxLength) + '...';
        }

        return (
            <div className={"commentContainer " + commentStatus} id={this.props.timestamp}>
                <div className="comment-header">
                    <div className="comment-actions">
                        {index === 0 &&
                            <div className="comment-resolve">
                                <input id="resolve_cb" type="checkbox" onClick={this.resolve.bind(this)} className="btn-comment" value="1" />
                                <label for="resolve_cb">{'Resolve'}</label>
                            </div>
                        }
                        {this.props.userID === owner &&
                            <div className="buttons-wrapper">
                                <i className="dashicons dashicons-edit" onClick={this.edit}></i>
                                <i className="dashicons dashicons-trash" onClick={index === 0 ? this.resolve.bind(this) : this.remove.bind(this)}></i>
                            </div>
                        }
                    </div>
                    <div className="comment-details">
                        <div className="avtar"><img src={this.props.profileURL} alt="avatar"/></div>
                        <div className="commenter-name-time">
                            <div className="commenter-name">{this.props.userName}</div>
                            <div className="comment-time">{this.props.dateTime}</div>
                        </div>
                    </div>
                </div>
                <div className="commentText">
                    <span className='readlessTxt readMoreSpan active'>{str} {'' !== readmoreStr && <a className='readmoreComment' href='javascript:void(0)'>read more</a>}</span>
                    <span className='readmoreTxt readMoreSpan'>{readmoreStr} {'' !== readmoreStr && <a className='readlessComment' href='javascript:void(0)'>show less</a>}</span>
                </div>
            </div>
        );
    }

    renderEditingMode() {
        return (
            <div className="commentContainer">
                <div className="commentText">
                  <textarea
                      ref={(input) => {
                          this.newText = input;
                      }}
                      onChange={this.handleChange}
                      defaultValue={this.state.showEditedDraft ? this.props.editedDraft : this.props.children}>
                  </textarea>
                </div>
                <button onClick={this.save.bind(this)} className="btn-comment">
                    {'Save'}
                </button>
                <button onClick={this.cancelEdit.bind(this)} className="btn-comment">
                    {'Cancel'}
                </button>
            </div>
        );
    }

    render() {

        if (this.state.editing) {
            return this.renderEditingMode();
        } else {
            return this.renderNormalMode();
        }
    }
}

// Typecheck.
Comment.propTypes = {
    key: PropTypes.number,
    index: PropTypes.number,
    removeCommentFromBoard: PropTypes.func,
    updateCommentFromBoard: PropTypes.func,
    userName: PropTypes.string,
    dateTime: PropTypes.string,
    profileURL: PropTypes.string,
    userID: PropTypes.number,
    status: PropTypes.string,
    lastVal: PropTypes.object,
    onChanged: PropTypes.func,
    selectedText: PropTypes.string,
    timestamp: PropTypes.string,
    editedDraft: PropTypes.string,
    children: PropTypes.string,
};