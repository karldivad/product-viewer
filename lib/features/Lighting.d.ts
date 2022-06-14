import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
export declare interface LightingInterface {
    lightIntensity: number;
    environment: string;
    createGround: boolean;
    createSkybox: boolean;
}
export declare const LightingMixin: <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T) => Constructor<LightingInterface> & T;
