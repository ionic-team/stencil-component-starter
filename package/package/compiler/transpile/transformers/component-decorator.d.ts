import { BuildConfig, ComponentMeta, Diagnostic, ModuleFile } from '../../../util/interfaces';
import * as ts from 'typescript';
export declare function getComponentDecoratorData(config: BuildConfig, moduleFile: ModuleFile, diagnostics: Diagnostic[], classNode: ts.ClassDeclaration): ComponentMeta;
