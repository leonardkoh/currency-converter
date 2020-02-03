import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      currency: '',
      value: ''
    }

    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=AUD")
      .then(res => res.json())
      .then(result => {this.setState({currency: result})});
  }

  handleAmountChange(e) {
    this.setState({value: e})
    console.log(this.state.value);
  }

  render() {
    console.log("render");
    console.log(`${this.state.currency}`)
    return (
      <div className="App">
        <header className="App-header pt-5">
          <h1>Currency Converter</h1>
            <BaseAmount value={this.handleAmountChange}/>
          <br />
            <BaseCurrency /> 
          <br />
          <ChildCurrency result={this.state.currency.rates} />
        </header>
      </div>
    )
  }
}

class BaseCurrency extends React.Component {

  componentDidMount() {
    fetch("https://api.exchangeratesapi.io/latest?base=AUD")
      .then(res => res.json())
      .then((result) => {this.setState({currency: result})});
  }
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
class BaseAmount extends React.Component {
  constructor(props) {
    super(props);
  
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.value(e.target.value);
  }

  render() {
    return (
      <div>
        <input className="" onChange={this.handleChange}></input>
      </div>
  )
  }
}

function ChildCurrency(c) {
    console.log(c.result)
    return (
      <div>
      Child Currency
      <br />
        {/* {c.result} */}
      
      </div>
  
  )
}

export default App;
