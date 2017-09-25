import React, { Component } from 'react';
import { fetchPlayers } from '../../actions/player_actions.js';
import { connect } from 'react-redux';
var faker = require('faker');



class MaybeObjectDataListStore extends Component{
  constructor(props){
    super(props)

    console.log(this.state)


    this.size =  2000;
    this._cache = [];
  }

  createRealRowObjectData(/*number*/ index) /*object*/ {
    console.log(this.state)
    return {
      id: index,
      avatar: faker.image.avatar(),
      city: faker.address.city(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      street: faker.address.streetName(),
      zipCode: faker.address.zipCode(),
      date: faker.date.past(),
      bs: faker.company.bs(),
      catchPhrase: faker.company.catchPhrase(),
      companyName: faker.company.companyName(),
      words: faker.lorem.words(),
      sentence: faker.lorem.sentence(),
    };
  }

  getObjectAt(/*number*/ index) /*?object*/ {
    if (index < 0 || index > this.size){
      return undefined;
    }
    if (this._cache[index] === undefined) {
      this._cache[index] = this.createRealRowObjectData(index);
    }
    return this._cache[index];
  }

  getAll() {
    if (this._cache.length < this.size) {
      for (var i = 0; i < this.size; i++) {
        this.getObjectAt(i);
      }
    }
    return this._cache.slice();
  }

  getSize() {
    return this.size;
  }
}


function mapStateToProps(state){
  return {
    players: state.players,
    // headings: state.headings,
    // buttons: state.buttons,
    // certificates: state.certificates,
    // searchTerm: state.searchTerm
  }
}


export default connect(mapStateToProps, { fetchPlayers })(MaybeObjectDataListStore);
