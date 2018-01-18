export declare function render(opts: RenderTestOptions): Promise<any>;
export declare function flush(root: any): Promise<void>;
export interface RenderTestOptions {
    components: any[];
    html: string;
}
