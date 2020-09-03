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


export default function Record(props) {
    const classes = useStyles();
    const { statistics } = props;


    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {statistics && Object.keys(statistics).map((key, ind) => {
                    return (
                        <Grid item xs={6} sm={3} key={ind}>
                            <Paper className={classes.paper}>
                                <h4 className={classes.title}>{key.replace(/_/g, " ")}</h4>
                                <h3>{statistics[key]}</h3>
                            </Paper>
                        </Grid>
                    )
                })
                }

            </Grid>
        </div>
    );
}