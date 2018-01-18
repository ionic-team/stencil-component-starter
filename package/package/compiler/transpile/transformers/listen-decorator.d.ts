import { Diagnostic, ListenMeta, ListenOptions } from '../../../util/interfaces';
import * as ts from 'typescript';
export declare function getListenDecoratorMeta(tsFilePath: string, diagnostics: Diagnostic[], classNode: ts.ClassDeclaration): ListenMeta[];
export declare function validateListener(tsFilePath: string, eventName: string, rawListenOpts: ListenOptions, methodName: string): ListenMeta | null;
export declare function isValidElementRefPrefix(prefix: string): boolean;
export declare function isValidKeycodeSuffix(prefix: string): boolean;
