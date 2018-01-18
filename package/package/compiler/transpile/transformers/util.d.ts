import * as ts from 'typescript';
export declare function updateComponentClass(classNode: ts.ClassDeclaration): ts.ClassDeclaration;
export declare function isEmptyArgs(arg: any): boolean;
export declare class ObjectMap {
    [key: string]: ts.Expression | ObjectMap;
}
export declare function isInstanceOfObjectMap(object: any): object is ObjectMap;
export declare function objectLiteralToObjectMap(objectLiteral: ts.ObjectLiteralExpression): ObjectMap;
export declare function objectMapToObjectLiteral(objMap: any): ts.ObjectLiteralExpression;
/**
 * Convert a js value into typescript AST
 * @param val array, object, string, boolean, or number
 * @returns Typescript Object Literal, Array Literal, String Literal, Boolean Literal, Numeric Literal
 */
export declare function convertValueToLiteral(val: any): ts.StringLiteral | ts.ObjectLiteralExpression | ts.ArrayLiteralExpression;
/**
 * Execute an array of transforms over a string containing typescript source
 * @param sourceText Typescript source as a string
 * @param transformers Array of transforms to run agains the source string
 * @returns a string
 */
export declare function transformSourceString(sourceText: string, transformers: ts.TransformerFactory<ts.SourceFile>[]): string;
/**
 * Execute transforms over a string containing typescript source
 * @param sourceText Typescript source as a string
 * @param transformers Object containing before and after transforms to run against the source string
 * @returns a string
 */
export declare function transformSourceFile(sourceText: string, transformers: ts.CustomTransformers): string;
