const mongoose = require('mongoose')
const Blog = require('../models/blog')
const config = require('./config')

mongoose.connect(config.TEST_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const addBlogs = async (blogs) => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
}

const initialBlogs = [
  {
    title: 'First blog',
    author: 'Author One',
    url: 'http://example.com/first',
    likes: 1
  },
  {
    title: 'Second blog',
    author: 'Author Two',
    url: 'http://example.com/second',
    likes: 2
  }
]

const addInitialBlogs = async () => {
  await addBlogs(initialBlogs)
}

module.exports = {
  addBlogs,
  addInitialBlogs,
  initialBlogs
}