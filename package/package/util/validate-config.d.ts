import { BuildConfig, Bundle, DependentCollection } from './interfaces';
export declare function validateBuildConfig(config: BuildConfig, setEnvVariables?: boolean): BuildConfig;
export declare function setProcessEnvironment(config: BuildConfig): void;
export declare function validateDependentCollection(userInput: any): DependentCollection;
export declare function validateUserBundles(bundles: Bundle[]): void;
export declare function validateComponentTag(tag: string): string;
