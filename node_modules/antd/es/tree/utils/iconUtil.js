import _typeof from "@babel/runtime/helpers/esm/typeof";
import * as React from 'react';
import classNames from 'classnames';
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import FileOutlined from "@ant-design/icons/es/icons/FileOutlined";
import MinusSquareOutlined from "@ant-design/icons/es/icons/MinusSquareOutlined";
import PlusSquareOutlined from "@ant-design/icons/es/icons/PlusSquareOutlined";
import CaretDownFilled from "@ant-design/icons/es/icons/CaretDownFilled";
import { isValidElement, cloneElement } from '../../_util/reactNode';
export default function renderSwitcherIcon(prefixCls, switcherIcon, showLine, treeNodeProps) {
  var isLeaf = treeNodeProps.isLeaf,
      expanded = treeNodeProps.expanded,
      loading = treeNodeProps.loading;

  if (loading) {
    return /*#__PURE__*/React.createElement(LoadingOutlined, {
      className: "".concat(prefixCls, "-switcher-loading-icon")
    });
  }

  var showLeafIcon;

  if (showLine && _typeof(showLine) === 'object') {
    showLeafIcon = showLine.showLeafIcon;
  }

  if (isLeaf) {
    if (showLine) {
      if (_typeof(showLine) === 'object' && !showLeafIcon) {
        return /*#__PURE__*/React.createElement("span", {
          className: "".concat(prefixCls, "-switcher-leaf-line")
        });
      }

      return /*#__PURE__*/React.createElement(FileOutlined, {
        className: "".concat(prefixCls, "-switcher-line-icon")
      });
    }

    return null;
  }

  var switcherCls = "".concat(prefixCls, "-switcher-icon");
  var switcher = typeof switcherIcon === 'function' ? switcherIcon({
    expanded: !!expanded
  }) : switcherIcon;

  if (isValidElement(switcher)) {
    return cloneElement(switcher, {
      className: classNames(switcher.props.className || '', switcherCls)
    });
  }

  if (switcher) {
    return switcher;
  }

  if (showLine) {
    return expanded ? /*#__PURE__*/React.createElement(MinusSquareOutlined, {
      className: "".concat(prefixCls, "-switcher-line-icon")
    }) : /*#__PURE__*/React.createElement(PlusSquareOutlined, {
      className: "".concat(prefixCls, "-switcher-line-icon")
    });
  }

  return /*#__PURE__*/React.createElement(CaretDownFilled, {
    className: switcherCls
  });
}