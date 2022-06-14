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
import { ArcRotateCamera, Vector2, Vector3 } from "@babylonjs/core";
import { property } from "lit/decorators.js";
export const CameraMixin = (BaseViewerElement) => {
    class CameraModelViewerElement extends BaseViewerElement {
        constructor() {
            super(...arguments);
            this.alpha = 0;
            this.beta = 0;
            this.frameDuration = 500;
            this.isFraming = false;
            this.pivotPoint = Vector3.Zero();
        }
        updated(changedProperties) {
            var _a;
            (_a = super.updated) === null || _a === void 0 ? void 0 : _a.call(this, changedProperties);
            if (!this.camera)
                this.createCamera();
        }
        createCamera() {
            // Set initial camera angle (defaults to targeting thie origin, but zooms to mesh once one loads)
            const camera = new ArcRotateCamera("MainCamera", Math.PI / 4, 1, 5, this.pivotPoint, this.scene);
            camera.zoomToMouseLocation = true;
            camera.wheelPrecision = 25;
            camera.pinchPrecision = 100;
            camera.panningDistanceLimit = 3;
            camera.angularSensibilityY = 900;
            camera.minZ = 0.01;
            camera.maxZ = 15000;
            camera.checkCollisions = true;
            camera.useFramingBehavior = true;
            this.framingBehavior = camera.getBehaviorByName("Framing");
            this.framingBehavior.framingTime = this.frameDuration;
            this.framingBehavior.autoCorrectCameraLimitsAndSensibility = true;
            this.framingBehavior.zoomStopsAnimation = true;
            this.framingBehavior.elevationReturnTime = -1; // disable returning to elevation
            ArcRotateCamera.ForceAttachControlToAlwaysPreventDefault = true;
            camera.attachControl(this.renderCanvas, true);
            camera.storeState();
            this.scene.onBeforeRenderObservable.add(() => {
                const w = this.engine.getRenderWidth(), h = this.engine.getRenderHeight();
                camera.orthoLeft = (5 * w) / h;
                camera.orthoTop = 5;
                camera.orthoRight = (-5 * w) / h;
                camera.orthoBottom = -5;
            });
            this.enableOrbitAroundModel(camera);
            this.camera = camera;
        }
        modelLoaded(meshes) {
            super.modelLoaded(meshes);
            this.camera.restoreState();
            this.isFraming = true;
            this.framingBehavior.zoomOnMeshesHierarchy(meshes, true, () => {
                this.pivotPoint.copyFrom(this.camera.target);
                this.isFraming = false;
            });
        }
        // This method ensures that the camera target remains locked to the pivotPoint (center of model),
        // even after the user moves the camera (by right click & drag, or by zooming into the mouse with wheel).
        // Heavily based on the example by Dave Solares: https://playground.babylonjs.com/#3B5W22#29
        enableOrbitAroundModel(camera) {
            this.scene.onBeforeRenderObservable.add(() => {
                if (this.isFraming)
                    return;
                const { alpha, beta } = camera;
                const { x, y, z } = Vector3.TransformCoordinates(this.pivotPoint, camera.getViewMatrix());
                camera.target.copyFrom(this.pivotPoint);
                camera.targetScreenOffset.set(x, y);
                camera.alpha = alpha;
                camera.beta = beta;
                camera.radius = z;
            });
            // The current behavior enabled by `camera.zoomToMouseLocation` assumes that
            // targetScreenOffset is set to (0, 0). Here we monkeypatch ArcRotateCameraMouseWheelInput._getPosition
            // with a wrapper to temporarily reset the offset back to the origin.
            // https://github.com/BabylonJS/Babylon.js/blob/master/packages/dev/core/src/Cameras/Inputs/arcRotateCameraMouseWheelInput.ts#L208
            const mouseWheelInput = camera.inputs.attached.mousewheel;
            if (mouseWheelInput) {
                const tmpOffset = Vector2.Zero();
                const _getPositionOriginal = mouseWheelInput._getPosition;
                mouseWheelInput._getPosition = () => {
                    // save the current target offset to tmp variable
                    tmpOffset.copyFrom(camera.targetScreenOffset);
                    // move the camera target offset to zero & run the original function
                    camera.targetScreenOffset.set(0, 0);
                    const position = _getPositionOriginal.call(mouseWheelInput);
                    // restore the target offset
                    camera.targetScreenOffset.copyFrom(tmpOffset);
                    return position;
                };
            }
        }
    }
    __decorate([
        property({ type: Number, attribute: "alpha" })
    ], CameraModelViewerElement.prototype, "alpha", void 0);
    __decorate([
        property({ type: Number, attribute: "beta" })
    ], CameraModelViewerElement.prototype, "beta", void 0);
    __decorate([
        property({ type: Number, attribute: "frame-duration" })
    ], CameraModelViewerElement.prototype, "frameDuration", void 0);
    return CameraModelViewerElement;
};
//# sourceMappingURL=Camera.js.map