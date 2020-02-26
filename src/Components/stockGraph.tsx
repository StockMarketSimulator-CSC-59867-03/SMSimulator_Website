
import React from 'react';
import EventInjection from './eventinjection';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip } from 'recharts';

type SGProps = {
    width: number;
    height: number;
    data: any;
};
type SGState = {
    data: any;
};
class StockGraph extends React.Component<SGProps, SGState> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            data: this.props.data
        }

    }

    static defaultProps = {
        width: 500,
        height: 300,
        data: [{ name: "9:30 AM", price: 911.12 }, { name: "9:35 AM", price: 899.36 },
            { name: "9:40 AM", price: 902.45 }, { name: "9:45 AM", price: 909.07 },
            { name: "9:45 AM", price: 906.17 }, { name: "9:50 AM", price: 908.23 },
            { name: "9:55 AM", price: 903.42 }]
    }

    
    render() {

        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <LineChart width={this.props.width} height={this.props.height} data={this.state.data}>
                    <Tooltip />
                    <XAxis dataKey="name" tick={false} stroke="#FFFFFF"/>
                    <YAxis domain={[880,920]} tick={false} stroke="#FFFFFF"/>
                    <Line  dataKey="price" stroke="#8884d8" dot={false} />
                </LineChart>
            </div>
        );
    }
}
export default StockGraph;