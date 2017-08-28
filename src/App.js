import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    teams: [],
    name: '',
    order: [],
    emails: '',
  };

  shuffleArray = (arr) => {
    const array = arr;

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  handleGenerateDraftOrder = (e) => {
    e.preventDefault();

    this.setState({
      order: this.shuffleArray([...this.state.teams]),
      teams: [],
    })
  }

  renderTeam = (name, idx) => {
    return (
      <li key={idx} className="list-group-item list-group-item-warning">{name}</li>
    );
  }

  renderOrder = (name, idx) => {
    return (
      <li key={idx} className="list-group-item list-group-item-success">{idx + 1}. {name}</li>
    );
  }

  handleSendEmail = (e) => {
    e.preventDefault();

    this.setState({
      sendEmailForm: true,
    });
  }

  resetTeams = (e) => {
    e.preventDefault();

    this.setState({
      order: [],
      teams: [],
      name: '',
    });
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  handleAddTeam = (e) => {
    e.preventDefault();

    if (!this.state.name) return;

    const teams = [...this.state.teams];

    teams.push(this.state.name);

    this.setState({ teams, name: '' });
  }

  renderSendEmailForm = () => {
    return (
      <div>
        <h4>
          Enter in all email address you wish to send this draft order to:
        </h4>
        <p>Please separate each email address with a comma</p>
        <div className="form-group">
          <input
            value={this.state.emails}
            className="form-control"
            placeholder="bigzeke22@gmail.com, demaryius@hotmail.com, brownsguy@yahoo.com"
            onChange={e => this.handleChange('emails', e.currentTarget.value)}
          />
        </div>
        <button onClick={this.handleSendEmail} type="submit" className="btn btn-primary btn-block">
          Send Email
        </button>
      </div>
    );
  }

  renderListGroup = () => {
    return (
      <div>
        {
          this.state.order.length
            ?
              <div className="alert alert-info" role="alert">
                Draft order has been generated:
              </div>
            :
              null
        }
        <ul className="list-group">
          {this.state.teams.map(this.renderTeam)}
          {this.state.order.map(this.renderOrder)}
        </ul>
        {/* {
          this.state.order.length ?
            <div>
              <button id="generate" onClick={this.handleSendEmail} type="submit" className="btn btn-primary btn-block">
                Email your league-mates
              </button>
            </div>
          : null
        } */}
        {
          !this.state.order.length &&
            <div className="form-group">
              <input
                value={this.state.name}
                className="form-control"
                placeholder="Team Name"
                onChange={e => this.handleChange('name', e.currentTarget.value)}
              />
            </div>
        }
        {
          !this.state.order.length ?
            <div>
              <button onClick={this.handleAddTeam} type="submit" className="btn btn-primary btn-block">
                Add Team
              </button>
              <button onClick={this.handleGenerateDraftOrder} type="submit" className="btn btn-success btn-block" id="generate">
                Generate Draft Order
              </button>
            </div>
          : null
        }
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Generate a random draft order</h2>
          <p>Enter in the team names of your draft below</p>
        </div>
        <div className="App-content">
          <form className="col-md-4 col-md-offset-4 col-xs-10 col-xs-offset-1">
            {this.state.sendEmailForm ? this.renderSendEmailForm() : this.renderListGroup()}
          </form>
        </div>
        <div className="App-footer">
          F. Blake Guilloud | 2017
        </div>
      </div>
    );
  }
}

export default App;
