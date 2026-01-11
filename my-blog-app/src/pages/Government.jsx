import Mini_hero from "../components/Mini_hero"
import { useEffect, useState } from "react"
import axios from "axios"
import styles from "./Page.module.css"
import { toast } from "react-toastify"

function BlogCard({blog}) {
    const [count, setCount] = useState({
        likes: 0,
        hearts: 0,
        laughs: 0,
        dislikes: 0,
    })
    const react = async (type) => {
        const blogId = blog.id;
        try {
            await axios.post(`/api/government/reactions/${blogId}`, {reaction: type}, {withCredentials: true})
        } catch (err) {
            toast.error("Please sign in to react");
        }
    }

    useEffect(() => {
        const blogId = blog.id;
        const getReactions = async () => {

            const res = await axios.get(`/api/government/reactions/${blogId}`)
            setCount({
                likes: res.data.likes,
                hearts: res.data.hearts,
                laughs: res.data.laughs,
                dislikes: res.data.dislikes,
            })

        }
        getReactions();
    }, [react])
    return (
        <div className={styles.blog}>
            {new Date(blog.posted_at).toDateString()}
            <h2>{blog.title}</h2>
            <img src={blog.image} />
            <div id="rate-btn">
                <button onClick={() => react("like")}><i className="fa-solid fa-thumbs-up"></i><span>{count.likes}</span></button>
                <button onClick={() => react("heart")}><i className="fa-solid fa-heart"></i><span>{count.hearts}</span></button>
                <button onClick={() => react("laugh")}><i className="fa-solid fa-face-laugh"></i><span>{count.laughs}</span></button>
                <button onClick={() => react("dislike")}><i className="fa-solid fa-thumbs-down"></i><span>{count.dislikes}</span></button>
            </div>
            <h3><span>By </span>{blog.author}</h3>
            <p>{blog.content}</p>
        </div>
    )
}


export default function Government() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getBlogs = async () => {
            const res = await axios.get("/api/government")
            if (res.data.blogs) {
                setBlogs(res.data.blogs)
            }
        }
        getBlogs();
    }, [])
    return (
        <>
        <Mini_hero state="Government" />
        {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog}/>
        ))}
        </>
    )
}