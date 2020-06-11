import SuggestionComment from "./suggestion-comment";

const {removeFormat} = wp.richText;
const {Fragment} = wp.element;

export default class SuggestionBoard extends React.Component {

  constructor(props) {

    super(props);
    this.displayComments = this.displayComments.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.addNewComment = this.addNewComment.bind(this);

    this.state = {suggestedOnText: this.props.suggestedOnText};
  }

  removeComment( index ) {
    const { oldClientId, suggestionID } = this.props;
    let currentBoardSuggestion = this.state.suggestedOnText;
    let suggestionHistory = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_suggestion_history'];
    suggestionHistory = JSON.parse(suggestionHistory);
    currentBoardSuggestion.splice(index, 1);
    suggestionHistory[oldClientId][suggestionID] = currentBoardSuggestion;
    wp.data.dispatch('core/editor').editPost({meta: {sb_suggestion_history: JSON.stringify(suggestionHistory) } });
    this.setState({suggestedOnText: currentBoardSuggestion});
  }

  updateComment(newText, index ) {
    const { oldClientId, suggestionID } = this.props;
    let currentBoardSuggestion = this.state.suggestedOnText;
    let suggestionHistory = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_suggestion_history'];
    suggestionHistory = JSON.parse(suggestionHistory);
    currentBoardSuggestion[index]['text'] = newText;
    suggestionHistory[oldClientId][suggestionID] = currentBoardSuggestion;
    wp.data.dispatch('core/editor').editPost({meta: {sb_suggestion_history: JSON.stringify(suggestionHistory) } });
    this.setState({suggestedOnText: currentBoardSuggestion});
  }

  addNewComment(event) {
    event.preventDefault();

    const { suggestionID, oldClientId } = this.props;
    let currentTextID = 'txt' + suggestionID;
    let newText = jQuery('#' + currentTextID).val();

    if ( '' !== newText ) {
      const currentUser = wp.data.select('core').getCurrentUser().id;
      const userName = wp.data.select('core').getCurrentUser().name;
      const userAvtars = wp.data.select('core').getCurrentUser().avatar_urls;
      const avtarUrl = userAvtars[Object.keys(userAvtars)[1]];

      let suggestionHistory = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' )['sb_suggestion_history'];
      suggestionHistory = JSON.parse(suggestionHistory);
      let today = new Date();
      let date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      let dateTime = date + ' ' + time;
      let newCommentInfo = {'name' : userName, 'uid': currentUser, 'avtar': avtarUrl, 'action': 'reply', 'text': newText, 'time': dateTime};
      suggestionHistory[oldClientId][suggestionID].push(newCommentInfo);
      wp.data.dispatch('core/editor').editPost({meta: {sb_suggestion_history: JSON.stringify(suggestionHistory) } });
      jQuery('#' + currentTextID).val('');
      this.setState({suggestedOnText: suggestionHistory[oldClientId][suggestionID]});
    } else {
      alert("Please write a comment to share!")
    }

  }

  displayComments(text, i) {
    const { suggestionID } = this.props;

    return (
      <SuggestionComment
        key={i}
        index={i}
        removeCommentFromBoard={this.removeComment}
        updateCommentFromBoard={this.updateComment}
        userName={text.name}
        dateTime={text.time}
        profileURL={text.avtar}
        userID={text.uid}
        action={text.action}
        suggestionID={suggestionID}
        clientId={this.props.clientId}
      >
        { 'reply' === text.action &&
          text.text
        }
        { 'reply' !== text.action &&
          <Fragment>
            <strong>{text.action}: </strong>
            {text.text}
          </Fragment>
        }
      </SuggestionComment>

    );

  }

  render() {
    const { suggestionID } = this.props;
    return (
      <div className="board">
        <div className="boardTop">
          {
            this.state.suggestedOnText && this.state.suggestedOnText.map((item, index) => {
              return this.displayComments(item, index);
            })
          }
        </div>

        <div className="shareCommentContainer">
          <textarea id={"txt" + suggestionID} placeholder="Reply..."></textarea>
          <button onClick={this.addNewComment} className="btn btn-success">Reply</button>
        </div>
      </div>
    );
  }
}
