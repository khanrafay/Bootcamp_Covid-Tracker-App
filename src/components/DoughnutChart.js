import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { randomColor } from 'randomcolor';


const DoughnutChart = ({selectedCountry}) => {


   const filterStats = selectedCountry && (
    delete selectedCountry.continent,
    delete selectedCountry.updated,
    delete selectedCountry.countryInfo,
    delete selectedCountry.population
   )
    

   
    let countryKey = selectedCountry && Object.keys(selectedCountry).map((key, ind) => key)
    let countryValue = selectedCountry && Object.keys(selectedCountry).map((key, ind) => selectedCountry[key])

    let countryKey1 = selectedCountry &&  countryKey.filter(val => val !== 'country');
    let countryValue1 = selectedCountry && countryValue.filter(val => typeof val !== 'string');
    console.log('ck')

    let randomColors = selectedCountry && randomColor({ count: '23', hue: "random" });
    
    const data = {
        labels: countryKey1,
        datasets: [{
            data: countryValue1,
            backgroundColor: selectedCountry && randomColors,
            hoverBackgroundColor: selectedCountry && randomColors
        }]
    };


    return (<div>
        <h2>Doughnut</h2>
        <Doughnut data={data} />
       
    </div>);
}

export default DoughnutChart;