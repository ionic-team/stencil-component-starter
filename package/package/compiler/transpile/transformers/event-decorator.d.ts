import { Diagnostic, EventMeta } from '../../../util/interfaces';
import * as ts from 'typescript';
export declare function getEventDecoratorMeta(tsFilePath: string, diagnostics: Diagnostic[], classNode: ts.ClassDeclaration): EventMeta[];
