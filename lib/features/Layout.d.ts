import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
export declare interface LayoutInterface {
    y: number;
    x: number;
    z: number;
}
export declare const LayoutMixin: <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T) => Constructor<LayoutInterface> & T;
