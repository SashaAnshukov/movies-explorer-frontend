import devWarning, { resetWarned } from "rc-util/es/warning";
export { resetWarned };
export default (function (valid, component, message) {
  devWarning(valid, "[antd: ".concat(component, "] ").concat(message)); // StrictMode will inject console which will not throw warning in React 17.

  if (process.env.NODE_ENV === 'test') {
    resetWarned();
  }
});