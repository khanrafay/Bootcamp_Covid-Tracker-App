import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const Map = () => {

    const [map, setMap] = React.useState(null)
    const [location, setLocation] = useState([]);


    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    async function getCountryAPI() {
        const response = await fetch('https://corona.lmao.ninja/v2/countries');
        const data = await response.json();
        setLocation(data);
    }

    useEffect(() => {
        getCountryAPI();
    }, [])


    const countriesLocation = location.map((data, i) => {
        return (
            <div
                lat={data.countryInfo.lat}
                lng={data.countryInfo.long}
                style={{
                    color: "red",
                    backgroundColor: "white",
                    height: "25px",
                    width: "64px",
                    padding: "10px",
                    textAlign: 'center',
                    borderRadius: '50%'
                }}
            >
                <img height="10px" src={data.countryInfo.flag} />
                <br />
                {data.cases}


            </div >
        )
    })

    const containerStyle = {
        width: '1000px',
        height: '400px'
    };

    const center = {
        lat: -3.745,
        lng: -38.523
    };

    return (
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBovKLbEiwn8mDZP8ql_tBnKAkJpPkMiqk' }}
                defaultCenter={{ lat: 30, lng: 70 }}
                defaultZoom={4}
            >
                {countriesLocation}
            </GoogleMapReact>
        </div>
    );
}

export default Map;