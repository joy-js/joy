import { GameObject, World, enableDebug } from 'kiwiengine';
import { JoyObject, JoyObjectOptions } from './joy';

let world: World | undefined;
const pendingObjects: GameObject[] = [];

function $(opts?: JoyObjectOptions) {
  const go = new JoyObject(opts);
  world ? world.add(go) : pendingObjects.push(go);
  return go;
}

$.enableDebug = enableDebug;

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

  world = new World({ backgroundColor: 0x000000 });
  world.container.style.width = '100%';
  world.container.style.height = '100%';
  document.body.appendChild(world.container);

  for (const go of pendingObjects) {
    world.add(go);
  }
  pendingObjects.length = 0;
});
