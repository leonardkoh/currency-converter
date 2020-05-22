import React from 'react';
import './App.css';
import {FullCurrencyName} from './CurrencyName';

const _URL = 'https://api.exchangeratesapi.io/latest?base=';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      baseValue: 0,
      baseCurrency: 'AUD',
      currencyData: {},
      isLoading: false,
      hasError: false,
    }

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.getCurrency = this.getCurrency.bind(this);
  }

  componentWillMount() {
    this.getCurrency();
  }

  getCurrency() {
    this.setState({isLoading: true});

    fetch(_URL + this.state.baseCurrency)
      .then(res => res.json())
      .then(data => {this.setState({currencyData: data.rates, isLoading: false, hasError: false})});
  }

  handleValueChange(e) {
    this.setState({baseValue: e})
  }

  handleCurrencyChange(e) {
    // console.log(e);
    this.setState({baseCurrency: e})
    // console.log(this.state.baseCurrency);
    this.getCurrency();
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
            <BaseCurrency currencyChange={this.handleCurrencyChange} currency={this.state.baseCurrency}/> 
            <p>{this.state.baseCurrency}</p>
            <Result result={this.state.currencyData} bv={this.state.baseValue} currency={this.state.baseCurrency}/>
        </header>
      </div>
    )
  }
}

class BaseCurrency extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.currencyChange(e.target.value);
  }

  render() {
    console.log()
    return (
      <div>
        <select className="btn btn-success" onChange={this.handleChange} value={this.props.currency}>
          <option value="AUD">AUD</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
        </select> 
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

    //need to handle NaN input

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