import React, { Component } from 'react';

import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';

import './App.css';

class App extends Component {
  state = { 
    fields: {
      name: '',
      email: ''
    },
    members: [],
  };

  componentDidMount() {
    this.nameInput.focus();
  }

  onFormSubmit = (evt) => {
    const members = [
      ...this.state.members, 
      this.state.fields,
    ];

    this.setState({ 
      members,
      fields: {
        name: '',
        email: ''
      }
    });

    evt.preventDefault();
    this.nameInput.focus();
  }
  
  onInputChange = (evt) => {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({fields});
  }
  render() {
    const wellStyles = {maxWidth: 600, margin: '20px auto 10px'};

    return (
      <div style={wellStyles}>
        <div className="well" style={wellStyles}>
          <Form horizontal onSubmit={this.onFormSubmit}>
            <h3 className="header">Sign Up</h3>

            <FormGroup controlId="formInlineName">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.fields.name}
                  onChange={this.onInputChange}
                  inputRef={(input) => { this.nameInput = input; }}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formInlineEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl
                  type="email"
                  name="email"
                  placeholder="user@email.com"
                  value={this.state.fields.email}
                  onChange={this.onInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">
                Submit
                </Button>
              </Col>
             </FormGroup>
          </Form>
        </div>
        <div className="output">
            <h4>Members: </h4>
            <ul>
              { this.state.members.map(({name, email}, i) => 
                <li key={i}>{name} ({email})</li>)}
            </ul>
          </div>
      </div>
    );
  }
}

export default App;
