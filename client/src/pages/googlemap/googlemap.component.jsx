import React from "react";

import Location from "../../components/location/location.component";
import SimpleMap from "../../components/map/map.component";

import './googlemap.styles.scss';

const GoogleMapPage = () => (
    <div className='googlemappage'>
        <SimpleMap />
        <Location />
    </div>
)

export default GoogleMapPage;