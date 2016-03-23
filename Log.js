'use strict';
var {NativeModules} = require('react-native');
var LogNative = NativeModules.logModule;
var Log = {
  needLog: false,
  log: function(str) {
    if (!Log.needLog || !LogNative) {
      return;
    }
    LogNative.log(str);
  },
  setLogAble(able) {
    if (able === Log.needLog) {
      return;
    }
    Log.needLog = able;
  }
};

module.exports = Log;
