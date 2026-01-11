import Mini_hero from '../components/Mini_hero'
import './Home.css'

export default function Home() {
    return (
        <>
        <Mini_hero state='Nigeria'/>
        <main>
          <div className='highlights'>
            <h2>TODAY</h2>
            <section>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            </section>
        </div>

        <div className='highlights'>
            <h2>TRENDING</h2>
            <section>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            </section>
        </div>

        <div className='highlights'>
            <h2>POPULAR</h2>
            <section>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            <div>
                <button>read news</button>
                <h4>This is a heading sub in the div and am testing for hidden.</h4>
            </div>
            </section>
        </div>
     </main>
     </>
    )
}