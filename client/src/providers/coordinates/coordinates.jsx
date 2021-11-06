import React, { createContext, useState, useEffect } from 'react';
import { changeValue } from './coordinates.utils';

export const CoordinatesContext = createContext({
    latitude: 23,
    longitude: 121,
    center: {
        lat: 0,
        lng: 0
    },
    changeLatitude: () => {},
    changeLongitude: () => {}
})

const CoordinatesProvider = ({ children }) => {
    const [latitude, setLatitude] = useState(23)
    const [longitude, setLongitude] = useState(121)
    const [center, setCenter] = useState({ lat: 0, lng: 0 })

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