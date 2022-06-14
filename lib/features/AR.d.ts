import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
export declare interface ARInterface {
    modelUrl: string;
    ar: boolean;
    arScaling: boolean;
    usdz: string | null;
}
export declare const ARMixin: <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T) => Constructor<ARInterface> & T;
