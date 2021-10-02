import {Component} from 'react'
import './index.css'

class Form extends Component {
  state = {usersList: [], postList: [], commentsList: []}

  componentDidMount() {
    this.getUsers()
  }

  onUsers = event => {
    const selectedUserId = parseInt(event.target.value)
    this.getPosts(selectedUserId)
  }

  onPosts = event => {
    const selectedPostId = parseInt(event.target.value)
    console.log(selectedPostId)
    this.getComments(selectedPostId)
  }

  getComments = async selectedPostId => {
    const url = 'https://jsonplaceholder.typicode.com/comments'
    const response = await fetch(url)
    const data = await response.json()
    const commentsData = data.filter(
      eachComment => eachComment.postId === selectedPostId,
    )
    console.log(commentsData)
    const updatedCommentData = commentsData.map(eachComment => ({
      commentId: eachComment.id,
      comment: eachComment.body,
    }))
    this.setState({commentsList: updatedCommentData})
  }

  getPosts = async selectedUserId => {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    const response = await fetch(url)
    const data = await response.json()
    const postData = data.filter(eachPost => eachPost.userId === selectedUserId)
    const updatedPostData = postData.map(eachResult => ({
      postId: eachResult.id,
      title: eachResult.title.slice(0, 15),
    }))
    this.setState({postList: updatedPostData})
  }

  getUsers = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users'
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.map(eachUser => ({
      userId: eachUser.id,
      name: eachUser.name,
      userName: eachUser.username,
    }))
    this.setState({usersList: updatedData})
  }

  render() {
    const {usersList, postList, commentsList} = this.state
    console.log(postList)

    return (
      <div className="container">
        <div className="sub-container">
          <h1 className="heading">COMMENTS</h1>
          <form>
            <label htmlFor="user" className="label-name">
              UsersList
            </label>
            <select onChange={this.onUsers} id="user" className="select">
              {usersList.length > 0 ? (
                usersList.map(eachUser => (
                  <option value={eachUser.userId} key={eachUser.userId}>
                    {eachUser.userName}
                  </option>
                ))
              ) : (
                <option>Users</option>
              )}
            </select>
            <label htmlFor="post" className="label-name">
              PostsList
            </label>
            <select onChange={this.onPosts} id="post" className="select">
              {postList.map(eachPost => (
                <option value={eachPost.postId} key={eachPost.postId}>
                  {eachPost.title}
                </option>
              ))}
            </select>
          </form>
          <div className="comments-container">
            {commentsList.map(eachComment => (
              <p key={eachComment.commentId} className="comment">
                {eachComment.comment}
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default Form
