import "@babylonjs/inspector";
import ProductViewerElementBase from "../product-viewer-base";
import { Constructor } from "../tools/Utils";
export declare interface InspectorInterface {
    inspector: boolean;
}
export declare const InspectorMixin: <T extends Constructor<ProductViewerElementBase>>(BaseViewerElement: T) => Constructor<InspectorInterface> & T;
