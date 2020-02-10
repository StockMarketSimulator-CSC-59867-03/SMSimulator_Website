import React from 'react';
import './App.scss';

interface IAppComponentProps {}
interface IAppComponentState { apiTestResponse: string }

class App extends React.Component<IAppComponentProps, IAppComponentState> {
  constructor(props : any){
    super(props);
    this.state = { apiTestResponse: "" };
  }

  callTestAPI(){
    fetch("/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiTestResponse: res }))
      .catch(err => err);
  }

  componentDidMount(){
    this.callTestAPI();
  }

  render(){
    return (
      <div className="App">
        <p className="App-intro">{this.state.apiTestResponse}</p>
      </div>
    );
  }
}

export default App;
