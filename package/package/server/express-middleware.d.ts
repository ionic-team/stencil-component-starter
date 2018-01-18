import { BuildConfig } from '../util/interfaces';
export declare function ssrMiddleware(middlewareConfig: MiddlewareConfig): (req: any, res: any) => void;
/**
 * SSR Path Regex matches urls which end with index.html,
 * urls with a trailing /, and urls with no trailing slash,
 * but also do not have a file extension. The following example
 * urls would all match (with or without a querystring):
 *   /index.html
 *   /about
 *   /about/
 *   /
 *
 * The follwing example url would not match:
 *   /image.jpg
 *   /font.woff
 *
 * Please see the unit tests if any changes are required.
 */
export declare const ssrPathRegex: RegExp;
export interface MiddlewareConfig {
    config: string | BuildConfig;
}
