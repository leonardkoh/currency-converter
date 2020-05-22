import React from 'react';
import './App.css';
import {FullCurrencyName} from './CurrencyName';

const _URL = 'https://api.exchangeratesapi.io/latest?base=';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      baseValue: '0',
      baseCurrency: 'AUD',
      currencyData: {},
      isLoading: false,
      hasError: false,
    }

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentWillMount() {
    this.setState({isLoading: true});

    fetch(_URL + this.state.baseCurrency)
      .then(res => res.json())
      .then(data => {this.setState({currencyData: data.rates, isLoading: false, hasError: false})});
  }

  handleValueChange(e) {
    this.setState({baseValue: e})
  }

  render() {
      // return <p>Loading ...</p>;
    // }
    //console.log(FullCurrencyName.USD);
    return (
      <div className="App">
        <header className="AppHeader pt-5">
          <h1 className="pb-3">Currency Converter</h1>
            <BaseAmount baseValue={this.handleValueChange} />
            <div className="pt-1"></div>
            <BaseCurrency /> 
          {/* <p>baseValue: {this.state.baseValue}</p> */}
            <Result result={this.state.currencyData} bv={this.state.baseValue} />
        </header>
      </div>
    )
  }
}

//requires state lift
class BaseCurrency extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.state ={
      val: 'AUD'
    }
  }

  handleChange(e) {
    this.setState({val: e.target.value});
  }

  render() {
    console.log()
    return (
      <div>
        <select className="btn btn-success" onChange={this.handleChange} value={this.state.val}>
          <option value="AUD">AUD</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
        </select> 
        <p>{this.state.val}</p>
      </div>
  )
  }
}

class BaseAmount extends React.Component {
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
        <input placeholder="0" className="text-center" onChange={this.handleChange}></input>
      </div>
  )
  }
}

class Result extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          {
            Object.entries(this.props.result).map(([key,value])=> (<div className="row text-center">
              <div className="col" key={key}>
                {key}
              </div> 
              <div className="col">
                {(this.props.bv * value).toFixed(2)}
              </div>
              </div>
            ))
          }
        </div>
        <div className="col-3"></div>
      </div>
    )
  }
}

export default App;