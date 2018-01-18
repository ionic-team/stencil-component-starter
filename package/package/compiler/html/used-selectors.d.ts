export declare class UsedSelectors {
    tags: string[];
    classNames: string[];
    ids: string[];
    attrs: string[];
    constructor(elm: Element);
    private collectSelectors(elm);
}
