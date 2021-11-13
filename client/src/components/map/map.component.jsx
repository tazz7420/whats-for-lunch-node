import React, { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { CoordinatesContext } from '../../providers/coordinates/coordinates';

import './map.styles.scss'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SimpleMap = () => {
    const { latitude, longitude } = useContext(CoordinatesContext)
    const zoom = 16;
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
            </GoogleMapReact>
            N{latitude}, E{longitude}
        </div>
    );

};

export default SimpleMap;