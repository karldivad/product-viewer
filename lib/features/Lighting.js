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
import { Color3, CubeTexture, HemisphericLight, ImageProcessingConfiguration, Vector3, } from "@babylonjs/core";
import { property } from "lit/decorators.js";
import { getBoundingBox } from "../tools/Utils";
export const LightingMixin = (BaseViewerElement) => {
    class LightingModelViewerElement extends BaseViewerElement {
        constructor() {
            super(...arguments);
            this.lightIntensity = 2.0;
            this.environment = "";
            this.createGround = false;
            this.createSkybox = false;
        }
        updated(changedProperties) {
            var _a;
            (_a = super.updated) === null || _a === void 0 ? void 0 : _a.call(this, changedProperties);
            this.updateLighting();
        }
        modelLoaded(meshes) {
            var _a;
            (_a = super.modelLoaded) === null || _a === void 0 ? void 0 : _a.call(this, meshes);
            // Get the root node of the first mesh to calculate total bounds for correct floor placement
            // Since all glbs import with under __root__ node, it doesn't matter which mesh index we use
            if (this.envHelper.ground) {
                const boundingBox = getBoundingBox(meshes[0]);
                this.envHelper.ground.position.y -= boundingBox.extendSizeWorld.y - boundingBox.centerWorld.y;
            }
        }
        updateLighting() {
            // Lights
            if (!this.hemisphericLight)
                this.hemisphericLight = new HemisphericLight("HemisphericLight", new Vector3(0, 1, 0), this.scene);
            this.hemisphericLight.intensity = this.lightIntensity;
            const envOptions = {
                createGround: this.createGround,
                groundColor: new Color3(1, 1, 1),
                createSkybox: this.createSkybox,
                skyboxColor: new Color3(1, 1, 1),
            };
            if (this.environment) {
                const hdrTexture = CubeTexture.CreateFromPrefilteredData(this.environment, this.scene);
                envOptions.environmentTexture = hdrTexture;
                // NOTE: due to a bug in Babylon.js, when a new environmentTexture is passed to
                // envHelper.updateOptions(), the old object is disposed, but not set to null.
                // https://github.com/BabylonJS/Babylon.js/blob/40f0ba2cc8a7acbd9dbdc81492a305fa781a41bc/src/Helpers/environmentHelper.ts#L406
                // This prevents the update from completing due to a check in _setupEnvironmentTexture():
                // https://github.com/BabylonJS/Babylon.js/blob/40f0ba2cc8a7acbd9dbdc81492a305fa781a41bc/src/Helpers/environmentHelper.ts#L450
                if (this.scene.environmentTexture) {
                    this.scene.environmentTexture.dispose();
                    this.scene.environmentTexture = null;
                }
            }
            // NOTE: We need to remove the old envHelper before creating a new one when the `model-url` is updated.
            // It seems like we should be able to use `this.envHelper.updateOptions(envOptions)`,
            // however this causes the skybox & ground to disappear (or turn completely white).
            if (this.envHelper)
                this.envHelper.dispose();
            this.envHelper = this.scene.createDefaultEnvironment(envOptions);
            // Enable tonemapping to prevent white blowout
            this.scene.imageProcessingConfiguration.toneMappingEnabled = true;
            this.scene.imageProcessingConfiguration.toneMappingType = ImageProcessingConfiguration.TONEMAPPING_ACES;
        }
    }
    __decorate([
        property({ type: Number, attribute: "light-intensity" })
    ], LightingModelViewerElement.prototype, "lightIntensity", void 0);
    __decorate([
        property({ type: String, attribute: "environment" })
    ], LightingModelViewerElement.prototype, "environment", void 0);
    __decorate([
        property({ type: Boolean, attribute: "create-ground" })
    ], LightingModelViewerElement.prototype, "createGround", void 0);
    __decorate([
        property({ type: Boolean, attribute: "create-skybox" })
    ], LightingModelViewerElement.prototype, "createSkybox", void 0);
    return LightingModelViewerElement;
};
//# sourceMappingURL=Lighting.js.map