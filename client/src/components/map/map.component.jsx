import React, { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { CoordinatesContext } from '../../providers/coordinates/coordinates';

import './map.styles.scss'

const AnyReactComponent = ({ text }) => <div><b>{text}</b></div>;
const RestaurantReactComponent = ({ text }) => <div style={{color: 'blue'}}><b>{text}</b></div>;

const SimpleMap = () => {
    const { latitude, longitude, restaurantPlace } = useContext(CoordinatesContext)
    const [zoom, setZoom] = useState(16);
    const [center, setCenter] = useState({
        lat: latitude,
        lng: longitude
    });

    useEffect(() => {
        setCenter({
            lat: latitude,
            lng: longitude
        })
    }, [latitude, longitude])

    useEffect(() => {
        console.log(restaurantPlace)
    },[restaurantPlace])

    return (
        // Important! Always set the container height explicitly
        <div className='googlemap'>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyApORX8OKehWcSAVnBbqCGetlLwT1HP9Oo',
                }}
                center={center}
                zoom={zoom}
            >
                <AnyReactComponent
                    lat={latitude}
                    lng={longitude}
                    text="Your location"
                />
                {restaurantPlace.map((place, i) => <RestaurantReactComponent
                    lat={place.lat}
                    lng={place.lng}
                    text={i+1}
                />)}
            </GoogleMapReact>
        </div>
    );

};

export default SimpleMap;