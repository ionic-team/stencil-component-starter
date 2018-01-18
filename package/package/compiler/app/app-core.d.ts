import { BuildConfig } from '../../util/interfaces';
export declare function generateCore(config: BuildConfig, globalJsContent: string[]): Promise<string>;
export declare function generateCoreES5WithPolyfills(config: BuildConfig, globalJsContent: string[]): Promise<string>;
export declare function wrapCoreJs(config: BuildConfig, jsContent: string): string;
export declare function getAppPublicPath(config: BuildConfig): string;
export declare function getAppFileName(config: BuildConfig): string;
export declare const APP_CORE_FILENAME_PLACEHOLDER = "__APP_CORE_FILENAME__";
