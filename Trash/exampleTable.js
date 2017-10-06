import React, { Component } from 'react';

import { StickyTable, Row, Cell } from 'react-sticky-table';
import 'react-sticky-table/dist/react-sticky-table.css';

export default class ExampleTable extends Component {
  render() {
    return (
      <div>
        <div style={{width: '400px', height: '400px'}}>
          <StickyTable>
            <Row>
              <Cell>Header 1</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 1</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 2</Cell>
            </Row>
            <Row>
              <Cell>Cell 1</Cell>
              <Cell>Cell 2</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 1</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 2</Cell>
            </Row>
            <Row>
              <Cell>Cell 1</Cell>
              <Cell>Cell 2</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 1</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 2</Cell>
            </Row>
            <Row>
              <Cell>Cell 1</Cell>
              <Cell>Cell 2</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 1</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 2</Cell>


            </Row>
            <Row>
              <Cell>Cell 1</Cell>
              <Cell>Cell 2</Cell>
              <Cell>Header 1</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 1</Cell>
            </Row>
            <Row>
              <Cell>Cell 1</Cell>
              <Cell>Cell 2</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 1</Cell>
              <Cell>Header 2</Cell>
              <Cell>Header 2</Cell>
            </Row>
          </StickyTable>
        </div>
      </div>
    );
  }
}