const mongoose = require('mongoose')
const Blog = require('./models/blog')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://oonanykanen:${password}@cluster0.je8xz.mongodb.net/Fullstack_4_TEST?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
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

  Blog.deleteMany({}).then(() => {
    Blog.insertMany(initialBlogs).then(() => {
      console.log('blogs added!')
      mongoose.connection.close()
    })
  })
})