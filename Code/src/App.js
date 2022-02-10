import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Pagination from './components/ui/Pagination';
import Search from './components/ui/Search'
import './App.css'

const App = () => {
    const [items, setItems] = useState([])
    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

// Fetching Characters from API
    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true)
            const result = await axios(
                `https://www.breakingbadapi.com/api/characters?name=${query}`
            )

            //   console.log(result.data)

            setItems(result.data)
            setIsLoading(false)
        }

        fetchItems()
    }, [query])

// fetching quotes from API
    useEffect(() => {
        fetchQuotes()
        async function fetchQuotes() {
            setIsLoading(true)
            const res = await fetch(
                `https://www.breakingbadapi.com/api/quote/random`
            )
            const data = await res.json();

            setQuotes(data)
            setIsLoading(false)
        }


    }, [])




    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='container'>
            <Header />
            <Search getQuery={(q) => setQuery(q)} />
            
            <div className="random-quote">
            <h1>A random <span style={{color:"#107042"}}> Quote </span>from the series</h1>
            <div style={{ height: "25px" }}></div>
            
        {quotes.map((quote) => (
                <div key={quote.quote_id}>
                    <p className='quote'>{quote.quote}</p>
                    <p className='quote-author'> - {quote.author}</p>
                    <div style={{ height: "20px" }}></div>
                </div>

            ))}
            </div>

            <div style={{ height: "30px" }}></div>

            <CharacterGrid isLoading={isLoading} items={currentPosts} quotes={quotes} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={items.length}
                paginate={paginate}
            />
            <div style={{ height: "40px" }}></div>

    



          
        </div>
    )
}

export default App