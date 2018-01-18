import { BuildConfig, Diagnostic } from '../../util/interfaces';
import { UsedSelectors } from '../html/used-selectors';
export declare function removeUnusedStyles(config: BuildConfig, usedSelectors: UsedSelectors, cssContent: string, cssFilePath?: string, diagnostics?: Diagnostic[]): string;
