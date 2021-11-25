import React, { useState, useContext, useEffect, useRef } from 'react';
import { CoordinatesContext } from '../../providers/coordinates/coordinates';
import axios from 'axios';
import FormInput from '../form-input/form-input.component'
import './location.styles.scss'

const initialValue = ['null']


const Location = () => {
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [changePosition, setPostion] = useState(false)
    const [places, setPlaces] = useState({})
    const [placeList, setPlaceList] = useState(initialValue)
    const [drawing, setDrawing] = useState(false);
    const [drawingColor, setDrawingColor] = useState(false)
    const [startRotate, setRotate] = useState(false);
    const [redli, setRedli] = useState(0)
    const [rotateAng, setRotateAng] = useState(0);
    const [address, setAddress] = useState('');
    const { changeLatitude, changeLongitude, addRestaurant, restaurantPlace, cleanRestaurant } = useContext(CoordinatesContext)
    const canvasRef = useRef(null);
    const liRef = useRef()

    // axios({
    //     url: 'echo',
    //     method: 'get',
    // }).then(function (res) {
    //     console.log(res)
    // })
    useEffect(() => {
        setRotateAng(0)
        const countDownSecond = Math.floor(Math.random() * 4) + 1;
        setDrawingColor(false)
        if (startRotate) {
            const startTime = Date.now()
            const countDownTimer = setInterval(() => {
                // 計算剩餘秒數
                const pastSeconds = parseInt((Date.now() - startTime) / 1000)
                const remain = (countDownSecond - pastSeconds)
                setRotateAng(rotateAng => rotateAng + Math.floor(Math.random() * 0) + 1)


                // 檢查是否結束
                if (remain <= 0) {
                    setDrawingColor(true)
                    clearInterval(countDownTimer)

                }
            }, 10)
        }

    }, [startRotate])

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'whitesmoke'
        context.arc(150, 150, 150, 0, Math.PI * 2, false)
        context.fill()
        if (drawing) {
            let startRadian = 3 / 2 * Math.PI + rotateAng, RadianGap = Math.PI * 2 / placeList.length, endRadian = startRadian + RadianGap
            let distance = 10
            for (let i = 0; i < placeList.length; i++) {
                context.save()
                context.beginPath()
                // 為了區分不同的色塊,我們使用隨機生成的顏色作為色塊的填充色
                context.fillStyle = `rgb(${255 - 10 * i}, ${255 - 10 * i},${255 - 10 * i})`
                context.moveTo(150, 150)
                context.arc(150, 150, 150, startRadian, endRadian, false)
                context.fill();
                context.restore();
                context.save();
                context.fillStyle = 'black'
                context.font = "14px Arial";
                context.translate(
                    150 + Math.cos(startRadian + RadianGap / 2) * 135,
                    150 + Math.sin(startRadian + RadianGap / 2) * 135
                );
                context.rotate(startRadian + RadianGap / 2 + Math.PI / 2);
                context.fillText(i + 1, -context.measureText(i).width / 2, 0);
                // 每個獎品色塊繪製完後,下個獎品的弧度會遞增
                startRadian += RadianGap
                endRadian += RadianGap
                context.restore()
                // console.log(startRadian%(2*Math.PI)-5.34)
                let min = startRadian % (2 * Math.PI) - RadianGap - 4.71
                // console.log(startRadian % (2 * Math.PI) - RadianGap)
                if (min <= 0) {
                    if (Math.abs(min) < distance) {
                        distance = Math.abs(min);
                        setRedli(i)
                    }
                }
            }

            context.save()
            context.beginPath()
            context.fillStyle = 'black'
            context.arc(150, 150, 30, 0, Math.PI * 2, false)
            context.fill()
            context.restore()
            context.save()
            context.beginPath()
            context.fillStyle = '#FFF'
            context.font = '20px Arial'
            context.translate(150, 150)
            context.fillText('Start', -context.measureText('Start').width / 2, 8)
            context.restore()
            context.save()
            context.beginPath()
            context.fillStyle = 'black'
            context.moveTo(140, 125)
            context.lineTo(150, 100)
            context.lineTo(160, 125)
            context.closePath()
            context.fill()
            context.restore()
        } else {

        }
    }, [drawing, rotateAng, placeList])

    useEffect(() => {
        for (let i = 0; i < placeList.length; i++) {
            liRef.current.children[i].style.color = 'black'
            liRef.current.children[i].style.fontWeight = 'normal'
        }
        if (drawingColor === true) {
            liRef.current.children[redli].style.color = 'red'
            liRef.current.children[redli].style.fontWeight = 'bold'
        }
    }, [redli, drawingColor])

    useEffect(() => {
        if (changePosition === true) {
            axios({
                url: 'googlemapapi',
                method: 'get',
                params: {
                    latitude: latitude,
                    longitude: longitude
                }
            }).then(function (res) {
                console.log(res)
                setPlaces(res.data)
            })
            setPostion(false)
        }
    }, [changePosition])


    const handleClick = (event) => {
        cleanRestaurant()
        if (navigator.geolocation) {

            // 使用者不提供權限，或是發生其它錯誤
            function error() {
                alert('無法取得你的位置');
            }

            // 使用者允許抓目前位置，回傳經緯度
            async function success(position) {
                console.log(position.coords.latitude, position.coords.longitude);
                setLatitude(position.coords.latitude)
                setLongitude(position.coords.longitude)
                changeLatitude(position.coords.latitude)
                changeLongitude(position.coords.longitude)
                setPostion(true)
                console.log('success')
            }

            // 跟使用者拿所在位置的權限
            navigator.geolocation.getCurrentPosition(success, error);

        } else {
            alert('Sorry, 你的裝置不支援地理位置功能。')
        }
    }
    const nearPlace = (event) => {
        setPlaceList([])
        if (places.results.length === 0) {
            console.log('no data')
            setDrawing(false)
            setPlaceList(arr => [...arr, '附近沒有餐廳唷'])
        } else {
            for (let i = 0; i < places.results.length; i++) {
                setPlaceList(arr => [...arr, places.results[i].name])
                addRestaurant(places.results[i].geometry.location)
            }
            setDrawing(true)
            console.log(restaurantPlace)
            changeLatitude(latitude+0.000001)
            changeLongitude(longitude+0.000001)
        }

    }

    const startRotating = (event) => {
        setRotate(!startRotate)
        console.log(startRotate)
    }

    const handleSubmit = async (event) => {
        cleanRestaurant()
        axios({
            url: 'geocoding',
            method: 'get',
            params: {
                address: address
            }
        }).then(function (res) {
            console.log(res.data.results[0].geometry.location)
            changeLatitude(res.data.results[0].geometry.location.lat)
            changeLongitude(res.data.results[0].geometry.location.lng)
            setLatitude(res.data.results[0].geometry.location.lat)
            setLongitude(res.data.results[0].geometry.location.lng)
            setPostion(true)
        })

    }

    const handleChange = (event) => {
        const { value } = event.target;
        setAddress(value)
    }



    return (
        <div className='location'>

            <div className='locate-current-position'>
                <button className='button' onClick={handleClick}>定位您目前的位置</button>
                <div>
                    您的緯度：{latitude}
                </div>
                <div>
                    您的經度：{longitude}
                </div>
            </div>

            <div className='locate-keyin-position'>
                <button className='button' onClick={handleSubmit}>用地址定位您的位置</button>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type='text'
                        name='address'
                        value={address}
                        onChange={handleChange}
                        label='地址'
                        required
                    />
                </form>

            </div>

            <div className='searching-near-place'>
                <button className='button' onClick={nearPlace}>尋找附近餐廳</button>
            </div>

            <div className='placelist'>
                <ol ref={liRef}>
                    {placeList.map((item, i) => <li key={i}>{item}</li>)}
                </ol>
            </div>

            <canvas
                ref={canvasRef}
                className="modelspace"
                id="modelspace"
                style={{ backgroundColor: 'whitesmoke' }}
                width='300px'
                height='300px'
                onClick={startRotating}
            >
            </canvas>
        </div>

    )
}

export default Location;