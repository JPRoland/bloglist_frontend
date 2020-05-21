import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      author,
      title,
      url,
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div className="formDiv">
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author:{' '}
          <input
            type="text"
            id="author"
            value={author}
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          url:{' '}
          <input
            type="text"
            id="url"
            value={url}
            placeholder="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
