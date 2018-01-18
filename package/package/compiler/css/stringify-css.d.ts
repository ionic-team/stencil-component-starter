import { UsedSelectors } from '../html/used-selectors';
export declare class StringifyCss {
    usedSelectors: UsedSelectors;
    constructor(usedSelectors: UsedSelectors);
    /**
     * Visit `node`.
     */
    visit(node: any): any;
    /**
     * Map visit over array of `nodes`, optionally using a `delim`
     */
    mapVisit(nodes: any, delim?: any): string;
    /**
     * Compile `node`.
     */
    compile(node: any): any;
    comment(): string;
    /**
     * Visit import node.
     */
    import(node: any): string;
    /**
     * Visit media node.
     */
    media(node: any): string;
    /**
     * Visit document node.
     */
    document(node: any): string;
    /**
     * Visit charset node.
     */
    charset(node: any): string;
    /**
     * Visit namespace node.
     */
    namespace(node: any): string;
    /**
     * Visit supports node.
     */
    supports(node: any): string;
    /**
     * Visit keyframes node.
     */
    keyframes(node: any): string;
    /**
     * Visit keyframe node.
     */
    keyframe(node: any): string;
    /**
     * Visit page node.
     */
    page(node: any): string;
    /**
     * Visit font-face node.
     */
    ['font-face'](node: any): string;
    /**
     * Visit host node.
     */
    host(node: any): string;
    /**
     * Visit custom-media node.
     */
    ['custom-media'](node: any): string;
    /**
     * Visit rule node.
     */
    rule(node: any): string;
    /**
     * Visit declaration node.
     */
    declaration(node: any): string;
}
