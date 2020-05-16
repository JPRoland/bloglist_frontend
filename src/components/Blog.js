import React, { useState } from 'react'
const Blog = ({ blog }) => {
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

  const blogInfo = () => (
    <div>
      <p style={blogInfoStyle}>URL {blog.url}</p>
      <p style={blogInfoStyle}>Likes {blog.likes}</p>
      <p style={blogInfoStyle}>Posted By {blog.user.name}</p>
    </div>
  )

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}{' '}
      <button onClick={() => setVisible(!visible)}>
        {!visible ? 'View' : 'Hide'}
      </button>
      {visible && blogInfo()}
    </div>
  )
}

export default Blog
