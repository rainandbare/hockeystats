import React, { Component } from 'react';


import Title from './title';
import QuerySelector from './querySelector';

class Home extends Component {
  render() {
    return (
      <div className="home">
      	<Title />
      	<QuerySelector />
      </div>
    );
  }
}

export default Home;
