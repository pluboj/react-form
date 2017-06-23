import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import isEmail from 'validator/lib/isEmail';

class Field extends Component {
	static propTypes = {
	    placeholder: PropTypes.string,
	    name: PropTypes.string.isRequired,
	    value: PropTypes.string,
	    validate: PropTypes.func,
	    onChange: PropTypes.func.isRequired,
  	};

	state = {
	    value: this.props.value,
	    error: false,
  	};

  	componentWillReceiveProps(update) {
    	this.setState({ value: update.value });
  	}

  	onChange = (evt) => {
	    const name = this.props.name;
	    const value = evt.target.value;
	    const error = this.props.validate ? this.props.validate(value) : false;

	    this.setState({ value, error });

	    this.props.onChange({ name, value, error });
  	};

    input_feedback = () => {
      const trimmed = this.state.value.trim();
      const length = trimmed.length;

      if (this.props.name === 'name') {
        if (length > 2) return 'success';
        else if (length > 1) return 'warning';
        else if (length > 0) return 'error';
      } else if (this.props.name === 'email') {
        if (length > 5 && isEmail(this.state.value)) return 'success';
        else if (length > 3) return 'warning';
        else if (length > 0) return 'error';
      }   
    };

	render() {
		return(
			<FormGroup validationState={this.input_feedback()}>
			  <Col componentClass={ControlLabel} sm={2}>
            {this.props.label}
        </Col>
        <Col sm={10}>
          <FormControl
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.onChange}
          />
          <FormControl.Feedback />
        </Col>
        <Col smOffset={2} sm={10}>
          <span style={{ color: 'red'}}>{this.state.error}</span>
        </Col>
      </FormGroup>
		);
	}
}

export default Field;