import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
export declare interface WireframeInterface {
    wireframe: boolean;
}
export declare const WireframeMixin: <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T) => Constructor<WireframeInterface> & T;
