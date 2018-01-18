import { PropChangeMeta } from '../../../util/interfaces';
import * as ts from 'typescript';
export declare function getPropChangeDecoratorMeta(classNode: ts.ClassDeclaration): {
    propsWillChangeMeta: PropChangeMeta[];
    propsDidChangeMeta: PropChangeMeta[];
};
