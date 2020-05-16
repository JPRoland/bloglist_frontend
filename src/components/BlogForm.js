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
    <form onSubmit={addBlog}>
      <div>
        title:{' '}
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        author:{' '}
        <input
          type="text"
          value={author}
          placeholder="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url:{' '}
        <input
          type="text"
          value={url}
          placeholder="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm
