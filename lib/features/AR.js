var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { safeStringValue, isIOS, isAndroid } from "../tools/Utils";
import { property } from "lit/decorators.js";
export const ARMixin = (BaseViewerElement) => {
    class ARModelViewerElement extends BaseViewerElement {
        constructor() {
            var _a;
            super(...arguments);
            this.ar = false;
            this.arScaling = false;
            this.usdz = null;
            this.ARButtonElement = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".ar-button");
            this.ARButtonClickEvent = (event) => {
                event.preventDefault();
                this.launchAR();
            };
        }
        updated(changedProperties) {
            var _a, _b;
            (_a = super.updated) === null || _a === void 0 ? void 0 : _a.call(this, changedProperties);
            this.ARButtonElement = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector(".ar-button");
            this.ARButtonElement.onclick = this.ARButtonClickEvent;
            if (!this.ar || (!isAndroid() && !isIOS()) || (isIOS() && !this.supportsIOSQuickLook())) {
                this.ARButtonElement.classList.remove("enabled");
            }
        }
        launchAR() {
            if (isIOS()) {
                this.openIOSARQuickLook();
            }
            else {
                this.openSceneViewer();
            }
        }
        openIOSARQuickLook() {
            const anchor = document.createElement("a");
            anchor.setAttribute("rel", "ar");
            anchor.appendChild(document.createElement("img"));
            const usdzUrl = this.usdz + "#allowsContentScaling=0";
            anchor.setAttribute("href", usdzUrl);
            anchor.click();
        }
        openSceneViewer(customIntent = "") {
            const anchor = document.createElement("a");
            const noArViewerSigil = "#model-viewer-no-ar-fallback";
            let fallbackInvoked = false;
            if (fallbackInvoked) {
                return;
            }
            const defaultIntent = this.createAndroidIntent();
            const testModelUrl = new URL("https://AssetManager.azureedge.net/assets-v2/ed3d4508-dd22-4683-985b-1502694cde0c%5C132031998958633125.glb?7713ff81ffd1d4677ade591e212c38c29edd8a76f694360bd5f31ef82744b310cdb72cef2ff0677de17e7c87c56859b90203b4");
            testModelUrl.protocol = "intent://";
            const intent = safeStringValue(customIntent, defaultIntent);
            const handleFallback = () => {
                if (self.location.hash === noArViewerSigil && !fallbackInvoked) {
                    fallbackInvoked = true;
                    // The new history will be the current URL with a new hash.
                    // Go back one step so that we reset to the expected URL.
                    // NOTE(cdata): this should not invoke any browser-level navigation
                    // because hash-only changes modify the URL in-place without
                    // navigating:
                    self.history.back();
                }
            };
            self.addEventListener("hashchange", handleFallback, { once: true });
            anchor.setAttribute("href", intent);
            anchor.click();
        }
        createAndroidIntent() {
            // This is necessary because the original URL might have query
            // parameters. Since we're appending the whole URL as query parameter,
            // ? needs to be turned into & to not lose any of them.
            const gltfSrc = this.modelUrl.replace("?", "&");
            const location = self.location.toString();
            const locationUrl = new URL(location);
            const cleanUrl = new URL(gltfSrc, location);
            // modelUrl can contain title/link/sound etc.
            // These are already URL-encoded, so we shouldn't do that again here.
            let intentParams = `?file=${cleanUrl.toString()}&mode=ar_only`;
            if (!gltfSrc.includes("&link=")) {
                intentParams += `&link=${location}`;
            }
            // if (!gltfSrc.includes("&title=")) {
            // 	intentParams += `&title=${encodeURIComponent(this.alt || "")}`;
            // }
            intentParams += `&resizable=false`;
            const intent = `intent://arvr.google.com/scene-viewer/1.0${intentParams}#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(locationUrl.toString())};end;`;
            return intent;
        }
        supportsIOSQuickLook() {
            const tempAnchor = document.createElement("a");
            return Boolean(tempAnchor.relList && tempAnchor.relList.supports && tempAnchor.relList.supports("ar") && this.usdz);
        }
    }
    __decorate([
        property({ type: String, attribute: "model-url" })
    ], ARModelViewerElement.prototype, "modelUrl", void 0);
    __decorate([
        property({ type: Boolean, attribute: "ar" })
    ], ARModelViewerElement.prototype, "ar", void 0);
    __decorate([
        property({ type: Boolean, attribute: "ar-scaling" })
    ], ARModelViewerElement.prototype, "arScaling", void 0);
    __decorate([
        property({ type: String, attribute: "usdz" })
    ], ARModelViewerElement.prototype, "usdz", void 0);
    return ARModelViewerElement;
};
//# sourceMappingURL=AR.js.map