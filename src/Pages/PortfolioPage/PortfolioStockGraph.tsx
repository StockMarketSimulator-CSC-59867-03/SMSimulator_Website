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

    //insertting userStocks into a map, Symbol => Quantity
    Object.entries(ownedStocks).forEach((stock:any) => {
        stockmap.set(stock[0], stock[1].quantity);
    });

    Object.entries(stocks).forEach((stock:any) => {
        let tickerSymbol = stock[1].data['symbol'];
        if(stockmap.get(tickerSymbol) !== undefined)
        {
            let stockHistory = stock[1].history;
            if(stockHistory !== null){
                stockHistory.forEach((entry:any) => {
                    let temp = graph_points.get(entry['dateTime']);
                    if(temp === null || temp === undefined)
                    {
                        graph_points.set(entry['dateTime'], [entry['price']]);
                    }
                    else
                    {
                        temp.push(entry['price']);
                        graph_points.set(entry['dateTime'], temp);
                    }
                })
            }
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

    return(<div><StockGraph domain={[min, max]} data={history} handleClick={() => {}} width={500} height={400}/></div>)
}
export default PortfolioStockGraph;