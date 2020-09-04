import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { randomColor } from 'randomcolor';


const DoughnutChart = ({ selectedCountry }) => {
    let copyCountries = selectedCountry;
    const filterStats = selectedCountry && (
        delete copyCountries.continent,
        delete copyCountries.country,
        delete copyCountries.countryInfo
    );

    console.log('copy', copyCountries)
    const countryKey = selectedCountry && Object.keys(selectedCountry).map(key => key)
    const countryValue = selectedCountry && Object.keys(selectedCountry).map(key => selectedCountry[key])
    console.log(countryKey);
    console.log(countryValue);

    let randomColors = randomColor({ count: '23', hue: "random" });
    console.log(randomColors)
    const data = {
        labels: countryKey,
        datasets: [{
            data: countryValue,
            backgroundColor: selectedCountry && randomColors,
            hoverBackgroundColor: selectedCountry && randomColors
        }]
    };


    return (<div>
        <h2>Doughnut Example</h2>
        <Doughnut data={data} />
    </div>);
}

export default DoughnutChart;