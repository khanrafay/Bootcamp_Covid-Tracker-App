import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


export default function Record() {
    const classes = useStyles();

    const [globalData, setGlobalData] = useState({})
    useEffect(() => {
        async function getData() {
            const response = await fetch("https://api.thevirustracker.com/free-api?global=stats");
            const data = await response.json();
            // console.log("x", data.results[0])
            delete data.results[0].source;
            setGlobalData(data.results[0])
        }
       // getCountries();
        getData();
    }, [])

    async function getCountries() {
        const response = await fetch("https://api.thevirustracker.com/free-api?countryTotals=ALL");
        const data = await response.json();
        console.log(data.countryitems[0]);
    }

    
    return (
        <div className={classes.root}>
            <h2>Total Records</h2>
            <Grid container spacing={3}>
                {
                    Object.keys(globalData).map((key, ind) => {
                        return (
                            <Grid item xs={6} sm={3} key={ind}>
                                <Paper className={classes.paper}>
                                    <h4 className={classes.title}>{key.replace(/_/g, " ")}</h4>
                                    <h3>{globalData[key]}</h3>
                                </Paper>
                            </Grid>
                        )
                    })
                }

            </Grid>
        </div>
    );
}