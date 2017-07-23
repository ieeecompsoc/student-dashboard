import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../Nav/Nav.jsx';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentComponent: "Dashboard"
    }
  }

  changeComponent = (component) => {
    this.setState({currentComponent : component});
  }

  render() {

    return (
      <div>
        <MuiThemeProvider >
            <NavBar component={this.state.currentComponent}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          {this.props.children && React.cloneElement(this.props.children, {...this.props, changeComponent: this.changeComponent})}
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
