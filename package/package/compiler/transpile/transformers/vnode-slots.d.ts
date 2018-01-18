import { ModuleFiles, ModuleFile } from '../../../util/interfaces';
import * as ts from 'typescript';
export declare function updateFileMetaFromSlot(moduleFiles: ModuleFiles): ts.TransformerFactory<ts.SourceFile>;
export declare function updateModuleFileMetaFromSlot(moduleFile: ModuleFile): ts.TransformerFactory<ts.SourceFile>;
