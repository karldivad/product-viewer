var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from "lit/decorators.js";
import { SceneLoader } from "@babylonjs/core";
export const LoaderMixin = (BaseViewerElement) => {
    class LoaderModelViewerElement extends BaseViewerElement {
        constructor() {
            super(...arguments);
            this.isLoading = false;
        }
        updated(changedProperties) {
            var _a;
            (_a = super.updated) === null || _a === void 0 ? void 0 : _a.call(this, changedProperties);
            if (changedProperties.has("modelUrl")) {
                this.updateLoader();
            }
        }
        updateLoader() {
            // Remove all existing models before loading a new one
            if (this.loadedModels) {
                for (const model of this.loadedModels) {
                    model.dispose();
                }
                this.loadedModels = [];
            }
            if (!this.modelUrl) {
                console.warn("No `model-url` provided");
                return;
            }
            this.isLoading = true;
            SceneLoader.ImportMesh("", this.modelUrl, "", this.scene, (meshes) => {
                this.loadedModels = meshes;
                this.modelLoaded(meshes);
                this.isLoading = false;
            }, null, null, ".glb");
        }
    }
    __decorate([
        property({ type: String, attribute: "model-url", reflect: true })
    ], LoaderModelViewerElement.prototype, "modelUrl", void 0);
    return LoaderModelViewerElement;
};
//# sourceMappingURL=Loader.js.map