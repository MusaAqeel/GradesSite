import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      courses: [],
      isLoggedIn: false,
      isLoading: false,
      error: null,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    fetch('https://api.pegasis.site/public/yrdsb_ta/getmark_v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          courses: data,
          isLoggedIn: true,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  };

  // Render the component
  render() {
    const { isLoggedIn, isLoading, error, courses } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Teach Assist V2</h1>
          <h3></h3>
        </header>
        {isLoggedIn ? (
          <div className="course-info" style={{ color: "#035337", fontSize: "16px" }}>
            <h2>Courses</h2>
            {courses.map((course) => (
              <div key={course.code}>
                <h3 className="course-name">{course.name || "Course"}</h3>
                <p className="course-teacher">{course.teacher}</p>
                <p className="course-mark">{course.mark}</p>
                <p className="course-code">{course.code}</p>
                <p className="course-room">{"Room: " + course.room}</p>
                {course.overall_mark ? (
                  <p className="course-overall-mark">{`Overall Mark: ${course.overall_mark}%`}</p>
                ) : (
                  <p className="course-overall-mark">{`Grade Not Open for ${course.name || "Course"}`}</p>
                )}
              </div>
            ))}
          </div>
          ) : (
            <div className="login-form">
              <form onSubmit={this.handleSubmit}>
                <div className="form-field">
                  <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} required />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-field">
                  <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="button-container">
                  <input type="submit" value="Submit" />
                </div>
              </form>
              {error ? <p>{error.message}</p> : null}
              {isLoading ? <p>Loading...</p> : null}
            </div>
          )}
        </div>
      );
    }
  }
  
  export default App;