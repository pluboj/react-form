import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';

import { Form, FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';

import './App.css';

class App extends Component {
  state = { 
    fields: {
      name: '',
      email: ''
    },
    errors: {},
    members: [],
  };

  componentDidMount() {
    this.nameInput.focus();
  }

  onFormSubmit = (evt) => {
    const members = [...this.state.members];
    const member = this.state.fields;
    const errors = this.validate(member);
    this.setState({ errors });
    evt.preventDefault();

    if (Object.keys(errors).length) return;

    this.setState({ 
      members: members.concat(member),
      fields: {
        name: '',
        email: ''
      }
    });
 
    this.nameInput.focus();
  };
  
  onInputChange = (evt) => {
    const fields = this.state.fields;
    fields[evt.target.name] = evt.target.value;
    this.setState({fields});
  };

  validate = (member) => {
    const errors = {};
    if (!member.name) errors.name = 'Name Required';
    if (!member.email) errors.email = 'Email Required';
    if (member.email && !isEmail(member.email)) errors.email = 'Invalid Email';
    return errors;
  };

  getNameValidation = () => {
    const trimmed = this.state.fields.name.trim();
    const length = trimmed.length;
    if (length > 3) return 'success';
    else if (length > 2) return 'warning';
    else if (length > 0) return 'error';
  };

  render() {
    const wellStyles = {maxWidth: 600, margin: '20px auto 10px'};

    return (
      <div style={wellStyles}>
        <div className="well" style={wellStyles}>
          <Form horizontal onSubmit={this.onFormSubmit}>
            <h3 style={{textAlign: 'center'}}>Sign Up</h3>

            <FormGroup 
              controlId="formInlineName"
              validationState={this.getNameValidation()}
            >
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
                <FormControl.Feedback />
              </Col>
              <Col smOffset={2} sm={10}>
                <span style={{ color: 'red'}}>{this.state.errors.name}</span>
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
              <Col smOffset={2} sm={10}>
                <span style={{ color: 'red'}}>{this.state.errors.email}</span>
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

        <div style={{marginTop: '30px'}}>
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
