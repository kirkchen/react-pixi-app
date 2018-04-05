export function makeSpriteSupportDoubleClick(target) {
  const DELAY = 300;
  let clicks = 0, timer = null;

  target.on("click", (e) => {
    clicks++;
    if (clicks === 1) {
      timer = setTimeout(function () {
        clicks = 0;
      }, DELAY);
    } else {
      clearTimeout(timer);
      clicks = 0;

      target.emit('dblclick', e);
    }
  });
}
