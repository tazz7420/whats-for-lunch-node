import React, { useState, useEffect, useRef } from 'react';

import NewsItems from '../../components/news-items/news-items.component';
import NEWS_DATA from './news.data.js';

import './news.styles.scss';

const NewsPage = () => {
    const data = NEWS_DATA.sort(function (a, b) {
        return a.id < b.id ? 1 : -1;
    });

    // let collection = collections.filter(theNews => theNews.id > collections.length - 6)
    const [collections, setCollections] = useState(data);
    const [collection, setCollection] = useState(collections.filter(theNews => theNews.id > collections.length - 5));
    const [pageCount, setPageCount] = useState([]);
    const [handleButton, setHandleButton] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)
    const buttonRef = useRef()
    useEffect(() => {
        setPageCount([])
        if (collections.length % 5 > 0) {
            for (let i = 1; i < collections.length / 5 + 1; i++) {
                setPageCount(arr => [...arr, i])
            }
        } else {
            for (let i = 1; i < collections.length / 5; i++) {
                setPageCount(arr => [...arr, i])
            }
        }
        console.log(pageCount)
    }, [collections])

    useEffect(() => {
        if (handleButton === 1){
            setCollections(data)
            setCollection(collections.filter((theNews, idx) => (currentPage-1)*5 <= idx && idx < (currentPage)*5))
        } else if (handleButton === 2){
            setCollections(data.filter(theNews => theNews.type === 'maintian'))
            setCollection(collections.filter((theNews, idx) => (currentPage-1)*5 <= idx && idx < (currentPage)*5))
        } else if (handleButton === 3){
            setCollections(data.filter(theNews => theNews.type === 'update'))
            setCollection(collections.filter((theNews, idx) => (currentPage-1)*5 <= idx && idx < (currentPage)*5))
        }
    },[handleButton, collections, currentPage])

    const handleclickAll = () => {
        setHandleButton(1)
    }

    const handleclick1 = () => {
        setHandleButton(2)
    }

    const handleclick2 = () => {
        setHandleButton(3)
    }

    const handleCurrentPage = (event) => {
        console.log(event.target.id)
        buttonRef.current.children[currentPage-1].style.fontWeight = 'normal'
        buttonRef.current.children[currentPage-1].style.textDecoration = 'none'
        setCurrentPage(event.target.id)  
        event.target.style.fontWeight = 'bold'
        event.target.style.textDecoration = 'underline'      
    }
    return (
        <div className='news-items row'>
            <div className='col-4 text-center'>
                <div>
                    <h1>最新消息</h1>
                </div>
                <div>
                    <b>NEWS</b>
                </div>
            </div>
            <div className='row'>
                <div className='button-group col-4 text-center'>
                    <button type="button" className="btn btn-outline-dark button-style" onClick={handleclickAll}>全部消息</button>
                    <button type="button" className="btn btn-outline-dark button-style" onClick={handleclick1}>維護公告</button>
                    <button type="button" className="btn btn-outline-dark button-style" onClick={handleclick2}>更新訊息</button>
                </div>
                <div className='col-8 row'>
                    {collection.map(({ id, ...otherCollectionProps }) => (
                        <NewsItems {...otherCollectionProps} />
                    ))}
                    <div ref={buttonRef} className='text-center'>
                        {pageCount.map(page => (
                            <button id={page} className=' btn btn-sm btn-outline-dark' onClick={handleCurrentPage}>{page}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewsPage;