import React, { Component } from 'react';

import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import './App.css';

class App extends Component {
  state = { name: '',
            names: [],
  };

  onFormSubmit = (evt) => {
    const names = [...this.state.names, this.state.name];
    this.setState({ names: names, name: '' });
    evt.preventDefault();
  }
  onNameChange = (evt) => {
    this.setState({ name: evt.target.value });
  }
  render() {
    const wellStyles = {maxWidth: 400, margin: '20px auto 10px'};

    return (
      <div className="well" style={wellStyles}>
        <Form inline onSubmit={this.onFormSubmit}>
          <h3>Sign Up</h3>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Name</ControlLabel>
            {' '}
            <FormControl
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </FormGroup>
          {' '}
          <Button type="submit">
          Submit
          </Button>
        </Form>

        <div className="output">
          <h4>Names: </h4>
          <ul>
            { this.state.names.map((name, i) => <li key={i}>{name}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
