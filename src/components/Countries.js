import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Record from './Records';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RadarChart from './RadarChart';
import DoughnutChart from './DoughnutChart';


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


export default function SimpleSelect() {


    const classes = useStyles();
    const [country, setCountry] = useState([]);
    const [selectCountry, setSelectCountry] = useState('');
    const [selectCode, setSelectCode] = useState('');
    const [countryData, setCountryData] = useState([])
    const [value, setValue] = useState();




    async function getCountries() {
        const response = await fetch('https://corona.lmao.ninja/v2/countries');
        const data = await response.json();
        setCountry(data);

    }

    async function getCountryData(code) {
        let count = 0;
        const response = await fetch(`https://api.thevirustracker.com/free-api?countryTotal=${code}`)
        const data = await response.json();
        setCountryData(data.countrydata);

    }

    var result = Object.keys(country).map((key) => country[key]);

    const defaultProps = {
        options: result,
        getOptionLabel: (option) => option.country,
    };

 

    const handleChange = (newValue) => {
     setValue(newValue);  
    }

    useEffect(() => {
        getCountries();
        getCountryData();
    }, [])

    return (
        <div>
            <h1>Search Statistics by Country</h1>
            <div className="search-selector">
            <Autocomplete
                {...defaultProps}
                id="disable-close-on-select"
                disableCloseOnSelect
                renderInput={(params) => (
                    <TextField {...params} label="Search Country" margin="normal" />
                )}
                value={value}
                // onChange={(event, newValue) => {
                //     setValue(newValue);
                // }}
                onChange={(e, newValue) => handleChange(newValue)}
            />
            </div>
            <Grid container >
                <Grid xs={6}>
                    <Paper className={classes.paper}>
                        <DoughnutChart selectedCountry={value} />
                    </Paper>
                </Grid>
                <Grid xs={6}>
                    <Paper className={classes.paper}>
                        <RadarChart selectedCountry={value} />
                    </Paper>
                </Grid>
            </Grid>


        </div>
    )
}