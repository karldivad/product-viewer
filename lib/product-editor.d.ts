import ProductViewerElementBase from "./product-viewer-base";
export declare const ProductEditorElement: import("./tools/Utils").Constructor<import("./features/Inspector").InspectorInterface> & import("./tools/Utils").Constructor<import("./features/Wireframe").WireframeInterface> & import("./tools/Utils").Constructor<import("./features/ScaleReference").ScaleReferenceInterface> & import("./tools/Utils").Constructor<import("./features/Lighting").LightingInterface> & import("./tools/Utils").Constructor<import("./features/Loader").LoaderInterface> & import("./tools/Utils").Constructor<import("./features/BackgroundColor").BackgroundColorInterface> & import("./tools/Utils").Constructor<import("./features/Camera").CameraInterface> & import("./tools/Utils").Constructor<import("./features/Layout").LayoutInterface> & import("./tools/Utils").Constructor<import("./features/AR").ARInterface> & typeof ProductViewerElementBase;
export declare type ProductEditorElement = InstanceType<typeof ProductEditorElement>;
declare global {
    interface HTMLElementTagNameMap {
        "product-editor": ProductEditorElement;
    }
    namespace JSX {
        interface IntrinsicElements {
            "product-editor": any;
        }
    }
}
