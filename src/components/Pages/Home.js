import React, { Component } from 'react';


import Title from '../Bits/title';
import QuerySelector from '../Sections/QuerySelector';

class Home extends Component {
  render() {
    return (
      <div className="home">
      	<Title text="HelloAndrew" />
      	<QuerySelector />
      </div>
    );
  }
}

export default Home;
