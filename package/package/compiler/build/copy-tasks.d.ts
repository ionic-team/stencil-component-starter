import { BuildConfig, BuildContext, CopyTask } from '../../util/interfaces';
export declare function copyTasks(config: BuildConfig, ctx: BuildContext): Promise<void>;
export declare function processCopyTasks(config: BuildConfig, allCopyTasks: CopyTask[], copyTask: CopyTask): Promise<any>;
export declare function getGlobCopyTask(config: BuildConfig, copyTask: CopyTask, globRelPath: string): CopyTask;
export declare function processCopyTask(config: BuildConfig, copyTask: CopyTask): CopyTask;
export declare function getSrcAbsPath(config: BuildConfig, src: string): string;
export declare function getDestAbsPath(config: BuildConfig, src: string, dest?: string): string;
