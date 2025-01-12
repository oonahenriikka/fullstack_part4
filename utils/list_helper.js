const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorBlogCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1
    return acc
  }, {})

  const mostBlogsAuthor = Object.keys(authorBlogCounts).reduce((prev, current) => {
    return (authorBlogCounts[prev] > authorBlogCounts[current]) ? prev : current
  })

  return {
    author: mostBlogsAuthor,
    blogs: authorBlogCounts[mostBlogsAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikeCounts = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes
    return acc
  }, {})

  const mostLikesAuthor = Object.keys(authorLikeCounts).reduce((prev, current) => {
    return (authorLikeCounts[prev] > authorLikeCounts[current]) ? prev : current
  })

  return {
    author: mostLikesAuthor,
    likes: authorLikeCounts[mostLikesAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}