import { BuildConfig, BuildContext, ModuleFiles, TranspileModulesResults, TranspileResults } from '../../util/interfaces';
export declare function transpileFiles(config: BuildConfig, ctx: BuildContext, moduleFiles: ModuleFiles): Promise<TranspileModulesResults>;
export declare function transpileModule(config: BuildConfig, input: string, compilerOptions?: any, path?: string): TranspileResults;
