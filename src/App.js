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
          <h1>Teach Assist</h1>
        </header>
        {isLoggedIn ? (
          <div>
            <h2>Courses</h2>
            {courses.map((course) => (
              <div key={course.code}>
                <h3>{course.name}</h3>
                <p>{course.overall_mark}</p>
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