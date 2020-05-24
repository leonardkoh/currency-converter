import React from 'react';
import './App.css';
import {FullCurrencyName, CurrencyList} from './Currency';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      baseValue: 0,
      baseCurrency: 'AUD',
    }

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  handleValueChange(e) {
    this.setState({baseValue: e})
  }

  handleCurrencyChange(e) {
    this.setState({baseCurrency: e})
  }

  render() {
    return (
      <div className="App">
        <header className="AppHeader pt-5">
          <h1 className="pb-3">Currency Converter</h1>
            <div className="row justify-content-center">
              <BaseAmount baseValue={this.handleValueChange} />
              <div className="ml-2"></div>
              <BaseCurrency currencyChange={this.handleCurrencyChange} currency={this.state.baseCurrency}/> 
            </div>
            <div className="mb-3"></div>
            <Result bv={this.state.baseValue} currency={this.state.baseCurrency}/>
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
    return (
      <div>
        <select className="btn btn-success" onChange={this.handleChange} value={this.props.currency}>
          { CurrencyList.map(
            (e) => <option value={e}>{e}</option>
          )}
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
    return ( <input placeholder="0" className="text-center" onChange={this.handleChange}></input> )
  }
}

function ShowLoadingSpinner() {
  return (
    <div>
      <h4 className="mb-3">Loading ...</h4>
      <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  ) 
} 

const _URL = 'https://api.exchangeratesapi.io/latest?base=';
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastCurrency: '',
      currencyData: {},
      isLoading: false,
    }

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
  }

  componentDidMount() {
    this.handleCurrencyChange();
  }
  componentDidUpdate() {
    if(this.state.lastCurrency !== this.props.currency) 
      this.handleCurrencyChange();
  }

  handleCurrencyChange() {
    this.setState({thisisLoading: true})

    fetch(_URL + this.props.currency)
      .then(res => res.json())
      .then(data => {this.setState({currencyData: data.rates, isLoading: false})});

    this.setState({lastCurrency: this.props.currency})
  }
  
  render() {
    if(this.state.isLoading) 
      return (<div><ShowLoadingSpinner /></div>)

    else
      return(
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            {
              Object.entries(this.state.currencyData).map(([key,value])=>( 
                <div className="row">
                  <div className="col text-right" key={key}>
                    {key}
                  </div> 
                  <div className="col text-left">
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