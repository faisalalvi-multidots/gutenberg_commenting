const {Fragment} = wp.element;
const {removeFormat} = wp.richText;

export default class SuggestionComment extends React.Component {

  constructor(props) {

    super(props);

    this.editComment = this.editComment.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.removeSuggestion = this.removeSuggestion.bind(this);
    this.acceptSuggestion = this.acceptSuggestion.bind(this);
    this.state = {editing: false};
  }

  editComment() {
    this.setState({editing: true})
  }

  saveComment(event) {
    let newText = this.newText.value;
    if ( '' === newText) {
      alert('Please write a comment to update!');
      return false;
    }
    this.props.updateCommentFromBoard( newText, this.props.index );

    this.setState({editing: false})
  }

  removeComment(event) {

    if ( confirm('Are you sure you want to delete this comment?') ) {
      this.props.removeCommentFromBoard( this.props.index );
    }
  }

  cancelEdit() {
    this.setState({editing: false});
  }

  removeSuggestion() {
    const { clientId, suggestionID } = this.props;
    const blockAttributes = wp.data.select('core/block-editor').getBlockAttributes(clientId);
    const { oldClientId, content } = blockAttributes;
    if ( '' !== oldClientId && '' !== content ) {
      let suggestionHistory = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_suggestion_history'];
      if ( 0 < suggestionHistory.length ) {
        suggestionHistory = JSON.parse(suggestionHistory);
        let findItem = 'id="' + suggestionID + '"';
        if ( suggestionHistory[oldClientId][suggestionID] && -1 !== content.indexOf(findItem) ) {
          let action = suggestionHistory[oldClientId][suggestionID][0].action;
          let tempDiv = document.createElement('div');
          tempDiv.innerHTML = content;
          let childElements = 'add' === action.toLowerCase() ? tempDiv.getElementsByTagName('ins') : tempDiv.getElementsByTagName('del');
          for ( let i = 0; i < childElements.length; i++ ) {
            if ( undefined !== childElements[i].id && suggestionID === childElements[i].id ) {
              if ( 'add' === action.toLowerCase() ) {
                tempDiv.removeChild(childElements[i]);
              } else {
                tempDiv.replaceChild(document.createTextNode(childElements[i].innerText), childElements[i]);
              }
              delete suggestionHistory[oldClientId][suggestionID];
              let finalContent = tempDiv.innerHTML;
              wp.data.dispatch( 'core/editor' ).updateBlock( clientId, {
                attributes: {
                  content: finalContent
                }
              });
              document.getElementById('sg' + suggestionID ).remove();
              wp.data.dispatch('core/editor').editPost({meta: {sb_suggestion_history: JSON.stringify(suggestionHistory) } });
              break;
            }
          }
        }
      }
    }
  }

  acceptSuggestion() {
    const { clientId, suggestionID } = this.props;
    const blockAttributes = wp.data.select('core/block-editor').getBlockAttributes(clientId);
    const { oldClientId, content } = blockAttributes;
    if ( '' !== oldClientId && '' !== content ) {
      let suggestionHistory = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_suggestion_history'];
      if ( 0 < suggestionHistory.length ) {
        suggestionHistory = JSON.parse(suggestionHistory);
        let findItem = 'id="' + suggestionID + '"';
        if ( suggestionHistory[oldClientId][suggestionID] && -1 !== content.indexOf(findItem) ) {
          let action = suggestionHistory[oldClientId][suggestionID][0].action;
          let tempDiv = document.createElement('div');
          tempDiv.innerHTML = content;
          let childElements = 'add' === action.toLowerCase() ? tempDiv.getElementsByTagName('ins') : tempDiv.getElementsByTagName('del');
          for ( let i = 0; i < childElements.length; i++ ) {
            if ( undefined !== childElements[i].id && suggestionID === childElements[i].id ) {
              if ( 'add' === action.toLowerCase() ) {
                tempDiv.replaceChild(document.createTextNode(childElements[i].innerText), childElements[i]);
              } else {
                tempDiv.removeChild(childElements[i]);
              }
              delete suggestionHistory[oldClientId][suggestionID];
              let finalContent = tempDiv.innerHTML;
              wp.data.dispatch( 'core/editor' ).updateBlock( clientId, {
                attributes: {
                  content: finalContent
                }
              });
              document.getElementById('sg' + suggestionID ).remove();
              wp.data.dispatch('core/editor').editPost({meta: {sb_suggestion_history: JSON.stringify(suggestionHistory) } });
              break;
            }
          }
        }
      }
    }
  }

  renderNormalMode() {
    const { userName, profileURL, dateTime, action, userID, index } = this.props;

    let owner = wp.data.select("core").getCurrentUser().id;
    return (
      <div className="commentContainer">
        <div className="comment-header">
          <div className="avtar"><img src={profileURL} alt="avatar"/></div>
          <div className="commenter-name-time">
            <div className="commenter-name">{userName}</div>
            <div className="comment-time">{dateTime}</div>
          </div>
          {index === 0 &&
            <div className="suggest-box-action">
              <button onClick={this.acceptSuggestion.bind(this)} className="btn-add-suggestion">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></svg>
              </button>
              <button onClick={this.removeSuggestion.bind(this)} className="btn-remove-suggestion">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
              </button>
            </div>
          }
          { 'reply' === action &&

            <div className="buttons-holder">
              <div className="buttons-opner">
                <Fragment>
                  { userID === owner &&
                  <svg aria-hidden="true" role="img" focusable="false" className="dashicon dashicons-ellipsis"
                       xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <path
                      d="M5 10c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-7 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                  </svg>
                  }
                </Fragment>
              </div>
              <Fragment>
                { userID === owner &&
                <div className="buttons-wrapper">
                  <button onClick={this.editComment} className="btn btn-comment">
                    {'Edit'}
                  </button>
                  <button onClick={this.removeComment.bind(this)} className="btn btn-comment">
                    {'Delete'}
                  </button>
                </div>
                }
              </Fragment>
            </div>
          }
        </div>
        <div className="commentText">{this.props.children}</div>
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
            defaultValue={this.props.children[0]}
          >
          </textarea>
        </div>
        <button onClick={this.saveComment.bind(this)} className="btn-comment">
          {'Save'}
        </button>
        <button onClick={this.cancelEdit.bind(this)} className="btn-comment">
          {'Cancel'}
        </button>
      </div>
    );
  }

  render() {
    return this.state.editing ? this.renderEditingMode() : this.renderNormalMode();
  }
}
