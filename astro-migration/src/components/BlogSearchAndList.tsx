import { useState } from 'preact/hooks'

const BlogSearchAndList = ({ allPosts }) => {
  // This is where we store the list of posts that have been filtered
  // i.e filtered by query (text) or tags (filterTags)
  const [filteredData, setFilteredData] = useState(null)

  // query is used to keep track of the text filter
  const [query, setQuery] = useState('')

  // This is called when a user types inside the input field
  const handleInputChange = (event: any) => {
    // Grab the value from the input
    const currentQuery = event.target.value

    setQuery(currentQuery)

    // We use currentQuery instead of query because React state upates are async
    // we need the latest version so we're not a step behind.
    // We also only want to use filteredData if it's not null
    // Otherwise, data has yet to be filtered, so we use allPosts
    const posts =
      currentQuery !== '' && filteredData !== null ? filteredData : allPosts
    handleFilteredData(currentQuery, posts)
  }

  // The main purpose of this function is to handle updates to filteredData
  // we pass in the query, the filterTags and the posts
  // We prefix it with '_' so that it doesn't conflict with the equivalent state name
  const handleFilteredData = (_query: string, posts: any[] | null) => {
    // We keep updatedData in the outermost scope of the function so that we can
    // update it in from within these if blocks
    let updatedData: any[] | null = posts

    if (updatedData !== null && _query !== '') {
      updatedData = updatedData.filter(post => {
        const title = post.title
        const excerpt = post.description || ''

        // Here, we check if the query matches any words in the excerpt or title
        return (
          excerpt.toLowerCase().includes(query.toLowerCase()) ||
          title.toLowerCase().includes(query.toLowerCase())
        )
      })
    }

    // We then take this data and save it to state
    setFilteredData(updatedData)
  }

  // We start off by showing allPosts if there is no filteredData
  const posts = filteredData !== null ? filteredData : allPosts

  return (
    <div>
      <div className="border-box flex flex-row items-center justify-content-center mt-4 w-100">
        <input
          aria-label="article search"
          type="text"
          id="filter"
          placeholder="Type to filter articles..."
          onChange={handleInputChange}
          className="mt-0 w-90"
        />
        <span className="bold text-center w-10">{posts.length}</span>
      </div>
      {posts.map(post => (
        <div>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </div>
      ))}
      <hr className="m-50" />
    </div>
  )
}

export default BlogSearchAndList
