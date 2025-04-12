const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)


  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

const mongoose = require('mongoose');

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ error: 'malformatted id' });
    }
  
    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    await Blog.deleteOne({ _id: id });

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const { likes } = request.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'malformatted id' })
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true, runValidators: true, context: 'query' }
    )

    if (!updatedBlog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})


module.exports = blogsRouter