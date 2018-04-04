import React from 'react';
import { Application } from 'pixi.js';

export default class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.app = new Application(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(this.app.view);

    this.app.start();
  }

  componentWillUnmount(){
    this.app.stop();
  }

  render() {
    return (
      <div ref={(element) => this.canvas = element}></div>
    );
  }
}
