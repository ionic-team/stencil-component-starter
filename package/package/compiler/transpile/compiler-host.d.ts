import { BuildConfig, BuildContext, ModuleFile, TranspileModulesResults } from '../../util/interfaces';
import * as ts from 'typescript';
export declare function getTsHost(config: BuildConfig, ctx: BuildContext, tsCompilerOptions: ts.CompilerOptions, transpileResults: TranspileModulesResults): ts.CompilerHost;
export declare function getModuleFile(config: BuildConfig, ctx: BuildContext, tsFilePath: string): Promise<ModuleFile>;
export declare function getModuleFileSync(config: BuildConfig, ctx: BuildContext, tsFilePath: string): ModuleFile;
export declare function moduleFileExistsSync(config: BuildConfig, ctx: BuildContext, tsFilePath: string): boolean;
