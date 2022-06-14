var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from "lit/decorators.js";
export const WireframeMixin = (BaseViewerElement) => {
    class WireframeViewerElement extends BaseViewerElement {
        constructor() {
            super(...arguments);
            this.wireframe = false;
        }
        updated(changedProperties) {
            var _a;
            (_a = super.updated) === null || _a === void 0 ? void 0 : _a.call(this, changedProperties);
            if (changedProperties.has("wireframe")) {
                this.updateWireframe();
            }
        }
        updateWireframe() {
            this.scene.forceWireframe = this.wireframe;
        }
    }
    __decorate([
        property({ type: Boolean, attribute: "wireframe", reflect: true })
    ], WireframeViewerElement.prototype, "wireframe", void 0);
    return WireframeViewerElement;
};
//# sourceMappingURL=Wireframe.js.map