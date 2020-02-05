import React from 'react';
import './App.css';

const API = 'https://api.exchangeratesapi.io/latest?';
let baseCurrency = 'base=AUD' 

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      baseValue: '',
      currencyData: {},
      isLoading: false,
      hasError: false
    }

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentWillMount() {
    this.setState({isLoading: true});

    fetch(API + baseCurrency)
      .then(res => res.json())
      .then(data => {this.setState({currencyData: data.rates, isLoading: false, hasError: false})});
  }

  handleValueChange(e) {
    this.setState({baseValue: e})
  }

  render() {
      // return <p>Loading ...</p>;
    // }
    console.log(this.state.currencyData)
    return (
      <div className="App">
        <header className="App-header pt-5">
          <h1>Currency Converter</h1>
            <BaseValue baseValue={this.handleValueChange}/>
          <br />
            <BaseCurrency /> 
          <br />
          <p>baseValue: {this.state.baseValue}</p>
          <ChildCurrency result={this.state.currencyData} />

        </header>
      </div>
    )
  }
}

class BaseCurrency extends React.Component {
  render() {
    return (
      <div>
      <div className="dropdown">
  <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    AUD
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item text-center">AUD</a>
    <a className="dropdown-item text-center">USD</a>
    <a className="dropdown-item text-center">CAD</a>
  </div>
</div>
      </div>
  )
  }
}
class BaseValue extends React.Component {
  constructor(props) {
    super(props);
  
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.baseValue(e.target.value);
  }

  render() {
    return (
      <div>
        <input className="" onChange={this.handleChange}></input>
      </div>
  )
  }
}

class ChildCurrency extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div>
        <ul>
        </ul>
      </div>
      // <div>
        // {this.props.result.CAD}
      // </div>
    )
  }
}

export default App;
