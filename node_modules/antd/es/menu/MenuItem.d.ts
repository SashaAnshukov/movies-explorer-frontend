import * as React from 'react';
import type { MenuItemProps as RcMenuItemProps } from 'rc-menu';
import type { MenuContextProps } from './MenuContext';
import type { SiderContextProps } from '../layout/Sider';
export interface MenuItemProps extends Omit<RcMenuItemProps, 'title'> {
    icon?: React.ReactNode;
    danger?: boolean;
    title?: React.ReactNode;
}
export default class MenuItem extends React.Component<MenuItemProps> {
    static contextType: React.Context<MenuContextProps>;
    context: MenuContextProps;
    renderItemChildren(inlineCollapsed: boolean): JSX.Element;
    renderItem: ({ siderCollapsed }: SiderContextProps) => JSX.Element;
    render(): JSX.Element;
}
