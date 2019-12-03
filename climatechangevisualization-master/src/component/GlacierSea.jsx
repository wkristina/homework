import React, { Component } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label
  } from "recharts";

class GlacierSea extends Component {
    state = {  }
    render() { 
        let glacierArray= this.props.Glacierdata;
        let newGlacierArray = glacierArray.map(({ Year: Time, ...rest }) => ({ Time, ...rest }));;
        let seaArray = this.props.Seadata;
        for (let x = 0; x < seaArray.length; x++) {
            if (seaArray[x].hasOwnProperty('Time'))
            {
                seaArray[x].Time = (new Date(seaArray[x].Time)).getFullYear();
                
            }
        };
        let seaTimeArray= seaArray.map(obj => obj.Time);
        let glacierTimeArray = newGlacierArray.map(obj => obj.Time);
        let merged = seaTimeArray.concat(glacierTimeArray);
        let filtered = [...new Set(merged)];
        //let newTest = Array.from(merged, val => 'Time: '+ val);
        console.log(filtered);
        
        return ( 
            <React.Fragment>
                 <p style={{ fontSize: "24px", fontWeight: "bold" }}>Sea Level(in mm) <br/> Glaciers Size (meters of water equivalent - Base Year 1945)</p>
        <LineChart
          width={1400}
          height={500}
         
          margin={{
            top: 10,
            right: 30,
            left: 50,
            bottom: 50
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={filtered}/>
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="GMSL"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            data={seaArray}
          />
          <Line
            type="monotone"
            dataKey="Mean cumulative mass balance"
            stroke="red"
            activeDot={{ r: 8 }}
            data={newGlacierArray}
          />
        </LineChart>
            </React.Fragment>
         );
    }
}
 
export default GlacierSea;