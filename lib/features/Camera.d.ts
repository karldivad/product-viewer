import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
export declare interface CameraInterface {
    alpha: number;
    beta: number;
    frameDuration: number;
    isFraming: boolean;
}
export declare const CameraMixin: <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T) => Constructor<CameraInterface> & T;
