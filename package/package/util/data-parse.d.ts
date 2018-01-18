import { ComponentMeta, ComponentRegistry, LoadComponentMeta, LoadComponentRegistry } from '../util/interfaces';
export declare function parseComponentRegistry(cmpRegistryData: LoadComponentRegistry, registry: ComponentRegistry, attr?: number): ComponentMeta;
export declare function parseComponentMeta(registry: ComponentRegistry, moduleImports: any, cmpMetaData: LoadComponentMeta, attr?: number): void;
export declare function parsePropertyValue(propType: number, propValue: any): any;
