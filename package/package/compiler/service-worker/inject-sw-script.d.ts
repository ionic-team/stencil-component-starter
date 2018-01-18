import { BuildConfig, ServiceWorkerConfig } from '../../util/interfaces';
export declare function injectRegisterServiceWorker(config: BuildConfig, swConfig: ServiceWorkerConfig, indexHtml: string): string;
export declare function injectUnregisterServiceWorker(indexHtml: string): string;
