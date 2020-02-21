
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