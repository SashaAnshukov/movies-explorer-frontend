import * as React from 'react';
import Select from '../select';
import type { SelectProps } from '../select';
interface MiniOrMiddleSelectInterface extends React.FC<SelectProps> {
    Option: typeof Select.Option;
}
declare const MiniSelect: MiniOrMiddleSelectInterface;
declare const MiddleSelect: MiniOrMiddleSelectInterface;
export { MiniSelect, MiddleSelect };
