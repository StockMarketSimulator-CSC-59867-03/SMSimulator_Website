import React from 'react';
import StockGraph from '../../Components/StockGraph/stockGraph';
import { useSelector, useDispatch } from 'react-redux';
import { isNumber } from 'util';

var min = 0.0;
var max = 0.0;

function calcAvg(arr_points:[]){
    let sum = 0.0;
    let num_points = arr_points.length;
    arr_points.forEach((x:any) => {
        if(isNumber(x))
            sum += x;
        else
            sum += parseFloat(x);
    })
    let avg = parseFloat((sum/num_points).toFixed(2));
    if(avg < min || min === 0.0)
        min = avg;
    if(avg > max || max === 0.0)
        max = avg;
    return avg;
}

function PortfolioStockGraph(props:any){
    let stocks = useSelector((state:any) => state.stockData);
    let ownedStocks = useSelector((state: any) => state.userStocks);
    
    let graph_points = new Map<any, any>();
    let stockmap = new Map<any, any>();


    return(<div><StockGraph  dataKey="value" handleClick={() => {}} domain={props.domain} data={props.data} width={800} height={500}/></div>)
}
export default PortfolioStockGraph;