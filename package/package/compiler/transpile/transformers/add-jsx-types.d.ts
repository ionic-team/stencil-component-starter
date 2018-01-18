import { ModuleFiles, ComponentMeta } from '../../../util/interfaces';
import * as ts from 'typescript';
export declare function createTypesAsString(cmpMeta: ComponentMeta): string;
export default function addJsxTypes(moduleFiles: ModuleFiles): ts.TransformerFactory<ts.SourceFile>;
