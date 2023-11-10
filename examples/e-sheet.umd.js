
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.eSheet = factory());
})(this, (function () { 'use strict';

  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var base64Img = {
    cell: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTkgMTd2LTVoLTJ2NWgtNXYyaDV2NWgydi01aDV2LTJoLTV6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9Ii44OCIvPjxwYXRoIGQ9Ik0xMiAxOS41aDQuNXY1aDN2LTVoNXYtM2gtNXYtNWgtM3Y1aC01djNoLjV6IiBzdHJva2U9IiMxNzFBMUQiLz48L2c+PGRlZnM+PGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSI4IiB5PSI5IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPjxmZU9mZnNldCBkeT0iMSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+PGZlQmxlbmQgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg==',
    'col-resize': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPjxtYXNrIGlkPSJhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSI3IiB5PSI5IiB3aWR0aD0iMjIiIGhlaWdodD0iMTgiIGZpbGw9IiMwMDAiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik03IDloMjJ2MThIN3oiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE5IDEwaC0ydjdoLTR2Mmg0djdoMnYtN2g0di0yaC00di03ek05IDE4bDQtM3Y2bC00LTN6bTE4IDBsLTQgM3YtNmw0IDN6Ii8+PC9tYXNrPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTkgMTBoLTJ2N2gtNHYyaDR2N2gydi03aDR2LTJoLTR2LTd6TTkgMThsNC0zdjZsLTQtM3ptMTggMGwtNCAzdi02bDQgM3oiIGZpbGw9IiMxNzFBMUQiLz48cGF0aCBkPSJNMTkgMTBoMVY5aC0xdjF6bS0yIDBWOWgtMXYxaDF6bTAgN3YxaDF2LTFoLTF6bS00IDB2LTFoLTF2MWgxem0wIDJoLTF2MWgxdi0xem00IDBoMXYtMWgtMXYxem0wIDdoLTF2MWgxdi0xem0yIDB2MWgxdi0xaC0xem0wLTd2LTFoLTF2MWgxem00IDB2MWgxdi0xaC0xem0wLTJoMXYtMWgtMXYxem0tNCAwaC0xdjFoMXYtMXpNOSAxOGwtLjYtLjgtMS4wNjcuOCAxLjA2Ny44LjYtLjh6bTQtM2gxdi0ybC0xLjYgMS4yLjYuOHptMCA2bC0uNi44TDE0IDIzdi0yaC0xem0xNC0zbC42LjggMS4wNjctLjgtMS4wNjctLjgtLjYuOHptLTQgM2gtMXYybDEuNi0xLjItLjYtLjh6bTAtNmwuNi0uOEwyMiAxM3YyaDF6bS00LTZoLTJ2MmgyVjl6bS0zIDF2N2gydi03aC0yem0xIDZoLTR2Mmg0di0yem0tNSAxdjJoMnYtMmgtMnptMSAzaDR2LTJoLTR2MnptMy0xdjdoMnYtN2gtMnptMSA4aDJ2LTJoLTJ2MnptMy0xdi03aC0ydjdoMnptLTEtNmg0di0yaC00djJ6bTUtMXYtMmgtMnYyaDJ6bS0xLTNoLTR2Mmg0di0yem0tMyAxdi03aC0ydjdoMnpNOS42IDE4LjhsNC0zLTEuMi0xLjYtNCAzIDEuMiAxLjZ6TTEyIDE1djZoMnYtNmgtMnptMS42IDUuMmwtNC0zLTEuMiAxLjYgNCAzIDEuMi0xLjZ6bTEyLjgtM2wtNCAzIDEuMiAxLjYgNC0zLTEuMi0xLjZ6TTI0IDIxdi02aC0ydjZoMnptLTEuNi01LjJsNCAzIDEuMi0xLjYtNC0zLTEuMiAxLjZ6IiBmaWxsPSIjZmZmIiBtYXNrPSJ1cmwoI2EpIi8+PC9nPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iNC4zMzMiIHk9IjciIHdpZHRoPSIyNy4zMzMiIGhlaWdodD0iMjQiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPjxmZU9mZnNldCBkeT0iMSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+PGZlQmxlbmQgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg==',
    'row-resize': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPjxtYXNrIGlkPSJhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4PSI5IiB5PSI3IiB3aWR0aD0iMTgiIGhlaWdodD0iMjIiIGZpbGw9IiMwMDAiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik05IDdoMTh2MjJIOXoiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI2IDE5di0yaC03di00aC0ydjRoLTd2Mmg3djRoMnYtNGg3ek0xOCA5bDMgNGgtNmwzLTR6bTAgMThsLTMtNGg2bC0zIDR6Ii8+PC9tYXNrPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjYgMTl2LTJoLTd2LTRoLTJ2NGgtN3YyaDd2NGgydi00aDd6TTE4IDlsMyA0aC02bDMtNHptMCAxOGwtMy00aDZsLTMgNHoiIGZpbGw9IiMxNzFBMUQiLz48cGF0aCBkPSJNMjYgMTl2MWgxdi0xaC0xem0wLTJoMXYtMWgtMXYxem0tNyAwaC0xdjFoMXYtMXptMC00aDF2LTFoLTF2MXptLTIgMHYtMWgtMXYxaDF6bTAgNHYxaDF2LTFoLTF6bS03IDB2LTFIOXYxaDF6bTAgMkg5djFoMXYtMXptNyAwaDF2LTFoLTF2MXptMCA0aC0xdjFoMXYtMXptMiAwdjFoMXYtMWgtMXptMC00di0xaC0xdjFoMXpNMTggOWwuOC0uNi0uOC0xLjA2Ny0uOCAxLjA2Ny44LjZ6bTMgNHYxaDJsLTEuMi0xLjYtLjguNnptLTYgMGwtLjgtLjZMMTMgMTRoMnYtMXptMyAxNGwtLjguNi44IDEuMDY3LjgtMS4wNjctLjgtLjZ6bS0zLTR2LTFoLTJsMS4yIDEuNi44LS42em02IDBsLjguNkwyMyAyMmgtMnYxem02LTR2LTJoLTJ2Mmgyem0tMS0zaC03djJoN3YtMnptLTYgMXYtNGgtMnY0aDJ6bS0xLTVoLTJ2Mmgydi0yem0tMyAxdjRoMnYtNGgtMnptMSAzaC03djJoN3YtMnptLTggMXYyaDJ2LTJIOXptMSAzaDd2LTJoLTd2MnptNi0xdjRoMnYtNGgtMnptMSA1aDJ2LTJoLTJ2MnptMy0xdi00aC0ydjRoMnptLTEtM2g3di0yaC03djJ6TTE3LjIgOS42bDMgNCAxLjYtMS4yLTMtNC0xLjYgMS4yek0yMSAxMmgtNnYyaDZ2LTJ6bS01LjIgMS42bDMtNC0xLjYtMS4yLTMgNCAxLjYgMS4yem0zIDEyLjhsLTMtNC0xLjYgMS4yIDMgNCAxLjYtMS4yek0xNSAyNGg2di0yaC02djJ6bTUuMi0xLjZsLTMgNCAxLjYgMS4yIDMtNC0xLjYtMS4yeiIgZmlsbD0iI2ZmZiIgbWFzaz0idXJsKCNhKSIvPjwvZz48ZGVmcz48ZmlsdGVyIGlkPSJmaWx0ZXIwX2QiIHg9IjYiIHk9IjUuMzMzIiB3aWR0aD0iMjQiIGhlaWdodD0iMjcuMzMzIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz48ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz48ZmVPZmZzZXQgZHk9IjEiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjUiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPjxmZUJsZW5kIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPjwvZmlsdGVyPjwvZGVmcz48L3N2Zz4=',
    's-resize': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTcgMTl2LThoM3Y4aDNsLTQuNSA1LjVMMTQgMTloM3oiIGZpbGw9IiMxNzFBMUQiLz48cGF0aCBkPSJNMjMgMTguNWgtMi41di04aC00djhoLTMuNTU1bC42NjguODE3IDQuNSA1LjUuMzg3LjQ3My4zODctLjQ3MyA0LjUtNS41LjY2OC0uODE3SDIzeiIgc3Ryb2tlPSIjZmZmIi8+PC9nPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iOC44OSIgeT0iOCIgd2lkdGg9IjE5LjIyMSIgaGVpZ2h0PSIyMi4wNzkiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPjxmZU9mZnNldCBkeT0iMSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+PGZlQmxlbmQgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg==',
    'e-resize': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAgMTloLTh2LTNoOHYtM2w1IDQuNS01IDQuNXYtM3oiIGZpbGw9IiMxNzFBMUQiLz48cGF0aCBkPSJNMTkuNSAxM3YyLjVoLTh2NGg4djMuNjIzbC44MzQtLjc1MSA1LTQuNS40MTMtLjM3Mi0uNDEzLS4zNzItNS00LjUtLjgzNC0uNzVWMTN6IiBzdHJva2U9IiNmZmYiLz48L2c+PGRlZnM+PGZpbHRlciBpZD0iZmlsdGVyMF9kIiB4PSI4IiB5PSI4Ljc1NSIgd2lkdGg9IjIxLjQ5NSIgaGVpZ2h0PSIxOS40OTEiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPjxmZU9mZnNldCBkeT0iMSIvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjEuNSIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+PGZlQmxlbmQgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93Ii8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93IiByZXN1bHQ9InNoYXBlIi8+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPg==',
    'crosshair': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTggMTh2LTZoLTF2NmgtNnYxaDZ2Nmgxdi02aDZ2LTFoLTZ6IiBmaWxsPSIjMTcxQTFEIi8+PHBhdGggZD0iTTE4LjUgMTJ2LS41aC0ydjZoLTZ2Mmg2djZoMnYtNmg2di0yaC02VjEyeiIgc3Ryb2tlPSIjZmZmIi8+PC9nPjxkZWZzPjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iNyIgeT0iOSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjIxIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz48ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiLz48ZmVPZmZzZXQgZHk9IjEiLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxLjUiLz48ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPjxmZUJsZW5kIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPjwvZmlsdGVyPjwvZGVmcz48L3N2Zz4='
  };

  /**
   * @typedef {Object} Canvas
   * @typedef {(string | CanvasGradient | CanvasPattern)} Color
   */
  var Canvas = /*#__PURE__*/function () {
    /**
     * @param {HTMLCanvasElement} canvasDom
     * @param {Object} options
     */
    function Canvas(canvasDom) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, Canvas);
      _defineProperty(this, "canvasDom", null);
      /**
       * @type {CanvasRenderingContext2D}
       */
      _defineProperty(this, "ctx", null);
      /**
       * @type {number}
       */
      _defineProperty(this, "cellWidth", 0);
      /**
       * @type {number}
       */
      _defineProperty(this, "cellHeight", 0);
      this.ctx = canvasDom.getContext('2d');
      this.cellWidth = options.cellWidth;
      this.cellHeight = options.cellHeight;
      this.canvasDom = canvasDom;
      canvasDom.addEventListener('mousemove', function (_) {
        // console.log('evt',evt)
        _this.setCursor('cell');
      });
    }
    _createClass(Canvas, [{
      key: "setCursor",
      value: function setCursor(shape) {
        this.canvasDom.style.cursor = "url(".concat(base64Img[shape], ") 18 18, ").concat(shape);
      }
    }, {
      key: "setCursorDefault",
      value: function setCursorDefault() {
        this.canvasDom.style.cursor = 'default';
      }

      /**
       * @param {Array<number>} points
       * @param {string} globalCompositeOperation
       * @param {string} color
       */
    }, {
      key: "drawLine",
      value: function drawLine(points) {
        var globalCompositeOperation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'source-over';
        var color = arguments.length > 2 ? arguments[2] : undefined;
        this.ctx.strokeStyle = color !== null && color !== void 0 ? color : 'black';
        this.ctx.lineWidth = 1;
        this.ctx.globalCompositeOperation = globalCompositeOperation; //'destination-over'
        this.ctx.beginPath();
        if (points.length % 2 !== 0) {
          throw new Error('points is error');
        }
        var drawNum = points.length / 2;
        this.ctx.moveTo(points[0], points[1]);
        for (var i = 2; i < drawNum + 1; i += 2) {
          this.ctx.lineTo(points[i], points[i + 1]);
        }
        this.ctx.closePath();
        this.ctx.stroke();
      }

      /**
       * @param {number} x
       * @param {number} y
       * @param {string} text
       * @param {number} cellWidth
       * @param {number} cellHeight
       * @param {Color} color
       * @param {string} textAlign
       * @param {object} font
       * @param {string} textBaseline
       */
    }, {
      key: "drawText",
      value: function drawText(x, y, text, rectWidth, rectHeight, globalCompositeOperation, color) {
        var _rectWidth, _rectHeight;
        var textAlign = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'center';
        var font = arguments.length > 8 ? arguments[8] : undefined;
        var textBaseline = arguments.length > 9 ? arguments[9] : undefined;
        var ctx = this.ctx,
          cellWidth = this.cellWidth,
          cellHeight = this.cellHeight;
        ctx.globalCompositeOperation = globalCompositeOperation !== null && globalCompositeOperation !== void 0 ? globalCompositeOperation : 'source-over';
        rectWidth = (_rectWidth = rectWidth) !== null && _rectWidth !== void 0 ? _rectWidth : cellWidth;
        rectHeight = (_rectHeight = rectHeight) !== null && _rectHeight !== void 0 ? _rectHeight : cellHeight;
        ctx.font = font ? "".concat(font.fontWeight + ' ').concat(font.fontItalic + ' ').concat(font.fontSize, "px ").concat(font.fontFamily) : '12px Calibre';
        ctx.fillStyle = color ? color : "black";
        var baseX = x + rectWidth / 2;
        var baseY = y + rectHeight / 2;
        ctx.textBaseline = textBaseline ? textBaseline : "middle";
        ctx.textAlign = textAlign ? textAlign : "center";
        var textObj = ctx.measureText(text);
        var tempText = '';
        if (textObj.width > rectWidth) {
          var txtNum = (rectWidth / font.fontSize).toFixed(0) - 1;
          tempText = text.slice(0, txtNum - 1) + '...';
        } else {
          tempText = text;
        }
        var alignX = 0;
        var alignY = 0;
        if (textAlign === 'left') {
          alignX = x;
        } else if (textAlign === 'right') {
          alignX = x + rectWidth;
        } else {
          alignX = baseX;
        }
        if (textBaseline === 'top') {
          alignY = y + 2;
        } else if (textBaseline === 'bottom') {
          alignY = y + rectHeight;
        } else {
          alignY = baseY;
        }
        ctx.fillText(tempText, alignX, alignY, rectWidth);
      }

      /**
       * @param {number} startX
       * @param {number} startY
       * @param {number} endX
       * @param {number} endY
       */
    }, {
      key: "clearRect",
      value: function clearRect(startX, startY, endX, endY) {
        this.ctx.clearRect(startX, startY, endX, endY);
      }

      /**
       * @param {number} x
       * @param {number} y
       * @param {number} width
       * @param {number} height
       * @param {Color} color
       * @param {string} globalCompositeOperation
       * @param {number} lineWidth
       */
    }, {
      key: "drawStrokeRect",
      value: function drawStrokeRect(x, y, width, height, color, globalCompositeOperation) {
        var lineWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
        this.ctx.lineWidth = lineWidth;
        this.ctx.globalCompositeOperation = globalCompositeOperation !== null && globalCompositeOperation !== void 0 ? globalCompositeOperation : 'source-over';
        this.ctx.strokeStyle = color !== null && color !== void 0 ? color : 'black';
        this.ctx.strokeRect(x, y, width, height);
      }

      /**
       * @param {number} x
       * @param {number} y
       * @param {number} width
       * @param {number} height
       * @param {Color} color
       * @param {string} globalCompositeOperation
       */
    }, {
      key: "drawFillRect",
      value: function drawFillRect(x, y, width, height, color, globalCompositeOperation) {
        this.ctx.fillStyle = color !== null && color !== void 0 ? color : 'black';
        this.ctx.globalCompositeOperation = globalCompositeOperation !== null && globalCompositeOperation !== void 0 ? globalCompositeOperation : 'source-over';
        this.ctx.fillRect(x, y, width, height);
      }

      /**
       * @param {number} x
       * @param {number} y
       * @param {number} width
       * @param {number} height
       * @param {Color} color
       * @param {string} globalCompositeOperation
       * @param {number} lineWidth
       */
    }, {
      key: "drawDashStrokeRect",
      value: function drawDashStrokeRect(x, y, width, height, color, globalCompositeOperation) {
        var lineWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
        this.ctx.lineWidth = lineWidth;
        this.ctx.globalCompositeOperation = globalCompositeOperation !== null && globalCompositeOperation !== void 0 ? globalCompositeOperation : 'source-over';
        this.ctx.strokeStyle = color !== null && color !== void 0 ? color : 'black';
        this.ctx.setLineDash([5, 5]);
        this.ctx.strokeRect(x, y, width, height);
        this.ctx.setLineDash([]);
      }

      /**
       * @param {Object} first
       * @param {Object} second
       * @param {Object} thrid
       * @param {Color} color
       */
    }, {
      key: "drawTriangleRect",
      value: function drawTriangleRect(first, second, thrid, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(first.x, first.y);
        this.ctx.lineTo(second.x, second.y);
        this.ctx.lineTo(thrid.x, thrid.y);
        this.ctx.closePath();
        this.ctx.fillStyle = color !== null && color !== void 0 ? color : 'black';
        this.ctx.fill();
      }
    }]);
    return Canvas;
  }();

  function transformNumToLabel(num) {
    if (num > 26) {
      if (num % 26 === 0) {
        return String.fromCharCode(64 + parseInt((Math.floor(num / 26) - 1).toFixed(0))) + String.fromCharCode(64 + 26);
      } else {
        return String.fromCharCode(64 + parseInt(Math.floor(num / 26).toFixed(0))) + String.fromCharCode(64 + num % 26);
      }
    } else {
      return String.fromCharCode(64 + num);
    }
  }

  /**
   * @typedef {Object} AppExcel
   */
  var AppExcel = /*#__PURE__*/function () {
    function AppExcel(selectorDom) {
      var _this = this,
        _options$width,
        _options$height,
        _options$row,
        _options$col;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var components = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var plugins = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      _classCallCheck(this, AppExcel);
      /**
       * @type {number}
       */
      _defineProperty(this, "scale", 1);
      /**
       * @type {Array}
       */
      _defineProperty(this, "mulPersonSelected", []);
      /**
       * @type {WebSocket}
       */
      _defineProperty(this, "ws", void 0);
      _defineProperty(this, "userId", new Date().valueOf());
      _defineProperty(this, "userName", new Date().valueOf());
      _defineProperty(this, "userColor", this.getRandomColor());
      _defineProperty(this, "fontSize", 12);
      _defineProperty(this, "workBook", {});
      _defineProperty(this, "eSheetWorkBook", []);
      _defineProperty(this, "row", 160);
      _defineProperty(this, "col", 52);
      // 以内容表格左上角为原点计算表格的坐标
      _defineProperty(this, "cellWidth", 120);
      // 标准单个框宽度
      _defineProperty(this, "cellHeight", 40);
      // 标准单个框高度
      _defineProperty(this, "width", 600);
      _defineProperty(this, "height", 600);
      _defineProperty(this, "sheetWidth", 0);
      _defineProperty(this, "sheetHeight", 0);
      _defineProperty(this, "selectorDom", null);
      _defineProperty(this, "canvasDom", null);
      _defineProperty(this, "canvasWrapperDom", null);
      _defineProperty(this, "layer", null);
      _defineProperty(this, "components", {});
      _defineProperty(this, "plugins", {});
      _defineProperty(this, "copyKey", false);
      _defineProperty(this, "copyCellDash", []);
      _defineProperty(this, "shiftKey", false);
      _defineProperty(this, "ctrlKey", false);
      _defineProperty(this, "dragSign", false);
      _defineProperty(this, "lockDrag", false);
      _defineProperty(this, "dragSignDirectionIsHor", false);
      _defineProperty(this, "offsetYLock", false);
      _defineProperty(this, "offsetXLock", false);
      _defineProperty(this, "isScrollBottomBound", false);
      _defineProperty(this, "isScrollRightBound", false);
      _defineProperty(this, "nonSelectBgColor", '#FFFFFF');
      _defineProperty(this, "selectedBorderBgColor", '#0089FF');
      _defineProperty(this, "selectedBgColor", '#EBF4FF');
      _defineProperty(this, "borderColor", '#ECEDEE');
      _defineProperty(this, "borderCellBgColor", '#F9FBFD');
      /**
       * @type {number}
       */
      _defineProperty(this, "currentSheetIndex", 0);
      /**
       * @param {*} obj
       * @returns {string}
       */
      _defineProperty(this, "getType", function (obj) {
        return Object.prototype.toString.call(obj);
      });
      /**
       *
       * @param {string} elName
       * @param {Object} attr
       * @param {Object} style
       * @param {HTMLElement | Array<HTMLElement>} childDom
       * @param {Object} listener
       * @returns {HTMLElement}
       */
      _defineProperty(this, "h", function (elName) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          attr = _ref.attr,
          style = _ref.style,
          attribute = _ref.attribute;
        var childDom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var tempDom = document.createElement(elName);
        for (var i in attr) {
          tempDom[i] = attr[i];
        }
        for (var _i in attribute) {
          tempDom.setAttribute(_i, attribute[_i]);
        }
        for (var _i2 in style) {
          tempDom.style[_i2] = style[_i2];
        }
        if (childDom) {
          var childType = _this.getType(childDom);
          if (childType === '[object Array]') {
            childDom.forEach(function (item) {
              tempDom.appendChild(item);
            });
          } else {
            tempDom.appendChild(childDom);
          }
        }
        return tempDom;
      });
      _defineProperty(this, "fps", 0);
      _defineProperty(this, "lastTime", 0);
      _defineProperty(this, "draw", function () {
        var currentTime = performance.now();
        var deltaTime = currentTime - _this.lastTime;
        _this.lastTime = currentTime;

        // 在这里进行动画的绘制逻辑

        _this.fps = Math.round(1000 / deltaTime);
        console.log('fps', _this.fps);
        requestAnimationFrame(_this.draw);
      });
      // 默认设置容器宽和高为600
      options.width = (_options$width = options.width) !== null && _options$width !== void 0 ? _options$width : this.width;
      options.height = (_options$height = options.height) !== null && _options$height !== void 0 ? _options$height : this.width;
      options.row = (_options$row = options.row) !== null && _options$row !== void 0 ? _options$row : this.row;
      options.col = (_options$col = options.col) !== null && _options$col !== void 0 ? _options$col : this.col;

      // 固有属性
      options.cellWidth = this.cellWidth;
      options.cellHeight = this.cellHeight;
      this.selectorDom = selectorDom;
      var canvasDom = document.createElement('canvas');
      canvasDom.width = options.width;
      canvasDom.height = options.height;
      var canvasWrapperDom = this.h('div', {
        attr: {
          className: 'e-sheet-canvas-wrapper'
        }
      });
      canvasWrapperDom.appendChild(canvasDom);
      this.canvasWrapperDom = canvasWrapperDom;
      this.selectorDom.style.width = options.width + 'px';
      this.canvasWrapperDom.style.width = options.width + 'px';
      this.canvasWrapperDom.style.height = options.height + 'px';
      this.selectorDom.appendChild(canvasWrapperDom);
      this.canvasDom = canvasDom;
      this.layer = new Canvas(canvasDom, options, this);
      this.options = options;
      // console.log('this.options',this.options)

      this.createNewSheet();

      // 装载组件
      this.installComponents(components);
      this.installPlugins(plugins);

      // requestAnimationFrame(this.draw);
    }

    /**
     * @description 导出sheet数据
     * @returns {Array}
     */
    _createClass(AppExcel, [{
      key: "exportXlsxData",
      value: function exportXlsxData() {
        var book = [];
        this.eSheetWorkBook.forEach(function (item) {
          var mergeGroup = item.sheet.filter(function (itemA) {
            return itemA.isMerge;
          });
          var merges = mergeGroup.filter(function (itemA) {
            return itemA.mergeStartLabel === itemA.label;
          }).map(function (itemB) {
            var endIndex = mergeGroup.findIndex(function (itemC) {
              return itemC.label === itemB.mergeEndLabel;
            });
            var endRect = mergeGroup[endIndex];
            return {
              s: {
                c: itemB.col - 1,
                r: itemB.row - 1
              },
              e: {
                c: endRect.col - 1,
                r: endRect.row - 1
              }
            };
          });
          var hasDataCellGroup = item.sheet.filter(function (itemA) {
            return !!itemA.text;
          }).filter(function (itemB) {
            return itemB.isMerge && itemB.label === itemB.mergeStartLabel || !itemB.isMerge;
          });
          var sheet = {};
          hasDataCellGroup.forEach(function (itemB) {
            sheet[itemB.label] = {
              t: 's',
              v: itemB.text
            };
          });
          if (hasDataCellGroup.length > 1) {
            sheet['!ref'] = hasDataCellGroup[0].label + ':' + hasDataCellGroup[hasDataCellGroup.length - 1].label;
          } else if (hasDataCellGroup.length === 1) {
            sheet['!ref'] = hasDataCellGroup[0].label;
          }
          var sheetBook = {
            label: item.label,
            sheet: sheet
          };
          if (merges.length > 0) {
            sheet['!merges'] = merges;
          }
          book.push(sheetBook);
        });
        return book;
      }

      /**
       * @param {string} addr
       */
    }, {
      key: "connectWebSocket",
      value: function connectWebSocket(addr) {
        this.ws = new WebSocket(addr);
        this.wsOpenCallback();
        this.wsCloseCallback();
        this.wsMsgCallback();
      }
    }, {
      key: "wsMsgCallback",
      value: function wsMsgCallback() {
        var _this2 = this;
        this.ws.onmessage = function (evt) {
          console.log('evt---onmessage', evt);
          var DragPlugin = _this2.plugins.DragPlugin;
          var ContentComponent = _this2.components.ContentComponent;

          /**
           * 0.同步数据
           * 1.选中改变
           * 2.单元格内容改变
           * 3.横向距离改变
           * 4.纵向距离改变
           */

          var data = JSON.parse(evt.data);
          if (data.type === 0) {
            ContentComponent.contentGroup = data.command;
            _this2.mulPersonSelected.forEach(function (item) {
              item.command = ContentComponent.searchRectByLabel(item.command.label);
            });
          } else if (data.type === 1) {
            var index = _this2.mulPersonSelected.findIndex(function (item) {
              return item.userId === data.userId;
            });
            data.command = ContentComponent.searchRectByLabel(data.command.label);
            if (index === -1) {
              _this2.mulPersonSelected.push(data);
            } else {
              _this2.mulPersonSelected[index] = data;
            }
          } else if (data.type === 2) {
            _this2.components.ContentComponent.changeRectTextByLabel(data.command);
          } else if (data.type === 3) {
            var oriRect = ContentComponent.searchRectByLabel(data.command.label);
            DragPlugin.expandWidthNoDrag(data.command.col, data.command.width - oriRect.width);
          }
          _this2.fresh();
        };
      }
    }, {
      key: "wsOpenCallback",
      value: function wsOpenCallback() {
        this.ws.onopen = function (evt) {
          console.log('evt---onopen', evt);
        };
      }
    }, {
      key: "wsCloseCallback",
      value: function wsCloseCallback() {
        var _this3 = this;
        this.ws.onclose = function (evt) {
          console.log('evt---onclose', evt);
          _this3.ws = null;
        };
      }
    }, {
      key: "setUserName",
      value: function setUserName(userName) {
        this.userName = userName;
      }
    }, {
      key: "wsSend",
      value: function wsSend(type, data) {
        if (this.ws) {
          this.ws.send(JSON.stringify({
            type: type,
            command: data,
            userId: this.userId,
            userName: this.userName,
            userColor: this.userColor
          }));
        }
      }
    }, {
      key: "syncData",
      value: function syncData() {
        this.wsSend(0, this.components.ContentComponent.contentGroup);
      }
    }, {
      key: "getRandomColor",
      value: function getRandomColor() {
        var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
        if (rand.length === 6) {
          return '#' + rand;
        } else {
          return this.getRandomColor();
        }
      }

      // 切换sheet
    }, {
      key: "switchSheet",
      value: function switchSheet(sheetIndex) {
        this.saveHandle();
        var currentSheetBook = this.eSheetWorkBook[sheetIndex];
        this.currentSheetIndex = sheetIndex;
        this.components.ContentComponent.installContentDataByData(currentSheetBook.sheet);
        if (currentSheetBook.clickCell) {
          this.components.ContentComponent.showClickRect(currentSheetBook.clickCell);
          this.plugins.SettingPlugin.setLabelCon(currentSheetBook.clickCell.label);
          this.plugins.SettingPlugin.setCellCon(currentSheetBook.clickCell.text);
        }
        this.fresh();
      }
    }, {
      key: "saveHandle",
      value: function saveHandle() {
        this.copyKey = false;
        this.copyCellDash = [];
        if (this.components.ContentComponent && this.components.ContentComponent.clickCell) {
          var preSheetBook = this.eSheetWorkBook[this.currentSheetIndex];
          preSheetBook.clickCell = this.components.ContentComponent.clickCell;
          this.components.ContentComponent.hideClickRect();
        }
      }
    }, {
      key: "createNewSheet",
      value: function createNewSheet() {
        var sheetName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Sheet';
        this.saveHandle();
        var _this$options = this.options,
          row = _this$options.row,
          col = _this$options.col,
          cellWidth = _this$options.cellWidth,
          cellHeight = _this$options.cellHeight;
        var colWidth = 0;
        var colAbWidth = 0;
        var rowHeight = 0;
        var rowAbHeight = cellHeight;
        this.sheetWidth = 0;
        this.sheetHeight = 0;
        var currentIndex = 1;
        var newSheetName = sheetName + currentIndex;
        var sheetIndex = this.eSheetWorkBook.findIndex(function (item) {
          return item.label === newSheetName;
        });
        while (sheetIndex !== -1) {
          currentIndex++;
          newSheetName = sheetName + currentIndex;
          sheetIndex = this.eSheetWorkBook.findIndex(function (item) {
            return item.label === newSheetName;
          });
        }
        this.eSheetWorkBook.push({
          label: newSheetName,
          sheet: [],
          clickCell: {
            row: 1,
            col: 1,
            text: '',
            textAsNumber: NaN,
            width: cellWidth,
            height: cellHeight,
            x: 0,
            y: 0,
            ltX: cellHeight,
            ltY: cellHeight,
            mergeWidth: 0,
            mergeHeight: 0,
            mergeRow: 1,
            mergeCol: 1,
            mergeStartLabel: '',
            mergeEndLabel: '',
            mergeLabelGroup: [],
            isMerge: false,
            bgColor: '#ffffff',
            fontColor: '#000000',
            font: null,
            fontSize: 12,
            fontWeight: '',
            fontItalic: '',
            fontFamily: 'Calibre',
            textAlign: 'center',
            textBaseline: 'middle',
            label: 'A1'
          }
        });
        this.currentSheetIndex = this.eSheetWorkBook.length - 1;
        var sheet = this.eSheetWorkBook[this.eSheetWorkBook.length - 1].sheet;
        for (var i = 0; i < row; i++) {
          colWidth = 0;
          colAbWidth = cellHeight;
          this.sheetHeight += cellHeight;
          for (var j = 0; j < col; j++) {
            if (i === 0) {
              this.sheetWidth += cellWidth;
            }
            var label = transformNumToLabel(j + 1) + (i + 1);
            sheet.push({
              row: i + 1,
              col: j + 1,
              text: '',
              textAsNumber: NaN,
              width: cellWidth,
              height: cellHeight,
              x: colWidth,
              y: rowHeight,
              ltX: colAbWidth,
              ltY: rowAbHeight,
              mergeWidth: 0,
              mergeHeight: 0,
              mergeRow: 1,
              mergeCol: 1,
              mergeStartLabel: '',
              mergeEndLabel: '',
              mergeLabelGroup: [],
              isMerge: false,
              bgColor: '#ffffff',
              fontColor: '#000000',
              font: null,
              fontSize: 12,
              fontWeight: '',
              fontItalic: '',
              fontFamily: 'Calibre',
              textAlign: 'center',
              textBaseline: 'middle',
              label: label
            });
            colWidth += cellWidth;
            colAbWidth += cellWidth;
          }
          rowHeight += cellHeight;
          rowAbHeight += cellHeight;
        }
      }
    }, {
      key: "initExcelData",
      value: function initExcelData() {
        var sheetName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Sheet1';
        var _this$options2 = this.options,
          row = _this$options2.row,
          col = _this$options2.col,
          cellWidth = _this$options2.cellWidth,
          cellHeight = _this$options2.cellHeight;
        var colWidth = 0;
        var colAbWidth = 0;
        var rowHeight = 0;
        var rowAbHeight = cellHeight;
        this.sheetWidth = 0;
        this.sheetHeight = 0;

        // this.core.sheetWidth += cellHeight
        // this.core.sheetHeight += cellHeight

        var sheetIndex = this.eSheetWorkBook.findIndex(function (item) {
          return item.label === sheetName;
        });
        var currentIndex = 0;
        if (sheetIndex === -1) {
          this.eSheetWorkBook.push({
            label: sheetName,
            sheet: []
          });
          currentIndex = this.eSheetWorkBook.length - 1;
        } else {
          currentIndex = sheetIndex;
        }
        this.eSheetWorkBook[currentIndex].sheet = [];
        for (var i = 0; i < row; i++) {
          colWidth = 0;
          colAbWidth = cellHeight;
          this.sheetHeight += cellHeight;
          for (var j = 0; j < col; j++) {
            var _this$workBook$sheetN, _this$workBook$sheetN2;
            if (i === 0) {
              this.sheetWidth += cellWidth;
            }
            var label = transformNumToLabel(j + 1) + (i + 1);
            this.eSheetWorkBook[currentIndex].sheet.push({
              row: i + 1,
              col: j + 1,
              text: this.workBook[sheetName] ? (_this$workBook$sheetN = (_this$workBook$sheetN2 = this.workBook[sheetName][String.fromCharCode(65 + j) + (i + 1)]) === null || _this$workBook$sheetN2 === void 0 ? void 0 : _this$workBook$sheetN2.v) !== null && _this$workBook$sheetN !== void 0 ? _this$workBook$sheetN : '' : '',
              textAsNumber: NaN,
              width: cellWidth,
              height: cellHeight,
              x: colWidth,
              y: rowHeight,
              ltX: colAbWidth,
              ltY: rowAbHeight,
              mergeWidth: 0,
              mergeHeight: 0,
              mergeRow: 1,
              mergeCol: 1,
              mergeStartLabel: '',
              mergeEndLabel: '',
              mergeLabelGroup: [],
              isMerge: false,
              bgColor: '#ffffff',
              fontColor: '#000000',
              font: null,
              fontSize: 12,
              fontWeight: '',
              fontItalic: '',
              fontFamily: 'Calibre',
              textAlign: 'center',
              textBaseline: 'middle',
              label: label
            });
            colWidth += cellWidth;
            colAbWidth += cellWidth;
          }
          rowHeight += cellHeight;
          rowAbHeight += cellHeight;
        }
      }
    }, {
      key: "installXlsxData",
      value: function installXlsxData(oriData) {
        // console.log('oriData',oriData)

        this.workBook = oriData;
        if (Object.keys(oriData).length === 0) {
          throw new Error('data is error');
        }
        this.initExcelData(Object.keys(oriData)[0]);
        this.components.ContentComponent.installContentDataByName(Object.keys(oriData)[0]);
        this.components.ContentComponent.hideClickRect();
        this.fresh();
      }

      // 装载固有组件
    }, {
      key: "installComponents",
      value: function installComponents(components) {
        for (var component in components) {
          this.components[component] = new components[component](this.layer, this.options, this);
        }
      }

      // 装载插件
    }, {
      key: "installPlugins",
      value: function installPlugins(plugins) {
        for (var plugin in plugins) {
          this.plugins[plugin] = new plugins[plugin](this.selectorDom, this.layer, this.options, this.components, this);
        }
      }
    }, {
      key: "fresh",
      value: function fresh() {
        var _this$plugins$ScrollP = this.plugins.ScrollPlugin,
          offsetX = _this$plugins$ScrollP.offsetX,
          offsetY = _this$plugins$ScrollP.offsetY;
        var _this$components = this.components,
          ContentComponent = _this$components.ContentComponent,
          HeaderComponent = _this$components.HeaderComponent,
          SideComponent = _this$components.SideComponent,
          WholeComponent = _this$components.WholeComponent;
        ContentComponent.trendsDraw(offsetX, offsetY);
        HeaderComponent.trendsDraw(offsetX);
        SideComponent.trendsDraw(offsetY);
        WholeComponent.draw();
      }
    }, {
      key: "freshContent",
      value: function freshContent() {
        var _this$plugins$ScrollP2 = this.plugins.ScrollPlugin,
          offsetX = _this$plugins$ScrollP2.offsetX,
          offsetY = _this$plugins$ScrollP2.offsetY;
        var ContentComponent = this.components.ContentComponent;
        ContentComponent.trendsDraw(offsetX, offsetY);
      }
    }, {
      key: "freshScrollBar",
      value: function freshScrollBar() {
        this.plugins.ScrollPlugin.changeHorBarWidth();
        this.plugins.ScrollPlugin.changeVerBarHeight();
      }
    }]);
    return AppExcel;
  }();

  var WholeComponent = /*#__PURE__*/function () {
    function WholeComponent(layer) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var core = arguments.length > 2 ? arguments[2] : undefined;
      _classCallCheck(this, WholeComponent);
      _defineProperty(this, "options", {});
      /**
       * @type {Canvas}
       */
      _defineProperty(this, "layer", null);
      _defineProperty(this, "core", null);
      this.layer = layer;
      this.options = options;
      this.core = core;
      this.draw();
      // this.addEvent();
    }
    _createClass(WholeComponent, [{
      key: "draw",
      value: function draw() {
        var _this$core = this.core,
          borderCellBgColor = _this$core.borderCellBgColor,
          borderColor = _this$core.borderColor;
        var cellHeight = this.options.cellHeight;
        this.layer.clearRect(0, 0, cellHeight, cellHeight);
        this.layer.drawTriangleRect({
          x: cellHeight - 6,
          y: 6
        }, {
          x: cellHeight - 6,
          y: cellHeight - 6
        }, {
          x: 6,
          y: cellHeight - 6
        }, '#DCDCDC');
        this.layer.drawLine([0, 0, cellHeight, 0], null, borderColor);
        this.layer.drawLine([0, 0, 0, cellHeight], null, borderColor);
        this.layer.drawFillRect(0, 0, cellHeight, cellHeight, borderCellBgColor, 'destination-over');
      }
    }, {
      key: "addEvent",
      value: function addEvent() {}
    }]);
    return WholeComponent;
  }();

  var HeaderComponent = /*#__PURE__*/function () {
    function HeaderComponent(layer) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var core = arguments.length > 2 ? arguments[2] : undefined;
      _classCallCheck(this, HeaderComponent);
      _defineProperty(this, "options", {});
      /**
       * @type {Canvas}
       */
      _defineProperty(this, "layer", null);
      _defineProperty(this, "headerRectGroup", []);
      this.options = options;
      this.layer = layer;
      this.core = core;
      // this.initDraw()
      this.trendsDraw(0);
    }
    _createClass(HeaderComponent, [{
      key: "initDraw",
      value: function initDraw() {
        var col = this.options.col;
        var cellWidth = this.options.cellWidth;
        var cellHeight = this.options.cellHeight;
        for (var j = 0; j < col; j++) {
          var label = String.fromCharCode(65 + j);
          // const tempRect = new Konva.Rect({
          //     x: j*cellWidth+40,
          //     y: 0,
          //     width: cellWidth,
          //     height: cellHeight,
          //     attrs:{
          //         headerLabel:label,
          //         col:j,
          //         row:0
          //     }
          // });
          var tempRectBack = new Konva.Rect({
            x: j * cellWidth + 40,
            y: 0,
            width: cellWidth,
            height: cellHeight,
            fill: '#c0c4cc',
            stroke: '#606266',
            strokeWidth: 1,
            attrs: {
              headerLabel: label,
              col: j,
              row: 0
            }
          });
          var tempText = new Konva.Text({
            x: j * cellWidth + 40,
            y: 0,
            width: cellWidth,
            height: cellHeight,
            align: 'center',
            verticalAlign: 'middle',
            text: label,
            fontSize: 20,
            fontFamily: 'Calibri',
            fill: 'black',
            attrs: {
              headerLabel: label,
              col: j,
              row: 0
            }
          });
          tempRectBack.hide();
          tempText.hide();
          this.headerBackGroup.add(tempRectBack);
          this.headerTextGroup.add(tempText);
        }
        var tempBorder = new Konva.Line({
          points: [0, 0, 0, 0],
          stroke: 'blue',
          strokeWidth: 1,
          lineCap: 'round',
          lineJoin: 'round'
        });
        this.headerBorderGroup.add(tempBorder);
      }
    }, {
      key: "trendsDraw",
      value: function trendsDraw() {
        var _this = this;
        var offsetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var _this$options = this.options,
          width = _this$options.width,
          cellHeight = _this$options.cellHeight;
        var _this$core = this.core,
          borderCellBgColor = _this$core.borderCellBgColor,
          nonSelectBgColor = _this$core.nonSelectBgColor,
          borderColor = _this$core.borderColor,
          selectedBgColor = _this$core.selectedBgColor;
        var _this$core$components = this.core.components.ContentComponent,
          contentGroup = _this$core$components.contentGroup,
          clickCell = _this$core$components.clickCell,
          clickRectShow = _this$core$components.clickRectShow,
          isRowSelect = _this$core$components.isRowSelect,
          secondClickCell = _this$core$components.secondClickCell,
          attrSecond = _this$core$components.attrSecond,
          attrFirst = _this$core$components.attrFirst,
          startAndEndRect = _this$core$components.startAndEndRect;

        // const startCol = parseInt((offsetX/cellWidth).toFixed(1))
        // const endCol = parseInt(((width - cellHeight +offsetX)/cellWidth).toFixed(1))

        var lt = this.searchScreenAddr(offsetX, 0);
        var rb = this.searchScreenAddr(offsetX + width - cellHeight, cellHeight);

        // console.log(lt,rb);

        var headerRectGroup = contentGroup.filter(function (item) {
          return item.col >= lt.col && item.row === 1 && item.col <= rb.col;
        });
        this.headerRectGroup = headerRectGroup;
        this.layer.clearRect(cellHeight, 0, width, cellHeight);
        this.layer.drawLine([cellHeight, 0, width, 0], null, borderColor);
        this.layer.drawLine([cellHeight, cellHeight, width, cellHeight], null, borderColor);
        // console.log('headerRectGroup',headerRectGroup)
        var _loop = function _loop() {
          var tempHeader = headerRectGroup[j];
          // const col = tempHeader.col - 1
          // if(tempHeader.col>=27){
          //     label = String.fromCharCode(65 + col-26)+String.fromCharCode(65 + col-26)
          // }else{
          //     label = String.fromCharCode(65 + col)
          // }
          // console.log('label',label,j)
          _this.layer.drawText(tempHeader.x + cellHeight - offsetX, 0, tempHeader.label.slice(0, tempHeader.label.length - 1), tempHeader.width, cellHeight, 'destination-over');
          _this.layer.drawLine([tempHeader.x + cellHeight - offsetX, 0, tempHeader.x + cellHeight - offsetX, cellHeight], 'destination-over', borderColor);
          if (clickRectShow && !isRowSelect) {
            // console.log('secondClickCell',secondClickCell)
            var leftCol = startAndEndRect ? attrFirst.col : (secondClickCell === null || secondClickCell === void 0 ? void 0 : secondClickCell.col) > clickCell.col ? clickCell.col : secondClickCell === null || secondClickCell === void 0 ? void 0 : secondClickCell.col;
            var rightCol = startAndEndRect ? attrSecond.col : (secondClickCell === null || secondClickCell === void 0 ? void 0 : secondClickCell.col) > clickCell.col ? secondClickCell === null || secondClickCell === void 0 ? void 0 : secondClickCell.col : clickCell.col;
            if (secondClickCell && tempHeader.col >= leftCol && tempHeader.col <= rightCol) {
              // 多个
              // console.log('tempHeader.col',tempHeader.col)
              _this.layer.drawFillRect(tempHeader.x + cellHeight - offsetX, 0, tempHeader.width, cellHeight, selectedBgColor, 'destination-over');
            } else if (tempHeader.col === clickCell.col && !clickCell.isMerge) {
              _this.layer.drawFillRect(tempHeader.x + cellHeight - offsetX, 0, tempHeader.width, cellHeight, selectedBgColor, 'destination-over');
            } else if (clickCell.isMerge) {
              var isMergeinArr = _this.findClickCellRowArr(clickCell);
              if (isMergeinArr.findIndex(function (item) {
                return item === tempHeader.col;
              }) !== -1) {
                _this.layer.drawFillRect(tempHeader.x + cellHeight - offsetX, 0, tempHeader.width, cellHeight, selectedBgColor, 'destination-over');
              }
            } else {
              _this.layer.drawFillRect(tempHeader.x + cellHeight - offsetX, 0, tempHeader.width, cellHeight, borderCellBgColor, 'destination-over');
            }
          } else {
            _this.layer.drawFillRect(tempHeader.x + cellHeight - offsetX, 0, tempHeader.width, cellHeight, borderCellBgColor, 'destination-over');
          }
          _this.layer.drawFillRect(tempHeader.x + cellHeight - offsetX, 0, tempHeader.width, cellHeight, nonSelectBgColor, 'destination-over');
        };
        for (var j = 0; j < headerRectGroup.length; j++) {
          _loop();
        }
      }
    }, {
      key: "findClickCellRowArr",
      value: function findClickCellRowArr(clickCell) {
        var isMergeinArr = [];
        var len = clickCell.col + clickCell.mergeCol - 1;
        for (var i = clickCell.col; i <= len; i++) {
          isMergeinArr.push(i);
        }
        return isMergeinArr;
      }
    }, {
      key: "searchScreenAddr",
      value: function searchScreenAddr() {
        var offsetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var contentGroup = this.core.components.ContentComponent.contentGroup;
        var startX = 0;
        var endX = 0;
        var startY = 0;
        var endY = 0;
        for (var i = 0; i < contentGroup.length; i++) {
          var tempContentSin = contentGroup[i];
          startX = tempContentSin.x;
          endX = startX + tempContentSin.width;
          startY = tempContentSin.y;
          endY = startY + tempContentSin.height;
          if (startX <= offsetX && offsetX <= endX && startY <= offsetY && offsetY <= endY && tempContentSin.row === 1) {
            return tempContentSin;
          }
        }
      }
    }]);
    return HeaderComponent;
  }();

  var SideComponent = /*#__PURE__*/function () {
    function SideComponent(layer) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var core = arguments.length > 2 ? arguments[2] : undefined;
      _classCallCheck(this, SideComponent);
      _defineProperty(this, "options", {});
      _defineProperty(this, "layer", null);
      _defineProperty(this, "sideRectGroup", []);
      this.options = options;
      this.layer = layer;
      this.core = core;
      this.trendsDraw(0);
    }
    _createClass(SideComponent, [{
      key: "initDraw",
      value: function initDraw() {
        var _this$options = this.options,
          row = _this$options.row,
          cellHeight = _this$options.cellHeight;
        for (var i = 0; i < row; i++) {
          var tempRectBack = new Konva.Rect({
            x: 0,
            y: i * cellHeight + 40,
            width: cellHeight,
            height: cellHeight,
            fill: '#fff',
            stroke: '#606266',
            strokeWidth: 1,
            attrs: {
              uniPos: 'header' + i,
              exHeaderCell: true,
              col: 0,
              row: i,
              zIndex: 99
            }
          });
          // const tempRect = new Konva.Rect({
          //     x: 0,
          //     y: i*cellHeight+40,
          //     width: cellHeight,
          //     height: cellHeight,
          //     attrs:{
          //         uniPos:'header'+i,
          //         exHeaderCell:true,
          //         row:i,
          //         zIndex:99
          //     }
          // });
          var tempText = new Konva.Text({
            x: 0,
            y: i * cellHeight + 40,
            width: cellHeight,
            height: cellHeight,
            text: i + 1,
            fontSize: 20,
            align: 'center',
            verticalAlign: 'middle',
            fontFamily: 'Calibri',
            fill: 'black',
            attrs: {
              col: 0,
              row: i,
              label: i
            }
          });
          tempRectBack.hide();
          tempText.hide();
          this.sideBackGroup.add(tempRectBack);
          this.sideTextGroup.add(tempText);
        }
        var tempBorder = new Konva.Line({
          points: [0, 0, 0, 0],
          stroke: 'blue',
          strokeWidth: 1,
          lineCap: 'round',
          lineJoin: 'round'
        });
        this.sideBorderGroup.add(tempBorder);
      }
    }, {
      key: "trendsDraw",
      value: function trendsDraw() {
        var _this = this;
        var offsetY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var _this$options2 = this.options,
          height = _this$options2.height,
          cellHeight = _this$options2.cellHeight;
        var _this$core$components = this.core.components.ContentComponent,
          contentGroup = _this$core$components.contentGroup,
          clickCell = _this$core$components.clickCell,
          clickRectShow = _this$core$components.clickRectShow,
          isColSelect = _this$core$components.isColSelect,
          secondClickCell = _this$core$components.secondClickCell,
          attrSecond = _this$core$components.attrSecond,
          attrFirst = _this$core$components.attrFirst,
          startAndEndRect = _this$core$components.startAndEndRect;
        var _this$core = this.core,
          borderCellBgColor = _this$core.borderCellBgColor;
          _this$core.selectedBorderBgColor;
          var borderColor = _this$core.borderColor,
          selectedBgColor = _this$core.selectedBgColor,
          nonSelectBgColor = _this$core.nonSelectBgColor;
        var lt = this.searchScreenAddr(0, offsetY);
        var rb = this.searchScreenAddr(cellHeight, height - cellHeight + offsetY);

        // console.log(lt,rb);

        var sideRectGroup = contentGroup.filter(function (item) {
          return item.row >= lt.row && item.col === 1 && item.row <= rb.row;
        });
        this.sideRectGroup = sideRectGroup;

        // const startRow = parseInt((offsetY/cellHeight).toFixed(1))
        // const endRow = parseInt(((height - cellHeight + offsetY)/cellHeight).toFixed(1))

        this.layer.clearRect(0, cellHeight, cellHeight, height);
        this.layer.drawLine([0, cellHeight, 0, height], null, borderColor);
        this.layer.drawLine([cellHeight, cellHeight, cellHeight, height], null, borderColor);
        var _loop = function _loop() {
          var tempSide = sideRectGroup[i];
          _this.layer.drawText(0, tempSide.y + cellHeight - offsetY, tempSide.row, cellHeight, tempSide.height, 'destination-over');
          _this.layer.drawLine([0, tempSide.y + cellHeight - offsetY, cellHeight, tempSide.y + cellHeight - offsetY], 'destination-over', borderColor);
          // if(clickCell.row === tempSide.row && clickRectShow && !isColSelect){
          //     this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,cellHeight,selectedBgColor,'destination-over')
          // }else{
          //     this.layer.drawFillRect(0,tempSide.y+cellHeight-offsetY,cellHeight,cellHeight,borderCellBgColor,'destination-over')
          // }

          if (clickRectShow && !isColSelect) {
            var topRow = startAndEndRect ? attrFirst.row : (secondClickCell === null || secondClickCell === void 0 ? void 0 : secondClickCell.row) > clickCell.row ? clickCell.row : secondClickCell === null || secondClickCell === void 0 ? void 0 : secondClickCell.row;
            var bottomRow = startAndEndRect ? attrSecond.row : (secondClickCell === null || secondClickCell === void 0 ? void 0 : secondClickCell.row) > clickCell.row ? secondClickCell === null || secondClickCell === void 0 ? void 0 : secondClickCell.row : clickCell.row;
            if (secondClickCell && tempSide.row >= topRow && tempSide.row <= bottomRow) {
              _this.layer.drawFillRect(0, tempSide.y + cellHeight - offsetY, cellHeight, tempSide.height, selectedBgColor, 'destination-over');
            } else if (clickCell.row === tempSide.row && !clickCell.isMerge) {
              _this.layer.drawFillRect(0, tempSide.y + cellHeight - offsetY, cellHeight, tempSide.height, selectedBgColor, 'destination-over');
            } else if (clickCell.isMerge) {
              var isMergeinArr = _this.findClickCellRowArr(clickCell);
              if (isMergeinArr.findIndex(function (item) {
                return item === tempSide.row;
              }) !== -1) {
                _this.layer.drawFillRect(0, tempSide.y + cellHeight - offsetY, cellHeight, tempSide.height, selectedBgColor, 'destination-over');
              }
            } else {
              _this.layer.drawFillRect(0, tempSide.y + cellHeight - offsetY, cellHeight, tempSide.height, borderCellBgColor, 'destination-over');
            }
          } else {
            _this.layer.drawFillRect(0, tempSide.y + cellHeight - offsetY, cellHeight, tempSide.height, borderCellBgColor, 'destination-over');
          }
          _this.layer.drawFillRect(0, tempSide.y + cellHeight - offsetY, cellHeight, tempSide.height, nonSelectBgColor, 'destination-over');
        };
        for (var i = 0; i < sideRectGroup.length; i++) {
          _loop();
        }
      }
    }, {
      key: "findClickCellRowArr",
      value: function findClickCellRowArr(clickCell) {
        var isMergeinArr = [];
        var len = clickCell.row + clickCell.mergeRow - 1;
        for (var i = clickCell.row; i <= len; i++) {
          isMergeinArr.push(i);
        }
        return isMergeinArr;
      }
    }, {
      key: "searchScreenAddr",
      value: function searchScreenAddr() {
        var offsetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        // console.log('offsetX',offsetX,offsetY)
        var contentGroup = this.core.components.ContentComponent.contentGroup;
        var startX = 0;
        var endX = 0;
        var startY = 0;
        var endY = 0;
        for (var i = 0; i < contentGroup.length; i++) {
          var tempContentSin = contentGroup[i];
          startX = tempContentSin.x;
          endX = startX + tempContentSin.width;
          startY = tempContentSin.y;
          endY = startY + tempContentSin.height;
          if (startX <= offsetX && offsetX <= endX && startY <= offsetY && offsetY <= endY && tempContentSin.col === 1) {
            return tempContentSin;
          }
        }
      }
    }]);
    return SideComponent;
  }();

  var ContentComponent = /*#__PURE__*/function () {
    function ContentComponent(layer) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var core = arguments.length > 2 ? arguments[2] : undefined;
      _classCallCheck(this, ContentComponent);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "selectedCellTopBorderDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "selectedCellBottomBorderDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "selectedCellLeftBorderDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "selectedCellRightBorderDom", null);
      _defineProperty(this, "selectedCellWidth", 0);
      _defineProperty(this, "selectedCellHeight", 0);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "canvasDom", null);
      _defineProperty(this, "options", {});
      _defineProperty(this, "offsetX", 0);
      _defineProperty(this, "offsetY", 0);
      _defineProperty(this, "clickRectShow", false);
      // 鼠标松开后的当前选中框
      _defineProperty(this, "moveClickCell", null);
      _defineProperty(this, "clickCell", null);
      _defineProperty(this, "secondClickCell", null);
      _defineProperty(this, "isColSelect", false);
      _defineProperty(this, "isRowSelect", false);
      _defineProperty(this, "moreSelectedCell", []);
      _defineProperty(this, "mergeSelectedCell", []);
      _defineProperty(this, "startAndEndRect", null);
      _defineProperty(this, "attrFirst", null);
      _defineProperty(this, "attrSecond", null);
      /**
       * @type {Canvas}
       */
      _defineProperty(this, "layer", null);
      _defineProperty(this, "contentGroup", []);
      /**
       * @param {MouseEvent} event
       */
      _defineProperty(this, "moveCell", function (event) {
        // console.log('event',event)
        var cellHeight = _this.options.cellHeight;
        var _this$core$plugins$Sc = _this.core.plugins.ScrollPlugin,
          offsetX = _this$core$plugins$Sc.offsetX,
          offsetY = _this$core$plugins$Sc.offsetY;
        var curCell = _this.core.plugins.SelectPlugin.searchRectAddr(event.offsetX + offsetX - cellHeight, event.offsetY + offsetY - cellHeight);
        _this.moveClickCell = curCell;
        // console.log('this.moveClickCell',this.moveClickCell)
        _this.showSelectedCellDom(curCell.x + cellHeight - offsetX, curCell.y - offsetY + cellHeight, curCell.isMerge ? curCell.mergeWidth : curCell.width, curCell.isMerge ? curCell.mergeHeight : curCell.height);
      });
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "cellPainterDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "cellPainterTopBorderDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "cellPainterBottomBorderDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "cellPainterLeftBorderDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "cellPainterRightBorderDom", null);
      this.options = options;
      this.layer = layer;
      this.core = core;
      this.canvasDom = core.canvasDom;
      this.selectorDom = core.selectorDom;
      this.canvasWrapperDom = core.canvasWrapperDom;
      var sheetBook = this.core.eSheetWorkBook[this.core.currentSheetIndex];
      this.registrySelectedCellDom();
      this.registryCellPainterDom();
      this.installContentDataByData(sheetBook.sheet);
      this.showClickRect(sheetBook.clickCell);
      // console.log('this.core.sheetWidth',this.core.sheetWidth)
      // console.log('this.core.sheetHeight',this.core.sheetHeight)
      // this.initDraw()
      this.trendsDraw(0, 0);
    }

    // Load Data
    _createClass(ContentComponent, [{
      key: "installContentDataByName",
      value: function installContentDataByName() {
        var sheetName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Sheet1';
        var sheetIndex = this.core.eSheetWorkBook.findIndex(function (item) {
          return item.label === sheetName;
        });
        this.contentGroup = this.core.eSheetWorkBook[sheetIndex].sheet;
        // console.log('sheetName',this.contentGroup)
      }
    }, {
      key: "installContentDataByData",
      value: function installContentDataByData(sheet) {
        this.contentGroup = sheet;
        // console.log('sheetName',this.contentGroup)
      }
    }, {
      key: "changeContentGroupByRectArr",
      value: function changeContentGroupByRectArr(selectedArr) {
        selectedArr[0];
      }
    }, {
      key: "showClickRect",
      value: function showClickRect(attr) {
        var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var row = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        this.clickCell = attr;
        this.clickRectShow = true;
        this.isColSelect = col;
        this.isRowSelect = row;
      }
    }, {
      key: "setSecondClickCell",
      value: function setSecondClickCell(attr) {
        this.secondClickCell = attr;
      }
    }, {
      key: "hideClickRect",
      value: function hideClickRect() {
        this.clickRectShow = false;
        this.isColSelect = false;
        this.isRowSelect = false;
        this.secondClickCell = null;
        this.clickCell = null;
        this.moreSelectedCell = [];
        this.hideSelectedCellDom();
      }
    }, {
      key: "drawMulPersonSelected",
      value: function drawMulPersonSelected() {
        var _this2 = this;
        var offsetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var cellHeight = this.options.cellHeight;
        this.core.mulPersonSelected.forEach(function (item) {
          if (item.type === 1) {
            var clickCell = item.command;

            // console.log('item',item)

            if (clickCell.isMerge) {
              var mergeWidth = clickCell.mergeWidth,
                mergeHeight = clickCell.mergeHeight;
              // console.log('多个选中框',this.clickCell)
              _this2.layer.drawStrokeRect(clickCell.x + cellHeight - offsetX, clickCell.y - offsetY + cellHeight, mergeWidth, mergeHeight, item.userColor, 'destination-over', 2);
            } else {
              // console.log('单个选中框',this.clickCell)
              _this2.layer.drawStrokeRect(clickCell.x + cellHeight - offsetX, clickCell.y - offsetY + cellHeight, clickCell.width, clickCell.height, item.userColor, 'destination-over', 2);
            }
            _this2.layer.drawText(clickCell.x + cellHeight - offsetX + 6, clickCell.y - offsetY + cellHeight - 16, item.userName, clickCell.width, 20, 'destination-over', '#ffffff', 'left', {
              fontSize: clickCell.fontSize,
              fontFamily: clickCell.fontFamily,
              fontWeight: clickCell.fontWeight,
              fontItalic: clickCell.fontItalic
            }, 'top');
            _this2.layer.drawFillRect(clickCell.x + cellHeight - offsetX, clickCell.y - offsetY + cellHeight - 20, clickCell.width, 20, item.userColor, 'destination-over');
          }
        });
      }

      // draw canvas
    }, {
      key: "initDraw",
      value: function initDraw() {
        var col = this.options.col;
        var row = this.options.row;
        var cellWidth = this.options.cellWidth;
        var cellHeight = this.options.cellHeight;
        for (var i = 0; i < row; i++) {
          for (var j = 0; j < col; j++) {
            var label = String.fromCharCode(65 + j);
            // console.log('label+i',label+i)
            // const tempRect = new Konva.Rect({
            //     x: j*cellWidth+40,
            //     y: i*cellHeight+40,
            //     width: cellWidth,
            //     height: cellHeight,
            //     attrs:{
            //         exCell:true,
            //         row:i,
            //         col:j,
            //         v:sheet[label+(i+1)]?sheet[label+(i+1)].v:'',
            //         k:label+(i+1),
            //     },
            //     name:label+(i+1),
            // });

            var tempRectBack = new Konva.Rect({
              x: j * cellWidth + 40,
              y: i * cellHeight + 40,
              width: cellWidth,
              height: cellHeight,
              stroke: '#dcdfe6',
              strokeWidth: 1,
              listening: false,
              attrs: {
                row: i,
                col: j,
                name: label + (i + 1)
              }
            });

            // const tempBackBorder = new Konva.Line({
            //     points: [j*cellWidth+40,cellHeight+i*cellHeight,j*cellWidth+40,(row+1)*cellHeight],
            //     stroke: '#dcdfe6',
            //     strokeWidth: 1,
            //     lineCap: 'round',
            //     lineJoin: 'round',
            //     attrs:{
            //         row:i,
            //         col:j,
            //         name:label+(i+1),
            //     }
            // })

            var tempText = new Konva.Text({
              x: j * cellWidth + 40,
              y: i * cellHeight + 40,
              // text: sheet[label+(i+1)]?sheet[label+(i+1)].v:'',
              width: cellWidth,
              height: cellHeight,
              align: 'center',
              verticalAlign: 'middle',
              padding: 6,
              ellipsis: true,
              fontSize: 12,
              fontFamily: 'Calibri',
              fill: 'black',
              attrs: {
                row: i,
                col: j,
                name: label + (i + 1)
              }
            });
            tempRectBack.hide();
            tempText.hide();
            this.contentBackGroup.add(tempRectBack);
            this.contentTextGroup.add(tempText);
          }
        }
        var tempHandlerRectBack = new Konva.Rect({
          x: 0,
          y: 0,
          width: 0,
          height: 0
        });
        this.contentBorderGroup.add(tempHandlerRectBack);
      }
    }, {
      key: "showSelectedCellDom",
      value: function showSelectedCellDom(x, y, width, height) {
        var _width, _height;
        width = (_width = width) !== null && _width !== void 0 ? _width : this.selectedCellWidth;
        height = (_height = height) !== null && _height !== void 0 ? _height : this.selectedCellHeight;
        this.selectedCellWidth = width;
        this.selectedCellHeight = height;

        // top
        this.selectedCellTopBorderDom.style.display = 'block';
        this.selectedCellTopBorderDom.style.left = x + 'px';
        this.selectedCellTopBorderDom.style.top = y + 'px';
        this.selectedCellTopBorderDom.style.width = width + 'px';

        // bottom
        this.selectedCellBottomBorderDom.style.display = 'block';
        this.selectedCellBottomBorderDom.style.left = x + 'px';
        this.selectedCellBottomBorderDom.style.top = y + height - 4 + 'px';
        this.selectedCellBottomBorderDom.style.width = width + 'px';

        // left
        this.selectedCellLeftBorderDom.style.display = 'block';
        this.selectedCellLeftBorderDom.style.left = x + 'px';
        this.selectedCellLeftBorderDom.style.top = y + 'px';
        this.selectedCellLeftBorderDom.style.height = height + 'px';

        // right
        this.selectedCellRightBorderDom.style.display = 'block';
        this.selectedCellRightBorderDom.style.left = x + width - 4 + 'px';
        this.selectedCellRightBorderDom.style.top = y + 'px';
        this.selectedCellRightBorderDom.style.height = height + 'px';

        // dot
        this.showSelectedCellPainterDom(x + width, y + height);
      }
    }, {
      key: "setSelectedCellBorderDomBgColor",
      value: function setSelectedCellBorderDomBgColor(color) {
        var selectedBorderBgColor = this.core.selectedBorderBgColor;
        var tempColor = color !== null && color !== void 0 ? color : selectedBorderBgColor;
        this.selectedCellTopBorderDom.style.backgroundColor = tempColor;
        this.selectedCellBottomBorderDom.style.backgroundColor = tempColor;
        this.selectedCellLeftBorderDom.style.backgroundColor = tempColor;
        this.selectedCellRightBorderDom.style.backgroundColor = tempColor;
      }
    }, {
      key: "hideSelectedCellDom",
      value: function hideSelectedCellDom() {
        this.selectedCellTopBorderDom.style.display = 'none';
        this.selectedCellBottomBorderDom.style.display = 'none';
        this.selectedCellLeftBorderDom.style.display = 'none';
        this.selectedCellRightBorderDom.style.display = 'none';
        this.cellPainterDom.style.display = 'none';
      }
    }, {
      key: "initMoreSelectedCell",
      value: function initMoreSelectedCell() {
        var moreSelectedCell = this.moreSelectedCell,
          clickCell = this.clickCell;
        if (moreSelectedCell.length > 0) {
          moreSelectedCell.forEach(function (item) {
            item.text = '';
            item.fontColor = '';
            item.bgColor = '';
            item.font = '';
            item.textAlign = '';
            item.mergeWidth = 0;
            item.mergeHeight = 0;
            item.mergeRow = 1;
            item.mergeCol = 1;
            item.isMerge = false;
            item.fontSize = 12;
            item.fontFamily = '';
          });
        } else {
          if (clickCell.isMerge) {
            // 是单个合并的单元格

            var ni = clickCell.row + clickCell.mergeRow;
            var nj = clickCell.col + clickCell.mergeCol;
            for (var i = clickCell.row; i < ni; i++) {
              for (var j = clickCell.col; j < nj; j++) {
                var oriRect = this.searchRectByColAndRow(j, i);
                oriRect.text = '';
                oriRect.fontSize = 12;
                oriRect.fontFamily = '';
                oriRect.fontColor = '';
                oriRect.bgColor = '';
                oriRect.font = '';
                oriRect.textAlign = '';
                oriRect.mergeWidth = 0;
                oriRect.mergeHeight = 0;
                oriRect.mergeRow = 1;
                oriRect.mergeCol = 1;
                oriRect.isMerge = false;
              }
            }
          } else {
            clickCell.text = '';
            clickCell.fontColor = '';
            clickCell.bgColor = '';
            clickCell.font = '';
            clickCell.textAlign = '';
            clickCell.mergeWidth = 0;
            clickCell.mergeHeight = 0;
            clickCell.mergeRow = 1;
            clickCell.mergeCol = 1;
            clickCell.isMerge = false;
            clickCell.fontSize = 12;
            clickCell.fontFamily = '';
          }
        }
      }
    }, {
      key: "moveSelectedCellDom",
      value: function moveSelectedCellDom() {
        var _this3 = this;
        this.setSelectedCellBorderDomBgColor();
        this.canvasDom.onmousemove = function (event) {
          _this3.moveCell(event);
        };
        this.canvasWrapperDom.onmouseup = function (event) {
          // console.log('测试',this.moveClickCell,this.clickCell)
          _this3.setSelectedCellBorderDomBgColor('transparent');
          if (!_this3.moveClickCell || _this3.moveClickCell.isMerge) {
            return;
          }
          var SelectPlugin = _this3.core.plugins.SelectPlugin;
          var tableDomStr = SelectPlugin.transformCanvasCellToTableDomStr();
          // 初始化原来的表格
          _this3.initMoreSelectedCell();
          // console.log('this.moveClickCell',this.moveClickCell)
          SelectPlugin.transformTableDomStrToCanvasCell(tableDomStr, _this3.moveClickCell);
          _this3.moveClickCell = null;
          _this3.canvasDom.onmousemove = null;
          _this3.canvasWrapperDom.onmouseup = null;
        };
      }
    }, {
      key: "registrySelectedCellDom",
      value: function registrySelectedCellDom() {
        var _this4 = this;
        var _this$core = this.core,
          h = _this$core.h,
          canvasWrapperDom = _this$core.canvasWrapperDom;
        var cellBorderAttrEvent = {
          onmousedown: function onmousedown(_) {
            _this4.moveSelectedCellDom();
          },
          oncontextmenu: function oncontextmenu(e) {
            e.preventDefault();
          }
        };
        var cellBorderStyle = {
          left: 0,
          top: 0,
          display: 'none'
        };
        var cellTopBorderDom = h('div', {
          attr: _objectSpread2({
            className: 'e-sheet-hor-cell-border'
          }, cellBorderAttrEvent),
          style: _objectSpread2(_objectSpread2({}, cellBorderStyle), {}, {
            width: 0
          })
        });
        var cellBottomBorderDom = h('div', {
          attr: _objectSpread2({
            className: 'e-sheet-hor-cell-border'
          }, cellBorderAttrEvent),
          style: _objectSpread2(_objectSpread2({}, cellBorderStyle), {}, {
            width: 0
          })
        });
        var cellLeftBorderDom = h('div', {
          attr: _objectSpread2({
            className: 'e-sheet-ver-cell-border'
          }, cellBorderAttrEvent),
          style: _objectSpread2(_objectSpread2({}, cellBorderStyle), {}, {
            height: 0
          })
        });
        var cellRightBorderDom = h('div', {
          attr: _objectSpread2({
            className: 'e-sheet-ver-cell-border'
          }, cellBorderAttrEvent),
          style: _objectSpread2(_objectSpread2({}, cellBorderStyle), {}, {
            height: 0
          })
        });
        this.selectedCellTopBorderDom = cellTopBorderDom;
        this.selectedCellBottomBorderDom = cellBottomBorderDom;
        this.selectedCellLeftBorderDom = cellLeftBorderDom;
        this.selectedCellRightBorderDom = cellRightBorderDom;
        canvasWrapperDom.appendChild(cellTopBorderDom);
        canvasWrapperDom.appendChild(cellBottomBorderDom);
        canvasWrapperDom.appendChild(cellLeftBorderDom);
        canvasWrapperDom.appendChild(cellRightBorderDom);
      }
    }, {
      key: "registryCellPainterDom",
      value: function registryCellPainterDom() {
        var _this5 = this;
        var _this$core2 = this.core,
          h = _this$core2.h,
          canvasWrapperDom = _this$core2.canvasWrapperDom;
        this.cellPainterDom = h('div', {
          attr: {
            className: 'e-sheet-cell-painter',
            onmouseup: function onmouseup(_) {
              _this5.canvasDom.onmousemove = null;
            }
          }
        });
        this.cellPainterTopBorderDom = h('div', {
          attr: {
            className: 'e-sheet-cell-painter-border',
            onmouseup: function onmouseup(_) {
              _this5.canvasDom.onmousemove = null;
            }
          },
          style: {
            height: '4px',
            display: 'none'
          }
        });
        this.cellPainterBottomBorderDom = h('div', {
          attr: {
            className: 'e-sheet-cell-painter-border',
            onmouseup: function onmouseup(_) {
              _this5.canvasDom.onmousemove = null;
            }
          },
          style: {
            height: '4px',
            display: 'none'
          }
        });
        this.cellPainterLeftBorderDom = h('div', {
          attr: {
            className: 'e-sheet-cell-painter-border',
            onmouseup: function onmouseup(_) {
              _this5.canvasDom.onmousemove = null;
            }
          },
          style: {
            width: '4px',
            display: 'none'
          }
        });
        this.cellPainterRightBorderDom = h('div', {
          attr: {
            className: 'e-sheet-cell-painter-border',
            onmouseup: function onmouseup(_) {
              _this5.canvasDom.onmousemove = null;
            }
          },
          style: {
            width: '4px',
            display: 'none'
          }
        });
        canvasWrapperDom.appendChild(this.cellPainterTopBorderDom);
        canvasWrapperDom.appendChild(this.cellPainterBottomBorderDom);
        canvasWrapperDom.appendChild(this.cellPainterLeftBorderDom);
        canvasWrapperDom.appendChild(this.cellPainterRightBorderDom);
        this.cellPainterDom.oncontextmenu = function (evt) {
          evt.preventDefault();
        };
        this.cellPainterDom.onmousedown = function (evt) {
          evt.stopImmediatePropagation();
          var painterDomLeft = parseInt(_this5.cellPainterDom.style.left);
          var painterDomTop = parseInt(_this5.cellPainterDom.style.top);
          var diffCol = 0;
          var diffRow = 0;
          var diffWidth = 0;
          var diffHeight = 0;
          var nColMultiple = 0;
          var nRowMultiple = 0;
          var finalColRect = null;
          var finalRowRect = null;
          var director = '';
          _this5.canvasDom.onmousemove = function (event) {
            var cellHeight = _this5.options.cellHeight;
            var clickCell = _this5.clickCell,
              moreSelectedCell = _this5.moreSelectedCell;
            var _this5$core$plugins$S = _this5.core.plugins.ScrollPlugin,
              offsetX = _this5$core$plugins$S.offsetX,
              offsetY = _this5$core$plugins$S.offsetY;
            var curCell = _this5.core.plugins.SelectPlugin.searchRectAddr(event.offsetX + offsetX - cellHeight, event.offsetY + offsetY - cellHeight);
            var absX = Math.abs(event.offsetX - painterDomLeft);
            var absY = Math.abs(event.offsetY - painterDomTop);
            if (moreSelectedCell.length > 0) {
              var curRowRectArr = moreSelectedCell.filter(function (item) {
                return item.row === clickCell.row;
              });
              finalRowRect = curRowRectArr[curRowRectArr.length - 1];
              diffCol = finalRowRect.col - clickCell.col + 1;
              diffWidth = finalRowRect.x - clickCell.x + finalRowRect.width;
              var curColRectArr = moreSelectedCell.filter(function (item) {
                return item.col === clickCell.col;
              });
              // console.log('curColRectArr.length',curColRectArr)
              // console.log('clickCell',clickCell)
              finalColRect = curColRectArr[curColRectArr.length - 1];
              // console.log('finalColRect',finalColRect)

              diffRow = finalColRect.row - clickCell.row + 1;
              diffHeight = finalColRect.y - clickCell.y + finalColRect.height;
              moreSelectedCell[moreSelectedCell.length - 1];
            } else {
              if (clickCell.isMerge) {
                finalRowRect = _this5.searchRectByColAndRow(clickCell.col + clickCell.mergeCol - 1, clickCell.row);
                finalColRect = _this5.searchRectByColAndRow(clickCell.col, clickCell.row + clickCell.mergeRow - 1);
                _this5.searchRectByLabel(clickCell.mergeEndLabel);
                diffWidth = clickCell.mergeWidth;
                diffHeight = clickCell.mergeHeight;
              } else {
                finalRowRect = finalColRect = clickCell;
                diffWidth = clickCell.width;
                diffHeight = clickCell.height;
              }
              diffCol = clickCell.mergeCol;
              diffRow = clickCell.mergeRow;
            }

            // 如果mouseCell在选中区域中，则不显示格式刷框
            if (event.offsetX >= clickCell.ltX - offsetX && event.offsetX <= clickCell.ltX - offsetX + diffWidth && event.offsetY >= clickCell.ltY - offsetY && event.offsetY <= clickCell.ltY - offsetY + diffHeight) {
              _this5.hidePainterBorderDom();
              director = null;
              // console.log('如果mouseCell在选中区域中，则不显示格式刷框',event.offsetY,clickCell.ltY-offsetY,clickCell.ltY-offsetY+diffHeight)
              _this5.canvasWrapperDom.onmouseup = null;
              _this5.canvasDom.onmouseup = null;
              return;
            }
            if (absX > absY) {
              // 在左右方向
              var mouseCell = _this5.searchRectByColAndRow(curCell.col, clickCell.row);
              if (event.offsetX > painterDomLeft) {
                // 右侧，以右侧第一个为起点
                director = 'right';
                nColMultiple = Math.ceil(Math.abs(mouseCell.col - finalRowRect.col) / diffCol);
                // console.log('nColMultiple',nColMultiple)
                _this5.showPainterBorderDom(clickCell.ltX + diffWidth - offsetX, clickCell.ltY - offsetY, diffWidth * nColMultiple, diffHeight);
              } else if (event.offsetX < painterDomLeft) {
                director = 'left';
                nColMultiple = Math.ceil(Math.abs(mouseCell.col - clickCell.col) / diffCol);
                _this5.showPainterBorderDom(clickCell.ltX - diffWidth * nColMultiple - offsetX, clickCell.ltY - offsetY, diffWidth * nColMultiple, diffHeight);
              }
            } else {
              var _mouseCell = _this5.searchRectByColAndRow(clickCell.col, curCell.row);
              if (event.offsetY > painterDomTop) {
                // 下方
                director = 'bottom';
                nRowMultiple = Math.ceil(Math.abs(_mouseCell.row - finalColRect.row) / diffRow);
                _this5.showPainterBorderDom(clickCell.ltX, clickCell.ltY + diffHeight - offsetY, diffWidth, diffHeight * nRowMultiple);
              } else if (event.offsetY < painterDomTop) {
                // 上方
                director = 'top';
                nRowMultiple = Math.ceil(Math.abs(_mouseCell.row - clickCell.row) / diffRow);
                _this5.showPainterBorderDom(clickCell.ltX, clickCell.ltY - diffHeight * nRowMultiple - offsetY, diffWidth, diffHeight * nRowMultiple);
              }
            }
            _this5.canvasWrapperDom.onmouseup = function (evt) {
              evt.stopImmediatePropagation();
              if (director === null) {
                return;
              }
              var SelectPlugin = _this5.core.plugins.SelectPlugin;
              var tableDomStr = SelectPlugin.transformCanvasCellToTableDomStr();
              // 查找格式刷后的第一个cell
              var startCellArr = [];
              if (director === 'right') {
                // 右侧
                for (var i = 1; i <= nColMultiple; i++) {
                  startCellArr.push(_this5.searchRectByColAndRow(clickCell.col + i * diffCol, clickCell.row));
                }
              } else if (director === 'left') {
                // 左侧
                for (var _i = 1; _i <= nColMultiple; _i++) {
                  startCellArr.push(_this5.searchRectByColAndRow(clickCell.col - _i * diffCol, clickCell.row));
                }
              } else if (director === 'bottom') {
                // 下侧
                for (var _i2 = 1; _i2 <= nRowMultiple; _i2++) {
                  startCellArr.push(_this5.searchRectByColAndRow(clickCell.col, clickCell.row + _i2 * diffRow));
                }
              } else if (director === 'top') {
                // 下侧
                for (var _i3 = 1; _i3 <= nRowMultiple; _i3++) {
                  startCellArr.push(_this5.searchRectByColAndRow(clickCell.col, clickCell.row - _i3 * diffRow));
                }
              }

              // console.log('tableDomStr',tableDomStr)
              // console.log('startCellArr',startCellArr)

              startCellArr.forEach(function (item) {
                SelectPlugin.transformTableDomStrToCanvasCell(tableDomStr, item);
              });
              _this5.canvasDom.onmousemove = null;
              _this5.canvasWrapperDom.onmouseup = null;
              _this5.hidePainterBorderDom();
            };
          };
        };
        canvasWrapperDom.appendChild(this.cellPainterDom);
      }
    }, {
      key: "hidePainterBorderDom",
      value: function hidePainterBorderDom() {
        this.cellPainterTopBorderDom.style.display = 'none';
        this.cellPainterBottomBorderDom.style.display = 'none';
        this.cellPainterLeftBorderDom.style.display = 'none';
        this.cellPainterRightBorderDom.style.display = 'none';
      }
    }, {
      key: "showPainterBorderDom",
      value: function showPainterBorderDom(x, y, width, height) {
        // console.log('xy',x,y,width,height)

        // top
        this.cellPainterTopBorderDom.style.left = x + 'px';
        this.cellPainterTopBorderDom.style.top = y + 'px';
        this.cellPainterTopBorderDom.style.width = width + 'px';
        this.cellPainterTopBorderDom.style.display = 'block';

        // bottom
        this.cellPainterBottomBorderDom.style.left = x + 'px';
        this.cellPainterBottomBorderDom.style.top = y + height - 4 + 'px';
        this.cellPainterBottomBorderDom.style.width = width + 'px';
        this.cellPainterBottomBorderDom.style.display = 'block';

        // left
        this.cellPainterLeftBorderDom.style.left = x + 'px';
        this.cellPainterLeftBorderDom.style.top = y + 'px';
        this.cellPainterLeftBorderDom.style.height = height + 'px';
        this.cellPainterLeftBorderDom.style.display = 'block';

        // right
        this.cellPainterRightBorderDom.style.left = x + width - 4 + 'px';
        this.cellPainterRightBorderDom.style.top = y + 'px';
        this.cellPainterRightBorderDom.style.height = height + 'px';
        this.cellPainterRightBorderDom.style.display = 'block';
      }

      /**
       * @param {number} x
       * @param {number} y
       */
    }, {
      key: "showSelectedCellPainterDom",
      value: function showSelectedCellPainterDom(x, y) {
        this.cellPainterDom.style.display = 'block';
        this.cellPainterDom.style.left = x - 3 + 'px';
        this.cellPainterDom.style.top = y - 3 + 'px';
        this.cellPainterDom.style.cursor = "url(".concat(base64Img['crosshair'], ") 18 18, crosshair");
      }

      /**
       * @param {number} offsetX
       * @param {number} offsetY
       */
    }, {
      key: "trendsDraw",
      value: function trendsDraw() {
        var _this6 = this;
        var offsetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var _this$options = this.options,
          width = _this$options.width,
          height = _this$options.height,
          cellHeight = _this$options.cellHeight;
          _this$options.cellWidth;
        var _this$core3 = this.core,
          nonSelectBgColor = _this$core3.nonSelectBgColor,
          selectedBorderBgColor = _this$core3.selectedBorderBgColor,
          borderColor = _this$core3.borderColor,
          selectedBgColor = _this$core3.selectedBgColor,
          copyKey = _this$core3.copyKey;
        var lt = this.searchScreenAddr(offsetX, offsetY);
        var rb = this.searchScreenAddr(offsetX + width - cellHeight, offsetY + height - cellHeight);
        // console.log('start1',lt)
        // console.log('start2',rb)

        // const startCol = parseInt((offsetX/cellWidth).toFixed(1))
        // const endCol = parseInt(((width - cellHeight +offsetX)/cellWidth).toFixed(1))
        //
        // const startRow = parseInt((offsetY/cellHeight).toFixed(1))
        // const endRow = parseInt(((height - cellHeight + offsetY)/cellHeight).toFixed(1))

        this.layer.clearRect(cellHeight, cellHeight, width, height);

        // for(let i=startRow;i<=endRow;i++){
        //     for(let j=startCol;j<=endCol;j++){
        //         this.layer.drawStrokeRect(j*cellWidth+cellHeight-offsetX,(i+1)*cellHeight-offsetY,cellWidth,cellHeight)
        //         this.layer.drawText(j*cellWidth+cellHeight-offsetX,(i+1)*cellHeight-offsetY,'111',cellWidth,cellHeight)
        //     }
        // }

        var copyCellDash = this.core.copyCellDash;
        if (copyKey) {
          // 绘制复制选中的范围
          if (copyCellDash.length > 1) {
            // 多选
            var dashFirst = copyCellDash[0];
            var dashLast = copyCellDash[copyCellDash.length - 1];
            this.layer.drawDashStrokeRect(dashFirst.ltX - offsetX + 2, dashFirst.ltY - offsetY + 2, dashLast.ltX - dashFirst.ltX + dashLast.width - 4, dashLast.ltY - dashFirst.ltY + dashLast.height - 4, selectedBorderBgColor, 'destination-over');
          } else if (copyCellDash.length === 1) {
            // 单选
            var dashCell = copyCellDash[0];
            if (dashCell.isMerge) {
              this.layer.drawDashStrokeRect(dashCell.ltX - offsetX + 2, dashCell.ltY - offsetY + 2, dashCell.mergeWidth - 4, dashCell.mergeHeight - 4, selectedBorderBgColor, 'destination-over');
            } else {
              this.layer.drawDashStrokeRect(dashCell.ltX - offsetX + 2, dashCell.ltY - offsetY + 2, dashCell.width - 4, dashCell.height - 4, selectedBorderBgColor, 'destination-over');
            }
          }
        }
        var attrFirst = null;
        var attrSecond = null;
        var startAndEndRect = null;
        if (this.secondClickCell) {
          attrFirst = this.clickCell;
          attrSecond = this.secondClickCell;
          var isRight = attrSecond.x > attrFirst.x;
          var isBottom = attrSecond.y > attrFirst.y;
          if (isRight && !isBottom) {
            // 第二个在右上角
            startAndEndRect = this.searchRectIsMerge(attrFirst.x, attrSecond.y, attrSecond.x, attrFirst.y, attrFirst, attrSecond);
          } else if (isRight && isBottom) {
            // 第二个在右下角
            startAndEndRect = this.searchRectIsMerge(attrFirst.x, attrFirst.y, attrSecond.x, attrSecond.y, attrFirst, attrSecond);
          } else if (!isRight && isBottom) {
            // 第二个在左下角
            startAndEndRect = this.searchRectIsMerge(attrSecond.x, attrFirst.y, attrFirst.x, attrSecond.y, attrFirst, attrSecond);
          } else {
            // 第二个在左上角
            startAndEndRect = this.searchRectIsMerge(attrSecond.x, attrSecond.y, attrFirst.x, attrFirst.y, attrFirst, attrSecond);
          }
          this.startAndEndRect = startAndEndRect;
          if (startAndEndRect) {
            var startRect = [];
            var endRect = [];
            startAndEndRect.forEach(function (item) {
              startRect.push(_this6.searchRectByLabel(item.mergeStartLabel));
              endRect.push(_this6.searchRectByLabel(item.mergeEndLabel));
            });
            var startArr = startRect.concat([attrFirst, attrSecond]);
            var endArr = endRect.concat([attrFirst, attrSecond]);
            var _startCol = startArr.sort(function (a, b) {
              return a.x - b.x;
            })[0].col;
            var _startRow = startArr.sort(function (a, b) {
              return a.y - b.y;
            })[0].row;
            var _endCol = endArr.sort(function (a, b) {
              return a.x - b.x;
            })[endArr.length - 1].col;
            var _endRow = endArr.sort(function (a, b) {
              return a.y - b.y;
            })[endArr.length - 1].row;

            // console.log('startAndEndRect', startAndEndRect)

            // console.log('startCol,startRow', startCol, startRow, endCol, endRow)

            attrFirst = this.searchRectByColAndRow(_startCol, _startRow);
            attrSecond = this.searchRectByColAndRow(_endCol, _endRow);
            this.attrFirst = attrFirst;
            this.attrSecond = attrSecond;
            // console.log('attrFirst+attrSecond', attrFirst, attrSecond)
          }
        }

        // const lt = this.searchScreenAddr(offsetX,offsetY)
        // const rb = this.searchScreenAddr(offsetX+width-cellHeight,offsetY+height-cellHeight)
        // console.log('start1',lt)
        // console.log('start2',rb)

        var startCol = lt.col;
        var endCol = rb.col;
        var startRow = lt.row;
        var endRow = rb.row;
        var contentGroup = this.contentGroup;
        // 选中绘制
        if (this.clickRectShow) {
          if (this.isColSelect && !this.isRowSelect) {
            // 竖向整个选中
            // console.log('-offsetY+cellHeight',-offsetY+cellHeight,this.core.offsetYLock)
            this.layer.drawStrokeRect(this.clickCell.x + cellHeight - offsetX, cellHeight, this.clickCell.width, this.core.isScrollBottomBound ? height - cellHeight : height, selectedBorderBgColor, 'destination-over', 2);
          } else if (this.isRowSelect && !this.isColSelect) {
            // 横向整个选中
            this.layer.drawStrokeRect(cellHeight, this.clickCell.y - offsetY + cellHeight, this.core.isScrollRightBound ? width - cellHeight : width, cellHeight, selectedBorderBgColor, 'destination-over', 2);
          } else if (this.isRowSelect && this.isColSelect) {
            // 整个选中
            this.layer.drawStrokeRect(cellHeight, cellHeight, this.core.isScrollRightBound ? width - cellHeight : width, this.core.isScrollBottomBound ? height - cellHeight : height, selectedBorderBgColor, 'destination-over', 2);
          } else {
            // console.log('secondClickCell',this.secondClickCell)
            if (!this.secondClickCell) {
              if (this.clickCell.isMerge) {
                var _this$clickCell = this.clickCell,
                  mergeWidth = _this$clickCell.mergeWidth,
                  mergeHeight = _this$clickCell.mergeHeight;
                // console.log('多个选中框',this.clickCell)
                this.layer.drawStrokeRect(this.clickCell.x + cellHeight - offsetX, this.clickCell.y - offsetY + cellHeight, mergeWidth, mergeHeight, selectedBorderBgColor, 'destination-over', 2);
                this.showSelectedCellDom(this.clickCell.x + cellHeight - offsetX, this.clickCell.y - offsetY + cellHeight, mergeWidth, mergeHeight);
              } else {
                // console.log('单个选中框',this.clickCell)
                this.layer.drawStrokeRect(this.clickCell.x + cellHeight - offsetX, this.clickCell.y - offsetY + cellHeight, this.clickCell.width, this.clickCell.height, selectedBorderBgColor, 'destination-over', 2);
                this.showSelectedCellDom(this.clickCell.x + cellHeight - offsetX, this.clickCell.y - offsetY + cellHeight, this.clickCell.width, this.clickCell.height);
              }
            } else if (!startAndEndRect) {
              if (this.secondClickCell.x >= this.clickCell.x) {
                // 最后一个在右边
                var _isBottom = this.secondClickCell.y > this.clickCell.y;
                this.layer.drawStrokeRect(this.clickCell.x + cellHeight - offsetX, (_isBottom ? this.clickCell.y : this.secondClickCell.y) - offsetY + cellHeight, this.secondClickCell.x - this.clickCell.x + this.secondClickCell.width, Math.abs(this.secondClickCell.y - this.clickCell.y) + this.secondClickCell.height, selectedBorderBgColor, 'destination-over', 2);
                this.showSelectedCellDom(this.clickCell.x + cellHeight - offsetX, (_isBottom ? this.clickCell.y : this.secondClickCell.y) - offsetY + cellHeight, this.secondClickCell.x - this.clickCell.x + this.secondClickCell.width, Math.abs(this.secondClickCell.y - this.clickCell.y) + this.secondClickCell.height);
              } else {
                // 最后一个在左边
                var _isBottom2 = this.secondClickCell.y > this.clickCell.y;
                this.layer.drawStrokeRect(this.secondClickCell.x + cellHeight - offsetX, (_isBottom2 ? this.clickCell.y : this.secondClickCell.y) - offsetY + cellHeight, this.clickCell.x - this.secondClickCell.x + this.clickCell.width, Math.abs(this.secondClickCell.y - this.clickCell.y) + this.secondClickCell.height, selectedBorderBgColor, 'destination-over', 2);
                this.showSelectedCellDom(this.secondClickCell.x + cellHeight - offsetX, (_isBottom2 ? this.clickCell.y : this.secondClickCell.y) - offsetY + cellHeight, this.clickCell.x - this.secondClickCell.x + this.clickCell.width, Math.abs(this.secondClickCell.y - this.clickCell.y) + this.secondClickCell.height);
              }
            } else if (startAndEndRect) {
              this.layer.drawStrokeRect(attrFirst.x + cellHeight - offsetX, attrFirst.y - offsetY + cellHeight, attrSecond.x - attrFirst.x + attrSecond.width, attrSecond.y - attrFirst.y + attrSecond.height, selectedBorderBgColor, 'destination-over', 2);
              this.showSelectedCellDom(attrFirst.x + cellHeight - offsetX, attrFirst.y - offsetY + cellHeight, attrSecond.x - attrFirst.x + attrSecond.width, attrSecond.y - attrFirst.y + attrSecond.height);
            }
          }
        }

        // 多人协作绘制选中
        this.drawMulPersonSelected(offsetX, offsetY);
        this.moreSelectedCell = [];
        this.mergeSelectedCell = [];

        // console.log('x,y,x,y',ltCol,ltRow,rbCol,rbRow)

        for (var i = 0; i < contentGroup.length; i++) {
          var tempRect = contentGroup[i];
          var row = tempRect.row,
            col = tempRect.col,
            text = tempRect.text,
            x = tempRect.x,
            y = tempRect.y,
            _width2 = tempRect.width,
            _height2 = tempRect.height;
          if (col >= startCol && col <= endCol && row >= startRow && row <= endRow) {
            // 多个选中除了第一个之外的渲染
            // 合并渲染从左上角开始
            if (tempRect.isMerge) {
              if (tempRect.label === tempRect.mergeStartLabel) {
                var _mergeWidth = tempRect.mergeWidth,
                  _mergeHeight = tempRect.mergeHeight;
                // console.log('背景色',tempRect)
                this.layer.drawStrokeRect(x - offsetX + cellHeight, y - offsetY + cellHeight, _mergeWidth, _mergeHeight, borderColor, 'destination-over', 1);
                this.layer.drawText(x - offsetX + cellHeight, y - offsetY + cellHeight, text, _mergeWidth, _mergeHeight, 'destination-over', tempRect.fontColor, tempRect.textAlign, {
                  fontSize: tempRect.fontsize,
                  fontFamily: tempRect.fontFamily,
                  fontWeight: tempRect.fontWeight,
                  fontItalic: tempRect.fontItalic
                }, tempRect.textBaseline);
                this.layer.drawFillRect(x - offsetX + cellHeight, y - offsetY + cellHeight, _mergeWidth, _mergeHeight, tempRect.bgColor ? tempRect.bgColor : nonSelectBgColor, 'destination-over', 1);
              } else {
                // 如果左上角不在屏幕内，渲染左上角
                var tempMergeStartRect = this.searchRectByLabel(tempRect.mergeStartLabel);
                if (!(tempMergeStartRect.col >= startCol && tempMergeStartRect.col <= endCol && tempMergeStartRect.row >= startRow && tempMergeStartRect.row <= endRow)) {
                  this.layer.drawStrokeRect(tempMergeStartRect.x - offsetX + cellHeight, tempMergeStartRect.y - offsetY + cellHeight, tempMergeStartRect.mergeWidth, tempMergeStartRect.mergeHeight, borderColor, 'destination-over', 1);
                  this.layer.drawText(tempMergeStartRect.x - offsetX + cellHeight, tempMergeStartRect.y - offsetY + cellHeight, tempMergeStartRect.text, tempMergeStartRect.mergeWidth, tempMergeStartRect.mergeHeight, 'destination-over', tempMergeStartRect.fontColor, tempMergeStartRect.textAlign, {
                    fontsize: tempMergeStartRect.fontSize,
                    fontFamily: tempMergeStartRect.fontFamily,
                    fontWeight: tempMergeStartRect.fontWeight,
                    fontItalic: tempMergeStartRect.fontItalic
                  }, tempMergeStartRect.textBaseline);
                  this.layer.drawFillRect(tempMergeStartRect.x - offsetX + cellHeight, tempMergeStartRect.y - offsetY + cellHeight, tempMergeStartRect.mergeWidth, tempMergeStartRect.mergeHeight, tempMergeStartRect.bgColor ? tempMergeStartRect.bgColor : nonSelectBgColor, 'destination-over', 1);
                }
              }
            } else if (!tempRect.isMerge) {
              this.layer.drawStrokeRect(x - offsetX + cellHeight, y - offsetY + cellHeight, _width2, _height2, borderColor, 'destination-over', 1);
              this.layer.drawText(x - offsetX + cellHeight, y - offsetY + cellHeight, text, _width2, _height2, 'destination-over', tempRect.fontColor, tempRect.textAlign, {
                fontSize: tempRect.fontSize,
                fontFamily: tempRect.fontFamily,
                fontWeight: tempRect.fontWeight,
                fontItalic: tempRect.fontItalic
              }, tempRect.textBaseline);
              this.layer.drawFillRect(x - offsetX + cellHeight, y - offsetY + cellHeight, _width2, _height2, tempRect.bgColor ? tempRect.bgColor : nonSelectBgColor, 'destination-over', 1);
            }
            // this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,'#EBF4FF','destination-over',1)
            // this.layer.drawFillRect(x-offsetX+cellHeight,y-offsetY+cellHeight,width,height,'red','destination-over')
          }

          if (this.secondClickCell) {
            var ltCol = startAndEndRect ? attrSecond.col > attrFirst.col ? attrFirst.col : attrSecond.col : this.secondClickCell.col > this.clickCell.col ? this.clickCell.col : this.secondClickCell.col;
            var ltRow = startAndEndRect ? attrSecond.row > attrFirst.row ? attrFirst.row : attrSecond.row : this.secondClickCell.row > this.clickCell.row ? this.clickCell.row : this.secondClickCell.row;
            var rbCol = startAndEndRect ? attrSecond.col > attrFirst.col ? attrSecond.col : attrFirst.col : this.secondClickCell.col > this.clickCell.col ? this.secondClickCell.col : this.clickCell.col;
            var rbRow = startAndEndRect ? attrSecond.row > attrFirst.row ? attrSecond.row : attrFirst.row : this.secondClickCell.row > this.clickCell.row ? this.secondClickCell.row : this.clickCell.row;
            if (col >= ltCol && col <= rbCol && row >= ltRow && row <= rbRow) {
              // console.log('x+cellHeight-offsetX',x+cellHeight-offsetX)
              // this.layer.drawFillRect(x+cellHeight-offsetX,y-offsetY+cellHeight,width,height,selectedBgColor,'destination-over')
              this.layer.drawFillRect(x + cellHeight - offsetX, y - offsetY + cellHeight, _width2, _height2, selectedBgColor, 'destination-over');
              if (!(tempRect.col === this.clickCell.col && tempRect.row === this.clickCell.row)) {
                this.mergeSelectedCell.push(tempRect);
              }
              this.moreSelectedCell.push(tempRect);
            }
          }
          // else if(this.secondClickCell && this.secondClickCell.isMerge){
          //     // 选中的是合并的单元格
          //     const {mergeWidth,mergeHeight} = this.countMergeWidthAndHeight(tempRect)
          //     this.layer.drawFillRect(x+cellHeight-offsetX,y-offsetY+cellHeight,mergeWidth,mergeHeight,selectedBgColor,'destination-over')
          // }
          if (this.isRowSelect && this.isColSelect) {
            this.layer.drawFillRect(x - offsetX + cellHeight, y - offsetY + cellHeight, _width2, _height2, selectedBgColor, 'destination-over');
          }
        }
      }
    }, {
      key: "searchScreenAddr",
      value: function searchScreenAddr() {
        var offsetX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        performance.now();
        var contentGroup = this.contentGroup;
        var startX = 0;
        var endX = 0;
        var startY = 0;
        var endY = 0;
        for (var i = 0; i < contentGroup.length; i++) {
          var tempContentSin = contentGroup[i];
          startX = tempContentSin.x;
          endX = startX + tempContentSin.width;
          startY = tempContentSin.y;
          endY = startY + tempContentSin.height;
          if (startX <= offsetX && offsetX <= endX && startY <= offsetY && offsetY <= endY) {
            performance.now();

            // console.log('endTime - currentTime',endTime - currentTime)
            return tempContentSin;
          }
        }
      }
    }, {
      key: "countMergeWidthAndHeight",
      value: function countMergeWidthAndHeight(tempRect) {
        var mergeWidth = tempRect.width;
        var mergeHeight = tempRect.height;
        tempRect.mergeLabelGroup.forEach(function (item) {
          if (tempRect.row === item.row) {
            mergeWidth += item.width;
          }
          if (tempRect.col === item.col) {
            mergeHeight += item.height;
          }
        });
        return {
          mergeWidth: mergeWidth,
          mergeHeight: mergeHeight
        };
      }
    }, {
      key: "searchRectIsMerge",
      value: function searchRectIsMerge(startX, startY, endX, endY, attrFirst, attrSecond) {
        var contentGroup = this.contentGroup;

        // console.log('startX,startY,endX,endY',startX,startY,endX,endY)

        var res = contentGroup.filter(function (item) {
          return item.x >= startX && item.x <= endX && item.y >= startY && item.y <= endY && item.isMerge && ([attrFirst.row, attrSecond.row].includes(item.row) || [attrFirst.col, attrSecond.col].includes(item.col));
        });
        // console.log('res',res)
        if (res.length > 0) {
          return res;
        } else {
          return null;
        }
      }
    }, {
      key: "searchRectByLabel",
      value: function searchRectByLabel(label) {
        var contentGroup = this.contentGroup;
        // console.log('col',col)
        var index = contentGroup.findIndex(function (item) {
          return item.label === label;
        });
        if (index !== -1) {
          return contentGroup[index];
        } else {
          return null;
        }
      }
    }, {
      key: "searchRectByColAndRow",
      value: function searchRectByColAndRow(col, row) {
        var contentGroup = this.contentGroup;
        // console.log('col',col)
        var index = contentGroup.findIndex(function (item) {
          return item.col === col && item.row === row;
        });
        if (index !== -1) {
          return contentGroup[index];
        } else {
          return null;
        }
      }
    }, {
      key: "searchRectIndexByColAndRow",
      value: function searchRectIndexByColAndRow(col, row) {
        var contentGroup = this.contentGroup;
        // console.log('col',col)
        return contentGroup.findIndex(function (item) {
          return item.col === col && item.row === row;
        });
      }
    }, {
      key: "changeRectTextByLabel",
      value: function changeRectTextByLabel(attr) {
        var rect = this.searchRectByLabel(attr.label);
        if (rect) {
          rect.text = attr.text;
        }
      }

      /**
       * @param {number} col
       * @returns {*[]}
       */
    }, {
      key: "searchRectArrByCol",
      value: function searchRectArrByCol(col) {
        var contentGroup = this.contentGroup;
        return contentGroup.filter(function (item) {
          return item.col === col;
        });
      }

      /**
       * @param {number} row
       * @returns {*[]}
       */
    }, {
      key: "searchRectArrByRow",
      value: function searchRectArrByRow(row) {
        var contentGroup = this.contentGroup;
        return contentGroup.filter(function (item) {
          return item.row === row;
        });
      }
    }, {
      key: "isHasMergerInRectArrByCol",
      value: function isHasMergerInRectArrByCol(col) {
        return this.searchRectArrByCol(col).some(function (item) {
          return item.isMerge;
        });
      }
    }, {
      key: "isHasMergerInRectArrByRow",
      value: function isHasMergerInRectArrByRow(row) {
        return this.searchRectArrByRow(row).some(function (item) {
          return item.isMerge;
        });
      }
    }, {
      key: "initContentGroupRowAndColByCol",
      value: function initContentGroupRowAndColByCol(startCol, num) {
        var contentGroup = this.contentGroup;
        var cellHeight = this.options.cellHeight;
        this.core.col += num;
        var col = this.core.col;
        var curCol = 1;

        // console.log('col',col)

        var countSheetWidth = 0;
        for (var i = 0, n = contentGroup.length; i < n; i++) {
          var tempRect = contentGroup[i];
          if ((i + 1) % col === 1) {
            curCol = 1;
            countSheetWidth = 0;
          }
          // console.log('curRow',curRow)
          if (tempRect.col >= startCol) {
            // console.log('curCol',curCol)
            tempRect.col = curCol;
            tempRect.x = countSheetWidth;
            tempRect.ltX = countSheetWidth + cellHeight;
            if (tempRect.col >= 27) {
              tempRect.label = String.fromCharCode(65 + tempRect.col - 27) + String.fromCharCode(65 + tempRect.col - 27) + tempRect.row;
            } else {
              tempRect.label = String.fromCharCode(65 + tempRect.col - 1) + tempRect.row;
            }
            if (tempRect.isMerge) {
              var oriStartCol = 0;
              var oriEndCol = 0;
              var startLabel = tempRect.mergeStartLabel.replace(/[0-9]/, '');
              var endLabel = tempRect.mergeEndLabel.replace(/[0-9]/, '');
              var startLabelRow = tempRect.mergeStartLabel.replace(/[A-Z]/, '');
              var endLabelRow = tempRect.mergeEndLabel.replace(/[A-Z]/, '');
              // console.log('----',startLabel,endLabel)
              // console.log('----',startLabelRow,endLabelRow)
              for (var s = 0; s < startLabel.length; s++) {
                oriStartCol += tempRect.mergeStartLabel.charCodeAt(s) - 65 + num;
              }
              for (var _s = 0; _s < endLabel.length; _s++) {
                oriEndCol += tempRect.mergeEndLabel.charCodeAt(_s) - 65 + num;
              }
              if (oriStartCol >= 27) {
                tempRect.mergeStartLabel = String.fromCharCode(65 + oriStartCol - 26) + String.fromCharCode(65 + oriStartCol - 26) + startLabelRow;
                tempRect.mergeEndLabel = String.fromCharCode(65 + oriEndCol - 26) + String.fromCharCode(65 + oriEndCol - 26) + endLabelRow;
              } else {
                tempRect.mergeStartLabel = String.fromCharCode(65 + oriStartCol) + startLabelRow;
                tempRect.mergeEndLabel = String.fromCharCode(65 + oriEndCol) + endLabelRow;
              }
            }
          }
          curCol += 1;
          countSheetWidth += tempRect.width;
        }
      }
    }, {
      key: "initContentGroupRowAndColByRow",
      value: function initContentGroupRowAndColByRow(startRow, num) {
        var contentGroup = this.contentGroup;
        var cellHeight = this.options.cellHeight;
        this.core.row += num;
        var col = this.core.col;
        var curRow = 0;

        // console.log('startRow',startRow)

        var countSheetHeight = 0;
        var countSheetWidth = 0;
        for (var i = 0, n = contentGroup.length; i < n; i++) {
          var tempRect = contentGroup[i];
          if ((i + 1) % col === 1) {
            curRow += 1;
            if (curRow > 1) {
              countSheetHeight += tempRect.height;
            }
            countSheetWidth = 0;
          }
          // console.log('curRow',curRow)
          if (tempRect.row >= startRow) {
            // console.log('curRow',curRow)
            tempRect.row = curRow;
            tempRect.y = countSheetHeight;
            tempRect.ltY = countSheetHeight + cellHeight;
            tempRect.x = countSheetWidth;
            tempRect.ltX = countSheetWidth + cellHeight;
            if (tempRect.label === 'insert') {
              if (tempRect.col >= 27) {
                tempRect.label = String.fromCharCode(65 + tempRect.col - 27) + String.fromCharCode(65 + tempRect.col - 27) + tempRect.row;
              } else {
                tempRect.label = String.fromCharCode(65 + tempRect.col - 1) + tempRect.row;
              }
            } else {
              tempRect.label = tempRect.label.replace(/[0-9]/, curRow);
            }

            // if(tempRect.col >= 27){
            //     tempRect.label = String.fromCharCode(65+tempRect.col-27)+String.fromCharCode(65 + tempRect.col-27)+tempRect.row
            // }else{
            //     tempRect.label = String.fromCharCode(65 + tempRect.col - 1)+tempRect.row
            // }
            if (tempRect.isMerge) {
              var startLabel = tempRect.mergeStartLabel.replace(/[0-9]/, '');
              var endLabel = tempRect.mergeEndLabel.replace(/[0-9]/, '');
              var startLabelRow = parseInt(tempRect.mergeStartLabel.replace(/[A-Z]/, ''));
              var endLabelRow = parseInt(tempRect.mergeEndLabel.replace(/[A-Z]/, ''));
              // console.log('----',startLabel,endLabel)
              // console.log('----',startLabelRow,endLabelRow)
              tempRect.mergeStartLabel = startLabel + (startLabelRow + num);
              tempRect.mergeEndLabel = endLabel + (endLabelRow + num);
            }
          }
          countSheetWidth += tempRect.width;
        }
      }
    }]);
    return ContentComponent;
  }();

  var ScrollPlugin = /*#__PURE__*/function () {
    function ScrollPlugin(selectorDom, layer) {
      var _this = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var components = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var core = arguments.length > 4 ? arguments[4] : undefined;
      _classCallCheck(this, ScrollPlugin);
      _defineProperty(this, "clientHorX", 0);
      _defineProperty(this, "clientVerY", 0);
      _defineProperty(this, "recordDeltaY", 0);
      _defineProperty(this, "barTopDis", 0);
      _defineProperty(this, "barLeftDis", 0);
      _defineProperty(this, "wheelStep", 10);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "selectorDom", null);
      _defineProperty(this, "barVerContainerDom", null);
      _defineProperty(this, "barHorContainerDom", null);
      _defineProperty(this, "layer", null);
      _defineProperty(this, "options", {});
      _defineProperty(this, "components", []);
      _defineProperty(this, "barHeight", 10);
      _defineProperty(this, "contentComponent", null);
      _defineProperty(this, "headerComponent", null);
      _defineProperty(this, "sideComponent", null);
      _defineProperty(this, "horBarDom", null);
      _defineProperty(this, "verBarDom", null);
      _defineProperty(this, "core", null);
      _defineProperty(this, "leftDis", 0);
      _defineProperty(this, "topDis", 0);
      _defineProperty(this, "offsetX", 0);
      _defineProperty(this, "offsetY", 0);
      this.selectorDom = selectorDom;
      this.canvasWrapperDom = core.canvasWrapperDom;
      this.layer = layer;
      this.core = core;
      this.options = options;
      this.components = components;
      this.contentComponent = components.ContentComponent;
      this.headerComponent = components.HeaderComponent;
      this.sideComponent = components.SideComponent;
      this.wholeComponent = components.WholeComponent;
      this.registryHorScroll();
      this.registryVerScroll();
      document.onmouseup = function () {
        document.onmousemove = null;
        _this.horBarDom.style.backgroundColor = 'rgb(201, 201, 201)';
        _this.verBarDom.style.backgroundColor = 'rgb(201, 201, 201)';
        _this.core.canvasDom.onmousemove = null;
        _this.core.dragSign = false;
        _this.core.lockDrag = false;
        // console.log('松开鼠标',this.core.dragSign)
      };
    }
    _createClass(ScrollPlugin, [{
      key: "contentMoveX",
      value: function contentMoveX() {
        this.headerComponent.trendsDraw(this.offsetX);
        this.contentComponent.trendsDraw(this.offsetX, this.offsetY);
        // this.sideComponent.trendsDraw(Math.abs(this.topDis))
        // this.wholeComponent.draw()
      }
    }, {
      key: "contentMoveY",
      value: function contentMoveY() {
        this.sideComponent.trendsDraw(this.offsetY);
        this.contentComponent.trendsDraw(this.offsetX, this.offsetY);
        // this.headerComponent.trendsDraw(Math.abs(this.leftDis))
        // this.wholeComponent.draw()
      }

      // 竖向鼠标中间滚动条
    }, {
      key: "registryWheel",
      value: function registryWheel(barDom) {
        var _this2 = this;
        this.canvasWrapperDom.onmouseover = function () {
          _this2.canvasWrapperDom.onwheel = function (event) {
            event.preventDefault();
            _this2.recordDeltaY = Math.abs(_this2.barTopDis);
            _this2.recordDeltaY += event.deltaY > 0 ? _this2.wheelStep : -_this2.wheelStep;

            // console.log('event.deltaY',event.deltaY)
            // console.log('recordDeltaY',this.recordDeltaY)

            requestAnimationFrame(function () {
              // console.log('eA',eA)
              var topDis = _this2.recordDeltaY;
              // console.log('leftDis',leftDis)
              _this2.verMoveFunc(topDis);
            });
          };
        };
      }
    }, {
      key: "unRegistryHorScroll",
      value: function unRegistryHorScroll() {
        this.barHorContainerDom.remove();
        this.horBarDom.remove();
      }
    }, {
      key: "changeHorBarWidth",
      value: function changeHorBarWidth() {
        var proportion = (this.options.width - this.options.cellHeight - 10) / this.core.sheetWidth;
        this.horBarDom.style.width = (this.options.width - this.options.cellHeight - 10) * proportion + 'px';
      }
    }, {
      key: "changeVerBarHeight",
      value: function changeVerBarHeight() {
        var proportion = (this.options.height - this.options.cellHeight - 10) / this.core.sheetHeight;
        this.verBarDom.style.height = (this.options.height - this.options.cellHeight - 10) * proportion + 'px';
      }

      // 注册横向滚动条
    }, {
      key: "registryHorScroll",
      value: function registryHorScroll() {
        var _this3 = this;
        // hor-bar 容器
        var barContainerDom = document.createElement('div');
        barContainerDom.style.height = this.barHeight + 'px';
        barContainerDom.style.width = this.options.width - this.options.cellHeight - 10 + 'px';
        barContainerDom.style.left = this.options.cellHeight + 'px';
        barContainerDom.style.bottom = 0;
        // barContainerDom.style.background = 'yellow'
        barContainerDom.style.position = 'absolute';
        this.canvasWrapperDom.appendChild(barContainerDom);
        this.barHorContainerDom = barContainerDom;
        // bor-bar
        var barDom = document.createElement('div');
        this.horBarDom = barDom;
        var proportion = (this.options.width - this.options.cellHeight - 10) / this.core.sheetWidth;
        barDom.style.width = (this.options.width - this.options.cellHeight - 10) * proportion + 'px';
        barDom.style.height = this.barHeight + 'px';
        // barDom.style.position = 'absolute'
        // barDom.style.left = 0
        // barDom.style.top = 0
        barDom.style.transformOrigin = 'left';
        barDom.style.userSelect = 'none';
        barDom.style.borderRadius = this.barHeight + 'px';
        barDom.style.backgroundColor = 'rgb(201, 201, 201)';
        barDom.style.transform = "translateX(".concat(this.barLeftDis + 'px', ")");
        barContainerDom.appendChild(barDom);

        // console.log('proportion',proportion)

        barDom.onmouseover = function (_) {
          barDom.style.backgroundColor = 'rgb(150, 150, 150)';
        };
        barDom.onmouseleave = function (_) {
          barDom.style.backgroundColor = 'rgb(201, 201, 201)';
        };
        barDom.onmousedown = function (e) {
          e.preventDefault();
          document.onmousemove = function (eA) {
            barDom.style.backgroundColor = 'rgb(150, 150, 150)';
            // console.log('eA',eA)
            _this3.layer.setCursorDefault();
            requestAnimationFrame(function () {
              var leftDis = eA.pageX - (_this3.canvasWrapperDom.getBoundingClientRect().x + _this3.options.cellHeight) - e.offsetX;
              _this3.horMoveFunc(leftDis);
            });
          };
        };
      }

      // 注册纵向滚动条
    }, {
      key: "registryVerScroll",
      value: function registryVerScroll() {
        var _this4 = this;
        // hor-bar 容器
        var barContainerDom = document.createElement('div');
        barContainerDom.style.height = this.options.height - this.options.cellHeight - 10 + 'px';
        barContainerDom.style.width = this.barHeight + 'px';
        barContainerDom.style.right = 0;
        barContainerDom.style.top = this.options.cellHeight + 'px';
        // barContainerDom.style.background = 'yellow'
        barContainerDom.style.position = 'absolute';
        this.canvasWrapperDom.appendChild(barContainerDom);
        this.barVerContainerDom = barContainerDom;
        // bor-bar
        var barDom = document.createElement('div');
        this.verBarDom = barDom;
        var proportion = (this.options.height - this.options.cellHeight - 10) / this.core.sheetHeight;
        barDom.style.width = this.barHeight + 'px';
        barDom.style.height = (this.options.height - this.options.cellHeight - 10) * proportion + 'px';
        // barDom.style.position = 'absolute'
        // barDom.style.left = 0
        // barDom.style.top = 0
        barDom.style.transformOrigin = 'top';
        barDom.style.userSelect = 'none';
        barDom.style.backgroundColor = 'rgb(201, 201, 201)';
        barDom.style.borderRadius = this.barHeight + 'px';
        barDom.onmouseover = function (_) {
          barDom.style.backgroundColor = 'rgb(150, 150, 150)';
        };
        barDom.onmouseleave = function (_) {
          barDom.style.backgroundColor = 'rgb(201, 201, 201)';
        };
        barContainerDom.appendChild(barDom);

        // console.log('proportion',proportion)

        this.registryWheel(barDom);
        barDom.onmousedown = function (e) {
          e.preventDefault();
          document.onmousemove = function (eA) {
            barDom.style.backgroundColor = 'rgb(150, 150, 150)';
            _this4.layer.setCursorDefault();
            requestAnimationFrame(function () {
              // console.log('eA',eA)
              // console.log('leftDis',leftDis)
              var topDis = eA.pageY - (_this4.canvasWrapperDom.getBoundingClientRect().y + _this4.options.cellHeight) - e.offsetY;
              // console.log('topDis',topDis,this.canvasWrapperDom.getBoundingClientRect())
              _this4.verMoveFunc(topDis);
            });
          };
        };
      }
    }, {
      key: "horMoveFunc",
      value: function horMoveFunc(leftDis) {
        var proportion = (this.options.width - this.options.cellHeight - 10) / this.core.sheetWidth;
        var leftBound = 0;
        var rightBound = this.options.width - this.options.cellHeight - 10 - (this.options.width - this.options.cellHeight) * proportion;

        // bound
        if (leftDis <= leftBound) {
          // barDom.style.left = 0+'px'
          this.horBarDom.style.transform = "translateX(0px)";
          this.barLeftDis = 0;
          this.leftDis = leftBound;
          this.core.isScrollRightBound = false;
        } else if (leftDis >= rightBound) {
          // barDom.style.left = rightBound+'px'
          this.horBarDom.style.transform = "translateX(".concat(rightBound + 'px', ")");
          this.barLeftDis = rightBound;
          this.leftDis = -(this.core.sheetWidth - (this.options.width - this.options.cellHeight));
          this.core.isScrollRightBound = true;
        } else {
          // barDom.style.left = leftDis+'px'
          this.horBarDom.style.transform = "translateX(".concat(leftDis + 'px', ")");
          this.barLeftDis = Math.abs(leftDis);
          // console.log('this.barLeftDis',this.barLeftDis)
          this.leftDis = -leftDis / proportion;
          this.core.offsetXLock = false;
          this.core.isScrollRightBound = false;
        }
        if (this.core.offsetXLock) {
          // console.log('临界点',this.topDis)
          return;
        }
        this.offsetX = Math.abs(this.leftDis);
        // console.log('leftDis',leftDis)
        // console.log('offsetX',this.leftDis)
        this.contentMoveX();
        // bound
        if (leftDis <= leftBound) {
          this.core.offsetXLock = true;
        } else if (leftDis >= rightBound) {
          this.core.offsetXLock = true;
        }
      }
    }, {
      key: "verMoveFunc",
      value: function verMoveFunc(topDis) {
        var proportion = (this.options.height - this.options.cellHeight - 10) / this.core.sheetHeight;
        var topBound = 0;
        var bottomBound = this.options.height - this.options.cellHeight - 10 - (this.options.height - this.options.cellHeight) * proportion;

        // console.log('this.core.offsetYLock',this.core.offsetYLock)
        if (topDis <= topBound) {
          // barDom.style.top = 0+'px'
          this.verBarDom.style.transform = "translateY(0px)";
          this.barTopDis = 0;
          this.topDis = topBound;
          this.core.isScrollBottomBound = false;
        } else if (topDis >= bottomBound) {
          // barDom.style.top = bottomBound+'px'
          this.verBarDom.style.transform = "translateY(".concat(bottomBound + 'px', ")");
          this.barTopDis = bottomBound;
          this.topDis = -(this.core.sheetHeight - (this.options.height - this.options.cellHeight));
          this.core.isScrollBottomBound = true;
          // console.log('topDis',topDis)
          // console.log('this.topDis',this.topDis)
          // console.log('bottomBound',bottomBound)
          // console.log('topDis>=bottomBound',topDis>=bottomBound)
        } else {
          // barDom.style.top = topDis+'px'
          this.verBarDom.style.transform = "translateY(".concat(topDis + 'px', ")");
          this.barTopDis = topDis;
          this.topDis = -topDis / proportion;
          this.core.offsetYLock = false;
          this.core.isScrollBottomBound = false;
        }
        if (this.core.offsetYLock) {
          // console.log('临界点',this.topDis)
          return;
        }
        this.offsetY = Math.abs(this.topDis);
        this.contentMoveY();
        // bound
        if (topDis <= topBound) {
          this.core.offsetYLock = true;
        } else if (topDis >= bottomBound) {
          this.core.offsetYLock = true;
        }
      }
    }]);
    return ScrollPlugin;
  }();

  var InputPlugin = /*#__PURE__*/function () {
    function InputPlugin(selectorDom, layer) {
      var _this = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var components = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var core = arguments.length > 4 ? arguments[4] : undefined;
      _classCallCheck(this, InputPlugin);
      _defineProperty(this, "options", {});
      _defineProperty(this, "core", null);
      _defineProperty(this, "selectorDom", null);
      _defineProperty(this, "contentComponent", null);
      _defineProperty(this, "headerComponent", null);
      _defineProperty(this, "sideBorderLine", null);
      _defineProperty(this, "dblClickContext", null);
      _defineProperty(this, "clickContext", null);
      _defineProperty(this, "inputDom", null);
      _defineProperty(this, "rectContext", null);
      _defineProperty(this, "headerBorderLine", null);
      this.contentComponent = components.ContentComponent;
      this.headerComponent = components.HeaderComponent;
      this.sideComponent = components.SideComponent;
      this.wholeComponent = components.WholeComponent;
      this.selectorDom = selectorDom;
      this.canvasDom = core.canvasDom;
      this.canvasWrapperDom = core.canvasWrapperDom;
      this.options = options;
      this.layer = layer;
      this.core = core;
      this.appendInput();
      core.plugins.ScrollPlugin.horBarDom.addEventListener('mousedown', function () {
        _this.inputDom.style.display = 'none';
      });
      core.plugins.ScrollPlugin.verBarDom.addEventListener('mousedown', function () {
        _this.inputDom.style.display = 'none';
      });
    }
    _createClass(InputPlugin, [{
      key: "hideInput",
      value: function hideInput() {
        this.inputDom.style.display = 'none';
        this.inputDom.value = '';
        this.inputDom.oninput = null;
      }

      /**
       * @param {object} attrs
       */
    }, {
      key: "showInput",
      value: function showInput(attrs) {
        var _this2 = this;
        var inputDom = this.inputDom;
        var _this$core$plugins$Sc = this.core.plugins.ScrollPlugin,
          offsetX = _this$core$plugins$Sc.offsetX,
          offsetY = _this$core$plugins$Sc.offsetY;
        var cellHeight = this.options.cellHeight;
        var x = attrs.x,
          y = attrs.y,
          width = attrs.width,
          height = attrs.height,
          text = attrs.text,
          isMerge = attrs.isMerge,
          mergeWidth = attrs.mergeWidth,
          mergeHeight = attrs.mergeHeight,
          bgColor = attrs.bgColor,
          fontColor = attrs.fontColor;
        var textWidth = text.length * this.core.fontSize;
        var inputWidth = isMerge ? mergeWidth : width;
        inputDom.style.opacity = 1;
        inputDom.style.top = y + cellHeight - offsetY + 'px';
        inputDom.style.left = x + cellHeight - offsetX + 'px';
        inputDom.style.display = 'inline-block';
        inputDom.style.textAlign = 'center';
        inputDom.style.width = (inputWidth > textWidth ? inputWidth : textWidth) + 'px';
        inputDom.style.height = (isMerge ? mergeHeight : height) + 'px';
        inputDom.style.borderRadius = '6px';
        inputDom.style.backgroundColor = bgColor !== null && bgColor !== void 0 ? bgColor : '';
        inputDom.style.color = fontColor !== null && fontColor !== void 0 ? fontColor : '';
        // console.log('attrs',attrs)
        inputDom.value = text;
        inputDom.oninput = function (evt) {
          _this2.core.plugins.SettingPlugin.setCellCon(evt.target.value);
        };
      }
    }, {
      key: "appendInput",
      value: function appendInput() {
        var _this3 = this;
        var inputDom = document.createElement('input');
        this.inputDom = inputDom;
        inputDom.style.display = 'none'; //'inline-block'
        inputDom.style.position = 'absolute';
        inputDom.style.outline = 'none';
        inputDom.style.border = '2px solid ' + this.core.selectedBorderBgColor;
        inputDom.style.boxSizing = 'border-box';
        this.canvasWrapperDom.appendChild(inputDom);
        this.canvasDom.addEventListener('dblclick', function (evt) {
          _this3.contentComponent.hideSelectedCellDom();
          var cellHeight = _this3.options.cellHeight;
          if (evt.offsetX <= cellHeight || evt.offsetY <= cellHeight) {
            return;
          }
          _this3.core.plugins.SelectPlugin.clearCopyDash();
          var _this3$core$plugins$S = _this3.core.plugins.ScrollPlugin,
            offsetX = _this3$core$plugins$S.offsetX,
            offsetY = _this3$core$plugins$S.offsetY;
          var clickCell = _this3.contentComponent.clickCell;

          // const attrs = this.core.plugins.SelectPlugin.searchRectAddr(evt.offsetX+offsetX - cellHeight,evt.offsetY+offsetY - cellHeight)
          var x = clickCell.x,
            y = clickCell.y,
            width = clickCell.width,
            height = clickCell.height,
            text = clickCell.text,
            isMerge = clickCell.isMerge,
            mergeWidth = clickCell.mergeWidth,
            mergeHeight = clickCell.mergeHeight,
            bgColor = clickCell.bgColor,
            fontColor = clickCell.fontColor;
          // this.contentComponent.hideClickRect()
          _this3.core.fresh();
          // console.log('attrs',attrs)

          var inputWidth = isMerge ? mergeWidth : width;
          var textWidth = text.length * _this3.core.fontSize;
          inputDom.style.opacity = 1;
          inputDom.style.top = y + cellHeight - offsetY + 'px';
          inputDom.style.left = x + cellHeight - offsetX + 'px';
          inputDom.style.display = 'inline-block';
          inputDom.style.textAlign = 'center';
          inputDom.style.width = (inputWidth > textWidth ? inputWidth : textWidth) + 'px';
          inputDom.style.height = (isMerge ? mergeHeight : height) + 'px';
          inputDom.style.borderRadius = '6px';
          inputDom.style.backgroundColor = bgColor !== null && bgColor !== void 0 ? bgColor : '';
          inputDom.style.color = fontColor !== null && fontColor !== void 0 ? fontColor : '';
          // console.log('attrs',attrs)
          inputDom.value = text;
          inputDom.focus();
          inputDom.onblur = function (evt) {
            // console.log('测试onblur',clickCell,inputDom.value,evt.target.value)
            // console.log('测试inputDom.value',inputDom.value)
            // console.log('测试evt.target.value',evt.target.value)
            clickCell.text = inputDom.value;
            _this3.core.wsSend(2, clickCell);
            _this3.inputDom.value = '';
            _this3.core.fresh();
            _this3.hideInput();
            // console.log('inputDom---onblur结束')
          };

          inputDom.oninput = function (evt) {
            // console.log('测试',evt.target.value,clickCell)
            _this3.core.plugins.SettingPlugin.setCellCon(evt.target.value);
            clickCell.text = inputDom.value;
          };
        });
      }
    }]);
    return InputPlugin;
  }();

  var SelectPlugin = /*#__PURE__*/function () {
    function SelectPlugin(selectorDom, layer) {
      var _this = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var components = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var core = arguments.length > 4 ? arguments[4] : undefined;
      _classCallCheck(this, SelectPlugin);
      _defineProperty(this, "options", {});
      _defineProperty(this, "core", null);
      _defineProperty(this, "selectorDom", null);
      _defineProperty(this, "contentComponent", null);
      _defineProperty(this, "headerComponent", null);
      _defineProperty(this, "sideBorderLine", null);
      _defineProperty(this, "clickContext", null);
      _defineProperty(this, "inputDom", null);
      _defineProperty(this, "copyKey", ['text', 'mergeWidth', 'mergeHeight', 'mergeRow', 'mergeCol', 'isMerge', 'bgColor', 'fontColor']);
      _defineProperty(this, "moreShiftSelectClick", function (event) {
        // console.log('this.core',this.core)
        if (_this.core.shiftKey) {
          var cellHeight = _this.options.cellHeight;
          var _this$core$plugins$Sc = _this.core.plugins.ScrollPlugin,
            offsetX = _this$core$plugins$Sc.offsetX,
            offsetY = _this$core$plugins$Sc.offsetY;
          var clickCell = _this.contentComponent.clickCell;
          var attrSecond = _this.searchRectAddr(event.offsetX + offsetX - cellHeight, event.offsetY + offsetY - cellHeight);
          if (attrSecond.isMerge) {
            var isRight = attrSecond.x > clickCell.x;
            var isBottom = attrSecond.y > clickCell.y;
            if (isRight && !isBottom) {
              // 第二个在右上角
              attrSecond = _this.searchRectByColAndRow(attrSecond.col + attrSecond.mergeCol - 1, attrSecond.row);
            } else if (isRight && isBottom) {
              // 第二个在右下角
              attrSecond = _this.searchRectByColAndRow(attrSecond.col + attrSecond.mergeCol - 1, attrSecond.row + attrSecond.mergeRow - 1);
            } else if (!isRight && isBottom) {
              // 第二个在左下角
              attrSecond = _this.searchRectByColAndRow(attrSecond.col, attrSecond.row + attrSecond.mergeRow - 1);
            }
          }
          _this.contentComponent.setSecondClickCell(attrSecond);
          _this.core.fresh();
        }
      });
      _defineProperty(this, "moreCtrlSelectClick", function (event) {
        // console.log('this.core',this.core)
        if (_this.core.shiftKey) {
          var cellHeight = _this.options.cellHeight;
          var _this$core$plugins$Sc2 = _this.core.plugins.ScrollPlugin,
            offsetX = _this$core$plugins$Sc2.offsetX,
            offsetY = _this$core$plugins$Sc2.offsetY;
          var attrSecond = _this.searchRectAddr(event.offsetX + offsetX - cellHeight, event.offsetY + offsetY - cellHeight);
          _this.contentComponent.setSecondClickCell(attrSecond);
          _this.core.fresh();
        }
      });
      this.contentComponent = components.ContentComponent;
      this.headerComponent = components.HeaderComponent;
      this.sideComponent = components.SideComponent;
      this.selectorDom = selectorDom;
      this.canvasDom = core.canvasDom;
      this.options = options;
      this.layer = layer;
      this.core = core;
      this.showClickHandler();
      this.moreSelect();
      this.displayColTextRegister();
    }
    _createClass(SelectPlugin, [{
      key: "displayAllTextByCol",
      value: function displayAllTextByCol(col, width) {
        var _this2 = this;
        var cellHeight = this.options.cellHeight;
        var contentGroup = this.contentComponent.contentGroup;
        var allCol = contentGroup.filter(function (item) {
          return item.col === col;
        });
        var allColTextWidth = allCol.map(function (item) {
          return _this2.layer.ctx.measureText(item.text).width + cellHeight;
        });
        allColTextWidth.push(width);
        var maxWidth = allColTextWidth.sort(function (a, b) {
          return a - b;
        })[allColTextWidth.length - 1];
        // console.log('maxWidth',maxWidth)
        this.core.plugins.DragPlugin.expandWidthNoDrag(col, maxWidth - width);
      }
    }, {
      key: "displayColTextRegister",
      value: function displayColTextRegister() {
        var _this3 = this;
        this.canvasDom.addEventListener('dblclick', function (evt) {
          var cellHeight = _this3.options.cellHeight;
          var _this3$core$plugins$S = _this3.core.plugins.ScrollPlugin,
            offsetX = _this3$core$plugins$S.offsetX;
            _this3$core$plugins$S.offsetY;
          var x = evt.offsetX + offsetX;
          if (evt.offsetY <= cellHeight) {
            var clickHeaderRect = null;
            var headerRectGroup = _this3.headerComponent.headerRectGroup;
            for (var i = 0; i < headerRectGroup.length; i++) {
              var tempHeader = headerRectGroup[i];
              if (x > tempHeader.ltX && x < tempHeader.ltX + tempHeader.width) {
                clickHeaderRect = tempHeader;
                break;
              }
            }
            // console.log('clickHeaderRect',clickHeaderRect)
            _this3.displayAllTextByCol(clickHeaderRect.col, clickHeaderRect.width);
          }
        });
      }
    }, {
      key: "copyText",
      value: function copyText(text) {
        navigator.clipboard.writeText(text);
      }
    }, {
      key: "searchMergeArr",
      value: function searchMergeArr(startCol, startRow, endCol, endRow) {
        var resArr = [];
        var contentGroup = this.contentComponent.contentGroup;
        contentGroup.forEach(function (item) {
          if (item.col >= startCol && item.col <= endCol && item.row >= startRow && item.row <= endRow) {
            resArr.push(item);
          }
        });
        return resArr.splice(1, resArr.length);
      }
    }, {
      key: "copyRect",
      value: function copyRect(clickCell, json) {
        var mergeWidth = clickCell.width;
        var mergeHeight = clickCell.height;
        var mergerGroup = this.searchMergeArr(clickCell.col, clickCell.row, clickCell.col + json.mergeCol - 1, clickCell.row + json.mergeRow - 1);
        // console.log('mergerGroup',mergerGroup)
        // clickCell.mergeLabelGroup = mergerGroup
        clickCell.mergeEndLabel = mergerGroup[mergerGroup.length - 1].label;
        clickCell.mergeStartLabel = clickCell.label;
        clickCell.isMerge = true;
        // clickCell.mergeRow = 1
        // clickCell.mergeCol = 1
        mergerGroup.forEach(function (item) {
          item.isMerge = true;
          item.mergeStartLabel = clickCell.label;
          item.mergeEndLabel = mergerGroup[mergerGroup.length - 1].label;
          if (clickCell.row === item.row && clickCell.label !== item.label) {
            mergeWidth += item.width;
            // clickCell.mergeCol += 1
          }

          if (clickCell.col === item.col && clickCell.label !== item.label) {
            mergeHeight += item.height;
            // clickCell.mergeRow += 1
          }
        });

        clickCell.mergeWidth = mergeWidth;
        clickCell.mergeHeight = mergeHeight;
      }

      /**
       * @param {Object} cell
       * @param {Object} attr
       * @param {Array<string>} notInclude
       */
    }, {
      key: "setCellAttr",
      value: function setCellAttr(cell, attr) {
        var notInclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['row', 'col', 'x', 'y', 'ltX', 'ltY', 'mergeStartLabel', 'mergeEndLabel', 'label', 'isFromExcel', 'width', 'height'];
        for (var k in attr) {
          if (!notInclude.includes(k)) {
            cell[k] = attr[k];
          }
        }
        if (attr['isMerge']) {
          cell['mergeStartLabel'] = String.fromCharCode(65 + cell.col - 1) + cell.row;
          cell['mergeEndLabel'] = String.fromCharCode(65 + cell.col + cell.mergeCol - 2) + (cell.row + cell.mergeRow - 1);
          // console.log('cell',cell)
        }
      }

      /**
       * @param {HTMLElement} table
       */
    }, {
      key: "tableDomToArr",
      value: function tableDomToArr(table) {
        var tableArr = [];
        var trs = table.querySelectorAll('tr');
        for (var i = 0; i < trs.length; i++) {
          tableArr[i] = [];
          var tds = trs[i].querySelectorAll('td');
          for (var j = 0; j < tds.length; j++) {
            tableArr[i].push(tds[j]);
          }
        }
        return tableArr;
      }

      /**
       * @param {string} tableDomStr
       * @param {Object} clickCell
       */
    }, {
      key: "transformTableDomStrToCanvasCell",
      value: function transformTableDomStrToCanvasCell(tableDomStr, clickCell) {
        var h = this.core.h;
        var domParser = new DOMParser();
        var html = domParser.parseFromString(tableDomStr, 'text/html');
        var css = html.querySelector('style') ? html.querySelector('style').sheet.cssRules : [];
        // console.log('table',html.querySelector('style'))
        // console.log('table',html.querySelector('table'))
        var table = html.querySelector('table');
        if (!table) {
          return;
        }
        var trs = table.querySelectorAll('tr');
        var tableArr = this.tableDomToArr(table);

        // console.log('tableArr',tableArr)

        var tdDom = h('td');
        var _loop = function _loop(i) {
          var tds = tableArr[i];
          // console.log('tds.length',tds.length)
          var _loop2 = function _loop2(_j2) {
            var tempTdDom = tds[_j2];
            if (!tempTdDom) {
              tableArr[i].push(tdDom.cloneNode());
            }
            if (tempTdDom.rowSpan > 1) {
              for (var k = 1, kn = tempTdDom.rowSpan; k < kn; k++) {
                tableArr[i + k].splice(_j2, 0, tdDom.cloneNode());
              }
            }
            if (tempTdDom.colSpan > 1) {
              new Array(tempTdDom.colSpan - 1).fill(0).forEach(function (_) {
                tableArr[i].splice(_j2 + 1, 0, tdDom.cloneNode());
              });
            }
          };
          for (var _j2 = 0; _j2 < tds.length; _j2++) {
            _loop2(_j2);
          }
          // console.log('tableArr--td-arr',tableArr[i])
        };
        for (var i = 0; i < tableArr.length; i++) {
          _loop(i);
        }
        // console.log('tableArr',tableArr)

        var tdCount = tableArr.length;
        var endSearchRect = null;
        for (var _i = 0; _i < tableArr.length; _i++) {
          var tds = tableArr[_i];
          for (var j = 0; j < tds.length; j++) {
            var tempTdDom = tds[j];

            // console.log(tempTdDom.rowSpan,'tempTdDom.rowSpan')
            // console.log(tempTdDom.colSpan,'tempTdDom.colSpan')

            var tempTd = {};
            if (tds[j].getAttribute('data-json')) {
              tempTd = JSON.parse(tds[j].getAttribute('data-json'));
            } else {
              var bgColor = '';
              var fontColor = '';
              var font = '';
              var fontSize = '';
              var fontFamily = '';
              for (var ci = 0, cn = css.length; ci < cn; ci++) {
                if (tempTdDom.className === css[ci].selectorText.replace('.', '')) {
                  bgColor = css[ci].style.backgroundColor !== '' ? css[ci].style.backgroundColor : null;
                  fontColor = css[ci].style.color !== '' ? css[ci].style.color : null;
                  css[ci].style.textAlign !== '' ? css[ci].style.textAlign : 'center';
                  fontSize = css[ci].style.fontSize !== '' ? css[ci].style.fontSize.replace('pt', 'px') : '12px';
                  fontFamily = css[ci].style.fontFamily !== '' ? css[ci].style.fontFamily : null;
                }
              }
              font = fontSize + ' ' + fontFamily;
              tempTd = {
                mergeRow: tempTdDom.rowSpan > 1 ? tempTdDom.rowSpan : tempTdDom.colSpan > 1 ? 1 : 0,
                mergeCol: tempTdDom.colSpan > 1 ? tempTdDom.colSpan : tempTdDom.rowSpan > 1 ? 1 : 0,
                isMerge: tempTdDom.colSpan && tempTdDom.colSpan > 1 || tempTdDom.rowSpan && tempTdDom.rowSpan > 1,
                text: tempTdDom.innerText,
                isFromExcel: true,
                bgColor: bgColor,
                fontColor: fontColor,
                font: font,
                fontSize: fontSize,
                fontFamily: fontFamily
              };
            }
            // console.log('tempTd',tempTd)

            var tempSearchRect = this.searchRectByColAndRow(clickCell.col + j, clickCell.row + _i);
            if (_i === trs.length - 1 && j === tds.length - 1) {
              endSearchRect = tempSearchRect;
            }
            if (tempTd.isMerge) {
              // console.log('tempTd',tempTd)
              var rowLen = tempSearchRect.row + tempTd.mergeRow;
              var colLen = tempSearchRect.col + tempTd.mergeCol;
              // console.log('rowLen',rowLen)
              // console.log('colLen',colLen)
              // console.log('tempSearchRect.row',tempSearchRect.row)
              // console.log('tempSearchRect.col',tempSearchRect.col)
              // console.log('tempSearchRect',tempSearchRect)
              for (var _i2 = tempSearchRect.row; _i2 < rowLen; _i2++) {
                for (var _j = tempSearchRect.col; _j < colLen; _j++) {
                  // console.log('合并',this.searchRectByColAndRow(j,i))
                  if (_i2 === tempSearchRect.row && _j === tempSearchRect.col) {
                    this.setCellAttr(tempSearchRect, tempTd);
                    if (tempTd.isFromExcel) {
                      tempSearchRect.mergeWidth = tempSearchRect.width;
                      tempSearchRect.mergeHeight = tempSearchRect.height;
                    }
                  } else {
                    var tempMergeRect = this.searchRectByColAndRow(_j, _i2);
                    tempMergeRect.isMerge = true;
                    tempMergeRect.mergeStartLabel = tempSearchRect.mergeStartLabel;
                    tempMergeRect.mergeEndLabel = tempSearchRect.mergeEndLabel;
                    if (tempTd.isFromExcel) {
                      if (tempMergeRect.col === tempSearchRect.col) {
                        tempSearchRect.mergeHeight += tempMergeRect.height;
                      }
                      if (tempMergeRect.row === tempSearchRect.row) {
                        tempSearchRect.mergeWidth += tempMergeRect.width;
                      }
                    }
                    // console.log('tempMergeRect',tempMergeRect)
                    // console.log('tempMergeRect.isMerge',tempMergeRect.isMerge)
                  }
                }
              }
              // console.log('有合并----')
              // console.log('tempSearchRect',tempSearchRect)
            } else {
              // console.log('没合并····')
              // console.log('tempSearchRect',tempSearchRect)
              // console.log('clickCell',clickCell)
              // console.log('tempTd',tempTd)
              // console.log('colDiff',colDiff)
              // console.log('rowDiff',rowDiff)
              // console.log('tempTd',tempTd.isMerge)
              if (!tempSearchRect.isMerge) {
                this.setCellAttr(tempSearchRect, tempTd);
              }
            }
          }
        }
        if (tdCount === 0) {
          endSearchRect = null;
        }
        // console.log('endSearchRect',endSearchRect)
        this.contentComponent.showClickRect(clickCell);
        this.contentComponent.setSecondClickCell(endSearchRect);
        this.core.fresh();
      }
    }, {
      key: "transformCanvasCellToTableDomStr",
      value: function transformCanvasCellToTableDomStr() {
        var _this$contentComponen = this.contentComponent,
          clickCell = _this$contentComponen.clickCell,
          secondClickCell = _this$contentComponen.secondClickCell,
          clickRectShow = _this$contentComponen.clickRectShow,
          moreSelectedCell = _this$contentComponen.moreSelectedCell;
        var h = this.core.h;
        if (clickRectShow) {
          // 一个框
          // console.log('moreSelectedCell',moreSelectedCell)

          var table = h('table');
          var oriTr = h('tr');
          var oriTd = h('td');
          if (clickCell && !secondClickCell) {
            if (clickCell.isMerge) {
              var finalRow = clickCell.row + clickCell.mergeRow;
              for (var i = clickCell.row; i < finalRow; i++) {
                var tr = oriTr.cloneNode();
                if (i === clickCell.row) {
                  var td = oriTd.cloneNode();
                  this.setTdAttrs(td, clickCell);
                  tr.appendChild(td);
                  // console.log('td',td)
                }

                table.appendChild(tr);
              }
              // console.log('clickCell',clickCell)
            } else {
              var _tr = oriTr.cloneNode();
              var _td = oriTd.cloneNode();
              this.setTdAttrs(_td, clickCell);
              _tr.appendChild(_td);
              table.appendChild(_tr);
              // console.log('table',table.outerHTML)
            }
            // console.log('clickCell',clickCell)
          } else if (secondClickCell) {
            var tempRow = 0;
            var _tr2 = null;
            for (var _i3 = 0; _i3 < moreSelectedCell.length; _i3++) {
              var tempRect = moreSelectedCell[_i3];
              if (tempRow !== tempRect.row) {
                tempRow = tempRect.row;
                _tr2 = oriTr.cloneNode();
                table.appendChild(_tr2);
              }
              if (tempRect.isMerge && tempRect.label === tempRect.mergeStartLabel || !tempRect.isMerge) {
                var _td2 = oriTd.cloneNode();
                this.setTdAttrs(_td2, tempRect);
                _tr2.appendChild(_td2);
              }
            }
            // 复制多个
            // console.log('复制moreSelectedCell',moreSelectedCell)
          }
          // console.log('复制的table',table)
          var tableDomStr = table.outerHTML;
          oriTr.remove();
          oriTd.remove();
          return tableDomStr;
          // this.copyText('<html><body><table><tr><td style="color:red">测试</td></tr></table></body></html>')
        }
      }
    }, {
      key: "clearCopyDash",
      value: function clearCopyDash() {
        this.copyText('');
        this.core.copyKey = false;
        this.core.copyCellDash = [];
        this.core.freshContent();
      }
    }, {
      key: "moreSelect",
      value: function moreSelect() {
        var _this4 = this;
        document.addEventListener('paste', function (event) {
          var _this4$contentCompone = _this4.contentComponent,
            clickRectShow = _this4$contentCompone.clickRectShow,
            clickCell = _this4$contentCompone.clickCell;
          if (clickRectShow) {
            // 一个框
            _this4.transformTableDomStrToCanvasCell(event.clipboardData.getData('text/html'), clickCell);
            // console.log('event-html',event.clipboardData.getData('text/html'))
            // console.log('event-text',event.clipboardData.getData('text/plain'))
          }
        });

        document.addEventListener('copy', function (event) {
          // console.log('copy')
          event.preventDefault();
          var str = _this4.transformCanvasCellToTableDomStr();
          event.clipboardData.setData('text/html', str);
          var _this4$contentCompone2 = _this4.contentComponent,
            clickCell = _this4$contentCompone2.clickCell,
            moreSelectedCell = _this4$contentCompone2.moreSelectedCell;
          _this4.core.copyKey = true;
          if (moreSelectedCell.length > 0) {
            // 多选
            _this4.core.copyCellDash = moreSelectedCell;
          } else if (clickCell) {
            // 单选
            _this4.core.copyCellDash = [clickCell];
          } else {
            return;
          }
          // this.core.copyRect
          _this4.core.freshContent();
        });
        document.addEventListener('keydown', function (event) {
          // console.log('event',event.code)
          // console.log('event.shiftKey',event.shiftKey)
          // console.log('event.ctrlKey',event.ctrlKey)
          _this4.core.shiftKey = event.shiftKey;
          _this4.core.ctrlKey = event.ctrlKey;
          if (event.shiftKey && event.ctrlKey && event.code === 'KeyZ') ; else if (event.ctrlKey && event.code === 'z') ; else if (event.code === 'Escape') {
            _this4.clearCopyDash();
          }
        });
        //
        document.addEventListener('keyup', function (event) {
          // console.log('event',event)
          _this4.core.shiftKey = event.shiftKey;
          _this4.core.ctrlKey = event.ctrlKey;
        });
        this.canvasDom.addEventListener('mousedown', this.moreShiftSelectClick);
      }
    }, {
      key: "setTdAttrs",
      value: function setTdAttrs(td, clickCell) {
        if (clickCell.isMerge) {
          td.rowSpan = clickCell.mergeRow;
          td.colSpan = clickCell.mergeCol;
        }
        td.innerText = clickCell.text;
        td.style.backgroundColor = clickCell.bgColor;
        td.style.color = clickCell.fontColor;
        td.style.width = clickCell.width + 'px';
        td.style.height = clickCell.height + 'px';
        td.style.textAlign = clickCell.textAlign;
        // td.setAttribute('data-row',clickCell.row)
        // td.setAttribute('data-col',clickCell.col)
        // td.setAttribute('data-merge-row',clickCell.mergeRow)
        // td.setAttribute('data-merge-col',clickCell.mergeCol)
        // td.setAttribute('data-bg-color',clickCell.bgColor)
        // td.setAttribute('data-font-color',clickCell.fontColor)
        // td.setAttribute('data-is-merge',clickCell.isMerge)
        td.setAttribute('data-json', JSON.stringify(clickCell));
      }
    }, {
      key: "showClickHandler",
      value: function showClickHandler() {
        var _this5 = this;
        this.canvasDom.addEventListener('mousedown', function (event) {
          // console.log('测试',event)
          // console.log('选中',this.core.dragSign)
          // console.log('event.button',event.button)
          if (event.button === 2 && _this5.contentComponent.secondClickCell) {
            return;
          }
          _this5.core.plugins.ContextmenuPlugin.hideContextMenu();
          if (_this5.core.shiftKey || _this5.core.ctrlKey || _this5.core.dragSign) {
            return;
          }
          var _this5$options = _this5.options,
            cellHeight = _this5$options.cellHeight;
            _this5$options.cellWidth;
          var _this5$core$plugins$S = _this5.core.plugins.ScrollPlugin,
            offsetX = _this5$core$plugins$S.offsetX,
            offsetY = _this5$core$plugins$S.offsetY;
            _this5$core$plugins$S.topDis;
            _this5$core$plugins$S.barVerContainerDom;
            _this5$core$plugins$S.barHorContainerDom;

          // let moveTimeId = null
          //
          // barVerContainerDom.onmouseover = ()=>{
          //     moveTimeId = setInterval(()=>{
          //         this.core.plugins.ScrollPlugin.customMove(cellWidth)
          //     },500)
          // }
          //
          // barVerContainerDom.onmouseout = ()=>{
          //     clearInterval(moveTimeId)
          //     moveTimeId = null
          // }
          //
          // barHorContainerDom.onmouseover = ()=>{
          //     moveTimeId = setInterval(()=>{
          //         this.core.plugins.ScrollPlugin.customMove(0,cellHeight)
          //     },500)
          // }
          //
          // barHorContainerDom.onmouseout = ()=>{
          //     clearInterval(moveTimeId)
          //     moveTimeId = null
          // }

          if (event.offsetY <= cellHeight && event.offsetX <= cellHeight) {
            // 左上角
            _this5.contentComponent.setSecondClickCell(null);
            _this5.contentComponent.showClickRect({}, true, true);
          } else if (event.offsetY <= cellHeight && event.offsetX > cellHeight) {
            // 顶部
            var attr = _this5.searchHeaderRectAddr(event.offsetX + offsetX - cellHeight);
            if (attr) {
              _this5.contentComponent.setSecondClickCell(null);
              _this5.contentComponent.showClickRect(attr, true);
            }
          } else if (event.offsetY > cellHeight && event.offsetX <= cellHeight) {
            // 左侧
            var _attr = _this5.searchSideRectAddr(event.offsetY + offsetY - cellHeight);
            // console.log('测试',attr)
            if (_attr) {
              _this5.contentComponent.setSecondClickCell(null);
              _this5.contentComponent.showClickRect(_attr, false, true);
            }
          } else {
            var attrFirst = _this5.searchRectAddr(event.offsetX + offsetX - cellHeight, event.offsetY + offsetY - cellHeight);
            // console.log('x,y',attrFirst)
            // console.log('offsetY',offsetY)
            // console.log('event.offsetY',event.offsetY)
            if (attrFirst) {
              _this5.core.wsSend(1, attrFirst);
              _this5.contentComponent.showClickRect(attrFirst);
              _this5.core.plugins.SettingPlugin.setCellAttrInHeader(attrFirst);
              _this5.contentComponent.setSecondClickCell(null);
              _this5.canvasDom.onmousemove = function (event) {
                var _this5$contentCompone;
                var _this5$core$plugins$S2 = _this5.core.plugins.ScrollPlugin,
                  offsetX = _this5$core$plugins$S2.offsetX,
                  offsetY = _this5$core$plugins$S2.offsetY;
                var attrSecond = _this5.searchRectAddr(event.offsetX + offsetX - cellHeight, event.offsetY + offsetY - cellHeight);
                // console.log('attr',attrSecond)
                if (attrSecond && attrFirst.label === attrSecond.label) {
                  _this5.contentComponent.setSecondClickCell(null);
                } else if (attrSecond && attrSecond.label !== ((_this5$contentCompone = _this5.contentComponent.secondClickCell) === null || _this5$contentCompone === void 0 ? void 0 : _this5$contentCompone.label)) {
                  var isRight = attrSecond.x > attrFirst.x;
                  var isBottom = attrSecond.y > attrFirst.y;

                  // attrSecond是合并单元格

                  if (attrSecond.isMerge) {
                    if (isRight && !isBottom) {
                      // 第二个在右上角
                      attrSecond = _this5.searchRectByColAndRow(attrSecond.col + attrSecond.mergeCol - 1, attrSecond.row);
                    } else if (isRight && isBottom) {
                      // 第二个在右下角
                      attrSecond = _this5.searchRectByColAndRow(attrSecond.col + attrSecond.mergeCol - 1, attrSecond.row + attrSecond.mergeRow - 1);
                    } else if (!isRight && isBottom) {
                      // 第二个在左下角
                      attrSecond = _this5.searchRectByColAndRow(attrSecond.col, attrSecond.row + attrSecond.mergeRow - 1);
                    }
                  }
                  _this5.contentComponent.setSecondClickCell(attrSecond);
                  // console.log('attrSecond',attrSecond)

                  _this5.core.fresh();
                }
              };
            }
          }
          _this5.core.fresh();
          // this.core.plugins.InputPlugin.hideInput()
        });
      }
    }, {
      key: "searchRectIsMerge",
      value: function searchRectIsMerge(startX, startY, endX, endY) {
        var contentGroup = this.contentComponent.contentGroup;

        // console.log('startX,startY,endX,endY',startX,startY,endX,endY)

        var res = contentGroup.find(function (item) {
          return item.x >= startX && item.x <= endX && item.y >= startY && item.y <= endY && item.isMerge;
        });
        // console.log('res',res)
        if (res) {
          return {
            startRect: this.searchRectByLabel(res.mergeStartLabel),
            endRect: this.searchRectByLabel(res.mergeEndLabel)
          };
        } else {
          return null;
        }
      }
    }, {
      key: "searchRectByLabel",
      value: function searchRectByLabel(label) {
        var contentGroup = this.contentComponent.contentGroup;
        // console.log('col',col)
        var index = contentGroup.findIndex(function (item) {
          return item.label === label;
        });
        if (index !== -1) {
          return contentGroup[index];
        } else {
          return null;
        }
      }
    }, {
      key: "searchRectByColAndRow",
      value: function searchRectByColAndRow(col, row) {
        var contentGroup = this.contentComponent.contentGroup;
        // console.log('col',col)
        var index = contentGroup.findIndex(function (item) {
          return item.col === col && item.row === row;
        });
        if (index !== -1) {
          return contentGroup[index];
        } else {
          return null;
        }
      }
    }, {
      key: "searchRectAddr",
      value: function searchRectAddr(oriX, oriY) {
        // console.log('oriX',oriX)

        var contentGroup = this.contentComponent.contentGroup;
        var _loop3 = function _loop3() {
            var tempContentRect = contentGroup[i];
            if (oriX >= tempContentRect.x && oriX <= tempContentRect.x + tempContentRect.width && oriY >= tempContentRect.y && oriY <= tempContentRect.y + tempContentRect.height) {
              // console.log('tempContentRect',tempContentRect)
              if (tempContentRect.isMerge) {
                if (tempContentRect.label === tempContentRect.mergeStartLabel) {
                  return {
                    v: tempContentRect
                  };
                } else {
                  var index = contentGroup.findIndex(function (item) {
                    return item.label === tempContentRect.mergeStartLabel;
                  });
                  // console.log('索引',index,tempContentRect)
                  return {
                    v: contentGroup[index]
                  };
                }
              } else {
                return {
                  v: tempContentRect
                };
              }
            }
          },
          _ret;
        for (var i = 0; i < contentGroup.length; i++) {
          _ret = _loop3();
          if (_ret) return _ret.v;
        }
      }
    }, {
      key: "searchHeaderRectAddr",
      value: function searchHeaderRectAddr(oriX) {
        // console.log('oriX',oriX)

        var headerRectGroup = this.headerComponent.headerRectGroup;
        for (var i = 0; i < headerRectGroup.length; i++) {
          var tempContentRect = headerRectGroup[i];
          if (oriX >= tempContentRect.x && oriX <= tempContentRect.x + tempContentRect.width) {
            // console.log('tempContentRect',tempContentRect)
            return tempContentRect;
          }
        }
      }
    }, {
      key: "searchSideRectAddr",
      value: function searchSideRectAddr(oriY) {
        // console.log('oriY',oriY)

        var sideRectGroup = this.sideComponent.sideRectGroup;
        for (var i = 0; i < sideRectGroup.length; i++) {
          var tempContentRect = sideRectGroup[i];
          if (oriY >= tempContentRect.y && oriY <= tempContentRect.y + tempContentRect.height) {
            // console.log('tempContentRect',tempContentRect)
            return tempContentRect;
          }
        }
      }
    }]);
    return SelectPlugin;
  }();

  var DragPlugin = /*#__PURE__*/function () {
    function DragPlugin(selectorDom, layer) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var components = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var core = arguments.length > 4 ? arguments[4] : undefined;
      _classCallCheck(this, DragPlugin);
      _defineProperty(this, "dragShowDis", 6);
      _defineProperty(this, "dragCell", null);
      this.contentComponent = components.ContentComponent;
      this.headerComponent = components.HeaderComponent;
      this.sideComponent = components.SideComponent;
      this.selectorDom = selectorDom;
      this.canvasDom = core.canvasDom;
      this.options = options;
      this.layer = layer;
      this.core = core;
      this.registerDragEvent();
    }
    _createClass(DragPlugin, [{
      key: "expandWidthNoDrag",
      value: function expandWidthNoDrag(col, dis) {
        var contentGroup = this.contentComponent.contentGroup;
        for (var i = 0; i < contentGroup.length; i++) {
          var tempRect = contentGroup[i];
          if (tempRect.col < col) {
            continue;
          }
          if (tempRect.col === col) {
            tempRect.width += dis;
            // console.log('dis',dis)
          } else if (tempRect.col > col) {
            tempRect.x += dis;
            tempRect.ltX += dis;
          }
          if (tempRect.col === col && tempRect.row === 1) {
            this.core.sheetWidth += dis;
          }
          if (tempRect.isMerge && tempRect.mergeStartLabel === tempRect.label && tempRect.col === col) {
            tempRect.mergeWidth += dis;
          }
          if (tempRect.isMerge && tempRect.mergeStartLabel !== tempRect.label && tempRect.col === col) {
            var mergeStartRect = this.contentComponent.searchRectByLabel(tempRect.mergeStartLabel);
            if (mergeStartRect.row === tempRect.row) {
              mergeStartRect.mergeWidth += dis;
            }
          }
        }
        this.core.freshScrollBar();
        this.core.fresh();
      }
    }, {
      key: "expandWidth",
      value: function expandWidth(col, dis) {
        // console.log('dis',dis)
        var contentGroup = this.contentComponent.contentGroup;
        var cellHeight = this.options.cellHeight;
        // console.log('col',col)
        this.layer.setCursor('col-resize');
        // console.log('this.dragCell.width>=cellHeight',this.dragCell.width<cellHeight)

        if (!this.dragCell || this.dragCell.width + dis < cellHeight && dis < 0) {
          this.dragCell = null;
          return;
        }
        for (var i = 0; i < contentGroup.length; i++) {
          var tempRect = contentGroup[i];
          if (tempRect.col < col) {
            continue;
          }
          if (tempRect.col === col) {
            tempRect.width += dis;
            // console.log('dis',dis)
          } else if (tempRect.col > col) {
            tempRect.x += dis;
            tempRect.ltX += dis;
          }
          if (tempRect.col === col && tempRect.row === 1) {
            this.core.sheetWidth += dis;
          }
          if (tempRect.isMerge && tempRect.mergeStartLabel === tempRect.label && tempRect.col === col) {
            tempRect.mergeWidth += dis;
          }
          if (tempRect.isMerge && tempRect.mergeStartLabel !== tempRect.label && tempRect.col === col) {
            var mergeStartRect = this.contentComponent.searchRectByLabel(tempRect.mergeStartLabel);
            if (mergeStartRect.row === tempRect.row) {
              mergeStartRect.mergeWidth += dis;
            }
          }
        }
        this.core.freshScrollBar();
        this.core.fresh();
      }
    }, {
      key: "expandHeight",
      value: function expandHeight(row, dis) {
        // console.log('dis',dis)
        var contentGroup = this.contentComponent.contentGroup;
        var cellHeight = this.options.cellHeight;
        this.layer.setCursor('col-resize');
        // console.log('this.dragCell.width>=cellHeight',this.dragCell.width<cellHeight)

        if (!this.dragCell || this.dragCell.height + dis < cellHeight && dis < 0) {
          this.dragCell = null;
          return;
        }
        for (var i = 0; i < contentGroup.length; i++) {
          var tempRect = contentGroup[i];
          if (tempRect.row === row) {
            tempRect.height += dis;

            // console.log('dis',dis)
          } else if (tempRect.row > row) {
            tempRect.y += dis;
            tempRect.ltY += dis;
          }
          if (tempRect.row === row && tempRect.col === 1) {
            this.core.sheetHeight += dis;
          }
          if (tempRect.isMerge && tempRect.mergeStartLabel === tempRect.label && tempRect.row === row) {
            tempRect.mergeHeight += dis;
          }
          if (tempRect.isMerge && tempRect.mergeStartLabel !== tempRect.label && tempRect.row === row) {
            var mergeStartRect = this.contentComponent.searchRectByLabel(tempRect.mergeStartLabel);
            if (mergeStartRect.col === tempRect.col) {
              mergeStartRect.mergeHeight += dis;
            }
          }
        }
        this.core.freshScrollBar();
        this.core.fresh();
      }
    }, {
      key: "registerDragEvent",
      value: function registerDragEvent() {
        var _this = this;
        this.canvasDom.addEventListener('mouseup', function (_) {
          // console.log('evt',evt,this.dragCell)
          if (_this.dragCell) {
            _this.core.wsSend(3, _this.dragCell);
          }
        });
        this.canvasDom.addEventListener('mousedown', function (evtA) {
          // console.log('开始拖拽',this.core.dragSign)

          _this.core.lockDrag = true;
          if (!_this.dragCell || !_this.core.dragSign) {
            return;
          }
          var dragEndX = 0;
          var dragStartX = evtA.pageX;
          var dragEndY = 0;
          var dragStartY = evtA.pageY;
          _this.canvasDom.onmousemove = function (evtB) {
            if (!_this.dragCell) {
              return false;
            }
            if (_this.core.dragSignDirectionIsHor) {
              dragEndX = evtB.pageX;
              _this.expandWidth(_this.dragCell.col, dragEndX - dragStartX);
              dragStartX = dragEndX;
            } else {
              dragEndY = evtB.pageY;
              _this.expandHeight(_this.dragCell.row, dragEndY - dragStartY);
              dragStartY = dragEndY;
            }
          };
        });
        this.canvasDom.addEventListener('mousemove', function (event) {
          // 横向
          var headerRectGroup = _this.headerComponent.headerRectGroup;
          var sideRectGroup = _this.sideComponent.sideRectGroup;
          var _this$core$plugins$Sc = _this.core.plugins.ScrollPlugin,
            offsetX = _this$core$plugins$Sc.offsetX,
            offsetY = _this$core$plugins$Sc.offsetY;
          var cellHeight = _this.options.cellHeight;
          var dragShowDis = _this.dragShowDis;
          var x = event.offsetX + offsetX;
          var y = event.offsetY + offsetY;
          if (_this.dragCell && (x < _this.dragCell.ltX + _this.dragCell.width - dragShowDis || x > _this.dragCell.ltX + _this.dragCell.width + dragShowDis + 1)) {
            // console.log('离开拖拽')
            _this.core.dragSign = false;
          }
          if (_this.dragCell && (y < _this.dragCell.ltY + _this.dragCell.height - dragShowDis || x > _this.dragCell.ltY + _this.dragCell.height + dragShowDis + 1)) {
            // console.log('离开拖拽')
            _this.core.dragSign = false;
          }
          if (_this.core.lockDrag) {
            return;
          }
          // console.log('col',event.offsetX)
          if (event.offsetY <= cellHeight) {
            if (event.offsetX > cellHeight) {
              _this.layer.setCursor('s-resize');
            }
            // 横向
            for (var i = 0; i < headerRectGroup.length; i++) {
              var tempHeader = headerRectGroup[i];
              if (x > tempHeader.ltX + tempHeader.width - dragShowDis && x < tempHeader.ltX + tempHeader.width + dragShowDis + 1) {
                // console.log('鼠标在拖拽之上',this.core.dragSign)
                if (!_this.core.dragSign) {
                  _this.dragCell = tempHeader;
                }
                _this.layer.setCursor('col-resize');
                _this.core.dragSign = true;
                _this.core.dragSignDirectionIsHor = true;

                // console.log('拖拽标识',this.core.dragSign)
              }
            }
          }

          if (event.offsetX <= cellHeight) {
            if (event.offsetY > cellHeight) {
              _this.layer.setCursor('e-resize');
            }
            // 纵向
            for (var _i = 0; _i < sideRectGroup.length; _i++) {
              var tempSide = sideRectGroup[_i];
              if (y > tempSide.ltY + tempSide.height - dragShowDis && y < tempSide.ltY + tempSide.height + dragShowDis + 1) {
                // console.log('鼠标在拖拽之上',this.core.dragSign)
                if (!_this.core.dragSign) {
                  _this.dragCell = tempSide;
                }
                _this.layer.setCursor('row-resize');
                _this.core.dragSign = true;
                _this.core.dragSignDirectionIsHor = false;

                // console.log('拖拽标识',this.core.dragSign)
              }
            }
          }
        });
      }
    }]);
    return DragPlugin;
  }();

  var ContextmenuPlugin = /*#__PURE__*/function () {
    function ContextmenuPlugin(selectorDom, layer) {
      var _this = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var components = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var core = arguments.length > 4 ? arguments[4] : undefined;
      _classCallCheck(this, ContextmenuPlugin);
      _defineProperty(this, "containerDom", null);
      _defineProperty(this, "hideContextMenu", function () {
        _this.containerDom.style.display = 'none';
      });
      _defineProperty(this, "insertRow", function (row, num) {
        var isTop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        // console.log('当前选中的row',row)
        if (!num) {
          return;
        }
        var col = _this.core.col;
        var _this$options = _this.options,
          cellWidth = _this$options.cellWidth,
          cellHeight = _this$options.cellHeight;
        var contentGroup = _this.contentComponent.contentGroup;
        _this.core.sheetHeight += num * cellHeight;
        var index = _this.contentComponent.searchRectIndexByColAndRow(1, isTop ? row : row + 1);
        var _loop = function _loop() {
          var tempRect = contentGroup[index];
          // console.log('index',index);
          new Array(col).fill(undefined).forEach(function (_, ind) {
            contentGroup.splice(index, 0, {
              row: row,
              col: col - ind,
              text: '',
              width: cellWidth,
              height: cellHeight,
              x: tempRect.x,
              y: tempRect.y,
              ltX: tempRect.ltX,
              ltY: tempRect.ltY,
              mergeWidth: 0,
              mergeHeight: 0,
              mergeRow: 1,
              mergeCol: 1,
              mergeStartLabel: '',
              mergeEndLabel: '',
              mergeLabelGroup: [],
              isMerge: false,
              bgColor: null,
              fontColor: null,
              font: null,
              textAlign: 'center',
              label: 'insert'
            });
          });
        };
        for (var i = 1; i <= num; i++) {
          _loop();
        }
        _this.contentComponent.initContentGroupRowAndColByRow(row, num);
        _this.contentComponent.hideClickRect();
        _this.core.fresh();
        _this.core.plugins.ScrollPlugin.changeVerBarHeight();
        console.log('contentGroup', contentGroup);
      });
      _defineProperty(this, "insertCol", function (col, num) {
        var isLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        // console.log('当前选中的col',col)
        if (!num) {
          return;
        }
        var row = _this.core.row;
        var _this$options2 = _this.options,
          cellWidth = _this$options2.cellWidth,
          cellHeight = _this$options2.cellHeight;
        var contentGroup = _this.contentComponent.contentGroup;
        _this.core.sheetWidth += num * cellWidth;
        var _loop2 = function _loop2(i) {
          var index = _this.contentComponent.searchRectIndexByColAndRow(col, i);
          var tempRect = contentGroup[index];
          // console.log('index',index);
          new Array(num).fill(undefined).forEach(function (_) {
            contentGroup.splice(isLeft ? index : index + 1, 0, {
              row: i,
              col: col,
              text: '',
              width: cellWidth,
              height: cellHeight,
              x: tempRect.x,
              y: tempRect.y,
              ltX: tempRect.ltX,
              ltY: tempRect.ltY,
              mergeWidth: 0,
              mergeHeight: 0,
              mergeRow: 1,
              mergeCol: 1,
              mergeStartLabel: '',
              mergeEndLabel: '',
              mergeLabelGroup: [],
              isMerge: false,
              bgColor: null,
              fontColor: null,
              font: null,
              textAlign: 'center',
              label: 'insert'
            });
          });
        };
        for (var i = 1; i <= row; i++) {
          _loop2(i);
        }
        // console.log('contentGroup',contentGroup)
        _this.contentComponent.initContentGroupRowAndColByCol(col, num);
        _this.contentComponent.hideClickRect();
        _this.core.fresh();
        _this.core.plugins.ScrollPlugin.changeHorBarWidth();
      });
      _defineProperty(this, "splitCell", function (clickCell) {
        if (!clickCell.isMerge) {
          return;
        }
        clickCell.mergeEndLabel = '';
        clickCell.mergeStartLabel = '';
        clickCell.isMerge = false;
        for (var i = clickCell.row, ni = clickCell.row + clickCell.mergeRow; i < ni; i++) {
          for (var j = clickCell.col, nj = clickCell.col + clickCell.mergeCol; j < nj; j++) {
            // console.log('clickCell.col',i,j)
            if (i === clickCell.row && j === clickCell.col) ; else {
              var tempRect = _this.contentComponent.searchRectByColAndRow(j, i);
              tempRect.mergeEndLabel = '';
              tempRect.mergeStartLabel = '';
              tempRect.isMerge = false;
            }
          }
        }
        clickCell.mergeRow = 1;
        clickCell.mergeCol = 1;
        _this.contentComponent.showClickRect(clickCell);
        _this.core.fresh();
        _this.hideContextMenu();
      });
      _defineProperty(this, "mergeCell", function (clickCell, mergeSelectedCell) {
        if (mergeSelectedCell.some(function (item) {
          return item.isMerge;
        }) || mergeSelectedCell.length === 0) {
          return;
        }
        var mergeWidth = clickCell.width;
        var mergeHeight = clickCell.height;
        // clickCell.mergeLabelGroup = mergeSelectedCell
        clickCell.mergeEndLabel = mergeSelectedCell[mergeSelectedCell.length - 1].label;
        clickCell.mergeStartLabel = clickCell.label;
        clickCell.isMerge = true;
        clickCell.mergeRow = 1;
        clickCell.mergeCol = 1;
        mergeSelectedCell.forEach(function (item) {
          item.isMerge = true;
          item.mergeStartLabel = clickCell.label;
          item.mergeEndLabel = mergeSelectedCell[mergeSelectedCell.length - 1].label;
          if (clickCell.row === item.row && clickCell.label !== item.label) {
            mergeWidth += item.width;
            clickCell.mergeCol += 1;
          }
          if (clickCell.col === item.col && clickCell.label !== item.label) {
            mergeHeight += item.height;
            clickCell.mergeRow += 1;
          }
        });
        clickCell.mergeWidth = mergeWidth;
        clickCell.mergeHeight = mergeHeight;
        // console.log('合并完成',clickCell)
        _this.contentComponent.setSecondClickCell(null);
        _this.core.freshContent();
        _this.hideContextMenu();
      });
      this.contentComponent = components.ContentComponent;
      this.headerComponent = components.HeaderComponent;
      this.sideComponent = components.SideComponent;
      this.selectorDom = selectorDom;
      this.canvasDom = core.canvasDom;
      this.canvasWrapperDom = core.canvasWrapperDom;
      this.options = options;
      this.layer = layer;
      this.core = core;
      this.registryContextMenu();
    }
    _createClass(ContextmenuPlugin, [{
      key: "registryContextMenu",
      value: function registryContextMenu() {
        var _this2 = this;
        var h = this.core.h;
        var containerDom = h('div', {
          style: {
            display: 'none'
          },
          attr: {
            className: 'e-sheet-contextmenu-layout'
          }
        });
        var mergeBtn = h('div', {
          style: {
            cursor: 'pointer'
          },
          attr: {
            innerText: '合并单元格',
            className: 'item-btn'
          }
        });
        var splitBtn = h('div', {
          style: {
            cursor: 'pointer'
          },
          attr: {
            innerText: '拆分单元格',
            className: 'item-btn'
          }
        });
        var insertLeftColBtn = h('div', {
          attr: {
            className: 'item-input-btn item-top-border'
          }
        }, [h('span', {
          attr: {
            innerText: '左侧插入'
          }
        }), h('input', {
          attr: {
            type: 'number',
            placeholder: '请输入列数',
            className: 'input-con',
            onkeydown: function onkeydown(event) {
              // console.log('event',event)
              if (event.key === 'Enter') {
                var clickCell = _this2.contentComponent.clickCell;
                if (!_this2.contentComponent.isHasMergerInRectArrByCol(clickCell.col)) {
                  _this2.insertCol(clickCell.col, event.target.valueAsNumber);
                }
                event.target.value = null;
                _this2.hideContextMenu();
              }
            }
          }
        }), h('span', {
          attr: {
            innerText: '列'
          }
        })]);
        var insertRightColBtn = h('div', {
          style: {
            cursor: 'pointer'
          },
          attr: {
            className: 'item-input-btn item-top-border'
          }
        }, [h('span', {
          attr: {
            innerText: '右侧插入'
          }
        }), h('input', {
          attr: {
            type: 'number',
            placeholder: '请输入列数',
            className: 'input-con',
            onkeydown: function onkeydown(event) {
              // console.log('event',event)
              if (event.key === 'Enter') {
                var clickCell = _this2.contentComponent.clickCell;
                if (!_this2.contentComponent.isHasMergerInRectArrByCol(clickCell.col)) {
                  _this2.insertCol(clickCell.col, event.target.valueAsNumber, false);
                }
                event.target.value = null;
                _this2.hideContextMenu();
              }
            }
          }
        }), h('span', {
          attr: {
            innerText: '列'
          }
        })]);
        var insertTopRowBtn = h('div', {
          style: {
            cursor: 'pointer'
          },
          attr: {
            className: 'item-input-btn item-top-border'
          }
        }, [h('span', {
          attr: {
            innerText: '上侧插入'
          }
        }), h('input', {
          attr: {
            type: 'number',
            placeholder: '请输入行数',
            className: 'input-con',
            onkeydown: function onkeydown(event) {
              // console.log('event',event)
              if (event.key === 'Enter') {
                var clickCell = _this2.contentComponent.clickCell;
                if (!_this2.contentComponent.isHasMergerInRectArrByRow(clickCell.row)) {
                  _this2.insertRow(clickCell.row, event.target.valueAsNumber);
                }
                event.target.value = null;
                _this2.hideContextMenu();
              }
            }
          }
        }), h('span', {
          attr: {
            innerText: '行'
          }
        })]);
        var insertBottomRowBtn = h('div', {
          style: {
            cursor: 'pointer'
          },
          attr: {
            className: 'item-input-btn item-top-border'
          }
        }, [h('span', {
          attr: {
            innerText: '下侧插入'
          }
        }), h('input', {
          attr: {
            type: 'number',
            placeholder: '请输入行数',
            className: 'input-con',
            onkeydown: function onkeydown(event) {
              // console.log('event',event)
              if (event.key === 'Enter') {
                var clickCell = _this2.contentComponent.clickCell;
                if (!_this2.contentComponent.isHasMergerInRectArrByRow(clickCell.row)) {
                  _this2.insertRow(clickCell.row, event.target.valueAsNumber, false);
                }
                event.target.value = null;
                _this2.hideContextMenu();
              }
            }
          }
        }), h('span', {
          attr: {
            innerText: '行'
          }
        })]);
        this.containerDom = containerDom;
        this.canvasDom.addEventListener('contextmenu', function (evt) {
          // console.log('evt---contextmenu',evt)
          evt.preventDefault();
          var clickCell = _this2.contentComponent.clickCell;
          var cellHeight = _this2.options.cellHeight;
          var _this2$core$plugins$S = _this2.core.plugins.ScrollPlugin;
            _this2$core$plugins$S.offsetX;
            _this2$core$plugins$S.offsetY;
          if (evt.offsetX <= cellHeight || evt.offsetY <= cellHeight) {
            return;
          }
          if (clickCell) {
            // show contextmenu
            containerDom.style.display = 'flex';
            containerDom.style.left = evt.offsetX + 'px'; //clickCell.ltX-offsetX+cellHeight+'px'
            containerDom.style.top = evt.offsetY + 'px'; //clickCell.ltY-offsetY+'px'
            if (clickCell.isMerge) {
              mergeBtn.style.display = 'none';
              splitBtn.style.display = 'flex';
            } else {
              splitBtn.style.display = 'none';
              mergeBtn.style.display = 'flex';
            }
          }
        });
        mergeBtn.onclick = function (_) {
          var _this2$contentCompone = _this2.contentComponent,
            clickCell = _this2$contentCompone.clickCell,
            mergeSelectedCell = _this2$contentCompone.mergeSelectedCell;
          _this2.mergeCell(clickCell, mergeSelectedCell);
        };
        splitBtn.onclick = function (_) {
          var clickCell = _this2.contentComponent.clickCell;
          _this2.splitCell(clickCell);
        };
        containerDom.appendChild(mergeBtn);
        containerDom.appendChild(splitBtn);
        containerDom.appendChild(insertLeftColBtn);
        containerDom.appendChild(insertRightColBtn);
        containerDom.appendChild(insertTopRowBtn);
        containerDom.appendChild(insertBottomRowBtn);
        this.canvasWrapperDom.appendChild(containerDom);
      }
    }]);
    return ContextmenuPlugin;
  }();

  var setting = /*#__PURE__*/function () {
    function setting(selectorDom, layer) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var components = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var core = arguments.length > 4 ? arguments[4] : undefined;
      _classCallCheck(this, setting);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "labelInputDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "fxInputDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "fontHorAddrGroup", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "fontVerAddrGroup", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "fontSizeSelectDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "fontColorSelectDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "bgColorSelectDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "fontItalicBtnDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "fontWeightBtnDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "cellMergerBtnDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "cellSplitBtnDom", null);
      this.contentComponent = components.ContentComponent;
      this.headerComponent = components.HeaderComponent;
      this.sideComponent = components.SideComponent;
      this.selectorDom = selectorDom;
      this.canvasDom = core.canvasDom;
      this.canvasWrapperDom = core.canvasWrapperDom;
      this.options = options;
      this.layer = layer;
      this.core = core;
      this.registrySettingDom();
    }
    _createClass(setting, [{
      key: "setLabelCon",
      value: function setLabelCon(label) {
        this.labelInputDom.value = label;
      }
    }, {
      key: "setCellCon",
      value: function setCellCon(value) {
        this.fxInputDom.value = value;
      }

      /**
       * @param {string} textAlign
       */
    }, {
      key: "cellFontTextAlignChange",
      value: function cellFontTextAlignChange(textAlign) {
        if (!this.contentComponent.clickCell) {
          return;
        }
        this.contentComponent.clickCell.textAlign = textAlign;
        this.core.freshContent();
      }

      /**
       * @param {string} textBaseline
       */
    }, {
      key: "cellFontTextBaseLineChange",
      value: function cellFontTextBaseLineChange(textBaseline) {
        if (!this.contentComponent.clickCell) {
          return;
        }
        this.contentComponent.clickCell.textBaseline = textBaseline;
        this.core.freshContent();
      }

      /**
       * @param {string} fontSize
       */
    }, {
      key: "cellFontSizeChange",
      value: function cellFontSizeChange(fontSize) {
        if (!this.contentComponent.clickCell) {
          return;
        }
        this.contentComponent.clickCell.fontSize = fontSize;
        this.core.freshContent();
      }

      /**
       * @param {string} fontColor
       */
    }, {
      key: "cellFontColorChange",
      value: function cellFontColorChange(fontColor) {
        if (!this.contentComponent.clickCell) {
          return;
        }
        this.contentComponent.clickCell.fontColor = fontColor;
        this.core.freshContent();
      }

      /**
       * @param {string} bgColor
       */
    }, {
      key: "cellBgColorChange",
      value: function cellBgColorChange(bgColor) {
        if (!this.contentComponent.clickCell) {
          return;
        }
        this.contentComponent.clickCell.bgColor = bgColor;
        this.core.freshContent();
      }

      /**
       * @param {string} fontWeight
       */
    }, {
      key: "cellFontWeightChange",
      value: function cellFontWeightChange(fontWeight) {
        if (!this.contentComponent.clickCell) {
          return;
        }
        this.contentComponent.clickCell.fontWeight = fontWeight;
        this.core.freshContent();
      }

      /**
       * @param {string} fontItalic
       */
    }, {
      key: "cellFontItalicChange",
      value: function cellFontItalicChange(fontItalic) {
        if (!this.contentComponent.clickCell) {
          return;
        }
        this.contentComponent.clickCell.fontItalic = fontItalic;
        this.core.freshContent();
      }

      /**
       * @param {object} attr
       */
    }, {
      key: "setCellAttrInHeader",
      value: function setCellAttrInHeader(attr) {
        this.fontHorAddrGroup.setAttribute('value', attr.textAlign);
        this.fontVerAddrGroup.setAttribute('value', attr.textBaseline);
        this.fontSizeSelectDom.setAttribute('value', attr.fontSize);
        this.fontWeightBtnDom.setAttribute('current', attr.fontWeight);
        this.fontItalicBtnDom.setAttribute('current', attr.fontItalic);
        if (attr.isMerge) {
          this.cellMergerBtnDom.style.display = 'none';
          this.cellSplitBtnDom.style.display = 'flex';
        } else {
          this.cellMergerBtnDom.style.display = 'flex';
          this.cellSplitBtnDom.style.display = 'none';
        }
        // this.fontColorSelectDom.setAttribute('color',attr.fontColor)
        // this.bgColorSelectDom.setAttribute('color',attr.bgColor)
        this.setLabelCon(attr.label);
        this.setCellCon(attr.text);
      }
    }, {
      key: "changeFirstSelectedCell",
      value: function changeFirstSelectedCell(label) {
        var attrFirst = this.contentComponent.searchRectByLabel(label);
        if (!attrFirst) {
          return;
        }
        this.contentComponent.showClickRect(attrFirst);
        this.setCellAttrInHeader(attrFirst);
        this.setCellCon(attrFirst.text);
        this.contentComponent.setSecondClickCell(null);
        this.core.fresh();
      }
    }, {
      key: "registrySettingDom",
      value: function registrySettingDom() {
        var _this = this;
        var h = this.core.h;
        var labelInputDom = h('input', {
          attr: {
            className: 'cell-label-input',
            onblur: function onblur(_) {
              _this.changeFirstSelectedCell(_this.labelInputDom.value);
            },
            onkeydown: function onkeydown(evt) {
              if (evt.key === 'Enter') {
                _this.changeFirstSelectedCell(_this.labelInputDom.value);
              }
            }
          }
        });
        this.labelInputDom = labelInputDom;
        var fxInputDom = h('input', {
          attr: {
            className: 'fx-input',
            oninput: function oninput(evt) {
              // console.log('fxInputDom----oninput')
              // console.log('evt',evt.target.value)
              _this.core.plugins.InputPlugin.inputDom.value = evt.target.value;
              _this.contentComponent.clickCell.text = evt.target.value;
            },
            onfocus: function onfocus(_) {
              // console.log('fxInputDom----onfocus',this.contentComponent.clickCell)
              if (!_this.contentComponent.clickCell) {
                return;
              }
              _this.core.plugins.InputPlugin.showInput(_this.contentComponent.clickCell);
            },
            onblur: function onblur(_) {
              // console.log('fxInputDom----onblur')
              _this.core.freshContent();
              _this.core.plugins.InputPlugin.hideInput();
            }
          }
        });
        this.fxInputDom = fxInputDom;
        var settingDom = h('div', {
          attr: {
            className: 'e-sheet-setting-input-bar-layout'
          }
        }, [h('div', {
          attr: {
            className: 'left-input-layout'
          }
        }, [labelInputDom]), h('div', {
          attr: {
            className: 'right-input-layout'
          }
        }, [h('span', {
          attr: {
            innerText: 'fx',
            className: 'prefix-label'
          }
        }), fxInputDom])]);
        this.selectorDom.insertBefore(settingDom, this.canvasWrapperDom);

        // 操作文字横向对齐
        var fontHorAddrGroup = h('e-sheet-radio-group', {}, [h('e-sheet-radio-button', {
          attribute: {
            label: '左对齐',
            value: 'left'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'hor',
            position: 'left'
          }
        })]), h('e-sheet-radio-button', {
          style: {
            marginLeft: '6px'
          },
          attribute: {
            label: '居中对齐',
            value: 'center'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'hor',
            position: 'center'
          }
        })]), h('e-sheet-radio-button', {
          style: {
            marginLeft: '6px'
          },
          attribute: {
            label: '右对齐',
            value: 'right'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'hor',
            position: 'right'
          }
        })])]);
        this.fontHorAddrGroup = fontHorAddrGroup;
        fontHorAddrGroup.addEventListener('e-sheet-radio-group-onchange', function (evt) {
          // console.log('evt',evt)
          _this.cellFontTextAlignChange(evt.detail);
        });

        // 操作文字纵向对齐
        var fontVerAddrGroup = h('e-sheet-radio-group', {}, [h('e-sheet-radio-button', {
          attribute: {
            label: '顶部对齐',
            value: 'top'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'ver',
            position: 'top'
          }
        })]), h('e-sheet-radio-button', {
          style: {
            marginLeft: '6px'
          },
          attribute: {
            label: '垂直居中',
            value: 'middle'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'ver',
            position: 'middle'
          }
        })]), h('e-sheet-radio-button', {
          style: {
            marginLeft: '6px'
          },
          attribute: {
            label: '底部对齐',
            value: 'bottom'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'ver',
            position: 'bottom'
          }
        })])]);
        this.fontVerAddrGroup = fontVerAddrGroup;
        fontVerAddrGroup.addEventListener('e-sheet-radio-group-onchange', function (evt) {
          // console.log('evt',evt)
          _this.cellFontTextBaseLineChange(evt.detail);
        });
        var settingTopDom = h('div', {
          attr: {
            className: 'e-sheet-setting-layout'
          }
        });
        var fontPositionDom = h('div', {
          attr: {
            className: 'font-position-layout'
          }
        });
        fontPositionDom.appendChild(fontVerAddrGroup);
        fontPositionDom.appendChild(fontHorAddrGroup);

        // 字体大小设置

        var fontSizeSelectDom = h('e-sheet-select', {});
        fontSizeSelectDom.addEventListener('e-sheet-select-onchange', function (evt) {
          _this.cellFontSizeChange(evt.detail);
        });
        fontSizeSelectDom.setAttribute('label', '字号');
        var fontSizeAndFamilyLayoutDom = h('div', {
          attr: {
            className: 'font-position-layout'
          }
        });
        var fontColorAndBgColorDom = h('div', {
          attr: {
            className: 'font-position-layout'
          }
        });
        this.fontSizeSelectDom = fontSizeSelectDom;
        fontSizeAndFamilyLayoutDom.appendChild(fontSizeSelectDom);

        // 字体粗体和斜体设置

        var fontWeightBtnDom = h('e-sheet-radio-button', {
          attribute: {
            label: '粗体',
            value: 'bold'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'font',
            position: 'weight'
          }
        })]);
        this.fontWeightBtnDom = fontWeightBtnDom;
        fontWeightBtnDom.addEventListener('e-sheet-radio-group-change', function (evt) {
          // console.log('evt',evt)
          if (fontWeightBtnDom.getAttribute('current') === '') {
            fontWeightBtnDom.setAttribute('current', evt.detail);
            _this.cellFontWeightChange(evt.detail);
          } else {
            fontWeightBtnDom.setAttribute('current', '');
            _this.cellFontWeightChange('');
          }
        });
        var fontItalicBtnDom = h('e-sheet-radio-button', {
          style: {
            marginLeft: '6px'
          },
          attribute: {
            label: '斜体',
            value: 'italic'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'font',
            position: 'italic'
          }
        })]);
        this.fontItalicBtnDom = fontItalicBtnDom;
        fontItalicBtnDom.addEventListener('e-sheet-radio-group-change', function (evt) {
          // console.log('evt',evt)
          if (fontItalicBtnDom.getAttribute('current') === '') {
            fontItalicBtnDom.setAttribute('current', evt.detail);
            _this.cellFontItalicChange(evt.detail);
          } else {
            fontItalicBtnDom.setAttribute('current', '');
            _this.cellFontItalicChange('');
          }
        });
        var fontStyleGroupDom = h('div', {
          attr: {
            className: 'e-sheet-font-style-layout'
          }
        }, [fontWeightBtnDom, fontItalicBtnDom]);
        fontSizeAndFamilyLayoutDom.appendChild(fontStyleGroupDom);

        // 字体颜色设置
        var fontColorSelectDom = h('e-sheet-icon-color-svg', {
          attribute: {
            category: 'font-color'
          }
        });
        fontColorSelectDom.addEventListener('e-sheet-icon-color-svg-onchange', function (evt) {
          _this.cellFontColorChange(evt.detail);
        });
        var fontColorSelectTipConDom = h('e-sheet-tip', {
          attribute: {
            'tip-label': '字体颜色',
            'left': -10,
            'top': 22
          }
        });
        fontColorSelectTipConDom.appendChild(fontColorSelectDom);
        this.fontColorSelectDom = fontColorSelectDom;
        fontColorAndBgColorDom.appendChild(fontColorSelectTipConDom);

        // 背景颜色设置
        var bgColorSelectTipConDom = h('e-sheet-tip', {
          attribute: {
            'tip-label': '背景颜色',
            'left': -10,
            'top': 22
          }
        });
        var bgColorSelectDom = h('e-sheet-icon-color-svg', {
          attribute: {
            category: 'bg-color'
          }
        });
        this.bgColorSelectDom = bgColorSelectDom;
        bgColorSelectTipConDom.appendChild(bgColorSelectDom);
        bgColorSelectDom.addEventListener('e-sheet-icon-color-svg-onchange', function (evt) {
          _this.cellBgColorChange(evt.detail);
        });
        fontColorAndBgColorDom.appendChild(bgColorSelectTipConDom);
        var divideLine = h('div', {
          attr: {
            className: 'e-sheet-divide-line'
          }
        });
        var cellMergerBtnDom = h('e-sheet-tip', {
          attribute: {
            'tip-label': '合并单元格',
            left: 4,
            top: 24
          }
        }, [h('div', {
          attr: {
            className: 'e-sheet-font-style-layout e-sheet-cell-hover'
          },
          style: {
            cursor: 'pointer',
            padding: '2px'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'cell',
            position: 'merge'
          }
        }), h('div', {
          attr: {
            innerText: '合并单元格',
            className: 'e-sheet-cell-font'
          }
        })])]);
        var cellSplitBtnDom = h('e-sheet-tip', {
          style: {
            display: 'none'
          }
        }, [h('div', {
          attr: {
            className: 'e-sheet-font-style-layout e-sheet-cell-hover'
          },
          style: {
            cursor: 'pointer',
            padding: '2px'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'cell',
            position: 'split'
          }
        }), h('div', {
          attr: {
            innerText: '拆分单元格',
            className: 'e-sheet-cell-font'
          }
        })])]);
        var cellMergeAndSplitLayoutDom = h('div', {
          attr: {
            className: 'font-position-layout'
          }
        });
        cellMergerBtnDom.onclick = function (_) {
          var _this$contentComponen = _this.contentComponent,
            clickCell = _this$contentComponen.clickCell,
            mergeSelectedCell = _this$contentComponen.mergeSelectedCell;
          _this.core.plugins.ContextmenuPlugin.mergeCell(clickCell, mergeSelectedCell);
          if (mergeSelectedCell.some(function (item) {
            return item.isMerge;
          }) || mergeSelectedCell.length === 0) {
            return;
          }
          cellMergerBtnDom.style.display = 'none';
          cellSplitBtnDom.style.display = 'flex';
        };
        cellSplitBtnDom.onclick = function (_) {
          var clickCell = _this.contentComponent.clickCell;
          _this.core.plugins.ContextmenuPlugin.splitCell(clickCell);
          cellMergerBtnDom.style.display = 'flex';
          cellSplitBtnDom.style.display = 'none';
        };
        this.cellMergerBtnDom = cellMergerBtnDom;
        this.cellSplitBtnDom = cellSplitBtnDom;
        cellMergeAndSplitLayoutDom.appendChild(cellMergerBtnDom);
        cellMergeAndSplitLayoutDom.appendChild(cellSplitBtnDom);
        cellMergeAndSplitLayoutDom.appendChild(h('div', {
          attr: {
            innerText: '单元格',
            className: 'e-sheet-font-style-layout e-sheet-cell-font'
          },
          style: {
            justifyContent: 'center'
          }
        }));
        settingTopDom.appendChild(fontPositionDom);
        settingTopDom.appendChild(divideLine.cloneNode());
        settingTopDom.appendChild(fontSizeAndFamilyLayoutDom);
        settingTopDom.appendChild(divideLine.cloneNode());
        settingTopDom.appendChild(fontColorAndBgColorDom);
        settingTopDom.appendChild(divideLine.cloneNode());
        settingTopDom.appendChild(cellMergeAndSplitLayoutDom);
        this.selectorDom.insertBefore(settingTopDom, settingDom);
      }
    }]);
    return setting;
  }();

  var BookPlugin = /*#__PURE__*/function () {
    function BookPlugin(selectorDom, layer) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var components = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var core = arguments.length > 4 ? arguments[4] : undefined;
      _classCallCheck(this, BookPlugin);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "sheetArrLayoutDom", null);
      this.contentComponent = components.ContentComponent;
      this.headerComponent = components.HeaderComponent;
      this.sideComponent = components.SideComponent;
      this.selectorDom = selectorDom;
      this.canvasDom = core.canvasDom;
      this.canvasWrapperDom = core.canvasWrapperDom;
      this.options = options;
      this.layer = layer;
      this.core = core;
      this.registryDom();
    }
    _createClass(BookPlugin, [{
      key: "createNewSheet",
      value: function createNewSheet() {
        this.core.createNewSheet();
        this.core.currentSheetIndex = this.core.eSheetWorkBook.length - 1;
        var sheetWork = this.core.eSheetWorkBook[this.core.currentSheetIndex];
        this.core.switchSheet(this.core.currentSheetIndex);
        this.sheetArrLayoutDom.childNodes.forEach(function (item) {
          item.className = 'item-span';
        });
        this.sheetArrLayoutDom.appendChild(this.core.h('span', {
          attr: {
            innerText: sheetWork.label,
            className: 'item-span active-item-span'
          },
          attribute: {
            index: this.core.currentSheetIndex
          }
        }));
      }
    }, {
      key: "switchSheet",
      value: function switchSheet(index) {
        this.core.switchSheet(index);
        var currentSheetIndex = this.core.currentSheetIndex;
        this.sheetArrLayoutDom.childNodes.forEach(function (item, index) {
          // console.log('item.className',item.className,'---------',currentSheetIndex,index,currentSheetIndex===index?'item-span active-item-span':'item-span')
          item.className = currentSheetIndex === index ? 'item-span active-item-span' : 'item-span';
        });
        // console.log('index',index,currentSheetIndex)
      }
    }, {
      key: "setSheetName",
      value: function setSheetName(index, label) {
        this.core.eSheetWorkBook[index].label = label;
      }

      /**
       * @param {number} scale
       */
    }, {
      key: "setCanvasScale",
      value: function setCanvasScale(scale) {
        var _this = this;
        var _this$options = this.options,
          width = _this$options.width,
          height = _this$options.height,
          cellHeight = _this$options.cellHeight;
        this.contentComponent.contentGroup.forEach(function (item) {
          item.width /= _this.core.scale;
          item.height /= _this.core.scale;
          item.x /= _this.core.scale;
          item.y /= _this.core.scale;
          item.ltX = cellHeight + item.x;
          item.ltY = cellHeight + item.y;
          item.mergeWidth /= _this.core.scale;
          item.mergeHeight /= _this.core.scale;
          // item.fontSize /= this.core.scale

          item.width *= scale;
          item.height *= scale;
          item.x *= scale;
          item.y *= scale;
          item.ltX = scale * cellHeight + item.x;
          item.ltY = scale * cellHeight + item.y;
          item.mergeWidth *= scale;
          item.mergeHeight *= scale;
          // item.fontSize *= scale
        });

        this.core.scale = scale;
        var lastRect = this.contentComponent.contentGroup[this.contentComponent.contentGroup.length - 1];
        this.core.sheetWidth = lastRect.ltX + lastRect.width;
        this.core.sheetHeight = lastRect.ltY + lastRect.height;
        this.layer.clearRect(0, 0, width, height);
        this.core.fresh();
        this.core.freshScrollBar();
      }
    }, {
      key: "registryDom",
      value: function registryDom() {
        var _this2 = this;
        var _this$core = this.core,
          h = _this$core.h,
          eSheetWorkBook = _this$core.eSheetWorkBook,
          currentSheetIndex = _this$core.currentSheetIndex;
        var sheetArrLayoutDom = h('div', {
          attr: {
            className: 'sheet-arr-layout',
            onclick: function onclick(evt) {
              // console.log('sheetArrLayoutDom-evt',evt.target.getAttribute('index'))
              var strIndex = evt.target.getAttribute('index');
              if (strIndex) {
                _this2.switchSheet(parseInt(strIndex));
              }
            },
            ondblclick: function ondblclick(evt) {
              // console.log('evt',evt)
              var itemDom = evt.target;
              var index = parseInt(evt.target.getAttribute('index'));
              var inputDom = h('input', {
                attr: {
                  className: 'item-input',
                  onblur: function onblur(_) {
                    itemDom.innerText = inputDom.value;
                    inputDom.remove();
                    _this2.setSheetName(index, itemDom.innerText);
                  },
                  onkeydown: function onkeydown(keyEvent) {
                    // console.log('keyEvent',keyEvent)
                    if (keyEvent.key === 'Enter') {
                      itemDom.innerText = inputDom.value;
                      inputDom.remove();
                      _this2.setSheetName(index, itemDom.innerText);
                    }
                  }
                }
              });
              inputDom.value = itemDom.innerText;
              // console.log('itemDom.style.width',itemDom.getBoundingClientRect())
              inputDom.style.width = itemDom.getBoundingClientRect().width - 24 + 'px';
              itemDom.innerText = '';
              itemDom.appendChild(inputDom);
              inputDom.focus();
            }
          }
        }, eSheetWorkBook.map(function (item, index) {
          return h('div', {
            attr: {
              innerText: item.label,
              className: currentSheetIndex === index ? 'item-span active-item-span' : 'item-span'
            },
            attribute: {
              index: index
            }
          });
        }));
        this.sheetArrLayoutDom = sheetArrLayoutDom;
        var bookLayoutDom = h('div', {
          attr: {
            className: 'e-sheet-book-layout'
          }
        }, [h('div', {
          attr: {
            className: 'e-sheet-book-con'
          }
        }, [h('div', {
          attr: {
            className: 'menu-layout'
          }
        }, [h('div', {
          attr: {
            className: 'e-sheet-cell-hover'
          }
        }, [h('e-sheet-tip', {
          attribute: {
            'tip-label': '全部',
            left: -6,
            top: -36
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'book',
            position: 'menu'
          }
        })])]), h('div', {
          attr: {
            className: 'e-sheet-cell-hover'
          }
        }, [h('e-sheet-tip', {
          attribute: {
            'tip-label': '新增',
            left: -6,
            top: -36
          },
          attr: {
            onclick: function onclick(_) {
              _this2.createNewSheet();
            }
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'book',
            position: 'plus'
          }
        })])])]), sheetArrLayoutDom, h('div', {
          attr: {
            className: 'scroll-handle-layout'
          }
        }, [h('e-sheet-tip', {
          attribute: {
            'tip-label': '向左滚动',
            left: -20,
            top: -36
          },
          style: {
            height: '100%'
          },
          attr: {
            onclick: function onclick(evt) {
              // console.log('sheetArrLayoutDom',sheetArrLayoutDom.scrollLeft)
              sheetArrLayoutDom.scrollLeft -= 300;
            }
          }
        }, [h('div', {
          attr: {
            className: 'arrow'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'book',
            position: 'arrow-left'
          }
        })])]), h('e-sheet-tip', {
          attribute: {
            'tip-label': '向右滚动',
            left: -20,
            top: -36
          },
          style: {
            height: '100%'
          },
          attr: {
            onclick: function onclick(evt) {
              // console.log('sheetArrLayoutDom',sheetArrLayoutDom.scrollLeft)
              sheetArrLayoutDom.scrollLeft += 300;
            }
          }
        }, [h('div', {
          attr: {
            className: 'arrow'
          }
        }, [h('e-sheet-icon-svg', {
          attribute: {
            category: 'book',
            position: 'arrow-right'
          }
        })])])])])]);
        this.selectorDom.appendChild(bookLayoutDom);
      }
    }]);
    return BookPlugin;
  }();

  var Tip = /*#__PURE__*/function (_HTMLElement) {
    _inherits(Tip, _HTMLElement);
    var _super = _createSuper(Tip);
    function Tip() {
      _classCallCheck(this, Tip);
      return _super.apply(this, arguments);
    }
    _createClass(Tip, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;
        this.tipLabel = this.getAttribute('tip-label');
        this.left = parseInt(this.getAttribute('left'));
        this.top = parseInt(this.getAttribute('top'));
        var tipDom = document.createElement('div');
        tipDom.className = 'e-sheet-radio-button-tip';
        tipDom.innerText = this.tipLabel;
        this.className = 'e-sheet-tip';
        this.addEventListener('mouseover', function (evt) {
          // console.log('evt',this.getBoundingClientRect())
          if (!document.body.contains(tipDom)) {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            var _this$getBoundingClie = _this.getBoundingClientRect(),
              x = _this$getBoundingClie.x,
              y = _this$getBoundingClie.y;
            tipDom.style.left = x + _this.left + scrollLeft + 'px';
            tipDom.style.top = y + _this.top + scrollTop + 'px';
            document.body.appendChild(tipDom);
          }
        });
        this.addEventListener('mouseleave', function (evt) {
          tipDom.remove();
        });
      }
    }]);
    return Tip;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  customElements.define("e-sheet-tip", Tip);

  var Select = /*#__PURE__*/function (_HTMLElement) {
    _inherits(Select, _HTMLElement);
    var _super = _createSuper(Select);
    function Select() {
      var _this;
      _classCallCheck(this, Select);
      _this = _super.call(this);
      _defineProperty(_assertThisInitialized(_this), "optionLayoutDom", null);
      _defineProperty(_assertThisInitialized(_this), "isOpen", false);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(_assertThisInitialized(_this), "showTextDom", null);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(_assertThisInitialized(_this), "arrowDom", null);
      return _this;
    }
    _createClass(Select, [{
      key: "close",
      value: function close() {
        this.optionLayoutDom && this.optionLayoutDom.remove();
        this.optionLayoutDom = null;
        this.isOpen = false;
        this.arrowDom.style.transform = 'rotate(0deg)';
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this$getAttribute,
          _this2 = this;
        this.value = (_this$getAttribute = this.getAttribute('value')) !== null && _this$getAttribute !== void 0 ? _this$getAttribute : 12;
        this.label = this.getAttribute('label');
        this.className = 'e-sheet-select';
        var tipDom = document.createElement('div');
        tipDom.className = 'e-sheet-radio-button-tip';
        tipDom.innerText = this.label;
        this.addEventListener('mouseover', function (evt) {
          // console.log('evt',this.getBoundingClientRect())
          if (!tipDom) {
            tipDom = document.createElement('div');
            tipDom.className = 'e-sheet-radio-button-tip';
            tipDom.innerText = _this2.label;
          }
          var _this2$getBoundingCli = _this2.getBoundingClientRect(),
            x = _this2$getBoundingCli.x,
            y = _this2$getBoundingCli.y;
          tipDom.style.left = x + 12 + 'px';
          tipDom.style.top = y + 24 + 'px';
          document.body.appendChild(tipDom);
        });
        this.addEventListener('mouseleave', function (evt) {
          tipDom.remove();
        });
        var showTextDom = document.createElement('div');
        showTextDom.innerText = this.value;
        showTextDom.className = 'select-text';
        this.showTextDom = showTextDom;
        var arrowDom = document.createElement('e-sheet-icon-svg');
        arrowDom.setAttribute('category', 'select');
        arrowDom.setAttribute('position', 'down');
        this.arrowDom = arrowDom;
        arrowDom.style.transition = 'transform .5s';
        this.appendChild(showTextDom);
        this.appendChild(arrowDom);
        document.addEventListener('click', function (evt) {
          // console.log('evt-document',evt)
          if (!_this2.contains(evt.target)) {
            _this2.close();
          }
        });
        this.addEventListener('e-sheet-option-onchange', function (evt) {
          // console.log('e-sheet-option-onchange-evt',evt)
          showTextDom.innerText = _this2.value = evt.detail;
          _this2.dispatchEvent(new CustomEvent('e-sheet-select-onchange', {
            bubbles: false,
            composed: true,
            detail: _this2.value
          }));
          tipDom.remove();
          _this2.close();
          // console.log('this.optionLayoutDom',this.optionLayoutDom)
        });

        this.addEventListener('click', function (evt) {
          evt.stopImmediatePropagation();
          // console.log('点击select')
          // console.log('this.optionLayoutDom.contains(evt.target)',this.optionLayoutDom && this.optionLayoutDom.contains(evt.target),evt.target)
          if (_this2.isOpen) {
            _this2.close();
            return;
          }

          // console.log('this.optionLayoutDom-this.click',this.optionLayoutDom)

          if (_this2.optionLayoutDom && !_this2.optionLayoutDom.contains(evt.target)) {
            return;
          }
          _this2.isOpen = true;
          arrowDom.style.transform = 'rotate(180deg)';
          _this2.optionLayoutDom = document.createElement('div');
          _this2.optionLayoutDom.className = 'e-sheet-option-layout';
          new Array(10).fill(0).forEach(function (_, index) {
            var temp = document.createElement('e-sheet-option');
            temp.setAttribute('label', (12 + index).toString());
            temp.setAttribute('value', 12 + index);
            temp.setAttribute('current', _this2.value);
            _this2.optionLayoutDom.appendChild(temp);
          });
          // console.log('evt',this.getBoundingClientRect())
          var _this2$getBoundingCli2 = _this2.getBoundingClientRect(),
            height = _this2$getBoundingCli2.height;
          _this2.optionLayoutDom.style.left = -1 + 'px';
          _this2.optionLayoutDom.style.top = height + 'px';
          _this2.appendChild(_this2.optionLayoutDom);
        });
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        // 当上面数组中的属性发生变化的时候，这个方法会被调用
        // console.log('e-sheet-radio-group',name,oldValue,newValue,this.childElementCount)
        this.value = newValue;
        this.showTextDom.innerText = this.value;
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['value'];
      }
    }]);
    return Select;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  customElements.define("e-sheet-select", Select);

  var Option = /*#__PURE__*/function (_HTMLElement) {
    _inherits(Option, _HTMLElement);
    var _super = _createSuper(Option);
    function Option() {
      _classCallCheck(this, Option);
      return _super.call(this);
    }
    _createClass(Option, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;
        this.label = this.getAttribute('label');
        this.value = this.getAttribute('value');
        this.current = this.getAttribute('current');
        this.className = 'e-sheet-option';
        var fontDom = document.createElement('div');
        fontDom.className = 'option-font';
        fontDom.innerText = this.label;
        var statusDom = document.createElement('e-sheet-icon-svg');

        // console.log('this.value !== this.current',this.value !== this.current,this.current,this.value)

        if (this.value !== this.current) {
          statusDom.style.display = 'none';
        }
        statusDom.setAttribute('category', 'bool');
        statusDom.setAttribute('position', 'true');
        this.appendChild(fontDom);
        this.appendChild(statusDom);
        this.addEventListener('click', function (evt) {
          // console.log('点击option')
          evt.stopImmediatePropagation();
          _this.dispatchEvent(new CustomEvent('e-sheet-option-onchange', {
            bubbles: true,
            composed: true,
            detail: _this.value
          }));
        });
      }
    }]);
    return Option;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  customElements.define("e-sheet-option", Option);

  var RadioGroup = /*#__PURE__*/function (_HTMLElement) {
    _inherits(RadioGroup, _HTMLElement);
    var _super = _createSuper(RadioGroup);
    function RadioGroup() {
      _classCallCheck(this, RadioGroup);
      return _super.call(this);
    }
    _createClass(RadioGroup, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;
        this.value = this.getAttribute('value');
        var shadowDom = this.attachShadow({
          mode: 'open'
        });
        var slotDom = document.createElement('slot');
        this.className = 'e-sheet-radio-group';
        shadowDom.appendChild(slotDom);
        shadowDom.addEventListener('e-sheet-radio-group-change', function (evt) {
          // console.log('e-sheet-radio-group',evt)
          _this.value = evt.detail;
          new Array(_this.childElementCount).fill(undefined).forEach(function (_, index) {
            _this.children.item(index).setAttribute('current', _this.value);
          });
          shadowDom.dispatchEvent(new CustomEvent('e-sheet-radio-group-onchange', {
            bubbles: false,
            composed: true,
            detail: _this.value
          }));
          // console.log('this.shadowRoot',this.childNodes)
        });
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        var _this2 = this;
        // 当上面数组中的属性发生变化的时候，这个方法会被调用
        // console.log('e-sheet-radio-group',name,oldValue,newValue,this.childElementCount)
        this.value = newValue;
        new Array(this.childElementCount).fill(undefined).forEach(function (_, index) {
          _this2.children.item(index).setAttribute('current', _this2.value);
        });
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['value'];
      }
    }]);
    return RadioGroup;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  customElements.define("e-sheet-radio-group", RadioGroup);

  var RadioButton = /*#__PURE__*/function (_HTMLElement) {
    _inherits(RadioButton, _HTMLElement);
    var _super = _createSuper(RadioButton);
    function RadioButton() {
      _classCallCheck(this, RadioButton);
      return _super.call(this);
    }
    _createClass(RadioButton, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;
        this.label = this.getAttribute('label');
        this.value = this.getAttribute('value');
        this.className = 'e-sheet-radio-button';
        var shadowDOM = this.attachShadow({
          mode: 'open'
        });
        var tipDom = document.createElement('div');
        tipDom.className = 'e-sheet-radio-button-tip';
        tipDom.innerText = this.label;
        var slotDom = document.createElement('slot');
        shadowDOM.addEventListener('click', function (evt) {
          // console.log('evt',evt,this.value)
          shadowDOM.dispatchEvent(new CustomEvent('e-sheet-radio-group-change', {
            bubbles: true,
            composed: true,
            detail: _this.value
          }));
          // shadowDOM.dispatchEvent(new CustomEvent('e-sheet-radio-button-change', {
          //     bubbles: true,
          //     composed: true,
          //     detail: this.value
          // }));
        });

        this.addEventListener('mouseover', function (evt) {
          // console.log('evt',this.getBoundingClientRect())
          if (!document.body.contains(tipDom)) {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
            var _this$getBoundingClie = _this.getBoundingClientRect(),
              x = _this$getBoundingClie.x,
              y = _this$getBoundingClie.y;
            tipDom.style.left = x - _this.label.length * 12 / 2 + 4 + scrollLeft + 'px';
            tipDom.style.top = y + scrollTop + 24 + 'px';
            document.body.appendChild(tipDom);
          }
        });
        this.addEventListener('mouseleave', function (evt) {
          tipDom.remove();
          // console.log(tipDom)
        });

        shadowDOM.appendChild(slotDom);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        // 当上面数组中的属性发生变化的时候，这个方法会被调用
        // console.log('e-sheet-radio-button',name,oldValue,newValue,this.value)
        if (this.value === newValue) {
          this.className = 'e-sheet-radio-button e-sheet-radio-button-selected';
        } else {
          this.className = 'e-sheet-radio-button';
        }
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['current'];
      }
    }]);
    return RadioButton;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  customElements.define("e-sheet-radio-button", RadioButton);

  var IconSvg = /*#__PURE__*/function (_HTMLElement) {
    _inherits(IconSvg, _HTMLElement);
    var _super = _createSuper(IconSvg);
    function IconSvg() {
      _classCallCheck(this, IconSvg);
      return _super.call(this);
    }
    _createClass(IconSvg, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        this.category = this.getAttribute('category');
        this.position = this.getAttribute('position');
        if (this.category === 'hor') {
          this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20';
          switch (this.position) {
            case 'left':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00059"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00059)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1Zm-7 4H3V8h7v1Zm0 8H3v-1h7v1Zm7-4v-1H3v1h14Z"></path></g></svg>';
              return;
            case 'start':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00059"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00059)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1Zm-7 4H3V8h7v1Zm0 8H3v-1h7v1Zm7-4v-1H3v1h14Z"></path></g></svg>';
              return;
            case 'center':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00035"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00035)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1ZM7 9h6V8H7v1Zm10 4H3v-1h14v1Zm-4 4H7v-1h6v1Z"></path></g></svg>';
              return;
            case 'right':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00066"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00066)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1Zm-7 4h7V8h-7v1Zm7 3v1H3v-1h14Zm0 5h-7v-1h7v1Z"></path></g></svg>';
              return;
            case 'end':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00066"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00066)"><path fill="currentColor" fill-opacity="0.94" d="M17 5H3V4h14v1Zm-7 4h7V8h-7v1Zm7 3v1H3v-1h14Zm0 5h-7v-1h7v1Z"></path></g></svg>';
              return;
          }
        }
        if (this.category === 'ver') {
          this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20';
          switch (this.position) {
            case 'top':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_7600_00213"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_7600_00213)"><path fill="currentColor" d="M17 4H3V3h14v1Z"></path><path fill="#0089FF" d="m10.013 6 3.487 4h-7l3.513-4Z"></path><path fill="#0089FF" fill-rule="evenodd" d="M10.5 9v8h-1V9h1Z"></path></g></svg>';
              return;
            case 'middle':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_7600_00207"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_7600_00207)"><path fill="currentColor" d="M17 10H3V9h14v1Z"></path><path fill="#0089FF" fill-rule="evenodd" d="M10.5 1v5h-1V1h1Z"></path><path fill="#0089FF" d="m10.01 8 2.49-3h-5l2.51 3ZM10.01 11l2.49 3h-5l2.51-3Z"></path><path fill="#0089FF" fill-rule="evenodd" d="M10.5 14v4h-1v-4h1Z"></path></g></svg>';
              return;
            case 'bottom':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_7600_00217"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_7600_00217)"><path fill="currentColor" d="M17 17H3v-1h14v1Z"></path><path fill="#0089FF" fill-rule="evenodd" d="M10.5 3v8h-1V3h1Z"></path><path fill="#0089FF" d="m10.013 14 3.487-4h-7l3.513 4Z"></path></g></svg>';
              return;
          }
        }
        if (this.category === 'bool') {
          this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20';
          switch (this.position) {
            case 'true':
              this.innerHTML = '<svg fill="none" width="20" height="20" viewBox="0 0 20 20" class="wdn-icon"><path d="M16.354 6.854a.5.5 0 0 0-.708-.708L8.5 13.293 4.854 9.647a.5.5 0 1 0-.708.707l4 4a.5.5 0 0 0 .708 0l7.5-7.5Z" fill="currentColor"></path></svg>';
              return;
          }
        }
        if (this.category === 'select') {
          this.className = 'e-sheet-cell-svg-layout e-sheet-svg-12-12';
          switch (this.position) {
            case 'down':
              this.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" stroke="none" data-spm-anchor-id="" style=""><path d="M6.00004 7.79293L1.85359 3.64648L1.14648 4.35359L6.00004 9.20714L10.8536 4.35359L10.1465 3.64648L6.00004 7.79293Z" fill="currentColor" data-spm-anchor-id=""></path></svg>';
              return;
          }
        }
        if (this.category === 'font') {
          this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20';
          switch (this.position) {
            case 'weight':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20"><defs><clipPath id="master_svg0_6926_00081"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_6926_00081)"><path fill="currentColor" d="M5.8 3.05a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h5.5c2.297 0 3.75-1.862 3.75-4 0-1.415-.637-2.71-1.734-3.423.734-.635 1.234-1.588 1.234-2.827 0-2.424-1.91-3.75-3.75-3.75h-5Zm5 6H6.55v-4.5h4.25c1.16 0 2.25.796 2.25 2.25s-1.09 2.25-2.25 2.25Zm-4.25 1.5h4.75c1.314 0 2.25 1.027 2.25 2.5s-.936 2.5-2.25 2.5H6.55v-5Z" data-spm-anchor-id=""></path></g></svg>';
              return;
            case 'italic':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" size="20" data-spm-anchor-id=""><defs><clipPath id="master_svg0_7600_9375"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_7600_9375)"><path fill="currentColor" d="M12 4h3V3H8v1h2.769l-2.77 12H5v1h7v-1H9.231l2.77-12Z"></path></g></svg>';
              return;
          }
        }
        if (this.category === 'cell') {
          this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20';
          switch (this.position) {
            case 'merge':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><defs><clipPath id="master_svg0_31608_94416"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_31608_94416)"><path fill="#0089FF" d="M15 10.5H5v-1h10v1Z"></path><path fill="currentColor" d="M6.5 3A1.5 1.5 0 0 1 8 4.5V6H7V4.5a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h1v1.5A1.5 1.5 0 0 1 6.5 17h-2A1.5 1.5 0 0 1 3 15.5v-11A1.5 1.5 0 0 1 4.5 3h2Zm7 0A1.5 1.5 0 0 0 12 4.5V6h1V4.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V14h-1v1.5a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 15.5 3h-2Z"></path></g></svg>';
              return;
            case 'split':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><defs><clipPath id="master_svg0_31608_94446"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_31608_94446)"><path fill="currentColor" fill-rule="evenodd" d="M4 4.5A1.5 1.5 0 0 1 5.5 3h2A1.5 1.5 0 0 1 9 4.5v11A1.5 1.5 0 0 1 7.5 17h-2A1.5 1.5 0 0 1 4 15.5V14h1v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5V6H4V4.5ZM16 4.5A1.5 1.5 0 0 0 14.5 3h-2A1.5 1.5 0 0 0 11 4.5v11a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5V14h-1v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V6h1V4.5Z"></path><path fill="#0089FF" fill-rule="evenodd" d="M7 10.5H4v-1h3v1ZM16 10.5h-3v-1h3v1Z"></path><path fill="#0089FF" d="m18 10-3-2.5v5l3-2.5ZM2 10l3-2.5v5L2 10Z"></path></g></svg>';
              return;
          }
        }
        if (this.category === 'book') {
          this.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20';
          switch (this.position) {
            case 'menu':
              this.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-spm-anchor-id=""><path d="M6 5H18V4H6V5ZM18 10H6V9H18V10ZM18 15H6V14H18V15ZM2 5H4V4H2V5ZM4 10H2V9H4V10ZM4 15H2V14H4V15Z" fill="rgba(40,50,72,1)"></path></svg>';
              return;
            case 'plus':
              this.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><defs><clipPath id="master_svg0_30306_58308"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_30306_58308)"><path fill="currentColor" fill-opacity="0.94" d="M9.5 4.5v5h-5a.5.5 0 0 0 0 1h5v5a.5.5 0 0 0 1 0v-5h5a.5.5 0 0 0 0-1h-5v-5a.5.5 0 0 0-1 0Z"></path></g></svg>';
              return;
            case 'arrow-left':
              this.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="wdn-icon" data-spm-anchor-id=""><path d="m12.646 3.646.708.708L7.707 10l5.647 5.646-.707.708L6.292 10l6.353-6.354Z" fill="currentColor"></path></svg>';
              return;
            case 'arrow-right':
              this.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="wdn-icon"><path d="m7.353 3.646-.707.708L12.293 10l-5.647 5.646.707.708L13.707 10 7.353 3.646Z" fill="currentColor"></path></svg>';
              return;
          }
        }
      }
    }]);
    return IconSvg;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  customElements.define("e-sheet-icon-svg", IconSvg);

  var IconColorSvg = /*#__PURE__*/function (_HTMLElement) {
    _inherits(IconColorSvg, _HTMLElement);
    var _super = _createSuper(IconColorSvg);
    function IconColorSvg() {
      _classCallCheck(this, IconColorSvg);
      return _super.call(this);
    }
    _createClass(IconColorSvg, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;
        this.category = this.getAttribute('category');
        this.color = this.getAttribute('color');
        this.className = 'e-sheet-icon-color-svg';
        var svgLayoutDom = document.createElement('div');
        svgLayoutDom.onclick = function (evt) {
          _this.querySelector('svg').querySelectorAll('path').forEach(function (item) {
            if (item.getAttribute('fill') !== 'currentColor') {
              _this.dispatchEvent(new CustomEvent('e-sheet-icon-color-svg-onchange', {
                bubbles: false,
                composed: true,
                detail: item.getAttribute('fill')
              }));
            }
          });
        };
        var selectArrowLayoutDom = document.createElement('div');
        var selectArrowDom = document.createElement('e-sheet-icon-svg');
        selectArrowDom.setAttribute('category', 'select');
        selectArrowDom.setAttribute('position', 'down');
        selectArrowDom.style.transition = 'transform .5s';
        selectArrowLayoutDom.appendChild(selectArrowDom);
        var inputColorDom = document.createElement('input');
        inputColorDom.className = 'no-draw-input';
        inputColorDom.type = 'color';
        inputColorDom.oninput = function (evt) {
          _this.setAttribute('color', evt.target.value);
          _this.dispatchEvent(new CustomEvent('e-sheet-icon-color-svg-onchange', {
            bubbles: false,
            composed: true,
            detail: evt.target.value
          }));
        };
        selectArrowLayoutDom.appendChild(inputColorDom);
        selectArrowLayoutDom.className = 'arrow-layout';
        selectArrowLayoutDom.onclick = function (evt) {
          selectArrowDom.style.transform = 'rotate(180deg)';
          inputColorDom.click();
        };
        document.addEventListener('click', function (evt) {
          // console.log('evt-document',evt)
          if (!_this.contains(evt.target)) {
            selectArrowDom.style.transform = 'rotate(0deg)';
          }
        });
        svgLayoutDom.className = 'e-sheet-cell-svg-layout e-sheet-svg-20-20';
        if (this.category === 'font-color') {
          svgLayoutDom.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20" data-spm-anchor-id=""><defs><clipPath id="master_svg0_23880_31533"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_23880_31533)"><path fill="#000000" d="M17 19H3a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2Z"></path><path fill="currentColor" fill-opacity="0.14" d="M17 19.5q.621 0 1.06-.44.44-.439.44-1.06t-.44-1.06q-.439-.44-1.06-.44H3q-.621 0-1.06.44-.44.439-.44 1.06t.44 1.06q.439.44 1.06.44h14Zm0-.5H3a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2Z"></path><path fill="currentColor" fill-opacity="0.94" d="m12.456 11 1.584 3.697a.5.5 0 0 0 .92-.394l-1.715-4-2.785-6.5a.5.5 0 0 0-.92 0l-2.785 6.5-1.714 4a.5.5 0 0 0 .919.394L7.544 11h4.912Zm-.429-1H7.973L10 5.27 12.027 10Z"></path></g></svg>';
        } else if (this.category === 'bg-color') {
          svgLayoutDom.innerHTML = '<svg width="20" height="20" fill="none" viewBox="0 0 20 20"><defs><clipPath id="master_svg0_31391_75878"><rect width="20" height="20" rx="0"></rect></clipPath></defs><g clip-path="url(#master_svg0_31391_75878)"><path fill="currentColor" fill-opacity="0.94" fill-rule="evenodd" d="M9.718 1.843 5.857 5.704h-3.87v1h2.87L3.354 8.207q-.44.44-.44 1.061t.44 1.06l4.95 4.95q.439.44 1.06.44t1.06-.44l6.365-6.364q.44-.439.44-1.06 0-.622-.44-1.061l-4.95-4.95q-.44-.44-1.06-.44-.622 0-1.061.44ZM11.5 6.704H6.271l-2.21 2.21q-.147.147-.147.354t.147.354l.531.531 10.315-.771 1.175-1.175q.146-.146.146-.353t-.146-.354l-4.95-4.95q-.147-.146-.354-.146t-.353.146L7.27 5.704H11.5v1Zm5.088 8.442c.78 0 1.412-.632 1.412-1.411q0-.78-1.412-2.353-1.412 1.573-1.412 2.353c0 .78.633 1.411 1.412 1.411Z"></path><path fill="#F2C150" d="M17 19H3a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2Z"></path><path fill="currentColor" fill-opacity="0.14" d="M17 19.5q.621 0 1.06-.44.44-.439.44-1.06t-.44-1.06q-.439-.44-1.06-.44H3q-.621 0-1.06.44-.44.439-.44 1.06t.44 1.06q.439.44 1.06.44h14Zm0-.5H3a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2Z"></path></g></svg>';
        }
        this.appendChild(svgLayoutDom);
        this.appendChild(selectArrowLayoutDom);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
        // 当上面数组中的属性发生变化的时候，这个方法会被调用
        // console.log('e-sheet-radio-button',name,oldValue,newValue,this.value)
        this.color = newValue;
        this.querySelector('svg').querySelectorAll('path').forEach(function (item) {
          if (item.getAttribute('fill') !== 'currentColor') {
            item.setAttribute('fill', newValue);
          }
        });
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['color'];
      }
    }]);
    return IconColorSvg;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  customElements.define("e-sheet-icon-color-svg", IconColorSvg);

  var eSheet = /*#__PURE__*/function () {
    function eSheet(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var plugins = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      _classCallCheck(this, eSheet);
      /**
       * @type {HTMLElement}
       */
      _defineProperty(this, "excelDom", null);
      /**
       * @type {AppExcel}
       */
      _defineProperty(this, "AppExcel", null);
      if (Object.prototype.toString.call(selector) === '[object HTMLDivElement]') {
        this.excelDom = selector;
      } else {
        this.excelDom = document.querySelector(selector);
      }
      if (!this.excelDom) {
        throw new Error('the selector is error');
      }
      this.excelDom.style.position = 'relative';
      // this.excelDom.style.overflow = 'hidden'
      // console.log('selector',selector)

      return this.init(options, plugins);
    }
    _createClass(eSheet, [{
      key: "init",
      value: function init() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var plugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        this.AppExcel = new AppExcel(this.excelDom, options, {
          ContentComponent: ContentComponent,
          HeaderComponent: HeaderComponent,
          SideComponent: SideComponent,
          WholeComponent: WholeComponent
        }, _objectSpread2({
          SettingPlugin: setting,
          ScrollPlugin: ScrollPlugin,
          InputPlugin: InputPlugin,
          DragPlugin: DragPlugin,
          SelectPlugin: SelectPlugin,
          ContextmenuPlugin: ContextmenuPlugin,
          BookPlugin: BookPlugin
        }, plugins));
        return this.AppExcel;
      }
    }, {
      key: "installXlsxData",
      value: function installXlsxData(oriData) {
        this.AppExcel.installXlsxData(oriData);
      }
    }]);
    return eSheet;
  }();

  return eSheet;

}));
//# sourceMappingURL=e-sheet.umd.js.map
