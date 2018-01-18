import { BuildConfig, BuildContext } from '../../util/interfaces';
export declare function generateAppGlobal(config: BuildConfig, ctx: BuildContext): Promise<string[]>;
export declare function generateGlobalJs(config: BuildConfig, globalJsContents: string[]): string;
