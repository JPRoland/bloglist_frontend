import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('calls event handler with the correct details', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'New Test Title' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'New Test Author' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'New Test URL' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('New Test Author')
  expect(createBlog.mock.calls[0][0].title).toBe('New Test Title')
  expect(createBlog.mock.calls[0][0].url).toBe('New Test URL')
})
