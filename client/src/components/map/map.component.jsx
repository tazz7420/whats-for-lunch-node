import React, { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { CoordinatesContext } from '../../providers/coordinates/coordinates';

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
        <div style={{ height: '40vw', width: '60%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_API_KEY,
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