import React, { Component } from 'react';
import classnames from 'classnames';
import CircularProgress from 'material-ui/CircularProgress';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class Report extends Component{
  constructor(props) {
    super(props);
    this.state = {
      report: [],
      selectedReport: {},
      selectedSemester: "",
      isLoading: true
    }
  }

  findReport = (currentSemester) => {
    this.state.report.forEach(object => {
      if (object.semester == currentSemester)
      {
        this.setState({selectedReport : object});
      }
    })
  }

  makeList = () => {
    let list = [];
    const subjects = this.state.selectedReport.subjects;

    for (let key in subjects) {
      if (subjects.hasOwnProperty(key)) {
        list.push(<TableRow key={key} className={classnames('table-row')}>
          <TableRowColumn>{key}</TableRowColumn>
          <TableRowColumn>{subjects[key]}</TableRowColumn>
        </TableRow>);
      }
    }
    return list;

  }

  componentDidMount() {
    const thiss = this;
    console.log(this.props.token);
    axios({
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-access-token': this.props.token
        },
            url: `/api/v1/getResults`,
            mode: 'cors'
        })
        .then(function (response) {
            thiss.setState({report : response.data, selectedSemester: thiss.props.data.semester-1, isLoading: false});
            thiss.findReport((thiss.props.data.semester) - 1);
        })
        .catch(function (error) {
            console.log(error);
        });

  }

  handleChange = (event, index, value) => {
    this.setState({selectedSemester: value});
    this.findReport(value);
  }

  SelectField = () => {
    const items = [
      <MenuItem key={1} value={1} primaryText="1" />,
      <MenuItem key={2} value={2} primaryText="2" />,
      <MenuItem key={3} value={3} primaryText="3" />,
      <MenuItem key={4} value={4} primaryText="4" />,
      <MenuItem key={5} value={5} primaryText="5" />,
      <MenuItem key={6} value={6} primaryText="6" />,
      <MenuItem key={7} value={7} primaryText="7" />,
      <MenuItem key={8} value={8} primaryText="8" />,
    ];

    const list = [];
    for(let i=0; i<this.props.data.semester-1; i++) {
      list.push(items[i]);
    }
    return list;
  }

  render() {
    return(
      <div className="jumbotron">
        {this.state.isLoading && <CircularProgress size={80} thickness={5} color="black" style={{margin: 'auto'}}/>}
        {!this.state.isLoading && <div className="container report">
            <SelectField
              value={this.state.selectedSemester}
              onChange={this.handleChange}
              floatingLabelText="Semester"
              labelStyle={{fontSize: "1.4em"}}
              underlineStyle={{width: "98%"}}
              className={classnames('report-select')}
            >
              {this.SelectField()}
            </SelectField>
          <Table style={{width: "80%", margin: "auto", boxShadow: "0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22)"}}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow style={{background: "#04171A"}} className={classnames('report-header')}>
                <TableHeaderColumn>Subjects</TableHeaderColumn>
                <TableHeaderColumn>Marks</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows={true} className={classnames('report-body')}>
              {this.makeList()}
            </TableBody>
          </Table>
        </div>}
      </div>
    )
  }
}

export default Report;
