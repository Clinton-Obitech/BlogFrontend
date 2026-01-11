import styles from "./Admin.module.css";

export default function AdminSport() {
    return (
        <main className={styles.adminNews}>
        <h3>MANAGE SPORTS</h3>
        <form>
            <label>Title
            <input
            type="text"
            name="title"
            />
            </label>

            <label>Author
            <input
            type="text"
            name="author"
            />
            </label>

            <label>Image
            <input
            type="file"
            name="image"
            />
            </label>

            <label>Content<br></br>
            <textarea name="Content"></textarea>
            </label>

            <button type="submit">Post News</button>
        </form>
        </main>
    )
}