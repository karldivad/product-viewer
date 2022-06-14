import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
export declare interface ScaleReferenceInterface {
    scaleRefUrl?: string;
}
export declare const ScaleReferenceMixin: <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T) => Constructor<ScaleReferenceInterface> & T;
