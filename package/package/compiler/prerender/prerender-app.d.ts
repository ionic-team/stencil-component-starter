import { BuildConfig, BuildContext, PrerenderLocation } from '../../util/interfaces';
export declare function prerenderApp(config: BuildConfig, ctx: BuildContext): Promise<void>;
export declare function normalizePrerenderUrl(config: BuildConfig, windowLocationHref: string, urlStr: string): PrerenderLocation;
