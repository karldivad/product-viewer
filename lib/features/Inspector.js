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
import "@babylonjs/inspector";
import { property } from "lit/decorators.js";
export const InspectorMixin = (BaseViewerElement) => {
    class InspectorViewerElement extends BaseViewerElement {
        constructor() {
            super(...arguments);
            this.inspector = false;
        }
        updated(changedProperties) {
            var _a;
            (_a = super.updated) === null || _a === void 0 ? void 0 : _a.call(this, changedProperties);
            if (changedProperties.has("inspector")) {
                if (this.inspector) {
                    this.showInspector();
                }
                else {
                    this.hideInspector();
                }
            }
        }
        showInspector() {
            const globalRoot = this.renderRoot.host.parentElement;
            this.scene.debugLayer.show({ embedMode: true, globalRoot, overlay: false });
        }
        hideInspector() {
            var _a;
            if ((_a = this.scene) === null || _a === void 0 ? void 0 : _a.debugLayer.isVisible()) {
                this.scene.debugLayer.hide();
            }
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            // hide inspector on unmount so it will work when it is remounted
            this.hideInspector();
        }
    }
    __decorate([
        property({ type: Boolean, attribute: "inspector", reflect: true })
    ], InspectorViewerElement.prototype, "inspector", void 0);
    return InspectorViewerElement;
};
//# sourceMappingURL=Inspector.js.map