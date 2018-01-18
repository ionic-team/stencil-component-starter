import { BuildConfig, Diagnostic, ModuleFiles, ModuleFile } from '../../../util/interfaces';
import * as ts from 'typescript';
export declare function componentModuleFileClass(config: BuildConfig, fileMeta: ModuleFile, diagnostics: Diagnostic[]): ts.TransformerFactory<ts.SourceFile>;
export declare function componentTsFileClass(config: BuildConfig, moduleFiles: ModuleFiles, diagnostics: Diagnostic[]): ts.TransformerFactory<ts.SourceFile>;
