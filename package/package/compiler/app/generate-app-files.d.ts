import { BuildConfig, BuildContext } from '../../util/interfaces';
export declare function generateAppFiles(config: BuildConfig, ctx: BuildContext): Promise<void>;
export declare function getRegistryJsonWWW(config: BuildConfig): string;
export declare function getRegistryJsonDist(config: BuildConfig): string;
export declare function getGlobalWWW(config: BuildConfig): string;
export declare function getGlobalDist(config: BuildConfig): string;
export declare function getAppWWWBuildDir(config: BuildConfig): string;
export declare function getAppDistDir(config: BuildConfig): string;
