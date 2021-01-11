import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import { w3cwebsocket, w3cwebsocket as W3WebSocket } from "websocket";
import { Card, Avatar, Input, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Search } = Input;

const client = new w3cwebsocket("ws://127.0.0.1:8000");

export default class App extends Component {

  state = {
    userName: '',
    isLoggedIn: false
  }

  onButtonClicked = (value) => {
    client.send(JSON.stringify({
      type: "message",
      msg: value
    }));
  }

  componentDidMount(){
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('got reply! ', dataFromServer);
    };
  }
  render(){
    return (
      <div className="main">
        {this.state.isLoggedIn ?
          <button onClick={() => this.onButtonClicked("Hello")}>Send message</button>
        :
          <div style={{padding: '30vw 15vw'}}>
            <Search 
              placeholder="Enter Username"
              enterButton="Login"
              size="large"
              onSearch={value => this.setState({isLoggedIn: true, userName: value})}
            />
          </div>
        }
        
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
