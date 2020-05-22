import React from 'react';
import './App.css';

const _URL = 'https://api.exchangeratesapi.io/latest?base=';
let baseCurrency = 'AUD' 

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

    fetch(_URL + baseCurrency)
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
            <BaseAmount baseValue={this.handleValueChange}/>
          <br />
            <BaseCurrency /> 
          {/* <p>baseValue: {this.state.baseValue}</p> */}
          <Result result={this.state.currencyData} bv={this.state.baseValue}/>

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
      <div>
        <ul>
          {
            Object.entries(this.props.result).map(([key,value])=> (
              <li key={key}>
                {key}: {(this.props.bv * value).toFixed(2)}
              </li>
            ))
          }
        </ul>
        <br />
      </div>
    )
  }
}

export default App;
