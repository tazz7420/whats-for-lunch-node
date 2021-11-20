import React, { useEffect, useState } from "react";

import './about.styles.scss';

const AboutPage = () => {


    return (
        <div className='about-item row'>
            <div>
                <h1>關於這個網站</h1>
            </div>
            <div>
                <b>目標</b>
            </div>
            <div className='row content'>
                <div className='col-4'></div>
                <div className='col-6 row'>
                    <span>內容</span>
                    <span>......</span>
                </div>
            </div>
            <div className='usetech'>
                test
            </div>
            <div className='row'>
                <div className='col'></div>
                <div className='col'>
                    <h1>test2</h1>
                </div>
            </div>
        </div>

    )
}

export default AboutPage;