
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      grades: [],
      isLoading: false,
      error: null,
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    axios
      .get(
        `https://api.pegasis.site/public/yrdsb_ta/grades?username=${this.state.username}&password=${this.state.password}`
      )
      .then(result => {
        this.setState({
          grades: result.data,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  };

  render() {
    const { isLoading, grades, error } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          grades.map(grade => {
            const {
              course_code,
              course_name,
              course_type,
              course_teacher,
              course_mark,
              course_percent,
              course_grade,
            } = grade;
            return (
              <div key={course_code}>
                <p>Course Code: {course_code}</p>
                <p>Course Name: {course_name}</p>
                <p>Course Type: {course_type}</p>
                <p>Course Teacher: {course_teacher}</p>
                <p>Course Mark: {course_mark}</p>
                <p>Course Percent: {course_percent}</p>
                <p>Course Grade: {course_grade}</p>
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}

export default App;