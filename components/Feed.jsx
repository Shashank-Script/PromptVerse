'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
             {data.map((post) => (
                 <PromptCard
                 key = {post._id}
                 post = {post}
                 handleTagClick = {handleTagClick}
                 />
            ))}
        </div>
    )
}
function Feed() {

    const [allposts, setAllPosts] = useState([]);
    //search states
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);
    
    //fetching all posts
    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setAllPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, [])

    //filtering post by search text
    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, 'i');
        return allposts.filter(
            (item) => regex.test(item.creator.username) ||
            regex.test(item.prompt) || 
            regex.test(item.tag));
    }
    
    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);
        //debouncing search
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500),
        );
    }

    const handleTagClick = (tagName) => {
        setSearchText(tagName);
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    }

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input 
                type="text"
                placeholder='Search for a tag or a username'
                className='search_input peer'
                value = {searchText}
                onChange = {handleSearchChange}
                required
                 />
            </form>

            {searchText ? (
                <PromptCardList
                data = {searchedResults}
                handleTagClick = {handleTagClick}
                />
            ) : (
                <PromptCardList
                data = {allposts}
                handleTagClick = {handleTagClick}
                />
            )}
        </section>
    )
}

export default Feed
