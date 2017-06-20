import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};
    return (
      <div className="well" style={wellStyles}>
        <Button 
          bsStyle="primary" 
          bsSize="large" 
          block
        >
        Button
        </Button>
      </div>
    );
  }
}

export default App;
