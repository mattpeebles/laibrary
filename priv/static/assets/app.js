(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/phoenix_html/priv/static/phoenix_html.js
  var init_phoenix_html = __esm({
    "node_modules/phoenix_html/priv/static/phoenix_html.js"() {
      "use strict";
      (function() {
        var PolyfillEvent = eventConstructor();
        function eventConstructor() {
          if (typeof window.CustomEvent === "function")
            return window.CustomEvent;
          function CustomEvent2(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: void 0 };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
          }
          CustomEvent2.prototype = window.Event.prototype;
          return CustomEvent2;
        }
        function buildHiddenInput(name, value) {
          var input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          return input;
        }
        function handleClick(element, targetModifierKey) {
          var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), submit = document.createElement("input"), target = element.getAttribute("target");
          form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
          form.action = to;
          form.style.display = "none";
          if (target)
            form.target = target;
          else if (targetModifierKey)
            form.target = "_blank";
          form.appendChild(csrf);
          form.appendChild(method);
          document.body.appendChild(form);
          submit.type = "submit";
          form.appendChild(submit);
          submit.click();
        }
        window.addEventListener("click", function(e) {
          var element = e.target;
          if (e.defaultPrevented)
            return;
          while (element && element.getAttribute) {
            var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
              "bubbles": true,
              "cancelable": true
            });
            if (!element.dispatchEvent(phoenixLinkEvent)) {
              e.preventDefault();
              e.stopImmediatePropagation();
              return false;
            }
            if (element.getAttribute("data-method") && element.getAttribute("data-to")) {
              handleClick(element, e.metaKey || e.shiftKey);
              e.preventDefault();
              return false;
            } else {
              element = element.parentNode;
            }
          }
        }, false);
        window.addEventListener("phoenix.link.click", function(e) {
          var message = e.target.getAttribute("data-confirm");
          if (message && !window.confirm(message)) {
            e.preventDefault();
          }
        }, false);
      })();
    }
  });

  // node_modules/phoenix/priv/static/phoenix.mjs
  var closure, globalSelf, phxWindow, global, DEFAULT_VSN, SOCKET_STATES, DEFAULT_TIMEOUT, WS_CLOSE_NORMAL, CHANNEL_STATES, CHANNEL_EVENTS, TRANSPORTS, XHR_STATES, Push, Timer, Channel, Ajax, arrayBufferToBase64, LongPoll, serializer_default, Socket;
  var init_phoenix = __esm({
    "node_modules/phoenix/priv/static/phoenix.mjs"() {
      closure = (value) => {
        if (typeof value === "function") {
          return value;
        } else {
          let closure22 = function() {
            return value;
          };
          return closure22;
        }
      };
      globalSelf = typeof self !== "undefined" ? self : null;
      phxWindow = typeof window !== "undefined" ? window : null;
      global = globalSelf || phxWindow || global;
      DEFAULT_VSN = "2.0.0";
      SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
      DEFAULT_TIMEOUT = 1e4;
      WS_CLOSE_NORMAL = 1e3;
      CHANNEL_STATES = {
        closed: "closed",
        errored: "errored",
        joined: "joined",
        joining: "joining",
        leaving: "leaving"
      };
      CHANNEL_EVENTS = {
        close: "phx_close",
        error: "phx_error",
        join: "phx_join",
        reply: "phx_reply",
        leave: "phx_leave"
      };
      TRANSPORTS = {
        longpoll: "longpoll",
        websocket: "websocket"
      };
      XHR_STATES = {
        complete: 4
      };
      Push = class {
        constructor(channel, event, payload, timeout) {
          this.channel = channel;
          this.event = event;
          this.payload = payload || function() {
            return {};
          };
          this.receivedResp = null;
          this.timeout = timeout;
          this.timeoutTimer = null;
          this.recHooks = [];
          this.sent = false;
        }
        /**
         *
         * @param {number} timeout
         */
        resend(timeout) {
          this.timeout = timeout;
          this.reset();
          this.send();
        }
        /**
         *
         */
        send() {
          if (this.hasReceived("timeout")) {
            return;
          }
          this.startTimeout();
          this.sent = true;
          this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload(),
            ref: this.ref,
            join_ref: this.channel.joinRef()
          });
        }
        /**
         *
         * @param {*} status
         * @param {*} callback
         */
        receive(status, callback) {
          if (this.hasReceived(status)) {
            callback(this.receivedResp.response);
          }
          this.recHooks.push({ status, callback });
          return this;
        }
        /**
         * @private
         */
        reset() {
          this.cancelRefEvent();
          this.ref = null;
          this.refEvent = null;
          this.receivedResp = null;
          this.sent = false;
        }
        /**
         * @private
         */
        matchReceive({ status, response, _ref }) {
          this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
        }
        /**
         * @private
         */
        cancelRefEvent() {
          if (!this.refEvent) {
            return;
          }
          this.channel.off(this.refEvent);
        }
        /**
         * @private
         */
        cancelTimeout() {
          clearTimeout(this.timeoutTimer);
          this.timeoutTimer = null;
        }
        /**
         * @private
         */
        startTimeout() {
          if (this.timeoutTimer) {
            this.cancelTimeout();
          }
          this.ref = this.channel.socket.makeRef();
          this.refEvent = this.channel.replyEventName(this.ref);
          this.channel.on(this.refEvent, (payload) => {
            this.cancelRefEvent();
            this.cancelTimeout();
            this.receivedResp = payload;
            this.matchReceive(payload);
          });
          this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout);
        }
        /**
         * @private
         */
        hasReceived(status) {
          return this.receivedResp && this.receivedResp.status === status;
        }
        /**
         * @private
         */
        trigger(status, response) {
          this.channel.trigger(this.refEvent, { status, response });
        }
      };
      Timer = class {
        constructor(callback, timerCalc) {
          this.callback = callback;
          this.timerCalc = timerCalc;
          this.timer = null;
          this.tries = 0;
        }
        reset() {
          this.tries = 0;
          clearTimeout(this.timer);
        }
        /**
         * Cancels any previous scheduleTimeout and schedules callback
         */
        scheduleTimeout() {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.tries = this.tries + 1;
            this.callback();
          }, this.timerCalc(this.tries + 1));
        }
      };
      Channel = class {
        constructor(topic, params, socket) {
          this.state = CHANNEL_STATES.closed;
          this.topic = topic;
          this.params = closure(params || {});
          this.socket = socket;
          this.bindings = [];
          this.bindingRef = 0;
          this.timeout = this.socket.timeout;
          this.joinedOnce = false;
          this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
          this.pushBuffer = [];
          this.stateChangeRefs = [];
          this.rejoinTimer = new Timer(() => {
            if (this.socket.isConnected()) {
              this.rejoin();
            }
          }, this.socket.rejoinAfterMs);
          this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
          this.stateChangeRefs.push(
            this.socket.onOpen(() => {
              this.rejoinTimer.reset();
              if (this.isErrored()) {
                this.rejoin();
              }
            })
          );
          this.joinPush.receive("ok", () => {
            this.state = CHANNEL_STATES.joined;
            this.rejoinTimer.reset();
            this.pushBuffer.forEach((pushEvent) => pushEvent.send());
            this.pushBuffer = [];
          });
          this.joinPush.receive("error", () => {
            this.state = CHANNEL_STATES.errored;
            if (this.socket.isConnected()) {
              this.rejoinTimer.scheduleTimeout();
            }
          });
          this.onClose(() => {
            this.rejoinTimer.reset();
            if (this.socket.hasLogger())
              this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
            this.state = CHANNEL_STATES.closed;
            this.socket.remove(this);
          });
          this.onError((reason) => {
            if (this.socket.hasLogger())
              this.socket.log("channel", `error ${this.topic}`, reason);
            if (this.isJoining()) {
              this.joinPush.reset();
            }
            this.state = CHANNEL_STATES.errored;
            if (this.socket.isConnected()) {
              this.rejoinTimer.scheduleTimeout();
            }
          });
          this.joinPush.receive("timeout", () => {
            if (this.socket.hasLogger())
              this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
            let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
            leavePush.send();
            this.state = CHANNEL_STATES.errored;
            this.joinPush.reset();
            if (this.socket.isConnected()) {
              this.rejoinTimer.scheduleTimeout();
            }
          });
          this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
            this.trigger(this.replyEventName(ref), payload);
          });
        }
        /**
         * Join the channel
         * @param {integer} timeout
         * @returns {Push}
         */
        join(timeout = this.timeout) {
          if (this.joinedOnce) {
            throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
          } else {
            this.timeout = timeout;
            this.joinedOnce = true;
            this.rejoin();
            return this.joinPush;
          }
        }
        /**
         * Hook into channel close
         * @param {Function} callback
         */
        onClose(callback) {
          this.on(CHANNEL_EVENTS.close, callback);
        }
        /**
         * Hook into channel errors
         * @param {Function} callback
         */
        onError(callback) {
          return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
        }
        /**
         * Subscribes on channel events
         *
         * Subscription returns a ref counter, which can be used later to
         * unsubscribe the exact event listener
         *
         * @example
         * const ref1 = channel.on("event", do_stuff)
         * const ref2 = channel.on("event", do_other_stuff)
         * channel.off("event", ref1)
         * // Since unsubscription, do_stuff won't fire,
         * // while do_other_stuff will keep firing on the "event"
         *
         * @param {string} event
         * @param {Function} callback
         * @returns {integer} ref
         */
        on(event, callback) {
          let ref = this.bindingRef++;
          this.bindings.push({ event, ref, callback });
          return ref;
        }
        /**
         * Unsubscribes off of channel events
         *
         * Use the ref returned from a channel.on() to unsubscribe one
         * handler, or pass nothing for the ref to unsubscribe all
         * handlers for the given event.
         *
         * @example
         * // Unsubscribe the do_stuff handler
         * const ref1 = channel.on("event", do_stuff)
         * channel.off("event", ref1)
         *
         * // Unsubscribe all handlers from event
         * channel.off("event")
         *
         * @param {string} event
         * @param {integer} ref
         */
        off(event, ref) {
          this.bindings = this.bindings.filter((bind) => {
            return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
          });
        }
        /**
         * @private
         */
        canPush() {
          return this.socket.isConnected() && this.isJoined();
        }
        /**
         * Sends a message `event` to phoenix with the payload `payload`.
         * Phoenix receives this in the `handle_in(event, payload, socket)`
         * function. if phoenix replies or it times out (default 10000ms),
         * then optionally the reply can be received.
         *
         * @example
         * channel.push("event")
         *   .receive("ok", payload => console.log("phoenix replied:", payload))
         *   .receive("error", err => console.log("phoenix errored", err))
         *   .receive("timeout", () => console.log("timed out pushing"))
         * @param {string} event
         * @param {Object} payload
         * @param {number} [timeout]
         * @returns {Push}
         */
        push(event, payload, timeout = this.timeout) {
          payload = payload || {};
          if (!this.joinedOnce) {
            throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
          }
          let pushEvent = new Push(this, event, function() {
            return payload;
          }, timeout);
          if (this.canPush()) {
            pushEvent.send();
          } else {
            pushEvent.startTimeout();
            this.pushBuffer.push(pushEvent);
          }
          return pushEvent;
        }
        /** Leaves the channel
         *
         * Unsubscribes from server events, and
         * instructs channel to terminate on server
         *
         * Triggers onClose() hooks
         *
         * To receive leave acknowledgements, use the `receive`
         * hook to bind to the server ack, ie:
         *
         * @example
         * channel.leave().receive("ok", () => alert("left!") )
         *
         * @param {integer} timeout
         * @returns {Push}
         */
        leave(timeout = this.timeout) {
          this.rejoinTimer.reset();
          this.joinPush.cancelTimeout();
          this.state = CHANNEL_STATES.leaving;
          let onClose = () => {
            if (this.socket.hasLogger())
              this.socket.log("channel", `leave ${this.topic}`);
            this.trigger(CHANNEL_EVENTS.close, "leave");
          };
          let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
          leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
          leavePush.send();
          if (!this.canPush()) {
            leavePush.trigger("ok", {});
          }
          return leavePush;
        }
        /**
         * Overridable message hook
         *
         * Receives all events for specialized message handling
         * before dispatching to the channel callbacks.
         *
         * Must return the payload, modified or unmodified
         * @param {string} event
         * @param {Object} payload
         * @param {integer} ref
         * @returns {Object}
         */
        onMessage(_event, payload, _ref) {
          return payload;
        }
        /**
         * @private
         */
        isMember(topic, event, payload, joinRef) {
          if (this.topic !== topic) {
            return false;
          }
          if (joinRef && joinRef !== this.joinRef()) {
            if (this.socket.hasLogger())
              this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
            return false;
          } else {
            return true;
          }
        }
        /**
         * @private
         */
        joinRef() {
          return this.joinPush.ref;
        }
        /**
         * @private
         */
        rejoin(timeout = this.timeout) {
          if (this.isLeaving()) {
            return;
          }
          this.socket.leaveOpenTopic(this.topic);
          this.state = CHANNEL_STATES.joining;
          this.joinPush.resend(timeout);
        }
        /**
         * @private
         */
        trigger(event, payload, ref, joinRef) {
          let handledPayload = this.onMessage(event, payload, ref, joinRef);
          if (payload && !handledPayload) {
            throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
          }
          let eventBindings = this.bindings.filter((bind) => bind.event === event);
          for (let i = 0; i < eventBindings.length; i++) {
            let bind = eventBindings[i];
            bind.callback(handledPayload, ref, joinRef || this.joinRef());
          }
        }
        /**
         * @private
         */
        replyEventName(ref) {
          return `chan_reply_${ref}`;
        }
        /**
         * @private
         */
        isClosed() {
          return this.state === CHANNEL_STATES.closed;
        }
        /**
         * @private
         */
        isErrored() {
          return this.state === CHANNEL_STATES.errored;
        }
        /**
         * @private
         */
        isJoined() {
          return this.state === CHANNEL_STATES.joined;
        }
        /**
         * @private
         */
        isJoining() {
          return this.state === CHANNEL_STATES.joining;
        }
        /**
         * @private
         */
        isLeaving() {
          return this.state === CHANNEL_STATES.leaving;
        }
      };
      Ajax = class {
        static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
          if (global.XDomainRequest) {
            let req = new global.XDomainRequest();
            return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
          } else {
            let req = new global.XMLHttpRequest();
            return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
          }
        }
        static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
          req.timeout = timeout;
          req.open(method, endPoint);
          req.onload = () => {
            let response = this.parseJSON(req.responseText);
            callback && callback(response);
          };
          if (ontimeout) {
            req.ontimeout = ontimeout;
          }
          req.onprogress = () => {
          };
          req.send(body);
          return req;
        }
        static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
          req.open(method, endPoint, true);
          req.timeout = timeout;
          req.setRequestHeader("Content-Type", accept);
          req.onerror = () => callback && callback(null);
          req.onreadystatechange = () => {
            if (req.readyState === XHR_STATES.complete && callback) {
              let response = this.parseJSON(req.responseText);
              callback(response);
            }
          };
          if (ontimeout) {
            req.ontimeout = ontimeout;
          }
          req.send(body);
          return req;
        }
        static parseJSON(resp) {
          if (!resp || resp === "") {
            return null;
          }
          try {
            return JSON.parse(resp);
          } catch (e) {
            console && console.log("failed to parse JSON response", resp);
            return null;
          }
        }
        static serialize(obj, parentKey) {
          let queryStr = [];
          for (var key in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
              continue;
            }
            let paramKey = parentKey ? `${parentKey}[${key}]` : key;
            let paramVal = obj[key];
            if (typeof paramVal === "object") {
              queryStr.push(this.serialize(paramVal, paramKey));
            } else {
              queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
            }
          }
          return queryStr.join("&");
        }
        static appendParams(url, params) {
          if (Object.keys(params).length === 0) {
            return url;
          }
          let prefix = url.match(/\?/) ? "&" : "?";
          return `${url}${prefix}${this.serialize(params)}`;
        }
      };
      arrayBufferToBase64 = (buffer) => {
        let binary = "";
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      };
      LongPoll = class {
        constructor(endPoint) {
          this.endPoint = null;
          this.token = null;
          this.skipHeartbeat = true;
          this.reqs = /* @__PURE__ */ new Set();
          this.awaitingBatchAck = false;
          this.currentBatch = null;
          this.currentBatchTimer = null;
          this.batchBuffer = [];
          this.onopen = function() {
          };
          this.onerror = function() {
          };
          this.onmessage = function() {
          };
          this.onclose = function() {
          };
          this.pollEndpoint = this.normalizeEndpoint(endPoint);
          this.readyState = SOCKET_STATES.connecting;
          setTimeout(() => this.poll(), 0);
        }
        normalizeEndpoint(endPoint) {
          return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
        }
        endpointURL() {
          return Ajax.appendParams(this.pollEndpoint, { token: this.token });
        }
        closeAndRetry(code, reason, wasClean) {
          this.close(code, reason, wasClean);
          this.readyState = SOCKET_STATES.connecting;
        }
        ontimeout() {
          this.onerror("timeout");
          this.closeAndRetry(1005, "timeout", false);
        }
        isActive() {
          return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
        }
        poll() {
          this.ajax("GET", "application/json", null, () => this.ontimeout(), (resp) => {
            if (resp) {
              var { status, token, messages } = resp;
              this.token = token;
            } else {
              status = 0;
            }
            switch (status) {
              case 200:
                messages.forEach((msg) => {
                  setTimeout(() => this.onmessage({ data: msg }), 0);
                });
                this.poll();
                break;
              case 204:
                this.poll();
                break;
              case 410:
                this.readyState = SOCKET_STATES.open;
                this.onopen({});
                this.poll();
                break;
              case 403:
                this.onerror(403);
                this.close(1008, "forbidden", false);
                break;
              case 0:
              case 500:
                this.onerror(500);
                this.closeAndRetry(1011, "internal server error", 500);
                break;
              default:
                throw new Error(`unhandled poll status ${status}`);
            }
          });
        }
        // we collect all pushes within the current event loop by
        // setTimeout 0, which optimizes back-to-back procedural
        // pushes against an empty buffer
        send(body) {
          if (typeof body !== "string") {
            body = arrayBufferToBase64(body);
          }
          if (this.currentBatch) {
            this.currentBatch.push(body);
          } else if (this.awaitingBatchAck) {
            this.batchBuffer.push(body);
          } else {
            this.currentBatch = [body];
            this.currentBatchTimer = setTimeout(() => {
              this.batchSend(this.currentBatch);
              this.currentBatch = null;
            }, 0);
          }
        }
        batchSend(messages) {
          this.awaitingBatchAck = true;
          this.ajax("POST", "application/x-ndjson", messages.join("\n"), () => this.onerror("timeout"), (resp) => {
            this.awaitingBatchAck = false;
            if (!resp || resp.status !== 200) {
              this.onerror(resp && resp.status);
              this.closeAndRetry(1011, "internal server error", false);
            } else if (this.batchBuffer.length > 0) {
              this.batchSend(this.batchBuffer);
              this.batchBuffer = [];
            }
          });
        }
        close(code, reason, wasClean) {
          for (let req of this.reqs) {
            req.abort();
          }
          this.readyState = SOCKET_STATES.closed;
          let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
          this.batchBuffer = [];
          clearTimeout(this.currentBatchTimer);
          this.currentBatchTimer = null;
          if (typeof CloseEvent !== "undefined") {
            this.onclose(new CloseEvent("close", opts));
          } else {
            this.onclose(opts);
          }
        }
        ajax(method, contentType, body, onCallerTimeout, callback) {
          let req;
          let ontimeout = () => {
            this.reqs.delete(req);
            onCallerTimeout();
          };
          req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, (resp) => {
            this.reqs.delete(req);
            if (this.isActive()) {
              callback(resp);
            }
          });
          this.reqs.add(req);
        }
      };
      serializer_default = {
        HEADER_LENGTH: 1,
        META_LENGTH: 4,
        KINDS: { push: 0, reply: 1, broadcast: 2 },
        encode(msg, callback) {
          if (msg.payload.constructor === ArrayBuffer) {
            return callback(this.binaryEncode(msg));
          } else {
            let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
            return callback(JSON.stringify(payload));
          }
        },
        decode(rawPayload, callback) {
          if (rawPayload.constructor === ArrayBuffer) {
            return callback(this.binaryDecode(rawPayload));
          } else {
            let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
            return callback({ join_ref, ref, topic, event, payload });
          }
        },
        // private
        binaryEncode(message) {
          let { join_ref, ref, event, topic, payload } = message;
          let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
          let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
          let view = new DataView(header);
          let offset = 0;
          view.setUint8(offset++, this.KINDS.push);
          view.setUint8(offset++, join_ref.length);
          view.setUint8(offset++, ref.length);
          view.setUint8(offset++, topic.length);
          view.setUint8(offset++, event.length);
          Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
          Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
          Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
          Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
          var combined = new Uint8Array(header.byteLength + payload.byteLength);
          combined.set(new Uint8Array(header), 0);
          combined.set(new Uint8Array(payload), header.byteLength);
          return combined.buffer;
        },
        binaryDecode(buffer) {
          let view = new DataView(buffer);
          let kind = view.getUint8(0);
          let decoder = new TextDecoder();
          switch (kind) {
            case this.KINDS.push:
              return this.decodePush(buffer, view, decoder);
            case this.KINDS.reply:
              return this.decodeReply(buffer, view, decoder);
            case this.KINDS.broadcast:
              return this.decodeBroadcast(buffer, view, decoder);
          }
        },
        decodePush(buffer, view, decoder) {
          let joinRefSize = view.getUint8(1);
          let topicSize = view.getUint8(2);
          let eventSize = view.getUint8(3);
          let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
          let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
          offset = offset + joinRefSize;
          let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
          offset = offset + topicSize;
          let event = decoder.decode(buffer.slice(offset, offset + eventSize));
          offset = offset + eventSize;
          let data = buffer.slice(offset, buffer.byteLength);
          return { join_ref: joinRef, ref: null, topic, event, payload: data };
        },
        decodeReply(buffer, view, decoder) {
          let joinRefSize = view.getUint8(1);
          let refSize = view.getUint8(2);
          let topicSize = view.getUint8(3);
          let eventSize = view.getUint8(4);
          let offset = this.HEADER_LENGTH + this.META_LENGTH;
          let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
          offset = offset + joinRefSize;
          let ref = decoder.decode(buffer.slice(offset, offset + refSize));
          offset = offset + refSize;
          let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
          offset = offset + topicSize;
          let event = decoder.decode(buffer.slice(offset, offset + eventSize));
          offset = offset + eventSize;
          let data = buffer.slice(offset, buffer.byteLength);
          let payload = { status: event, response: data };
          return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
        },
        decodeBroadcast(buffer, view, decoder) {
          let topicSize = view.getUint8(1);
          let eventSize = view.getUint8(2);
          let offset = this.HEADER_LENGTH + 2;
          let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
          offset = offset + topicSize;
          let event = decoder.decode(buffer.slice(offset, offset + eventSize));
          offset = offset + eventSize;
          let data = buffer.slice(offset, buffer.byteLength);
          return { join_ref: null, ref: null, topic, event, payload: data };
        }
      };
      Socket = class {
        constructor(endPoint, opts = {}) {
          this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
          this.channels = [];
          this.sendBuffer = [];
          this.ref = 0;
          this.timeout = opts.timeout || DEFAULT_TIMEOUT;
          this.transport = opts.transport || global.WebSocket || LongPoll;
          this.primaryPassedHealthCheck = false;
          this.longPollFallbackMs = opts.longPollFallbackMs;
          this.fallbackTimer = null;
          this.sessionStore = opts.sessionStorage || global && global.sessionStorage;
          this.establishedConnections = 0;
          this.defaultEncoder = serializer_default.encode.bind(serializer_default);
          this.defaultDecoder = serializer_default.decode.bind(serializer_default);
          this.closeWasClean = false;
          this.disconnecting = false;
          this.binaryType = opts.binaryType || "arraybuffer";
          this.connectClock = 1;
          if (this.transport !== LongPoll) {
            this.encode = opts.encode || this.defaultEncoder;
            this.decode = opts.decode || this.defaultDecoder;
          } else {
            this.encode = this.defaultEncoder;
            this.decode = this.defaultDecoder;
          }
          let awaitingConnectionOnPageShow = null;
          if (phxWindow && phxWindow.addEventListener) {
            phxWindow.addEventListener("pagehide", (_e) => {
              if (this.conn) {
                this.disconnect();
                awaitingConnectionOnPageShow = this.connectClock;
              }
            });
            phxWindow.addEventListener("pageshow", (_e) => {
              if (awaitingConnectionOnPageShow === this.connectClock) {
                awaitingConnectionOnPageShow = null;
                this.connect();
              }
            });
          }
          this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
          this.rejoinAfterMs = (tries) => {
            if (opts.rejoinAfterMs) {
              return opts.rejoinAfterMs(tries);
            } else {
              return [1e3, 2e3, 5e3][tries - 1] || 1e4;
            }
          };
          this.reconnectAfterMs = (tries) => {
            if (opts.reconnectAfterMs) {
              return opts.reconnectAfterMs(tries);
            } else {
              return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
            }
          };
          this.logger = opts.logger || null;
          if (!this.logger && opts.debug) {
            this.logger = (kind, msg, data) => {
              console.log(`${kind}: ${msg}`, data);
            };
          }
          this.longpollerTimeout = opts.longpollerTimeout || 2e4;
          this.params = closure(opts.params || {});
          this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
          this.vsn = opts.vsn || DEFAULT_VSN;
          this.heartbeatTimeoutTimer = null;
          this.heartbeatTimer = null;
          this.pendingHeartbeatRef = null;
          this.reconnectTimer = new Timer(() => {
            this.teardown(() => this.connect());
          }, this.reconnectAfterMs);
        }
        /**
         * Returns the LongPoll transport reference
         */
        getLongPollTransport() {
          return LongPoll;
        }
        /**
         * Disconnects and replaces the active transport
         *
         * @param {Function} newTransport - The new transport class to instantiate
         *
         */
        replaceTransport(newTransport) {
          this.connectClock++;
          this.closeWasClean = true;
          clearTimeout(this.fallbackTimer);
          this.reconnectTimer.reset();
          if (this.conn) {
            this.conn.close();
            this.conn = null;
          }
          this.transport = newTransport;
        }
        /**
         * Returns the socket protocol
         *
         * @returns {string}
         */
        protocol() {
          return location.protocol.match(/^https/) ? "wss" : "ws";
        }
        /**
         * The fully qualified socket url
         *
         * @returns {string}
         */
        endPointURL() {
          let uri = Ajax.appendParams(
            Ajax.appendParams(this.endPoint, this.params()),
            { vsn: this.vsn }
          );
          if (uri.charAt(0) !== "/") {
            return uri;
          }
          if (uri.charAt(1) === "/") {
            return `${this.protocol()}:${uri}`;
          }
          return `${this.protocol()}://${location.host}${uri}`;
        }
        /**
         * Disconnects the socket
         *
         * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
         *
         * @param {Function} callback - Optional callback which is called after socket is disconnected.
         * @param {integer} code - A status code for disconnection (Optional).
         * @param {string} reason - A textual description of the reason to disconnect. (Optional)
         */
        disconnect(callback, code, reason) {
          this.connectClock++;
          this.disconnecting = true;
          this.closeWasClean = true;
          clearTimeout(this.fallbackTimer);
          this.reconnectTimer.reset();
          this.teardown(() => {
            this.disconnecting = false;
            callback && callback();
          }, code, reason);
        }
        /**
         *
         * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
         *
         * Passing params to connect is deprecated; pass them in the Socket constructor instead:
         * `new Socket("/socket", {params: {user_id: userToken}})`.
         */
        connect(params) {
          if (params) {
            console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
            this.params = closure(params);
          }
          if (this.conn && !this.disconnecting) {
            return;
          }
          if (this.longPollFallbackMs && this.transport !== LongPoll) {
            this.connectWithFallback(LongPoll, this.longPollFallbackMs);
          } else {
            this.transportConnect();
          }
        }
        /**
         * Logs the message. Override `this.logger` for specialized logging. noops by default
         * @param {string} kind
         * @param {string} msg
         * @param {Object} data
         */
        log(kind, msg, data) {
          this.logger && this.logger(kind, msg, data);
        }
        /**
         * Returns true if a logger has been set on this socket.
         */
        hasLogger() {
          return this.logger !== null;
        }
        /**
         * Registers callbacks for connection open events
         *
         * @example socket.onOpen(function(){ console.info("the socket was opened") })
         *
         * @param {Function} callback
         */
        onOpen(callback) {
          let ref = this.makeRef();
          this.stateChangeCallbacks.open.push([ref, callback]);
          return ref;
        }
        /**
         * Registers callbacks for connection close events
         * @param {Function} callback
         */
        onClose(callback) {
          let ref = this.makeRef();
          this.stateChangeCallbacks.close.push([ref, callback]);
          return ref;
        }
        /**
         * Registers callbacks for connection error events
         *
         * @example socket.onError(function(error){ alert("An error occurred") })
         *
         * @param {Function} callback
         */
        onError(callback) {
          let ref = this.makeRef();
          this.stateChangeCallbacks.error.push([ref, callback]);
          return ref;
        }
        /**
         * Registers callbacks for connection message events
         * @param {Function} callback
         */
        onMessage(callback) {
          let ref = this.makeRef();
          this.stateChangeCallbacks.message.push([ref, callback]);
          return ref;
        }
        /**
         * Pings the server and invokes the callback with the RTT in milliseconds
         * @param {Function} callback
         *
         * Returns true if the ping was pushed or false if unable to be pushed.
         */
        ping(callback) {
          if (!this.isConnected()) {
            return false;
          }
          let ref = this.makeRef();
          let startTime = Date.now();
          this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
          let onMsgRef = this.onMessage((msg) => {
            if (msg.ref === ref) {
              this.off([onMsgRef]);
              callback(Date.now() - startTime);
            }
          });
          return true;
        }
        /**
         * @private
         */
        transportConnect() {
          this.connectClock++;
          this.closeWasClean = false;
          this.conn = new this.transport(this.endPointURL());
          this.conn.binaryType = this.binaryType;
          this.conn.timeout = this.longpollerTimeout;
          this.conn.onopen = () => this.onConnOpen();
          this.conn.onerror = (error) => this.onConnError(error);
          this.conn.onmessage = (event) => this.onConnMessage(event);
          this.conn.onclose = (event) => this.onConnClose(event);
        }
        getSession(key) {
          return this.sessionStore && this.sessionStore.getItem(key);
        }
        storeSession(key, val) {
          this.sessionStore && this.sessionStore.setItem(key, val);
        }
        connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
          clearTimeout(this.fallbackTimer);
          let established = false;
          let primaryTransport = true;
          let openRef, errorRef;
          let fallback = (reason) => {
            this.log("transport", `falling back to ${fallbackTransport.name}...`, reason);
            this.off([openRef, errorRef]);
            primaryTransport = false;
            this.replaceTransport(fallbackTransport);
            this.transportConnect();
          };
          if (this.getSession(`phx:fallback:${fallbackTransport.name}`)) {
            return fallback("memorized");
          }
          this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
          errorRef = this.onError((reason) => {
            this.log("transport", "error", reason);
            if (primaryTransport && !established) {
              clearTimeout(this.fallbackTimer);
              fallback(reason);
            }
          });
          this.onOpen(() => {
            established = true;
            if (!primaryTransport) {
              if (!this.primaryPassedHealthCheck) {
                this.storeSession(`phx:fallback:${fallbackTransport.name}`, "true");
              }
              return this.log("transport", `established ${fallbackTransport.name} fallback`);
            }
            clearTimeout(this.fallbackTimer);
            this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
            this.ping((rtt) => {
              this.log("transport", "connected to primary after", rtt);
              this.primaryPassedHealthCheck = true;
              clearTimeout(this.fallbackTimer);
            });
          });
          this.transportConnect();
        }
        clearHeartbeats() {
          clearTimeout(this.heartbeatTimer);
          clearTimeout(this.heartbeatTimeoutTimer);
        }
        onConnOpen() {
          if (this.hasLogger())
            this.log("transport", `${this.transport.name} connected to ${this.endPointURL()}`);
          this.closeWasClean = false;
          this.disconnecting = false;
          this.establishedConnections++;
          this.flushSendBuffer();
          this.reconnectTimer.reset();
          this.resetHeartbeat();
          this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
        }
        /**
         * @private
         */
        heartbeatTimeout() {
          if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
            if (this.hasLogger()) {
              this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            }
            this.triggerChanError();
            this.closeWasClean = false;
            this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
          }
        }
        resetHeartbeat() {
          if (this.conn && this.conn.skipHeartbeat) {
            return;
          }
          this.pendingHeartbeatRef = null;
          this.clearHeartbeats();
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        teardown(callback, code, reason) {
          if (!this.conn) {
            return callback && callback();
          }
          let connectClock = this.connectClock;
          this.waitForBufferDone(() => {
            if (connectClock !== this.connectClock) {
              return;
            }
            if (this.conn) {
              if (code) {
                this.conn.close(code, reason || "");
              } else {
                this.conn.close();
              }
            }
            this.waitForSocketClosed(() => {
              if (connectClock !== this.connectClock) {
                return;
              }
              if (this.conn) {
                this.conn.onopen = function() {
                };
                this.conn.onerror = function() {
                };
                this.conn.onmessage = function() {
                };
                this.conn.onclose = function() {
                };
                this.conn = null;
              }
              callback && callback();
            });
          });
        }
        waitForBufferDone(callback, tries = 1) {
          if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
            callback();
            return;
          }
          setTimeout(() => {
            this.waitForBufferDone(callback, tries + 1);
          }, 150 * tries);
        }
        waitForSocketClosed(callback, tries = 1) {
          if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
            callback();
            return;
          }
          setTimeout(() => {
            this.waitForSocketClosed(callback, tries + 1);
          }, 150 * tries);
        }
        onConnClose(event) {
          let closeCode = event && event.code;
          if (this.hasLogger())
            this.log("transport", "close", event);
          this.triggerChanError();
          this.clearHeartbeats();
          if (!this.closeWasClean && closeCode !== 1e3) {
            this.reconnectTimer.scheduleTimeout();
          }
          this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
        }
        /**
         * @private
         */
        onConnError(error) {
          if (this.hasLogger())
            this.log("transport", error);
          let transportBefore = this.transport;
          let establishedBefore = this.establishedConnections;
          this.stateChangeCallbacks.error.forEach(([, callback]) => {
            callback(error, transportBefore, establishedBefore);
          });
          if (transportBefore === this.transport || establishedBefore > 0) {
            this.triggerChanError();
          }
        }
        /**
         * @private
         */
        triggerChanError() {
          this.channels.forEach((channel) => {
            if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
              channel.trigger(CHANNEL_EVENTS.error);
            }
          });
        }
        /**
         * @returns {string}
         */
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case SOCKET_STATES.connecting:
              return "connecting";
            case SOCKET_STATES.open:
              return "open";
            case SOCKET_STATES.closing:
              return "closing";
            default:
              return "closed";
          }
        }
        /**
         * @returns {boolean}
         */
        isConnected() {
          return this.connectionState() === "open";
        }
        /**
         * @private
         *
         * @param {Channel}
         */
        remove(channel) {
          this.off(channel.stateChangeRefs);
          this.channels = this.channels.filter((c) => c !== channel);
        }
        /**
         * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
         *
         * @param {refs} - list of refs returned by calls to
         *                 `onOpen`, `onClose`, `onError,` and `onMessage`
         */
        off(refs) {
          for (let key in this.stateChangeCallbacks) {
            this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
              return refs.indexOf(ref) === -1;
            });
          }
        }
        /**
         * Initiates a new channel for the given topic
         *
         * @param {string} topic
         * @param {Object} chanParams - Parameters for the channel
         * @returns {Channel}
         */
        channel(topic, chanParams = {}) {
          let chan = new Channel(topic, chanParams, this);
          this.channels.push(chan);
          return chan;
        }
        /**
         * @param {Object} data
         */
        push(data) {
          if (this.hasLogger()) {
            let { topic, event, payload, ref, join_ref } = data;
            this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
          }
          if (this.isConnected()) {
            this.encode(data, (result) => this.conn.send(result));
          } else {
            this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
          }
        }
        /**
         * Return the next message ref, accounting for overflows
         * @returns {string}
         */
        makeRef() {
          let newRef = this.ref + 1;
          if (newRef === this.ref) {
            this.ref = 0;
          } else {
            this.ref = newRef;
          }
          return this.ref.toString();
        }
        sendHeartbeat() {
          if (this.pendingHeartbeatRef && !this.isConnected()) {
            return;
          }
          this.pendingHeartbeatRef = this.makeRef();
          this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
          this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
        }
        flushSendBuffer() {
          if (this.isConnected() && this.sendBuffer.length > 0) {
            this.sendBuffer.forEach((callback) => callback());
            this.sendBuffer = [];
          }
        }
        onConnMessage(rawMessage) {
          this.decode(rawMessage.data, (msg) => {
            let { topic, event, payload, ref, join_ref } = msg;
            if (ref && ref === this.pendingHeartbeatRef) {
              this.clearHeartbeats();
              this.pendingHeartbeatRef = null;
              this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
            }
            if (this.hasLogger())
              this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
            for (let i = 0; i < this.channels.length; i++) {
              const channel = this.channels[i];
              if (!channel.isMember(topic, event, payload, join_ref)) {
                continue;
              }
              channel.trigger(event, payload, ref, join_ref);
            }
            for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
              let [, callback] = this.stateChangeCallbacks.message[i];
              callback(msg);
            }
          });
        }
        leaveOpenTopic(topic) {
          let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
          if (dupChannel) {
            if (this.hasLogger())
              this.log("transport", `leaving duplicate topic "${topic}"`);
            dupChannel.leave();
          }
        }
      };
    }
  });

  // node_modules/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  function detectDuplicateIds() {
    let ids = /* @__PURE__ */ new Set();
    let elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(`Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i].id);
      }
    }
  }
  function detectInvalidStreamInserts(inserts) {
    const errors = /* @__PURE__ */ new Set();
    Object.keys(inserts).forEach((id) => {
      const streamEl = document.getElementById(id);
      if (streamEl && streamEl.parentElement && streamEl.parentElement.getAttribute("phx-update") !== "stream") {
        errors.add(`The stream container with id "${streamEl.parentElement.id}" is missing the phx-update="stream" attribute. Ensure it is set for streams to work properly.`);
      }
    });
    errors.forEach((error) => console.error(error));
  }
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
      attr = toNodeAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
      attr = fromNodeAttrs[d];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML" || fromNode.nodeName === "BODY") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else {
          toNode = toElement(toNode);
        }
      } else if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
        toNode = toNode.firstElementChild;
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var skipFromChildren = options.skipFromChildren || noop;
      var addChild = options.addChild || function(parent, child) {
        return parent.appendChild(child);
      };
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = /* @__PURE__ */ Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(
              curFromNodeChild,
              fromEl,
              true
              /* skip keyed nodes */
            );
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          var beforeUpdateResult = onBeforeElUpdated(fromEl, toEl);
          if (beforeUpdateResult === false) {
            return;
          } else if (beforeUpdateResult instanceof HTMLElement) {
            fromEl = beforeUpdateResult;
            indexTree(fromEl);
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var skipFrom = skipFromChildren(fromEl, toEl);
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (!skipFrom && curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(
                              curFromNodeChild,
                              fromEl,
                              true
                              /* skip keyed nodes */
                            );
                          }
                          curFromNodeChild = matchingFromEl;
                          curFromNodeKey = getNodeKey(curFromNodeChild);
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(
                  curFromNodeChild,
                  fromEl,
                  true
                  /* skip keyed nodes */
                );
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              if (!skipFrom) {
                addChild(fromEl, matchingFromEl);
              }
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                addChild(fromEl, curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var CONSECUTIVE_RELOADS, MAX_RELOADS, RELOAD_JITTER_MIN, RELOAD_JITTER_MAX, FAILSAFE_JITTER, PHX_EVENT_CLASSES, PHX_COMPONENT, PHX_LIVE_LINK, PHX_TRACK_STATIC, PHX_LINK_STATE, PHX_REF_LOADING, PHX_REF_SRC, PHX_REF_LOCK, PHX_PENDING_REFS, PHX_TRACK_UPLOADS, PHX_UPLOAD_REF, PHX_PREFLIGHTED_REFS, PHX_DONE_REFS, PHX_DROP_TARGET, PHX_ACTIVE_ENTRY_REFS, PHX_LIVE_FILE_UPDATED, PHX_SKIP, PHX_MAGIC_ID, PHX_PRUNE, PHX_CONNECTED_CLASS, PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS, PHX_SERVER_ERROR_CLASS, PHX_PARENT_ID, PHX_MAIN, PHX_ROOT_ID, PHX_VIEWPORT_TOP, PHX_VIEWPORT_BOTTOM, PHX_TRIGGER_ACTION, PHX_HAS_FOCUSED, FOCUSABLE_INPUTS, CHECKABLE_INPUTS, PHX_HAS_SUBMITTED, PHX_SESSION, PHX_VIEW_SELECTOR, PHX_STICKY, PHX_STATIC, PHX_READONLY, PHX_DISABLED, PHX_DISABLE_WITH, PHX_DISABLE_WITH_RESTORE, PHX_HOOK, PHX_DEBOUNCE, PHX_THROTTLE, PHX_UPDATE, PHX_STREAM, PHX_STREAM_REF, PHX_KEY, PHX_PRIVATE, PHX_AUTO_RECOVER, PHX_LV_DEBUG, PHX_LV_PROFILE, PHX_LV_LATENCY_SIM, PHX_LV_HISTORY_POSITION, PHX_PROGRESS, PHX_MOUNTED, PHX_RELOAD_STATUS, LOADER_TIMEOUT, MAX_CHILD_JOIN_ATTEMPTS, BEFORE_UNLOAD_LOADER_TIMEOUT, DISCONNECTED_TIMEOUT, BINDING_PREFIX, PUSH_TIMEOUT, DEBOUNCE_TRIGGER, THROTTLED, DEBOUNCE_PREV_KEY, DEFAULTS, PHX_PENDING_ATTRS, DYNAMICS, STATIC, ROOT, COMPONENTS, EVENTS, REPLY, TITLE, TEMPLATES, STREAM, EntryUploader, logError, isCid, debug, closure2, clone, closestPhxBinding, isObject, isEqualObj, isEmpty, maybe, channelUploader, Browser, browser_default, DOM, dom_default, UploadEntry, liveUploaderFileRef, LiveUploader, ARIA, aria_default, Hooks, findScrollContainer, scrollTop, bottom, top, isAtViewportTop, isAtViewportBottom, isWithinViewport, hooks_default, ElementRef, DOMPostMorphRestorer, DOCUMENT_FRAGMENT_NODE, range, NS_XHTML, doc, HAS_TEMPLATE_SUPPORT, HAS_RANGE_SUPPORT, specialElHandlers, ELEMENT_NODE, DOCUMENT_FRAGMENT_NODE$1, TEXT_NODE, COMMENT_NODE, morphdom, morphdom_esm_default, DOMPatch, VOID_TAGS, quoteChars, modifyRoot, Rendered, focusStack, default_transition_time, JS, js_default, HOOK_ID, viewHookID, ViewHook, prependFormDataKey, serializeForm, View, LiveSocket, TransitionSet;
  var init_phoenix_live_view_esm = __esm({
    "node_modules/phoenix_live_view/priv/static/phoenix_live_view.esm.js"() {
      CONSECUTIVE_RELOADS = "consecutive-reloads";
      MAX_RELOADS = 10;
      RELOAD_JITTER_MIN = 5e3;
      RELOAD_JITTER_MAX = 1e4;
      FAILSAFE_JITTER = 3e4;
      PHX_EVENT_CLASSES = [
        "phx-click-loading",
        "phx-change-loading",
        "phx-submit-loading",
        "phx-keydown-loading",
        "phx-keyup-loading",
        "phx-blur-loading",
        "phx-focus-loading",
        "phx-hook-loading"
      ];
      PHX_COMPONENT = "data-phx-component";
      PHX_LIVE_LINK = "data-phx-link";
      PHX_TRACK_STATIC = "track-static";
      PHX_LINK_STATE = "data-phx-link-state";
      PHX_REF_LOADING = "data-phx-ref-loading";
      PHX_REF_SRC = "data-phx-ref-src";
      PHX_REF_LOCK = "data-phx-ref-lock";
      PHX_PENDING_REFS = "phx-pending-refs";
      PHX_TRACK_UPLOADS = "track-uploads";
      PHX_UPLOAD_REF = "data-phx-upload-ref";
      PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
      PHX_DONE_REFS = "data-phx-done-refs";
      PHX_DROP_TARGET = "drop-target";
      PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
      PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
      PHX_SKIP = "data-phx-skip";
      PHX_MAGIC_ID = "data-phx-id";
      PHX_PRUNE = "data-phx-prune";
      PHX_CONNECTED_CLASS = "phx-connected";
      PHX_LOADING_CLASS = "phx-loading";
      PHX_ERROR_CLASS = "phx-error";
      PHX_CLIENT_ERROR_CLASS = "phx-client-error";
      PHX_SERVER_ERROR_CLASS = "phx-server-error";
      PHX_PARENT_ID = "data-phx-parent-id";
      PHX_MAIN = "data-phx-main";
      PHX_ROOT_ID = "data-phx-root-id";
      PHX_VIEWPORT_TOP = "viewport-top";
      PHX_VIEWPORT_BOTTOM = "viewport-bottom";
      PHX_TRIGGER_ACTION = "trigger-action";
      PHX_HAS_FOCUSED = "phx-has-focused";
      FOCUSABLE_INPUTS = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time", "datetime-local", "color", "range"];
      CHECKABLE_INPUTS = ["checkbox", "radio"];
      PHX_HAS_SUBMITTED = "phx-has-submitted";
      PHX_SESSION = "data-phx-session";
      PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
      PHX_STICKY = "data-phx-sticky";
      PHX_STATIC = "data-phx-static";
      PHX_READONLY = "data-phx-readonly";
      PHX_DISABLED = "data-phx-disabled";
      PHX_DISABLE_WITH = "disable-with";
      PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
      PHX_HOOK = "hook";
      PHX_DEBOUNCE = "debounce";
      PHX_THROTTLE = "throttle";
      PHX_UPDATE = "update";
      PHX_STREAM = "stream";
      PHX_STREAM_REF = "data-phx-stream";
      PHX_KEY = "key";
      PHX_PRIVATE = "phxPrivate";
      PHX_AUTO_RECOVER = "auto-recover";
      PHX_LV_DEBUG = "phx:live-socket:debug";
      PHX_LV_PROFILE = "phx:live-socket:profiling";
      PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
      PHX_LV_HISTORY_POSITION = "phx:nav-history-position";
      PHX_PROGRESS = "progress";
      PHX_MOUNTED = "mounted";
      PHX_RELOAD_STATUS = "__phoenix_reload_status__";
      LOADER_TIMEOUT = 1;
      MAX_CHILD_JOIN_ATTEMPTS = 3;
      BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
      DISCONNECTED_TIMEOUT = 500;
      BINDING_PREFIX = "phx-";
      PUSH_TIMEOUT = 3e4;
      DEBOUNCE_TRIGGER = "debounce-trigger";
      THROTTLED = "throttled";
      DEBOUNCE_PREV_KEY = "debounce-prev-key";
      DEFAULTS = {
        debounce: 300,
        throttle: 300
      };
      PHX_PENDING_ATTRS = [PHX_REF_LOADING, PHX_REF_SRC, PHX_REF_LOCK];
      DYNAMICS = "d";
      STATIC = "s";
      ROOT = "r";
      COMPONENTS = "c";
      EVENTS = "e";
      REPLY = "r";
      TITLE = "t";
      TEMPLATES = "p";
      STREAM = "stream";
      EntryUploader = class {
        constructor(entry, config, liveSocket) {
          let { chunk_size, chunk_timeout } = config;
          this.liveSocket = liveSocket;
          this.entry = entry;
          this.offset = 0;
          this.chunkSize = chunk_size;
          this.chunkTimeout = chunk_timeout;
          this.chunkTimer = null;
          this.errored = false;
          this.uploadChannel = liveSocket.channel(`lvu:${entry.ref}`, { token: entry.metadata() });
        }
        error(reason) {
          if (this.errored) {
            return;
          }
          this.uploadChannel.leave();
          this.errored = true;
          clearTimeout(this.chunkTimer);
          this.entry.error(reason);
        }
        upload() {
          this.uploadChannel.onError((reason) => this.error(reason));
          this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", (reason) => this.error(reason));
        }
        isDone() {
          return this.offset >= this.entry.file.size;
        }
        readNextChunk() {
          let reader = new window.FileReader();
          let blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
          reader.onload = (e) => {
            if (e.target.error === null) {
              this.offset += e.target.result.byteLength;
              this.pushChunk(e.target.result);
            } else {
              return logError("Read error: " + e.target.error);
            }
          };
          reader.readAsArrayBuffer(blob);
        }
        pushChunk(chunk) {
          if (!this.uploadChannel.isJoined()) {
            return;
          }
          this.uploadChannel.push("chunk", chunk, this.chunkTimeout).receive("ok", () => {
            this.entry.progress(this.offset / this.entry.file.size * 100);
            if (!this.isDone()) {
              this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
            }
          }).receive("error", ({ reason }) => this.error(reason));
        }
      };
      logError = (msg, obj) => console.error && console.error(msg, obj);
      isCid = (cid) => {
        let type = typeof cid;
        return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
      };
      debug = (view, kind, msg, obj) => {
        if (view.liveSocket.isDebugEnabled()) {
          console.log(`${view.id} ${kind}: ${msg} - `, obj);
        }
      };
      closure2 = (val) => typeof val === "function" ? val : function() {
        return val;
      };
      clone = (obj) => {
        return JSON.parse(JSON.stringify(obj));
      };
      closestPhxBinding = (el, binding, borderEl) => {
        do {
          if (el.matches(`[${binding}]`) && !el.disabled) {
            return el;
          }
          el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
        return null;
      };
      isObject = (obj) => {
        return obj !== null && typeof obj === "object" && !(obj instanceof Array);
      };
      isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
      isEmpty = (obj) => {
        for (let x in obj) {
          return false;
        }
        return true;
      };
      maybe = (el, callback) => el && callback(el);
      channelUploader = function(entries, onError, resp, liveSocket) {
        entries.forEach((entry) => {
          let entryUploader = new EntryUploader(entry, resp.config, liveSocket);
          entryUploader.upload();
        });
      };
      Browser = {
        canPushState() {
          return typeof history.pushState !== "undefined";
        },
        dropLocal(localStorage, namespace, subkey) {
          return localStorage.removeItem(this.localKey(namespace, subkey));
        },
        updateLocal(localStorage, namespace, subkey, initial, func) {
          let current = this.getLocal(localStorage, namespace, subkey);
          let key = this.localKey(namespace, subkey);
          let newVal = current === null ? initial : func(current);
          localStorage.setItem(key, JSON.stringify(newVal));
          return newVal;
        },
        getLocal(localStorage, namespace, subkey) {
          return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
        },
        updateCurrentState(callback) {
          if (!this.canPushState()) {
            return;
          }
          history.replaceState(callback(history.state || {}), "", window.location.href);
        },
        pushState(kind, meta, to) {
          if (this.canPushState()) {
            if (to !== window.location.href) {
              if (meta.type == "redirect" && meta.scroll) {
                let currentState = history.state || {};
                currentState.scroll = meta.scroll;
                history.replaceState(currentState, "", window.location.href);
              }
              delete meta.scroll;
              history[kind + "State"](meta, "", to || null);
              window.requestAnimationFrame(() => {
                let hashEl = this.getHashTargetEl(window.location.hash);
                if (hashEl) {
                  hashEl.scrollIntoView();
                } else if (meta.type === "redirect") {
                  window.scroll(0, 0);
                }
              });
            }
          } else {
            this.redirect(to);
          }
        },
        setCookie(name, value, maxAgeSeconds) {
          let expires = typeof maxAgeSeconds === "number" ? ` max-age=${maxAgeSeconds};` : "";
          document.cookie = `${name}=${value};${expires} path=/`;
        },
        getCookie(name) {
          return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
        },
        deleteCookie(name) {
          document.cookie = `${name}=; max-age=-1; path=/`;
        },
        redirect(toURL, flash) {
          if (flash) {
            this.setCookie("__phoenix_flash__", flash, 60);
          }
          window.location = toURL;
        },
        localKey(namespace, subkey) {
          return `${namespace}-${subkey}`;
        },
        getHashTargetEl(maybeHash) {
          let hash = maybeHash.toString().substring(1);
          if (hash === "") {
            return;
          }
          return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
        }
      };
      browser_default = Browser;
      DOM = {
        byId(id) {
          return document.getElementById(id) || logError(`no id found for ${id}`);
        },
        removeClass(el, className) {
          el.classList.remove(className);
          if (el.classList.length === 0) {
            el.removeAttribute("class");
          }
        },
        all(node, query, callback) {
          if (!node) {
            return [];
          }
          let array = Array.from(node.querySelectorAll(query));
          return callback ? array.forEach(callback) : array;
        },
        childNodeLength(html) {
          let template = document.createElement("template");
          template.innerHTML = html;
          return template.content.childElementCount;
        },
        isUploadInput(el) {
          return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
        },
        isAutoUpload(inputEl) {
          return inputEl.hasAttribute("data-phx-auto-upload");
        },
        findUploadInputs(node) {
          const formId = node.id;
          const inputsOutsideForm = this.all(document, `input[type="file"][${PHX_UPLOAD_REF}][form="${formId}"]`);
          return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`).concat(inputsOutsideForm);
        },
        findComponentNodeList(node, cid) {
          return this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node);
        },
        isPhxDestroyed(node) {
          return node.id && DOM.private(node, "destroyed") ? true : false;
        },
        wantsNewTab(e) {
          let wantsNewTab = e.ctrlKey || e.shiftKey || e.metaKey || e.button && e.button === 1;
          let isDownload = e.target instanceof HTMLAnchorElement && e.target.hasAttribute("download");
          let isTargetBlank = e.target.hasAttribute("target") && e.target.getAttribute("target").toLowerCase() === "_blank";
          let isTargetNamedTab = e.target.hasAttribute("target") && !e.target.getAttribute("target").startsWith("_");
          return wantsNewTab || isTargetBlank || isDownload || isTargetNamedTab;
        },
        isUnloadableFormSubmit(e) {
          let isDialogSubmit = e.target && e.target.getAttribute("method") === "dialog" || e.submitter && e.submitter.getAttribute("formmethod") === "dialog";
          if (isDialogSubmit) {
            return false;
          } else {
            return !e.defaultPrevented && !this.wantsNewTab(e);
          }
        },
        isNewPageClick(e, currentLocation) {
          let href = e.target instanceof HTMLAnchorElement ? e.target.getAttribute("href") : null;
          let url;
          if (e.defaultPrevented || href === null || this.wantsNewTab(e)) {
            return false;
          }
          if (href.startsWith("mailto:") || href.startsWith("tel:")) {
            return false;
          }
          if (e.target.isContentEditable) {
            return false;
          }
          try {
            url = new URL(href);
          } catch (e2) {
            try {
              url = new URL(href, currentLocation);
            } catch (e3) {
              return true;
            }
          }
          if (url.host === currentLocation.host && url.protocol === currentLocation.protocol) {
            if (url.pathname === currentLocation.pathname && url.search === currentLocation.search) {
              return url.hash === "" && !url.href.endsWith("#");
            }
          }
          return url.protocol.startsWith("http");
        },
        markPhxChildDestroyed(el) {
          if (this.isPhxChild(el)) {
            el.setAttribute(PHX_SESSION, "");
          }
          this.putPrivate(el, "destroyed", true);
        },
        findPhxChildrenInFragment(html, parentId) {
          let template = document.createElement("template");
          template.innerHTML = html;
          return this.findPhxChildren(template.content, parentId);
        },
        isIgnored(el, phxUpdate) {
          return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
        },
        isPhxUpdate(el, phxUpdate, updateTypes) {
          return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
        },
        findPhxSticky(el) {
          return this.all(el, `[${PHX_STICKY}]`);
        },
        findPhxChildren(el, parentId) {
          return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
        },
        findExistingParentCIDs(node, cids) {
          let parentCids = /* @__PURE__ */ new Set();
          let childrenCids = /* @__PURE__ */ new Set();
          cids.forEach((cid) => {
            this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node).forEach((parent) => {
              parentCids.add(cid);
              this.filterWithinSameLiveView(this.all(parent, `[${PHX_COMPONENT}]`), parent).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => childrenCids.add(childCID));
            });
          });
          childrenCids.forEach((childCid) => parentCids.delete(childCid));
          return parentCids;
        },
        filterWithinSameLiveView(nodes, parent) {
          if (parent.querySelector(PHX_VIEW_SELECTOR)) {
            return nodes.filter((el) => this.withinSameLiveView(el, parent));
          } else {
            return nodes;
          }
        },
        withinSameLiveView(node, parent) {
          while (node = node.parentNode) {
            if (node.isSameNode(parent)) {
              return true;
            }
            if (node.getAttribute(PHX_SESSION) !== null) {
              return false;
            }
          }
        },
        private(el, key) {
          return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
        },
        deletePrivate(el, key) {
          el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
        },
        putPrivate(el, key, value) {
          if (!el[PHX_PRIVATE]) {
            el[PHX_PRIVATE] = {};
          }
          el[PHX_PRIVATE][key] = value;
        },
        updatePrivate(el, key, defaultVal, updateFunc) {
          let existing = this.private(el, key);
          if (existing === void 0) {
            this.putPrivate(el, key, updateFunc(defaultVal));
          } else {
            this.putPrivate(el, key, updateFunc(existing));
          }
        },
        syncPendingAttrs(fromEl, toEl) {
          if (!fromEl.hasAttribute(PHX_REF_SRC)) {
            return;
          }
          PHX_EVENT_CLASSES.forEach((className) => {
            fromEl.classList.contains(className) && toEl.classList.add(className);
          });
          PHX_PENDING_ATTRS.filter((attr) => fromEl.hasAttribute(attr)).forEach((attr) => {
            toEl.setAttribute(attr, fromEl.getAttribute(attr));
          });
        },
        copyPrivates(target, source) {
          if (source[PHX_PRIVATE]) {
            target[PHX_PRIVATE] = source[PHX_PRIVATE];
          }
        },
        putTitle(str) {
          let titleEl = document.querySelector("title");
          if (titleEl) {
            let { prefix, suffix, default: defaultTitle } = titleEl.dataset;
            let isEmpty2 = typeof str !== "string" || str.trim() === "";
            if (isEmpty2 && typeof defaultTitle !== "string") {
              return;
            }
            let inner = isEmpty2 ? defaultTitle : str;
            document.title = `${prefix || ""}${inner || ""}${suffix || ""}`;
          } else {
            document.title = str;
          }
        },
        debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, callback) {
          let debounce = el.getAttribute(phxDebounce);
          let throttle = el.getAttribute(phxThrottle);
          if (debounce === "") {
            debounce = defaultDebounce;
          }
          if (throttle === "") {
            throttle = defaultThrottle;
          }
          let value = debounce || throttle;
          switch (value) {
            case null:
              return callback();
            case "blur":
              this.incCycle(el, "debounce-blur-cycle", () => {
                if (asyncFilter()) {
                  callback();
                }
              });
              if (this.once(el, "debounce-blur")) {
                el.addEventListener("blur", () => this.triggerCycle(el, "debounce-blur-cycle"));
              }
              return;
            default:
              let timeout = parseInt(value);
              let trigger = () => throttle ? this.deletePrivate(el, THROTTLED) : callback();
              let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
              if (isNaN(timeout)) {
                return logError(`invalid throttle/debounce value: ${value}`);
              }
              if (throttle) {
                let newKeyDown = false;
                if (event.type === "keydown") {
                  let prevKey = this.private(el, DEBOUNCE_PREV_KEY);
                  this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
                  newKeyDown = prevKey !== event.key;
                }
                if (!newKeyDown && this.private(el, THROTTLED)) {
                  return false;
                } else {
                  callback();
                  const t = setTimeout(() => {
                    if (asyncFilter()) {
                      this.triggerCycle(el, DEBOUNCE_TRIGGER);
                    }
                  }, timeout);
                  this.putPrivate(el, THROTTLED, t);
                }
              } else {
                setTimeout(() => {
                  if (asyncFilter()) {
                    this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
                  }
                }, timeout);
              }
              let form = el.form;
              if (form && this.once(form, "bind-debounce")) {
                form.addEventListener("submit", () => {
                  Array.from(new FormData(form).entries(), ([name]) => {
                    let input = form.querySelector(`[name="${name}"]`);
                    this.incCycle(input, DEBOUNCE_TRIGGER);
                    this.deletePrivate(input, THROTTLED);
                  });
                });
              }
              if (this.once(el, "bind-debounce")) {
                el.addEventListener("blur", () => {
                  clearTimeout(this.private(el, THROTTLED));
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                });
              }
          }
        },
        triggerCycle(el, key, currentCycle) {
          let [cycle, trigger] = this.private(el, key);
          if (!currentCycle) {
            currentCycle = cycle;
          }
          if (currentCycle === cycle) {
            this.incCycle(el, key);
            trigger();
          }
        },
        once(el, key) {
          if (this.private(el, key) === true) {
            return false;
          }
          this.putPrivate(el, key, true);
          return true;
        },
        incCycle(el, key, trigger = function() {
        }) {
          let [currentCycle] = this.private(el, key) || [0, trigger];
          currentCycle++;
          this.putPrivate(el, key, [currentCycle, trigger]);
          return currentCycle;
        },
        // maintains or adds privately used hook information
        // fromEl and toEl can be the same element in the case of a newly added node
        // fromEl and toEl can be any HTML node type, so we need to check if it's an element node
        maintainPrivateHooks(fromEl, toEl, phxViewportTop, phxViewportBottom) {
          if (fromEl.hasAttribute && fromEl.hasAttribute("data-phx-hook") && !toEl.hasAttribute("data-phx-hook")) {
            toEl.setAttribute("data-phx-hook", fromEl.getAttribute("data-phx-hook"));
          }
          if (toEl.hasAttribute && (toEl.hasAttribute(phxViewportTop) || toEl.hasAttribute(phxViewportBottom))) {
            toEl.setAttribute("data-phx-hook", "Phoenix.InfiniteScroll");
          }
        },
        putCustomElHook(el, hook) {
          if (el.isConnected) {
            el.setAttribute("data-phx-hook", "");
          } else {
            console.error(`
        hook attached to non-connected DOM element
        ensure you are calling createHook within your connectedCallback. ${el.outerHTML}
      `);
          }
          this.putPrivate(el, "custom-el-hook", hook);
        },
        getCustomElHook(el) {
          return this.private(el, "custom-el-hook");
        },
        isUsedInput(el) {
          return el.nodeType === Node.ELEMENT_NODE && (this.private(el, PHX_HAS_FOCUSED) || this.private(el, PHX_HAS_SUBMITTED));
        },
        resetForm(form) {
          Array.from(form.elements).forEach((input) => {
            this.deletePrivate(input, PHX_HAS_FOCUSED);
            this.deletePrivate(input, PHX_HAS_SUBMITTED);
          });
        },
        isPhxChild(node) {
          return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
        },
        isPhxSticky(node) {
          return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
        },
        isChildOfAny(el, parents) {
          return !!parents.find((parent) => parent.contains(el));
        },
        firstPhxChild(el) {
          return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
        },
        dispatchEvent(target, name, opts = {}) {
          let defaultBubble = true;
          let isUploadTarget = target.nodeName === "INPUT" && target.type === "file";
          if (isUploadTarget && name === "click") {
            defaultBubble = false;
          }
          let bubbles = opts.bubbles === void 0 ? defaultBubble : !!opts.bubbles;
          let eventOpts = { bubbles, cancelable: true, detail: opts.detail || {} };
          let event = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
          target.dispatchEvent(event);
        },
        cloneNode(node, html) {
          if (typeof html === "undefined") {
            return node.cloneNode(true);
          } else {
            let cloned = node.cloneNode(false);
            cloned.innerHTML = html;
            return cloned;
          }
        },
        // merge attributes from source to target
        // if an element is ignored, we only merge data attributes
        // including removing data attributes that are no longer in the source
        mergeAttrs(target, source, opts = {}) {
          let exclude = new Set(opts.exclude || []);
          let isIgnored = opts.isIgnored;
          let sourceAttrs = source.attributes;
          for (let i = sourceAttrs.length - 1; i >= 0; i--) {
            let name = sourceAttrs[i].name;
            if (!exclude.has(name)) {
              const sourceValue = source.getAttribute(name);
              if (target.getAttribute(name) !== sourceValue && (!isIgnored || isIgnored && name.startsWith("data-"))) {
                target.setAttribute(name, sourceValue);
              }
            } else {
              if (name === "value" && target.value === source.value) {
                target.setAttribute("value", source.getAttribute(name));
              }
            }
          }
          let targetAttrs = target.attributes;
          for (let i = targetAttrs.length - 1; i >= 0; i--) {
            let name = targetAttrs[i].name;
            if (isIgnored) {
              if (name.startsWith("data-") && !source.hasAttribute(name) && !PHX_PENDING_ATTRS.includes(name)) {
                target.removeAttribute(name);
              }
            } else {
              if (!source.hasAttribute(name)) {
                target.removeAttribute(name);
              }
            }
          }
        },
        mergeFocusedInput(target, source) {
          if (!(target instanceof HTMLSelectElement)) {
            DOM.mergeAttrs(target, source, { exclude: ["value"] });
          }
          if (source.readOnly) {
            target.setAttribute("readonly", true);
          } else {
            target.removeAttribute("readonly");
          }
        },
        hasSelectionRange(el) {
          return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
        },
        restoreFocus(focused, selectionStart, selectionEnd) {
          if (focused instanceof HTMLSelectElement) {
            focused.focus();
          }
          if (!DOM.isTextualInput(focused)) {
            return;
          }
          let wasFocused = focused.matches(":focus");
          if (!wasFocused) {
            focused.focus();
          }
          if (this.hasSelectionRange(focused)) {
            focused.setSelectionRange(selectionStart, selectionEnd);
          }
        },
        isFormInput(el) {
          return /^(?:input|select|textarea)$/i.test(el.tagName) && el.type !== "button";
        },
        syncAttrsToProps(el) {
          if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
            el.checked = el.getAttribute("checked") !== null;
          }
        },
        isTextualInput(el) {
          return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
        },
        isNowTriggerFormExternal(el, phxTriggerExternal) {
          return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null && document.body.contains(el);
        },
        cleanChildNodes(container, phxUpdate) {
          if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend", PHX_STREAM])) {
            let toRemove = [];
            container.childNodes.forEach((childNode) => {
              if (!childNode.id) {
                let isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "";
                if (!isEmptyTextNode && childNode.nodeType !== Node.COMMENT_NODE) {
                  logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(childNode.outerHTML || childNode.nodeValue).trim()}"

`);
                }
                toRemove.push(childNode);
              }
            });
            toRemove.forEach((childNode) => childNode.remove());
          }
        },
        replaceRootContainer(container, tagName, attrs) {
          let retainedAttrs = /* @__PURE__ */ new Set(["id", PHX_SESSION, PHX_STATIC, PHX_MAIN, PHX_ROOT_ID]);
          if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
            Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
            Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
            return container;
          } else {
            let newContainer = document.createElement(tagName);
            Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
            retainedAttrs.forEach((attr) => newContainer.setAttribute(attr, container.getAttribute(attr)));
            newContainer.innerHTML = container.innerHTML;
            container.replaceWith(newContainer);
            return newContainer;
          }
        },
        getSticky(el, name, defaultVal) {
          let op = (DOM.private(el, "sticky") || []).find(([existingName]) => name === existingName);
          if (op) {
            let [_name, _op, stashedResult] = op;
            return stashedResult;
          } else {
            return typeof defaultVal === "function" ? defaultVal() : defaultVal;
          }
        },
        deleteSticky(el, name) {
          this.updatePrivate(el, "sticky", [], (ops) => {
            return ops.filter(([existingName, _]) => existingName !== name);
          });
        },
        putSticky(el, name, op) {
          let stashedResult = op(el);
          this.updatePrivate(el, "sticky", [], (ops) => {
            let existingIndex = ops.findIndex(([existingName]) => name === existingName);
            if (existingIndex >= 0) {
              ops[existingIndex] = [name, op, stashedResult];
            } else {
              ops.push([name, op, stashedResult]);
            }
            return ops;
          });
        },
        applyStickyOperations(el) {
          let ops = DOM.private(el, "sticky");
          if (!ops) {
            return;
          }
          ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
        },
        isLocked(el) {
          return el.hasAttribute && el.hasAttribute(PHX_REF_LOCK);
        }
      };
      dom_default = DOM;
      UploadEntry = class {
        static isActive(fileEl, file) {
          let isNew = file._phxRef === void 0;
          let activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
          let isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
          return file.size > 0 && (isNew || isActive);
        }
        static isPreflighted(fileEl, file) {
          let preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
          let isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
          return isPreflighted && this.isActive(fileEl, file);
        }
        static isPreflightInProgress(file) {
          return file._preflightInProgress === true;
        }
        static markPreflightInProgress(file) {
          file._preflightInProgress = true;
        }
        constructor(fileEl, file, view, autoUpload) {
          this.ref = LiveUploader.genFileRef(file);
          this.fileEl = fileEl;
          this.file = file;
          this.view = view;
          this.meta = null;
          this._isCancelled = false;
          this._isDone = false;
          this._progress = 0;
          this._lastProgressSent = -1;
          this._onDone = function() {
          };
          this._onElUpdated = this.onElUpdated.bind(this);
          this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
          this.autoUpload = autoUpload;
        }
        metadata() {
          return this.meta;
        }
        progress(progress) {
          this._progress = Math.floor(progress);
          if (this._progress > this._lastProgressSent) {
            if (this._progress >= 100) {
              this._progress = 100;
              this._lastProgressSent = 100;
              this._isDone = true;
              this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
                LiveUploader.untrackFile(this.fileEl, this.file);
                this._onDone();
              });
            } else {
              this._lastProgressSent = this._progress;
              this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
            }
          }
        }
        isCancelled() {
          return this._isCancelled;
        }
        cancel() {
          this.file._preflightInProgress = false;
          this._isCancelled = true;
          this._isDone = true;
          this._onDone();
        }
        isDone() {
          return this._isDone;
        }
        error(reason = "failed") {
          this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
          this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
          if (!this.isAutoUpload()) {
            LiveUploader.clearFiles(this.fileEl);
          }
        }
        isAutoUpload() {
          return this.autoUpload;
        }
        //private
        onDone(callback) {
          this._onDone = () => {
            this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
            callback();
          };
        }
        onElUpdated() {
          let activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
          if (activeRefs.indexOf(this.ref) === -1) {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this.cancel();
          }
        }
        toPreflightPayload() {
          return {
            last_modified: this.file.lastModified,
            name: this.file.name,
            relative_path: this.file.webkitRelativePath,
            size: this.file.size,
            type: this.file.type,
            ref: this.ref,
            meta: typeof this.file.meta === "function" ? this.file.meta() : void 0
          };
        }
        uploader(uploaders) {
          if (this.meta.uploader) {
            let callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
            return { name: this.meta.uploader, callback };
          } else {
            return { name: "channel", callback: channelUploader };
          }
        }
        zipPostFlight(resp) {
          this.meta = resp.entries[this.ref];
          if (!this.meta) {
            logError(`no preflight upload response returned with ref ${this.ref}`, { input: this.fileEl, response: resp });
          }
        }
      };
      liveUploaderFileRef = 0;
      LiveUploader = class _LiveUploader {
        static genFileRef(file) {
          let ref = file._phxRef;
          if (ref !== void 0) {
            return ref;
          } else {
            file._phxRef = (liveUploaderFileRef++).toString();
            return file._phxRef;
          }
        }
        static getEntryDataURL(inputEl, ref, callback) {
          let file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
          callback(URL.createObjectURL(file));
        }
        static hasUploadsInProgress(formEl) {
          let active = 0;
          dom_default.findUploadInputs(formEl).forEach((input) => {
            if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
              active++;
            }
          });
          return active > 0;
        }
        static serializeUploads(inputEl) {
          let files = this.activeFiles(inputEl);
          let fileData = {};
          files.forEach((file) => {
            let entry = { path: inputEl.name };
            let uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
            fileData[uploadRef] = fileData[uploadRef] || [];
            entry.ref = this.genFileRef(file);
            entry.last_modified = file.lastModified;
            entry.name = file.name || entry.ref;
            entry.relative_path = file.webkitRelativePath;
            entry.type = file.type;
            entry.size = file.size;
            if (typeof file.meta === "function") {
              entry.meta = file.meta();
            }
            fileData[uploadRef].push(entry);
          });
          return fileData;
        }
        static clearFiles(inputEl) {
          inputEl.value = null;
          inputEl.removeAttribute(PHX_UPLOAD_REF);
          dom_default.putPrivate(inputEl, "files", []);
        }
        static untrackFile(inputEl, file) {
          dom_default.putPrivate(inputEl, "files", dom_default.private(inputEl, "files").filter((f) => !Object.is(f, file)));
        }
        static trackFiles(inputEl, files, dataTransfer) {
          if (inputEl.getAttribute("multiple") !== null) {
            let newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file)));
            dom_default.updatePrivate(inputEl, "files", [], (existing) => existing.concat(newFiles));
            inputEl.value = null;
          } else {
            if (dataTransfer && dataTransfer.files.length > 0) {
              inputEl.files = dataTransfer.files;
            }
            dom_default.putPrivate(inputEl, "files", files);
          }
        }
        static activeFileInputs(formEl) {
          let fileInputs = dom_default.findUploadInputs(formEl);
          return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
        }
        static activeFiles(input) {
          return (dom_default.private(input, "files") || []).filter((f) => UploadEntry.isActive(input, f));
        }
        static inputsAwaitingPreflight(formEl) {
          let fileInputs = dom_default.findUploadInputs(formEl);
          return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
        }
        static filesAwaitingPreflight(input) {
          return this.activeFiles(input).filter((f) => !UploadEntry.isPreflighted(input, f) && !UploadEntry.isPreflightInProgress(f));
        }
        static markPreflightInProgress(entries) {
          entries.forEach((entry) => UploadEntry.markPreflightInProgress(entry.file));
        }
        constructor(inputEl, view, onComplete) {
          this.autoUpload = dom_default.isAutoUpload(inputEl);
          this.view = view;
          this.onComplete = onComplete;
          this._entries = Array.from(_LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view, this.autoUpload));
          _LiveUploader.markPreflightInProgress(this._entries);
          this.numEntriesInProgress = this._entries.length;
        }
        isAutoUpload() {
          return this.autoUpload;
        }
        entries() {
          return this._entries;
        }
        initAdapterUpload(resp, onError, liveSocket) {
          this._entries = this._entries.map((entry) => {
            if (entry.isCancelled()) {
              this.numEntriesInProgress--;
              if (this.numEntriesInProgress === 0) {
                this.onComplete();
              }
            } else {
              entry.zipPostFlight(resp);
              entry.onDone(() => {
                this.numEntriesInProgress--;
                if (this.numEntriesInProgress === 0) {
                  this.onComplete();
                }
              });
            }
            return entry;
          });
          let groupedEntries = this._entries.reduce((acc, entry) => {
            if (!entry.meta) {
              return acc;
            }
            let { name, callback } = entry.uploader(liveSocket.uploaders);
            acc[name] = acc[name] || { callback, entries: [] };
            acc[name].entries.push(entry);
            return acc;
          }, {});
          for (let name in groupedEntries) {
            let { callback, entries } = groupedEntries[name];
            callback(entries, onError, resp, liveSocket);
          }
        }
      };
      ARIA = {
        anyOf(instance, classes) {
          return classes.find((name) => instance instanceof name);
        },
        isFocusable(el, interactiveOnly) {
          return el instanceof HTMLAnchorElement && el.rel !== "ignore" || el instanceof HTMLAreaElement && el.href !== void 0 || !el.disabled && this.anyOf(el, [HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement, HTMLButtonElement]) || el instanceof HTMLIFrameElement || (el.tabIndex >= 0 && el.getAttribute("aria-hidden") !== "true" || !interactiveOnly && el.getAttribute("tabindex") !== null && el.getAttribute("aria-hidden") !== "true");
        },
        attemptFocus(el, interactiveOnly) {
          if (this.isFocusable(el, interactiveOnly)) {
            try {
              el.focus();
            } catch (e) {
            }
          }
          return !!document.activeElement && document.activeElement.isSameNode(el);
        },
        focusFirstInteractive(el) {
          let child = el.firstElementChild;
          while (child) {
            if (this.attemptFocus(child, true) || this.focusFirstInteractive(child, true)) {
              return true;
            }
            child = child.nextElementSibling;
          }
        },
        focusFirst(el) {
          let child = el.firstElementChild;
          while (child) {
            if (this.attemptFocus(child) || this.focusFirst(child)) {
              return true;
            }
            child = child.nextElementSibling;
          }
        },
        focusLast(el) {
          let child = el.lastElementChild;
          while (child) {
            if (this.attemptFocus(child) || this.focusLast(child)) {
              return true;
            }
            child = child.previousElementSibling;
          }
        }
      };
      aria_default = ARIA;
      Hooks = {
        LiveFileUpload: {
          activeRefs() {
            return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
          },
          preflightedRefs() {
            return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
          },
          mounted() {
            this.preflightedWas = this.preflightedRefs();
          },
          updated() {
            let newPreflights = this.preflightedRefs();
            if (this.preflightedWas !== newPreflights) {
              this.preflightedWas = newPreflights;
              if (newPreflights === "") {
                this.__view().cancelSubmit(this.el.form);
              }
            }
            if (this.activeRefs() === "") {
              this.el.value = null;
            }
            this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
          }
        },
        LiveImgPreview: {
          mounted() {
            this.ref = this.el.getAttribute("data-phx-entry-ref");
            this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
            LiveUploader.getEntryDataURL(this.inputEl, this.ref, (url) => {
              this.url = url;
              this.el.src = url;
            });
          },
          destroyed() {
            URL.revokeObjectURL(this.url);
          }
        },
        FocusWrap: {
          mounted() {
            this.focusStart = this.el.firstElementChild;
            this.focusEnd = this.el.lastElementChild;
            this.focusStart.addEventListener("focus", (e) => {
              if (!e.relatedTarget || !this.el.contains(e.relatedTarget)) {
                const nextFocus = e.target.nextElementSibling;
                aria_default.attemptFocus(nextFocus) || aria_default.focusFirst(nextFocus);
              } else {
                aria_default.focusLast(this.el);
              }
            });
            this.focusEnd.addEventListener("focus", (e) => {
              if (!e.relatedTarget || !this.el.contains(e.relatedTarget)) {
                const nextFocus = e.target.previousElementSibling;
                aria_default.attemptFocus(nextFocus) || aria_default.focusLast(nextFocus);
              } else {
                aria_default.focusFirst(this.el);
              }
            });
            this.el.addEventListener("phx:show-end", () => this.el.focus());
            if (window.getComputedStyle(this.el).display !== "none") {
              aria_default.focusFirst(this.el);
            }
          }
        }
      };
      findScrollContainer = (el) => {
        if (["HTML", "BODY"].indexOf(el.nodeName.toUpperCase()) >= 0)
          return null;
        if (["scroll", "auto"].indexOf(getComputedStyle(el).overflowY) >= 0)
          return el;
        return findScrollContainer(el.parentElement);
      };
      scrollTop = (scrollContainer) => {
        if (scrollContainer) {
          return scrollContainer.scrollTop;
        } else {
          return document.documentElement.scrollTop || document.body.scrollTop;
        }
      };
      bottom = (scrollContainer) => {
        if (scrollContainer) {
          return scrollContainer.getBoundingClientRect().bottom;
        } else {
          return window.innerHeight || document.documentElement.clientHeight;
        }
      };
      top = (scrollContainer) => {
        if (scrollContainer) {
          return scrollContainer.getBoundingClientRect().top;
        } else {
          return 0;
        }
      };
      isAtViewportTop = (el, scrollContainer) => {
        let rect = el.getBoundingClientRect();
        return Math.ceil(rect.top) >= top(scrollContainer) && Math.ceil(rect.left) >= 0 && Math.floor(rect.top) <= bottom(scrollContainer);
      };
      isAtViewportBottom = (el, scrollContainer) => {
        let rect = el.getBoundingClientRect();
        return Math.ceil(rect.bottom) >= top(scrollContainer) && Math.ceil(rect.left) >= 0 && Math.floor(rect.bottom) <= bottom(scrollContainer);
      };
      isWithinViewport = (el, scrollContainer) => {
        let rect = el.getBoundingClientRect();
        return Math.ceil(rect.top) >= top(scrollContainer) && Math.ceil(rect.left) >= 0 && Math.floor(rect.top) <= bottom(scrollContainer);
      };
      Hooks.InfiniteScroll = {
        mounted() {
          this.scrollContainer = findScrollContainer(this.el);
          let scrollBefore = scrollTop(this.scrollContainer);
          let topOverran = false;
          let throttleInterval = 500;
          let pendingOp = null;
          let onTopOverrun = this.throttle(throttleInterval, (topEvent, firstChild) => {
            pendingOp = () => true;
            this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id, _overran: true }, () => {
              pendingOp = null;
            });
          });
          let onFirstChildAtTop = this.throttle(throttleInterval, (topEvent, firstChild) => {
            pendingOp = () => firstChild.scrollIntoView({ block: "start" });
            this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id }, () => {
              pendingOp = null;
              window.requestAnimationFrame(() => {
                if (!isWithinViewport(firstChild, this.scrollContainer)) {
                  firstChild.scrollIntoView({ block: "start" });
                }
              });
            });
          });
          let onLastChildAtBottom = this.throttle(throttleInterval, (bottomEvent, lastChild) => {
            pendingOp = () => lastChild.scrollIntoView({ block: "end" });
            this.liveSocket.execJSHookPush(this.el, bottomEvent, { id: lastChild.id }, () => {
              pendingOp = null;
              window.requestAnimationFrame(() => {
                if (!isWithinViewport(lastChild, this.scrollContainer)) {
                  lastChild.scrollIntoView({ block: "end" });
                }
              });
            });
          });
          this.onScroll = (_e) => {
            let scrollNow = scrollTop(this.scrollContainer);
            if (pendingOp) {
              scrollBefore = scrollNow;
              return pendingOp();
            }
            let rect = this.el.getBoundingClientRect();
            let topEvent = this.el.getAttribute(this.liveSocket.binding("viewport-top"));
            let bottomEvent = this.el.getAttribute(this.liveSocket.binding("viewport-bottom"));
            let lastChild = this.el.lastElementChild;
            let firstChild = this.el.firstElementChild;
            let isScrollingUp = scrollNow < scrollBefore;
            let isScrollingDown = scrollNow > scrollBefore;
            if (isScrollingUp && topEvent && !topOverran && rect.top >= 0) {
              topOverran = true;
              onTopOverrun(topEvent, firstChild);
            } else if (isScrollingDown && topOverran && rect.top <= 0) {
              topOverran = false;
            }
            if (topEvent && isScrollingUp && isAtViewportTop(firstChild, this.scrollContainer)) {
              onFirstChildAtTop(topEvent, firstChild);
            } else if (bottomEvent && isScrollingDown && isAtViewportBottom(lastChild, this.scrollContainer)) {
              onLastChildAtBottom(bottomEvent, lastChild);
            }
            scrollBefore = scrollNow;
          };
          if (this.scrollContainer) {
            this.scrollContainer.addEventListener("scroll", this.onScroll);
          } else {
            window.addEventListener("scroll", this.onScroll);
          }
        },
        destroyed() {
          if (this.scrollContainer) {
            this.scrollContainer.removeEventListener("scroll", this.onScroll);
          } else {
            window.removeEventListener("scroll", this.onScroll);
          }
        },
        throttle(interval, callback) {
          let lastCallAt = 0;
          let timer;
          return (...args) => {
            let now = Date.now();
            let remainingTime = interval - (now - lastCallAt);
            if (remainingTime <= 0 || remainingTime > interval) {
              if (timer) {
                clearTimeout(timer);
                timer = null;
              }
              lastCallAt = now;
              callback(...args);
            } else if (!timer) {
              timer = setTimeout(() => {
                lastCallAt = Date.now();
                timer = null;
                callback(...args);
              }, remainingTime);
            }
          };
        }
      };
      hooks_default = Hooks;
      ElementRef = class {
        static onUnlock(el, callback) {
          if (!dom_default.isLocked(el) && !el.closest(`[${PHX_REF_LOCK}]`)) {
            return callback();
          }
          const closestLock = el.closest(`[${PHX_REF_LOCK}]`);
          const ref = closestLock.closest(`[${PHX_REF_LOCK}]`).getAttribute(PHX_REF_LOCK);
          closestLock.addEventListener(`phx:undo-lock:${ref}`, () => {
            callback();
          }, { once: true });
        }
        constructor(el) {
          this.el = el;
          this.loadingRef = el.hasAttribute(PHX_REF_LOADING) ? parseInt(el.getAttribute(PHX_REF_LOADING), 10) : null;
          this.lockRef = el.hasAttribute(PHX_REF_LOCK) ? parseInt(el.getAttribute(PHX_REF_LOCK), 10) : null;
        }
        // public
        maybeUndo(ref, phxEvent, eachCloneCallback) {
          if (!this.isWithin(ref)) {
            dom_default.updatePrivate(this.el, PHX_PENDING_REFS, [], (pendingRefs) => {
              pendingRefs.push(ref);
              return pendingRefs;
            });
            return;
          }
          this.undoLocks(ref, phxEvent, eachCloneCallback);
          this.undoLoading(ref, phxEvent);
          dom_default.updatePrivate(this.el, PHX_PENDING_REFS, [], (pendingRefs) => {
            return pendingRefs.filter((pendingRef) => {
              let opts = {
                detail: { ref: pendingRef, event: phxEvent },
                bubbles: true,
                cancelable: false
              };
              if (this.loadingRef && this.loadingRef > pendingRef) {
                this.el.dispatchEvent(
                  new CustomEvent(`phx:undo-loading:${pendingRef}`, opts)
                );
              }
              if (this.lockRef && this.lockRef > pendingRef) {
                this.el.dispatchEvent(
                  new CustomEvent(`phx:undo-lock:${pendingRef}`, opts)
                );
              }
              return pendingRef > ref;
            });
          });
          if (this.isFullyResolvedBy(ref)) {
            this.el.removeAttribute(PHX_REF_SRC);
          }
        }
        // private
        isWithin(ref) {
          return !(this.loadingRef !== null && this.loadingRef > ref && (this.lockRef !== null && this.lockRef > ref));
        }
        // Check for cloned PHX_REF_LOCK element that has been morphed behind
        // the scenes while this element was locked in the DOM.
        // When we apply the cloned tree to the active DOM element, we must
        //
        //   1. execute pending mounted hooks for nodes now in the DOM
        //   2. undo any ref inside the cloned tree that has since been ack'd
        undoLocks(ref, phxEvent, eachCloneCallback) {
          if (!this.isLockUndoneBy(ref)) {
            return;
          }
          let clonedTree = dom_default.private(this.el, PHX_REF_LOCK);
          if (clonedTree) {
            eachCloneCallback(clonedTree);
            dom_default.deletePrivate(this.el, PHX_REF_LOCK);
          }
          this.el.removeAttribute(PHX_REF_LOCK);
          let opts = { detail: { ref, event: phxEvent }, bubbles: true, cancelable: false };
          this.el.dispatchEvent(new CustomEvent(`phx:undo-lock:${this.lockRef}`, opts));
        }
        undoLoading(ref, phxEvent) {
          if (!this.isLoadingUndoneBy(ref)) {
            if (this.canUndoLoading(ref) && this.el.classList.contains("phx-submit-loading")) {
              this.el.classList.remove("phx-change-loading");
            }
            return;
          }
          if (this.canUndoLoading(ref)) {
            this.el.removeAttribute(PHX_REF_LOADING);
            let disabledVal = this.el.getAttribute(PHX_DISABLED);
            let readOnlyVal = this.el.getAttribute(PHX_READONLY);
            if (readOnlyVal !== null) {
              this.el.readOnly = readOnlyVal === "true" ? true : false;
              this.el.removeAttribute(PHX_READONLY);
            }
            if (disabledVal !== null) {
              this.el.disabled = disabledVal === "true" ? true : false;
              this.el.removeAttribute(PHX_DISABLED);
            }
            let disableRestore = this.el.getAttribute(PHX_DISABLE_WITH_RESTORE);
            if (disableRestore !== null) {
              this.el.innerText = disableRestore;
              this.el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
            }
            let opts = { detail: { ref, event: phxEvent }, bubbles: true, cancelable: false };
            this.el.dispatchEvent(new CustomEvent(`phx:undo-loading:${this.loadingRef}`, opts));
          }
          PHX_EVENT_CLASSES.forEach((name) => {
            if (name !== "phx-submit-loading" || this.canUndoLoading(ref)) {
              dom_default.removeClass(this.el, name);
            }
          });
        }
        isLoadingUndoneBy(ref) {
          return this.loadingRef === null ? false : this.loadingRef <= ref;
        }
        isLockUndoneBy(ref) {
          return this.lockRef === null ? false : this.lockRef <= ref;
        }
        isFullyResolvedBy(ref) {
          return (this.loadingRef === null || this.loadingRef <= ref) && (this.lockRef === null || this.lockRef <= ref);
        }
        // only remove the phx-submit-loading class if we are not locked
        canUndoLoading(ref) {
          return this.lockRef === null || this.lockRef <= ref;
        }
      };
      DOMPostMorphRestorer = class {
        constructor(containerBefore, containerAfter, updateType) {
          let idsBefore = /* @__PURE__ */ new Set();
          let idsAfter = new Set([...containerAfter.children].map((child) => child.id));
          let elementsToModify = [];
          Array.from(containerBefore.children).forEach((child) => {
            if (child.id) {
              idsBefore.add(child.id);
              if (idsAfter.has(child.id)) {
                let previousElementId = child.previousElementSibling && child.previousElementSibling.id;
                elementsToModify.push({ elementId: child.id, previousElementId });
              }
            }
          });
          this.containerId = containerAfter.id;
          this.updateType = updateType;
          this.elementsToModify = elementsToModify;
          this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
        }
        // We do the following to optimize append/prepend operations:
        //   1) Track ids of modified elements & of new elements
        //   2) All the modified elements are put back in the correct position in the DOM tree
        //      by storing the id of their previous sibling
        //   3) New elements are going to be put in the right place by morphdom during append.
        //      For prepend, we move them to the first position in the container
        perform() {
          let container = dom_default.byId(this.containerId);
          this.elementsToModify.forEach((elementToModify) => {
            if (elementToModify.previousElementId) {
              maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
                maybe(document.getElementById(elementToModify.elementId), (elem) => {
                  let isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
                  if (!isInRightPlace) {
                    previousElem.insertAdjacentElement("afterend", elem);
                  }
                });
              });
            } else {
              maybe(document.getElementById(elementToModify.elementId), (elem) => {
                let isInRightPlace = elem.previousElementSibling == null;
                if (!isInRightPlace) {
                  container.insertAdjacentElement("afterbegin", elem);
                }
              });
            }
          });
          if (this.updateType == "prepend") {
            this.elementIdsToAdd.reverse().forEach((elemId) => {
              maybe(document.getElementById(elemId), (elem) => container.insertAdjacentElement("afterbegin", elem));
            });
          }
        }
      };
      DOCUMENT_FRAGMENT_NODE = 11;
      NS_XHTML = "http://www.w3.org/1999/xhtml";
      doc = typeof document === "undefined" ? void 0 : document;
      HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
      HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
      specialElHandlers = {
        OPTION: function(fromEl, toEl) {
          var parentNode = fromEl.parentNode;
          if (parentNode) {
            var parentName = parentNode.nodeName.toUpperCase();
            if (parentName === "OPTGROUP") {
              parentNode = parentNode.parentNode;
              parentName = parentNode && parentNode.nodeName.toUpperCase();
            }
            if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
              if (fromEl.hasAttribute("selected") && !toEl.selected) {
                fromEl.setAttribute("selected", "selected");
                fromEl.removeAttribute("selected");
              }
              parentNode.selectedIndex = -1;
            }
          }
          syncBooleanAttrProp(fromEl, toEl, "selected");
        },
        /**
         * The "value" attribute is special for the <input> element since it sets
         * the initial value. Changing the "value" attribute without changing the
         * "value" property will have no effect since it is only used to the set the
         * initial value.  Similar for the "checked" attribute, and "disabled".
         */
        INPUT: function(fromEl, toEl) {
          syncBooleanAttrProp(fromEl, toEl, "checked");
          syncBooleanAttrProp(fromEl, toEl, "disabled");
          if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
          }
          if (!toEl.hasAttribute("value")) {
            fromEl.removeAttribute("value");
          }
        },
        TEXTAREA: function(fromEl, toEl) {
          var newValue = toEl.value;
          if (fromEl.value !== newValue) {
            fromEl.value = newValue;
          }
          var firstChild = fromEl.firstChild;
          if (firstChild) {
            var oldValue = firstChild.nodeValue;
            if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
              return;
            }
            firstChild.nodeValue = newValue;
          }
        },
        SELECT: function(fromEl, toEl) {
          if (!toEl.hasAttribute("multiple")) {
            var selectedIndex = -1;
            var i = 0;
            var curChild = fromEl.firstChild;
            var optgroup;
            var nodeName;
            while (curChild) {
              nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
              if (nodeName === "OPTGROUP") {
                optgroup = curChild;
                curChild = optgroup.firstChild;
              } else {
                if (nodeName === "OPTION") {
                  if (curChild.hasAttribute("selected")) {
                    selectedIndex = i;
                    break;
                  }
                  i++;
                }
                curChild = curChild.nextSibling;
                if (!curChild && optgroup) {
                  curChild = optgroup.nextSibling;
                  optgroup = null;
                }
              }
            }
            fromEl.selectedIndex = selectedIndex;
          }
        }
      };
      ELEMENT_NODE = 1;
      DOCUMENT_FRAGMENT_NODE$1 = 11;
      TEXT_NODE = 3;
      COMMENT_NODE = 8;
      morphdom = morphdomFactory(morphAttrs);
      morphdom_esm_default = morphdom;
      DOMPatch = class {
        constructor(view, container, id, html, streams, targetCID, opts = {}) {
          this.view = view;
          this.liveSocket = view.liveSocket;
          this.container = container;
          this.id = id;
          this.rootID = view.root.id;
          this.html = html;
          this.streams = streams;
          this.streamInserts = {};
          this.streamComponentRestore = {};
          this.targetCID = targetCID;
          this.cidPatch = isCid(this.targetCID);
          this.pendingRemoves = [];
          this.phxRemove = this.liveSocket.binding("remove");
          this.targetContainer = this.isCIDPatch() ? this.targetCIDContainer(html) : container;
          this.callbacks = {
            beforeadded: [],
            beforeupdated: [],
            beforephxChildAdded: [],
            afteradded: [],
            afterupdated: [],
            afterdiscarded: [],
            afterphxChildAdded: [],
            aftertransitionsDiscarded: []
          };
          this.withChildren = opts.withChildren || opts.undoRef || false;
          this.undoRef = opts.undoRef;
        }
        before(kind, callback) {
          this.callbacks[`before${kind}`].push(callback);
        }
        after(kind, callback) {
          this.callbacks[`after${kind}`].push(callback);
        }
        trackBefore(kind, ...args) {
          this.callbacks[`before${kind}`].forEach((callback) => callback(...args));
        }
        trackAfter(kind, ...args) {
          this.callbacks[`after${kind}`].forEach((callback) => callback(...args));
        }
        markPrunableContentForRemoval() {
          let phxUpdate = this.liveSocket.binding(PHX_UPDATE);
          dom_default.all(this.container, `[${phxUpdate}=append] > *, [${phxUpdate}=prepend] > *`, (el) => {
            el.setAttribute(PHX_PRUNE, "");
          });
        }
        perform(isJoinPatch) {
          let { view, liveSocket, html, container, targetContainer } = this;
          if (this.isCIDPatch() && !targetContainer) {
            return;
          }
          let focused = liveSocket.getActiveElement();
          let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
          let phxUpdate = liveSocket.binding(PHX_UPDATE);
          let phxViewportTop = liveSocket.binding(PHX_VIEWPORT_TOP);
          let phxViewportBottom = liveSocket.binding(PHX_VIEWPORT_BOTTOM);
          let phxTriggerExternal = liveSocket.binding(PHX_TRIGGER_ACTION);
          let added = [];
          let updates = [];
          let appendPrependUpdates = [];
          let externalFormTriggered = null;
          function morph(targetContainer2, source, withChildren = this.withChildren) {
            let morphCallbacks = {
              // normally, we are running with childrenOnly, as the patch HTML for a LV
              // does not include the LV attrs (data-phx-session, etc.)
              // when we are patching a live component, we do want to patch the root element as well;
              // another case is the recursive patch of a stream item that was kept on reset (-> onBeforeNodeAdded)
              childrenOnly: targetContainer2.getAttribute(PHX_COMPONENT) === null && !withChildren,
              getNodeKey: (node) => {
                if (dom_default.isPhxDestroyed(node)) {
                  return null;
                }
                if (isJoinPatch) {
                  return node.id;
                }
                return node.id || node.getAttribute && node.getAttribute(PHX_MAGIC_ID);
              },
              // skip indexing from children when container is stream
              skipFromChildren: (from) => {
                return from.getAttribute(phxUpdate) === PHX_STREAM;
              },
              // tell morphdom how to add a child
              addChild: (parent, child) => {
                let { ref, streamAt } = this.getStreamInsert(child);
                if (ref === void 0) {
                  return parent.appendChild(child);
                }
                this.setStreamRef(child, ref);
                if (streamAt === 0) {
                  parent.insertAdjacentElement("afterbegin", child);
                } else if (streamAt === -1) {
                  let lastChild = parent.lastElementChild;
                  if (lastChild && !lastChild.hasAttribute(PHX_STREAM_REF)) {
                    let nonStreamChild = Array.from(parent.children).find((c) => !c.hasAttribute(PHX_STREAM_REF));
                    parent.insertBefore(child, nonStreamChild);
                  } else {
                    parent.appendChild(child);
                  }
                } else if (streamAt > 0) {
                  let sibling = Array.from(parent.children)[streamAt];
                  parent.insertBefore(child, sibling);
                }
              },
              onBeforeNodeAdded: (el) => {
                dom_default.maintainPrivateHooks(el, el, phxViewportTop, phxViewportBottom);
                this.trackBefore("added", el);
                let morphedEl = el;
                if (this.streamComponentRestore[el.id]) {
                  morphedEl = this.streamComponentRestore[el.id];
                  delete this.streamComponentRestore[el.id];
                  morph.call(this, morphedEl, el, true);
                }
                return morphedEl;
              },
              onNodeAdded: (el) => {
                if (el.getAttribute) {
                  this.maybeReOrderStream(el, true);
                }
                if (el instanceof HTMLImageElement && el.srcset) {
                  el.srcset = el.srcset;
                } else if (el instanceof HTMLVideoElement && el.autoplay) {
                  el.play();
                }
                if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
                  externalFormTriggered = el;
                }
                if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
                  this.trackAfter("phxChildAdded", el);
                }
                added.push(el);
              },
              onNodeDiscarded: (el) => this.onNodeDiscarded(el),
              onBeforeNodeDiscarded: (el) => {
                if (el.getAttribute && el.getAttribute(PHX_PRUNE) !== null) {
                  return true;
                }
                if (el.parentElement !== null && el.id && dom_default.isPhxUpdate(el.parentElement, phxUpdate, [PHX_STREAM, "append", "prepend"])) {
                  return false;
                }
                if (this.maybePendingRemove(el)) {
                  return false;
                }
                if (this.skipCIDSibling(el)) {
                  return false;
                }
                return true;
              },
              onElUpdated: (el) => {
                if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
                  externalFormTriggered = el;
                }
                updates.push(el);
                this.maybeReOrderStream(el, false);
              },
              onBeforeElUpdated: (fromEl, toEl) => {
                if (fromEl.id && fromEl.isSameNode(targetContainer2) && fromEl.id !== toEl.id) {
                  morphCallbacks.onNodeDiscarded(fromEl);
                  fromEl.replaceWith(toEl);
                  return morphCallbacks.onNodeAdded(toEl);
                }
                dom_default.syncPendingAttrs(fromEl, toEl);
                dom_default.maintainPrivateHooks(fromEl, toEl, phxViewportTop, phxViewportBottom);
                dom_default.cleanChildNodes(toEl, phxUpdate);
                if (this.skipCIDSibling(toEl)) {
                  this.maybeReOrderStream(fromEl);
                  return false;
                }
                if (dom_default.isPhxSticky(fromEl)) {
                  [PHX_SESSION, PHX_STATIC, PHX_ROOT_ID].map((attr) => [attr, fromEl.getAttribute(attr), toEl.getAttribute(attr)]).forEach(([attr, fromVal, toVal]) => {
                    if (toVal && fromVal !== toVal) {
                      fromEl.setAttribute(attr, toVal);
                    }
                  });
                  return false;
                }
                if (dom_default.isIgnored(fromEl, phxUpdate) || fromEl.form && fromEl.form.isSameNode(externalFormTriggered)) {
                  this.trackBefore("updated", fromEl, toEl);
                  dom_default.mergeAttrs(fromEl, toEl, { isIgnored: dom_default.isIgnored(fromEl, phxUpdate) });
                  updates.push(fromEl);
                  dom_default.applyStickyOperations(fromEl);
                  return false;
                }
                if (fromEl.type === "number" && (fromEl.validity && fromEl.validity.badInput)) {
                  return false;
                }
                let isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isFormInput(fromEl);
                let focusedSelectChanged = isFocusedFormEl && this.isChangedSelect(fromEl, toEl);
                if (fromEl.hasAttribute(PHX_REF_SRC)) {
                  const ref = new ElementRef(fromEl);
                  if (ref.lockRef && (!this.undoRef || !ref.isLockUndoneBy(this.undoRef))) {
                    if (dom_default.isUploadInput(fromEl)) {
                      dom_default.mergeAttrs(fromEl, toEl, { isIgnored: true });
                      this.trackBefore("updated", fromEl, toEl);
                      updates.push(fromEl);
                    }
                    dom_default.applyStickyOperations(fromEl);
                    let isLocked = fromEl.hasAttribute(PHX_REF_LOCK);
                    let clone2 = isLocked ? dom_default.private(fromEl, PHX_REF_LOCK) || fromEl.cloneNode(true) : null;
                    if (clone2) {
                      dom_default.putPrivate(fromEl, PHX_REF_LOCK, clone2);
                      if (!isFocusedFormEl) {
                        fromEl = clone2;
                      }
                    }
                  }
                }
                if (dom_default.isPhxChild(toEl)) {
                  let prevSession = fromEl.getAttribute(PHX_SESSION);
                  dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
                  if (prevSession !== "") {
                    fromEl.setAttribute(PHX_SESSION, prevSession);
                  }
                  fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
                  dom_default.applyStickyOperations(fromEl);
                  return false;
                }
                if (this.undoRef && dom_default.private(toEl, PHX_REF_LOCK)) {
                  dom_default.putPrivate(fromEl, PHX_REF_LOCK, dom_default.private(toEl, PHX_REF_LOCK));
                }
                dom_default.copyPrivates(toEl, fromEl);
                if (isFocusedFormEl && fromEl.type !== "hidden" && !focusedSelectChanged) {
                  this.trackBefore("updated", fromEl, toEl);
                  dom_default.mergeFocusedInput(fromEl, toEl);
                  dom_default.syncAttrsToProps(fromEl);
                  updates.push(fromEl);
                  dom_default.applyStickyOperations(fromEl);
                  return false;
                } else {
                  if (focusedSelectChanged) {
                    fromEl.blur();
                  }
                  if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                    appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
                  }
                  dom_default.syncAttrsToProps(toEl);
                  dom_default.applyStickyOperations(toEl);
                  this.trackBefore("updated", fromEl, toEl);
                  return fromEl;
                }
              }
            };
            morphdom_esm_default(targetContainer2, source, morphCallbacks);
          }
          this.trackBefore("added", container);
          this.trackBefore("updated", container, container);
          liveSocket.time("morphdom", () => {
            this.streams.forEach(([ref, inserts, deleteIds, reset]) => {
              inserts.forEach(([key, streamAt, limit]) => {
                this.streamInserts[key] = { ref, streamAt, limit, reset };
              });
              if (reset !== void 0) {
                dom_default.all(container, `[${PHX_STREAM_REF}="${ref}"]`, (child) => {
                  this.removeStreamChildElement(child);
                });
              }
              deleteIds.forEach((id) => {
                let child = container.querySelector(`[id="${id}"]`);
                if (child) {
                  this.removeStreamChildElement(child);
                }
              });
            });
            if (isJoinPatch) {
              dom_default.all(this.container, `[${phxUpdate}=${PHX_STREAM}]`).filter((el) => this.view.ownsElement(el)).forEach((el) => {
                Array.from(el.children).forEach((child) => {
                  this.removeStreamChildElement(child, true);
                });
              });
            }
            morph.call(this, targetContainer, html);
          });
          if (liveSocket.isDebugEnabled()) {
            detectDuplicateIds();
            detectInvalidStreamInserts(this.streamInserts);
            Array.from(document.querySelectorAll("input[name=id]")).forEach((node) => {
              if (node.form) {
                console.error('Detected an input with name="id" inside a form! This will cause problems when patching the DOM.\n', node);
              }
            });
          }
          if (appendPrependUpdates.length > 0) {
            liveSocket.time("post-morph append/prepend restoration", () => {
              appendPrependUpdates.forEach((update) => update.perform());
            });
          }
          liveSocket.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
          dom_default.dispatchEvent(document, "phx:update");
          added.forEach((el) => this.trackAfter("added", el));
          updates.forEach((el) => this.trackAfter("updated", el));
          this.transitionPendingRemoves();
          if (externalFormTriggered) {
            liveSocket.unload();
            const submitter = dom_default.private(externalFormTriggered, "submitter");
            if (submitter && submitter.name && targetContainer.contains(submitter)) {
              const input = document.createElement("input");
              input.type = "hidden";
              const formId = submitter.getAttribute("form");
              if (formId) {
                input.setAttribute("form", formId);
              }
              input.name = submitter.name;
              input.value = submitter.value;
              submitter.parentElement.insertBefore(input, submitter);
            }
            Object.getPrototypeOf(externalFormTriggered).submit.call(externalFormTriggered);
          }
          return true;
        }
        onNodeDiscarded(el) {
          if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
            this.liveSocket.destroyViewByEl(el);
          }
          this.trackAfter("discarded", el);
        }
        maybePendingRemove(node) {
          if (node.getAttribute && node.getAttribute(this.phxRemove) !== null) {
            this.pendingRemoves.push(node);
            return true;
          } else {
            return false;
          }
        }
        removeStreamChildElement(child, force = false) {
          if (!force && !this.view.ownsElement(child)) {
            return;
          }
          if (this.streamInserts[child.id]) {
            this.streamComponentRestore[child.id] = child;
            child.remove();
          } else {
            if (!this.maybePendingRemove(child)) {
              child.remove();
              this.onNodeDiscarded(child);
            }
          }
        }
        getStreamInsert(el) {
          let insert = el.id ? this.streamInserts[el.id] : {};
          return insert || {};
        }
        setStreamRef(el, ref) {
          dom_default.putSticky(el, PHX_STREAM_REF, (el2) => el2.setAttribute(PHX_STREAM_REF, ref));
        }
        maybeReOrderStream(el, isNew) {
          let { ref, streamAt, reset } = this.getStreamInsert(el);
          if (streamAt === void 0) {
            return;
          }
          this.setStreamRef(el, ref);
          if (!reset && !isNew) {
            return;
          }
          if (!el.parentElement) {
            return;
          }
          if (streamAt === 0) {
            el.parentElement.insertBefore(el, el.parentElement.firstElementChild);
          } else if (streamAt > 0) {
            let children = Array.from(el.parentElement.children);
            let oldIndex = children.indexOf(el);
            if (streamAt >= children.length - 1) {
              el.parentElement.appendChild(el);
            } else {
              let sibling = children[streamAt];
              if (oldIndex > streamAt) {
                el.parentElement.insertBefore(el, sibling);
              } else {
                el.parentElement.insertBefore(el, sibling.nextElementSibling);
              }
            }
          }
          this.maybeLimitStream(el);
        }
        maybeLimitStream(el) {
          let { limit } = this.getStreamInsert(el);
          let children = limit !== null && Array.from(el.parentElement.children);
          if (limit && limit < 0 && children.length > limit * -1) {
            children.slice(0, children.length + limit).forEach((child) => this.removeStreamChildElement(child));
          } else if (limit && limit >= 0 && children.length > limit) {
            children.slice(limit).forEach((child) => this.removeStreamChildElement(child));
          }
        }
        transitionPendingRemoves() {
          let { pendingRemoves, liveSocket } = this;
          if (pendingRemoves.length > 0) {
            liveSocket.transitionRemoves(pendingRemoves, () => {
              pendingRemoves.forEach((el) => {
                let child = dom_default.firstPhxChild(el);
                if (child) {
                  liveSocket.destroyViewByEl(child);
                }
                el.remove();
              });
              this.trackAfter("transitionsDiscarded", pendingRemoves);
            });
          }
        }
        isChangedSelect(fromEl, toEl) {
          if (!(fromEl instanceof HTMLSelectElement) || fromEl.multiple) {
            return false;
          }
          if (fromEl.options.length !== toEl.options.length) {
            return true;
          }
          toEl.value = fromEl.value;
          return !fromEl.isEqualNode(toEl);
        }
        isCIDPatch() {
          return this.cidPatch;
        }
        skipCIDSibling(el) {
          return el.nodeType === Node.ELEMENT_NODE && el.hasAttribute(PHX_SKIP);
        }
        targetCIDContainer(html) {
          if (!this.isCIDPatch()) {
            return;
          }
          let [first, ...rest] = dom_default.findComponentNodeList(this.container, this.targetCID);
          if (rest.length === 0 && dom_default.childNodeLength(html) === 1) {
            return first;
          } else {
            return first && first.parentNode;
          }
        }
        indexOf(parent, child) {
          return Array.from(parent.children).indexOf(child);
        }
      };
      VOID_TAGS = /* @__PURE__ */ new Set([
        "area",
        "base",
        "br",
        "col",
        "command",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
      ]);
      quoteChars = /* @__PURE__ */ new Set(["'", '"']);
      modifyRoot = (html, attrs, clearInnerHTML) => {
        let i = 0;
        let insideComment = false;
        let beforeTag, afterTag, tag, tagNameEndsAt, id, newHTML;
        let lookahead = html.match(/^(\s*(?:<!--.*?-->\s*)*)<([^\s\/>]+)/);
        if (lookahead === null) {
          throw new Error(`malformed html ${html}`);
        }
        i = lookahead[0].length;
        beforeTag = lookahead[1];
        tag = lookahead[2];
        tagNameEndsAt = i;
        for (i; i < html.length; i++) {
          if (html.charAt(i) === ">") {
            break;
          }
          if (html.charAt(i) === "=") {
            let isId = html.slice(i - 3, i) === " id";
            i++;
            let char = html.charAt(i);
            if (quoteChars.has(char)) {
              let attrStartsAt = i;
              i++;
              for (i; i < html.length; i++) {
                if (html.charAt(i) === char) {
                  break;
                }
              }
              if (isId) {
                id = html.slice(attrStartsAt + 1, i);
                break;
              }
            }
          }
        }
        let closeAt = html.length - 1;
        insideComment = false;
        while (closeAt >= beforeTag.length + tag.length) {
          let char = html.charAt(closeAt);
          if (insideComment) {
            if (char === "-" && html.slice(closeAt - 3, closeAt) === "<!-") {
              insideComment = false;
              closeAt -= 4;
            } else {
              closeAt -= 1;
            }
          } else if (char === ">" && html.slice(closeAt - 2, closeAt) === "--") {
            insideComment = true;
            closeAt -= 3;
          } else if (char === ">") {
            break;
          } else {
            closeAt -= 1;
          }
        }
        afterTag = html.slice(closeAt + 1, html.length);
        let attrsStr = Object.keys(attrs).map((attr) => attrs[attr] === true ? attr : `${attr}="${attrs[attr]}"`).join(" ");
        if (clearInnerHTML) {
          let idAttrStr = id ? ` id="${id}"` : "";
          if (VOID_TAGS.has(tag)) {
            newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}/>`;
          } else {
            newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}></${tag}>`;
          }
        } else {
          let rest = html.slice(tagNameEndsAt, closeAt + 1);
          newHTML = `<${tag}${attrsStr === "" ? "" : " "}${attrsStr}${rest}`;
        }
        return [newHTML, beforeTag, afterTag];
      };
      Rendered = class {
        static extract(diff) {
          let { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
          delete diff[REPLY];
          delete diff[EVENTS];
          delete diff[TITLE];
          return { diff, title, reply: reply || null, events: events || [] };
        }
        constructor(viewId, rendered) {
          this.viewId = viewId;
          this.rendered = {};
          this.magicId = 0;
          this.mergeDiff(rendered);
        }
        parentViewId() {
          return this.viewId;
        }
        toString(onlyCids) {
          let [str, streams] = this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids, true, {});
          return [str, streams];
        }
        recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids, changeTracking, rootAttrs) {
          onlyCids = onlyCids ? new Set(onlyCids) : null;
          let output = { buffer: "", components, onlyCids, streams: /* @__PURE__ */ new Set() };
          this.toOutputBuffer(rendered, null, output, changeTracking, rootAttrs);
          return [output.buffer, output.streams];
        }
        componentCIDs(diff) {
          return Object.keys(diff[COMPONENTS] || {}).map((i) => parseInt(i));
        }
        isComponentOnlyDiff(diff) {
          if (!diff[COMPONENTS]) {
            return false;
          }
          return Object.keys(diff).length === 1;
        }
        getComponent(diff, cid) {
          return diff[COMPONENTS][cid];
        }
        resetRender(cid) {
          if (this.rendered[COMPONENTS][cid]) {
            this.rendered[COMPONENTS][cid].reset = true;
          }
        }
        mergeDiff(diff) {
          let newc = diff[COMPONENTS];
          let cache = {};
          delete diff[COMPONENTS];
          this.rendered = this.mutableMerge(this.rendered, diff);
          this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
          if (newc) {
            let oldc = this.rendered[COMPONENTS];
            for (let cid in newc) {
              newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
            }
            for (let cid in newc) {
              oldc[cid] = newc[cid];
            }
            diff[COMPONENTS] = newc;
          }
        }
        cachedFindComponent(cid, cdiff, oldc, newc, cache) {
          if (cache[cid]) {
            return cache[cid];
          } else {
            let ndiff, stat, scid = cdiff[STATIC];
            if (isCid(scid)) {
              let tdiff;
              if (scid > 0) {
                tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
              } else {
                tdiff = oldc[-scid];
              }
              stat = tdiff[STATIC];
              ndiff = this.cloneMerge(tdiff, cdiff, true);
              ndiff[STATIC] = stat;
            } else {
              ndiff = cdiff[STATIC] !== void 0 || oldc[cid] === void 0 ? cdiff : this.cloneMerge(oldc[cid], cdiff, false);
            }
            cache[cid] = ndiff;
            return ndiff;
          }
        }
        mutableMerge(target, source) {
          if (source[STATIC] !== void 0) {
            return source;
          } else {
            this.doMutableMerge(target, source);
            return target;
          }
        }
        doMutableMerge(target, source) {
          for (let key in source) {
            let val = source[key];
            let targetVal = target[key];
            let isObjVal = isObject(val);
            if (isObjVal && val[STATIC] === void 0 && isObject(targetVal)) {
              this.doMutableMerge(targetVal, val);
            } else {
              target[key] = val;
            }
          }
          if (target[ROOT]) {
            target.newRender = true;
          }
        }
        // Merges cid trees together, copying statics from source tree.
        //
        // The `pruneMagicId` is passed to control pruning the magicId of the
        // target. We must always prune the magicId when we are sharing statics
        // from another component. If not pruning, we replicate the logic from
        // mutableMerge, where we set newRender to true if there is a root
        // (effectively forcing the new version to be rendered instead of skipped)
        //
        cloneMerge(target, source, pruneMagicId) {
          let merged = __spreadValues(__spreadValues({}, target), source);
          for (let key in merged) {
            let val = source[key];
            let targetVal = target[key];
            if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
              merged[key] = this.cloneMerge(targetVal, val, pruneMagicId);
            } else if (val === void 0 && isObject(targetVal)) {
              merged[key] = this.cloneMerge(targetVal, {}, pruneMagicId);
            }
          }
          if (pruneMagicId) {
            delete merged.magicId;
            delete merged.newRender;
          } else if (target[ROOT]) {
            merged.newRender = true;
          }
          return merged;
        }
        componentToString(cid) {
          let [str, streams] = this.recursiveCIDToString(this.rendered[COMPONENTS], cid, null);
          let [strippedHTML, _before, _after] = modifyRoot(str, {});
          return [strippedHTML, streams];
        }
        pruneCIDs(cids) {
          cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
        }
        // private
        get() {
          return this.rendered;
        }
        isNewFingerprint(diff = {}) {
          return !!diff[STATIC];
        }
        templateStatic(part, templates) {
          if (typeof part === "number") {
            return templates[part];
          } else {
            return part;
          }
        }
        nextMagicID() {
          this.magicId++;
          return `m${this.magicId}-${this.parentViewId()}`;
        }
        // Converts rendered tree to output buffer.
        //
        // changeTracking controls if we can apply the PHX_SKIP optimization.
        // It is disabled for comprehensions since we must re-render the entire collection
        // and no individual element is tracked inside the comprehension.
        toOutputBuffer(rendered, templates, output, changeTracking, rootAttrs = {}) {
          if (rendered[DYNAMICS]) {
            return this.comprehensionToBuffer(rendered, templates, output);
          }
          let { [STATIC]: statics } = rendered;
          statics = this.templateStatic(statics, templates);
          let isRoot = rendered[ROOT];
          let prevBuffer = output.buffer;
          if (isRoot) {
            output.buffer = "";
          }
          if (changeTracking && isRoot && !rendered.magicId) {
            rendered.newRender = true;
            rendered.magicId = this.nextMagicID();
          }
          output.buffer += statics[0];
          for (let i = 1; i < statics.length; i++) {
            this.dynamicToBuffer(rendered[i - 1], templates, output, changeTracking);
            output.buffer += statics[i];
          }
          if (isRoot) {
            let skip = false;
            let attrs;
            if (changeTracking || rendered.magicId) {
              skip = changeTracking && !rendered.newRender;
              attrs = __spreadValues({ [PHX_MAGIC_ID]: rendered.magicId }, rootAttrs);
            } else {
              attrs = rootAttrs;
            }
            if (skip) {
              attrs[PHX_SKIP] = true;
            }
            let [newRoot, commentBefore, commentAfter] = modifyRoot(output.buffer, attrs, skip);
            rendered.newRender = false;
            output.buffer = prevBuffer + commentBefore + newRoot + commentAfter;
          }
        }
        comprehensionToBuffer(rendered, templates, output) {
          let { [DYNAMICS]: dynamics, [STATIC]: statics, [STREAM]: stream } = rendered;
          let [_ref, _inserts, deleteIds, reset] = stream || [null, {}, [], null];
          statics = this.templateStatic(statics, templates);
          let compTemplates = templates || rendered[TEMPLATES];
          for (let d = 0; d < dynamics.length; d++) {
            let dynamic = dynamics[d];
            output.buffer += statics[0];
            for (let i = 1; i < statics.length; i++) {
              let changeTracking = false;
              this.dynamicToBuffer(dynamic[i - 1], compTemplates, output, changeTracking);
              output.buffer += statics[i];
            }
          }
          if (stream !== void 0 && (rendered[DYNAMICS].length > 0 || deleteIds.length > 0 || reset)) {
            delete rendered[STREAM];
            rendered[DYNAMICS] = [];
            output.streams.add(stream);
          }
        }
        dynamicToBuffer(rendered, templates, output, changeTracking) {
          if (typeof rendered === "number") {
            let [str, streams] = this.recursiveCIDToString(output.components, rendered, output.onlyCids);
            output.buffer += str;
            output.streams = /* @__PURE__ */ new Set([...output.streams, ...streams]);
          } else if (isObject(rendered)) {
            this.toOutputBuffer(rendered, templates, output, changeTracking, {});
          } else {
            output.buffer += rendered;
          }
        }
        recursiveCIDToString(components, cid, onlyCids) {
          let component = components[cid] || logError(`no component for CID ${cid}`, components);
          let attrs = { [PHX_COMPONENT]: cid };
          let skip = onlyCids && !onlyCids.has(cid);
          component.newRender = !skip;
          component.magicId = `c${cid}-${this.parentViewId()}`;
          let changeTracking = !component.reset;
          let [html, streams] = this.recursiveToString(component, components, onlyCids, changeTracking, attrs);
          delete component.reset;
          return [html, streams];
        }
      };
      focusStack = [];
      default_transition_time = 200;
      JS = {
        // private
        exec(e, eventType, phxEvent, view, sourceEl, defaults) {
          let [defaultKind, defaultArgs] = defaults || [null, { callback: defaults && defaults.callback }];
          let commands = phxEvent.charAt(0) === "[" ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
          commands.forEach(([kind, args]) => {
            if (kind === defaultKind) {
              args = __spreadValues(__spreadValues({}, defaultArgs), args);
              args.callback = args.callback || defaultArgs.callback;
            }
            this.filterToEls(view.liveSocket, sourceEl, args).forEach((el) => {
              this[`exec_${kind}`](e, eventType, phxEvent, view, sourceEl, el, args);
            });
          });
        },
        isVisible(el) {
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
        },
        // returns true if any part of the element is inside the viewport
        isInViewport(el) {
          const rect = el.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          const windowWidth = window.innerWidth || document.documentElement.clientWidth;
          return rect.right > 0 && rect.bottom > 0 && rect.left < windowWidth && rect.top < windowHeight;
        },
        // private
        // commands
        exec_exec(e, eventType, phxEvent, view, sourceEl, el, { attr, to }) {
          let encodedJS = el.getAttribute(attr);
          if (!encodedJS) {
            throw new Error(`expected ${attr} to contain JS command on "${to}"`);
          }
          view.liveSocket.execJS(el, encodedJS, eventType);
        },
        exec_dispatch(e, eventType, phxEvent, view, sourceEl, el, { event, detail, bubbles }) {
          detail = detail || {};
          detail.dispatcher = sourceEl;
          dom_default.dispatchEvent(el, event, { detail, bubbles });
        },
        exec_push(e, eventType, phxEvent, view, sourceEl, el, args) {
          let { event, data, target, page_loading, loading, value, dispatcher, callback } = args;
          let pushOpts = { loading, value, target, page_loading: !!page_loading };
          let targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
          let phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
          const handler = (targetView, targetCtx) => {
            if (!targetView.isConnected()) {
              return;
            }
            if (eventType === "change") {
              let { newCid, _target } = args;
              _target = _target || (dom_default.isFormInput(sourceEl) ? sourceEl.name : void 0);
              if (_target) {
                pushOpts._target = _target;
              }
              targetView.pushInput(sourceEl, targetCtx, newCid, event || phxEvent, pushOpts, callback);
            } else if (eventType === "submit") {
              let { submitter } = args;
              targetView.submitForm(sourceEl, targetCtx, event || phxEvent, submitter, pushOpts, callback);
            } else {
              targetView.pushEvent(eventType, sourceEl, targetCtx, event || phxEvent, data, pushOpts, callback);
            }
          };
          if (args.targetView && args.targetCtx) {
            handler(args.targetView, args.targetCtx);
          } else {
            view.withinTargets(phxTarget, handler);
          }
        },
        exec_navigate(e, eventType, phxEvent, view, sourceEl, el, { href, replace }) {
          view.liveSocket.historyRedirect(e, href, replace ? "replace" : "push", null, sourceEl);
        },
        exec_patch(e, eventType, phxEvent, view, sourceEl, el, { href, replace }) {
          view.liveSocket.pushHistoryPatch(e, href, replace ? "replace" : "push", sourceEl);
        },
        exec_focus(e, eventType, phxEvent, view, sourceEl, el) {
          aria_default.attemptFocus(el);
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => aria_default.attemptFocus(el));
          });
        },
        exec_focus_first(e, eventType, phxEvent, view, sourceEl, el) {
          aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el);
          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el));
          });
        },
        exec_push_focus(e, eventType, phxEvent, view, sourceEl, el) {
          focusStack.push(el || sourceEl);
        },
        exec_pop_focus(_e, _eventType, _phxEvent, _view, _sourceEl, _el) {
          const el = focusStack.pop();
          if (el) {
            el.focus();
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => el.focus());
            });
          }
        },
        exec_add_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
          this.addOrRemoveClasses(el, names, [], transition, time, view, blocking);
        },
        exec_remove_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
          this.addOrRemoveClasses(el, [], names, transition, time, view, blocking);
        },
        exec_toggle_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
          this.toggleClasses(el, names, transition, time, view, blocking);
        },
        exec_toggle_attr(e, eventType, phxEvent, view, sourceEl, el, { attr: [attr, val1, val2] }) {
          this.toggleAttr(el, attr, val1, val2);
        },
        exec_transition(e, eventType, phxEvent, view, sourceEl, el, { time, transition, blocking }) {
          this.addOrRemoveClasses(el, [], [], transition, time, view, blocking);
        },
        exec_toggle(e, eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time, blocking }) {
          this.toggle(eventType, view, el, display, ins, outs, time, blocking);
        },
        exec_show(e, eventType, phxEvent, view, sourceEl, el, { display, transition, time, blocking }) {
          this.show(eventType, view, el, display, transition, time, blocking);
        },
        exec_hide(e, eventType, phxEvent, view, sourceEl, el, { display, transition, time, blocking }) {
          this.hide(eventType, view, el, display, transition, time, blocking);
        },
        exec_set_attr(e, eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
          this.setOrRemoveAttrs(el, [[attr, val]], []);
        },
        exec_remove_attr(e, eventType, phxEvent, view, sourceEl, el, { attr }) {
          this.setOrRemoveAttrs(el, [], [attr]);
        },
        // utils for commands
        show(eventType, view, el, display, transition, time, blocking) {
          if (!this.isVisible(el)) {
            this.toggle(eventType, view, el, display, transition, null, time, blocking);
          }
        },
        hide(eventType, view, el, display, transition, time, blocking) {
          if (this.isVisible(el)) {
            this.toggle(eventType, view, el, display, null, transition, time, blocking);
          }
        },
        toggle(eventType, view, el, display, ins, outs, time, blocking) {
          time = time || default_transition_time;
          let [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
          let [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
          if (inClasses.length > 0 || outClasses.length > 0) {
            if (this.isVisible(el)) {
              let onStart = () => {
                this.addOrRemoveClasses(el, outStartClasses, inClasses.concat(inStartClasses).concat(inEndClasses));
                window.requestAnimationFrame(() => {
                  this.addOrRemoveClasses(el, outClasses, []);
                  window.requestAnimationFrame(() => this.addOrRemoveClasses(el, outEndClasses, outStartClasses));
                });
              };
              let onEnd = () => {
                this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
                dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
                el.dispatchEvent(new Event("phx:hide-end"));
              };
              el.dispatchEvent(new Event("phx:hide-start"));
              if (blocking === false) {
                onStart();
                setTimeout(onEnd, time);
              } else {
                view.transition(time, onStart, onEnd);
              }
            } else {
              if (eventType === "remove") {
                return;
              }
              let onStart = () => {
                this.addOrRemoveClasses(el, inStartClasses, outClasses.concat(outStartClasses).concat(outEndClasses));
                const stickyDisplay = display || this.defaultDisplay(el);
                window.requestAnimationFrame(() => {
                  this.addOrRemoveClasses(el, inClasses, []);
                  window.requestAnimationFrame(() => {
                    dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
                    this.addOrRemoveClasses(el, inEndClasses, inStartClasses);
                  });
                });
              };
              let onEnd = () => {
                this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
                el.dispatchEvent(new Event("phx:show-end"));
              };
              el.dispatchEvent(new Event("phx:show-start"));
              if (blocking === false) {
                onStart();
                setTimeout(onEnd, time);
              } else {
                view.transition(time, onStart, onEnd);
              }
            }
          } else {
            if (this.isVisible(el)) {
              window.requestAnimationFrame(() => {
                el.dispatchEvent(new Event("phx:hide-start"));
                dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
                el.dispatchEvent(new Event("phx:hide-end"));
              });
            } else {
              window.requestAnimationFrame(() => {
                el.dispatchEvent(new Event("phx:show-start"));
                let stickyDisplay = display || this.defaultDisplay(el);
                dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
                el.dispatchEvent(new Event("phx:show-end"));
              });
            }
          }
        },
        toggleClasses(el, classes, transition, time, view, blocking) {
          window.requestAnimationFrame(() => {
            let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
            let newAdds = classes.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
            let newRemoves = classes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
            this.addOrRemoveClasses(el, newAdds, newRemoves, transition, time, view, blocking);
          });
        },
        toggleAttr(el, attr, val1, val2) {
          if (el.hasAttribute(attr)) {
            if (val2 !== void 0) {
              if (el.getAttribute(attr) === val1) {
                this.setOrRemoveAttrs(el, [[attr, val2]], []);
              } else {
                this.setOrRemoveAttrs(el, [[attr, val1]], []);
              }
            } else {
              this.setOrRemoveAttrs(el, [], [attr]);
            }
          } else {
            this.setOrRemoveAttrs(el, [[attr, val1]], []);
          }
        },
        addOrRemoveClasses(el, adds, removes, transition, time, view, blocking) {
          time = time || default_transition_time;
          let [transitionRun, transitionStart, transitionEnd] = transition || [[], [], []];
          if (transitionRun.length > 0) {
            let onStart = () => {
              this.addOrRemoveClasses(el, transitionStart, [].concat(transitionRun).concat(transitionEnd));
              window.requestAnimationFrame(() => {
                this.addOrRemoveClasses(el, transitionRun, []);
                window.requestAnimationFrame(() => this.addOrRemoveClasses(el, transitionEnd, transitionStart));
              });
            };
            let onDone = () => this.addOrRemoveClasses(el, adds.concat(transitionEnd), removes.concat(transitionRun).concat(transitionStart));
            if (blocking === false) {
              onStart();
              setTimeout(onDone, time);
            } else {
              view.transition(time, onStart, onDone);
            }
            return;
          }
          window.requestAnimationFrame(() => {
            let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
            let keepAdds = adds.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
            let keepRemoves = removes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
            let newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
            let newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
            dom_default.putSticky(el, "classes", (currentEl) => {
              currentEl.classList.remove(...newRemoves);
              currentEl.classList.add(...newAdds);
              return [newAdds, newRemoves];
            });
          });
        },
        setOrRemoveAttrs(el, sets, removes) {
          let [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
          let alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
          let newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
          let newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
          dom_default.putSticky(el, "attrs", (currentEl) => {
            newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
            newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
            return [newSets, newRemoves];
          });
        },
        hasAllClasses(el, classes) {
          return classes.every((name) => el.classList.contains(name));
        },
        isToggledOut(el, outClasses) {
          return !this.isVisible(el) || this.hasAllClasses(el, outClasses);
        },
        filterToEls(liveSocket, sourceEl, { to }) {
          let defaultQuery = () => {
            if (typeof to === "string") {
              return document.querySelectorAll(to);
            } else if (to.closest) {
              let toEl = sourceEl.closest(to.closest);
              return toEl ? [toEl] : [];
            } else if (to.inner) {
              return sourceEl.querySelectorAll(to.inner);
            }
          };
          return to ? liveSocket.jsQuerySelectorAll(sourceEl, to, defaultQuery) : [sourceEl];
        },
        defaultDisplay(el) {
          return { tr: "table-row", td: "table-cell" }[el.tagName.toLowerCase()] || "block";
        },
        transitionClasses(val) {
          if (!val) {
            return null;
          }
          let [trans, tStart, tEnd] = Array.isArray(val) ? val : [val.split(" "), [], []];
          trans = Array.isArray(trans) ? trans : trans.split(" ");
          tStart = Array.isArray(tStart) ? tStart : tStart.split(" ");
          tEnd = Array.isArray(tEnd) ? tEnd : tEnd.split(" ");
          return [trans, tStart, tEnd];
        }
      };
      js_default = JS;
      HOOK_ID = "hookId";
      viewHookID = 1;
      ViewHook = class {
        static makeID() {
          return viewHookID++;
        }
        static elementID(el) {
          return dom_default.private(el, HOOK_ID);
        }
        constructor(view, el, callbacks) {
          this.el = el;
          this.__attachView(view);
          this.__callbacks = callbacks;
          this.__listeners = /* @__PURE__ */ new Set();
          this.__isDisconnected = false;
          dom_default.putPrivate(this.el, HOOK_ID, this.constructor.makeID());
          for (let key in this.__callbacks) {
            this[key] = this.__callbacks[key];
          }
        }
        __attachView(view) {
          if (view) {
            this.__view = () => view;
            this.liveSocket = view.liveSocket;
          } else {
            this.__view = () => {
              throw new Error(`hook not yet attached to a live view: ${this.el.outerHTML}`);
            };
            this.liveSocket = null;
          }
        }
        __mounted() {
          this.mounted && this.mounted();
        }
        __updated() {
          this.updated && this.updated();
        }
        __beforeUpdate() {
          this.beforeUpdate && this.beforeUpdate();
        }
        __destroyed() {
          this.destroyed && this.destroyed();
          dom_default.deletePrivate(this.el, HOOK_ID);
        }
        __reconnected() {
          if (this.__isDisconnected) {
            this.__isDisconnected = false;
            this.reconnected && this.reconnected();
          }
        }
        __disconnected() {
          this.__isDisconnected = true;
          this.disconnected && this.disconnected();
        }
        /**
         * Binds the hook to JS commands.
         *
         * @param {ViewHook} hook - The ViewHook instance to bind.
         *
         * @returns {Object} An object with methods to manipulate the DOM and execute JavaScript.
         */
        js() {
          let hook = this;
          return {
            /**
             * Executes encoded JavaScript in the context of the hook element.
             *
             * @param {string} encodedJS - The encoded JavaScript string to execute.
             */
            exec(encodedJS) {
              hook.__view().liveSocket.execJS(hook.el, encodedJS, "hook");
            },
            /**
             * Shows an element.
             *
             * @param {HTMLElement} el - The element to show.
             * @param {Object} [opts={}] - Optional settings.
             * @param {string} [opts.display] - The CSS display value to set. Defaults "block".
             * @param {string} [opts.transition] - The CSS transition classes to set when showing.
             * @param {number} [opts.time] - The transition duration in milliseconds. Defaults 200.
             * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
             *  Defaults `true`.
             */
            show(el, opts = {}) {
              let owner = hook.__view().liveSocket.owner(el);
              js_default.show("hook", owner, el, opts.display, opts.transition, opts.time, opts.blocking);
            },
            /**
             * Hides an element.
             *
             * @param {HTMLElement} el - The element to hide.
             * @param {Object} [opts={}] - Optional settings.
             * @param {string} [opts.transition] - The CSS transition classes to set when hiding.
             * @param {number} [opts.time] - The transition duration in milliseconds. Defaults 200.
             * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
             *   Defaults `true`.
             */
            hide(el, opts = {}) {
              let owner = hook.__view().liveSocket.owner(el);
              js_default.hide("hook", owner, el, null, opts.transition, opts.time, opts.blocking);
            },
            /**
             * Toggles the visibility of an element.
             *
             * @param {HTMLElement} el - The element to toggle.
             * @param {Object} [opts={}] - Optional settings.
             * @param {string} [opts.display] - The CSS display value to set. Defaults "block".
             * @param {string} [opts.in] - The CSS transition classes for showing.
             *   Accepts either the string of classes to apply when toggling in, or
             *   a 3-tuple containing the transition class, the class to apply
             *   to start the transition, and the ending transition class, such as:
             *
             *       ["ease-out duration-300", "opacity-0", "opacity-100"]
             *
             * @param {string} [opts.out] - The CSS transition classes for hiding.
             *   Accepts either string of classes to apply when toggling out, or
             *   a 3-tuple containing the transition class, the class to apply
             *   to start the transition, and the ending transition class, such as:
             *
             *       ["ease-out duration-300", "opacity-100", "opacity-0"]
             *
             * @param {number} [opts.time] - The transition duration in milliseconds.
             *
             * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
             *   Defaults `true`.
             */
            toggle(el, opts = {}) {
              let owner = hook.__view().liveSocket.owner(el);
              opts.in = js_default.transitionClasses(opts.in);
              opts.out = js_default.transitionClasses(opts.out);
              js_default.toggle("hook", owner, el, opts.display, opts.in, opts.out, opts.time, opts.blocking);
            },
            /**
             * Adds CSS classes to an element.
             *
             * @param {HTMLElement} el - The element to add classes to.
             * @param {string|string[]} names - The class name(s) to add.
             * @param {Object} [opts={}] - Optional settings.
             * @param {string} [opts.transition] - The CSS transition property to set.
             *   Accepts a string of classes to apply when adding classes or
             *   a 3-tuple containing the transition class, the class to apply
             *   to start the transition, and the ending transition class, such as:
             *
             *       ["ease-out duration-300", "opacity-0", "opacity-100"]
             *
             * @param {number} [opts.time] - The transition duration in milliseconds.
             * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
             *   Defaults `true`.
             */
            addClass(el, names, opts = {}) {
              names = Array.isArray(names) ? names : names.split(" ");
              let owner = hook.__view().liveSocket.owner(el);
              js_default.addOrRemoveClasses(el, names, [], opts.transition, opts.time, owner, opts.blocking);
            },
            /**
             * Removes CSS classes from an element.
             *
             * @param {HTMLElement} el - The element to remove classes from.
             * @param {string|string[]} names - The class name(s) to remove.
             * @param {Object} [opts={}] - Optional settings.
             * @param {string} [opts.transition] - The CSS transition classes to set.
             *   Accepts a string of classes to apply when removing classes or
             *   a 3-tuple containing the transition class, the class to apply
             *   to start the transition, and the ending transition class, such as:
             *
             *       ["ease-out duration-300", "opacity-100", "opacity-0"]
             *
             * @param {number} [opts.time] - The transition duration in milliseconds.
             * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
             *   Defaults `true`.
             */
            removeClass(el, names, opts = {}) {
              opts.transition = js_default.transitionClasses(opts.transition);
              names = Array.isArray(names) ? names : names.split(" ");
              let owner = hook.__view().liveSocket.owner(el);
              js_default.addOrRemoveClasses(el, [], names, opts.transition, opts.time, owner, opts.blocking);
            },
            /**
             * Toggles CSS classes on an element.
             *
             * @param {HTMLElement} el - The element to toggle classes on.
             * @param {string|string[]} names - The class name(s) to toggle.
             * @param {Object} [opts={}] - Optional settings.
             * @param {string} [opts.transition] - The CSS transition classes to set.
             *   Accepts a string of classes to apply when toggling classes or
             *   a 3-tuple containing the transition class, the class to apply
             *   to start the transition, and the ending transition class, such as:
             *
             *       ["ease-out duration-300", "opacity-100", "opacity-0"]
             *
             * @param {number} [opts.time] - The transition duration in milliseconds.
             * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
             *   Defaults `true`.
             */
            toggleClass(el, names, opts = {}) {
              opts.transition = js_default.transitionClasses(opts.transition);
              names = Array.isArray(names) ? names : names.split(" ");
              let owner = hook.__view().liveSocket.owner(el);
              js_default.toggleClasses(el, names, opts.transition, opts.time, owner, opts.blocking);
            },
            /**
             * Applies a CSS transition to an element.
             *
             * @param {HTMLElement} el - The element to apply the transition to.
             * @param {string|string[]} transition - The transition class(es) to apply.
             *   Accepts a string of classes to apply when transitioning or
             *   a 3-tuple containing the transition class, the class to apply
             *   to start the transition, and the ending transition class, such as:
             *
             *       ["ease-out duration-300", "opacity-100", "opacity-0"]
             *
             * @param {Object} [opts={}] - Optional settings.
             * @param {number} [opts.time] - The transition duration in milliseconds.
             * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
             *   Defaults `true`.
             */
            transition(el, transition, opts = {}) {
              let owner = hook.__view().liveSocket.owner(el);
              js_default.addOrRemoveClasses(el, [], [], js_default.transitionClasses(transition), opts.time, owner, opts.blocking);
            },
            /**
             * Sets an attribute on an element.
             *
             * @param {HTMLElement} el - The element to set the attribute on.
             * @param {string} attr - The attribute name to set.
             * @param {string} val - The value to set for the attribute.
             */
            setAttribute(el, attr, val) {
              js_default.setOrRemoveAttrs(el, [[attr, val]], []);
            },
            /**
             * Removes an attribute from an element.
             *
             * @param {HTMLElement} el - The element to remove the attribute from.
             * @param {string} attr - The attribute name to remove.
             */
            removeAttribute(el, attr) {
              js_default.setOrRemoveAttrs(el, [], [attr]);
            },
            /**
             * Toggles an attribute on an element between two values.
             *
             * @param {HTMLElement} el - The element to toggle the attribute on.
             * @param {string} attr - The attribute name to toggle.
             * @param {string} val1 - The first value to toggle between.
             * @param {string} val2 - The second value to toggle between.
             */
            toggleAttribute(el, attr, val1, val2) {
              js_default.toggleAttr(el, attr, val1, val2);
            }
          };
        }
        pushEvent(event, payload = {}, onReply) {
          if (onReply === void 0) {
            return new Promise((resolve, reject) => {
              try {
                const ref = this.__view().pushHookEvent(this.el, null, event, payload, (reply, _ref) => resolve(reply));
                if (ref === false) {
                  reject(new Error("unable to push hook event. LiveView not connected"));
                }
              } catch (error) {
                reject(error);
              }
            });
          }
          return this.__view().pushHookEvent(this.el, null, event, payload, onReply);
        }
        pushEventTo(phxTarget, event, payload = {}, onReply) {
          if (onReply === void 0) {
            return new Promise((resolve, reject) => {
              try {
                this.__view().withinTargets(phxTarget, (view, targetCtx) => {
                  const ref = view.pushHookEvent(this.el, targetCtx, event, payload, (reply, _ref) => resolve(reply));
                  if (ref === false) {
                    reject(new Error("unable to push hook event. LiveView not connected"));
                  }
                });
              } catch (error) {
                reject(error);
              }
            });
          }
          return this.__view().withinTargets(phxTarget, (view, targetCtx) => {
            return view.pushHookEvent(this.el, targetCtx, event, payload, onReply);
          });
        }
        handleEvent(event, callback) {
          let callbackRef = (customEvent, bypass) => bypass ? event : callback(customEvent.detail);
          window.addEventListener(`phx:${event}`, callbackRef);
          this.__listeners.add(callbackRef);
          return callbackRef;
        }
        removeHandleEvent(callbackRef) {
          let event = callbackRef(null, true);
          window.removeEventListener(`phx:${event}`, callbackRef);
          this.__listeners.delete(callbackRef);
        }
        upload(name, files) {
          return this.__view().dispatchUploads(null, name, files);
        }
        uploadTo(phxTarget, name, files) {
          return this.__view().withinTargets(phxTarget, (view, targetCtx) => {
            view.dispatchUploads(targetCtx, name, files);
          });
        }
        __cleanup__() {
          this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
        }
      };
      prependFormDataKey = (key, prefix) => {
        let isArray = key.endsWith("[]");
        let baseKey = isArray ? key.slice(0, -2) : key;
        baseKey = baseKey.replace(/([^\[\]]+)(\]?$)/, `${prefix}$1$2`);
        if (isArray) {
          baseKey += "[]";
        }
        return baseKey;
      };
      serializeForm = (form, opts, onlyNames = []) => {
        const { submitter } = opts;
        let injectedElement;
        if (submitter && submitter.name) {
          const input = document.createElement("input");
          input.type = "hidden";
          const formId = submitter.getAttribute("form");
          if (formId) {
            input.setAttribute("form", formId);
          }
          input.name = submitter.name;
          input.value = submitter.value;
          submitter.parentElement.insertBefore(input, submitter);
          injectedElement = input;
        }
        const formData = new FormData(form);
        const toRemove = [];
        formData.forEach((val, key, _index) => {
          if (val instanceof File) {
            toRemove.push(key);
          }
        });
        toRemove.forEach((key) => formData.delete(key));
        const params = new URLSearchParams();
        const { inputsUnused, onlyHiddenInputs } = Array.from(form.elements).reduce((acc, input) => {
          const { inputsUnused: inputsUnused2, onlyHiddenInputs: onlyHiddenInputs2 } = acc;
          const key = input.name;
          if (!key) {
            return acc;
          }
          if (inputsUnused2[key] === void 0) {
            inputsUnused2[key] = true;
          }
          if (onlyHiddenInputs2[key] === void 0) {
            onlyHiddenInputs2[key] = true;
          }
          const isUsed = dom_default.private(input, PHX_HAS_FOCUSED) || dom_default.private(input, PHX_HAS_SUBMITTED);
          const isHidden = input.type === "hidden";
          inputsUnused2[key] = inputsUnused2[key] && !isUsed;
          onlyHiddenInputs2[key] = onlyHiddenInputs2[key] && isHidden;
          return acc;
        }, { inputsUnused: {}, onlyHiddenInputs: {} });
        for (let [key, val] of formData.entries()) {
          if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
            let isUnused = inputsUnused[key];
            let hidden = onlyHiddenInputs[key];
            if (isUnused && !(submitter && submitter.name == key) && !hidden) {
              params.append(prependFormDataKey(key, "_unused_"), "");
            }
            params.append(key, val);
          }
        }
        if (submitter && injectedElement) {
          submitter.parentElement.removeChild(injectedElement);
        }
        return params.toString();
      };
      View = class _View {
        static closestView(el) {
          let liveViewEl = el.closest(PHX_VIEW_SELECTOR);
          return liveViewEl ? dom_default.private(liveViewEl, "view") : null;
        }
        constructor(el, liveSocket, parentView, flash, liveReferer) {
          this.isDead = false;
          this.liveSocket = liveSocket;
          this.flash = flash;
          this.parent = parentView;
          this.root = parentView ? parentView.root : this;
          this.el = el;
          dom_default.putPrivate(this.el, "view", this);
          this.id = this.el.id;
          this.ref = 0;
          this.lastAckRef = null;
          this.childJoins = 0;
          this.loaderTimer = null;
          this.disconnectedTimer = null;
          this.pendingDiffs = [];
          this.pendingForms = /* @__PURE__ */ new Set();
          this.redirect = false;
          this.href = null;
          this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
          this.joinAttempts = 0;
          this.joinPending = true;
          this.destroyed = false;
          this.joinCallback = function(onDone) {
            onDone && onDone();
          };
          this.stopCallback = function() {
          };
          this.pendingJoinOps = this.parent ? null : [];
          this.viewHooks = {};
          this.formSubmits = [];
          this.children = this.parent ? null : {};
          this.root.children[this.id] = {};
          this.formsForRecovery = {};
          this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
            let url = this.href && this.expandURL(this.href);
            return {
              redirect: this.redirect ? url : void 0,
              url: this.redirect ? void 0 : url || void 0,
              params: this.connectParams(liveReferer),
              session: this.getSession(),
              static: this.getStatic(),
              flash: this.flash,
              sticky: this.el.hasAttribute(PHX_STICKY)
            };
          });
        }
        setHref(href) {
          this.href = href;
        }
        setRedirect(href) {
          this.redirect = true;
          this.href = href;
        }
        isMain() {
          return this.el.hasAttribute(PHX_MAIN);
        }
        connectParams(liveReferer) {
          let params = this.liveSocket.params(this.el);
          let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
          if (manifest.length > 0) {
            params["_track_static"] = manifest;
          }
          params["_mounts"] = this.joinCount;
          params["_mount_attempts"] = this.joinAttempts;
          params["_live_referer"] = liveReferer;
          this.joinAttempts++;
          return params;
        }
        isConnected() {
          return this.channel.canPush();
        }
        getSession() {
          return this.el.getAttribute(PHX_SESSION);
        }
        getStatic() {
          let val = this.el.getAttribute(PHX_STATIC);
          return val === "" ? null : val;
        }
        destroy(callback = function() {
        }) {
          this.destroyAllChildren();
          this.destroyed = true;
          delete this.root.children[this.id];
          if (this.parent) {
            delete this.root.children[this.parent.id][this.id];
          }
          clearTimeout(this.loaderTimer);
          let onFinished = () => {
            callback();
            for (let id in this.viewHooks) {
              this.destroyHook(this.viewHooks[id]);
            }
          };
          dom_default.markPhxChildDestroyed(this.el);
          this.log("destroyed", () => ["the child has been removed from the parent"]);
          this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
        }
        setContainerClasses(...classes) {
          this.el.classList.remove(
            PHX_CONNECTED_CLASS,
            PHX_LOADING_CLASS,
            PHX_ERROR_CLASS,
            PHX_CLIENT_ERROR_CLASS,
            PHX_SERVER_ERROR_CLASS
          );
          this.el.classList.add(...classes);
        }
        showLoader(timeout) {
          clearTimeout(this.loaderTimer);
          if (timeout) {
            this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
          } else {
            for (let id in this.viewHooks) {
              this.viewHooks[id].__disconnected();
            }
            this.setContainerClasses(PHX_LOADING_CLASS);
          }
        }
        execAll(binding) {
          dom_default.all(this.el, `[${binding}]`, (el) => this.liveSocket.execJS(el, el.getAttribute(binding)));
        }
        hideLoader() {
          clearTimeout(this.loaderTimer);
          clearTimeout(this.disconnectedTimer);
          this.setContainerClasses(PHX_CONNECTED_CLASS);
          this.execAll(this.binding("connected"));
        }
        triggerReconnected() {
          for (let id in this.viewHooks) {
            this.viewHooks[id].__reconnected();
          }
        }
        log(kind, msgCallback) {
          this.liveSocket.log(this, kind, msgCallback);
        }
        transition(time, onStart, onDone = function() {
        }) {
          this.liveSocket.transition(time, onStart, onDone);
        }
        // calls the callback with the view and target element for the given phxTarget
        // targets can be:
        //  * an element itself, then it is simply passed to liveSocket.owner;
        //  * a CID (Component ID), then we first search the component's element in the DOM
        //  * a selector, then we search the selector in the DOM and call the callback
        //    for each element found with the corresponding owner view
        withinTargets(phxTarget, callback, dom = document, viewEl) {
          if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
            return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
          }
          if (isCid(phxTarget)) {
            let targets = dom_default.findComponentNodeList(viewEl || this.el, phxTarget);
            if (targets.length === 0) {
              logError(`no component found matching phx-target of ${phxTarget}`);
            } else {
              callback(this, parseInt(phxTarget));
            }
          } else {
            let targets = Array.from(dom.querySelectorAll(phxTarget));
            if (targets.length === 0) {
              logError(`nothing found matching the phx-target selector "${phxTarget}"`);
            }
            targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
          }
        }
        applyDiff(type, rawDiff, callback) {
          this.log(type, () => ["", clone(rawDiff)]);
          let { diff, reply, events, title } = Rendered.extract(rawDiff);
          callback({ diff, reply, events });
          if (typeof title === "string" || type == "mount") {
            window.requestAnimationFrame(() => dom_default.putTitle(title));
          }
        }
        onJoin(resp) {
          let { rendered, container, liveview_version } = resp;
          if (container) {
            let [tag, attrs] = container;
            this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
          }
          this.childJoins = 0;
          this.joinPending = true;
          this.flash = null;
          if (this.root === this) {
            this.formsForRecovery = this.getFormsForRecovery();
          }
          if (this.isMain() && window.history.state === null) {
            browser_default.pushState("replace", {
              type: "patch",
              id: this.id,
              position: this.liveSocket.currentHistoryPosition
            });
          }
          if (liveview_version !== this.liveSocket.version()) {
            console.error(`LiveView asset version mismatch. JavaScript version ${this.liveSocket.version()} vs. server ${liveview_version}. To avoid issues, please ensure that your assets use the same version as the server.`);
          }
          browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
          this.applyDiff("mount", rendered, ({ diff, events }) => {
            this.rendered = new Rendered(this.id, diff);
            let [html, streams] = this.renderContainer(null, "join");
            this.dropPendingRefs();
            this.joinCount++;
            this.joinAttempts = 0;
            this.maybeRecoverForms(html, () => {
              this.onJoinComplete(resp, html, streams, events);
            });
          });
        }
        dropPendingRefs() {
          dom_default.all(document, `[${PHX_REF_SRC}="${this.refSrc()}"]`, (el) => {
            el.removeAttribute(PHX_REF_LOADING);
            el.removeAttribute(PHX_REF_SRC);
            el.removeAttribute(PHX_REF_LOCK);
          });
        }
        onJoinComplete({ live_patch }, html, streams, events) {
          if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
            return this.applyJoinPatch(live_patch, html, streams, events);
          }
          let newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
            let fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
            let phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
            if (phxStatic) {
              toEl.setAttribute(PHX_STATIC, phxStatic);
            }
            if (fromEl) {
              fromEl.setAttribute(PHX_ROOT_ID, this.root.id);
            }
            return this.joinChild(toEl);
          });
          if (newChildren.length === 0) {
            if (this.parent) {
              this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
              this.parent.ackJoin(this);
            } else {
              this.onAllChildJoinsComplete();
              this.applyJoinPatch(live_patch, html, streams, events);
            }
          } else {
            this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
          }
        }
        attachTrueDocEl() {
          this.el = dom_default.byId(this.id);
          this.el.setAttribute(PHX_ROOT_ID, this.root.id);
        }
        // this is invoked for dead and live views, so we must filter by
        // by owner to ensure we aren't duplicating hooks across disconnect
        // and connected states. This also handles cases where hooks exist
        // in a root layout with a LV in the body
        execNewMounted(parent = this.el) {
          let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
          let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
          dom_default.all(parent, `[${phxViewportTop}], [${phxViewportBottom}]`, (hookEl) => {
            if (this.ownsElement(hookEl)) {
              dom_default.maintainPrivateHooks(hookEl, hookEl, phxViewportTop, phxViewportBottom);
              this.maybeAddNewHook(hookEl);
            }
          });
          dom_default.all(parent, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
            if (this.ownsElement(hookEl)) {
              this.maybeAddNewHook(hookEl);
            }
          });
          dom_default.all(parent, `[${this.binding(PHX_MOUNTED)}]`, (el) => {
            if (this.ownsElement(el)) {
              this.maybeMounted(el);
            }
          });
        }
        applyJoinPatch(live_patch, html, streams, events) {
          this.attachTrueDocEl();
          let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
          patch.markPrunableContentForRemoval();
          this.performPatch(patch, false, true);
          this.joinNewChildren();
          this.execNewMounted();
          this.joinPending = false;
          this.liveSocket.dispatchEvents(events);
          this.applyPendingUpdates();
          if (live_patch) {
            let { kind, to } = live_patch;
            this.liveSocket.historyPatch(to, kind);
          }
          this.hideLoader();
          if (this.joinCount > 1) {
            this.triggerReconnected();
          }
          this.stopCallback();
        }
        triggerBeforeUpdateHook(fromEl, toEl) {
          this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
          let hook = this.getHook(fromEl);
          let isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
          if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
            hook.__beforeUpdate();
            return hook;
          }
        }
        maybeMounted(el) {
          let phxMounted = el.getAttribute(this.binding(PHX_MOUNTED));
          let hasBeenInvoked = phxMounted && dom_default.private(el, "mounted");
          if (phxMounted && !hasBeenInvoked) {
            this.liveSocket.execJS(el, phxMounted);
            dom_default.putPrivate(el, "mounted", true);
          }
        }
        maybeAddNewHook(el) {
          let newHook = this.addHook(el);
          if (newHook) {
            newHook.__mounted();
          }
        }
        performPatch(patch, pruneCids, isJoinPatch = false) {
          let removedEls = [];
          let phxChildrenAdded = false;
          let updatedHookIds = /* @__PURE__ */ new Set();
          this.liveSocket.triggerDOM("onPatchStart", [patch.targetContainer]);
          patch.after("added", (el) => {
            this.liveSocket.triggerDOM("onNodeAdded", [el]);
            let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
            let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
            dom_default.maintainPrivateHooks(el, el, phxViewportTop, phxViewportBottom);
            this.maybeAddNewHook(el);
            if (el.getAttribute) {
              this.maybeMounted(el);
            }
          });
          patch.after("phxChildAdded", (el) => {
            if (dom_default.isPhxSticky(el)) {
              this.liveSocket.joinRootViews();
            } else {
              phxChildrenAdded = true;
            }
          });
          patch.before("updated", (fromEl, toEl) => {
            let hook = this.triggerBeforeUpdateHook(fromEl, toEl);
            if (hook) {
              updatedHookIds.add(fromEl.id);
            }
          });
          patch.after("updated", (el) => {
            if (updatedHookIds.has(el.id)) {
              this.getHook(el).__updated();
            }
          });
          patch.after("discarded", (el) => {
            if (el.nodeType === Node.ELEMENT_NODE) {
              removedEls.push(el);
            }
          });
          patch.after("transitionsDiscarded", (els) => this.afterElementsRemoved(els, pruneCids));
          patch.perform(isJoinPatch);
          this.afterElementsRemoved(removedEls, pruneCids);
          this.liveSocket.triggerDOM("onPatchEnd", [patch.targetContainer]);
          return phxChildrenAdded;
        }
        afterElementsRemoved(elements, pruneCids) {
          let destroyedCIDs = [];
          elements.forEach((parent) => {
            let components = dom_default.all(parent, `[${PHX_COMPONENT}]`);
            let hooks = dom_default.all(parent, `[${this.binding(PHX_HOOK)}], [data-phx-hook]`);
            components.concat(parent).forEach((el) => {
              let cid = this.componentID(el);
              if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
                destroyedCIDs.push(cid);
              }
            });
            hooks.concat(parent).forEach((hookEl) => {
              let hook = this.getHook(hookEl);
              hook && this.destroyHook(hook);
            });
          });
          if (pruneCids) {
            this.maybePushComponentsDestroyed(destroyedCIDs);
          }
        }
        joinNewChildren() {
          dom_default.findPhxChildren(this.el, this.id).forEach((el) => this.joinChild(el));
        }
        maybeRecoverForms(html, callback) {
          const phxChange = this.binding("change");
          const oldForms = this.root.formsForRecovery;
          let template = document.createElement("template");
          template.innerHTML = html;
          const rootEl = template.content.firstElementChild;
          rootEl.id = this.id;
          rootEl.setAttribute(PHX_ROOT_ID, this.root.id);
          rootEl.setAttribute(PHX_SESSION, this.getSession());
          rootEl.setAttribute(PHX_STATIC, this.getStatic());
          rootEl.setAttribute(PHX_PARENT_ID, this.parent ? this.parent.id : null);
          const formsToRecover = (
            // we go over all forms in the new DOM; because this is only the HTML for the current
            // view, we can be sure that all forms are owned by this view:
            dom_default.all(template.content, "form").filter((newForm) => newForm.id && oldForms[newForm.id]).filter((newForm) => !this.pendingForms.has(newForm.id)).filter((newForm) => oldForms[newForm.id].getAttribute(phxChange) === newForm.getAttribute(phxChange)).map((newForm) => {
              return [oldForms[newForm.id], newForm];
            })
          );
          if (formsToRecover.length === 0) {
            return callback();
          }
          formsToRecover.forEach(([oldForm, newForm], i) => {
            this.pendingForms.add(newForm.id);
            this.pushFormRecovery(oldForm, newForm, template.content.firstElementChild, () => {
              this.pendingForms.delete(newForm.id);
              if (i === formsToRecover.length - 1) {
                callback();
              }
            });
          });
        }
        getChildById(id) {
          return this.root.children[this.id][id];
        }
        getDescendentByEl(el) {
          var _a;
          if (el.id === this.id) {
            return this;
          } else {
            return (_a = this.children[el.getAttribute(PHX_PARENT_ID)]) == null ? void 0 : _a[el.id];
          }
        }
        destroyDescendent(id) {
          for (let parentId in this.root.children) {
            for (let childId in this.root.children[parentId]) {
              if (childId === id) {
                return this.root.children[parentId][childId].destroy();
              }
            }
          }
        }
        joinChild(el) {
          let child = this.getChildById(el.id);
          if (!child) {
            let view = new _View(el, this.liveSocket, this);
            this.root.children[this.id][view.id] = view;
            view.join();
            this.childJoins++;
            return true;
          }
        }
        isJoinPending() {
          return this.joinPending;
        }
        ackJoin(_child) {
          this.childJoins--;
          if (this.childJoins === 0) {
            if (this.parent) {
              this.parent.ackJoin(this);
            } else {
              this.onAllChildJoinsComplete();
            }
          }
        }
        onAllChildJoinsComplete() {
          this.pendingForms.clear();
          this.formsForRecovery = {};
          this.joinCallback(() => {
            this.pendingJoinOps.forEach(([view, op]) => {
              if (!view.isDestroyed()) {
                op();
              }
            });
            this.pendingJoinOps = [];
          });
        }
        update(diff, events) {
          if (this.isJoinPending() || this.liveSocket.hasPendingLink() && this.root.isMain()) {
            return this.pendingDiffs.push({ diff, events });
          }
          this.rendered.mergeDiff(diff);
          let phxChildrenAdded = false;
          if (this.rendered.isComponentOnlyDiff(diff)) {
            this.liveSocket.time("component patch complete", () => {
              let parentCids = dom_default.findExistingParentCIDs(this.el, this.rendered.componentCIDs(diff));
              parentCids.forEach((parentCID) => {
                if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
                  phxChildrenAdded = true;
                }
              });
            });
          } else if (!isEmpty(diff)) {
            this.liveSocket.time("full patch complete", () => {
              let [html, streams] = this.renderContainer(diff, "update");
              let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
              phxChildrenAdded = this.performPatch(patch, true);
            });
          }
          this.liveSocket.dispatchEvents(events);
          if (phxChildrenAdded) {
            this.joinNewChildren();
          }
        }
        renderContainer(diff, kind) {
          return this.liveSocket.time(`toString diff (${kind})`, () => {
            let tag = this.el.tagName;
            let cids = diff ? this.rendered.componentCIDs(diff) : null;
            let [html, streams] = this.rendered.toString(cids);
            return [`<${tag}>${html}</${tag}>`, streams];
          });
        }
        componentPatch(diff, cid) {
          if (isEmpty(diff))
            return false;
          let [html, streams] = this.rendered.componentToString(cid);
          let patch = new DOMPatch(this, this.el, this.id, html, streams, cid);
          let childrenAdded = this.performPatch(patch, true);
          return childrenAdded;
        }
        getHook(el) {
          return this.viewHooks[ViewHook.elementID(el)];
        }
        addHook(el) {
          let hookElId = ViewHook.elementID(el);
          if (el.getAttribute && !this.ownsElement(el)) {
            return;
          }
          if (hookElId && !this.viewHooks[hookElId]) {
            let hook = dom_default.getCustomElHook(el) || logError(`no hook found for custom element: ${el.id}`);
            this.viewHooks[hookElId] = hook;
            hook.__attachView(this);
            return hook;
          } else if (hookElId || !el.getAttribute) {
            return;
          } else {
            let hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
            let callbacks = this.liveSocket.getHookCallbacks(hookName);
            if (callbacks) {
              if (!el.id) {
                logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
              }
              let hook = new ViewHook(this, el, callbacks);
              this.viewHooks[ViewHook.elementID(hook.el)] = hook;
              return hook;
            } else if (hookName !== null) {
              logError(`unknown hook found for "${hookName}"`, el);
            }
          }
        }
        destroyHook(hook) {
          const hookId = ViewHook.elementID(hook.el);
          hook.__destroyed();
          hook.__cleanup__();
          delete this.viewHooks[hookId];
        }
        applyPendingUpdates() {
          if (this.liveSocket.hasPendingLink() && this.root.isMain()) {
            return;
          }
          this.pendingDiffs.forEach(({ diff, events }) => this.update(diff, events));
          this.pendingDiffs = [];
          this.eachChild((child) => child.applyPendingUpdates());
        }
        eachChild(callback) {
          let children = this.root.children[this.id] || {};
          for (let id in children) {
            callback(this.getChildById(id));
          }
        }
        onChannel(event, cb) {
          this.liveSocket.onChannel(this.channel, event, (resp) => {
            if (this.isJoinPending()) {
              this.root.pendingJoinOps.push([this, () => cb(resp)]);
            } else {
              this.liveSocket.requestDOMUpdate(() => cb(resp));
            }
          });
        }
        bindChannel() {
          this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
            this.liveSocket.requestDOMUpdate(() => {
              this.applyDiff("update", rawDiff, ({ diff, events }) => this.update(diff, events));
            });
          });
          this.onChannel("redirect", ({ to, flash }) => this.onRedirect({ to, flash }));
          this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
          this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
          this.channel.onError((reason) => this.onError(reason));
          this.channel.onClose((reason) => this.onClose(reason));
        }
        destroyAllChildren() {
          this.eachChild((child) => child.destroy());
        }
        onLiveRedirect(redir) {
          let { to, kind, flash } = redir;
          let url = this.expandURL(to);
          let e = new CustomEvent("phx:server-navigate", { detail: { to, kind, flash } });
          this.liveSocket.historyRedirect(e, url, kind, flash);
        }
        onLivePatch(redir) {
          let { to, kind } = redir;
          this.href = this.expandURL(to);
          this.liveSocket.historyPatch(to, kind);
        }
        expandURL(to) {
          return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
        }
        onRedirect({ to, flash, reloadToken }) {
          this.liveSocket.redirect(to, flash, reloadToken);
        }
        isDestroyed() {
          return this.destroyed;
        }
        joinDead() {
          this.isDead = true;
        }
        joinPush() {
          this.joinPush = this.joinPush || this.channel.join();
          return this.joinPush;
        }
        join(callback) {
          this.showLoader(this.liveSocket.loaderTimeout);
          this.bindChannel();
          if (this.isMain()) {
            this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" });
          }
          this.joinCallback = (onDone) => {
            onDone = onDone || function() {
            };
            callback ? callback(this.joinCount, onDone) : onDone();
          };
          this.wrapPush(() => this.channel.join(), {
            ok: (resp) => this.liveSocket.requestDOMUpdate(() => this.onJoin(resp)),
            error: (error) => this.onJoinError(error),
            timeout: () => this.onJoinError({ reason: "timeout" })
          });
        }
        onJoinError(resp) {
          if (resp.reason === "reload") {
            this.log("error", () => [`failed mount with ${resp.status}. Falling back to page reload`, resp]);
            this.onRedirect({ to: this.root.href, reloadToken: resp.token });
            return;
          } else if (resp.reason === "unauthorized" || resp.reason === "stale") {
            this.log("error", () => ["unauthorized live_redirect. Falling back to page request", resp]);
            this.onRedirect({ to: this.root.href, flash: this.flash });
            return;
          }
          if (resp.redirect || resp.live_redirect) {
            this.joinPending = false;
            this.channel.leave();
          }
          if (resp.redirect) {
            return this.onRedirect(resp.redirect);
          }
          if (resp.live_redirect) {
            return this.onLiveRedirect(resp.live_redirect);
          }
          this.log("error", () => ["unable to join", resp]);
          if (this.isMain()) {
            this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
            if (this.liveSocket.isConnected()) {
              this.liveSocket.reloadWithJitter(this);
            }
          } else {
            if (this.joinAttempts >= MAX_CHILD_JOIN_ATTEMPTS) {
              this.root.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
              this.log("error", () => [`giving up trying to mount after ${MAX_CHILD_JOIN_ATTEMPTS} tries`, resp]);
              this.destroy();
            }
            let trueChildEl = dom_default.byId(this.el.id);
            if (trueChildEl) {
              dom_default.mergeAttrs(trueChildEl, this.el);
              this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
              this.el = trueChildEl;
            } else {
              this.destroy();
            }
          }
        }
        onClose(reason) {
          if (this.isDestroyed()) {
            return;
          }
          if (this.isMain() && this.liveSocket.hasPendingLink() && reason !== "leave") {
            return this.liveSocket.reloadWithJitter(this);
          }
          this.destroyAllChildren();
          this.liveSocket.dropActiveElement(this);
          if (document.activeElement) {
            document.activeElement.blur();
          }
          if (this.liveSocket.isUnloaded()) {
            this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
          }
        }
        onError(reason) {
          this.onClose(reason);
          if (this.liveSocket.isConnected()) {
            this.log("error", () => ["view crashed", reason]);
          }
          if (!this.liveSocket.isUnloaded()) {
            if (this.liveSocket.isConnected()) {
              this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
            } else {
              this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS]);
            }
          }
        }
        displayError(classes) {
          if (this.isMain()) {
            dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: { to: this.href, kind: "error" } });
          }
          this.showLoader();
          this.setContainerClasses(...classes);
          this.delayedDisconnected();
        }
        delayedDisconnected() {
          this.disconnectedTimer = setTimeout(() => {
            this.execAll(this.binding("disconnected"));
          }, this.liveSocket.disconnectedTimeout);
        }
        wrapPush(callerPush, receives) {
          let latency = this.liveSocket.getLatencySim();
          let withLatency = latency ? (cb) => setTimeout(() => !this.isDestroyed() && cb(), latency) : (cb) => !this.isDestroyed() && cb();
          withLatency(() => {
            callerPush().receive("ok", (resp) => withLatency(() => receives.ok && receives.ok(resp))).receive("error", (reason) => withLatency(() => receives.error && receives.error(reason))).receive("timeout", () => withLatency(() => receives.timeout && receives.timeout()));
          });
        }
        pushWithReply(refGenerator, event, payload) {
          if (!this.isConnected()) {
            return Promise.reject({ error: "noconnection" });
          }
          let [ref, [el], opts] = refGenerator ? refGenerator() : [null, [], {}];
          let oldJoinCount = this.joinCount;
          let onLoadingDone = function() {
          };
          if (opts.page_loading) {
            onLoadingDone = this.liveSocket.withPageLoading({ kind: "element", target: el });
          }
          if (typeof payload.cid !== "number") {
            delete payload.cid;
          }
          return new Promise((resolve, reject) => {
            this.wrapPush(() => this.channel.push(event, payload, PUSH_TIMEOUT), {
              ok: (resp) => {
                if (ref !== null) {
                  this.lastAckRef = ref;
                }
                let finish = (hookReply) => {
                  if (resp.redirect) {
                    this.onRedirect(resp.redirect);
                  }
                  if (resp.live_patch) {
                    this.onLivePatch(resp.live_patch);
                  }
                  if (resp.live_redirect) {
                    this.onLiveRedirect(resp.live_redirect);
                  }
                  onLoadingDone();
                  resolve({ resp, reply: hookReply });
                };
                if (resp.diff) {
                  this.liveSocket.requestDOMUpdate(() => {
                    this.applyDiff("update", resp.diff, ({ diff, reply, events }) => {
                      if (ref !== null) {
                        this.undoRefs(ref, payload.event);
                      }
                      this.update(diff, events);
                      finish(reply);
                    });
                  });
                } else {
                  if (ref !== null) {
                    this.undoRefs(ref, payload.event);
                  }
                  finish(null);
                }
              },
              error: (reason) => reject({ error: reason }),
              timeout: () => {
                reject({ timeout: true });
                if (this.joinCount === oldJoinCount) {
                  this.liveSocket.reloadWithJitter(this, () => {
                    this.log("timeout", () => ["received timeout while communicating with server. Falling back to hard refresh for recovery"]);
                  });
                }
              }
            });
          });
        }
        undoRefs(ref, phxEvent, onlyEls) {
          if (!this.isConnected()) {
            return;
          }
          let selector = `[${PHX_REF_SRC}="${this.refSrc()}"]`;
          if (onlyEls) {
            onlyEls = new Set(onlyEls);
            dom_default.all(document, selector, (parent) => {
              if (onlyEls && !onlyEls.has(parent)) {
                return;
              }
              dom_default.all(parent, selector, (child) => this.undoElRef(child, ref, phxEvent));
              this.undoElRef(parent, ref, phxEvent);
            });
          } else {
            dom_default.all(document, selector, (el) => this.undoElRef(el, ref, phxEvent));
          }
        }
        undoElRef(el, ref, phxEvent) {
          let elRef = new ElementRef(el);
          elRef.maybeUndo(ref, phxEvent, (clonedTree) => {
            let patch = new DOMPatch(this, el, this.id, clonedTree, [], null, { undoRef: ref });
            const phxChildrenAdded = this.performPatch(patch, true);
            dom_default.all(el, `[${PHX_REF_SRC}="${this.refSrc()}"]`, (child) => this.undoElRef(child, ref, phxEvent));
            if (phxChildrenAdded) {
              this.joinNewChildren();
            }
          });
        }
        refSrc() {
          return this.el.id;
        }
        putRef(elements, phxEvent, eventType, opts = {}) {
          let newRef = this.ref++;
          let disableWith = this.binding(PHX_DISABLE_WITH);
          if (opts.loading) {
            let loadingEls = dom_default.all(document, opts.loading).map((el) => {
              return { el, lock: true, loading: true };
            });
            elements = elements.concat(loadingEls);
          }
          for (let { el, lock, loading } of elements) {
            if (!lock && !loading) {
              throw new Error("putRef requires lock or loading");
            }
            el.setAttribute(PHX_REF_SRC, this.refSrc());
            if (loading) {
              el.setAttribute(PHX_REF_LOADING, newRef);
            }
            if (lock) {
              el.setAttribute(PHX_REF_LOCK, newRef);
            }
            if (!loading || opts.submitter && !(el === opts.submitter || el === opts.form)) {
              continue;
            }
            let lockCompletePromise = new Promise((resolve) => {
              el.addEventListener(`phx:undo-lock:${newRef}`, () => resolve(detail), { once: true });
            });
            let loadingCompletePromise = new Promise((resolve) => {
              el.addEventListener(`phx:undo-loading:${newRef}`, () => resolve(detail), { once: true });
            });
            el.classList.add(`phx-${eventType}-loading`);
            let disableText = el.getAttribute(disableWith);
            if (disableText !== null) {
              if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
                el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.innerText);
              }
              if (disableText !== "") {
                el.innerText = disableText;
              }
              el.setAttribute(PHX_DISABLED, el.getAttribute(PHX_DISABLED) || el.disabled);
              el.setAttribute("disabled", "");
            }
            let detail = {
              event: phxEvent,
              eventType,
              ref: newRef,
              isLoading: loading,
              isLocked: lock,
              lockElements: elements.filter(({ lock: lock2 }) => lock2).map(({ el: el2 }) => el2),
              loadingElements: elements.filter(({ loading: loading2 }) => loading2).map(({ el: el2 }) => el2),
              unlock: (els) => {
                els = Array.isArray(els) ? els : [els];
                this.undoRefs(newRef, phxEvent, els);
              },
              lockComplete: lockCompletePromise,
              loadingComplete: loadingCompletePromise,
              lock: (lockEl) => {
                return new Promise((resolve) => {
                  if (this.isAcked(newRef)) {
                    return resolve(detail);
                  }
                  lockEl.setAttribute(PHX_REF_LOCK, newRef);
                  lockEl.setAttribute(PHX_REF_SRC, this.refSrc());
                  lockEl.addEventListener(`phx:lock-stop:${newRef}`, () => resolve(detail), { once: true });
                });
              }
            };
            el.dispatchEvent(new CustomEvent("phx:push", {
              detail,
              bubbles: true,
              cancelable: false
            }));
            if (phxEvent) {
              el.dispatchEvent(new CustomEvent(`phx:push:${phxEvent}`, {
                detail,
                bubbles: true,
                cancelable: false
              }));
            }
          }
          return [newRef, elements.map(({ el }) => el), opts];
        }
        isAcked(ref) {
          return this.lastAckRef !== null && this.lastAckRef >= ref;
        }
        componentID(el) {
          let cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
          return cid ? parseInt(cid) : null;
        }
        targetComponentID(target, targetCtx, opts = {}) {
          if (isCid(targetCtx)) {
            return targetCtx;
          }
          let cidOrSelector = opts.target || target.getAttribute(this.binding("target"));
          if (isCid(cidOrSelector)) {
            return parseInt(cidOrSelector);
          } else if (targetCtx && (cidOrSelector !== null || opts.target)) {
            return this.closestComponentID(targetCtx);
          } else {
            return null;
          }
        }
        closestComponentID(targetCtx) {
          if (isCid(targetCtx)) {
            return targetCtx;
          } else if (targetCtx) {
            return maybe(targetCtx.closest(`[${PHX_COMPONENT}]`), (el) => this.ownsElement(el) && this.componentID(el));
          } else {
            return null;
          }
        }
        pushHookEvent(el, targetCtx, event, payload, onReply) {
          if (!this.isConnected()) {
            this.log("hook", () => ["unable to push hook event. LiveView not connected", event, payload]);
            return false;
          }
          let [ref, els, opts] = this.putRef([{ el, loading: true, lock: true }], event, "hook");
          this.pushWithReply(() => [ref, els, opts], "event", {
            type: "hook",
            event,
            value: payload,
            cid: this.closestComponentID(targetCtx)
          }).then(({ resp: _resp, reply: hookReply }) => onReply(hookReply, ref));
          return ref;
        }
        extractMeta(el, meta, value) {
          let prefix = this.binding("value-");
          for (let i = 0; i < el.attributes.length; i++) {
            if (!meta) {
              meta = {};
            }
            let name = el.attributes[i].name;
            if (name.startsWith(prefix)) {
              meta[name.replace(prefix, "")] = el.getAttribute(name);
            }
          }
          if (el.value !== void 0 && !(el instanceof HTMLFormElement)) {
            if (!meta) {
              meta = {};
            }
            meta.value = el.value;
            if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
              delete meta.value;
            }
          }
          if (value) {
            if (!meta) {
              meta = {};
            }
            for (let key in value) {
              meta[key] = value[key];
            }
          }
          return meta;
        }
        pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}, onReply) {
          this.pushWithReply(() => this.putRef([{ el, loading: true, lock: true }], phxEvent, type, opts), "event", {
            type,
            event: phxEvent,
            value: this.extractMeta(el, meta, opts.value),
            cid: this.targetComponentID(el, targetCtx, opts)
          }).then(({ reply }) => onReply && onReply(reply)).catch((error) => logError("Failed to push event", error));
        }
        pushFileProgress(fileEl, entryRef, progress, onReply = function() {
        }) {
          this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
            view.pushWithReply(null, "progress", {
              event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
              ref: fileEl.getAttribute(PHX_UPLOAD_REF),
              entry_ref: entryRef,
              progress,
              cid: view.targetComponentID(fileEl.form, targetCtx)
            }).then(({ resp }) => onReply(resp)).catch((error) => logError("Failed to push file progress", error));
          });
        }
        pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
          if (!inputEl.form) {
            throw new Error("form events require the input to be inside a form");
          }
          let uploads;
          let cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx, opts);
          let refGenerator = () => {
            return this.putRef([
              { el: inputEl, loading: true, lock: true },
              { el: inputEl.form, loading: true, lock: true }
            ], phxEvent, "change", opts);
          };
          let formData;
          let meta = this.extractMeta(inputEl.form, {}, opts.value);
          let serializeOpts = {};
          if (inputEl instanceof HTMLButtonElement) {
            serializeOpts.submitter = inputEl;
          }
          if (inputEl.getAttribute(this.binding("change"))) {
            formData = serializeForm(inputEl.form, serializeOpts, [inputEl.name]);
          } else {
            formData = serializeForm(inputEl.form, serializeOpts);
          }
          if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
            LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
          }
          uploads = LiveUploader.serializeUploads(inputEl);
          let event = {
            type: "form",
            event: phxEvent,
            value: formData,
            meta: __spreadValues({
              // no target was implicitly sent as "undefined" in LV <= 1.0.5, therefore
              // we have to keep it. In 1.0.6 we switched from passing meta as URL encoded data
              // to passing it directly in the event, but the JSON encode would drop keys with
              // undefined values.
              _target: opts._target || "undefined"
            }, meta),
            uploads,
            cid
          };
          this.pushWithReply(refGenerator, "event", event).then(({ resp }) => {
            if (dom_default.isUploadInput(inputEl) && dom_default.isAutoUpload(inputEl)) {
              ElementRef.onUnlock(inputEl, () => {
                if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
                  let [ref, _els] = refGenerator();
                  this.undoRefs(ref, phxEvent, [inputEl.form]);
                  this.uploadFiles(inputEl.form, phxEvent, targetCtx, ref, cid, (_uploads) => {
                    callback && callback(resp);
                    this.triggerAwaitingSubmit(inputEl.form, phxEvent);
                    this.undoRefs(ref, phxEvent);
                  });
                }
              });
            } else {
              callback && callback(resp);
            }
          }).catch((error) => logError("Failed to push input event", error));
        }
        triggerAwaitingSubmit(formEl, phxEvent) {
          let awaitingSubmit = this.getScheduledSubmit(formEl);
          if (awaitingSubmit) {
            let [_el, _ref, _opts, callback] = awaitingSubmit;
            this.cancelSubmit(formEl, phxEvent);
            callback();
          }
        }
        getScheduledSubmit(formEl) {
          return this.formSubmits.find(([el, _ref, _opts, _callback]) => el.isSameNode(formEl));
        }
        scheduleSubmit(formEl, ref, opts, callback) {
          if (this.getScheduledSubmit(formEl)) {
            return true;
          }
          this.formSubmits.push([formEl, ref, opts, callback]);
        }
        cancelSubmit(formEl, phxEvent) {
          this.formSubmits = this.formSubmits.filter(([el, ref, _opts, _callback]) => {
            if (el.isSameNode(formEl)) {
              this.undoRefs(ref, phxEvent);
              return false;
            } else {
              return true;
            }
          });
        }
        disableForm(formEl, phxEvent, opts = {}) {
          let filterIgnored = (el) => {
            let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
            return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
          };
          let filterDisables = (el) => {
            return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
          };
          let filterButton = (el) => el.tagName == "BUTTON";
          let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
          let formElements = Array.from(formEl.elements);
          let disables = formElements.filter(filterDisables);
          let buttons = formElements.filter(filterButton).filter(filterIgnored);
          let inputs = formElements.filter(filterInput).filter(filterIgnored);
          buttons.forEach((button) => {
            button.setAttribute(PHX_DISABLED, button.disabled);
            button.disabled = true;
          });
          inputs.forEach((input) => {
            input.setAttribute(PHX_READONLY, input.readOnly);
            input.readOnly = true;
            if (input.files) {
              input.setAttribute(PHX_DISABLED, input.disabled);
              input.disabled = true;
            }
          });
          let formEls = disables.concat(buttons).concat(inputs).map((el) => {
            return { el, loading: true, lock: true };
          });
          let els = [{ el: formEl, loading: true, lock: false }].concat(formEls).reverse();
          return this.putRef(els, phxEvent, "submit", opts);
        }
        pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply) {
          let refGenerator = () => this.disableForm(formEl, phxEvent, __spreadProps(__spreadValues({}, opts), {
            form: formEl,
            submitter
          }));
          dom_default.putPrivate(formEl, "submitter", submitter);
          let cid = this.targetComponentID(formEl, targetCtx);
          if (LiveUploader.hasUploadsInProgress(formEl)) {
            let [ref, _els] = refGenerator();
            let push = () => this.pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply);
            return this.scheduleSubmit(formEl, ref, opts, push);
          } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
            let [ref, els] = refGenerator();
            let proxyRefGen = () => [ref, els, opts];
            this.uploadFiles(formEl, phxEvent, targetCtx, ref, cid, (_uploads) => {
              if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
                return this.undoRefs(ref, phxEvent);
              }
              let meta = this.extractMeta(formEl, {}, opts.value);
              let formData = serializeForm(formEl, { submitter });
              this.pushWithReply(proxyRefGen, "event", {
                type: "form",
                event: phxEvent,
                value: formData,
                meta,
                cid
              }).then(({ resp }) => onReply(resp)).catch((error) => logError("Failed to push form submit", error));
            });
          } else if (!(formEl.hasAttribute(PHX_REF_SRC) && formEl.classList.contains("phx-submit-loading"))) {
            let meta = this.extractMeta(formEl, {}, opts.value);
            let formData = serializeForm(formEl, { submitter });
            this.pushWithReply(refGenerator, "event", {
              type: "form",
              event: phxEvent,
              value: formData,
              meta,
              cid
            }).then(({ resp }) => onReply(resp)).catch((error) => logError("Failed to push form submit", error));
          }
        }
        uploadFiles(formEl, phxEvent, targetCtx, ref, cid, onComplete) {
          let joinCountAtUpload = this.joinCount;
          let inputEls = LiveUploader.activeFileInputs(formEl);
          let numFileInputsInProgress = inputEls.length;
          inputEls.forEach((inputEl) => {
            let uploader = new LiveUploader(inputEl, this, () => {
              numFileInputsInProgress--;
              if (numFileInputsInProgress === 0) {
                onComplete();
              }
            });
            let entries = uploader.entries().map((entry) => entry.toPreflightPayload());
            if (entries.length === 0) {
              numFileInputsInProgress--;
              return;
            }
            let payload = {
              ref: inputEl.getAttribute(PHX_UPLOAD_REF),
              entries,
              cid: this.targetComponentID(inputEl.form, targetCtx)
            };
            this.log("upload", () => ["sending preflight request", payload]);
            this.pushWithReply(null, "allow_upload", payload).then(({ resp }) => {
              this.log("upload", () => ["got preflight response", resp]);
              uploader.entries().forEach((entry) => {
                if (resp.entries && !resp.entries[entry.ref]) {
                  this.handleFailedEntryPreflight(entry.ref, "failed preflight", uploader);
                }
              });
              if (resp.error || Object.keys(resp.entries).length === 0) {
                this.undoRefs(ref, phxEvent);
                let errors = resp.error || [];
                errors.map(([entry_ref, reason]) => {
                  this.handleFailedEntryPreflight(entry_ref, reason, uploader);
                });
              } else {
                let onError = (callback) => {
                  this.channel.onError(() => {
                    if (this.joinCount === joinCountAtUpload) {
                      callback();
                    }
                  });
                };
                uploader.initAdapterUpload(resp, onError, this.liveSocket);
              }
            }).catch((error) => logError("Failed to push upload", error));
          });
        }
        handleFailedEntryPreflight(uploadRef, reason, uploader) {
          if (uploader.isAutoUpload()) {
            let entry = uploader.entries().find((entry2) => entry2.ref === uploadRef.toString());
            if (entry) {
              entry.cancel();
            }
          } else {
            uploader.entries().map((entry) => entry.cancel());
          }
          this.log("upload", () => [`error for entry ${uploadRef}`, reason]);
        }
        dispatchUploads(targetCtx, name, filesOrBlobs) {
          let targetElement = this.targetCtxElement(targetCtx) || this.el;
          let inputs = dom_default.findUploadInputs(targetElement).filter((el) => el.name === name);
          if (inputs.length === 0) {
            logError(`no live file inputs found matching the name "${name}"`);
          } else if (inputs.length > 1) {
            logError(`duplicate live file inputs found matching the name "${name}"`);
          } else {
            dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { detail: { files: filesOrBlobs } });
          }
        }
        targetCtxElement(targetCtx) {
          if (isCid(targetCtx)) {
            let [target] = dom_default.findComponentNodeList(this.el, targetCtx);
            return target;
          } else if (targetCtx) {
            return targetCtx;
          } else {
            return null;
          }
        }
        pushFormRecovery(oldForm, newForm, templateDom, callback) {
          const phxChange = this.binding("change");
          const phxTarget = newForm.getAttribute(this.binding("target")) || newForm;
          const phxEvent = newForm.getAttribute(this.binding(PHX_AUTO_RECOVER)) || newForm.getAttribute(this.binding("change"));
          const inputs = Array.from(oldForm.elements).filter((el) => dom_default.isFormInput(el) && el.name && !el.hasAttribute(phxChange));
          if (inputs.length === 0) {
            callback();
            return;
          }
          inputs.forEach((input2) => input2.hasAttribute(PHX_UPLOAD_REF) && LiveUploader.clearFiles(input2));
          let input = inputs.find((el) => el.type !== "hidden") || inputs[0];
          let pending = 0;
          this.withinTargets(phxTarget, (targetView, targetCtx) => {
            const cid = this.targetComponentID(newForm, targetCtx);
            pending++;
            let e = new CustomEvent("phx:form-recovery", { detail: { sourceElement: oldForm } });
            js_default.exec(e, "change", phxEvent, this, input, ["push", {
              _target: input.name,
              targetView,
              targetCtx,
              newCid: cid,
              callback: () => {
                pending--;
                if (pending === 0) {
                  callback();
                }
              }
            }]);
          }, templateDom, templateDom);
        }
        pushLinkPatch(e, href, targetEl, callback) {
          let linkRef = this.liveSocket.setPendingLink(href);
          let loading = e.isTrusted && e.type !== "popstate";
          let refGen = targetEl ? () => this.putRef([{ el: targetEl, loading, lock: true }], null, "click") : null;
          let fallback = () => this.liveSocket.redirect(window.location.href);
          let url = href.startsWith("/") ? `${location.protocol}//${location.host}${href}` : href;
          this.pushWithReply(refGen, "live_patch", { url }).then(
            ({ resp }) => {
              this.liveSocket.requestDOMUpdate(() => {
                if (resp.link_redirect) {
                  this.liveSocket.replaceMain(href, null, callback, linkRef);
                } else {
                  if (this.liveSocket.commitPendingLink(linkRef)) {
                    this.href = href;
                  }
                  this.applyPendingUpdates();
                  callback && callback(linkRef);
                }
              });
            },
            ({ error: _error, timeout: _timeout }) => fallback()
          );
        }
        getFormsForRecovery() {
          if (this.joinCount === 0) {
            return {};
          }
          let phxChange = this.binding("change");
          return dom_default.all(this.el, `form[${phxChange}]`).filter((form) => form.id).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => {
            const clonedForm = form.cloneNode(false);
            dom_default.copyPrivates(clonedForm, form);
            Array.from(form.elements).forEach((el) => {
              const clonedEl = el.cloneNode(true);
              morphdom_esm_default(clonedEl, el);
              dom_default.copyPrivates(clonedEl, el);
              clonedForm.appendChild(clonedEl);
            });
            return clonedForm;
          }).reduce((acc, form) => {
            acc[form.id] = form;
            return acc;
          }, {});
        }
        maybePushComponentsDestroyed(destroyedCIDs) {
          let willDestroyCIDs = destroyedCIDs.filter((cid) => {
            return dom_default.findComponentNodeList(this.el, cid).length === 0;
          });
          if (willDestroyCIDs.length > 0) {
            willDestroyCIDs.forEach((cid) => this.rendered.resetRender(cid));
            this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }).then(() => {
              this.liveSocket.requestDOMUpdate(() => {
                let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
                  return dom_default.findComponentNodeList(this.el, cid).length === 0;
                });
                if (completelyDestroyCIDs.length > 0) {
                  this.pushWithReply(null, "cids_destroyed", { cids: completelyDestroyCIDs }).then(({ resp }) => {
                    this.rendered.pruneCIDs(resp.cids);
                  }).catch((error) => logError("Failed to push components destroyed", error));
                }
              });
            }).catch((error) => logError("Failed to push components destroyed", error));
          }
        }
        ownsElement(el) {
          let parentViewEl = el.closest(PHX_VIEW_SELECTOR);
          return el.getAttribute(PHX_PARENT_ID) === this.id || parentViewEl && parentViewEl.id === this.id || !parentViewEl && this.isDead;
        }
        submitForm(form, targetCtx, phxEvent, submitter, opts = {}) {
          dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
          const inputs = Array.from(form.elements);
          inputs.forEach((input) => dom_default.putPrivate(input, PHX_HAS_SUBMITTED, true));
          this.liveSocket.blurActiveElement(this);
          this.pushFormSubmit(form, targetCtx, phxEvent, submitter, opts, () => {
            this.liveSocket.restorePreviouslyActiveFocus();
          });
        }
        binding(kind) {
          return this.liveSocket.binding(kind);
        }
      };
      LiveSocket = class {
        constructor(url, phxSocket, opts = {}) {
          this.unloaded = false;
          if (!phxSocket || phxSocket.constructor.name === "Object") {
            throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
          }
          this.socket = new phxSocket(url, opts);
          this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
          this.opts = opts;
          this.params = closure2(opts.params || {});
          this.viewLogger = opts.viewLogger;
          this.metadataCallbacks = opts.metadata || {};
          this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
          this.activeElement = null;
          this.prevActive = null;
          this.silenced = false;
          this.main = null;
          this.outgoingMainEl = null;
          this.clickStartedAtTarget = null;
          this.linkRef = 1;
          this.roots = {};
          this.href = window.location.href;
          this.pendingLink = null;
          this.currentLocation = clone(window.location);
          this.hooks = opts.hooks || {};
          this.uploaders = opts.uploaders || {};
          this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
          this.disconnectedTimeout = opts.disconnectedTimeout || DISCONNECTED_TIMEOUT;
          this.reloadWithJitterTimer = null;
          this.maxReloads = opts.maxReloads || MAX_RELOADS;
          this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
          this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
          this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
          this.localStorage = opts.localStorage || window.localStorage;
          this.sessionStorage = opts.sessionStorage || window.sessionStorage;
          this.boundTopLevelEvents = false;
          this.boundEventNames = /* @__PURE__ */ new Set();
          this.serverCloseRef = null;
          this.domCallbacks = Object.assign(
            {
              jsQuerySelectorAll: null,
              onPatchStart: closure2(),
              onPatchEnd: closure2(),
              onNodeAdded: closure2(),
              onBeforeElUpdated: closure2()
            },
            opts.dom || {}
          );
          this.transitions = new TransitionSet();
          this.currentHistoryPosition = parseInt(this.sessionStorage.getItem(PHX_LV_HISTORY_POSITION)) || 0;
          window.addEventListener("pagehide", (_e) => {
            this.unloaded = true;
          });
          this.socket.onOpen(() => {
            if (this.isUnloaded()) {
              window.location.reload();
            }
          });
        }
        // public
        version() {
          return "1.0.17";
        }
        isProfileEnabled() {
          return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
        }
        isDebugEnabled() {
          return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
        }
        isDebugDisabled() {
          return this.sessionStorage.getItem(PHX_LV_DEBUG) === "false";
        }
        enableDebug() {
          this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
        }
        enableProfiling() {
          this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
        }
        disableDebug() {
          this.sessionStorage.setItem(PHX_LV_DEBUG, "false");
        }
        disableProfiling() {
          this.sessionStorage.removeItem(PHX_LV_PROFILE);
        }
        enableLatencySim(upperBoundMs) {
          this.enableDebug();
          console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable");
          this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs);
        }
        disableLatencySim() {
          this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
        }
        getLatencySim() {
          let str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
          return str ? parseInt(str) : null;
        }
        getSocket() {
          return this.socket;
        }
        connect() {
          if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
            this.enableDebug();
          }
          let doConnect = () => {
            this.resetReloadStatus();
            if (this.joinRootViews()) {
              this.bindTopLevelEvents();
              this.socket.connect();
            } else if (this.main) {
              this.socket.connect();
            } else {
              this.bindTopLevelEvents({ dead: true });
            }
            this.joinDeadView();
          };
          if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
            doConnect();
          } else {
            document.addEventListener("DOMContentLoaded", () => doConnect());
          }
        }
        disconnect(callback) {
          clearTimeout(this.reloadWithJitterTimer);
          if (this.serverCloseRef) {
            this.socket.off(this.serverCloseRef);
            this.serverCloseRef = null;
          }
          this.socket.disconnect(callback);
        }
        replaceTransport(transport) {
          clearTimeout(this.reloadWithJitterTimer);
          this.socket.replaceTransport(transport);
          this.connect();
        }
        execJS(el, encodedJS, eventType = null) {
          let e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
          this.owner(el, (view) => js_default.exec(e, eventType, encodedJS, view, el));
        }
        // private
        execJSHookPush(el, phxEvent, data, callback) {
          this.withinOwners(el, (view) => {
            let e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
            js_default.exec(e, "hook", phxEvent, view, el, ["push", { data, callback }]);
          });
        }
        unload() {
          if (this.unloaded) {
            return;
          }
          if (this.main && this.isConnected()) {
            this.log(this.main, "socket", () => ["disconnect for page nav"]);
          }
          this.unloaded = true;
          this.destroyAllViews();
          this.disconnect();
        }
        triggerDOM(kind, args) {
          this.domCallbacks[kind](...args);
        }
        time(name, func) {
          if (!this.isProfileEnabled() || !console.time) {
            return func();
          }
          console.time(name);
          let result = func();
          console.timeEnd(name);
          return result;
        }
        log(view, kind, msgCallback) {
          if (this.viewLogger) {
            let [msg, obj] = msgCallback();
            this.viewLogger(view, kind, msg, obj);
          } else if (this.isDebugEnabled()) {
            let [msg, obj] = msgCallback();
            debug(view, kind, msg, obj);
          }
        }
        requestDOMUpdate(callback) {
          this.transitions.after(callback);
        }
        transition(time, onStart, onDone = function() {
        }) {
          this.transitions.addTransition(time, onStart, onDone);
        }
        onChannel(channel, event, cb) {
          channel.on(event, (data) => {
            let latency = this.getLatencySim();
            if (!latency) {
              cb(data);
            } else {
              setTimeout(() => cb(data), latency);
            }
          });
        }
        reloadWithJitter(view, log) {
          clearTimeout(this.reloadWithJitterTimer);
          this.disconnect();
          let minMs = this.reloadJitterMin;
          let maxMs = this.reloadJitterMax;
          let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
          let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
          if (tries >= this.maxReloads) {
            afterMs = this.failsafeJitter;
          }
          this.reloadWithJitterTimer = setTimeout(() => {
            if (view.isDestroyed() || view.isConnected()) {
              return;
            }
            view.destroy();
            log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
            if (tries >= this.maxReloads) {
              this.log(view, "join", () => [`exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`]);
            }
            if (this.hasPendingLink()) {
              window.location = this.pendingLink;
            } else {
              window.location.reload();
            }
          }, afterMs);
        }
        getHookCallbacks(name) {
          return name && name.startsWith("Phoenix.") ? hooks_default[name.split(".")[1]] : this.hooks[name];
        }
        isUnloaded() {
          return this.unloaded;
        }
        isConnected() {
          return this.socket.isConnected();
        }
        getBindingPrefix() {
          return this.bindingPrefix;
        }
        binding(kind) {
          return `${this.getBindingPrefix()}${kind}`;
        }
        channel(topic, params) {
          return this.socket.channel(topic, params);
        }
        joinDeadView() {
          let body = document.body;
          if (body && !this.isPhxView(body) && !this.isPhxView(document.firstElementChild)) {
            let view = this.newRootView(body);
            view.setHref(this.getHref());
            view.joinDead();
            if (!this.main) {
              this.main = view;
            }
            window.requestAnimationFrame(() => {
              var _a;
              view.execNewMounted();
              this.maybeScroll((_a = history.state) == null ? void 0 : _a.scroll);
            });
          }
        }
        joinRootViews() {
          let rootsFound = false;
          dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
            if (!this.getRootById(rootEl.id)) {
              let view = this.newRootView(rootEl);
              if (!dom_default.isPhxSticky(rootEl)) {
                view.setHref(this.getHref());
              }
              view.join();
              if (rootEl.hasAttribute(PHX_MAIN)) {
                this.main = view;
              }
            }
            rootsFound = true;
          });
          return rootsFound;
        }
        redirect(to, flash, reloadToken) {
          if (reloadToken) {
            browser_default.setCookie(PHX_RELOAD_STATUS, reloadToken, 60);
          }
          this.unload();
          browser_default.redirect(to, flash);
        }
        replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
          const liveReferer = this.currentLocation.href;
          this.outgoingMainEl = this.outgoingMainEl || this.main.el;
          const stickies = dom_default.findPhxSticky(document) || [];
          const removeEls = dom_default.all(this.outgoingMainEl, `[${this.binding("remove")}]`).filter((el) => !dom_default.isChildOfAny(el, stickies));
          const newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
          this.main.showLoader(this.loaderTimeout);
          this.main.destroy();
          this.main = this.newRootView(newMainEl, flash, liveReferer);
          this.main.setRedirect(href);
          this.transitionRemoves(removeEls);
          this.main.join((joinCount, onDone) => {
            if (joinCount === 1 && this.commitPendingLink(linkRef)) {
              this.requestDOMUpdate(() => {
                removeEls.forEach((el) => el.remove());
                stickies.forEach((el) => newMainEl.appendChild(el));
                this.outgoingMainEl.replaceWith(newMainEl);
                this.outgoingMainEl = null;
                callback && callback(linkRef);
                onDone();
              });
            }
          });
        }
        transitionRemoves(elements, callback) {
          let removeAttr = this.binding("remove");
          let silenceEvents = (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
          };
          elements.forEach((el) => {
            for (let event of this.boundEventNames) {
              el.addEventListener(event, silenceEvents, true);
            }
            this.execJS(el, el.getAttribute(removeAttr), "remove");
          });
          this.requestDOMUpdate(() => {
            elements.forEach((el) => {
              for (let event of this.boundEventNames) {
                el.removeEventListener(event, silenceEvents, true);
              }
            });
            callback && callback();
          });
        }
        isPhxView(el) {
          return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
        }
        newRootView(el, flash, liveReferer) {
          let view = new View(el, this, null, flash, liveReferer);
          this.roots[view.id] = view;
          return view;
        }
        owner(childEl, callback) {
          let view;
          const closestViewEl = childEl.closest(PHX_VIEW_SELECTOR);
          if (closestViewEl) {
            view = this.getViewByEl(closestViewEl);
          } else {
            view = this.main;
          }
          return view && callback ? callback(view) : view;
        }
        withinOwners(childEl, callback) {
          this.owner(childEl, (view) => callback(view, childEl));
        }
        getViewByEl(el) {
          let rootId = el.getAttribute(PHX_ROOT_ID);
          return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
        }
        getRootById(id) {
          return this.roots[id];
        }
        destroyAllViews() {
          for (let id in this.roots) {
            this.roots[id].destroy();
            delete this.roots[id];
          }
          this.main = null;
        }
        destroyViewByEl(el) {
          let root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
          if (root && root.id === el.id) {
            root.destroy();
            delete this.roots[root.id];
          } else if (root) {
            root.destroyDescendent(el.id);
          }
        }
        getActiveElement() {
          return document.activeElement;
        }
        dropActiveElement(view) {
          if (this.prevActive && view.ownsElement(this.prevActive)) {
            this.prevActive = null;
          }
        }
        restorePreviouslyActiveFocus() {
          if (this.prevActive && this.prevActive !== document.body) {
            this.prevActive.focus();
          }
        }
        blurActiveElement() {
          this.prevActive = this.getActiveElement();
          if (this.prevActive !== document.body) {
            this.prevActive.blur();
          }
        }
        bindTopLevelEvents({ dead } = {}) {
          if (this.boundTopLevelEvents) {
            return;
          }
          this.boundTopLevelEvents = true;
          this.serverCloseRef = this.socket.onClose((event) => {
            if (event && event.code === 1e3 && this.main) {
              return this.reloadWithJitter(this.main);
            }
          });
          document.body.addEventListener("click", function() {
          });
          window.addEventListener("pageshow", (e) => {
            if (e.persisted) {
              this.getSocket().disconnect();
              this.withPageLoading({ to: window.location.href, kind: "redirect" });
              window.location.reload();
            }
          }, true);
          if (!dead) {
            this.bindNav();
          }
          this.bindClicks();
          if (!dead) {
            this.bindForms();
          }
          this.bind({ keyup: "keyup", keydown: "keydown" }, (e, type, view, targetEl, phxEvent, _phxTarget) => {
            let matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
            let pressedKey = e.key && e.key.toLowerCase();
            if (matchKey && matchKey.toLowerCase() !== pressedKey) {
              return;
            }
            let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
            js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
          });
          this.bind({ blur: "focusout", focus: "focusin" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
            if (!phxTarget) {
              let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
              js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
            }
          });
          this.bind({ blur: "blur", focus: "focus" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
            if (phxTarget === "window") {
              let data = this.eventMeta(type, e, targetEl);
              js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
            }
          });
          this.on("dragover", (e) => e.preventDefault());
          this.on("drop", (e) => {
            e.preventDefault();
            let dropTargetId = maybe(closestPhxBinding(e.target, this.binding(PHX_DROP_TARGET)), (trueTarget) => {
              return trueTarget.getAttribute(this.binding(PHX_DROP_TARGET));
            });
            let dropTarget = dropTargetId && document.getElementById(dropTargetId);
            let files = Array.from(e.dataTransfer.files || []);
            if (!dropTarget || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
              return;
            }
            LiveUploader.trackFiles(dropTarget, files, e.dataTransfer);
            dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
          });
          this.on(PHX_TRACK_UPLOADS, (e) => {
            let uploadTarget = e.target;
            if (!dom_default.isUploadInput(uploadTarget)) {
              return;
            }
            let files = Array.from(e.detail.files || []).filter((f) => f instanceof File || f instanceof Blob);
            LiveUploader.trackFiles(uploadTarget, files);
            uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
          });
        }
        eventMeta(eventName, e, targetEl) {
          let callback = this.metadataCallbacks[eventName];
          return callback ? callback(e, targetEl) : {};
        }
        setPendingLink(href) {
          this.linkRef++;
          this.pendingLink = href;
          this.resetReloadStatus();
          return this.linkRef;
        }
        // anytime we are navigating or connecting, drop reload cookie in case
        // we issue the cookie but the next request was interrupted and the server never dropped it
        resetReloadStatus() {
          browser_default.deleteCookie(PHX_RELOAD_STATUS);
        }
        commitPendingLink(linkRef) {
          if (this.linkRef !== linkRef) {
            return false;
          } else {
            this.href = this.pendingLink;
            this.pendingLink = null;
            return true;
          }
        }
        getHref() {
          return this.href;
        }
        hasPendingLink() {
          return !!this.pendingLink;
        }
        bind(events, callback) {
          for (let event in events) {
            let browserEventName = events[event];
            this.on(browserEventName, (e) => {
              let binding = this.binding(event);
              let windowBinding = this.binding(`window-${event}`);
              let targetPhxEvent = e.target.getAttribute && e.target.getAttribute(binding);
              if (targetPhxEvent) {
                this.debounce(e.target, e, browserEventName, () => {
                  this.withinOwners(e.target, (view) => {
                    callback(e, event, view, e.target, targetPhxEvent, null);
                  });
                });
              } else {
                dom_default.all(document, `[${windowBinding}]`, (el) => {
                  let phxEvent = el.getAttribute(windowBinding);
                  this.debounce(el, e, browserEventName, () => {
                    this.withinOwners(el, (view) => {
                      callback(e, event, view, el, phxEvent, "window");
                    });
                  });
                });
              }
            });
          }
        }
        bindClicks() {
          this.on("mousedown", (e) => this.clickStartedAtTarget = e.target);
          this.bindClick("click", "click");
        }
        bindClick(eventName, bindingName) {
          let click = this.binding(bindingName);
          window.addEventListener(eventName, (e) => {
            let target = null;
            if (e.detail === 0)
              this.clickStartedAtTarget = e.target;
            let clickStartedAtTarget = this.clickStartedAtTarget || e.target;
            target = closestPhxBinding(e.target, click);
            this.dispatchClickAway(e, clickStartedAtTarget);
            this.clickStartedAtTarget = null;
            let phxEvent = target && target.getAttribute(click);
            if (!phxEvent) {
              if (dom_default.isNewPageClick(e, window.location)) {
                this.unload();
              }
              return;
            }
            if (target.getAttribute("href") === "#") {
              e.preventDefault();
            }
            if (target.hasAttribute(PHX_REF_SRC)) {
              return;
            }
            this.debounce(target, e, "click", () => {
              this.withinOwners(target, (view) => {
                js_default.exec(e, "click", phxEvent, view, target, ["push", { data: this.eventMeta("click", e, target) }]);
              });
            });
          }, false);
        }
        dispatchClickAway(e, clickStartedAt) {
          let phxClickAway = this.binding("click-away");
          dom_default.all(document, `[${phxClickAway}]`, (el) => {
            if (!(el.isSameNode(clickStartedAt) || el.contains(clickStartedAt))) {
              this.withinOwners(el, (view) => {
                let phxEvent = el.getAttribute(phxClickAway);
                if (js_default.isVisible(el) && js_default.isInViewport(el)) {
                  js_default.exec(e, "click", phxEvent, view, el, ["push", { data: this.eventMeta("click", e, e.target) }]);
                }
              });
            }
          });
        }
        bindNav() {
          if (!browser_default.canPushState()) {
            return;
          }
          if (history.scrollRestoration) {
            history.scrollRestoration = "manual";
          }
          let scrollTimer = null;
          window.addEventListener("scroll", (_e) => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
              browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
            }, 100);
          });
          window.addEventListener("popstate", (event) => {
            if (!this.registerNewLocation(window.location)) {
              return;
            }
            let { type, backType, id, scroll, position } = event.state || {};
            let href = window.location.href;
            let isForward = position > this.currentHistoryPosition;
            type = isForward ? type : backType || type;
            this.currentHistoryPosition = position || 0;
            this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
            dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: type === "patch", pop: true, direction: isForward ? "forward" : "backward" } });
            this.requestDOMUpdate(() => {
              const callback = () => {
                this.maybeScroll(scroll);
              };
              if (this.main.isConnected() && (type === "patch" && id === this.main.id)) {
                this.main.pushLinkPatch(event, href, null, callback);
              } else {
                this.replaceMain(href, null, callback);
              }
            });
          }, false);
          window.addEventListener("click", (e) => {
            let target = closestPhxBinding(e.target, PHX_LIVE_LINK);
            let type = target && target.getAttribute(PHX_LIVE_LINK);
            if (!type || !this.isConnected() || !this.main || dom_default.wantsNewTab(e)) {
              return;
            }
            let href = target.href instanceof SVGAnimatedString ? target.href.baseVal : target.href;
            let linkState = target.getAttribute(PHX_LINK_STATE);
            e.preventDefault();
            e.stopImmediatePropagation();
            if (this.pendingLink === href) {
              return;
            }
            this.requestDOMUpdate(() => {
              if (type === "patch") {
                this.pushHistoryPatch(e, href, linkState, target);
              } else if (type === "redirect") {
                this.historyRedirect(e, href, linkState, null, target);
              } else {
                throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
              }
              let phxClick = target.getAttribute(this.binding("click"));
              if (phxClick) {
                this.requestDOMUpdate(() => this.execJS(target, phxClick, "click"));
              }
            });
          }, false);
        }
        maybeScroll(scroll) {
          if (typeof scroll === "number") {
            requestAnimationFrame(() => {
              window.scrollTo(0, scroll);
            });
          }
        }
        dispatchEvent(event, payload = {}) {
          dom_default.dispatchEvent(window, `phx:${event}`, { detail: payload });
        }
        dispatchEvents(events) {
          events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
        }
        withPageLoading(info, callback) {
          dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
          let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
          return callback ? callback(done) : done;
        }
        pushHistoryPatch(e, href, linkState, targetEl) {
          if (!this.isConnected() || !this.main.isMain()) {
            return browser_default.redirect(href);
          }
          this.withPageLoading({ to: href, kind: "patch" }, (done) => {
            this.main.pushLinkPatch(e, href, targetEl, (linkRef) => {
              this.historyPatch(href, linkState, linkRef);
              done();
            });
          });
        }
        historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
          if (!this.commitPendingLink(linkRef)) {
            return;
          }
          this.currentHistoryPosition++;
          this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
          browser_default.updateCurrentState((state) => __spreadProps(__spreadValues({}, state), { backType: "patch" }));
          browser_default.pushState(linkState, {
            type: "patch",
            id: this.main.id,
            position: this.currentHistoryPosition
          }, href);
          dom_default.dispatchEvent(window, "phx:navigate", { detail: { patch: true, href, pop: false, direction: "forward" } });
          this.registerNewLocation(window.location);
        }
        historyRedirect(e, href, linkState, flash, targetEl) {
          const clickLoading = targetEl && e.isTrusted && e.type !== "popstate";
          if (clickLoading) {
            targetEl.classList.add("phx-click-loading");
          }
          if (!this.isConnected() || !this.main.isMain()) {
            return browser_default.redirect(href, flash);
          }
          if (/^\/$|^\/[^\/]+.*$/.test(href)) {
            let { protocol, host } = window.location;
            href = `${protocol}//${host}${href}`;
          }
          let scroll = window.scrollY;
          this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
            this.replaceMain(href, flash, (linkRef) => {
              if (linkRef === this.linkRef) {
                this.currentHistoryPosition++;
                this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
                browser_default.updateCurrentState((state) => __spreadProps(__spreadValues({}, state), { backType: "redirect" }));
                browser_default.pushState(linkState, {
                  type: "redirect",
                  id: this.main.id,
                  scroll,
                  position: this.currentHistoryPosition
                }, href);
                dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: false, pop: false, direction: "forward" } });
                this.registerNewLocation(window.location);
              }
              if (clickLoading) {
                targetEl.classList.remove("phx-click-loading");
              }
              done();
            });
          });
        }
        registerNewLocation(newLocation) {
          let { pathname, search } = this.currentLocation;
          if (pathname + search === newLocation.pathname + newLocation.search) {
            return false;
          } else {
            this.currentLocation = clone(newLocation);
            return true;
          }
        }
        bindForms() {
          let iterations = 0;
          let externalFormSubmitted = false;
          this.on("submit", (e) => {
            let phxSubmit = e.target.getAttribute(this.binding("submit"));
            let phxChange = e.target.getAttribute(this.binding("change"));
            if (!externalFormSubmitted && phxChange && !phxSubmit) {
              externalFormSubmitted = true;
              e.preventDefault();
              this.withinOwners(e.target, (view) => {
                view.disableForm(e.target);
                window.requestAnimationFrame(() => {
                  if (dom_default.isUnloadableFormSubmit(e)) {
                    this.unload();
                  }
                  e.target.submit();
                });
              });
            }
          });
          this.on("submit", (e) => {
            let phxEvent = e.target.getAttribute(this.binding("submit"));
            if (!phxEvent) {
              if (dom_default.isUnloadableFormSubmit(e)) {
                this.unload();
              }
              return;
            }
            e.preventDefault();
            e.target.disabled = true;
            this.withinOwners(e.target, (view) => {
              js_default.exec(e, "submit", phxEvent, view, e.target, ["push", { submitter: e.submitter }]);
            });
          });
          for (let type of ["change", "input"]) {
            this.on(type, (e) => {
              if (e instanceof CustomEvent && e.target.form === void 0) {
                if (e.detail && e.detail.dispatcher) {
                  throw new Error(`dispatching a custom ${type} event is only supported on input elements inside a form`);
                }
                return;
              }
              let phxChange = this.binding("change");
              let input = e.target;
              if (e.isComposing) {
                const key = `composition-listener-${type}`;
                if (!dom_default.private(input, key)) {
                  dom_default.putPrivate(input, key, true);
                  input.addEventListener("compositionend", () => {
                    input.dispatchEvent(new Event(type, { bubbles: true }));
                    dom_default.deletePrivate(input, key);
                  }, { once: true });
                }
                return;
              }
              let inputEvent = input.getAttribute(phxChange);
              let formEvent = input.form && input.form.getAttribute(phxChange);
              let phxEvent = inputEvent || formEvent;
              if (!phxEvent) {
                return;
              }
              if (input.type === "number" && input.validity && input.validity.badInput) {
                return;
              }
              let dispatcher = inputEvent ? input : input.form;
              let currentIterations = iterations;
              iterations++;
              let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
              if (at === currentIterations - 1 && type === "change" && lastType === "input") {
                return;
              }
              dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
              this.debounce(input, e, type, () => {
                this.withinOwners(dispatcher, (view) => {
                  dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
                  js_default.exec(e, "change", phxEvent, view, input, ["push", { _target: e.target.name, dispatcher }]);
                });
              });
            });
          }
          this.on("reset", (e) => {
            let form = e.target;
            dom_default.resetForm(form);
            let input = Array.from(form.elements).find((el) => el.type === "reset");
            if (input) {
              window.requestAnimationFrame(() => {
                input.dispatchEvent(new Event("input", { bubbles: true, cancelable: false }));
              });
            }
          });
        }
        debounce(el, event, eventType, callback) {
          if (eventType === "blur" || eventType === "focusout") {
            return callback();
          }
          let phxDebounce = this.binding(PHX_DEBOUNCE);
          let phxThrottle = this.binding(PHX_THROTTLE);
          let defaultDebounce = this.defaults.debounce.toString();
          let defaultThrottle = this.defaults.throttle.toString();
          this.withinOwners(el, (view) => {
            let asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
            dom_default.debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, () => {
              callback();
            });
          });
        }
        silenceEvents(callback) {
          this.silenced = true;
          callback();
          this.silenced = false;
        }
        on(event, callback) {
          this.boundEventNames.add(event);
          window.addEventListener(event, (e) => {
            if (!this.silenced) {
              callback(e);
            }
          });
        }
        jsQuerySelectorAll(sourceEl, query, defaultQuery) {
          let all = this.domCallbacks.jsQuerySelectorAll;
          return all ? all(sourceEl, query, defaultQuery) : defaultQuery();
        }
      };
      TransitionSet = class {
        constructor() {
          this.transitions = /* @__PURE__ */ new Set();
          this.pendingOps = [];
        }
        reset() {
          this.transitions.forEach((timer) => {
            clearTimeout(timer);
            this.transitions.delete(timer);
          });
          this.flushPendingOps();
        }
        after(callback) {
          if (this.size() === 0) {
            callback();
          } else {
            this.pushPendingOp(callback);
          }
        }
        addTransition(time, onStart, onDone) {
          onStart();
          let timer = setTimeout(() => {
            this.transitions.delete(timer);
            onDone();
            this.flushPendingOps();
          }, time);
          this.transitions.add(timer);
        }
        pushPendingOp(op) {
          this.pendingOps.push(op);
        }
        size() {
          return this.transitions.size;
        }
        flushPendingOps() {
          if (this.size() > 0) {
            return;
          }
          let op = this.pendingOps.shift();
          if (op) {
            op();
            this.flushPendingOps();
          }
        }
      };
    }
  });

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = (/* @__PURE__ */ new Date()).getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, currentProgress, showing, progressTimerId = null, fadeTimerId = null, delayTimerId = null, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(
            Math.ceil(currentProgress * canvas.width),
            options.barThickness / 2
          );
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function(delay) {
            if (showing)
              return;
            if (delay) {
              if (delayTimerId)
                return;
              delayTimerId = setTimeout(() => topbar.show(), delay);
            } else {
              showing = true;
              if (fadeTimerId !== null)
                window2.cancelAnimationFrame(fadeTimerId);
              if (!canvas)
                createCanvas();
              canvas.style.opacity = 1;
              canvas.style.display = "block";
              topbar.progress(0);
              if (options.autoRun) {
                (function loop() {
                  progressTimerId = window2.requestAnimationFrame(loop);
                  topbar.progress(
                    "+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2)
                  );
                })();
              }
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            clearTimeout(delayTimerId);
            delayTimerId = null;
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar;
          });
        } else {
          this.topbar = topbar;
        }
      }).call(exports, window, document);
    }
  });

  // js/app.js
  var require_app = __commonJS({
    "js/app.js"() {
      init_phoenix_html();
      init_phoenix();
      init_phoenix_live_view_esm();
      var import_topbar = __toESM(require_topbar());
      var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      var liveSocket = new LiveSocket("/live", Socket, {
        longPollFallbackMs: 2500,
        params: { _csrf_token: csrfToken }
      });
      import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
      window.addEventListener("phx:page-loading-start", (_info) => import_topbar.default.show(300));
      window.addEventListener("phx:page-loading-stop", (_info) => import_topbar.default.hide());
      liveSocket.connect();
      window.liveSocket = liveSocket;
    }
  });
  require_app();
})();
/**
 * @license MIT
 * topbar 2.0.0, 2023-02-04
 * https://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4X2h0bWwvcHJpdi9zdGF0aWMvcGhvZW5peF9odG1sLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC91dGlscy5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9wdXNoLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC90aW1lci5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY2hhbm5lbC5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvYWpheC5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvbG9uZ3BvbGwuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3ByZXNlbmNlLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zZXJpYWxpemVyLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zb2NrZXQuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2VudHJ5X3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3V0aWxzLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2Jyb3dzZXIuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3VwbG9hZF9lbnRyeS5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2FyaWEuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvaG9va3MuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZWxlbWVudF9yZWYuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tX3Bvc3RfbW9ycGhfcmVzdG9yZXIuanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4X2xpdmVfdmlldy9ub2RlX21vZHVsZXMvbW9ycGhkb20vZGlzdC9tb3JwaGRvbS1lc20uanMiLCAiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tX3BhdGNoLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3JlbmRlcmVkLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2pzLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3ZpZXdfaG9vay5qcyIsICIuLi8uLi8uLi9hc3NldHMvbm9kZV9tb2R1bGVzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy92aWV3LmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2xpdmVfc29ja2V0LmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9ub2RlX21vZHVsZXMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2luZGV4LmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy92ZW5kb3IvdG9wYmFyLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9qcy9hcHAuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBQb2x5ZmlsbEV2ZW50ID0gZXZlbnRDb25zdHJ1Y3RvcigpO1xuXG4gIGZ1bmN0aW9uIGV2ZW50Q29uc3RydWN0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHdpbmRvdy5DdXN0b21FdmVudDtcbiAgICAvLyBJRTw9OSBTdXBwb3J0XG4gICAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHtidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkfTtcbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gICAgICByZXR1cm4gZXZ0O1xuICAgIH1cbiAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xuICAgIHJldHVybiBDdXN0b21FdmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkSGlkZGVuSW5wdXQobmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQudHlwZSA9IFwiaGlkZGVuXCI7XG4gICAgaW5wdXQubmFtZSA9IG5hbWU7XG4gICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDbGljayhlbGVtZW50LCB0YXJnZXRNb2RpZmllcktleSkge1xuICAgIHZhciB0byA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10b1wiKSxcbiAgICAgICAgbWV0aG9kID0gYnVpbGRIaWRkZW5JbnB1dChcIl9tZXRob2RcIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSksXG4gICAgICAgIGNzcmYgPSBidWlsZEhpZGRlbklucHV0KFwiX2NzcmZfdG9rZW5cIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNzcmZcIikpLFxuICAgICAgICBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIiksXG4gICAgICAgIHN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKSxcbiAgICAgICAgdGFyZ2V0ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIik7XG5cbiAgICBmb3JtLm1ldGhvZCA9IChlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpID09PSBcImdldFwiKSA/IFwiZ2V0XCIgOiBcInBvc3RcIjtcbiAgICBmb3JtLmFjdGlvbiA9IHRvO1xuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gICAgaWYgKHRhcmdldCkgZm9ybS50YXJnZXQgPSB0YXJnZXQ7XG4gICAgZWxzZSBpZiAodGFyZ2V0TW9kaWZpZXJLZXkpIGZvcm0udGFyZ2V0ID0gXCJfYmxhbmtcIjtcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoY3NyZik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChtZXRob2QpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICAvLyBJbnNlcnQgYSBidXR0b24gYW5kIGNsaWNrIGl0IGluc3RlYWQgb2YgdXNpbmcgYGZvcm0uc3VibWl0YFxuICAgIC8vIGJlY2F1c2UgdGhlIGBzdWJtaXRgIGZ1bmN0aW9uIGRvZXMgbm90IGVtaXQgYSBgc3VibWl0YCBldmVudC5cbiAgICBzdWJtaXQudHlwZSA9IFwic3VibWl0XCI7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChzdWJtaXQpO1xuICAgIHN1Ym1pdC5jbGljaygpO1xuICB9XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBlLnRhcmdldDtcbiAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkKSByZXR1cm47XG5cbiAgICB3aGlsZSAoZWxlbWVudCAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZSkge1xuICAgICAgdmFyIHBob2VuaXhMaW5rRXZlbnQgPSBuZXcgUG9seWZpbGxFdmVudCgncGhvZW5peC5saW5rLmNsaWNrJywge1xuICAgICAgICBcImJ1YmJsZXNcIjogdHJ1ZSwgXCJjYW5jZWxhYmxlXCI6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWVsZW1lbnQuZGlzcGF0Y2hFdmVudChwaG9lbml4TGlua0V2ZW50KSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRvXCIpKSB7XG4gICAgICAgIGhhbmRsZUNsaWNrKGVsZW1lbnQsIGUubWV0YUtleSB8fCBlLnNoaWZ0S2V5KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cbiAgfSwgZmFsc2UpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwaG9lbml4LmxpbmsuY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBtZXNzYWdlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb25maXJtXCIpO1xuICAgIGlmKG1lc3NhZ2UgJiYgIXdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LCBmYWxzZSk7XG59KSgpO1xuIiwgIi8vIHdyYXBzIHZhbHVlIGluIGNsb3N1cmUgb3IgcmV0dXJucyBjbG9zdXJlXG5leHBvcnQgbGV0IGNsb3N1cmUgPSAodmFsdWUpID0+IHtcbiAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xuICAgIHJldHVybiB2YWx1ZVxuICB9IGVsc2Uge1xuICAgIGxldCBjbG9zdXJlID0gZnVuY3Rpb24gKCl7IHJldHVybiB2YWx1ZSB9XG4gICAgcmV0dXJuIGNsb3N1cmVcbiAgfVxufVxuIiwgImV4cG9ydCBjb25zdCBnbG9iYWxTZWxmID0gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogbnVsbFxuZXhwb3J0IGNvbnN0IHBoeFdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBudWxsXG5leHBvcnQgY29uc3QgZ2xvYmFsID0gZ2xvYmFsU2VsZiB8fCBwaHhXaW5kb3cgfHwgZ2xvYmFsXG5leHBvcnQgY29uc3QgREVGQVVMVF9WU04gPSBcIjIuMC4wXCJcbmV4cG9ydCBjb25zdCBTT0NLRVRfU1RBVEVTID0ge2Nvbm5lY3Rpbmc6IDAsIG9wZW46IDEsIGNsb3Npbmc6IDIsIGNsb3NlZDogM31cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDAwMFxuZXhwb3J0IGNvbnN0IFdTX0NMT1NFX05PUk1BTCA9IDEwMDBcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1NUQVRFUyA9IHtcbiAgY2xvc2VkOiBcImNsb3NlZFwiLFxuICBlcnJvcmVkOiBcImVycm9yZWRcIixcbiAgam9pbmVkOiBcImpvaW5lZFwiLFxuICBqb2luaW5nOiBcImpvaW5pbmdcIixcbiAgbGVhdmluZzogXCJsZWF2aW5nXCIsXG59XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9FVkVOVFMgPSB7XG4gIGNsb3NlOiBcInBoeF9jbG9zZVwiLFxuICBlcnJvcjogXCJwaHhfZXJyb3JcIixcbiAgam9pbjogXCJwaHhfam9pblwiLFxuICByZXBseTogXCJwaHhfcmVwbHlcIixcbiAgbGVhdmU6IFwicGh4X2xlYXZlXCJcbn1cblxuZXhwb3J0IGNvbnN0IFRSQU5TUE9SVFMgPSB7XG4gIGxvbmdwb2xsOiBcImxvbmdwb2xsXCIsXG4gIHdlYnNvY2tldDogXCJ3ZWJzb2NrZXRcIlxufVxuZXhwb3J0IGNvbnN0IFhIUl9TVEFURVMgPSB7XG4gIGNvbXBsZXRlOiA0XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHVzaFxuICogQHBhcmFtIHtDaGFubmVsfSBjaGFubmVsIC0gVGhlIENoYW5uZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCAtIFRoZSBldmVudCwgZm9yIGV4YW1wbGUgYFwicGh4X2pvaW5cImBcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkIC0gVGhlIHBheWxvYWQsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogMTIzfWBcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0IC0gVGhlIHB1c2ggdGltZW91dCBpbiBtaWxsaXNlY29uZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVzaCB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0KXtcbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsXG4gICAgdGhpcy5ldmVudCA9IGV2ZW50XG4gICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZCB8fCBmdW5jdGlvbiAoKXsgcmV0dXJuIHt9IH1cbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gICAgdGhpcy5yZWNIb29rcyA9IFtdXG4gICAgdGhpcy5zZW50ID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZW91dFxuICAgKi9cbiAgcmVzZW5kKHRpbWVvdXQpe1xuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLnNlbmQoKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzZW5kKCl7XG4gICAgaWYodGhpcy5oYXNSZWNlaXZlZChcInRpbWVvdXRcIikpeyByZXR1cm4gfVxuICAgIHRoaXMuc3RhcnRUaW1lb3V0KClcbiAgICB0aGlzLnNlbnQgPSB0cnVlXG4gICAgdGhpcy5jaGFubmVsLnNvY2tldC5wdXNoKHtcbiAgICAgIHRvcGljOiB0aGlzLmNoYW5uZWwudG9waWMsXG4gICAgICBldmVudDogdGhpcy5ldmVudCxcbiAgICAgIHBheWxvYWQ6IHRoaXMucGF5bG9hZCgpLFxuICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgIGpvaW5fcmVmOiB0aGlzLmNoYW5uZWwuam9pblJlZigpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHN0YXR1c1xuICAgKiBAcGFyYW0geyp9IGNhbGxiYWNrXG4gICAqL1xuICByZWNlaXZlKHN0YXR1cywgY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuaGFzUmVjZWl2ZWQoc3RhdHVzKSl7XG4gICAgICBjYWxsYmFjayh0aGlzLnJlY2VpdmVkUmVzcC5yZXNwb25zZSlcbiAgICB9XG5cbiAgICB0aGlzLnJlY0hvb2tzLnB1c2goe3N0YXR1cywgY2FsbGJhY2t9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlc2V0KCl7XG4gICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgdGhpcy5yZWYgPSBudWxsXG4gICAgdGhpcy5yZWZFdmVudCA9IG51bGxcbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnNlbnQgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtYXRjaFJlY2VpdmUoe3N0YXR1cywgcmVzcG9uc2UsIF9yZWZ9KXtcbiAgICB0aGlzLnJlY0hvb2tzLmZpbHRlcihoID0+IGguc3RhdHVzID09PSBzdGF0dXMpXG4gICAgICAuZm9yRWFjaChoID0+IGguY2FsbGJhY2socmVzcG9uc2UpKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5jZWxSZWZFdmVudCgpe1xuICAgIGlmKCF0aGlzLnJlZkV2ZW50KXsgcmV0dXJuIH1cbiAgICB0aGlzLmNoYW5uZWwub2ZmKHRoaXMucmVmRXZlbnQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhbmNlbFRpbWVvdXQoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0VGltZXIpXG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXJ0VGltZW91dCgpe1xuICAgIGlmKHRoaXMudGltZW91dFRpbWVyKXsgdGhpcy5jYW5jZWxUaW1lb3V0KCkgfVxuICAgIHRoaXMucmVmID0gdGhpcy5jaGFubmVsLnNvY2tldC5tYWtlUmVmKClcbiAgICB0aGlzLnJlZkV2ZW50ID0gdGhpcy5jaGFubmVsLnJlcGx5RXZlbnROYW1lKHRoaXMucmVmKVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKHRoaXMucmVmRXZlbnQsIHBheWxvYWQgPT4ge1xuICAgICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgICB0aGlzLmNhbmNlbFRpbWVvdXQoKVxuICAgICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBwYXlsb2FkXG4gICAgICB0aGlzLm1hdGNoUmVjZWl2ZShwYXlsb2FkKVxuICAgIH0pXG5cbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmlnZ2VyKFwidGltZW91dFwiLCB7fSlcbiAgICB9LCB0aGlzLnRpbWVvdXQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhc1JlY2VpdmVkKHN0YXR1cyl7XG4gICAgcmV0dXJuIHRoaXMucmVjZWl2ZWRSZXNwICYmIHRoaXMucmVjZWl2ZWRSZXNwLnN0YXR1cyA9PT0gc3RhdHVzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXIoc3RhdHVzLCByZXNwb25zZSl7XG4gICAgdGhpcy5jaGFubmVsLnRyaWdnZXIodGhpcy5yZWZFdmVudCwge3N0YXR1cywgcmVzcG9uc2V9KVxuICB9XG59XG4iLCAiLyoqXG4gKlxuICogQ3JlYXRlcyBhIHRpbWVyIHRoYXQgYWNjZXB0cyBhIGB0aW1lckNhbGNgIGZ1bmN0aW9uIHRvIHBlcmZvcm1cbiAqIGNhbGN1bGF0ZWQgdGltZW91dCByZXRyaWVzLCBzdWNoIGFzIGV4cG9uZW50aWFsIGJhY2tvZmYuXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCByZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB0aGlzLmNvbm5lY3QoKSwgZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwMDAsIDUwMDAsIDEwMDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiB9KVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgNTAwMFxuICogcmVjb25uZWN0VGltZXIucmVzZXQoKVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0aW1lckNhbGNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgdGltZXJDYWxjKXtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICB0aGlzLnRpbWVyQ2FsYyA9IHRpbWVyQ2FsY1xuICAgIHRoaXMudGltZXIgPSBudWxsXG4gICAgdGhpcy50cmllcyA9IDBcbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgdGhpcy50cmllcyA9IDBcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIGFueSBwcmV2aW91cyBzY2hlZHVsZVRpbWVvdXQgYW5kIHNjaGVkdWxlcyBjYWxsYmFja1xuICAgKi9cbiAgc2NoZWR1bGVUaW1lb3V0KCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG5cbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRyaWVzID0gdGhpcy50cmllcyArIDFcbiAgICAgIHRoaXMuY2FsbGJhY2soKVxuICAgIH0sIHRoaXMudGltZXJDYWxjKHRoaXMudHJpZXMgKyAxKSlcbiAgfVxufVxuIiwgImltcG9ydCB7Y2xvc3VyZX0gZnJvbSBcIi4vdXRpbHNcIlxuaW1wb3J0IHtcbiAgQ0hBTk5FTF9FVkVOVFMsXG4gIENIQU5ORUxfU1RBVEVTLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgUHVzaCBmcm9tIFwiLi9wdXNoXCJcbmltcG9ydCBUaW1lciBmcm9tIFwiLi90aW1lclwiXG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKX0gcGFyYW1zXG4gKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5uZWwge1xuICBjb25zdHJ1Y3Rvcih0b3BpYywgcGFyYW1zLCBzb2NrZXQpe1xuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5jbG9zZWRcbiAgICB0aGlzLnRvcGljID0gdG9waWNcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zIHx8IHt9KVxuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdXG4gICAgdGhpcy5iaW5kaW5nUmVmID0gMFxuICAgIHRoaXMudGltZW91dCA9IHRoaXMuc29ja2V0LnRpbWVvdXRcbiAgICB0aGlzLmpvaW5lZE9uY2UgPSBmYWxzZVxuICAgIHRoaXMuam9pblB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5qb2luLCB0aGlzLnBhcmFtcywgdGhpcy50aW1lb3V0KVxuICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMgPSBbXVxuXG4gICAgdGhpcy5yZWpvaW5UaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW4oKSB9XG4gICAgfSwgdGhpcy5zb2NrZXQucmVqb2luQWZ0ZXJNcylcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uRXJyb3IoKCkgPT4gdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpKSlcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uT3BlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuaXNFcnJvcmVkKCkpeyB0aGlzLnJlam9pbigpIH1cbiAgICB9KVxuICAgIClcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmVkXG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5mb3JFYWNoKHB1c2hFdmVudCA9PiBwdXNoRXZlbnQuc2VuZCgpKVxuICAgICAgdGhpcy5wdXNoQnVmZmVyID0gW11cbiAgICB9KVxuICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZShcImVycm9yXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLm9uQ2xvc2UoKCkgPT4ge1xuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgY2xvc2UgJHt0aGlzLnRvcGljfSAke3RoaXMuam9pblJlZigpfWApXG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkXG4gICAgICB0aGlzLnNvY2tldC5yZW1vdmUodGhpcylcbiAgICB9KVxuICAgIHRoaXMub25FcnJvcihyZWFzb24gPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGVycm9yICR7dGhpcy50b3BpY31gLCByZWFzb24pXG4gICAgICBpZih0aGlzLmlzSm9pbmluZygpKXsgdGhpcy5qb2luUHVzaC5yZXNldCgpIH1cbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGB0aW1lb3V0ICR7dGhpcy50b3BpY30gKCR7dGhpcy5qb2luUmVmKCl9KWAsIHRoaXMuam9pblB1c2gudGltZW91dClcbiAgICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRoaXMudGltZW91dClcbiAgICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICB0aGlzLmpvaW5QdXNoLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpIH1cbiAgICB9KVxuICAgIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMucmVwbHksIChwYXlsb2FkLCByZWYpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLnJlcGx5RXZlbnROYW1lKHJlZiksIHBheWxvYWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBKb2luIHRoZSBjaGFubmVsXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGpvaW4odGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgaWYodGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRyaWVkIHRvIGpvaW4gbXVsdGlwbGUgdGltZXMuICdqb2luJyBjYW4gb25seSBiZSBjYWxsZWQgYSBzaW5nbGUgdGltZSBwZXIgY2hhbm5lbCBpbnN0YW5jZVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgICB0aGlzLmpvaW5lZE9uY2UgPSB0cnVlXG4gICAgICB0aGlzLnJlam9pbigpXG4gICAgICByZXR1cm4gdGhpcy5qb2luUHVzaFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIGludG8gY2hhbm5lbCBjbG9zZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25DbG9zZShjYWxsYmFjayl7XG4gICAgdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgY2FsbGJhY2spXG4gIH1cblxuICAvKipcbiAgICogSG9vayBpbnRvIGNoYW5uZWwgZXJyb3JzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkVycm9yKGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5lcnJvciwgcmVhc29uID0+IGNhbGxiYWNrKHJlYXNvbikpXG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyBvbiBjaGFubmVsIGV2ZW50c1xuICAgKlxuICAgKiBTdWJzY3JpcHRpb24gcmV0dXJucyBhIHJlZiBjb3VudGVyLCB3aGljaCBjYW4gYmUgdXNlZCBsYXRlciB0b1xuICAgKiB1bnN1YnNjcmliZSB0aGUgZXhhY3QgZXZlbnQgbGlzdGVuZXJcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY29uc3QgcmVmMiA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19vdGhlcl9zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKiAvLyBTaW5jZSB1bnN1YnNjcmlwdGlvbiwgZG9fc3R1ZmYgd29uJ3QgZmlyZSxcbiAgICogLy8gd2hpbGUgZG9fb3RoZXJfc3R1ZmYgd2lsbCBrZWVwIGZpcmluZyBvbiB0aGUgXCJldmVudFwiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gcmVmXG4gICAqL1xuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLmJpbmRpbmdSZWYrK1xuICAgIHRoaXMuYmluZGluZ3MucHVzaCh7ZXZlbnQsIHJlZiwgY2FsbGJhY2t9KVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgb2ZmIG9mIGNoYW5uZWwgZXZlbnRzXG4gICAqXG4gICAqIFVzZSB0aGUgcmVmIHJldHVybmVkIGZyb20gYSBjaGFubmVsLm9uKCkgdG8gdW5zdWJzY3JpYmUgb25lXG4gICAqIGhhbmRsZXIsIG9yIHBhc3Mgbm90aGluZyBmb3IgdGhlIHJlZiB0byB1bnN1YnNjcmliZSBhbGxcbiAgICogaGFuZGxlcnMgZm9yIHRoZSBnaXZlbiBldmVudC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gVW5zdWJzY3JpYmUgdGhlIGRvX3N0dWZmIGhhbmRsZXJcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKlxuICAgKiAvLyBVbnN1YnNjcmliZSBhbGwgaGFuZGxlcnMgZnJvbSBldmVudFxuICAgKiBjaGFubmVsLm9mZihcImV2ZW50XCIpXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJlZlxuICAgKi9cbiAgb2ZmKGV2ZW50LCByZWYpe1xuICAgIHRoaXMuYmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgcmV0dXJuICEoYmluZC5ldmVudCA9PT0gZXZlbnQgJiYgKHR5cGVvZiByZWYgPT09IFwidW5kZWZpbmVkXCIgfHwgcmVmID09PSBiaW5kLnJlZikpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuUHVzaCgpeyByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLmlzSm9pbmVkKCkgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgYGV2ZW50YCB0byBwaG9lbml4IHdpdGggdGhlIHBheWxvYWQgYHBheWxvYWRgLlxuICAgKiBQaG9lbml4IHJlY2VpdmVzIHRoaXMgaW4gdGhlIGBoYW5kbGVfaW4oZXZlbnQsIHBheWxvYWQsIHNvY2tldClgXG4gICAqIGZ1bmN0aW9uLiBpZiBwaG9lbml4IHJlcGxpZXMgb3IgaXQgdGltZXMgb3V0IChkZWZhdWx0IDEwMDAwbXMpLFxuICAgKiB0aGVuIG9wdGlvbmFsbHkgdGhlIHJlcGx5IGNhbiBiZSByZWNlaXZlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY2hhbm5lbC5wdXNoKFwiZXZlbnRcIilcbiAgICogICAucmVjZWl2ZShcIm9rXCIsIHBheWxvYWQgPT4gY29uc29sZS5sb2coXCJwaG9lbml4IHJlcGxpZWQ6XCIsIHBheWxvYWQpKVxuICAgKiAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgZXJyID0+IGNvbnNvbGUubG9nKFwicGhvZW5peCBlcnJvcmVkXCIsIGVycikpXG4gICAqICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IGNvbnNvbGUubG9nKFwidGltZWQgb3V0IHB1c2hpbmdcIikpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWVvdXRdXG4gICAqIEByZXR1cm5zIHtQdXNofVxuICAgKi9cbiAgcHVzaChldmVudCwgcGF5bG9hZCwgdGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgcGF5bG9hZCA9IHBheWxvYWQgfHwge31cbiAgICBpZighdGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdHJpZWQgdG8gcHVzaCAnJHtldmVudH0nIHRvICcke3RoaXMudG9waWN9JyBiZWZvcmUgam9pbmluZy4gVXNlIGNoYW5uZWwuam9pbigpIGJlZm9yZSBwdXNoaW5nIGV2ZW50c2ApXG4gICAgfVxuICAgIGxldCBwdXNoRXZlbnQgPSBuZXcgUHVzaCh0aGlzLCBldmVudCwgZnVuY3Rpb24gKCl7IHJldHVybiBwYXlsb2FkIH0sIHRpbWVvdXQpXG4gICAgaWYodGhpcy5jYW5QdXNoKCkpe1xuICAgICAgcHVzaEV2ZW50LnNlbmQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBwdXNoRXZlbnQuc3RhcnRUaW1lb3V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5wdXNoKHB1c2hFdmVudClcbiAgICB9XG5cbiAgICByZXR1cm4gcHVzaEV2ZW50XG4gIH1cblxuICAvKiogTGVhdmVzIHRoZSBjaGFubmVsXG4gICAqXG4gICAqIFVuc3Vic2NyaWJlcyBmcm9tIHNlcnZlciBldmVudHMsIGFuZFxuICAgKiBpbnN0cnVjdHMgY2hhbm5lbCB0byB0ZXJtaW5hdGUgb24gc2VydmVyXG4gICAqXG4gICAqIFRyaWdnZXJzIG9uQ2xvc2UoKSBob29rc1xuICAgKlxuICAgKiBUbyByZWNlaXZlIGxlYXZlIGFja25vd2xlZGdlbWVudHMsIHVzZSB0aGUgYHJlY2VpdmVgXG4gICAqIGhvb2sgdG8gYmluZCB0byB0aGUgc2VydmVyIGFjaywgaWU6XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNoYW5uZWwubGVhdmUoKS5yZWNlaXZlKFwib2tcIiwgKCkgPT4gYWxlcnQoXCJsZWZ0IVwiKSApXG4gICAqXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGxlYXZlKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgIHRoaXMuam9pblB1c2guY2FuY2VsVGltZW91dCgpXG5cbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMubGVhdmluZ1xuICAgIGxldCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGxlYXZlICR7dGhpcy50b3BpY31gKVxuICAgICAgdGhpcy50cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmNsb3NlLCBcImxlYXZlXCIpXG4gICAgfVxuICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRpbWVvdXQpXG4gICAgbGVhdmVQdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiBvbkNsb3NlKCkpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gb25DbG9zZSgpKVxuICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICBpZighdGhpcy5jYW5QdXNoKCkpeyBsZWF2ZVB1c2gudHJpZ2dlcihcIm9rXCIsIHt9KSB9XG5cbiAgICByZXR1cm4gbGVhdmVQdXNoXG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGFibGUgbWVzc2FnZSBob29rXG4gICAqXG4gICAqIFJlY2VpdmVzIGFsbCBldmVudHMgZm9yIHNwZWNpYWxpemVkIG1lc3NhZ2UgaGFuZGxpbmdcbiAgICogYmVmb3JlIGRpc3BhdGNoaW5nIHRvIHRoZSBjaGFubmVsIGNhbGxiYWNrcy5cbiAgICpcbiAgICogTXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gcmVmXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBvbk1lc3NhZ2UoX2V2ZW50LCBwYXlsb2FkLCBfcmVmKXsgcmV0dXJuIHBheWxvYWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmKXtcbiAgICBpZih0aGlzLnRvcGljICE9PSB0b3BpYyl7IHJldHVybiBmYWxzZSB9XG5cbiAgICBpZihqb2luUmVmICYmIGpvaW5SZWYgIT09IHRoaXMuam9pblJlZigpKXtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIFwiZHJvcHBpbmcgb3V0ZGF0ZWQgbWVzc2FnZVwiLCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmfSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgam9pblJlZigpeyByZXR1cm4gdGhpcy5qb2luUHVzaC5yZWYgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIGlmKHRoaXMuaXNMZWF2aW5nKCkpeyByZXR1cm4gfVxuICAgIHRoaXMuc29ja2V0LmxlYXZlT3BlblRvcGljKHRoaXMudG9waWMpXG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5pbmdcbiAgICB0aGlzLmpvaW5QdXNoLnJlc2VuZCh0aW1lb3V0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpe1xuICAgIGxldCBoYW5kbGVkUGF5bG9hZCA9IHRoaXMub25NZXNzYWdlKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpXG4gICAgaWYocGF5bG9hZCAmJiAhaGFuZGxlZFBheWxvYWQpeyB0aHJvdyBuZXcgRXJyb3IoXCJjaGFubmVsIG9uTWVzc2FnZSBjYWxsYmFja3MgbXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcIikgfVxuXG4gICAgbGV0IGV2ZW50QmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcihiaW5kID0+IGJpbmQuZXZlbnQgPT09IGV2ZW50KVxuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50QmluZGluZ3MubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IGJpbmQgPSBldmVudEJpbmRpbmdzW2ldXG4gICAgICBiaW5kLmNhbGxiYWNrKGhhbmRsZWRQYXlsb2FkLCByZWYsIGpvaW5SZWYgfHwgdGhpcy5qb2luUmVmKCkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZXBseUV2ZW50TmFtZShyZWYpeyByZXR1cm4gYGNoYW5fcmVwbHlfJHtyZWZ9YCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0Nsb3NlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzRXJyb3JlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0pvaW5lZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmVkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzSm9pbmluZygpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmluZyB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0xlYXZpbmcoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmxlYXZpbmcgfVxufVxuIiwgImltcG9ydCB7XG4gIGdsb2JhbCxcbiAgWEhSX1NUQVRFU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4IHtcblxuICBzdGF0aWMgcmVxdWVzdChtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIGlmKGdsb2JhbC5YRG9tYWluUmVxdWVzdCl7XG4gICAgICBsZXQgcmVxID0gbmV3IGdsb2JhbC5YRG9tYWluUmVxdWVzdCgpIC8vIElFOCwgSUU5XG4gICAgICByZXR1cm4gdGhpcy54ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXEgPSBuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KCkgLy8gSUU3KywgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpXG4gICAgICByZXR1cm4gdGhpcy54aHJSZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB4ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS50aW1lb3V0ID0gdGltZW91dFxuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQpXG4gICAgcmVxLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IHRoaXMucGFyc2VKU09OKHJlcS5yZXNwb25zZVRleHQpXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwb25zZSlcbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICAvLyBXb3JrIGFyb3VuZCBidWcgaW4gSUU5IHRoYXQgcmVxdWlyZXMgYW4gYXR0YWNoZWQgb25wcm9ncmVzcyBoYW5kbGVyXG4gICAgcmVxLm9ucHJvZ3Jlc3MgPSAoKSA9PiB7IH1cblxuICAgIHJlcS5zZW5kKGJvZHkpXG4gICAgcmV0dXJuIHJlcVxuICB9XG5cbiAgc3RhdGljIHhoclJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQsIHRydWUpXG4gICAgcmVxLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgYWNjZXB0KVxuICAgIHJlcS5vbmVycm9yID0gKCkgPT4gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbClcbiAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IFhIUl9TVEFURVMuY29tcGxldGUgJiYgY2FsbGJhY2spe1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnBhcnNlSlNPTihyZXEucmVzcG9uc2VUZXh0KVxuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICByZXEuc2VuZChib2R5KVxuICAgIHJldHVybiByZXFcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUpTT04ocmVzcCl7XG4gICAgaWYoIXJlc3AgfHwgcmVzcCA9PT0gXCJcIil7IHJldHVybiBudWxsIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwKVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgY29uc29sZSAmJiBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBwYXJzZSBKU09OIHJlc3BvbnNlXCIsIHJlc3ApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemUob2JqLCBwYXJlbnRLZXkpe1xuICAgIGxldCBxdWVyeVN0ciA9IFtdXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKXtcbiAgICAgIGlmKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKXsgY29udGludWUgfVxuICAgICAgbGV0IHBhcmFtS2V5ID0gcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYCA6IGtleVxuICAgICAgbGV0IHBhcmFtVmFsID0gb2JqW2tleV1cbiAgICAgIGlmKHR5cGVvZiBwYXJhbVZhbCA9PT0gXCJvYmplY3RcIil7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2godGhpcy5zZXJpYWxpemUocGFyYW1WYWwsIHBhcmFtS2V5KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtS2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtVmFsKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5U3RyLmpvaW4oXCImXCIpXG4gIH1cblxuICBzdGF0aWMgYXBwZW5kUGFyYW1zKHVybCwgcGFyYW1zKXtcbiAgICBpZihPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCl7IHJldHVybiB1cmwgfVxuXG4gICAgbGV0IHByZWZpeCA9IHVybC5tYXRjaCgvXFw/LykgPyBcIiZcIiA6IFwiP1wiXG4gICAgcmV0dXJuIGAke3VybH0ke3ByZWZpeH0ke3RoaXMuc2VyaWFsaXplKHBhcmFtcyl9YFxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgU09DS0VUX1NUQVRFUyxcbiAgVFJBTlNQT1JUU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgQWpheCBmcm9tIFwiLi9hamF4XCJcblxubGV0IGFycmF5QnVmZmVyVG9CYXNlNjQgPSAoYnVmZmVyKSA9PiB7XG4gIGxldCBiaW5hcnkgPSBcIlwiXG4gIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcilcbiAgbGV0IGxlbiA9IGJ5dGVzLmJ5dGVMZW5ndGhcbiAgZm9yKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKXsgYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pIH1cbiAgcmV0dXJuIGJ0b2EoYmluYXJ5KVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb25nUG9sbCB7XG5cbiAgY29uc3RydWN0b3IoZW5kUG9pbnQpe1xuICAgIHRoaXMuZW5kUG9pbnQgPSBudWxsXG4gICAgdGhpcy50b2tlbiA9IG51bGxcbiAgICB0aGlzLnNraXBIZWFydGJlYXQgPSB0cnVlXG4gICAgdGhpcy5yZXFzID0gbmV3IFNldCgpXG4gICAgdGhpcy5hd2FpdGluZ0JhdGNoQWNrID0gZmFsc2VcbiAgICB0aGlzLmN1cnJlbnRCYXRjaCA9IG51bGxcbiAgICB0aGlzLmN1cnJlbnRCYXRjaFRpbWVyID0gbnVsbFxuICAgIHRoaXMuYmF0Y2hCdWZmZXIgPSBbXVxuICAgIHRoaXMub25vcGVuID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25lcnJvciA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5wb2xsRW5kcG9pbnQgPSB0aGlzLm5vcm1hbGl6ZUVuZHBvaW50KGVuZFBvaW50KVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZ1xuICAgIC8vIHdlIG11c3Qgd2FpdCBmb3IgdGhlIGNhbGxlciB0byBmaW5pc2ggc2V0dGluZyB1cCBvdXIgY2FsbGJhY2tzIGFuZCB0aW1lb3V0IHByb3BlcnRpZXNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucG9sbCgpLCAwKVxuICB9XG5cbiAgbm9ybWFsaXplRW5kcG9pbnQoZW5kUG9pbnQpe1xuICAgIHJldHVybiAoZW5kUG9pbnRcbiAgICAgIC5yZXBsYWNlKFwid3M6Ly9cIiwgXCJodHRwOi8vXCIpXG4gICAgICAucmVwbGFjZShcIndzczovL1wiLCBcImh0dHBzOi8vXCIpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKFwiKC4qKVxcL1wiICsgVFJBTlNQT1JUUy53ZWJzb2NrZXQpLCBcIiQxL1wiICsgVFJBTlNQT1JUUy5sb25ncG9sbCkpXG4gIH1cblxuICBlbmRwb2ludFVSTCgpe1xuICAgIHJldHVybiBBamF4LmFwcGVuZFBhcmFtcyh0aGlzLnBvbGxFbmRwb2ludCwge3Rva2VuOiB0aGlzLnRva2VufSlcbiAgfVxuXG4gIGNsb3NlQW5kUmV0cnkoY29kZSwgcmVhc29uLCB3YXNDbGVhbil7XG4gICAgdGhpcy5jbG9zZShjb2RlLCByZWFzb24sIHdhc0NsZWFuKVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZ1xuICB9XG5cbiAgb250aW1lb3V0KCl7XG4gICAgdGhpcy5vbmVycm9yKFwidGltZW91dFwiKVxuICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDA1LCBcInRpbWVvdXRcIiwgZmFsc2UpXG4gIH1cblxuICBpc0FjdGl2ZSgpeyByZXR1cm4gdGhpcy5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLm9wZW4gfHwgdGhpcy5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLmNvbm5lY3RpbmcgfVxuXG4gIHBvbGwoKXtcbiAgICB0aGlzLmFqYXgoXCJHRVRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIsIG51bGwsICgpID0+IHRoaXMub250aW1lb3V0KCksIHJlc3AgPT4ge1xuICAgICAgaWYocmVzcCl7XG4gICAgICAgIHZhciB7c3RhdHVzLCB0b2tlbiwgbWVzc2FnZXN9ID0gcmVzcFxuICAgICAgICB0aGlzLnRva2VuID0gdG9rZW5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXR1cyA9IDBcbiAgICAgIH1cblxuICAgICAgc3dpdGNoKHN0YXR1cyl7XG4gICAgICAgIGNhc2UgMjAwOlxuICAgICAgICAgIG1lc3NhZ2VzLmZvckVhY2gobXNnID0+IHtcbiAgICAgICAgICAgIC8vIFRhc2tzIGFyZSB3aGF0IHRoaW5ncyBsaWtlIGV2ZW50IGhhbmRsZXJzLCBzZXRUaW1lb3V0IGNhbGxiYWNrcyxcbiAgICAgICAgICAgIC8vIHByb21pc2UgcmVzb2x2ZXMgYW5kIG1vcmUgYXJlIHJ1biB3aXRoaW4uXG4gICAgICAgICAgICAvLyBJbiBtb2Rlcm4gYnJvd3NlcnMsIHRoZXJlIGFyZSB0d28gZGlmZmVyZW50IGtpbmRzIG9mIHRhc2tzLFxuICAgICAgICAgICAgLy8gbWljcm90YXNrcyBhbmQgbWFjcm90YXNrcy5cbiAgICAgICAgICAgIC8vIE1pY3JvdGFza3MgYXJlIG1haW5seSB1c2VkIGZvciBQcm9taXNlcywgd2hpbGUgbWFjcm90YXNrcyBhcmVcbiAgICAgICAgICAgIC8vIHVzZWQgZm9yIGV2ZXJ5dGhpbmcgZWxzZS5cbiAgICAgICAgICAgIC8vIE1pY3JvdGFza3MgYWx3YXlzIGhhdmUgcHJpb3JpdHkgb3ZlciBtYWNyb3Rhc2tzLiBJZiB0aGUgSlMgZW5naW5lXG4gICAgICAgICAgICAvLyBpcyBsb29raW5nIGZvciBhIHRhc2sgdG8gcnVuLCBpdCB3aWxsIGFsd2F5cyB0cnkgdG8gZW1wdHkgdGhlXG4gICAgICAgICAgICAvLyBtaWNyb3Rhc2sgcXVldWUgYmVmb3JlIGF0dGVtcHRpbmcgdG8gcnVuIGFueXRoaW5nIGZyb20gdGhlXG4gICAgICAgICAgICAvLyBtYWNyb3Rhc2sgcXVldWUuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gRm9yIHRoZSBXZWJTb2NrZXQgdHJhbnNwb3J0LCBtZXNzYWdlcyBhbHdheXMgYXJyaXZlIGluIHRoZWlyIG93blxuICAgICAgICAgICAgLy8gZXZlbnQuIFRoaXMgbWVhbnMgdGhhdCBpZiBhbnkgcHJvbWlzZXMgYXJlIHJlc29sdmVkIGZyb20gd2l0aGluLFxuICAgICAgICAgICAgLy8gdGhlaXIgY2FsbGJhY2tzIHdpbGwgYWx3YXlzIGZpbmlzaCBleGVjdXRpb24gYnkgdGhlIHRpbWUgdGhlXG4gICAgICAgICAgICAvLyBuZXh0IG1lc3NhZ2UgZXZlbnQgaGFuZGxlciBpcyBydW4uXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gSW4gb3JkZXIgdG8gZW11bGF0ZSB0aGlzIGJlaGF2aW91ciwgd2UgbmVlZCB0byBtYWtlIHN1cmUgZWFjaFxuICAgICAgICAgICAgLy8gb25tZXNzYWdlIGhhbmRsZXIgaXMgcnVuIHdpdGhpbiBpdHMgb3duIG1hY3JvdGFzay5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5vbm1lc3NhZ2Uoe2RhdGE6IG1zZ30pLCAwKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5wb2xsKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDIwNDpcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDEwOlxuICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMub3BlblxuICAgICAgICAgIHRoaXMub25vcGVuKHt9KVxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgdGhpcy5vbmVycm9yKDQwMylcbiAgICAgICAgICB0aGlzLmNsb3NlKDEwMDgsIFwiZm9yYmlkZGVuXCIsIGZhbHNlKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgY2FzZSA1MDA6XG4gICAgICAgICAgdGhpcy5vbmVycm9yKDUwMClcbiAgICAgICAgICB0aGlzLmNsb3NlQW5kUmV0cnkoMTAxMSwgXCJpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiwgNTAwKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcihgdW5oYW5kbGVkIHBvbGwgc3RhdHVzICR7c3RhdHVzfWApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIHdlIGNvbGxlY3QgYWxsIHB1c2hlcyB3aXRoaW4gdGhlIGN1cnJlbnQgZXZlbnQgbG9vcCBieVxuICAvLyBzZXRUaW1lb3V0IDAsIHdoaWNoIG9wdGltaXplcyBiYWNrLXRvLWJhY2sgcHJvY2VkdXJhbFxuICAvLyBwdXNoZXMgYWdhaW5zdCBhbiBlbXB0eSBidWZmZXJcblxuICBzZW5kKGJvZHkpe1xuICAgIGlmKHR5cGVvZihib2R5KSAhPT0gXCJzdHJpbmdcIil7IGJvZHkgPSBhcnJheUJ1ZmZlclRvQmFzZTY0KGJvZHkpIH1cbiAgICBpZih0aGlzLmN1cnJlbnRCYXRjaCl7XG4gICAgICB0aGlzLmN1cnJlbnRCYXRjaC5wdXNoKGJvZHkpXG4gICAgfSBlbHNlIGlmKHRoaXMuYXdhaXRpbmdCYXRjaEFjayl7XG4gICAgICB0aGlzLmJhdGNoQnVmZmVyLnB1c2goYm9keSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50QmF0Y2ggPSBbYm9keV1cbiAgICAgIHRoaXMuY3VycmVudEJhdGNoVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5iYXRjaFNlbmQodGhpcy5jdXJyZW50QmF0Y2gpXG4gICAgICAgIHRoaXMuY3VycmVudEJhdGNoID0gbnVsbFxuICAgICAgfSwgMClcbiAgICB9XG4gIH1cblxuICBiYXRjaFNlbmQobWVzc2FnZXMpe1xuICAgIHRoaXMuYXdhaXRpbmdCYXRjaEFjayA9IHRydWVcbiAgICB0aGlzLmFqYXgoXCJQT1NUXCIsIFwiYXBwbGljYXRpb24veC1uZGpzb25cIiwgbWVzc2FnZXMuam9pbihcIlxcblwiKSwgKCkgPT4gdGhpcy5vbmVycm9yKFwidGltZW91dFwiKSwgcmVzcCA9PiB7XG4gICAgICB0aGlzLmF3YWl0aW5nQmF0Y2hBY2sgPSBmYWxzZVxuICAgICAgaWYoIXJlc3AgfHwgcmVzcC5zdGF0dXMgIT09IDIwMCl7XG4gICAgICAgIHRoaXMub25lcnJvcihyZXNwICYmIHJlc3Auc3RhdHVzKVxuICAgICAgICB0aGlzLmNsb3NlQW5kUmV0cnkoMTAxMSwgXCJpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiwgZmFsc2UpXG4gICAgICB9IGVsc2UgaWYodGhpcy5iYXRjaEJ1ZmZlci5sZW5ndGggPiAwKXtcbiAgICAgICAgdGhpcy5iYXRjaFNlbmQodGhpcy5iYXRjaEJ1ZmZlcilcbiAgICAgICAgdGhpcy5iYXRjaEJ1ZmZlciA9IFtdXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNsb3NlKGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4pe1xuICAgIGZvcihsZXQgcmVxIG9mIHRoaXMucmVxcyl7IHJlcS5hYm9ydCgpIH1cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNsb3NlZFxuICAgIGxldCBvcHRzID0gT2JqZWN0LmFzc2lnbih7Y29kZTogMTAwMCwgcmVhc29uOiB1bmRlZmluZWQsIHdhc0NsZWFuOiB0cnVlfSwge2NvZGUsIHJlYXNvbiwgd2FzQ2xlYW59KVxuICAgIHRoaXMuYmF0Y2hCdWZmZXIgPSBbXVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmN1cnJlbnRCYXRjaFRpbWVyKVxuICAgIHRoaXMuY3VycmVudEJhdGNoVGltZXIgPSBudWxsXG4gICAgaWYodHlwZW9mKENsb3NlRXZlbnQpICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgIHRoaXMub25jbG9zZShuZXcgQ2xvc2VFdmVudChcImNsb3NlXCIsIG9wdHMpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uY2xvc2Uob3B0cylcbiAgICB9XG4gIH1cblxuICBhamF4KG1ldGhvZCwgY29udGVudFR5cGUsIGJvZHksIG9uQ2FsbGVyVGltZW91dCwgY2FsbGJhY2spe1xuICAgIGxldCByZXFcbiAgICBsZXQgb250aW1lb3V0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZXFzLmRlbGV0ZShyZXEpXG4gICAgICBvbkNhbGxlclRpbWVvdXQoKVxuICAgIH1cbiAgICByZXEgPSBBamF4LnJlcXVlc3QobWV0aG9kLCB0aGlzLmVuZHBvaW50VVJMKCksIGNvbnRlbnRUeXBlLCBib2R5LCB0aGlzLnRpbWVvdXQsIG9udGltZW91dCwgcmVzcCA9PiB7XG4gICAgICB0aGlzLnJlcXMuZGVsZXRlKHJlcSlcbiAgICAgIGlmKHRoaXMuaXNBY3RpdmUoKSl7IGNhbGxiYWNrKHJlc3ApIH1cbiAgICB9KVxuICAgIHRoaXMucmVxcy5hZGQocmVxKVxuICB9XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHJlc2VuY2VcbiAqIEBwYXJhbSB7Q2hhbm5lbH0gY2hhbm5lbCAtIFRoZSBDaGFubmVsXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIFRoZSBvcHRpb25zLFxuICogICAgICAgIGZvciBleGFtcGxlIGB7ZXZlbnRzOiB7c3RhdGU6IFwic3RhdGVcIiwgZGlmZjogXCJkaWZmXCJ9fWBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc2VuY2Uge1xuXG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIG9wdHMgPSB7fSl7XG4gICAgbGV0IGV2ZW50cyA9IG9wdHMuZXZlbnRzIHx8IHtzdGF0ZTogXCJwcmVzZW5jZV9zdGF0ZVwiLCBkaWZmOiBcInByZXNlbmNlX2RpZmZcIn1cbiAgICB0aGlzLnN0YXRlID0ge31cbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbFxuICAgIHRoaXMuam9pblJlZiA9IG51bGxcbiAgICB0aGlzLmNhbGxlciA9IHtcbiAgICAgIG9uSm9pbjogZnVuY3Rpb24gKCl7IH0sXG4gICAgICBvbkxlYXZlOiBmdW5jdGlvbiAoKXsgfSxcbiAgICAgIG9uU3luYzogZnVuY3Rpb24gKCl7IH1cbiAgICB9XG5cbiAgICB0aGlzLmNoYW5uZWwub24oZXZlbnRzLnN0YXRlLCBuZXdTdGF0ZSA9PiB7XG4gICAgICBsZXQge29uSm9pbiwgb25MZWF2ZSwgb25TeW5jfSA9IHRoaXMuY2FsbGVyXG5cbiAgICAgIHRoaXMuam9pblJlZiA9IHRoaXMuY2hhbm5lbC5qb2luUmVmKClcbiAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jU3RhdGUodGhpcy5zdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSlcblxuICAgICAgdGhpcy5wZW5kaW5nRGlmZnMuZm9yRWFjaChkaWZmID0+IHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSlcbiAgICAgIH0pXG4gICAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgICBvblN5bmMoKVxuICAgIH0pXG5cbiAgICB0aGlzLmNoYW5uZWwub24oZXZlbnRzLmRpZmYsIGRpZmYgPT4ge1xuICAgICAgbGV0IHtvbkpvaW4sIG9uTGVhdmUsIG9uU3luY30gPSB0aGlzLmNhbGxlclxuXG4gICAgICBpZih0aGlzLmluUGVuZGluZ1N5bmNTdGF0ZSgpKXtcbiAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMucHVzaChkaWZmKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSlcbiAgICAgICAgb25TeW5jKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25Kb2luKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25Kb2luID0gY2FsbGJhY2sgfVxuXG4gIG9uTGVhdmUoY2FsbGJhY2speyB0aGlzLmNhbGxlci5vbkxlYXZlID0gY2FsbGJhY2sgfVxuXG4gIG9uU3luYyhjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uU3luYyA9IGNhbGxiYWNrIH1cblxuICBsaXN0KGJ5KXsgcmV0dXJuIFByZXNlbmNlLmxpc3QodGhpcy5zdGF0ZSwgYnkpIH1cblxuICBpblBlbmRpbmdTeW5jU3RhdGUoKXtcbiAgICByZXR1cm4gIXRoaXMuam9pblJlZiB8fCAodGhpcy5qb2luUmVmICE9PSB0aGlzLmNoYW5uZWwuam9pblJlZigpKVxuICB9XG5cbiAgLy8gbG93ZXItbGV2ZWwgcHVibGljIHN0YXRpYyBBUElcblxuICAvKipcbiAgICogVXNlZCB0byBzeW5jIHRoZSBsaXN0IG9mIHByZXNlbmNlcyBvbiB0aGUgc2VydmVyXG4gICAqIHdpdGggdGhlIGNsaWVudCdzIHN0YXRlLiBBbiBvcHRpb25hbCBgb25Kb2luYCBhbmQgYG9uTGVhdmVgIGNhbGxiYWNrIGNhblxuICAgKiBiZSBwcm92aWRlZCB0byByZWFjdCB0byBjaGFuZ2VzIGluIHRoZSBjbGllbnQncyBsb2NhbCBwcmVzZW5jZXMgYWNyb3NzXG4gICAqIGRpc2Nvbm5lY3RzIGFuZCByZWNvbm5lY3RzIHdpdGggdGhlIHNlcnZlci5cbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIHN5bmNTdGF0ZShjdXJyZW50U3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpe1xuICAgIGxldCBzdGF0ZSA9IHRoaXMuY2xvbmUoY3VycmVudFN0YXRlKVxuICAgIGxldCBqb2lucyA9IHt9XG4gICAgbGV0IGxlYXZlcyA9IHt9XG5cbiAgICB0aGlzLm1hcChzdGF0ZSwgKGtleSwgcHJlc2VuY2UpID0+IHtcbiAgICAgIGlmKCFuZXdTdGF0ZVtrZXldKXtcbiAgICAgICAgbGVhdmVzW2tleV0gPSBwcmVzZW5jZVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5tYXAobmV3U3RhdGUsIChrZXksIG5ld1ByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlKXtcbiAgICAgICAgbGV0IG5ld1JlZnMgPSBuZXdQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBjdXJSZWZzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGpvaW5lZE1ldGFzID0gbmV3UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gY3VyUmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBsZXQgbGVmdE1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IG5ld1JlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgaWYoam9pbmVkTWV0YXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlXG4gICAgICAgICAgam9pbnNba2V5XS5tZXRhcyA9IGpvaW5lZE1ldGFzXG4gICAgICAgIH1cbiAgICAgICAgaWYobGVmdE1ldGFzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIGxlYXZlc1trZXldID0gdGhpcy5jbG9uZShjdXJyZW50UHJlc2VuY2UpXG4gICAgICAgICAgbGVhdmVzW2tleV0ubWV0YXMgPSBsZWZ0TWV0YXNcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5zeW5jRGlmZihzdGF0ZSwge2pvaW5zOiBqb2lucywgbGVhdmVzOiBsZWF2ZXN9LCBvbkpvaW4sIG9uTGVhdmUpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogVXNlZCB0byBzeW5jIGEgZGlmZiBvZiBwcmVzZW5jZSBqb2luIGFuZCBsZWF2ZVxuICAgKiBldmVudHMgZnJvbSB0aGUgc2VydmVyLCBhcyB0aGV5IGhhcHBlbi4gTGlrZSBgc3luY1N0YXRlYCwgYHN5bmNEaWZmYFxuICAgKiBhY2NlcHRzIG9wdGlvbmFsIGBvbkpvaW5gIGFuZCBgb25MZWF2ZWAgY2FsbGJhY2tzIHRvIHJlYWN0IHRvIGEgdXNlclxuICAgKiBqb2luaW5nIG9yIGxlYXZpbmcgZnJvbSBhIGRldmljZS5cbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIHN5bmNEaWZmKHN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpe1xuICAgIGxldCB7am9pbnMsIGxlYXZlc30gPSB0aGlzLmNsb25lKGRpZmYpXG4gICAgaWYoIW9uSm9pbil7IG9uSm9pbiA9IGZ1bmN0aW9uICgpeyB9IH1cbiAgICBpZighb25MZWF2ZSl7IG9uTGVhdmUgPSBmdW5jdGlvbiAoKXsgfSB9XG5cbiAgICB0aGlzLm1hcChqb2lucywgKGtleSwgbmV3UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBzdGF0ZVtrZXldID0gdGhpcy5jbG9uZShuZXdQcmVzZW5jZSlcbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZSl7XG4gICAgICAgIGxldCBqb2luZWRSZWZzID0gc3RhdGVba2V5XS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBjdXJNZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBqb2luZWRSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIHN0YXRlW2tleV0ubWV0YXMudW5zaGlmdCguLi5jdXJNZXRhcylcbiAgICAgIH1cbiAgICAgIG9uSm9pbihrZXksIGN1cnJlbnRQcmVzZW5jZSwgbmV3UHJlc2VuY2UpXG4gICAgfSlcbiAgICB0aGlzLm1hcChsZWF2ZXMsIChrZXksIGxlZnRQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIGlmKCFjdXJyZW50UHJlc2VuY2UpeyByZXR1cm4gfVxuICAgICAgbGV0IHJlZnNUb1JlbW92ZSA9IGxlZnRQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICBjdXJyZW50UHJlc2VuY2UubWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKHAgPT4ge1xuICAgICAgICByZXR1cm4gcmVmc1RvUmVtb3ZlLmluZGV4T2YocC5waHhfcmVmKSA8IDBcbiAgICAgIH0pXG4gICAgICBvbkxlYXZlKGtleSwgY3VycmVudFByZXNlbmNlLCBsZWZ0UHJlc2VuY2UpXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2UubWV0YXMubGVuZ3RoID09PSAwKXtcbiAgICAgICAgZGVsZXRlIHN0YXRlW2tleV1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFycmF5IG9mIHByZXNlbmNlcywgd2l0aCBzZWxlY3RlZCBtZXRhZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByZXNlbmNlc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaG9vc2VyXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBsaXN0KHByZXNlbmNlcywgY2hvb3Nlcil7XG4gICAgaWYoIWNob29zZXIpeyBjaG9vc2VyID0gZnVuY3Rpb24gKGtleSwgcHJlcyl7IHJldHVybiBwcmVzIH0gfVxuXG4gICAgcmV0dXJuIHRoaXMubWFwKHByZXNlbmNlcywgKGtleSwgcHJlc2VuY2UpID0+IHtcbiAgICAgIHJldHVybiBjaG9vc2VyKGtleSwgcHJlc2VuY2UpXG4gICAgfSlcbiAgfVxuXG4gIC8vIHByaXZhdGVcblxuICBzdGF0aWMgbWFwKG9iaiwgZnVuYyl7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubWFwKGtleSA9PiBmdW5jKGtleSwgb2JqW2tleV0pKVxuICB9XG5cbiAgc3RhdGljIGNsb25lKG9iail7IHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpIH1cbn1cbiIsICIvKiBUaGUgZGVmYXVsdCBzZXJpYWxpemVyIGZvciBlbmNvZGluZyBhbmQgZGVjb2RpbmcgbWVzc2FnZXMgKi9cbmltcG9ydCB7XG4gIENIQU5ORUxfRVZFTlRTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgSEVBREVSX0xFTkdUSDogMSxcbiAgTUVUQV9MRU5HVEg6IDQsXG4gIEtJTkRTOiB7cHVzaDogMCwgcmVwbHk6IDEsIGJyb2FkY2FzdDogMn0sXG5cbiAgZW5jb2RlKG1zZywgY2FsbGJhY2spe1xuICAgIGlmKG1zZy5wYXlsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5iaW5hcnlFbmNvZGUobXNnKSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBheWxvYWQgPSBbbXNnLmpvaW5fcmVmLCBtc2cucmVmLCBtc2cudG9waWMsIG1zZy5ldmVudCwgbXNnLnBheWxvYWRdXG4gICAgICByZXR1cm4gY2FsbGJhY2soSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpXG4gICAgfVxuICB9LFxuXG4gIGRlY29kZShyYXdQYXlsb2FkLCBjYWxsYmFjayl7XG4gICAgaWYocmF3UGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuYmluYXJ5RGVjb2RlKHJhd1BheWxvYWQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgW2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZF0gPSBKU09OLnBhcnNlKHJhd1BheWxvYWQpXG4gICAgICByZXR1cm4gY2FsbGJhY2soe2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZH0pXG4gICAgfVxuICB9LFxuXG4gIC8vIHByaXZhdGVcblxuICBiaW5hcnlFbmNvZGUobWVzc2FnZSl7XG4gICAgbGV0IHtqb2luX3JlZiwgcmVmLCBldmVudCwgdG9waWMsIHBheWxvYWR9ID0gbWVzc2FnZVxuICAgIGxldCBtZXRhTGVuZ3RoID0gdGhpcy5NRVRBX0xFTkdUSCArIGpvaW5fcmVmLmxlbmd0aCArIHJlZi5sZW5ndGggKyB0b3BpYy5sZW5ndGggKyBldmVudC5sZW5ndGhcbiAgICBsZXQgaGVhZGVyID0gbmV3IEFycmF5QnVmZmVyKHRoaXMuSEVBREVSX0xFTkdUSCArIG1ldGFMZW5ndGgpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoaGVhZGVyKVxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0aGlzLktJTkRTLnB1c2gpIC8vIGtpbmRcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBqb2luX3JlZi5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgcmVmLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0b3BpYy5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgZXZlbnQubGVuZ3RoKVxuICAgIEFycmF5LmZyb20oam9pbl9yZWYsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKHJlZiwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20odG9waWMsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKGV2ZW50LCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG5cbiAgICB2YXIgY29tYmluZWQgPSBuZXcgVWludDhBcnJheShoZWFkZXIuYnl0ZUxlbmd0aCArIHBheWxvYWQuYnl0ZUxlbmd0aClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkoaGVhZGVyKSwgMClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkocGF5bG9hZCksIGhlYWRlci5ieXRlTGVuZ3RoKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVkLmJ1ZmZlclxuICB9LFxuXG4gIGJpbmFyeURlY29kZShidWZmZXIpe1xuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcilcbiAgICBsZXQga2luZCA9IHZpZXcuZ2V0VWludDgoMClcbiAgICBsZXQgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpXG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSB0aGlzLktJTkRTLnB1c2g6IHJldHVybiB0aGlzLmRlY29kZVB1c2goYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgICAgY2FzZSB0aGlzLktJTkRTLnJlcGx5OiByZXR1cm4gdGhpcy5kZWNvZGVSZXBseShidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgICBjYXNlIHRoaXMuS0lORFMuYnJvYWRjYXN0OiByZXR1cm4gdGhpcy5kZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgIH1cbiAgfSxcblxuICBkZWNvZGVQdXNoKGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoMylcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSCAtIDEgLy8gcHVzaGVzIGhhdmUgbm8gcmVmXG4gICAgbGV0IGpvaW5SZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBqb2luUmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgam9pblJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9LFxuXG4gIGRlY29kZVJlcGx5KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCByZWZTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDMpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoNClcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSFxuICAgIGxldCBqb2luUmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgam9pblJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGpvaW5SZWZTaXplXG4gICAgbGV0IHJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICBsZXQgcGF5bG9hZCA9IHtzdGF0dXM6IGV2ZW50LCByZXNwb25zZTogZGF0YX1cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IHJlZiwgdG9waWM6IHRvcGljLCBldmVudDogQ0hBTk5FTF9FVkVOVFMucmVwbHksIHBheWxvYWQ6IHBheWxvYWR9XG4gIH0sXG5cbiAgZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyAyXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG5cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBudWxsLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgZ2xvYmFsLFxuICBwaHhXaW5kb3csXG4gIENIQU5ORUxfRVZFTlRTLFxuICBERUZBVUxUX1RJTUVPVVQsXG4gIERFRkFVTFRfVlNOLFxuICBTT0NLRVRfU1RBVEVTLFxuICBUUkFOU1BPUlRTLFxuICBXU19DTE9TRV9OT1JNQUxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvc3VyZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBBamF4IGZyb20gXCIuL2FqYXhcIlxuaW1wb3J0IENoYW5uZWwgZnJvbSBcIi4vY2hhbm5lbFwiXG5pbXBvcnQgTG9uZ1BvbGwgZnJvbSBcIi4vbG9uZ3BvbGxcIlxuaW1wb3J0IFNlcmlhbGl6ZXIgZnJvbSBcIi4vc2VyaWFsaXplclwiXG5pbXBvcnQgVGltZXIgZnJvbSBcIi4vdGltZXJcIlxuXG4vKiogSW5pdGlhbGl6ZXMgdGhlIFNvY2tldCAqXG4gKlxuICogRm9yIElFOCBzdXBwb3J0IHVzZSBhbiBFUzUtc2hpbSAoaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbmRQb2ludCAtIFRoZSBzdHJpbmcgV2ViU29ja2V0IGVuZHBvaW50LCBpZSwgYFwid3M6Ly9leGFtcGxlLmNvbS9zb2NrZXRcImAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwid3NzOi8vZXhhbXBsZS5jb21cImBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXCIvc29ja2V0XCJgIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnRyYW5zcG9ydF0gLSBUaGUgV2Vic29ja2V0IFRyYW5zcG9ydCwgZm9yIGV4YW1wbGUgV2ViU29ja2V0IG9yIFBob2VuaXguTG9uZ1BvbGwuXG4gKlxuICogRGVmYXVsdHMgdG8gV2ViU29ja2V0IHdpdGggYXV0b21hdGljIExvbmdQb2xsIGZhbGxiYWNrIGlmIFdlYlNvY2tldCBpcyBub3QgZGVmaW5lZC5cbiAqIFRvIGZhbGxiYWNrIHRvIExvbmdQb2xsIHdoZW4gV2ViU29ja2V0IGF0dGVtcHRzIGZhaWwsIHVzZSBgbG9uZ1BvbGxGYWxsYmFja01zOiAyNTAwYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5sb25nUG9sbEZhbGxiYWNrTXNdIC0gVGhlIG1pbGxpc2Vjb25kIHRpbWUgdG8gYXR0ZW1wdCB0aGUgcHJpbWFyeSB0cmFuc3BvcnRcbiAqIGJlZm9yZSBmYWxsaW5nIGJhY2sgdG8gdGhlIExvbmdQb2xsIHRyYW5zcG9ydC4gRGlzYWJsZWQgYnkgZGVmYXVsdC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5kZWJ1Z10gLSBXaGVuIHRydWUsIGVuYWJsZXMgZGVidWcgbG9nZ2luZy4gRGVmYXVsdCBmYWxzZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5lbmNvZGVdIC0gVGhlIGZ1bmN0aW9uIHRvIGVuY29kZSBvdXRnb2luZyBtZXNzYWdlcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBKU09OIGVuY29kZXIuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMuZGVjb2RlXSAtIFRoZSBmdW5jdGlvbiB0byBkZWNvZGUgaW5jb21pbmcgbWVzc2FnZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gSlNPTjpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiAocGF5bG9hZCwgY2FsbGJhY2spID0+IGNhbGxiYWNrKEpTT04ucGFyc2UocGF5bG9hZCkpXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMudGltZW91dF0gLSBUaGUgZGVmYXVsdCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byB0cmlnZ2VyIHB1c2ggdGltZW91dHMuXG4gKlxuICogRGVmYXVsdHMgYERFRkFVTFRfVElNRU9VVGBcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5oZWFydGJlYXRJbnRlcnZhbE1zXSAtIFRoZSBtaWxsaXNlYyBpbnRlcnZhbCB0byBzZW5kIGEgaGVhcnRiZWF0IG1lc3NhZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5yZWNvbm5lY3RBZnRlck1zXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG1pbGxpc2VjXG4gKiBzb2NrZXQgcmVjb25uZWN0IGludGVydmFsLlxuICpcbiAqIERlZmF1bHRzIHRvIHN0ZXBwZWQgYmFja29mZiBvZjpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAsIDUwLCAxMDAsIDE1MCwgMjAwLCAyNTAsIDUwMCwgMTAwMCwgMjAwMF1bdHJpZXMgLSAxXSB8fCA1MDAwXG4gKiB9XG4gKiBgYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnJlam9pbkFmdGVyTXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWlsbGlzZWNcbiAqIHJlam9pbiBpbnRlcnZhbCBmb3IgaW5kaXZpZHVhbCBjaGFubmVscy5cbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICogfVxuICogYGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmxvZ2dlcl0gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gZm9yIHNwZWNpYWxpemVkIGxvZ2dpbmcsIGllOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKGtpbmQsIG1zZywgZGF0YSkge1xuICogICBjb25zb2xlLmxvZyhgJHtraW5kfTogJHttc2d9YCwgZGF0YSlcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5sb25ncG9sbGVyVGltZW91dF0gLSBUaGUgbWF4aW11bSB0aW1lb3V0IG9mIGEgbG9uZyBwb2xsIEFKQVggcmVxdWVzdC5cbiAqXG4gKiBEZWZhdWx0cyB0byAyMHMgKGRvdWJsZSB0aGUgc2VydmVyIGxvbmcgcG9sbCB0aW1lcikuXG4gKlxuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKX0gW29wdHMucGFyYW1zXSAtIFRoZSBvcHRpb25hbCBwYXJhbXMgdG8gcGFzcyB3aGVuIGNvbm5lY3RpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5iaW5hcnlUeXBlXSAtIFRoZSBiaW5hcnkgdHlwZSB0byB1c2UgZm9yIGJpbmFyeSBXZWJTb2NrZXQgZnJhbWVzLlxuICpcbiAqIERlZmF1bHRzIHRvIFwiYXJyYXlidWZmZXJcIlxuICpcbiAqIEBwYXJhbSB7dnNufSBbb3B0cy52c25dIC0gVGhlIHNlcmlhbGl6ZXIncyBwcm90b2NvbCB2ZXJzaW9uIHRvIHNlbmQgb24gY29ubmVjdC5cbiAqXG4gKiBEZWZhdWx0cyB0byBERUZBVUxUX1ZTTi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuc2Vzc2lvblN0b3JhZ2VdIC0gQW4gb3B0aW9uYWwgU3RvcmFnZSBjb21wYXRpYmxlIG9iamVjdFxuICogUGhvZW5peCB1c2VzIHNlc3Npb25TdG9yYWdlIGZvciBsb25ncG9sbCBmYWxsYmFjayBoaXN0b3J5LiBPdmVycmlkaW5nIHRoZSBzdG9yZSBpc1xuICogdXNlZnVsIHdoZW4gUGhvZW5peCB3b24ndCBoYXZlIGFjY2VzcyB0byBgc2Vzc2lvblN0b3JhZ2VgLiBGb3IgZXhhbXBsZSwgVGhpcyBjb3VsZFxuICogaGFwcGVuIGlmIGEgc2l0ZSBsb2FkcyBhIGNyb3NzLWRvbWFpbiBjaGFubmVsIGluIGFuIGlmcmFtZS4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiAgICAgY2xhc3MgSW5NZW1vcnlTdG9yYWdlIHtcbiAqICAgICAgIGNvbnN0cnVjdG9yKCkgeyB0aGlzLnN0b3JhZ2UgPSB7fSB9XG4gKiAgICAgICBnZXRJdGVtKGtleU5hbWUpIHsgcmV0dXJuIHRoaXMuc3RvcmFnZVtrZXlOYW1lXSB8fCBudWxsIH1cbiAqICAgICAgIHJlbW92ZUl0ZW0oa2V5TmFtZSkgeyBkZWxldGUgdGhpcy5zdG9yYWdlW2tleU5hbWVdIH1cbiAqICAgICAgIHNldEl0ZW0oa2V5TmFtZSwga2V5VmFsdWUpIHsgdGhpcy5zdG9yYWdlW2tleU5hbWVdID0ga2V5VmFsdWUgfVxuICogICAgIH1cbiAqXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0IHtcbiAgY29uc3RydWN0b3IoZW5kUG9pbnQsIG9wdHMgPSB7fSl7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyA9IHtvcGVuOiBbXSwgY2xvc2U6IFtdLCBlcnJvcjogW10sIG1lc3NhZ2U6IFtdfVxuICAgIHRoaXMuY2hhbm5lbHMgPSBbXVxuICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5yZWYgPSAwXG4gICAgdGhpcy50aW1lb3V0ID0gb3B0cy50aW1lb3V0IHx8IERFRkFVTFRfVElNRU9VVFxuICAgIHRoaXMudHJhbnNwb3J0ID0gb3B0cy50cmFuc3BvcnQgfHwgZ2xvYmFsLldlYlNvY2tldCB8fCBMb25nUG9sbFxuICAgIHRoaXMucHJpbWFyeVBhc3NlZEhlYWx0aENoZWNrID0gZmFsc2VcbiAgICB0aGlzLmxvbmdQb2xsRmFsbGJhY2tNcyA9IG9wdHMubG9uZ1BvbGxGYWxsYmFja01zXG4gICAgdGhpcy5mYWxsYmFja1RpbWVyID0gbnVsbFxuICAgIHRoaXMuc2Vzc2lvblN0b3JlID0gb3B0cy5zZXNzaW9uU3RvcmFnZSB8fCAoZ2xvYmFsICYmIGdsb2JhbC5zZXNzaW9uU3RvcmFnZSlcbiAgICB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnMgPSAwXG4gICAgdGhpcy5kZWZhdWx0RW5jb2RlciA9IFNlcmlhbGl6ZXIuZW5jb2RlLmJpbmQoU2VyaWFsaXplcilcbiAgICB0aGlzLmRlZmF1bHREZWNvZGVyID0gU2VyaWFsaXplci5kZWNvZGUuYmluZChTZXJpYWxpemVyKVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5kaXNjb25uZWN0aW5nID0gZmFsc2VcbiAgICB0aGlzLmJpbmFyeVR5cGUgPSBvcHRzLmJpbmFyeVR5cGUgfHwgXCJhcnJheWJ1ZmZlclwiXG4gICAgdGhpcy5jb25uZWN0Q2xvY2sgPSAxXG4gICAgaWYodGhpcy50cmFuc3BvcnQgIT09IExvbmdQb2xsKXtcbiAgICAgIHRoaXMuZW5jb2RlID0gb3B0cy5lbmNvZGUgfHwgdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSBvcHRzLmRlY29kZSB8fCB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5jb2RlID0gdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfVxuICAgIGxldCBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgIGlmKHBoeFdpbmRvdyAmJiBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcil7XG4gICAgICBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIF9lID0+IHtcbiAgICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgICAgICAgIGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPSB0aGlzLmNvbm5lY3RDbG9ja1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBfZSA9PiB7XG4gICAgICAgIGlmKGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPT09IHRoaXMuY29ubmVjdENsb2NrKXtcbiAgICAgICAgICBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgICAgICAgIHRoaXMuY29ubmVjdCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyA9IG9wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNcyB8fCAzMDAwMFxuICAgIHRoaXMucmVqb2luQWZ0ZXJNcyA9ICh0cmllcykgPT4ge1xuICAgICAgaWYob3B0cy5yZWpvaW5BZnRlck1zKXtcbiAgICAgICAgcmV0dXJuIG9wdHMucmVqb2luQWZ0ZXJNcyh0cmllcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlY29ubmVjdEFmdGVyTXMgPSAodHJpZXMpID0+IHtcbiAgICAgIGlmKG9wdHMucmVjb25uZWN0QWZ0ZXJNcyl7XG4gICAgICAgIHJldHVybiBvcHRzLnJlY29ubmVjdEFmdGVyTXModHJpZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxvZ2dlciA9IG9wdHMubG9nZ2VyIHx8IG51bGxcbiAgICBpZighdGhpcy5sb2dnZXIgJiYgb3B0cy5kZWJ1Zyl7XG4gICAgICB0aGlzLmxvZ2dlciA9IChraW5kLCBtc2csIGRhdGEpID0+IHsgY29uc29sZS5sb2coYCR7a2luZH06ICR7bXNnfWAsIGRhdGEpIH1cbiAgICB9XG4gICAgdGhpcy5sb25ncG9sbGVyVGltZW91dCA9IG9wdHMubG9uZ3BvbGxlclRpbWVvdXQgfHwgMjAwMDBcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUob3B0cy5wYXJhbXMgfHwge30pXG4gICAgdGhpcy5lbmRQb2ludCA9IGAke2VuZFBvaW50fS8ke1RSQU5TUE9SVFMud2Vic29ja2V0fWBcbiAgICB0aGlzLnZzbiA9IG9wdHMudnNuIHx8IERFRkFVTFRfVlNOXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIgPSBudWxsXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IG51bGxcbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICB0aGlzLnRlYXJkb3duKCgpID0+IHRoaXMuY29ubmVjdCgpKVxuICAgIH0sIHRoaXMucmVjb25uZWN0QWZ0ZXJNcylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBMb25nUG9sbCB0cmFuc3BvcnQgcmVmZXJlbmNlXG4gICAqL1xuICBnZXRMb25nUG9sbFRyYW5zcG9ydCgpeyByZXR1cm4gTG9uZ1BvbGwgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyBhbmQgcmVwbGFjZXMgdGhlIGFjdGl2ZSB0cmFuc3BvcnRcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV3VHJhbnNwb3J0IC0gVGhlIG5ldyB0cmFuc3BvcnQgY2xhc3MgdG8gaW5zdGFudGlhdGVcbiAgICpcbiAgICovXG4gIHJlcGxhY2VUcmFuc3BvcnQobmV3VHJhbnNwb3J0KXtcbiAgICB0aGlzLmNvbm5lY3RDbG9jaysrXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gdHJ1ZVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZhbGxiYWNrVGltZXIpXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgaWYodGhpcy5jb25uKXtcbiAgICAgIHRoaXMuY29ubi5jbG9zZSgpXG4gICAgICB0aGlzLmNvbm4gPSBudWxsXG4gICAgfVxuICAgIHRoaXMudHJhbnNwb3J0ID0gbmV3VHJhbnNwb3J0XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc29ja2V0IHByb3RvY29sXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBwcm90b2NvbCgpeyByZXR1cm4gbG9jYXRpb24ucHJvdG9jb2wubWF0Y2goL15odHRwcy8pID8gXCJ3c3NcIiA6IFwid3NcIiB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdWxseSBxdWFsaWZpZWQgc29ja2V0IHVybFxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZW5kUG9pbnRVUkwoKXtcbiAgICBsZXQgdXJpID0gQWpheC5hcHBlbmRQYXJhbXMoXG4gICAgICBBamF4LmFwcGVuZFBhcmFtcyh0aGlzLmVuZFBvaW50LCB0aGlzLnBhcmFtcygpKSwge3ZzbjogdGhpcy52c259KVxuICAgIGlmKHVyaS5jaGFyQXQoMCkgIT09IFwiL1wiKXsgcmV0dXJuIHVyaSB9XG4gICAgaWYodXJpLmNoYXJBdCgxKSA9PT0gXCIvXCIpeyByZXR1cm4gYCR7dGhpcy5wcm90b2NvbCgpfToke3VyaX1gIH1cblxuICAgIHJldHVybiBgJHt0aGlzLnByb3RvY29sKCl9Oi8vJHtsb2NhdGlvbi5ob3N0fSR7dXJpfWBcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0XG4gICAqXG4gICAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2xvc2VFdmVudCNTdGF0dXNfY29kZXMgZm9yIHZhbGlkIHN0YXR1cyBjb2Rlcy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgc29ja2V0IGlzIGRpc2Nvbm5lY3RlZC5cbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBjb2RlIC0gQSBzdGF0dXMgY29kZSBmb3IgZGlzY29ubmVjdGlvbiAoT3B0aW9uYWwpLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVhc29uIC0gQSB0ZXh0dWFsIGRlc2NyaXB0aW9uIG9mIHRoZSByZWFzb24gdG8gZGlzY29ubmVjdC4gKE9wdGlvbmFsKVxuICAgKi9cbiAgZGlzY29ubmVjdChjYWxsYmFjaywgY29kZSwgcmVhc29uKXtcbiAgICB0aGlzLmNvbm5lY3RDbG9jaysrXG4gICAgdGhpcy5kaXNjb25uZWN0aW5nID0gdHJ1ZVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IHRydWVcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mYWxsYmFja1RpbWVyKVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMudGVhcmRvd24oKCkgPT4ge1xuICAgICAgdGhpcy5kaXNjb25uZWN0aW5nID0gZmFsc2VcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9LCBjb2RlLCByZWFzb24pXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFRoZSBwYXJhbXMgdG8gc2VuZCB3aGVuIGNvbm5lY3RpbmcsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogdXNlclRva2VufWBcbiAgICpcbiAgICogUGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkOyBwYXNzIHRoZW0gaW4gdGhlIFNvY2tldCBjb25zdHJ1Y3RvciBpbnN0ZWFkOlxuICAgKiBgbmV3IFNvY2tldChcIi9zb2NrZXRcIiwge3BhcmFtczoge3VzZXJfaWQ6IHVzZXJUb2tlbn19KWAuXG4gICAqL1xuICBjb25uZWN0KHBhcmFtcyl7XG4gICAgaWYocGFyYW1zKXtcbiAgICAgIGNvbnNvbGUgJiYgY29uc29sZS5sb2coXCJwYXNzaW5nIHBhcmFtcyB0byBjb25uZWN0IGlzIGRlcHJlY2F0ZWQuIEluc3RlYWQgcGFzcyA6cGFyYW1zIHRvIHRoZSBTb2NrZXQgY29uc3RydWN0b3JcIilcbiAgICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShwYXJhbXMpXG4gICAgfVxuICAgIGlmKHRoaXMuY29ubiAmJiAhdGhpcy5kaXNjb25uZWN0aW5nKXsgcmV0dXJuIH1cbiAgICBpZih0aGlzLmxvbmdQb2xsRmFsbGJhY2tNcyAmJiB0aGlzLnRyYW5zcG9ydCAhPT0gTG9uZ1BvbGwpe1xuICAgICAgdGhpcy5jb25uZWN0V2l0aEZhbGxiYWNrKExvbmdQb2xsLCB0aGlzLmxvbmdQb2xsRmFsbGJhY2tNcylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50cmFuc3BvcnRDb25uZWN0KClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTG9ncyB0aGUgbWVzc2FnZS4gT3ZlcnJpZGUgYHRoaXMubG9nZ2VyYCBmb3Igc3BlY2lhbGl6ZWQgbG9nZ2luZy4gbm9vcHMgYnkgZGVmYXVsdFxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2luZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbXNnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAqL1xuICBsb2coa2luZCwgbXNnLCBkYXRhKXsgdGhpcy5sb2dnZXIgJiYgdGhpcy5sb2dnZXIoa2luZCwgbXNnLCBkYXRhKSB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiBhIGxvZ2dlciBoYXMgYmVlbiBzZXQgb24gdGhpcyBzb2NrZXQuXG4gICAqL1xuICBoYXNMb2dnZXIoKXsgcmV0dXJuIHRoaXMubG9nZ2VyICE9PSBudWxsIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBvcGVuIGV2ZW50c1xuICAgKlxuICAgKiBAZXhhbXBsZSBzb2NrZXQub25PcGVuKGZ1bmN0aW9uKCl7IGNvbnNvbGUuaW5mbyhcInRoZSBzb2NrZXQgd2FzIG9wZW5lZFwiKSB9KVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25PcGVuKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm9wZW4ucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gY2xvc2UgZXZlbnRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkNsb3NlKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmNsb3NlLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIGVycm9yIGV2ZW50c1xuICAgKlxuICAgKiBAZXhhbXBsZSBzb2NrZXQub25FcnJvcihmdW5jdGlvbihlcnJvcil7IGFsZXJ0KFwiQW4gZXJyb3Igb2NjdXJyZWRcIikgfSlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uRXJyb3IoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gbWVzc2FnZSBldmVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uTWVzc2FnZShjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBQaW5ncyB0aGUgc2VydmVyIGFuZCBpbnZva2VzIHRoZSBjYWxsYmFjayB3aXRoIHRoZSBSVFQgaW4gbWlsbGlzZWNvbmRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcGluZyB3YXMgcHVzaGVkIG9yIGZhbHNlIGlmIHVuYWJsZSB0byBiZSBwdXNoZWQuXG4gICAqL1xuICBwaW5nKGNhbGxiYWNrKXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICBsZXQgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuICAgIHRoaXMucHVzaCh7dG9waWM6IFwicGhvZW5peFwiLCBldmVudDogXCJoZWFydGJlYXRcIiwgcGF5bG9hZDoge30sIHJlZjogcmVmfSlcbiAgICBsZXQgb25Nc2dSZWYgPSB0aGlzLm9uTWVzc2FnZShtc2cgPT4ge1xuICAgICAgaWYobXNnLnJlZiA9PT0gcmVmKXtcbiAgICAgICAgdGhpcy5vZmYoW29uTXNnUmVmXSlcbiAgICAgICAgY2FsbGJhY2soRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgdHJhbnNwb3J0Q29ubmVjdCgpe1xuICAgIHRoaXMuY29ubmVjdENsb2NrKytcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIHRoaXMuY29ubiA9IG5ldyB0aGlzLnRyYW5zcG9ydCh0aGlzLmVuZFBvaW50VVJMKCkpXG4gICAgdGhpcy5jb25uLmJpbmFyeVR5cGUgPSB0aGlzLmJpbmFyeVR5cGVcbiAgICB0aGlzLmNvbm4udGltZW91dCA9IHRoaXMubG9uZ3BvbGxlclRpbWVvdXRcbiAgICB0aGlzLmNvbm4ub25vcGVuID0gKCkgPT4gdGhpcy5vbkNvbm5PcGVuKClcbiAgICB0aGlzLmNvbm4ub25lcnJvciA9IGVycm9yID0+IHRoaXMub25Db25uRXJyb3IoZXJyb3IpXG4gICAgdGhpcy5jb25uLm9ubWVzc2FnZSA9IGV2ZW50ID0+IHRoaXMub25Db25uTWVzc2FnZShldmVudClcbiAgICB0aGlzLmNvbm4ub25jbG9zZSA9IGV2ZW50ID0+IHRoaXMub25Db25uQ2xvc2UoZXZlbnQpXG4gIH1cblxuICBnZXRTZXNzaW9uKGtleSl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yZSAmJiB0aGlzLnNlc3Npb25TdG9yZS5nZXRJdGVtKGtleSkgfVxuXG4gIHN0b3JlU2Vzc2lvbihrZXksIHZhbCl7IHRoaXMuc2Vzc2lvblN0b3JlICYmIHRoaXMuc2Vzc2lvblN0b3JlLnNldEl0ZW0oa2V5LCB2YWwpIH1cblxuICBjb25uZWN0V2l0aEZhbGxiYWNrKGZhbGxiYWNrVHJhbnNwb3J0LCBmYWxsYmFja1RocmVzaG9sZCA9IDI1MDApe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmZhbGxiYWNrVGltZXIpXG4gICAgbGV0IGVzdGFibGlzaGVkID0gZmFsc2VcbiAgICBsZXQgcHJpbWFyeVRyYW5zcG9ydCA9IHRydWVcbiAgICBsZXQgb3BlblJlZiwgZXJyb3JSZWZcbiAgICBsZXQgZmFsbGJhY2sgPSAocmVhc29uKSA9PiB7XG4gICAgICB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgZmFsbGluZyBiYWNrIHRvICR7ZmFsbGJhY2tUcmFuc3BvcnQubmFtZX0uLi5gLCByZWFzb24pXG4gICAgICB0aGlzLm9mZihbb3BlblJlZiwgZXJyb3JSZWZdKVxuICAgICAgcHJpbWFyeVRyYW5zcG9ydCA9IGZhbHNlXG4gICAgICB0aGlzLnJlcGxhY2VUcmFuc3BvcnQoZmFsbGJhY2tUcmFuc3BvcnQpXG4gICAgICB0aGlzLnRyYW5zcG9ydENvbm5lY3QoKVxuICAgIH1cbiAgICBpZih0aGlzLmdldFNlc3Npb24oYHBoeDpmYWxsYmFjazoke2ZhbGxiYWNrVHJhbnNwb3J0Lm5hbWV9YCkpeyByZXR1cm4gZmFsbGJhY2soXCJtZW1vcml6ZWRcIikgfVxuXG4gICAgdGhpcy5mYWxsYmFja1RpbWVyID0gc2V0VGltZW91dChmYWxsYmFjaywgZmFsbGJhY2tUaHJlc2hvbGQpXG5cbiAgICBlcnJvclJlZiA9IHRoaXMub25FcnJvcihyZWFzb24gPT4ge1xuICAgICAgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJlcnJvclwiLCByZWFzb24pXG4gICAgICBpZihwcmltYXJ5VHJhbnNwb3J0ICYmICFlc3RhYmxpc2hlZCl7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZhbGxiYWNrVGltZXIpXG4gICAgICAgIGZhbGxiYWNrKHJlYXNvbilcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMub25PcGVuKCgpID0+IHtcbiAgICAgIGVzdGFibGlzaGVkID0gdHJ1ZVxuICAgICAgaWYoIXByaW1hcnlUcmFuc3BvcnQpe1xuICAgICAgICAvLyBvbmx5IG1lbW9yaXplIExQIGlmIHdlIG5ldmVyIGNvbm5lY3RlZCB0byBwcmltYXJ5XG4gICAgICAgIGlmKCF0aGlzLnByaW1hcnlQYXNzZWRIZWFsdGhDaGVjayl7IHRoaXMuc3RvcmVTZXNzaW9uKGBwaHg6ZmFsbGJhY2s6JHtmYWxsYmFja1RyYW5zcG9ydC5uYW1lfWAsIFwidHJ1ZVwiKSB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgZXN0YWJsaXNoZWQgJHtmYWxsYmFja1RyYW5zcG9ydC5uYW1lfSBmYWxsYmFja2ApXG4gICAgICB9XG4gICAgICAvLyBpZiB3ZSd2ZSBlc3RhYmxpc2hlZCBwcmltYXJ5LCBnaXZlIHRoZSBmYWxsYmFjayBhIG5ldyBwZXJpb2QgdG8gYXR0ZW1wdCBwaW5nXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5mYWxsYmFja1RpbWVyKVxuICAgICAgdGhpcy5mYWxsYmFja1RpbWVyID0gc2V0VGltZW91dChmYWxsYmFjaywgZmFsbGJhY2tUaHJlc2hvbGQpXG4gICAgICB0aGlzLnBpbmcocnR0ID0+IHtcbiAgICAgICAgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJjb25uZWN0ZWQgdG8gcHJpbWFyeSBhZnRlclwiLCBydHQpXG4gICAgICAgIHRoaXMucHJpbWFyeVBhc3NlZEhlYWx0aENoZWNrID0gdHJ1ZVxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5mYWxsYmFja1RpbWVyKVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMudHJhbnNwb3J0Q29ubmVjdCgpXG4gIH1cblxuICBjbGVhckhlYXJ0YmVhdHMoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpXG4gIH1cblxuICBvbkNvbm5PcGVuKCl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYCR7dGhpcy50cmFuc3BvcnQubmFtZX0gY29ubmVjdGVkIHRvICR7dGhpcy5lbmRQb2ludFVSTCgpfWApXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICB0aGlzLmRpc2Nvbm5lY3RpbmcgPSBmYWxzZVxuICAgIHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9ucysrXG4gICAgdGhpcy5mbHVzaFNlbmRCdWZmZXIoKVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMucmVzZXRIZWFydGJlYXQoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IGNhbGxiYWNrKCkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG5cbiAgaGVhcnRiZWF0VGltZW91dCgpe1xuICAgIGlmKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZil7XG4gICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKXsgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJoZWFydGJlYXQgdGltZW91dC4gQXR0ZW1wdGluZyB0byByZS1lc3RhYmxpc2ggY29ubmVjdGlvblwiKSB9XG4gICAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICAgIHRoaXMudGVhcmRvd24oKCkgPT4gdGhpcy5yZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSwgV1NfQ0xPU0VfTk9STUFMLCBcImhlYXJ0YmVhdCB0aW1lb3V0XCIpXG4gICAgfVxuICB9XG5cbiAgcmVzZXRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLmNvbm4gJiYgdGhpcy5jb25uLnNraXBIZWFydGJlYXQpeyByZXR1cm4gfVxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICB0aGlzLmNsZWFySGVhcnRiZWF0cygpXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZW5kSGVhcnRiZWF0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgfVxuXG4gIHRlYXJkb3duKGNhbGxiYWNrLCBjb2RlLCByZWFzb24pe1xuICAgIGlmKCF0aGlzLmNvbm4pe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9XG4gICAgbGV0IGNvbm5lY3RDbG9jayA9IHRoaXMuY29ubmVjdENsb2NrXG5cbiAgICB0aGlzLndhaXRGb3JCdWZmZXJEb25lKCgpID0+IHtcbiAgICAgIGlmKGNvbm5lY3RDbG9jayAhPT0gdGhpcy5jb25uZWN0Q2xvY2speyByZXR1cm4gfVxuICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgaWYoY29kZSl7IHRoaXMuY29ubi5jbG9zZShjb2RlLCByZWFzb24gfHwgXCJcIikgfSBlbHNlIHsgdGhpcy5jb25uLmNsb3NlKCkgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLndhaXRGb3JTb2NrZXRDbG9zZWQoKCkgPT4ge1xuICAgICAgICBpZihjb25uZWN0Q2xvY2sgIT09IHRoaXMuY29ubmVjdENsb2NrKXsgcmV0dXJuIH1cbiAgICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgICB0aGlzLmNvbm4ub25vcGVuID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubi5vbmVycm9yID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgICAgICAgIHRoaXMuY29ubi5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgd2FpdEZvckJ1ZmZlckRvbmUoY2FsbGJhY2ssIHRyaWVzID0gMSl7XG4gICAgaWYodHJpZXMgPT09IDUgfHwgIXRoaXMuY29ubiB8fCAhdGhpcy5jb25uLmJ1ZmZlcmVkQW1vdW50KXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZShjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgd2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgPSAxKXtcbiAgICBpZih0cmllcyA9PT0gNSB8fCAhdGhpcy5jb25uIHx8IHRoaXMuY29ubi5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLmNsb3NlZCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgb25Db25uQ2xvc2UoZXZlbnQpe1xuICAgIGxldCBjbG9zZUNvZGUgPSBldmVudCAmJiBldmVudC5jb2RlXG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJjbG9zZVwiLCBldmVudClcbiAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgIHRoaXMuY2xlYXJIZWFydGJlYXRzKClcbiAgICBpZighdGhpcy5jbG9zZVdhc0NsZWFuICYmIGNsb3NlQ29kZSAhPT0gMTAwMCl7XG4gICAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpXG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UuZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiBjYWxsYmFjayhldmVudCkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG9uQ29ubkVycm9yKGVycm9yKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBlcnJvcilcbiAgICBsZXQgdHJhbnNwb3J0QmVmb3JlID0gdGhpcy50cmFuc3BvcnRcbiAgICBsZXQgZXN0YWJsaXNoZWRCZWZvcmUgPSB0aGlzLmVzdGFibGlzaGVkQ29ubmVjdGlvbnNcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmVycm9yLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4ge1xuICAgICAgY2FsbGJhY2soZXJyb3IsIHRyYW5zcG9ydEJlZm9yZSwgZXN0YWJsaXNoZWRCZWZvcmUpXG4gICAgfSlcbiAgICBpZih0cmFuc3BvcnRCZWZvcmUgPT09IHRoaXMudHJhbnNwb3J0IHx8IGVzdGFibGlzaGVkQmVmb3JlID4gMCl7XG4gICAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlckNoYW5FcnJvcigpe1xuICAgIHRoaXMuY2hhbm5lbHMuZm9yRWFjaChjaGFubmVsID0+IHtcbiAgICAgIGlmKCEoY2hhbm5lbC5pc0Vycm9yZWQoKSB8fCBjaGFubmVsLmlzTGVhdmluZygpIHx8IGNoYW5uZWwuaXNDbG9zZWQoKSkpe1xuICAgICAgICBjaGFubmVsLnRyaWdnZXIoQ0hBTk5FTF9FVkVOVFMuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgY29ubmVjdGlvblN0YXRlKCl7XG4gICAgc3dpdGNoKHRoaXMuY29ubiAmJiB0aGlzLmNvbm4ucmVhZHlTdGF0ZSl7XG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZzogcmV0dXJuIFwiY29ubmVjdGluZ1wiXG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMub3BlbjogcmV0dXJuIFwib3BlblwiXG4gICAgICBjYXNlIFNPQ0tFVF9TVEFURVMuY2xvc2luZzogcmV0dXJuIFwiY2xvc2luZ1wiXG4gICAgICBkZWZhdWx0OiByZXR1cm4gXCJjbG9zZWRcIlxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLmNvbm5lY3Rpb25TdGF0ZSgpID09PSBcIm9wZW5cIiB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqXG4gICAqIEBwYXJhbSB7Q2hhbm5lbH1cbiAgICovXG4gIHJlbW92ZShjaGFubmVsKXtcbiAgICB0aGlzLm9mZihjaGFubmVsLnN0YXRlQ2hhbmdlUmVmcylcbiAgICB0aGlzLmNoYW5uZWxzID0gdGhpcy5jaGFubmVscy5maWx0ZXIoYyA9PiBjICE9PSBjaGFubmVsKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYG9uT3BlbmAsIGBvbkNsb3NlYCwgYG9uRXJyb3IsYCBhbmQgYG9uTWVzc2FnZWAgcmVnaXN0cmF0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtyZWZzfSAtIGxpc3Qgb2YgcmVmcyByZXR1cm5lZCBieSBjYWxscyB0b1xuICAgKiAgICAgICAgICAgICAgICAgYG9uT3BlbmAsIGBvbkNsb3NlYCwgYG9uRXJyb3IsYCBhbmQgYG9uTWVzc2FnZWBcbiAgICovXG4gIG9mZihyZWZzKXtcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzKXtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Nba2V5XSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Nba2V5XS5maWx0ZXIoKFtyZWZdKSA9PiB7XG4gICAgICAgIHJldHVybiByZWZzLmluZGV4T2YocmVmKSA9PT0gLTFcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyBhIG5ldyBjaGFubmVsIGZvciB0aGUgZ2l2ZW4gdG9waWNcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRvcGljXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjaGFuUGFyYW1zIC0gUGFyYW1ldGVycyBmb3IgdGhlIGNoYW5uZWxcbiAgICogQHJldHVybnMge0NoYW5uZWx9XG4gICAqL1xuICBjaGFubmVsKHRvcGljLCBjaGFuUGFyYW1zID0ge30pe1xuICAgIGxldCBjaGFuID0gbmV3IENoYW5uZWwodG9waWMsIGNoYW5QYXJhbXMsIHRoaXMpXG4gICAgdGhpcy5jaGFubmVscy5wdXNoKGNoYW4pXG4gICAgcmV0dXJuIGNoYW5cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgKi9cbiAgcHVzaChkYXRhKXtcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKXtcbiAgICAgIGxldCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmfSA9IGRhdGFcbiAgICAgIHRoaXMubG9nKFwicHVzaFwiLCBgJHt0b3BpY30gJHtldmVudH0gKCR7am9pbl9yZWZ9LCAke3JlZn0pYCwgcGF5bG9hZClcbiAgICB9XG5cbiAgICBpZih0aGlzLmlzQ29ubmVjdGVkKCkpe1xuICAgICAgdGhpcy5lbmNvZGUoZGF0YSwgcmVzdWx0ID0+IHRoaXMuY29ubi5zZW5kKHJlc3VsdCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKCgpID0+IHRoaXMuZW5jb2RlKGRhdGEsIHJlc3VsdCA9PiB0aGlzLmNvbm4uc2VuZChyZXN1bHQpKSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBuZXh0IG1lc3NhZ2UgcmVmLCBhY2NvdW50aW5nIGZvciBvdmVyZmxvd3NcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIG1ha2VSZWYoKXtcbiAgICBsZXQgbmV3UmVmID0gdGhpcy5yZWYgKyAxXG4gICAgaWYobmV3UmVmID09PSB0aGlzLnJlZil7IHRoaXMucmVmID0gMCB9IGVsc2UgeyB0aGlzLnJlZiA9IG5ld1JlZiB9XG5cbiAgICByZXR1cm4gdGhpcy5yZWYudG9TdHJpbmcoKVxuICB9XG5cbiAgc2VuZEhlYXJ0YmVhdCgpe1xuICAgIGlmKHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiAmJiAhdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMucHVzaCh7dG9waWM6IFwicGhvZW5peFwiLCBldmVudDogXCJoZWFydGJlYXRcIiwgcGF5bG9hZDoge30sIHJlZjogdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmfSlcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oZWFydGJlYXRUaW1lb3V0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgfVxuXG4gIGZsdXNoU2VuZEJ1ZmZlcigpe1xuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoID4gMCl7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjaygpKVxuICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICB9XG4gIH1cblxuICBvbkNvbm5NZXNzYWdlKHJhd01lc3NhZ2Upe1xuICAgIHRoaXMuZGVjb2RlKHJhd01lc3NhZ2UuZGF0YSwgbXNnID0+IHtcbiAgICAgIGxldCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmfSA9IG1zZ1xuICAgICAgaWYocmVmICYmIHJlZiA9PT0gdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgICAgdGhpcy5jbGVhckhlYXJ0YmVhdHMoKVxuICAgICAgICB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgPSBudWxsXG4gICAgICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwicmVjZWl2ZVwiLCBgJHtwYXlsb2FkLnN0YXR1cyB8fCBcIlwifSAke3RvcGljfSAke2V2ZW50fSAke3JlZiAmJiBcIihcIiArIHJlZiArIFwiKVwiIHx8IFwiXCJ9YCwgcGF5bG9hZClcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hhbm5lbHMubGVuZ3RoOyBpKyspe1xuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tpXVxuICAgICAgICBpZighY2hhbm5lbC5pc01lbWJlcih0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5fcmVmKSl7IGNvbnRpbnVlIH1cbiAgICAgICAgY2hhbm5lbC50cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmKVxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IFssIGNhbGxiYWNrXSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZVtpXVxuICAgICAgICBjYWxsYmFjayhtc2cpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGxlYXZlT3BlblRvcGljKHRvcGljKXtcbiAgICBsZXQgZHVwQ2hhbm5lbCA9IHRoaXMuY2hhbm5lbHMuZmluZChjID0+IGMudG9waWMgPT09IHRvcGljICYmIChjLmlzSm9pbmVkKCkgfHwgYy5pc0pvaW5pbmcoKSkpXG4gICAgaWYoZHVwQ2hhbm5lbCl7XG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgbGVhdmluZyBkdXBsaWNhdGUgdG9waWMgXCIke3RvcGljfVwiYClcbiAgICAgIGR1cENoYW5uZWwubGVhdmUoKVxuICAgIH1cbiAgfVxufVxuIiwgImV4cG9ydCBjb25zdCBDT05TRUNVVElWRV9SRUxPQURTID0gXCJjb25zZWN1dGl2ZS1yZWxvYWRzXCJcbmV4cG9ydCBjb25zdCBNQVhfUkVMT0FEUyA9IDEwXG5leHBvcnQgY29uc3QgUkVMT0FEX0pJVFRFUl9NSU4gPSA1MDAwXG5leHBvcnQgY29uc3QgUkVMT0FEX0pJVFRFUl9NQVggPSAxMDAwMFxuZXhwb3J0IGNvbnN0IEZBSUxTQUZFX0pJVFRFUiA9IDMwMDAwXG5leHBvcnQgY29uc3QgUEhYX0VWRU5UX0NMQVNTRVMgPSBbXG4gIFwicGh4LWNsaWNrLWxvYWRpbmdcIiwgXCJwaHgtY2hhbmdlLWxvYWRpbmdcIiwgXCJwaHgtc3VibWl0LWxvYWRpbmdcIixcbiAgXCJwaHgta2V5ZG93bi1sb2FkaW5nXCIsIFwicGh4LWtleXVwLWxvYWRpbmdcIiwgXCJwaHgtYmx1ci1sb2FkaW5nXCIsIFwicGh4LWZvY3VzLWxvYWRpbmdcIixcbiAgXCJwaHgtaG9vay1sb2FkaW5nXCJcbl1cbmV4cG9ydCBjb25zdCBQSFhfQ09NUE9ORU5UID0gXCJkYXRhLXBoeC1jb21wb25lbnRcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSVZFX0xJTksgPSBcImRhdGEtcGh4LWxpbmtcIlxuZXhwb3J0IGNvbnN0IFBIWF9UUkFDS19TVEFUSUMgPSBcInRyYWNrLXN0YXRpY1wiXG5leHBvcnQgY29uc3QgUEhYX0xJTktfU1RBVEUgPSBcImRhdGEtcGh4LWxpbmstc3RhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUZfTE9BRElORyA9IFwiZGF0YS1waHgtcmVmLWxvYWRpbmdcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUZfU1JDID0gXCJkYXRhLXBoeC1yZWYtc3JjXCJcbmV4cG9ydCBjb25zdCBQSFhfUkVGX0xPQ0sgPSBcImRhdGEtcGh4LXJlZi1sb2NrXCJcbmV4cG9ydCBjb25zdCBQSFhfUEVORElOR19SRUZTID0gXCJwaHgtcGVuZGluZy1yZWZzXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJBQ0tfVVBMT0FEUyA9IFwidHJhY2stdXBsb2Fkc1wiXG5leHBvcnQgY29uc3QgUEhYX1VQTE9BRF9SRUYgPSBcImRhdGEtcGh4LXVwbG9hZC1yZWZcIlxuZXhwb3J0IGNvbnN0IFBIWF9QUkVGTElHSFRFRF9SRUZTID0gXCJkYXRhLXBoeC1wcmVmbGlnaHRlZC1yZWZzXCJcbmV4cG9ydCBjb25zdCBQSFhfRE9ORV9SRUZTID0gXCJkYXRhLXBoeC1kb25lLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9EUk9QX1RBUkdFVCA9IFwiZHJvcC10YXJnZXRcIlxuZXhwb3J0IGNvbnN0IFBIWF9BQ1RJVkVfRU5UUllfUkVGUyA9IFwiZGF0YS1waHgtYWN0aXZlLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCA9IFwicGh4OmxpdmUtZmlsZTp1cGRhdGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfU0tJUCA9IFwiZGF0YS1waHgtc2tpcFwiXG5leHBvcnQgY29uc3QgUEhYX01BR0lDX0lEID0gXCJkYXRhLXBoeC1pZFwiXG5leHBvcnQgY29uc3QgUEhYX1BSVU5FID0gXCJkYXRhLXBoeC1wcnVuZVwiXG5leHBvcnQgY29uc3QgUEhYX0NPTk5FQ1RFRF9DTEFTUyA9IFwicGh4LWNvbm5lY3RlZFwiXG5leHBvcnQgY29uc3QgUEhYX0xPQURJTkdfQ0xBU1MgPSBcInBoeC1sb2FkaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfRVJST1JfQ0xBU1MgPSBcInBoeC1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX0NMSUVOVF9FUlJPUl9DTEFTUyA9IFwicGh4LWNsaWVudC1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX1NFUlZFUl9FUlJPUl9DTEFTUyA9IFwicGh4LXNlcnZlci1lcnJvclwiXG5leHBvcnQgY29uc3QgUEhYX1BBUkVOVF9JRCA9IFwiZGF0YS1waHgtcGFyZW50LWlkXCJcbmV4cG9ydCBjb25zdCBQSFhfTUFJTiA9IFwiZGF0YS1waHgtbWFpblwiXG5leHBvcnQgY29uc3QgUEhYX1JPT1RfSUQgPSBcImRhdGEtcGh4LXJvb3QtaWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9WSUVXUE9SVF9UT1AgPSBcInZpZXdwb3J0LXRvcFwiXG5leHBvcnQgY29uc3QgUEhYX1ZJRVdQT1JUX0JPVFRPTSA9IFwidmlld3BvcnQtYm90dG9tXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJJR0dFUl9BQ1RJT04gPSBcInRyaWdnZXItYWN0aW9uXCJcbmV4cG9ydCBjb25zdCBQSFhfSEFTX0ZPQ1VTRUQgPSBcInBoeC1oYXMtZm9jdXNlZFwiXG5leHBvcnQgY29uc3QgRk9DVVNBQkxFX0lOUFVUUyA9IFtcInRleHRcIiwgXCJ0ZXh0YXJlYVwiLCBcIm51bWJlclwiLCBcImVtYWlsXCIsIFwicGFzc3dvcmRcIiwgXCJzZWFyY2hcIiwgXCJ0ZWxcIiwgXCJ1cmxcIiwgXCJkYXRlXCIsIFwidGltZVwiLCBcImRhdGV0aW1lLWxvY2FsXCIsIFwiY29sb3JcIiwgXCJyYW5nZVwiXVxuZXhwb3J0IGNvbnN0IENIRUNLQUJMRV9JTlBVVFMgPSBbXCJjaGVja2JveFwiLCBcInJhZGlvXCJdXG5leHBvcnQgY29uc3QgUEhYX0hBU19TVUJNSVRURUQgPSBcInBoeC1oYXMtc3VibWl0dGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfU0VTU0lPTiA9IFwiZGF0YS1waHgtc2Vzc2lvblwiXG5leHBvcnQgY29uc3QgUEhYX1ZJRVdfU0VMRUNUT1IgPSBgWyR7UEhYX1NFU1NJT059XWBcbmV4cG9ydCBjb25zdCBQSFhfU1RJQ0tZID0gXCJkYXRhLXBoeC1zdGlja3lcIlxuZXhwb3J0IGNvbnN0IFBIWF9TVEFUSUMgPSBcImRhdGEtcGh4LXN0YXRpY1wiXG5leHBvcnQgY29uc3QgUEhYX1JFQURPTkxZID0gXCJkYXRhLXBoeC1yZWFkb25seVwiXG5leHBvcnQgY29uc3QgUEhYX0RJU0FCTEVEID0gXCJkYXRhLXBoeC1kaXNhYmxlZFwiXG5leHBvcnQgY29uc3QgUEhYX0RJU0FCTEVfV0lUSCA9IFwiZGlzYWJsZS13aXRoXCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUgPSBcImRhdGEtcGh4LWRpc2FibGUtd2l0aC1yZXN0b3JlXCJcbmV4cG9ydCBjb25zdCBQSFhfSE9PSyA9IFwiaG9va1wiXG5leHBvcnQgY29uc3QgUEhYX0RFQk9VTkNFID0gXCJkZWJvdW5jZVwiXG5leHBvcnQgY29uc3QgUEhYX1RIUk9UVExFID0gXCJ0aHJvdHRsZVwiXG5leHBvcnQgY29uc3QgUEhYX1VQREFURSA9IFwidXBkYXRlXCJcbmV4cG9ydCBjb25zdCBQSFhfU1RSRUFNID0gXCJzdHJlYW1cIlxuZXhwb3J0IGNvbnN0IFBIWF9TVFJFQU1fUkVGID0gXCJkYXRhLXBoeC1zdHJlYW1cIlxuZXhwb3J0IGNvbnN0IFBIWF9LRVkgPSBcImtleVwiXG5leHBvcnQgY29uc3QgUEhYX1BSSVZBVEUgPSBcInBoeFByaXZhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9BVVRPX1JFQ09WRVIgPSBcImF1dG8tcmVjb3ZlclwiXG5leHBvcnQgY29uc3QgUEhYX0xWX0RFQlVHID0gXCJwaHg6bGl2ZS1zb2NrZXQ6ZGVidWdcIlxuZXhwb3J0IGNvbnN0IFBIWF9MVl9QUk9GSUxFID0gXCJwaHg6bGl2ZS1zb2NrZXQ6cHJvZmlsaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfTFZfTEFURU5DWV9TSU0gPSBcInBoeDpsaXZlLXNvY2tldDpsYXRlbmN5LXNpbVwiXG5leHBvcnQgY29uc3QgUEhYX0xWX0hJU1RPUllfUE9TSVRJT04gPSBcInBoeDpuYXYtaGlzdG9yeS1wb3NpdGlvblwiXG5leHBvcnQgY29uc3QgUEhYX1BST0dSRVNTID0gXCJwcm9ncmVzc1wiXG5leHBvcnQgY29uc3QgUEhYX01PVU5URUQgPSBcIm1vdW50ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUxPQURfU1RBVFVTID0gXCJfX3Bob2VuaXhfcmVsb2FkX3N0YXR1c19fXCJcbmV4cG9ydCBjb25zdCBMT0FERVJfVElNRU9VVCA9IDFcbmV4cG9ydCBjb25zdCBNQVhfQ0hJTERfSk9JTl9BVFRFTVBUUyA9IDNcbmV4cG9ydCBjb25zdCBCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VUID0gMjAwXG5leHBvcnQgY29uc3QgRElTQ09OTkVDVEVEX1RJTUVPVVQgPSA1MDBcbmV4cG9ydCBjb25zdCBCSU5ESU5HX1BSRUZJWCA9IFwicGh4LVwiXG5leHBvcnQgY29uc3QgUFVTSF9USU1FT1VUID0gMzAwMDBcbmV4cG9ydCBjb25zdCBMSU5LX0hFQURFUiA9IFwieC1yZXF1ZXN0ZWQtd2l0aFwiXG5leHBvcnQgY29uc3QgUkVTUE9OU0VfVVJMX0hFQURFUiA9IFwieC1yZXNwb25zZS11cmxcIlxuZXhwb3J0IGNvbnN0IERFQk9VTkNFX1RSSUdHRVIgPSBcImRlYm91bmNlLXRyaWdnZXJcIlxuZXhwb3J0IGNvbnN0IFRIUk9UVExFRCA9IFwidGhyb3R0bGVkXCJcbmV4cG9ydCBjb25zdCBERUJPVU5DRV9QUkVWX0tFWSA9IFwiZGVib3VuY2UtcHJldi1rZXlcIlxuZXhwb3J0IGNvbnN0IERFRkFVTFRTID0ge1xuICBkZWJvdW5jZTogMzAwLFxuICB0aHJvdHRsZTogMzAwXG59XG5leHBvcnQgY29uc3QgUEhYX1BFTkRJTkdfQVRUUlMgPSBbUEhYX1JFRl9MT0FESU5HLCBQSFhfUkVGX1NSQywgUEhYX1JFRl9MT0NLXVxuLy8gUmVuZGVyZWRcbmV4cG9ydCBjb25zdCBEWU5BTUlDUyA9IFwiZFwiXG5leHBvcnQgY29uc3QgU1RBVElDID0gXCJzXCJcbmV4cG9ydCBjb25zdCBST09UID0gXCJyXCJcbmV4cG9ydCBjb25zdCBDT01QT05FTlRTID0gXCJjXCJcbmV4cG9ydCBjb25zdCBFVkVOVFMgPSBcImVcIlxuZXhwb3J0IGNvbnN0IFJFUExZID0gXCJyXCJcbmV4cG9ydCBjb25zdCBUSVRMRSA9IFwidFwiXG5leHBvcnQgY29uc3QgVEVNUExBVEVTID0gXCJwXCJcbmV4cG9ydCBjb25zdCBTVFJFQU0gPSBcInN0cmVhbVwiXG4iLCAiaW1wb3J0IHtcbiAgbG9nRXJyb3Jcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRyeVVwbG9hZGVyIHtcbiAgY29uc3RydWN0b3IoZW50cnksIGNvbmZpZywgbGl2ZVNvY2tldCl7XG4gICAgbGV0IHtjaHVua19zaXplLCBjaHVua190aW1lb3V0fSA9IGNvbmZpZ1xuICAgIHRoaXMubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXRcbiAgICB0aGlzLmVudHJ5ID0gZW50cnlcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLmNodW5rU2l6ZSA9IGNodW5rX3NpemVcbiAgICB0aGlzLmNodW5rVGltZW91dCA9IGNodW5rX3RpbWVvdXRcbiAgICB0aGlzLmNodW5rVGltZXIgPSBudWxsXG4gICAgdGhpcy5lcnJvcmVkID0gZmFsc2VcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwgPSBsaXZlU29ja2V0LmNoYW5uZWwoYGx2dToke2VudHJ5LnJlZn1gLCB7dG9rZW46IGVudHJ5Lm1ldGFkYXRhKCl9KVxuICB9XG5cbiAgZXJyb3IocmVhc29uKXtcbiAgICBpZih0aGlzLmVycm9yZWQpeyByZXR1cm4gfVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5sZWF2ZSgpXG4gICAgdGhpcy5lcnJvcmVkID0gdHJ1ZVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmNodW5rVGltZXIpXG4gICAgdGhpcy5lbnRyeS5lcnJvcihyZWFzb24pXG4gIH1cblxuICB1cGxvYWQoKXtcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwub25FcnJvcihyZWFzb24gPT4gdGhpcy5lcnJvcihyZWFzb24pKVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5qb2luKClcbiAgICAgIC5yZWNlaXZlKFwib2tcIiwgX2RhdGEgPT4gdGhpcy5yZWFkTmV4dENodW5rKCkpXG4gICAgICAucmVjZWl2ZShcImVycm9yXCIsIHJlYXNvbiA9PiB0aGlzLmVycm9yKHJlYXNvbikpXG4gIH1cblxuICBpc0RvbmUoKXsgcmV0dXJuIHRoaXMub2Zmc2V0ID49IHRoaXMuZW50cnkuZmlsZS5zaXplIH1cblxuICByZWFkTmV4dENodW5rKCl7XG4gICAgbGV0IHJlYWRlciA9IG5ldyB3aW5kb3cuRmlsZVJlYWRlcigpXG4gICAgbGV0IGJsb2IgPSB0aGlzLmVudHJ5LmZpbGUuc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMuY2h1bmtTaXplICsgdGhpcy5vZmZzZXQpXG4gICAgcmVhZGVyLm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBpZihlLnRhcmdldC5lcnJvciA9PT0gbnVsbCl7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGUudGFyZ2V0LnJlc3VsdC5ieXRlTGVuZ3RoXG4gICAgICAgIHRoaXMucHVzaENodW5rKGUudGFyZ2V0LnJlc3VsdClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsb2dFcnJvcihcIlJlYWQgZXJyb3I6IFwiICsgZS50YXJnZXQuZXJyb3IpXG4gICAgICB9XG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICB9XG5cbiAgcHVzaENodW5rKGNodW5rKXtcbiAgICBpZighdGhpcy51cGxvYWRDaGFubmVsLmlzSm9pbmVkKCkpeyByZXR1cm4gfVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5wdXNoKFwiY2h1bmtcIiwgY2h1bmssIHRoaXMuY2h1bmtUaW1lb3V0KVxuICAgICAgLnJlY2VpdmUoXCJva1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZW50cnkucHJvZ3Jlc3MoKHRoaXMub2Zmc2V0IC8gdGhpcy5lbnRyeS5maWxlLnNpemUpICogMTAwKVxuICAgICAgICBpZighdGhpcy5pc0RvbmUoKSl7XG4gICAgICAgICAgdGhpcy5jaHVua1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlYWROZXh0Q2h1bmsoKSwgdGhpcy5saXZlU29ja2V0LmdldExhdGVuY3lTaW0oKSB8fCAwKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCAoe3JlYXNvbn0pID0+IHRoaXMuZXJyb3IocmVhc29uKSlcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIFBIWF9WSUVXX1NFTEVDVE9SXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCBFbnRyeVVwbG9hZGVyIGZyb20gXCIuL2VudHJ5X3VwbG9hZGVyXCJcblxuZXhwb3J0IGxldCBsb2dFcnJvciA9IChtc2csIG9iaikgPT4gY29uc29sZS5lcnJvciAmJiBjb25zb2xlLmVycm9yKG1zZywgb2JqKVxuXG5leHBvcnQgbGV0IGlzQ2lkID0gKGNpZCkgPT4ge1xuICBsZXQgdHlwZSA9IHR5cGVvZihjaWQpXG4gIHJldHVybiB0eXBlID09PSBcIm51bWJlclwiIHx8ICh0eXBlID09PSBcInN0cmluZ1wiICYmIC9eKDB8WzEtOV1cXGQqKSQvLnRlc3QoY2lkKSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdER1cGxpY2F0ZUlkcygpe1xuICBsZXQgaWRzID0gbmV3IFNldCgpXG4gIGxldCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqW2lkXVwiKVxuICBmb3IobGV0IGkgPSAwLCBsZW4gPSBlbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG4gICAgaWYoaWRzLmhhcyhlbGVtc1tpXS5pZCkpe1xuICAgICAgY29uc29sZS5lcnJvcihgTXVsdGlwbGUgSURzIGRldGVjdGVkOiAke2VsZW1zW2ldLmlkfS4gRW5zdXJlIHVuaXF1ZSBlbGVtZW50IGlkcy5gKVxuICAgIH0gZWxzZSB7XG4gICAgICBpZHMuYWRkKGVsZW1zW2ldLmlkKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0SW52YWxpZFN0cmVhbUluc2VydHMoaW5zZXJ0cyl7XG4gIGNvbnN0IGVycm9ycyA9IG5ldyBTZXQoKVxuICBPYmplY3Qua2V5cyhpbnNlcnRzKS5mb3JFYWNoKChpZCkgPT4ge1xuICAgIGNvbnN0IHN0cmVhbUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG4gICAgaWYoc3RyZWFtRWwgJiYgc3RyZWFtRWwucGFyZW50RWxlbWVudCAmJiBzdHJlYW1FbC5wYXJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcInBoeC11cGRhdGVcIikgIT09IFwic3RyZWFtXCIpe1xuICAgICAgZXJyb3JzLmFkZChgVGhlIHN0cmVhbSBjb250YWluZXIgd2l0aCBpZCBcIiR7c3RyZWFtRWwucGFyZW50RWxlbWVudC5pZH1cIiBpcyBtaXNzaW5nIHRoZSBwaHgtdXBkYXRlPVwic3RyZWFtXCIgYXR0cmlidXRlLiBFbnN1cmUgaXQgaXMgc2V0IGZvciBzdHJlYW1zIHRvIHdvcmsgcHJvcGVybHkuYClcbiAgICB9XG4gIH0pXG4gIGVycm9ycy5mb3JFYWNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKVxufVxuXG5leHBvcnQgbGV0IGRlYnVnID0gKHZpZXcsIGtpbmQsIG1zZywgb2JqKSA9PiB7XG4gIGlmKHZpZXcubGl2ZVNvY2tldC5pc0RlYnVnRW5hYmxlZCgpKXtcbiAgICBjb25zb2xlLmxvZyhgJHt2aWV3LmlkfSAke2tpbmR9OiAke21zZ30gLSBgLCBvYmopXG4gIH1cbn1cblxuLy8gd3JhcHMgdmFsdWUgaW4gY2xvc3VyZSBvciByZXR1cm5zIGNsb3N1cmVcbmV4cG9ydCBsZXQgY2xvc3VyZSA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09IFwiZnVuY3Rpb25cIiA/IHZhbCA6IGZ1bmN0aW9uICgpeyByZXR1cm4gdmFsIH1cblxuZXhwb3J0IGxldCBjbG9uZSA9IChvYmopID0+IHsgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSkgfVxuXG5leHBvcnQgbGV0IGNsb3Nlc3RQaHhCaW5kaW5nID0gKGVsLCBiaW5kaW5nLCBib3JkZXJFbCkgPT4ge1xuICBkbyB7XG4gICAgaWYoZWwubWF0Y2hlcyhgWyR7YmluZGluZ31dYCkgJiYgIWVsLmRpc2FibGVkKXsgcmV0dXJuIGVsIH1cbiAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQgfHwgZWwucGFyZW50Tm9kZVxuICB9IHdoaWxlKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxICYmICEoKGJvcmRlckVsICYmIGJvcmRlckVsLmlzU2FtZU5vZGUoZWwpKSB8fCBlbC5tYXRjaGVzKFBIWF9WSUVXX1NFTEVDVE9SKSkpXG4gIHJldHVybiBudWxsXG59XG5cbmV4cG9ydCBsZXQgaXNPYmplY3QgPSAob2JqKSA9PiB7XG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJiAhKG9iaiBpbnN0YW5jZW9mIEFycmF5KVxufVxuXG5leHBvcnQgbGV0IGlzRXF1YWxPYmogPSAob2JqMSwgb2JqMikgPT4gSlNPTi5zdHJpbmdpZnkob2JqMSkgPT09IEpTT04uc3RyaW5naWZ5KG9iajIpXG5cbmV4cG9ydCBsZXQgaXNFbXB0eSA9IChvYmopID0+IHtcbiAgZm9yKGxldCB4IGluIG9iail7IHJldHVybiBmYWxzZSB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBsZXQgbWF5YmUgPSAoZWwsIGNhbGxiYWNrKSA9PiBlbCAmJiBjYWxsYmFjayhlbClcblxuZXhwb3J0IGxldCBjaGFubmVsVXBsb2FkZXIgPSBmdW5jdGlvbiAoZW50cmllcywgb25FcnJvciwgcmVzcCwgbGl2ZVNvY2tldCl7XG4gIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgbGV0IGVudHJ5VXBsb2FkZXIgPSBuZXcgRW50cnlVcGxvYWRlcihlbnRyeSwgcmVzcC5jb25maWcsIGxpdmVTb2NrZXQpXG4gICAgZW50cnlVcGxvYWRlci51cGxvYWQoKVxuICB9KVxufVxuIiwgImxldCBCcm93c2VyID0ge1xuICBjYW5QdXNoU3RhdGUoKXsgcmV0dXJuICh0eXBlb2YgKGhpc3RvcnkucHVzaFN0YXRlKSAhPT0gXCJ1bmRlZmluZWRcIikgfSxcblxuICBkcm9wTG9jYWwobG9jYWxTdG9yYWdlLCBuYW1lc3BhY2UsIHN1YmtleSl7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpKVxuICB9LFxuXG4gIHVwZGF0ZUxvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXksIGluaXRpYWwsIGZ1bmMpe1xuICAgIGxldCBjdXJyZW50ID0gdGhpcy5nZXRMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5KVxuICAgIGxldCBrZXkgPSB0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KVxuICAgIGxldCBuZXdWYWwgPSBjdXJyZW50ID09PSBudWxsID8gaW5pdGlhbCA6IGZ1bmMoY3VycmVudClcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG5ld1ZhbCkpXG4gICAgcmV0dXJuIG5ld1ZhbFxuICB9LFxuXG4gIGdldExvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXkpe1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpKSlcbiAgfSxcblxuICB1cGRhdGVDdXJyZW50U3RhdGUoY2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmNhblB1c2hTdGF0ZSgpKXsgcmV0dXJuIH1cbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShjYWxsYmFjayhoaXN0b3J5LnN0YXRlIHx8IHt9KSwgXCJcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpXG4gIH0sXG5cbiAgcHVzaFN0YXRlKGtpbmQsIG1ldGEsIHRvKXtcbiAgICBpZih0aGlzLmNhblB1c2hTdGF0ZSgpKXtcbiAgICAgIGlmKHRvICE9PSB3aW5kb3cubG9jYXRpb24uaHJlZil7XG4gICAgICAgIGlmKG1ldGEudHlwZSA9PSBcInJlZGlyZWN0XCIgJiYgbWV0YS5zY3JvbGwpe1xuICAgICAgICAgIC8vIElmIHdlJ3JlIHJlZGlyZWN0aW5nIHN0b3JlIHRoZSBjdXJyZW50IHNjcm9sbFkgZm9yIHRoZSBjdXJyZW50IGhpc3Rvcnkgc3RhdGUuXG4gICAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZSA9IGhpc3Rvcnkuc3RhdGUgfHwge31cbiAgICAgICAgICBjdXJyZW50U3RhdGUuc2Nyb2xsID0gbWV0YS5zY3JvbGxcbiAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShjdXJyZW50U3RhdGUsIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIG1ldGEuc2Nyb2xsIC8vIE9ubHkgc3RvcmUgdGhlIHNjcm9sbCBpbiB0aGUgcmVkaXJlY3QgY2FzZS5cbiAgICAgICAgaGlzdG9yeVtraW5kICsgXCJTdGF0ZVwiXShtZXRhLCBcIlwiLCB0byB8fCBudWxsKSAvLyBJRSB3aWxsIGNvZXJjZSB1bmRlZmluZWQgdG8gc3RyaW5nXG5cbiAgICAgICAgLy8gd2hlbiB1c2luZyBuYXZpZ2F0ZSwgd2UnZCBjYWxsIHB1c2hTdGF0ZSBpbW1lZGlhdGVseSBiZWZvcmUgcGF0Y2hpbmcgdGhlIERPTSxcbiAgICAgICAgLy8ganVtcGluZyBiYWNrIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2UsIGVmZmVjdGl2ZWx5IGlnbm9yaW5nIHRoZSBzY3JvbGxJbnRvVmlldztcbiAgICAgICAgLy8gdGhlcmVmb3JlIHdlIHdhaXQgZm9yIHRoZSBuZXh0IGZyYW1lIChhZnRlciB0aGUgRE9NIHBhdGNoKSBhbmQgb25seSB0aGVuIHRyeVxuICAgICAgICAvLyB0byBzY3JvbGwgdG8gdGhlIGhhc2hFbFxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBsZXQgaGFzaEVsID0gdGhpcy5nZXRIYXNoVGFyZ2V0RWwod2luZG93LmxvY2F0aW9uLmhhc2gpXG4gIFxuICAgICAgICAgIGlmKGhhc2hFbCl7XG4gICAgICAgICAgICBoYXNoRWwuc2Nyb2xsSW50b1ZpZXcoKVxuICAgICAgICAgIH0gZWxzZSBpZihtZXRhLnR5cGUgPT09IFwicmVkaXJlY3RcIil7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsKDAsIDApXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlZGlyZWN0KHRvKVxuICAgIH1cbiAgfSxcblxuICBzZXRDb29raWUobmFtZSwgdmFsdWUsIG1heEFnZVNlY29uZHMpe1xuICAgIGxldCBleHBpcmVzID0gdHlwZW9mKG1heEFnZVNlY29uZHMpID09PSBcIm51bWJlclwiID8gYCBtYXgtYWdlPSR7bWF4QWdlU2Vjb25kc307YCA6IFwiXCJcbiAgICBkb2N1bWVudC5jb29raWUgPSBgJHtuYW1lfT0ke3ZhbHVlfTske2V4cGlyZXN9IHBhdGg9L2BcbiAgfSxcblxuICBnZXRDb29raWUobmFtZSl7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCg/Oig/Ol58Lio7XFxzKikke25hbWV9XFxzKlxcPVxccyooW147XSopLiokKXxeLiokYCksIFwiJDFcIilcbiAgfSxcblxuICBkZWxldGVDb29raWUobmFtZSl7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09OyBtYXgtYWdlPS0xOyBwYXRoPS9gXG4gIH0sXG5cbiAgcmVkaXJlY3QodG9VUkwsIGZsYXNoKXtcbiAgICBpZihmbGFzaCl7IHRoaXMuc2V0Q29va2llKFwiX19waG9lbml4X2ZsYXNoX19cIiwgZmxhc2gsIDYwKSB9XG4gICAgd2luZG93LmxvY2F0aW9uID0gdG9VUkxcbiAgfSxcblxuICBsb2NhbEtleShuYW1lc3BhY2UsIHN1YmtleSl7IHJldHVybiBgJHtuYW1lc3BhY2V9LSR7c3Via2V5fWAgfSxcblxuICBnZXRIYXNoVGFyZ2V0RWwobWF5YmVIYXNoKXtcbiAgICBsZXQgaGFzaCA9IG1heWJlSGFzaC50b1N0cmluZygpLnN1YnN0cmluZygxKVxuICAgIGlmKGhhc2ggPT09IFwiXCIpeyByZXR1cm4gfVxuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBhW25hbWU9XCIke2hhc2h9XCJdYClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCcm93c2VyXG4iLCAiaW1wb3J0IHtcbiAgQ0hFQ0tBQkxFX0lOUFVUUyxcbiAgREVCT1VOQ0VfUFJFVl9LRVksXG4gIERFQk9VTkNFX1RSSUdHRVIsXG4gIEZPQ1VTQUJMRV9JTlBVVFMsXG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9IQVNfRk9DVVNFRCxcbiAgUEhYX0hBU19TVUJNSVRURUQsXG4gIFBIWF9NQUlOLFxuICBQSFhfUEFSRU5UX0lELFxuICBQSFhfUFJJVkFURSxcbiAgUEhYX1JFRl9TUkMsXG4gIFBIWF9SRUZfTE9DSyxcbiAgUEhYX1BFTkRJTkdfQVRUUlMsXG4gIFBIWF9ST09UX0lELFxuICBQSFhfU0VTU0lPTixcbiAgUEhYX1NUQVRJQyxcbiAgUEhYX1VQTE9BRF9SRUYsXG4gIFBIWF9WSUVXX1NFTEVDVE9SLFxuICBQSFhfU1RJQ0tZLFxuICBQSFhfRVZFTlRfQ0xBU1NFUyxcbiAgVEhST1RUTEVELFxuICBQSFhfU1RSRUFNLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmxldCBET00gPSB7XG4gIGJ5SWQoaWQpeyByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIHx8IGxvZ0Vycm9yKGBubyBpZCBmb3VuZCBmb3IgJHtpZH1gKSB9LFxuXG4gIHJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpe1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgIGlmKGVsLmNsYXNzTGlzdC5sZW5ndGggPT09IDApeyBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKSB9XG4gIH0sXG5cbiAgYWxsKG5vZGUsIHF1ZXJ5LCBjYWxsYmFjayl7XG4gICAgaWYoIW5vZGUpeyByZXR1cm4gW10gfVxuICAgIGxldCBhcnJheSA9IEFycmF5LmZyb20obm9kZS5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSlcbiAgICByZXR1cm4gY2FsbGJhY2sgPyBhcnJheS5mb3JFYWNoKGNhbGxiYWNrKSA6IGFycmF5XG4gIH0sXG5cbiAgY2hpbGROb2RlTGVuZ3RoKGh0bWwpe1xuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcbiAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5jaGlsZEVsZW1lbnRDb3VudFxuICB9LFxuXG4gIGlzVXBsb2FkSW5wdXQoZWwpeyByZXR1cm4gZWwudHlwZSA9PT0gXCJmaWxlXCIgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSAhPT0gbnVsbCB9LFxuXG4gIGlzQXV0b1VwbG9hZChpbnB1dEVsKXsgcmV0dXJuIGlucHV0RWwuaGFzQXR0cmlidXRlKFwiZGF0YS1waHgtYXV0by11cGxvYWRcIikgfSxcblxuICBmaW5kVXBsb2FkSW5wdXRzKG5vZGUpe1xuICAgIGNvbnN0IGZvcm1JZCA9IG5vZGUuaWRcbiAgICBjb25zdCBpbnB1dHNPdXRzaWRlRm9ybSA9IHRoaXMuYWxsKGRvY3VtZW50LCBgaW5wdXRbdHlwZT1cImZpbGVcIl1bJHtQSFhfVVBMT0FEX1JFRn1dW2Zvcm09XCIke2Zvcm1JZH1cIl1gKVxuICAgIHJldHVybiB0aGlzLmFsbChub2RlLCBgaW5wdXRbdHlwZT1cImZpbGVcIl1bJHtQSFhfVVBMT0FEX1JFRn1dYCkuY29uY2F0KGlucHV0c091dHNpZGVGb3JtKVxuICB9LFxuXG4gIGZpbmRDb21wb25lbnROb2RlTGlzdChub2RlLCBjaWQpe1xuICAgIHJldHVybiB0aGlzLmZpbHRlcldpdGhpblNhbWVMaXZlVmlldyh0aGlzLmFsbChub2RlLCBgWyR7UEhYX0NPTVBPTkVOVH09XCIke2NpZH1cIl1gKSwgbm9kZSlcbiAgfSxcblxuICBpc1BoeERlc3Ryb3llZChub2RlKXtcbiAgICByZXR1cm4gbm9kZS5pZCAmJiBET00ucHJpdmF0ZShub2RlLCBcImRlc3Ryb3llZFwiKSA/IHRydWUgOiBmYWxzZVxuICB9LFxuXG4gIHdhbnRzTmV3VGFiKGUpe1xuICAgIGxldCB3YW50c05ld1RhYiA9IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5IHx8IGUubWV0YUtleSB8fCAoZS5idXR0b24gJiYgZS5idXR0b24gPT09IDEpXG4gICAgbGV0IGlzRG93bmxvYWQgPSAoZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MQW5jaG9yRWxlbWVudCAmJiBlLnRhcmdldC5oYXNBdHRyaWJ1dGUoXCJkb3dubG9hZFwiKSlcbiAgICBsZXQgaXNUYXJnZXRCbGFuayA9IGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZShcInRhcmdldFwiKSAmJiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIikudG9Mb3dlckNhc2UoKSA9PT0gXCJfYmxhbmtcIlxuICAgIGxldCBpc1RhcmdldE5hbWVkVGFiID0gZS50YXJnZXQuaGFzQXR0cmlidXRlKFwidGFyZ2V0XCIpICYmICFlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIikuc3RhcnRzV2l0aChcIl9cIilcbiAgICByZXR1cm4gd2FudHNOZXdUYWIgfHwgaXNUYXJnZXRCbGFuayB8fCBpc0Rvd25sb2FkIHx8IGlzVGFyZ2V0TmFtZWRUYWJcbiAgfSxcblxuICBpc1VubG9hZGFibGVGb3JtU3VibWl0KGUpe1xuICAgIC8vIElnbm9yZSBmb3JtIHN1Ym1pc3Npb25zIGludGVuZGVkIHRvIGNsb3NlIGEgbmF0aXZlIDxkaWFsb2c+IGVsZW1lbnRcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVE1ML0VsZW1lbnQvZGlhbG9nI3VzYWdlX25vdGVzXG4gICAgbGV0IGlzRGlhbG9nU3VibWl0ID0gKGUudGFyZ2V0ICYmIGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcIm1ldGhvZFwiKSA9PT0gXCJkaWFsb2dcIikgfHxcbiAgICAgIChlLnN1Ym1pdHRlciAmJiBlLnN1Ym1pdHRlci5nZXRBdHRyaWJ1dGUoXCJmb3JtbWV0aG9kXCIpID09PSBcImRpYWxvZ1wiKVxuXG4gICAgaWYoaXNEaWFsb2dTdWJtaXQpe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAhZS5kZWZhdWx0UHJldmVudGVkICYmICF0aGlzLndhbnRzTmV3VGFiKGUpXG4gICAgfVxuICB9LFxuXG4gIGlzTmV3UGFnZUNsaWNrKGUsIGN1cnJlbnRMb2NhdGlvbil7XG4gICAgbGV0IGhyZWYgPSBlLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50ID8gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA6IG51bGxcbiAgICBsZXQgdXJsXG5cbiAgICBpZihlLmRlZmF1bHRQcmV2ZW50ZWQgfHwgaHJlZiA9PT0gbnVsbCB8fCB0aGlzLndhbnRzTmV3VGFiKGUpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICBpZihocmVmLnN0YXJ0c1dpdGgoXCJtYWlsdG86XCIpIHx8IGhyZWYuc3RhcnRzV2l0aChcInRlbDpcIikpeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmKGUudGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlKXsgcmV0dXJuIGZhbHNlIH1cblxuICAgIHRyeSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKGhyZWYpXG4gICAgfSBjYXRjaCB7XG4gICAgICB0cnkge1xuICAgICAgICB1cmwgPSBuZXcgVVJMKGhyZWYsIGN1cnJlbnRMb2NhdGlvbilcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBiYWQgVVJMLCBmYWxsYmFjayB0byBsZXQgYnJvd3NlciB0cnkgaXQgYXMgZXh0ZXJuYWxcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZih1cmwuaG9zdCA9PT0gY3VycmVudExvY2F0aW9uLmhvc3QgJiYgdXJsLnByb3RvY29sID09PSBjdXJyZW50TG9jYXRpb24ucHJvdG9jb2wpe1xuICAgICAgaWYodXJsLnBhdGhuYW1lID09PSBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUgJiYgdXJsLnNlYXJjaCA9PT0gY3VycmVudExvY2F0aW9uLnNlYXJjaCl7XG4gICAgICAgIHJldHVybiB1cmwuaGFzaCA9PT0gXCJcIiAmJiAhdXJsLmhyZWYuZW5kc1dpdGgoXCIjXCIpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1cmwucHJvdG9jb2wuc3RhcnRzV2l0aChcImh0dHBcIilcbiAgfSxcblxuICBtYXJrUGh4Q2hpbGREZXN0cm95ZWQoZWwpe1xuICAgIGlmKHRoaXMuaXNQaHhDaGlsZChlbCkpeyBlbC5zZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04sIFwiXCIpIH1cbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIFwiZGVzdHJveWVkXCIsIHRydWUpXG4gIH0sXG5cbiAgZmluZFBoeENoaWxkcmVuSW5GcmFnbWVudChodG1sLCBwYXJlbnRJZCl7XG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgIHJldHVybiB0aGlzLmZpbmRQaHhDaGlsZHJlbih0ZW1wbGF0ZS5jb250ZW50LCBwYXJlbnRJZClcbiAgfSxcblxuICBpc0lnbm9yZWQoZWwsIHBoeFVwZGF0ZSl7XG4gICAgcmV0dXJuIChlbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSB8fCBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC11cGRhdGVcIikpID09PSBcImlnbm9yZVwiXG4gIH0sXG5cbiAgaXNQaHhVcGRhdGUoZWwsIHBoeFVwZGF0ZSwgdXBkYXRlVHlwZXMpe1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgdXBkYXRlVHlwZXMuaW5kZXhPZihlbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSkgPj0gMFxuICB9LFxuXG4gIGZpbmRQaHhTdGlja3koZWwpeyByZXR1cm4gdGhpcy5hbGwoZWwsIGBbJHtQSFhfU1RJQ0tZfV1gKSB9LFxuXG4gIGZpbmRQaHhDaGlsZHJlbihlbCwgcGFyZW50SWQpe1xuICAgIHJldHVybiB0aGlzLmFsbChlbCwgYCR7UEhYX1ZJRVdfU0VMRUNUT1J9WyR7UEhYX1BBUkVOVF9JRH09XCIke3BhcmVudElkfVwiXWApXG4gIH0sXG5cbiAgZmluZEV4aXN0aW5nUGFyZW50Q0lEcyhub2RlLCBjaWRzKXtcbiAgICAvLyB3ZSBvbmx5IHdhbnQgdG8gZmluZCBwYXJlbnRzIHRoYXQgZXhpc3Qgb24gdGhlIHBhZ2VcbiAgICAvLyBpZiBhIGNpZCBpcyBub3Qgb24gdGhlIHBhZ2UsIHRoZSBvbmx5IHdheSBpdCBjYW4gYmUgYWRkZWQgYmFjayB0byB0aGUgcGFnZVxuICAgIC8vIGlzIGlmIGEgcGFyZW50IGFkZHMgaXQgYmFjaywgdGhlcmVmb3JlIGlmIGEgY2lkIGRvZXMgbm90IGV4aXN0IG9uIHRoZSBwYWdlLFxuICAgIC8vIHdlIHNob3VsZCBub3QgdHJ5IHRvIHJlbmRlciBpdCBieSBpdHNlbGYgKGJlY2F1c2UgaXQgd291bGQgYmUgcmVuZGVyZWQgdHdpY2UsXG4gICAgLy8gb25lIGJ5IHRoZSBwYXJlbnQsIGFuZCBhIHNlY29uZCB0aW1lIGJ5IGl0c2VsZilcbiAgICBsZXQgcGFyZW50Q2lkcyA9IG5ldyBTZXQoKVxuICAgIGxldCBjaGlsZHJlbkNpZHMgPSBuZXcgU2V0KClcblxuICAgIGNpZHMuZm9yRWFjaChjaWQgPT4ge1xuICAgICAgdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwobm9kZSwgYFske1BIWF9DT01QT05FTlR9PVwiJHtjaWR9XCJdYCksIG5vZGUpLmZvckVhY2gocGFyZW50ID0+IHtcbiAgICAgICAgcGFyZW50Q2lkcy5hZGQoY2lkKVxuICAgICAgICB0aGlzLmZpbHRlcldpdGhpblNhbWVMaXZlVmlldyh0aGlzLmFsbChwYXJlbnQsIGBbJHtQSFhfQ09NUE9ORU5UfV1gKSwgcGFyZW50KVxuICAgICAgICAgIC5tYXAoZWwgPT4gcGFyc2VJbnQoZWwuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpKSlcbiAgICAgICAgICAuZm9yRWFjaChjaGlsZENJRCA9PiBjaGlsZHJlbkNpZHMuYWRkKGNoaWxkQ0lEKSlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGNoaWxkcmVuQ2lkcy5mb3JFYWNoKGNoaWxkQ2lkID0+IHBhcmVudENpZHMuZGVsZXRlKGNoaWxkQ2lkKSlcblxuICAgIHJldHVybiBwYXJlbnRDaWRzXG4gIH0sXG5cbiAgZmlsdGVyV2l0aGluU2FtZUxpdmVWaWV3KG5vZGVzLCBwYXJlbnQpe1xuICAgIGlmKHBhcmVudC5xdWVyeVNlbGVjdG9yKFBIWF9WSUVXX1NFTEVDVE9SKSl7XG4gICAgICByZXR1cm4gbm9kZXMuZmlsdGVyKGVsID0+IHRoaXMud2l0aGluU2FtZUxpdmVWaWV3KGVsLCBwYXJlbnQpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbm9kZXNcbiAgICB9XG4gIH0sXG5cbiAgd2l0aGluU2FtZUxpdmVWaWV3KG5vZGUsIHBhcmVudCl7XG4gICAgd2hpbGUobm9kZSA9IG5vZGUucGFyZW50Tm9kZSl7XG4gICAgICBpZihub2RlLmlzU2FtZU5vZGUocGFyZW50KSl7IHJldHVybiB0cnVlIH1cbiAgICAgIGlmKG5vZGUuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKSAhPT0gbnVsbCl7IHJldHVybiBmYWxzZSB9XG4gICAgfVxuICB9LFxuXG4gIHByaXZhdGUoZWwsIGtleSl7IHJldHVybiBlbFtQSFhfUFJJVkFURV0gJiYgZWxbUEhYX1BSSVZBVEVdW2tleV0gfSxcblxuICBkZWxldGVQcml2YXRlKGVsLCBrZXkpeyBlbFtQSFhfUFJJVkFURV0gJiYgZGVsZXRlIChlbFtQSFhfUFJJVkFURV1ba2V5XSkgfSxcblxuICBwdXRQcml2YXRlKGVsLCBrZXksIHZhbHVlKXtcbiAgICBpZighZWxbUEhYX1BSSVZBVEVdKXsgZWxbUEhYX1BSSVZBVEVdID0ge30gfVxuICAgIGVsW1BIWF9QUklWQVRFXVtrZXldID0gdmFsdWVcbiAgfSxcblxuICB1cGRhdGVQcml2YXRlKGVsLCBrZXksIGRlZmF1bHRWYWwsIHVwZGF0ZUZ1bmMpe1xuICAgIGxldCBleGlzdGluZyA9IHRoaXMucHJpdmF0ZShlbCwga2V5KVxuICAgIGlmKGV4aXN0aW5nID09PSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBrZXksIHVwZGF0ZUZ1bmMoZGVmYXVsdFZhbCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHV0UHJpdmF0ZShlbCwga2V5LCB1cGRhdGVGdW5jKGV4aXN0aW5nKSlcbiAgICB9XG4gIH0sXG5cbiAgc3luY1BlbmRpbmdBdHRycyhmcm9tRWwsIHRvRWwpe1xuICAgIGlmKCFmcm9tRWwuaGFzQXR0cmlidXRlKFBIWF9SRUZfU1JDKSl7IHJldHVybiB9XG4gICAgUEhYX0VWRU5UX0NMQVNTRVMuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgZnJvbUVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpICYmIHRvRWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXG4gICAgfSlcbiAgICBQSFhfUEVORElOR19BVFRSUy5maWx0ZXIoYXR0ciA9PiBmcm9tRWwuaGFzQXR0cmlidXRlKGF0dHIpKS5mb3JFYWNoKGF0dHIgPT4ge1xuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoYXR0ciwgZnJvbUVsLmdldEF0dHJpYnV0ZShhdHRyKSlcbiAgICB9KVxuICB9LFxuXG4gIGNvcHlQcml2YXRlcyh0YXJnZXQsIHNvdXJjZSl7XG4gICAgaWYoc291cmNlW1BIWF9QUklWQVRFXSl7XG4gICAgICB0YXJnZXRbUEhYX1BSSVZBVEVdID0gc291cmNlW1BIWF9QUklWQVRFXVxuICAgIH1cbiAgfSxcblxuICBwdXRUaXRsZShzdHIpe1xuICAgIGxldCB0aXRsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRpdGxlXCIpXG4gICAgaWYodGl0bGVFbCl7XG4gICAgICBsZXQge3ByZWZpeCwgc3VmZml4LCBkZWZhdWx0OiBkZWZhdWx0VGl0bGV9ID0gdGl0bGVFbC5kYXRhc2V0XG4gICAgICBsZXQgaXNFbXB0eSA9IHR5cGVvZihzdHIpICE9PSBcInN0cmluZ1wiIHx8IHN0ci50cmltKCkgPT09IFwiXCJcbiAgICAgIGlmKGlzRW1wdHkgJiYgdHlwZW9mKGRlZmF1bHRUaXRsZSkgIT09IFwic3RyaW5nXCIpeyByZXR1cm4gfVxuXG4gICAgICBsZXQgaW5uZXIgPSBpc0VtcHR5ID8gZGVmYXVsdFRpdGxlIDogc3RyXG4gICAgICBkb2N1bWVudC50aXRsZSA9IGAke3ByZWZpeCB8fCBcIlwifSR7aW5uZXIgfHwgXCJcIn0ke3N1ZmZpeCB8fCBcIlwifWBcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQudGl0bGUgPSBzdHJcbiAgICB9XG4gIH0sXG5cbiAgZGVib3VuY2UoZWwsIGV2ZW50LCBwaHhEZWJvdW5jZSwgZGVmYXVsdERlYm91bmNlLCBwaHhUaHJvdHRsZSwgZGVmYXVsdFRocm90dGxlLCBhc3luY0ZpbHRlciwgY2FsbGJhY2spe1xuICAgIGxldCBkZWJvdW5jZSA9IGVsLmdldEF0dHJpYnV0ZShwaHhEZWJvdW5jZSlcbiAgICBsZXQgdGhyb3R0bGUgPSBlbC5nZXRBdHRyaWJ1dGUocGh4VGhyb3R0bGUpXG5cbiAgICBpZihkZWJvdW5jZSA9PT0gXCJcIil7IGRlYm91bmNlID0gZGVmYXVsdERlYm91bmNlIH1cbiAgICBpZih0aHJvdHRsZSA9PT0gXCJcIil7IHRocm90dGxlID0gZGVmYXVsdFRocm90dGxlIH1cbiAgICBsZXQgdmFsdWUgPSBkZWJvdW5jZSB8fCB0aHJvdHRsZVxuICAgIHN3aXRjaCh2YWx1ZSl7XG4gICAgICBjYXNlIG51bGw6IHJldHVybiBjYWxsYmFjaygpXG5cbiAgICAgIGNhc2UgXCJibHVyXCI6XG4gICAgICAgIHRoaXMuaW5jQ3ljbGUoZWwsIFwiZGVib3VuY2UtYmx1ci1jeWNsZVwiLCAoKSA9PiB7XG4gICAgICAgICAgaWYoYXN5bmNGaWx0ZXIoKSl7IGNhbGxiYWNrKCkgfVxuICAgICAgICB9KVxuICAgICAgICBpZih0aGlzLm9uY2UoZWwsIFwiZGVib3VuY2UtYmx1clwiKSl7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4gdGhpcy50cmlnZ2VyQ3ljbGUoZWwsIFwiZGVib3VuY2UtYmx1ci1jeWNsZVwiKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGV0IHRpbWVvdXQgPSBwYXJzZUludCh2YWx1ZSlcbiAgICAgICAgbGV0IHRyaWdnZXIgPSAoKSA9PiB0aHJvdHRsZSA/IHRoaXMuZGVsZXRlUHJpdmF0ZShlbCwgVEhST1RUTEVEKSA6IGNhbGxiYWNrKClcbiAgICAgICAgbGV0IGN1cnJlbnRDeWNsZSA9IHRoaXMuaW5jQ3ljbGUoZWwsIERFQk9VTkNFX1RSSUdHRVIsIHRyaWdnZXIpXG4gICAgICAgIGlmKGlzTmFOKHRpbWVvdXQpKXsgcmV0dXJuIGxvZ0Vycm9yKGBpbnZhbGlkIHRocm90dGxlL2RlYm91bmNlIHZhbHVlOiAke3ZhbHVlfWApIH1cbiAgICAgICAgaWYodGhyb3R0bGUpe1xuICAgICAgICAgIGxldCBuZXdLZXlEb3duID0gZmFsc2VcbiAgICAgICAgICBpZihldmVudC50eXBlID09PSBcImtleWRvd25cIil7XG4gICAgICAgICAgICBsZXQgcHJldktleSA9IHRoaXMucHJpdmF0ZShlbCwgREVCT1VOQ0VfUFJFVl9LRVkpXG4gICAgICAgICAgICB0aGlzLnB1dFByaXZhdGUoZWwsIERFQk9VTkNFX1BSRVZfS0VZLCBldmVudC5rZXkpXG4gICAgICAgICAgICBuZXdLZXlEb3duID0gcHJldktleSAhPT0gZXZlbnQua2V5XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIW5ld0tleURvd24gJiYgdGhpcy5wcml2YXRlKGVsLCBUSFJPVFRMRUQpKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICBjb25zdCB0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmKGFzeW5jRmlsdGVyKCkpeyB0aGlzLnRyaWdnZXJDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUikgfVxuICAgICAgICAgICAgfSwgdGltZW91dClcbiAgICAgICAgICAgIHRoaXMucHV0UHJpdmF0ZShlbCwgVEhST1RUTEVELCB0KVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmKGFzeW5jRmlsdGVyKCkpeyB0aGlzLnRyaWdnZXJDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUiwgY3VycmVudEN5Y2xlKSB9XG4gICAgICAgICAgfSwgdGltZW91dClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmb3JtID0gZWwuZm9ybVxuICAgICAgICBpZihmb3JtICYmIHRoaXMub25jZShmb3JtLCBcImJpbmQtZGVib3VuY2VcIikpe1xuICAgICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoKSA9PiB7XG4gICAgICAgICAgICBBcnJheS5mcm9tKChuZXcgRm9ybURhdGEoZm9ybSkpLmVudHJpZXMoKSwgKFtuYW1lXSkgPT4ge1xuICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoYFtuYW1lPVwiJHtuYW1lfVwiXWApXG4gICAgICAgICAgICAgIHRoaXMuaW5jQ3ljbGUoaW5wdXQsIERFQk9VTkNFX1RSSUdHRVIpXG4gICAgICAgICAgICAgIHRoaXMuZGVsZXRlUHJpdmF0ZShpbnB1dCwgVEhST1RUTEVEKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMub25jZShlbCwgXCJiaW5kLWRlYm91bmNlXCIpKXtcbiAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCAoKSA9PiB7XG4gICAgICAgICAgICAvLyBiZWNhdXNlIHdlIHRyaWdnZXIgdGhlIGNhbGxiYWNrIGhlcmUsXG4gICAgICAgICAgICAvLyB3ZSBhbHNvIGNsZWFyIHRoZSB0aHJvdHRsZSB0aW1lb3V0IHRvIHByZXZlbnQgdGhlIGNhbGxiYWNrXG4gICAgICAgICAgICAvLyBmcm9tIGJlaW5nIGNhbGxlZCBhZ2FpbiBhZnRlciB0aGUgdGltZW91dCBmaXJlc1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucHJpdmF0ZShlbCwgVEhST1RUTEVEKSlcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgdHJpZ2dlckN5Y2xlKGVsLCBrZXksIGN1cnJlbnRDeWNsZSl7XG4gICAgbGV0IFtjeWNsZSwgdHJpZ2dlcl0gPSB0aGlzLnByaXZhdGUoZWwsIGtleSlcbiAgICBpZighY3VycmVudEN5Y2xlKXsgY3VycmVudEN5Y2xlID0gY3ljbGUgfVxuICAgIGlmKGN1cnJlbnRDeWNsZSA9PT0gY3ljbGUpe1xuICAgICAgdGhpcy5pbmNDeWNsZShlbCwga2V5KVxuICAgICAgdHJpZ2dlcigpXG4gICAgfVxuICB9LFxuXG4gIG9uY2UoZWwsIGtleSl7XG4gICAgaWYodGhpcy5wcml2YXRlKGVsLCBrZXkpID09PSB0cnVlKXsgcmV0dXJuIGZhbHNlIH1cbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgdHJ1ZSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9LFxuXG4gIGluY0N5Y2xlKGVsLCBrZXksIHRyaWdnZXIgPSBmdW5jdGlvbiAoKXsgfSl7XG4gICAgbGV0IFtjdXJyZW50Q3ljbGVdID0gdGhpcy5wcml2YXRlKGVsLCBrZXkpIHx8IFswLCB0cmlnZ2VyXVxuICAgIGN1cnJlbnRDeWNsZSsrXG4gICAgdGhpcy5wdXRQcml2YXRlKGVsLCBrZXksIFtjdXJyZW50Q3ljbGUsIHRyaWdnZXJdKVxuICAgIHJldHVybiBjdXJyZW50Q3ljbGVcbiAgfSxcblxuICAvLyBtYWludGFpbnMgb3IgYWRkcyBwcml2YXRlbHkgdXNlZCBob29rIGluZm9ybWF0aW9uXG4gIC8vIGZyb21FbCBhbmQgdG9FbCBjYW4gYmUgdGhlIHNhbWUgZWxlbWVudCBpbiB0aGUgY2FzZSBvZiBhIG5ld2x5IGFkZGVkIG5vZGVcbiAgLy8gZnJvbUVsIGFuZCB0b0VsIGNhbiBiZSBhbnkgSFRNTCBub2RlIHR5cGUsIHNvIHdlIG5lZWQgdG8gY2hlY2sgaWYgaXQncyBhbiBlbGVtZW50IG5vZGVcbiAgbWFpbnRhaW5Qcml2YXRlSG9va3MoZnJvbUVsLCB0b0VsLCBwaHhWaWV3cG9ydFRvcCwgcGh4Vmlld3BvcnRCb3R0b20pe1xuICAgIC8vIG1haW50YWluIHRoZSBob29rcyBjcmVhdGVkIHdpdGggY3JlYXRlSG9va1xuICAgIGlmKGZyb21FbC5oYXNBdHRyaWJ1dGUgJiYgZnJvbUVsLmhhc0F0dHJpYnV0ZShcImRhdGEtcGh4LWhvb2tcIikgJiYgIXRvRWwuaGFzQXR0cmlidXRlKFwiZGF0YS1waHgtaG9va1wiKSl7XG4gICAgICB0b0VsLnNldEF0dHJpYnV0ZShcImRhdGEtcGh4LWhvb2tcIiwgZnJvbUVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWhvb2tcIikpXG4gICAgfVxuICAgIC8vIGFkZCBob29rcyB0byBlbGVtZW50cyB3aXRoIHZpZXdwb3J0IGF0dHJpYnV0ZXNcbiAgICBpZih0b0VsLmhhc0F0dHJpYnV0ZSAmJiAodG9FbC5oYXNBdHRyaWJ1dGUocGh4Vmlld3BvcnRUb3ApIHx8IHRvRWwuaGFzQXR0cmlidXRlKHBoeFZpZXdwb3J0Qm90dG9tKSkpe1xuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1ob29rXCIsIFwiUGhvZW5peC5JbmZpbml0ZVNjcm9sbFwiKVxuICAgIH1cbiAgfSxcblxuICBwdXRDdXN0b21FbEhvb2soZWwsIGhvb2spe1xuICAgIGlmKGVsLmlzQ29ubmVjdGVkKXtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRhdGEtcGh4LWhvb2tcIiwgXCJcIilcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihgXG4gICAgICAgIGhvb2sgYXR0YWNoZWQgdG8gbm9uLWNvbm5lY3RlZCBET00gZWxlbWVudFxuICAgICAgICBlbnN1cmUgeW91IGFyZSBjYWxsaW5nIGNyZWF0ZUhvb2sgd2l0aGluIHlvdXIgY29ubmVjdGVkQ2FsbGJhY2suICR7ZWwub3V0ZXJIVE1MfVxuICAgICAgYClcbiAgICB9XG4gICAgdGhpcy5wdXRQcml2YXRlKGVsLCBcImN1c3RvbS1lbC1ob29rXCIsIGhvb2spXG4gIH0sXG5cbiAgZ2V0Q3VzdG9tRWxIb29rKGVsKXsgcmV0dXJuIHRoaXMucHJpdmF0ZShlbCwgXCJjdXN0b20tZWwtaG9va1wiKSB9LFxuXG4gIGlzVXNlZElucHV0KGVsKXtcbiAgICByZXR1cm4gKGVsLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJlxuICAgICAgKHRoaXMucHJpdmF0ZShlbCwgUEhYX0hBU19GT0NVU0VEKSB8fCB0aGlzLnByaXZhdGUoZWwsIFBIWF9IQVNfU1VCTUlUVEVEKSkpXG4gIH0sXG5cbiAgcmVzZXRGb3JtKGZvcm0pe1xuICAgIEFycmF5LmZyb20oZm9ybS5lbGVtZW50cykuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICB0aGlzLmRlbGV0ZVByaXZhdGUoaW5wdXQsIFBIWF9IQVNfRk9DVVNFRClcbiAgICAgIHRoaXMuZGVsZXRlUHJpdmF0ZShpbnB1dCwgUEhYX0hBU19TVUJNSVRURUQpXG4gICAgfSlcbiAgfSxcblxuICBpc1BoeENoaWxkKG5vZGUpe1xuICAgIHJldHVybiBub2RlLmdldEF0dHJpYnV0ZSAmJiBub2RlLmdldEF0dHJpYnV0ZShQSFhfUEFSRU5UX0lEKVxuICB9LFxuXG4gIGlzUGh4U3RpY2t5KG5vZGUpe1xuICAgIHJldHVybiBub2RlLmdldEF0dHJpYnV0ZSAmJiBub2RlLmdldEF0dHJpYnV0ZShQSFhfU1RJQ0tZKSAhPT0gbnVsbFxuICB9LFxuXG4gIGlzQ2hpbGRPZkFueShlbCwgcGFyZW50cyl7XG4gICAgcmV0dXJuICEhcGFyZW50cy5maW5kKHBhcmVudCA9PiBwYXJlbnQuY29udGFpbnMoZWwpKVxuICB9LFxuXG4gIGZpcnN0UGh4Q2hpbGQoZWwpe1xuICAgIHJldHVybiB0aGlzLmlzUGh4Q2hpbGQoZWwpID8gZWwgOiB0aGlzLmFsbChlbCwgYFske1BIWF9QQVJFTlRfSUR9XWApWzBdXG4gIH0sXG5cbiAgZGlzcGF0Y2hFdmVudCh0YXJnZXQsIG5hbWUsIG9wdHMgPSB7fSl7XG4gICAgbGV0IGRlZmF1bHRCdWJibGUgPSB0cnVlXG4gICAgbGV0IGlzVXBsb2FkVGFyZ2V0ID0gdGFyZ2V0Lm5vZGVOYW1lID09PSBcIklOUFVUXCIgJiYgdGFyZ2V0LnR5cGUgPT09IFwiZmlsZVwiXG4gICAgaWYoaXNVcGxvYWRUYXJnZXQgJiYgbmFtZSA9PT0gXCJjbGlja1wiKXtcbiAgICAgIGRlZmF1bHRCdWJibGUgPSBmYWxzZVxuICAgIH1cbiAgICBsZXQgYnViYmxlcyA9IG9wdHMuYnViYmxlcyA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdEJ1YmJsZSA6ICEhb3B0cy5idWJibGVzXG4gICAgbGV0IGV2ZW50T3B0cyA9IHtidWJibGVzOiBidWJibGVzLCBjYW5jZWxhYmxlOiB0cnVlLCBkZXRhaWw6IG9wdHMuZGV0YWlsIHx8IHt9fVxuICAgIGxldCBldmVudCA9IG5hbWUgPT09IFwiY2xpY2tcIiA/IG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIiwgZXZlbnRPcHRzKSA6IG5ldyBDdXN0b21FdmVudChuYW1lLCBldmVudE9wdHMpXG4gICAgdGFyZ2V0LmRpc3BhdGNoRXZlbnQoZXZlbnQpXG4gIH0sXG5cbiAgY2xvbmVOb2RlKG5vZGUsIGh0bWwpe1xuICAgIGlmKHR5cGVvZiAoaHRtbCkgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgcmV0dXJuIG5vZGUuY2xvbmVOb2RlKHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjbG9uZWQgPSBub2RlLmNsb25lTm9kZShmYWxzZSlcbiAgICAgIGNsb25lZC5pbm5lckhUTUwgPSBodG1sXG4gICAgICByZXR1cm4gY2xvbmVkXG4gICAgfVxuICB9LFxuXG4gIC8vIG1lcmdlIGF0dHJpYnV0ZXMgZnJvbSBzb3VyY2UgdG8gdGFyZ2V0XG4gIC8vIGlmIGFuIGVsZW1lbnQgaXMgaWdub3JlZCwgd2Ugb25seSBtZXJnZSBkYXRhIGF0dHJpYnV0ZXNcbiAgLy8gaW5jbHVkaW5nIHJlbW92aW5nIGRhdGEgYXR0cmlidXRlcyB0aGF0IGFyZSBubyBsb25nZXIgaW4gdGhlIHNvdXJjZVxuICBtZXJnZUF0dHJzKHRhcmdldCwgc291cmNlLCBvcHRzID0ge30pe1xuICAgIGxldCBleGNsdWRlID0gbmV3IFNldChvcHRzLmV4Y2x1ZGUgfHwgW10pXG4gICAgbGV0IGlzSWdub3JlZCA9IG9wdHMuaXNJZ25vcmVkXG4gICAgbGV0IHNvdXJjZUF0dHJzID0gc291cmNlLmF0dHJpYnV0ZXNcbiAgICBmb3IobGV0IGkgPSBzb3VyY2VBdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICBsZXQgbmFtZSA9IHNvdXJjZUF0dHJzW2ldLm5hbWVcbiAgICAgIGlmKCFleGNsdWRlLmhhcyhuYW1lKSl7XG4gICAgICAgIGNvbnN0IHNvdXJjZVZhbHVlID0gc291cmNlLmdldEF0dHJpYnV0ZShuYW1lKVxuICAgICAgICBpZih0YXJnZXQuZ2V0QXR0cmlidXRlKG5hbWUpICE9PSBzb3VyY2VWYWx1ZSAmJiAoIWlzSWdub3JlZCB8fCAoaXNJZ25vcmVkICYmIG5hbWUuc3RhcnRzV2l0aChcImRhdGEtXCIpKSkpe1xuICAgICAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUobmFtZSwgc291cmNlVmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlIGV4Y2x1ZGUgdGhlIHZhbHVlIGZyb20gYmVpbmcgbWVyZ2VkIG9uIGZvY3VzZWQgaW5wdXRzLCBiZWNhdXNlIHRoZVxuICAgICAgICAvLyB1c2VyJ3MgaW5wdXQgc2hvdWxkIGFsd2F5cyB3aW4uXG4gICAgICAgIC8vIFdlIGNhbiBzdGlsbCBhc3NpZ24gaXQgYXMgbG9uZyBhcyB0aGUgdmFsdWUgcHJvcGVydHkgaXMgdGhlIHNhbWUsIHRob3VnaC5cbiAgICAgICAgLy8gVGhpcyBwcmV2ZW50cyBhIHNpdHVhdGlvbiB3aGVyZSB0aGUgdXBkYXRlZCBob29rIGlzIG5vdCBiZWluZyB0cmlnZ2VyZWRcbiAgICAgICAgLy8gd2hlbiBhbiBpbnB1dCBpcyBiYWNrIGluIGl0cyBcIm9yaWdpbmFsIHN0YXRlXCIsIGJlY2F1c2UgdGhlIGF0dHJpYnV0ZVxuICAgICAgICAvLyB3YXMgbmV2ZXIgY2hhbmdlZCwgc2VlOlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGhvZW5peGZyYW1ld29yay9waG9lbml4X2xpdmVfdmlldy9pc3N1ZXMvMjE2M1xuICAgICAgICBpZihuYW1lID09PSBcInZhbHVlXCIgJiYgdGFyZ2V0LnZhbHVlID09PSBzb3VyY2UudmFsdWUpe1xuICAgICAgICAgIC8vIGFjdHVhbGx5IHNldCB0aGUgdmFsdWUgYXR0cmlidXRlIHRvIHN5bmMgaXQgd2l0aCB0aGUgdmFsdWUgcHJvcGVydHlcbiAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc291cmNlLmdldEF0dHJpYnV0ZShuYW1lKSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB0YXJnZXRBdHRycyA9IHRhcmdldC5hdHRyaWJ1dGVzXG4gICAgZm9yKGxldCBpID0gdGFyZ2V0QXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgbGV0IG5hbWUgPSB0YXJnZXRBdHRyc1tpXS5uYW1lXG4gICAgICBpZihpc0lnbm9yZWQpe1xuICAgICAgICBpZihuYW1lLnN0YXJ0c1dpdGgoXCJkYXRhLVwiKSAmJiAhc291cmNlLmhhc0F0dHJpYnV0ZShuYW1lKSAmJiAhUEhYX1BFTkRJTkdfQVRUUlMuaW5jbHVkZXMobmFtZSkpeyB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKG5hbWUpIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCFzb3VyY2UuaGFzQXR0cmlidXRlKG5hbWUpKXsgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG1lcmdlRm9jdXNlZElucHV0KHRhcmdldCwgc291cmNlKXtcbiAgICAvLyBza2lwIHNlbGVjdHMgYmVjYXVzZSBGRiB3aWxsIHJlc2V0IGhpZ2hsaWdodGVkIGluZGV4IGZvciBhbnkgc2V0QXR0cmlidXRlXG4gICAgaWYoISh0YXJnZXQgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudCkpeyBET00ubWVyZ2VBdHRycyh0YXJnZXQsIHNvdXJjZSwge2V4Y2x1ZGU6IFtcInZhbHVlXCJdfSkgfVxuXG4gICAgaWYoc291cmNlLnJlYWRPbmx5KXtcbiAgICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoXCJyZWFkb25seVwiLCB0cnVlKVxuICAgIH0gZWxzZSB7XG4gICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKFwicmVhZG9ubHlcIilcbiAgICB9XG4gIH0sXG5cbiAgaGFzU2VsZWN0aW9uUmFuZ2UoZWwpe1xuICAgIHJldHVybiBlbC5zZXRTZWxlY3Rpb25SYW5nZSAmJiAoZWwudHlwZSA9PT0gXCJ0ZXh0XCIgfHwgZWwudHlwZSA9PT0gXCJ0ZXh0YXJlYVwiKVxuICB9LFxuXG4gIHJlc3RvcmVGb2N1cyhmb2N1c2VkLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKXtcbiAgICBpZihmb2N1c2VkIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpeyBmb2N1c2VkLmZvY3VzKCkgfVxuICAgIGlmKCFET00uaXNUZXh0dWFsSW5wdXQoZm9jdXNlZCkpeyByZXR1cm4gfVxuXG4gICAgbGV0IHdhc0ZvY3VzZWQgPSBmb2N1c2VkLm1hdGNoZXMoXCI6Zm9jdXNcIilcbiAgICBpZighd2FzRm9jdXNlZCl7IGZvY3VzZWQuZm9jdXMoKSB9XG4gICAgaWYodGhpcy5oYXNTZWxlY3Rpb25SYW5nZShmb2N1c2VkKSl7XG4gICAgICBmb2N1c2VkLnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpXG4gICAgfVxuICB9LFxuXG4gIGlzRm9ybUlucHV0KGVsKXsgcmV0dXJuIC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhKSQvaS50ZXN0KGVsLnRhZ05hbWUpICYmIGVsLnR5cGUgIT09IFwiYnV0dG9uXCIgfSxcblxuICBzeW5jQXR0cnNUb1Byb3BzKGVsKXtcbiAgICBpZihlbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgQ0hFQ0tBQkxFX0lOUFVUUy5pbmRleE9mKGVsLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSkgPj0gMCl7XG4gICAgICBlbC5jaGVja2VkID0gZWwuZ2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiKSAhPT0gbnVsbFxuICAgIH1cbiAgfSxcblxuICBpc1RleHR1YWxJbnB1dChlbCl7IHJldHVybiBGT0NVU0FCTEVfSU5QVVRTLmluZGV4T2YoZWwudHlwZSkgPj0gMCB9LFxuXG4gIGlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKXtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShwaHhUcmlnZ2VyRXh0ZXJuYWwpICE9PSBudWxsICYmIGRvY3VtZW50LmJvZHkuY29udGFpbnMoZWwpXG4gIH0sXG5cbiAgY2xlYW5DaGlsZE5vZGVzKGNvbnRhaW5lciwgcGh4VXBkYXRlKXtcbiAgICBpZihET00uaXNQaHhVcGRhdGUoY29udGFpbmVyLCBwaHhVcGRhdGUsIFtcImFwcGVuZFwiLCBcInByZXBlbmRcIiwgUEhYX1NUUkVBTV0pKXtcbiAgICAgIGxldCB0b1JlbW92ZSA9IFtdXG4gICAgICBjb250YWluZXIuY2hpbGROb2Rlcy5mb3JFYWNoKGNoaWxkTm9kZSA9PiB7XG4gICAgICAgIGlmKCFjaGlsZE5vZGUuaWQpe1xuICAgICAgICAgIC8vIFNraXAgd2FybmluZyBpZiBpdCdzIGFuIGVtcHR5IHRleHQgbm9kZSAoZS5nLiBhIG5ldy1saW5lKVxuICAgICAgICAgIGxldCBpc0VtcHR5VGV4dE5vZGUgPSBjaGlsZE5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIGNoaWxkTm9kZS5ub2RlVmFsdWUudHJpbSgpID09PSBcIlwiXG4gICAgICAgICAgaWYoIWlzRW1wdHlUZXh0Tm9kZSAmJiBjaGlsZE5vZGUubm9kZVR5cGUgIT09IE5vZGUuQ09NTUVOVF9OT0RFKXtcbiAgICAgICAgICAgIGxvZ0Vycm9yKFwib25seSBIVE1MIGVsZW1lbnQgdGFncyB3aXRoIGFuIGlkIGFyZSBhbGxvd2VkIGluc2lkZSBjb250YWluZXJzIHdpdGggcGh4LXVwZGF0ZS5cXG5cXG5cIiArXG4gICAgICAgICAgICAgIGByZW1vdmluZyBpbGxlZ2FsIG5vZGU6IFwiJHsoY2hpbGROb2RlLm91dGVySFRNTCB8fCBjaGlsZE5vZGUubm9kZVZhbHVlKS50cmltKCl9XCJcXG5cXG5gKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0b1JlbW92ZS5wdXNoKGNoaWxkTm9kZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRvUmVtb3ZlLmZvckVhY2goY2hpbGROb2RlID0+IGNoaWxkTm9kZS5yZW1vdmUoKSlcbiAgICB9XG4gIH0sXG5cbiAgcmVwbGFjZVJvb3RDb250YWluZXIoY29udGFpbmVyLCB0YWdOYW1lLCBhdHRycyl7XG4gICAgbGV0IHJldGFpbmVkQXR0cnMgPSBuZXcgU2V0KFtcImlkXCIsIFBIWF9TRVNTSU9OLCBQSFhfU1RBVElDLCBQSFhfTUFJTiwgUEhYX1JPT1RfSURdKVxuICAgIGlmKGNvbnRhaW5lci50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRhZ05hbWUudG9Mb3dlckNhc2UoKSl7XG4gICAgICBBcnJheS5mcm9tKGNvbnRhaW5lci5hdHRyaWJ1dGVzKVxuICAgICAgICAuZmlsdGVyKGF0dHIgPT4gIXJldGFpbmVkQXR0cnMuaGFzKGF0dHIubmFtZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgLmZvckVhY2goYXR0ciA9PiBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKGF0dHIubmFtZSkpXG5cbiAgICAgIE9iamVjdC5rZXlzKGF0dHJzKVxuICAgICAgICAuZmlsdGVyKG5hbWUgPT4gIXJldGFpbmVkQXR0cnMuaGFzKG5hbWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHIgPT4gY29udGFpbmVyLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyc1thdHRyXSkpXG5cbiAgICAgIHJldHVybiBjb250YWluZXJcblxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbmV3Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKVxuICAgICAgT2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goYXR0ciA9PiBuZXdDb250YWluZXIuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJzW2F0dHJdKSlcbiAgICAgIHJldGFpbmVkQXR0cnMuZm9yRWFjaChhdHRyID0+IG5ld0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYXR0ciwgY29udGFpbmVyLmdldEF0dHJpYnV0ZShhdHRyKSkpXG4gICAgICBuZXdDb250YWluZXIuaW5uZXJIVE1MID0gY29udGFpbmVyLmlubmVySFRNTFxuICAgICAgY29udGFpbmVyLnJlcGxhY2VXaXRoKG5ld0NvbnRhaW5lcilcbiAgICAgIHJldHVybiBuZXdDb250YWluZXJcbiAgICB9XG4gIH0sXG5cbiAgZ2V0U3RpY2t5KGVsLCBuYW1lLCBkZWZhdWx0VmFsKXtcbiAgICBsZXQgb3AgPSAoRE9NLnByaXZhdGUoZWwsIFwic3RpY2t5XCIpIHx8IFtdKS5maW5kKChbZXhpc3RpbmdOYW1lLF0pID0+IG5hbWUgPT09IGV4aXN0aW5nTmFtZSlcbiAgICBpZihvcCl7XG4gICAgICBsZXQgW19uYW1lLCBfb3AsIHN0YXNoZWRSZXN1bHRdID0gb3BcbiAgICAgIHJldHVybiBzdGFzaGVkUmVzdWx0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0eXBlb2YoZGVmYXVsdFZhbCkgPT09IFwiZnVuY3Rpb25cIiA/IGRlZmF1bHRWYWwoKSA6IGRlZmF1bHRWYWxcbiAgICB9XG4gIH0sXG5cbiAgZGVsZXRlU3RpY2t5KGVsLCBuYW1lKXtcbiAgICB0aGlzLnVwZGF0ZVByaXZhdGUoZWwsIFwic3RpY2t5XCIsIFtdLCBvcHMgPT4ge1xuICAgICAgcmV0dXJuIG9wcy5maWx0ZXIoKFtleGlzdGluZ05hbWUsIF9dKSA9PiBleGlzdGluZ05hbWUgIT09IG5hbWUpXG4gICAgfSlcbiAgfSxcblxuICBwdXRTdGlja3koZWwsIG5hbWUsIG9wKXtcbiAgICBsZXQgc3Rhc2hlZFJlc3VsdCA9IG9wKGVsKVxuICAgIHRoaXMudXBkYXRlUHJpdmF0ZShlbCwgXCJzdGlja3lcIiwgW10sIG9wcyA9PiB7XG4gICAgICBsZXQgZXhpc3RpbmdJbmRleCA9IG9wcy5maW5kSW5kZXgoKFtleGlzdGluZ05hbWUsXSkgPT4gbmFtZSA9PT0gZXhpc3RpbmdOYW1lKVxuICAgICAgaWYoZXhpc3RpbmdJbmRleCA+PSAwKXtcbiAgICAgICAgb3BzW2V4aXN0aW5nSW5kZXhdID0gW25hbWUsIG9wLCBzdGFzaGVkUmVzdWx0XVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BzLnB1c2goW25hbWUsIG9wLCBzdGFzaGVkUmVzdWx0XSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcHNcbiAgICB9KVxuICB9LFxuXG4gIGFwcGx5U3RpY2t5T3BlcmF0aW9ucyhlbCl7XG4gICAgbGV0IG9wcyA9IERPTS5wcml2YXRlKGVsLCBcInN0aWNreVwiKVxuICAgIGlmKCFvcHMpeyByZXR1cm4gfVxuXG4gICAgb3BzLmZvckVhY2goKFtuYW1lLCBvcCwgX3N0YXNoZWRdKSA9PiB0aGlzLnB1dFN0aWNreShlbCwgbmFtZSwgb3ApKVxuICB9LFxuXG4gIGlzTG9ja2VkKGVsKXtcbiAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlICYmIGVsLmhhc0F0dHJpYnV0ZShQSFhfUkVGX0xPQ0spXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRE9NXG4iLCAiaW1wb3J0IHtcbiAgUEhYX0FDVElWRV9FTlRSWV9SRUZTLFxuICBQSFhfTElWRV9GSUxFX1VQREFURUQsXG4gIFBIWF9QUkVGTElHSFRFRF9SRUZTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNoYW5uZWxVcGxvYWRlcixcbiAgbG9nRXJyb3Jcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgTGl2ZVVwbG9hZGVyIGZyb20gXCIuL2xpdmVfdXBsb2FkZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRFbnRyeSB7XG4gIHN0YXRpYyBpc0FjdGl2ZShmaWxlRWwsIGZpbGUpe1xuICAgIGxldCBpc05ldyA9IGZpbGUuX3BoeFJlZiA9PT0gdW5kZWZpbmVkXG4gICAgbGV0IGFjdGl2ZVJlZnMgPSBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9BQ1RJVkVfRU5UUllfUkVGUykuc3BsaXQoXCIsXCIpXG4gICAgbGV0IGlzQWN0aXZlID0gYWN0aXZlUmVmcy5pbmRleE9mKExpdmVVcGxvYWRlci5nZW5GaWxlUmVmKGZpbGUpKSA+PSAwXG4gICAgcmV0dXJuIGZpbGUuc2l6ZSA+IDAgJiYgKGlzTmV3IHx8IGlzQWN0aXZlKVxuICB9XG5cbiAgc3RhdGljIGlzUHJlZmxpZ2h0ZWQoZmlsZUVsLCBmaWxlKXtcbiAgICBsZXQgcHJlZmxpZ2h0ZWRSZWZzID0gZmlsZUVsLmdldEF0dHJpYnV0ZShQSFhfUFJFRkxJR0hURURfUkVGUykuc3BsaXQoXCIsXCIpXG4gICAgbGV0IGlzUHJlZmxpZ2h0ZWQgPSBwcmVmbGlnaHRlZFJlZnMuaW5kZXhPZihMaXZlVXBsb2FkZXIuZ2VuRmlsZVJlZihmaWxlKSkgPj0gMFxuICAgIHJldHVybiBpc1ByZWZsaWdodGVkICYmIHRoaXMuaXNBY3RpdmUoZmlsZUVsLCBmaWxlKVxuICB9XG5cbiAgc3RhdGljIGlzUHJlZmxpZ2h0SW5Qcm9ncmVzcyhmaWxlKXtcbiAgICByZXR1cm4gZmlsZS5fcHJlZmxpZ2h0SW5Qcm9ncmVzcyA9PT0gdHJ1ZVxuICB9XG5cbiAgc3RhdGljIG1hcmtQcmVmbGlnaHRJblByb2dyZXNzKGZpbGUpe1xuICAgIGZpbGUuX3ByZWZsaWdodEluUHJvZ3Jlc3MgPSB0cnVlXG4gIH1cblxuICBjb25zdHJ1Y3RvcihmaWxlRWwsIGZpbGUsIHZpZXcsIGF1dG9VcGxvYWQpe1xuICAgIHRoaXMucmVmID0gTGl2ZVVwbG9hZGVyLmdlbkZpbGVSZWYoZmlsZSlcbiAgICB0aGlzLmZpbGVFbCA9IGZpbGVFbFxuICAgIHRoaXMuZmlsZSA9IGZpbGVcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5tZXRhID0gbnVsbFxuICAgIHRoaXMuX2lzQ2FuY2VsbGVkID0gZmFsc2VcbiAgICB0aGlzLl9pc0RvbmUgPSBmYWxzZVxuICAgIHRoaXMuX3Byb2dyZXNzID0gMFxuICAgIHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQgPSAtMVxuICAgIHRoaXMuX29uRG9uZSA9IGZ1bmN0aW9uKCl7IH1cbiAgICB0aGlzLl9vbkVsVXBkYXRlZCA9IHRoaXMub25FbFVwZGF0ZWQuYmluZCh0aGlzKVxuICAgIHRoaXMuZmlsZUVsLmFkZEV2ZW50TGlzdGVuZXIoUEhYX0xJVkVfRklMRV9VUERBVEVELCB0aGlzLl9vbkVsVXBkYXRlZClcbiAgICB0aGlzLmF1dG9VcGxvYWQgPSBhdXRvVXBsb2FkXG4gIH1cblxuICBtZXRhZGF0YSgpeyByZXR1cm4gdGhpcy5tZXRhIH1cblxuICBwcm9ncmVzcyhwcm9ncmVzcyl7XG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHByb2dyZXNzKVxuICAgIGlmKHRoaXMuX3Byb2dyZXNzID4gdGhpcy5fbGFzdFByb2dyZXNzU2VudCl7XG4gICAgICBpZih0aGlzLl9wcm9ncmVzcyA+PSAxMDApe1xuICAgICAgICB0aGlzLl9wcm9ncmVzcyA9IDEwMFxuICAgICAgICB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50ID0gMTAwXG4gICAgICAgIHRoaXMuX2lzRG9uZSA9IHRydWVcbiAgICAgICAgdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsIHRoaXMucmVmLCAxMDAsICgpID0+IHtcbiAgICAgICAgICBMaXZlVXBsb2FkZXIudW50cmFja0ZpbGUodGhpcy5maWxlRWwsIHRoaXMuZmlsZSlcbiAgICAgICAgICB0aGlzLl9vbkRvbmUoKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbGFzdFByb2dyZXNzU2VudCA9IHRoaXMuX3Byb2dyZXNzXG4gICAgICAgIHRoaXMudmlldy5wdXNoRmlsZVByb2dyZXNzKHRoaXMuZmlsZUVsLCB0aGlzLnJlZiwgdGhpcy5fcHJvZ3Jlc3MpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNDYW5jZWxsZWQoKXsgcmV0dXJuIHRoaXMuX2lzQ2FuY2VsbGVkIH1cblxuICBjYW5jZWwoKXtcbiAgICB0aGlzLmZpbGUuX3ByZWZsaWdodEluUHJvZ3Jlc3MgPSBmYWxzZVxuICAgIHRoaXMuX2lzQ2FuY2VsbGVkID0gdHJ1ZVxuICAgIHRoaXMuX2lzRG9uZSA9IHRydWVcbiAgICB0aGlzLl9vbkRvbmUoKVxuICB9XG5cbiAgaXNEb25lKCl7IHJldHVybiB0aGlzLl9pc0RvbmUgfVxuXG4gIGVycm9yKHJlYXNvbiA9IFwiZmFpbGVkXCIpe1xuICAgIHRoaXMuZmlsZUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoUEhYX0xJVkVfRklMRV9VUERBVEVELCB0aGlzLl9vbkVsVXBkYXRlZClcbiAgICB0aGlzLnZpZXcucHVzaEZpbGVQcm9ncmVzcyh0aGlzLmZpbGVFbCwgdGhpcy5yZWYsIHtlcnJvcjogcmVhc29ufSlcbiAgICBpZighdGhpcy5pc0F1dG9VcGxvYWQoKSl7IExpdmVVcGxvYWRlci5jbGVhckZpbGVzKHRoaXMuZmlsZUVsKSB9XG4gIH1cblxuICBpc0F1dG9VcGxvYWQoKXsgcmV0dXJuIHRoaXMuYXV0b1VwbG9hZCB9XG5cbiAgLy9wcml2YXRlXG5cbiAgb25Eb25lKGNhbGxiYWNrKXtcbiAgICB0aGlzLl9vbkRvbmUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmZpbGVFbC5yZW1vdmVFdmVudExpc3RlbmVyKFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCwgdGhpcy5fb25FbFVwZGF0ZWQpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgb25FbFVwZGF0ZWQoKXtcbiAgICBsZXQgYWN0aXZlUmVmcyA9IHRoaXMuZmlsZUVsLmdldEF0dHJpYnV0ZShQSFhfQUNUSVZFX0VOVFJZX1JFRlMpLnNwbGl0KFwiLFwiKVxuICAgIGlmKGFjdGl2ZVJlZnMuaW5kZXhPZih0aGlzLnJlZikgPT09IC0xKXtcbiAgICAgIExpdmVVcGxvYWRlci51bnRyYWNrRmlsZSh0aGlzLmZpbGVFbCwgdGhpcy5maWxlKVxuICAgICAgdGhpcy5jYW5jZWwoKVxuICAgIH1cbiAgfVxuXG4gIHRvUHJlZmxpZ2h0UGF5bG9hZCgpe1xuICAgIHJldHVybiB7XG4gICAgICBsYXN0X21vZGlmaWVkOiB0aGlzLmZpbGUubGFzdE1vZGlmaWVkLFxuICAgICAgbmFtZTogdGhpcy5maWxlLm5hbWUsXG4gICAgICByZWxhdGl2ZV9wYXRoOiB0aGlzLmZpbGUud2Via2l0UmVsYXRpdmVQYXRoLFxuICAgICAgc2l6ZTogdGhpcy5maWxlLnNpemUsXG4gICAgICB0eXBlOiB0aGlzLmZpbGUudHlwZSxcbiAgICAgIHJlZjogdGhpcy5yZWYsXG4gICAgICBtZXRhOiB0eXBlb2YodGhpcy5maWxlLm1ldGEpID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLmZpbGUubWV0YSgpIDogdW5kZWZpbmVkXG4gICAgfVxuICB9XG5cbiAgdXBsb2FkZXIodXBsb2FkZXJzKXtcbiAgICBpZih0aGlzLm1ldGEudXBsb2FkZXIpe1xuICAgICAgbGV0IGNhbGxiYWNrID0gdXBsb2FkZXJzW3RoaXMubWV0YS51cGxvYWRlcl0gfHwgbG9nRXJyb3IoYG5vIHVwbG9hZGVyIGNvbmZpZ3VyZWQgZm9yICR7dGhpcy5tZXRhLnVwbG9hZGVyfWApXG4gICAgICByZXR1cm4ge25hbWU6IHRoaXMubWV0YS51cGxvYWRlciwgY2FsbGJhY2s6IGNhbGxiYWNrfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge25hbWU6IFwiY2hhbm5lbFwiLCBjYWxsYmFjazogY2hhbm5lbFVwbG9hZGVyfVxuICAgIH1cbiAgfVxuXG4gIHppcFBvc3RGbGlnaHQocmVzcCl7XG4gICAgdGhpcy5tZXRhID0gcmVzcC5lbnRyaWVzW3RoaXMucmVmXVxuICAgIGlmKCF0aGlzLm1ldGEpeyBsb2dFcnJvcihgbm8gcHJlZmxpZ2h0IHVwbG9hZCByZXNwb25zZSByZXR1cm5lZCB3aXRoIHJlZiAke3RoaXMucmVmfWAsIHtpbnB1dDogdGhpcy5maWxlRWwsIHJlc3BvbnNlOiByZXNwfSkgfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgUEhYX0RPTkVfUkVGUyxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlMsXG4gIFBIWF9VUExPQURfUkVGXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IFVwbG9hZEVudHJ5IGZyb20gXCIuL3VwbG9hZF9lbnRyeVwiXG5cbmxldCBsaXZlVXBsb2FkZXJGaWxlUmVmID0gMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXZlVXBsb2FkZXIge1xuICBzdGF0aWMgZ2VuRmlsZVJlZihmaWxlKXtcbiAgICBsZXQgcmVmID0gZmlsZS5fcGh4UmVmXG4gICAgaWYocmVmICE9PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIHJlZlxuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlLl9waHhSZWYgPSAobGl2ZVVwbG9hZGVyRmlsZVJlZisrKS50b1N0cmluZygpXG4gICAgICByZXR1cm4gZmlsZS5fcGh4UmVmXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEVudHJ5RGF0YVVSTChpbnB1dEVsLCByZWYsIGNhbGxiYWNrKXtcbiAgICBsZXQgZmlsZSA9IHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbCkuZmluZChmaWxlID0+IHRoaXMuZ2VuRmlsZVJlZihmaWxlKSA9PT0gcmVmKVxuICAgIGNhbGxiYWNrKFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkpXG4gIH1cblxuICBzdGF0aWMgaGFzVXBsb2Fkc0luUHJvZ3Jlc3MoZm9ybUVsKXtcbiAgICBsZXQgYWN0aXZlID0gMFxuICAgIERPTS5maW5kVXBsb2FkSW5wdXRzKGZvcm1FbCkuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpZihpbnB1dC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpICE9PSBpbnB1dC5nZXRBdHRyaWJ1dGUoUEhYX0RPTkVfUkVGUykpe1xuICAgICAgICBhY3RpdmUrK1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGFjdGl2ZSA+IDBcbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemVVcGxvYWRzKGlucHV0RWwpe1xuICAgIGxldCBmaWxlcyA9IHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbClcbiAgICBsZXQgZmlsZURhdGEgPSB7fVxuICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBsZXQgZW50cnkgPSB7cGF0aDogaW5wdXRFbC5uYW1lfVxuICAgICAgbGV0IHVwbG9hZFJlZiA9IGlucHV0RWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKVxuICAgICAgZmlsZURhdGFbdXBsb2FkUmVmXSA9IGZpbGVEYXRhW3VwbG9hZFJlZl0gfHwgW11cbiAgICAgIGVudHJ5LnJlZiA9IHRoaXMuZ2VuRmlsZVJlZihmaWxlKVxuICAgICAgZW50cnkubGFzdF9tb2RpZmllZCA9IGZpbGUubGFzdE1vZGlmaWVkXG4gICAgICBlbnRyeS5uYW1lID0gZmlsZS5uYW1lIHx8IGVudHJ5LnJlZlxuICAgICAgZW50cnkucmVsYXRpdmVfcGF0aCA9IGZpbGUud2Via2l0UmVsYXRpdmVQYXRoXG4gICAgICBlbnRyeS50eXBlID0gZmlsZS50eXBlXG4gICAgICBlbnRyeS5zaXplID0gZmlsZS5zaXplXG4gICAgICBpZih0eXBlb2YoZmlsZS5tZXRhKSA9PT0gXCJmdW5jdGlvblwiKXsgZW50cnkubWV0YSA9IGZpbGUubWV0YSgpIH1cbiAgICAgIGZpbGVEYXRhW3VwbG9hZFJlZl0ucHVzaChlbnRyeSlcbiAgICB9KVxuICAgIHJldHVybiBmaWxlRGF0YVxuICB9XG5cbiAgc3RhdGljIGNsZWFyRmlsZXMoaW5wdXRFbCl7XG4gICAgaW5wdXRFbC52YWx1ZSA9IG51bGxcbiAgICBpbnB1dEVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRilcbiAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIFtdKVxuICB9XG5cbiAgc3RhdGljIHVudHJhY2tGaWxlKGlucHV0RWwsIGZpbGUpe1xuICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgRE9NLnByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiKS5maWx0ZXIoZiA9PiAhT2JqZWN0LmlzKGYsIGZpbGUpKSlcbiAgfVxuXG4gIHN0YXRpYyB0cmFja0ZpbGVzKGlucHV0RWwsIGZpbGVzLCBkYXRhVHJhbnNmZXIpe1xuICAgIGlmKGlucHV0RWwuZ2V0QXR0cmlidXRlKFwibXVsdGlwbGVcIikgIT09IG51bGwpe1xuICAgICAgbGV0IG5ld0ZpbGVzID0gZmlsZXMuZmlsdGVyKGZpbGUgPT4gIXRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbCkuZmluZChmID0+IE9iamVjdC5pcyhmLCBmaWxlKSkpXG4gICAgICBET00udXBkYXRlUHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIFtdLCAoZXhpc3RpbmcpID0+IGV4aXN0aW5nLmNvbmNhdChuZXdGaWxlcykpXG4gICAgICBpbnB1dEVsLnZhbHVlID0gbnVsbFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZXNldCBpbnB1dEVsIGZpbGVzIHRvIGFsaWduIG91dHB1dCB3aXRoIHByb2dyYW1tYXRpYyBjaGFuZ2VzIChpLmUuIGRyYWcgYW5kIGRyb3ApXG4gICAgICBpZihkYXRhVHJhbnNmZXIgJiYgZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aCA+IDApeyBpbnB1dEVsLmZpbGVzID0gZGF0YVRyYW5zZmVyLmZpbGVzIH1cbiAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgZmlsZXMpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFjdGl2ZUZpbGVJbnB1dHMoZm9ybUVsKXtcbiAgICBsZXQgZmlsZUlucHV0cyA9IERPTS5maW5kVXBsb2FkSW5wdXRzKGZvcm1FbClcbiAgICByZXR1cm4gQXJyYXkuZnJvbShmaWxlSW5wdXRzKS5maWx0ZXIoZWwgPT4gZWwuZmlsZXMgJiYgdGhpcy5hY3RpdmVGaWxlcyhlbCkubGVuZ3RoID4gMClcbiAgfVxuXG4gIHN0YXRpYyBhY3RpdmVGaWxlcyhpbnB1dCl7XG4gICAgcmV0dXJuIChET00ucHJpdmF0ZShpbnB1dCwgXCJmaWxlc1wiKSB8fCBbXSkuZmlsdGVyKGYgPT4gVXBsb2FkRW50cnkuaXNBY3RpdmUoaW5wdXQsIGYpKVxuICB9XG5cbiAgc3RhdGljIGlucHV0c0F3YWl0aW5nUHJlZmxpZ2h0KGZvcm1FbCl7XG4gICAgbGV0IGZpbGVJbnB1dHMgPSBET00uZmluZFVwbG9hZElucHV0cyhmb3JtRWwpXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZmlsZUlucHV0cykuZmlsdGVyKGlucHV0ID0+IHRoaXMuZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dCkubGVuZ3RoID4gMClcbiAgfVxuXG4gIHN0YXRpYyBmaWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0KXtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVGaWxlcyhpbnB1dCkuZmlsdGVyKGYgPT4gIVVwbG9hZEVudHJ5LmlzUHJlZmxpZ2h0ZWQoaW5wdXQsIGYpICYmICFVcGxvYWRFbnRyeS5pc1ByZWZsaWdodEluUHJvZ3Jlc3MoZikpXG4gIH1cblxuICBzdGF0aWMgbWFya1ByZWZsaWdodEluUHJvZ3Jlc3MoZW50cmllcyl7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IFVwbG9hZEVudHJ5Lm1hcmtQcmVmbGlnaHRJblByb2dyZXNzKGVudHJ5LmZpbGUpKVxuICB9XG5cbiAgY29uc3RydWN0b3IoaW5wdXRFbCwgdmlldywgb25Db21wbGV0ZSl7XG4gICAgdGhpcy5hdXRvVXBsb2FkID0gRE9NLmlzQXV0b1VwbG9hZChpbnB1dEVsKVxuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBvbkNvbXBsZXRlXG4gICAgdGhpcy5fZW50cmllcyA9XG4gICAgICBBcnJheS5mcm9tKExpdmVVcGxvYWRlci5maWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0RWwpIHx8IFtdKVxuICAgICAgICAubWFwKGZpbGUgPT4gbmV3IFVwbG9hZEVudHJ5KGlucHV0RWwsIGZpbGUsIHZpZXcsIHRoaXMuYXV0b1VwbG9hZCkpXG5cbiAgICAvLyBwcmV2ZW50IHNlbmRpbmcgZHVwbGljYXRlIHByZWZsaWdodCByZXF1ZXN0c1xuICAgIExpdmVVcGxvYWRlci5tYXJrUHJlZmxpZ2h0SW5Qcm9ncmVzcyh0aGlzLl9lbnRyaWVzKVxuXG4gICAgdGhpcy5udW1FbnRyaWVzSW5Qcm9ncmVzcyA9IHRoaXMuX2VudHJpZXMubGVuZ3RoXG4gIH1cblxuICBpc0F1dG9VcGxvYWQoKXsgcmV0dXJuIHRoaXMuYXV0b1VwbG9hZCB9XG5cbiAgZW50cmllcygpeyByZXR1cm4gdGhpcy5fZW50cmllcyB9XG5cbiAgaW5pdEFkYXB0ZXJVcGxvYWQocmVzcCwgb25FcnJvciwgbGl2ZVNvY2tldCl7XG4gICAgdGhpcy5fZW50cmllcyA9XG4gICAgICB0aGlzLl9lbnRyaWVzLm1hcChlbnRyeSA9PiB7XG4gICAgICAgIGlmKGVudHJ5LmlzQ2FuY2VsbGVkKCkpe1xuICAgICAgICAgIHRoaXMubnVtRW50cmllc0luUHJvZ3Jlc3MtLVxuICAgICAgICAgIGlmKHRoaXMubnVtRW50cmllc0luUHJvZ3Jlc3MgPT09IDApeyB0aGlzLm9uQ29tcGxldGUoKSB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW50cnkuemlwUG9zdEZsaWdodChyZXNwKVxuICAgICAgICAgIGVudHJ5Lm9uRG9uZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm51bUVudHJpZXNJblByb2dyZXNzLS1cbiAgICAgICAgICAgIGlmKHRoaXMubnVtRW50cmllc0luUHJvZ3Jlc3MgPT09IDApeyB0aGlzLm9uQ29tcGxldGUoKSB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW50cnlcbiAgICAgIH0pXG5cbiAgICBsZXQgZ3JvdXBlZEVudHJpZXMgPSB0aGlzLl9lbnRyaWVzLnJlZHVjZSgoYWNjLCBlbnRyeSkgPT4ge1xuICAgICAgaWYoIWVudHJ5Lm1ldGEpeyByZXR1cm4gYWNjIH1cbiAgICAgIGxldCB7bmFtZSwgY2FsbGJhY2t9ID0gZW50cnkudXBsb2FkZXIobGl2ZVNvY2tldC51cGxvYWRlcnMpXG4gICAgICBhY2NbbmFtZV0gPSBhY2NbbmFtZV0gfHwge2NhbGxiYWNrOiBjYWxsYmFjaywgZW50cmllczogW119XG4gICAgICBhY2NbbmFtZV0uZW50cmllcy5wdXNoKGVudHJ5KVxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0sIHt9KVxuXG4gICAgZm9yKGxldCBuYW1lIGluIGdyb3VwZWRFbnRyaWVzKXtcbiAgICAgIGxldCB7Y2FsbGJhY2ssIGVudHJpZXN9ID0gZ3JvdXBlZEVudHJpZXNbbmFtZV1cbiAgICAgIGNhbGxiYWNrKGVudHJpZXMsIG9uRXJyb3IsIHJlc3AsIGxpdmVTb2NrZXQpXG4gICAgfVxuICB9XG59XG4iLCAibGV0IEFSSUEgPSB7XG4gIGFueU9mKGluc3RhbmNlLCBjbGFzc2VzKXsgcmV0dXJuIGNsYXNzZXMuZmluZChuYW1lID0+IGluc3RhbmNlIGluc3RhbmNlb2YgbmFtZSkgfSxcblxuICBpc0ZvY3VzYWJsZShlbCwgaW50ZXJhY3RpdmVPbmx5KXtcbiAgICByZXR1cm4gKFxuICAgICAgKGVsIGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgJiYgZWwucmVsICE9PSBcImlnbm9yZVwiKSB8fFxuICAgICAgKGVsIGluc3RhbmNlb2YgSFRNTEFyZWFFbGVtZW50ICYmIGVsLmhyZWYgIT09IHVuZGVmaW5lZCkgfHxcbiAgICAgICghZWwuZGlzYWJsZWQgJiYgKHRoaXMuYW55T2YoZWwsIFtIVE1MSW5wdXRFbGVtZW50LCBIVE1MU2VsZWN0RWxlbWVudCwgSFRNTFRleHRBcmVhRWxlbWVudCwgSFRNTEJ1dHRvbkVsZW1lbnRdKSkpIHx8XG4gICAgICAoZWwgaW5zdGFuY2VvZiBIVE1MSUZyYW1lRWxlbWVudCkgfHxcbiAgICAgICgoZWwudGFiSW5kZXggPj0gMCAmJiBlbC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiKSAhPT0gXCJ0cnVlXCIpIHx8ICghaW50ZXJhY3RpdmVPbmx5ICYmIGVsLmdldEF0dHJpYnV0ZShcInRhYmluZGV4XCIpICE9PSBudWxsICYmIGVsLmdldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIpICE9PSBcInRydWVcIikpXG4gICAgKVxuICB9LFxuXG4gIGF0dGVtcHRGb2N1cyhlbCwgaW50ZXJhY3RpdmVPbmx5KXtcbiAgICBpZih0aGlzLmlzRm9jdXNhYmxlKGVsLCBpbnRlcmFjdGl2ZU9ubHkpKXsgdHJ5IHsgZWwuZm9jdXMoKSB9IGNhdGNoIHt9IH1cbiAgICByZXR1cm4gISFkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShlbClcbiAgfSxcblxuICBmb2N1c0ZpcnN0SW50ZXJhY3RpdmUoZWwpe1xuICAgIGxldCBjaGlsZCA9IGVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgd2hpbGUoY2hpbGQpe1xuICAgICAgaWYodGhpcy5hdHRlbXB0Rm9jdXMoY2hpbGQsIHRydWUpIHx8IHRoaXMuZm9jdXNGaXJzdEludGVyYWN0aXZlKGNoaWxkLCB0cnVlKSl7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBjaGlsZCA9IGNoaWxkLm5leHRFbGVtZW50U2libGluZ1xuICAgIH1cbiAgfSxcblxuICBmb2N1c0ZpcnN0KGVsKXtcbiAgICBsZXQgY2hpbGQgPSBlbC5maXJzdEVsZW1lbnRDaGlsZFxuICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgIGlmKHRoaXMuYXR0ZW1wdEZvY3VzKGNoaWxkKSB8fCB0aGlzLmZvY3VzRmlyc3QoY2hpbGQpKXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGNoaWxkID0gY2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgfVxuICB9LFxuXG4gIGZvY3VzTGFzdChlbCl7XG4gICAgbGV0IGNoaWxkID0gZWwubGFzdEVsZW1lbnRDaGlsZFxuICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgIGlmKHRoaXMuYXR0ZW1wdEZvY3VzKGNoaWxkKSB8fCB0aGlzLmZvY3VzTGFzdChjaGlsZCkpe1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgY2hpbGQgPSBjaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBBUklBXG4iLCAiaW1wb3J0IHtcbiAgUEhYX0FDVElWRV9FTlRSWV9SRUZTLFxuICBQSFhfTElWRV9GSUxFX1VQREFURUQsXG4gIFBIWF9QUkVGTElHSFRFRF9SRUZTLFxuICBQSFhfVVBMT0FEX1JFRlxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgTGl2ZVVwbG9hZGVyIGZyb20gXCIuL2xpdmVfdXBsb2FkZXJcIlxuaW1wb3J0IEFSSUEgZnJvbSBcIi4vYXJpYVwiXG5cbmxldCBIb29rcyA9IHtcbiAgTGl2ZUZpbGVVcGxvYWQ6IHtcbiAgICBhY3RpdmVSZWZzKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfQUNUSVZFX0VOVFJZX1JFRlMpIH0sXG5cbiAgICBwcmVmbGlnaHRlZFJlZnMoKXsgcmV0dXJuIHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9QUkVGTElHSFRFRF9SRUZTKSB9LFxuXG4gICAgbW91bnRlZCgpeyB0aGlzLnByZWZsaWdodGVkV2FzID0gdGhpcy5wcmVmbGlnaHRlZFJlZnMoKSB9LFxuXG4gICAgdXBkYXRlZCgpe1xuICAgICAgbGV0IG5ld1ByZWZsaWdodHMgPSB0aGlzLnByZWZsaWdodGVkUmVmcygpXG4gICAgICBpZih0aGlzLnByZWZsaWdodGVkV2FzICE9PSBuZXdQcmVmbGlnaHRzKXtcbiAgICAgICAgdGhpcy5wcmVmbGlnaHRlZFdhcyA9IG5ld1ByZWZsaWdodHNcbiAgICAgICAgaWYobmV3UHJlZmxpZ2h0cyA9PT0gXCJcIil7XG4gICAgICAgICAgdGhpcy5fX3ZpZXcoKS5jYW5jZWxTdWJtaXQodGhpcy5lbC5mb3JtKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuYWN0aXZlUmVmcygpID09PSBcIlwiKXsgdGhpcy5lbC52YWx1ZSA9IG51bGwgfVxuICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChQSFhfTElWRV9GSUxFX1VQREFURUQpKVxuICAgIH1cbiAgfSxcblxuICBMaXZlSW1nUHJldmlldzoge1xuICAgIG1vdW50ZWQoKXtcbiAgICAgIHRoaXMucmVmID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1lbnRyeS1yZWZcIilcbiAgICAgIHRoaXMuaW5wdXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSlcbiAgICAgIExpdmVVcGxvYWRlci5nZXRFbnRyeURhdGFVUkwodGhpcy5pbnB1dEVsLCB0aGlzLnJlZiwgdXJsID0+IHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmxcbiAgICAgICAgdGhpcy5lbC5zcmMgPSB1cmxcbiAgICAgIH0pXG4gICAgfSxcbiAgICBkZXN0cm95ZWQoKXtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy51cmwpXG4gICAgfVxuICB9LFxuICBGb2N1c1dyYXA6IHtcbiAgICBtb3VudGVkKCl7XG4gICAgICB0aGlzLmZvY3VzU3RhcnQgPSB0aGlzLmVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgICB0aGlzLmZvY3VzRW5kID0gdGhpcy5lbC5sYXN0RWxlbWVudENoaWxkXG4gICAgICB0aGlzLmZvY3VzU3RhcnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIChlKSA9PiB7XG4gICAgICAgIGlmKCFlLnJlbGF0ZWRUYXJnZXQgfHwgIXRoaXMuZWwuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSl7IFxuICAgICAgICAgIC8vIEhhbmRsZSBmb2N1cyBlbnRlcmluZyBmcm9tIG91dHNpZGUgKGUuZy4gVGFiIHdoZW4gYm9keSBpcyBmb2N1c2VkKVxuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXhfbGl2ZV92aWV3L2lzc3Vlcy8zNjM2XG4gICAgICAgICAgY29uc3QgbmV4dEZvY3VzID0gZS50YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgICAgICAgQVJJQS5hdHRlbXB0Rm9jdXMobmV4dEZvY3VzKSB8fCBBUklBLmZvY3VzRmlyc3QobmV4dEZvY3VzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEFSSUEuZm9jdXNMYXN0KHRoaXMuZWwpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLmZvY3VzRW5kLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoZSkgPT4ge1xuICAgICAgICBpZighZS5yZWxhdGVkVGFyZ2V0IHx8ICF0aGlzLmVsLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpeyBcbiAgICAgICAgICAvLyBIYW5kbGUgZm9jdXMgZW50ZXJpbmcgZnJvbSBvdXRzaWRlIChlLmcuIFNoaWZ0K1RhYiB3aGVuIGJvZHkgaXMgZm9jdXNlZClcbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vcGhvZW5peGZyYW1ld29yay9waG9lbml4X2xpdmVfdmlldy9pc3N1ZXMvMzYzNlxuICAgICAgICAgIGNvbnN0IG5leHRGb2N1cyA9IGUudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmdcbiAgICAgICAgICBBUklBLmF0dGVtcHRGb2N1cyhuZXh0Rm9jdXMpIHx8IEFSSUEuZm9jdXNMYXN0KG5leHRGb2N1cylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBBUklBLmZvY3VzRmlyc3QodGhpcy5lbClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihcInBoeDpzaG93LWVuZFwiLCAoKSA9PiB0aGlzLmVsLmZvY3VzKCkpXG4gICAgICBpZih3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsKS5kaXNwbGF5ICE9PSBcIm5vbmVcIil7XG4gICAgICAgIEFSSUEuZm9jdXNGaXJzdCh0aGlzLmVsKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5sZXQgZmluZFNjcm9sbENvbnRhaW5lciA9IChlbCkgPT4ge1xuICAvLyB0aGUgc2Nyb2xsIGV2ZW50IHdvbid0IGJlIGZpcmVkIG9uIHRoZSBodG1sL2JvZHkgZWxlbWVudCBldmVuIGlmIG92ZXJmbG93IGlzIHNldFxuICAvLyB0aGVyZWZvcmUgd2UgcmV0dXJuIG51bGwgdG8gaW5zdGVhZCBsaXN0ZW4gZm9yIHNjcm9sbCBldmVudHMgb24gZG9jdW1lbnRcbiAgaWYoW1wiSFRNTFwiLCBcIkJPRFlcIl0uaW5kZXhPZihlbC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpKSA+PSAwKSByZXR1cm4gbnVsbFxuICBpZihbXCJzY3JvbGxcIiwgXCJhdXRvXCJdLmluZGV4T2YoZ2V0Q29tcHV0ZWRTdHlsZShlbCkub3ZlcmZsb3dZKSA+PSAwKSByZXR1cm4gZWxcbiAgcmV0dXJuIGZpbmRTY3JvbGxDb250YWluZXIoZWwucGFyZW50RWxlbWVudClcbn1cblxubGV0IHNjcm9sbFRvcCA9IChzY3JvbGxDb250YWluZXIpID0+IHtcbiAgaWYoc2Nyb2xsQ29udGFpbmVyKXtcbiAgICByZXR1cm4gc2Nyb2xsQ29udGFpbmVyLnNjcm9sbFRvcFxuICB9IGVsc2Uge1xuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wXG4gIH1cbn1cblxubGV0IGJvdHRvbSA9IChzY3JvbGxDb250YWluZXIpID0+IHtcbiAgaWYoc2Nyb2xsQ29udGFpbmVyKXtcbiAgICByZXR1cm4gc2Nyb2xsQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmJvdHRvbVxuICB9IGVsc2Uge1xuICAgIC8vIHdoZW4gd2UgaGF2ZSBubyBjb250YWluZXIsIHRoZSB3aG9sZSBwYWdlIHNjcm9sbHMsXG4gICAgLy8gdGhlcmVmb3JlIHRoZSBib3R0b20gY29vcmRpbmF0ZSBpcyB0aGUgdmlld3BvcnQgaGVpZ2h0XG4gICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gIH1cbn1cblxubGV0IHRvcCA9IChzY3JvbGxDb250YWluZXIpID0+IHtcbiAgaWYoc2Nyb2xsQ29udGFpbmVyKXtcbiAgICByZXR1cm4gc2Nyb2xsQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcFxuICB9IGVsc2Uge1xuICAgIC8vIHdoZW4gd2UgaGF2ZSBubyBjb250YWluZXIgdGhlIHdob2xlIHBhZ2Ugc2Nyb2xscyxcbiAgICAvLyB0aGVyZWZvcmUgdGhlIHRvcCBjb29yZGluYXRlIGlzIDBcbiAgICByZXR1cm4gMFxuICB9XG59XG5cbmxldCBpc0F0Vmlld3BvcnRUb3AgPSAoZWwsIHNjcm9sbENvbnRhaW5lcikgPT4ge1xuICBsZXQgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIHJldHVybiBNYXRoLmNlaWwocmVjdC50b3ApID49IHRvcChzY3JvbGxDb250YWluZXIpICYmIE1hdGguY2VpbChyZWN0LmxlZnQpID49IDAgJiYgTWF0aC5mbG9vcihyZWN0LnRvcCkgPD0gYm90dG9tKHNjcm9sbENvbnRhaW5lcilcbn1cblxubGV0IGlzQXRWaWV3cG9ydEJvdHRvbSA9IChlbCwgc2Nyb2xsQ29udGFpbmVyKSA9PiB7XG4gIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgcmV0dXJuIE1hdGguY2VpbChyZWN0LmJvdHRvbSkgPj0gdG9wKHNjcm9sbENvbnRhaW5lcikgJiYgTWF0aC5jZWlsKHJlY3QubGVmdCkgPj0gMCAmJiBNYXRoLmZsb29yKHJlY3QuYm90dG9tKSA8PSBib3R0b20oc2Nyb2xsQ29udGFpbmVyKVxufVxuXG5sZXQgaXNXaXRoaW5WaWV3cG9ydCA9IChlbCwgc2Nyb2xsQ29udGFpbmVyKSA9PiB7XG4gIGxldCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgcmV0dXJuIE1hdGguY2VpbChyZWN0LnRvcCkgPj0gdG9wKHNjcm9sbENvbnRhaW5lcikgJiYgTWF0aC5jZWlsKHJlY3QubGVmdCkgPj0gMCAmJiBNYXRoLmZsb29yKHJlY3QudG9wKSA8PSBib3R0b20oc2Nyb2xsQ29udGFpbmVyKVxufVxuXG5Ib29rcy5JbmZpbml0ZVNjcm9sbCA9IHtcbiAgbW91bnRlZCgpe1xuICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyID0gZmluZFNjcm9sbENvbnRhaW5lcih0aGlzLmVsKVxuICAgIGxldCBzY3JvbGxCZWZvcmUgPSBzY3JvbGxUb3AodGhpcy5zY3JvbGxDb250YWluZXIpXG4gICAgbGV0IHRvcE92ZXJyYW4gPSBmYWxzZVxuICAgIGxldCB0aHJvdHRsZUludGVydmFsID0gNTAwXG4gICAgbGV0IHBlbmRpbmdPcCA9IG51bGxcblxuICAgIGxldCBvblRvcE92ZXJydW4gPSB0aGlzLnRocm90dGxlKHRocm90dGxlSW50ZXJ2YWwsICh0b3BFdmVudCwgZmlyc3RDaGlsZCkgPT4ge1xuICAgICAgcGVuZGluZ09wID0gKCkgPT4gdHJ1ZVxuICAgICAgdGhpcy5saXZlU29ja2V0LmV4ZWNKU0hvb2tQdXNoKHRoaXMuZWwsIHRvcEV2ZW50LCB7aWQ6IGZpcnN0Q2hpbGQuaWQsIF9vdmVycmFuOiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICBwZW5kaW5nT3AgPSBudWxsXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBsZXQgb25GaXJzdENoaWxkQXRUb3AgPSB0aGlzLnRocm90dGxlKHRocm90dGxlSW50ZXJ2YWwsICh0b3BFdmVudCwgZmlyc3RDaGlsZCkgPT4ge1xuICAgICAgcGVuZGluZ09wID0gKCkgPT4gZmlyc3RDaGlsZC5zY3JvbGxJbnRvVmlldyh7YmxvY2s6IFwic3RhcnRcIn0pXG4gICAgICB0aGlzLmxpdmVTb2NrZXQuZXhlY0pTSG9va1B1c2godGhpcy5lbCwgdG9wRXZlbnQsIHtpZDogZmlyc3RDaGlsZC5pZH0sICgpID0+IHtcbiAgICAgICAgcGVuZGluZ09wID0gbnVsbFxuICAgICAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgRE9NIGlzIHBhdGNoZWQgYnkgd2FpdGluZyBmb3IgdGhlIG5leHQgdGlja1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBpZighaXNXaXRoaW5WaWV3cG9ydChmaXJzdENoaWxkLCB0aGlzLnNjcm9sbENvbnRhaW5lcikpe1xuICAgICAgICAgICAgZmlyc3RDaGlsZC5zY3JvbGxJbnRvVmlldyh7YmxvY2s6IFwic3RhcnRcIn0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgbGV0IG9uTGFzdENoaWxkQXRCb3R0b20gPSB0aGlzLnRocm90dGxlKHRocm90dGxlSW50ZXJ2YWwsIChib3R0b21FdmVudCwgbGFzdENoaWxkKSA9PiB7XG4gICAgICBwZW5kaW5nT3AgPSAoKSA9PiBsYXN0Q2hpbGQuc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcImVuZFwifSlcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5leGVjSlNIb29rUHVzaCh0aGlzLmVsLCBib3R0b21FdmVudCwge2lkOiBsYXN0Q2hpbGQuaWR9LCAoKSA9PiB7XG4gICAgICAgIHBlbmRpbmdPcCA9IG51bGxcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIERPTSBpcyBwYXRjaGVkIGJ5IHdhaXRpbmcgZm9yIHRoZSBuZXh0IHRpY2tcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgaWYoIWlzV2l0aGluVmlld3BvcnQobGFzdENoaWxkLCB0aGlzLnNjcm9sbENvbnRhaW5lcikpe1xuICAgICAgICAgICAgbGFzdENoaWxkLnNjcm9sbEludG9WaWV3KHtibG9jazogXCJlbmRcIn0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdGhpcy5vblNjcm9sbCA9IChfZSkgPT4ge1xuICAgICAgbGV0IHNjcm9sbE5vdyA9IHNjcm9sbFRvcCh0aGlzLnNjcm9sbENvbnRhaW5lcilcblxuICAgICAgaWYocGVuZGluZ09wKXtcbiAgICAgICAgc2Nyb2xsQmVmb3JlID0gc2Nyb2xsTm93XG4gICAgICAgIHJldHVybiBwZW5kaW5nT3AoKVxuICAgICAgfVxuICAgICAgbGV0IHJlY3QgPSB0aGlzLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBsZXQgdG9wRXZlbnQgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZSh0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhcInZpZXdwb3J0LXRvcFwiKSlcbiAgICAgIGxldCBib3R0b21FdmVudCA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKFwidmlld3BvcnQtYm90dG9tXCIpKVxuICAgICAgbGV0IGxhc3RDaGlsZCA9IHRoaXMuZWwubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgbGV0IGZpcnN0Q2hpbGQgPSB0aGlzLmVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgICBsZXQgaXNTY3JvbGxpbmdVcCA9IHNjcm9sbE5vdyA8IHNjcm9sbEJlZm9yZVxuICAgICAgbGV0IGlzU2Nyb2xsaW5nRG93biA9IHNjcm9sbE5vdyA+IHNjcm9sbEJlZm9yZVxuXG4gICAgICAvLyBlbCBvdmVycmFuIHdoaWxlIHNjcm9sbGluZyB1cFxuICAgICAgaWYoaXNTY3JvbGxpbmdVcCAmJiB0b3BFdmVudCAmJiAhdG9wT3ZlcnJhbiAmJiByZWN0LnRvcCA+PSAwKXtcbiAgICAgICAgdG9wT3ZlcnJhbiA9IHRydWVcbiAgICAgICAgb25Ub3BPdmVycnVuKHRvcEV2ZW50LCBmaXJzdENoaWxkKVxuICAgICAgfSBlbHNlIGlmKGlzU2Nyb2xsaW5nRG93biAmJiB0b3BPdmVycmFuICYmIHJlY3QudG9wIDw9IDApe1xuICAgICAgICB0b3BPdmVycmFuID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYodG9wRXZlbnQgJiYgaXNTY3JvbGxpbmdVcCAmJiBpc0F0Vmlld3BvcnRUb3AoZmlyc3RDaGlsZCwgdGhpcy5zY3JvbGxDb250YWluZXIpKXtcbiAgICAgICAgb25GaXJzdENoaWxkQXRUb3AodG9wRXZlbnQsIGZpcnN0Q2hpbGQpXG4gICAgICB9IGVsc2UgaWYoYm90dG9tRXZlbnQgJiYgaXNTY3JvbGxpbmdEb3duICYmIGlzQXRWaWV3cG9ydEJvdHRvbShsYXN0Q2hpbGQsIHRoaXMuc2Nyb2xsQ29udGFpbmVyKSl7XG4gICAgICAgIG9uTGFzdENoaWxkQXRCb3R0b20oYm90dG9tRXZlbnQsIGxhc3RDaGlsZClcbiAgICAgIH1cbiAgICAgIHNjcm9sbEJlZm9yZSA9IHNjcm9sbE5vd1xuICAgIH1cblxuICAgIGlmKHRoaXMuc2Nyb2xsQ29udGFpbmVyKXtcbiAgICAgIHRoaXMuc2Nyb2xsQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbClcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbClcbiAgICB9XG4gIH0sXG4gIFxuICBkZXN0cm95ZWQoKXtcbiAgICBpZih0aGlzLnNjcm9sbENvbnRhaW5lcil7XG4gICAgICB0aGlzLnNjcm9sbENvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwpXG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwpXG4gICAgfVxuICB9LFxuXG4gIHRocm90dGxlKGludGVydmFsLCBjYWxsYmFjayl7XG4gICAgbGV0IGxhc3RDYWxsQXQgPSAwXG4gICAgbGV0IHRpbWVyXG5cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpXG4gICAgICBsZXQgcmVtYWluaW5nVGltZSA9IGludGVydmFsIC0gKG5vdyAtIGxhc3RDYWxsQXQpXG5cbiAgICAgIGlmKHJlbWFpbmluZ1RpbWUgPD0gMCB8fCByZW1haW5pbmdUaW1lID4gaW50ZXJ2YWwpe1xuICAgICAgICBpZih0aW1lcil7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHRpbWVyID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIGxhc3RDYWxsQXQgPSBub3dcbiAgICAgICAgY2FsbGJhY2soLi4uYXJncylcbiAgICAgIH0gZWxzZSBpZighdGltZXIpe1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxhc3RDYWxsQXQgPSBEYXRlLm5vdygpXG4gICAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgICAgY2FsbGJhY2soLi4uYXJncylcbiAgICAgICAgfSwgcmVtYWluaW5nVGltZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEhvb2tzXG4iLCAiaW1wb3J0IHtcbiAgUEhYX1JFRl9MT0FESU5HLFxuICBQSFhfUkVGX0xPQ0ssXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUEVORElOR19SRUZTLFxuICBQSFhfRVZFTlRfQ0xBU1NFUyxcbiAgUEhYX0RJU0FCTEVELFxuICBQSFhfUkVBRE9OTFksXG4gIFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRVxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnRSZWYge1xuICBzdGF0aWMgb25VbmxvY2soZWwsIGNhbGxiYWNrKXtcbiAgICBpZighRE9NLmlzTG9ja2VkKGVsKSAmJiAhZWwuY2xvc2VzdChgWyR7UEhYX1JFRl9MT0NLfV1gKSl7IHJldHVybiBjYWxsYmFjaygpIH1cbiAgICBjb25zdCBjbG9zZXN0TG9jayA9IGVsLmNsb3Nlc3QoYFske1BIWF9SRUZfTE9DS31dYClcbiAgICBjb25zdCByZWYgPSBjbG9zZXN0TG9jay5jbG9zZXN0KGBbJHtQSFhfUkVGX0xPQ0t9XWApLmdldEF0dHJpYnV0ZShQSFhfUkVGX0xPQ0spXG4gICAgY2xvc2VzdExvY2suYWRkRXZlbnRMaXN0ZW5lcihgcGh4OnVuZG8tbG9jazoke3JlZn1gLCAoKSA9PiB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfSwge29uY2U6IHRydWV9KVxuICB9XG5cbiAgY29uc3RydWN0b3IoZWwpe1xuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMubG9hZGluZ1JlZiA9IGVsLmhhc0F0dHJpYnV0ZShQSFhfUkVGX0xPQURJTkcpID8gcGFyc2VJbnQoZWwuZ2V0QXR0cmlidXRlKFBIWF9SRUZfTE9BRElORyksIDEwKSA6IG51bGxcbiAgICB0aGlzLmxvY2tSZWYgPSBlbC5oYXNBdHRyaWJ1dGUoUEhYX1JFRl9MT0NLKSA/IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZShQSFhfUkVGX0xPQ0spLCAxMCkgOiBudWxsXG4gIH1cblxuICAvLyBwdWJsaWNcblxuICBtYXliZVVuZG8ocmVmLCBwaHhFdmVudCwgZWFjaENsb25lQ2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmlzV2l0aGluKHJlZikpe1xuICAgICAgLy8gd2UgY2Fubm90IHVuZG8gdGhlIGxvY2sgLyBsb2FkaW5nIG5vdywgYXMgdGhlcmUgaXMgYSBuZXdlciBvbmUgYWxyZWFkeSBzZXQ7XG4gICAgICAvLyB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBvcmlnaW5hbCByZWYgd2UgdHJpZWQgdG8gc2VuZCB0aGUgdW5kbyBldmVudCBsYXRlclxuICAgICAgRE9NLnVwZGF0ZVByaXZhdGUodGhpcy5lbCwgUEhYX1BFTkRJTkdfUkVGUywgW10sIChwZW5kaW5nUmVmcykgPT4ge1xuICAgICAgICBwZW5kaW5nUmVmcy5wdXNoKHJlZilcbiAgICAgICAgcmV0dXJuIHBlbmRpbmdSZWZzXG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gdW5kbyBsb2NrcyBhbmQgYXBwbHkgY2xvbmVzXG4gICAgdGhpcy51bmRvTG9ja3MocmVmLCBwaHhFdmVudCwgZWFjaENsb25lQ2FsbGJhY2spXG5cbiAgICAvLyB1bmRvIGxvYWRpbmcgc3RhdGVzXG4gICAgdGhpcy51bmRvTG9hZGluZyhyZWYsIHBoeEV2ZW50KVxuXG4gICAgLy8gZW5zdXJlIHVuZG8gZXZlbnRzIGFyZSBmaXJlZCBmb3IgcGVuZGluZyByZWZzIHRoYXRcbiAgICAvLyBhcmUgcmVzb2x2ZWQgYnkgdGhlIGN1cnJlbnQgcmVmLCBvdGhlcndpc2Ugd2UnZCBsZWFrIGV2ZW50IGxpc3RlbmVyc1xuICAgIERPTS51cGRhdGVQcml2YXRlKHRoaXMuZWwsIFBIWF9QRU5ESU5HX1JFRlMsIFtdLCAocGVuZGluZ1JlZnMpID0+IHtcbiAgICAgIHJldHVybiBwZW5kaW5nUmVmcy5maWx0ZXIoKHBlbmRpbmdSZWYpID0+IHtcbiAgICAgICAgbGV0IG9wdHMgPSB7XG4gICAgICAgICAgZGV0YWlsOiB7cmVmOiBwZW5kaW5nUmVmLCBldmVudDogcGh4RXZlbnR9LFxuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5sb2FkaW5nUmVmICYmIHRoaXMubG9hZGluZ1JlZiA+IHBlbmRpbmdSZWYpe1xuICAgICAgICAgIHRoaXMuZWwuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudChgcGh4OnVuZG8tbG9hZGluZzoke3BlbmRpbmdSZWZ9YCwgb3B0cyksXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubG9ja1JlZiAmJiB0aGlzLmxvY2tSZWYgPiBwZW5kaW5nUmVmKXtcbiAgICAgICAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQoXG4gICAgICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoYHBoeDp1bmRvLWxvY2s6JHtwZW5kaW5nUmVmfWAsIG9wdHMpLFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGVuZGluZ1JlZiA+IHJlZlxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgLy8gY2xlYW4gdXAgaWYgZnVsbHkgcmVzb2x2ZWRcbiAgICBpZih0aGlzLmlzRnVsbHlSZXNvbHZlZEJ5KHJlZikpeyB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGX1NSQykgfVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIGlzV2l0aGluKHJlZil7XG4gICAgcmV0dXJuICEoKHRoaXMubG9hZGluZ1JlZiAhPT0gbnVsbCAmJiB0aGlzLmxvYWRpbmdSZWYgPiByZWYpICYmICh0aGlzLmxvY2tSZWYgIT09IG51bGwgJiYgdGhpcy5sb2NrUmVmID4gcmVmKSlcbiAgfVxuXG4gIC8vIENoZWNrIGZvciBjbG9uZWQgUEhYX1JFRl9MT0NLIGVsZW1lbnQgdGhhdCBoYXMgYmVlbiBtb3JwaGVkIGJlaGluZFxuICAvLyB0aGUgc2NlbmVzIHdoaWxlIHRoaXMgZWxlbWVudCB3YXMgbG9ja2VkIGluIHRoZSBET00uXG4gIC8vIFdoZW4gd2UgYXBwbHkgdGhlIGNsb25lZCB0cmVlIHRvIHRoZSBhY3RpdmUgRE9NIGVsZW1lbnQsIHdlIG11c3RcbiAgLy9cbiAgLy8gICAxLiBleGVjdXRlIHBlbmRpbmcgbW91bnRlZCBob29rcyBmb3Igbm9kZXMgbm93IGluIHRoZSBET01cbiAgLy8gICAyLiB1bmRvIGFueSByZWYgaW5zaWRlIHRoZSBjbG9uZWQgdHJlZSB0aGF0IGhhcyBzaW5jZSBiZWVuIGFjaydkXG4gIHVuZG9Mb2NrcyhyZWYsIHBoeEV2ZW50LCBlYWNoQ2xvbmVDYWxsYmFjayl7XG4gICAgaWYoIXRoaXMuaXNMb2NrVW5kb25lQnkocmVmKSl7IHJldHVybiB9XG5cbiAgICBsZXQgY2xvbmVkVHJlZSA9IERPTS5wcml2YXRlKHRoaXMuZWwsIFBIWF9SRUZfTE9DSylcbiAgICBpZihjbG9uZWRUcmVlKXtcbiAgICAgIGVhY2hDbG9uZUNhbGxiYWNrKGNsb25lZFRyZWUpXG4gICAgICBET00uZGVsZXRlUHJpdmF0ZSh0aGlzLmVsLCBQSFhfUkVGX0xPQ0spXG4gICAgfVxuICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUZfTE9DSylcblxuICAgIGxldCBvcHRzID0ge2RldGFpbDoge3JlZjogcmVmLCBldmVudDogcGh4RXZlbnR9LCBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiBmYWxzZX1cbiAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGBwaHg6dW5kby1sb2NrOiR7dGhpcy5sb2NrUmVmfWAsIG9wdHMpKVxuICB9XG5cbiAgdW5kb0xvYWRpbmcocmVmLCBwaHhFdmVudCl7XG4gICAgaWYoIXRoaXMuaXNMb2FkaW5nVW5kb25lQnkocmVmKSl7XG4gICAgICBpZih0aGlzLmNhblVuZG9Mb2FkaW5nKHJlZikgJiYgdGhpcy5lbC5jbGFzc0xpc3QuY29udGFpbnMoXCJwaHgtc3VibWl0LWxvYWRpbmdcIikpe1xuICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJwaHgtY2hhbmdlLWxvYWRpbmdcIilcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmKHRoaXMuY2FuVW5kb0xvYWRpbmcocmVmKSl7XG4gICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGX0xPQURJTkcpXG4gICAgICBsZXQgZGlzYWJsZWRWYWwgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICBsZXQgcmVhZE9ubHlWYWwgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfUkVBRE9OTFkpXG4gICAgICAvLyByZXN0b3JlIGlucHV0c1xuICAgICAgaWYocmVhZE9ubHlWYWwgIT09IG51bGwpe1xuICAgICAgICB0aGlzLmVsLnJlYWRPbmx5ID0gcmVhZE9ubHlWYWwgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgIHRoaXMuZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUFET05MWSlcbiAgICAgIH1cbiAgICAgIGlmKGRpc2FibGVkVmFsICE9PSBudWxsKXtcbiAgICAgICAgdGhpcy5lbC5kaXNhYmxlZCA9IGRpc2FibGVkVmFsID09PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZVxuICAgICAgICB0aGlzLmVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICB9XG4gICAgICAvLyByZXN0b3JlIGRpc2FibGVzXG4gICAgICBsZXQgZGlzYWJsZVJlc3RvcmUgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpXG4gICAgICBpZihkaXNhYmxlUmVzdG9yZSAhPT0gbnVsbCl7XG4gICAgICAgIHRoaXMuZWwuaW5uZXJUZXh0ID0gZGlzYWJsZVJlc3RvcmVcbiAgICAgICAgdGhpcy5lbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFKVxuICAgICAgfVxuXG4gICAgICBsZXQgb3B0cyA9IHtkZXRhaWw6IHtyZWY6IHJlZiwgZXZlbnQ6IHBoeEV2ZW50fSwgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogZmFsc2V9XG4gICAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGBwaHg6dW5kby1sb2FkaW5nOiR7dGhpcy5sb2FkaW5nUmVmfWAsIG9wdHMpKVxuICAgIH1cblxuICAgIC8vIHJlbW92ZSBjbGFzc2VzXG4gICAgUEhYX0VWRU5UX0NMQVNTRVMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgIGlmKG5hbWUgIT09IFwicGh4LXN1Ym1pdC1sb2FkaW5nXCIgfHwgdGhpcy5jYW5VbmRvTG9hZGluZyhyZWYpKXtcbiAgICAgICAgRE9NLnJlbW92ZUNsYXNzKHRoaXMuZWwsIG5hbWUpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlzTG9hZGluZ1VuZG9uZUJ5KHJlZil7IHJldHVybiB0aGlzLmxvYWRpbmdSZWYgPT09IG51bGwgPyBmYWxzZSA6IHRoaXMubG9hZGluZ1JlZiA8PSByZWYgfVxuICBpc0xvY2tVbmRvbmVCeShyZWYpeyByZXR1cm4gdGhpcy5sb2NrUmVmID09PSBudWxsID8gZmFsc2UgOiB0aGlzLmxvY2tSZWYgPD0gcmVmIH1cblxuICBpc0Z1bGx5UmVzb2x2ZWRCeShyZWYpe1xuICAgIHJldHVybiAodGhpcy5sb2FkaW5nUmVmID09PSBudWxsIHx8IHRoaXMubG9hZGluZ1JlZiA8PSByZWYpICYmICh0aGlzLmxvY2tSZWYgPT09IG51bGwgfHwgdGhpcy5sb2NrUmVmIDw9IHJlZilcbiAgfVxuXG4gIC8vIG9ubHkgcmVtb3ZlIHRoZSBwaHgtc3VibWl0LWxvYWRpbmcgY2xhc3MgaWYgd2UgYXJlIG5vdCBsb2NrZWRcbiAgY2FuVW5kb0xvYWRpbmcocmVmKXsgcmV0dXJuIHRoaXMubG9ja1JlZiA9PT0gbnVsbCB8fCB0aGlzLmxvY2tSZWYgPD0gcmVmIH1cbn1cbiIsICJpbXBvcnQge1xuICBtYXliZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NUG9zdE1vcnBoUmVzdG9yZXIge1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXJCZWZvcmUsIGNvbnRhaW5lckFmdGVyLCB1cGRhdGVUeXBlKXtcbiAgICBsZXQgaWRzQmVmb3JlID0gbmV3IFNldCgpXG4gICAgbGV0IGlkc0FmdGVyID0gbmV3IFNldChbLi4uY29udGFpbmVyQWZ0ZXIuY2hpbGRyZW5dLm1hcChjaGlsZCA9PiBjaGlsZC5pZCkpXG5cbiAgICBsZXQgZWxlbWVudHNUb01vZGlmeSA9IFtdXG5cbiAgICBBcnJheS5mcm9tKGNvbnRhaW5lckJlZm9yZS5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZihjaGlsZC5pZCl7IC8vIGFsbCBvZiBvdXIgY2hpbGRyZW4gc2hvdWxkIGJlIGVsZW1lbnRzIHdpdGggaWRzXG4gICAgICAgIGlkc0JlZm9yZS5hZGQoY2hpbGQuaWQpXG4gICAgICAgIGlmKGlkc0FmdGVyLmhhcyhjaGlsZC5pZCkpe1xuICAgICAgICAgIGxldCBwcmV2aW91c0VsZW1lbnRJZCA9IGNoaWxkLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgY2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5pZFxuICAgICAgICAgIGVsZW1lbnRzVG9Nb2RpZnkucHVzaCh7ZWxlbWVudElkOiBjaGlsZC5pZCwgcHJldmlvdXNFbGVtZW50SWQ6IHByZXZpb3VzRWxlbWVudElkfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLmNvbnRhaW5lcklkID0gY29udGFpbmVyQWZ0ZXIuaWRcbiAgICB0aGlzLnVwZGF0ZVR5cGUgPSB1cGRhdGVUeXBlXG4gICAgdGhpcy5lbGVtZW50c1RvTW9kaWZ5ID0gZWxlbWVudHNUb01vZGlmeVxuICAgIHRoaXMuZWxlbWVudElkc1RvQWRkID0gWy4uLmlkc0FmdGVyXS5maWx0ZXIoaWQgPT4gIWlkc0JlZm9yZS5oYXMoaWQpKVxuICB9XG5cbiAgLy8gV2UgZG8gdGhlIGZvbGxvd2luZyB0byBvcHRpbWl6ZSBhcHBlbmQvcHJlcGVuZCBvcGVyYXRpb25zOlxuICAvLyAgIDEpIFRyYWNrIGlkcyBvZiBtb2RpZmllZCBlbGVtZW50cyAmIG9mIG5ldyBlbGVtZW50c1xuICAvLyAgIDIpIEFsbCB0aGUgbW9kaWZpZWQgZWxlbWVudHMgYXJlIHB1dCBiYWNrIGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uIGluIHRoZSBET00gdHJlZVxuICAvLyAgICAgIGJ5IHN0b3JpbmcgdGhlIGlkIG9mIHRoZWlyIHByZXZpb3VzIHNpYmxpbmdcbiAgLy8gICAzKSBOZXcgZWxlbWVudHMgYXJlIGdvaW5nIHRvIGJlIHB1dCBpbiB0aGUgcmlnaHQgcGxhY2UgYnkgbW9ycGhkb20gZHVyaW5nIGFwcGVuZC5cbiAgLy8gICAgICBGb3IgcHJlcGVuZCwgd2UgbW92ZSB0aGVtIHRvIHRoZSBmaXJzdCBwb3NpdGlvbiBpbiB0aGUgY29udGFpbmVyXG4gIHBlcmZvcm0oKXtcbiAgICBsZXQgY29udGFpbmVyID0gRE9NLmJ5SWQodGhpcy5jb250YWluZXJJZClcbiAgICB0aGlzLmVsZW1lbnRzVG9Nb2RpZnkuZm9yRWFjaChlbGVtZW50VG9Nb2RpZnkgPT4ge1xuICAgICAgaWYoZWxlbWVudFRvTW9kaWZ5LnByZXZpb3VzRWxlbWVudElkKXtcbiAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvTW9kaWZ5LnByZXZpb3VzRWxlbWVudElkKSwgcHJldmlvdXNFbGVtID0+IHtcbiAgICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Nb2RpZnkuZWxlbWVudElkKSwgZWxlbSA9PiB7XG4gICAgICAgICAgICBsZXQgaXNJblJpZ2h0UGxhY2UgPSBlbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmlkID09IHByZXZpb3VzRWxlbS5pZFxuICAgICAgICAgICAgaWYoIWlzSW5SaWdodFBsYWNlKXtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGVsZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Nb2RpZnkuZWxlbWVudElkKSwgZWxlbSA9PiB7XG4gICAgICAgICAgbGV0IGlzSW5SaWdodFBsYWNlID0gZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nID09IG51bGxcbiAgICAgICAgICBpZighaXNJblJpZ2h0UGxhY2Upe1xuICAgICAgICAgICAgY29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgZWxlbSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmKHRoaXMudXBkYXRlVHlwZSA9PSBcInByZXBlbmRcIil7XG4gICAgICB0aGlzLmVsZW1lbnRJZHNUb0FkZC5yZXZlcnNlKCkuZm9yRWFjaChlbGVtSWQgPT4ge1xuICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpLCBlbGVtID0+IGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGVsZW0pKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiIsICJ2YXIgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA9IDExO1xuXG5mdW5jdGlvbiBtb3JwaEF0dHJzKGZyb21Ob2RlLCB0b05vZGUpIHtcbiAgICB2YXIgdG9Ob2RlQXR0cnMgPSB0b05vZGUuYXR0cmlidXRlcztcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgYXR0ck5hbWU7XG4gICAgdmFyIGF0dHJOYW1lc3BhY2VVUkk7XG4gICAgdmFyIGF0dHJWYWx1ZTtcbiAgICB2YXIgZnJvbVZhbHVlO1xuXG4gICAgLy8gZG9jdW1lbnQtZnJhZ21lbnRzIGRvbnQgaGF2ZSBhdHRyaWJ1dGVzIHNvIGxldHMgbm90IGRvIGFueXRoaW5nXG4gICAgaWYgKHRvTm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSB8fCBmcm9tTm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBhdHRyaWJ1dGVzIG9uIG9yaWdpbmFsIERPTSBlbGVtZW50XG4gICAgZm9yICh2YXIgaSA9IHRvTm9kZUF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGF0dHIgPSB0b05vZGVBdHRyc1tpXTtcbiAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcbiAgICAgICAgYXR0clZhbHVlID0gYXR0ci52YWx1ZTtcblxuICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZTtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKTtcblxuICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHIucHJlZml4ID09PSAneG1sbnMnKXtcbiAgICAgICAgICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7IC8vIEl0J3Mgbm90IGFsbG93ZWQgdG8gc2V0IGFuIGF0dHJpYnV0ZSB3aXRoIHRoZSBYTUxOUyBuYW1lc3BhY2Ugd2l0aG91dCBzcGVjaWZ5aW5nIHRoZSBgeG1sbnNgIHByZWZpeFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhbnkgZXh0cmEgYXR0cmlidXRlcyBmb3VuZCBvbiB0aGUgb3JpZ2luYWwgRE9NIGVsZW1lbnQgdGhhdFxuICAgIC8vIHdlcmVuJ3QgZm91bmQgb24gdGhlIHRhcmdldCBlbGVtZW50LlxuICAgIHZhciBmcm9tTm9kZUF0dHJzID0gZnJvbU5vZGUuYXR0cmlidXRlcztcblxuICAgIGZvciAodmFyIGQgPSBmcm9tTm9kZUF0dHJzLmxlbmd0aCAtIDE7IGQgPj0gMDsgZC0tKSB7XG4gICAgICAgIGF0dHIgPSBmcm9tTm9kZUF0dHJzW2RdO1xuICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuXG4gICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuXG4gICAgICAgICAgICBpZiAoIXRvTm9kZS5oYXNBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5yZW1vdmVBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRvTm9kZS5oYXNBdHRyaWJ1dGUoYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIHJhbmdlOyAvLyBDcmVhdGUgYSByYW5nZSBvYmplY3QgZm9yIGVmZmljZW50bHkgcmVuZGVyaW5nIHN0cmluZ3MgdG8gZWxlbWVudHMuXG52YXIgTlNfWEhUTUwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG5cbnZhciBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZG9jdW1lbnQ7XG52YXIgSEFTX1RFTVBMQVRFX1NVUFBPUlQgPSAhIWRvYyAmJiAnY29udGVudCcgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG52YXIgSEFTX1JBTkdFX1NVUFBPUlQgPSAhIWRvYyAmJiBkb2MuY3JlYXRlUmFuZ2UgJiYgJ2NyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCcgaW4gZG9jLmNyZWF0ZVJhbmdlKCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50RnJvbVRlbXBsYXRlKHN0cikge1xuICAgIHZhciB0ZW1wbGF0ZSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHN0cjtcbiAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21SYW5nZShzdHIpIHtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGUoZG9jLmJvZHkpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudCA9IHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChzdHIpO1xuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21XcmFwKHN0cikge1xuICAgIHZhciBmcmFnbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgZnJhZ21lbnQuaW5uZXJIVE1MID0gc3RyO1xuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgYWJvdXQgdGhlIHNhbWVcbiAqIHZhciBodG1sID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhzdHIsICd0ZXh0L2h0bWwnKTtcbiAqIHJldHVybiBodG1sLmJvZHkuZmlyc3RDaGlsZDtcbiAqXG4gKiBAbWV0aG9kIHRvRWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICovXG5mdW5jdGlvbiB0b0VsZW1lbnQoc3RyKSB7XG4gICAgc3RyID0gc3RyLnRyaW0oKTtcbiAgICBpZiAoSEFTX1RFTVBMQVRFX1NVUFBPUlQpIHtcbiAgICAgIC8vIGF2b2lkIHJlc3RyaWN0aW9ucyBvbiBjb250ZW50IGZvciB0aGluZ3MgbGlrZSBgPHRyPjx0aD5IaTwvdGg+PC90cj5gIHdoaWNoXG4gICAgICAvLyBjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQgZG9lc24ndCBzdXBwb3J0XG4gICAgICAvLyA8dGVtcGxhdGU+IHN1cHBvcnQgbm90IGF2YWlsYWJsZSBpbiBJRVxuICAgICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVRlbXBsYXRlKHN0cik7XG4gICAgfSBlbHNlIGlmIChIQVNfUkFOR0VfU1VQUE9SVCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVJhbmdlKHN0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVdyYXAoc3RyKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdHdvIG5vZGUncyBuYW1lcyBhcmUgdGhlIHNhbWUuXG4gKlxuICogTk9URTogV2UgZG9uJ3QgYm90aGVyIGNoZWNraW5nIGBuYW1lc3BhY2VVUklgIGJlY2F1c2UgeW91IHdpbGwgbmV2ZXIgZmluZCB0d28gSFRNTCBlbGVtZW50cyB3aXRoIHRoZSBzYW1lXG4gKiAgICAgICBub2RlTmFtZSBhbmQgZGlmZmVyZW50IG5hbWVzcGFjZSBVUklzLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiIFRoZSB0YXJnZXQgZWxlbWVudFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY29tcGFyZU5vZGVOYW1lcyhmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgZnJvbU5vZGVOYW1lID0gZnJvbUVsLm5vZGVOYW1lO1xuICAgIHZhciB0b05vZGVOYW1lID0gdG9FbC5ub2RlTmFtZTtcbiAgICB2YXIgZnJvbUNvZGVTdGFydCwgdG9Db2RlU3RhcnQ7XG5cbiAgICBpZiAoZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZyb21Db2RlU3RhcnQgPSBmcm9tTm9kZU5hbWUuY2hhckNvZGVBdCgwKTtcbiAgICB0b0NvZGVTdGFydCA9IHRvTm9kZU5hbWUuY2hhckNvZGVBdCgwKTtcblxuICAgIC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIHZpcnR1YWwgRE9NIG5vZGUgb3IgU1ZHIG5vZGUgdGhlbiB3ZSBtYXlcbiAgICAvLyBuZWVkIHRvIG5vcm1hbGl6ZSB0aGUgdGFnIG5hbWUgYmVmb3JlIGNvbXBhcmluZy4gTm9ybWFsIEhUTUwgZWxlbWVudHMgdGhhdCBhcmVcbiAgICAvLyBpbiB0aGUgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCJcbiAgICAvLyBhcmUgY29udmVydGVkIHRvIHVwcGVyIGNhc2VcbiAgICBpZiAoZnJvbUNvZGVTdGFydCA8PSA5MCAmJiB0b0NvZGVTdGFydCA+PSA5NykgeyAvLyBmcm9tIGlzIHVwcGVyIGFuZCB0byBpcyBsb3dlclxuICAgICAgICByZXR1cm4gZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmICh0b0NvZGVTdGFydCA8PSA5MCAmJiBmcm9tQ29kZVN0YXJ0ID49IDk3KSB7IC8vIHRvIGlzIHVwcGVyIGFuZCBmcm9tIGlzIGxvd2VyXG4gICAgICAgIHJldHVybiB0b05vZGVOYW1lID09PSBmcm9tTm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50LCBvcHRpb25hbGx5IHdpdGggYSBrbm93biBuYW1lc3BhY2UgVVJJLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSBlbGVtZW50IG5hbWUsIGUuZy4gJ2Rpdicgb3IgJ3N2ZydcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZXNwYWNlVVJJXSB0aGUgZWxlbWVudCdzIG5hbWVzcGFjZSBVUkksIGkuZS4gdGhlIHZhbHVlIG9mXG4gKiBpdHMgYHhtbG5zYCBhdHRyaWJ1dGUgb3IgaXRzIGluZmVycmVkIG5hbWVzcGFjZS5cbiAqXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZSwgbmFtZXNwYWNlVVJJKSB7XG4gICAgcmV0dXJuICFuYW1lc3BhY2VVUkkgfHwgbmFtZXNwYWNlVVJJID09PSBOU19YSFRNTCA/XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50KG5hbWUpIDpcbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgY2hpbGRyZW4gb2Ygb25lIERPTSBlbGVtZW50IHRvIGFub3RoZXIgRE9NIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkcmVuKGZyb21FbCwgdG9FbCkge1xuICAgIHZhciBjdXJDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICB2YXIgbmV4dENoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIHRvRWwuYXBwZW5kQ2hpbGQoY3VyQ2hpbGQpO1xuICAgICAgICBjdXJDaGlsZCA9IG5leHRDaGlsZDtcbiAgICB9XG4gICAgcmV0dXJuIHRvRWw7XG59XG5cbmZ1bmN0aW9uIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCBuYW1lKSB7XG4gICAgaWYgKGZyb21FbFtuYW1lXSAhPT0gdG9FbFtuYW1lXSkge1xuICAgICAgICBmcm9tRWxbbmFtZV0gPSB0b0VsW25hbWVdO1xuICAgICAgICBpZiAoZnJvbUVsW25hbWVdKSB7XG4gICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBzcGVjaWFsRWxIYW5kbGVycyA9IHtcbiAgICBPUFRJT046IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGZyb21FbC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdmFyIHBhcmVudE5hbWUgPSBwYXJlbnROb2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAocGFyZW50TmFtZSA9PT0gJ09QVEdST1VQJykge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgcGFyZW50TmFtZSA9IHBhcmVudE5vZGUgJiYgcGFyZW50Tm9kZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUgPT09ICdTRUxFQ1QnICYmICFwYXJlbnROb2RlLmhhc0F0dHJpYnV0ZSgnbXVsdGlwbGUnKSkge1xuICAgICAgICAgICAgICAgIGlmIChmcm9tRWwuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpICYmICF0b0VsLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZm9yIE1TIEVkZ2UgYnVnIHdoZXJlIHRoZSAnc2VsZWN0ZWQnIGF0dHJpYnV0ZSBjYW4gb25seSBiZVxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmVkIGlmIHNldCB0byBhIG5vbi1lbXB0eSB2YWx1ZTpcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTIwODc2NzkvXG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVzZXQgc2VsZWN0IGVsZW1lbnQncyBzZWxlY3RlZEluZGV4IHRvIC0xLCBvdGhlcndpc2Ugc2V0dGluZ1xuICAgICAgICAgICAgICAgIC8vIGZyb21FbC5zZWxlY3RlZCB1c2luZyB0aGUgc3luY0Jvb2xlYW5BdHRyUHJvcCBiZWxvdyBoYXMgbm8gZWZmZWN0LlxuICAgICAgICAgICAgICAgIC8vIFRoZSBjb3JyZWN0IHNlbGVjdGVkSW5kZXggd2lsbCBiZSBzZXQgaW4gdGhlIFNFTEVDVCBzcGVjaWFsIGhhbmRsZXIgYmVsb3cuXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdzZWxlY3RlZCcpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogVGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgaXMgc3BlY2lhbCBmb3IgdGhlIDxpbnB1dD4gZWxlbWVudCBzaW5jZSBpdCBzZXRzXG4gICAgICogdGhlIGluaXRpYWwgdmFsdWUuIENoYW5naW5nIHRoZSBcInZhbHVlXCIgYXR0cmlidXRlIHdpdGhvdXQgY2hhbmdpbmcgdGhlXG4gICAgICogXCJ2YWx1ZVwiIHByb3BlcnR5IHdpbGwgaGF2ZSBubyBlZmZlY3Qgc2luY2UgaXQgaXMgb25seSB1c2VkIHRvIHRoZSBzZXQgdGhlXG4gICAgICogaW5pdGlhbCB2YWx1ZS4gIFNpbWlsYXIgZm9yIHRoZSBcImNoZWNrZWRcIiBhdHRyaWJ1dGUsIGFuZCBcImRpc2FibGVkXCIuXG4gICAgICovXG4gICAgSU5QVVQ6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ2NoZWNrZWQnKTtcbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdkaXNhYmxlZCcpO1xuXG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IHRvRWwudmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRvRWwuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFRFWFRBUkVBOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpcnN0Q2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgaWYgKGZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIE5lZWRlZCBmb3IgSUUuIEFwcGFyZW50bHkgSUUgc2V0cyB0aGUgcGxhY2Vob2xkZXIgYXMgdGhlXG4gICAgICAgICAgICAvLyBub2RlIHZhbHVlIGFuZCB2aXNlIHZlcnNhLiBUaGlzIGlnbm9yZXMgYW4gZW1wdHkgdXBkYXRlLlxuICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gZmlyc3RDaGlsZC5ub2RlVmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA9PSBuZXdWYWx1ZSB8fCAoIW5ld1ZhbHVlICYmIG9sZFZhbHVlID09IGZyb21FbC5wbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcnN0Q2hpbGQubm9kZVZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFNFTEVDVDogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIGlmICghdG9FbC5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJykpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIGxvb3AgdGhyb3VnaCBjaGlsZHJlbiBvZiBmcm9tRWwsIG5vdCB0b0VsIHNpbmNlIG5vZGVzIGNhbiBiZSBtb3ZlZFxuICAgICAgICAgICAgLy8gZnJvbSB0b0VsIHRvIGZyb21FbCBkaXJlY3RseSB3aGVuIG1vcnBoaW5nLlxuICAgICAgICAgICAgLy8gQXQgdGhlIHRpbWUgdGhpcyBzcGVjaWFsIGhhbmRsZXIgaXMgaW52b2tlZCwgYWxsIGNoaWxkcmVuIGhhdmUgYWxyZWFkeSBiZWVuIG1vcnBoZWRcbiAgICAgICAgICAgIC8vIGFuZCBhcHBlbmRlZCB0byAvIHJlbW92ZWQgZnJvbSBmcm9tRWwsIHNvIHVzaW5nIGZyb21FbCBoZXJlIGlzIHNhZmUgYW5kIGNvcnJlY3QuXG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBvcHRncm91cDtcbiAgICAgICAgICAgIHZhciBub2RlTmFtZTtcbiAgICAgICAgICAgIHdoaWxlKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgbm9kZU5hbWUgPSBjdXJDaGlsZC5ub2RlTmFtZSAmJiBjdXJDaGlsZC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlTmFtZSA9PT0gJ09QVEdST1VQJykge1xuICAgICAgICAgICAgICAgICAgICBvcHRncm91cCA9IGN1ckNoaWxkO1xuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG9wdGdyb3VwLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVOYW1lID09PSAnT1BUSU9OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNoaWxkLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3VyQ2hpbGQgJiYgb3B0Z3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gb3B0Z3JvdXAubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRncm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZyb21FbC5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBFTEVNRU5UX05PREUgPSAxO1xudmFyIERPQ1VNRU5UX0ZSQUdNRU5UX05PREUkMSA9IDExO1xudmFyIFRFWFRfTk9ERSA9IDM7XG52YXIgQ09NTUVOVF9OT0RFID0gODtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXROb2RlS2V5KG5vZGUpIHtcbiAgaWYgKG5vZGUpIHtcbiAgICByZXR1cm4gKG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpKSB8fCBub2RlLmlkO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1vcnBoZG9tRmFjdG9yeShtb3JwaEF0dHJzKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIG1vcnBoZG9tKGZyb21Ob2RlLCB0b05vZGUsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRvTm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJyNkb2N1bWVudCcgfHwgZnJvbU5vZGUubm9kZU5hbWUgPT09ICdIVE1MJyB8fCBmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgIHZhciB0b05vZGVIdG1sID0gdG9Ob2RlO1xuICAgICAgICB0b05vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xuICAgICAgICB0b05vZGUuaW5uZXJIVE1MID0gdG9Ob2RlSHRtbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvTm9kZSA9IHRvRWxlbWVudCh0b05vZGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodG9Ob2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFJDEpIHtcbiAgICAgIHRvTm9kZSA9IHRvTm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICB9XG5cbiAgICB2YXIgZ2V0Tm9kZUtleSA9IG9wdGlvbnMuZ2V0Tm9kZUtleSB8fCBkZWZhdWx0R2V0Tm9kZUtleTtcbiAgICB2YXIgb25CZWZvcmVOb2RlQWRkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uTm9kZUFkZGVkID0gb3B0aW9ucy5vbk5vZGVBZGRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZUVsVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgb25FbFVwZGF0ZWQgPSBvcHRpb25zLm9uRWxVcGRhdGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlTm9kZURpc2NhcmRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlRGlzY2FyZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uTm9kZURpc2NhcmRlZCA9IG9wdGlvbnMub25Ob2RlRGlzY2FyZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgc2tpcEZyb21DaGlsZHJlbiA9IG9wdGlvbnMuc2tpcEZyb21DaGlsZHJlbiB8fCBub29wO1xuICAgIHZhciBhZGRDaGlsZCA9IG9wdGlvbnMuYWRkQ2hpbGQgfHwgZnVuY3Rpb24ocGFyZW50LCBjaGlsZCl7IHJldHVybiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpOyB9O1xuICAgIHZhciBjaGlsZHJlbk9ubHkgPSBvcHRpb25zLmNoaWxkcmVuT25seSA9PT0gdHJ1ZTtcblxuICAgIC8vIFRoaXMgb2JqZWN0IGlzIHVzZWQgYXMgYSBsb29rdXAgdG8gcXVpY2tseSBmaW5kIGFsbCBrZXllZCBlbGVtZW50cyBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgdmFyIGZyb21Ob2Rlc0xvb2t1cCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIGtleWVkUmVtb3ZhbExpc3QgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGFkZEtleWVkUmVtb3ZhbChrZXkpIHtcbiAgICAgIGtleWVkUmVtb3ZhbExpc3QucHVzaChrZXkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUsIHNraXBLZXllZE5vZGVzKSB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgIHZhciBjdXJDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG5cbiAgICAgICAgICB2YXIga2V5ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgaWYgKHNraXBLZXllZE5vZGVzICYmIChrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKSkpIHtcbiAgICAgICAgICAgIC8vIElmIHdlIGFyZSBza2lwcGluZyBrZXllZCBub2RlcyB0aGVuIHdlIGFkZCB0aGUga2V5XG4gICAgICAgICAgICAvLyB0byBhIGxpc3Qgc28gdGhhdCBpdCBjYW4gYmUgaGFuZGxlZCBhdCB0aGUgdmVyeSBlbmQuXG4gICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoa2V5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gT25seSByZXBvcnQgdGhlIG5vZGUgYXMgZGlzY2FyZGVkIGlmIGl0IGlzIG5vdCBrZXllZC4gV2UgZG8gdGhpcyBiZWNhdXNlXG4gICAgICAgICAgICAvLyBhdCB0aGUgZW5kIHdlIGxvb3AgdGhyb3VnaCBhbGwga2V5ZWQgZWxlbWVudHMgdGhhdCB3ZXJlIHVubWF0Y2hlZFxuICAgICAgICAgICAgLy8gYW5kIHRoZW4gZGlzY2FyZCB0aGVtIGluIG9uZSBmaW5hbCBwYXNzLlxuICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgIGlmIChjdXJDaGlsZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKGN1ckNoaWxkLCBza2lwS2V5ZWROb2Rlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICogUmVtb3ZlcyBhIERPTSBub2RlIG91dCBvZiB0aGUgb3JpZ2luYWwgRE9NXG4gICAgKlxuICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBUaGUgbm9kZSB0byByZW1vdmVcbiAgICAqIEBwYXJhbSAge05vZGV9IHBhcmVudE5vZGUgVGhlIG5vZGVzIHBhcmVudFxuICAgICogQHBhcmFtICB7Qm9vbGVhbn0gc2tpcEtleWVkTm9kZXMgSWYgdHJ1ZSB0aGVuIGVsZW1lbnRzIHdpdGgga2V5cyB3aWxsIGJlIHNraXBwZWQgYW5kIG5vdCBkaXNjYXJkZWQuXG4gICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUsIHBhcmVudE5vZGUsIHNraXBLZXllZE5vZGVzKSB7XG4gICAgICBpZiAob25CZWZvcmVOb2RlRGlzY2FyZGVkKG5vZGUpID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICB9XG5cbiAgICAgIG9uTm9kZURpc2NhcmRlZChub2RlKTtcbiAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUsIHNraXBLZXllZE5vZGVzKTtcbiAgICB9XG5cbiAgICAvLyAvLyBUcmVlV2Fsa2VyIGltcGxlbWVudGF0aW9uIGlzIG5vIGZhc3RlciwgYnV0IGtlZXBpbmcgdGhpcyBhcm91bmQgaW4gY2FzZSB0aGlzIGNoYW5nZXMgaW4gdGhlIGZ1dHVyZVxuICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShyb290KSB7XG4gICAgLy8gICAgIHZhciB0cmVlV2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcbiAgICAvLyAgICAgICAgIHJvb3QsXG4gICAgLy8gICAgICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCk7XG4gICAgLy9cbiAgICAvLyAgICAgdmFyIGVsO1xuICAgIC8vICAgICB3aGlsZSgoZWwgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkpKSB7XG4gICAgLy8gICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShlbCk7XG4gICAgLy8gICAgICAgICBpZiAoa2V5KSB7XG4gICAgLy8gICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBlbDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIC8vIE5vZGVJdGVyYXRvciBpbXBsZW1lbnRhdGlvbiBpcyBubyBmYXN0ZXIsIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kIGluIGNhc2UgdGhpcyBjaGFuZ2VzIGluIHRoZSBmdXR1cmVcbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShub2RlKSB7XG4gICAgLy8gICAgIHZhciBub2RlSXRlcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iobm9kZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgIC8vICAgICB2YXIgZWw7XG4gICAgLy8gICAgIHdoaWxlKChlbCA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSkge1xuICAgIC8vICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoZWwpO1xuICAgIC8vICAgICAgICAgaWYgKGtleSkge1xuICAgIC8vICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gZWw7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBpbmRleFRyZWUobm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSB8fCBub2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFJDEpIHtcbiAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBjdXJDaGlsZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBXYWxrIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgaW5kZXhUcmVlKGN1ckNoaWxkKTtcblxuICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpbmRleFRyZWUoZnJvbU5vZGUpO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlTm9kZUFkZGVkKGVsKSB7XG4gICAgICBvbk5vZGVBZGRlZChlbCk7XG5cbiAgICAgIHZhciBjdXJDaGlsZCA9IGVsLmZpcnN0Q2hpbGQ7XG4gICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgdmFyIHVubWF0Y2hlZEZyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtrZXldO1xuICAgICAgICAgIC8vIGlmIHdlIGZpbmQgYSBkdXBsaWNhdGUgI2lkIG5vZGUgaW4gY2FjaGUsIHJlcGxhY2UgYGVsYCB3aXRoIGNhY2hlIHZhbHVlXG4gICAgICAgICAgLy8gYW5kIG1vcnBoIGl0IHRvIHRoZSBjaGlsZCBub2RlLlxuICAgICAgICAgIGlmICh1bm1hdGNoZWRGcm9tRWwgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJDaGlsZCwgdW5tYXRjaGVkRnJvbUVsKSkge1xuICAgICAgICAgICAgY3VyQ2hpbGQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodW5tYXRjaGVkRnJvbUVsLCBjdXJDaGlsZCk7XG4gICAgICAgICAgICBtb3JwaEVsKHVubWF0Y2hlZEZyb21FbCwgY3VyQ2hpbGQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZWN1cnNpdmVseSBjYWxsIGZvciBjdXJDaGlsZCBhbmQgaXQncyBjaGlsZHJlbiB0byBzZWUgaWYgd2UgZmluZCBzb21ldGhpbmcgaW5cbiAgICAgICAgICAvLyBmcm9tTm9kZXNMb29rdXBcbiAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyQ2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VyQ2hpbGQgPSBuZXh0U2libGluZztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwRnJvbUVsKGZyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCwgY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgIC8vIFdlIGhhdmUgcHJvY2Vzc2VkIGFsbCBvZiB0aGUgXCJ0byBub2Rlc1wiLiBJZiBjdXJGcm9tTm9kZUNoaWxkIGlzXG4gICAgICAvLyBub24tbnVsbCB0aGVuIHdlIHN0aWxsIGhhdmUgc29tZSBmcm9tIG5vZGVzIGxlZnQgb3ZlciB0aGF0IG5lZWRcbiAgICAgIC8vIHRvIGJlIHJlbW92ZWRcbiAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgIHZhciBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICBpZiAoKGN1ckZyb21Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKSkpIHtcbiAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICB9XG4gICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9ycGhFbChmcm9tRWwsIHRvRWwsIGNoaWxkcmVuT25seSkge1xuICAgICAgdmFyIHRvRWxLZXkgPSBnZXROb2RlS2V5KHRvRWwpO1xuXG4gICAgICBpZiAodG9FbEtleSkge1xuICAgICAgICAvLyBJZiBhbiBlbGVtZW50IHdpdGggYW4gSUQgaXMgYmVpbmcgbW9ycGhlZCB0aGVuIGl0IHdpbGwgYmUgaW4gdGhlIGZpbmFsXG4gICAgICAgIC8vIERPTSBzbyBjbGVhciBpdCBvdXQgb2YgdGhlIHNhdmVkIGVsZW1lbnRzIGNvbGxlY3Rpb25cbiAgICAgICAgZGVsZXRlIGZyb21Ob2Rlc0xvb2t1cFt0b0VsS2V5XTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgdmFyIGJlZm9yZVVwZGF0ZVJlc3VsdCA9IG9uQmVmb3JlRWxVcGRhdGVkKGZyb21FbCwgdG9FbCk7XG4gICAgICAgIGlmIChiZWZvcmVVcGRhdGVSZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGJlZm9yZVVwZGF0ZVJlc3VsdCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgZnJvbUVsID0gYmVmb3JlVXBkYXRlUmVzdWx0O1xuICAgICAgICAgIC8vIHJlaW5kZXggdGhlIG5ldyBmcm9tRWwgaW4gY2FzZSBpdCdzIG5vdCBpbiB0aGUgc2FtZVxuICAgICAgICAgIC8vIHRyZWUgYXMgdGhlIG9yaWdpbmFsIGZyb21FbFxuICAgICAgICAgIC8vIChQaG9lbml4IExpdmVWaWV3IHNvbWV0aW1lcyByZXR1cm5zIGEgY2xvbmVkIHRyZWUsXG4gICAgICAgICAgLy8gIGJ1dCBrZXllZCBsb29rdXBzIHdvdWxkIHN0aWxsIHBvaW50IHRvIHRoZSBvcmlnaW5hbCB0cmVlKVxuICAgICAgICAgIGluZGV4VHJlZShmcm9tRWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIGF0dHJpYnV0ZXMgb24gb3JpZ2luYWwgRE9NIGVsZW1lbnQgZmlyc3RcbiAgICAgICAgbW9ycGhBdHRycyhmcm9tRWwsIHRvRWwpO1xuICAgICAgICAvLyBvcHRpb25hbFxuICAgICAgICBvbkVsVXBkYXRlZChmcm9tRWwpO1xuXG4gICAgICAgIGlmIChvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkKGZyb21FbCwgdG9FbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmcm9tRWwubm9kZU5hbWUgIT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgbW9ycGhDaGlsZHJlbihmcm9tRWwsIHRvRWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3BlY2lhbEVsSGFuZGxlcnMuVEVYVEFSRUEoZnJvbUVsLCB0b0VsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3JwaENoaWxkcmVuKGZyb21FbCwgdG9FbCkge1xuICAgICAgdmFyIHNraXBGcm9tID0gc2tpcEZyb21DaGlsZHJlbihmcm9tRWwsIHRvRWwpO1xuICAgICAgdmFyIGN1clRvTm9kZUNoaWxkID0gdG9FbC5maXJzdENoaWxkO1xuICAgICAgdmFyIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgIHZhciBjdXJUb05vZGVLZXk7XG4gICAgICB2YXIgY3VyRnJvbU5vZGVLZXk7XG5cbiAgICAgIHZhciBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICB2YXIgdG9OZXh0U2libGluZztcbiAgICAgIHZhciBtYXRjaGluZ0Zyb21FbDtcblxuICAgICAgLy8gd2FsayB0aGUgY2hpbGRyZW5cbiAgICAgIG91dGVyOiB3aGlsZSAoY3VyVG9Ob2RlQ2hpbGQpIHtcbiAgICAgICAgdG9OZXh0U2libGluZyA9IGN1clRvTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICBjdXJUb05vZGVLZXkgPSBnZXROb2RlS2V5KGN1clRvTm9kZUNoaWxkKTtcblxuICAgICAgICAvLyB3YWxrIHRoZSBmcm9tTm9kZSBjaGlsZHJlbiBhbGwgdGhlIHdheSB0aHJvdWdoXG4gICAgICAgIHdoaWxlICghc2tpcEZyb20gJiYgY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICAgIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICBpZiAoY3VyVG9Ob2RlQ2hpbGQuaXNTYW1lTm9kZSAmJiBjdXJUb05vZGVDaGlsZC5pc1NhbWVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgdmFyIGN1ckZyb21Ob2RlVHlwZSA9IGN1ckZyb21Ob2RlQ2hpbGQubm9kZVR5cGU7XG5cbiAgICAgICAgICAvLyB0aGlzIG1lYW5zIGlmIHRoZSBjdXJGcm9tTm9kZUNoaWxkIGRvZXNudCBoYXZlIGEgbWF0Y2ggd2l0aCB0aGUgY3VyVG9Ob2RlQ2hpbGRcbiAgICAgICAgICB2YXIgaXNDb21wYXRpYmxlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gY3VyVG9Ob2RlQ2hpbGQubm9kZVR5cGUpIHtcbiAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAvLyBCb3RoIG5vZGVzIGJlaW5nIGNvbXBhcmVkIGFyZSBFbGVtZW50IG5vZGVzXG5cbiAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSB0YXJnZXQgbm9kZSBoYXMgYSBrZXkgc28gd2Ugd2FudCB0byBtYXRjaCBpdCB1cCB3aXRoIHRoZSBjb3JyZWN0IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWVcbiAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICE9PSBjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUgZG9lcyBub3QgaGF2ZSBhIG1hdGNoaW5nIGtleSBzb1xuICAgICAgICAgICAgICAgICAgLy8gbGV0J3MgY2hlY2sgb3VyIGxvb2t1cCB0byBzZWUgaWYgdGhlcmUgaXMgYSBtYXRjaGluZyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgICAgICAgLy8gRE9NIHRyZWVcbiAgICAgICAgICAgICAgICAgIGlmICgobWF0Y2hpbmdGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBbY3VyVG9Ob2RlS2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyb21OZXh0U2libGluZyA9PT0gbWF0Y2hpbmdGcm9tRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIHNpbmdsZSBlbGVtZW50IHJlbW92YWxzLiBUbyBhdm9pZCByZW1vdmluZyB0aGUgb3JpZ2luYWxcbiAgICAgICAgICAgICAgICAgICAgICAvLyBET00gbm9kZSBvdXQgb2YgdGhlIHRyZWUgKHNpbmNlIHRoYXQgY2FuIGJyZWFrIENTUyB0cmFuc2l0aW9ucywgZXRjLiksXG4gICAgICAgICAgICAgICAgICAgICAgLy8gd2Ugd2lsbCBpbnN0ZWFkIGRpc2NhcmQgdGhlIGN1cnJlbnQgbm9kZSBhbmQgd2FpdCB1bnRpbCB0aGUgbmV4dFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZXJhdGlvbiB0byBwcm9wZXJseSBtYXRjaCB1cCB0aGUga2V5ZWQgdGFyZ2V0IGVsZW1lbnQgd2l0aCBpdHMgbWF0Y2hpbmdcbiAgICAgICAgICAgICAgICAgICAgICAvLyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgYSBtYXRjaGluZyBrZXllZCBlbGVtZW50IHNvbWV3aGVyZSBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gTGV0J3MgbW92ZSB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgaW50byB0aGUgY3VycmVudCBwb3NpdGlvbiBhbmQgbW9ycGhcbiAgICAgICAgICAgICAgICAgICAgICAvLyBpdC5cblxuICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFdlIHVzZSBpbnNlcnRCZWZvcmUgaW5zdGVhZCBvZiByZXBsYWNlQ2hpbGQgYmVjYXVzZSB3ZSB3YW50IHRvIGdvIHRocm91Z2hcbiAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYHJlbW92ZU5vZGUoKWAgZnVuY3Rpb24gZm9yIHRoZSBub2RlIHRoYXQgaXMgYmVpbmcgZGlzY2FyZGVkIHNvIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAvLyBhbGwgbGlmZWN5Y2xlIGhvb2tzIGFyZSBjb3JyZWN0bHkgaW52b2tlZFxuICAgICAgICAgICAgICAgICAgICAgIGZyb21FbC5pbnNlcnRCZWZvcmUobWF0Y2hpbmdGcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gbWF0Y2hpbmdGcm9tRWw7XG4gICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbm9kZXMgYXJlIG5vdCBjb21wYXRpYmxlIHNpbmNlIHRoZSBcInRvXCIgbm9kZSBoYXMgYSBrZXkgYW5kIHRoZXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIGlzIG5vIG1hdGNoaW5nIGtleWVkIG5vZGUgaW4gdGhlIHNvdXJjZSB0cmVlXG4gICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBvcmlnaW5hbCBoYXMgYSBrZXlcbiAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGlzQ29tcGF0aWJsZSAhPT0gZmFsc2UgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBjb21wYXRpYmxlIERPTSBlbGVtZW50cyBzbyB0cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBcImZyb21cIiBub2RlIHRvIG1hdGNoIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgLy8gdGFyZ2V0IERPTSBub2RlLlxuICAgICAgICAgICAgICAgIC8vIE1PUlBIXG4gICAgICAgICAgICAgICAgbW9ycGhFbChjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBjdXJGcm9tTm9kZVR5cGUgPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIFRleHQgb3IgQ29tbWVudCBub2Rlc1xuICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAvLyBTaW1wbHkgdXBkYXRlIG5vZGVWYWx1ZSBvbiB0aGUgb3JpZ2luYWwgbm9kZSB0b1xuICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHRleHQgdmFsdWVcbiAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlQ2hpbGQubm9kZVZhbHVlICE9PSBjdXJUb05vZGVDaGlsZC5ub2RlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkLm5vZGVWYWx1ZSA9IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgLy8gQWR2YW5jZSBib3RoIHRoZSBcInRvXCIgY2hpbGQgYW5kIHRoZSBcImZyb21cIiBjaGlsZCBzaW5jZSB3ZSBmb3VuZCBhIG1hdGNoXG4gICAgICAgICAgICAvLyBOb3RoaW5nIGVsc2UgdG8gZG8gYXMgd2UgYWxyZWFkeSByZWN1cnNpdmVseSBjYWxsZWQgbW9ycGhDaGlsZHJlbiBhYm92ZVxuICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE5vIGNvbXBhdGlibGUgbWF0Y2ggc28gcmVtb3ZlIHRoZSBvbGQgbm9kZSBmcm9tIHRoZSBET00gYW5kIGNvbnRpbnVlIHRyeWluZyB0byBmaW5kIGFcbiAgICAgICAgICAvLyBtYXRjaCBpbiB0aGUgb3JpZ2luYWwgRE9NLiBIb3dldmVyLCB3ZSBvbmx5IGRvIHRoaXMgaWYgdGhlIGZyb20gbm9kZSBpcyBub3Qga2V5ZWRcbiAgICAgICAgICAvLyBzaW5jZSBpdCBpcyBwb3NzaWJsZSB0aGF0IGEga2V5ZWQgbm9kZSBtaWdodCBtYXRjaCB1cCB3aXRoIGEgbm9kZSBzb21ld2hlcmUgZWxzZSBpbiB0aGVcbiAgICAgICAgICAvLyB0YXJnZXQgdHJlZSBhbmQgd2UgZG9uJ3Qgd2FudCB0byBkaXNjYXJkIGl0IGp1c3QgeWV0IHNpbmNlIGl0IHN0aWxsIG1pZ2h0IGZpbmQgYVxuICAgICAgICAgIC8vIGhvbWUgaW4gdGhlIGZpbmFsIERPTSB0cmVlLiBBZnRlciBldmVyeXRoaW5nIGlzIGRvbmUgd2Ugd2lsbCByZW1vdmUgYW55IGtleWVkIG5vZGVzXG4gICAgICAgICAgLy8gdGhhdCBkaWRuJ3QgZmluZCBhIGhvbWVcbiAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgfSAvLyBFTkQ6IHdoaWxlKGN1ckZyb21Ob2RlQ2hpbGQpIHt9XG5cbiAgICAgICAgLy8gSWYgd2UgZ290IHRoaXMgZmFyIHRoZW4gd2UgZGlkIG5vdCBmaW5kIGEgY2FuZGlkYXRlIG1hdGNoIGZvclxuICAgICAgICAvLyBvdXIgXCJ0byBub2RlXCIgYW5kIHdlIGV4aGF1c3RlZCBhbGwgb2YgdGhlIGNoaWxkcmVuIFwiZnJvbVwiXG4gICAgICAgIC8vIG5vZGVzLiBUaGVyZWZvcmUsIHdlIHdpbGwganVzdCBhcHBlbmQgdGhlIGN1cnJlbnQgXCJ0b1wiIG5vZGVcbiAgICAgICAgLy8gdG8gdGhlIGVuZFxuICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICYmIChtYXRjaGluZ0Zyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtjdXJUb05vZGVLZXldKSAmJiBjb21wYXJlTm9kZU5hbWVzKG1hdGNoaW5nRnJvbUVsLCBjdXJUb05vZGVDaGlsZCkpIHtcbiAgICAgICAgICAvLyBNT1JQSFxuICAgICAgICAgIGlmKCFza2lwRnJvbSl7IGFkZENoaWxkKGZyb21FbCwgbWF0Y2hpbmdGcm9tRWwpOyB9XG4gICAgICAgICAgbW9ycGhFbChtYXRjaGluZ0Zyb21FbCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCA9IG9uQmVmb3JlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQpIHtcbiAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZSkge1xuICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZShmcm9tRWwub3duZXJEb2N1bWVudCB8fCBkb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkQ2hpbGQoZnJvbUVsLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgIH1cblxuICAgICAgY2xlYW51cEZyb21FbChmcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQsIGN1ckZyb21Ob2RlS2V5KTtcblxuICAgICAgdmFyIHNwZWNpYWxFbEhhbmRsZXIgPSBzcGVjaWFsRWxIYW5kbGVyc1tmcm9tRWwubm9kZU5hbWVdO1xuICAgICAgaWYgKHNwZWNpYWxFbEhhbmRsZXIpIHtcbiAgICAgICAgc3BlY2lhbEVsSGFuZGxlcihmcm9tRWwsIHRvRWwpO1xuICAgICAgfVxuICAgIH0gLy8gRU5EOiBtb3JwaENoaWxkcmVuKC4uLilcblxuICAgIHZhciBtb3JwaGVkTm9kZSA9IGZyb21Ob2RlO1xuICAgIHZhciBtb3JwaGVkTm9kZVR5cGUgPSBtb3JwaGVkTm9kZS5ub2RlVHlwZTtcbiAgICB2YXIgdG9Ob2RlVHlwZSA9IHRvTm9kZS5ub2RlVHlwZTtcblxuICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgYXJlIGdpdmVuIHR3byBET00gbm9kZXMgdGhhdCBhcmUgbm90XG4gICAgICAvLyBjb21wYXRpYmxlIChlLmcuIDxkaXY+IC0tPiA8c3Bhbj4gb3IgPGRpdj4gLS0+IFRFWFQpXG4gICAgICBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgIGlmICghY29tcGFyZU5vZGVOYW1lcyhmcm9tTm9kZSwgdG9Ob2RlKSkge1xuICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGZyb21Ob2RlKTtcbiAgICAgICAgICAgIG1vcnBoZWROb2RlID0gbW92ZUNoaWxkcmVuKGZyb21Ob2RlLCBjcmVhdGVFbGVtZW50TlModG9Ob2RlLm5vZGVOYW1lLCB0b05vZGUubmFtZXNwYWNlVVJJKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEdvaW5nIGZyb20gYW4gZWxlbWVudCBub2RlIHRvIGEgdGV4dCBub2RlXG4gICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBURVhUX05PREUgfHwgbW9ycGhlZE5vZGVUeXBlID09PSBDT01NRU5UX05PREUpIHsgLy8gVGV4dCBvciBjb21tZW50IG5vZGVcbiAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IG1vcnBoZWROb2RlVHlwZSkge1xuICAgICAgICAgIGlmIChtb3JwaGVkTm9kZS5ub2RlVmFsdWUgIT09IHRvTm9kZS5ub2RlVmFsdWUpIHtcbiAgICAgICAgICAgIG1vcnBoZWROb2RlLm5vZGVWYWx1ZSA9IHRvTm9kZS5ub2RlVmFsdWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRleHQgbm9kZSB0byBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vcnBoZWROb2RlID09PSB0b05vZGUpIHtcbiAgICAgIC8vIFRoZSBcInRvIG5vZGVcIiB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgXCJmcm9tIG5vZGVcIiBzbyB3ZSBoYWQgdG9cbiAgICAgIC8vIHRvc3Mgb3V0IHRoZSBcImZyb20gbm9kZVwiIGFuZCB1c2UgdGhlIFwidG8gbm9kZVwiXG4gICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9Ob2RlLmlzU2FtZU5vZGUgJiYgdG9Ob2RlLmlzU2FtZU5vZGUobW9ycGhlZE5vZGUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbW9ycGhFbChtb3JwaGVkTm9kZSwgdG9Ob2RlLCBjaGlsZHJlbk9ubHkpO1xuXG4gICAgICAvLyBXZSBub3cgbmVlZCB0byBsb29wIG92ZXIgYW55IGtleWVkIG5vZGVzIHRoYXQgbWlnaHQgbmVlZCB0byBiZVxuICAgICAgLy8gcmVtb3ZlZC4gV2Ugb25seSBkbyB0aGUgcmVtb3ZhbCBpZiB3ZSBrbm93IHRoYXQgdGhlIGtleWVkIG5vZGVcbiAgICAgIC8vIG5ldmVyIGZvdW5kIGEgbWF0Y2guIFdoZW4gYSBrZXllZCBub2RlIGlzIG1hdGNoZWQgdXAgd2UgcmVtb3ZlXG4gICAgICAvLyBpdCBvdXQgb2YgZnJvbU5vZGVzTG9va3VwIGFuZCB3ZSB1c2UgZnJvbU5vZGVzTG9va3VwIHRvIGRldGVybWluZVxuICAgICAgLy8gaWYgYSBrZXllZCBub2RlIGhhcyBiZWVuIG1hdGNoZWQgdXAgb3Igbm90XG4gICAgICBpZiAoa2V5ZWRSZW1vdmFsTGlzdCkge1xuICAgICAgICBmb3IgKHZhciBpPTAsIGxlbj1rZXllZFJlbW92YWxMaXN0Lmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICAgIHZhciBlbFRvUmVtb3ZlID0gZnJvbU5vZGVzTG9va3VwW2tleWVkUmVtb3ZhbExpc3RbaV1dO1xuICAgICAgICAgIGlmIChlbFRvUmVtb3ZlKSB7XG4gICAgICAgICAgICByZW1vdmVOb2RlKGVsVG9SZW1vdmUsIGVsVG9SZW1vdmUucGFyZW50Tm9kZSwgZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2hpbGRyZW5Pbmx5ICYmIG1vcnBoZWROb2RlICE9PSBmcm9tTm9kZSAmJiBmcm9tTm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICBpZiAobW9ycGhlZE5vZGUuYWN0dWFsaXplKSB7XG4gICAgICAgIG1vcnBoZWROb2RlID0gbW9ycGhlZE5vZGUuYWN0dWFsaXplKGZyb21Ob2RlLm93bmVyRG9jdW1lbnQgfHwgZG9jKTtcbiAgICAgIH1cbiAgICAgIC8vIElmIHdlIGhhZCB0byBzd2FwIG91dCB0aGUgZnJvbSBub2RlIHdpdGggYSBuZXcgbm9kZSBiZWNhdXNlIHRoZSBvbGRcbiAgICAgIC8vIG5vZGUgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIHRhcmdldCBub2RlIHRoZW4gd2UgbmVlZCB0b1xuICAgICAgLy8gcmVwbGFjZSB0aGUgb2xkIERPTSBub2RlIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS4gVGhpcyBpcyBvbmx5XG4gICAgICAvLyBwb3NzaWJsZSBpZiB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgd2FzIHBhcnQgb2YgYSBET00gdHJlZSB3aGljaFxuICAgICAgLy8gd2Uga25vdyBpcyB0aGUgY2FzZSBpZiBpdCBoYXMgYSBwYXJlbnQgbm9kZS5cbiAgICAgIGZyb21Ob2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG1vcnBoZWROb2RlLCBmcm9tTm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICB9O1xufVxuXG52YXIgbW9ycGhkb20gPSBtb3JwaGRvbUZhY3RvcnkobW9ycGhBdHRycyk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vcnBoZG9tO1xuIiwgImltcG9ydCB7XG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9QUlVORSxcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9TRVNTSU9OLFxuICBQSFhfU0tJUCxcbiAgUEhYX01BR0lDX0lELFxuICBQSFhfU1RBVElDLFxuICBQSFhfVFJJR0dFUl9BQ1RJT04sXG4gIFBIWF9VUERBVEUsXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUkVGX0xPQ0ssXG4gIFBIWF9TVFJFQU0sXG4gIFBIWF9TVFJFQU1fUkVGLFxuICBQSFhfVklFV1BPUlRfVE9QLFxuICBQSFhfVklFV1BPUlRfQk9UVE9NLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBkZXRlY3REdXBsaWNhdGVJZHMsXG4gIGRldGVjdEludmFsaWRTdHJlYW1JbnNlcnRzLFxuICBpc0NpZFxufSBmcm9tIFwiLi91dGlsc1wiXG5pbXBvcnQgRWxlbWVudFJlZiBmcm9tIFwiLi9lbGVtZW50X3JlZlwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgRE9NUG9zdE1vcnBoUmVzdG9yZXIgZnJvbSBcIi4vZG9tX3Bvc3RfbW9ycGhfcmVzdG9yZXJcIlxuaW1wb3J0IG1vcnBoZG9tIGZyb20gXCJtb3JwaGRvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERPTVBhdGNoIHtcbiAgY29uc3RydWN0b3IodmlldywgY29udGFpbmVyLCBpZCwgaHRtbCwgc3RyZWFtcywgdGFyZ2V0Q0lELCBvcHRzPXt9KXtcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5saXZlU29ja2V0ID0gdmlldy5saXZlU29ja2V0XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJcbiAgICB0aGlzLmlkID0gaWRcbiAgICB0aGlzLnJvb3RJRCA9IHZpZXcucm9vdC5pZFxuICAgIHRoaXMuaHRtbCA9IGh0bWxcbiAgICB0aGlzLnN0cmVhbXMgPSBzdHJlYW1zXG4gICAgdGhpcy5zdHJlYW1JbnNlcnRzID0ge31cbiAgICB0aGlzLnN0cmVhbUNvbXBvbmVudFJlc3RvcmUgPSB7fVxuICAgIHRoaXMudGFyZ2V0Q0lEID0gdGFyZ2V0Q0lEXG4gICAgdGhpcy5jaWRQYXRjaCA9IGlzQ2lkKHRoaXMudGFyZ2V0Q0lEKVxuICAgIHRoaXMucGVuZGluZ1JlbW92ZXMgPSBbXVxuICAgIHRoaXMucGh4UmVtb3ZlID0gdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoXCJyZW1vdmVcIilcbiAgICB0aGlzLnRhcmdldENvbnRhaW5lciA9IHRoaXMuaXNDSURQYXRjaCgpID8gdGhpcy50YXJnZXRDSURDb250YWluZXIoaHRtbCkgOiBjb250YWluZXJcbiAgICB0aGlzLmNhbGxiYWNrcyA9IHtcbiAgICAgIGJlZm9yZWFkZGVkOiBbXSwgYmVmb3JldXBkYXRlZDogW10sIGJlZm9yZXBoeENoaWxkQWRkZWQ6IFtdLFxuICAgICAgYWZ0ZXJhZGRlZDogW10sIGFmdGVydXBkYXRlZDogW10sIGFmdGVyZGlzY2FyZGVkOiBbXSwgYWZ0ZXJwaHhDaGlsZEFkZGVkOiBbXSxcbiAgICAgIGFmdGVydHJhbnNpdGlvbnNEaXNjYXJkZWQ6IFtdXG4gICAgfVxuICAgIHRoaXMud2l0aENoaWxkcmVuID0gb3B0cy53aXRoQ2hpbGRyZW4gfHwgb3B0cy51bmRvUmVmIHx8IGZhbHNlXG4gICAgdGhpcy51bmRvUmVmID0gb3B0cy51bmRvUmVmXG4gIH1cblxuICBiZWZvcmUoa2luZCwgY2FsbGJhY2speyB0aGlzLmNhbGxiYWNrc1tgYmVmb3JlJHtraW5kfWBdLnB1c2goY2FsbGJhY2spIH1cbiAgYWZ0ZXIoa2luZCwgY2FsbGJhY2speyB0aGlzLmNhbGxiYWNrc1tgYWZ0ZXIke2tpbmR9YF0ucHVzaChjYWxsYmFjaykgfVxuXG4gIHRyYWNrQmVmb3JlKGtpbmQsIC4uLmFyZ3Mpe1xuICAgIHRoaXMuY2FsbGJhY2tzW2BiZWZvcmUke2tpbmR9YF0uZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayguLi5hcmdzKSlcbiAgfVxuXG4gIHRyYWNrQWZ0ZXIoa2luZCwgLi4uYXJncyl7XG4gICAgdGhpcy5jYWxsYmFja3NbYGFmdGVyJHtraW5kfWBdLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpXG4gIH1cblxuICBtYXJrUHJ1bmFibGVDb250ZW50Rm9yUmVtb3ZhbCgpe1xuICAgIGxldCBwaHhVcGRhdGUgPSB0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhQSFhfVVBEQVRFKVxuICAgIERPTS5hbGwodGhpcy5jb250YWluZXIsIGBbJHtwaHhVcGRhdGV9PWFwcGVuZF0gPiAqLCBbJHtwaHhVcGRhdGV9PXByZXBlbmRdID4gKmAsIGVsID0+IHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShQSFhfUFJVTkUsIFwiXCIpXG4gICAgfSlcbiAgfVxuXG4gIHBlcmZvcm0oaXNKb2luUGF0Y2gpe1xuICAgIGxldCB7dmlldywgbGl2ZVNvY2tldCwgaHRtbCwgY29udGFpbmVyLCB0YXJnZXRDb250YWluZXJ9ID0gdGhpc1xuICAgIGlmKHRoaXMuaXNDSURQYXRjaCgpICYmICF0YXJnZXRDb250YWluZXIpeyByZXR1cm4gfVxuXG4gICAgbGV0IGZvY3VzZWQgPSBsaXZlU29ja2V0LmdldEFjdGl2ZUVsZW1lbnQoKVxuICAgIGxldCB7c2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZH0gPSBmb2N1c2VkICYmIERPTS5oYXNTZWxlY3Rpb25SYW5nZShmb2N1c2VkKSA/IGZvY3VzZWQgOiB7fVxuICAgIGxldCBwaHhVcGRhdGUgPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX1VQREFURSlcbiAgICBsZXQgcGh4Vmlld3BvcnRUb3AgPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX1ZJRVdQT1JUX1RPUClcbiAgICBsZXQgcGh4Vmlld3BvcnRCb3R0b20gPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX1ZJRVdQT1JUX0JPVFRPTSlcbiAgICBsZXQgcGh4VHJpZ2dlckV4dGVybmFsID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9UUklHR0VSX0FDVElPTilcbiAgICBsZXQgYWRkZWQgPSBbXVxuICAgIGxldCB1cGRhdGVzID0gW11cbiAgICBsZXQgYXBwZW5kUHJlcGVuZFVwZGF0ZXMgPSBbXVxuXG4gICAgbGV0IGV4dGVybmFsRm9ybVRyaWdnZXJlZCA9IG51bGxcblxuICAgIGZ1bmN0aW9uIG1vcnBoKHRhcmdldENvbnRhaW5lciwgc291cmNlLCB3aXRoQ2hpbGRyZW49dGhpcy53aXRoQ2hpbGRyZW4pe1xuICAgICAgbGV0IG1vcnBoQ2FsbGJhY2tzID0ge1xuICAgICAgICAvLyBub3JtYWxseSwgd2UgYXJlIHJ1bm5pbmcgd2l0aCBjaGlsZHJlbk9ubHksIGFzIHRoZSBwYXRjaCBIVE1MIGZvciBhIExWXG4gICAgICAgIC8vIGRvZXMgbm90IGluY2x1ZGUgdGhlIExWIGF0dHJzIChkYXRhLXBoeC1zZXNzaW9uLCBldGMuKVxuICAgICAgICAvLyB3aGVuIHdlIGFyZSBwYXRjaGluZyBhIGxpdmUgY29tcG9uZW50LCB3ZSBkbyB3YW50IHRvIHBhdGNoIHRoZSByb290IGVsZW1lbnQgYXMgd2VsbDtcbiAgICAgICAgLy8gYW5vdGhlciBjYXNlIGlzIHRoZSByZWN1cnNpdmUgcGF0Y2ggb2YgYSBzdHJlYW0gaXRlbSB0aGF0IHdhcyBrZXB0IG9uIHJlc2V0ICgtPiBvbkJlZm9yZU5vZGVBZGRlZClcbiAgICAgICAgY2hpbGRyZW5Pbmx5OiB0YXJnZXRDb250YWluZXIuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpID09PSBudWxsICYmICF3aXRoQ2hpbGRyZW4sXG4gICAgICAgIGdldE5vZGVLZXk6IChub2RlKSA9PiB7XG4gICAgICAgICAgaWYoRE9NLmlzUGh4RGVzdHJveWVkKG5vZGUpKXsgcmV0dXJuIG51bGwgfVxuICAgICAgICAgIC8vIElmIHdlIGhhdmUgYSBqb2luIHBhdGNoLCB0aGVuIGJ5IGRlZmluaXRpb24gdGhlcmUgd2FzIG5vIFBIWF9NQUdJQ19JRC5cbiAgICAgICAgICAvLyBUaGlzIGlzIGltcG9ydGFudCB0byByZWR1Y2UgdGhlIGFtb3VudCBvZiBlbGVtZW50cyBtb3JwaGRvbSBkaXNjYXJkcy5cbiAgICAgICAgICBpZihpc0pvaW5QYXRjaCl7IHJldHVybiBub2RlLmlkIH1cbiAgICAgICAgICByZXR1cm4gbm9kZS5pZCB8fCAobm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX01BR0lDX0lEKSlcbiAgICAgICAgfSxcbiAgICAgICAgLy8gc2tpcCBpbmRleGluZyBmcm9tIGNoaWxkcmVuIHdoZW4gY29udGFpbmVyIGlzIHN0cmVhbVxuICAgICAgICBza2lwRnJvbUNoaWxkcmVuOiAoZnJvbSkgPT4geyByZXR1cm4gZnJvbS5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSA9PT0gUEhYX1NUUkVBTSB9LFxuICAgICAgICAvLyB0ZWxsIG1vcnBoZG9tIGhvdyB0byBhZGQgYSBjaGlsZFxuICAgICAgICBhZGRDaGlsZDogKHBhcmVudCwgY2hpbGQpID0+IHtcbiAgICAgICAgICBsZXQge3JlZiwgc3RyZWFtQXR9ID0gdGhpcy5nZXRTdHJlYW1JbnNlcnQoY2hpbGQpXG4gICAgICAgICAgaWYocmVmID09PSB1bmRlZmluZWQpeyByZXR1cm4gcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKSB9XG5cbiAgICAgICAgICB0aGlzLnNldFN0cmVhbVJlZihjaGlsZCwgcmVmKVxuXG4gICAgICAgICAgLy8gc3RyZWFtaW5nXG4gICAgICAgICAgaWYoc3RyZWFtQXQgPT09IDApe1xuICAgICAgICAgICAgcGFyZW50Lmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgY2hpbGQpXG4gICAgICAgICAgfSBlbHNlIGlmKHN0cmVhbUF0ID09PSAtMSl7XG4gICAgICAgICAgICBsZXQgbGFzdENoaWxkID0gcGFyZW50Lmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgICAgIGlmKGxhc3RDaGlsZCAmJiAhbGFzdENoaWxkLmhhc0F0dHJpYnV0ZShQSFhfU1RSRUFNX1JFRikpe1xuICAgICAgICAgICAgICBsZXQgbm9uU3RyZWFtQ2hpbGQgPSBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuZmluZChjID0+ICFjLmhhc0F0dHJpYnV0ZShQSFhfU1RSRUFNX1JFRikpXG4gICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIG5vblN0cmVhbUNoaWxkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZihzdHJlYW1BdCA+IDApe1xuICAgICAgICAgICAgbGV0IHNpYmxpbmcgPSBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbilbc3RyZWFtQXRdXG4gICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCBzaWJsaW5nKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25CZWZvcmVOb2RlQWRkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIERPTS5tYWludGFpblByaXZhdGVIb29rcyhlbCwgZWwsIHBoeFZpZXdwb3J0VG9wLCBwaHhWaWV3cG9ydEJvdHRvbSlcbiAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwiYWRkZWRcIiwgZWwpXG5cbiAgICAgICAgICBsZXQgbW9ycGhlZEVsID0gZWxcbiAgICAgICAgICAvLyB0aGlzIGlzIGEgc3RyZWFtIGl0ZW0gdGhhdCB3YXMga2VwdCBvbiByZXNldCwgcmVjdXJzaXZlbHkgbW9ycGggaXRcbiAgICAgICAgICBpZih0aGlzLnN0cmVhbUNvbXBvbmVudFJlc3RvcmVbZWwuaWRdKXtcbiAgICAgICAgICAgIG1vcnBoZWRFbCA9IHRoaXMuc3RyZWFtQ29tcG9uZW50UmVzdG9yZVtlbC5pZF1cbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnN0cmVhbUNvbXBvbmVudFJlc3RvcmVbZWwuaWRdXG4gICAgICAgICAgICBtb3JwaC5jYWxsKHRoaXMsIG1vcnBoZWRFbCwgZWwsIHRydWUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG1vcnBoZWRFbFxuICAgICAgICB9LFxuICAgICAgICBvbk5vZGVBZGRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgaWYoZWwuZ2V0QXR0cmlidXRlKXsgdGhpcy5tYXliZVJlT3JkZXJTdHJlYW0oZWwsIHRydWUpIH1cblxuICAgICAgICAgIC8vIGhhY2sgdG8gZml4IFNhZmFyaSBoYW5kbGluZyBvZiBpbWcgc3Jjc2V0IGFuZCB2aWRlbyB0YWdzXG4gICAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ICYmIGVsLnNyY3NldCl7XG4gICAgICAgICAgICBlbC5zcmNzZXQgPSBlbC5zcmNzZXRcbiAgICAgICAgICB9IGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBIVE1MVmlkZW9FbGVtZW50ICYmIGVsLmF1dG9wbGF5KXtcbiAgICAgICAgICAgIGVsLnBsYXkoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihET00uaXNOb3dUcmlnZ2VyRm9ybUV4dGVybmFsKGVsLCBwaHhUcmlnZ2VyRXh0ZXJuYWwpKXtcbiAgICAgICAgICAgIGV4dGVybmFsRm9ybVRyaWdnZXJlZCA9IGVsXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbmVzdGVkIHZpZXcgaGFuZGxpbmdcbiAgICAgICAgICBpZigoRE9NLmlzUGh4Q2hpbGQoZWwpICYmIHZpZXcub3duc0VsZW1lbnQoZWwpKSB8fCBET00uaXNQaHhTdGlja3koZWwpICYmIHZpZXcub3duc0VsZW1lbnQoZWwucGFyZW50Tm9kZSkpe1xuICAgICAgICAgICAgdGhpcy50cmFja0FmdGVyKFwicGh4Q2hpbGRBZGRlZFwiLCBlbClcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkZWQucHVzaChlbClcbiAgICAgICAgfSxcbiAgICAgICAgb25Ob2RlRGlzY2FyZGVkOiAoZWwpID0+IHRoaXMub25Ob2RlRGlzY2FyZGVkKGVsKSxcbiAgICAgICAgb25CZWZvcmVOb2RlRGlzY2FyZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICBpZihlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9QUlVORSkgIT09IG51bGwpeyByZXR1cm4gdHJ1ZSB9XG4gICAgICAgICAgaWYoZWwucGFyZW50RWxlbWVudCAhPT0gbnVsbCAmJiBlbC5pZCAmJlxuICAgICAgICAgICAgRE9NLmlzUGh4VXBkYXRlKGVsLnBhcmVudEVsZW1lbnQsIHBoeFVwZGF0ZSwgW1BIWF9TVFJFQU0sIFwiYXBwZW5kXCIsIFwicHJlcGVuZFwiXSkpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHRoaXMubWF5YmVQZW5kaW5nUmVtb3ZlKGVsKSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgaWYodGhpcy5za2lwQ0lEU2libGluZyhlbCkpeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgb25FbFVwZGF0ZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIGlmKERPTS5pc05vd1RyaWdnZXJGb3JtRXh0ZXJuYWwoZWwsIHBoeFRyaWdnZXJFeHRlcm5hbCkpe1xuICAgICAgICAgICAgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gZWxcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlcy5wdXNoKGVsKVxuICAgICAgICAgIHRoaXMubWF5YmVSZU9yZGVyU3RyZWFtKGVsLCBmYWxzZSlcbiAgICAgICAgfSxcbiAgICAgICAgb25CZWZvcmVFbFVwZGF0ZWQ6IChmcm9tRWwsIHRvRWwpID0+IHtcbiAgICAgICAgICAvLyBpZiB3ZSBhcmUgcGF0Y2hpbmcgdGhlIHJvb3QgdGFyZ2V0IGNvbnRhaW5lciBhbmQgdGhlIGlkIGhhcyBjaGFuZ2VkLCB0cmVhdCBpdCBhcyBhIG5ldyBub2RlXG4gICAgICAgICAgLy8gYnkgcmVwbGFjaW5nIHRoZSBmcm9tRWwgd2l0aCB0aGUgdG9FbCwgd2hpY2ggZW5zdXJlcyBob29rcyBhcmUgdG9ybiBkb3duIGFuZCByZS1jcmVhdGVkXG4gICAgICAgICAgaWYoZnJvbUVsLmlkICYmIGZyb21FbC5pc1NhbWVOb2RlKHRhcmdldENvbnRhaW5lcikgJiYgZnJvbUVsLmlkICE9PSB0b0VsLmlkKXtcbiAgICAgICAgICAgIG1vcnBoQ2FsbGJhY2tzLm9uTm9kZURpc2NhcmRlZChmcm9tRWwpXG4gICAgICAgICAgICBmcm9tRWwucmVwbGFjZVdpdGgodG9FbClcbiAgICAgICAgICAgIHJldHVybiBtb3JwaENhbGxiYWNrcy5vbk5vZGVBZGRlZCh0b0VsKVxuICAgICAgICAgIH1cbiAgICAgICAgICBET00uc3luY1BlbmRpbmdBdHRycyhmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgRE9NLm1haW50YWluUHJpdmF0ZUhvb2tzKGZyb21FbCwgdG9FbCwgcGh4Vmlld3BvcnRUb3AsIHBoeFZpZXdwb3J0Qm90dG9tKVxuICAgICAgICAgIERPTS5jbGVhbkNoaWxkTm9kZXModG9FbCwgcGh4VXBkYXRlKVxuICAgICAgICAgIGlmKHRoaXMuc2tpcENJRFNpYmxpbmcodG9FbCkpe1xuICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIGxpdmUgY29tcG9uZW50IHVzZWQgaW4gYSBzdHJlYW0sIHdlIG1heSBuZWVkIHRvIHJlb3JkZXIgaXRcbiAgICAgICAgICAgIHRoaXMubWF5YmVSZU9yZGVyU3RyZWFtKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihET00uaXNQaHhTdGlja3koZnJvbUVsKSl7XG4gICAgICAgICAgICBbUEhYX1NFU1NJT04sIFBIWF9TVEFUSUMsIFBIWF9ST09UX0lEXVxuICAgICAgICAgICAgICAubWFwKGF0dHIgPT4gW2F0dHIsIGZyb21FbC5nZXRBdHRyaWJ1dGUoYXR0ciksIHRvRWwuZ2V0QXR0cmlidXRlKGF0dHIpXSlcbiAgICAgICAgICAgICAgLmZvckVhY2goKFthdHRyLCBmcm9tVmFsLCB0b1ZhbF0pID0+IHtcbiAgICAgICAgICAgICAgICBpZih0b1ZhbCAmJiBmcm9tVmFsICE9PSB0b1ZhbCl7IGZyb21FbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdG9WYWwpIH1cbiAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKERPTS5pc0lnbm9yZWQoZnJvbUVsLCBwaHhVcGRhdGUpIHx8IChmcm9tRWwuZm9ybSAmJiBmcm9tRWwuZm9ybS5pc1NhbWVOb2RlKGV4dGVybmFsRm9ybVRyaWdnZXJlZCkpKXtcbiAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIERPTS5tZXJnZUF0dHJzKGZyb21FbCwgdG9FbCwge2lzSWdub3JlZDogRE9NLmlzSWdub3JlZChmcm9tRWwsIHBoeFVwZGF0ZSl9KVxuICAgICAgICAgICAgdXBkYXRlcy5wdXNoKGZyb21FbClcbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnMoZnJvbUVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGZyb21FbC50eXBlID09PSBcIm51bWJlclwiICYmIChmcm9tRWwudmFsaWRpdHkgJiYgZnJvbUVsLnZhbGlkaXR5LmJhZElucHV0KSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgLy8gSWYgdGhlIGVsZW1lbnQgaGFzIFBIWF9SRUZfU1JDLCBpdCBpcyBsb2FkaW5nIG9yIGxvY2tlZCBhbmQgYXdhaXRpbmcgYW4gYWNrLlxuICAgICAgICAgIC8vIElmIGl0J3MgbG9ja2VkLCB3ZSBjbG9uZSB0aGUgZnJvbUVsIHRyZWUgYW5kIGluc3RydWN0IG1vcnBoZG9tIHRvIHVzZVxuICAgICAgICAgIC8vIHRoZSBjbG9uZWQgdHJlZSBhcyB0aGUgc291cmNlIG9mIHRoZSBtb3JwaCBmb3IgdGhpcyBicmFuY2ggZnJvbSBoZXJlIG9uIG91dC5cbiAgICAgICAgICAvLyBXZSBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBjbG9uZWQgdHJlZSBpbiB0aGUgZWxlbWVudCdzIHByaXZhdGUgZGF0YSwgYW5kXG4gICAgICAgICAgLy8gb24gYWNrICh2aWV3LnVuZG9SZWZzKSwgd2UgbW9ycGggdGhlIGNsb25lZCB0cmVlIHdpdGggdGhlIHRydWUgZnJvbUVsIGluIHRoZSBET00gdG9cbiAgICAgICAgICAvLyBhcHBseSBhbnkgY2hhbmdlcyB0aGF0IGhhcHBlbmVkIHdoaWxlIHRoZSBlbGVtZW50IHdhcyBsb2NrZWQuXG4gICAgICAgICAgbGV0IGlzRm9jdXNlZEZvcm1FbCA9IGZvY3VzZWQgJiYgZnJvbUVsLmlzU2FtZU5vZGUoZm9jdXNlZCkgJiYgRE9NLmlzRm9ybUlucHV0KGZyb21FbClcbiAgICAgICAgICBsZXQgZm9jdXNlZFNlbGVjdENoYW5nZWQgPSBpc0ZvY3VzZWRGb3JtRWwgJiYgdGhpcy5pc0NoYW5nZWRTZWxlY3QoZnJvbUVsLCB0b0VsKVxuICAgICAgICAgIGlmKGZyb21FbC5oYXNBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpKXtcbiAgICAgICAgICAgIGNvbnN0IHJlZiA9IG5ldyBFbGVtZW50UmVmKGZyb21FbClcbiAgICAgICAgICAgIC8vIG9ubHkgcGVyZm9ybSB0aGUgY2xvbmUgc3RlcCBpZiB0aGlzIGlzIG5vdCBhIHBhdGNoIHRoYXQgdW5sb2Nrc1xuICAgICAgICAgICAgaWYocmVmLmxvY2tSZWYgJiYgKCF0aGlzLnVuZG9SZWYgfHwgIXJlZi5pc0xvY2tVbmRvbmVCeSh0aGlzLnVuZG9SZWYpKSl7XG4gICAgICAgICAgICAgIGlmKERPTS5pc1VwbG9hZElucHV0KGZyb21FbCkpe1xuICAgICAgICAgICAgICAgIERPTS5tZXJnZUF0dHJzKGZyb21FbCwgdG9FbCwge2lzSWdub3JlZDogdHJ1ZX0pXG4gICAgICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICAgIGxldCBpc0xvY2tlZCA9IGZyb21FbC5oYXNBdHRyaWJ1dGUoUEhYX1JFRl9MT0NLKVxuICAgICAgICAgICAgICBsZXQgY2xvbmUgPSBpc0xvY2tlZCA/IERPTS5wcml2YXRlKGZyb21FbCwgUEhYX1JFRl9MT0NLKSB8fCBmcm9tRWwuY2xvbmVOb2RlKHRydWUpIDogbnVsbFxuICAgICAgICAgICAgICBpZihjbG9uZSl7XG4gICAgICAgICAgICAgICAgRE9NLnB1dFByaXZhdGUoZnJvbUVsLCBQSFhfUkVGX0xPQ0ssIGNsb25lKVxuICAgICAgICAgICAgICAgIGlmKCFpc0ZvY3VzZWRGb3JtRWwpe1xuICAgICAgICAgICAgICAgICAgZnJvbUVsID0gY2xvbmVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBuZXN0ZWQgdmlldyBoYW5kbGluZ1xuICAgICAgICAgIGlmKERPTS5pc1BoeENoaWxkKHRvRWwpKXtcbiAgICAgICAgICAgIGxldCBwcmV2U2Vzc2lvbiA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pXG4gICAgICAgICAgICBET00ubWVyZ2VBdHRycyhmcm9tRWwsIHRvRWwsIHtleGNsdWRlOiBbUEhYX1NUQVRJQ119KVxuICAgICAgICAgICAgaWYocHJldlNlc3Npb24gIT09IFwiXCIpeyBmcm9tRWwuc2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OLCBwcmV2U2Vzc2lvbikgfVxuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZShQSFhfUk9PVF9JRCwgdGhpcy5yb290SUQpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGlmIHdlIGFyZSB1bmRvaW5nIGEgbG9jaywgY29weSBwb3RlbnRpYWxseSBuZXN0ZWQgY2xvbmVzIG92ZXJcbiAgICAgICAgICBpZih0aGlzLnVuZG9SZWYgJiYgRE9NLnByaXZhdGUodG9FbCwgUEhYX1JFRl9MT0NLKSl7XG4gICAgICAgICAgICBET00ucHV0UHJpdmF0ZShmcm9tRWwsIFBIWF9SRUZfTE9DSywgRE9NLnByaXZhdGUodG9FbCwgUEhYX1JFRl9MT0NLKSlcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gbm93IGNvcHkgcmVndWxhciBET00ucHJpdmF0ZSBkYXRhXG4gICAgICAgICAgRE9NLmNvcHlQcml2YXRlcyh0b0VsLCBmcm9tRWwpXG5cbiAgICAgICAgICAvLyBza2lwIHBhdGNoaW5nIGZvY3VzZWQgaW5wdXRzIHVubGVzcyBmb2N1cyBpcyBhIHNlbGVjdCB0aGF0IGhhcyBjaGFuZ2VkIG9wdGlvbnNcbiAgICAgICAgICBpZihpc0ZvY3VzZWRGb3JtRWwgJiYgZnJvbUVsLnR5cGUgIT09IFwiaGlkZGVuXCIgJiYgIWZvY3VzZWRTZWxlY3RDaGFuZ2VkKXtcbiAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIERPTS5tZXJnZUZvY3VzZWRJbnB1dChmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgICBET00uc3luY0F0dHJzVG9Qcm9wcyhmcm9tRWwpXG4gICAgICAgICAgICB1cGRhdGVzLnB1c2goZnJvbUVsKVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gYmx1ciBmb2N1c2VkIHNlbGVjdCBpZiBpdCBjaGFuZ2VkIHNvIG5hdGl2ZSBVSSBpcyB1cGRhdGVkIChpZSBzYWZhcmkgd29uJ3QgdXBkYXRlIHZpc2libGUgb3B0aW9ucylcbiAgICAgICAgICAgIGlmKGZvY3VzZWRTZWxlY3RDaGFuZ2VkKXsgZnJvbUVsLmJsdXIoKSB9XG4gICAgICAgICAgICBpZihET00uaXNQaHhVcGRhdGUodG9FbCwgcGh4VXBkYXRlLCBbXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICAgICAgICAgIGFwcGVuZFByZXBlbmRVcGRhdGVzLnB1c2gobmV3IERPTVBvc3RNb3JwaFJlc3RvcmVyKGZyb21FbCwgdG9FbCwgdG9FbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSkpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIERPTS5zeW5jQXR0cnNUb1Byb3BzKHRvRWwpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKHRvRWwpXG4gICAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLCBmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgICByZXR1cm4gZnJvbUVsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBtb3JwaGRvbSh0YXJnZXRDb250YWluZXIsIHNvdXJjZSwgbW9ycGhDYWxsYmFja3MpXG4gICAgfVxuXG4gICAgdGhpcy50cmFja0JlZm9yZShcImFkZGVkXCIsIGNvbnRhaW5lcilcbiAgICB0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLCBjb250YWluZXIsIGNvbnRhaW5lcilcblxuICAgIGxpdmVTb2NrZXQudGltZShcIm1vcnBoZG9tXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc3RyZWFtcy5mb3JFYWNoKChbcmVmLCBpbnNlcnRzLCBkZWxldGVJZHMsIHJlc2V0XSkgPT4ge1xuICAgICAgICBpbnNlcnRzLmZvckVhY2goKFtrZXksIHN0cmVhbUF0LCBsaW1pdF0pID0+IHtcbiAgICAgICAgICB0aGlzLnN0cmVhbUluc2VydHNba2V5XSA9IHtyZWYsIHN0cmVhbUF0LCBsaW1pdCwgcmVzZXR9XG4gICAgICAgIH0pXG4gICAgICAgIGlmKHJlc2V0ICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgIERPTS5hbGwoY29udGFpbmVyLCBgWyR7UEhYX1NUUkVBTV9SRUZ9PVwiJHtyZWZ9XCJdYCwgY2hpbGQgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTdHJlYW1DaGlsZEVsZW1lbnQoY2hpbGQpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBkZWxldGVJZHMuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgbGV0IGNoaWxkID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtpZD1cIiR7aWR9XCJdYClcbiAgICAgICAgICBpZihjaGlsZCl7IHRoaXMucmVtb3ZlU3RyZWFtQ2hpbGRFbGVtZW50KGNoaWxkKSB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICAvLyBjbGVhciBzdHJlYW0gaXRlbXMgZnJvbSB0aGUgZGVhZCByZW5kZXIgaWYgdGhleSBhcmUgbm90IGluc2VydGVkIGFnYWluXG4gICAgICBpZihpc0pvaW5QYXRjaCl7XG4gICAgICAgIERPTS5hbGwodGhpcy5jb250YWluZXIsIGBbJHtwaHhVcGRhdGV9PSR7UEhYX1NUUkVBTX1dYClcbiAgICAgICAgICAvLyBpdCBpcyBpbXBvcnRhbnQgdG8gZmlsdGVyIHRoZSBlbGVtZW50IGJlZm9yZSByZW1vdmluZyB0aGVtLCBhc1xuICAgICAgICAgIC8vIGl0IG1heSBoYXBwZW4gdGhhdCBzdHJlYW1zIGFyZSBuZXN0ZWQgYW5kIHRoZSBvd25lciBjaGVjayBmYWlscyBpZlxuICAgICAgICAgIC8vIGEgcGFyZW50IGlzIHJlbW92ZWQgYmVmb3JlIGEgY2hpbGRcbiAgICAgICAgICAuZmlsdGVyKGVsID0+IHRoaXMudmlldy5vd25zRWxlbWVudChlbCkpXG4gICAgICAgICAgLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgQXJyYXkuZnJvbShlbC5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICAgIC8vIHdlIGFscmVhZHkgcGVyZm9ybWVkIHRoZSBvd25lciBjaGVjaywgZWFjaCBjaGlsZCBpcyBndWFyYW50ZWVkIHRvIGJlIG93bmVkXG4gICAgICAgICAgICAgIC8vIGJ5IHRoZSB2aWV3LiBUbyBwcmV2ZW50IHRoZSBuZXN0ZWQgb3duZXIgY2hlY2sgZnJvbSBmYWlsaW5nIGluIGNhc2Ugb2YgbmVzdGVkXG4gICAgICAgICAgICAgIC8vIHN0cmVhbXMgd2hlcmUgdGhlIHBhcmVudCBpcyByZW1vdmVkIGJlZm9yZSB0aGUgY2hpbGQsIHdlIGZvcmNlIHRoZSByZW1vdmFsXG4gICAgICAgICAgICAgIHRoaXMucmVtb3ZlU3RyZWFtQ2hpbGRFbGVtZW50KGNoaWxkLCB0cnVlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBtb3JwaC5jYWxsKHRoaXMsIHRhcmdldENvbnRhaW5lciwgaHRtbClcbiAgICB9KVxuXG4gICAgaWYobGl2ZVNvY2tldC5pc0RlYnVnRW5hYmxlZCgpKXtcbiAgICAgIGRldGVjdER1cGxpY2F0ZUlkcygpXG4gICAgICBkZXRlY3RJbnZhbGlkU3RyZWFtSW5zZXJ0cyh0aGlzLnN0cmVhbUluc2VydHMpXG4gICAgICAvLyB3YXJuIGlmIHRoZXJlIGFyZSBhbnkgaW5wdXRzIG5hbWVkIFwiaWRcIlxuICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRbbmFtZT1pZF1cIikpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgIGlmKG5vZGUuZm9ybSl7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkRldGVjdGVkIGFuIGlucHV0IHdpdGggbmFtZT1cXFwiaWRcXFwiIGluc2lkZSBhIGZvcm0hIFRoaXMgd2lsbCBjYXVzZSBwcm9ibGVtcyB3aGVuIHBhdGNoaW5nIHRoZSBET00uXFxuXCIsIG5vZGUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYoYXBwZW5kUHJlcGVuZFVwZGF0ZXMubGVuZ3RoID4gMCl7XG4gICAgICBsaXZlU29ja2V0LnRpbWUoXCJwb3N0LW1vcnBoIGFwcGVuZC9wcmVwZW5kIHJlc3RvcmF0aW9uXCIsICgpID0+IHtcbiAgICAgICAgYXBwZW5kUHJlcGVuZFVwZGF0ZXMuZm9yRWFjaCh1cGRhdGUgPT4gdXBkYXRlLnBlcmZvcm0oKSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgbGl2ZVNvY2tldC5zaWxlbmNlRXZlbnRzKCgpID0+IERPTS5yZXN0b3JlRm9jdXMoZm9jdXNlZCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCkpXG4gICAgRE9NLmRpc3BhdGNoRXZlbnQoZG9jdW1lbnQsIFwicGh4OnVwZGF0ZVwiKVxuICAgIGFkZGVkLmZvckVhY2goZWwgPT4gdGhpcy50cmFja0FmdGVyKFwiYWRkZWRcIiwgZWwpKVxuICAgIHVwZGF0ZXMuZm9yRWFjaChlbCA9PiB0aGlzLnRyYWNrQWZ0ZXIoXCJ1cGRhdGVkXCIsIGVsKSlcblxuICAgIHRoaXMudHJhbnNpdGlvblBlbmRpbmdSZW1vdmVzKClcblxuICAgIGlmKGV4dGVybmFsRm9ybVRyaWdnZXJlZCl7XG4gICAgICBsaXZlU29ja2V0LnVubG9hZCgpXG4gICAgICAvLyBjaGVjayBmb3Igc3VibWl0dGVyIGFuZCBpbmplY3QgaXQgYXMgaGlkZGVuIGlucHV0IGZvciBleHRlcm5hbCBzdWJtaXQ7XG4gICAgICAvLyBJbiB0aGVvcnksIGl0IGNvdWxkIGhhcHBlbiB0aGF0IHRoZSBzdG9yZWQgc3VibWl0dGVyIGlzIG91dGRhdGVkIGFuZCBkb2Vzbid0XG4gICAgICAvLyBleGlzdCBpbiB0aGUgRE9NIGFueSBtb3JlLCBidXQgdGhpcyBpcyB1bmxpa2VseSwgc28gd2UganVzdCBhY2NlcHQgaXQgZm9yIG5vdy5cbiAgICAgIGNvbnN0IHN1Ym1pdHRlciA9IERPTS5wcml2YXRlKGV4dGVybmFsRm9ybVRyaWdnZXJlZCwgXCJzdWJtaXR0ZXJcIilcbiAgICAgIGlmKHN1Ym1pdHRlciAmJiBzdWJtaXR0ZXIubmFtZSAmJiB0YXJnZXRDb250YWluZXIuY29udGFpbnMoc3VibWl0dGVyKSl7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXG4gICAgICAgIGlucHV0LnR5cGUgPSBcImhpZGRlblwiXG4gICAgICAgIGNvbnN0IGZvcm1JZCA9IHN1Ym1pdHRlci5nZXRBdHRyaWJ1dGUoXCJmb3JtXCIpXG4gICAgICAgIGlmKGZvcm1JZCl7XG4gICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiZm9ybVwiLCBmb3JtSWQpXG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQubmFtZSA9IHN1Ym1pdHRlci5uYW1lXG4gICAgICAgIGlucHV0LnZhbHVlID0gc3VibWl0dGVyLnZhbHVlXG4gICAgICAgIHN1Ym1pdHRlci5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShpbnB1dCwgc3VibWl0dGVyKVxuICAgICAgfVxuICAgICAgLy8gdXNlIHByb3RvdHlwZSdzIHN1Ym1pdCBpbiBjYXNlIHRoZXJlJ3MgYSBmb3JtIGNvbnRyb2wgd2l0aCBuYW1lIG9yIGlkIG9mIFwic3VibWl0XCJcbiAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MRm9ybUVsZW1lbnQvc3VibWl0XG4gICAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkKS5zdWJtaXQuY2FsbChleHRlcm5hbEZvcm1UcmlnZ2VyZWQpXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBvbk5vZGVEaXNjYXJkZWQoZWwpe1xuICAgIC8vIG5lc3RlZCB2aWV3IGhhbmRsaW5nXG4gICAgaWYoRE9NLmlzUGh4Q2hpbGQoZWwpIHx8IERPTS5pc1BoeFN0aWNreShlbCkpeyB0aGlzLmxpdmVTb2NrZXQuZGVzdHJveVZpZXdCeUVsKGVsKSB9XG4gICAgdGhpcy50cmFja0FmdGVyKFwiZGlzY2FyZGVkXCIsIGVsKVxuICB9XG5cbiAgbWF5YmVQZW5kaW5nUmVtb3ZlKG5vZGUpe1xuICAgIGlmKG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKHRoaXMucGh4UmVtb3ZlKSAhPT0gbnVsbCl7XG4gICAgICB0aGlzLnBlbmRpbmdSZW1vdmVzLnB1c2gobm9kZSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVN0cmVhbUNoaWxkRWxlbWVudChjaGlsZCwgZm9yY2U9ZmFsc2Upe1xuICAgIC8vIG1ha2Ugc3VyZSB0byBvbmx5IHJlbW92ZSBlbGVtZW50cyBvd25lZCBieSB0aGUgY3VycmVudCB2aWV3XG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXhfbGl2ZV92aWV3L2lzc3Vlcy8zMDQ3XG4gICAgLy8gYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9waG9lbml4ZnJhbWV3b3JrL3Bob2VuaXhfbGl2ZV92aWV3L2lzc3Vlcy8zNjgxXG4gICAgaWYoIWZvcmNlICYmICF0aGlzLnZpZXcub3duc0VsZW1lbnQoY2hpbGQpKXsgcmV0dXJuIH1cblxuICAgIC8vIHdlIG5lZWQgdG8gc3RvcmUgdGhlIG5vZGUgaWYgaXQgaXMgYWN0dWFsbHkgcmUtYWRkZWQgaW4gdGhlIHNhbWUgcGF0Y2hcbiAgICAvLyB3ZSBkbyBOT1Qgd2FudCB0byBleGVjdXRlIHBoeC1yZW1vdmUsIHdlIGRvIE5PVCB3YW50IHRvIGNhbGwgb25Ob2RlRGlzY2FyZGVkXG4gICAgaWYodGhpcy5zdHJlYW1JbnNlcnRzW2NoaWxkLmlkXSl7XG4gICAgICB0aGlzLnN0cmVhbUNvbXBvbmVudFJlc3RvcmVbY2hpbGQuaWRdID0gY2hpbGRcbiAgICAgIGNoaWxkLnJlbW92ZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG9ubHkgcmVtb3ZlIHRoZSBlbGVtZW50IG5vdyBpZiBpdCBoYXMgbm8gcGh4LXJlbW92ZSBiaW5kaW5nXG4gICAgICBpZighdGhpcy5tYXliZVBlbmRpbmdSZW1vdmUoY2hpbGQpKXtcbiAgICAgICAgY2hpbGQucmVtb3ZlKClcbiAgICAgICAgdGhpcy5vbk5vZGVEaXNjYXJkZWQoY2hpbGQpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U3RyZWFtSW5zZXJ0KGVsKXtcbiAgICBsZXQgaW5zZXJ0ID0gZWwuaWQgPyB0aGlzLnN0cmVhbUluc2VydHNbZWwuaWRdIDoge31cbiAgICByZXR1cm4gaW5zZXJ0IHx8IHt9XG4gIH1cblxuICBzZXRTdHJlYW1SZWYoZWwsIHJlZil7XG4gICAgRE9NLnB1dFN0aWNreShlbCwgUEhYX1NUUkVBTV9SRUYsIGVsID0+IGVsLnNldEF0dHJpYnV0ZShQSFhfU1RSRUFNX1JFRiwgcmVmKSlcbiAgfVxuXG4gIG1heWJlUmVPcmRlclN0cmVhbShlbCwgaXNOZXcpe1xuICAgIGxldCB7cmVmLCBzdHJlYW1BdCwgcmVzZXR9ID0gdGhpcy5nZXRTdHJlYW1JbnNlcnQoZWwpXG4gICAgaWYoc3RyZWFtQXQgPT09IHVuZGVmaW5lZCl7IHJldHVybiB9XG5cbiAgICAvLyB3ZSBuZWVkIHRvIHNldCB0aGUgUEhYX1NUUkVBTV9SRUYgaGVyZSBhcyB3ZWxsIGFzIGFkZENoaWxkIGlzIGludm9rZWQgb25seSBmb3IgcGFyZW50c1xuICAgIHRoaXMuc2V0U3RyZWFtUmVmKGVsLCByZWYpXG5cbiAgICBpZighcmVzZXQgJiYgIWlzTmV3KXtcbiAgICAgIC8vIHdlIG9ubHkgcmVvcmRlciBpZiB0aGUgZWxlbWVudCBpcyBuZXcgb3IgaXQncyBhIHN0cmVhbSByZXNldFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgaGFzIGEgcGFyZW50IGVsZW1lbnQ7XG4gICAgLy8gaXQgZG9lc24ndCBpZiB3ZSBhcmUgY3VycmVudGx5IHJlY3Vyc2l2ZWx5IG1vcnBoaW5nIChyZXN0b3JpbmcgYSBzYXZlZCBzdHJlYW0gY2hpbGQpXG4gICAgLy8gYmVjYXVzZSB0aGUgZWxlbWVudCBpcyBub3QgeWV0IGFkZGVkIHRvIHRoZSByZWFsIGRvbTtcbiAgICAvLyByZW9yZGVyaW5nIGRvZXMgbm90IG1ha2Ugc2Vuc2UgaW4gdGhhdCBjYXNlIGFueXdheVxuICAgIGlmKCFlbC5wYXJlbnRFbGVtZW50KXsgcmV0dXJuIH1cblxuICAgIGlmKHN0cmVhbUF0ID09PSAwKXtcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGVsLCBlbC5wYXJlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKVxuICAgIH0gZWxzZSBpZihzdHJlYW1BdCA+IDApe1xuICAgICAgbGV0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShlbC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuKVxuICAgICAgbGV0IG9sZEluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihlbClcbiAgICAgIGlmKHN0cmVhbUF0ID49IGNoaWxkcmVuLmxlbmd0aCAtIDEpe1xuICAgICAgICBlbC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGVsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHNpYmxpbmcgPSBjaGlsZHJlbltzdHJlYW1BdF1cbiAgICAgICAgaWYob2xkSW5kZXggPiBzdHJlYW1BdCl7XG4gICAgICAgICAgZWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZWwsIHNpYmxpbmcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoZWwsIHNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tYXliZUxpbWl0U3RyZWFtKGVsKVxuICB9XG5cbiAgbWF5YmVMaW1pdFN0cmVhbShlbCl7XG4gICAgbGV0IHtsaW1pdH0gPSB0aGlzLmdldFN0cmVhbUluc2VydChlbClcbiAgICBsZXQgY2hpbGRyZW4gPSBsaW1pdCAhPT0gbnVsbCAmJiBBcnJheS5mcm9tKGVsLnBhcmVudEVsZW1lbnQuY2hpbGRyZW4pXG4gICAgaWYobGltaXQgJiYgbGltaXQgPCAwICYmIGNoaWxkcmVuLmxlbmd0aCA+IGxpbWl0ICogLTEpe1xuICAgICAgY2hpbGRyZW4uc2xpY2UoMCwgY2hpbGRyZW4ubGVuZ3RoICsgbGltaXQpLmZvckVhY2goY2hpbGQgPT4gdGhpcy5yZW1vdmVTdHJlYW1DaGlsZEVsZW1lbnQoY2hpbGQpKVxuICAgIH0gZWxzZSBpZihsaW1pdCAmJiBsaW1pdCA+PSAwICYmIGNoaWxkcmVuLmxlbmd0aCA+IGxpbWl0KXtcbiAgICAgIGNoaWxkcmVuLnNsaWNlKGxpbWl0KS5mb3JFYWNoKGNoaWxkID0+IHRoaXMucmVtb3ZlU3RyZWFtQ2hpbGRFbGVtZW50KGNoaWxkKSlcbiAgICB9XG4gIH1cblxuICB0cmFuc2l0aW9uUGVuZGluZ1JlbW92ZXMoKXtcbiAgICBsZXQge3BlbmRpbmdSZW1vdmVzLCBsaXZlU29ja2V0fSA9IHRoaXNcbiAgICBpZihwZW5kaW5nUmVtb3Zlcy5sZW5ndGggPiAwKXtcbiAgICAgIGxpdmVTb2NrZXQudHJhbnNpdGlvblJlbW92ZXMocGVuZGluZ1JlbW92ZXMsICgpID0+IHtcbiAgICAgICAgcGVuZGluZ1JlbW92ZXMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgbGV0IGNoaWxkID0gRE9NLmZpcnN0UGh4Q2hpbGQoZWwpXG4gICAgICAgICAgaWYoY2hpbGQpeyBsaXZlU29ja2V0LmRlc3Ryb3lWaWV3QnlFbChjaGlsZCkgfVxuICAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudHJhY2tBZnRlcihcInRyYW5zaXRpb25zRGlzY2FyZGVkXCIsIHBlbmRpbmdSZW1vdmVzKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBpc0NoYW5nZWRTZWxlY3QoZnJvbUVsLCB0b0VsKXtcbiAgICBpZighKGZyb21FbCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KSB8fCBmcm9tRWwubXVsdGlwbGUpeyByZXR1cm4gZmFsc2UgfVxuICAgIGlmKGZyb21FbC5vcHRpb25zLmxlbmd0aCAhPT0gdG9FbC5vcHRpb25zLmxlbmd0aCl7IHJldHVybiB0cnVlIH1cblxuICAgIC8vIGtlZXAgdGhlIGN1cnJlbnQgdmFsdWVcbiAgICB0b0VsLnZhbHVlID0gZnJvbUVsLnZhbHVlXG5cbiAgICAvLyBpbiBnZW5lcmFsIHdlIGhhdmUgdG8gYmUgdmVyeSBjYXJlZnVsIHdpdGggdXNpbmcgaXNFcXVhbE5vZGUgYXMgaXQgZG9lcyBub3QgYSByZWxpYWJsZVxuICAgIC8vIERPTSB0cmVlIGVxdWFsaXR5IGNoZWNrLCBidXQgZm9yIHNlbGVjdGlvbiBhdHRyaWJ1dGVzIGFuZCBvcHRpb25zIGl0IHdvcmtzIGZpbmVcbiAgICByZXR1cm4gIWZyb21FbC5pc0VxdWFsTm9kZSh0b0VsKVxuICB9XG5cbiAgaXNDSURQYXRjaCgpeyByZXR1cm4gdGhpcy5jaWRQYXRjaCB9XG5cbiAgc2tpcENJRFNpYmxpbmcoZWwpe1xuICAgIHJldHVybiBlbC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiYgZWwuaGFzQXR0cmlidXRlKFBIWF9TS0lQKVxuICB9XG5cbiAgdGFyZ2V0Q0lEQ29udGFpbmVyKGh0bWwpe1xuICAgIGlmKCF0aGlzLmlzQ0lEUGF0Y2goKSl7IHJldHVybiB9XG4gICAgbGV0IFtmaXJzdCwgLi4ucmVzdF0gPSBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuY29udGFpbmVyLCB0aGlzLnRhcmdldENJRClcbiAgICBpZihyZXN0Lmxlbmd0aCA9PT0gMCAmJiBET00uY2hpbGROb2RlTGVuZ3RoKGh0bWwpID09PSAxKXtcbiAgICAgIHJldHVybiBmaXJzdFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmlyc3QgJiYgZmlyc3QucGFyZW50Tm9kZVxuICAgIH1cbiAgfVxuXG4gIGluZGV4T2YocGFyZW50LCBjaGlsZCl7IHJldHVybiBBcnJheS5mcm9tKHBhcmVudC5jaGlsZHJlbikuaW5kZXhPZihjaGlsZCkgfVxufVxuIiwgImltcG9ydCB7XG4gIENPTVBPTkVOVFMsXG4gIERZTkFNSUNTLFxuICBURU1QTEFURVMsXG4gIEVWRU5UUyxcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX1NLSVAsXG4gIFBIWF9NQUdJQ19JRCxcbiAgUkVQTFksXG4gIFNUQVRJQyxcbiAgVElUTEUsXG4gIFNUUkVBTSxcbiAgUk9PVCxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgaXNPYmplY3QsXG4gIGxvZ0Vycm9yLFxuICBpc0NpZCxcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5jb25zdCBWT0lEX1RBR1MgPSBuZXcgU2V0KFtcbiAgXCJhcmVhXCIsXG4gIFwiYmFzZVwiLFxuICBcImJyXCIsXG4gIFwiY29sXCIsXG4gIFwiY29tbWFuZFwiLFxuICBcImVtYmVkXCIsXG4gIFwiaHJcIixcbiAgXCJpbWdcIixcbiAgXCJpbnB1dFwiLFxuICBcImtleWdlblwiLFxuICBcImxpbmtcIixcbiAgXCJtZXRhXCIsXG4gIFwicGFyYW1cIixcbiAgXCJzb3VyY2VcIixcbiAgXCJ0cmFja1wiLFxuICBcIndiclwiXG5dKVxuY29uc3QgcXVvdGVDaGFycyA9IG5ldyBTZXQoW1wiJ1wiLCBcIlxcXCJcIl0pXG5cbmV4cG9ydCBsZXQgbW9kaWZ5Um9vdCA9IChodG1sLCBhdHRycywgY2xlYXJJbm5lckhUTUwpID0+IHtcbiAgbGV0IGkgPSAwXG4gIGxldCBpbnNpZGVDb21tZW50ID0gZmFsc2VcbiAgbGV0IGJlZm9yZVRhZywgYWZ0ZXJUYWcsIHRhZywgdGFnTmFtZUVuZHNBdCwgaWQsIG5ld0hUTUxcblxuICBsZXQgbG9va2FoZWFkID0gaHRtbC5tYXRjaCgvXihcXHMqKD86PCEtLS4qPy0tPlxccyopKik8KFteXFxzXFwvPl0rKS8pXG4gIGlmKGxvb2thaGVhZCA9PT0gbnVsbCl7IHRocm93IG5ldyBFcnJvcihgbWFsZm9ybWVkIGh0bWwgJHtodG1sfWApIH1cblxuICBpID0gbG9va2FoZWFkWzBdLmxlbmd0aFxuICBiZWZvcmVUYWcgPSBsb29rYWhlYWRbMV1cbiAgdGFnID0gbG9va2FoZWFkWzJdXG4gIHRhZ05hbWVFbmRzQXQgPSBpXG5cbiAgLy8gU2NhbiB0aGUgb3BlbmluZyB0YWcgZm9yIGlkLCBpZiB0aGVyZSBpcyBhbnlcbiAgZm9yKGk7IGkgPCBodG1sLmxlbmd0aDsgaSsrKXtcbiAgICBpZihodG1sLmNoYXJBdChpKSA9PT0gXCI+XCIgKXsgYnJlYWsgfVxuICAgIGlmKGh0bWwuY2hhckF0KGkpID09PSBcIj1cIil7XG4gICAgICBsZXQgaXNJZCA9IGh0bWwuc2xpY2UoaSAtIDMsIGkpID09PSBcIiBpZFwiXG4gICAgICBpKytcbiAgICAgIGxldCBjaGFyID0gaHRtbC5jaGFyQXQoaSlcbiAgICAgIGlmKHF1b3RlQ2hhcnMuaGFzKGNoYXIpKXtcbiAgICAgICAgbGV0IGF0dHJTdGFydHNBdCA9IGlcbiAgICAgICAgaSsrXG4gICAgICAgIGZvcihpOyBpIDwgaHRtbC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgaWYoaHRtbC5jaGFyQXQoaSkgPT09IGNoYXIpeyBicmVhayB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoaXNJZCl7XG4gICAgICAgICAgaWQgPSBodG1sLnNsaWNlKGF0dHJTdGFydHNBdCArIDEsIGkpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxldCBjbG9zZUF0ID0gaHRtbC5sZW5ndGggLSAxXG4gIGluc2lkZUNvbW1lbnQgPSBmYWxzZVxuICB3aGlsZShjbG9zZUF0ID49IGJlZm9yZVRhZy5sZW5ndGggKyB0YWcubGVuZ3RoKXtcbiAgICBsZXQgY2hhciA9IGh0bWwuY2hhckF0KGNsb3NlQXQpXG4gICAgaWYoaW5zaWRlQ29tbWVudCl7XG4gICAgICBpZihjaGFyID09PSBcIi1cIiAmJiBodG1sLnNsaWNlKGNsb3NlQXQgLSAzLCBjbG9zZUF0KSA9PT0gXCI8IS1cIil7XG4gICAgICAgIGluc2lkZUNvbW1lbnQgPSBmYWxzZVxuICAgICAgICBjbG9zZUF0IC09IDRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsb3NlQXQgLT0gMVxuICAgICAgfVxuICAgIH0gZWxzZSBpZihjaGFyID09PSBcIj5cIiAmJiBodG1sLnNsaWNlKGNsb3NlQXQgLSAyLCBjbG9zZUF0KSA9PT0gXCItLVwiKXtcbiAgICAgIGluc2lkZUNvbW1lbnQgPSB0cnVlXG4gICAgICBjbG9zZUF0IC09IDNcbiAgICB9IGVsc2UgaWYoY2hhciA9PT0gXCI+XCIpe1xuICAgICAgYnJlYWtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xvc2VBdCAtPSAxXG4gICAgfVxuICB9XG4gIGFmdGVyVGFnID0gaHRtbC5zbGljZShjbG9zZUF0ICsgMSwgaHRtbC5sZW5ndGgpXG5cbiAgbGV0IGF0dHJzU3RyID1cbiAgICBPYmplY3Qua2V5cyhhdHRycylcbiAgICAgIC5tYXAoYXR0ciA9PiBhdHRyc1thdHRyXSA9PT0gdHJ1ZSA/IGF0dHIgOiBgJHthdHRyfT1cIiR7YXR0cnNbYXR0cl19XCJgKVxuICAgICAgLmpvaW4oXCIgXCIpXG5cbiAgaWYoY2xlYXJJbm5lckhUTUwpe1xuICAgIC8vIEtlZXAgdGhlIGlkIGlmIGFueVxuICAgIGxldCBpZEF0dHJTdHIgPSBpZCA/IGAgaWQ9XCIke2lkfVwiYCA6IFwiXCJcbiAgICBpZihWT0lEX1RBR1MuaGFzKHRhZykpe1xuICAgICAgbmV3SFRNTCA9IGA8JHt0YWd9JHtpZEF0dHJTdHJ9JHthdHRyc1N0ciA9PT0gXCJcIiA/IFwiXCIgOiBcIiBcIn0ke2F0dHJzU3RyfS8+YFxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdIVE1MID0gYDwke3RhZ30ke2lkQXR0clN0cn0ke2F0dHJzU3RyID09PSBcIlwiID8gXCJcIiA6IFwiIFwifSR7YXR0cnNTdHJ9PjwvJHt0YWd9PmBcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgbGV0IHJlc3QgPSBodG1sLnNsaWNlKHRhZ05hbWVFbmRzQXQsIGNsb3NlQXQgKyAxKVxuICAgIG5ld0hUTUwgPSBgPCR7dGFnfSR7YXR0cnNTdHIgPT09IFwiXCIgPyBcIlwiIDogXCIgXCJ9JHthdHRyc1N0cn0ke3Jlc3R9YFxuICB9XG5cbiAgcmV0dXJuIFtuZXdIVE1MLCBiZWZvcmVUYWcsIGFmdGVyVGFnXVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlZCB7XG4gIHN0YXRpYyBleHRyYWN0KGRpZmYpe1xuICAgIGxldCB7W1JFUExZXTogcmVwbHksIFtFVkVOVFNdOiBldmVudHMsIFtUSVRMRV06IHRpdGxlfSA9IGRpZmZcbiAgICBkZWxldGUgZGlmZltSRVBMWV1cbiAgICBkZWxldGUgZGlmZltFVkVOVFNdXG4gICAgZGVsZXRlIGRpZmZbVElUTEVdXG4gICAgcmV0dXJuIHtkaWZmLCB0aXRsZSwgcmVwbHk6IHJlcGx5IHx8IG51bGwsIGV2ZW50czogZXZlbnRzIHx8IFtdfVxuICB9XG5cbiAgY29uc3RydWN0b3Iodmlld0lkLCByZW5kZXJlZCl7XG4gICAgdGhpcy52aWV3SWQgPSB2aWV3SWRcbiAgICB0aGlzLnJlbmRlcmVkID0ge31cbiAgICB0aGlzLm1hZ2ljSWQgPSAwXG4gICAgdGhpcy5tZXJnZURpZmYocmVuZGVyZWQpXG4gIH1cblxuICBwYXJlbnRWaWV3SWQoKXsgcmV0dXJuIHRoaXMudmlld0lkIH1cblxuICB0b1N0cmluZyhvbmx5Q2lkcyl7XG4gICAgbGV0IFtzdHIsIHN0cmVhbXNdID0gdGhpcy5yZWN1cnNpdmVUb1N0cmluZyh0aGlzLnJlbmRlcmVkLCB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdLCBvbmx5Q2lkcywgdHJ1ZSwge30pXG4gICAgcmV0dXJuIFtzdHIsIHN0cmVhbXNdXG4gIH1cblxuICByZWN1cnNpdmVUb1N0cmluZyhyZW5kZXJlZCwgY29tcG9uZW50cyA9IHJlbmRlcmVkW0NPTVBPTkVOVFNdLCBvbmx5Q2lkcywgY2hhbmdlVHJhY2tpbmcsIHJvb3RBdHRycyl7XG4gICAgb25seUNpZHMgPSBvbmx5Q2lkcyA/IG5ldyBTZXQob25seUNpZHMpIDogbnVsbFxuICAgIGxldCBvdXRwdXQgPSB7YnVmZmVyOiBcIlwiLCBjb21wb25lbnRzOiBjb21wb25lbnRzLCBvbmx5Q2lkczogb25seUNpZHMsIHN0cmVhbXM6IG5ldyBTZXQoKX1cbiAgICB0aGlzLnRvT3V0cHV0QnVmZmVyKHJlbmRlcmVkLCBudWxsLCBvdXRwdXQsIGNoYW5nZVRyYWNraW5nLCByb290QXR0cnMpXG4gICAgcmV0dXJuIFtvdXRwdXQuYnVmZmVyLCBvdXRwdXQuc3RyZWFtc11cbiAgfVxuXG4gIGNvbXBvbmVudENJRHMoZGlmZil7IHJldHVybiBPYmplY3Qua2V5cyhkaWZmW0NPTVBPTkVOVFNdIHx8IHt9KS5tYXAoaSA9PiBwYXJzZUludChpKSkgfVxuXG4gIGlzQ29tcG9uZW50T25seURpZmYoZGlmZil7XG4gICAgaWYoIWRpZmZbQ09NUE9ORU5UU10peyByZXR1cm4gZmFsc2UgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhkaWZmKS5sZW5ndGggPT09IDFcbiAgfVxuXG4gIGdldENvbXBvbmVudChkaWZmLCBjaWQpeyByZXR1cm4gZGlmZltDT01QT05FTlRTXVtjaWRdIH1cblxuICByZXNldFJlbmRlcihjaWQpe1xuICAgIC8vIHdlIGFyZSByYWNpbmcgYSBjb21wb25lbnQgZGVzdHJveSwgaXQgY291bGQgbm90IGV4aXN0LCBzb1xuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHdlIGRvbid0IHRyeSB0byBzZXQgcmVzZXQgb24gdW5kZWZpbmVkXG4gICAgaWYodGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXVtjaWRdKXtcbiAgICAgIHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU11bY2lkXS5yZXNldCA9IHRydWVcbiAgICB9XG4gIH1cblxuICBtZXJnZURpZmYoZGlmZil7XG4gICAgbGV0IG5ld2MgPSBkaWZmW0NPTVBPTkVOVFNdXG4gICAgbGV0IGNhY2hlID0ge31cbiAgICBkZWxldGUgZGlmZltDT01QT05FTlRTXVxuICAgIHRoaXMucmVuZGVyZWQgPSB0aGlzLm11dGFibGVNZXJnZSh0aGlzLnJlbmRlcmVkLCBkaWZmKVxuICAgIHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10gPSB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdIHx8IHt9XG5cbiAgICBpZihuZXdjKXtcbiAgICAgIGxldCBvbGRjID0gdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXVxuXG4gICAgICBmb3IobGV0IGNpZCBpbiBuZXdjKXtcbiAgICAgICAgbmV3Y1tjaWRdID0gdGhpcy5jYWNoZWRGaW5kQ29tcG9uZW50KGNpZCwgbmV3Y1tjaWRdLCBvbGRjLCBuZXdjLCBjYWNoZSlcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCBjaWQgaW4gbmV3Yyl7IG9sZGNbY2lkXSA9IG5ld2NbY2lkXSB9XG4gICAgICBkaWZmW0NPTVBPTkVOVFNdID0gbmV3Y1xuICAgIH1cbiAgfVxuXG4gIGNhY2hlZEZpbmRDb21wb25lbnQoY2lkLCBjZGlmZiwgb2xkYywgbmV3YywgY2FjaGUpe1xuICAgIGlmKGNhY2hlW2NpZF0pe1xuICAgICAgcmV0dXJuIGNhY2hlW2NpZF1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5kaWZmLCBzdGF0LCBzY2lkID0gY2RpZmZbU1RBVElDXVxuXG4gICAgICBpZihpc0NpZChzY2lkKSl7XG4gICAgICAgIGxldCB0ZGlmZlxuXG4gICAgICAgIGlmKHNjaWQgPiAwKXtcbiAgICAgICAgICB0ZGlmZiA9IHRoaXMuY2FjaGVkRmluZENvbXBvbmVudChzY2lkLCBuZXdjW3NjaWRdLCBvbGRjLCBuZXdjLCBjYWNoZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZGlmZiA9IG9sZGNbLXNjaWRdXG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ID0gdGRpZmZbU1RBVElDXVxuICAgICAgICBuZGlmZiA9IHRoaXMuY2xvbmVNZXJnZSh0ZGlmZiwgY2RpZmYsIHRydWUpXG4gICAgICAgIG5kaWZmW1NUQVRJQ10gPSBzdGF0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZGlmZiA9IGNkaWZmW1NUQVRJQ10gIT09IHVuZGVmaW5lZCB8fCBvbGRjW2NpZF0gPT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgY2RpZmYgOiB0aGlzLmNsb25lTWVyZ2Uob2xkY1tjaWRdLCBjZGlmZiwgZmFsc2UpXG4gICAgICB9XG5cbiAgICAgIGNhY2hlW2NpZF0gPSBuZGlmZlxuICAgICAgcmV0dXJuIG5kaWZmXG4gICAgfVxuICB9XG5cbiAgbXV0YWJsZU1lcmdlKHRhcmdldCwgc291cmNlKXtcbiAgICBpZihzb3VyY2VbU1RBVElDXSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIHJldHVybiBzb3VyY2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb011dGFibGVNZXJnZSh0YXJnZXQsIHNvdXJjZSlcbiAgICAgIHJldHVybiB0YXJnZXRcbiAgICB9XG4gIH1cblxuICBkb011dGFibGVNZXJnZSh0YXJnZXQsIHNvdXJjZSl7XG4gICAgZm9yKGxldCBrZXkgaW4gc291cmNlKXtcbiAgICAgIGxldCB2YWwgPSBzb3VyY2Vba2V5XVxuICAgICAgbGV0IHRhcmdldFZhbCA9IHRhcmdldFtrZXldXG4gICAgICBsZXQgaXNPYmpWYWwgPSBpc09iamVjdCh2YWwpXG4gICAgICBpZihpc09ialZhbCAmJiB2YWxbU1RBVElDXSA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KHRhcmdldFZhbCkpe1xuICAgICAgICB0aGlzLmRvTXV0YWJsZU1lcmdlKHRhcmdldFZhbCwgdmFsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWxcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodGFyZ2V0W1JPT1RdKXtcbiAgICAgIHRhcmdldC5uZXdSZW5kZXIgPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgLy8gTWVyZ2VzIGNpZCB0cmVlcyB0b2dldGhlciwgY29weWluZyBzdGF0aWNzIGZyb20gc291cmNlIHRyZWUuXG4gIC8vXG4gIC8vIFRoZSBgcHJ1bmVNYWdpY0lkYCBpcyBwYXNzZWQgdG8gY29udHJvbCBwcnVuaW5nIHRoZSBtYWdpY0lkIG9mIHRoZVxuICAvLyB0YXJnZXQuIFdlIG11c3QgYWx3YXlzIHBydW5lIHRoZSBtYWdpY0lkIHdoZW4gd2UgYXJlIHNoYXJpbmcgc3RhdGljc1xuICAvLyBmcm9tIGFub3RoZXIgY29tcG9uZW50LiBJZiBub3QgcHJ1bmluZywgd2UgcmVwbGljYXRlIHRoZSBsb2dpYyBmcm9tXG4gIC8vIG11dGFibGVNZXJnZSwgd2hlcmUgd2Ugc2V0IG5ld1JlbmRlciB0byB0cnVlIGlmIHRoZXJlIGlzIGEgcm9vdFxuICAvLyAoZWZmZWN0aXZlbHkgZm9yY2luZyB0aGUgbmV3IHZlcnNpb24gdG8gYmUgcmVuZGVyZWQgaW5zdGVhZCBvZiBza2lwcGVkKVxuICAvL1xuICBjbG9uZU1lcmdlKHRhcmdldCwgc291cmNlLCBwcnVuZU1hZ2ljSWQpe1xuICAgIGxldCBtZXJnZWQgPSB7Li4udGFyZ2V0LCAuLi5zb3VyY2V9XG4gICAgZm9yKGxldCBrZXkgaW4gbWVyZ2VkKXtcbiAgICAgIGxldCB2YWwgPSBzb3VyY2Vba2V5XVxuICAgICAgbGV0IHRhcmdldFZhbCA9IHRhcmdldFtrZXldXG4gICAgICBpZihpc09iamVjdCh2YWwpICYmIHZhbFtTVEFUSUNdID09PSB1bmRlZmluZWQgJiYgaXNPYmplY3QodGFyZ2V0VmFsKSl7XG4gICAgICAgIG1lcmdlZFtrZXldID0gdGhpcy5jbG9uZU1lcmdlKHRhcmdldFZhbCwgdmFsLCBwcnVuZU1hZ2ljSWQpXG4gICAgICB9IGVsc2UgaWYodmFsID09PSB1bmRlZmluZWQgJiYgaXNPYmplY3QodGFyZ2V0VmFsKSl7XG4gICAgICAgIG1lcmdlZFtrZXldID0gdGhpcy5jbG9uZU1lcmdlKHRhcmdldFZhbCwge30sIHBydW5lTWFnaWNJZClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYocHJ1bmVNYWdpY0lkKXtcbiAgICAgIGRlbGV0ZSBtZXJnZWQubWFnaWNJZFxuICAgICAgZGVsZXRlIG1lcmdlZC5uZXdSZW5kZXJcbiAgICB9IGVsc2UgaWYodGFyZ2V0W1JPT1RdKXtcbiAgICAgIG1lcmdlZC5uZXdSZW5kZXIgPSB0cnVlXG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRcbiAgfVxuXG4gIGNvbXBvbmVudFRvU3RyaW5nKGNpZCl7XG4gICAgbGV0IFtzdHIsIHN0cmVhbXNdID0gdGhpcy5yZWN1cnNpdmVDSURUb1N0cmluZyh0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdLCBjaWQsIG51bGwpXG4gICAgbGV0IFtzdHJpcHBlZEhUTUwsIF9iZWZvcmUsIF9hZnRlcl0gPSBtb2RpZnlSb290KHN0ciwge30pXG4gICAgcmV0dXJuIFtzdHJpcHBlZEhUTUwsIHN0cmVhbXNdXG4gIH1cblxuICBwcnVuZUNJRHMoY2lkcyl7XG4gICAgY2lkcy5mb3JFYWNoKGNpZCA9PiBkZWxldGUgdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXVtjaWRdKVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIGdldCgpeyByZXR1cm4gdGhpcy5yZW5kZXJlZCB9XG5cbiAgaXNOZXdGaW5nZXJwcmludChkaWZmID0ge30peyByZXR1cm4gISFkaWZmW1NUQVRJQ10gfVxuXG4gIHRlbXBsYXRlU3RhdGljKHBhcnQsIHRlbXBsYXRlcyl7XG4gICAgaWYodHlwZW9mIChwYXJ0KSA9PT0gXCJudW1iZXJcIil7XG4gICAgICByZXR1cm4gdGVtcGxhdGVzW3BhcnRdXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYXJ0XG4gICAgfVxuICB9XG5cbiAgbmV4dE1hZ2ljSUQoKXtcbiAgICB0aGlzLm1hZ2ljSWQrK1xuICAgIHJldHVybiBgbSR7dGhpcy5tYWdpY0lkfS0ke3RoaXMucGFyZW50Vmlld0lkKCl9YFxuICB9XG5cbiAgLy8gQ29udmVydHMgcmVuZGVyZWQgdHJlZSB0byBvdXRwdXQgYnVmZmVyLlxuICAvL1xuICAvLyBjaGFuZ2VUcmFja2luZyBjb250cm9scyBpZiB3ZSBjYW4gYXBwbHkgdGhlIFBIWF9TS0lQIG9wdGltaXphdGlvbi5cbiAgLy8gSXQgaXMgZGlzYWJsZWQgZm9yIGNvbXByZWhlbnNpb25zIHNpbmNlIHdlIG11c3QgcmUtcmVuZGVyIHRoZSBlbnRpcmUgY29sbGVjdGlvblxuICAvLyBhbmQgbm8gaW5kaXZpZHVhbCBlbGVtZW50IGlzIHRyYWNrZWQgaW5zaWRlIHRoZSBjb21wcmVoZW5zaW9uLlxuICB0b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQsIGNoYW5nZVRyYWNraW5nLCByb290QXR0cnMgPSB7fSl7XG4gICAgaWYocmVuZGVyZWRbRFlOQU1JQ1NdKXsgcmV0dXJuIHRoaXMuY29tcHJlaGVuc2lvblRvQnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCkgfVxuICAgIGxldCB7W1NUQVRJQ106IHN0YXRpY3N9ID0gcmVuZGVyZWRcbiAgICBzdGF0aWNzID0gdGhpcy50ZW1wbGF0ZVN0YXRpYyhzdGF0aWNzLCB0ZW1wbGF0ZXMpXG4gICAgbGV0IGlzUm9vdCA9IHJlbmRlcmVkW1JPT1RdXG4gICAgbGV0IHByZXZCdWZmZXIgPSBvdXRwdXQuYnVmZmVyXG4gICAgaWYoaXNSb290KXsgb3V0cHV0LmJ1ZmZlciA9IFwiXCIgfVxuXG4gICAgLy8gdGhpcyBjb25kaXRpb24gaXMgY2FsbGVkIHdoZW4gZmlyc3QgcmVuZGVyaW5nIGFuIG9wdGltaXphYmxlIGZ1bmN0aW9uIGNvbXBvbmVudC5cbiAgICAvLyBMQyBoYXZlIHRoZWlyIG1hZ2ljSWQgcHJldmlvdXNseSBzZXRcbiAgICBpZihjaGFuZ2VUcmFja2luZyAmJiBpc1Jvb3QgJiYgIXJlbmRlcmVkLm1hZ2ljSWQpe1xuICAgICAgcmVuZGVyZWQubmV3UmVuZGVyID0gdHJ1ZVxuICAgICAgcmVuZGVyZWQubWFnaWNJZCA9IHRoaXMubmV4dE1hZ2ljSUQoKVxuICAgIH1cblxuICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1swXVxuICAgIGZvcihsZXQgaSA9IDE7IGkgPCBzdGF0aWNzLmxlbmd0aDsgaSsrKXtcbiAgICAgIHRoaXMuZHluYW1pY1RvQnVmZmVyKHJlbmRlcmVkW2kgLSAxXSwgdGVtcGxhdGVzLCBvdXRwdXQsIGNoYW5nZVRyYWNraW5nKVxuICAgICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzW2ldXG4gICAgfVxuXG4gICAgLy8gQXBwbGllcyB0aGUgcm9vdCB0YWcgXCJza2lwXCIgb3B0aW1pemF0aW9uIGlmIHN1cHBvcnRlZCwgd2hpY2ggY2xlYXJzXG4gICAgLy8gdGhlIHJvb3QgdGFnIGF0dHJpYnV0ZXMgYW5kIGlubmVySFRNTCwgYW5kIG9ubHkgbWFpbnRhaW5zIHRoZSBtYWdpY0lkLlxuICAgIC8vIFdlIGNhbiBvbmx5IHNraXAgd2hlbiBjaGFuZ2VUcmFja2luZyBpcyBzdXBwb3J0ZWQgKG91dHNpZGUgb2YgYSBjb21wcmVoZW5zaW9uKSxcbiAgICAvLyBhbmQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGhhc24ndCBleHBlcmllbmNlZCBhbiB1bnJlbmRlcmVkIG1lcmdlIChuZXdSZW5kZXIgdHJ1ZSkuXG4gICAgaWYoaXNSb290KXtcbiAgICAgIGxldCBza2lwID0gZmFsc2VcbiAgICAgIGxldCBhdHRyc1xuICAgICAgLy8gV2hlbiBhIExDIGlzIHJlLWFkZGVkIHRvIHRoZSBwYWdlLCB3ZSBuZWVkIHRvIHJlLXJlbmRlciB0aGUgZW50aXJlIExDIHRyZWUsXG4gICAgICAvLyB0aGVyZWZvcmUgY2hhbmdlVHJhY2tpbmcgaXMgZmFsc2U7IGhvd2V2ZXIsIHdlIG5lZWQgdG8ga2VlcCBhbGwgdGhlIG1hZ2ljSWRzXG4gICAgICAvLyBmcm9tIGFueSBmdW5jdGlvbiBjb21wb25lbnQgc28gdGhlIG5leHQgdGltZSB0aGUgTEMgaXMgdXBkYXRlZCwgd2UgY2FuIGFwcGx5XG4gICAgICAvLyB0aGUgc2tpcCBvcHRpbWl6YXRpb25cbiAgICAgIGlmKGNoYW5nZVRyYWNraW5nIHx8IHJlbmRlcmVkLm1hZ2ljSWQpe1xuICAgICAgICBza2lwID0gY2hhbmdlVHJhY2tpbmcgJiYgIXJlbmRlcmVkLm5ld1JlbmRlclxuICAgICAgICBhdHRycyA9IHtbUEhYX01BR0lDX0lEXTogcmVuZGVyZWQubWFnaWNJZCwgLi4ucm9vdEF0dHJzfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXR0cnMgPSByb290QXR0cnNcbiAgICAgIH1cbiAgICAgIGlmKHNraXApeyBhdHRyc1tQSFhfU0tJUF0gPSB0cnVlIH1cbiAgICAgIGxldCBbbmV3Um9vdCwgY29tbWVudEJlZm9yZSwgY29tbWVudEFmdGVyXSA9IG1vZGlmeVJvb3Qob3V0cHV0LmJ1ZmZlciwgYXR0cnMsIHNraXApXG4gICAgICByZW5kZXJlZC5uZXdSZW5kZXIgPSBmYWxzZVxuICAgICAgb3V0cHV0LmJ1ZmZlciA9IHByZXZCdWZmZXIgKyBjb21tZW50QmVmb3JlICsgbmV3Um9vdCArIGNvbW1lbnRBZnRlclxuICAgIH1cbiAgfVxuXG4gIGNvbXByZWhlbnNpb25Ub0J1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpe1xuICAgIGxldCB7W0RZTkFNSUNTXTogZHluYW1pY3MsIFtTVEFUSUNdOiBzdGF0aWNzLCBbU1RSRUFNXTogc3RyZWFtfSA9IHJlbmRlcmVkXG4gICAgbGV0IFtfcmVmLCBfaW5zZXJ0cywgZGVsZXRlSWRzLCByZXNldF0gPSBzdHJlYW0gfHwgW251bGwsIHt9LCBbXSwgbnVsbF1cbiAgICBzdGF0aWNzID0gdGhpcy50ZW1wbGF0ZVN0YXRpYyhzdGF0aWNzLCB0ZW1wbGF0ZXMpXG4gICAgbGV0IGNvbXBUZW1wbGF0ZXMgPSB0ZW1wbGF0ZXMgfHwgcmVuZGVyZWRbVEVNUExBVEVTXVxuICAgIGZvcihsZXQgZCA9IDA7IGQgPCBkeW5hbWljcy5sZW5ndGg7IGQrKyl7XG4gICAgICBsZXQgZHluYW1pYyA9IGR5bmFtaWNzW2RdXG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbMF1cbiAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBzdGF0aWNzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgLy8gSW5zaWRlIGEgY29tcHJlaGVuc2lvbiwgd2UgZG9uJ3QgdHJhY2sgaG93IGR5bmFtaWNzIGNoYW5nZVxuICAgICAgICAvLyBvdmVyIHRpbWUgKGFuZCBmZWF0dXJlcyBsaWtlIHN0cmVhbXMgd291bGQgbWFrZSB0aGF0IGltcG9zc2libGVcbiAgICAgICAgLy8gdW5sZXNzIHdlIG1vdmUgdGhlIHN0cmVhbSBkaWZmaW5nIGF3YXkgZnJvbSBtb3JwaGRvbSksXG4gICAgICAgIC8vIHNvIHdlIGNhbid0IHBlcmZvcm0gcm9vdCBjaGFuZ2UgdHJhY2tpbmcuXG4gICAgICAgIGxldCBjaGFuZ2VUcmFja2luZyA9IGZhbHNlXG4gICAgICAgIHRoaXMuZHluYW1pY1RvQnVmZmVyKGR5bmFtaWNbaSAtIDFdLCBjb21wVGVtcGxhdGVzLCBvdXRwdXQsIGNoYW5nZVRyYWNraW5nKVxuICAgICAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbaV1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihzdHJlYW0gIT09IHVuZGVmaW5lZCAmJiAocmVuZGVyZWRbRFlOQU1JQ1NdLmxlbmd0aCA+IDAgfHwgZGVsZXRlSWRzLmxlbmd0aCA+IDAgfHwgcmVzZXQpKXtcbiAgICAgIGRlbGV0ZSByZW5kZXJlZFtTVFJFQU1dXG4gICAgICByZW5kZXJlZFtEWU5BTUlDU10gPSBbXVxuICAgICAgb3V0cHV0LnN0cmVhbXMuYWRkKHN0cmVhbSlcbiAgICB9XG4gIH1cblxuICBkeW5hbWljVG9CdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0LCBjaGFuZ2VUcmFja2luZyl7XG4gICAgaWYodHlwZW9mIChyZW5kZXJlZCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgbGV0IFtzdHIsIHN0cmVhbXNdID0gdGhpcy5yZWN1cnNpdmVDSURUb1N0cmluZyhvdXRwdXQuY29tcG9uZW50cywgcmVuZGVyZWQsIG91dHB1dC5vbmx5Q2lkcylcbiAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RyXG4gICAgICBvdXRwdXQuc3RyZWFtcyA9IG5ldyBTZXQoWy4uLm91dHB1dC5zdHJlYW1zLCAuLi5zdHJlYW1zXSlcbiAgICB9IGVsc2UgaWYoaXNPYmplY3QocmVuZGVyZWQpKXtcbiAgICAgIHRoaXMudG9PdXRwdXRCdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0LCBjaGFuZ2VUcmFja2luZywge30pXG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5idWZmZXIgKz0gcmVuZGVyZWRcbiAgICB9XG4gIH1cblxuICByZWN1cnNpdmVDSURUb1N0cmluZyhjb21wb25lbnRzLCBjaWQsIG9ubHlDaWRzKXtcbiAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1tjaWRdIHx8IGxvZ0Vycm9yKGBubyBjb21wb25lbnQgZm9yIENJRCAke2NpZH1gLCBjb21wb25lbnRzKVxuICAgIGxldCBhdHRycyA9IHtbUEhYX0NPTVBPTkVOVF06IGNpZH1cbiAgICBsZXQgc2tpcCA9IG9ubHlDaWRzICYmICFvbmx5Q2lkcy5oYXMoY2lkKVxuICAgIC8vIFR3byBvcHRpbWl6YXRpb24gcGF0aHMgYXBwbHkgaGVyZTpcbiAgICAvL1xuICAgIC8vICAgMS4gVGhlIG9ubHlDaWRzIG9wdGltaXphdGlvbiB3b3JrcyBieSB0aGUgc2VydmVyIGRpZmYgdGVsbGluZyB1cyBvbmx5IHNwZWNpZmljXG4gICAgLy8gICAgIGNpZCdzIGhhdmUgY2hhbmdlZC4gVGhpcyBhbGxvd3MgdXMgdG8gc2tpcCByZW5kZXJpbmcgYW55IGNvbXBvbmVudCB0aGF0IGhhc24ndCBjaGFuZ2VkLFxuICAgIC8vICAgICB3aGljaCB1bHRpbWF0ZWx5IHNldHMgUEhYX1NLSVAgcm9vdCBhdHRyaWJ1dGUgYW5kIGF2b2lkcyByZW5kZXJpbmcgdGhlIGlubmVySFRNTC5cbiAgICAvL1xuICAgIC8vICAgMi4gVGhlIHJvb3QgUEhYX1NLSVAgb3B0aW1pemF0aW9uIGdlbmVyYWxpemVzIHRvIGFsbCBIRUV4IGZ1bmN0aW9uIGNvbXBvbmVudHMsIGFuZFxuICAgIC8vICAgICB3b3JrcyBpbiB0aGUgc2FtZSBQSFhfU0tJUCBhdHRyaWJ1dGUgZmFzaGlvbiBhcyAxLCBidXQgdGhlIG5ld1JlbmRlciB0cmFja2luZyBpcyBkb25lXG4gICAgLy8gICAgIGF0IHRoZSBnZW5lcmFsIGRpZmYgbWVyZ2UgbGV2ZWwuIElmIHdlIG1lcmdlIGEgZGlmZiB3aXRoIG5ldyBkeW5hbWljcywgd2UgbmVjZXNzYXJpbHkgaGF2ZVxuICAgIC8vICAgICBleHBlcmllbmNlZCBhIGNoYW5nZSB3aGljaCBtdXN0IGJlIGEgbmV3UmVuZGVyLCBhbmQgdGh1cyB3ZSBjYW4ndCBza2lwIHRoZSByZW5kZXIuXG4gICAgLy9cbiAgICAvLyBCb3RoIG9wdGltaXphdGlvbiBmbG93cyBhcHBseSBoZXJlLiBuZXdSZW5kZXIgaXMgc2V0IGJhc2VkIG9uIHRoZSBvbmx5Q2lkcyBvcHRpbWl6YXRpb24sIGFuZFxuICAgIC8vIHdlIHRyYWNrIGEgZGV0ZXJtaW5pc3RpYyBtYWdpY0lkIGJhc2VkIG9uIHRoZSBjaWQuXG4gICAgLy9cbiAgICAvLyBjaGFuZ2VUcmFja2luZyBpcyBhYm91dCB0aGUgZW50aXJlIHRyZWVcbiAgICAvLyBuZXdSZW5kZXIgaXMgYWJvdXQgdGhlIGN1cnJlbnQgcm9vdCBpbiB0aGUgdHJlZVxuICAgIC8vXG4gICAgLy8gQnkgZGVmYXVsdCBjaGFuZ2VUcmFja2luZyBpcyBlbmFibGVkLCBidXQgd2Ugc3BlY2lhbCBjYXNlIHRoZSBmbG93IHdoZXJlIHRoZSBjbGllbnQgaXMgcHJ1bmluZ1xuICAgIC8vIGNpZHMgYW5kIHRoZSBzZXJ2ZXIgYWRkcyB0aGUgY29tcG9uZW50IGJhY2suIEluIHN1Y2ggY2FzZXMsIHdlIGV4cGxpY2l0bHkgZGlzYWJsZSBjaGFuZ2VUcmFja2luZ1xuICAgIC8vIHdpdGggcmVzZXRSZW5kZXIgZm9yIHRoaXMgY2lkLCB0aGVuIHJlLWVuYWJsZSBpdCBhZnRlciB0aGUgcmVjdXJzaXZlIGNhbGwgdG8gc2tpcCB0aGUgb3B0aW1pemF0aW9uXG4gICAgLy8gZm9yIHRoZSBlbnRpcmUgY29tcG9uZW50IHRyZWUuXG4gICAgY29tcG9uZW50Lm5ld1JlbmRlciA9ICFza2lwXG4gICAgY29tcG9uZW50Lm1hZ2ljSWQgPSBgYyR7Y2lkfS0ke3RoaXMucGFyZW50Vmlld0lkKCl9YFxuICAgIC8vIGVuYWJsZSBjaGFuZ2UgdHJhY2tpbmcgYXMgbG9uZyBhcyB0aGUgY29tcG9uZW50IGhhc24ndCBiZWVuIHJlc2V0XG4gICAgbGV0IGNoYW5nZVRyYWNraW5nID0gIWNvbXBvbmVudC5yZXNldFxuICAgIGxldCBbaHRtbCwgc3RyZWFtc10gPSB0aGlzLnJlY3Vyc2l2ZVRvU3RyaW5nKGNvbXBvbmVudCwgY29tcG9uZW50cywgb25seUNpZHMsIGNoYW5nZVRyYWNraW5nLCBhdHRycylcbiAgICAvLyBkaXNhYmxlIHJlc2V0IGFmdGVyIHdlJ3ZlIHJlbmRlcmVkXG4gICAgZGVsZXRlIGNvbXBvbmVudC5yZXNldFxuXG4gICAgcmV0dXJuIFtodG1sLCBzdHJlYW1zXVxuICB9XG59XG4iLCAiaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IEFSSUEgZnJvbSBcIi4vYXJpYVwiXG5cbmxldCBmb2N1c1N0YWNrID0gW11cbmxldCBkZWZhdWx0X3RyYW5zaXRpb25fdGltZSA9IDIwMFxuXG5sZXQgSlMgPSB7XG4gIC8vIHByaXZhdGVcbiAgZXhlYyhlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZGVmYXVsdHMpe1xuICAgIGxldCBbZGVmYXVsdEtpbmQsIGRlZmF1bHRBcmdzXSA9IGRlZmF1bHRzIHx8IFtudWxsLCB7Y2FsbGJhY2s6IGRlZmF1bHRzICYmIGRlZmF1bHRzLmNhbGxiYWNrfV1cbiAgICBsZXQgY29tbWFuZHMgPSBwaHhFdmVudC5jaGFyQXQoMCkgPT09IFwiW1wiID9cbiAgICAgIEpTT04ucGFyc2UocGh4RXZlbnQpIDogW1tkZWZhdWx0S2luZCwgZGVmYXVsdEFyZ3NdXVxuXG4gICAgY29tbWFuZHMuZm9yRWFjaCgoW2tpbmQsIGFyZ3NdKSA9PiB7XG4gICAgICBpZihraW5kID09PSBkZWZhdWx0S2luZCl7XG4gICAgICAgIC8vIGFsd2F5cyBwcmVmZXIgdGhlIGFyZ3MsIGJ1dCBrZWVwIGV4aXN0aW5nIGtleXMgZnJvbSB0aGUgZGVmYXVsdEFyZ3NcbiAgICAgICAgYXJncyA9IHsuLi5kZWZhdWx0QXJncywgLi4uYXJnc31cbiAgICAgICAgYXJncy5jYWxsYmFjayA9IGFyZ3MuY2FsbGJhY2sgfHwgZGVmYXVsdEFyZ3MuY2FsbGJhY2tcbiAgICAgIH1cbiAgICAgIHRoaXMuZmlsdGVyVG9FbHModmlldy5saXZlU29ja2V0LCBzb3VyY2VFbCwgYXJncykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIHRoaXNbYGV4ZWNfJHtraW5kfWBdKGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwgYXJncylcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBpc1Zpc2libGUoZWwpe1xuICAgIHJldHVybiAhIShlbC5vZmZzZXRXaWR0aCB8fCBlbC5vZmZzZXRIZWlnaHQgfHwgZWwuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPiAwKVxuICB9LFxuXG4gIC8vIHJldHVybnMgdHJ1ZSBpZiBhbnkgcGFydCBvZiB0aGUgZWxlbWVudCBpcyBpbnNpZGUgdGhlIHZpZXdwb3J0XG4gIGlzSW5WaWV3cG9ydChlbCl7XG4gICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuXG4gICAgcmV0dXJuIChcbiAgICAgIHJlY3QucmlnaHQgPiAwICYmXG4gICAgICByZWN0LmJvdHRvbSA+IDAgJiZcbiAgICAgIHJlY3QubGVmdCA8IHdpbmRvd1dpZHRoICYmXG4gICAgICByZWN0LnRvcCA8IHdpbmRvd0hlaWdodFxuICAgIClcbiAgfSxcblxuICAvLyBwcml2YXRlXG5cbiAgLy8gY29tbWFuZHNcblxuICBleGVjX2V4ZWMoZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7YXR0ciwgdG99KXtcbiAgICBsZXQgZW5jb2RlZEpTID0gZWwuZ2V0QXR0cmlidXRlKGF0dHIpXG4gICAgaWYoIWVuY29kZWRKUyl7IHRocm93IG5ldyBFcnJvcihgZXhwZWN0ZWQgJHthdHRyfSB0byBjb250YWluIEpTIGNvbW1hbmQgb24gXCIke3RvfVwiYCkgfVxuICAgIHZpZXcubGl2ZVNvY2tldC5leGVjSlMoZWwsIGVuY29kZWRKUywgZXZlbnRUeXBlKVxuICB9LFxuXG4gIGV4ZWNfZGlzcGF0Y2goZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7ZXZlbnQsIGRldGFpbCwgYnViYmxlc30pe1xuICAgIGRldGFpbCA9IGRldGFpbCB8fCB7fVxuICAgIGRldGFpbC5kaXNwYXRjaGVyID0gc291cmNlRWxcbiAgICBET00uZGlzcGF0Y2hFdmVudChlbCwgZXZlbnQsIHtkZXRhaWwsIGJ1YmJsZXN9KVxuICB9LFxuXG4gIGV4ZWNfcHVzaChlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIGFyZ3Mpe1xuICAgIGxldCB7ZXZlbnQsIGRhdGEsIHRhcmdldCwgcGFnZV9sb2FkaW5nLCBsb2FkaW5nLCB2YWx1ZSwgZGlzcGF0Y2hlciwgY2FsbGJhY2t9ID0gYXJnc1xuICAgIGxldCBwdXNoT3B0cyA9IHtsb2FkaW5nLCB2YWx1ZSwgdGFyZ2V0LCBwYWdlX2xvYWRpbmc6ICEhcGFnZV9sb2FkaW5nfVxuICAgIGxldCB0YXJnZXRTcmMgPSBldmVudFR5cGUgPT09IFwiY2hhbmdlXCIgJiYgZGlzcGF0Y2hlciA/IGRpc3BhdGNoZXIgOiBzb3VyY2VFbFxuICAgIGxldCBwaHhUYXJnZXQgPSB0YXJnZXQgfHwgdGFyZ2V0U3JjLmdldEF0dHJpYnV0ZSh2aWV3LmJpbmRpbmcoXCJ0YXJnZXRcIikpIHx8IHRhcmdldFNyY1xuICAgIGNvbnN0IGhhbmRsZXIgPSAodGFyZ2V0VmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICBpZighdGFyZ2V0Vmlldy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH1cbiAgICAgIGlmKGV2ZW50VHlwZSA9PT0gXCJjaGFuZ2VcIil7XG4gICAgICAgIGxldCB7bmV3Q2lkLCBfdGFyZ2V0fSA9IGFyZ3NcbiAgICAgICAgX3RhcmdldCA9IF90YXJnZXQgfHwgKERPTS5pc0Zvcm1JbnB1dChzb3VyY2VFbCkgPyBzb3VyY2VFbC5uYW1lIDogdW5kZWZpbmVkKVxuICAgICAgICBpZihfdGFyZ2V0KXsgcHVzaE9wdHMuX3RhcmdldCA9IF90YXJnZXQgfVxuICAgICAgICB0YXJnZXRWaWV3LnB1c2hJbnB1dChzb3VyY2VFbCwgdGFyZ2V0Q3R4LCBuZXdDaWQsIGV2ZW50IHx8IHBoeEV2ZW50LCBwdXNoT3B0cywgY2FsbGJhY2spXG4gICAgICB9IGVsc2UgaWYoZXZlbnRUeXBlID09PSBcInN1Ym1pdFwiKXtcbiAgICAgICAgbGV0IHtzdWJtaXR0ZXJ9ID0gYXJnc1xuICAgICAgICB0YXJnZXRWaWV3LnN1Ym1pdEZvcm0oc291cmNlRWwsIHRhcmdldEN0eCwgZXZlbnQgfHwgcGh4RXZlbnQsIHN1Ym1pdHRlciwgcHVzaE9wdHMsIGNhbGxiYWNrKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0Vmlldy5wdXNoRXZlbnQoZXZlbnRUeXBlLCBzb3VyY2VFbCwgdGFyZ2V0Q3R4LCBldmVudCB8fCBwaHhFdmVudCwgZGF0YSwgcHVzaE9wdHMsIGNhbGxiYWNrKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBpbiBjYXNlIG9mIGZvcm1SZWNvdmVyeSwgdGFyZ2V0VmlldyBhbmQgdGFyZ2V0Q3R4IGFyZSBwYXNzZWQgYXMgYXJndW1lbnRcbiAgICAvLyBhcyB0aGV5IGFyZSBsb29rZWQgdXAgaW4gYSB0ZW1wbGF0ZSBlbGVtZW50LCBub3QgdGhlIHJlYWwgRE9NXG4gICAgaWYoYXJncy50YXJnZXRWaWV3ICYmIGFyZ3MudGFyZ2V0Q3R4KXtcbiAgICAgIGhhbmRsZXIoYXJncy50YXJnZXRWaWV3LCBhcmdzLnRhcmdldEN0eClcbiAgICB9IGVsc2Uge1xuICAgICAgdmlldy53aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgaGFuZGxlcilcbiAgICB9XG4gIH0sXG5cbiAgZXhlY19uYXZpZ2F0ZShlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtocmVmLCByZXBsYWNlfSl7XG4gICAgdmlldy5saXZlU29ja2V0Lmhpc3RvcnlSZWRpcmVjdChlLCBocmVmLCByZXBsYWNlID8gXCJyZXBsYWNlXCIgOiBcInB1c2hcIiwgbnVsbCwgc291cmNlRWwpXG4gIH0sXG5cbiAgZXhlY19wYXRjaChlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtocmVmLCByZXBsYWNlfSl7XG4gICAgdmlldy5saXZlU29ja2V0LnB1c2hIaXN0b3J5UGF0Y2goZSwgaHJlZiwgcmVwbGFjZSA/IFwicmVwbGFjZVwiIDogXCJwdXNoXCIsIHNvdXJjZUVsKVxuICB9LFxuXG4gIGV4ZWNfZm9jdXMoZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsKXtcbiAgICBBUklBLmF0dGVtcHRGb2N1cyhlbClcbiAgICAvLyBpbiBjYXNlIHRoZSBKUy5mb2N1cyBjb21tYW5kIGlzIGluIGEgSlMuc2hvdy9oaWRlL3RvZ2dsZSBjaGFpbiwgZm9yIHNob3cgd2UgbmVlZFxuICAgIC8vIHRvIHdhaXQgZm9yIEpTLnNob3cgdG8gaGF2ZSB1cGRhdGVkIHRoZSBlbGVtZW50J3MgZGlzcGxheSBwcm9wZXJ0eSAoc2VlIGV4ZWNfdG9nZ2xlKVxuICAgIC8vIGJ1dCB0aGF0IHJ1biBpbiBuZXN0ZWQgYW5pbWF0aW9uIGZyYW1lcywgdGhlcmVmb3JlIHdlIG5lZWQgdG8gdXNlIHRoZW0gaGVyZSBhcyB3ZWxsXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IEFSSUEuYXR0ZW1wdEZvY3VzKGVsKSlcbiAgICB9KVxuICB9LFxuXG4gIGV4ZWNfZm9jdXNfZmlyc3QoZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsKXtcbiAgICBBUklBLmZvY3VzRmlyc3RJbnRlcmFjdGl2ZShlbCkgfHwgQVJJQS5mb2N1c0ZpcnN0KGVsKVxuICAgIC8vIGlmIHlvdSB3b25kZXIgYWJvdXQgdGhlIG5lc3RlZCBhbmltYXRpb24gZnJhbWVzLCBzZWUgZXhlY19mb2N1c1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBBUklBLmZvY3VzRmlyc3RJbnRlcmFjdGl2ZShlbCkgfHwgQVJJQS5mb2N1c0ZpcnN0KGVsKSlcbiAgICB9KVxuICB9LFxuXG4gIGV4ZWNfcHVzaF9mb2N1cyhlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwpe1xuICAgIGZvY3VzU3RhY2sucHVzaChlbCB8fCBzb3VyY2VFbClcbiAgfSxcblxuICBleGVjX3BvcF9mb2N1cyhfZSwgX2V2ZW50VHlwZSwgX3BoeEV2ZW50LCBfdmlldywgX3NvdXJjZUVsLCBfZWwpe1xuICAgIGNvbnN0IGVsID0gZm9jdXNTdGFjay5wb3AoKVxuICAgIGlmKGVsKXtcbiAgICAgIGVsLmZvY3VzKClcbiAgICAgIC8vIGlmIHlvdSB3b25kZXIgYWJvdXQgdGhlIG5lc3RlZCBhbmltYXRpb24gZnJhbWVzLCBzZWUgZXhlY19mb2N1c1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gZWwuZm9jdXMoKSlcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIGV4ZWNfYWRkX2NsYXNzKGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZ30pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBuYW1lcywgW10sIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcsIGJsb2NraW5nKVxuICB9LFxuXG4gIGV4ZWNfcmVtb3ZlX2NsYXNzKGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZ30pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgbmFtZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcsIGJsb2NraW5nKVxuICB9LFxuXG4gIGV4ZWNfdG9nZ2xlX2NsYXNzKGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZ30pe1xuICAgIHRoaXMudG9nZ2xlQ2xhc3NlcyhlbCwgbmFtZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcsIGJsb2NraW5nKVxuICB9LFxuXG4gIGV4ZWNfdG9nZ2xlX2F0dHIoZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7YXR0cjogW2F0dHIsIHZhbDEsIHZhbDJdfSl7XG4gICAgdGhpcy50b2dnbGVBdHRyKGVsLCBhdHRyLCB2YWwxLCB2YWwyKVxuICB9LFxuXG4gIGV4ZWNfdHJhbnNpdGlvbihlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHt0aW1lLCB0cmFuc2l0aW9uLCBibG9ja2luZ30pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgW10sIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcsIGJsb2NraW5nKVxuICB9LFxuXG4gIGV4ZWNfdG9nZ2xlKGUsIGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2Rpc3BsYXksIGlucywgb3V0cywgdGltZSwgYmxvY2tpbmd9KXtcbiAgICB0aGlzLnRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCBpbnMsIG91dHMsIHRpbWUsIGJsb2NraW5nKVxuICB9LFxuXG4gIGV4ZWNfc2hvdyhlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZ30pe1xuICAgIHRoaXMuc2hvdyhldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZylcbiAgfSxcblxuICBleGVjX2hpZGUoZSwgZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7ZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSwgYmxvY2tpbmd9KXtcbiAgICB0aGlzLmhpZGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSwgYmxvY2tpbmcpXG4gIH0sXG5cbiAgZXhlY19zZXRfYXR0cihlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHthdHRyOiBbYXR0ciwgdmFsXX0pe1xuICAgIHRoaXMuc2V0T3JSZW1vdmVBdHRycyhlbCwgW1thdHRyLCB2YWxdXSwgW10pXG4gIH0sXG5cbiAgZXhlY19yZW1vdmVfYXR0cihlLCBldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHthdHRyfSl7XG4gICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbXSwgW2F0dHJdKVxuICB9LFxuXG4gIC8vIHV0aWxzIGZvciBjb21tYW5kc1xuXG4gIHNob3coZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSwgYmxvY2tpbmcpe1xuICAgIGlmKCF0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgdGhpcy50b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgbnVsbCwgdGltZSwgYmxvY2tpbmcpXG4gICAgfVxuICB9LFxuXG4gIGhpZGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSwgYmxvY2tpbmcpe1xuICAgIGlmKHRoaXMuaXNWaXNpYmxlKGVsKSl7XG4gICAgICB0aGlzLnRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCBudWxsLCB0cmFuc2l0aW9uLCB0aW1lLCBibG9ja2luZylcbiAgICB9XG4gIH0sXG5cbiAgdG9nZ2xlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIGlucywgb3V0cywgdGltZSwgYmxvY2tpbmcpe1xuICAgIHRpbWUgPSB0aW1lIHx8IGRlZmF1bHRfdHJhbnNpdGlvbl90aW1lXG4gICAgbGV0IFtpbkNsYXNzZXMsIGluU3RhcnRDbGFzc2VzLCBpbkVuZENsYXNzZXNdID0gaW5zIHx8IFtbXSwgW10sIFtdXVxuICAgIGxldCBbb3V0Q2xhc3Nlcywgb3V0U3RhcnRDbGFzc2VzLCBvdXRFbmRDbGFzc2VzXSA9IG91dHMgfHwgW1tdLCBbXSwgW11dXG4gICAgaWYoaW5DbGFzc2VzLmxlbmd0aCA+IDAgfHwgb3V0Q2xhc3Nlcy5sZW5ndGggPiAwKXtcbiAgICAgIGlmKHRoaXMuaXNWaXNpYmxlKGVsKSl7XG4gICAgICAgIGxldCBvblN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBvdXRTdGFydENsYXNzZXMsIGluQ2xhc3Nlcy5jb25jYXQoaW5TdGFydENsYXNzZXMpLmNvbmNhdChpbkVuZENsYXNzZXMpKVxuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG91dENsYXNzZXMsIFtdKVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgb3V0RW5kQ2xhc3Nlcywgb3V0U3RhcnRDbGFzc2VzKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGxldCBvbkVuZCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgW10sIG91dENsYXNzZXMuY29uY2F0KG91dEVuZENsYXNzZXMpKVxuICAgICAgICAgIERPTS5wdXRTdGlja3koZWwsIFwidG9nZ2xlXCIsIGN1cnJlbnRFbCA9PiBjdXJyZW50RWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKVxuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtZW5kXCIpKVxuICAgICAgICB9XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtc3RhcnRcIikpXG4gICAgICAgIGlmKGJsb2NraW5nID09PSBmYWxzZSl7XG4gICAgICAgICAgb25TdGFydCgpXG4gICAgICAgICAgc2V0VGltZW91dChvbkVuZCwgdGltZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2aWV3LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25FbmQpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGV2ZW50VHlwZSA9PT0gXCJyZW1vdmVcIil7IHJldHVybiB9XG4gICAgICAgIGxldCBvblN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBpblN0YXJ0Q2xhc3Nlcywgb3V0Q2xhc3Nlcy5jb25jYXQob3V0U3RhcnRDbGFzc2VzKS5jb25jYXQob3V0RW5kQ2xhc3NlcykpXG4gICAgICAgICAgY29uc3Qgc3RpY2t5RGlzcGxheSA9IGRpc3BsYXkgfHwgdGhpcy5kZWZhdWx0RGlzcGxheShlbClcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGZpcnN0IGFkZCB0aGUgc3RhcnRpbmcgKyBhY3RpdmUgY2xhc3MsIFRIRU4gbWFrZSB0aGUgZWxlbWVudCB2aXNpYmxlXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgaWYgd2UgdG9nZ2xlZCB0aGUgdmlzaWJpbGl0eSBlYXJsaWVyIGNzcyBhbmltYXRpb25zXG4gICAgICAgICAgICAvLyB3b3VsZCBmbGlja2VyLCBhcyB0aGUgZWxlbWVudCBiZWNvbWVzIHZpc2libGUgYmVmb3JlIHRoZSBhY3RpdmUgYW5pbWF0aW9uXG4gICAgICAgICAgICAvLyBjbGFzcyBpcyBzZXQgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vcGhvZW5peGZyYW1ld29yay9waG9lbml4X2xpdmVfdmlldy9pc3N1ZXMvMzQ1NilcbiAgICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBpbkNsYXNzZXMsIFtdKVxuICAgICAgICAgICAgLy8gYWRkT3JSZW1vdmVDbGFzc2VzIHVzZXMgYSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgaXRzZWxmLCB0aGVyZWZvcmUgd2UgbmVlZCB0byBtb3ZlIHRoZSBwdXRTdGlja3lcbiAgICAgICAgICAgIC8vIGludG8gdGhlIG5leHQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lLi4uXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gc3RpY2t5RGlzcGxheSlcbiAgICAgICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIGluRW5kQ2xhc3NlcywgaW5TdGFydENsYXNzZXMpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9uRW5kID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgaW5DbGFzc2VzLmNvbmNhdChpbkVuZENsYXNzZXMpKVxuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OnNob3ctZW5kXCIpKVxuICAgICAgICB9XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OnNob3ctc3RhcnRcIikpXG4gICAgICAgIGlmKGJsb2NraW5nID09PSBmYWxzZSl7XG4gICAgICAgICAgb25TdGFydCgpXG4gICAgICAgICAgc2V0VGltZW91dChvbkVuZCwgdGltZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2aWV3LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25FbmQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYodGhpcy5pc1Zpc2libGUoZWwpKXtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6aGlkZS1zdGFydFwiKSlcbiAgICAgICAgICBET00ucHV0U3RpY2t5KGVsLCBcInRvZ2dsZVwiLCBjdXJyZW50RWwgPT4gY3VycmVudEVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIilcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpoaWRlLWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OnNob3ctc3RhcnRcIikpXG4gICAgICAgICAgbGV0IHN0aWNreURpc3BsYXkgPSBkaXNwbGF5IHx8IHRoaXMuZGVmYXVsdERpc3BsYXkoZWwpXG4gICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gc3RpY2t5RGlzcGxheSlcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgdG9nZ2xlQ2xhc3NlcyhlbCwgY2xhc3NlcywgdHJhbnNpdGlvbiwgdGltZSwgdmlldywgYmxvY2tpbmcpe1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgbGV0IFtwcmV2QWRkcywgcHJldlJlbW92ZXNdID0gRE9NLmdldFN0aWNreShlbCwgXCJjbGFzc2VzXCIsIFtbXSwgW11dKVxuICAgICAgbGV0IG5ld0FkZHMgPSBjbGFzc2VzLmZpbHRlcihuYW1lID0+IHByZXZBZGRzLmluZGV4T2YobmFtZSkgPCAwICYmICFlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpXG4gICAgICBsZXQgbmV3UmVtb3ZlcyA9IGNsYXNzZXMuZmlsdGVyKG5hbWUgPT4gcHJldlJlbW92ZXMuaW5kZXhPZihuYW1lKSA8IDAgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKVxuICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG5ld0FkZHMsIG5ld1JlbW92ZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcsIGJsb2NraW5nKVxuICAgIH0pXG4gIH0sXG5cbiAgdG9nZ2xlQXR0cihlbCwgYXR0ciwgdmFsMSwgdmFsMil7XG4gICAgaWYoZWwuaGFzQXR0cmlidXRlKGF0dHIpKXtcbiAgICAgIGlmKHZhbDIgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgIC8vIHRvZ2dsZSBiZXR3ZWVuIHZhbDEgYW5kIHZhbDJcbiAgICAgICAgaWYoZWwuZ2V0QXR0cmlidXRlKGF0dHIpID09PSB2YWwxKXtcbiAgICAgICAgICB0aGlzLnNldE9yUmVtb3ZlQXR0cnMoZWwsIFtbYXR0ciwgdmFsMl1dLCBbXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNldE9yUmVtb3ZlQXR0cnMoZWwsIFtbYXR0ciwgdmFsMV1dLCBbXSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcmVtb3ZlIGF0dHJcbiAgICAgICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbXSwgW2F0dHJdKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldE9yUmVtb3ZlQXR0cnMoZWwsIFtbYXR0ciwgdmFsMV1dLCBbXSlcbiAgICB9XG4gIH0sXG5cbiAgYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBhZGRzLCByZW1vdmVzLCB0cmFuc2l0aW9uLCB0aW1lLCB2aWV3LCBibG9ja2luZyl7XG4gICAgdGltZSA9IHRpbWUgfHwgZGVmYXVsdF90cmFuc2l0aW9uX3RpbWVcbiAgICBsZXQgW3RyYW5zaXRpb25SdW4sIHRyYW5zaXRpb25TdGFydCwgdHJhbnNpdGlvbkVuZF0gPSB0cmFuc2l0aW9uIHx8IFtbXSwgW10sIFtdXVxuICAgIGlmKHRyYW5zaXRpb25SdW4ubGVuZ3RoID4gMCl7XG4gICAgICBsZXQgb25TdGFydCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIHRyYW5zaXRpb25TdGFydCwgW10uY29uY2F0KHRyYW5zaXRpb25SdW4pLmNvbmNhdCh0cmFuc2l0aW9uRW5kKSlcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIHRyYW5zaXRpb25SdW4sIFtdKVxuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIHRyYW5zaXRpb25FbmQsIHRyYW5zaXRpb25TdGFydCkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBsZXQgb25Eb25lID0gKCkgPT4gdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIGFkZHMuY29uY2F0KHRyYW5zaXRpb25FbmQpLCByZW1vdmVzLmNvbmNhdCh0cmFuc2l0aW9uUnVuKS5jb25jYXQodHJhbnNpdGlvblN0YXJ0KSlcbiAgICAgIGlmKGJsb2NraW5nID09PSBmYWxzZSl7XG4gICAgICAgIG9uU3RhcnQoKVxuICAgICAgICBzZXRUaW1lb3V0KG9uRG9uZSwgdGltZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZpZXcudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGxldCBbcHJldkFkZHMsIHByZXZSZW1vdmVzXSA9IERPTS5nZXRTdGlja3koZWwsIFwiY2xhc3Nlc1wiLCBbW10sIFtdXSlcbiAgICAgIGxldCBrZWVwQWRkcyA9IGFkZHMuZmlsdGVyKG5hbWUgPT4gcHJldkFkZHMuaW5kZXhPZihuYW1lKSA8IDAgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSlcbiAgICAgIGxldCBrZWVwUmVtb3ZlcyA9IHJlbW92ZXMuZmlsdGVyKG5hbWUgPT4gcHJldlJlbW92ZXMuaW5kZXhPZihuYW1lKSA8IDAgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKVxuICAgICAgbGV0IG5ld0FkZHMgPSBwcmV2QWRkcy5maWx0ZXIobmFtZSA9PiByZW1vdmVzLmluZGV4T2YobmFtZSkgPCAwKS5jb25jYXQoa2VlcEFkZHMpXG4gICAgICBsZXQgbmV3UmVtb3ZlcyA9IHByZXZSZW1vdmVzLmZpbHRlcihuYW1lID0+IGFkZHMuaW5kZXhPZihuYW1lKSA8IDApLmNvbmNhdChrZWVwUmVtb3ZlcylcblxuICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJjbGFzc2VzXCIsIGN1cnJlbnRFbCA9PiB7XG4gICAgICAgIGN1cnJlbnRFbC5jbGFzc0xpc3QucmVtb3ZlKC4uLm5ld1JlbW92ZXMpXG4gICAgICAgIGN1cnJlbnRFbC5jbGFzc0xpc3QuYWRkKC4uLm5ld0FkZHMpXG4gICAgICAgIHJldHVybiBbbmV3QWRkcywgbmV3UmVtb3Zlc11cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBzZXRPclJlbW92ZUF0dHJzKGVsLCBzZXRzLCByZW1vdmVzKXtcbiAgICBsZXQgW3ByZXZTZXRzLCBwcmV2UmVtb3Zlc10gPSBET00uZ2V0U3RpY2t5KGVsLCBcImF0dHJzXCIsIFtbXSwgW11dKVxuXG4gICAgbGV0IGFsdGVyZWRBdHRycyA9IHNldHMubWFwKChbYXR0ciwgX3ZhbF0pID0+IGF0dHIpLmNvbmNhdChyZW1vdmVzKVxuICAgIGxldCBuZXdTZXRzID0gcHJldlNldHMuZmlsdGVyKChbYXR0ciwgX3ZhbF0pID0+ICFhbHRlcmVkQXR0cnMuaW5jbHVkZXMoYXR0cikpLmNvbmNhdChzZXRzKVxuICAgIGxldCBuZXdSZW1vdmVzID0gcHJldlJlbW92ZXMuZmlsdGVyKChhdHRyKSA9PiAhYWx0ZXJlZEF0dHJzLmluY2x1ZGVzKGF0dHIpKS5jb25jYXQocmVtb3ZlcylcblxuICAgIERPTS5wdXRTdGlja3koZWwsIFwiYXR0cnNcIiwgY3VycmVudEVsID0+IHtcbiAgICAgIG5ld1JlbW92ZXMuZm9yRWFjaChhdHRyID0+IGN1cnJlbnRFbC5yZW1vdmVBdHRyaWJ1dGUoYXR0cikpXG4gICAgICBuZXdTZXRzLmZvckVhY2goKFthdHRyLCB2YWxdKSA9PiBjdXJyZW50RWwuc2V0QXR0cmlidXRlKGF0dHIsIHZhbCkpXG4gICAgICByZXR1cm4gW25ld1NldHMsIG5ld1JlbW92ZXNdXG4gICAgfSlcbiAgfSxcblxuICBoYXNBbGxDbGFzc2VzKGVsLCBjbGFzc2VzKXsgcmV0dXJuIGNsYXNzZXMuZXZlcnkobmFtZSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpIH0sXG5cbiAgaXNUb2dnbGVkT3V0KGVsLCBvdXRDbGFzc2VzKXtcbiAgICByZXR1cm4gIXRoaXMuaXNWaXNpYmxlKGVsKSB8fCB0aGlzLmhhc0FsbENsYXNzZXMoZWwsIG91dENsYXNzZXMpXG4gIH0sXG5cbiAgZmlsdGVyVG9FbHMobGl2ZVNvY2tldCwgc291cmNlRWwsIHt0b30pe1xuICAgIGxldCBkZWZhdWx0UXVlcnkgPSAoKSA9PiB7XG4gICAgICBpZih0eXBlb2YodG8pID09PSBcInN0cmluZ1wiKXtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodG8pXG4gICAgICB9IGVsc2UgaWYodG8uY2xvc2VzdCl7XG4gICAgICAgIGxldCB0b0VsID0gc291cmNlRWwuY2xvc2VzdCh0by5jbG9zZXN0KVxuICAgICAgICByZXR1cm4gdG9FbCA/IFt0b0VsXSA6IFtdXG4gICAgICB9IGVsc2UgaWYodG8uaW5uZXIpe1xuICAgICAgICByZXR1cm4gc291cmNlRWwucXVlcnlTZWxlY3RvckFsbCh0by5pbm5lcilcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvID8gbGl2ZVNvY2tldC5qc1F1ZXJ5U2VsZWN0b3JBbGwoc291cmNlRWwsIHRvLCBkZWZhdWx0UXVlcnkpIDogW3NvdXJjZUVsXVxuICB9LFxuXG4gIGRlZmF1bHREaXNwbGF5KGVsKXtcbiAgICByZXR1cm4ge3RyOiBcInRhYmxlLXJvd1wiLCB0ZDogXCJ0YWJsZS1jZWxsXCJ9W2VsLnRhZ05hbWUudG9Mb3dlckNhc2UoKV0gfHwgXCJibG9ja1wiXG4gIH0sXG5cbiAgdHJhbnNpdGlvbkNsYXNzZXModmFsKXtcbiAgICBpZighdmFsKXsgcmV0dXJuIG51bGwgfVxuXG4gICAgbGV0IFt0cmFucywgdFN0YXJ0LCB0RW5kXSA9IEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFt2YWwuc3BsaXQoXCIgXCIpLCBbXSwgW11dXG4gICAgdHJhbnMgPSBBcnJheS5pc0FycmF5KHRyYW5zKSA/IHRyYW5zIDogdHJhbnMuc3BsaXQoXCIgXCIpXG4gICAgdFN0YXJ0ID0gQXJyYXkuaXNBcnJheSh0U3RhcnQpID8gdFN0YXJ0IDogdFN0YXJ0LnNwbGl0KFwiIFwiKVxuICAgIHRFbmQgPSBBcnJheS5pc0FycmF5KHRFbmQpID8gdEVuZCA6IHRFbmQuc3BsaXQoXCIgXCIpXG4gICAgcmV0dXJuIFt0cmFucywgdFN0YXJ0LCB0RW5kXVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpTXG4iLCAiaW1wb3J0IEpTIGZyb20gXCIuL2pzXCJcbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcblxuY29uc3QgSE9PS19JRCA9IFwiaG9va0lkXCJcblxubGV0IHZpZXdIb29rSUQgPSAxXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3SG9vayB7XG4gIHN0YXRpYyBtYWtlSUQoKXsgcmV0dXJuIHZpZXdIb29rSUQrKyB9XG4gIHN0YXRpYyBlbGVtZW50SUQoZWwpeyByZXR1cm4gRE9NLnByaXZhdGUoZWwsIEhPT0tfSUQpIH1cblxuICBjb25zdHJ1Y3Rvcih2aWV3LCBlbCwgY2FsbGJhY2tzKXtcbiAgICB0aGlzLmVsID0gZWxcbiAgICB0aGlzLl9fYXR0YWNoVmlldyh2aWV3KVxuICAgIHRoaXMuX19jYWxsYmFja3MgPSBjYWxsYmFja3NcbiAgICB0aGlzLl9fbGlzdGVuZXJzID0gbmV3IFNldCgpXG4gICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gZmFsc2VcbiAgICBET00ucHV0UHJpdmF0ZSh0aGlzLmVsLCBIT09LX0lELCB0aGlzLmNvbnN0cnVjdG9yLm1ha2VJRCgpKVxuICAgIGZvcihsZXQga2V5IGluIHRoaXMuX19jYWxsYmFja3MpeyB0aGlzW2tleV0gPSB0aGlzLl9fY2FsbGJhY2tzW2tleV0gfVxuICB9XG5cbiAgX19hdHRhY2hWaWV3KHZpZXcpe1xuICAgIGlmKHZpZXcpe1xuICAgICAgdGhpcy5fX3ZpZXcgPSAoKSA9PiB2aWV3XG4gICAgICB0aGlzLmxpdmVTb2NrZXQgPSB2aWV3LmxpdmVTb2NrZXRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fX3ZpZXcgPSAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaG9vayBub3QgeWV0IGF0dGFjaGVkIHRvIGEgbGl2ZSB2aWV3OiAke3RoaXMuZWwub3V0ZXJIVE1MfWApXG4gICAgICB9XG4gICAgICB0aGlzLmxpdmVTb2NrZXQgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgX19tb3VudGVkKCl7IHRoaXMubW91bnRlZCAmJiB0aGlzLm1vdW50ZWQoKSB9XG4gIF9fdXBkYXRlZCgpeyB0aGlzLnVwZGF0ZWQgJiYgdGhpcy51cGRhdGVkKCkgfVxuICBfX2JlZm9yZVVwZGF0ZSgpeyB0aGlzLmJlZm9yZVVwZGF0ZSAmJiB0aGlzLmJlZm9yZVVwZGF0ZSgpIH1cbiAgX19kZXN0cm95ZWQoKXtcbiAgICB0aGlzLmRlc3Ryb3llZCAmJiB0aGlzLmRlc3Ryb3llZCgpXG4gICAgRE9NLmRlbGV0ZVByaXZhdGUodGhpcy5lbCwgSE9PS19JRCkgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bob2VuaXhmcmFtZXdvcmsvcGhvZW5peF9saXZlX3ZpZXcvaXNzdWVzLzM0OTZcbiAgfVxuICBfX3JlY29ubmVjdGVkKCl7XG4gICAgaWYodGhpcy5fX2lzRGlzY29ubmVjdGVkKXtcbiAgICAgIHRoaXMuX19pc0Rpc2Nvbm5lY3RlZCA9IGZhbHNlXG4gICAgICB0aGlzLnJlY29ubmVjdGVkICYmIHRoaXMucmVjb25uZWN0ZWQoKVxuICAgIH1cbiAgfVxuICBfX2Rpc2Nvbm5lY3RlZCgpe1xuICAgIHRoaXMuX19pc0Rpc2Nvbm5lY3RlZCA9IHRydWVcbiAgICB0aGlzLmRpc2Nvbm5lY3RlZCAmJiB0aGlzLmRpc2Nvbm5lY3RlZCgpXG4gIH1cblxuICAvKipcbiAgICogQmluZHMgdGhlIGhvb2sgdG8gSlMgY29tbWFuZHMuXG4gICAqXG4gICAqIEBwYXJhbSB7Vmlld0hvb2t9IGhvb2sgLSBUaGUgVmlld0hvb2sgaW5zdGFuY2UgdG8gYmluZC5cbiAgICpcbiAgICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHdpdGggbWV0aG9kcyB0byBtYW5pcHVsYXRlIHRoZSBET00gYW5kIGV4ZWN1dGUgSmF2YVNjcmlwdC5cbiAgICovXG4gIGpzKCl7XG4gICAgbGV0IGhvb2sgPSB0aGlzXG5cbiAgICByZXR1cm4ge1xuICAgICAgLyoqXG4gICAgICAgKiBFeGVjdXRlcyBlbmNvZGVkIEphdmFTY3JpcHQgaW4gdGhlIGNvbnRleHQgb2YgdGhlIGhvb2sgZWxlbWVudC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZW5jb2RlZEpTIC0gVGhlIGVuY29kZWQgSmF2YVNjcmlwdCBzdHJpbmcgdG8gZXhlY3V0ZS5cbiAgICAgICAqL1xuICAgICAgZXhlYyhlbmNvZGVkSlMpe1xuICAgICAgICBob29rLl9fdmlldygpLmxpdmVTb2NrZXQuZXhlY0pTKGhvb2suZWwsIGVuY29kZWRKUywgXCJob29rXCIpXG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFNob3dzIGFuIGVsZW1lbnQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgZWxlbWVudCB0byBzaG93LlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XSAtIE9wdGlvbmFsIHNldHRpbmdzLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmRpc3BsYXldIC0gVGhlIENTUyBkaXNwbGF5IHZhbHVlIHRvIHNldC4gRGVmYXVsdHMgXCJibG9ja1wiLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLnRyYW5zaXRpb25dIC0gVGhlIENTUyB0cmFuc2l0aW9uIGNsYXNzZXMgdG8gc2V0IHdoZW4gc2hvd2luZy5cbiAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy50aW1lXSAtIFRoZSB0cmFuc2l0aW9uIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcy4gRGVmYXVsdHMgMjAwLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5ibG9ja2luZ10gLSBUaGUgYm9vbGVhbiBmbGFnIHRvIGJsb2NrIHRoZSBVSSBkdXJpbmcgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgKiAgRGVmYXVsdHMgYHRydWVgLlxuICAgICAgICovXG4gICAgICBzaG93KGVsLCBvcHRzID0ge30pe1xuICAgICAgICBsZXQgb3duZXIgPSBob29rLl9fdmlldygpLmxpdmVTb2NrZXQub3duZXIoZWwpXG4gICAgICAgIEpTLnNob3coXCJob29rXCIsIG93bmVyLCBlbCwgb3B0cy5kaXNwbGF5LCBvcHRzLnRyYW5zaXRpb24sIG9wdHMudGltZSwgb3B0cy5ibG9ja2luZylcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogSGlkZXMgYW4gZWxlbWVudC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIFRoZSBlbGVtZW50IHRvIGhpZGUuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dIC0gT3B0aW9uYWwgc2V0dGluZ3MuXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gW29wdHMudHJhbnNpdGlvbl0gLSBUaGUgQ1NTIHRyYW5zaXRpb24gY2xhc3NlcyB0byBzZXQgd2hlbiBoaWRpbmcuXG4gICAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdHMudGltZV0gLSBUaGUgdHJhbnNpdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuIERlZmF1bHRzIDIwMC5cbiAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdHMuYmxvY2tpbmddIC0gVGhlIGJvb2xlYW4gZmxhZyB0byBibG9jayB0aGUgVUkgZHVyaW5nIHRoZSB0cmFuc2l0aW9uLlxuICAgICAgICogICBEZWZhdWx0cyBgdHJ1ZWAuXG4gICAgICAgKi9cbiAgICAgIGhpZGUoZWwsIG9wdHMgPSB7fSl7XG4gICAgICAgIGxldCBvd25lciA9IGhvb2suX192aWV3KCkubGl2ZVNvY2tldC5vd25lcihlbClcbiAgICAgICAgSlMuaGlkZShcImhvb2tcIiwgb3duZXIsIGVsLCBudWxsLCBvcHRzLnRyYW5zaXRpb24sIG9wdHMudGltZSwgb3B0cy5ibG9ja2luZylcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiBhbiBlbGVtZW50LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gVGhlIGVsZW1lbnQgdG8gdG9nZ2xlLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XSAtIE9wdGlvbmFsIHNldHRpbmdzLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmRpc3BsYXldIC0gVGhlIENTUyBkaXNwbGF5IHZhbHVlIHRvIHNldC4gRGVmYXVsdHMgXCJibG9ja1wiLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmluXSAtIFRoZSBDU1MgdHJhbnNpdGlvbiBjbGFzc2VzIGZvciBzaG93aW5nLlxuICAgICAgICogICBBY2NlcHRzIGVpdGhlciB0aGUgc3RyaW5nIG9mIGNsYXNzZXMgdG8gYXBwbHkgd2hlbiB0b2dnbGluZyBpbiwgb3JcbiAgICAgICAqICAgYSAzLXR1cGxlIGNvbnRhaW5pbmcgdGhlIHRyYW5zaXRpb24gY2xhc3MsIHRoZSBjbGFzcyB0byBhcHBseVxuICAgICAgICogICB0byBzdGFydCB0aGUgdHJhbnNpdGlvbiwgYW5kIHRoZSBlbmRpbmcgdHJhbnNpdGlvbiBjbGFzcywgc3VjaCBhczpcbiAgICAgICAqXG4gICAgICAgKiAgICAgICBbXCJlYXNlLW91dCBkdXJhdGlvbi0zMDBcIiwgXCJvcGFjaXR5LTBcIiwgXCJvcGFjaXR5LTEwMFwiXVxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5vdXRdIC0gVGhlIENTUyB0cmFuc2l0aW9uIGNsYXNzZXMgZm9yIGhpZGluZy5cbiAgICAgICAqICAgQWNjZXB0cyBlaXRoZXIgc3RyaW5nIG9mIGNsYXNzZXMgdG8gYXBwbHkgd2hlbiB0b2dnbGluZyBvdXQsIG9yXG4gICAgICAgKiAgIGEgMy10dXBsZSBjb250YWluaW5nIHRoZSB0cmFuc2l0aW9uIGNsYXNzLCB0aGUgY2xhc3MgdG8gYXBwbHlcbiAgICAgICAqICAgdG8gc3RhcnQgdGhlIHRyYW5zaXRpb24sIGFuZCB0aGUgZW5kaW5nIHRyYW5zaXRpb24gY2xhc3MsIHN1Y2ggYXM6XG4gICAgICAgKlxuICAgICAgICogICAgICAgW1wiZWFzZS1vdXQgZHVyYXRpb24tMzAwXCIsIFwib3BhY2l0eS0xMDBcIiwgXCJvcGFjaXR5LTBcIl1cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdHMudGltZV0gLSBUaGUgdHJhbnNpdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5ibG9ja2luZ10gLSBUaGUgYm9vbGVhbiBmbGFnIHRvIGJsb2NrIHRoZSBVSSBkdXJpbmcgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgKiAgIERlZmF1bHRzIGB0cnVlYC5cbiAgICAgICAqL1xuICAgICAgdG9nZ2xlKGVsLCBvcHRzID0ge30pe1xuICAgICAgICBsZXQgb3duZXIgPSBob29rLl9fdmlldygpLmxpdmVTb2NrZXQub3duZXIoZWwpXG4gICAgICAgIG9wdHMuaW4gPSBKUy50cmFuc2l0aW9uQ2xhc3NlcyhvcHRzLmluKVxuICAgICAgICBvcHRzLm91dCA9IEpTLnRyYW5zaXRpb25DbGFzc2VzKG9wdHMub3V0KVxuICAgICAgICBKUy50b2dnbGUoXCJob29rXCIsIG93bmVyLCBlbCwgb3B0cy5kaXNwbGF5LCBvcHRzLmluLCBvcHRzLm91dCwgb3B0cy50aW1lLCBvcHRzLmJsb2NraW5nKVxuICAgICAgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBBZGRzIENTUyBjbGFzc2VzIHRvIGFuIGVsZW1lbnQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgZWxlbWVudCB0byBhZGQgY2xhc3NlcyB0by5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBuYW1lcyAtIFRoZSBjbGFzcyBuYW1lKHMpIHRvIGFkZC5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBPcHRpb25hbCBzZXR0aW5ncy5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy50cmFuc2l0aW9uXSAtIFRoZSBDU1MgdHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBzZXQuXG4gICAgICAgKiAgIEFjY2VwdHMgYSBzdHJpbmcgb2YgY2xhc3NlcyB0byBhcHBseSB3aGVuIGFkZGluZyBjbGFzc2VzIG9yXG4gICAgICAgKiAgIGEgMy10dXBsZSBjb250YWluaW5nIHRoZSB0cmFuc2l0aW9uIGNsYXNzLCB0aGUgY2xhc3MgdG8gYXBwbHlcbiAgICAgICAqICAgdG8gc3RhcnQgdGhlIHRyYW5zaXRpb24sIGFuZCB0aGUgZW5kaW5nIHRyYW5zaXRpb24gY2xhc3MsIHN1Y2ggYXM6XG4gICAgICAgKlxuICAgICAgICogICAgICAgW1wiZWFzZS1vdXQgZHVyYXRpb24tMzAwXCIsIFwib3BhY2l0eS0wXCIsIFwib3BhY2l0eS0xMDBcIl1cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdHMudGltZV0gLSBUaGUgdHJhbnNpdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmJsb2NraW5nXSAtIFRoZSBib29sZWFuIGZsYWcgdG8gYmxvY2sgdGhlIFVJIGR1cmluZyB0aGUgdHJhbnNpdGlvbi5cbiAgICAgICAqICAgRGVmYXVsdHMgYHRydWVgLlxuICAgICAgICovXG4gICAgICBhZGRDbGFzcyhlbCwgbmFtZXMsIG9wdHMgPSB7fSl7XG4gICAgICAgIG5hbWVzID0gQXJyYXkuaXNBcnJheShuYW1lcykgPyBuYW1lcyA6IG5hbWVzLnNwbGl0KFwiIFwiKVxuICAgICAgICBsZXQgb3duZXIgPSBob29rLl9fdmlldygpLmxpdmVTb2NrZXQub3duZXIoZWwpXG4gICAgICAgIEpTLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgbmFtZXMsIFtdLCBvcHRzLnRyYW5zaXRpb24sIG9wdHMudGltZSwgb3duZXIsIG9wdHMuYmxvY2tpbmcpXG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFJlbW92ZXMgQ1NTIGNsYXNzZXMgZnJvbSBhbiBlbGVtZW50LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gVGhlIGVsZW1lbnQgdG8gcmVtb3ZlIGNsYXNzZXMgZnJvbS5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBuYW1lcyAtIFRoZSBjbGFzcyBuYW1lKHMpIHRvIHJlbW92ZS5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cz17fV0gLSBPcHRpb25hbCBzZXR0aW5ncy5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy50cmFuc2l0aW9uXSAtIFRoZSBDU1MgdHJhbnNpdGlvbiBjbGFzc2VzIHRvIHNldC5cbiAgICAgICAqICAgQWNjZXB0cyBhIHN0cmluZyBvZiBjbGFzc2VzIHRvIGFwcGx5IHdoZW4gcmVtb3ZpbmcgY2xhc3NlcyBvclxuICAgICAgICogICBhIDMtdHVwbGUgY29udGFpbmluZyB0aGUgdHJhbnNpdGlvbiBjbGFzcywgdGhlIGNsYXNzIHRvIGFwcGx5XG4gICAgICAgKiAgIHRvIHN0YXJ0IHRoZSB0cmFuc2l0aW9uLCBhbmQgdGhlIGVuZGluZyB0cmFuc2l0aW9uIGNsYXNzLCBzdWNoIGFzOlxuICAgICAgICpcbiAgICAgICAqICAgICAgIFtcImVhc2Utb3V0IGR1cmF0aW9uLTMwMFwiLCBcIm9wYWNpdHktMTAwXCIsIFwib3BhY2l0eS0wXCJdXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVdIC0gVGhlIHRyYW5zaXRpb24gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzLlxuICAgICAgICogQHBhcmFtIHtib29sZWFufSBbb3B0cy5ibG9ja2luZ10gLSBUaGUgYm9vbGVhbiBmbGFnIHRvIGJsb2NrIHRoZSBVSSBkdXJpbmcgdGhlIHRyYW5zaXRpb24uXG4gICAgICAgKiAgIERlZmF1bHRzIGB0cnVlYC5cbiAgICAgICAqL1xuICAgICAgcmVtb3ZlQ2xhc3MoZWwsIG5hbWVzLCBvcHRzID0ge30pe1xuICAgICAgICBvcHRzLnRyYW5zaXRpb24gPSBKUy50cmFuc2l0aW9uQ2xhc3NlcyhvcHRzLnRyYW5zaXRpb24pXG4gICAgICAgIG5hbWVzID0gQXJyYXkuaXNBcnJheShuYW1lcykgPyBuYW1lcyA6IG5hbWVzLnNwbGl0KFwiIFwiKVxuICAgICAgICBsZXQgb3duZXIgPSBob29rLl9fdmlldygpLmxpdmVTb2NrZXQub3duZXIoZWwpXG4gICAgICAgIEpTLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgW10sIG5hbWVzLCBvcHRzLnRyYW5zaXRpb24sIG9wdHMudGltZSwgb3duZXIsIG9wdHMuYmxvY2tpbmcpXG4gICAgICB9LFxuXG4gICAgICAvKipcbiAgICAgICAqIFRvZ2dsZXMgQ1NTIGNsYXNzZXMgb24gYW4gZWxlbWVudC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIFRoZSBlbGVtZW50IHRvIHRvZ2dsZSBjbGFzc2VzIG9uLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd8c3RyaW5nW119IG5hbWVzIC0gVGhlIGNsYXNzIG5hbWUocykgdG8gdG9nZ2xlLlxuICAgICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzPXt9XSAtIE9wdGlvbmFsIHNldHRpbmdzLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLnRyYW5zaXRpb25dIC0gVGhlIENTUyB0cmFuc2l0aW9uIGNsYXNzZXMgdG8gc2V0LlxuICAgICAgICogICBBY2NlcHRzIGEgc3RyaW5nIG9mIGNsYXNzZXMgdG8gYXBwbHkgd2hlbiB0b2dnbGluZyBjbGFzc2VzIG9yXG4gICAgICAgKiAgIGEgMy10dXBsZSBjb250YWluaW5nIHRoZSB0cmFuc2l0aW9uIGNsYXNzLCB0aGUgY2xhc3MgdG8gYXBwbHlcbiAgICAgICAqICAgdG8gc3RhcnQgdGhlIHRyYW5zaXRpb24sIGFuZCB0aGUgZW5kaW5nIHRyYW5zaXRpb24gY2xhc3MsIHN1Y2ggYXM6XG4gICAgICAgKlxuICAgICAgICogICAgICAgW1wiZWFzZS1vdXQgZHVyYXRpb24tMzAwXCIsIFwib3BhY2l0eS0xMDBcIiwgXCJvcGFjaXR5LTBcIl1cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdHMudGltZV0gLSBUaGUgdHJhbnNpdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmJsb2NraW5nXSAtIFRoZSBib29sZWFuIGZsYWcgdG8gYmxvY2sgdGhlIFVJIGR1cmluZyB0aGUgdHJhbnNpdGlvbi5cbiAgICAgICAqICAgRGVmYXVsdHMgYHRydWVgLlxuICAgICAgICovXG4gICAgICB0b2dnbGVDbGFzcyhlbCwgbmFtZXMsIG9wdHMgPSB7fSl7XG4gICAgICAgIG9wdHMudHJhbnNpdGlvbiA9IEpTLnRyYW5zaXRpb25DbGFzc2VzKG9wdHMudHJhbnNpdGlvbilcbiAgICAgICAgbmFtZXMgPSBBcnJheS5pc0FycmF5KG5hbWVzKSA/IG5hbWVzIDogbmFtZXMuc3BsaXQoXCIgXCIpXG4gICAgICAgIGxldCBvd25lciA9IGhvb2suX192aWV3KCkubGl2ZVNvY2tldC5vd25lcihlbClcbiAgICAgICAgSlMudG9nZ2xlQ2xhc3NlcyhlbCwgbmFtZXMsIG9wdHMudHJhbnNpdGlvbiwgb3B0cy50aW1lLCBvd25lciwgb3B0cy5ibG9ja2luZylcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogQXBwbGllcyBhIENTUyB0cmFuc2l0aW9uIHRvIGFuIGVsZW1lbnQuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgZWxlbWVudCB0byBhcHBseSB0aGUgdHJhbnNpdGlvbiB0by5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSB0cmFuc2l0aW9uIC0gVGhlIHRyYW5zaXRpb24gY2xhc3MoZXMpIHRvIGFwcGx5LlxuICAgICAgICogICBBY2NlcHRzIGEgc3RyaW5nIG9mIGNsYXNzZXMgdG8gYXBwbHkgd2hlbiB0cmFuc2l0aW9uaW5nIG9yXG4gICAgICAgKiAgIGEgMy10dXBsZSBjb250YWluaW5nIHRoZSB0cmFuc2l0aW9uIGNsYXNzLCB0aGUgY2xhc3MgdG8gYXBwbHlcbiAgICAgICAqICAgdG8gc3RhcnQgdGhlIHRyYW5zaXRpb24sIGFuZCB0aGUgZW5kaW5nIHRyYW5zaXRpb24gY2xhc3MsIHN1Y2ggYXM6XG4gICAgICAgKlxuICAgICAgICogICAgICAgW1wiZWFzZS1vdXQgZHVyYXRpb24tMzAwXCIsIFwib3BhY2l0eS0xMDBcIiwgXCJvcGFjaXR5LTBcIl1cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHM9e31dIC0gT3B0aW9uYWwgc2V0dGluZ3MuXG4gICAgICAgKiBAcGFyYW0ge251bWJlcn0gW29wdHMudGltZV0gLSBUaGUgdHJhbnNpdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMuXG4gICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRzLmJsb2NraW5nXSAtIFRoZSBib29sZWFuIGZsYWcgdG8gYmxvY2sgdGhlIFVJIGR1cmluZyB0aGUgdHJhbnNpdGlvbi5cbiAgICAgICAqICAgRGVmYXVsdHMgYHRydWVgLlxuICAgICAgICovXG4gICAgICB0cmFuc2l0aW9uKGVsLCB0cmFuc2l0aW9uLCBvcHRzID0ge30pe1xuICAgICAgICBsZXQgb3duZXIgPSBob29rLl9fdmlldygpLmxpdmVTb2NrZXQub3duZXIoZWwpXG4gICAgICAgIEpTLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgW10sIFtdLCBKUy50cmFuc2l0aW9uQ2xhc3Nlcyh0cmFuc2l0aW9uKSwgb3B0cy50aW1lLCBvd25lciwgb3B0cy5ibG9ja2luZylcbiAgICAgIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogU2V0cyBhbiBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIFRoZSBlbGVtZW50IHRvIHNldCB0aGUgYXR0cmlidXRlIG9uLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHIgLSBUaGUgYXR0cmlidXRlIG5hbWUgdG8gc2V0LlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbCAtIFRoZSB2YWx1ZSB0byBzZXQgZm9yIHRoZSBhdHRyaWJ1dGUuXG4gICAgICAgKi9cbiAgICAgIHNldEF0dHJpYnV0ZShlbCwgYXR0ciwgdmFsKXsgSlMuc2V0T3JSZW1vdmVBdHRycyhlbCwgW1thdHRyLCB2YWxdXSwgW10pIH0sXG5cbiAgICAgIC8qKlxuICAgICAgICogUmVtb3ZlcyBhbiBhdHRyaWJ1dGUgZnJvbSBhbiBlbGVtZW50LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC0gVGhlIGVsZW1lbnQgdG8gcmVtb3ZlIHRoZSBhdHRyaWJ1dGUgZnJvbS5cbiAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyIC0gVGhlIGF0dHJpYnV0ZSBuYW1lIHRvIHJlbW92ZS5cbiAgICAgICAqL1xuICAgICAgcmVtb3ZlQXR0cmlidXRlKGVsLCBhdHRyKXsgSlMuc2V0T3JSZW1vdmVBdHRycyhlbCwgW10sIFthdHRyXSkgfSxcblxuICAgICAgLyoqXG4gICAgICAgKiBUb2dnbGVzIGFuIGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50IGJldHdlZW4gdHdvIHZhbHVlcy5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAtIFRoZSBlbGVtZW50IHRvIHRvZ2dsZSB0aGUgYXR0cmlidXRlIG9uLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHIgLSBUaGUgYXR0cmlidXRlIG5hbWUgdG8gdG9nZ2xlLlxuICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbDEgLSBUaGUgZmlyc3QgdmFsdWUgdG8gdG9nZ2xlIGJldHdlZW4uXG4gICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsMiAtIFRoZSBzZWNvbmQgdmFsdWUgdG8gdG9nZ2xlIGJldHdlZW4uXG4gICAgICAgKi9cbiAgICAgIHRvZ2dsZUF0dHJpYnV0ZShlbCwgYXR0ciwgdmFsMSwgdmFsMil7IEpTLnRvZ2dsZUF0dHIoZWwsIGF0dHIsIHZhbDEsIHZhbDIpIH0sXG4gICAgfVxuICB9XG5cbiAgcHVzaEV2ZW50KGV2ZW50LCBwYXlsb2FkID0ge30sIG9uUmVwbHkpe1xuICAgIGlmKG9uUmVwbHkgPT09IHVuZGVmaW5lZCl7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHJlZiA9IHRoaXMuX192aWV3KCkucHVzaEhvb2tFdmVudCh0aGlzLmVsLCBudWxsLCBldmVudCwgcGF5bG9hZCwgKHJlcGx5LCBfcmVmKSA9PiByZXNvbHZlKHJlcGx5KSlcbiAgICAgICAgICBpZihyZWYgPT09IGZhbHNlKXtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJ1bmFibGUgdG8gcHVzaCBob29rIGV2ZW50LiBMaXZlVmlldyBub3QgY29ubmVjdGVkXCIpKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX192aWV3KCkucHVzaEhvb2tFdmVudCh0aGlzLmVsLCBudWxsLCBldmVudCwgcGF5bG9hZCwgb25SZXBseSlcbiAgfVxuXG4gIHB1c2hFdmVudFRvKHBoeFRhcmdldCwgZXZlbnQsIHBheWxvYWQgPSB7fSwgb25SZXBseSl7XG4gICAgaWYob25SZXBseSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5fX3ZpZXcoKS53aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVmID0gdmlldy5wdXNoSG9va0V2ZW50KHRoaXMuZWwsIHRhcmdldEN0eCwgZXZlbnQsIHBheWxvYWQsIChyZXBseSwgX3JlZikgPT4gcmVzb2x2ZShyZXBseSkpXG4gICAgICAgICAgICBpZihyZWYgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihcInVuYWJsZSB0byBwdXNoIGhvb2sgZXZlbnQuIExpdmVWaWV3IG5vdCBjb25uZWN0ZWRcIikpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBjYXRjaCAoZXJyb3Ipe1xuICAgICAgICAgIHJlamVjdChlcnJvcilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX192aWV3KCkud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgIHJldHVybiB2aWV3LnB1c2hIb29rRXZlbnQodGhpcy5lbCwgdGFyZ2V0Q3R4LCBldmVudCwgcGF5bG9hZCwgb25SZXBseSlcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlRXZlbnQoZXZlbnQsIGNhbGxiYWNrKXtcbiAgICBsZXQgY2FsbGJhY2tSZWYgPSAoY3VzdG9tRXZlbnQsIGJ5cGFzcykgPT4gYnlwYXNzID8gZXZlbnQgOiBjYWxsYmFjayhjdXN0b21FdmVudC5kZXRhaWwpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYHBoeDoke2V2ZW50fWAsIGNhbGxiYWNrUmVmKVxuICAgIHRoaXMuX19saXN0ZW5lcnMuYWRkKGNhbGxiYWNrUmVmKVxuICAgIHJldHVybiBjYWxsYmFja1JlZlxuICB9XG5cbiAgcmVtb3ZlSGFuZGxlRXZlbnQoY2FsbGJhY2tSZWYpe1xuICAgIGxldCBldmVudCA9IGNhbGxiYWNrUmVmKG51bGwsIHRydWUpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoYHBoeDoke2V2ZW50fWAsIGNhbGxiYWNrUmVmKVxuICAgIHRoaXMuX19saXN0ZW5lcnMuZGVsZXRlKGNhbGxiYWNrUmVmKVxuICB9XG5cbiAgdXBsb2FkKG5hbWUsIGZpbGVzKXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcoKS5kaXNwYXRjaFVwbG9hZHMobnVsbCwgbmFtZSwgZmlsZXMpXG4gIH1cblxuICB1cGxvYWRUbyhwaHhUYXJnZXQsIG5hbWUsIGZpbGVzKXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcoKS53aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgdmlldy5kaXNwYXRjaFVwbG9hZHModGFyZ2V0Q3R4LCBuYW1lLCBmaWxlcylcbiAgICB9KVxuICB9XG5cbiAgX19jbGVhbnVwX18oKXtcbiAgICB0aGlzLl9fbGlzdGVuZXJzLmZvckVhY2goY2FsbGJhY2tSZWYgPT4gdGhpcy5yZW1vdmVIYW5kbGVFdmVudChjYWxsYmFja1JlZikpXG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VULFxuICBDSEVDS0FCTEVfSU5QVVRTLFxuICBDT05TRUNVVElWRV9SRUxPQURTLFxuICBQSFhfQVVUT19SRUNPVkVSLFxuICBQSFhfQ09NUE9ORU5ULFxuICBQSFhfQ09OTkVDVEVEX0NMQVNTLFxuICBQSFhfRElTQUJMRV9XSVRILFxuICBQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUsXG4gIFBIWF9ESVNBQkxFRCxcbiAgUEhYX0xPQURJTkdfQ0xBU1MsXG4gIFBIWF9FUlJPUl9DTEFTUyxcbiAgUEhYX0NMSUVOVF9FUlJPUl9DTEFTUyxcbiAgUEhYX1NFUlZFUl9FUlJPUl9DTEFTUyxcbiAgUEhYX0hBU19GT0NVU0VELFxuICBQSFhfSEFTX1NVQk1JVFRFRCxcbiAgUEhYX0hPT0ssXG4gIFBIWF9QQVJFTlRfSUQsXG4gIFBIWF9QUk9HUkVTUyxcbiAgUEhYX1JFQURPTkxZLFxuICBQSFhfUkVGX0xPQURJTkcsXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUkVGX0xPQ0ssXG4gIFBIWF9ST09UX0lELFxuICBQSFhfU0VTU0lPTixcbiAgUEhYX1NUQVRJQyxcbiAgUEhYX1NUSUNLWSxcbiAgUEhYX1RSQUNLX1NUQVRJQyxcbiAgUEhYX1RSQUNLX1VQTE9BRFMsXG4gIFBIWF9VUERBVEUsXG4gIFBIWF9VUExPQURfUkVGLFxuICBQSFhfVklFV19TRUxFQ1RPUixcbiAgUEhYX01BSU4sXG4gIFBIWF9NT1VOVEVELFxuICBQVVNIX1RJTUVPVVQsXG4gIFBIWF9WSUVXUE9SVF9UT1AsXG4gIFBIWF9WSUVXUE9SVF9CT1RUT00sXG4gIE1BWF9DSElMRF9KT0lOX0FUVEVNUFRTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNsb25lLFxuICBjbG9zZXN0UGh4QmluZGluZyxcbiAgaXNFbXB0eSxcbiAgaXNFcXVhbE9iaixcbiAgbG9nRXJyb3IsXG4gIG1heWJlLFxuICBpc0NpZCxcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgQnJvd3NlciBmcm9tIFwiLi9icm93c2VyXCJcbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBFbGVtZW50UmVmIGZyb20gXCIuL2VsZW1lbnRfcmVmXCJcbmltcG9ydCBET01QYXRjaCBmcm9tIFwiLi9kb21fcGF0Y2hcIlxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcbmltcG9ydCBSZW5kZXJlZCBmcm9tIFwiLi9yZW5kZXJlZFwiXG5pbXBvcnQgVmlld0hvb2sgZnJvbSBcIi4vdmlld19ob29rXCJcbmltcG9ydCBKUyBmcm9tIFwiLi9qc1wiXG5cbmltcG9ydCBtb3JwaGRvbSBmcm9tIFwibW9ycGhkb21cIlxuXG5leHBvcnQgbGV0IHByZXBlbmRGb3JtRGF0YUtleSA9IChrZXksIHByZWZpeCkgPT4ge1xuICBsZXQgaXNBcnJheSA9IGtleS5lbmRzV2l0aChcIltdXCIpXG4gIC8vIFJlbW92ZSB0aGUgXCJbXVwiIGlmIGl0J3MgYW4gYXJyYXlcbiAgbGV0IGJhc2VLZXkgPSBpc0FycmF5ID8ga2V5LnNsaWNlKDAsIC0yKSA6IGtleVxuICAvLyBSZXBsYWNlIGxhc3Qgb2NjdXJyZW5jZSBvZiBrZXkgYmVmb3JlIGEgY2xvc2luZyBicmFja2V0IG9yIHRoZSBlbmQgd2l0aCBrZXkgcGx1cyBzdWZmaXhcbiAgYmFzZUtleSA9IGJhc2VLZXkucmVwbGFjZSgvKFteXFxbXFxdXSspKFxcXT8kKS8sIGAke3ByZWZpeH0kMSQyYClcbiAgLy8gQWRkIGJhY2sgdGhlIFwiW11cIiBpZiBpdCB3YXMgYW4gYXJyYXlcbiAgaWYoaXNBcnJheSl7IGJhc2VLZXkgKz0gXCJbXVwiIH1cbiAgcmV0dXJuIGJhc2VLZXlcbn1cblxubGV0IHNlcmlhbGl6ZUZvcm0gPSAoZm9ybSwgb3B0cywgb25seU5hbWVzID0gW10pID0+IHtcbiAgY29uc3Qge3N1Ym1pdHRlcn0gPSBvcHRzXG5cbiAgLy8gV2UgbXVzdCBpbmplY3QgdGhlIHN1Ym1pdHRlciBpbiB0aGUgb3JkZXIgdGhhdCBpdCBleGlzdHMgaW4gdGhlIERPTVxuICAvLyByZWxhdGl2ZSB0byBvdGhlciBpbnB1dHMuIEZvciBleGFtcGxlLCBmb3IgY2hlY2tib3ggZ3JvdXBzLCB0aGUgb3JkZXIgbXVzdCBiZSBtYWludGFpbmVkLlxuICBsZXQgaW5qZWN0ZWRFbGVtZW50XG4gIGlmKHN1Ym1pdHRlciAmJiBzdWJtaXR0ZXIubmFtZSl7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcbiAgICBpbnB1dC50eXBlID0gXCJoaWRkZW5cIlxuICAgIC8vIHNldCB0aGUgZm9ybSBhdHRyaWJ1dGUgaWYgdGhlIHN1Ym1pdHRlciBoYXMgb25lO1xuICAgIC8vIHRoaXMgY2FuIGhhcHBlbiBpZiB0aGUgZWxlbWVudCBpcyBvdXRzaWRlIHRoZSBhY3R1YWwgZm9ybSBlbGVtZW50XG4gICAgY29uc3QgZm9ybUlkID0gc3VibWl0dGVyLmdldEF0dHJpYnV0ZShcImZvcm1cIilcbiAgICBpZihmb3JtSWQpe1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFwiZm9ybVwiLCBmb3JtSWQpXG4gICAgfVxuICAgIGlucHV0Lm5hbWUgPSBzdWJtaXR0ZXIubmFtZVxuICAgIGlucHV0LnZhbHVlID0gc3VibWl0dGVyLnZhbHVlXG4gICAgc3VibWl0dGVyLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGlucHV0LCBzdWJtaXR0ZXIpXG4gICAgaW5qZWN0ZWRFbGVtZW50ID0gaW5wdXRcbiAgfVxuXG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm0pXG4gIGNvbnN0IHRvUmVtb3ZlID0gW11cblxuICBmb3JtRGF0YS5mb3JFYWNoKCh2YWwsIGtleSwgX2luZGV4KSA9PiB7XG4gICAgaWYodmFsIGluc3RhbmNlb2YgRmlsZSl7IHRvUmVtb3ZlLnB1c2goa2V5KSB9XG4gIH0pXG5cbiAgLy8gQ2xlYW51cCBhZnRlciBidWlsZGluZyBmaWxlRGF0YVxuICB0b1JlbW92ZS5mb3JFYWNoKGtleSA9PiBmb3JtRGF0YS5kZWxldGUoa2V5KSlcblxuICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKClcblxuICBjb25zdCB7aW5wdXRzVW51c2VkLCBvbmx5SGlkZGVuSW5wdXRzfSA9IEFycmF5LmZyb20oZm9ybS5lbGVtZW50cykucmVkdWNlKChhY2MsIGlucHV0KSA9PiB7XG4gICAgY29uc3Qge2lucHV0c1VudXNlZCwgb25seUhpZGRlbklucHV0c30gPSBhY2NcbiAgICBjb25zdCBrZXkgPSBpbnB1dC5uYW1lXG4gICAgaWYoIWtleSl7IHJldHVybiBhY2MgfVxuXG4gICAgaWYoaW5wdXRzVW51c2VkW2tleV0gPT09IHVuZGVmaW5lZCl7IGlucHV0c1VudXNlZFtrZXldID0gdHJ1ZSB9XG4gICAgaWYob25seUhpZGRlbklucHV0c1trZXldID09PSB1bmRlZmluZWQpeyBvbmx5SGlkZGVuSW5wdXRzW2tleV0gPSB0cnVlIH1cblxuICAgIGNvbnN0IGlzVXNlZCA9IERPTS5wcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQpIHx8IERPTS5wcml2YXRlKGlucHV0LCBQSFhfSEFTX1NVQk1JVFRFRClcbiAgICBjb25zdCBpc0hpZGRlbiA9IGlucHV0LnR5cGUgPT09IFwiaGlkZGVuXCJcbiAgICBpbnB1dHNVbnVzZWRba2V5XSA9IGlucHV0c1VudXNlZFtrZXldICYmICFpc1VzZWRcbiAgICBvbmx5SGlkZGVuSW5wdXRzW2tleV0gPSBvbmx5SGlkZGVuSW5wdXRzW2tleV0gJiYgaXNIaWRkZW5cblxuICAgIHJldHVybiBhY2NcbiAgfSwge2lucHV0c1VudXNlZDoge30sIG9ubHlIaWRkZW5JbnB1dHM6IHt9fSlcblxuICBmb3IobGV0IFtrZXksIHZhbF0gb2YgZm9ybURhdGEuZW50cmllcygpKXtcbiAgICBpZihvbmx5TmFtZXMubGVuZ3RoID09PSAwIHx8IG9ubHlOYW1lcy5pbmRleE9mKGtleSkgPj0gMCl7XG4gICAgICBsZXQgaXNVbnVzZWQgPSBpbnB1dHNVbnVzZWRba2V5XVxuICAgICAgbGV0IGhpZGRlbiA9IG9ubHlIaWRkZW5JbnB1dHNba2V5XVxuICAgICAgaWYoaXNVbnVzZWQgJiYgIShzdWJtaXR0ZXIgJiYgc3VibWl0dGVyLm5hbWUgPT0ga2V5KSAmJiAhaGlkZGVuKXtcbiAgICAgICAgcGFyYW1zLmFwcGVuZChwcmVwZW5kRm9ybURhdGFLZXkoa2V5LCBcIl91bnVzZWRfXCIpLCBcIlwiKVxuICAgICAgfVxuICAgICAgcGFyYW1zLmFwcGVuZChrZXksIHZhbClcbiAgICB9XG4gIH1cblxuICAvLyByZW1vdmUgdGhlIGluamVjdGVkIGVsZW1lbnQgYWdhaW5cbiAgLy8gKGl0IHdvdWxkIGJlIHJlbW92ZWQgYnkgdGhlIG5leHQgZG9tIHBhdGNoIGFueXdheSwgYnV0IHRoaXMgaXMgY2xlYW5lcilcbiAgaWYoc3VibWl0dGVyICYmIGluamVjdGVkRWxlbWVudCl7XG4gICAgc3VibWl0dGVyLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoaW5qZWN0ZWRFbGVtZW50KVxuICB9XG5cbiAgcmV0dXJuIHBhcmFtcy50b1N0cmluZygpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBzdGF0aWMgY2xvc2VzdFZpZXcoZWwpe1xuICAgIGxldCBsaXZlVmlld0VsID0gZWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUilcbiAgICByZXR1cm4gbGl2ZVZpZXdFbCA/IERPTS5wcml2YXRlKGxpdmVWaWV3RWwsIFwidmlld1wiKSA6IG51bGxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsLCBsaXZlU29ja2V0LCBwYXJlbnRWaWV3LCBmbGFzaCwgbGl2ZVJlZmVyZXIpe1xuICAgIHRoaXMuaXNEZWFkID0gZmFsc2VcbiAgICB0aGlzLmxpdmVTb2NrZXQgPSBsaXZlU29ja2V0XG4gICAgdGhpcy5mbGFzaCA9IGZsYXNoXG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRWaWV3XG4gICAgdGhpcy5yb290ID0gcGFyZW50VmlldyA/IHBhcmVudFZpZXcucm9vdCA6IHRoaXNcbiAgICB0aGlzLmVsID0gZWxcbiAgICBET00ucHV0UHJpdmF0ZSh0aGlzLmVsLCBcInZpZXdcIiwgdGhpcylcbiAgICB0aGlzLmlkID0gdGhpcy5lbC5pZFxuICAgIHRoaXMucmVmID0gMFxuICAgIHRoaXMubGFzdEFja1JlZiA9IG51bGxcbiAgICB0aGlzLmNoaWxkSm9pbnMgPSAwXG4gICAgdGhpcy5sb2FkZXJUaW1lciA9IG51bGxcbiAgICB0aGlzLmRpc2Nvbm5lY3RlZFRpbWVyID0gbnVsbFxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICB0aGlzLnBlbmRpbmdGb3JtcyA9IG5ldyBTZXQoKVxuICAgIHRoaXMucmVkaXJlY3QgPSBmYWxzZVxuICAgIHRoaXMuaHJlZiA9IG51bGxcbiAgICB0aGlzLmpvaW5Db3VudCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuam9pbkNvdW50IC0gMSA6IDBcbiAgICB0aGlzLmpvaW5BdHRlbXB0cyA9IDBcbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gdHJ1ZVxuICAgIHRoaXMuZGVzdHJveWVkID0gZmFsc2VcbiAgICB0aGlzLmpvaW5DYWxsYmFjayA9IGZ1bmN0aW9uKG9uRG9uZSl7IG9uRG9uZSAmJiBvbkRvbmUoKSB9XG4gICAgdGhpcy5zdG9wQ2FsbGJhY2sgPSBmdW5jdGlvbigpeyB9XG4gICAgdGhpcy5wZW5kaW5nSm9pbk9wcyA9IHRoaXMucGFyZW50ID8gbnVsbCA6IFtdXG4gICAgdGhpcy52aWV3SG9va3MgPSB7fVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSBbXVxuICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLnBhcmVudCA/IG51bGwgOiB7fVxuICAgIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSA9IHt9XG4gICAgdGhpcy5mb3Jtc0ZvclJlY292ZXJ5ID0ge31cbiAgICB0aGlzLmNoYW5uZWwgPSB0aGlzLmxpdmVTb2NrZXQuY2hhbm5lbChgbHY6JHt0aGlzLmlkfWAsICgpID0+IHtcbiAgICAgIGxldCB1cmwgPSB0aGlzLmhyZWYgJiYgdGhpcy5leHBhbmRVUkwodGhpcy5ocmVmKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVkaXJlY3Q6IHRoaXMucmVkaXJlY3QgPyB1cmwgOiB1bmRlZmluZWQsXG4gICAgICAgIHVybDogdGhpcy5yZWRpcmVjdCA/IHVuZGVmaW5lZCA6IHVybCB8fCB1bmRlZmluZWQsXG4gICAgICAgIHBhcmFtczogdGhpcy5jb25uZWN0UGFyYW1zKGxpdmVSZWZlcmVyKSxcbiAgICAgICAgc2Vzc2lvbjogdGhpcy5nZXRTZXNzaW9uKCksXG4gICAgICAgIHN0YXRpYzogdGhpcy5nZXRTdGF0aWMoKSxcbiAgICAgICAgZmxhc2g6IHRoaXMuZmxhc2gsXG4gICAgICAgIHN0aWNreTogdGhpcy5lbC5oYXNBdHRyaWJ1dGUoUEhYX1NUSUNLWSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2V0SHJlZihocmVmKXsgdGhpcy5ocmVmID0gaHJlZiB9XG5cbiAgc2V0UmVkaXJlY3QoaHJlZil7XG4gICAgdGhpcy5yZWRpcmVjdCA9IHRydWVcbiAgICB0aGlzLmhyZWYgPSBocmVmXG4gIH1cblxuICBpc01haW4oKXsgcmV0dXJuIHRoaXMuZWwuaGFzQXR0cmlidXRlKFBIWF9NQUlOKSB9XG5cbiAgY29ubmVjdFBhcmFtcyhsaXZlUmVmZXJlcil7XG4gICAgbGV0IHBhcmFtcyA9IHRoaXMubGl2ZVNvY2tldC5wYXJhbXModGhpcy5lbClcbiAgICBsZXQgbWFuaWZlc3QgPVxuICAgICAgRE9NLmFsbChkb2N1bWVudCwgYFske3RoaXMuYmluZGluZyhQSFhfVFJBQ0tfU1RBVElDKX1dYClcbiAgICAgICAgLm1hcChub2RlID0+IG5vZGUuc3JjIHx8IG5vZGUuaHJlZikuZmlsdGVyKHVybCA9PiB0eXBlb2YgKHVybCkgPT09IFwic3RyaW5nXCIpXG5cbiAgICBpZihtYW5pZmVzdC5sZW5ndGggPiAwKXsgcGFyYW1zW1wiX3RyYWNrX3N0YXRpY1wiXSA9IG1hbmlmZXN0IH1cbiAgICBwYXJhbXNbXCJfbW91bnRzXCJdID0gdGhpcy5qb2luQ291bnRcbiAgICBwYXJhbXNbXCJfbW91bnRfYXR0ZW1wdHNcIl0gPSB0aGlzLmpvaW5BdHRlbXB0c1xuICAgIHBhcmFtc1tcIl9saXZlX3JlZmVyZXJcIl0gPSBsaXZlUmVmZXJlclxuICAgIHRoaXMuam9pbkF0dGVtcHRzKytcblxuICAgIHJldHVybiBwYXJhbXNcbiAgfVxuXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLmNoYW5uZWwuY2FuUHVzaCgpIH1cblxuICBnZXRTZXNzaW9uKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfU0VTU0lPTikgfVxuXG4gIGdldFN0YXRpYygpe1xuICAgIGxldCB2YWwgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfU1RBVElDKVxuICAgIHJldHVybiB2YWwgPT09IFwiXCIgPyBudWxsIDogdmFsXG4gIH1cblxuICBkZXN0cm95KGNhbGxiYWNrID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHRoaXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWVcbiAgICBkZWxldGUgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdXG4gICAgaWYodGhpcy5wYXJlbnQpeyBkZWxldGUgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMucGFyZW50LmlkXVt0aGlzLmlkXSB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgbGV0IG9uRmluaXNoZWQgPSAoKSA9PiB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICBmb3IobGV0IGlkIGluIHRoaXMudmlld0hvb2tzKXtcbiAgICAgICAgdGhpcy5kZXN0cm95SG9vayh0aGlzLnZpZXdIb29rc1tpZF0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgRE9NLm1hcmtQaHhDaGlsZERlc3Ryb3llZCh0aGlzLmVsKVxuXG4gICAgdGhpcy5sb2coXCJkZXN0cm95ZWRcIiwgKCkgPT4gW1widGhlIGNoaWxkIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFyZW50XCJdKVxuICAgIHRoaXMuY2hhbm5lbC5sZWF2ZSgpXG4gICAgICAucmVjZWl2ZShcIm9rXCIsIG9uRmluaXNoZWQpXG4gICAgICAucmVjZWl2ZShcImVycm9yXCIsIG9uRmluaXNoZWQpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgb25GaW5pc2hlZClcbiAgfVxuXG4gIHNldENvbnRhaW5lckNsYXNzZXMoLi4uY2xhc3Nlcyl7XG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgUEhYX0NPTk5FQ1RFRF9DTEFTUyxcbiAgICAgIFBIWF9MT0FESU5HX0NMQVNTLFxuICAgICAgUEhYX0VSUk9SX0NMQVNTLFxuICAgICAgUEhYX0NMSUVOVF9FUlJPUl9DTEFTUyxcbiAgICAgIFBIWF9TRVJWRVJfRVJST1JfQ0xBU1NcbiAgICApXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpXG4gIH1cblxuICBzaG93TG9hZGVyKHRpbWVvdXQpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmxvYWRlclRpbWVyKVxuICAgIGlmKHRpbWVvdXQpe1xuICAgICAgdGhpcy5sb2FkZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zaG93TG9hZGVyKCksIHRpbWVvdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3MpeyB0aGlzLnZpZXdIb29rc1tpZF0uX19kaXNjb25uZWN0ZWQoKSB9XG4gICAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0xPQURJTkdfQ0xBU1MpXG4gICAgfVxuICB9XG5cbiAgZXhlY0FsbChiaW5kaW5nKXtcbiAgICBET00uYWxsKHRoaXMuZWwsIGBbJHtiaW5kaW5nfV1gLCBlbCA9PiB0aGlzLmxpdmVTb2NrZXQuZXhlY0pTKGVsLCBlbC5nZXRBdHRyaWJ1dGUoYmluZGluZykpKVxuICB9XG5cbiAgaGlkZUxvYWRlcigpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmxvYWRlclRpbWVyKVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmRpc2Nvbm5lY3RlZFRpbWVyKVxuICAgIHRoaXMuc2V0Q29udGFpbmVyQ2xhc3NlcyhQSFhfQ09OTkVDVEVEX0NMQVNTKVxuICAgIHRoaXMuZXhlY0FsbCh0aGlzLmJpbmRpbmcoXCJjb25uZWN0ZWRcIikpXG4gIH1cblxuICB0cmlnZ2VyUmVjb25uZWN0ZWQoKXtcbiAgICBmb3IobGV0IGlkIGluIHRoaXMudmlld0hvb2tzKXsgdGhpcy52aWV3SG9va3NbaWRdLl9fcmVjb25uZWN0ZWQoKSB9XG4gIH1cblxuICBsb2coa2luZCwgbXNnQ2FsbGJhY2spe1xuICAgIHRoaXMubGl2ZVNvY2tldC5sb2codGhpcywga2luZCwgbXNnQ2FsbGJhY2spXG4gIH1cblxuICB0cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSA9IGZ1bmN0aW9uKCl7fSl7XG4gICAgdGhpcy5saXZlU29ja2V0LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lKVxuICB9XG5cbiAgLy8gY2FsbHMgdGhlIGNhbGxiYWNrIHdpdGggdGhlIHZpZXcgYW5kIHRhcmdldCBlbGVtZW50IGZvciB0aGUgZ2l2ZW4gcGh4VGFyZ2V0XG4gIC8vIHRhcmdldHMgY2FuIGJlOlxuICAvLyAgKiBhbiBlbGVtZW50IGl0c2VsZiwgdGhlbiBpdCBpcyBzaW1wbHkgcGFzc2VkIHRvIGxpdmVTb2NrZXQub3duZXI7XG4gIC8vICAqIGEgQ0lEIChDb21wb25lbnQgSUQpLCB0aGVuIHdlIGZpcnN0IHNlYXJjaCB0aGUgY29tcG9uZW50J3MgZWxlbWVudCBpbiB0aGUgRE9NXG4gIC8vICAqIGEgc2VsZWN0b3IsIHRoZW4gd2Ugc2VhcmNoIHRoZSBzZWxlY3RvciBpbiB0aGUgRE9NIGFuZCBjYWxsIHRoZSBjYWxsYmFja1xuICAvLyAgICBmb3IgZWFjaCBlbGVtZW50IGZvdW5kIHdpdGggdGhlIGNvcnJlc3BvbmRpbmcgb3duZXIgdmlld1xuICB3aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgY2FsbGJhY2ssIGRvbSA9IGRvY3VtZW50LCB2aWV3RWwpe1xuICAgIC8vIGluIHRoZSBmb3JtIHJlY292ZXJ5IGNhc2Ugd2Ugc2VhcmNoIGluIGEgdGVtcGxhdGUgZnJhZ21lbnQgaW5zdGVhZCBvZlxuICAgIC8vIHRoZSByZWFsIGRvbSwgdGhlcmVmb3JlIHdlIG9wdGlvbmFsbHkgcGFzcyBkb20gYW5kIHZpZXdFbFxuXG4gICAgaWYocGh4VGFyZ2V0IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgfHwgcGh4VGFyZ2V0IGluc3RhbmNlb2YgU1ZHRWxlbWVudCl7XG4gICAgICByZXR1cm4gdGhpcy5saXZlU29ja2V0Lm93bmVyKHBoeFRhcmdldCwgdmlldyA9PiBjYWxsYmFjayh2aWV3LCBwaHhUYXJnZXQpKVxuICAgIH1cblxuICAgIGlmKGlzQ2lkKHBoeFRhcmdldCkpe1xuICAgICAgbGV0IHRhcmdldHMgPSBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHZpZXdFbCB8fCB0aGlzLmVsLCBwaHhUYXJnZXQpXG4gICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGxvZ0Vycm9yKGBubyBjb21wb25lbnQgZm91bmQgbWF0Y2hpbmcgcGh4LXRhcmdldCBvZiAke3BoeFRhcmdldH1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcywgcGFyc2VJbnQocGh4VGFyZ2V0KSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRhcmdldHMgPSBBcnJheS5mcm9tKGRvbS5xdWVyeVNlbGVjdG9yQWxsKHBoeFRhcmdldCkpXG4gICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PT0gMCl7IGxvZ0Vycm9yKGBub3RoaW5nIGZvdW5kIG1hdGNoaW5nIHRoZSBwaHgtdGFyZ2V0IHNlbGVjdG9yIFwiJHtwaHhUYXJnZXR9XCJgKSB9XG4gICAgICB0YXJnZXRzLmZvckVhY2godGFyZ2V0ID0+IHRoaXMubGl2ZVNvY2tldC5vd25lcih0YXJnZXQsIHZpZXcgPT4gY2FsbGJhY2sodmlldywgdGFyZ2V0KSkpXG4gICAgfVxuICB9XG5cbiAgYXBwbHlEaWZmKHR5cGUsIHJhd0RpZmYsIGNhbGxiYWNrKXtcbiAgICB0aGlzLmxvZyh0eXBlLCAoKSA9PiBbXCJcIiwgY2xvbmUocmF3RGlmZildKVxuICAgIGxldCB7ZGlmZiwgcmVwbHksIGV2ZW50cywgdGl0bGV9ID0gUmVuZGVyZWQuZXh0cmFjdChyYXdEaWZmKVxuICAgIGNhbGxiYWNrKHtkaWZmLCByZXBseSwgZXZlbnRzfSlcbiAgICBpZih0eXBlb2YgdGl0bGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZSA9PSBcIm1vdW50XCIpeyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IERPTS5wdXRUaXRsZSh0aXRsZSkpIH1cbiAgfVxuXG4gIG9uSm9pbihyZXNwKXtcbiAgICBsZXQge3JlbmRlcmVkLCBjb250YWluZXIsIGxpdmV2aWV3X3ZlcnNpb259ID0gcmVzcFxuICAgIGlmKGNvbnRhaW5lcil7XG4gICAgICBsZXQgW3RhZywgYXR0cnNdID0gY29udGFpbmVyXG4gICAgICB0aGlzLmVsID0gRE9NLnJlcGxhY2VSb290Q29udGFpbmVyKHRoaXMuZWwsIHRhZywgYXR0cnMpXG4gICAgfVxuICAgIHRoaXMuY2hpbGRKb2lucyA9IDBcbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gdHJ1ZVxuICAgIHRoaXMuZmxhc2ggPSBudWxsXG4gICAgaWYodGhpcy5yb290ID09PSB0aGlzKXtcbiAgICAgIHRoaXMuZm9ybXNGb3JSZWNvdmVyeSA9IHRoaXMuZ2V0Rm9ybXNGb3JSZWNvdmVyeSgpXG4gICAgfVxuICAgIGlmKHRoaXMuaXNNYWluKCkgJiYgd2luZG93Lmhpc3Rvcnkuc3RhdGUgPT09IG51bGwpe1xuICAgICAgLy8gc2V0IGluaXRpYWwgaGlzdG9yeSBlbnRyeSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBwYWdlIGxvYWQgKG5vIGhpc3RvcnkpXG4gICAgICBCcm93c2VyLnB1c2hTdGF0ZShcInJlcGxhY2VcIiwge1xuICAgICAgICB0eXBlOiBcInBhdGNoXCIsXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBwb3NpdGlvbjogdGhpcy5saXZlU29ja2V0LmN1cnJlbnRIaXN0b3J5UG9zaXRpb25cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYobGl2ZXZpZXdfdmVyc2lvbiAhPT0gdGhpcy5saXZlU29ja2V0LnZlcnNpb24oKSl7XG4gICAgICBjb25zb2xlLmVycm9yKGBMaXZlVmlldyBhc3NldCB2ZXJzaW9uIG1pc21hdGNoLiBKYXZhU2NyaXB0IHZlcnNpb24gJHt0aGlzLmxpdmVTb2NrZXQudmVyc2lvbigpfSB2cy4gc2VydmVyICR7bGl2ZXZpZXdfdmVyc2lvbn0uIFRvIGF2b2lkIGlzc3VlcywgcGxlYXNlIGVuc3VyZSB0aGF0IHlvdXIgYXNzZXRzIHVzZSB0aGUgc2FtZSB2ZXJzaW9uIGFzIHRoZSBzZXJ2ZXIuYClcbiAgICB9XG5cbiAgICBCcm93c2VyLmRyb3BMb2NhbCh0aGlzLmxpdmVTb2NrZXQubG9jYWxTdG9yYWdlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIENPTlNFQ1VUSVZFX1JFTE9BRFMpXG4gICAgdGhpcy5hcHBseURpZmYoXCJtb3VudFwiLCByZW5kZXJlZCwgKHtkaWZmLCBldmVudHN9KSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVkID0gbmV3IFJlbmRlcmVkKHRoaXMuaWQsIGRpZmYpXG4gICAgICBsZXQgW2h0bWwsIHN0cmVhbXNdID0gdGhpcy5yZW5kZXJDb250YWluZXIobnVsbCwgXCJqb2luXCIpXG4gICAgICB0aGlzLmRyb3BQZW5kaW5nUmVmcygpXG4gICAgICB0aGlzLmpvaW5Db3VudCsrXG4gICAgICB0aGlzLmpvaW5BdHRlbXB0cyA9IDBcblxuICAgICAgdGhpcy5tYXliZVJlY292ZXJGb3JtcyhodG1sLCAoKSA9PiB7XG4gICAgICAgIHRoaXMub25Kb2luQ29tcGxldGUocmVzcCwgaHRtbCwgc3RyZWFtcywgZXZlbnRzKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZHJvcFBlbmRpbmdSZWZzKCl7XG4gICAgRE9NLmFsbChkb2N1bWVudCwgYFske1BIWF9SRUZfU1JDfT1cIiR7dGhpcy5yZWZTcmMoKX1cIl1gLCBlbCA9PiB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRl9MT0FESU5HKVxuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUZfU1JDKVxuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUZfTE9DSylcbiAgICB9KVxuICB9XG5cbiAgb25Kb2luQ29tcGxldGUoe2xpdmVfcGF0Y2h9LCBodG1sLCBzdHJlYW1zLCBldmVudHMpe1xuICAgIC8vIEluIG9yZGVyIHRvIHByb3ZpZGUgYSBiZXR0ZXIgZXhwZXJpZW5jZSwgd2Ugd2FudCB0byBqb2luXG4gICAgLy8gYWxsIExpdmVWaWV3cyBmaXJzdCBhbmQgb25seSB0aGVuIGFwcGx5IHRoZWlyIHBhdGNoZXMuXG4gICAgaWYodGhpcy5qb2luQ291bnQgPiAxIHx8ICh0aGlzLnBhcmVudCAmJiAhdGhpcy5wYXJlbnQuaXNKb2luUGVuZGluZygpKSl7XG4gICAgICByZXR1cm4gdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBzdHJlYW1zLCBldmVudHMpXG4gICAgfVxuXG4gICAgLy8gT25lIGRvd25zaWRlIG9mIHRoaXMgYXBwcm9hY2ggaXMgdGhhdCB3ZSBuZWVkIHRvIGZpbmQgcGh4Q2hpbGRyZW5cbiAgICAvLyBpbiB0aGUgaHRtbCBmcmFnbWVudCwgaW5zdGVhZCBvZiBkaXJlY3RseSBvbiB0aGUgRE9NLiBUaGUgZnJhZ21lbnRcbiAgICAvLyBhbHNvIGRvZXMgbm90IGluY2x1ZGUgUEhYX1NUQVRJQywgc28gd2UgbmVlZCB0byBjb3B5IGl0IG92ZXIgZnJvbVxuICAgIC8vIHRoZSBET00uXG4gICAgbGV0IG5ld0NoaWxkcmVuID0gRE9NLmZpbmRQaHhDaGlsZHJlbkluRnJhZ21lbnQoaHRtbCwgdGhpcy5pZCkuZmlsdGVyKHRvRWwgPT4ge1xuICAgICAgbGV0IGZyb21FbCA9IHRvRWwuaWQgJiYgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke3RvRWwuaWR9XCJdYClcbiAgICAgIGxldCBwaHhTdGF0aWMgPSBmcm9tRWwgJiYgZnJvbUVsLmdldEF0dHJpYnV0ZShQSFhfU1RBVElDKVxuICAgICAgaWYocGh4U3RhdGljKXsgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQywgcGh4U3RhdGljKSB9XG4gICAgICAvLyBzZXQgUEhYX1JPT1RfSUQgdG8gcHJldmVudCBldmVudHMgZnJvbSBiZWluZyBkaXNwYXRjaGVkIHRvIHRoZSByb290IHZpZXdcbiAgICAgIC8vIHdoaWxlIHRoZSBjaGlsZCBqb2luIGlzIHN0aWxsIHBlbmRpbmdcbiAgICAgIGlmKGZyb21FbCl7IGZyb21FbC5zZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQsIHRoaXMucm9vdC5pZCkgfVxuICAgICAgcmV0dXJuIHRoaXMuam9pbkNoaWxkKHRvRWwpXG4gICAgfSlcblxuICAgIGlmKG5ld0NoaWxkcmVuLmxlbmd0aCA9PT0gMCl7XG4gICAgICBpZih0aGlzLnBhcmVudCl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cyldKVxuICAgICAgICB0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKClcbiAgICAgICAgdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBzdHJlYW1zLCBldmVudHMpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIHN0cmVhbXMsIGV2ZW50cyldKVxuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRydWVEb2NFbCgpe1xuICAgIHRoaXMuZWwgPSBET00uYnlJZCh0aGlzLmlkKVxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKFBIWF9ST09UX0lELCB0aGlzLnJvb3QuaWQpXG4gIH1cblxuICAvLyB0aGlzIGlzIGludm9rZWQgZm9yIGRlYWQgYW5kIGxpdmUgdmlld3MsIHNvIHdlIG11c3QgZmlsdGVyIGJ5XG4gIC8vIGJ5IG93bmVyIHRvIGVuc3VyZSB3ZSBhcmVuJ3QgZHVwbGljYXRpbmcgaG9va3MgYWNyb3NzIGRpc2Nvbm5lY3RcbiAgLy8gYW5kIGNvbm5lY3RlZCBzdGF0ZXMuIFRoaXMgYWxzbyBoYW5kbGVzIGNhc2VzIHdoZXJlIGhvb2tzIGV4aXN0XG4gIC8vIGluIGEgcm9vdCBsYXlvdXQgd2l0aCBhIExWIGluIHRoZSBib2R5XG4gIGV4ZWNOZXdNb3VudGVkKHBhcmVudCA9IHRoaXMuZWwpe1xuICAgIGxldCBwaHhWaWV3cG9ydFRvcCA9IHRoaXMuYmluZGluZyhQSFhfVklFV1BPUlRfVE9QKVxuICAgIGxldCBwaHhWaWV3cG9ydEJvdHRvbSA9IHRoaXMuYmluZGluZyhQSFhfVklFV1BPUlRfQk9UVE9NKVxuICAgIERPTS5hbGwocGFyZW50LCBgWyR7cGh4Vmlld3BvcnRUb3B9XSwgWyR7cGh4Vmlld3BvcnRCb3R0b219XWAsIGhvb2tFbCA9PiB7XG4gICAgICBpZih0aGlzLm93bnNFbGVtZW50KGhvb2tFbCkpe1xuICAgICAgICBET00ubWFpbnRhaW5Qcml2YXRlSG9va3MoaG9va0VsLCBob29rRWwsIHBoeFZpZXdwb3J0VG9wLCBwaHhWaWV3cG9ydEJvdHRvbSlcbiAgICAgICAgdGhpcy5tYXliZUFkZE5ld0hvb2soaG9va0VsKVxuICAgICAgfVxuICAgIH0pXG4gICAgRE9NLmFsbChwYXJlbnQsIGBbJHt0aGlzLmJpbmRpbmcoUEhYX0hPT0spfV0sIFtkYXRhLXBoeC0ke1BIWF9IT09LfV1gLCBob29rRWwgPT4ge1xuICAgICAgaWYodGhpcy5vd25zRWxlbWVudChob29rRWwpKXtcbiAgICAgICAgdGhpcy5tYXliZUFkZE5ld0hvb2soaG9va0VsKVxuICAgICAgfVxuICAgIH0pXG4gICAgRE9NLmFsbChwYXJlbnQsIGBbJHt0aGlzLmJpbmRpbmcoUEhYX01PVU5URUQpfV1gLCBlbCA9PiB7XG4gICAgICBpZih0aGlzLm93bnNFbGVtZW50KGVsKSl7XG4gICAgICAgIHRoaXMubWF5YmVNb3VudGVkKGVsKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBzdHJlYW1zLCBldmVudHMpe1xuICAgIHRoaXMuYXR0YWNoVHJ1ZURvY0VsKClcbiAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgc3RyZWFtcywgbnVsbClcbiAgICBwYXRjaC5tYXJrUHJ1bmFibGVDb250ZW50Rm9yUmVtb3ZhbCgpXG4gICAgdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIGZhbHNlLCB0cnVlKVxuICAgIHRoaXMuam9pbk5ld0NoaWxkcmVuKClcbiAgICB0aGlzLmV4ZWNOZXdNb3VudGVkKClcblxuICAgIHRoaXMuam9pblBlbmRpbmcgPSBmYWxzZVxuICAgIHRoaXMubGl2ZVNvY2tldC5kaXNwYXRjaEV2ZW50cyhldmVudHMpXG4gICAgdGhpcy5hcHBseVBlbmRpbmdVcGRhdGVzKClcblxuICAgIGlmKGxpdmVfcGF0Y2gpe1xuICAgICAgbGV0IHtraW5kLCB0b30gPSBsaXZlX3BhdGNoXG4gICAgICB0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVBhdGNoKHRvLCBraW5kKVxuICAgIH1cbiAgICB0aGlzLmhpZGVMb2FkZXIoKVxuICAgIGlmKHRoaXMuam9pbkNvdW50ID4gMSl7IHRoaXMudHJpZ2dlclJlY29ubmVjdGVkKCkgfVxuICAgIHRoaXMuc3RvcENhbGxiYWNrKClcbiAgfVxuXG4gIHRyaWdnZXJCZWZvcmVVcGRhdGVIb29rKGZyb21FbCwgdG9FbCl7XG4gICAgdGhpcy5saXZlU29ja2V0LnRyaWdnZXJET00oXCJvbkJlZm9yZUVsVXBkYXRlZFwiLCBbZnJvbUVsLCB0b0VsXSlcbiAgICBsZXQgaG9vayA9IHRoaXMuZ2V0SG9vayhmcm9tRWwpXG4gICAgbGV0IGlzSWdub3JlZCA9IGhvb2sgJiYgRE9NLmlzSWdub3JlZChmcm9tRWwsIHRoaXMuYmluZGluZyhQSFhfVVBEQVRFKSlcbiAgICBpZihob29rICYmICFmcm9tRWwuaXNFcXVhbE5vZGUodG9FbCkgJiYgIShpc0lnbm9yZWQgJiYgaXNFcXVhbE9iaihmcm9tRWwuZGF0YXNldCwgdG9FbC5kYXRhc2V0KSkpe1xuICAgICAgaG9vay5fX2JlZm9yZVVwZGF0ZSgpXG4gICAgICByZXR1cm4gaG9va1xuICAgIH1cbiAgfVxuXG4gIG1heWJlTW91bnRlZChlbCl7XG4gICAgbGV0IHBoeE1vdW50ZWQgPSBlbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9NT1VOVEVEKSlcbiAgICBsZXQgaGFzQmVlbkludm9rZWQgPSBwaHhNb3VudGVkICYmIERPTS5wcml2YXRlKGVsLCBcIm1vdW50ZWRcIilcbiAgICBpZihwaHhNb3VudGVkICYmICFoYXNCZWVuSW52b2tlZCl7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQuZXhlY0pTKGVsLCBwaHhNb3VudGVkKVxuICAgICAgRE9NLnB1dFByaXZhdGUoZWwsIFwibW91bnRlZFwiLCB0cnVlKVxuICAgIH1cbiAgfVxuXG4gIG1heWJlQWRkTmV3SG9vayhlbCl7XG4gICAgbGV0IG5ld0hvb2sgPSB0aGlzLmFkZEhvb2soZWwpXG4gICAgaWYobmV3SG9vayl7IG5ld0hvb2suX19tb3VudGVkKCkgfVxuICB9XG5cbiAgcGVyZm9ybVBhdGNoKHBhdGNoLCBwcnVuZUNpZHMsIGlzSm9pblBhdGNoID0gZmFsc2Upe1xuICAgIGxldCByZW1vdmVkRWxzID0gW11cbiAgICBsZXQgcGh4Q2hpbGRyZW5BZGRlZCA9IGZhbHNlXG4gICAgbGV0IHVwZGF0ZWRIb29rSWRzID0gbmV3IFNldCgpXG5cbiAgICB0aGlzLmxpdmVTb2NrZXQudHJpZ2dlckRPTShcIm9uUGF0Y2hTdGFydFwiLCBbcGF0Y2gudGFyZ2V0Q29udGFpbmVyXSlcblxuICAgIHBhdGNoLmFmdGVyKFwiYWRkZWRcIiwgZWwgPT4ge1xuICAgICAgdGhpcy5saXZlU29ja2V0LnRyaWdnZXJET00oXCJvbk5vZGVBZGRlZFwiLCBbZWxdKVxuICAgICAgbGV0IHBoeFZpZXdwb3J0VG9wID0gdGhpcy5iaW5kaW5nKFBIWF9WSUVXUE9SVF9UT1ApXG4gICAgICBsZXQgcGh4Vmlld3BvcnRCb3R0b20gPSB0aGlzLmJpbmRpbmcoUEhYX1ZJRVdQT1JUX0JPVFRPTSlcbiAgICAgIERPTS5tYWludGFpblByaXZhdGVIb29rcyhlbCwgZWwsIHBoeFZpZXdwb3J0VG9wLCBwaHhWaWV3cG9ydEJvdHRvbSlcbiAgICAgIHRoaXMubWF5YmVBZGROZXdIb29rKGVsKVxuICAgICAgaWYoZWwuZ2V0QXR0cmlidXRlKXsgdGhpcy5tYXliZU1vdW50ZWQoZWwpIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJwaHhDaGlsZEFkZGVkXCIsIGVsID0+IHtcbiAgICAgIGlmKERPTS5pc1BoeFN0aWNreShlbCkpe1xuICAgICAgICB0aGlzLmxpdmVTb2NrZXQuam9pblJvb3RWaWV3cygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwaHhDaGlsZHJlbkFkZGVkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5iZWZvcmUoXCJ1cGRhdGVkXCIsIChmcm9tRWwsIHRvRWwpID0+IHtcbiAgICAgIGxldCBob29rID0gdGhpcy50cmlnZ2VyQmVmb3JlVXBkYXRlSG9vayhmcm9tRWwsIHRvRWwpXG4gICAgICBpZihob29rKXsgdXBkYXRlZEhvb2tJZHMuYWRkKGZyb21FbC5pZCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInVwZGF0ZWRcIiwgZWwgPT4ge1xuICAgICAgaWYodXBkYXRlZEhvb2tJZHMuaGFzKGVsLmlkKSl7IHRoaXMuZ2V0SG9vayhlbCkuX191cGRhdGVkKCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcImRpc2NhcmRlZFwiLCAoZWwpID0+IHtcbiAgICAgIGlmKGVsLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSl7IHJlbW92ZWRFbHMucHVzaChlbCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInRyYW5zaXRpb25zRGlzY2FyZGVkXCIsIGVscyA9PiB0aGlzLmFmdGVyRWxlbWVudHNSZW1vdmVkKGVscywgcHJ1bmVDaWRzKSlcbiAgICBwYXRjaC5wZXJmb3JtKGlzSm9pblBhdGNoKVxuICAgIHRoaXMuYWZ0ZXJFbGVtZW50c1JlbW92ZWQocmVtb3ZlZEVscywgcHJ1bmVDaWRzKVxuXG4gICAgdGhpcy5saXZlU29ja2V0LnRyaWdnZXJET00oXCJvblBhdGNoRW5kXCIsIFtwYXRjaC50YXJnZXRDb250YWluZXJdKVxuICAgIHJldHVybiBwaHhDaGlsZHJlbkFkZGVkXG4gIH1cblxuICBhZnRlckVsZW1lbnRzUmVtb3ZlZChlbGVtZW50cywgcHJ1bmVDaWRzKXtcbiAgICBsZXQgZGVzdHJveWVkQ0lEcyA9IFtdXG4gICAgZWxlbWVudHMuZm9yRWFjaChwYXJlbnQgPT4ge1xuICAgICAgbGV0IGNvbXBvbmVudHMgPSBET00uYWxsKHBhcmVudCwgYFske1BIWF9DT01QT05FTlR9XWApXG4gICAgICBsZXQgaG9va3MgPSBET00uYWxsKHBhcmVudCwgYFske3RoaXMuYmluZGluZyhQSFhfSE9PSyl9XSwgW2RhdGEtcGh4LWhvb2tdYClcbiAgICAgIGNvbXBvbmVudHMuY29uY2F0KHBhcmVudCkuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGxldCBjaWQgPSB0aGlzLmNvbXBvbmVudElEKGVsKVxuICAgICAgICBpZihpc0NpZChjaWQpICYmIGRlc3Ryb3llZENJRHMuaW5kZXhPZihjaWQpID09PSAtMSl7IGRlc3Ryb3llZENJRHMucHVzaChjaWQpIH1cbiAgICAgIH0pXG4gICAgICBob29rcy5jb25jYXQocGFyZW50KS5mb3JFYWNoKGhvb2tFbCA9PiB7XG4gICAgICAgIGxldCBob29rID0gdGhpcy5nZXRIb29rKGhvb2tFbClcbiAgICAgICAgaG9vayAmJiB0aGlzLmRlc3Ryb3lIb29rKGhvb2spXG4gICAgICB9KVxuICAgIH0pXG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBwcnVuZUNpZHMgb24gam9pbnMuIE90aGVyd2lzZSwgaW4gY2FzZSBvZlxuICAgIC8vIHJlam9pbnMsIHdlIG1heSBub3RpZnkgY2lkcyB0aGF0IG5vIGxvbmdlciBiZWxvbmcgdG8gdGhlXG4gICAgLy8gY3VycmVudCBMaXZlVmlldyB0byBiZSByZW1vdmVkLlxuICAgIGlmKHBydW5lQ2lkcyl7XG4gICAgICB0aGlzLm1heWJlUHVzaENvbXBvbmVudHNEZXN0cm95ZWQoZGVzdHJveWVkQ0lEcylcbiAgICB9XG4gIH1cblxuICBqb2luTmV3Q2hpbGRyZW4oKXtcbiAgICBET00uZmluZFBoeENoaWxkcmVuKHRoaXMuZWwsIHRoaXMuaWQpLmZvckVhY2goZWwgPT4gdGhpcy5qb2luQ2hpbGQoZWwpKVxuICB9XG5cbiAgbWF5YmVSZWNvdmVyRm9ybXMoaHRtbCwgY2FsbGJhY2spe1xuICAgIGNvbnN0IHBoeENoYW5nZSA9IHRoaXMuYmluZGluZyhcImNoYW5nZVwiKVxuICAgIGNvbnN0IG9sZEZvcm1zID0gdGhpcy5yb290LmZvcm1zRm9yUmVjb3ZlcnlcbiAgICAvLyBTbyB3aHkgZG8gd2UgY3JlYXRlIGEgdGVtcGxhdGUgZWxlbWVudCBoZXJlP1xuICAgIC8vIE9uZSB3YXkgdG8gcmVjb3ZlciBmb3JtcyB3b3VsZCBiZSB0byBpbW1lZGlhdGVseSBhcHBseSB0aGUgbW91bnRcbiAgICAvLyBwYXRjaCBhbmQgdGhlbiBhZnRlcndhcmRzIHJlY292ZXIgdGhlIGZvcm1zLiBIb3dldmVyLCB0aGlzIHdvdWxkXG4gICAgLy8gY2F1c2UgYSBmbGlja2VyLCBiZWNhdXNlIHRoZSBtb3VudCBwYXRjaCB3b3VsZCByZW1vdmUgdGhlIGZvcm0gY29udGVudFxuICAgIC8vIHVudGlsIGl0IGlzIHJlc3RvcmVkLiBUaGVyZWZvcmUgTFYgZGVjaWRlZCB0byBkbyBmb3JtIHJlY292ZXJ5IHdpdGggdGhlXG4gICAgLy8gcmF3IEhUTUwgYmVmb3JlIGl0IGlzIGFwcGxpZWQgYW5kIGRlbGF5IHRoZSBtb3VudCBwYXRjaCB1bnRpbCB0aGUgZm9ybVxuICAgIC8vIHJlY292ZXJ5IGV2ZW50cyBhcmUgZG9uZS5cbiAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sXG4gICAgLy8gYmVjYXVzZSB3ZSB3b3JrIHdpdGggYSB0ZW1wbGF0ZSBlbGVtZW50LCB3ZSBtdXN0IG1hbnVhbGx5IGNvcHkgdGhlIGF0dHJpYnV0ZXNcbiAgICAvLyBvdGhlcndpc2UgdGhlIG93bmVyIC8gdGFyZ2V0IGhlbHBlcnMgZG9uJ3Qgd29yayBwcm9wZXJseVxuICAgIGNvbnN0IHJvb3RFbCA9IHRlbXBsYXRlLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICByb290RWwuaWQgPSB0aGlzLmlkXG4gICAgcm9vdEVsLnNldEF0dHJpYnV0ZShQSFhfUk9PVF9JRCwgdGhpcy5yb290LmlkKVxuICAgIHJvb3RFbC5zZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04sIHRoaXMuZ2V0U2Vzc2lvbigpKVxuICAgIHJvb3RFbC5zZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQywgdGhpcy5nZXRTdGF0aWMoKSlcbiAgICByb290RWwuc2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQsIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuaWQgOiBudWxsKVxuXG4gICAgLy8gd2UgZ28gb3ZlciBhbGwgZm9ybSBlbGVtZW50cyBpbiB0aGUgbmV3IEhUTUwgZm9yIHRoZSBMVlxuICAgIC8vIGFuZCBsb29rIGZvciBvbGQgZm9ybXMgaW4gdGhlIGBmb3Jtc0ZvclJlY292ZXJ5YCBvYmplY3Q7XG4gICAgLy8gdGhlIGZvcm1zRm9yUmVjb3ZlcnkgY2FuIGFsc28gY29udGFpbiBmb3JtcyBmcm9tIGNoaWxkIHZpZXdzXG4gICAgY29uc3QgZm9ybXNUb1JlY292ZXIgPVxuICAgICAgLy8gd2UgZ28gb3ZlciBhbGwgZm9ybXMgaW4gdGhlIG5ldyBET007IGJlY2F1c2UgdGhpcyBpcyBvbmx5IHRoZSBIVE1MIGZvciB0aGUgY3VycmVudFxuICAgICAgLy8gdmlldywgd2UgY2FuIGJlIHN1cmUgdGhhdCBhbGwgZm9ybXMgYXJlIG93bmVkIGJ5IHRoaXMgdmlldzpcbiAgICAgIERPTS5hbGwodGVtcGxhdGUuY29udGVudCwgXCJmb3JtXCIpXG4gICAgICAgIC8vIG9ubHkgcmVjb3ZlciBmb3JtcyB0aGF0IGhhdmUgYW4gaWQgYW5kIGFyZSBpbiB0aGUgb2xkIERPTVxuICAgICAgICAuZmlsdGVyKG5ld0Zvcm0gPT4gbmV3Rm9ybS5pZCAmJiBvbGRGb3Jtc1tuZXdGb3JtLmlkXSlcbiAgICAgICAgLy8gYWJhbmRvbiBmb3JtcyB3ZSBhbHJlYWR5IHRyaWVkIHRvIHJlY292ZXIgdG8gcHJldmVudCBsb29waW5nIGEgZmFpbGVkIHN0YXRlXG4gICAgICAgIC5maWx0ZXIobmV3Rm9ybSA9PiAhdGhpcy5wZW5kaW5nRm9ybXMuaGFzKG5ld0Zvcm0uaWQpKVxuICAgICAgICAvLyBvbmx5IHJlY292ZXIgaWYgdGhlIGZvcm0gaGFzIHRoZSBzYW1lIHBoeC1jaGFuZ2UgdmFsdWVcbiAgICAgICAgLmZpbHRlcihuZXdGb3JtID0+IG9sZEZvcm1zW25ld0Zvcm0uaWRdLmdldEF0dHJpYnV0ZShwaHhDaGFuZ2UpID09PSBuZXdGb3JtLmdldEF0dHJpYnV0ZShwaHhDaGFuZ2UpKVxuICAgICAgICAubWFwKG5ld0Zvcm0gPT4ge1xuICAgICAgICAgIHJldHVybiBbb2xkRm9ybXNbbmV3Rm9ybS5pZF0sIG5ld0Zvcm1dXG4gICAgICAgIH0pXG5cbiAgICBpZihmb3Jtc1RvUmVjb3Zlci5sZW5ndGggPT09IDApe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICBmb3Jtc1RvUmVjb3Zlci5mb3JFYWNoKChbb2xkRm9ybSwgbmV3Rm9ybV0sIGkpID0+IHtcbiAgICAgIHRoaXMucGVuZGluZ0Zvcm1zLmFkZChuZXdGb3JtLmlkKVxuICAgICAgLy8gaXQgaXMgaW1wb3J0YW50IHRvIHVzZSB0aGUgZmlyc3RFbGVtZW50Q2hpbGQgb2YgdGhlIHRlbXBsYXRlIGNvbnRlbnRcbiAgICAgIC8vIGJlY2F1c2Ugd2hlbiB0cmF2ZXJzaW5nIGEgZG9jdW1lbnRGcmFnbWVudCB1c2luZyBwYXJlbnROb2RlLCB3ZSB3b24ndCBldmVyIGFycml2ZSBhdFxuICAgICAgLy8gdGhlIGZyYWdtZW50OyBhcyB0aGUgdGVtcGxhdGUgaXMgYWx3YXlzIGEgTGl2ZVZpZXcsIHdlIGNhbiBiZSBzdXJlIHRoYXQgdGhlcmUgaXMgb25seVxuICAgICAgLy8gb25lIGNoaWxkIG9uIHRoZSByb290IGxldmVsXG4gICAgICB0aGlzLnB1c2hGb3JtUmVjb3Zlcnkob2xkRm9ybSwgbmV3Rm9ybSwgdGVtcGxhdGUuY29udGVudC5maXJzdEVsZW1lbnRDaGlsZCwgKCkgPT4ge1xuICAgICAgICB0aGlzLnBlbmRpbmdGb3Jtcy5kZWxldGUobmV3Rm9ybS5pZClcbiAgICAgICAgLy8gd2Ugb25seSBjYWxsIHRoZSBjYWxsYmFjayBvbmNlIGFsbCBmb3JtcyBoYXZlIGJlZW4gcmVjb3ZlcmVkXG4gICAgICAgIGlmKGkgPT09IGZvcm1zVG9SZWNvdmVyLmxlbmd0aCAtIDEpe1xuICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZ2V0Q2hpbGRCeUlkKGlkKXsgcmV0dXJuIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXVtpZF0gfVxuXG4gIGdldERlc2NlbmRlbnRCeUVsKGVsKXtcbiAgICBpZihlbC5pZCA9PT0gdGhpcy5pZCl7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltlbC5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRCldPy5bZWwuaWRdXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveURlc2NlbmRlbnQoaWQpe1xuICAgIGZvcihsZXQgcGFyZW50SWQgaW4gdGhpcy5yb290LmNoaWxkcmVuKXtcbiAgICAgIGZvcihsZXQgY2hpbGRJZCBpbiB0aGlzLnJvb3QuY2hpbGRyZW5bcGFyZW50SWRdKXtcbiAgICAgICAgaWYoY2hpbGRJZCA9PT0gaWQpeyByZXR1cm4gdGhpcy5yb290LmNoaWxkcmVuW3BhcmVudElkXVtjaGlsZElkXS5kZXN0cm95KCkgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGpvaW5DaGlsZChlbCl7XG4gICAgbGV0IGNoaWxkID0gdGhpcy5nZXRDaGlsZEJ5SWQoZWwuaWQpXG4gICAgaWYoIWNoaWxkKXtcbiAgICAgIGxldCB2aWV3ID0gbmV3IFZpZXcoZWwsIHRoaXMubGl2ZVNvY2tldCwgdGhpcylcbiAgICAgIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXVt2aWV3LmlkXSA9IHZpZXdcbiAgICAgIHZpZXcuam9pbigpXG4gICAgICB0aGlzLmNoaWxkSm9pbnMrK1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICBpc0pvaW5QZW5kaW5nKCl7IHJldHVybiB0aGlzLmpvaW5QZW5kaW5nIH1cblxuICBhY2tKb2luKF9jaGlsZCl7XG4gICAgdGhpcy5jaGlsZEpvaW5zLS1cblxuICAgIGlmKHRoaXMuY2hpbGRKb2lucyA9PT0gMCl7XG4gICAgICBpZih0aGlzLnBhcmVudCl7XG4gICAgICAgIHRoaXMucGFyZW50LmFja0pvaW4odGhpcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25BbGxDaGlsZEpvaW5zQ29tcGxldGUoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKCl7XG4gICAgLy8gd2UgY2FuIGNsZWFyIHBlbmRpbmcgZm9ybSByZWNvdmVyaWVzIG5vdyB0aGF0IHdlJ3ZlIGpvaW5lZC5cbiAgICAvLyBUaGV5IGVpdGhlciBhbGwgcmVzb2x2ZWQgb3Igd2VyZSBhYmFuZG9uZWRcbiAgICB0aGlzLnBlbmRpbmdGb3Jtcy5jbGVhcigpXG4gICAgLy8gd2UgY2FuIGFsc28gY2xlYXIgdGhlIGZvcm1zRm9yUmVjb3Zlcnkgb2JqZWN0IHRvIG5vdCBrZWVwIG9sZCBmb3JtIGVsZW1lbnRzIGFyb3VuZFxuICAgIHRoaXMuZm9ybXNGb3JSZWNvdmVyeSA9IHt9XG4gICAgdGhpcy5qb2luQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgdGhpcy5wZW5kaW5nSm9pbk9wcy5mb3JFYWNoKChbdmlldywgb3BdKSA9PiB7XG4gICAgICAgIGlmKCF2aWV3LmlzRGVzdHJveWVkKCkpeyBvcCgpIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLnBlbmRpbmdKb2luT3BzID0gW11cbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlKGRpZmYsIGV2ZW50cyl7XG4gICAgaWYodGhpcy5pc0pvaW5QZW5kaW5nKCkgfHwgKHRoaXMubGl2ZVNvY2tldC5oYXNQZW5kaW5nTGluaygpICYmIHRoaXMucm9vdC5pc01haW4oKSkpe1xuICAgICAgcmV0dXJuIHRoaXMucGVuZGluZ0RpZmZzLnB1c2goe2RpZmYsIGV2ZW50c30pXG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlZC5tZXJnZURpZmYoZGlmZilcbiAgICBsZXQgcGh4Q2hpbGRyZW5BZGRlZCA9IGZhbHNlXG5cbiAgICAvLyBXaGVuIHRoZSBkaWZmIG9ubHkgY29udGFpbnMgY29tcG9uZW50IGRpZmZzLCB0aGVuIHdhbGsgY29tcG9uZW50c1xuICAgIC8vIGFuZCBwYXRjaCBvbmx5IHRoZSBwYXJlbnQgY29tcG9uZW50IGNvbnRhaW5lcnMgZm91bmQgaW4gdGhlIGRpZmYuXG4gICAgLy8gT3RoZXJ3aXNlLCBwYXRjaCBlbnRpcmUgTFYgY29udGFpbmVyLlxuICAgIGlmKHRoaXMucmVuZGVyZWQuaXNDb21wb25lbnRPbmx5RGlmZihkaWZmKSl7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQudGltZShcImNvbXBvbmVudCBwYXRjaCBjb21wbGV0ZVwiLCAoKSA9PiB7XG4gICAgICAgIGxldCBwYXJlbnRDaWRzID0gRE9NLmZpbmRFeGlzdGluZ1BhcmVudENJRHModGhpcy5lbCwgdGhpcy5yZW5kZXJlZC5jb21wb25lbnRDSURzKGRpZmYpKVxuICAgICAgICBwYXJlbnRDaWRzLmZvckVhY2gocGFyZW50Q0lEID0+IHtcbiAgICAgICAgICBpZih0aGlzLmNvbXBvbmVudFBhdGNoKHRoaXMucmVuZGVyZWQuZ2V0Q29tcG9uZW50KGRpZmYsIHBhcmVudENJRCksIHBhcmVudENJRCkpeyBwaHhDaGlsZHJlbkFkZGVkID0gdHJ1ZSB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZighaXNFbXB0eShkaWZmKSl7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQudGltZShcImZ1bGwgcGF0Y2ggY29tcGxldGVcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgW2h0bWwsIHN0cmVhbXNdID0gdGhpcy5yZW5kZXJDb250YWluZXIoZGlmZiwgXCJ1cGRhdGVcIilcbiAgICAgICAgbGV0IHBhdGNoID0gbmV3IERPTVBhdGNoKHRoaXMsIHRoaXMuZWwsIHRoaXMuaWQsIGh0bWwsIHN0cmVhbXMsIG51bGwpXG4gICAgICAgIHBoeENoaWxkcmVuQWRkZWQgPSB0aGlzLnBlcmZvcm1QYXRjaChwYXRjaCwgdHJ1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5saXZlU29ja2V0LmRpc3BhdGNoRXZlbnRzKGV2ZW50cylcbiAgICBpZihwaHhDaGlsZHJlbkFkZGVkKXsgdGhpcy5qb2luTmV3Q2hpbGRyZW4oKSB9XG4gIH1cblxuICByZW5kZXJDb250YWluZXIoZGlmZiwga2luZCl7XG4gICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC50aW1lKGB0b1N0cmluZyBkaWZmICgke2tpbmR9KWAsICgpID0+IHtcbiAgICAgIGxldCB0YWcgPSB0aGlzLmVsLnRhZ05hbWVcbiAgICAgIC8vIERvbid0IHNraXAgYW55IGNvbXBvbmVudCBpbiB0aGUgZGlmZiBub3IgYW55IG1hcmtlZCBhcyBwcnVuZWRcbiAgICAgIC8vIChhcyB0aGV5IG1heSBoYXZlIGJlZW4gYWRkZWQgYmFjaylcbiAgICAgIGxldCBjaWRzID0gZGlmZiA/IHRoaXMucmVuZGVyZWQuY29tcG9uZW50Q0lEcyhkaWZmKSA6IG51bGxcbiAgICAgIGxldCBbaHRtbCwgc3RyZWFtc10gPSB0aGlzLnJlbmRlcmVkLnRvU3RyaW5nKGNpZHMpXG4gICAgICByZXR1cm4gW2A8JHt0YWd9PiR7aHRtbH08LyR7dGFnfT5gLCBzdHJlYW1zXVxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnRQYXRjaChkaWZmLCBjaWQpe1xuICAgIGlmKGlzRW1wdHkoZGlmZikpIHJldHVybiBmYWxzZVxuICAgIGxldCBbaHRtbCwgc3RyZWFtc10gPSB0aGlzLnJlbmRlcmVkLmNvbXBvbmVudFRvU3RyaW5nKGNpZClcbiAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgc3RyZWFtcywgY2lkKVxuICAgIGxldCBjaGlsZHJlbkFkZGVkID0gdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIHRydWUpXG4gICAgcmV0dXJuIGNoaWxkcmVuQWRkZWRcbiAgfVxuXG4gIGdldEhvb2soZWwpeyByZXR1cm4gdGhpcy52aWV3SG9va3NbVmlld0hvb2suZWxlbWVudElEKGVsKV0gfVxuXG4gIGFkZEhvb2soZWwpe1xuICAgIGxldCBob29rRWxJZCA9IFZpZXdIb29rLmVsZW1lbnRJRChlbClcblxuICAgIC8vIG9ubHkgZXZlciB0cnkgdG8gYWRkIGhvb2tzIHRvIGVsZW1lbnRzIG93bmVkIGJ5IHRoaXMgdmlld1xuICAgIGlmKGVsLmdldEF0dHJpYnV0ZSAmJiAhdGhpcy5vd25zRWxlbWVudChlbCkpeyByZXR1cm4gfVxuXG4gICAgaWYoaG9va0VsSWQgJiYgIXRoaXMudmlld0hvb2tzW2hvb2tFbElkXSl7XG4gICAgICAvLyBob29rIGNyZWF0ZWQsIGJ1dCBub3QgYXR0YWNoZWQgKGNyZWF0ZUhvb2sgZm9yIHdlYiBjb21wb25lbnQpXG4gICAgICBsZXQgaG9vayA9IERPTS5nZXRDdXN0b21FbEhvb2soZWwpIHx8IGxvZ0Vycm9yKGBubyBob29rIGZvdW5kIGZvciBjdXN0b20gZWxlbWVudDogJHtlbC5pZH1gKVxuICAgICAgdGhpcy52aWV3SG9va3NbaG9va0VsSWRdID0gaG9va1xuICAgICAgaG9vay5fX2F0dGFjaFZpZXcodGhpcylcbiAgICAgIHJldHVybiBob29rXG4gICAgfVxuICAgIGVsc2UgaWYoaG9va0VsSWQgfHwgIWVsLmdldEF0dHJpYnV0ZSl7XG4gICAgICAvLyBubyBob29rIGZvdW5kXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbmV3IGhvb2sgZm91bmQgd2l0aCBwaHgtaG9vayBhdHRyaWJ1dGVcbiAgICAgIGxldCBob29rTmFtZSA9IGVsLmdldEF0dHJpYnV0ZShgZGF0YS1waHgtJHtQSFhfSE9PS31gKSB8fCBlbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9IT09LKSlcbiAgICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLmxpdmVTb2NrZXQuZ2V0SG9va0NhbGxiYWNrcyhob29rTmFtZSlcblxuICAgICAgaWYoY2FsbGJhY2tzKXtcbiAgICAgICAgaWYoIWVsLmlkKXsgbG9nRXJyb3IoYG5vIERPTSBJRCBmb3IgaG9vayBcIiR7aG9va05hbWV9XCIuIEhvb2tzIHJlcXVpcmUgYSB1bmlxdWUgSUQgb24gZWFjaCBlbGVtZW50LmAsIGVsKSB9XG4gICAgICAgIGxldCBob29rID0gbmV3IFZpZXdIb29rKHRoaXMsIGVsLCBjYWxsYmFja3MpXG4gICAgICAgIHRoaXMudmlld0hvb2tzW1ZpZXdIb29rLmVsZW1lbnRJRChob29rLmVsKV0gPSBob29rXG4gICAgICAgIHJldHVybiBob29rXG4gICAgICB9IGVsc2UgaWYoaG9va05hbWUgIT09IG51bGwpe1xuICAgICAgICBsb2dFcnJvcihgdW5rbm93biBob29rIGZvdW5kIGZvciBcIiR7aG9va05hbWV9XCJgLCBlbClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZXN0cm95SG9vayhob29rKXtcbiAgICAvLyBfX2Rlc3Ryb3llZCBjbGVhcnMgdGhlIGVsZW1lbnRJRCBmcm9tIHRoZSBob29rLCB0aGVyZWZvcmVcbiAgICAvLyB3ZSBuZWVkIHRvIGdldCBpdCBiZWZvcmUgY2FsbGluZyBfX2Rlc3Ryb3llZFxuICAgIGNvbnN0IGhvb2tJZCA9IFZpZXdIb29rLmVsZW1lbnRJRChob29rLmVsKVxuICAgIGhvb2suX19kZXN0cm95ZWQoKVxuICAgIGhvb2suX19jbGVhbnVwX18oKVxuICAgIGRlbGV0ZSB0aGlzLnZpZXdIb29rc1tob29rSWRdXG4gIH1cblxuICBhcHBseVBlbmRpbmdVcGRhdGVzKCl7XG4gICAgLy8gcHJldmVudCByYWNlIGNvbmRpdGlvbnMgd2hlcmUgd2UgbWlnaHQgc3RpbGwgYmUgcGVuZGluZyBhIG5ld1xuICAgIC8vIG5hdmlnYXRpb24gYWZ0ZXIgYXBwbHlpbmcgdGhlIGN1cnJlbnQgb25lO1xuICAgIC8vIGlmIHdlIGNhbGwgdXBkYXRlIGFuZCBhIHBlbmRpbmdEaWZmIGlzIG5vdCBhcHBsaWVkLCBpdCB3b3VsZFxuICAgIC8vIGJlIHNpbGVudGx5IGRyb3BwZWQgb3RoZXJ3aXNlLCBhcyB1cGRhdGUgd291bGQgcHVzaCBpdCBiYWNrIHRvXG4gICAgLy8gcGVuZGluZ0RpZmZzLCBidXQgd2UgY2xlYXIgaXQgaW1tZWRpYXRlbHkgYWZ0ZXJcbiAgICBpZih0aGlzLmxpdmVTb2NrZXQuaGFzUGVuZGluZ0xpbmsoKSAmJiB0aGlzLnJvb3QuaXNNYWluKCkpeyByZXR1cm4gfVxuICAgIHRoaXMucGVuZGluZ0RpZmZzLmZvckVhY2goKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICB0aGlzLmVhY2hDaGlsZChjaGlsZCA9PiBjaGlsZC5hcHBseVBlbmRpbmdVcGRhdGVzKCkpXG4gIH1cblxuICBlYWNoQ2hpbGQoY2FsbGJhY2spe1xuICAgIGxldCBjaGlsZHJlbiA9IHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSB8fCB7fVxuICAgIGZvcihsZXQgaWQgaW4gY2hpbGRyZW4peyBjYWxsYmFjayh0aGlzLmdldENoaWxkQnlJZChpZCkpIH1cbiAgfVxuXG4gIG9uQ2hhbm5lbChldmVudCwgY2Ipe1xuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBldmVudCwgcmVzcCA9PiB7XG4gICAgICBpZih0aGlzLmlzSm9pblBlbmRpbmcoKSl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiBjYihyZXNwKV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiBjYihyZXNwKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYmluZENoYW5uZWwoKXtcbiAgICAvLyBUaGUgZGlmZiBldmVudCBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGUgcmVndWxhciB1cGRhdGUgb3BlcmF0aW9ucy5cbiAgICAvLyBBbGwgb3RoZXIgb3BlcmF0aW9ucyBhcmUgcXVldWVkIHRvIGJlIGFwcGxpZWQgb25seSBhZnRlciBqb2luLlxuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBcImRpZmZcIiwgKHJhd0RpZmYpID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseURpZmYoXCJ1cGRhdGVcIiwgcmF3RGlmZiwgKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMub25DaGFubmVsKFwicmVkaXJlY3RcIiwgKHt0bywgZmxhc2h9KSA9PiB0aGlzLm9uUmVkaXJlY3Qoe3RvLCBmbGFzaH0pKVxuICAgIHRoaXMub25DaGFubmVsKFwibGl2ZV9wYXRjaFwiLCAocmVkaXIpID0+IHRoaXMub25MaXZlUGF0Y2gocmVkaXIpKVxuICAgIHRoaXMub25DaGFubmVsKFwibGl2ZV9yZWRpcmVjdFwiLCAocmVkaXIpID0+IHRoaXMub25MaXZlUmVkaXJlY3QocmVkaXIpKVxuICAgIHRoaXMuY2hhbm5lbC5vbkVycm9yKHJlYXNvbiA9PiB0aGlzLm9uRXJyb3IocmVhc29uKSlcbiAgICB0aGlzLmNoYW5uZWwub25DbG9zZShyZWFzb24gPT4gdGhpcy5vbkNsb3NlKHJlYXNvbikpXG4gIH1cblxuICBkZXN0cm95QWxsQ2hpbGRyZW4oKXsgdGhpcy5lYWNoQ2hpbGQoY2hpbGQgPT4gY2hpbGQuZGVzdHJveSgpKSB9XG5cbiAgb25MaXZlUmVkaXJlY3QocmVkaXIpe1xuICAgIGxldCB7dG8sIGtpbmQsIGZsYXNofSA9IHJlZGlyXG4gICAgbGV0IHVybCA9IHRoaXMuZXhwYW5kVVJMKHRvKVxuICAgIGxldCBlID0gbmV3IEN1c3RvbUV2ZW50KFwicGh4OnNlcnZlci1uYXZpZ2F0ZVwiLCB7ZGV0YWlsOiB7dG8sIGtpbmQsIGZsYXNofX0pXG4gICAgdGhpcy5saXZlU29ja2V0Lmhpc3RvcnlSZWRpcmVjdChlLCB1cmwsIGtpbmQsIGZsYXNoKVxuICB9XG5cbiAgb25MaXZlUGF0Y2gocmVkaXIpe1xuICAgIGxldCB7dG8sIGtpbmR9ID0gcmVkaXJcbiAgICB0aGlzLmhyZWYgPSB0aGlzLmV4cGFuZFVSTCh0bylcbiAgICB0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVBhdGNoKHRvLCBraW5kKVxuICB9XG5cbiAgZXhwYW5kVVJMKHRvKXtcbiAgICByZXR1cm4gdG8uc3RhcnRzV2l0aChcIi9cIikgPyBgJHt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fSR7dG99YCA6IHRvXG4gIH1cblxuICBvblJlZGlyZWN0KHt0bywgZmxhc2gsIHJlbG9hZFRva2VufSl7IHRoaXMubGl2ZVNvY2tldC5yZWRpcmVjdCh0bywgZmxhc2gsIHJlbG9hZFRva2VuKSB9XG5cbiAgaXNEZXN0cm95ZWQoKXsgcmV0dXJuIHRoaXMuZGVzdHJveWVkIH1cblxuICBqb2luRGVhZCgpeyB0aGlzLmlzRGVhZCA9IHRydWUgfVxuXG4gIGpvaW5QdXNoKCl7XG4gICAgdGhpcy5qb2luUHVzaCA9IHRoaXMuam9pblB1c2ggfHwgdGhpcy5jaGFubmVsLmpvaW4oKVxuICAgIHJldHVybiB0aGlzLmpvaW5QdXNoXG4gIH1cblxuICBqb2luKGNhbGxiYWNrKXtcbiAgICB0aGlzLnNob3dMb2FkZXIodGhpcy5saXZlU29ja2V0LmxvYWRlclRpbWVvdXQpXG4gICAgdGhpcy5iaW5kQ2hhbm5lbCgpXG4gICAgaWYodGhpcy5pc01haW4oKSl7XG4gICAgICB0aGlzLnN0b3BDYWxsYmFjayA9IHRoaXMubGl2ZVNvY2tldC53aXRoUGFnZUxvYWRpbmcoe3RvOiB0aGlzLmhyZWYsIGtpbmQ6IFwiaW5pdGlhbFwifSlcbiAgICB9XG4gICAgdGhpcy5qb2luQ2FsbGJhY2sgPSAob25Eb25lKSA9PiB7XG4gICAgICBvbkRvbmUgPSBvbkRvbmUgfHwgZnVuY3Rpb24oKXt9XG4gICAgICBjYWxsYmFjayA/IGNhbGxiYWNrKHRoaXMuam9pbkNvdW50LCBvbkRvbmUpIDogb25Eb25lKClcbiAgICB9XG5cbiAgICB0aGlzLndyYXBQdXNoKCgpID0+IHRoaXMuY2hhbm5lbC5qb2luKCksIHtcbiAgICAgIG9rOiAocmVzcCkgPT4gdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4gdGhpcy5vbkpvaW4ocmVzcCkpLFxuICAgICAgZXJyb3I6IChlcnJvcikgPT4gdGhpcy5vbkpvaW5FcnJvcihlcnJvciksXG4gICAgICB0aW1lb3V0OiAoKSA9PiB0aGlzLm9uSm9pbkVycm9yKHtyZWFzb246IFwidGltZW91dFwifSlcbiAgICB9KVxuICB9XG5cbiAgb25Kb2luRXJyb3IocmVzcCl7XG4gICAgaWYocmVzcC5yZWFzb24gPT09IFwicmVsb2FkXCIpe1xuICAgICAgdGhpcy5sb2coXCJlcnJvclwiLCAoKSA9PiBbYGZhaWxlZCBtb3VudCB3aXRoICR7cmVzcC5zdGF0dXN9LiBGYWxsaW5nIGJhY2sgdG8gcGFnZSByZWxvYWRgLCByZXNwXSlcbiAgICAgIHRoaXMub25SZWRpcmVjdCh7dG86IHRoaXMucm9vdC5ocmVmLCByZWxvYWRUb2tlbjogcmVzcC50b2tlbn0pXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYocmVzcC5yZWFzb24gPT09IFwidW5hdXRob3JpemVkXCIgfHwgcmVzcC5yZWFzb24gPT09IFwic3RhbGVcIil7XG4gICAgICB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtcInVuYXV0aG9yaXplZCBsaXZlX3JlZGlyZWN0LiBGYWxsaW5nIGJhY2sgdG8gcGFnZSByZXF1ZXN0XCIsIHJlc3BdKVxuICAgICAgdGhpcy5vblJlZGlyZWN0KHt0bzogdGhpcy5yb290LmhyZWYsIGZsYXNoOiB0aGlzLmZsYXNofSlcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZihyZXNwLnJlZGlyZWN0IHx8IHJlc3AubGl2ZV9yZWRpcmVjdCl7XG4gICAgICB0aGlzLmpvaW5QZW5kaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuY2hhbm5lbC5sZWF2ZSgpXG4gICAgfVxuICAgIGlmKHJlc3AucmVkaXJlY3QpeyByZXR1cm4gdGhpcy5vblJlZGlyZWN0KHJlc3AucmVkaXJlY3QpIH1cbiAgICBpZihyZXNwLmxpdmVfcmVkaXJlY3QpeyByZXR1cm4gdGhpcy5vbkxpdmVSZWRpcmVjdChyZXNwLmxpdmVfcmVkaXJlY3QpIH1cbiAgICB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtcInVuYWJsZSB0byBqb2luXCIsIHJlc3BdKVxuICAgIGlmKHRoaXMuaXNNYWluKCkpe1xuICAgICAgdGhpcy5kaXNwbGF5RXJyb3IoW1BIWF9MT0FESU5HX0NMQVNTLCBQSFhfRVJST1JfQ0xBU1MsIFBIWF9TRVJWRVJfRVJST1JfQ0xBU1NdKVxuICAgICAgaWYodGhpcy5saXZlU29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLmxpdmVTb2NrZXQucmVsb2FkV2l0aEppdHRlcih0aGlzKSB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKHRoaXMuam9pbkF0dGVtcHRzID49IE1BWF9DSElMRF9KT0lOX0FUVEVNUFRTKXtcbiAgICAgICAgLy8gcHV0IHRoZSByb290IHJldmlldyBpbnRvIHBlcm1hbmVudCBlcnJvciBzdGF0ZSwgYnV0IGRvbid0IGRlc3Ryb3kgaXQgYXMgaXQgY2FuIHJlbWFpbiBhY3RpdmVcbiAgICAgICAgdGhpcy5yb290LmRpc3BsYXlFcnJvcihbUEhYX0xPQURJTkdfQ0xBU1MsIFBIWF9FUlJPUl9DTEFTUywgUEhYX1NFUlZFUl9FUlJPUl9DTEFTU10pXG4gICAgICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW2BnaXZpbmcgdXAgdHJ5aW5nIHRvIG1vdW50IGFmdGVyICR7TUFYX0NISUxEX0pPSU5fQVRURU1QVFN9IHRyaWVzYCwgcmVzcF0pXG4gICAgICAgIHRoaXMuZGVzdHJveSgpXG4gICAgICB9XG4gICAgICBsZXQgdHJ1ZUNoaWxkRWwgPSBET00uYnlJZCh0aGlzLmVsLmlkKVxuICAgICAgaWYodHJ1ZUNoaWxkRWwpe1xuICAgICAgICBET00ubWVyZ2VBdHRycyh0cnVlQ2hpbGRFbCwgdGhpcy5lbClcbiAgICAgICAgdGhpcy5kaXNwbGF5RXJyb3IoW1BIWF9MT0FESU5HX0NMQVNTLCBQSFhfRVJST1JfQ0xBU1MsIFBIWF9TRVJWRVJfRVJST1JfQ0xBU1NdKVxuICAgICAgICB0aGlzLmVsID0gdHJ1ZUNoaWxkRWxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25DbG9zZShyZWFzb24pe1xuICAgIGlmKHRoaXMuaXNEZXN0cm95ZWQoKSl7IHJldHVybiB9XG4gICAgaWYodGhpcy5pc01haW4oKSAmJiB0aGlzLmxpdmVTb2NrZXQuaGFzUGVuZGluZ0xpbmsoKSAmJiByZWFzb24gIT09IFwibGVhdmVcIil7XG4gICAgICByZXR1cm4gdGhpcy5saXZlU29ja2V0LnJlbG9hZFdpdGhKaXR0ZXIodGhpcylcbiAgICB9XG4gICAgdGhpcy5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgIHRoaXMubGl2ZVNvY2tldC5kcm9wQWN0aXZlRWxlbWVudCh0aGlzKVxuICAgIC8vIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgY2FuIGJlIG51bGwgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTFcbiAgICBpZihkb2N1bWVudC5hY3RpdmVFbGVtZW50KXsgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCkgfVxuICAgIGlmKHRoaXMubGl2ZVNvY2tldC5pc1VubG9hZGVkKCkpe1xuICAgICAgdGhpcy5zaG93TG9hZGVyKEJFRk9SRV9VTkxPQURfTE9BREVSX1RJTUVPVVQpXG4gICAgfVxuICB9XG5cbiAgb25FcnJvcihyZWFzb24pe1xuICAgIHRoaXMub25DbG9zZShyZWFzb24pXG4gICAgaWYodGhpcy5saXZlU29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtcInZpZXcgY3Jhc2hlZFwiLCByZWFzb25dKSB9XG4gICAgaWYoIXRoaXMubGl2ZVNvY2tldC5pc1VubG9hZGVkKCkpe1xuICAgICAgaWYodGhpcy5saXZlU29ja2V0LmlzQ29ubmVjdGVkKCkpe1xuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvcihbUEhYX0xPQURJTkdfQ0xBU1MsIFBIWF9FUlJPUl9DTEFTUywgUEhYX1NFUlZFUl9FUlJPUl9DTEFTU10pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRpc3BsYXlFcnJvcihbUEhYX0xPQURJTkdfQ0xBU1MsIFBIWF9FUlJPUl9DTEFTUywgUEhYX0NMSUVOVF9FUlJPUl9DTEFTU10pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlzcGxheUVycm9yKGNsYXNzZXMpe1xuICAgIGlmKHRoaXMuaXNNYWluKCkpeyBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdGFydFwiLCB7ZGV0YWlsOiB7dG86IHRoaXMuaHJlZiwga2luZDogXCJlcnJvclwifX0pIH1cbiAgICB0aGlzLnNob3dMb2FkZXIoKVxuICAgIHRoaXMuc2V0Q29udGFpbmVyQ2xhc3NlcyguLi5jbGFzc2VzKVxuICAgIHRoaXMuZGVsYXllZERpc2Nvbm5lY3RlZCgpXG4gIH1cblxuICBkZWxheWVkRGlzY29ubmVjdGVkKCl7XG4gICAgdGhpcy5kaXNjb25uZWN0ZWRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5leGVjQWxsKHRoaXMuYmluZGluZyhcImRpc2Nvbm5lY3RlZFwiKSlcbiAgICB9LCB0aGlzLmxpdmVTb2NrZXQuZGlzY29ubmVjdGVkVGltZW91dClcbiAgfVxuXG4gIHdyYXBQdXNoKGNhbGxlclB1c2gsIHJlY2VpdmVzKXtcbiAgICBsZXQgbGF0ZW5jeSA9IHRoaXMubGl2ZVNvY2tldC5nZXRMYXRlbmN5U2ltKClcbiAgICBsZXQgd2l0aExhdGVuY3kgPSBsYXRlbmN5ID9cbiAgICAgIChjYikgPT4gc2V0VGltZW91dCgoKSA9PiAhdGhpcy5pc0Rlc3Ryb3llZCgpICYmIGNiKCksIGxhdGVuY3kpIDpcbiAgICAgIChjYikgPT4gIXRoaXMuaXNEZXN0cm95ZWQoKSAmJiBjYigpXG5cbiAgICB3aXRoTGF0ZW5jeSgoKSA9PiB7XG4gICAgICBjYWxsZXJQdXNoKClcbiAgICAgICAgLnJlY2VpdmUoXCJva1wiLCByZXNwID0+IHdpdGhMYXRlbmN5KCgpID0+IHJlY2VpdmVzLm9rICYmIHJlY2VpdmVzLm9rKHJlc3ApKSlcbiAgICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCByZWFzb24gPT4gd2l0aExhdGVuY3koKCkgPT4gcmVjZWl2ZXMuZXJyb3IgJiYgcmVjZWl2ZXMuZXJyb3IocmVhc29uKSkpXG4gICAgICAgIC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiB3aXRoTGF0ZW5jeSgoKSA9PiByZWNlaXZlcy50aW1lb3V0ICYmIHJlY2VpdmVzLnRpbWVvdXQoKSkpXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBldmVudCwgcGF5bG9hZCl7XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiBQcm9taXNlLnJlamVjdCh7ZXJyb3I6IFwibm9jb25uZWN0aW9uXCJ9KSB9XG5cbiAgICBsZXQgW3JlZiwgW2VsXSwgb3B0c10gPSByZWZHZW5lcmF0b3IgPyByZWZHZW5lcmF0b3IoKSA6IFtudWxsLCBbXSwge31dXG4gICAgbGV0IG9sZEpvaW5Db3VudCA9IHRoaXMuam9pbkNvdW50XG4gICAgbGV0IG9uTG9hZGluZ0RvbmUgPSBmdW5jdGlvbigpe31cbiAgICBpZihvcHRzLnBhZ2VfbG9hZGluZyl7XG4gICAgICBvbkxvYWRpbmdEb25lID0gdGhpcy5saXZlU29ja2V0LndpdGhQYWdlTG9hZGluZyh7a2luZDogXCJlbGVtZW50XCIsIHRhcmdldDogZWx9KVxuICAgIH1cblxuICAgIGlmKHR5cGVvZiAocGF5bG9hZC5jaWQpICE9PSBcIm51bWJlclwiKXsgZGVsZXRlIHBheWxvYWQuY2lkIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLndyYXBQdXNoKCgpID0+IHRoaXMuY2hhbm5lbC5wdXNoKGV2ZW50LCBwYXlsb2FkLCBQVVNIX1RJTUVPVVQpLCB7XG4gICAgICAgIG9rOiAocmVzcCkgPT4ge1xuICAgICAgICAgIGlmKHJlZiAhPT0gbnVsbCl7IHRoaXMubGFzdEFja1JlZiA9IHJlZiB9XG4gICAgICAgICAgbGV0IGZpbmlzaCA9IChob29rUmVwbHkpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3AucmVkaXJlY3QpeyB0aGlzLm9uUmVkaXJlY3QocmVzcC5yZWRpcmVjdCkgfVxuICAgICAgICAgICAgaWYocmVzcC5saXZlX3BhdGNoKXsgdGhpcy5vbkxpdmVQYXRjaChyZXNwLmxpdmVfcGF0Y2gpIH1cbiAgICAgICAgICAgIGlmKHJlc3AubGl2ZV9yZWRpcmVjdCl7IHRoaXMub25MaXZlUmVkaXJlY3QocmVzcC5saXZlX3JlZGlyZWN0KSB9XG4gICAgICAgICAgICBvbkxvYWRpbmdEb25lKClcbiAgICAgICAgICAgIHJlc29sdmUoe3Jlc3A6IHJlc3AsIHJlcGx5OiBob29rUmVwbHl9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXNwLmRpZmYpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmFwcGx5RGlmZihcInVwZGF0ZVwiLCByZXNwLmRpZmYsICh7ZGlmZiwgcmVwbHksIGV2ZW50c30pID0+IHtcbiAgICAgICAgICAgICAgICBpZihyZWYgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgICAgdGhpcy51bmRvUmVmcyhyZWYsIHBheWxvYWQuZXZlbnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKGRpZmYsIGV2ZW50cylcbiAgICAgICAgICAgICAgICBmaW5pc2gocmVwbHkpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihyZWYgIT09IG51bGwpeyB0aGlzLnVuZG9SZWZzKHJlZiwgcGF5bG9hZC5ldmVudCkgfVxuICAgICAgICAgICAgZmluaXNoKG51bGwpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKHJlYXNvbikgPT4gcmVqZWN0KHtlcnJvcjogcmVhc29ufSksXG4gICAgICAgIHRpbWVvdXQ6ICgpID0+IHtcbiAgICAgICAgICByZWplY3Qoe3RpbWVvdXQ6IHRydWV9KVxuICAgICAgICAgIGlmKHRoaXMuam9pbkNvdW50ID09PSBvbGRKb2luQ291bnQpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlbG9hZFdpdGhKaXR0ZXIodGhpcywgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZyhcInRpbWVvdXRcIiwgKCkgPT4gW1wicmVjZWl2ZWQgdGltZW91dCB3aGlsZSBjb21tdW5pY2F0aW5nIHdpdGggc2VydmVyLiBGYWxsaW5nIGJhY2sgdG8gaGFyZCByZWZyZXNoIGZvciByZWNvdmVyeVwiXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICB1bmRvUmVmcyhyZWYsIHBoeEV2ZW50LCBvbmx5RWxzKXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH0gLy8gZXhpdCBpZiBleHRlcm5hbCBmb3JtIHRyaWdnZXJlZFxuICAgIGxldCBzZWxlY3RvciA9IGBbJHtQSFhfUkVGX1NSQ309XCIke3RoaXMucmVmU3JjKCl9XCJdYFxuXG4gICAgaWYob25seUVscyl7XG4gICAgICBvbmx5RWxzID0gbmV3IFNldChvbmx5RWxzKVxuICAgICAgRE9NLmFsbChkb2N1bWVudCwgc2VsZWN0b3IsIHBhcmVudCA9PiB7XG4gICAgICAgIGlmKG9ubHlFbHMgJiYgIW9ubHlFbHMuaGFzKHBhcmVudCkpeyByZXR1cm4gfVxuICAgICAgICAvLyB1bmRvIGFueSBjaGlsZCByZWZzIHdpdGhpbiBwYXJlbnQgZmlyc3RcbiAgICAgICAgRE9NLmFsbChwYXJlbnQsIHNlbGVjdG9yLCBjaGlsZCA9PiB0aGlzLnVuZG9FbFJlZihjaGlsZCwgcmVmLCBwaHhFdmVudCkpXG4gICAgICAgIHRoaXMudW5kb0VsUmVmKHBhcmVudCwgcmVmLCBwaHhFdmVudClcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIERPTS5hbGwoZG9jdW1lbnQsIHNlbGVjdG9yLCBlbCA9PiB0aGlzLnVuZG9FbFJlZihlbCwgcmVmLCBwaHhFdmVudCkpXG4gICAgfVxuICB9XG5cbiAgdW5kb0VsUmVmKGVsLCByZWYsIHBoeEV2ZW50KXtcbiAgICBsZXQgZWxSZWYgPSBuZXcgRWxlbWVudFJlZihlbClcblxuICAgIGVsUmVmLm1heWJlVW5kbyhyZWYsIHBoeEV2ZW50LCBjbG9uZWRUcmVlID0+IHtcbiAgICAgIC8vIHdlIG5lZWQgdG8gcGVyZm9ybSBhIGZ1bGwgcGF0Y2ggb24gdW5sb2NrZWQgZWxlbWVudHNcbiAgICAgIC8vIHRvIHBlcmZvcm0gYWxsIHRoZSBuZWNlc3NhcnkgbG9naWMgKGxpa2UgY2FsbGluZyB1cGRhdGVkIGZvciBob29rcywgZXRjLilcbiAgICAgIGxldCBwYXRjaCA9IG5ldyBET01QYXRjaCh0aGlzLCBlbCwgdGhpcy5pZCwgY2xvbmVkVHJlZSwgW10sIG51bGwsIHt1bmRvUmVmOiByZWZ9KVxuICAgICAgY29uc3QgcGh4Q2hpbGRyZW5BZGRlZCA9IHRoaXMucGVyZm9ybVBhdGNoKHBhdGNoLCB0cnVlKVxuICAgICAgRE9NLmFsbChlbCwgYFske1BIWF9SRUZfU1JDfT1cIiR7dGhpcy5yZWZTcmMoKX1cIl1gLCBjaGlsZCA9PiB0aGlzLnVuZG9FbFJlZihjaGlsZCwgcmVmLCBwaHhFdmVudCkpXG4gICAgICBpZihwaHhDaGlsZHJlbkFkZGVkKXsgdGhpcy5qb2luTmV3Q2hpbGRyZW4oKSB9XG4gICAgfSlcbiAgfVxuXG4gIHJlZlNyYygpeyByZXR1cm4gdGhpcy5lbC5pZCB9XG5cbiAgcHV0UmVmKGVsZW1lbnRzLCBwaHhFdmVudCwgZXZlbnRUeXBlLCBvcHRzID0ge30pe1xuICAgIGxldCBuZXdSZWYgPSB0aGlzLnJlZisrXG4gICAgbGV0IGRpc2FibGVXaXRoID0gdGhpcy5iaW5kaW5nKFBIWF9ESVNBQkxFX1dJVEgpXG4gICAgaWYob3B0cy5sb2FkaW5nKXtcbiAgICAgIGxldCBsb2FkaW5nRWxzID0gRE9NLmFsbChkb2N1bWVudCwgb3B0cy5sb2FkaW5nKS5tYXAoZWwgPT4ge1xuICAgICAgICByZXR1cm4ge2VsLCBsb2NrOiB0cnVlLCBsb2FkaW5nOiB0cnVlfVxuICAgICAgfSlcbiAgICAgIGVsZW1lbnRzID0gZWxlbWVudHMuY29uY2F0KGxvYWRpbmdFbHMpXG4gICAgfVxuXG4gICAgZm9yKGxldCB7ZWwsIGxvY2ssIGxvYWRpbmd9IG9mIGVsZW1lbnRzKXtcbiAgICAgIGlmKCFsb2NrICYmICFsb2FkaW5nKXsgdGhyb3cgbmV3IEVycm9yKFwicHV0UmVmIHJlcXVpcmVzIGxvY2sgb3IgbG9hZGluZ1wiKSB9XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMsIHRoaXMucmVmU3JjKCkpXG4gICAgICBpZihsb2FkaW5nKXsgZWwuc2V0QXR0cmlidXRlKFBIWF9SRUZfTE9BRElORywgbmV3UmVmKSB9XG4gICAgICBpZihsb2NrKXsgZWwuc2V0QXR0cmlidXRlKFBIWF9SRUZfTE9DSywgbmV3UmVmKSB9XG5cbiAgICAgIGlmKCFsb2FkaW5nIHx8IChvcHRzLnN1Ym1pdHRlciAmJiAhKGVsID09PSBvcHRzLnN1Ym1pdHRlciB8fCBlbCA9PT0gb3B0cy5mb3JtKSkpeyBjb250aW51ZSB9XG5cbiAgICAgIGxldCBsb2NrQ29tcGxldGVQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoYHBoeDp1bmRvLWxvY2s6JHtuZXdSZWZ9YCwgKCkgPT4gcmVzb2x2ZShkZXRhaWwpLCB7b25jZTogdHJ1ZX0pXG4gICAgICB9KVxuXG4gICAgICBsZXQgbG9hZGluZ0NvbXBsZXRlUHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGBwaHg6dW5kby1sb2FkaW5nOiR7bmV3UmVmfWAsICgpID0+IHJlc29sdmUoZGV0YWlsKSwge29uY2U6IHRydWV9KVxuICAgICAgfSlcblxuICAgICAgZWwuY2xhc3NMaXN0LmFkZChgcGh4LSR7ZXZlbnRUeXBlfS1sb2FkaW5nYClcbiAgICAgIGxldCBkaXNhYmxlVGV4dCA9IGVsLmdldEF0dHJpYnV0ZShkaXNhYmxlV2l0aClcbiAgICAgIGlmKGRpc2FibGVUZXh0ICE9PSBudWxsKXtcbiAgICAgICAgaWYoIWVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpKXtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFLCBlbC5pbm5lclRleHQpXG4gICAgICAgIH1cbiAgICAgICAgaWYoZGlzYWJsZVRleHQgIT09IFwiXCIpeyBlbC5pbm5lclRleHQgPSBkaXNhYmxlVGV4dCB9XG4gICAgICAgIC8vIFBIWF9ESVNBQkxFRCBjb3VsZCBoYXZlIGFscmVhZHkgYmVlbiBzZXQgaW4gZGlzYWJsZUZvcm1cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgZWwuZ2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCkgfHwgZWwuZGlzYWJsZWQpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpXG4gICAgICB9XG5cbiAgICAgIGxldCBkZXRhaWwgPSB7XG4gICAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgICAgZXZlbnRUeXBlOiBldmVudFR5cGUsXG4gICAgICAgIHJlZjogbmV3UmVmLFxuICAgICAgICBpc0xvYWRpbmc6IGxvYWRpbmcsXG4gICAgICAgIGlzTG9ja2VkOiBsb2NrLFxuICAgICAgICBsb2NrRWxlbWVudHM6IGVsZW1lbnRzLmZpbHRlcigoe2xvY2t9KSA9PiBsb2NrKS5tYXAoKHtlbH0pID0+IGVsKSxcbiAgICAgICAgbG9hZGluZ0VsZW1lbnRzOiBlbGVtZW50cy5maWx0ZXIoKHtsb2FkaW5nfSkgPT4gbG9hZGluZykubWFwKCh7ZWx9KSA9PiBlbCksXG4gICAgICAgIHVubG9jazogKGVscykgPT4ge1xuICAgICAgICAgIGVscyA9IEFycmF5LmlzQXJyYXkoZWxzKSA/IGVscyA6IFtlbHNdXG4gICAgICAgICAgdGhpcy51bmRvUmVmcyhuZXdSZWYsIHBoeEV2ZW50LCBlbHMpXG4gICAgICAgIH0sXG4gICAgICAgIGxvY2tDb21wbGV0ZTogbG9ja0NvbXBsZXRlUHJvbWlzZSxcbiAgICAgICAgbG9hZGluZ0NvbXBsZXRlOiBsb2FkaW5nQ29tcGxldGVQcm9taXNlLFxuICAgICAgICBsb2NrOiAobG9ja0VsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgaWYodGhpcy5pc0Fja2VkKG5ld1JlZikpeyByZXR1cm4gcmVzb2x2ZShkZXRhaWwpIH1cbiAgICAgICAgICAgIGxvY2tFbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9MT0NLLCBuZXdSZWYpXG4gICAgICAgICAgICBsb2NrRWwuc2V0QXR0cmlidXRlKFBIWF9SRUZfU1JDLCB0aGlzLnJlZlNyYygpKVxuICAgICAgICAgICAgbG9ja0VsLmFkZEV2ZW50TGlzdGVuZXIoYHBoeDpsb2NrLXN0b3A6JHtuZXdSZWZ9YCwgKCkgPT4gcmVzb2x2ZShkZXRhaWwpLCB7b25jZTogdHJ1ZX0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJwaHg6cHVzaFwiLCB7XG4gICAgICAgIGRldGFpbDogZGV0YWlsLFxuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZVxuICAgICAgfSkpXG4gICAgICBpZihwaHhFdmVudCl7XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGBwaHg6cHVzaDoke3BoeEV2ZW50fWAsIHtcbiAgICAgICAgICBkZXRhaWw6IGRldGFpbCxcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlXG4gICAgICAgIH0pKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW25ld1JlZiwgZWxlbWVudHMubWFwKCh7ZWx9KSA9PiBlbCksIG9wdHNdXG4gIH1cblxuICBpc0Fja2VkKHJlZil7IHJldHVybiB0aGlzLmxhc3RBY2tSZWYgIT09IG51bGwgJiYgdGhpcy5sYXN0QWNrUmVmID49IHJlZiB9XG5cbiAgY29tcG9uZW50SUQoZWwpe1xuICAgIGxldCBjaWQgPSBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpXG4gICAgcmV0dXJuIGNpZCA/IHBhcnNlSW50KGNpZCkgOiBudWxsXG4gIH1cblxuICB0YXJnZXRDb21wb25lbnRJRCh0YXJnZXQsIHRhcmdldEN0eCwgb3B0cyA9IHt9KXtcbiAgICBpZihpc0NpZCh0YXJnZXRDdHgpKXsgcmV0dXJuIHRhcmdldEN0eCB9XG5cbiAgICBsZXQgY2lkT3JTZWxlY3RvciA9IG9wdHMudGFyZ2V0IHx8IHRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwidGFyZ2V0XCIpKVxuICAgIGlmKGlzQ2lkKGNpZE9yU2VsZWN0b3IpKXtcbiAgICAgIHJldHVybiBwYXJzZUludChjaWRPclNlbGVjdG9yKVxuICAgIH0gZWxzZSBpZih0YXJnZXRDdHggJiYgKGNpZE9yU2VsZWN0b3IgIT09IG51bGwgfHwgb3B0cy50YXJnZXQpKXtcbiAgICAgIHJldHVybiB0aGlzLmNsb3Nlc3RDb21wb25lbnRJRCh0YXJnZXRDdHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eCl7XG4gICAgaWYoaXNDaWQodGFyZ2V0Q3R4KSl7XG4gICAgICByZXR1cm4gdGFyZ2V0Q3R4XG4gICAgfSBlbHNlIGlmKHRhcmdldEN0eCl7XG4gICAgICByZXR1cm4gbWF5YmUodGFyZ2V0Q3R4LmNsb3Nlc3QoYFske1BIWF9DT01QT05FTlR9XWApLCBlbCA9PiB0aGlzLm93bnNFbGVtZW50KGVsKSAmJiB0aGlzLmNvbXBvbmVudElEKGVsKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBwdXNoSG9va0V2ZW50KGVsLCB0YXJnZXRDdHgsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXtcbiAgICAgIHRoaXMubG9nKFwiaG9va1wiLCAoKSA9PiBbXCJ1bmFibGUgdG8gcHVzaCBob29rIGV2ZW50LiBMaXZlVmlldyBub3QgY29ubmVjdGVkXCIsIGV2ZW50LCBwYXlsb2FkXSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBsZXQgW3JlZiwgZWxzLCBvcHRzXSA9IHRoaXMucHV0UmVmKFt7ZWwsIGxvYWRpbmc6IHRydWUsIGxvY2s6IHRydWV9XSwgZXZlbnQsIFwiaG9va1wiKVxuICAgIHRoaXMucHVzaFdpdGhSZXBseSgoKSA9PiBbcmVmLCBlbHMsIG9wdHNdLCBcImV2ZW50XCIsIHtcbiAgICAgIHR5cGU6IFwiaG9va1wiLFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgdmFsdWU6IHBheWxvYWQsXG4gICAgICBjaWQ6IHRoaXMuY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eClcbiAgICB9KS50aGVuKCh7cmVzcDogX3Jlc3AsIHJlcGx5OiBob29rUmVwbHl9KSA9PiBvblJlcGx5KGhvb2tSZXBseSwgcmVmKSlcblxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIGV4dHJhY3RNZXRhKGVsLCBtZXRhLCB2YWx1ZSl7XG4gICAgbGV0IHByZWZpeCA9IHRoaXMuYmluZGluZyhcInZhbHVlLVwiKVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGlmKCFtZXRhKXsgbWV0YSA9IHt9IH1cbiAgICAgIGxldCBuYW1lID0gZWwuYXR0cmlidXRlc1tpXS5uYW1lXG4gICAgICBpZihuYW1lLnN0YXJ0c1dpdGgocHJlZml4KSl7IG1ldGFbbmFtZS5yZXBsYWNlKHByZWZpeCwgXCJcIildID0gZWwuZ2V0QXR0cmlidXRlKG5hbWUpIH1cbiAgICB9XG4gICAgaWYoZWwudmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhKGVsIGluc3RhbmNlb2YgSFRNTEZvcm1FbGVtZW50KSl7XG4gICAgICBpZighbWV0YSl7IG1ldGEgPSB7fSB9XG4gICAgICBtZXRhLnZhbHVlID0gZWwudmFsdWVcblxuICAgICAgaWYoZWwudGFnTmFtZSA9PT0gXCJJTlBVVFwiICYmIENIRUNLQUJMRV9JTlBVVFMuaW5kZXhPZihlbC50eXBlKSA+PSAwICYmICFlbC5jaGVja2VkKXtcbiAgICAgICAgZGVsZXRlIG1ldGEudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodmFsdWUpe1xuICAgICAgaWYoIW1ldGEpeyBtZXRhID0ge30gfVxuICAgICAgZm9yKGxldCBrZXkgaW4gdmFsdWUpeyBtZXRhW2tleV0gPSB2YWx1ZVtrZXldIH1cbiAgICB9XG4gICAgcmV0dXJuIG1ldGFcbiAgfVxuXG4gIHB1c2hFdmVudCh0eXBlLCBlbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgbWV0YSwgb3B0cyA9IHt9LCBvblJlcGx5KXtcbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkoKCkgPT4gdGhpcy5wdXRSZWYoW3tlbCwgbG9hZGluZzogdHJ1ZSwgbG9jazogdHJ1ZX1dLCBwaHhFdmVudCwgdHlwZSwgb3B0cyksIFwiZXZlbnRcIiwge1xuICAgICAgdHlwZTogdHlwZSxcbiAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgIHZhbHVlOiB0aGlzLmV4dHJhY3RNZXRhKGVsLCBtZXRhLCBvcHRzLnZhbHVlKSxcbiAgICAgIGNpZDogdGhpcy50YXJnZXRDb21wb25lbnRJRChlbCwgdGFyZ2V0Q3R4LCBvcHRzKVxuICAgIH0pXG4gICAgICAudGhlbigoe3JlcGx5fSkgPT4gb25SZXBseSAmJiBvblJlcGx5KHJlcGx5KSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGxvZ0Vycm9yKFwiRmFpbGVkIHRvIHB1c2ggZXZlbnRcIiwgZXJyb3IpKVxuICB9XG5cbiAgcHVzaEZpbGVQcm9ncmVzcyhmaWxlRWwsIGVudHJ5UmVmLCBwcm9ncmVzcywgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQud2l0aGluT3duZXJzKGZpbGVFbC5mb3JtLCAodmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICB2aWV3LnB1c2hXaXRoUmVwbHkobnVsbCwgXCJwcm9ncmVzc1wiLCB7XG4gICAgICAgIGV2ZW50OiBmaWxlRWwuZ2V0QXR0cmlidXRlKHZpZXcuYmluZGluZyhQSFhfUFJPR1JFU1MpKSxcbiAgICAgICAgcmVmOiBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSxcbiAgICAgICAgZW50cnlfcmVmOiBlbnRyeVJlZixcbiAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICBjaWQ6IHZpZXcudGFyZ2V0Q29tcG9uZW50SUQoZmlsZUVsLmZvcm0sIHRhcmdldEN0eClcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7cmVzcH0pID0+IG9uUmVwbHkocmVzcCkpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGxvZ0Vycm9yKFwiRmFpbGVkIHRvIHB1c2ggZmlsZSBwcm9ncmVzc1wiLCBlcnJvcikpXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hJbnB1dChpbnB1dEVsLCB0YXJnZXRDdHgsIGZvcmNlQ2lkLCBwaHhFdmVudCwgb3B0cywgY2FsbGJhY2spe1xuICAgIGlmKCFpbnB1dEVsLmZvcm0pe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZm9ybSBldmVudHMgcmVxdWlyZSB0aGUgaW5wdXQgdG8gYmUgaW5zaWRlIGEgZm9ybVwiKVxuICAgIH1cblxuICAgIGxldCB1cGxvYWRzXG4gICAgbGV0IGNpZCA9IGlzQ2lkKGZvcmNlQ2lkKSA/IGZvcmNlQ2lkIDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eCwgb3B0cylcbiAgICBsZXQgcmVmR2VuZXJhdG9yID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMucHV0UmVmKFtcbiAgICAgICAge2VsOiBpbnB1dEVsLCBsb2FkaW5nOiB0cnVlLCBsb2NrOiB0cnVlfSxcbiAgICAgICAge2VsOiBpbnB1dEVsLmZvcm0sIGxvYWRpbmc6IHRydWUsIGxvY2s6IHRydWV9XG4gICAgICBdLCBwaHhFdmVudCwgXCJjaGFuZ2VcIiwgb3B0cylcbiAgICB9XG4gICAgbGV0IGZvcm1EYXRhXG4gICAgbGV0IG1ldGEgPSB0aGlzLmV4dHJhY3RNZXRhKGlucHV0RWwuZm9ybSwge30sIG9wdHMudmFsdWUpXG4gICAgbGV0IHNlcmlhbGl6ZU9wdHMgPSB7fVxuICAgIGlmKGlucHV0RWwgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCl7IHNlcmlhbGl6ZU9wdHMuc3VibWl0dGVyID0gaW5wdXRFbCB9XG4gICAgaWYoaW5wdXRFbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpKSl7XG4gICAgICBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oaW5wdXRFbC5mb3JtLCBzZXJpYWxpemVPcHRzLCBbaW5wdXRFbC5uYW1lXSlcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybURhdGEgPSBzZXJpYWxpemVGb3JtKGlucHV0RWwuZm9ybSwgc2VyaWFsaXplT3B0cylcbiAgICB9XG4gICAgaWYoRE9NLmlzVXBsb2FkSW5wdXQoaW5wdXRFbCkgJiYgaW5wdXRFbC5maWxlcyAmJiBpbnB1dEVsLmZpbGVzLmxlbmd0aCA+IDApe1xuICAgICAgTGl2ZVVwbG9hZGVyLnRyYWNrRmlsZXMoaW5wdXRFbCwgQXJyYXkuZnJvbShpbnB1dEVsLmZpbGVzKSlcbiAgICB9XG4gICAgdXBsb2FkcyA9IExpdmVVcGxvYWRlci5zZXJpYWxpemVVcGxvYWRzKGlucHV0RWwpXG5cbiAgICBsZXQgZXZlbnQgPSB7XG4gICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgIG1ldGE6IHtcbiAgICAgICAgLy8gbm8gdGFyZ2V0IHdhcyBpbXBsaWNpdGx5IHNlbnQgYXMgXCJ1bmRlZmluZWRcIiBpbiBMViA8PSAxLjAuNSwgdGhlcmVmb3JlXG4gICAgICAgIC8vIHdlIGhhdmUgdG8ga2VlcCBpdC4gSW4gMS4wLjYgd2Ugc3dpdGNoZWQgZnJvbSBwYXNzaW5nIG1ldGEgYXMgVVJMIGVuY29kZWQgZGF0YVxuICAgICAgICAvLyB0byBwYXNzaW5nIGl0IGRpcmVjdGx5IGluIHRoZSBldmVudCwgYnV0IHRoZSBKU09OIGVuY29kZSB3b3VsZCBkcm9wIGtleXMgd2l0aFxuICAgICAgICAvLyB1bmRlZmluZWQgdmFsdWVzLlxuICAgICAgICBfdGFyZ2V0OiBvcHRzLl90YXJnZXQgfHwgXCJ1bmRlZmluZWRcIixcbiAgICAgICAgLi4ubWV0YVxuICAgICAgfSxcbiAgICAgIHVwbG9hZHM6IHVwbG9hZHMsXG4gICAgICBjaWQ6IGNpZFxuICAgIH1cbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBcImV2ZW50XCIsIGV2ZW50KS50aGVuKCh7cmVzcH0pID0+IHtcbiAgICAgIGlmKERPTS5pc1VwbG9hZElucHV0KGlucHV0RWwpICYmIERPTS5pc0F1dG9VcGxvYWQoaW5wdXRFbCkpe1xuICAgICAgICAvLyB0aGUgZWxlbWVudCBjb3VsZCBiZSBpbnNpZGUgYSBsb2NrZWQgcGFyZW50IGZvciBvdGhlciB1bnJlbGF0ZWQgY2hhbmdlcztcbiAgICAgICAgLy8gd2UgY2FuIG9ubHkgc3RhcnQgdXBsb2FkcyB3aGVuIHRoZSB0cmVlIGlzIHVubG9ja2VkIGFuZCB0aGVcbiAgICAgICAgLy8gbmVjZXNzYXJ5IGRhdGEgYXR0cmlidXRlcyBhcmUgc2V0IGluIHRoZSByZWFsIERPTVxuICAgICAgICBFbGVtZW50UmVmLm9uVW5sb2NrKGlucHV0RWwsICgpID0+IHtcbiAgICAgICAgICBpZihMaXZlVXBsb2FkZXIuZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dEVsKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGxldCBbcmVmLCBfZWxzXSA9IHJlZkdlbmVyYXRvcigpXG4gICAgICAgICAgICB0aGlzLnVuZG9SZWZzKHJlZiwgcGh4RXZlbnQsIFtpbnB1dEVsLmZvcm1dKVxuICAgICAgICAgICAgdGhpcy51cGxvYWRGaWxlcyhpbnB1dEVsLmZvcm0sIHBoeEV2ZW50LCB0YXJnZXRDdHgsIHJlZiwgY2lkLCAoX3VwbG9hZHMpID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzcClcbiAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyQXdhaXRpbmdTdWJtaXQoaW5wdXRFbC5mb3JtLCBwaHhFdmVudClcbiAgICAgICAgICAgICAgdGhpcy51bmRvUmVmcyhyZWYsIHBoeEV2ZW50KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwKVxuICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4gbG9nRXJyb3IoXCJGYWlsZWQgdG8gcHVzaCBpbnB1dCBldmVudFwiLCBlcnJvcikpXG4gIH1cblxuICB0cmlnZ2VyQXdhaXRpbmdTdWJtaXQoZm9ybUVsLCBwaHhFdmVudCl7XG4gICAgbGV0IGF3YWl0aW5nU3VibWl0ID0gdGhpcy5nZXRTY2hlZHVsZWRTdWJtaXQoZm9ybUVsKVxuICAgIGlmKGF3YWl0aW5nU3VibWl0KXtcbiAgICAgIGxldCBbX2VsLCBfcmVmLCBfb3B0cywgY2FsbGJhY2tdID0gYXdhaXRpbmdTdWJtaXRcbiAgICAgIHRoaXMuY2FuY2VsU3VibWl0KGZvcm1FbCwgcGh4RXZlbnQpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbCl7XG4gICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pdHMuZmluZCgoW2VsLCBfcmVmLCBfb3B0cywgX2NhbGxiYWNrXSkgPT4gZWwuaXNTYW1lTm9kZShmb3JtRWwpKVxuICB9XG5cbiAgc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLmdldFNjaGVkdWxlZFN1Ym1pdChmb3JtRWwpKXsgcmV0dXJuIHRydWUgfVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMucHVzaChbZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrXSlcbiAgfVxuXG4gIGNhbmNlbFN1Ym1pdChmb3JtRWwsIHBoeEV2ZW50KXtcbiAgICB0aGlzLmZvcm1TdWJtaXRzID0gdGhpcy5mb3JtU3VibWl0cy5maWx0ZXIoKFtlbCwgcmVmLCBfb3B0cywgX2NhbGxiYWNrXSkgPT4ge1xuICAgICAgaWYoZWwuaXNTYW1lTm9kZShmb3JtRWwpKXtcbiAgICAgICAgdGhpcy51bmRvUmVmcyhyZWYsIHBoeEV2ZW50KVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGRpc2FibGVGb3JtKGZvcm1FbCwgcGh4RXZlbnQsIG9wdHMgPSB7fSl7XG4gICAgbGV0IGZpbHRlcklnbm9yZWQgPSBlbCA9PiB7XG4gICAgICBsZXQgdXNlcklnbm9yZWQgPSBjbG9zZXN0UGh4QmluZGluZyhlbCwgYCR7dGhpcy5iaW5kaW5nKFBIWF9VUERBVEUpfT1pZ25vcmVgLCBlbC5mb3JtKVxuICAgICAgcmV0dXJuICEodXNlcklnbm9yZWQgfHwgY2xvc2VzdFBoeEJpbmRpbmcoZWwsIFwiZGF0YS1waHgtdXBkYXRlPWlnbm9yZVwiLCBlbC5mb3JtKSlcbiAgICB9XG4gICAgbGV0IGZpbHRlckRpc2FibGVzID0gZWwgPT4ge1xuICAgICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0RJU0FCTEVfV0lUSCkpXG4gICAgfVxuICAgIGxldCBmaWx0ZXJCdXR0b24gPSBlbCA9PiBlbC50YWdOYW1lID09IFwiQlVUVE9OXCJcblxuICAgIGxldCBmaWx0ZXJJbnB1dCA9IGVsID0+IFtcIklOUFVUXCIsIFwiVEVYVEFSRUFcIiwgXCJTRUxFQ1RcIl0uaW5jbHVkZXMoZWwudGFnTmFtZSlcblxuICAgIGxldCBmb3JtRWxlbWVudHMgPSBBcnJheS5mcm9tKGZvcm1FbC5lbGVtZW50cylcbiAgICBsZXQgZGlzYWJsZXMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlckRpc2FibGVzKVxuICAgIGxldCBidXR0b25zID0gZm9ybUVsZW1lbnRzLmZpbHRlcihmaWx0ZXJCdXR0b24pLmZpbHRlcihmaWx0ZXJJZ25vcmVkKVxuICAgIGxldCBpbnB1dHMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlcklucHV0KS5maWx0ZXIoZmlsdGVySWdub3JlZClcblxuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShQSFhfRElTQUJMRUQsIGJ1dHRvbi5kaXNhYmxlZClcbiAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWVcbiAgICB9KVxuICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IHtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShQSFhfUkVBRE9OTFksIGlucHV0LnJlYWRPbmx5KVxuICAgICAgaW5wdXQucmVhZE9ubHkgPSB0cnVlXG4gICAgICBpZihpbnB1dC5maWxlcyl7XG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShQSFhfRElTQUJMRUQsIGlucHV0LmRpc2FibGVkKVxuICAgICAgICBpbnB1dC5kaXNhYmxlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9KVxuICAgIGxldCBmb3JtRWxzID0gZGlzYWJsZXMuY29uY2F0KGJ1dHRvbnMpLmNvbmNhdChpbnB1dHMpLm1hcChlbCA9PiB7XG4gICAgICByZXR1cm4ge2VsLCBsb2FkaW5nOiB0cnVlLCBsb2NrOiB0cnVlfVxuICAgIH0pXG5cbiAgICAvLyB3ZSByZXZlcnNlIHRoZSBvcmRlciBzbyBmb3JtIGNoaWxkcmVuIGFyZSBhbHJlYWR5IGxvY2tlZCBieSB0aGUgdGltZVxuICAgIC8vIHRoZSBmb3JtIGlzIGxvY2tlZFxuICAgIGxldCBlbHMgPSBbe2VsOiBmb3JtRWwsIGxvYWRpbmc6IHRydWUsIGxvY2s6IGZhbHNlfV0uY29uY2F0KGZvcm1FbHMpLnJldmVyc2UoKVxuICAgIHJldHVybiB0aGlzLnB1dFJlZihlbHMsIHBoeEV2ZW50LCBcInN1Ym1pdFwiLCBvcHRzKVxuICB9XG5cbiAgcHVzaEZvcm1TdWJtaXQoZm9ybUVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBzdWJtaXR0ZXIsIG9wdHMsIG9uUmVwbHkpe1xuICAgIGxldCByZWZHZW5lcmF0b3IgPSAoKSA9PiB0aGlzLmRpc2FibGVGb3JtKGZvcm1FbCwgcGh4RXZlbnQsIHtcbiAgICAgIC4uLm9wdHMsXG4gICAgICBmb3JtOiBmb3JtRWwsXG4gICAgICBzdWJtaXR0ZXI6IHN1Ym1pdHRlclxuICAgIH0pXG4gICAgLy8gc3RvcmUgdGhlIHN1Ym1pdHRlciBpbiB0aGUgZm9ybSBlbGVtZW50IGluIG9yZGVyIHRvIHRyaWdnZXIgaXRcbiAgICAvLyBmb3IgcGh4LXRyaWdnZXItYWN0aW9uXG4gICAgRE9NLnB1dFByaXZhdGUoZm9ybUVsLCBcInN1Ym1pdHRlclwiLCBzdWJtaXR0ZXIpXG4gICAgbGV0IGNpZCA9IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoZm9ybUVsLCB0YXJnZXRDdHgpXG4gICAgaWYoTGl2ZVVwbG9hZGVyLmhhc1VwbG9hZHNJblByb2dyZXNzKGZvcm1FbCkpe1xuICAgICAgbGV0IFtyZWYsIF9lbHNdID0gcmVmR2VuZXJhdG9yKClcbiAgICAgIGxldCBwdXNoID0gKCkgPT4gdGhpcy5wdXNoRm9ybVN1Ym1pdChmb3JtRWwsIHRhcmdldEN0eCwgcGh4RXZlbnQsIHN1Ym1pdHRlciwgb3B0cywgb25SZXBseSlcbiAgICAgIHJldHVybiB0aGlzLnNjaGVkdWxlU3VibWl0KGZvcm1FbCwgcmVmLCBvcHRzLCBwdXNoKVxuICAgIH0gZWxzZSBpZihMaXZlVXBsb2FkZXIuaW5wdXRzQXdhaXRpbmdQcmVmbGlnaHQoZm9ybUVsKS5sZW5ndGggPiAwKXtcbiAgICAgIGxldCBbcmVmLCBlbHNdID0gcmVmR2VuZXJhdG9yKClcbiAgICAgIGxldCBwcm94eVJlZkdlbiA9ICgpID0+IFtyZWYsIGVscywgb3B0c11cbiAgICAgIHRoaXMudXBsb2FkRmlsZXMoZm9ybUVsLCBwaHhFdmVudCwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgKF91cGxvYWRzKSA9PiB7XG4gICAgICAgIC8vIGlmIHdlIHN0aWxsIGhhdmluZyBwZW5kaW5nIHByZWZsaWdodHMgaXQgbWVhbnMgd2UgaGF2ZSBpbnZhbGlkIGVudHJpZXNcbiAgICAgICAgLy8gYW5kIHRoZSBwaHgtc3VibWl0IGNhbm5vdCBiZSBjb21wbGV0ZWRcbiAgICAgICAgaWYoTGl2ZVVwbG9hZGVyLmlucHV0c0F3YWl0aW5nUHJlZmxpZ2h0KGZvcm1FbCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudW5kb1JlZnMocmVmLCBwaHhFdmVudClcbiAgICAgICAgfVxuICAgICAgICBsZXQgbWV0YSA9IHRoaXMuZXh0cmFjdE1ldGEoZm9ybUVsLCB7fSwgb3B0cy52YWx1ZSlcbiAgICAgICAgbGV0IGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShmb3JtRWwsIHtzdWJtaXR0ZXJ9KVxuICAgICAgICB0aGlzLnB1c2hXaXRoUmVwbHkocHJveHlSZWZHZW4sIFwiZXZlbnRcIiwge1xuICAgICAgICAgIHR5cGU6IFwiZm9ybVwiLFxuICAgICAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgICAgICB2YWx1ZTogZm9ybURhdGEsXG4gICAgICAgICAgbWV0YTogbWV0YSxcbiAgICAgICAgICBjaWQ6IGNpZFxuICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKCh7cmVzcH0pID0+IG9uUmVwbHkocmVzcCkpXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gbG9nRXJyb3IoXCJGYWlsZWQgdG8gcHVzaCBmb3JtIHN1Ym1pdFwiLCBlcnJvcikpXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZighKGZvcm1FbC5oYXNBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpICYmIGZvcm1FbC5jbGFzc0xpc3QuY29udGFpbnMoXCJwaHgtc3VibWl0LWxvYWRpbmdcIikpKXtcbiAgICAgIGxldCBtZXRhID0gdGhpcy5leHRyYWN0TWV0YShmb3JtRWwsIHt9LCBvcHRzLnZhbHVlKVxuICAgICAgbGV0IGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShmb3JtRWwsIHtzdWJtaXR0ZXJ9KVxuICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KHJlZkdlbmVyYXRvciwgXCJldmVudFwiLCB7XG4gICAgICAgIHR5cGU6IFwiZm9ybVwiLFxuICAgICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgICAgbWV0YTogbWV0YSxcbiAgICAgICAgY2lkOiBjaWRcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKCh7cmVzcH0pID0+IG9uUmVwbHkocmVzcCkpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGxvZ0Vycm9yKFwiRmFpbGVkIHRvIHB1c2ggZm9ybSBzdWJtaXRcIiwgZXJyb3IpKVxuICAgIH1cbiAgfVxuXG4gIHVwbG9hZEZpbGVzKGZvcm1FbCwgcGh4RXZlbnQsIHRhcmdldEN0eCwgcmVmLCBjaWQsIG9uQ29tcGxldGUpe1xuICAgIGxldCBqb2luQ291bnRBdFVwbG9hZCA9IHRoaXMuam9pbkNvdW50XG4gICAgbGV0IGlucHV0RWxzID0gTGl2ZVVwbG9hZGVyLmFjdGl2ZUZpbGVJbnB1dHMoZm9ybUVsKVxuICAgIGxldCBudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcyA9IGlucHV0RWxzLmxlbmd0aFxuXG4gICAgLy8gZ2V0IGVhY2ggZmlsZSBpbnB1dFxuICAgIGlucHV0RWxzLmZvckVhY2goaW5wdXRFbCA9PiB7XG4gICAgICBsZXQgdXBsb2FkZXIgPSBuZXcgTGl2ZVVwbG9hZGVyKGlucHV0RWwsIHRoaXMsICgpID0+IHtcbiAgICAgICAgbnVtRmlsZUlucHV0c0luUHJvZ3Jlc3MtLVxuICAgICAgICBpZihudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcyA9PT0gMCl7IG9uQ29tcGxldGUoKSB9XG4gICAgICB9KVxuXG4gICAgICBsZXQgZW50cmllcyA9IHVwbG9hZGVyLmVudHJpZXMoKS5tYXAoZW50cnkgPT4gZW50cnkudG9QcmVmbGlnaHRQYXlsb2FkKCkpXG5cbiAgICAgIGlmKGVudHJpZXMubGVuZ3RoID09PSAwKXtcbiAgICAgICAgbnVtRmlsZUlucHV0c0luUHJvZ3Jlc3MtLVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IHBheWxvYWQgPSB7XG4gICAgICAgIHJlZjogaW5wdXRFbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpLFxuICAgICAgICBlbnRyaWVzOiBlbnRyaWVzLFxuICAgICAgICBjaWQ6IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoaW5wdXRFbC5mb3JtLCB0YXJnZXRDdHgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nKFwidXBsb2FkXCIsICgpID0+IFtcInNlbmRpbmcgcHJlZmxpZ2h0IHJlcXVlc3RcIiwgcGF5bG9hZF0pXG5cbiAgICAgIHRoaXMucHVzaFdpdGhSZXBseShudWxsLCBcImFsbG93X3VwbG9hZFwiLCBwYXlsb2FkKS50aGVuKCh7cmVzcH0pID0+IHtcbiAgICAgICAgdGhpcy5sb2coXCJ1cGxvYWRcIiwgKCkgPT4gW1wiZ290IHByZWZsaWdodCByZXNwb25zZVwiLCByZXNwXSlcbiAgICAgICAgLy8gdGhlIHByZWZsaWdodCB3aWxsIHJlamVjdCBlbnRyaWVzIGJleW9uZCB0aGUgbWF4IGVudHJpZXNcbiAgICAgICAgLy8gc28gd2UgZXJyb3IgYW5kIGNhbmNlbCBlbnRyaWVzIG9uIHRoZSBjbGllbnQgdGhhdCBhcmUgbWlzc2luZyBmcm9tIHRoZSByZXNwb25zZVxuICAgICAgICB1cGxvYWRlci5lbnRyaWVzKCkuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgaWYocmVzcC5lbnRyaWVzICYmICFyZXNwLmVudHJpZXNbZW50cnkucmVmXSl7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUZhaWxlZEVudHJ5UHJlZmxpZ2h0KGVudHJ5LnJlZiwgXCJmYWlsZWQgcHJlZmxpZ2h0XCIsIHVwbG9hZGVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLy8gZm9yIGF1dG8gdXBsb2Fkcywgd2UgbWF5IGhhdmUgYW4gZW1wdHkgZW50cmllcyByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgICAgLy8gZm9yIGZvcm0gc3VibWl0cyB0aGF0IGNvbnRhaW4gaW52YWxpZCBlbnRyaWVzXG4gICAgICAgIGlmKHJlc3AuZXJyb3IgfHwgT2JqZWN0LmtleXMocmVzcC5lbnRyaWVzKS5sZW5ndGggPT09IDApe1xuICAgICAgICAgIHRoaXMudW5kb1JlZnMocmVmLCBwaHhFdmVudClcbiAgICAgICAgICBsZXQgZXJyb3JzID0gcmVzcC5lcnJvciB8fCBbXVxuICAgICAgICAgIGVycm9ycy5tYXAoKFtlbnRyeV9yZWYsIHJlYXNvbl0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRmFpbGVkRW50cnlQcmVmbGlnaHQoZW50cnlfcmVmLCByZWFzb24sIHVwbG9hZGVyKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IG9uRXJyb3IgPSAoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hhbm5lbC5vbkVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYodGhpcy5qb2luQ291bnQgPT09IGpvaW5Db3VudEF0VXBsb2FkKXsgY2FsbGJhY2soKSB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICB1cGxvYWRlci5pbml0QWRhcHRlclVwbG9hZChyZXNwLCBvbkVycm9yLCB0aGlzLmxpdmVTb2NrZXQpXG4gICAgICAgIH1cbiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4gbG9nRXJyb3IoXCJGYWlsZWQgdG8gcHVzaCB1cGxvYWRcIiwgZXJyb3IpKVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVGYWlsZWRFbnRyeVByZWZsaWdodCh1cGxvYWRSZWYsIHJlYXNvbiwgdXBsb2FkZXIpe1xuICAgIGlmKHVwbG9hZGVyLmlzQXV0b1VwbG9hZCgpKXtcbiAgICAgIC8vIHVwbG9hZFJlZiBtYXkgYmUgdG9wIGxldmVsIHVwbG9hZCBjb25maWcgcmVmIG9yIGVudHJ5IHJlZlxuICAgICAgbGV0IGVudHJ5ID0gdXBsb2FkZXIuZW50cmllcygpLmZpbmQoZW50cnkgPT4gZW50cnkucmVmID09PSB1cGxvYWRSZWYudG9TdHJpbmcoKSlcbiAgICAgIGlmKGVudHJ5KXsgZW50cnkuY2FuY2VsKCkgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1cGxvYWRlci5lbnRyaWVzKCkubWFwKGVudHJ5ID0+IGVudHJ5LmNhbmNlbCgpKVxuICAgIH1cbiAgICB0aGlzLmxvZyhcInVwbG9hZFwiLCAoKSA9PiBbYGVycm9yIGZvciBlbnRyeSAke3VwbG9hZFJlZn1gLCByZWFzb25dKVxuICB9XG5cbiAgZGlzcGF0Y2hVcGxvYWRzKHRhcmdldEN0eCwgbmFtZSwgZmlsZXNPckJsb2JzKXtcbiAgICBsZXQgdGFyZ2V0RWxlbWVudCA9IHRoaXMudGFyZ2V0Q3R4RWxlbWVudCh0YXJnZXRDdHgpIHx8IHRoaXMuZWxcbiAgICBsZXQgaW5wdXRzID0gRE9NLmZpbmRVcGxvYWRJbnB1dHModGFyZ2V0RWxlbWVudCkuZmlsdGVyKGVsID0+IGVsLm5hbWUgPT09IG5hbWUpXG4gICAgaWYoaW5wdXRzLmxlbmd0aCA9PT0gMCl7IGxvZ0Vycm9yKGBubyBsaXZlIGZpbGUgaW5wdXRzIGZvdW5kIG1hdGNoaW5nIHRoZSBuYW1lIFwiJHtuYW1lfVwiYCkgfVxuICAgIGVsc2UgaWYoaW5wdXRzLmxlbmd0aCA+IDEpeyBsb2dFcnJvcihgZHVwbGljYXRlIGxpdmUgZmlsZSBpbnB1dHMgZm91bmQgbWF0Y2hpbmcgdGhlIG5hbWUgXCIke25hbWV9XCJgKSB9XG4gICAgZWxzZSB7IERPTS5kaXNwYXRjaEV2ZW50KGlucHV0c1swXSwgUEhYX1RSQUNLX1VQTE9BRFMsIHtkZXRhaWw6IHtmaWxlczogZmlsZXNPckJsb2JzfX0pIH1cbiAgfVxuXG4gIHRhcmdldEN0eEVsZW1lbnQodGFyZ2V0Q3R4KXtcbiAgICBpZihpc0NpZCh0YXJnZXRDdHgpKXtcbiAgICAgIGxldCBbdGFyZ2V0XSA9IERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodGhpcy5lbCwgdGFyZ2V0Q3R4KVxuICAgICAgcmV0dXJuIHRhcmdldFxuICAgIH0gZWxzZSBpZih0YXJnZXRDdHgpe1xuICAgICAgcmV0dXJuIHRhcmdldEN0eFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHB1c2hGb3JtUmVjb3Zlcnkob2xkRm9ybSwgbmV3Rm9ybSwgdGVtcGxhdGVEb20sIGNhbGxiYWNrKXtcbiAgICAvLyB3ZSBhcmUgb25seSByZWNvdmVyaW5nIGZvcm1zIGluc2lkZSB0aGUgY3VycmVudCB2aWV3LCB0aGVyZWZvcmUgaXQgaXMgc2FmZSB0b1xuICAgIC8vIHNraXAgd2l0aGluT3duZXJzIGhlcmUgYW5kIGFsd2F5cyB1c2UgdGhpcyB3aGVuIHJlZmVycmluZyB0byB0aGUgdmlld1xuICAgIGNvbnN0IHBoeENoYW5nZSA9IHRoaXMuYmluZGluZyhcImNoYW5nZVwiKVxuICAgIGNvbnN0IHBoeFRhcmdldCA9IG5ld0Zvcm0uZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcInRhcmdldFwiKSkgfHwgbmV3Rm9ybVxuICAgIGNvbnN0IHBoeEV2ZW50ID0gbmV3Rm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9BVVRPX1JFQ09WRVIpKSB8fCBuZXdGb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIikpXG4gICAgY29uc3QgaW5wdXRzID0gQXJyYXkuZnJvbShvbGRGb3JtLmVsZW1lbnRzKS5maWx0ZXIoZWwgPT4gRE9NLmlzRm9ybUlucHV0KGVsKSAmJiBlbC5uYW1lICYmICFlbC5oYXNBdHRyaWJ1dGUocGh4Q2hhbmdlKSlcbiAgICBpZihpbnB1dHMubGVuZ3RoID09PSAwKXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHdlIG11c3QgY2xlYXIgdHJhY2tlZCB1cGxvYWRzIGJlZm9yZSByZWNvdmVyeSBhcyB0aGV5IG5vIGxvbmdlciBoYXZlIHZhbGlkIHJlZnNcbiAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC5oYXNBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpICYmIExpdmVVcGxvYWRlci5jbGVhckZpbGVzKGlucHV0KSlcbiAgICAvLyBwdXNoSW5wdXQgYXNzdW1lcyB0aGF0IHRoZXJlIGlzIGEgc291cmNlIGVsZW1lbnQgdGhhdCBpbml0aWF0ZWQgdGhlIGNoYW5nZTtcbiAgICAvLyBiZWNhdXNlIHRoaXMgaXMgbm90IHRoZSBjYXNlIHdoZW4gd2UgcmVjb3ZlciBmb3Jtcywgd2UgcHJvdmlkZSB0aGUgZmlyc3QgaW5wdXQgd2UgZmluZFxuICAgIGxldCBpbnB1dCA9IGlucHV0cy5maW5kKGVsID0+IGVsLnR5cGUgIT09IFwiaGlkZGVuXCIpIHx8IGlucHV0c1swXVxuXG4gICAgLy8gaW4gdGhlIGNhc2UgdGhhdCB0aGVyZSBhcmUgbXVsdGlwbGUgdGFyZ2V0cywgd2UgY291bnQgdGhlIG51bWJlciBvZiBwZW5kaW5nIHJlY292ZXJ5IGV2ZW50c1xuICAgIC8vIGFuZCBvbmx5IGNhbGwgdGhlIGNhbGxiYWNrIG9uY2UgYWxsIGV2ZW50cyBoYXZlIGJlZW4gcHJvY2Vzc2VkXG4gICAgbGV0IHBlbmRpbmcgPSAwXG4gICAgLy8gd2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsIGNhbGxiYWNrLCBkb20sIHZpZXdFbClcbiAgICB0aGlzLndpdGhpblRhcmdldHMocGh4VGFyZ2V0LCAodGFyZ2V0VmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICBjb25zdCBjaWQgPSB0aGlzLnRhcmdldENvbXBvbmVudElEKG5ld0Zvcm0sIHRhcmdldEN0eClcbiAgICAgIHBlbmRpbmcrK1xuICAgICAgbGV0IGUgPSBuZXcgQ3VzdG9tRXZlbnQoXCJwaHg6Zm9ybS1yZWNvdmVyeVwiLCB7ZGV0YWlsOiB7c291cmNlRWxlbWVudDogb2xkRm9ybX19KVxuICAgICAgSlMuZXhlYyhlLCBcImNoYW5nZVwiLCBwaHhFdmVudCwgdGhpcywgaW5wdXQsIFtcInB1c2hcIiwge1xuICAgICAgICBfdGFyZ2V0OiBpbnB1dC5uYW1lLFxuICAgICAgICB0YXJnZXRWaWV3LFxuICAgICAgICB0YXJnZXRDdHgsXG4gICAgICAgIG5ld0NpZDogY2lkLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgIHBlbmRpbmctLVxuICAgICAgICAgIGlmKHBlbmRpbmcgPT09IDApeyBjYWxsYmFjaygpIH1cbiAgICAgICAgfVxuICAgICAgfV0pXG4gICAgfSwgdGVtcGxhdGVEb20sIHRlbXBsYXRlRG9tKVxuICB9XG5cbiAgcHVzaExpbmtQYXRjaChlLCBocmVmLCB0YXJnZXRFbCwgY2FsbGJhY2spe1xuICAgIGxldCBsaW5rUmVmID0gdGhpcy5saXZlU29ja2V0LnNldFBlbmRpbmdMaW5rKGhyZWYpXG4gICAgLy8gb25seSBhZGQgbG9hZGluZyBzdGF0ZXMgaWYgZXZlbnQgaXMgdHJ1c3RlZCAoaXQgd2FzIHRyaWdnZXJlZCBieSB1c2VyLCBzdWNoIGFzIGNsaWNrKSBhbmRcbiAgICAvLyBpdCdzIG5vdCBhIGZvcndhcmQvYmFjayBuYXZpZ2F0aW9uIGZyb20gcG9wc3RhdGVcbiAgICBsZXQgbG9hZGluZyA9IGUuaXNUcnVzdGVkICYmIGUudHlwZSAhPT0gXCJwb3BzdGF0ZVwiXG4gICAgbGV0IHJlZkdlbiA9IHRhcmdldEVsID8gKCkgPT4gdGhpcy5wdXRSZWYoW3tlbDogdGFyZ2V0RWwsIGxvYWRpbmc6IGxvYWRpbmcsIGxvY2s6IHRydWV9XSwgbnVsbCwgXCJjbGlja1wiKSA6IG51bGxcbiAgICBsZXQgZmFsbGJhY2sgPSAoKSA9PiB0aGlzLmxpdmVTb2NrZXQucmVkaXJlY3Qod2luZG93LmxvY2F0aW9uLmhyZWYpXG4gICAgbGV0IHVybCA9IGhyZWYuc3RhcnRzV2l0aChcIi9cIikgPyBgJHtsb2NhdGlvbi5wcm90b2NvbH0vLyR7bG9jYXRpb24uaG9zdH0ke2hyZWZ9YCA6IGhyZWZcblxuICAgIHRoaXMucHVzaFdpdGhSZXBseShyZWZHZW4sIFwibGl2ZV9wYXRjaFwiLCB7dXJsfSkudGhlbihcbiAgICAgICh7cmVzcH0pID0+IHtcbiAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgIGlmKHJlc3AubGlua19yZWRpcmVjdCl7XG4gICAgICAgICAgICB0aGlzLmxpdmVTb2NrZXQucmVwbGFjZU1haW4oaHJlZiwgbnVsbCwgY2FsbGJhY2ssIGxpbmtSZWYpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHRoaXMubGl2ZVNvY2tldC5jb21taXRQZW5kaW5nTGluayhsaW5rUmVmKSl7XG4gICAgICAgICAgICAgIHRoaXMuaHJlZiA9IGhyZWZcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYXBwbHlQZW5kaW5nVXBkYXRlcygpXG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhsaW5rUmVmKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAoe2Vycm9yOiBfZXJyb3IsIHRpbWVvdXQ6IF90aW1lb3V0fSkgPT4gZmFsbGJhY2soKVxuICAgIClcbiAgfVxuXG4gIGdldEZvcm1zRm9yUmVjb3ZlcnkoKXtcbiAgICBpZih0aGlzLmpvaW5Db3VudCA9PT0gMCl7IHJldHVybiB7fSB9XG5cbiAgICBsZXQgcGh4Q2hhbmdlID0gdGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpXG5cbiAgICByZXR1cm4gRE9NLmFsbCh0aGlzLmVsLCBgZm9ybVske3BoeENoYW5nZX1dYClcbiAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmlkKVxuICAgICAgLmZpbHRlcihmb3JtID0+IGZvcm0uZWxlbWVudHMubGVuZ3RoID4gMClcbiAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0FVVE9fUkVDT1ZFUikpICE9PSBcImlnbm9yZVwiKVxuICAgICAgLm1hcChmb3JtID0+IHtcbiAgICAgICAgLy8gd2UgcGVyZm9ybSBhIHNoYWxsb3cgY2xvbmUgYW5kIG1hbnVhbGx5IGNvcHkgYWxsIGVsZW1lbnRzXG4gICAgICAgIGNvbnN0IGNsb25lZEZvcm0gPSBmb3JtLmNsb25lTm9kZShmYWxzZSlcbiAgICAgICAgLy8gd2UgbmVlZCB0byBjb3B5IHRoZSBwcml2YXRlIGRhdGEgYXMgaXQgY29udGFpbnNcbiAgICAgICAgLy8gdGhlIGluZm9ybWF0aW9uIGFib3V0IHRvdWNoZWQgZmllbGRzXG4gICAgICAgIERPTS5jb3B5UHJpdmF0ZXMoY2xvbmVkRm9ybSwgZm9ybSlcbiAgICAgICAgQXJyYXkuZnJvbShmb3JtLmVsZW1lbnRzKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgIC8vIHdlIG5lZWQgdG8gY2xvbmUgYWxsIGNoaWxkIG5vZGVzIGFzIHdlbGwsXG4gICAgICAgICAgLy8gYmVjYXVzZSB0aG9zZSBjb3VsZCBhbHNvIGJlIHNlbGVjdHNcbiAgICAgICAgICBjb25zdCBjbG9uZWRFbCA9IGVsLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICAgIC8vIHdlIGNhbGwgbW9ycGhkb20gdG8gY29weSBhbnkgc3BlY2lhbCBzdGF0ZVxuICAgICAgICAgIC8vIGxpa2UgdGhlIHNlbGVjdGVkIG9wdGlvbiBvZiBhIDxzZWxlY3Q+IGVsZW1lbnQ7XG4gICAgICAgICAgLy8gdGhpcyBzaG91bGQgYmUgcGxlbnR5IGZhc3QgYXMgd2UgY2FsbCBpdCBvbiBhIHNtYWxsIHN1YnNldCBvZiB0aGUgRE9NLFxuICAgICAgICAgIC8vIHNpbmdsZSBpbnB1dHMgb3IgYSBzZWxlY3Qgd2l0aCBjaGlsZHJlblxuICAgICAgICAgIG1vcnBoZG9tKGNsb25lZEVsLCBlbClcbiAgICAgICAgICBET00uY29weVByaXZhdGVzKGNsb25lZEVsLCBlbClcbiAgICAgICAgICBjbG9uZWRGb3JtLmFwcGVuZENoaWxkKGNsb25lZEVsKVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY2xvbmVkRm9ybVxuICAgICAgfSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgZm9ybSkgPT4ge1xuICAgICAgICBhY2NbZm9ybS5pZF0gPSBmb3JtXG4gICAgICAgIHJldHVybiBhY2NcbiAgICAgIH0sIHt9KVxuICB9XG5cbiAgbWF5YmVQdXNoQ29tcG9uZW50c0Rlc3Ryb3llZChkZXN0cm95ZWRDSURzKXtcbiAgICBsZXQgd2lsbERlc3Ryb3lDSURzID0gZGVzdHJveWVkQ0lEcy5maWx0ZXIoY2lkID0+IHtcbiAgICAgIHJldHVybiBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIGNpZCkubGVuZ3RoID09PSAwXG4gICAgfSlcblxuICAgIGlmKHdpbGxEZXN0cm95Q0lEcy5sZW5ndGggPiAwKXtcbiAgICAgIC8vIHdlIG11c3QgcmVzZXQgdGhlIHJlbmRlciBjaGFuZ2UgdHJhY2tpbmcgZm9yIGNpZHMgdGhhdFxuICAgICAgLy8gY291bGQgYmUgYWRkZWQgYmFjayBmcm9tIHRoZSBzZXJ2ZXIgc28gd2UgZG9uJ3Qgc2tpcCB0aGVtXG4gICAgICB3aWxsRGVzdHJveUNJRHMuZm9yRWFjaChjaWQgPT4gdGhpcy5yZW5kZXJlZC5yZXNldFJlbmRlcihjaWQpKVxuXG4gICAgICB0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCwgXCJjaWRzX3dpbGxfZGVzdHJveVwiLCB7Y2lkczogd2lsbERlc3Ryb3lDSURzfSkudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIHdlIG11c3Qgd2FpdCBmb3IgcGVuZGluZyB0cmFuc2l0aW9ucyB0byBjb21wbGV0ZSBiZWZvcmUgZGV0ZXJtaW5pbmdcbiAgICAgICAgLy8gaWYgdGhlIGNpZHMgd2VyZSBhZGRlZCBiYWNrIHRvIHRoZSBET00gaW4gdGhlIG1lYW50aW1lICgjMzEzOSlcbiAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgIC8vIFNlZSBpZiBhbnkgb2YgdGhlIGNpZHMgd2Ugd2FudGVkIHRvIGRlc3Ryb3kgd2VyZSBhZGRlZCBiYWNrLFxuICAgICAgICAgIC8vIGlmIHRoZXkgd2VyZSBhZGRlZCBiYWNrLCB3ZSBkb24ndCBhY3R1YWxseSBkZXN0cm95IHRoZW0uXG4gICAgICAgICAgbGV0IGNvbXBsZXRlbHlEZXN0cm95Q0lEcyA9IHdpbGxEZXN0cm95Q0lEcy5maWx0ZXIoY2lkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIGNpZCkubGVuZ3RoID09PSAwXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGlmKGNvbXBsZXRlbHlEZXN0cm95Q0lEcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIHRoaXMucHVzaFdpdGhSZXBseShudWxsLCBcImNpZHNfZGVzdHJveWVkXCIsIHtjaWRzOiBjb21wbGV0ZWx5RGVzdHJveUNJRHN9KS50aGVuKCh7cmVzcH0pID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlZC5wcnVuZUNJRHMocmVzcC5jaWRzKVxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiBsb2dFcnJvcihcIkZhaWxlZCB0byBwdXNoIGNvbXBvbmVudHMgZGVzdHJveWVkXCIsIGVycm9yKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IGxvZ0Vycm9yKFwiRmFpbGVkIHRvIHB1c2ggY29tcG9uZW50cyBkZXN0cm95ZWRcIiwgZXJyb3IpKVxuICAgIH1cbiAgfVxuXG4gIG93bnNFbGVtZW50KGVsKXtcbiAgICBsZXQgcGFyZW50Vmlld0VsID0gZWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUilcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpID09PSB0aGlzLmlkIHx8XG4gICAgICAocGFyZW50Vmlld0VsICYmIHBhcmVudFZpZXdFbC5pZCA9PT0gdGhpcy5pZCkgfHxcbiAgICAgICghcGFyZW50Vmlld0VsICYmIHRoaXMuaXNEZWFkKVxuICB9XG5cbiAgc3VibWl0Rm9ybShmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBzdWJtaXR0ZXIsIG9wdHMgPSB7fSl7XG4gICAgRE9NLnB1dFByaXZhdGUoZm9ybSwgUEhYX0hBU19TVUJNSVRURUQsIHRydWUpXG4gICAgY29uc3QgaW5wdXRzID0gQXJyYXkuZnJvbShmb3JtLmVsZW1lbnRzKVxuICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IERPTS5wdXRQcml2YXRlKGlucHV0LCBQSFhfSEFTX1NVQk1JVFRFRCwgdHJ1ZSkpXG4gICAgdGhpcy5saXZlU29ja2V0LmJsdXJBY3RpdmVFbGVtZW50KHRoaXMpXG4gICAgdGhpcy5wdXNoRm9ybVN1Ym1pdChmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBzdWJtaXR0ZXIsIG9wdHMsICgpID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXN0b3JlUHJldmlvdXNseUFjdGl2ZUZvY3VzKClcbiAgICB9KVxuICB9XG5cbiAgYmluZGluZyhraW5kKXsgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKGtpbmQpIH1cbn1cbiIsICIvKiogSW5pdGlhbGl6ZXMgdGhlIExpdmVTb2NrZXRcbiAqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVuZFBvaW50IC0gVGhlIHN0cmluZyBXZWJTb2NrZXQgZW5kcG9pbnQsIGllLCBgXCJ3c3M6Ly9leGFtcGxlLmNvbS9saXZlXCJgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIi9saXZlXCJgIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICogQHBhcmFtIHtQaG9lbml4LlNvY2tldH0gc29ja2V0IC0gdGhlIHJlcXVpcmVkIFBob2VuaXggU29ja2V0IGNsYXNzIGltcG9ydGVkIGZyb20gXCJwaG9lbml4XCIuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICBpbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuICogICAgIGltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbiAqICAgICBsZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7Li4ufSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbi4gT3V0c2lkZSBvZiBrZXlzIGxpc3RlZCBiZWxvdywgYWxsXG4gKiBjb25maWd1cmF0aW9uIGlzIHBhc3NlZCBkaXJlY3RseSB0byB0aGUgUGhvZW5peCBTb2NrZXQgY29uc3RydWN0b3IuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuZGVmYXVsdHNdIC0gVGhlIG9wdGlvbmFsIGRlZmF1bHRzIHRvIHVzZSBmb3IgdmFyaW91cyBiaW5kaW5ncyxcbiAqIHN1Y2ggYXMgYHBoeC1kZWJvdW5jZWAuIFN1cHBvcnRzIHRoZSBmb2xsb3dpbmcga2V5czpcbiAqXG4gKiAgIC0gZGVib3VuY2UgLSB0aGUgbWlsbGlzZWNvbmQgcGh4LWRlYm91bmNlIHRpbWUuIERlZmF1bHRzIDMwMFxuICogICAtIHRocm90dGxlIC0gdGhlIG1pbGxpc2Vjb25kIHBoeC10aHJvdHRsZSB0aW1lLiBEZWZhdWx0cyAzMDBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5wYXJhbXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBwYXNzaW5nIGNvbm5lY3QgcGFyYW1zLlxuICogVGhlIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIExpdmVWaWV3LiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgKGVsKSA9PiB7dmlldzogZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1teS12aWV3LW5hbWVcIiwgdG9rZW46IHdpbmRvdy5teVRva2VufVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5iaW5kaW5nUHJlZml4XSAtIFRoZSBvcHRpb25hbCBwcmVmaXggdG8gdXNlIGZvciBhbGwgcGh4IERPTSBhbm5vdGF0aW9ucy5cbiAqIERlZmF1bHRzIHRvIFwicGh4LVwiLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmhvb2tzXSAtIFRoZSBvcHRpb25hbCBvYmplY3QgZm9yIHJlZmVyZW5jaW5nIExpdmVWaWV3IGhvb2sgY2FsbGJhY2tzLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnVwbG9hZGVyc10gLSBUaGUgb3B0aW9uYWwgb2JqZWN0IGZvciByZWZlcmVuY2luZyBMaXZlVmlldyB1cGxvYWRlciBjYWxsYmFja3MuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLmxvYWRlclRpbWVvdXRdIC0gVGhlIG9wdGlvbmFsIGRlbGF5IGluIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBhcHBseVxuICogbG9hZGluZyBzdGF0ZXMuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLmRpc2Nvbm5lY3RlZFRpbWVvdXRdIC0gVGhlIGRlbGF5IGluIG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZVxuICogZXhlY3V0aW5nIHBoeC1kaXNjb25uZWN0ZWQgY29tbWFuZHMuIERlZmF1bHRzIHRvIDUwMC5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMubWF4UmVsb2Fkc10gLSBUaGUgbWF4aW11bSByZWxvYWRzIGJlZm9yZSBlbnRlcmluZyBmYWlsc2FmZSBtb2RlLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5yZWxvYWRKaXR0ZXJNaW5dIC0gVGhlIG1pbmltdW0gdGltZSBiZXR3ZWVuIG5vcm1hbCByZWxvYWQgYXR0ZW1wdHMuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLnJlbG9hZEppdHRlck1heF0gLSBUaGUgbWF4aW11bSB0aW1lIGJldHdlZW4gbm9ybWFsIHJlbG9hZCBhdHRlbXB0cy5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMuZmFpbHNhZmVKaXR0ZXJdIC0gVGhlIHRpbWUgYmV0d2VlbiByZWxvYWQgYXR0ZW1wdHMgaW4gZmFpbHNhZmUgbW9kZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnZpZXdMb2dnZXJdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGxvZyBkZWJ1ZyBpbmZvcm1hdGlvbi4gRm9yIGV4YW1wbGU6XG4gKlxuICogICAgICh2aWV3LCBraW5kLCBtc2csIG9iaikgPT4gY29uc29sZS5sb2coYCR7dmlldy5pZH0gJHtraW5kfTogJHttc2d9IC0gYCwgb2JqKVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5tZXRhZGF0YV0gLSBUaGUgb3B0aW9uYWwgb2JqZWN0IG1hcHBpbmcgZXZlbnQgbmFtZXMgdG8gZnVuY3Rpb25zIGZvclxuICogcG9wdWxhdGluZyBldmVudCBtZXRhZGF0YS4gRm9yIGV4YW1wbGU6XG4gKlxuICogICAgIG1ldGFkYXRhOiB7XG4gKiAgICAgICBjbGljazogKGUsIGVsKSA9PiB7XG4gKiAgICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgICAgY3RybEtleTogZS5jdHJsS2V5LFxuICogICAgICAgICAgIG1ldGFLZXk6IGUubWV0YUtleSxcbiAqICAgICAgICAgICBkZXRhaWw6IGUuZGV0YWlsIHx8IDEsXG4gKiAgICAgICAgIH1cbiAqICAgICAgIH0sXG4gKiAgICAgICBrZXlkb3duOiAoZSwgZWwpID0+IHtcbiAqICAgICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAgICBrZXk6IGUua2V5LFxuICogICAgICAgICAgIGN0cmxLZXk6IGUuY3RybEtleSxcbiAqICAgICAgICAgICBtZXRhS2V5OiBlLm1ldGFLZXksXG4gKiAgICAgICAgICAgc2hpZnRLZXk6IGUuc2hpZnRLZXlcbiAqICAgICAgICAgfVxuICogICAgICAgfVxuICogICAgIH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5zZXNzaW9uU3RvcmFnZV0gLSBBbiBvcHRpb25hbCBTdG9yYWdlIGNvbXBhdGlibGUgb2JqZWN0XG4gKiBVc2VmdWwgd2hlbiBMaXZlVmlldyB3b24ndCBoYXZlIGFjY2VzcyB0byBgc2Vzc2lvblN0b3JhZ2VgLiAgRm9yIGV4YW1wbGUsIFRoaXMgY291bGRcbiAqIGhhcHBlbiBpZiBhIHNpdGUgbG9hZHMgYSBjcm9zcy1kb21haW4gTGl2ZVZpZXcgaW4gYW4gaWZyYW1lLiAgRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiAgICAgY2xhc3MgSW5NZW1vcnlTdG9yYWdlIHtcbiAqICAgICAgIGNvbnN0cnVjdG9yKCkgeyB0aGlzLnN0b3JhZ2UgPSB7fSB9XG4gKiAgICAgICBnZXRJdGVtKGtleU5hbWUpIHsgcmV0dXJuIHRoaXMuc3RvcmFnZVtrZXlOYW1lXSB8fCBudWxsIH1cbiAqICAgICAgIHJlbW92ZUl0ZW0oa2V5TmFtZSkgeyBkZWxldGUgdGhpcy5zdG9yYWdlW2tleU5hbWVdIH1cbiAqICAgICAgIHNldEl0ZW0oa2V5TmFtZSwga2V5VmFsdWUpIHsgdGhpcy5zdG9yYWdlW2tleU5hbWVdID0ga2V5VmFsdWUgfVxuICogICAgIH1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMubG9jYWxTdG9yYWdlXSAtIEFuIG9wdGlvbmFsIFN0b3JhZ2UgY29tcGF0aWJsZSBvYmplY3RcbiAqIFVzZWZ1bCBmb3Igd2hlbiBMaXZlVmlldyB3b24ndCBoYXZlIGFjY2VzcyB0byBgbG9jYWxTdG9yYWdlYC5cbiAqIFNlZSBgb3B0cy5zZXNzaW9uU3RvcmFnZWAgZm9yIGV4YW1wbGVzLlxuKi9cblxuaW1wb3J0IHtcbiAgQklORElOR19QUkVGSVgsXG4gIENPTlNFQ1VUSVZFX1JFTE9BRFMsXG4gIERFRkFVTFRTLFxuICBGQUlMU0FGRV9KSVRURVIsXG4gIExPQURFUl9USU1FT1VULFxuICBESVNDT05ORUNURURfVElNRU9VVCxcbiAgTUFYX1JFTE9BRFMsXG4gIFBIWF9ERUJPVU5DRSxcbiAgUEhYX0RST1BfVEFSR0VULFxuICBQSFhfSEFTX0ZPQ1VTRUQsXG4gIFBIWF9LRVksXG4gIFBIWF9MSU5LX1NUQVRFLFxuICBQSFhfTElWRV9MSU5LLFxuICBQSFhfTFZfREVCVUcsXG4gIFBIWF9MVl9MQVRFTkNZX1NJTSxcbiAgUEhYX0xWX1BST0ZJTEUsXG4gIFBIWF9MVl9ISVNUT1JZX1BPU0lUSU9OLFxuICBQSFhfTUFJTixcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBIWF9ST09UX0lELFxuICBQSFhfVEhST1RUTEUsXG4gIFBIWF9UUkFDS19VUExPQURTLFxuICBQSFhfU0VTU0lPTixcbiAgUkVMT0FEX0pJVFRFUl9NSU4sXG4gIFJFTE9BRF9KSVRURVJfTUFYLFxuICBQSFhfUkVGX1NSQyxcbiAgUEhYX1JFTE9BRF9TVEFUVVNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvbmUsXG4gIGNsb3Nlc3RQaHhCaW5kaW5nLFxuICBjbG9zdXJlLFxuICBkZWJ1ZyxcbiAgbWF5YmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgQnJvd3NlciBmcm9tIFwiLi9icm93c2VyXCJcbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBIb29rcyBmcm9tIFwiLi9ob29rc1wiXG5pbXBvcnQgTGl2ZVVwbG9hZGVyIGZyb20gXCIuL2xpdmVfdXBsb2FkZXJcIlxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlld1wiXG5pbXBvcnQgSlMgZnJvbSBcIi4vanNcIlxuXG5leHBvcnQgbGV0IGlzVXNlZElucHV0ID0gKGVsKSA9PiBET00uaXNVc2VkSW5wdXQoZWwpXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpdmVTb2NrZXQge1xuICBjb25zdHJ1Y3Rvcih1cmwsIHBoeFNvY2tldCwgb3B0cyA9IHt9KXtcbiAgICB0aGlzLnVubG9hZGVkID0gZmFsc2VcbiAgICBpZighcGh4U29ja2V0IHx8IHBoeFNvY2tldC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICBhIHBob2VuaXggU29ja2V0IG11c3QgYmUgcHJvdmlkZWQgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byB0aGUgTGl2ZVNvY2tldCBjb25zdHJ1Y3Rvci4gRm9yIGV4YW1wbGU6XG5cbiAgICAgICAgICBpbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuICAgICAgICAgIGltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbiAgICAgICAgICBsZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7Li4ufSlcbiAgICAgIGApXG4gICAgfVxuICAgIHRoaXMuc29ja2V0ID0gbmV3IHBoeFNvY2tldCh1cmwsIG9wdHMpXG4gICAgdGhpcy5iaW5kaW5nUHJlZml4ID0gb3B0cy5iaW5kaW5nUHJlZml4IHx8IEJJTkRJTkdfUFJFRklYXG4gICAgdGhpcy5vcHRzID0gb3B0c1xuICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShvcHRzLnBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLnZpZXdMb2dnZXIgPSBvcHRzLnZpZXdMb2dnZXJcbiAgICB0aGlzLm1ldGFkYXRhQ2FsbGJhY2tzID0gb3B0cy5tZXRhZGF0YSB8fCB7fVxuICAgIHRoaXMuZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKGNsb25lKERFRkFVTFRTKSwgb3B0cy5kZWZhdWx0cyB8fCB7fSlcbiAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5wcmV2QWN0aXZlID0gbnVsbFxuICAgIHRoaXMuc2lsZW5jZWQgPSBmYWxzZVxuICAgIHRoaXMubWFpbiA9IG51bGxcbiAgICB0aGlzLm91dGdvaW5nTWFpbkVsID0gbnVsbFxuICAgIHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgPSBudWxsXG4gICAgdGhpcy5saW5rUmVmID0gMVxuICAgIHRoaXMucm9vdHMgPSB7fVxuICAgIHRoaXMuaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgdGhpcy5wZW5kaW5nTGluayA9IG51bGxcbiAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGNsb25lKHdpbmRvdy5sb2NhdGlvbilcbiAgICB0aGlzLmhvb2tzID0gb3B0cy5ob29rcyB8fCB7fVxuICAgIHRoaXMudXBsb2FkZXJzID0gb3B0cy51cGxvYWRlcnMgfHwge31cbiAgICB0aGlzLmxvYWRlclRpbWVvdXQgPSBvcHRzLmxvYWRlclRpbWVvdXQgfHwgTE9BREVSX1RJTUVPVVRcbiAgICB0aGlzLmRpc2Nvbm5lY3RlZFRpbWVvdXQgPSBvcHRzLmRpc2Nvbm5lY3RlZFRpbWVvdXQgfHwgRElTQ09OTkVDVEVEX1RJTUVPVVRcbiAgICB0aGlzLnJlbG9hZFdpdGhKaXR0ZXJUaW1lciA9IG51bGxcbiAgICB0aGlzLm1heFJlbG9hZHMgPSBvcHRzLm1heFJlbG9hZHMgfHwgTUFYX1JFTE9BRFNcbiAgICB0aGlzLnJlbG9hZEppdHRlck1pbiA9IG9wdHMucmVsb2FkSml0dGVyTWluIHx8IFJFTE9BRF9KSVRURVJfTUlOXG4gICAgdGhpcy5yZWxvYWRKaXR0ZXJNYXggPSBvcHRzLnJlbG9hZEppdHRlck1heCB8fCBSRUxPQURfSklUVEVSX01BWFxuICAgIHRoaXMuZmFpbHNhZmVKaXR0ZXIgPSBvcHRzLmZhaWxzYWZlSml0dGVyIHx8IEZBSUxTQUZFX0pJVFRFUlxuICAgIHRoaXMubG9jYWxTdG9yYWdlID0gb3B0cy5sb2NhbFN0b3JhZ2UgfHwgd2luZG93LmxvY2FsU3RvcmFnZVxuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2UgPSBvcHRzLnNlc3Npb25TdG9yYWdlIHx8IHdpbmRvdy5zZXNzaW9uU3RvcmFnZVxuICAgIHRoaXMuYm91bmRUb3BMZXZlbEV2ZW50cyA9IGZhbHNlXG4gICAgdGhpcy5ib3VuZEV2ZW50TmFtZXMgPSBuZXcgU2V0KClcbiAgICB0aGlzLnNlcnZlckNsb3NlUmVmID0gbnVsbFxuICAgIHRoaXMuZG9tQ2FsbGJhY2tzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBqc1F1ZXJ5U2VsZWN0b3JBbGw6IG51bGwsXG4gICAgICBvblBhdGNoU3RhcnQ6IGNsb3N1cmUoKSxcbiAgICAgIG9uUGF0Y2hFbmQ6IGNsb3N1cmUoKSxcbiAgICAgIG9uTm9kZUFkZGVkOiBjbG9zdXJlKCksXG4gICAgICBvbkJlZm9yZUVsVXBkYXRlZDogY2xvc3VyZSgpfSxcbiAgICBvcHRzLmRvbSB8fCB7fSlcbiAgICB0aGlzLnRyYW5zaXRpb25zID0gbmV3IFRyYW5zaXRpb25TZXQoKVxuICAgIHRoaXMuY3VycmVudEhpc3RvcnlQb3NpdGlvbiA9IHBhcnNlSW50KHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfSElTVE9SWV9QT1NJVElPTikpIHx8IDBcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIF9lID0+IHtcbiAgICAgIHRoaXMudW5sb2FkZWQgPSB0cnVlXG4gICAgfSlcbiAgICB0aGlzLnNvY2tldC5vbk9wZW4oKCkgPT4ge1xuICAgICAgaWYodGhpcy5pc1VubG9hZGVkKCkpe1xuICAgICAgICAvLyByZWxvYWQgcGFnZSBpZiBiZWluZyByZXN0b3JlZCBmcm9tIGJhY2svZm9yd2FyZCBjYWNoZSBhbmQgYnJvd3NlciBkb2VzIG5vdCBlbWl0IFwicGFnZXNob3dcIlxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8gcHVibGljXG5cbiAgdmVyc2lvbigpeyByZXR1cm4gTFZfVlNOIH1cblxuICBpc1Byb2ZpbGVFbmFibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX1BST0ZJTEUpID09PSBcInRydWVcIiB9XG5cbiAgaXNEZWJ1Z0VuYWJsZWQoKXsgcmV0dXJuIHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfREVCVUcpID09PSBcInRydWVcIiB9XG5cbiAgaXNEZWJ1Z0Rpc2FibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX0RFQlVHKSA9PT0gXCJmYWxzZVwiIH1cblxuICBlbmFibGVEZWJ1ZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX0RFQlVHLCBcInRydWVcIikgfVxuXG4gIGVuYWJsZVByb2ZpbGluZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX1BST0ZJTEUsIFwidHJ1ZVwiKSB9XG5cbiAgZGlzYWJsZURlYnVnKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfREVCVUcsIFwiZmFsc2VcIikgfVxuXG4gIGRpc2FibGVQcm9maWxpbmcoKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFBIWF9MVl9QUk9GSUxFKSB9XG5cbiAgZW5hYmxlTGF0ZW5jeVNpbSh1cHBlckJvdW5kTXMpe1xuICAgIHRoaXMuZW5hYmxlRGVidWcoKVxuICAgIGNvbnNvbGUubG9nKFwibGF0ZW5jeSBzaW11bGF0b3IgZW5hYmxlZCBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoaXMgYnJvd3NlciBzZXNzaW9uLiBDYWxsIGRpc2FibGVMYXRlbmN5U2ltKCkgdG8gZGlzYWJsZVwiKVxuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0sIHVwcGVyQm91bmRNcylcbiAgfVxuXG4gIGRpc2FibGVMYXRlbmN5U2ltKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShQSFhfTFZfTEFURU5DWV9TSU0pIH1cblxuICBnZXRMYXRlbmN5U2ltKCl7XG4gICAgbGV0IHN0ciA9IHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0pXG4gICAgcmV0dXJuIHN0ciA/IHBhcnNlSW50KHN0cikgOiBudWxsXG4gIH1cblxuICBnZXRTb2NrZXQoKXsgcmV0dXJuIHRoaXMuc29ja2V0IH1cblxuICBjb25uZWN0KCl7XG4gICAgLy8gZW5hYmxlIGRlYnVnIGJ5IGRlZmF1bHQgaWYgb24gbG9jYWxob3N0IGFuZCBub3QgZXhwbGljaXRseSBkaXNhYmxlZFxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIiAmJiAhdGhpcy5pc0RlYnVnRGlzYWJsZWQoKSl7IHRoaXMuZW5hYmxlRGVidWcoKSB9XG4gICAgbGV0IGRvQ29ubmVjdCA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVzZXRSZWxvYWRTdGF0dXMoKVxuICAgICAgaWYodGhpcy5qb2luUm9vdFZpZXdzKCkpe1xuICAgICAgICB0aGlzLmJpbmRUb3BMZXZlbEV2ZW50cygpXG4gICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3QoKVxuICAgICAgfSBlbHNlIGlmKHRoaXMubWFpbil7XG4gICAgICAgIHRoaXMuc29ja2V0LmNvbm5lY3QoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5iaW5kVG9wTGV2ZWxFdmVudHMoe2RlYWQ6IHRydWV9KVxuICAgICAgfVxuICAgICAgdGhpcy5qb2luRGVhZFZpZXcoKVxuICAgIH1cbiAgICBpZihbXCJjb21wbGV0ZVwiLCBcImxvYWRlZFwiLCBcImludGVyYWN0aXZlXCJdLmluZGV4T2YoZG9jdW1lbnQucmVhZHlTdGF0ZSkgPj0gMCl7XG4gICAgICBkb0Nvbm5lY3QoKVxuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiBkb0Nvbm5lY3QoKSlcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0KGNhbGxiYWNrKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIpXG4gICAgLy8gcmVtb3ZlIHRoZSBzb2NrZXQgY2xvc2UgbGlzdGVuZXIgdG8gYXZvaWQgdHJ5aW5nIHRvIGhhbmRsZVxuICAgIC8vIGEgc2VydmVyIGNsb3NlIGV2ZW50IHdoZW4gaXQgaXMgYWN0dWFsbHkgY2F1c2VkIGJ5IHVzIGRpc2Nvbm5lY3RpbmdcbiAgICBpZih0aGlzLnNlcnZlckNsb3NlUmVmKXtcbiAgICAgIHRoaXMuc29ja2V0Lm9mZih0aGlzLnNlcnZlckNsb3NlUmVmKVxuICAgICAgdGhpcy5zZXJ2ZXJDbG9zZVJlZiA9IG51bGxcbiAgICB9XG4gICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdChjYWxsYmFjaylcbiAgfVxuXG4gIHJlcGxhY2VUcmFuc3BvcnQodHJhbnNwb3J0KXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIpXG4gICAgdGhpcy5zb2NrZXQucmVwbGFjZVRyYW5zcG9ydCh0cmFuc3BvcnQpXG4gICAgdGhpcy5jb25uZWN0KClcbiAgfVxuXG4gIGV4ZWNKUyhlbCwgZW5jb2RlZEpTLCBldmVudFR5cGUgPSBudWxsKXtcbiAgICBsZXQgZSA9IG5ldyBDdXN0b21FdmVudChcInBoeDpleGVjXCIsIHtkZXRhaWw6IHtzb3VyY2VFbGVtZW50OiBlbH19KVxuICAgIHRoaXMub3duZXIoZWwsIHZpZXcgPT4gSlMuZXhlYyhlLCBldmVudFR5cGUsIGVuY29kZWRKUywgdmlldywgZWwpKVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIGV4ZWNKU0hvb2tQdXNoKGVsLCBwaHhFdmVudCwgZGF0YSwgY2FsbGJhY2spe1xuICAgIHRoaXMud2l0aGluT3duZXJzKGVsLCB2aWV3ID0+IHtcbiAgICAgIGxldCBlID0gbmV3IEN1c3RvbUV2ZW50KFwicGh4OmV4ZWNcIiwge2RldGFpbDoge3NvdXJjZUVsZW1lbnQ6IGVsfX0pXG4gICAgICBKUy5leGVjKGUsIFwiaG9va1wiLCBwaHhFdmVudCwgdmlldywgZWwsIFtcInB1c2hcIiwge2RhdGEsIGNhbGxiYWNrfV0pXG4gICAgfSlcbiAgfVxuXG4gIHVubG9hZCgpe1xuICAgIGlmKHRoaXMudW5sb2FkZWQpeyByZXR1cm4gfVxuICAgIGlmKHRoaXMubWFpbiAmJiB0aGlzLmlzQ29ubmVjdGVkKCkpeyB0aGlzLmxvZyh0aGlzLm1haW4sIFwic29ja2V0XCIsICgpID0+IFtcImRpc2Nvbm5lY3QgZm9yIHBhZ2UgbmF2XCJdKSB9XG4gICAgdGhpcy51bmxvYWRlZCA9IHRydWVcbiAgICB0aGlzLmRlc3Ryb3lBbGxWaWV3cygpXG4gICAgdGhpcy5kaXNjb25uZWN0KClcbiAgfVxuXG4gIHRyaWdnZXJET00oa2luZCwgYXJncyl7IHRoaXMuZG9tQ2FsbGJhY2tzW2tpbmRdKC4uLmFyZ3MpIH1cblxuICB0aW1lKG5hbWUsIGZ1bmMpe1xuICAgIGlmKCF0aGlzLmlzUHJvZmlsZUVuYWJsZWQoKSB8fCAhY29uc29sZS50aW1lKXsgcmV0dXJuIGZ1bmMoKSB9XG4gICAgY29uc29sZS50aW1lKG5hbWUpXG4gICAgbGV0IHJlc3VsdCA9IGZ1bmMoKVxuICAgIGNvbnNvbGUudGltZUVuZChuYW1lKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGxvZyh2aWV3LCBraW5kLCBtc2dDYWxsYmFjayl7XG4gICAgaWYodGhpcy52aWV3TG9nZ2VyKXtcbiAgICAgIGxldCBbbXNnLCBvYmpdID0gbXNnQ2FsbGJhY2soKVxuICAgICAgdGhpcy52aWV3TG9nZ2VyKHZpZXcsIGtpbmQsIG1zZywgb2JqKVxuICAgIH0gZWxzZSBpZih0aGlzLmlzRGVidWdFbmFibGVkKCkpe1xuICAgICAgbGV0IFttc2csIG9ial0gPSBtc2dDYWxsYmFjaygpXG4gICAgICBkZWJ1Zyh2aWV3LCBraW5kLCBtc2csIG9iailcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0RE9NVXBkYXRlKGNhbGxiYWNrKXtcbiAgICB0aGlzLnRyYW5zaXRpb25zLmFmdGVyKGNhbGxiYWNrKVxuICB9XG5cbiAgdHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUgPSBmdW5jdGlvbigpe30pe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuYWRkVHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gIH1cblxuICBvbkNoYW5uZWwoY2hhbm5lbCwgZXZlbnQsIGNiKXtcbiAgICBjaGFubmVsLm9uKGV2ZW50LCBkYXRhID0+IHtcbiAgICAgIGxldCBsYXRlbmN5ID0gdGhpcy5nZXRMYXRlbmN5U2ltKClcbiAgICAgIGlmKCFsYXRlbmN5KXtcbiAgICAgICAgY2IoZGF0YSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2IoZGF0YSksIGxhdGVuY3kpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJlbG9hZFdpdGhKaXR0ZXIodmlldywgbG9nKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZWxvYWRXaXRoSml0dGVyVGltZXIpXG4gICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICBsZXQgbWluTXMgPSB0aGlzLnJlbG9hZEppdHRlck1pblxuICAgIGxldCBtYXhNcyA9IHRoaXMucmVsb2FkSml0dGVyTWF4XG4gICAgbGV0IGFmdGVyTXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4TXMgLSBtaW5NcyArIDEpKSArIG1pbk1zXG4gICAgbGV0IHRyaWVzID0gQnJvd3Nlci51cGRhdGVMb2NhbCh0aGlzLmxvY2FsU3RvcmFnZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBDT05TRUNVVElWRV9SRUxPQURTLCAwLCBjb3VudCA9PiBjb3VudCArIDEpXG4gICAgaWYodHJpZXMgPj0gdGhpcy5tYXhSZWxvYWRzKXtcbiAgICAgIGFmdGVyTXMgPSB0aGlzLmZhaWxzYWZlSml0dGVyXG4gICAgfVxuICAgIHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBpZiB2aWV3IGhhcyByZWNvdmVyZWQsIHN1Y2ggYXMgdHJhbnNwb3J0IHJlcGxhY2VkLCB0aGVuIGNhbmNlbFxuICAgICAgaWYodmlldy5pc0Rlc3Ryb3llZCgpIHx8IHZpZXcuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgICB2aWV3LmRlc3Ryb3koKVxuICAgICAgbG9nID8gbG9nKCkgOiB0aGlzLmxvZyh2aWV3LCBcImpvaW5cIiwgKCkgPT4gW2BlbmNvdW50ZXJlZCAke3RyaWVzfSBjb25zZWN1dGl2ZSByZWxvYWRzYF0pXG4gICAgICBpZih0cmllcyA+PSB0aGlzLm1heFJlbG9hZHMpe1xuICAgICAgICB0aGlzLmxvZyh2aWV3LCBcImpvaW5cIiwgKCkgPT4gW2BleGNlZWRlZCAke3RoaXMubWF4UmVsb2Fkc30gY29uc2VjdXRpdmUgcmVsb2Fkcy4gRW50ZXJpbmcgZmFpbHNhZmUgbW9kZWBdKVxuICAgICAgfVxuICAgICAgaWYodGhpcy5oYXNQZW5kaW5nTGluaygpKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gdGhpcy5wZW5kaW5nTGlua1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICB9XG4gICAgfSwgYWZ0ZXJNcylcbiAgfVxuXG4gIGdldEhvb2tDYWxsYmFja3MobmFtZSl7XG4gICAgcmV0dXJuIG5hbWUgJiYgbmFtZS5zdGFydHNXaXRoKFwiUGhvZW5peC5cIikgPyBIb29rc1tuYW1lLnNwbGl0KFwiLlwiKVsxXV0gOiB0aGlzLmhvb2tzW25hbWVdXG4gIH1cblxuICBpc1VubG9hZGVkKCl7IHJldHVybiB0aGlzLnVubG9hZGVkIH1cblxuICBpc0Nvbm5lY3RlZCgpeyByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSB9XG5cbiAgZ2V0QmluZGluZ1ByZWZpeCgpeyByZXR1cm4gdGhpcy5iaW5kaW5nUHJlZml4IH1cblxuICBiaW5kaW5nKGtpbmQpeyByZXR1cm4gYCR7dGhpcy5nZXRCaW5kaW5nUHJlZml4KCl9JHtraW5kfWAgfVxuXG4gIGNoYW5uZWwodG9waWMsIHBhcmFtcyl7IHJldHVybiB0aGlzLnNvY2tldC5jaGFubmVsKHRvcGljLCBwYXJhbXMpIH1cblxuICBqb2luRGVhZFZpZXcoKXtcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHlcbiAgICBpZihib2R5ICYmICF0aGlzLmlzUGh4Vmlldyhib2R5KSAmJiAhdGhpcy5pc1BoeFZpZXcoZG9jdW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpKXtcbiAgICAgIGxldCB2aWV3ID0gdGhpcy5uZXdSb290Vmlldyhib2R5KVxuICAgICAgdmlldy5zZXRIcmVmKHRoaXMuZ2V0SHJlZigpKVxuICAgICAgdmlldy5qb2luRGVhZCgpXG4gICAgICBpZighdGhpcy5tYWluKXsgdGhpcy5tYWluID0gdmlldyB9XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgdmlldy5leGVjTmV3TW91bnRlZCgpXG4gICAgICAgIC8vIHJlc3RvcmUgc2Nyb2xsIHBvc2l0aW9uIHdoZW4gbmF2aWdhdGluZyBmcm9tIGFuIGV4dGVybmFsIC8gbm9uLWxpdmUgcGFnZVxuICAgICAgICB0aGlzLm1heWJlU2Nyb2xsKGhpc3Rvcnkuc3RhdGU/LnNjcm9sbClcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgam9pblJvb3RWaWV3cygpe1xuICAgIGxldCByb290c0ZvdW5kID0gZmFsc2VcbiAgICBET00uYWxsKGRvY3VtZW50LCBgJHtQSFhfVklFV19TRUxFQ1RPUn06bm90KFske1BIWF9QQVJFTlRfSUR9XSlgLCByb290RWwgPT4ge1xuICAgICAgaWYoIXRoaXMuZ2V0Um9vdEJ5SWQocm9vdEVsLmlkKSl7XG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5uZXdSb290Vmlldyhyb290RWwpXG4gICAgICAgIC8vIHN0aWNraWVzIGNhbm5vdCBiZSBtb3VudGVkIGF0IHRoZSByb3V0ZXIgYW5kIHRoZXJlZm9yZSBzaG91bGQgbm90XG4gICAgICAgIC8vIGdldCBhIGhyZWYgc2V0IG9uIHRoZW1cbiAgICAgICAgaWYoIURPTS5pc1BoeFN0aWNreShyb290RWwpKXsgdmlldy5zZXRIcmVmKHRoaXMuZ2V0SHJlZigpKSB9XG4gICAgICAgIHZpZXcuam9pbigpXG4gICAgICAgIGlmKHJvb3RFbC5oYXNBdHRyaWJ1dGUoUEhYX01BSU4pKXsgdGhpcy5tYWluID0gdmlldyB9XG4gICAgICB9XG4gICAgICByb290c0ZvdW5kID0gdHJ1ZVxuICAgIH0pXG4gICAgcmV0dXJuIHJvb3RzRm91bmRcbiAgfVxuXG4gIHJlZGlyZWN0KHRvLCBmbGFzaCwgcmVsb2FkVG9rZW4pe1xuICAgIGlmKHJlbG9hZFRva2VuKXsgQnJvd3Nlci5zZXRDb29raWUoUEhYX1JFTE9BRF9TVEFUVVMsIHJlbG9hZFRva2VuLCA2MCkgfVxuICAgIHRoaXMudW5sb2FkKClcbiAgICBCcm93c2VyLnJlZGlyZWN0KHRvLCBmbGFzaClcbiAgfVxuXG4gIHJlcGxhY2VNYWluKGhyZWYsIGZsYXNoLCBjYWxsYmFjayA9IG51bGwsIGxpbmtSZWYgPSB0aGlzLnNldFBlbmRpbmdMaW5rKGhyZWYpKXtcbiAgICBjb25zdCBsaXZlUmVmZXJlciA9IHRoaXMuY3VycmVudExvY2F0aW9uLmhyZWZcbiAgICB0aGlzLm91dGdvaW5nTWFpbkVsID0gdGhpcy5vdXRnb2luZ01haW5FbCB8fCB0aGlzLm1haW4uZWxcblxuICAgIGNvbnN0IHN0aWNraWVzID0gRE9NLmZpbmRQaHhTdGlja3koZG9jdW1lbnQpIHx8IFtdXG4gICAgY29uc3QgcmVtb3ZlRWxzID0gRE9NLmFsbCh0aGlzLm91dGdvaW5nTWFpbkVsLCBgWyR7dGhpcy5iaW5kaW5nKFwicmVtb3ZlXCIpfV1gKVxuICAgICAgLmZpbHRlcihlbCA9PiAhRE9NLmlzQ2hpbGRPZkFueShlbCwgc3RpY2tpZXMpKVxuXG4gICAgY29uc3QgbmV3TWFpbkVsID0gRE9NLmNsb25lTm9kZSh0aGlzLm91dGdvaW5nTWFpbkVsLCBcIlwiKVxuICAgIHRoaXMubWFpbi5zaG93TG9hZGVyKHRoaXMubG9hZGVyVGltZW91dClcbiAgICB0aGlzLm1haW4uZGVzdHJveSgpXG5cbiAgICB0aGlzLm1haW4gPSB0aGlzLm5ld1Jvb3RWaWV3KG5ld01haW5FbCwgZmxhc2gsIGxpdmVSZWZlcmVyKVxuICAgIHRoaXMubWFpbi5zZXRSZWRpcmVjdChocmVmKVxuICAgIHRoaXMudHJhbnNpdGlvblJlbW92ZXMocmVtb3ZlRWxzKVxuICAgIHRoaXMubWFpbi5qb2luKChqb2luQ291bnQsIG9uRG9uZSkgPT4ge1xuICAgICAgaWYoam9pbkNvdW50ID09PSAxICYmIHRoaXMuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpe1xuICAgICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgIC8vIHJlbW92ZSBwaHgtcmVtb3ZlIGVscyByaWdodCBiZWZvcmUgd2UgcmVwbGFjZSB0aGUgbWFpbiBlbGVtZW50XG4gICAgICAgICAgcmVtb3ZlRWxzLmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpXG4gICAgICAgICAgc3RpY2tpZXMuZm9yRWFjaChlbCA9PiBuZXdNYWluRWwuYXBwZW5kQ2hpbGQoZWwpKVxuICAgICAgICAgIHRoaXMub3V0Z29pbmdNYWluRWwucmVwbGFjZVdpdGgobmV3TWFpbkVsKVxuICAgICAgICAgIHRoaXMub3V0Z29pbmdNYWluRWwgPSBudWxsXG4gICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobGlua1JlZilcbiAgICAgICAgICBvbkRvbmUoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB0cmFuc2l0aW9uUmVtb3ZlcyhlbGVtZW50cywgY2FsbGJhY2spe1xuICAgIGxldCByZW1vdmVBdHRyID0gdGhpcy5iaW5kaW5nKFwicmVtb3ZlXCIpXG4gICAgbGV0IHNpbGVuY2VFdmVudHMgPSAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpXG4gICAgfVxuICAgIGVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgLy8gcHJldmVudCBhbGwgbGlzdGVuZXJzIHdlIGNhcmUgYWJvdXQgZnJvbSBidWJibGluZyB0byB3aW5kb3dcbiAgICAgIC8vIHNpbmNlIHdlIGFyZSByZW1vdmluZyB0aGUgZWxlbWVudFxuICAgICAgZm9yKGxldCBldmVudCBvZiB0aGlzLmJvdW5kRXZlbnROYW1lcyl7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHNpbGVuY2VFdmVudHMsIHRydWUpXG4gICAgICB9XG4gICAgICB0aGlzLmV4ZWNKUyhlbCwgZWwuZ2V0QXR0cmlidXRlKHJlbW92ZUF0dHIpLCBcInJlbW92ZVwiKVxuICAgIH0pXG4gICAgLy8gcmVtb3ZlIHRoZSBzaWxlbmNlZCBsaXN0ZW5lcnMgd2hlbiB0cmFuc2l0aW9ucyBhcmUgZG9uZSBpbmNhc2UgdGhlIGVsZW1lbnQgaXMgcmUtdXNlZFxuICAgIC8vIGFuZCBjYWxsIGNhbGxlcidzIGNhbGxiYWNrIGFzIHNvb24gYXMgd2UgYXJlIGRvbmUgd2l0aCB0cmFuc2l0aW9uc1xuICAgIHRoaXMucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB7XG4gICAgICBlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZm9yKGxldCBldmVudCBvZiB0aGlzLmJvdW5kRXZlbnROYW1lcyl7XG4gICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgc2lsZW5jZUV2ZW50cywgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9KVxuICB9XG5cbiAgaXNQaHhWaWV3KGVsKXsgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pICE9PSBudWxsIH1cblxuICBuZXdSb290VmlldyhlbCwgZmxhc2gsIGxpdmVSZWZlcmVyKXtcbiAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCB0aGlzLCBudWxsLCBmbGFzaCwgbGl2ZVJlZmVyZXIpXG4gICAgdGhpcy5yb290c1t2aWV3LmlkXSA9IHZpZXdcbiAgICByZXR1cm4gdmlld1xuICB9XG5cbiAgb3duZXIoY2hpbGRFbCwgY2FsbGJhY2spe1xuICAgIGxldCB2aWV3XG4gICAgY29uc3QgY2xvc2VzdFZpZXdFbCA9IGNoaWxkRWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUilcbiAgICBpZihjbG9zZXN0Vmlld0VsKXtcbiAgICAgIC8vIGl0IGNhbiBoYXBwZW4gdGhhdCB3ZSBmaW5kIGEgdmlldyB0aGF0IGlzIGFscmVhZHkgZGVzdHJveWVkO1xuICAgICAgLy8gaW4gdGhhdCBjYXNlIHdlIERPIE5PVCB3YW50IHRvIGZhbGxiYWNrIHRvIHRoZSBtYWluIGVsZW1lbnRcbiAgICAgIHZpZXcgPSB0aGlzLmdldFZpZXdCeUVsKGNsb3Nlc3RWaWV3RWwpXG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXcgPSB0aGlzLm1haW5cbiAgICB9XG4gICAgcmV0dXJuIHZpZXcgJiYgY2FsbGJhY2sgPyBjYWxsYmFjayh2aWV3KSA6IHZpZXdcbiAgfVxuXG4gIHdpdGhpbk93bmVycyhjaGlsZEVsLCBjYWxsYmFjayl7XG4gICAgdGhpcy5vd25lcihjaGlsZEVsLCB2aWV3ID0+IGNhbGxiYWNrKHZpZXcsIGNoaWxkRWwpKVxuICB9XG5cbiAgZ2V0Vmlld0J5RWwoZWwpe1xuICAgIGxldCByb290SWQgPSBlbC5nZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQpXG4gICAgcmV0dXJuIG1heWJlKHRoaXMuZ2V0Um9vdEJ5SWQocm9vdElkKSwgcm9vdCA9PiByb290LmdldERlc2NlbmRlbnRCeUVsKGVsKSlcbiAgfVxuXG4gIGdldFJvb3RCeUlkKGlkKXsgcmV0dXJuIHRoaXMucm9vdHNbaWRdIH1cblxuICBkZXN0cm95QWxsVmlld3MoKXtcbiAgICBmb3IobGV0IGlkIGluIHRoaXMucm9vdHMpe1xuICAgICAgdGhpcy5yb290c1tpZF0uZGVzdHJveSgpXG4gICAgICBkZWxldGUgdGhpcy5yb290c1tpZF1cbiAgICB9XG4gICAgdGhpcy5tYWluID0gbnVsbFxuICB9XG5cbiAgZGVzdHJveVZpZXdCeUVsKGVsKXtcbiAgICBsZXQgcm9vdCA9IHRoaXMuZ2V0Um9vdEJ5SWQoZWwuZ2V0QXR0cmlidXRlKFBIWF9ST09UX0lEKSlcbiAgICBpZihyb290ICYmIHJvb3QuaWQgPT09IGVsLmlkKXtcbiAgICAgIHJvb3QuZGVzdHJveSgpXG4gICAgICBkZWxldGUgdGhpcy5yb290c1tyb290LmlkXVxuICAgIH0gZWxzZSBpZihyb290KXtcbiAgICAgIHJvb3QuZGVzdHJveURlc2NlbmRlbnQoZWwuaWQpXG4gICAgfVxuICB9XG5cbiAgZ2V0QWN0aXZlRWxlbWVudCgpe1xuICAgIHJldHVybiBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gIH1cblxuICBkcm9wQWN0aXZlRWxlbWVudCh2aWV3KXtcbiAgICBpZih0aGlzLnByZXZBY3RpdmUgJiYgdmlldy5vd25zRWxlbWVudCh0aGlzLnByZXZBY3RpdmUpKXtcbiAgICAgIHRoaXMucHJldkFjdGl2ZSA9IG51bGxcbiAgICB9XG4gIH1cblxuICByZXN0b3JlUHJldmlvdXNseUFjdGl2ZUZvY3VzKCl7XG4gICAgaWYodGhpcy5wcmV2QWN0aXZlICYmIHRoaXMucHJldkFjdGl2ZSAhPT0gZG9jdW1lbnQuYm9keSl7XG4gICAgICB0aGlzLnByZXZBY3RpdmUuZm9jdXMoKVxuICAgIH1cbiAgfVxuXG4gIGJsdXJBY3RpdmVFbGVtZW50KCl7XG4gICAgdGhpcy5wcmV2QWN0aXZlID0gdGhpcy5nZXRBY3RpdmVFbGVtZW50KClcbiAgICBpZih0aGlzLnByZXZBY3RpdmUgIT09IGRvY3VtZW50LmJvZHkpeyB0aGlzLnByZXZBY3RpdmUuYmx1cigpIH1cbiAgfVxuXG4gIGJpbmRUb3BMZXZlbEV2ZW50cyh7ZGVhZH0gPSB7fSl7XG4gICAgaWYodGhpcy5ib3VuZFRvcExldmVsRXZlbnRzKXsgcmV0dXJuIH1cblxuICAgIHRoaXMuYm91bmRUb3BMZXZlbEV2ZW50cyA9IHRydWVcbiAgICAvLyBlbnRlciBmYWlsc2FmZSByZWxvYWQgaWYgc2VydmVyIGhhcyBnb25lIGF3YXkgaW50ZW50aW9uYWxseSwgc3VjaCBhcyBcImRpc2Nvbm5lY3RcIiBicm9hZGNhc3RcbiAgICB0aGlzLnNlcnZlckNsb3NlUmVmID0gdGhpcy5zb2NrZXQub25DbG9zZShldmVudCA9PiB7XG4gICAgICAvLyBmYWlsc2FmZSByZWxvYWQgaWYgbm9ybWFsIGNsb3N1cmUgYW5kIHdlIHN0aWxsIGhhdmUgYSBtYWluIExWXG4gICAgICBpZihldmVudCAmJiBldmVudC5jb2RlID09PSAxMDAwICYmIHRoaXMubWFpbil7IHJldHVybiB0aGlzLnJlbG9hZFdpdGhKaXR0ZXIodGhpcy5tYWluKSB9XG4gICAgfSlcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKXsgfSkgLy8gZW5zdXJlIGFsbCBjbGljayBldmVudHMgYnViYmxlIGZvciBtb2JpbGUgU2FmYXJpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBlID0+IHtcbiAgICAgIGlmKGUucGVyc2lzdGVkKXsgLy8gcmVsb2FkIHBhZ2UgaWYgYmVpbmcgcmVzdG9yZWQgZnJvbSBiYWNrL2ZvcndhcmQgY2FjaGVcbiAgICAgICAgdGhpcy5nZXRTb2NrZXQoKS5kaXNjb25uZWN0KClcbiAgICAgICAgdGhpcy53aXRoUGFnZUxvYWRpbmcoe3RvOiB3aW5kb3cubG9jYXRpb24uaHJlZiwga2luZDogXCJyZWRpcmVjdFwifSlcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICB9XG4gICAgfSwgdHJ1ZSlcbiAgICBpZighZGVhZCl7IHRoaXMuYmluZE5hdigpIH1cbiAgICB0aGlzLmJpbmRDbGlja3MoKVxuICAgIGlmKCFkZWFkKXsgdGhpcy5iaW5kRm9ybXMoKSB9XG4gICAgdGhpcy5iaW5kKHtrZXl1cDogXCJrZXl1cFwiLCBrZXlkb3duOiBcImtleWRvd25cIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgcGh4RXZlbnQsIF9waHhUYXJnZXQpID0+IHtcbiAgICAgIGxldCBtYXRjaEtleSA9IHRhcmdldEVsLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0tFWSkpXG4gICAgICBsZXQgcHJlc3NlZEtleSA9IGUua2V5ICYmIGUua2V5LnRvTG93ZXJDYXNlKCkgLy8gY2hyb21lIGNsaWNrZWQgYXV0b2NvbXBsZXRlcyBzZW5kIGEga2V5ZG93biB3aXRob3V0IGtleVxuICAgICAgaWYobWF0Y2hLZXkgJiYgbWF0Y2hLZXkudG9Mb3dlckNhc2UoKSAhPT0gcHJlc3NlZEtleSl7IHJldHVybiB9XG5cbiAgICAgIGxldCBkYXRhID0ge2tleTogZS5rZXksIC4uLnRoaXMuZXZlbnRNZXRhKHR5cGUsIGUsIHRhcmdldEVsKX1cbiAgICAgIEpTLmV4ZWMoZSwgdHlwZSwgcGh4RXZlbnQsIHZpZXcsIHRhcmdldEVsLCBbXCJwdXNoXCIsIHtkYXRhfV0pXG4gICAgfSlcbiAgICB0aGlzLmJpbmQoe2JsdXI6IFwiZm9jdXNvdXRcIiwgZm9jdXM6IFwiZm9jdXNpblwifSwgKGUsIHR5cGUsIHZpZXcsIHRhcmdldEVsLCBwaHhFdmVudCwgcGh4VGFyZ2V0KSA9PiB7XG4gICAgICBpZighcGh4VGFyZ2V0KXtcbiAgICAgICAgbGV0IGRhdGEgPSB7a2V5OiBlLmtleSwgLi4udGhpcy5ldmVudE1ldGEodHlwZSwgZSwgdGFyZ2V0RWwpfVxuICAgICAgICBKUy5leGVjKGUsIHR5cGUsIHBoeEV2ZW50LCB2aWV3LCB0YXJnZXRFbCwgW1wicHVzaFwiLCB7ZGF0YX1dKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5iaW5kKHtibHVyOiBcImJsdXJcIiwgZm9jdXM6IFwiZm9jdXNcIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgcGh4RXZlbnQsIHBoeFRhcmdldCkgPT4ge1xuICAgICAgLy8gYmx1ciBhbmQgZm9jdXMgYXJlIHRyaWdnZXJlZCBvbiBkb2N1bWVudCBhbmQgd2luZG93LiBEaXNjYXJkIG9uZSB0byBhdm9pZCBkdXBzXG4gICAgICBpZihwaHhUYXJnZXQgPT09IFwid2luZG93XCIpe1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZXZlbnRNZXRhKHR5cGUsIGUsIHRhcmdldEVsKVxuICAgICAgICBKUy5leGVjKGUsIHR5cGUsIHBoeEV2ZW50LCB2aWV3LCB0YXJnZXRFbCwgW1wicHVzaFwiLCB7ZGF0YX1dKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5vbihcImRyYWdvdmVyXCIsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKVxuICAgIHRoaXMub24oXCJkcm9wXCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBsZXQgZHJvcFRhcmdldElkID0gbWF5YmUoY2xvc2VzdFBoeEJpbmRpbmcoZS50YXJnZXQsIHRoaXMuYmluZGluZyhQSFhfRFJPUF9UQVJHRVQpKSwgdHJ1ZVRhcmdldCA9PiB7XG4gICAgICAgIHJldHVybiB0cnVlVGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0RST1BfVEFSR0VUKSlcbiAgICAgIH0pXG4gICAgICBsZXQgZHJvcFRhcmdldCA9IGRyb3BUYXJnZXRJZCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcm9wVGFyZ2V0SWQpXG4gICAgICBsZXQgZmlsZXMgPSBBcnJheS5mcm9tKGUuZGF0YVRyYW5zZmVyLmZpbGVzIHx8IFtdKVxuICAgICAgaWYoIWRyb3BUYXJnZXQgfHwgZHJvcFRhcmdldC5kaXNhYmxlZCB8fCBmaWxlcy5sZW5ndGggPT09IDAgfHwgIShkcm9wVGFyZ2V0LmZpbGVzIGluc3RhbmNlb2YgRmlsZUxpc3QpKXsgcmV0dXJuIH1cblxuICAgICAgTGl2ZVVwbG9hZGVyLnRyYWNrRmlsZXMoZHJvcFRhcmdldCwgZmlsZXMsIGUuZGF0YVRyYW5zZmVyKVxuICAgICAgZHJvcFRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHtidWJibGVzOiB0cnVlfSkpXG4gICAgfSlcbiAgICB0aGlzLm9uKFBIWF9UUkFDS19VUExPQURTLCBlID0+IHtcbiAgICAgIGxldCB1cGxvYWRUYXJnZXQgPSBlLnRhcmdldFxuICAgICAgaWYoIURPTS5pc1VwbG9hZElucHV0KHVwbG9hZFRhcmdldCkpeyByZXR1cm4gfVxuICAgICAgbGV0IGZpbGVzID0gQXJyYXkuZnJvbShlLmRldGFpbC5maWxlcyB8fCBbXSkuZmlsdGVyKGYgPT4gZiBpbnN0YW5jZW9mIEZpbGUgfHwgZiBpbnN0YW5jZW9mIEJsb2IpXG4gICAgICBMaXZlVXBsb2FkZXIudHJhY2tGaWxlcyh1cGxvYWRUYXJnZXQsIGZpbGVzKVxuICAgICAgdXBsb2FkVGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIiwge2J1YmJsZXM6IHRydWV9KSlcbiAgICB9KVxuICB9XG5cbiAgZXZlbnRNZXRhKGV2ZW50TmFtZSwgZSwgdGFyZ2V0RWwpe1xuICAgIGxldCBjYWxsYmFjayA9IHRoaXMubWV0YWRhdGFDYWxsYmFja3NbZXZlbnROYW1lXVxuICAgIHJldHVybiBjYWxsYmFjayA/IGNhbGxiYWNrKGUsIHRhcmdldEVsKSA6IHt9XG4gIH1cblxuICBzZXRQZW5kaW5nTGluayhocmVmKXtcbiAgICB0aGlzLmxpbmtSZWYrK1xuICAgIHRoaXMucGVuZGluZ0xpbmsgPSBocmVmXG4gICAgdGhpcy5yZXNldFJlbG9hZFN0YXR1cygpXG4gICAgcmV0dXJuIHRoaXMubGlua1JlZlxuICB9XG5cbiAgLy8gYW55dGltZSB3ZSBhcmUgbmF2aWdhdGluZyBvciBjb25uZWN0aW5nLCBkcm9wIHJlbG9hZCBjb29raWUgaW4gY2FzZVxuICAvLyB3ZSBpc3N1ZSB0aGUgY29va2llIGJ1dCB0aGUgbmV4dCByZXF1ZXN0IHdhcyBpbnRlcnJ1cHRlZCBhbmQgdGhlIHNlcnZlciBuZXZlciBkcm9wcGVkIGl0XG4gIHJlc2V0UmVsb2FkU3RhdHVzKCl7IEJyb3dzZXIuZGVsZXRlQ29va2llKFBIWF9SRUxPQURfU1RBVFVTKSB9XG5cbiAgY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZil7XG4gICAgaWYodGhpcy5saW5rUmVmICE9PSBsaW5rUmVmKXtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhyZWYgPSB0aGlzLnBlbmRpbmdMaW5rXG4gICAgICB0aGlzLnBlbmRpbmdMaW5rID0gbnVsbFxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICBnZXRIcmVmKCl7IHJldHVybiB0aGlzLmhyZWYgfVxuXG4gIGhhc1BlbmRpbmdMaW5rKCl7IHJldHVybiAhIXRoaXMucGVuZGluZ0xpbmsgfVxuXG4gIGJpbmQoZXZlbnRzLCBjYWxsYmFjayl7XG4gICAgZm9yKGxldCBldmVudCBpbiBldmVudHMpe1xuICAgICAgbGV0IGJyb3dzZXJFdmVudE5hbWUgPSBldmVudHNbZXZlbnRdXG5cbiAgICAgIHRoaXMub24oYnJvd3NlckV2ZW50TmFtZSwgZSA9PiB7XG4gICAgICAgIGxldCBiaW5kaW5nID0gdGhpcy5iaW5kaW5nKGV2ZW50KVxuICAgICAgICBsZXQgd2luZG93QmluZGluZyA9IHRoaXMuYmluZGluZyhgd2luZG93LSR7ZXZlbnR9YClcbiAgICAgICAgbGV0IHRhcmdldFBoeEV2ZW50ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlICYmIGUudGFyZ2V0LmdldEF0dHJpYnV0ZShiaW5kaW5nKVxuICAgICAgICBpZih0YXJnZXRQaHhFdmVudCl7XG4gICAgICAgICAgdGhpcy5kZWJvdW5jZShlLnRhcmdldCwgZSwgYnJvd3NlckV2ZW50TmFtZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoZS50YXJnZXQsIHZpZXcgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjayhlLCBldmVudCwgdmlldywgZS50YXJnZXQsIHRhcmdldFBoeEV2ZW50LCBudWxsKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHt3aW5kb3dCaW5kaW5nfV1gLCBlbCA9PiB7XG4gICAgICAgICAgICBsZXQgcGh4RXZlbnQgPSBlbC5nZXRBdHRyaWJ1dGUod2luZG93QmluZGluZylcbiAgICAgICAgICAgIHRoaXMuZGVib3VuY2UoZWwsIGUsIGJyb3dzZXJFdmVudE5hbWUsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoZWwsIHZpZXcgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGUsIGV2ZW50LCB2aWV3LCBlbCwgcGh4RXZlbnQsIFwid2luZG93XCIpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgYmluZENsaWNrcygpe1xuICAgIHRoaXMub24oXCJtb3VzZWRvd25cIiwgZSA9PiB0aGlzLmNsaWNrU3RhcnRlZEF0VGFyZ2V0ID0gZS50YXJnZXQpXG4gICAgdGhpcy5iaW5kQ2xpY2soXCJjbGlja1wiLCBcImNsaWNrXCIpXG4gIH1cblxuICBiaW5kQ2xpY2soZXZlbnROYW1lLCBiaW5kaW5nTmFtZSl7XG4gICAgbGV0IGNsaWNrID0gdGhpcy5iaW5kaW5nKGJpbmRpbmdOYW1lKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZSA9PiB7XG4gICAgICBsZXQgdGFyZ2V0ID0gbnVsbFxuICAgICAgLy8gYSBzeW50aGV0aWMgY2xpY2sgZXZlbnQgKGRldGFpbCAwKSB3aWxsIG5vdCBoYXZlIGNhdXNlZCBhIG1vdXNlZG93biBldmVudCxcbiAgICAgIC8vIHRoZXJlZm9yZSB0aGUgY2xpY2tTdGFydGVkQXRUYXJnZXQgaXMgc3RhbGVcbiAgICAgIGlmKGUuZGV0YWlsID09PSAwKSB0aGlzLmNsaWNrU3RhcnRlZEF0VGFyZ2V0ID0gZS50YXJnZXRcbiAgICAgIGxldCBjbGlja1N0YXJ0ZWRBdFRhcmdldCA9IHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgfHwgZS50YXJnZXRcbiAgICAgIC8vIHdoZW4gc2VhcmNoaW5nIHRoZSB0YXJnZXQgZm9yIHRoZSBjbGljayBldmVudCwgd2UgYWx3YXlzIHdhbnQgdG9cbiAgICAgIC8vIHVzZSB0aGUgYWN0dWFsIGV2ZW50IHRhcmdldCwgc2VlICMzMzcyXG4gICAgICB0YXJnZXQgPSBjbG9zZXN0UGh4QmluZGluZyhlLnRhcmdldCwgY2xpY2spXG4gICAgICB0aGlzLmRpc3BhdGNoQ2xpY2tBd2F5KGUsIGNsaWNrU3RhcnRlZEF0VGFyZ2V0KVxuICAgICAgdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCA9IG51bGxcbiAgICAgIGxldCBwaHhFdmVudCA9IHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKGNsaWNrKVxuICAgICAgaWYoIXBoeEV2ZW50KXtcbiAgICAgICAgaWYoRE9NLmlzTmV3UGFnZUNsaWNrKGUsIHdpbmRvdy5sb2NhdGlvbikpeyB0aGlzLnVubG9hZCgpIH1cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBcIiNcIil7IGUucHJldmVudERlZmF1bHQoKSB9XG5cbiAgICAgIC8vIG5vb3AgaWYgd2UgYXJlIGluIHRoZSBtaWRkbGUgb2YgYXdhaXRpbmcgYW4gYWNrIGZvciB0aGlzIGVsIGFscmVhZHlcbiAgICAgIGlmKHRhcmdldC5oYXNBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpKXsgcmV0dXJuIH1cblxuICAgICAgdGhpcy5kZWJvdW5jZSh0YXJnZXQsIGUsIFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLndpdGhpbk93bmVycyh0YXJnZXQsIHZpZXcgPT4ge1xuICAgICAgICAgIEpTLmV4ZWMoZSwgXCJjbGlja1wiLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0LCBbXCJwdXNoXCIsIHtkYXRhOiB0aGlzLmV2ZW50TWV0YShcImNsaWNrXCIsIGUsIHRhcmdldCl9XSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSwgZmFsc2UpXG4gIH1cblxuICBkaXNwYXRjaENsaWNrQXdheShlLCBjbGlja1N0YXJ0ZWRBdCl7XG4gICAgbGV0IHBoeENsaWNrQXdheSA9IHRoaXMuYmluZGluZyhcImNsaWNrLWF3YXlcIilcbiAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7cGh4Q2xpY2tBd2F5fV1gLCBlbCA9PiB7XG4gICAgICBpZighKGVsLmlzU2FtZU5vZGUoY2xpY2tTdGFydGVkQXQpIHx8IGVsLmNvbnRhaW5zKGNsaWNrU3RhcnRlZEF0KSkpe1xuICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlbCwgdmlldyA9PiB7XG4gICAgICAgICAgbGV0IHBoeEV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKHBoeENsaWNrQXdheSlcbiAgICAgICAgICBpZihKUy5pc1Zpc2libGUoZWwpICYmIEpTLmlzSW5WaWV3cG9ydChlbCkpe1xuICAgICAgICAgICAgSlMuZXhlYyhlLCBcImNsaWNrXCIsIHBoeEV2ZW50LCB2aWV3LCBlbCwgW1wicHVzaFwiLCB7ZGF0YTogdGhpcy5ldmVudE1ldGEoXCJjbGlja1wiLCBlLCBlLnRhcmdldCl9XSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGJpbmROYXYoKXtcbiAgICBpZighQnJvd3Nlci5jYW5QdXNoU3RhdGUoKSl7IHJldHVybiB9XG4gICAgaWYoaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbil7IGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSBcIm1hbnVhbFwiIH1cbiAgICBsZXQgc2Nyb2xsVGltZXIgPSBudWxsXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgX2UgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVyKVxuICAgICAgc2Nyb2xsVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgQnJvd3Nlci51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUgPT4gT2JqZWN0LmFzc2lnbihzdGF0ZSwge3Njcm9sbDogd2luZG93LnNjcm9sbFl9KSlcbiAgICAgIH0sIDEwMClcbiAgICB9KVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZXZlbnQgPT4ge1xuICAgICAgaWYoIXRoaXMucmVnaXN0ZXJOZXdMb2NhdGlvbih3aW5kb3cubG9jYXRpb24pKXsgcmV0dXJuIH1cbiAgICAgIGxldCB7dHlwZSwgYmFja1R5cGUsIGlkLCBzY3JvbGwsIHBvc2l0aW9ufSA9IGV2ZW50LnN0YXRlIHx8IHt9XG4gICAgICBsZXQgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG5cbiAgICAgIC8vIENvbXBhcmUgcG9zaXRpb25zIHRvIGRldGVybWluZSBkaXJlY3Rpb25cbiAgICAgIGxldCBpc0ZvcndhcmQgPSBwb3NpdGlvbiA+IHRoaXMuY3VycmVudEhpc3RvcnlQb3NpdGlvblxuXG4gICAgICB0eXBlID0gaXNGb3J3YXJkID8gdHlwZSA6IChiYWNrVHlwZSB8fCB0eXBlKVxuXG4gICAgICAvLyBVcGRhdGUgY3VycmVudCBwb3NpdGlvblxuICAgICAgdGhpcy5jdXJyZW50SGlzdG9yeVBvc2l0aW9uID0gcG9zaXRpb24gfHwgMFxuICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBIWF9MVl9ISVNUT1JZX1BPU0lUSU9OLCB0aGlzLmN1cnJlbnRIaXN0b3J5UG9zaXRpb24udG9TdHJpbmcoKSlcblxuICAgICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpuYXZpZ2F0ZVwiLCB7ZGV0YWlsOiB7aHJlZiwgcGF0Y2g6IHR5cGUgPT09IFwicGF0Y2hcIiwgcG9wOiB0cnVlLCBkaXJlY3Rpb246IGlzRm9yd2FyZCA/IFwiZm9yd2FyZFwiIDogXCJiYWNrd2FyZFwifX0pXG4gICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9ICgpID0+IHsgdGhpcy5tYXliZVNjcm9sbChzY3JvbGwpIH1cbiAgICAgICAgaWYodGhpcy5tYWluLmlzQ29ubmVjdGVkKCkgJiYgKHR5cGUgPT09IFwicGF0Y2hcIiAmJiBpZCA9PT0gdGhpcy5tYWluLmlkKSl7XG4gICAgICAgICAgdGhpcy5tYWluLnB1c2hMaW5rUGF0Y2goZXZlbnQsIGhyZWYsIG51bGwsIGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVwbGFjZU1haW4oaHJlZiwgbnVsbCwgY2FsbGJhY2spXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSwgZmFsc2UpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGxldCB0YXJnZXQgPSBjbG9zZXN0UGh4QmluZGluZyhlLnRhcmdldCwgUEhYX0xJVkVfTElOSylcbiAgICAgIGxldCB0eXBlID0gdGFyZ2V0ICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoUEhYX0xJVkVfTElOSylcbiAgICAgIGlmKCF0eXBlIHx8ICF0aGlzLmlzQ29ubmVjdGVkKCkgfHwgIXRoaXMubWFpbiB8fCBET00ud2FudHNOZXdUYWIoZSkpeyByZXR1cm4gfVxuXG4gICAgICAvLyBXaGVuIHdyYXBwaW5nIGFuIFNWRyBlbGVtZW50IGluIGFuIGFuY2hvciB0YWcsIHRoZSBocmVmIGNhbiBiZSBhbiBTVkdBbmltYXRlZFN0cmluZ1xuICAgICAgbGV0IGhyZWYgPSB0YXJnZXQuaHJlZiBpbnN0YW5jZW9mIFNWR0FuaW1hdGVkU3RyaW5nID8gdGFyZ2V0LmhyZWYuYmFzZVZhbCA6IHRhcmdldC5ocmVmXG5cbiAgICAgIGxldCBsaW5rU3RhdGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFBIWF9MSU5LX1NUQVRFKVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpIC8vIGRvIG5vdCBidWJibGUgY2xpY2sgdG8gcmVndWxhciBwaHgtY2xpY2sgYmluZGluZ3NcbiAgICAgIGlmKHRoaXMucGVuZGluZ0xpbmsgPT09IGhyZWYpeyByZXR1cm4gfVxuXG4gICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBpZih0eXBlID09PSBcInBhdGNoXCIpe1xuICAgICAgICAgIHRoaXMucHVzaEhpc3RvcnlQYXRjaChlLCBocmVmLCBsaW5rU3RhdGUsIHRhcmdldClcbiAgICAgICAgfSBlbHNlIGlmKHR5cGUgPT09IFwicmVkaXJlY3RcIil7XG4gICAgICAgICAgdGhpcy5oaXN0b3J5UmVkaXJlY3QoZSwgaHJlZiwgbGlua1N0YXRlLCBudWxsLCB0YXJnZXQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBleHBlY3RlZCAke1BIWF9MSVZFX0xJTkt9IHRvIGJlIFwicGF0Y2hcIiBvciBcInJlZGlyZWN0XCIsIGdvdDogJHt0eXBlfWApXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBoeENsaWNrID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJjbGlja1wiKSlcbiAgICAgICAgaWYocGh4Q2xpY2spe1xuICAgICAgICAgIHRoaXMucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB0aGlzLmV4ZWNKUyh0YXJnZXQsIHBoeENsaWNrLCBcImNsaWNrXCIpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sIGZhbHNlKVxuICB9XG5cbiAgbWF5YmVTY3JvbGwoc2Nyb2xsKXtcbiAgICBpZih0eXBlb2Yoc2Nyb2xsKSA9PT0gXCJudW1iZXJcIil7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsKVxuICAgICAgfSkgLy8gdGhlIGJvZHkgbmVlZHMgdG8gcmVuZGVyIGJlZm9yZSB3ZSBzY3JvbGwuXG4gICAgfVxuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChldmVudCwgcGF5bG9hZCA9IHt9KXtcbiAgICBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIGBwaHg6JHtldmVudH1gLCB7ZGV0YWlsOiBwYXlsb2FkfSlcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnRzKGV2ZW50cyl7XG4gICAgZXZlbnRzLmZvckVhY2goKFtldmVudCwgcGF5bG9hZF0pID0+IHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCwgcGF5bG9hZCkpXG4gIH1cblxuICB3aXRoUGFnZUxvYWRpbmcoaW5mbywgY2FsbGJhY2spe1xuICAgIERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIHtkZXRhaWw6IGluZm99KVxuICAgIGxldCBkb25lID0gKCkgPT4gRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpwYWdlLWxvYWRpbmctc3RvcFwiLCB7ZGV0YWlsOiBpbmZvfSlcbiAgICByZXR1cm4gY2FsbGJhY2sgPyBjYWxsYmFjayhkb25lKSA6IGRvbmVcbiAgfVxuXG4gIHB1c2hIaXN0b3J5UGF0Y2goZSwgaHJlZiwgbGlua1N0YXRlLCB0YXJnZXRFbCl7XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSB8fCAhdGhpcy5tYWluLmlzTWFpbigpKXsgcmV0dXJuIEJyb3dzZXIucmVkaXJlY3QoaHJlZikgfVxuXG4gICAgdGhpcy53aXRoUGFnZUxvYWRpbmcoe3RvOiBocmVmLCBraW5kOiBcInBhdGNoXCJ9LCBkb25lID0+IHtcbiAgICAgIHRoaXMubWFpbi5wdXNoTGlua1BhdGNoKGUsIGhyZWYsIHRhcmdldEVsLCBsaW5rUmVmID0+IHtcbiAgICAgICAgdGhpcy5oaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCBsaW5rUmVmKVxuICAgICAgICBkb25lKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGhpc3RvcnlQYXRjaChocmVmLCBsaW5rU3RhdGUsIGxpbmtSZWYgPSB0aGlzLnNldFBlbmRpbmdMaW5rKGhyZWYpKXtcbiAgICBpZighdGhpcy5jb21taXRQZW5kaW5nTGluayhsaW5rUmVmKSl7IHJldHVybiB9XG5cbiAgICAvLyBJbmNyZW1lbnQgcG9zaXRpb24gZm9yIG5ldyBzdGF0ZVxuICAgIHRoaXMuY3VycmVudEhpc3RvcnlQb3NpdGlvbisrXG4gICAgdGhpcy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBIWF9MVl9ISVNUT1JZX1BPU0lUSU9OLCB0aGlzLmN1cnJlbnRIaXN0b3J5UG9zaXRpb24udG9TdHJpbmcoKSlcblxuICAgIC8vIHN0b3JlIHRoZSB0eXBlIGZvciBiYWNrIG5hdmlnYXRpb25cbiAgICBCcm93c2VyLnVwZGF0ZUN1cnJlbnRTdGF0ZSgoc3RhdGUpID0+ICh7Li4uc3RhdGUsIGJhY2tUeXBlOiBcInBhdGNoXCJ9KSlcblxuICAgIEJyb3dzZXIucHVzaFN0YXRlKGxpbmtTdGF0ZSwge1xuICAgICAgdHlwZTogXCJwYXRjaFwiLFxuICAgICAgaWQ6IHRoaXMubWFpbi5pZCxcbiAgICAgIHBvc2l0aW9uOiB0aGlzLmN1cnJlbnRIaXN0b3J5UG9zaXRpb25cbiAgICB9LCBocmVmKVxuXG4gICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpuYXZpZ2F0ZVwiLCB7ZGV0YWlsOiB7cGF0Y2g6IHRydWUsIGhyZWYsIHBvcDogZmFsc2UsIGRpcmVjdGlvbjogXCJmb3J3YXJkXCJ9fSlcbiAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICB9XG5cbiAgaGlzdG9yeVJlZGlyZWN0KGUsIGhyZWYsIGxpbmtTdGF0ZSwgZmxhc2gsIHRhcmdldEVsKXtcbiAgICBjb25zdCBjbGlja0xvYWRpbmcgPSB0YXJnZXRFbCAmJiBlLmlzVHJ1c3RlZCAmJiBlLnR5cGUgIT09IFwicG9wc3RhdGVcIlxuICAgIGlmKGNsaWNrTG9hZGluZyl7IHRhcmdldEVsLmNsYXNzTGlzdC5hZGQoXCJwaHgtY2xpY2stbG9hZGluZ1wiKSB9XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSB8fCAhdGhpcy5tYWluLmlzTWFpbigpKXsgcmV0dXJuIEJyb3dzZXIucmVkaXJlY3QoaHJlZiwgZmxhc2gpIH1cblxuICAgIC8vIGNvbnZlcnQgdG8gZnVsbCBocmVmIGlmIG9ubHkgcGF0aCBwcmVmaXhcbiAgICBpZigvXlxcLyR8XlxcL1teXFwvXSsuKiQvLnRlc3QoaHJlZikpe1xuICAgICAgbGV0IHtwcm90b2NvbCwgaG9zdH0gPSB3aW5kb3cubG9jYXRpb25cbiAgICAgIGhyZWYgPSBgJHtwcm90b2NvbH0vLyR7aG9zdH0ke2hyZWZ9YFxuICAgIH1cbiAgICBsZXQgc2Nyb2xsID0gd2luZG93LnNjcm9sbFlcbiAgICB0aGlzLndpdGhQYWdlTG9hZGluZyh7dG86IGhyZWYsIGtpbmQ6IFwicmVkaXJlY3RcIn0sIGRvbmUgPT4ge1xuICAgICAgdGhpcy5yZXBsYWNlTWFpbihocmVmLCBmbGFzaCwgKGxpbmtSZWYpID0+IHtcbiAgICAgICAgaWYobGlua1JlZiA9PT0gdGhpcy5saW5rUmVmKXtcbiAgICAgICAgICAvLyBJbmNyZW1lbnQgcG9zaXRpb24gZm9yIG5ldyBzdGF0ZVxuICAgICAgICAgIHRoaXMuY3VycmVudEhpc3RvcnlQb3NpdGlvbisrXG4gICAgICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFBIWF9MVl9ISVNUT1JZX1BPU0lUSU9OLCB0aGlzLmN1cnJlbnRIaXN0b3J5UG9zaXRpb24udG9TdHJpbmcoKSlcblxuICAgICAgICAgIC8vIHN0b3JlIHRoZSB0eXBlIGZvciBiYWNrIG5hdmlnYXRpb25cbiAgICAgICAgICBCcm93c2VyLnVwZGF0ZUN1cnJlbnRTdGF0ZSgoc3RhdGUpID0+ICh7Li4uc3RhdGUsIGJhY2tUeXBlOiBcInJlZGlyZWN0XCJ9KSlcblxuICAgICAgICAgIEJyb3dzZXIucHVzaFN0YXRlKGxpbmtTdGF0ZSwge1xuICAgICAgICAgICAgdHlwZTogXCJyZWRpcmVjdFwiLFxuICAgICAgICAgICAgaWQ6IHRoaXMubWFpbi5pZCxcbiAgICAgICAgICAgIHNjcm9sbDogc2Nyb2xsLFxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuY3VycmVudEhpc3RvcnlQb3NpdGlvblxuICAgICAgICAgIH0sIGhyZWYpXG5cbiAgICAgICAgICBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4Om5hdmlnYXRlXCIsIHtkZXRhaWw6IHtocmVmLCBwYXRjaDogZmFsc2UsIHBvcDogZmFsc2UsIGRpcmVjdGlvbjogXCJmb3J3YXJkXCJ9fSlcbiAgICAgICAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICAgICAgICB9XG4gICAgICAgIC8vIGV4cGxpY2l0bHkgdW5kbyBjbGljay1sb2FkaW5nIGNsYXNzXG4gICAgICAgIC8vIChpbiBjYXNlIGl0IG9yaWdpbmF0ZWQgaW4gYSBzdGlja3kgbGl2ZSB2aWV3LCBvdGhlcndpc2UgaXQgd291bGQgYmUgcmVtb3ZlZCBhbnl3YXkpXG4gICAgICAgIGlmKGNsaWNrTG9hZGluZyl7IHRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJwaHgtY2xpY2stbG9hZGluZ1wiKSB9XG4gICAgICAgIGRvbmUoKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcmVnaXN0ZXJOZXdMb2NhdGlvbihuZXdMb2NhdGlvbil7XG4gICAgbGV0IHtwYXRobmFtZSwgc2VhcmNofSA9IHRoaXMuY3VycmVudExvY2F0aW9uXG4gICAgaWYocGF0aG5hbWUgKyBzZWFyY2ggPT09IG5ld0xvY2F0aW9uLnBhdGhuYW1lICsgbmV3TG9jYXRpb24uc2VhcmNoKXtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRMb2NhdGlvbiA9IGNsb25lKG5ld0xvY2F0aW9uKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICBiaW5kRm9ybXMoKXtcbiAgICBsZXQgaXRlcmF0aW9ucyA9IDBcbiAgICBsZXQgZXh0ZXJuYWxGb3JtU3VibWl0dGVkID0gZmFsc2VcblxuICAgIC8vIGRpc2FibGUgZm9ybXMgb24gc3VibWl0IHRoYXQgdHJhY2sgcGh4LWNoYW5nZSBidXQgcGVyZm9ybSBleHRlcm5hbCBzdWJtaXRcbiAgICB0aGlzLm9uKFwic3VibWl0XCIsIGUgPT4ge1xuICAgICAgbGV0IHBoeFN1Ym1pdCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJzdWJtaXRcIikpXG4gICAgICBsZXQgcGh4Q2hhbmdlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcImNoYW5nZVwiKSlcbiAgICAgIGlmKCFleHRlcm5hbEZvcm1TdWJtaXR0ZWQgJiYgcGh4Q2hhbmdlICYmICFwaHhTdWJtaXQpe1xuICAgICAgICBleHRlcm5hbEZvcm1TdWJtaXR0ZWQgPSB0cnVlXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlLnRhcmdldCwgdmlldyA9PiB7XG4gICAgICAgICAgdmlldy5kaXNhYmxlRm9ybShlLnRhcmdldClcbiAgICAgICAgICAvLyBzYWZhcmkgbmVlZHMgbmV4dCB0aWNrXG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBpZihET00uaXNVbmxvYWRhYmxlRm9ybVN1Ym1pdChlKSl7IHRoaXMudW5sb2FkKCkgfVxuICAgICAgICAgICAgZS50YXJnZXQuc3VibWl0KClcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLm9uKFwic3VibWl0XCIsIGUgPT4ge1xuICAgICAgbGV0IHBoeEV2ZW50ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcInN1Ym1pdFwiKSlcbiAgICAgIGlmKCFwaHhFdmVudCl7XG4gICAgICAgIGlmKERPTS5pc1VubG9hZGFibGVGb3JtU3VibWl0KGUpKXsgdGhpcy51bmxvYWQoKSB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnRhcmdldC5kaXNhYmxlZCA9IHRydWVcbiAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgSlMuZXhlYyhlLCBcInN1Ym1pdFwiLCBwaHhFdmVudCwgdmlldywgZS50YXJnZXQsIFtcInB1c2hcIiwge3N1Ym1pdHRlcjogZS5zdWJtaXR0ZXJ9XSlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGZvcihsZXQgdHlwZSBvZiBbXCJjaGFuZ2VcIiwgXCJpbnB1dFwiXSl7XG4gICAgICB0aGlzLm9uKHR5cGUsIGUgPT4ge1xuICAgICAgICBpZihlIGluc3RhbmNlb2YgQ3VzdG9tRXZlbnQgJiYgZS50YXJnZXQuZm9ybSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAvLyB0aHJvdyBvbiBpbnZhbGlkIEpTLmRpc3BhdGNoIHRhcmdldCBhbmQgbm9vcCBpZiBDdXN0b21FdmVudCB0cmlnZ2VyZWQgb3V0c2lkZSBKUy5kaXNwYXRjaFxuICAgICAgICAgIGlmKGUuZGV0YWlsICYmIGUuZGV0YWlsLmRpc3BhdGNoZXIpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBkaXNwYXRjaGluZyBhIGN1c3RvbSAke3R5cGV9IGV2ZW50IGlzIG9ubHkgc3VwcG9ydGVkIG9uIGlucHV0IGVsZW1lbnRzIGluc2lkZSBhIGZvcm1gKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgcGh4Q2hhbmdlID0gdGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpXG4gICAgICAgIGxldCBpbnB1dCA9IGUudGFyZ2V0XG4gICAgICAgIC8vIGRvIG5vdCBmaXJlIHBoeC1jaGFuZ2UgaWYgd2UgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBjb21wb3NpdGlvbiBzZXNzaW9uXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9LZXlib2FyZEV2ZW50L2lzQ29tcG9zaW5nXG4gICAgICAgIC8vIFNhZmFyaSBoYXMgaXNzdWVzIGlmIHRoZSBpbnB1dCBpcyB1cGRhdGVkIHdoaWxlIGNvbXBvc2luZ1xuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Bob2VuaXhmcmFtZXdvcmsvcGhvZW5peF9saXZlX3ZpZXcvaXNzdWVzLzMzMjJcbiAgICAgICAgaWYoZS5pc0NvbXBvc2luZyl7XG4gICAgICAgICAgY29uc3Qga2V5ID0gYGNvbXBvc2l0aW9uLWxpc3RlbmVyLSR7dHlwZX1gXG4gICAgICAgICAgaWYoIURPTS5wcml2YXRlKGlucHV0LCBrZXkpKXtcbiAgICAgICAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0LCBrZXksIHRydWUpXG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY29tcG9zaXRpb25lbmRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAvLyB0cmlnZ2VyIGEgbmV3IGlucHV0L2NoYW5nZSBldmVudFxuICAgICAgICAgICAgICBpbnB1dC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCh0eXBlLCB7YnViYmxlczogdHJ1ZX0pKVxuICAgICAgICAgICAgICBET00uZGVsZXRlUHJpdmF0ZShpbnB1dCwga2V5KVxuICAgICAgICAgICAgfSwge29uY2U6IHRydWV9KVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5wdXRFdmVudCA9IGlucHV0LmdldEF0dHJpYnV0ZShwaHhDaGFuZ2UpXG4gICAgICAgIGxldCBmb3JtRXZlbnQgPSBpbnB1dC5mb3JtICYmIGlucHV0LmZvcm0uZ2V0QXR0cmlidXRlKHBoeENoYW5nZSlcbiAgICAgICAgbGV0IHBoeEV2ZW50ID0gaW5wdXRFdmVudCB8fCBmb3JtRXZlbnRcbiAgICAgICAgaWYoIXBoeEV2ZW50KXsgcmV0dXJuIH1cbiAgICAgICAgaWYoaW5wdXQudHlwZSA9PT0gXCJudW1iZXJcIiAmJiBpbnB1dC52YWxpZGl0eSAmJiBpbnB1dC52YWxpZGl0eS5iYWRJbnB1dCl7IHJldHVybiB9XG5cbiAgICAgICAgbGV0IGRpc3BhdGNoZXIgPSBpbnB1dEV2ZW50ID8gaW5wdXQgOiBpbnB1dC5mb3JtXG4gICAgICAgIGxldCBjdXJyZW50SXRlcmF0aW9ucyA9IGl0ZXJhdGlvbnNcbiAgICAgICAgaXRlcmF0aW9ucysrXG4gICAgICAgIGxldCB7YXQ6IGF0LCB0eXBlOiBsYXN0VHlwZX0gPSBET00ucHJpdmF0ZShpbnB1dCwgXCJwcmV2LWl0ZXJhdGlvblwiKSB8fCB7fVxuICAgICAgICAvLyBCcm93c2VycyBzaG91bGQgYWx3YXlzIGZpcmUgYXQgbGVhc3Qgb25lIFwiaW5wdXRcIiBldmVudCBiZWZvcmUgZXZlcnkgXCJjaGFuZ2VcIlxuICAgICAgICAvLyBJZ25vcmUgXCJjaGFuZ2VcIiBldmVudHMsIHVubGVzcyB0aGVyZSB3YXMgbm8gcHJpb3IgXCJpbnB1dFwiIGV2ZW50LlxuICAgICAgICAvLyBUaGlzIGNvdWxkIGhhcHBlbiBpZiB1c2VyIGNvZGUgdHJpZ2dlcnMgYSBcImNoYW5nZVwiIGV2ZW50LCBvciBpZiB0aGUgYnJvd3NlciBpcyBub24tY29uZm9ybWluZy5cbiAgICAgICAgaWYoYXQgPT09IGN1cnJlbnRJdGVyYXRpb25zIC0gMSAmJiB0eXBlID09PSBcImNoYW5nZVwiICYmIGxhc3RUeXBlID09PSBcImlucHV0XCIpeyByZXR1cm4gfVxuXG4gICAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0LCBcInByZXYtaXRlcmF0aW9uXCIsIHthdDogY3VycmVudEl0ZXJhdGlvbnMsIHR5cGU6IHR5cGV9KVxuXG4gICAgICAgIHRoaXMuZGVib3VuY2UoaW5wdXQsIGUsIHR5cGUsICgpID0+IHtcbiAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhkaXNwYXRjaGVyLCB2aWV3ID0+IHtcbiAgICAgICAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQsIHRydWUpXG4gICAgICAgICAgICBKUy5leGVjKGUsIFwiY2hhbmdlXCIsIHBoeEV2ZW50LCB2aWV3LCBpbnB1dCwgW1wicHVzaFwiLCB7X3RhcmdldDogZS50YXJnZXQubmFtZSwgZGlzcGF0Y2hlcjogZGlzcGF0Y2hlcn1dKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLm9uKFwicmVzZXRcIiwgKGUpID0+IHtcbiAgICAgIGxldCBmb3JtID0gZS50YXJnZXRcbiAgICAgIERPTS5yZXNldEZvcm0oZm9ybSlcbiAgICAgIGxldCBpbnB1dCA9IEFycmF5LmZyb20oZm9ybS5lbGVtZW50cykuZmluZChlbCA9PiBlbC50eXBlID09PSBcInJlc2V0XCIpXG4gICAgICBpZihpbnB1dCl7XG4gICAgICAgIC8vIHdhaXQgdW50aWwgbmV4dCB0aWNrIHRvIGdldCB1cGRhdGVkIGlucHV0IHZhbHVlXG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGlucHV0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIiwge2J1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IGZhbHNlfSkpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGRlYm91bmNlKGVsLCBldmVudCwgZXZlbnRUeXBlLCBjYWxsYmFjayl7XG4gICAgaWYoZXZlbnRUeXBlID09PSBcImJsdXJcIiB8fCBldmVudFR5cGUgPT09IFwiZm9jdXNvdXRcIil7IHJldHVybiBjYWxsYmFjaygpIH1cblxuICAgIGxldCBwaHhEZWJvdW5jZSA9IHRoaXMuYmluZGluZyhQSFhfREVCT1VOQ0UpXG4gICAgbGV0IHBoeFRocm90dGxlID0gdGhpcy5iaW5kaW5nKFBIWF9USFJPVFRMRSlcbiAgICBsZXQgZGVmYXVsdERlYm91bmNlID0gdGhpcy5kZWZhdWx0cy5kZWJvdW5jZS50b1N0cmluZygpXG4gICAgbGV0IGRlZmF1bHRUaHJvdHRsZSA9IHRoaXMuZGVmYXVsdHMudGhyb3R0bGUudG9TdHJpbmcoKVxuXG4gICAgdGhpcy53aXRoaW5Pd25lcnMoZWwsIHZpZXcgPT4ge1xuICAgICAgbGV0IGFzeW5jRmlsdGVyID0gKCkgPT4gIXZpZXcuaXNEZXN0cm95ZWQoKSAmJiBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKVxuICAgICAgRE9NLmRlYm91bmNlKGVsLCBldmVudCwgcGh4RGVib3VuY2UsIGRlZmF1bHREZWJvdW5jZSwgcGh4VGhyb3R0bGUsIGRlZmF1bHRUaHJvdHRsZSwgYXN5bmNGaWx0ZXIsICgpID0+IHtcbiAgICAgICAgY2FsbGJhY2soKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgc2lsZW5jZUV2ZW50cyhjYWxsYmFjayl7XG4gICAgdGhpcy5zaWxlbmNlZCA9IHRydWVcbiAgICBjYWxsYmFjaygpXG4gICAgdGhpcy5zaWxlbmNlZCA9IGZhbHNlXG4gIH1cblxuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIHRoaXMuYm91bmRFdmVudE5hbWVzLmFkZChldmVudClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZSA9PiB7XG4gICAgICBpZighdGhpcy5zaWxlbmNlZCl7IGNhbGxiYWNrKGUpIH1cbiAgICB9KVxuICB9XG5cbiAganNRdWVyeVNlbGVjdG9yQWxsKHNvdXJjZUVsLCBxdWVyeSwgZGVmYXVsdFF1ZXJ5KXtcbiAgICBsZXQgYWxsID0gdGhpcy5kb21DYWxsYmFja3MuanNRdWVyeVNlbGVjdG9yQWxsXG4gICAgcmV0dXJuIGFsbCA/IGFsbChzb3VyY2VFbCwgcXVlcnksIGRlZmF1bHRRdWVyeSkgOiBkZWZhdWx0UXVlcnkoKVxuICB9XG59XG5cbmNsYXNzIFRyYW5zaXRpb25TZXQge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMudHJhbnNpdGlvbnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLnBlbmRpbmdPcHMgPSBbXVxuICB9XG5cbiAgcmVzZXQoKXtcbiAgICB0aGlzLnRyYW5zaXRpb25zLmZvckVhY2godGltZXIgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgdGhpcy50cmFuc2l0aW9ucy5kZWxldGUodGltZXIpXG4gICAgfSlcbiAgICB0aGlzLmZsdXNoUGVuZGluZ09wcygpXG4gIH1cblxuICBhZnRlcihjYWxsYmFjayl7XG4gICAgaWYodGhpcy5zaXplKCkgPT09IDApe1xuICAgICAgY2FsbGJhY2soKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1c2hQZW5kaW5nT3AoY2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgYWRkVHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpe1xuICAgIG9uU3RhcnQoKVxuICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmFuc2l0aW9ucy5kZWxldGUodGltZXIpXG4gICAgICBvbkRvbmUoKVxuICAgICAgdGhpcy5mbHVzaFBlbmRpbmdPcHMoKVxuICAgIH0sIHRpbWUpXG4gICAgdGhpcy50cmFuc2l0aW9ucy5hZGQodGltZXIpXG4gIH1cblxuICBwdXNoUGVuZGluZ09wKG9wKXsgdGhpcy5wZW5kaW5nT3BzLnB1c2gob3ApIH1cblxuICBzaXplKCl7IHJldHVybiB0aGlzLnRyYW5zaXRpb25zLnNpemUgfVxuXG4gIGZsdXNoUGVuZGluZ09wcygpe1xuICAgIGlmKHRoaXMuc2l6ZSgpID4gMCl7IHJldHVybiB9XG4gICAgbGV0IG9wID0gdGhpcy5wZW5kaW5nT3BzLnNoaWZ0KClcbiAgICBpZihvcCl7XG4gICAgICBvcCgpXG4gICAgICB0aGlzLmZsdXNoUGVuZGluZ09wcygpXG4gICAgfVxuICB9XG59XG4iLCAiLypcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5QaG9lbml4IExpdmVWaWV3IEphdmFTY3JpcHQgQ2xpZW50XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5TZWUgdGhlIGhleGRvY3MgYXQgYGh0dHBzOi8vaGV4ZG9jcy5wbS9waG9lbml4X2xpdmVfdmlld2AgZm9yIGRvY3VtZW50YXRpb24uXG5cbiovXG5cbmltcG9ydCBMaXZlU29ja2V0LCB7aXNVc2VkSW5wdXR9IGZyb20gXCIuL2xpdmVfc29ja2V0XCJcbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBWaWV3SG9vayBmcm9tIFwiLi92aWV3X2hvb2tcIlxuaW1wb3J0IFZpZXcgZnJvbSBcIi4vdmlld1wiXG5cbi8qKiBDcmVhdGVzIGEgVmlld0hvb2sgaW5zdGFuY2UgZm9yIHRoZSBnaXZlbiBlbGVtZW50IGFuZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLSBUaGUgZWxlbWVudCB0byBhc3NvY2lhdGUgd2l0aCB0aGUgaG9vay5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY2FsbGJhY2tzXSAtIFRoZSBsaXN0IG9mIGhvb2sgY2FsbGJhY2tzLCBzdWNoIGFzIG1vdW50ZWQsXG4gKiAgIHVwZGF0ZWQsIGRlc3Ryb3llZCwgZXRjLlxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogY2xhc3MgTXlDb21wb25lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gKiAgIGNvbm5lY3RlZENhbGxiYWNrKCl7XG4gKiAgICAgbGV0IG9uTGl2ZVZpZXdNb3VudGVkID0gKCkgPT4gdGhpcy5ob29rLnB1c2hFdmVudCguLi4pKVxuICogICAgIHRoaXMuaG9vayA9IGNyZWF0ZUhvb2sodGhpcywge21vdW50ZWQ6IG9uTGl2ZVZpZXdNb3VudGVkfSlcbiAqICAgfVxuICogfVxuICpcbiAqICpOb3RlKjogYGNyZWF0ZUhvb2tgIG11c3QgYmUgY2FsbGVkIGZyb20gdGhlIGBjb25uZWN0ZWRDYWxsYmFja2AgbGlmZWN5Y2xlXG4gKiB3aGljaCBpcyB0cmlnZ2VyZWQgYWZ0ZXIgdGhlIGVsZW1lbnQgaGFzIGJlZW4gYWRkZWQgdG8gdGhlIERPTS4gSWYgeW91IHRyeVxuICogdG8gY2FsbCBgY3JlYXRlSG9va2AgZnJvbSB0aGUgY29uc3RydWN0b3IsIGFuIGVycm9yIHdpbGwgYmUgbG9nZ2VkLlxuICpcbiAqIEByZXR1cm5zIHtWaWV3SG9va30gUmV0dXJucyB0aGUgVmlld0hvb2sgaW5zdGFuY2UgZm9yIHRoZSBjdXN0b20gZWxlbWVudC5cbiAqL1xubGV0IGNyZWF0ZUhvb2sgPSAoZWwsIGNhbGxiYWNrcyA9IHt9KSA9PiB7XG4gIGxldCBleGlzdGluZ0hvb2sgPSBET00uZ2V0Q3VzdG9tRWxIb29rKGVsKVxuICBpZihleGlzdGluZ0hvb2speyByZXR1cm4gZXhpc3RpbmdIb29rIH1cblxuICBsZXQgaG9vayA9IG5ldyBWaWV3SG9vayhWaWV3LmNsb3Nlc3RWaWV3KGVsKSwgZWwsIGNhbGxiYWNrcylcbiAgRE9NLnB1dEN1c3RvbUVsSG9vayhlbCwgaG9vaylcbiAgcmV0dXJuIGhvb2tcbn1cblxuZXhwb3J0IHtcbiAgTGl2ZVNvY2tldCxcbiAgaXNVc2VkSW5wdXQsXG4gIGNyZWF0ZUhvb2tcbn1cbiIsICIvKipcbiAqIEBsaWNlbnNlIE1JVFxuICogdG9wYmFyIDIuMC4wLCAyMDIzLTAyLTA0XG4gKiBodHRwczovL2J1dW5ndXllbi5naXRodWIuaW8vdG9wYmFyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEgQnV1IE5ndXllblxuICovXG4oZnVuY3Rpb24gKHdpbmRvdywgZG9jdW1lbnQpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzE1Nzk2NzFcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgIHZhciB2ZW5kb3JzID0gW1wibXNcIiwgXCJtb3pcIiwgXCJ3ZWJraXRcIiwgXCJvXCJdO1xuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPVxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsQW5pbWF0aW9uRnJhbWVcIl0gfHxcbiAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyBcIkNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtcbiAgICB9XG4gICAgaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZWxlbWVudCkge1xuICAgICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XG4gICAgICAgIHZhciBpZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpO1xuICAgICAgICB9LCB0aW1lVG9DYWxsKTtcbiAgICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgICAgIHJldHVybiBpZDtcbiAgICAgIH07XG4gICAgaWYgKCF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpXG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgICAgIH07XG4gIH0pKCk7XG5cbiAgdmFyIGNhbnZhcyxcbiAgICBjdXJyZW50UHJvZ3Jlc3MsXG4gICAgc2hvd2luZyxcbiAgICBwcm9ncmVzc1RpbWVySWQgPSBudWxsLFxuICAgIGZhZGVUaW1lcklkID0gbnVsbCxcbiAgICBkZWxheVRpbWVySWQgPSBudWxsLFxuICAgIGFkZEV2ZW50ID0gZnVuY3Rpb24gKGVsZW0sIHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtLmFkZEV2ZW50TGlzdGVuZXIpIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50KSBlbGVtLmF0dGFjaEV2ZW50KFwib25cIiArIHR5cGUsIGhhbmRsZXIpO1xuICAgICAgZWxzZSBlbGVtW1wib25cIiArIHR5cGVdID0gaGFuZGxlcjtcbiAgICB9LFxuICAgIG9wdGlvbnMgPSB7XG4gICAgICBhdXRvUnVuOiB0cnVlLFxuICAgICAgYmFyVGhpY2tuZXNzOiAzLFxuICAgICAgYmFyQ29sb3JzOiB7XG4gICAgICAgIDA6IFwicmdiYSgyNiwgIDE4OCwgMTU2LCAuOSlcIixcbiAgICAgICAgXCIuMjVcIjogXCJyZ2JhKDUyLCAgMTUyLCAyMTksIC45KVwiLFxuICAgICAgICBcIi41MFwiOiBcInJnYmEoMjQxLCAxOTYsIDE1LCAgLjkpXCIsXG4gICAgICAgIFwiLjc1XCI6IFwicmdiYSgyMzAsIDEyNiwgMzQsICAuOSlcIixcbiAgICAgICAgXCIxLjBcIjogXCJyZ2JhKDIxMSwgODQsICAwLCAgIC45KVwiLFxuICAgICAgfSxcbiAgICAgIHNoYWRvd0JsdXI6IDEwLFxuICAgICAgc2hhZG93Q29sb3I6IFwicmdiYSgwLCAgIDAsICAgMCwgICAuNilcIixcbiAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICB9LFxuICAgIHJlcGFpbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLmJhclRoaWNrbmVzcyAqIDU7IC8vIG5lZWQgc3BhY2UgZm9yIHNoYWRvd1xuXG4gICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gb3B0aW9ucy5zaGFkb3dCbHVyO1xuICAgICAgY3R4LnNoYWRvd0NvbG9yID0gb3B0aW9ucy5zaGFkb3dDb2xvcjtcblxuICAgICAgdmFyIGxpbmVHcmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCBjYW52YXMud2lkdGgsIDApO1xuICAgICAgZm9yICh2YXIgc3RvcCBpbiBvcHRpb25zLmJhckNvbG9ycylcbiAgICAgICAgbGluZUdyYWRpZW50LmFkZENvbG9yU3RvcChzdG9wLCBvcHRpb25zLmJhckNvbG9yc1tzdG9wXSk7XG4gICAgICBjdHgubGluZVdpZHRoID0gb3B0aW9ucy5iYXJUaGlja25lc3M7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDAsIG9wdGlvbnMuYmFyVGhpY2tuZXNzIC8gMik7XG4gICAgICBjdHgubGluZVRvKFxuICAgICAgICBNYXRoLmNlaWwoY3VycmVudFByb2dyZXNzICogY2FudmFzLndpZHRoKSxcbiAgICAgICAgb3B0aW9ucy5iYXJUaGlja25lc3MgLyAyXG4gICAgICApO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbGluZUdyYWRpZW50O1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0sXG4gICAgY3JlYXRlQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIHZhciBzdHlsZSA9IGNhbnZhcy5zdHlsZTtcbiAgICAgIHN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgICAgc3R5bGUudG9wID0gc3R5bGUubGVmdCA9IHN0eWxlLnJpZ2h0ID0gc3R5bGUubWFyZ2luID0gc3R5bGUucGFkZGluZyA9IDA7XG4gICAgICBzdHlsZS56SW5kZXggPSAxMDAwMDE7XG4gICAgICBzdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBpZiAob3B0aW9ucy5jbGFzc05hbWUpIGNhbnZhcy5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgIGFkZEV2ZW50KHdpbmRvdywgXCJyZXNpemVcIiwgcmVwYWludCk7XG4gICAgfSxcbiAgICB0b3BiYXIgPSB7XG4gICAgICBjb25maWc6IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRzKVxuICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIG9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcbiAgICAgIH0sXG4gICAgICBzaG93OiBmdW5jdGlvbiAoZGVsYXkpIHtcbiAgICAgICAgaWYgKHNob3dpbmcpIHJldHVybjtcbiAgICAgICAgaWYgKGRlbGF5KSB7XG4gICAgICAgICAgaWYgKGRlbGF5VGltZXJJZCkgcmV0dXJuO1xuICAgICAgICAgIGRlbGF5VGltZXJJZCA9IHNldFRpbWVvdXQoKCkgPT4gdG9wYmFyLnNob3coKSwgZGVsYXkpO1xuICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICBzaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoZmFkZVRpbWVySWQgIT09IG51bGwpIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShmYWRlVGltZXJJZCk7XG4gICAgICAgICAgaWYgKCFjYW52YXMpIGNyZWF0ZUNhbnZhcygpO1xuICAgICAgICAgIGNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICB0b3BiYXIucHJvZ3Jlc3MoMCk7XG4gICAgICAgICAgaWYgKG9wdGlvbnMuYXV0b1J1bikge1xuICAgICAgICAgICAgKGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgICAgIHByb2dyZXNzVGltZXJJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgICAgICAgIHRvcGJhci5wcm9ncmVzcyhcbiAgICAgICAgICAgICAgICBcIitcIiArIDAuMDUgKiBNYXRoLnBvdygxIC0gTWF0aC5zcXJ0KGN1cnJlbnRQcm9ncmVzcyksIDIpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb2dyZXNzOiBmdW5jdGlvbiAodG8pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0byA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGN1cnJlbnRQcm9ncmVzcztcbiAgICAgICAgaWYgKHR5cGVvZiB0byA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHRvID1cbiAgICAgICAgICAgICh0by5pbmRleE9mKFwiK1wiKSA+PSAwIHx8IHRvLmluZGV4T2YoXCItXCIpID49IDBcbiAgICAgICAgICAgICAgPyBjdXJyZW50UHJvZ3Jlc3NcbiAgICAgICAgICAgICAgOiAwKSArIHBhcnNlRmxvYXQodG8pO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQcm9ncmVzcyA9IHRvID4gMSA/IDEgOiB0bztcbiAgICAgICAgcmVwYWludCgpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb2dyZXNzO1xuICAgICAgfSxcbiAgICAgIGhpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRlbGF5VGltZXJJZCk7XG4gICAgICAgIGRlbGF5VGltZXJJZCA9IG51bGw7XG4gICAgICAgIGlmICghc2hvd2luZykgcmV0dXJuO1xuICAgICAgICBzaG93aW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChwcm9ncmVzc1RpbWVySWQgIT0gbnVsbCkge1xuICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShwcm9ncmVzc1RpbWVySWQpO1xuICAgICAgICAgIHByb2dyZXNzVGltZXJJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgKGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgaWYgKHRvcGJhci5wcm9ncmVzcyhcIisuMVwiKSA+PSAxKSB7XG4gICAgICAgICAgICBjYW52YXMuc3R5bGUub3BhY2l0eSAtPSAwLjA1O1xuICAgICAgICAgICAgaWYgKGNhbnZhcy5zdHlsZS5vcGFjaXR5IDw9IDAuMDUpIHtcbiAgICAgICAgICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgZmFkZVRpbWVySWQgPSBudWxsO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGZhZGVUaW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0sXG4gICAgfTtcblxuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHRvcGJhcjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdG9wYmFyO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudG9wYmFyID0gdG9wYmFyO1xuICB9XG59LmNhbGwodGhpcywgd2luZG93LCBkb2N1bWVudCkpO1xuIiwgIi8vIElmIHlvdSB3YW50IHRvIHVzZSBQaG9lbml4IGNoYW5uZWxzLCBydW4gYG1peCBoZWxwIHBoeC5nZW4uY2hhbm5lbGBcbi8vIHRvIGdldCBzdGFydGVkIGFuZCB0aGVuIHVuY29tbWVudCB0aGUgbGluZSBiZWxvdy5cbi8vIGltcG9ydCBcIi4vdXNlcl9zb2NrZXQuanNcIlxuXG4vLyBZb3UgY2FuIGluY2x1ZGUgZGVwZW5kZW5jaWVzIGluIHR3byB3YXlzLlxuLy9cbi8vIFRoZSBzaW1wbGVzdCBvcHRpb24gaXMgdG8gcHV0IHRoZW0gaW4gYXNzZXRzL3ZlbmRvciBhbmRcbi8vIGltcG9ydCB0aGVtIHVzaW5nIHJlbGF0aXZlIHBhdGhzOlxuLy9cbi8vICAgICBpbXBvcnQgXCIuLi92ZW5kb3Ivc29tZS1wYWNrYWdlLmpzXCJcbi8vXG4vLyBBbHRlcm5hdGl2ZWx5LCB5b3UgY2FuIGBucG0gaW5zdGFsbCBzb21lLXBhY2thZ2UgLS1wcmVmaXggYXNzZXRzYCBhbmQgaW1wb3J0XG4vLyB0aGVtIHVzaW5nIGEgcGF0aCBzdGFydGluZyB3aXRoIHRoZSBwYWNrYWdlIG5hbWU6XG4vL1xuLy8gICAgIGltcG9ydCBcInNvbWUtcGFja2FnZVwiXG4vL1xuXG4vLyBJbmNsdWRlIHBob2VuaXhfaHRtbCB0byBoYW5kbGUgbWV0aG9kPVBVVC9ERUxFVEUgaW4gZm9ybXMgYW5kIGJ1dHRvbnMuXG5pbXBvcnQgXCJwaG9lbml4X2h0bWxcIlxuLy8gRXN0YWJsaXNoIFBob2VuaXggU29ja2V0IGFuZCBMaXZlVmlldyBjb25maWd1cmF0aW9uLlxuaW1wb3J0IHtTb2NrZXR9IGZyb20gXCJwaG9lbml4XCJcbmltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbmltcG9ydCB0b3BiYXIgZnJvbSBcIi4uL3ZlbmRvci90b3BiYXJcIlxuXG5sZXQgY3NyZlRva2VuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1ldGFbbmFtZT0nY3NyZi10b2tlbiddXCIpLmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIilcbmxldCBsaXZlU29ja2V0ID0gbmV3IExpdmVTb2NrZXQoXCIvbGl2ZVwiLCBTb2NrZXQsIHtcbiAgbG9uZ1BvbGxGYWxsYmFja01zOiAyNTAwLFxuICBwYXJhbXM6IHtfY3NyZl90b2tlbjogY3NyZlRva2VufVxufSlcblxuLy8gU2hvdyBwcm9ncmVzcyBiYXIgb24gbGl2ZSBuYXZpZ2F0aW9uIGFuZCBmb3JtIHN1Ym1pdHNcbnRvcGJhci5jb25maWcoe2JhckNvbG9yczogezA6IFwiIzI5ZFwifSwgc2hhZG93Q29sb3I6IFwicmdiYSgwLCAwLCAwLCAuMylcIn0pXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBoeDpwYWdlLWxvYWRpbmctc3RhcnRcIiwgX2luZm8gPT4gdG9wYmFyLnNob3coMzAwKSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGh4OnBhZ2UtbG9hZGluZy1zdG9wXCIsIF9pbmZvID0+IHRvcGJhci5oaWRlKCkpXG5cbi8vIGNvbm5lY3QgaWYgdGhlcmUgYXJlIGFueSBMaXZlVmlld3Mgb24gdGhlIHBhZ2VcbmxpdmVTb2NrZXQuY29ubmVjdCgpXG5cbi8vIGV4cG9zZSBsaXZlU29ja2V0IG9uIHdpbmRvdyBmb3Igd2ViIGNvbnNvbGUgZGVidWcgbG9ncyBhbmQgbGF0ZW5jeSBzaW11bGF0aW9uOlxuLy8gPj4gbGl2ZVNvY2tldC5lbmFibGVEZWJ1ZygpXG4vLyA+PiBsaXZlU29ja2V0LmVuYWJsZUxhdGVuY3lTaW0oMTAwMCkgIC8vIGVuYWJsZWQgZm9yIGR1cmF0aW9uIG9mIGJyb3dzZXIgc2Vzc2lvblxuLy8gPj4gbGl2ZVNvY2tldC5kaXNhYmxlTGF0ZW5jeVNpbSgpXG53aW5kb3cubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXRcblxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBRUEsT0FBQyxXQUFXO0FBQ1YsWUFBSSxnQkFB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QUFVO0FBQ1YsZ0JBQUksbUJBQW1CLE1BQU07QUFDM0IsY0FBQUEsUUFBTyxxQkFBcUIsZUFBZTtBQUMzQyxnQ0FBa0I7QUFBQSxZQUNwQjtBQUNBLGFBQUMsU0FBUyxPQUFPO0FBQ2Ysa0JBQUksT0FBTyxTQUFTLEtBQUssS0FBSyxHQUFHO0FBQy9CLHVCQUFPLE1BQU0sV0FBVztBQUN4QixvQkFBSSxPQUFPLE1BQU0sV0FBVyxNQUFNO0FBQ2hDLHlCQUFPLE1BQU0sVUFBVTtBQUN2QixnQ0FBYztBQUNkO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQ0EsNEJBQWNBLFFBQU8sc0JBQXNCLElBQUk7QUFBQSxZQUNqRCxHQUFHO0FBQUEsVUFDTDtBQUFBLFFBQ0Y7QUFFRixZQUFJLE9BQU8sV0FBVyxZQUFZLE9BQU8sT0FBTyxZQUFZLFVBQVU7QUFDcEUsaUJBQU8sVUFBVTtBQUFBLFFBQ25CLFdBQVcsT0FBTyxXQUFXLGNBQWMsT0FBTyxLQUFLO0FBQ3JELGlCQUFPLFdBQVk7QUFDakIsbUJBQU87QUFBQSxVQUNULENBQUM7QUFBQSxRQUNILE9BQU87QUFDTCxlQUFLLFNBQVM7QUFBQSxRQUNoQjtBQUFBLE1BQ0YsR0FBRSxLQUFLLFNBQU0sUUFBUSxRQUFRO0FBQUE7QUFBQTs7O0FDcEs3QjtBQUFBO0FBa0JBO0FBRUE7QUFDQTtBQUNBLDBCQUFtQjtBQUVuQixVQUFJLFlBQVksU0FBUyxjQUFjLHlCQUF5QixFQUFFLGFBQWEsU0FBUztBQUN4RixVQUFJLGFBQWEsSUFBSSxXQUFXLFNBQVMsUUFBUTtBQUFBLFFBQy9DLG9CQUFvQjtBQUFBLFFBQ3BCLFFBQVEsRUFBQyxhQUFhLFVBQVM7QUFBQSxNQUNqQyxDQUFDO0FBR0Qsb0JBQUFFLFFBQU8sT0FBTyxFQUFDLFdBQVcsRUFBQyxHQUFHLE9BQU0sR0FBRyxhQUFhLG9CQUFtQixDQUFDO0FBQ3hFLGFBQU8saUJBQWlCLDBCQUEwQixXQUFTLGNBQUFBLFFBQU8sS0FBSyxHQUFHLENBQUM7QUFDM0UsYUFBTyxpQkFBaUIseUJBQXlCLFdBQVMsY0FBQUEsUUFBTyxLQUFLLENBQUM7QUFHdkUsaUJBQVcsUUFBUTtBQU1uQixhQUFPLGFBQWE7QUFBQTtBQUFBOyIsCiAgIm5hbWVzIjogWyJDdXN0b21FdmVudCIsICJjbG9zdXJlIiwgIm1vcnBoQXR0cnMiLCAibW9ycGhkb20iLCAiY2hpbGRyZW5Pbmx5IiwgImNsb3N1cmUiLCAiZSIsICJpc0VtcHR5IiwgImZpbGUiLCAidGFyZ2V0Q29udGFpbmVyIiwgImNsb25lIiwgImVsIiwgImlucHV0c1VudXNlZCIsICJvbmx5SGlkZGVuSW5wdXRzIiwgImxvY2siLCAibG9hZGluZyIsICJlbnRyeSIsICJpbnB1dCIsICJ3aW5kb3ciLCAiZG9jdW1lbnQiLCAidG9wYmFyIl0KfQo=
