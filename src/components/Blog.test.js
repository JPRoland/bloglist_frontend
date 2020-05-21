import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    url: 'http://testurl.com',
    title: 'Test Title',
    author: 'Test Author',
    likes: 5,
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('Test Title')
  expect(component.container).toHaveTextContent('Test Author')
  expect(component.container).not.toHaveTextContent('http://testurl.com')
})

test('clicking the view button exposes the correct fields', () => {
  const blog = {
    url: 'http://testurl.com',
    title: 'Test Title',
    author: 'Test Author',
    likes: 5,
    user: {
      name: 'Test User',
    },
  }

  const component = render(<Blog blog={blog} />)

  const button = component.getByText('View')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('http://testurl.com')
  expect(component.container).toHaveTextContent('Likes')
})

test('clicking the like button triggers the event handler', () => {
  const blog = {
    url: 'http://testurl.com',
    title: 'Test Title',
    author: 'Test Author',
    likes: 5,
    user: {
      name: 'Test User',
    },
  }

  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} likeBlog={mockHandler} />)

  const button = component.getByText('View')
  fireEvent.click(button)

  const likeButton = component.container.querySelector('.btn-like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
