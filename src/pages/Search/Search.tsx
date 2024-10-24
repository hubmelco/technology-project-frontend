import React, {useState} from "react";

import "./Search.css";
import SearchForm from "../../components/SearchForm";
import fetch from "../../utilities/fetch";

function Search() {

    const parser = new DOMParser();

    const [error, setError] = useState();
    const [displaySuccess, setDisplaySuccess] = useState(false);
    const [result, setResult] = useState();

    async function search(tags: string, inclusive: string) {
        try {
            setResult(undefined);
            if (inclusive !== "1"){
                inclusive = "0";
            }
            const {Posts} = await fetch("get", `/posts/tags/search?tags=${tags}&inclusive=${inclusive}`);
            console.log(Object.entries(Posts[0]));
            //TODO add post objects
            setResult(Posts.map((post: Object) => <div className="Container" dangerouslySetInnerHTML={{__html: JSON.stringify(post)}}></div>));
            setDisplaySuccess(true);
            setError(undefined);
        } catch (err: any) {
            setError(err.error);
        }
    }

    return (
        <main id="search">
            <h1>Search Posts</h1>
            <SearchForm onSubmit={search} error={error}/>
            {displaySuccess && <h4>Results</h4>}
            {displaySuccess && result}
        </main>
    )
}

export default Search;