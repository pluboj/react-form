import React, { Component } from 'react';
import isEmail from 'validator/lib/isEmail';
import { Form, FormGroup, Button, Col, Checkbox } from 'react-bootstrap';
import './App.css';

import Field from './input-component.js';

class App extends Component {
  state = { 
    fields: {
      name: '',
      email: '',
      check: false
    },
    errors: {},
    members: [],
  };

  onFormSubmit = (evt) => {
    const members = this.state.members;
    const member = this.state.fields;
    
    evt.preventDefault();

    if (this.validate()) return;

    this.setState({ 
      members: members.concat(member),
      fields: {
        name: '',
        email: '',
        check: false
      }
    });
  };
  
  onInputChange = ({name, value, error}) => {
    const fields = this.state.fields;
    const errors = this.state.errors;

    fields[name] = value;
    errors[name] = error;

    this.setState({ fields, errors });
  };

  checkChange = (e) => {
    const fields = this.state.fields;
    fields.check = e.target.checked;
    this.setState(fields);
  }

  validate = () => {
    const member = this.state.fields;
    const errors = this.state.errors;
    const messages = Object.keys(errors).filter((k) => errors[k]);

    if (!member.name) return true;
    if (!member.email) return true;
    if (messages.length) return true;

    return false;
  };

  render() {
    const wellStyles = {maxWidth: 600, margin: '20px auto 10px'};

    return (
      <div style={wellStyles}>
        <div className="well" style={wellStyles}>
          <Form horizontal onSubmit={this.onFormSubmit}>
            <h3 style={{textAlign: 'center'}}>Sign Up</h3>

            <Field
              placeholder='Name'
              name='name'
              type='text'
              label='Name'
              value={this.state.fields.name}
              onChange={this.onInputChange}
              validate={(val) => (val ? false : 'Name Required')}
            />

            <Field
              placeholder='user@email.com'
              name='email'
              type='email'
              label='Email'
              value={this.state.fields.email}
              onChange={this.onInputChange}
              validate={(val) => (
                val.length < 5 || (val.length >= 5 && isEmail(val)) ? false : 'Invalid Email'
              )}
            />

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox 
                  inputRef={ref => { this.check = ref; }}
                  onChange={this.checkChange}
                  checked={this.state.fields.check}
                  name='check'
                  >
                  Save my email
                </Checkbox>
              </Col>
            </FormGroup>
            
            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button 
                  type="submit"
                  disabled={this.validate()}
                >
                Submit
                </Button>
              </Col>
             </FormGroup>
          </Form>
        </div>

        <div style={{marginTop: '30px'}}>
            <h4>Members: </h4>
            <ul>
              { this.state.members.map(({name, email, check}, i) => 
                <li key={i}>{name} ({email}) <i>save email:{check ? 'yes': 'no'}</i></li>)}
            </ul>
          </div>
      </div>
    );
  }
}

export default App;
