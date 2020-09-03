import React, { useState, useEffect } from 'react';
import Records from './Records';

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


    return (
        <>
            <h1>Statistics</h1>
            <Records statistics={stats} />
        </>
    );
}

export default Statistics;