import { BuildConfig, BuildContext } from '../../util/interfaces';
import * as ts from 'typescript';
export declare function getUserTsConfig(config: BuildConfig, ctx: BuildContext, transpileOptions?: any): {
    options: ts.CompilerOptions;
};
export declare const DEFAULT_COMPILER_OPTIONS: ts.CompilerOptions;
