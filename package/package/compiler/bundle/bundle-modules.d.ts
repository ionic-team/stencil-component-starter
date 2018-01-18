import { BuildConfig, BuildContext, ModuleResults } from '../../util/interfaces';
export declare function bundleModules(config: BuildConfig, ctx: BuildContext): Promise<ModuleResults>;
export declare function transpiledInMemoryPlugin(config: BuildConfig, ctx: BuildContext): {
    name: string;
    resolveId(importee: string, importer: string): string;
    load(sourcePath: string): string;
};
