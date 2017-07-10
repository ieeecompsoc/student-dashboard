import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../Nav/Nav.jsx';

injectTapEventPlugin();

class App extends Component {

  render() {

    return (
      <div>
        <MuiThemeProvider >
            <NavBar />
        </MuiThemeProvider>
        <MuiThemeProvider>
          {this.props.children && React.cloneElement(this.props.children, {
            data: this.props.data
          })}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
