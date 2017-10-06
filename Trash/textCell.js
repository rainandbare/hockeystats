import React, { Component } from 'react';
import { Cell }  from 'fixed-data-table';
import { connect } from 'react-redux';
import { editForm } from '../../actions/edit_actions.js';

import FontAwesome from 'react-fontawesome';
import slug from '../../functions/slug.js'

class TextCell extends Component{
  constructor(props){
     super(props);
     this.toggleEditForm = this.toggleEditForm.bind(this);
  }
  toggleEditForm(playerID){
   
    this.props.editForm(playerID[0]);
    this.props.toggleForm();

  }
  render(){
    var {rowIndex, data, columnKey, keys, openCert, certificates, ...props} = this.props;
    return(
      <Cell {...props} 
      className={data[keys[rowIndex]]["status"].toLowerCase()} 
      onClick={() => this.toggleEditForm([keys[rowIndex]])}>
        {data[keys[rowIndex]][columnKey]}
        { (columnKey === "birthDate") && (Object.keys(certificates.birth).includes(slug(data[keys[rowIndex]]['name']))) ? <span className="certDot" onClick={() => openCert(certificates, slug(data[keys[rowIndex]]['name']), columnKey)}><FontAwesome name="circle"/></span> : "" }
        { (columnKey === "deathDate") && (Object.keys(certificates.death).includes(slug(data[keys[rowIndex]]['name']))) ? <span className="certDot" onClick={() => openCert(certificates, slug(data[keys[rowIndex]]['name']), columnKey)}><FontAwesome name="circle"/></span> : "" }
      </Cell>
    );
  }
}


export default connect(null, { editForm })(TextCell);