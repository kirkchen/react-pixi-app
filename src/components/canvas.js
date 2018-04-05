import React from 'react';
import { Application, Container, Sprite, Graphics } from 'pixi.js';

import { getRandomInt } from '../utils/number';
import { makeSpriteDraggable } from '../utils/draggable';
import { makeSpriteSupportDoubleClick } from '../utils/doubleClick';

export default class Canvas extends React.Component {
  constructor() {
    super();

    // Set default dragging state
    this.onDrag = false;

    // Handle event's context
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
    if (!this.onDrag) {
      // Create a new circle with random radius when click on the canvas
      const color = 0xFFFFFF;
      const borderColor = 0xffd900;
      let radius = getRandomInt(20, 50);

      let sprite = this.createCircularSprite(radius, color, borderColor);
      sprite.position.x = e.clientX - radius;
      sprite.position.y = e.clientY - radius;

      // Make circle support drag and drop
      makeSpriteDraggable(sprite, this.app, radius);

      // Prevent create new circle when dragging a circle
      sprite.on('dragStart', () => this.onDrag = true);
      sprite.on('dragStop', () => this.onDrag = false);

      // Make circle support double click. Remove it when double click on circle
      makeSpriteSupportDoubleClick(sprite);

      // Remove a circle from canvas when double click on it
      sprite.on('dblclick', () => this.app.stage.removeChild(sprite));

      this.app.stage.addChild(sprite);
    }
  }

  createCircularSprite(radius, color, borderColor) {
    let circle = new Graphics();
    circle.beginFill(color);
    circle.lineStyle(4, 0xffd900, 1)
    circle.drawCircle(0, 0, radius);
    circle.endFill();

    let sprite = new Sprite(circle.generateCanvasTexture());

    return sprite;
  }

  render() {
    return (
      <div ref={(element) => this.canvas = element}
        onMouseDown={this.handleCanvasClick}></div>
    );
  }
}
