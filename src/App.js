import React, { Component } from 'react';
import TOC from './components/TOC'
import ReadContents from './components/ReadContents'
import CreateContents from './components/CreateContents'
import Subject from './components/Subject'
import Control from './components/Control'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "create",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web!!" },
      welcome: { tilte: "Welcome", desc: "Welcome, React!!" },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'Jacascript', desc: 'Javascript is for interaction' }
      ]
    }
  }
  render() {
    console.log("App render")
    var _title, _desc = null, _article;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContents title={_title} desc={_desc}></ReadContents>
    } else if (this.state.mode === 'read') {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContents title={_title} desc={_desc}></ReadContents>
    } else if (this.state.mode === 'create') {
      _article = <CreateContents onSubmit={function (_title, _desc) {
        // code for adding content to this.state.contents
        this.max_content_id = this.max_content_id + 1;
        // this.state.contents.push({
        //   id: this.max_content_id, title: _title, desc: _desc
        // });
        // var _contents = this.state.contents.concat({
        //   id: this.max_content_id, title: _title, desc: _desc
        // });
        var newContents = Array.from(this.state.contents);
        newContents.push({
          id: this.max_content_id,
          title: _title,
          desc: _desc
        });
        this.setState({
          // contents: _contents
          contents: newContents
        })
        console.log(_title, _desc);
      }.bind(this)}></CreateContents>
    }
    return (
      <div className="App" >
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({
              mode: "welcome"
            })
          }.bind(this)}>
        </Subject>
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function (mode) {
          this.setState({
            mode: mode
          })
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }
}

export default App;