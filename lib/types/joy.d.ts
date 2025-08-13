import { GameObject, GameObjectOptions, World } from 'kiwiengine';
export type JoyObjectOptions = {
    el?: HTMLElement;
} & GameObjectOptions;
export declare class JoyObject extends GameObject {
    #private;
    constructor(opts?: JoyObjectOptions);
    protected _setWorld(world: World): void;
    get rotation(): number;
    set rotation(v: number);
    get el(): HTMLElement | undefined;
    set el(el: HTMLElement | undefined);
    _afterRender(): void;
}
//# sourceMappingURL=joy.d.ts.map