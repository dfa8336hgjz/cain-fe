import Carousel from 'react-multi-carousel'
import { useState } from "react";
import 'react-multi-carousel/lib/styles.css'
import NotebookItem from "./NotebookItem"
import '../styles/gridNotebook.css'

const GridNoteList = ({ noteList, searchKeyword = "", setDeleteItem }) => {
    const [maxItemNum, setMaxItemNum] = useState(4);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1200 },
            items: 4,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1200, min: 1000 },
            items: 3,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 1000, min: 600 },
            items: 2,
            slidesToSlide: 1
        },
        mobile2: {
            breakpoint: { max: 600, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            {noteList.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                    <p className='no-notebook'>Let's add a new notebook</p>
                </div>
            ) : (
                noteList.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase())).length === 0 ? (
                    <div style={{ textAlign: 'center' }}>
                        <p className='no-notebook'>No notebooks found for "{searchKeyword}".</p>
                    </div>
                ) :
                    <Carousel
                        responsive={responsive}
                        className="notebook-list-container"
                        showDots={false}
                        afterChange={
                            () => {
                                if (window.innerWidth < 600) {
                                    setMaxItemNum(1);
                                } else if (window.innerWidth < 1000) {
                                    setMaxItemNum(2);
                                } else if (window.innerWidth < 1200) {
                                    setMaxItemNum(3);
                                } else {
                                    setMaxItemNum(4);
                                }
                            }
                        }
                        arrows={noteList.filter((note) => note.title.toLowerCase().includes(searchKeyword.toLowerCase())).length <= maxItemNum ? false : true}
                    >
                        {noteList.map((note) => {
                            if (note.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
                                return (
                                    <NotebookItem
                                        key={note.notebook_id}
                                        title={note.title}
                                        createdAt={note.created_at}
                                        notebookId={note.notebook_id}
                                        setDeleteItem={setDeleteItem}
                                    />
                                );
                            }
                        })}
                    </Carousel>
            )}
        </div>
    );
}

export default GridNoteList

