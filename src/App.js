// Created by Musa Aqeel
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


// REST API

// handleChange updates the state with the value of the input field
// that triggered the event
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
// handleSubmit sends a POST request to the specified API with the
// username and password in the request body. If the request is 
// successful, it updates the courses data and sets isLoggedIn to true.
// If there is an error, it updates the error object in the state.
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
          users: data,
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

  // Assignment Data
  //componentDidMount() {
    //this.setState({ isLoading: true });
    //fetch('https://api.pegasis.site/public/yrdsb_ta/getmark_v2')
      //.then((res) => res.json())
      //.then((data) => {
        //this.setState({
          //courses: data,
          //isLoading: false,
        //});
      //})
      //.catch((error) => {
        //this.setState({ error, isLoading: false });
     // });
  //}




  // Render the component
  render() {
    const { isLoggedIn, isLoading, error, courses } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {/* Add the cursor: pointer style to the h1 element */}
          <h1 className="title" onClick={() => window.location.reload()} style={{cursor: "pointer"}}>GradesSite</h1>
          <h3></h3>
        </header>
        {isLoggedIn ? (
          <div className="course-info" >
            <h2>Courses</h2>
            {
              courses.map((course) => {
            /* Set the value of course.number based on the value of course.block */
            switch (course.block) {
              case "P1":
                course.number = 1;
                break;
              case "P2":
                course.number = 2;
                break;
              case "P3":
                course.number = 3;
                break;
              case "P4":
                course.number = 4;
                break;
              default:
                break;
    }
              /* Add the grade-box class to the <div> element */
              if (course.code != null) {
                return (<div key={course.code} className="grade-box">
                  <h3 className="course-name" style={{fontWeight: "bold"}}>{course.name || "Course"}</h3>
                  <p className="course-teacher" style={{color: "gray"}}>{course.teacher}</p>
                  <p className="course-mark" style={{color: "blue"}}>{course.mark}</p>
                  <p className="course-code" style={{fontStyle: "italic"}}>{course.code}</p>
                  
                  {/* course.block displays as "p1-p4", course.number variable only stores number */}
                  {/* if course.block = p1 then set course.number to 1 */}
   

                  <p className="course-room" style={{fontWeight: "bold"}}>{"Room: " + course.room + " | Block: " + course.number}</p>

                  {course.overall_mark ?
                    <p className="course-overall-mark" style={{fontWeight: "bold", fontFamily: 'Helvetica'}}>{`Overall Mark: ${course.overall_mark.toFixed(1)}%`}</p> :
                    <p className="course-overall-mark" style={{fontWeight: "bold", fontFamily: 'Helvetica'}}>{`Grade Not Open for ${course.name || "Course"}`}</p>
                  }
                  

                </div>);
              } else {
                console.log("course code is null")
              }
              
              
              
            })}
          </div>
        ) : (
          <div className="login-form">
            
            <form onSubmit={this.handleSubmit}>
            <div className="form-field">
           <label htmlFor="username" style={{color: "#F5F5F5"}}>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  required
                />

              </div>
              <div className="form-field">
              <label htmlFor="password" style={{color: "#F5F5F5"}}>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />

              </div>
              <div className="button-container">
                <input type="submit" value="Submit" />
              </div>
            </form>
            {error ? <p style={{color: 'white'}}>{error.message}</p> : null}
            {isLoading ? <p style={{color: 'white'}}>Loading...</p> : null}
          </div>
        )}
      </div>
    );
  }
  
  }
  
  export default App;