import React, { useContext, useEffect, useState } from "react";

import "./PostDetails.css";
import fetch from "../../utilities/fetch";
import { Post } from "../PostCard/PostCard";
import ReplyCard from "../../components/ReplyCard";
import { User } from "../../context/userContext";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { UserContext } from "../../context/userContext";

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | undefined>();
    const [poster, setPoster] = useState<User | undefined>();
    const [replies, setReplies] = useState<any>([]);
    const user = useContext(UserContext);
    const [isOwner, setIsOwner] = useState(false);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const getPost = async () => {
            try {
                const result = await fetch("get", `/posts/${id}`);
                const foundPost = result.post;
                const pPost = await fetch("get", `/users/${foundPost.postedBy}`);
                setPoster(pPost.user);
                setPost(foundPost);
                setIsOwner(user?.itemID == foundPost.postedBy);
                setReplies(foundPost.replies.map((post: any) => <ReplyCard reply={post} key={post.itemID}/>));
                const total = foundPost?.likedBy.reduce((n:any, {like}:any) => n + like, 0);
                setLikes(total);
            } catch { }
        };
        getPost();
    }, [id]);

    useEffect(() => {
    }, [likes]);

    async function like(){
        try{
            await fetch("PATCH", `/posts/${id}/likes`, {}, {like: 1});
            const result = await fetch("get", `/posts/${id}`);
            const foundPost = result.post;
            setPost(foundPost);
            const total = foundPost?.likedBy.reduce((n:any, {like}:any) => n + like, 0);
            setLikes(total);
        }
        catch{}
    }

    async function dislike(){
        try{
            await fetch("PATCH", `/posts/${id}/likes`, {}, {like: -1});
            const result = await fetch("get", `/posts/${id}`);
            const foundPost = result.post;
            setPost(foundPost);
            const total = foundPost?.likedBy.reduce((n:any, {like}:any) => n + like, 0);
            setLikes(total);
        }
        catch{}
    }

    return (
        <div className="no-deco post-card">
            {
                post ?
                    <>
                        <div>{poster?.username}</div>
                        <h3 className="post-title">{post.title}</h3>
                        <div className="post-song">
                            <img className="song-image" src={post.song?.image} alt="album cover" />
                            <h4 className="song-name">{post.song?.name}</h4>
                        </div>
                        <div className="post-metadata flex align-cent justify-between">
                            <span>Score: {post.score}/100</span>
                            <span>
                                <button onClick={like}>Like</button>
                                | {likes} |
                                <button onClick={dislike}>Dislike</button>
                            </span>
                        </div>
                        <p>
                            {post.description}
                        </p>
                        <div className="post-metadata flex align-cent justify-between">
                            {post.tags &&
                                <span>Tags: {
                                    Object.keys(post.tags).map((tag: string) => <>{tag} </>)
                                }</span>}
                            {isOwner && <Link to={`/posts/${id}/update`}>Edit</Link>}
                        </div>
                        <div className="post-metadata flex align-cent justify-between">
                            {user?.itemID && <Link to={`/posts/${id}/reply`}>Comment</Link>}
                        </div>
                        <div>{replies}</div>
                    </>
                    :
                    <p>Loading / Post Not Found</p>
            }
        </div>
    );
}

interface Props {
    post: Post
}

export default PostDetails;