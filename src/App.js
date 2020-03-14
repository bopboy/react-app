import React, { Component } from 'react';
import TOC from './components/TOC'
import ReadContents from './components/ReadContents'
import CreateContents from './components/CreateContents'
import UpdateContents from './components/UpdateContents'
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
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }
  getContent() {
    var _title, _desc = null, _article;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContents title={_title} desc={_desc}></ReadContents>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article =
        <ReadContents title={_content._title} desc={_content.desc} ></ReadContents>
    } else if (this.state.mode === 'create') {
      _article = <CreateContents onSubmit={function (_title, _desc) {
        this.max_content_id = this.max_content_id + 1;
        var newContents = Array.from(this.state.contents);
        newContents.push({
          id: this.max_content_id,
          title: _title,
          desc: _desc
        });
        this.setState({
          contents: newContents,
          mode: 'read',
          selected_content_id: this.max_content_id
        })
        console.log(_title, _desc);
      }.bind(this)}></CreateContents>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContents data={_content} onSubmit={
        function (_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[i] = { id: _id, title: _title, desc: _desc };
              console.log("test", _contents[i]);

              break;
            }
            i = i + 1;
          }
          this.setState({
            contents: _contents,
            mode: 'read'
          });
        }.bind(this)}></UpdateContents>
    }
    return _article;
  }
  render() {
    console.log("App render")
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
        {this.getContent()}
      </div>
    );
  }
}

export default App;