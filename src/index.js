import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import { w3cwebsocket, w3cwebsocket as W3WebSocket } from "websocket";

const client = new w3cwebsocket("ws://127.0.0.1:8000");

export default class App extends Component {

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
      <div>
        <button onClick={() => this.onButtonClicked("Hello")}>Send message</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
