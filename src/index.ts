import { AssetSource, GameObject, World, enableDebug, preload } from 'kiwiengine';
import { JoyObject, JoyObjectOptions } from './joy';

const world = new World({ backgroundColor: 0x000000 });
world.container.style.width = '100%';
world.container.style.height = '100%';

function $(opts?: JoyObjectOptions) {
  const go = new JoyObject(opts);
  world.add(go);
  return go;
}

$.enableDebug = enableDebug;
$.preload = async (assets: AssetSource[], percentCallback: (percent: number) => void) => {
  await preload(assets, (progress) => {
    percentCallback(progress * 100);
  });
};

$.on = (eventName: 'collisionStart' | 'update', listener: (go1: GameObject, go2: GameObject) => void) => {
  world?.on(eventName, listener);
};

$.gameWidth = window.innerWidth;
$.gameHeight = window.innerHeight;

window.addEventListener('resize', () => {
  $.gameWidth = window.innerWidth;
  $.gameHeight = window.innerHeight;
});

Object.defineProperty($, 'gravity', {
  get() { return world.gravity; },
  set(value: number) { world.gravity = value; },
});

Object.defineProperty($, 'cameraX', {
  get() { return world.cameraX; },
  set(value: number) { world.cameraX = value; },
});

Object.defineProperty($, 'cameraY', {
  get() { return world.cameraY; },
  set(value: number) { world.cameraY = value; },
});

(window as any).$ = $;

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.width = '100%';
  document.documentElement.style.height = '100%';
  document.documentElement.style.margin = '0';
  document.documentElement.style.padding = '0';

  document.body.style.width = '100%';
  document.body.style.height = '100%';
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.backgroundColor = 'black';
  document.body.style.color = 'white';
  document.body.style.overflow = 'hidden';

  document.body.appendChild(world.container);
});
