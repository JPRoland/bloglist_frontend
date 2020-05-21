import React, { useState } from 'react'
const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogInfoStyle = {
    margin: 0,
  }

  const addLike = (e) => {
    e.preventDefault()

    likeBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
  }

  const handleDelete = (e) => {
    e.preventDefault()

    if (!window.confirm(`Deleting blog ${blog.title} by ${blog.author}`)) {
      return
    }

    deleteBlog(blog.id)
  }

  const blogInfo = () => (
    <div>
      <p style={blogInfoStyle}>URL {blog.url}</p>
      <p style={blogInfoStyle}>
        Likes {blog.likes}{' '}
        <button className="btn-like" onClick={addLike}>
          Like
        </button>
      </p>
      <p style={blogInfoStyle}>Posted By {blog.user.name}</p>
      <button onClick={handleDelete}>Remove</button>
    </div>
  )

  return (
    <div style={blogStyle} className="blog">
      {blog.title} by {blog.author}{' '}
      <button onClick={() => setVisible(!visible)}>
        {!visible ? 'View' : 'Hide'}
      </button>
      {visible && blogInfo()}
    </div>
  )
}

export default Blog
