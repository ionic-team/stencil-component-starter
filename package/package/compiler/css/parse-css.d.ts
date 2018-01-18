/**
 * CSS parser adopted from rework/css by
 * TJ Holowaychuk (@tj)
 * Licensed under the MIT License
 * https://github.com/reworkcss/css/blob/master/LICENSE
 */
import { BuildConfig, Diagnostic } from '../../util/interfaces';
export declare function parseCss(config: BuildConfig, css: string, filePath: string): {
    type: string;
    stylesheet: {
        source: string;
        rules: any[];
        diagnostics: Diagnostic[];
    };
};
