import { BuildConfig, ComponentMeta, DomApi, HostElement, HydrateOptions, Logger, StencilSystem } from '../util/interfaces';
export declare function mockPlatform(): MockedPlatform;
export interface MockedPlatform {
    $flushQueue?: () => Promise<any>;
    $flushLoadBundle?: () => Promise<any>;
}
export declare function mockBuildConfig(): BuildConfig;
export declare function mockStencilSystem(): StencilSystem;
export declare function mockFs(): any;
export declare function mockLogger(): Logger;
export declare function mockWindow(opts?: HydrateOptions): Window;
export declare function mockDocument(window?: Window): Document;
export declare function mockDomApi(document?: any): DomApi;
export declare function mockRenderer(plt?: MockedPlatform, domApi?: DomApi): any;
export declare function mockQueue(): {
    add: (cb: Function) => void;
    flush: (cb?: Function) => void;
    clear: () => void;
};
export declare function mockHtml(html: string): Element;
export declare function mockElement(tag: string): Element;
export declare function mockTextNode(text: string): Element;
export declare function mockDefine(plt: MockedPlatform, cmpMeta: ComponentMeta): ComponentMeta;
export declare function mockConnect(plt: MockedPlatform, html: string): any;
export declare function waitForLoad(plt: MockedPlatform, rootNode: any, tag: string): Promise<HostElement>;
export declare function compareHtml(input: string): string;
export declare function removeWhitespaceFromNodes(node: Node): any;
