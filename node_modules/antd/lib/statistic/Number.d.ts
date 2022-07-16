import * as React from 'react';
import type { valueType, FormatConfig } from './utils';
interface NumberProps extends FormatConfig {
    value: valueType;
}
declare const StatisticNumber: React.FC<NumberProps>;
export default StatisticNumber;
