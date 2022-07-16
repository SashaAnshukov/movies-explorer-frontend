import * as React from 'react';
import type { NotificationInstance as RCNotificationInstance, NoticeContent as RCNoticeContent } from 'rc-notification/lib/Notification';
import type { NotificationInstance, ArgsProps } from '..';
export default function createUseNotification(getNotificationInstance: (args: ArgsProps, callback: (info: {
    prefixCls: string;
    instance: RCNotificationInstance;
}) => void) => void, getRCNoticeProps: (args: ArgsProps, prefixCls: string) => RCNoticeContent): () => [NotificationInstance, React.ReactElement];
