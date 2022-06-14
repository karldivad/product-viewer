import { AbstractMesh, BoundingBox, Node } from "@babylonjs/core";
export declare type Constructor<T> = new (...args: any[]) => T;
export declare const GetRootNode: (node: Node) => Node;
/**
 * Returns a default string if the str parameter is null, undefined, or empty
 * @param {string} str The string to return, if not undefined, null, or empty
 * @param {string} defaultStr The fallback value to return if the str parameter is undefined, null, or empty
 */
export declare const safeStringValue: (str: string, defaultStr: string) => string;
export declare const isIOS: () => boolean;
export declare const isAndroid: () => boolean;
export declare const isMobile: () => boolean;
export declare const getBoundingBox: (mesh: AbstractMesh) => BoundingBox;
