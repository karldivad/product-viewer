import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
export declare interface LoaderInterface {
    modelUrl: string;
    isLoading: boolean;
}
export declare const LoaderMixin: <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T) => Constructor<LoaderInterface> & T;
