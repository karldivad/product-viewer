var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from "lit/decorators.js";
export const LayoutMixin = (BaseViewerElement) => {
    class LayoutModelViewerElement extends BaseViewerElement {
        constructor() {
            super(...arguments);
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        modelLoaded(meshes) {
            super.modelLoaded(meshes);
            for (const mesh of meshes) {
                mesh.position.x += this.x;
                mesh.position.y += this.y;
                mesh.position.z += this.z;
            }
        }
    }
    __decorate([
        property({ type: Number, attribute: "x" })
    ], LayoutModelViewerElement.prototype, "x", void 0);
    __decorate([
        property({ type: Number, attribute: "y" })
    ], LayoutModelViewerElement.prototype, "y", void 0);
    __decorate([
        property({ type: Number, attribute: "z" })
    ], LayoutModelViewerElement.prototype, "z", void 0);
    return LayoutModelViewerElement;
};
//# sourceMappingURL=Layout.js.map