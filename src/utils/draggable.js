export function makeSpriteDraggable(target, app, radius) {
  target.interactive = true;

  let drag;
  target.on("mousedown", (e) => {
    drag = target;

    target.emit('dragStart');
  })
  target.on("mouseup", (e) => {
    drag = null;

    target.emit('dragStop');
  })

  target.on("mousemove", function (e) {
    if (drag) {
      drag.position.x = e.data.originalEvent.pageX - app.view.offsetLeft - radius;
      drag.position.y = e.data.originalEvent.pageY - app.view.offsetTop - radius;
      // drag.position.x += e.data.originalEvent.movementX;
      // drag.position.y += e.data.originalEvent.movementY;
    }
  })
}
