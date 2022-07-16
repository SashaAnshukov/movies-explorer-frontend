import * as React from 'react';
import type { NotificationInstance as RCNotificationInstance, NoticeContent as RCNoticeContent } from 'rc-notification/lib/Notification';
import type { MessageInstance, ArgsProps } from '..';
export default function createUseMessage(getRcNotificationInstance: (args: ArgsProps, callback: (info: {
    prefixCls: string;
    instance: RCNotificationInstance;
}) => void) => void, getRCNoticeProps: (args: ArgsProps, prefixCls: string) => RCNoticeContent): () => [MessageInstance, React.ReactElement];
