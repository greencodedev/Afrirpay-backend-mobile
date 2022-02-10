"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SIZES = exports.COLORS = void 0;

var _reactNative = require("react-native");

var _Dimensions$get = _reactNative.Dimensions.get("window"),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;

var COLORS = {
  primary: "#FF5678",
  secondary: '#FE6A92',
  blue: "#0682FE",
  appPrimary: "#8B16FF",
  black: "#171717",
  white: "#FFFFFF",
  background: "#FFFFFF",
  grey: "#F1F3FA",
  dark_1: '#182D64',
  dark_2: 'rgba(38, 38, 38, 0.6)',
  dark_8: 'rgba(241, 243, 250, 1)',
  dark_4: '#959FBA',
  Neutral: "#757575",
  Neutral_100: "#0A0A0A"
};
exports.COLORS = COLORS;
var SIZES = {
  base: 10,
  width: width,
  height: height
};
exports.SIZES = SIZES;
var theme = {
  COLORS: COLORS,
  SIZES: SIZES
};
var _default = theme;
exports["default"] = _default;