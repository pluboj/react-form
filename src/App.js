import React, { Component } from 'react';

import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import './App.css';

class App extends Component {
  onFormSubmit = (evt) => {
    evt.preventDefault();
    console.log(this.name.value);
  }
  render() {
    
    return (
      <Form inline onSubmit={this.onFormSubmit}>
        <h3>Sign Up</h3>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Name</ControlLabel>
          {' '}
          <FormControl
            type="text"
            placeholder="Name"
            inputRef={(input) => this.name = input}
          />
        </FormGroup>
        {' '}
        <Button type="submit">
        Submit
        </Button>
      </Form>
    );
  }
}

export default App;
