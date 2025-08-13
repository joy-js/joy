# joy

`joy` is a JavaScript library that helps you easily develop 2D games.

## Usage

First, create an `index.html` file as follows:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <script src="https://cdn.jsdelivr.net/npm/joylib@latest"></script>
  </head>
  <body>
    <script src="game.js"></script>
  </body>
</html>
```

Then, create a file named `game.js` and write your game code:

```js
var go = $({ image: 'assets/dog.png' });
go.on('update', function (deltaTime) {
  go.rotation += deltaTime * 100; // The dog spins around.
});
```

Next, run a local server to access `index.html`, or upload both `index.html` and `game.js` to the internet and access them.

```bash
# Running a local server

# If Python is installed
python3 -m http.server 8000

# If Node.js is installed
npx serve .
```

[Example on the Internet](https://joy-js.github.io/joy/examples/dog/)

## Using the `$` Function

`$` is the central function of `joy`, containing all its features. You can use it for everything from creating game objects to accessing global variables like `$.gameWidth`.

The basic options for creating a game object are:

```js
var go = $({
  image: 'assets/dog.png', // Image for the object
  x: 100, // X coordinate
  y: 200, // Y coordinate
  scale: 2, // Scale factor (you can also set scaleX, scaleY separately)
  rotation: 90, // Rotation angle (pivotX, pivotY set the rotation pivot)
  alpha: 0.5, // Transparency
  drawOrder: 123, // Draw order; larger values are rendered in front
});

// You can change options later as well:
go.x = 300;
```

### Physics-related Options

`joy` allows you to assign colliders to game objects to apply physics.

There are three types of colliders:

* `{ type: 'rect', x: 1, y: 2, width: 10, height: 20 }` — rectangular collider
* `{ type: 'circle', x: 1, y: 2, radius: 5 }` — circular collider
* `{ type: 'vert', x: 1, y: 2, vertices: [{ x: 0, y: 0 }, { x: 0, y: 10 }, { x: 10, y: 10 }] }` — polygon collider

You can set these colliders and physics options as follows:

```js
var go = $({
  collider: { type: 'circle', x: 1, y: 2, radius: 5 }, // Collider
  isStatic: true, // Static body
  isSensor: true, // Sensor-only body (detects collisions but doesn’t react physically)
  velocityX: 10, // Velocity along the X-axis
  velocityY: 20, // Velocity along the Y-axis
  fixedRotation: true, // Prevent rotation from physics
});
```

You can then check for collisions like this:

```js
var player = $({ /* physics settings */ });
var enemy = $({ /* physics settings */ });

$.on('collisionStart', (go1, go2) => {
  if (go1 === player && go2 === enemy) {
    console.log('Collision detected!');
  }
});
```

### Game Object Methods

* `go.add(child1, child2, ...)` — Adds child objects
* `go.remove()` — Removes the object
* `go.on('eventName', listener)` — Registers an event listener for the object
* `go.off('eventName', listener)` — Removes an event listener from the object
* `go.emit('eventName')` — Emits an event from the object

### Global Variables / Functions

* `$.gameWidth` — Game screen width
* `$.gameHeight` — Game screen height
* `$.gravity` — Game gravity setting
* `$.on(eventName, listener)` — Registers a global event listener
* `await $.preload(image, sound, ..., function (percent) { /* show loading progress */ })` — Preloads resources for the game

## Building Larger Games

For larger games, using a single `game.js` file can be limiting.

In JavaScript, you can split your code into multiple `.js` files and use `export` and `import` to share functionality.

You can then use tools like [`esbuild`](https://esbuild.github.io/) to bundle multiple `.js` files into a single one.

## License

MIT

## Questions & Feedback

If you have any questions or suggestions for improvement, feel free to leave them on [**GitHub Issues**](https://github.com/joy-js/joy/issues).
