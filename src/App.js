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
      <h3 className="course-name">{course.name}</h3>
      <p className="course-teacher">{course.teacher}</p>
      <p className="course-mark">{course.mark ? course.mark : "Grade Not Open"}</p>
      <p className="course-code">{course.code}</p>
      <p className="course-room">{"Room: " + course.room}</p>
      {course.overall_mark === "null" ? (
        <p className="course-overall-mark">{course.overall_mark ? course.overall_mark : "Grade Not Open"}</p>
      ) : (
        <p className="course-overall-mark">{"Overall Mark: " + course.overall_mark + "%"}</p>
      )}
    </div>
  ))}
</div>
          ) : (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>
              <input type="submit" value="Submit" />
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