import React, { Component } from 'react'
import RenderYourForm from '../Bits/title.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


class MyComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: true
    }
    
  }

  // handleSubmit () {
  //   this.setState({ redirect: false }));
  // }

  render () {
    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/login'/>
     }

     return(
        <div>
          <h1>OH HELLO! YOU MADE IT</h1>
        </div>
      ); 
  }
}

export default MyComponent;