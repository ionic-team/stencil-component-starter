import { BuildConfig, BuildContext, HydrateResults, PrerenderLocation } from '../../util/interfaces';
export declare function prerenderUrl(config: BuildConfig, ctx: BuildContext, indexSrcHtml: string, prerenderLocation: PrerenderLocation): Promise<HydrateResults>;
