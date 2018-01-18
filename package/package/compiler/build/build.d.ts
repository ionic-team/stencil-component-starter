import { BuildConfig, BuildContext, BuildResults, Diagnostic } from '../../util/interfaces';
export declare function build(config: BuildConfig, context?: any): Promise<BuildResults>;
export declare function isConfigValid(config: BuildConfig, ctx: BuildContext, diagnostics: Diagnostic[]): boolean;
