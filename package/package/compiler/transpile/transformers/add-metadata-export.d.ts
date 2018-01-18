import { ModuleFile } from '../../../util/interfaces';
import * as ts from 'typescript';
export default function addMetadataExport(moduleFile: ModuleFile): ts.TransformerFactory<ts.SourceFile>;
