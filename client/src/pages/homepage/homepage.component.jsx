import React, { useEffect, useState } from 'react';

import './homepage.styles.scss';
import googlemappic from '../../assets/googlemappic.JPG'
import osmpic from '../../assets/osmpic.JPG'

const HomePage = () => {
    const [idx, setIdx] = useState(true)

    useEffect(() => {
        let change = setInterval(() => {
            setIdx(!idx)
        }, 5000);
        return () => clearInterval(change)
    })

    return (
        <div className='homepage'>
            <div className='carousel'>
                <div className='img-container' style={{ transform: idx ? 'translateX(0)' : 'translateX(-50vw)' }}>
                    <img src={googlemappic} alt='googlemap' />
                    <img src={osmpic} alt='OSM' />
                </div>
            </div>

            <div className='textblock1'>
                <div><b>午餐吃什麼呢？</b></div>
                <div>透過您目前所在的位置，對周遭的餐廳做探索</div>
                <div>來隨機選擇吧！</div>
            </div>
            <div className='textblock2'>
                <div className='googlemap' style={{color: idx ? 'black' : 'gray' }}>
                    <div><b>Google map</b></div>
                    <div className='text2'>使用google maps platfrom的服務，協助使用者探索世界。讓使用者透過電話號碼、地址和即時信號找到特定地點。</div>
                    <div className='text2'>（有使用次數的限制）</div>
                </div>
                <div className='osm' style={{color: idx ? 'gray' : 'black' }}>
                    <div><b>Open street map</b></div>
                    <div className='text2'>籌備中..........</div>
                    <div className='text2'>（無使用次數限制）</div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;