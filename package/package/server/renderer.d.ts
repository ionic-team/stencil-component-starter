import { BuildConfig, BuildContext, ComponentRegistry, HydrateOptions, HydrateResults } from '../util/interfaces';
export declare function createRenderer(config: BuildConfig, registry?: ComponentRegistry, ctx?: BuildContext): {
    hydrateToString: (hydrateOpts: HydrateOptions) => Promise<HydrateResults>;
};
