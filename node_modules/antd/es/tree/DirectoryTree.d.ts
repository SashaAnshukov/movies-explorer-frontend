import * as React from 'react';
import type RcTree from 'rc-tree';
import type { DataNode, Key } from 'rc-tree/lib/interface';
import type { TreeProps } from './Tree';
export declare type ExpandAction = false | 'click' | 'doubleClick';
export interface DirectoryTreeProps extends TreeProps {
    expandAction?: ExpandAction;
}
export interface DirectoryTreeState {
    expandedKeys?: Key[];
    selectedKeys?: Key[];
}
declare const ForwardDirectoryTree: React.ForwardRefExoticComponent<DirectoryTreeProps & React.RefAttributes<RcTree<DataNode>>>;
export default ForwardDirectoryTree;
