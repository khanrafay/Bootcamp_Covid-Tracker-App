import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { randomColor } from 'randomcolor';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 50,
        padding: 20,

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%',
        height: '60%',
        borderBottom: `1px solid ${randomColor({
            luminosity: 'dark',
            format: 'rgba',
            alpha: 0.5 // e.g. 'rgba(9, 1, 107, 0.5)',
        })}`

    },
    title: {
        textTransform: 'capitalize',
        fontSize: '15px',

    },
    boxes: {
        marginRight: '20px',

    }
}));


export default function Record(props) {
    const classes = useStyles();
    const { statistics } = props;

    const randomColors = randomColor({count: '9'});

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {statistics && Object.keys(statistics).map((key, ind) => {
                    return (
                        <Grid item xs={6} sm={3} key={ind} className={classes.boxes}>
                            <Paper className={classes.paper} style={{borderBottom:`3px solid ${randomColors[ind]}`}}>
                                <p className={classes.title}>{key.replace(/_/g, " ")}</p>
                                <p>{statistics[key]}</p>
                            </Paper>
                        </Grid>
                    )
                })
                }

            </Grid>
        </div>
    );
}