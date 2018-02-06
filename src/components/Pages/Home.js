import React, { Component } from 'react';


import Title from '../Bits/title';
import QuerySelector from '../Sections/QuerySelector';

class Home extends Component {
  render() {
    return (
      <div className="home">
      	<Title />
      	<QuerySelector categories={[]}/>
      </div>
    );
  }
}

export default Home;
