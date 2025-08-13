import { World, enableDebug, preload } from 'kiwiengine';
import { JoyObject } from './joy';
let gravity = 0;
let world;
const pendingObjects = [];
function $(opts) {
    const go = new JoyObject(opts);
    world ? world.add(go) : pendingObjects.push(go);
    return go;
}
$.enableDebug = enableDebug;
$.preload = async (assets, percentCallback) => {
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
    set(value) {
        gravity = value;
        if (world)
            world.gravity = value;
    },
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
    world = new World({ backgroundColor: 0x000000, gravity });
    world.container.style.width = '100%';
    world.container.style.height = '100%';
    document.body.appendChild(world.container);
    for (const go of pendingObjects) {
        world.add(go);
    }
    pendingObjects.length = 0;
});
//# sourceMappingURL=index.js.map