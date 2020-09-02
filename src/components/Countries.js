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



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 50,
        padding: 20
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
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
    const [countryData, setCountryData] = useState({})



    async function getCountries() {
        const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
        const data = await response.json();
        setCountry(data.countryitems[0])
        console.log(data);
        console.log('hello');
    }

    async function getCountryData(code) {
        let count = 0;
        const response = await fetch(`https://api.thevirustracker.com/free-api?countryTotal=${code}`)
        const data = await response.json();
        console.log('code' , data.countrydata)
        setCountryData(data.countrydata);
    
    }



    const handleChange = (event) => {
        setSelectCountry(event.target.value);
        console.log(event.target.value)
        getCountryData(event.target.value);
    };


    useEffect(() => {
        getCountries();
        getCountryData();
    }, [])

    return (
        <div>
            <h1>Filter Stats Through Countries</h1>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectCountry}
                    onChange={handleChange}
                >
                    {Object.keys(country).map((val, index) => {
                        return (
                            <MenuItem
                                key={index}
                                value={country[val].code}>
                                {country[val].title}
                            </MenuItem>
                        )
                    })}

                </Select>

                <div className={classes.root}>
                    <h2>Total Records</h2>
                    <Grid container spacing={3}>
                        {console.log('c', countryData)}
                        {countryData &&
                            Object.keys(countryData).map((key, ind) => {
                                {delete countryData[key].info}
                                console.log(countryData)
                                return (
                                    <Grid item xs={6} sm={3} key={ind}>                         
                                        <Paper className={classes.paper}>
                                            <h3>{countryData[key]}</h3>
                                        </Paper>

                                    </Grid>
                                )
                            })
                        }

                    </Grid>
                </div>
            </FormControl>
        </div>
    )
}