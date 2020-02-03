import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currency: '',
      value: 0
    }
  }
  componentDidMount() {

  }
  render() {
    return (
      
      <Currency />
    )
  }
}

class Currency extends React.Component {
  render(){
    
  
  return (

    <div className="App">
    <header className="App-header">
    <p>Currency Converter</p>
    {/* <input class="btn-outline-light"></input> */}
    <input class=""></input>
    
    </header>
    </div>
  )
  }
}

export default App;
