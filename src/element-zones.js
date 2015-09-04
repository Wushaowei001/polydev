(function() {
  'use strict';
  // TODO(justinfagnani): add these with gulp
  let zonesSource = `!function e(t,n,r){function o(u,a){if(!n[u]){if(!t[u]){var s="function"==typeof require&&require;if(!a&&s)return s(u,!0);if(i)return i(u,!0);var c=new Error("Cannot find module '"+u+"'");throw c.code="MODULE_NOT_FOUND",c}var f=n[u]={exports:{}};t[u][0].call(f.exports,function(e){var n=t[u][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){(function(t){"use strict";var n=e("../core"),r=e("../microtask"),o=e("../patch/browser"),i=e("es6-promise");t.Zone&&console.warn("Zone already exported on window the object!"),t.Zone=r.addMicrotaskSupport(n.Zone),t.zone=new t.Zone,t.Promise=i.Promise,o.apply()}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../core":2,"../microtask":3,"../patch/browser":4,"es6-promise":15}],2:[function(e,t,n){(function(n){"use strict";function r(e,t){var n=arguments.length?Object.create(e):this;return n.parent=e||null,Object.keys(t||{}).forEach(function(r){var o=r.substr(1);"$"===r[0]?n[o]=t[r](e[o]||function(){}):"+"===r[0]?n[o]=e[o]?function(){var n=e[o].apply(this,arguments);return t[r].apply(this,arguments),n}:t[r]:"-"===r[0]?n[o]=e[o]?function(){return t[r].apply(this,arguments),e[o].apply(this,arguments)}:t[r]:n[r]="object"==typeof t[r]?JSON.parse(JSON.stringify(t[r])):t[r]}),n.$id=r.nextId++,n}r.prototype={constructor:r,fork:function(e){return this.onZoneCreated(),new r(this,e)},bind:function(e,t){if("function"!=typeof e)throw new Error("Expecting function got: "+e);t||this.enqueueTask(e);var n=this.isRootZone()?this:this.fork();return function(){return n.run(e,this,arguments)}},bindOnce:function(e){var t=this;return this.bind(function(){var n=e.apply(this,arguments);return t.dequeueTask(e),n})},isRootZone:function(){return null===this.parent},run:function(e,t,r){r=r||[];var o=n.zone;n.zone=this;try{return this.beforeTask(),e.apply(t,r)}catch(i){if(!this.onError)throw i;this.onError(i)}finally{this.afterTask(),n.zone=o}},onError:null,beforeTask:function(){},onZoneCreated:function(){},afterTask:function(){},enqueueTask:function(){},dequeueTask:function(){}},r.nextId=1,r.bindPromiseFn=e("./patch/promise").bindPromiseFn,t.exports={Zone:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./patch/promise":10}],3:[function(e,t,n){(function(n){"use strict";function r(e){i._asap(this.bind(e))}function o(e){return e.prototype.scheduleMicrotask=r,e}var i=e("es6-promise").Promise;i._setAsap(function(e,t){n.zone.scheduleMicrotask(function(){e(t)})}),t.exports={addMicrotaskSupport:o};var u="undefined"!=typeof Promise&&-1!==Promise.toString().indexOf("[native code]"),a=n.navigator&&n.navigator.userAgent.toLowerCase().indexOf("firefox")>-1;if(u&&!a){var s=Promise.resolve();i._setScheduler(function(e){s.then(e)})}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"es6-promise":15}],4:[function(e,t,n){(function(n){"use strict";function r(){o.patchSetClearFunction(n,["timeout","interval","immediate"]),o.patchRequestAnimationFrame(n,["requestAnimationFrame","mozRequestAnimationFrame","webkitRequestAnimationFrame"]),o.patchFunction(n,["alert","prompt"]),c.apply(),f.apply(),i.apply(),u.patchClass("MutationObserver"),u.patchClass("WebKitMutationObserver"),a.apply(),s.apply(),p.apply()}var o=e("./functions"),i=e("./promise"),u=e("./mutation-observer"),a=e("./define-property"),s=e("./register-element"),c=(e("./websocket"),e("./event-target")),f=e("./property-descriptor"),p=e("./geolocation");t.exports={apply:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./define-property":5,"./event-target":6,"./functions":7,"./geolocation":8,"./mutation-observer":9,"./promise":10,"./property-descriptor":11,"./register-element":12,"./websocket":13}],5:[function(e,t,n){"use strict";function r(){Object.defineProperty=function(e,t,n){if(i(e,t))throw new TypeError("Cannot assign to read only property '"+t+"' of "+e);return"prototype"!==t&&(n=u(e,t,n)),a(e,t,n)},Object.defineProperties=function(e,t){return Object.keys(t).forEach(function(n){Object.defineProperty(e,n,t[n])}),e},Object.create=function(e,t){return"object"==typeof t&&Object.keys(t).forEach(function(n){t[n]=u(e,n,t[n])}),c(e,t)},Object.getOwnPropertyDescriptor=function(e,t){var n=s(e,t);return i(e,t)&&(n.configurable=!1),n}}function o(e,t,n){return n=u(e,t,n),a(e,t,n)}function i(e,t){return e&&e.__unconfigurables&&e.__unconfigurables[t]}function u(e,t,n){return n.configurable=!0,n.configurable||(e.__unconfigurables||a(e,"__unconfigurables",{writable:!0,value:{}}),e.__unconfigurables[t]=!0),n}var a=Object.defineProperty,s=Object.getOwnPropertyDescriptor,c=Object.create;t.exports={apply:r,_redefineProperty:o}},{}],6:[function(e,t,n){(function(n){"use strict";function r(){if(n.EventTarget)o.patchEventTargetMethods(n.EventTarget.prototype);else{var e=["ApplicationCache","EventSource","FileReader","InputMethodContext","MediaController","MessagePort","Node","Performance","SVGElementInstance","SharedWorker","TextTrack","TextTrackCue","TextTrackList","WebKitNamedFlow","Window","Worker","WorkerGlobalScope","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"];e.forEach(function(e){n[e]&&o.patchEventTargetMethods(n[e].prototype)})}}var o=e("../utils");t.exports={apply:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":14}],7:[function(e,t,n){(function(n){"use strict";function r(e,t){t.map(function(e){return e[0].toUpperCase()+e.substr(1)}).forEach(function(t){var r="set"+t,o=e[r];if(o){var i="clear"+t,u={},s="setInterval"===r?a.bindArguments:a.bindArgumentsOnce;n.zone[r]=function(t){var n,r=t;arguments[0]=function(){return delete u[n],r.apply(this,arguments)};var i=s(arguments);return n=o.apply(e,i),u[n]=!0,n},e[r]=function(){return n.zone[r].apply(this,arguments)};var c=e[i];n.zone[i]=function(e){return u[e]&&(delete u[e],n.zone.dequeueTask()),c.apply(this,arguments)},e[i]=function(){return n.zone[i].apply(this,arguments)}}})}function o(e,t){t.forEach(function(t){var r=e[t];r&&(n.zone[t]=function(t){var o=n.zone.isRootZone()?n.zone.fork():n.zone;return t&&(arguments[0]=function(){return o.run(t,arguments)}),r.apply(e,arguments)},e[t]=function(){return n.zone[t].apply(this,arguments)})})}function i(e,t){t.forEach(function(t){var r=e[t];r&&(n.zone[t]=function(t){var n=t;arguments[0]=function(){return n.apply(this,arguments)};var o=a.bindArgumentsOnce(arguments);return r.apply(e,o)},e[t]=function(){return zone[t].apply(this,arguments)})})}function u(e,t){t.forEach(function(t){var r=e[t];n.zone[t]=function(){return r.apply(e,arguments)},e[t]=function(){return n.zone[t].apply(this,arguments)}})}var a=e("../utils");t.exports={patchSetClearFunction:r,patchSetFunction:i,patchRequestAnimationFrame:o,patchFunction:u}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":14}],8:[function(e,t,n){(function(n){"use strict";function r(){n.navigator&&n.navigator.geolocation&&o.patchPrototype(n.navigator.geolocation,["getCurrentPosition","watchPosition"])}var o=e("../utils");t.exports={apply:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":14}],9:[function(e,t,n){(function(e){"use strict";function n(t){var n=e[t];if(n){e[t]=function(t){this._o=new n(e.zone.bind(t,!0)),this._creationZone=e.zone};var r=new n(function(){});e[t].prototype.disconnect=function(){var e=this._o.disconnect.apply(this._o,arguments);return this._active&&(this._creationZone.dequeueTask(),this._active=!1),e},e[t].prototype.observe=function(){return this._active||(this._creationZone.enqueueTask(),this._active=!0),this._o.observe.apply(this._o,arguments)};var o;for(o in r)!function(n){void 0===typeof e[t].prototype&&("function"==typeof r[n]?e[t].prototype[n]=function(){return this._o[n].apply(this._o,arguments)}:Object.defineProperty(e[t].prototype,n,{set:function(t){this._o[n]="function"==typeof t?e.zone.bind(t):t},get:function(){return this._o[n]}}))}(o)}}t.exports={patchClass:n}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],10:[function(e,t,n){(function(n){"use strict";function r(e,t){var r=n,o=e.every(function(e){return r=r[e]});o&&t.forEach(function(e){var t=r[e];t&&(r[e]=u(t))})}function o(e){var t=e.then;e.then=function(){var n=a.bindArguments(arguments),r=t.apply(e,n);return o(r)};var n=e["catch"];return e["catch"]=function(){var t=a.bindArguments(arguments),r=n.apply(e,t);return o(r)},e}function i(){if(n.Promise){a.patchPrototype(Promise.prototype,["then","catch"]);var e=[[[],["fetch"]],[["Response","prototype"],["arrayBuffer","blob","json","text"]]];e.forEach(function(e){r(e[0],e[1])})}}var u,a=e("../utils");u=n.Promise?function(e){return function(){var t=e.apply(this,arguments);return t instanceof Promise?t:new Promise(function(e,n){t.then(e,n)})}}:function(e){return function(){return o(e.apply(this,arguments))}},t.exports={apply:i,bindPromiseFn:u}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":14}],11:[function(e,t,n){(function(n){"use strict";function r(){if(!a.isWebWorker()){var e="undefined"!=typeof WebSocket;if(o()){var t=s.map(function(e){return"on"+e});a.patchProperties(HTMLElement.prototype,t),a.patchProperties(XMLHttpRequest.prototype),e&&a.patchProperties(WebSocket.prototype)}else i(),a.patchClass("XMLHttpRequest"),e&&u.apply()}}function o(){if(!Object.getOwnPropertyDescriptor(HTMLElement.prototype,"onclick")&&"undefined"!=typeof Element){var e=Object.getOwnPropertyDescriptor(Element.prototype,"onclick");if(e&&!e.configurable)return!1}Object.defineProperty(HTMLElement.prototype,"onclick",{get:function(){return!0}});var t=document.createElement("div"),n=!!t.onclick;return Object.defineProperty(HTMLElement.prototype,"onclick",{}),n}function i(){s.forEach(function(e){var t="on"+e;document.addEventListener(e,function(e){for(var r,o=e.target;o;)o[t]&&!o[t]._unbound&&(r=n.zone.bind(o[t]),r._unbound=o[t],o[t]=r),o=o.parentElement},!0)})}var u=e("./websocket"),a=e("../utils"),s="copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror".split(" ");t.exports={apply:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":14,"./websocket":13}],12:[function(e,t,n){(function(n){"use strict";function r(){if(!i.isWebWorker()&&"registerElement"in n.document){var e=document.registerElement,t=["createdCallback","attachedCallback","detachedCallback","attributeChangedCallback"];document.registerElement=function(r,i){return i&&i.prototype&&t.forEach(function(e){if(i.prototype.hasOwnProperty(e)){var t=Object.getOwnPropertyDescriptor(i.prototype,e);t&&t.value?(t.value=n.zone.bind(t.value),o(i.prototype,e,t)):i.prototype[e]=n.zone.bind(i.prototype[e])}else i.prototype[e]&&(i.prototype[e]=n.zone.bind(i.prototype[e]))}),e.apply(document,[r,i])}}}var o=e("./define-property")._redefineProperty,i=e("../utils");t.exports={apply:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":14,"./define-property":5}],13:[function(e,t,n){(function(n){"use strict";function r(){var e=n.WebSocket;o.patchEventTargetMethods(e.prototype),n.WebSocket=function(t,n){var r,i=arguments.length>1?new e(t,n):new e(t),u=Object.getOwnPropertyDescriptor(i,"onmessage");return u&&u.configurable===!1?(r=Object.create(i),["addEventListener","removeEventListener","send","close"].forEach(function(e){r[e]=function(){return i[e].apply(i,arguments)}})):r=i,o.patchProperties(r,["onclose","onerror","onmessage","onopen"]),r}}var o=e("../utils");t.exports={apply:r}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../utils":14}],14:[function(e,t,n){(function(e){"use strict";function n(t){for(var n=t.length-1;n>=0;n--)"function"==typeof t[n]&&(t[n]=e.zone.bind(t[n]));return t}function r(t){for(var n=t.length-1;n>=0;n--)"function"==typeof t[n]&&(t[n]=e.zone.bindOnce(t[n]));return t}function o(e,t){t.forEach(function(t){var r=e[t];r&&(e[t]=function(){return r.apply(this,n(arguments))})})}function i(){return"undefined"==typeof document}function u(e,t){var n=Object.getOwnPropertyDescriptor(e,t)||{enumerable:!0,configurable:!0};delete n.writable,delete n.value;var r=t.substr(2),o="_"+t;n.set=function(e){this[o]&&this.removeEventListener(r,this[o]),"function"==typeof e?(this[o]=e,this.addEventListener(r,e,!1)):this[o]=null},n.get=function(){return this[o]},Object.defineProperty(e,t,n)}function a(e,t){(t||function(){var t=[];for(var n in e)t.push(n);return t}().filter(function(e){return"on"===e.substr(0,2)})).forEach(function(t){u(e,t)})}function s(t){var n=t.addEventListener;t.addEventListener=function(e,t){var r;return"[object FunctionWrapper]"!==t.toString()&&(r=t.handleEvent?function(e){return function(){e.handleEvent.apply(e,arguments)}}(t):t,t._fn=r,t._bound=t._bound||{},arguments[1]=t._bound[e]=zone.bind(r)),n.apply(this,arguments)};var r=t.removeEventListener;t.removeEventListener=function(t,n){if(n._bound&&n._bound[t]){var o=n._bound;arguments[1]=o[t],delete o[t]}var i=r.apply(this,arguments);return e.zone.dequeueTask(n._fn),i}}function c(t){var r=e[t];if(r){e[t]=function(){var e=n(arguments);switch(e.length){case 0:this._o=new r;break;case 1:this._o=new r(e[0]);break;case 2:this._o=new r(e[0],e[1]);break;case 3:this._o=new r(e[0],e[1],e[2]);break;case 4:this._o=new r(e[0],e[1],e[2],e[3]);break;default:throw new Error("what are you even doing?")}};var o,i=new r;for(o in i)!function(n){"function"==typeof i[n]?e[t].prototype[n]=function(){return this._o[n].apply(this._o,arguments)}:Object.defineProperty(e[t].prototype,n,{set:function(t){this._o[n]="function"==typeof t?e.zone.bind(t):t},get:function(){return this._o[n]}})}(o);for(o in r)"prototype"!==o&&r.hasOwnProperty(o)&&(e[t][o]=r[o])}}t.exports={bindArguments:n,bindArgumentsOnce:r,patchPrototype:o,patchProperty:u,patchProperties:a,patchEventTargetMethods:s,patchClass:c,isWebWorker:i}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],15:[function(e,t,n){(function(n,r){(function(){"use strict";function o(e){return"function"==typeof e||"object"==typeof e&&null!==e}function i(e){return"function"==typeof e}function u(e){return"object"==typeof e&&null!==e}function a(e){X=e}function s(e){G=e}function c(){var e=n.nextTick,t=n.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);return Array.isArray(t)&&"0"===t[1]&&"10"===t[2]&&(e=setImmediate),function(){e(h)}}function f(){return function(){U(h)}}function p(){var e=0,t=new V(h),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function l(){var e=new MessageChannel;return e.port1.onmessage=h,function(){e.port2.postMessage(0)}}function d(){return function(){setTimeout(h,1)}}function h(){for(var e=0;$>e;e+=2){var t=te[e],n=te[e+1];t(n),te[e]=void 0,te[e+1]=void 0}$=0}function y(){try{var t=e,n=t("vertx");return U=n.runOnLoop||n.runOnContext,f()}catch(r){return d()}}function v(){}function g(){return new TypeError("You cannot resolve a promise with itself")}function m(){return new TypeError("A promises callback cannot return that same promise.")}function b(e){try{return e.then}catch(t){return ie.error=t,ie}}function w(e,t,n,r){try{e.call(t,n,r)}catch(o){return o}}function _(e,t,n){G(function(e){var r=!1,o=w(n,t,function(n){r||(r=!0,t!==n?P(e,n):j(e,n))},function(t){r||(r=!0,x(e,t))},"Settle: "+(e._label||" unknown promise"));!r&&o&&(r=!0,x(e,o))},e)}function k(e,t){t._state===re?j(e,t._result):t._state===oe?x(e,t._result):T(t,void 0,function(t){P(e,t)},function(t){x(e,t)})}function E(e,t){if(t.constructor===e.constructor)k(e,t);else{var n=b(t);n===ie?x(e,ie.error):void 0===n?j(e,t):i(n)?_(e,t,n):j(e,t)}}function P(e,t){e===t?x(e,g()):o(t)?E(e,t):j(e,t)}function O(e){e._onerror&&e._onerror(e._result),z(e)}function j(e,t){e._state===ne&&(e._result=t,e._state=re,0!==e._subscribers.length&&G(z,e))}function x(e,t){e._state===ne&&(e._state=oe,e._result=t,G(O,e))}function T(e,t,n,r){var o=e._subscribers,i=o.length;e._onerror=null,o[i]=t,o[i+re]=n,o[i+oe]=r,0===i&&e._state&&G(z,e)}function z(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var r,o,i=e._result,u=0;u<t.length;u+=3)r=t[u],o=t[u+n],r?M(n,r,o,i):o(i);e._subscribers.length=0}}function A(){this.error=null}function C(e,t){try{return e(t)}catch(n){return ue.error=n,ue}}function M(e,t,n,r){var o,u,a,s,c=i(n);if(c){if(o=C(n,r),o===ue?(s=!0,u=o.error,o=null):a=!0,t===o)return void x(t,m())}else o=r,a=!0;t._state!==ne||(c&&a?P(t,o):s?x(t,u):e===re?j(t,o):e===oe&&x(t,o))}function S(e,t){try{t(function(t){P(e,t)},function(t){x(e,t)})}catch(n){x(e,n)}}function q(e,t){var n=this;n._instanceConstructor=e,n.promise=new e(v),n._validateInput(t)?(n._input=t,n.length=t.length,n._remaining=t.length,n._init(),0===n.length?j(n.promise,n._result):(n.length=n.length||0,n._enumerate(),0===n._remaining&&j(n.promise,n._result))):x(n.promise,n._validationError())}function L(e){return new ae(this,e).promise}function F(e){function t(e){P(o,e)}function n(e){x(o,e)}var r=this,o=new r(v);if(!Y(e))return x(o,new TypeError("You must pass an array to race.")),o;for(var i=e.length,u=0;o._state===ne&&i>u;u++)T(r.resolve(e[u]),void 0,t,n);return o}function W(e){var t=this;if(e&&"object"==typeof e&&e.constructor===t)return e;var n=new t(v);return P(n,e),n}function R(e){var t=this,n=new t(v);return x(n,e),n}function Z(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function D(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function H(e){this._id=le++,this._state=void 0,this._result=void 0,this._subscribers=[],v!==e&&(i(e)||Z(),this instanceof H||D(),S(this,e))}function I(){var e;if("undefined"!=typeof r)e=r;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=e.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(e.Promise=de)}var N;N=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var U,X,K,Y=N,$=0,G=({}.toString,function(e,t){te[$]=e,te[$+1]=t,$+=2,2===$&&(X?X(h):K())}),J="undefined"!=typeof window?window:void 0,B=J||{},V=B.MutationObserver||B.WebKitMutationObserver,Q="undefined"!=typeof n&&"[object process]"==={}.toString.call(n),ee="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,te=new Array(1e3);K=Q?c():V?p():ee?l():void 0===J&&"function"==typeof e?y():d();var ne=void 0,re=1,oe=2,ie=new A,ue=new A;q.prototype._validateInput=function(e){return Y(e)},q.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},q.prototype._init=function(){this._result=new Array(this.length)};var ae=q;q.prototype._enumerate=function(){for(var e=this,t=e.length,n=e.promise,r=e._input,o=0;n._state===ne&&t>o;o++)e._eachEntry(r[o],o)},q.prototype._eachEntry=function(e,t){var n=this,r=n._instanceConstructor;u(e)?e.constructor===r&&e._state!==ne?(e._onerror=null,n._settledAt(e._state,t,e._result)):n._willSettleAt(r.resolve(e),t):(n._remaining--,n._result[t]=e)},q.prototype._settledAt=function(e,t,n){var r=this,o=r.promise;o._state===ne&&(r._remaining--,e===oe?x(o,n):r._result[t]=n),0===r._remaining&&j(o,r._result)},q.prototype._willSettleAt=function(e,t){var n=this;T(e,void 0,function(e){n._settledAt(re,t,e)},function(e){n._settledAt(oe,t,e)})};var se=L,ce=F,fe=W,pe=R,le=0,de=H;H.all=se,H.race=ce,H.resolve=fe,H.reject=pe,H._setScheduler=a,H._setAsap=s,H._asap=G,H.prototype={constructor:H,then:function(e,t){var n=this,r=n._state;if(r===re&&!e||r===oe&&!t)return this;var o=new this.constructor(v),i=n._result;if(r){var u=arguments[r-1];G(function(){M(r,o,u,i)})}else T(n,o,e,t);return o},"catch":function(e){return this.then(null,e)}};var he=I,ye={Promise:de,polyfill:he};"function"==typeof define&&define.amd?define(function(){return ye}):"undefined"!=typeof t&&t.exports?t.exports=ye:"undefined"!=typeof this&&(this.ES6Promise=ye),he()}).call(this)}).call(this,{},"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);`;
  let registerPatch = `
  (function() {
    'use strict';

    let tagZones = new Map();
    let tagZoneStack = [];
    let callbackZoneStack = []
    let originalRegisterElement = document.registerElement;
    window._elementTagZones = tagZones;

    function forkStatsZone(parentZone, zoneStack, name) {
      let statsZone = parentZone.fork({
        'beforeTask': function () {
          // console.log('beforeTask', this.$id, this.tagName, this.name, this);

          if (zoneStack.length > 0) {
            // we're already in a zone, so pause its timers
            let oldZone = zoneStack[zoneStack.length - 1];
            let stats = oldZone.stats;
            let startTime = stats.startTime;
            if (startTime > 0) {
              let taskTime = performance.now() - startTime;
              stats.totalTime += taskTime;
              stats.startTime = 0;
            }
          }

          this.stats.startTime = performance.now();
          zoneStack.push(this);
        },

        'afterTask': function () {
          // console.log('afterTask', this.$id, this.tagName, this.name, this);
          let currentZone = zoneStack.pop();
          console.assert(currentZone === this, currentZone, this);

          let stats = this.stats;
          let taskTime = performance.now() - stats.startTime;
          stats.totalTime += taskTime;
          stats.startTime = 0;

          if (zoneStack.length > 0) {
            // restart the timer on the old zone
            let oldZone = zoneStack[zoneStack.length - 1];
            oldZone.stats.startTime = performance.now();
          }
        },
      });
      // console.log('resetting startTime (fork)', statsZone.$id);
      statsZone.stats = {
        totalTime: 0,
        startTime: 0,
      };
      if (name) {
        parentZone.stats[name] = statsZone.stats;
        statsZone.name = name;
      }
      return statsZone;
    }

    document.registerElement = function(tagName, options) {
      let clazz = options;
      // create a Zone to cover all tasks for element
      let tagZone = forkStatsZone(zone, tagZoneStack);
      tagZone.stats.tagName = tagZone.tagName = tagName;
      tagZone.stats.count = 0;
      tagZones.set(tagName, tagZone);

      let proto = options.prototype;
      let originalCreate = options.prototype.createdCallback;
      if (proto.createdCallback) {
        proto.createdCallback =
            forkStatsZone(tagZone, callbackZoneStack, 'created').bind(function() {
          tagZone.stats.count++;
          originalCreate.call(this);
        });
      }
      if (proto.attachedCallback) {
        proto.attachedCallback =
            forkStatsZone(tagZone, callbackZoneStack, 'attached').bind(proto.attachedCallback);
      }
      if (proto.detachedCallback) {
        proto.detachedCallback =
            forkStatsZone(tagZone, callbackZoneStack, 'detached').bind(proto.detachedCallback);
      }
      if (proto.attributeChangedCallback) {
        proto.attributeChangedCallback =
            forkStatsZone(tagZone, callbackZoneStack, 'attributeChanged').bind(proto.attributeChangedCallback);
      }

      // Running document.registerElement in the tagZone will cause zone.js
      // to bind all callbacks to tagZone
      forkStatsZone(tagZone, callbackZoneStack, 'register').run(function() {
        originalRegisterElement(tagName, options);
      });
    }

    //
    // Polymer-specific patching
    //

    var _Polymer;
    var _PolymerCalled = false;
    var _PolymerWrapper = function() {
      // console.log('_PolymerWrapper', _PolymerCalled);
      if (!_PolymerCalled) {
        _PolymerCalled = true;

        // patch Polymer.Async.run
        if (_PolymerWrapper.Async && _PolymerWrapper.Async.run) {
          let originalRun = _PolymerWrapper.Async.run;
          _PolymerWrapper.Async.run = function(callback, waitTime) {
            if (window.zone && !(waitTime > 0)) {
              callback = window.zone.bind(callback);
            }
            originalRun.call(this, callback, waitTime);
          }
        }

        // patch Polymer.RenderStatus.whenReady
        if (_PolymerWrapper.RenderStatus && _PolymerWrapper.RenderStatus.whenReady) {
          let originalWhenRead = _PolymerWrapper.RenderStatus.whenReady;
          _PolymerWrapper.RenderStatus.whenReady = function(cb) {
            if (window.zone && window.zone.bind) {
              cb = window.zone.bind(cb);
            }
            originalWhenRead.call(this, cb);
          };
        }
      }
      _Polymer.apply(this, arguments);
    }

    // replace window.Polymer with accessors so we can wrap calls to Polymer()
    Object.defineProperty(window, 'Polymer', {
      set: function(p) {
        if (p !== _PolymerWrapper) {
          _Polymer = p;
        }
      },
      get: function() {
        return (typeof _Polymer === 'function') ? _PolymerWrapper : _Polymer;
      },
    });

    // Listen for requests for timing data
    window.addEventListener('message', function(event) {
      // console.log("in-page message", event);
      if (event.data.messageType === 'get-element-stats') {
        let data = {};
        tagZones.forEach(function(v, k) {
          data[k] = v.stats;
        });
        event.source.postMessage({
          messageType: 'element-stats',
          data: data,
        }, '*');
      }
    });

    window._printElementStats = function() {
      for (let tagName of Array.from(tagZones.keys())) {
        let tagZone = tagZones.get(tagName);
        let stats = tagZone.stats;
        let calcedTotal =
          stats.register.totalTime +
          stats.created.totalTime;
        if (stats.attached) {
          calcedTotal += stats.attached.totalTime;
        }
        if (stats.detached) {
          calcedTotal += stats.detached.totalTime;
        }
        if (stats.attributeChanged) {
          calcedTotal += stats.attributeChanged.totalTime;
        }
        let data = {
          totalTime: stats.totalTime.toFixed(3),
          calcedTotal: calcedTotal.toFixed(3),
          register: stats.register.totalTime.toFixed(3),
          created: stats.created.totalTime.toFixed(3),
          attached: stats.attached && stats.attached.totalTime.toFixed(3),
          detached: stats.detached && stats.detached.totalTime.toFixed(3),
          attributeChanged: stats.attributeChanged && stats.attributeChanged.totalTime.toFixed(3),
        };
        console.log(tagName, data);
      }
    }
  })();
`;

  let script = document.createElement('script');
  script.appendChild(document.createTextNode(zonesSource));
  script.appendChild(document.createTextNode(registerPatch));
  (document.body || document.head || document.documentElement).appendChild(script);

  var backgroundPageConnection = chrome.runtime.connect({
    name: "element-zones",
  });

  backgroundPageConnection.onMessage.addListener(function(request, sender, sendResponse) {
    window.postMessage({
      messageType: 'get-element-stats',
    }, '*');
  });

  window.addEventListener("message", function(event) {
    if (event.data.messageType == "element-stats") {
      backgroundPageConnection.postMessage(event.data);
    }
  });

})();