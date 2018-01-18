import { AssetsMeta, BuildConfig, BuildContext, ComponentOptions, ComponentMeta, ModuleFile } from '../../util/interfaces';
export declare function normalizeAssetsDir(config: BuildConfig, userOpts: ComponentOptions, moduleFile: ModuleFile, cmpMeta: ComponentMeta): void;
export declare function copyComponentAssets(config: BuildConfig, ctx: BuildContext): Promise<void>;
export declare function getCollectionDirDestination(config: BuildConfig, assetsMeta: AssetsMeta): string;
export declare function skipAssetsCopy(config: BuildConfig, ctx: BuildContext): boolean;
