import React from 'react';

import './news-items.styles.scss';

const NewsItems = ({ id, time, title, content }) => (
  <div className='news-item'>
    {/* <div
      className='image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    /> */}
    <div className='news-content row border'>
      <span className='time'>{time}</span>
      <span className='title'><b>{title}</b></span>
      <span className='content'>{content}</span>
    </div>
  </div>
);

export default NewsItems;