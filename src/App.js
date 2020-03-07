import React, { Component } from 'react';
import TOC from './components/TOC'
import Contents from './components/Contents'
import Subject from './components/Subject'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: {
        title: "WEB", sub: "World Wide Web!!"
      }
    }
  }
  render() {
    return (
      <div className="App" >
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject>
        <TOC></TOC>
        <Contents title="HTML" desc="HTML is HyperText Markup Language"></Contents>
      </div>
    );
  }
}

export default App;