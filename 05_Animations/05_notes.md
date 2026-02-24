
Animations, when using Three.js, work like stop motion. You move the objects, and you do a render. Then you move the objects a little more, and you do another render. Etc.

We want to execute a function that will move objects and do the render on each frame regardless of the frame rate. Because some screens can run much faster if they have more than 60 frames per second, and when the computer has difficulties processing things, it'll run more slowly.

# Using requestAnimationFrame
`requestAnimationFrame()` will execute the function you provide **on the next frame**.

Create a function named tick and call this function once. In this function, use window.requestAnimationFrame(...) to call this same function on the next frame:

```javascript
const tick = () =>
{
	// Update objects
    mesh.rotation.y += 0.01

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```

That's it. You have your infinite loop. If you test this code on a computer with a high frame rate, the 'tick' will appears at a higher frequency.


# Adaptation to the framerate
To adapt the animation to the framerate, we need to know how much time it's been since the last tick.

## `Date.now()`
In native JavaScript, you can use Date.now() to get the current timestamp: `const time = Date.now()`

> The timestamp corresponds to how much time has passed since the 1st of January 1970 (the beginning of time for Unix). In JavaScript, its unit is in milliseconds.

What you need now is to subtract the current timestamp to that of the previous frame to get what we can call the deltaTime and use this value when animating objects:

```javascript
let time = Date.now()

const tick = () =>
{
  // Time
  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  // Update objects
  mesh.rotation.y += 0.01 * deltaTime

  // ...
}
tick()
```
The rotation speed will be the same on every screen and every computers regardless of the frame rate.

## Using Clock
There is a built-in solution in Three.js named Clock that will handle the time calculations.

You simply have to instantiate a `Clock` variable and use the built-in methods like `getElapsedTime()`. This method will return how many seconds have passed since the `Clock` was created.

```javascript
const clock = new THREE.Clock()

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  mesh.rotation.y = elapsedTime

  // ...
}

tick()
```
- Another available method is `getDelta(...)`, but you should not use it unless you know exactly what's going on in the `Clock` class code. Using it might mess with your animation, and you'll get unwanted results.


## Using a library
There are tons of animation libraries, but a very famous one is [GSAP](https://gsap.com/docs/v3/).
Import Library: `import gsap from 'gsap'`.

Then you can create what we call a tween (an animation from A to B) using `gsap.to(...)`:
```javascript
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```

> GSAP has a built-in requestAnimationFrame, so you don't need to update the animation by yourself, but still, if you want to see the cube moving, you need to keep doing the renders of your scene on each frame.
