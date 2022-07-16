import * as React from 'react';
import type { ValidateStatus } from './FormItem';
export interface ErrorListProps {
    help?: React.ReactNode;
    helpStatus?: ValidateStatus;
    errors?: React.ReactNode[];
    warnings?: React.ReactNode[];
    className?: string;
}
export default function ErrorList({ help, helpStatus, errors, warnings, className: rootClassName, }: ErrorListProps): JSX.Element;
