import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
export declare interface BackgroundColorInterface {
    backgroundColor?: string;
}
export declare const BackgroundColorMixin: <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T) => Constructor<BackgroundColorInterface> & T;
