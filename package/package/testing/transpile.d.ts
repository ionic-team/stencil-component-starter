import { Diagnostic } from '../util/interfaces';
export declare function transpile(src: string, opts: any, path?: string): TranspileResults;
export interface TranspileResults {
    diagnostics: Diagnostic[];
    code?: string;
}
