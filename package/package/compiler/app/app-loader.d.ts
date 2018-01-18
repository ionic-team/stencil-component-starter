import { BuildConfig, LoadComponentRegistry } from '../../util/interfaces';
export declare function generateLoader(config: BuildConfig, appCoreFileName: string, appCorePolyfilledFileName: string, componentRegistry: LoadComponentRegistry[]): Promise<string>;
export declare function injectAppIntoLoader(config: BuildConfig, appCoreFileName: string, appCorePolyfilledFileName: string, componentRegistry: LoadComponentRegistry[], stencilLoaderContent: string): string;
