import { BuildConfig, BuildContext, Bundle, DependentCollection, Manifest } from '../../util/interfaces';
export declare function loadDependentManifests(config: BuildConfig, ctx: BuildContext): Promise<Manifest[]>;
export declare function filterDependentComponents(bundles: Bundle[], dependentCollection: DependentCollection, dependentManifest: Manifest): void;
