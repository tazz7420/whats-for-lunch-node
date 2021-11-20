import React, { useState, useEffect } from 'react';

import NewsItems from '../../components/news-items/news-items.component';
import NEWS_DATA from './news.data.js';

import './news.styles.scss';

const NewsPage = () => {
    const data = NEWS_DATA.sort(function (a, b) {
        return a.id < b.id ? 1 : -1;
    });

    // let collection = collections.filter(theNews => theNews.id > collections.length - 6)
    const [collections, setCollections] = useState(data);
    const [collection, setCollection] = useState(collections.filter(theNews => theNews.id > collections.length - 6));
    const [pageCount, setPageCount] = useState([]);
    const [handleButton, setHandleButton] = useState(1);
    useEffect(() => {
        setPageCount([])
        if (data.length % 6 > 0) {
            for (let i = 1; i < data.length / 6 + 1; i++) {
                setPageCount(arr => [...arr, i])
            }
        } else {
            for (let i = 1; i < data.length / 6; i++) {
                setPageCount(arr => [...arr, i])
            }
        }
        console.log(pageCount)
    }, [data])

    useEffect(() => {
        if (handleButton === 1){
            setCollection(collections.filter(theNews => theNews.id > collections.length - 6))
        } else if (handleButton === 2){
            setCollection(collections.filter(theNews => theNews.id > collections.length - 6).filter(theNews => theNews.type === 'maintian').filter((theNews, idx) => idx < 6))
        } else if (handleButton === 3){
            setCollection(collections.filter(theNews => theNews.id > collections.length - 6).filter(theNews => theNews.type === 'update').filter((theNews, idx) => idx < 6))
        }
    },[collections, handleButton])

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
        setCollections(data.filter(theNews => theNews.id <= data.length - (event.target.id-1)*6))
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
                    <div className='text-center'>
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