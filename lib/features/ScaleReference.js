var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* @license
 * Copyright 2022 Lowe's Companies, Inc. All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
import { SceneLoader } from "@babylonjs/core";
import { property } from "lit/decorators.js";
import { getBoundingBox } from "../tools/Utils";
export const ScaleReferenceMixin = (BaseViewerElement) => {
    class ScaleReferenceViewerElement extends BaseViewerElement {
        updated(changedProperties) {
            var _a;
            (_a = super.updated) === null || _a === void 0 ? void 0 : _a.call(this, changedProperties);
            if (changedProperties.has("scaleRefUrl")) {
                this.updateScaleReference();
            }
        }
        modelLoaded(meshes) {
            super.modelLoaded(meshes);
            // NOTE: this is the bounding box of the model loaded using the `model-url` attr
            // (not the scale reference).
            this.modelBoundingBox = getBoundingBox(meshes[0]);
            this.updateScaleReferencePosition();
        }
        updateScaleReferencePosition() {
            if (this.scaleRefUrl && this.scaleReferenceModel && this.modelBoundingBox) {
                const scaleBoundingBox = getBoundingBox(this.scaleReferenceModel);
                // offset scale reference so that it is placed on the ground (same as product)
                const offsetY = this.modelBoundingBox.minimumWorld.y - scaleBoundingBox.minimumWorld.y;
                // move the scale reference behind the product so it's bounding box clears (+ a small arbitrary spacing)
                const offsetZ = this.modelBoundingBox.minimumWorld.z - scaleBoundingBox.maximumWorld.z - 0.2;
                // TODO: allow the user to optionally pass in custom offsets for x, y, and z
                this.scaleReferenceModel.position.y += offsetY;
                this.scaleReferenceModel.position.z += offsetZ;
            }
        }
        updateScaleReference() {
            var _a;
            if (this.scaleRefUrl) {
                SceneLoader.ImportMesh("", this.scaleRefUrl, "", this.scene, (meshes) => {
                    this.scaleReferenceModel = meshes[0];
                    this.updateScaleReferencePosition();
                }, null, null, ".glb");
            }
            else {
                (_a = this.scaleReferenceModel) === null || _a === void 0 ? void 0 : _a.dispose();
            }
        }
    }
    __decorate([
        property({ type: String, attribute: "scale-ref-url", reflect: true })
    ], ScaleReferenceViewerElement.prototype, "scaleRefUrl", void 0);
    return ScaleReferenceViewerElement;
};
//# sourceMappingURL=ScaleReference.js.map