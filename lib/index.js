import { World, enableDebug, preload } from 'kiwiengine';
import { JoyObject } from './joy';
const world = new World({ backgroundColor: 0x000000 });
world.container.style.width = '100%';
world.container.style.height = '100%';
function $(opts) {
    const go = new JoyObject(opts);
    world.add(go);
    return go;
}
$.enableDebug = enableDebug;
$.preload = async (assets, percentCallback) => {
    await preload(assets, (progress) => {
        percentCallback(progress * 100);
    });
};
$.on = (eventName, listener) => {
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
    set(value) { world.gravity = value; },
});
Object.defineProperty($, 'cameraX', {
    get() { return world.cameraX; },
    set(value) { world.cameraX = value; },
});
Object.defineProperty($, 'cameraY', {
    get() { return world.cameraY; },
    set(value) { world.cameraY = value; },
});
window.$ = $;
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
//# sourceMappingURL=index.js.map