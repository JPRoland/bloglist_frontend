import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errFlag, setErrorFlag] = useState(false)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = React.createRef()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrorFlag(true)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObj) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObj)
      setBlogs(blogs.concat(blog))
      setErrorFlag(false)
      setErrorMessage(`Added ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (err) {
      setErrorFlag(true)
      setErrorMessage(err.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setErrorFlag(false)
      setErrorMessage('Successfully removed blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (err) {
      setErrorFlag(true)
      setErrorMessage(err.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = async (id, blogObj) => {
    try {
      const blog = await blogService.update(id, blogObj)
      setBlogs(blogs.map((b) => (b.id === id ? blog : b)))
      setErrorFlag(false)
      setErrorMessage(`Liked ${blog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      setErrorFlag(true)
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} errFlag={errFlag} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in{' '}
            <button
              onClick={() =>
                window.localStorage.removeItem('loggedBlogappUser')
              }
            >
              Logout
            </button>
          </p>

          <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggleable>

          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={addLike}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
