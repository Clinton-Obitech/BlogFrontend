import axios from "axios";
import styles from "./Admin.module.css";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import { useEffect } from "react";
import api from "../api/axios.js";
import { formatDistanceToNow } from "date-fns";

function ViewCard({ view, onEdit, onDelete }) {
    const [count, setCount] = useState({
        likes: 0,
        hearts: 0,
        laughs: 0,
        dislikes: 0,
    });

    const formatCount = (num) => {
    return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
    }).format(num);
    };
    
    
        const timeAgo = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    
        };

    useEffect(() => {
        const blogId = view.id;
        const getReactions = async () => {
            const res = await api.get(`/api/inside/reactions/${blogId}`)
            setCount({
                likes: Number(res.data.likes),
                hearts: Number(res.data.hearts),
                laughs: Number(res.data.laughs),
                dislikes: Number(res.data.dislikes),
            })
        }
        getReactions();
    }, [])

    return (
            <div className={styles.view}>
                <h5>{timeAgo(view.posted_at)}</h5>
                <h3>{view.title}</h3>

                <img
                    src={view.image}
                />

                <div className={styles.ratebtn}>
                    <button><i style={{color: "green"}} className="fa-solid fa-thumbs-up"></i><span>{formatCount(count.likes)}</span></button>
                    <button><i style={{color: "red"}} className="fa-solid fa-heart"></i><span>{formatCount(count.hearts)}</span></button>
                    <button><i style={{color: "gold"}} className="fa-solid fa-face-laugh"></i><span>{formatCount(count.laughs)}</span></button>
                    <button><i style={{color: "teal"}} className="fa-solid fa-thumbs-down"></i><span>{formatCount(count.dislikes)}</span></button>
                </div>

                <h4>Posted By <span>{(view.author).toLowerCase()}</span></h4>
                <p>{view.content}</p>

                <div className={styles.modBtn}>
                    <button
                        className={styles.editBtn}
                        type="button"
                        onClick={() => onEdit(view.id)}
                    >
                        Edit
                    </button>

                    <button
                        className={styles.deleteBtn}
                        onClick={() => onDelete(view.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
    );
}

export default function AdminInside() {
    const fileRef = useRef(null);
    const formRef = useRef(null);

    const [blogData, setBlogData] = useState({
        title: "",
        author: "",
        image: null,
        content: "",
    });

    const [views, setView] = useState([]);
    const [BlogId, setBlogId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);;

    const editMode = Boolean(BlogId);

    const HandleInputs = (e) => {
        setBlogData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const HandleImageInput = (e) => {
        setBlogData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const resetForm = () => {
        setBlogId(null);
        setBlogData({
            title: "",
            author: "",
            image: null,
            content: "",
        });
        if (fileRef.current) fileRef.current.value = "";
    };

    const HandleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            Object.entries(blogData).forEach(([key, value]) =>
                formData.append(key, value)
            );

            const res = await api.post(
                "/api/admin/inside",
                formData
            );

            toast.success(res.data.message);
            setView(prev => [res.data.blog, ...prev]);
            resetForm();

        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    const HandleUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            Object.entries(blogData).forEach(([key, value]) =>
                formData.append(key, value)
            );

            const res = await axios.put(
                `/api/admin/update/${BlogId}`,
                formData,
                { withCredentials: true }
            );

            toast.success(res.data.message);

            setView(prev =>
                prev.map(blog =>
                    blog.id === BlogId ? res.data.blog : blog
                )
            );

            resetForm();

        } catch (err) {
            toast.error(err.response?.data?.message || "Update failed");
        }
    };

    const deleteBlog = async (id) => {
        if (!confirm("Proceed to delete post?")) return;

        try {
            const res = await axios.post(
                `/api/admin/delete/${id}`,
                {},
                { withCredentials: true }
            );

            toast.success(res.data.message);
            setView(prev => prev.filter(blog => blog.id !== id));

            if (BlogId === id) resetForm();

        } catch (err) {
            toast.error(err.response?.data?.message || "Delete failed");
        }
    };

    useEffect(() => {
        if (!BlogId) return;

        const fetchBlog = async () => {
            const res = await axios.get(`/api/admin/edit/${BlogId}`);
            setBlogData({
                title: res.data.blog.title,
                author: res.data.blog.author,
                image: null,
                content: res.data.blog.content,
            });

            formRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        fetchBlog();
    }, [BlogId]);

        const fetchBlogs = async (selectedDate) => {
            setLoading(true)
            try {
            const res = await api.get(`/api/admin/inside?date=${selectedDate}`);
            setView(res.data.blogs);
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        };

    useEffect(() => {
        fetchBlogs(date)
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
        <main className={styles.adminNews}>
            <h3>MANAGE INSIDE NAIJA</h3>
            <form ref={formRef} onSubmit={editMode ? HandleUpdate : HandleSubmit}>
                <label>Title
                <input name="title" 
                value={blogData.title} 
                onChange={HandleInputs} 
                />
                </label>

                <label>Author
                <input name="author" 
                value={blogData.author} 
                onChange={HandleInputs} 
                />
                </label>

                <label>Image
                <input type="file" 
                ref={fileRef} 
                onChange={HandleImageInput} 
                />
                </label>

                <label>Content
                <textarea name="content" 
                value={blogData.content} 
                onChange={HandleInputs} 
                />
                </label>
                <button type="submit" disabled={loading}>{editMode ? "Update Post" : "Post News"}</button>

                {editMode && (
                    <button type="button" onClick={resetForm}>
                        Cancel Edit
                    </button>
                )}
            </form>

            <h3 style={{marginTop: "1rem"}}>MODIFY / VIEW BLOGS</h3>
            <div className={styles.blogsNavigation}>
                    <button onClick={goToPreviousDay} type="button">Previous day</button>
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                    />
                    <button onClick={goToNextDay} type="button">Next day</button>
            </div>
            <div className={styles.viewContainer}>
            {loading ? (<p className={styles.noBlogsForDate}>Loading...</p> 
                    ) : (views.length === 0 ? (
                        <p className={styles.noBlogsForDate}>No blogs found for this date.</p>
                    ) : (
                        views.map(view => (
                        <ViewCard key={view.id} view={view} onEdit={setBlogId} onDelete={deleteBlog}/>
                    ))
                    )
                    )}
            </div>
        </main>
    );
}
