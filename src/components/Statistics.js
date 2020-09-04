import React, { useState, useEffect } from 'react';
import Records from './Records';
import Grid from '@material-ui/core/Grid';
import PieChart from './PieChart';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const Statistics = () => {

    const [stats, setStats] = useState({})
    useEffect(() => {
        async function getData() {
            const response = await fetch("https://api.thevirustracker.com/free-api?global=stats");
            const data = await response.json();
            delete data.results[0].source;
            setStats(data.results[0])
        }
        // getCountries();
        getData();
    }, [])

    const useStyles = makeStyles((theme) => ({

        paper: {
            padding: theme.spacing(2), 
            color: theme.palette.text.secondary,
            width: '85%',
            height: '80%',
            margin: '0 auto',
            backgroundColor : '#fbfbfb'

        },
    }));

    const classes = useStyles();

    return (
        <>

            <Grid container>
                <Grid md={6} >
                    <h1>Statistics</h1>
                    <Paper className={classes.paper}>
                        <Records statistics={stats} />
                    </Paper>

                </Grid>
                <Grid md={6} >
                    <h1>Results in Pie</h1>
                    <Paper className={classes.paper}>
                        <PieChart statistics={stats} />
                    </Paper>
                </Grid>

            </Grid>
        </>
    );
}

export default Statistics;