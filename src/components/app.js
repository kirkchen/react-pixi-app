import React from 'react';
import { Application, Graphics } from 'pixi.js';

import { getRandomInt } from '../utils/number';

export default class App extends React.Component {
  constructor() {
    super();

    this.handleCanvasClick = this.handleCanvasClick.bind(this);
  }

  componentDidMount() {
    this.app = new Application(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(this.app.view);

    this.app.start();
  }

  componentWillUnmount() {
    this.app.stop();
  }

  handleCanvasClick(e) {
    let radius = getRandomInt(20, 50);

    let circle = new Graphics();
    circle.beginFill(0x9966FF);
    circle.drawCircle(e.clientX, e.clientY, radius);
    circle.endFill();

    this.app.stage.addChild(circle);
  }

  render() {
    return (
      <div ref={(element) => this.canvas = element}
        onClick={this.handleCanvasClick}></div>
    );
  }
}
