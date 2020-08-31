import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function SimpleSelect() {

    async function getCountries() {
        const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
        const data = await response.json();
        console.log(data);
        setCountry(data.countryitems[0])
    }

    const classes = useStyles();
    const [country, setCountry] = useState([]);

    const handleChange = (event) => {
        setCountry(event.target.value);
    };


    useEffect(() => {
        getCountries();
    }, [])

    console.log('country', country)
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={country}
                    onChange={handleChange}
                >
                    {Object.keys(country).map((val, index) => {

                        return (
                            <MenuItem key={index} value={country[val].code}>{country[val].title}</MenuItem>
                        )
                    })}

                </Select>
            </FormControl>
        </div>
    )
}