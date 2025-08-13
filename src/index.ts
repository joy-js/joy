import { AssetSource, GameObject, World, enableDebug, preload } from 'kiwiengine';
import { JoyObject, JoyObjectOptions } from './joy';

let gravity = 0;
let world: World | undefined;
const pendingObjects: GameObject[] = [];

function $(opts?: JoyObjectOptions) {
  const go = new JoyObject(opts);
  world ? world.add(go) : pendingObjects.push(go);
  return go;
}

$.enableDebug = enableDebug;
$.preload = async (assets: AssetSource[], percentCallback: (percent: number) => void) => {
  await preload(assets, (progress) => {
    percentCallback(progress * 100);
  });
};

$.gameWidth = window.innerWidth;
$.gameHeight = window.innerHeight;

window.addEventListener('resize', () => {
  $.gameWidth = window.innerWidth;
  $.gameHeight = window.innerHeight;
});

Object.defineProperty($, 'gravity', {
  get() {
    return gravity;
  },
  set(value: number) {
    gravity = value;
    if (world) world.gravity = value;
  },
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

  world = new World({ backgroundColor: 0x000000, gravity });
  world.container.style.width = '100%';
  world.container.style.height = '100%';
  document.body.appendChild(world.container);

  for (const go of pendingObjects) {
    world.add(go);
  }
  pendingObjects.length = 0;
});
