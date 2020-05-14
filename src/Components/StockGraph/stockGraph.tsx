
import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { lightBlue } from '@material-ui/core/colors';

import {
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    FormControl
  } from "@material-ui/core";


function StockGraph(props: any){


    let clickedStock = () => {
        props.handleClick({name:props.name, domain: props.domain, data: props.data})
    };

    let animationOn = !(props.animationOn == false) ;
    let showToolTip = !(props.showToolTip == false);

    let lineColor = lightBlue[300];
    
    if(props.data != null && !showToolTip){
        // Probably not the way to do it but
        let trend = props.data[props.data.length - 1].price - props.data[0].price
        lineColor = (trend > 0) ? lightBlue[300] : "#FF0000";

    }
    console.log(props.data);

   return  (
        <div style={{border: '0px solid black'}} onClick={clickedStock}>
            <ResponsiveContainer width={props.width} height={props.height}>
             <LineChart data={props.data}>
                 {showToolTip ?  <Tooltip /> : <div></div>}
                 <XAxis dataKey="dateTime" tick={false} stroke="#FFFFFF" hide={true}/>
                 <YAxis domain={props.domain} tick={false} stroke="#FFFFFF" hide={true}/>
                 <Line  dataKey={props.dataKey} stroke={lineColor} dot={false} isAnimationActive={animationOn} />
             </LineChart>
             </ResponsiveContainer>
         </div>
     );
}

StockGraph.defaultProps = {
    dataKey: "price",
    width: 300,
    height: 150,
    name: "",
    domain: [890,920],
    handleClick: ()=>{},
    data: [{ name: "9:30 AM", price: 911.12 }, { name: "9:35 AM", price: 899.36 },
        { name: "9:40 AM", price: 902.45 }, { name: "9:45 AM", price: 909.07 },
        { name: "9:45 AM", price: 906.17 }, { name: "9:50 AM", price: 908.23 },
        { name: "9:55 AM", price: 903.42 }]
}


export default StockGraph;