import { Diagnostic, MembersMeta } from '../../../util/interfaces';
import * as ts from 'typescript';
export declare function getPropDecoratorMeta(tsFilePath: string, diagnostics: Diagnostic[], classNode: ts.ClassDeclaration): MembersMeta;
