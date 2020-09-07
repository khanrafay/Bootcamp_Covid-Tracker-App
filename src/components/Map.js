import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SimpleTable from './TableData';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 50,
        padding: 20,
        marginBottom: 30
    },
    paper: {
        padding: theme.spacing(2), 
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '85%',
        height: '100%',
        margin: '0 auto',
        backgroundColor : '#fbfbfb',
        padding: '20px'


    },
    title: {
        textTransform: 'uppercase'
    }
}));


const Map = () => {

    const classes = useStyles();
    const [map, setMap] = React.useState(null)
    const [location, setLocation] = useState([]);
    const [country, setCountry] = useState([]);
    const [value, setValue] = useState();
    const [lat, setLat] = useState(33);
    const [long, setLong] = useState(70);


    async function getCountries() {
        const response = await fetch('https://corona.lmao.ninja/v2/countries');
        const data = await response.json();
        setCountry(data);

    }

    var result = Object.keys(country).map((key) => country[key]);

    const defaultProps = {
        options: result,
        getOptionLabel: (option) => option.country,
    };

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
        getCountries();
    }, [])


    const countriesLocation = location.map((data, i) => {
        return (
            <div
                lat={data.countryInfo.lat}
                lng={data.countryInfo.long}
                style={{
                    color: "white",
                    backgroundColor: "red",
                    height: "25px",
                    width: "64px",
                    padding: "10px",
                    textAlign: 'center',
                    borderRadius: '50%',
                    marginTop: 50,
                    opacity: 0.4
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

    // const center = {
    //     lat: lat,
    //     lng:
    // };

    return (
        <Grid container> 
        <Grid xs={12} md={6}>
            <div style={{ height: '50vh', width: '100%', marginTop:'120px'}}>
            <h1>Look on Map</h1>
            <Autocomplete
                {...defaultProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                    <TextField {...params} label="Search Country" margin="normal" />
                )}
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log(newValue.countryInfo.lat);
                    setLat(newValue.countryInfo.lat);
                    setLong(newValue.countryInfo.long);
                }}         
                className="search-selector"
            /> 
            <Paper className={classes.paper}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBovKLbEiwn8mDZP8ql_tBnKAkJpPkMiqk' }}
                center={{lat: lat, lng:long}}
                defaultZoom={6}
            >
                {countriesLocation}
            </GoogleMapReact>
            </Paper>
        </div>
        </Grid>
        <Grid xs={12} md={6} className="simpe-table" >
            
            <SimpleTable data={country} />
         
        </Grid>
        </Grid>

    );
}

export default Map;