import Mini_hero from "../components/Mini_hero"
import { useEffect, useState } from "react"
import api from "../api/axios.js";
import styles from "./Page.module.css"
import { toast } from "react-toastify"
import { formatDistanceToNow } from "date-fns";

function BlogCard({blog}) {
    const [loading, setLoading] = useState(false)

    const [count, setCount] = useState({
        likes: null,
        hearts: null,
        laughs: null,
        dislikes: null,
    })

    const formatCount = (num) => {
    return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
    }).format(num);
    };


    const timeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });

    };

    const react = async (type) => {
        const blogId = blog.id;

        if(loading) return;
        setLoading(true)
        setCount(prev => ({
            ...prev,
            [type]: prev[type] + 1
        }));

        try {
            await api.post(`/api/inside/reactions/${blogId}`, {reaction: type});
        } catch (err) {
            setCount(prev => ({
            ...prev,
            [type]: prev[type] - 1
            }));
            toast.error("Please sign in to react");
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getReactions = async () => {
        const blogId = blog.id;
            const res = await api.get(`/api/inside/reactions/${blogId}`)
            setCount({
                likes: Number(res.data.likes),
                hearts: Number(res.data.hearts),
                laughs: Number(res.data.laughs),
                dislikes: Number(res.data.dislikes),
        })
        }
        getReactions();
    }, [blog.id])


    return (
        <div className={styles.blog}>
            <small>{timeAgo(blog.posted_at)}</small>
            <h2>{(blog.title).toUpperCase()}</h2>
            <img src={blog.image}/>
            <div id="rate-btn" className={styles.rate}>
                <button onClick={() => react("like")}><i style={{color: "green"}} className="fa-solid fa-thumbs-up"></i><span>{formatCount(count.likes)}</span></button>
                <button onClick={() => react("heart")}><i style={{color: "red"}} className="fa-solid fa-heart"></i><span>{formatCount(count.hearts)}</span></button>
                <button onClick={() => react("laugh")}><i style={{color: "gold"}} className="fa-solid fa-face-laugh"></i><span>{formatCount(count.laughs)}</span></button>
                <button onClick={() => react("dislike")}><i style={{color: "teal"}} className="fa-solid fa-thumbs-down"></i><span>{formatCount(count.dislikes)}</span></button>
            </div>
            <h4>Posted By <span>{(blog.author).toLowerCase()}</span></h4>
            <p>{blog.content}</p>
            <div className={styles.share}>
                <button type="button">Share <i className="fa-solid fa-share"></i></button>
            </div>
        </div>
    )
}


export default function Inside() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);


    const getBlogs = async (selectedDate) => {
        try {
            setLoading(true)
            const res = await api.get(`/api/inside?date=${selectedDate}`)
            setBlogs(res.data.blogs)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBlogs(date)
    }, [date])

    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    const goToNextDay = () => {
        const next = new Date(date);
        next.setDate(next.getDate() + 1);
        setDate(next.toISOString().split("T")[0]);
    }

    const goToPreviousDay = () => {
        const prev = new Date(date);
        prev.setDate(prev.getDate() - 1);
        setDate(prev.toISOString().split("T")[0]);
    }

    return (
        <>
        <Mini_hero state="Inside Naija" />
        <div className={styles.blogsNavigation}>
        <button onClick={goToPreviousDay} type="button">Previous day</button>
        <input
            type="date"
            value={date}
            onChange={handleDateChange}
        />
        <button onClick={goToNextDay} type="button">Next day</button>
        </div>
        {loading ? (<p className={styles.noBlogsForDate}>Loading...</p> 
        ) : (blogs.length === 0 ? (
            <p className={styles.noBlogsForDate}>No blogs found for this date.</p>
        ) : (
            blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog}/>
        ))
        )

        )}
        </>
    )
}