import ProductViewerElementBase from "./product-viewer-base";
export declare const ProductViewerElement: import("./tools/Utils").Constructor<import("./features/Lighting").LightingInterface> & import("./tools/Utils").Constructor<import("./features/Loader").LoaderInterface> & import("./tools/Utils").Constructor<import("./features/BackgroundColor").BackgroundColorInterface> & import("./tools/Utils").Constructor<import("./features/Camera").CameraInterface> & import("./tools/Utils").Constructor<import("./features/Layout").LayoutInterface> & import("./tools/Utils").Constructor<import("./features/AR").ARInterface> & typeof ProductViewerElementBase;
export declare type ProductViewerElement = InstanceType<typeof ProductViewerElement>;
declare global {
    interface HTMLElementTagNameMap {
        "product-viewer": ProductViewerElement;
    }
    namespace JSX {
        interface IntrinsicElements {
            "product-viewer": any;
        }
    }
}
