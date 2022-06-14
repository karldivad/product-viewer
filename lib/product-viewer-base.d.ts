import "@babylonjs/loaders";
import { Engine, Scene, Camera, AbstractMesh, IScreenshotSize } from "@babylonjs/core";
import { LitElement, TemplateResult, CSSResultGroup } from "lit";
export default class ProductViewerElementBase extends LitElement {
    viewerWrapper: HTMLDivElement;
    renderCanvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;
    camera: Camera;
    constructor();
    static get styles(): CSSResultGroup;
    initBabylon(): void;
    modelLoaded(meshes: AbstractMesh[]): void;
    updated(changedProperties: Map<string, any>): void;
    render(): TemplateResult;
    updateRenderer(): void;
    takeScreenshot(size?: IScreenshotSize): Promise<string | null>;
}
