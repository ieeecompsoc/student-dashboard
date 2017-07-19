import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../Nav/Nav.jsx';



class App extends Component {


  render() {

    return (
      <div>
        <MuiThemeProvider >
            <NavBar />
        </MuiThemeProvider>
        <MuiThemeProvider>
          {this.props.children && React.cloneElement(this.props.children, {...this.props})}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
