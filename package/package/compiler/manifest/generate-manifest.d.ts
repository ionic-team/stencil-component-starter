import { BuildConfig, BuildContext, Manifest, ModuleFiles } from '../../util/interfaces';
export declare function generateAppManifest(config: BuildConfig, ctx: BuildContext, moduleFiles: ModuleFiles): Promise<void | Manifest>;
export declare function addAppComponents(config: BuildConfig, manifest: Manifest, moduleFiles: ModuleFiles): void;
export declare function addAppBundles(config: BuildConfig, manifest: Manifest): void;
