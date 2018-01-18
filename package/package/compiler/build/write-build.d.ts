import { BuildConfig, BuildContext, BuildResults, Diagnostic } from '../../util/interfaces';
export declare function writeBuildFiles(config: BuildConfig, ctx: BuildContext, buildResults: BuildResults): Promise<void>;
export declare function generateDistribution(config: BuildConfig, ctx: BuildContext): Promise<any>;
export declare function validatePackageJson(config: BuildConfig, diagnostics: Diagnostic[], data: any): void;
export declare function validatePackageFiles(config: BuildConfig, diagnostics: Diagnostic[], packageJsonData: any): void;
