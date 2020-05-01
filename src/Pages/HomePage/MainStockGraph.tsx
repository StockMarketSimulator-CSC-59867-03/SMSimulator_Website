import React from 'react';
import StockGraph from '../../Components/StockGraph/stockGraph';
import { useSelector, useDispatch } from 'react-redux';
import { isNumber } from 'util';

var min = 0.0;
var max = 0.0;

function calculateDomain(value : Array<any>){
    let min = 1000000;
    let max = 0;
    for(let i = 0; i < value.length; i++){
        let price = value[i]["price"]
        if(price < min){
            min = price;
        }
        if(price > max){
            max = price;
        }
    }
    return [min - 20, max + 20];
  }

function calcAvg(arr_points:[]){
    let sum = 0.0;
    let num_points = arr_points.length;
    console.log(arr_points);
    arr_points.forEach((x:any) => {
        if(isNumber(x))
            sum += x;
        else
            sum += parseFloat(x);
    })

    return sum;
}

function MainStockGraph(props:any){
    let stocks = useSelector((state:any) => state.stockData);
    let graph_points = new Map<any, any>();

    
    Object.entries(stocks).forEach((stock:any) => {
        console.log(stock);
        let stockHistory = stock[1].history;
        if(stockHistory !== null){
            let count = 0;
            stockHistory.forEach((entry:any) => {
                count++;
                let temp = graph_points.get(count);
                if(temp === null || temp === undefined)
                {
                    graph_points.set(count, [entry['price']]);
                }
                else
                {
                    temp.push(entry['price']);
                    graph_points.set(count, temp);
                }
            })
        }
        // console.log(graph_points);
    })

    let history = new Array;

    graph_points.forEach((value:any, key:any) => {
        // console.log(calcAvg(value));
        let avgPrice = calcAvg(value);
        history.push({dateTime: key, price: avgPrice});
    })

    history.sort((a, b) => (a.dateTime > b.dateTime) ? 1 : -1);

    console.log(history);
    console.log(min, max);
    let domain = calculateDomain(history);

    return(<div><StockGraph domain={domain} data={history} handleClick={() => {}} width={500} height={400}/></div>)
}
export default MainStockGraph;