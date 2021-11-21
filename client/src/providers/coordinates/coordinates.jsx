import React, { createContext, useState, useEffect } from 'react';
import { changeValue } from './coordinates.utils';

export const CoordinatesContext = createContext({
    latitude: 25.0338041,
    longitude: 121.5645561,
    center: {
        lat: 0,
        lng: 0
    },
    changeLatitude: () => {},
    changeLongitude: () => {}
})

const CoordinatesProvider = ({ children }) => {
    const [latitude, setLatitude] = useState(25.0338041)
    const [longitude, setLongitude] = useState(121.5645561)
    const [center, setCenter] = useState({ lat: 25.0338041, lng: 121.5645561 })

    const changeLatitude = value => setLatitude(changeValue(latitude, value));
    const changeLongitude = value => setLongitude(changeValue(longitude, value));

    useEffect(() => {
        setCenter({ lat: latitude, lng: longitude })
        console.log(latitude, longitude)
    }, [latitude, longitude])


    return (
        <CoordinatesContext.Provider
            value={{
                latitude,
                longitude,
                center,
                changeLatitude,
                changeLongitude
            }}>
            {children}
        </CoordinatesContext.Provider>
    )
};

export default CoordinatesProvider;