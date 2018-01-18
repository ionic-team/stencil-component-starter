'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ts = require('typescript');

/**
 * This constants file is largely for minification tricks, and to
 * have easy to read variable names. Enums would make more sense
 * in most cases, but doing values like this as constants allows
 * minifiers to just place the raw value directly in source, and in
 * production there is no variable at all. For example, the minifier
 * turns data[BUNDLE_ID] turns into data[0] for production builds.
 */
/**
 * Member Types
 */
var MEMBER_PROP = 1;
var MEMBER_PROP_MUTABLE = 2;
var MEMBER_PROP_CONTEXT = 3;
var MEMBER_PROP_CONNECT = 4;
var MEMBER_STATE = 5;
var MEMBER_METHOD = 6;
var MEMBER_ELEMENT_REF = 7;
/**
 * Prop Change Meta Indexes
 */
var PROP_CHANGE_PROP_NAME = 0;
var PROP_CHANGE_METHOD_NAME = 1;
/**
 * Property Types
 */

var TYPE_BOOLEAN = 1;
var TYPE_NUMBER = 2;
/**
 * JS Property to Attribute Name Options
 */
var ATTR_LOWER_CASE = 1;
/**
 * Priority Levels
 */
var PRIORITY_HIGH = 3;

var PRIORITY_LOW = 1;
/**
 * Slot Meta
 */
var SLOT_TAG = 0;
var HAS_SLOTS = 1;
var HAS_NAMED_SLOTS = 2;
/**
 * SSR Attribute Names
 */
var SSR_VNODE_ID = 'data-ssrv';
var SSR_CHILD_ID = 'data-ssrc';
/**
 * Node Types
 */

var TEXT_NODE = 3;
var COMMENT_NODE = 8;
/**
 * Key Name to Key Code Map
 */
var KEY_CODE_MAP = {
    'enter': 13,
    'escape': 27,
    'space': 32,
    'tab': 9,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40
};
/**
 * CSS class that gets added to the host element
 * after the component has fully hydrated
 */
var HYDRATED_CSS = '💎';
/**
 * Namespaces
 */



/**
 * File names and value
 */






/**
 * Errors
 */
var LOAD_BUNDLE_ERROR = 1;
var QUEUE_EVENTS_ERROR = 2;
var WILL_LOAD_ERROR = 3;
var DID_LOAD_ERROR = 4;
var WILL_UPDATE_ERROR = 5;
var DID_UPDATE_ERROR = 6;
var INIT_INSTANCE_ERROR = 7;
var RENDER_ERROR = 8;

function getBuildContext(ctx) {
    // create the build context if it doesn't exist
    ctx = ctx || {};
    ctx.diagnostics = ctx.diagnostics || [];
    ctx.manifest = ctx.manifest || {};
    ctx.registry = ctx.registry || {};
    ctx.filesToWrite = ctx.filesToWrite || {};
    ctx.appFiles = ctx.appFiles || {};
    ctx.moduleFiles = ctx.moduleFiles || {};
    ctx.jsFiles = ctx.jsFiles || {};
    ctx.cssFiles = ctx.cssFiles || {};
    ctx.dependentManifests = ctx.dependentManifests || {};
    ctx.moduleBundleOutputs = ctx.moduleBundleOutputs || {};
    ctx.styleSassOutputs = ctx.styleSassOutputs || {};
    ctx.changedFiles = ctx.changedFiles || [];
    return ctx;
}

function getJsFile(sys, ctx, jsFilePath) {
    jsFilePath = normalizePath(jsFilePath);
    if (typeof ctx.filesToWrite[jsFilePath] === 'string') {
        return Promise.resolve(ctx.filesToWrite[jsFilePath]);
    }
    if (typeof ctx.jsFiles[jsFilePath] === 'string') {
        return Promise.resolve(ctx.jsFiles[jsFilePath]);
    }
    return new Promise(function (resolve, reject) {
        sys.fs.readFile(jsFilePath, 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                ctx.jsFiles[jsFilePath] = data;
                resolve(data);
            }
        });
    });
}
function getCssFile(sys, ctx, cssFilePath) {
    cssFilePath = normalizePath(cssFilePath);
    if (typeof ctx.filesToWrite[cssFilePath] === 'string') {
        return Promise.resolve(ctx.filesToWrite[cssFilePath]);
    }
    if (typeof ctx.cssFiles[cssFilePath] === 'string') {
        return Promise.resolve(ctx.cssFiles[cssFilePath]);
    }
    return new Promise(function (resolve, reject) {
        sys.fs.readFile(cssFilePath, 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                ctx.cssFiles[cssFilePath] = data;
                resolve(data);
            }
        });
    });
}











function buildError(diagnostics) {
    var d = {
        level: 'error',
        type: 'build',
        header: 'build error',
        messageText: 'build error',
        relFilePath: null,
        absFilePath: null,
        lines: []
    };
    diagnostics.push(d);
    return d;
}

function catchError(diagnostics, err) {
    var d = {
        level: 'error',
        type: 'build',
        header: 'build error',
        messageText: 'build error',
        relFilePath: null,
        absFilePath: null,
        lines: []
    };
    if (err) {
        if (err.stack) {
            d.messageText = err.stack.toString();
        }
        else {
            if (err.message) {
                d.messageText = err.message.toString();
            }
            else {
                d.messageText = err.toString();
            }
        }
    }
    diagnostics.push(d);
    return d;
}

function normalizePath(str) {
    // Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
    // https://github.com/sindresorhus/slash MIT
    // By Sindre Sorhus
    if (EXTENDED_PATH_REGEX.test(str) || NON_ASCII_REGEX.test(str)) {
        return str;
    }
    return str.replace(SLASH_REGEX, '/');
}
var EXTENDED_PATH_REGEX = /^\\\\\?\\/;
var NON_ASCII_REGEX = /[^\x00-\x80]+/;
var SLASH_REGEX = /\\/g;

var VNode = /** @class */ (function () {
    function VNode() {
    }
    return VNode;
}());

/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
var stack = [];
function h(nodeName, vnodeData, child) {
    var children;
    var lastSimple = false;
    var simple = false;
    for (var i = arguments.length; i-- > 2;) {
        stack.push(arguments[i]);
    }
    while (stack.length) {
        if ((child = stack.pop()) && child.pop !== undefined) {
            for (i = child.length; i--;) {
                stack.push(child[i]);
            }
        }
        else {
            if (typeof child === 'boolean')
                child = null;
            if ((simple = typeof nodeName !== 'function')) {
                if (child == null)
                    child = '';
                else if (typeof child === 'number')
                    child = String(child);
                else if (typeof child !== 'string')
                    simple = false;
            }
            if (simple && lastSimple) {
                children[children.length - 1].vtext += child;
            }
            else if (children === undefined) {
                children = [simple ? t(child) : child];
            }
            else {
                children.push(simple ? t(child) : child);
            }
            lastSimple = simple;
        }
    }
    var vnode = new VNode();
    vnode.vtag = nodeName;
    vnode.vchildren = children;
    if (vnodeData) {
        // data object was provided
        vnode.vattrs = vnodeData.a;
        vnode.vprops = vnodeData.p;
        if (typeof vnodeData.c === 'string') {
            vnode.vclass = {};
            var cssClasses = vnodeData.c.split(' ');
            for (i = 0; i < cssClasses.length; i++) {
                if (cssClasses[i]) {
                    vnode.vclass[cssClasses[i]] = true;
                }
            }
        }
        else {
            vnode.vclass = vnodeData.c;
        }
        vnode.vstyle = vnodeData.s;
        vnode.vlisteners = vnodeData.o;
        vnode.vkey = vnodeData.k;
        vnode.vnamespace = vnodeData.n;
        // x = undefined: always check both data and children
        // x = 0 skip checking only data on update
        // x = 1 skip checking only children on update
        // x = 2 skip checking both data and children on update
        vnode.skipDataOnUpdate = vnodeData.x === 0 || vnodeData.x === 2;
        vnode.skipChildrenOnUpdate = vnodeData.x > 0;
    }
    else {
        // no data object was provided
        // so no data, so don't both checking data
        vnode.skipDataOnUpdate = true;
        // since no data was provided, than no x was provided
        // if no x was provided then we need to always check children
        // if if there are no children at all, then we know never to check children
        vnode.skipChildrenOnUpdate = (!children || children.length === 0);
    }
    return vnode;
}
function t(textValue) {
    var vnode = new VNode();
    vnode.vtext = textValue;
    return vnode;
}

function assignHostContentSlots(domApi, elm, slotMeta) {
    // compiler has already figured out if this component has slots or not
    // if the component doesn't even have slots then we'll skip over all of this code
    var childNodes = elm.childNodes;
    if (slotMeta && !elm.$defaultHolder) {
        domApi.$insertBefore(elm, (elm.$defaultHolder = domApi.$createComment('')), childNodes[0]);
    }
    if (slotMeta === HAS_NAMED_SLOTS) {
        // looks like this component has named slots
        // so let's loop through each of the childNodes to the host element
        // and pick out the ones that have a slot attribute
        // if it doesn't have a slot attribute, than it's a default slot
        var slotName = void 0;
        var defaultSlot = void 0;
        var namedSlots = void 0;
        for (var i = 0, childNodeLen = childNodes.length; i < childNodeLen; i++) {
            var childNode = childNodes[i];
            if (domApi.$nodeType(childNode) === 1 && ((slotName = domApi.$getAttribute(childNode, 'slot')) != null)) {
                // is element node
                // this element has a slot name attribute
                // so this element will end up getting relocated into
                // the component's named slot once it renders
                namedSlots = namedSlots || {};
                if (namedSlots[slotName]) {
                    namedSlots[slotName].push(childNode);
                }
                else {
                    namedSlots[slotName] = [childNode];
                }
            }
            else {
                // this is a text node
                // or it's an element node that doesn't have a slot attribute
                // let's add this node to our collection for the default slot
                if (defaultSlot) {
                    defaultSlot.push(childNode);
                }
                else {
                    defaultSlot = [childNode];
                }
            }
        }
        // keep a reference to all of the initial nodes
        // found as immediate childNodes to the host element
        elm._hostContentNodes = {
            defaultSlot: defaultSlot,
            namedSlots: namedSlots
        };
    }
    else if (slotMeta === HAS_SLOTS) {
        // this component doesn't have named slots, but it does
        // have at least a default slot, so the work here is alot easier than
        // when we're not looping through each element and reading attribute values
        elm._hostContentNodes = {
            defaultSlot: childNodes.length ? Array.apply(null, childNodes) : null
        };
    }
}

function createDomApi(document) {
    // using the $ prefix so that closure is
    // cool with property renaming each of these
    return {
        $documentElement: document.documentElement,
        $head: document.head,
        $body: document.body,
        $nodeType: function nodeType(node) {
            return node.nodeType;
        },
        $createEvent: function createEvent() {
            return document.createEvent('CustomEvent');
        },
        $createElement: function createElement(tagName) {
            return document.createElement(tagName);
        },
        $createElementNS: function createElementNS(namespace, tagName) {
            return document.createElementNS(namespace, tagName);
        },
        $createTextNode: function createTextNode(text) {
            return document.createTextNode(text);
        },
        $createComment: function createComment(data) {
            return document.createComment(data);
        },
        $insertBefore: function insertBefore(parentNode, childNode, referenceNode) {
            parentNode.insertBefore(childNode, referenceNode);
        },
        $removeChild: function removeChild(parentNode, childNode) {
            return parentNode.removeChild(childNode);
        },
        $appendChild: function appendChild(parentNode, childNode) {
            parentNode.appendChild(childNode);
        },
        $childNodes: function childNodes(node) {
            return node.childNodes;
        },
        $parentNode: function parentNode(node) {
            return node.parentNode;
        },
        $nextSibling: function nextSibling(node) {
            return node.nextSibling;
        },
        $tagName: function tagName(elm) {
            return elm.tagName;
        },
        $getTextContent: function (node) {
            return node.textContent;
        },
        $setTextContent: function setTextContent(node, text) {
            node.textContent = text;
        },
        $getAttribute: function getAttribute(elm, key) {
            return elm.getAttribute(key);
        },
        $setAttribute: function setAttribute(elm, key, val) {
            elm.setAttribute(key, val);
        },
        $setAttributeNS: function $setAttributeNS(elm, namespaceURI, qualifiedName, val) {
            elm.setAttributeNS(namespaceURI, qualifiedName, val);
        },
        $removeAttribute: function removeAttribute(elm, key) {
            elm.removeAttribute(key);
        }
    };
}

function createDomControllerServer() {
    var domCtrl = {
        read: function (cb) { process.nextTick(function () { cb(Date.now()); }); },
        write: function (cb) { process.nextTick(function () { cb(Date.now()); }); },
        raf: function (cb) { process.nextTick(function () { cb(Date.now()); }); }
    };
    return domCtrl;
}

function createQueueServer() {
    var highCallbacks = [];
    var mediumCallbacks = [];
    var lowCallbacks = [];
    var queued = false;
    function flush(cb) {
        while (highCallbacks.length > 0) {
            highCallbacks.shift()();
        }
        while (mediumCallbacks.length > 0) {
            mediumCallbacks.shift()();
        }
        while (lowCallbacks.length > 0) {
            lowCallbacks.shift()();
        }
        queued = (highCallbacks.length > 0) || (mediumCallbacks.length > 0) || (lowCallbacks.length > 0);
        if (queued) {
            process.nextTick(flush);
        }
        cb && cb();
    }
    function add(cb, priority) {
        if (priority === PRIORITY_HIGH) {
            highCallbacks.push(cb);
        }
        else if (priority === PRIORITY_LOW) {
            lowCallbacks.push(cb);
        }
        else {
            mediumCallbacks.push(cb);
        }
        if (!queued) {
            queued = true;
            process.nextTick(flush);
        }
    }
    return {
        add: add,
        flush: flush
    };
}

function isDef(v) { return v !== undefined && v !== null; }
function isUndef(v) { return v === undefined || v === null; }

function isObject(v) { return v !== null && typeof v === 'object'; }



function isFunction(v) { return typeof v === 'function'; }
function toDashCase(str) {
    return str.replace(/([A-Z])/g, function (g) { return '-' + g[0].toLowerCase(); });
}


function noop() { }


function getElementReference(elm, ref) {
    if (ref === 'child') {
        return elm.firstElementChild;
    }
    if (ref === 'parent') {
        return getParentElement(elm) || elm;
    }
    if (ref === 'body') {
        return elm.ownerDocument.body;
    }
    if (ref === 'document') {
        return elm.ownerDocument;
    }
    if (ref === 'window') {
        return elm.ownerDocument.defaultView;
    }
    return elm;
}
function getParentElement(elm) {
    if (elm.parentElement) {
        // normal element with a parent element
        return elm.parentElement;
    }
    if (elm.parentNode && elm.parentNode.host) {
        // shadow dom's document fragment
        return elm.parentNode.host;
    }
    return null;
}

var EMPTY = {};
var DEFAULT_OPTS = null;
function updateElement(plt, nodeOps, oldVnode, newVnode) {
    var isUpdate = (oldVnode != null);
    oldVnode = oldVnode || EMPTY;
    newVnode = newVnode || EMPTY;
    var key, cur, elm = newVnode.elm, oldData, newData;
    // update attrs
    if (oldVnode.vattrs || newVnode.vattrs) {
        oldData = oldVnode.vattrs || EMPTY;
        newData = newVnode.vattrs || EMPTY;
        // update modified attributes, add new attributes
        for (key in newData) {
            cur = newData[key];
            if (oldData[key] !== cur) {
                if (BOOLEAN_ATTRS[key] === 1) {
                    if (cur) {
                        nodeOps.$setAttribute(elm, key, '');
                    }
                    else {
                        nodeOps.$removeAttribute(elm, key);
                    }
                }
                else {
                    if (key.charCodeAt(0) !== 120 /* xChar */) {
                        nodeOps.$setAttribute(elm, key, cur);
                    }
                    else if (key.charCodeAt(3) === 58 /* colonChar */) {
                        // Assume xml namespace
                        nodeOps.$setAttributeNS(elm, XML_NS$1, key, cur);
                    }
                    else if (key.charCodeAt(5) === 58 /* colonChar */) {
                        // Assume xlink namespace
                        nodeOps.$setAttributeNS(elm, XLINK_NS$1, key, cur);
                    }
                    else {
                        nodeOps.$setAttribute(elm, key, cur);
                    }
                }
            }
        }
        // remove removed attributes
        // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
        // the other option is to remove all attributes with value == undefined
        if (isUpdate) {
            for (key in oldData) {
                if (!(key in newData)) {
                    nodeOps.$removeAttribute(elm, key);
                }
            }
        }
    }
    // update class
    if (oldVnode.vclass || newVnode.vclass) {
        oldData = oldVnode.vclass || EMPTY;
        newData = newVnode.vclass || EMPTY;
        if (isUpdate) {
            for (key in oldData) {
                if (!newData[key]) {
                    elm.classList.remove(key);
                }
            }
        }
        for (key in newData) {
            cur = newData[key];
            if (cur !== oldData[key]) {
                elm.classList[newData[key] ? 'add' : 'remove'](key);
            }
        }
    }
    // update props
    if (oldVnode.vprops || newVnode.vprops) {
        oldData = oldVnode.vprops || EMPTY;
        newData = newVnode.vprops || EMPTY;
        if (isUpdate) {
            for (key in oldData) {
                if (newData[key] === undefined) {
                    // only delete the old property when the
                    // new property is undefined, otherwise we'll
                    // end up deleting getters/setters
                    delete elm[key];
                }
            }
        }
        for (key in newData) {
            cur = newData[key];
            if (oldData[key] !== cur && (key !== 'value' || elm[key] !== cur)) {
                elm[key] = cur;
            }
        }
    }
    // update style
    if (oldVnode.vstyle || newVnode.vstyle) {
        oldData = oldVnode.vstyle || EMPTY;
        newData = newVnode.vstyle || EMPTY;
        if (isUpdate) {
            for (key in oldData) {
                if (!newData[key]) {
                    elm.style[key] = '';
                }
            }
        }
        for (key in newData) {
            cur = newData[key];
            if (cur !== oldData[key]) {
                elm.style[key] = cur;
            }
        }
    }
    // update event listeners
    oldData = oldVnode.vlisteners;
    newData = newVnode.vlisteners;
    if (oldData || newData) {
        if (!DEFAULT_OPTS) {
            DEFAULT_OPTS = plt.getEventOptions();
        }
        // remove existing listeners which no longer used
        if (isUpdate && oldData && oldVnode.assignedListener) {
            // if element changed or deleted we remove all existing listeners unconditionally
            for (key in oldData) {
                // remove listener if existing listener removed
                if (!newData || !newData[key]) {
                    oldVnode.elm.removeEventListener(key, oldVnode.assignedListener, DEFAULT_OPTS);
                }
            }
        }
        // add new listeners which has not already attached
        if (newData) {
            // reuse existing listener or create new
            cur = newVnode.assignedListener = oldVnode.assignedListener || createListener();
            // update vnode for listener
            cur.vnode = newVnode;
            // if element changed or added we add all needed listeners unconditionally
            for (key in newData) {
                // add listener if new listener added
                if (!oldData || !oldData[key]) {
                    elm.addEventListener(key, cur, DEFAULT_OPTS);
                }
            }
        }
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function handleEvent(event, vnode) {
    var eventName = event.type, on = vnode.vlisteners;
    // call event handler(s) if they exists
    if (on && on[eventName]) {
        invokeHandler(on[eventName], vnode, event);
    }
}
function invokeHandler(handler, vnode, event) {
    if (isFunction(handler)) {
        // call function handler
        handler.call(vnode, event, vnode);
    }
    else if (isObject(handler)) {
        // call handler with arguments
        if (isFunction(handler[0])) {
            // special case for single argument for performance
            if (handler.length === 2) {
                handler[0].call(vnode, handler[1], event, vnode);
            }
            else {
                var args = handler.slice(1);
                args.push(event);
                args.push(vnode);
                handler[0].apply(vnode, args);
            }
        }
        else {
            // call multiple handlers
            for (var i = 0; i < handler.length; i++) {
                invokeHandler(handler[i]);
            }
        }
    }
}
var BOOLEAN_ATTRS = {
    'allowfullscreen': 1,
    'async': 1,
    'autofocus': 1,
    'autoplay': 1,
    'checked': 1,
    'controls': 1,
    'disabled': 1,
    'enabled': 1,
    'formnovalidate': 1,
    'hidden': 1,
    'multiple': 1,
    'noresize': 1,
    'readonly': 1,
    'required': 1,
    'selected': 1,
    'spellcheck': 1,
};
var XLINK_NS$1 = 'http://www.w3.org/1999/xlink';
var XML_NS$1 = 'http://www.w3.org/XML/1998/namespace';

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/snabbdom/snabbdom/blob/master/LICENSE
 *
 * Modified for Stencil's renderer and slot projection
 */
function createRendererPatch(plt, domApi) {
    // createRenderer() is only created once per app
    // the patch() function which createRenderer() returned is the function
    // which gets called numerous times by each component
    function createElm(vnode, parentElm, childIndex) {
        var i = 0;
        if (vnode.vtag === SLOT_TAG) {
            if (hostContentNodes) {
                // special case for manually relocating host content nodes
                // to their new home in either a named slot or the default slot
                var namedSlot = (vnode.vattrs && vnode.vattrs.name);
                var slotNodes = void 0;
                if (isDef(namedSlot)) {
                    // this vnode is a named slot
                    slotNodes = hostContentNodes.namedSlots && hostContentNodes.namedSlots[namedSlot];
                }
                else {
                    // this vnode is the default slot
                    slotNodes = hostContentNodes.defaultSlot;
                }
                if (isDef(slotNodes)) {
                    // the host element has some nodes that need to be moved around
                    // we have a slot for the user's vnode to go into
                    // while we're moving nodes around, temporarily disable
                    // the disconnectCallback from working
                    plt.tmpDisconnected = true;
                    for (; i < slotNodes.length; i++) {
                        // remove the host content node from it's original parent node
                        // then relocate the host content node to its new slotted home
                        domApi.$appendChild(parentElm, domApi.$removeChild(domApi.$parentNode(slotNodes[i]), slotNodes[i]));
                    }
                    // done moving nodes around
                    // allow the disconnect callback to work again
                    plt.tmpDisconnected = false;
                }
            }
            // this was a slot node, we do not create slot elements, our work here is done
            // no need to return any element to be added to the dom
            return null;
        }
        if (isDef(vnode.vtext)) {
            // create text node
            vnode.elm = domApi.$createTextNode(vnode.vtext);
        }
        else {
            // create element
            var elm = vnode.elm = (vnode.vnamespace ? domApi.$createElementNS(vnode.vnamespace, vnode.vtag) : domApi.$createElement(vnode.vtag));
            // add css classes, attrs, props, listeners, etc.
            updateElement(plt, domApi, null, vnode);
            var children = vnode.vchildren;
            if (isDef(ssrId)) {
                // SSR ONLY: this is an SSR render and this
                // logic does not run on the client
                // give this element the SSR child id that can be read by the client
                domApi.$setAttribute(vnode.elm, SSR_CHILD_ID, ssrId + '.' + childIndex + (hasChildNodes(children) ? '' : '.'));
            }
            if (children) {
                var childNode = void 0;
                for (; i < children.length; ++i) {
                    // create the node
                    childNode = createElm(children[i], elm, i);
                    // return node could have been null
                    if (childNode) {
                        if (isDef(ssrId) && childNode.nodeType === 3) {
                            // SSR ONLY: add the text node's start comment
                            domApi.$appendChild(elm, domApi.$createComment('s.' + ssrId + '.' + i));
                        }
                        // append our new node
                        domApi.$appendChild(elm, childNode);
                        if (isDef(ssrId) && childNode.nodeType === 3) {
                            // SSR ONLY: add the text node's end comment
                            domApi.$appendChild(elm, domApi.$createComment('/'));
                            domApi.$appendChild(elm, domApi.$createTextNode(' '));
                        }
                    }
                }
            }
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
        var containerElm = (parentElm.$defaultHolder && parentElm.$defaultHolder.parentNode) || parentElm;
        var childNode;
        for (; startIdx <= endIdx; ++startIdx) {
            var vnodeChild = vnodes[startIdx];
            if (isDef(vnodeChild)) {
                if (isDef(vnodeChild.vtext)) {
                    childNode = domApi.$createTextNode(vnodeChild.vtext);
                }
                else {
                    childNode = createElm(vnodeChild, parentElm, startIdx);
                }
                if (isDef(childNode)) {
                    vnodeChild.elm = childNode;
                    domApi.$insertBefore(containerElm, childNode, before);
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var vnode = vnodes[startIdx];
            if (isDef(vnode)) {
                if (isDef(vnode.elm)) {
                    invokeDestroy(vnode);
                }
                domApi.$removeChild(parentElm, vnode.elm);
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx;
        var idxInOld;
        var elmToMove;
        var node;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (isSameVnode(oldStartVnode, newStartVnode)) {
                patchVNode(oldStartVnode, newStartVnode);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (isSameVnode(oldEndVnode, newEndVnode)) {
                patchVNode(oldEndVnode, newEndVnode);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (isSameVnode(oldStartVnode, newEndVnode)) {
                patchVNode(oldStartVnode, newEndVnode);
                domApi.$insertBefore(parentElm, oldStartVnode.elm, domApi.$nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (isSameVnode(oldEndVnode, newStartVnode)) {
                patchVNode(oldEndVnode, newStartVnode);
                domApi.$insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (isUndef(oldKeyToIdx)) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.vkey];
                if (isUndef(idxInOld)) {
                    // new element
                    node = createElm(newStartVnode, parentElm, newStartIdx);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.vtag !== newStartVnode.vtag) {
                        node = createElm(newStartVnode, parentElm, idxInOld);
                    }
                    else {
                        patchVNode(elmToMove, newStartVnode);
                        oldCh[idxInOld] = undefined;
                        node = elmToMove.elm;
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
                if (node) {
                    domApi.$insertBefore(parentElm, node, oldStartVnode.elm);
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            addVnodes(parentElm, (newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm), newCh, newStartIdx, newEndIdx);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function isSameVnode(vnode1, vnode2) {
        // compare if two vnode to see if they're "technically" the same
        // need to have the same element tag, and same key to be the same
        return vnode1.vtag === vnode2.vtag && vnode1.vkey === vnode2.vkey;
    }
    function createKeyToOldIdx(children, beginIdx, endIdx) {
        var i, map = {}, key, ch;
        for (i = beginIdx; i <= endIdx; ++i) {
            ch = children[i];
            if (ch != null) {
                key = ch.vkey;
                if (key !== undefined) {
                    map.k = i;
                }
            }
        }
        return map;
    }
    function patchVNode(oldVnode, newVnode) {
        var elm = newVnode.elm = oldVnode.elm;
        var oldChildren = oldVnode.vchildren;
        var newChildren = newVnode.vchildren;
        if (isUndef(newVnode.vtext)) {
            // element node
            if ((!isUpdate || !newVnode.skipDataOnUpdate) && newVnode.vtag !== SLOT_TAG) {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(plt, domApi, oldVnode, newVnode);
            }
            if (isDef(oldChildren) && isDef(newChildren)) {
                // looks like there's child vnodes for both the old and new vnodes
                if (!isUpdate || !newVnode.skipChildrenOnUpdate) {
                    // either this is the first render of an element OR it's an update
                    // AND we already know it's possible that the children could have changed
                    updateChildren(elm, oldChildren, newChildren);
                }
            }
            else if (isDef(newChildren)) {
                // no old child vnodes, but there are new child vnodes to add
                if (isDef(oldVnode.vtext)) {
                    // the old vnode was text, so be sure to clear it out
                    domApi.$setTextContent(elm, '');
                }
                // add the new vnode children
                addVnodes(elm, null, newChildren, 0, newChildren.length - 1);
            }
            else if (isDef(oldChildren)) {
                // no new child vnodes, but there are old child vnodes to remove
                removeVnodes(elm, oldChildren, 0, oldChildren.length - 1);
            }
        }
        else if (elm._hostContentNodes && elm._hostContentNodes.defaultSlot) {
            // this element has slotted content
            var parentElement = elm._hostContentNodes.defaultSlot[0].parentElement;
            domApi.$setTextContent(parentElement, newVnode.vtext);
            elm._hostContentNodes.defaultSlot = [parentElement.childNodes[0]];
        }
        else {
            // update the text content for the text only vnode
            domApi.$setTextContent(elm, newVnode.vtext);
        }
    }
    // internal variables to be reused per patch() call
    var isUpdate, hostContentNodes, ssrId;
    return function patch(oldVnode, newVnode, isUpdatePatch, hostElementContentNodes, ssrPatchId) {
        // patchVNode() is synchronous
        // so it is safe to set these variables and internally
        // the same patch() call will reference the same data
        isUpdate = isUpdatePatch;
        hostContentNodes = hostElementContentNodes;
        ssrId = ssrPatchId;
        // synchronous patch
        patchVNode(oldVnode, newVnode);
        if (isDef(ssrId)) {
            // SSR ONLY: we've been given an SSR id, so the host element
            // should be given the ssr id attribute
            domApi.$setAttribute(oldVnode.elm, SSR_VNODE_ID, ssrId);
        }
        // return our new vnode
        return newVnode;
    };
}
function invokeDestroy(vnode) {
    if (vnode.vlisteners && vnode.assignedListener) {
        for (var key in vnode.vlisteners) {
            vnode.elm.removeEventListener(key, vnode.vlisteners, false);
        }
    }
    if (isDef(vnode.vchildren)) {
        for (var i = 0; i < vnode.vchildren.length; ++i) {
            vnode.vchildren[i] && invokeDestroy(vnode.vchildren[i]);
        }
    }
}
function hasChildNodes(children) {
    // SSR ONLY: check if there are any more nested child elements
    // if there aren't, this info is useful so the client runtime
    // doesn't have to climb down and check so many elements
    if (children) {
        for (var i = 0; i < children.length; i++) {
            if (children[i].vtag !== SLOT_TAG || hasChildNodes(children[i].vchildren)) {
                return true;
            }
        }
    }
    return false;
}

function getAppFileName(config) {
    return config.namespace.toLowerCase();
}

function parseMembersData(cmpMeta, memberData, attr) {
    if (memberData) {
        cmpMeta.membersMeta = cmpMeta.membersMeta || {};
        for (var i = 0; i < memberData.length; i++) {
            var d = memberData[i];
            cmpMeta.membersMeta[d[0]] = {
                memberType: d[1],
                attribName: attr === ATTR_LOWER_CASE ? d[0].toLowerCase() : toDashCase(d[0]),
                propType: d[2],
                ctrlId: d[3]
            };
        }
    }
}
function parseComponentMeta(registry, moduleImports, cmpMetaData, attr) {
    // tag name will always be upper case
    var cmpMeta = registry[cmpMetaData[0]];
    // get the component class which was added to moduleImports
    // using the tag as the key on the export object
    cmpMeta.componentModule = moduleImports[cmpMetaData[0]];
    // component members
    parseMembersData(cmpMeta, cmpMetaData[1], attr);
    // host element meta
    cmpMeta.hostMeta = cmpMetaData[2];
    // component instance events
    if (cmpMetaData[3]) {
        cmpMeta.eventsMeta = cmpMetaData[3].map(parseEventData);
    }
    // component instance prop WILL change methods
    cmpMeta.propsWillChangeMeta = cmpMetaData[4];
    // component instance prop DID change methods
    cmpMeta.propsDidChangeMeta = cmpMetaData[5];
    // is shadow
    cmpMeta.isShadowMeta = !!cmpMetaData[6];
}
function parseEventData(d) {
    return {
        eventName: d[0],
        eventMethodName: d[1] || d[0],
        eventBubbles: !d[2],
        eventCancelable: !d[3],
        eventComposed: !d[4]
    };
}
function parsePropertyValue(propType, propValue) {
    // ensure this value is of the correct prop type
    if (isDef(propValue)) {
        if (propType === TYPE_BOOLEAN) {
            // per the HTML spec, any string value means it is a boolean "true" value
            // but we'll cheat here and say that the string "false" is the boolean false
            return (propValue === 'false' ? false : propValue === '' || !!propValue);
        }
        if (propType === TYPE_NUMBER) {
            // force it to be a number
            return parseFloat(propValue);
        }
    }
    // not sure exactly what type we want
    // so no need to change to a different type
    return propValue;
}

function attributeChangedCallback(plt, elm, attribName, oldVal, newVal) {
    // only react if the attribute values actually changed
    if (oldVal !== newVal) {
        // normalize the attribute name w/ lower case
        attribName = attribName.toLowerCase();
        // using the known component meta data
        // look up to see if we have a property wired up to this attribute name
        var propsMeta = plt.getComponentMeta(elm).membersMeta;
        if (propsMeta) {
            for (var propName in propsMeta) {
                if (propsMeta[propName].attribName === attribName) {
                    // cool we've got a prop using this attribute name the value will
                    // be a string, so let's convert it to the correct type the app wants
                    // below code is ugly yes, but great minification ;)
                    elm[propName] = parsePropertyValue(propsMeta[propName].propType, newVal);
                    break;
                }
            }
        }
    }
}

function initElementListeners(plt, elm) {
    // so the element was just connected, which means it's in the DOM
    // however, the component instance hasn't been created yet
    // but what if an event it should be listening to get emitted right now??
    // let's add our listeners right now to our element, and if it happens
    // to receive events between now and the instance being created let's
    // queue up all of the event data and fire it off on the instance when it's ready
    var cmpMeta = plt.getComponentMeta(elm);
    var listeners = cmpMeta.listenersMeta;
    if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
            var listener = listeners[i];
            if (listener.eventDisabled)
                continue;
            (elm._listeners = elm._listeners || {})[listener.eventName] = addEventListener(plt, elm, listener.eventName, createListenerCallback(elm, listener.eventMethodName), listener.eventCapture, listener.eventPassive);
        }
    }
}
function createListenerCallback(elm, eventMethodName) {
    // create the function that gets called when the element receives
    // an event which it should be listening for
    return function onEvent(ev) {
        if (elm.$instance) {
            // instance is ready, let's call it's member method for this event
            elm.$instance[eventMethodName](ev);
        }
        else {
            // instance is not ready!!
            // let's queue up this event data and replay it later
            // when the instance is ready
            (elm._queuedEvents = elm._queuedEvents || []).push(eventMethodName, ev);
        }
    };
}
function replayQueuedEventsOnInstance(elm) {
    // the element has an instance now and
    // we already added the event listeners to the element
    var queuedEvents = elm._queuedEvents;
    if (queuedEvents) {
        // events may have already fired before the instance was even ready
        // now that the instance is ready, let's replay all of the events that
        // we queued up earlier that were originally meant for the instance
        for (var i = 0; i < queuedEvents.length; i += 2) {
            // data was added in sets of two
            // first item the eventMethodName
            // second item is the event data
            // take a look at initElementListener()
            elm.$instance[queuedEvents[i]](queuedEvents[i + 1]);
        }
        // no longer need this data, be gone with you
        delete elm._queuedEvents;
    }
}

function addEventListener(plt, elm, eventName, listenerCallback, useCapture, usePassive) {
    // depending on the event name, we could actually be
    // attaching this element to something like the document or window
    var splt = eventName.split(':');
    if (elm && splt.length > 1) {
        // document:mousemove
        // parent:touchend
        // body:keyup.enter
        elm = getElementReference(elm, splt[0]);
        eventName = splt[1];
    }
    if (!elm) {
        // something's up, let's not continue and just return a noop()
        return noop;
    }
    // test to see if we're looking for an exact keycode
    splt = eventName.split('.');
    var testKeyCode = 0;
    if (splt.length > 1) {
        // looks like this listener is also looking for a keycode
        // keyup.enter
        eventName = splt[0];
        testKeyCode = KEY_CODE_MAP[splt[1]];
    }
    // create the our internal event listener callback we'll be firing off
    // within it is the user's event listener callback and some other goodies
    function eventListener(ev) {
        if (testKeyCode > 0 && ev.keyCode !== testKeyCode) {
            // we're looking for a specific keycode
            // but the one we were given wasn't the right keycode
            return;
        }
        // fire the user's component event listener callback
        // if the instance isn't ready yet, this listener is already
        // set to handle that and re-queue the update when it is ready
        listenerCallback(ev);
        if (elm.$instance) {
            // only queue an update if this element itself is a host element
            // and only queue an update if host element's instance is ready
            // once its instance has been created, it'll then queue the update again
            // queue it up for an update which then runs a re-render
            elm._queueUpdate();
            // test if this is the user's interaction
            if (isUserInteraction(eventName)) {
                // so turns out that it's very important to flush the queue NOW
                // this way the app immediately reflects whatever the user just did
                plt.queue.flush();
            }
        }
    }
    // get our event listener options
    // mainly this is used to set passive events if this browser supports it
    var eventListenerOpts = plt.getEventOptions(useCapture, usePassive);
    // ok, good to go, let's add the actual listener to the dom element
    elm.addEventListener(eventName, eventListener, eventListenerOpts);
    // return a function which is used to remove this very same listener
    return function removeListener() {
        if (elm) {
            elm.removeEventListener(eventName, eventListener, eventListenerOpts);
        }
    };
}
function isUserInteraction(eventName) {
    for (var i = 0; i < USER_INTERACTIONS.length; i++) {
        if (eventName.indexOf(USER_INTERACTIONS[i]) > -1) {
            return true;
        }
    }
    return false;
}
var USER_INTERACTIONS = ['touch', 'mouse', 'pointer', 'key', 'focus', 'blur', 'drag'];
function detachListeners(elm) {
    var deregisterFns = elm._listeners;
    if (deregisterFns) {
        var eventNames = Object.keys(deregisterFns);
        for (var i = 0; i < eventNames.length; i++) {
            deregisterFns[eventNames[i]]();
        }
        elm._listeners = null;
    }
}

function connectedCallback(plt, elm) {
    // do not reconnect if we've already created an instance for this element
    if (!elm._hasConnected) {
        // first time we've connected
        elm._hasConnected = true;
        // if somehow this node was reused, ensure we've removed this property
        delete elm._hasDestroyed;
        // initialize our event listeners on the host element
        // we do this now so that we can listening to events that may
        // have fired even before the instance is ready
        initElementListeners(plt, elm);
        // register this component as an actively
        // loading child to its parent component
        registerWithParentComponent(plt, elm);
        // add to the queue to load the bundle
        // it's important to have an async tick in here so we can
        // ensure the "mode" attribute has been added to the element
        // place in high priority since it's not much work and we need
        // to know as fast as possible, but still an async tick in between
        plt.queue.add(function () {
            // get the component meta data about this component
            var cmpMeta = plt.getComponentMeta(elm);
            // only collects slot references if this component even has slots
            plt.connectHostElement(elm, cmpMeta.slotMeta);
            // start loading this component mode's bundle
            // if it's already loaded then the callback will be synchronous
            plt.loadBundle(cmpMeta, elm, function loadComponentCallback() {
                // we've fully loaded the component mode data
                // let's queue it up to be rendered next
                elm._queueUpdate();
            });
        }, PRIORITY_HIGH);
    }
}
function registerWithParentComponent(plt, elm) {
    // find the first ancestor host element (if there is one) and register
    // this element as one of the actively loading child elements for its ancestor
    var ancestorHostElement = elm;
    while (ancestorHostElement = getParentElement(ancestorHostElement)) {
        // climb up the ancestors looking for the first registered component
        if (plt.getComponentMeta(ancestorHostElement)) {
            // we found this elements the first ancestor host element
            // if the ancestor already loaded then do nothing, it's too late
            if (!ancestorHostElement._hasLoaded) {
                // keep a reference to this element's ancestor host element
                elm._ancestorHostElement = ancestorHostElement;
                // ensure there is an array to contain a reference to each of the child elements
                // and set this element as one of the ancestor's child elements it should wait on
                if (ancestorHostElement._activelyLoadingChildren) {
                    ancestorHostElement._activelyLoadingChildren.push(elm);
                }
                else {
                    ancestorHostElement._activelyLoadingChildren = [elm];
                }
            }
            break;
        }
    }
}

function disconnectedCallback(plt, elm) {
    // only disconnect if we're not temporarily disconnected
    // tmpDisconnected will happen when slot nodes are being relocated
    if (!plt.tmpDisconnected && isDisconnected(elm)) {
        // ok, let's officially destroy this thing
        // set this to true so that any of our pending async stuff
        // doesn't continue since we already decided to destroy this node
        elm._hasDestroyed = true;
        // double check that we've informed the ancestor host elements
        // that they're good to go and loaded (cuz this one is on its way out)
        propagateElementLoaded(elm);
        // call instance Did Unload and destroy instance stuff
        // if we've created an instance for this
        var instance = elm.$instance;
        if (instance) {
            // call the user's componentDidUnload if there is one
            instance.componentDidUnload && instance.componentDidUnload();
            elm.$instance = instance.__el = elm.$defaultHolder = instance.__values = instance.__values.__propWillChange = instance.__values.__propDidChange = null;
        }
        // detatch any event listeners that may have been added
        // this will also set _listeners to null if there are any
        detachListeners(elm);
        // destroy the vnode and child vnodes if they exist
        elm._vnode && invokeDestroy(elm._vnode);
        if (elm._hostContentNodes) {
            // overreacting here just to reduce any memory leak issues
            elm._hostContentNodes = elm._hostContentNodes.defaultSlot = elm._hostContentNodes.namedSlots = null;
        }
        // fuhgeddaboudit
        // set it all to null to ensure we forget references
        // and reset values incase this node gets reused somehow
        // (possible that it got disconnected, but the node was reused)
        elm._root = elm._vnode = elm._ancestorHostElement = elm._activelyLoadingChildren = elm._hasConnected = elm._isQueuedForUpdate = elm._hasLoaded = elm._observer = null;
    }
}
function isDisconnected(elm) {
    while (elm) {
        if (elm.parentElement === null) {
            return elm.tagName !== 'HTML';
        }
        elm = elm.parentElement;
    }
    return false;
}

function initEventEmitters(plt, componentEvents, instance) {
    if (componentEvents) {
        componentEvents.forEach(function (eventMeta) {
            instance[eventMeta.eventMethodName] = {
                emit: function eventEmitter(data) {
                    var eventData = {
                        bubbles: eventMeta.eventBubbles,
                        composed: eventMeta.eventComposed,
                        cancelable: eventMeta.eventCancelable,
                        detail: data
                    };
                    plt.emitEvent(instance.__el, eventMeta.eventName, eventData);
                }
            };
        });
    }
}

/**
 * Create a mutation observer for the elm.
 *
 * @param plt platform api
 * @param elm the element to create an observer for
 */
function createMutationObserver(plt, elm) {
    if (plt.isClient) {
        var elementReset_1 = createElementReset(plt, elm);
        elm._observer = new MutationObserver(function (mutations) {
            mutations.forEach(elementReset_1);
        });
    }
}
function createElementReset(plt, elm) {
    return function () {
        var cmpMeta = plt.getComponentMeta(elm);
        elm._vnode = null;
        plt.connectHostElement(elm, cmpMeta.slotMeta);
        stopObserving(plt, elm);
        elm._render();
        startObserving(plt, elm);
    };
}
/**
 * Start the observer that each element has
 *
 * @param elm the element to watch
 */
function startObserving(plt, elm) {
    if (plt.isClient && elm._observer) {
        return elm._observer.observe(elm, {
            'childList': true
        });
    }
}
function stopObserving(plt, elm) {
    if (plt.isClient && elm._observer) {
        return elm._observer.disconnect();
    }
}

function createThemedClasses(mode, color, classList) {
    var allClasses = {};
    return classList.split(' ')
        .reduce(function (classObj, classString) {
        classObj[classString] = true;
        if (mode) {
            classObj[classString + "-" + mode] = true;
            if (color) {
                classObj[classString + "-" + color] = true;
                classObj[classString + "-" + mode + "-" + color] = true;
            }
        }
        return classObj;
    }, allClasses);
}

function render$1(plt, elm, cmpMeta, isUpdateRender) {
    var instance = elm.$instance;
    // if this component has a render function, let's fire
    // it off and generate the child vnodes for this host element
    // note that we do not create the host element cuz it already exists
    var hostMeta = cmpMeta.hostMeta;
    if (instance.render || instance.hostData || hostMeta) {
        var vnodeChildren = instance.render && instance.render();
        var vnodeHostData = instance.hostData && instance.hostData();
        if (hostMeta) {
            vnodeHostData = Object.keys(hostMeta).reduce(function (hostData, key) {
                switch (key) {
                    case 'theme':
                        hostData['class'] = hostData['class'] || {};
                        hostData['class'] = Object.assign(hostData['class'], createThemedClasses(instance.mode, instance.color, hostMeta['theme']));
                }
                return hostData;
            }, vnodeHostData || {});
        }
        // looks like we've got child nodes to render into this host element
        // or we need to update the css class/attrs on the host element
        // if we haven't already created a vnode, then we give the renderer the actual element
        // if this is a re-render, then give the renderer the last vnode we already created
        var oldVNode = elm._vnode || new VNode();
        oldVNode.elm = elm;
        // normalize host data keys to abbr. key
        if (vnodeHostData) {
            vnodeHostData.a = vnodeHostData['attrs'];
            vnodeHostData.c = vnodeHostData['class'];
            vnodeHostData.s = vnodeHostData['style'];
            vnodeHostData.o = vnodeHostData['on'];
        }
        // each patch always gets a new vnode
        // the host element itself isn't patched because it already exists
        // kick off the actual render and any DOM updates
        elm._vnode = plt.render(oldVNode, h(null, vnodeHostData, vnodeChildren), isUpdateRender, elm._hostContentNodes);
    }
    // it's official, this element has rendered
    elm._hasRendered = true;
    if (elm._onRenderCallbacks) {
        // ok, so turns out there are some child host elements
        // waiting on this parent element to load
        // let's fire off all update callbacks waiting
        elm._onRenderCallbacks.forEach(function (cb) {
            cb();
        });
        delete elm._onRenderCallbacks;
    }
}

function initHostConstructor(plt, HostElementConstructor) {
    // let's wire up our functions to the host element's prototype
    // we can also inject our platform into each one that needs that api
    HostElementConstructor.connectedCallback = function () {
        connectedCallback(plt, this);
    };
    HostElementConstructor.attributeChangedCallback = function (attribName, oldVal, newVal) {
        attributeChangedCallback(plt, this, attribName, oldVal, newVal);
    };
    HostElementConstructor.disconnectedCallback = function () {
        disconnectedCallback(plt, this);
    };
    HostElementConstructor.componentOnReady = function (cb) {
        var promise;
        if (!cb) {
            promise = new Promise(function (resolve) {
                cb = resolve;
            });
        }
        componentOnReady(this, cb);
        return promise;
    };
    HostElementConstructor._queueUpdate = function () {
        queueUpdate(plt, this);
    };
    HostElementConstructor._initLoad = function () {
        initLoad(plt, this);
    };
    HostElementConstructor._render = function (isInitialRender) {
        render$1(plt, this, plt.getComponentMeta(this), isInitialRender);
    };
}
function componentOnReady(elm, cb) {
    if (!elm._hasDestroyed) {
        if (elm._hasLoaded) {
            cb(elm);
        }
        else {
            (elm._onReadyCallbacks = elm._onReadyCallbacks || []).push(cb);
        }
    }
}
function initComponentInstance(plt, elm) {
    // using the component's class, let's create a new instance
    var cmpMeta = plt.getComponentMeta(elm);
    var instance = elm.$instance = new cmpMeta.componentModule();
    // let's automatically add a reference to the host element on the instance
    instance.__el = elm;
    // so we've got an host element now, and a actual instance
    // let's wire them up together with getter/settings
    // the setters are use for change detection and knowing when to re-render
    initProxy(plt, elm, instance, cmpMeta);
    // add each of the event emitters which wire up instance methods
    // to fire off dom events from the host element
    initEventEmitters(plt, cmpMeta.eventsMeta, instance);
    // reply any event listeners on the instance that were queued up between the time
    // the element was connected and before the instance was ready
    try {
        replayQueuedEventsOnInstance(elm);
    }
    catch (e) {
        plt.onError(QUEUE_EVENTS_ERROR, e, elm);
    }
    // Create a mutation observer that will identify changes to the elements
    // children. When mutations occur rerender.  This only creates the observer
    // it does not start observing.
    createMutationObserver(plt, elm);
}
function initLoad(plt, elm) {
    var instance = elm.$instance;
    // it's possible that we've already decided to destroy this element
    // check if this element has any actively loading child elements
    if (instance && !elm._hasDestroyed && (!elm._activelyLoadingChildren || !elm._activelyLoadingChildren.length)) {
        // cool, so at this point this element isn't already being destroyed
        // and it does not have any child elements that are still loading
        // ensure we remove any child references cuz it doesn't matter at this point
        elm._activelyLoadingChildren = null;
        // sweet, this particular element is good to go
        // all of this element's children have loaded (if any)
        elm._hasLoaded = true;
        try {
            // fire off the user's elm.componentOnReady() callbacks that were
            // put directly on the element (well before anything was ready)
            if (elm._onReadyCallbacks) {
                elm._onReadyCallbacks.forEach(function (cb) {
                    cb(elm);
                });
                delete elm._onReadyCallbacks;
            }
            // fire off the user's componentDidLoad method (if one was provided)
            // componentDidLoad only runs ONCE, after the instance's element has been
            // assigned as the host element, and AFTER render() has been called
            // we'll also fire this method off on the element, just to
            instance.componentDidLoad && instance.componentDidLoad();
        }
        catch (e) {
            plt.onError(DID_LOAD_ERROR, e, elm);
        }
        // add the css class that this element has officially hydrated
        elm.classList.add(HYDRATED_CSS);
        // ( •_•)
        // ( •_•)>⌐■-■
        // (⌐■_■)
        // load events fire from bottom to top
        // the deepest elements load first then bubbles up
        propagateElementLoaded(elm);
    }
}
function propagateElementLoaded(elm) {
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    if (elm._ancestorHostElement) {
        // ok so this element already has a known ancestor host element
        // let's make sure we remove this element from its ancestor's
        // known list of child elements which are actively loading
        var ancestorsActivelyLoadingChildren = elm._ancestorHostElement._activelyLoadingChildren;
        if (ancestorsActivelyLoadingChildren) {
            var index = ancestorsActivelyLoadingChildren.indexOf(elm);
            if (index > -1) {
                // yup, this element is in the list of child elements to wait on
                // remove it so we can work to get the length down to 0
                ancestorsActivelyLoadingChildren.splice(index, 1);
            }
            // the ancestor's initLoad method will do the actual checks
            // to see if the ancestor is actually loaded or not
            // then let's call the ancestor's initLoad method if there's no length
            // (which actually ends up as this method again but for the ancestor)
            !ancestorsActivelyLoadingChildren.length && elm._ancestorHostElement._initLoad();
        }
        // fuhgeddaboudit, no need to keep a reference after this element loaded
        delete elm._ancestorHostElement;
    }
}

function queueUpdate(plt, elm) {
    // only run patch if it isn't queued already
    if (!elm._isQueuedForUpdate) {
        elm._isQueuedForUpdate = true;
        // run the patch in the next tick
        plt.queue.add(function queueUpdateNextTick() {
            // no longer queued
            elm._isQueuedForUpdate = false;
            // vdom diff and patch the host element for differences
            update(plt, elm);
        });
    }
}
function update(plt, elm) {
    // everything is async, so somehow we could have already disconnected
    // this node, so be sure to do nothing if we've already disconnected
    if (!elm._hasDestroyed) {
        var isInitialLoad_1 = !elm.$instance;
        var userPromise = void 0;
        if (isInitialLoad_1) {
            var ancestorHostElement = elm._ancestorHostElement;
            if (ancestorHostElement && !ancestorHostElement._hasRendered) {
                // this is the intial load
                // this element has an ancestor host element
                // but the ancestor host element has NOT rendered yet
                // so let's just cool our jets and wait for the ancestor to render
                (ancestorHostElement._onRenderCallbacks = ancestorHostElement._onRenderCallbacks || []).push(function () {
                    // this will get fired off when the ancestor host element
                    // finally gets around to rendering its lazy self
                    update(plt, elm);
                });
                return;
            }
            // haven't created a component instance for this host element yet
            try {
                // create the instance from the user's component class
                initComponentInstance(plt, elm);
                // fire off the user's componentWillLoad method (if one was provided)
                // componentWillLoad only runs ONCE, after instance's element has been
                // assigned as the host element, but BEFORE render() has been called
                try {
                    if (elm.$instance.componentWillLoad) {
                        userPromise = elm.$instance.componentWillLoad();
                    }
                }
                catch (e) {
                    plt.onError(WILL_LOAD_ERROR, e, elm);
                }
            }
            catch (e) {
                plt.onError(INIT_INSTANCE_ERROR, e, elm);
            }
        }
        else {
            // already created an instance and this is an update
            // fire off the user's componentWillUpdate method (if one was provided)
            // componentWillUpdate runs BEFORE render() has been called
            // but only BEFORE an UPDATE and not before the intial render
            // get the returned promise (if one was provided)
            try {
                if (elm.$instance.componentWillUpdate) {
                    userPromise = elm.$instance.componentWillUpdate();
                }
            }
            catch (e) {
                plt.onError(WILL_UPDATE_ERROR, e, elm);
            }
        }
        if (userPromise && userPromise.then) {
            // looks like the user return a promise!
            // let's not actually kick off the render
            // until the user has resolved their promise
            userPromise.then(function componentWillLoadResolved() {
                renderUpdate(plt, elm, isInitialLoad_1);
            });
        }
        else {
            // user never returned a promise so there's
            // no need to wait on anything, let's do the render now
            renderUpdate(plt, elm, isInitialLoad_1);
        }
    }
}
function renderUpdate(plt, elm, isInitialLoad) {
    // stop the observer so that we do not observe our own changes
    stopObserving(plt, elm);
    // if this component has a render function, let's fire
    // it off and generate a vnode for this
    try {
        elm._render(!isInitialLoad);
        // _hasRendered was just set
        // _onRenderCallbacks were all just fired off
    }
    catch (e) {
        plt.onError(RENDER_ERROR, e, elm);
    }
    // after render we need to start the observer back up.
    startObserving(plt, elm);
    try {
        if (isInitialLoad) {
            // so this was the initial load i guess
            elm._initLoad();
            // componentDidLoad just fired off
        }
        else {
            // fire off the user's componentDidUpdate method (if one was provided)
            // componentDidUpdate runs AFTER render() has been called
            // but only AFTER an UPDATE and not after the intial render
            elm.$instance.componentDidUpdate && elm.$instance.componentDidUpdate();
        }
    }
    catch (e) {
        // derp
        plt.onError(DID_UPDATE_ERROR, e, elm);
    }
}

function initProxy(plt, elm, instance, cmpMeta) {
    // used to store instance data internally so that we can add
    // getters/setters with the same name, and then do change detection
    var values = instance.__values = {};
    if (cmpMeta.propsWillChangeMeta) {
        // this component has prop WILL change methods, so init the object to store them
        values.__propWillChange = {};
    }
    if (cmpMeta.propsDidChangeMeta) {
        // this component has prop DID change methods, so init the object to store them
        values.__propDidChange = {};
    }
    if (cmpMeta.membersMeta) {
        for (var memberName in cmpMeta.membersMeta) {
            // add getters/setters for @Prop()s
            var memberMeta = cmpMeta.membersMeta[memberName];
            var memberType = memberMeta.memberType;
            if (memberType === MEMBER_PROP_CONTEXT) {
                // @Prop({ context: 'config' })
                var contextObj = plt.getContextItem(memberMeta.ctrlId);
                if (isDef(contextObj)) {
                    defineProperty(instance, memberName, (contextObj.getContext && contextObj.getContext(elm)) || contextObj);
                }
            }
            else if (memberType === MEMBER_PROP_CONNECT) {
                // @Prop({ connect: 'ion-loading-ctrl' })
                defineProperty(instance, memberName, plt.propConnect(memberMeta.ctrlId));
            }
            else if (memberType === MEMBER_METHOD) {
                // add a value getter on the dom's element instance
                // pointed at the instance's method
                defineProperty(elm, memberName, instance[memberName].bind(instance));
            }
            else if (memberType === MEMBER_ELEMENT_REF) {
                // add a getter to the element reference using
                // the member name the component meta provided
                defineProperty(instance, memberName, elm);
            }
            else {
                // @Prop and @State
                initProp(memberName, memberType, memberMeta.attribName, memberMeta.propType, values, plt, elm, instance, cmpMeta.propsWillChangeMeta, cmpMeta.propsDidChangeMeta);
            }
        }
    }
}
function initProp(memberName, memberType, attribName, propType, internalValues, plt, elm, instance, propWillChangeMeta, propDidChangeMeta) {
    if (memberType === MEMBER_STATE) {
        // @State() property, so copy the value directly from the instance
        // before we create getters/setters on this same property name
        internalValues[memberName] = instance[memberName];
    }
    else {
        // @Prop() property, so check initial value from the proxy element and instance
        // before we create getters/setters on this same property name
        // we do this for @Prop({ mutable: true }) also
        var hostAttrValue = elm.getAttribute(attribName);
        if (hostAttrValue !== null) {
            // looks like we've got an initial value from the attribute
            internalValues[memberName] = parsePropertyValue(propType, hostAttrValue);
        }
        else if (elm[memberName] !== undefined) {
            // looks like we've got an initial value on the proxy element
            internalValues[memberName] = parsePropertyValue(propType, elm[memberName]);
        }
        else if (instance[memberName] !== undefined) {
            // looks like we've got an initial value on the instance already
            internalValues[memberName] = instance[memberName];
        }
    }
    var i = 0;
    if (propWillChangeMeta) {
        // there are prop WILL change methods for this component
        for (; i < propWillChangeMeta.length; i++) {
            if (propWillChangeMeta[i][PROP_CHANGE_PROP_NAME] === memberName) {
                // cool, we should watch for changes to this property
                // let's bind their watcher function and add it to our list
                // of watchers, so any time this property changes we should
                // also fire off their @PropWillChange() method
                internalValues.__propWillChange[memberName] = instance[propWillChangeMeta[i][PROP_CHANGE_METHOD_NAME]].bind(instance);
            }
        }
    }
    if (propDidChangeMeta) {
        // there are prop DID change methods for this component
        for (i = 0; i < propDidChangeMeta.length; i++) {
            if (propDidChangeMeta[i][PROP_CHANGE_PROP_NAME] === memberName) {
                // cool, we should watch for changes to this property
                // let's bind their watcher function and add it to our list
                // of watchers, so any time this property changes we should
                // also fire off their @PropDidChange() method
                internalValues.__propDidChange[memberName] = instance[propDidChangeMeta[i][PROP_CHANGE_METHOD_NAME]].bind(instance);
            }
        }
    }
    function getValue() {
        // get the property value directly from our internal values
        return internalValues[memberName];
    }
    function setValue(newVal) {
        // check our new property value against our internal value
        var oldVal = internalValues[memberName];
        // TODO: account for Arrays/Objects
        if (newVal !== oldVal) {
            // gadzooks! the property's value has changed!!
            if (internalValues.__propWillChange && internalValues.__propWillChange[memberName]) {
                // this instance is watching for when this property WILL change
                internalValues.__propWillChange[memberName](newVal, oldVal);
            }
            // set our new value!
            internalValues[memberName] = newVal;
            if (internalValues.__propDidChange && internalValues.__propDidChange[memberName]) {
                // this instance is watching for when this property DID change
                internalValues.__propDidChange[memberName](newVal, oldVal);
            }
            // looks like this value actually changed, we've got work to do!
            // queue that we need to do an update, don't worry
            // about queuing up millions cuz this function
            // ensures it only runs once
            queueUpdate(plt, elm);
        }
    }
    if (memberType === MEMBER_PROP || memberType === MEMBER_PROP_MUTABLE) {
        // @Prop() or @Prop({ mutable: true })
        // have both getters and setters on the DOM element
        // @State() getters and setters should not be assigned to the element
        defineProperty(elm, memberName, undefined, getValue, setValue);
    }
    if (memberType === MEMBER_PROP_MUTABLE || memberType === MEMBER_STATE) {
        // @Prop({ mutable: true }) or @State()
        // have both getters and setters on the instance
        defineProperty(instance, memberName, undefined, getValue, setValue);
    }
    else if (memberType === MEMBER_PROP) {
        // @Prop() only has getters, but not setters on the instance
        defineProperty(instance, memberName, undefined, getValue, function invalidSetValue() {
            // this is not a stateful @Prop()
            // so do not update the instance or host element
            // TODO: remove this warning in prod mode
            console.warn("@Prop() \"" + memberName + "\" on \"" + elm.tagName.toLowerCase() + "\" cannot be modified.");
        });
    }
}
function defineProperty(obj, propertyKey, value, getter, setter) {
    // minification shortcut
    var descriptor = {
        configurable: true
    };
    if (value !== undefined) {
        descriptor.value = value;
    }
    else {
        if (getter) {
            descriptor.get = getter;
        }
        if (setter) {
            descriptor.set = setter;
        }
    }
    Object.defineProperty(obj, propertyKey, descriptor);
}
function proxyController(domApi, controllerComponents, ctrlTag) {
    return {
        'create': proxyProp(domApi, controllerComponents, ctrlTag, 'create'),
        'componentOnReady': proxyProp(domApi, controllerComponents, ctrlTag, 'componentOnReady')
    };
}
function loadComponent(domApi, controllerComponents, ctrlTag) {
    return new Promise(function (resolve) {
        var ctrlElm = controllerComponents[ctrlTag];
        if (!ctrlElm) {
            ctrlElm = domApi.$body.querySelector(ctrlTag);
        }
        if (!ctrlElm) {
            ctrlElm = controllerComponents[ctrlTag] = domApi.$createElement(ctrlTag);
            domApi.$appendChild(domApi.$body, ctrlElm);
        }
        ctrlElm.componentOnReady(resolve);
    });
}
function proxyProp(domApi, controllerComponents, ctrlTag, proxyMethodName) {
    return function () {
        var args = arguments;
        return loadComponent(domApi, controllerComponents, ctrlTag)
            .then(function (ctrlElm) { return ctrlElm[proxyMethodName].apply(ctrlElm, args); });
    };
}

function createPlatformServer(config, win, doc, diagnostics, isPrerender, ctx) {
    var registry = { 'HTML': {} };
    var moduleImports = {};
    var moduleCallbacks = {};
    var loadedModules = {};
    var pendingModuleFileReads = {};
    var pendingStyleFileReads = {};
    var stylesMap = {};
    var controllerComponents = {};
    // init build context
    ctx = ctx || {};
    // initialize Core global object
    var Context = {};
    Context.addListener = noop;
    Context.dom = createDomControllerServer();
    Context.enableListener = noop;
    Context.emit = noop;
    Context.isClient = false;
    Context.isServer = true;
    Context.isPrerender = isPrerender;
    Context.window = win;
    Context.location = win.location;
    Context.document = doc;
    // add the Core global to the window context
    // Note: "Core" is not on the window context on the client-side
    win.Context = Context;
    // create the app global
    var App = {};
    // add the app's global to the window context
    win[config.namespace] = App;
    var appWwwDir = config.wwwDir;
    var appBuildDir = config.sys.path.join(config.buildDir, getAppFileName(config));
    // create the sandboxed context with a new instance of a V8 Context
    // V8 Context provides an isolated global environment
    config.sys.vm.createContext(ctx, appWwwDir, win);
    // execute the global scripts (if there are any)
    runGlobalScripts();
    // create the DOM api which we'll use during hydrate
    var domApi = createDomApi(win.document);
    // create the platform api which is used throughout common core code
    var plt = {
        defineComponent: defineComponent,
        getComponentMeta: getComponentMeta,
        propConnect: propConnect,
        getContextItem: getContextItem,
        loadBundle: loadBundle,
        connectHostElement: connectHostElement,
        queue: createQueueServer(),
        tmpDisconnected: false,
        emitEvent: noop,
        getEventOptions: getEventOptions,
        onError: onError
    };
    // create the renderer which will be used to patch the vdom
    plt.render = createRendererPatch(plt, domApi);
    // setup the root node of all things
    // which is the mighty <html> tag
    var rootElm = domApi.$documentElement;
    rootElm._hasRendered = true;
    rootElm._activelyLoadingChildren = [];
    rootElm._initLoad = function appLoadedCallback() {
        rootElm._hasLoaded = true;
        appLoaded();
    };
    function appLoaded(failureDiagnostic) {
        if ((rootElm._hasLoaded && Object.keys(pendingStyleFileReads).length === 0) || failureDiagnostic) {
            // the root node has loaded
            // and there are no css files still loading
            plt.onAppLoad && plt.onAppLoad(rootElm, stylesMap, failureDiagnostic);
        }
    }
    function connectHostElement(elm, slotMeta) {
        // set the "mode" property
        if (!elm.mode) {
            // looks like mode wasn't set as a property directly yet
            // first check if there's an attribute
            // next check the app's global
            elm.mode = domApi.$getAttribute(elm, 'mode') || Context.mode;
        }
        assignHostContentSlots(domApi, elm, slotMeta);
    }
    function getComponentMeta(elm) {
        // registry tags are always UPPER-CASE
        return registry[elm.tagName.toUpperCase()];
    }
    function defineComponent(cmpMeta) {
        // default mode and color props
        cmpMeta.membersMeta = cmpMeta.membersMeta || {};
        cmpMeta.membersMeta.mode = { memberType: MEMBER_PROP };
        cmpMeta.membersMeta.color = { memberType: MEMBER_PROP, attribName: 'color' };
        // registry tags are always UPPER-CASE
        var registryTag = cmpMeta.tagNameMeta.toUpperCase();
        registry[registryTag] = cmpMeta;
        if (cmpMeta.componentModule) {
            // for unit testing
            moduleImports[registryTag] = cmpMeta.componentModule;
        }
    }
    App.loadComponents = function loadComponents(module, importFn) {
        var args = arguments;
        // import component function
        // inject globals
        importFn(moduleImports, h, t, Context, appBuildDir);
        for (var i = 2; i < args.length; i++) {
            parseComponentMeta(registry, moduleImports, args[i], Context.attr);
        }
        // fire off all the callbacks waiting on this bundle to load
        var callbacks = moduleCallbacks[module];
        if (callbacks) {
            for (i = 0; i < callbacks.length; i++) {
                callbacks[i]();
            }
            delete moduleCallbacks[module];
        }
        // remember that we've already loaded this bundle
        loadedModules[module] = true;
    };
    function loadBundle(cmpMeta, elm, cb) {
        loadModuleStyles(cmpMeta, elm);
        if (cmpMeta.componentModule) {
            // we already have the module loaded
            // (this is probably a unit test)
            cb();
            return;
        }
        var moduleId = cmpMeta.moduleId;
        if (loadedModules[moduleId]) {
            // sweet, we've already loaded this module
            cb();
        }
        else {
            // never seen this module before, let's start loading the file
            // and add it to the bundle callbacks to fire when it's loaded
            if (moduleCallbacks[moduleId]) {
                moduleCallbacks[moduleId].push(cb);
            }
            else {
                moduleCallbacks[moduleId] = [cb];
            }
            // create the module filePath we'll be reading
            var jsFilePath_1 = normalizePath(config.sys.path.join(appBuildDir, moduleId + ".js"));
            if (!pendingModuleFileReads[jsFilePath_1]) {
                // not already actively reading this file
                // remember that we're now actively requesting this url
                pendingModuleFileReads[jsFilePath_1] = true;
                // let's kick off reading the module
                // this could come from the cache or a new readFile
                getJsFile(config.sys, ctx, jsFilePath_1).then(function (jsContent) {
                    // remove it from the list of file reads we're waiting on
                    delete pendingModuleFileReads[jsFilePath_1];
                    // run the code in this sandboxed context
                    config.sys.vm.runInContext(jsContent, win, { timeout: 10000 });
                }).catch(function (err) {
                    var d = onError(LOAD_BUNDLE_ERROR, err, elm);
                    appLoaded(d);
                });
            }
        }
    }
    function loadModuleStyles(cmpMeta, elm) {
        // we need to load this component's css file
        // we're already figured out and set "mode" as a property to the element
        var styleId = cmpMeta.styleIds && (cmpMeta.styleIds[elm.mode] || cmpMeta.styleIds.$);
        if (!styleId && cmpMeta.stylesMeta) {
            var stylesMeta = cmpMeta.stylesMeta[elm.mode] || cmpMeta.stylesMeta.$;
            if (stylesMeta) {
                styleId = stylesMeta.styleId;
            }
        }
        if (styleId) {
            // we've got a style id to load up
            // create the style filePath we'll be reading
            var styleFilePath_1 = normalizePath(config.sys.path.join(appBuildDir, styleId + ".css"));
            if (!stylesMap[styleFilePath_1]) {
                // this style hasn't been added to our collection yet
                if (!pendingStyleFileReads[styleFilePath_1]) {
                    // we're not already actively opening this file
                    pendingStyleFileReads[styleFilePath_1] = true;
                    getCssFile(config.sys, ctx, styleFilePath_1).then(function (cssContent) {
                        delete pendingStyleFileReads[styleFilePath_1];
                        // finished reading the css file
                        // let's add the content to our collection
                        stylesMap[styleFilePath_1] = cssContent;
                        // check if the entire app is done loading or not
                        // and if this was the last thing the app was waiting on
                        appLoaded();
                    }).catch(function (err) {
                        var d = onError(LOAD_BUNDLE_ERROR, err, elm);
                        appLoaded(d);
                    });
                }
            }
        }
    }
    function getEventOptions(useCapture, usePassive) {
        return {
            'capture': !!(useCapture),
            'passive': !!(usePassive)
        };
    }
    function runGlobalScripts() {
        if (!ctx || !ctx.appFiles || !ctx.appFiles.global) {
            return;
        }
        config.sys.vm.runInContext(ctx.appFiles.global, win);
    }
    function onError(type, err, elm) {
        var d = {
            type: 'runtime',
            header: 'Runtime error detected',
            level: 'error',
            messageText: err ? err.message ? err.message : err.toString() : null
        };
        switch (type) {
            case LOAD_BUNDLE_ERROR:
                d.header += ' while loading bundle';
                break;
            case QUEUE_EVENTS_ERROR:
                d.header += ' while running initial events';
                break;
            case WILL_LOAD_ERROR:
                d.header += ' during componentWillLoad()';
                break;
            case DID_LOAD_ERROR:
                d.header += ' during componentDidLoad()';
                break;
            case INIT_INSTANCE_ERROR:
                d.header += ' while initializing instance';
                break;
            case RENDER_ERROR:
                d.header += ' while rendering';
                break;
            case DID_UPDATE_ERROR:
                d.header += ' while updating';
                break;
        }
        if (elm && elm.tagName) {
            d.header += ': ' + elm.tagName.toLowerCase();
        }
        diagnostics.push(d);
        return d;
    }
    function propConnect(ctrlTag) {
        return proxyController(domApi, controllerComponents, ctrlTag);
    }
    function getContextItem(contextKey) {
        return Context[contextKey];
    }
    return plt;
}

function collapseHtmlWhitepace(node) {
    // this isn't about reducing HTML filesize (cuz it doesn't really matter after gzip)
    // this is more about having many less nodes for the client side to
    // have to climb through while it's creating vnodes from this HTML
    if (WHITESPACE_SENSITIVE_TAGS.indexOf(node.tagName) > -1) {
        return;
    }
    var lastWhitespaceTextNode = null;
    for (var i = node.childNodes.length - 1; i >= 0; i--) {
        var childNode = node.childNodes[i];
        if (childNode.nodeType === TEXT_NODE || childNode.nodeType === COMMENT_NODE) {
            childNode.nodeValue = childNode.nodeValue.replace(REDUCE_WHITESPACE_REGEX, ' ');
            if (childNode.nodeValue === ' ') {
                if (lastWhitespaceTextNode === null) {
                    childNode.nodeValue = ' ';
                    lastWhitespaceTextNode = childNode;
                }
                else {
                    childNode.parentNode.removeChild(childNode);
                }
                continue;
            }
        }
        else if (childNode.childNodes) {
            collapseHtmlWhitepace(childNode);
        }
        lastWhitespaceTextNode = null;
    }
}
var REDUCE_WHITESPACE_REGEX = /\s\s+/g;
var WHITESPACE_SENSITIVE_TAGS = ['PRE', 'SCRIPT', 'STYLE', 'TEXTAREA'];

function inlineLoaderScript(config, ctx, doc) {
    if (!ctx.appFiles || !ctx.appFiles.loader) {
        // don't bother if we don't have good loader content for whatever reason
        return;
    }
    // create the script url we'll be looking for
    var loaderExternalSrcUrl = config.publicPath;
    if (loaderExternalSrcUrl.charAt(loaderExternalSrcUrl.length - 1) !== '/') {
        loaderExternalSrcUrl += '/';
    }
    loaderExternalSrcUrl += config.namespace.toLowerCase() + '.js';
    // remove the app loader script url request
    var removedLoader = removeExternalLoaderScript(doc, loaderExternalSrcUrl);
    if (removedLoader) {
        // append the loader script content to the bottom of the document
        appendInlineLoaderScript(ctx, doc);
    }
}
function removeExternalLoaderScript(doc, loaderExternalSrcUrl) {
    var removedLoader = false;
    var scriptElements = doc.getElementsByTagName('script');
    for (var i = 0; i < scriptElements.length; i++) {
        if (scriptElements[i].src.indexOf(loaderExternalSrcUrl) > -1) {
            // this is a script element with a src attribute which is
            // pointing to the app's external loader script
            // remove the script from the document, be gone with you
            scriptElements[i].parentNode.removeChild(scriptElements[i]);
            removedLoader = true;
        }
    }
    return removedLoader;
}
function appendInlineLoaderScript(ctx, doc) {
    // now that we've removed the external script
    // let's add the loader script back in, except let's
    // inline the js directly into the document
    // and append it as the last child in the body
    var scriptElm = doc.createElement('script');
    scriptElm.innerHTML = ctx.appFiles.loader;
    doc.body.appendChild(scriptElm);
}

function formatFileName(rootDir, fileName) {
    fileName = fileName.replace(rootDir, '');
    if (/\/|\\/.test(fileName.charAt(0))) {
        fileName = fileName.substr(1);
    }
    if (fileName.length > 80) {
        fileName = '...' + fileName.substr(fileName.length - 80);
    }
    return fileName;
}
function formatHeader(type, fileName, rootDir, startLineNumber, endLineNumber) {
    if (startLineNumber === void 0) { startLineNumber = null; }
    if (endLineNumber === void 0) { endLineNumber = null; }
    var header = type + ": " + formatFileName(rootDir, fileName);
    if (startLineNumber !== null && startLineNumber > 0) {
        if (endLineNumber !== null && endLineNumber > startLineNumber) {
            header += ", lines: " + startLineNumber + " - " + endLineNumber;
        }
        else {
            header += ", line: " + startLineNumber;
        }
    }
    return header;
}

function splitLineBreaks(sourceText) {
    if (!sourceText)
        return [];
    sourceText = sourceText.replace(/\\r/g, '\n');
    return sourceText.split('\n');
}

var MAX_ERRORS = 15;

// http://www.w3.org/TR/CSS21/grammar.html
// https://github.com/visionmedia/css-parse/pull/49#issuecomment-30088027
var commentre = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
function parseCss(config, css, filePath) {
    /**
     * Positional.
     */
    var lineno = 1;
    var column = 1;
    var srcLines;
    /**
     * Update lineno and column based on `str`.
     */
    function updatePosition(str) {
        var lines = str.match(/\n/g);
        if (lines)
            lineno += lines.length;
        var i = str.lastIndexOf('\n');
        column = ~i ? str.length - i : column + str.length;
    }
    /**
     * Mark position and patch `node.position`.
     */
    function position() {
        var start = { line: lineno, column: column };
        return function (node) {
            node.position = new ParsePosition(start);
            whitespace();
            return node;
        };
    }
    /**
     * Store position information for a node
     */
    var ParsePosition = /** @class */ (function () {
        function ParsePosition(start) {
            this.start = start;
            this.end = { line: lineno, column: column };
            this.source = filePath;
        }
        return ParsePosition;
    }());
    /**
     * Non-enumerable source string
     */
    ParsePosition.prototype.content = css;
    /**
     * Error `msg`.
     */
    var diagnostics = [];
    function error(msg) {
        if (!srcLines) {
            srcLines = css.split('\n');
        }
        var d = {
            level: 'error',
            type: 'css',
            language: 'css',
            header: 'CSS Parse',
            messageText: msg,
            absFilePath: filePath,
            lines: [{
                    lineIndex: lineno - 1,
                    lineNumber: lineno,
                    errorCharStart: column,
                    text: css[lineno - 1],
                }]
        };
        d.header = formatHeader('CSS', filePath, config.rootDir, lineno);
        if (lineno > 1) {
            var previousLine = {
                lineIndex: lineno - 1,
                lineNumber: lineno - 1,
                text: css[lineno - 2],
                errorCharStart: -1,
                errorLength: -1
            };
            d.lines.unshift(previousLine);
        }
        if (lineno + 2 < srcLines.length) {
            var nextLine = {
                lineIndex: lineno,
                lineNumber: lineno + 1,
                text: srcLines[lineno],
                errorCharStart: -1,
                errorLength: -1
            };
            d.lines.push(nextLine);
        }
        diagnostics.push(d);
    }
    /**
     * Parse stylesheet.
     */
    function stylesheet() {
        var rulesList = rules();
        return {
            type: 'stylesheet',
            stylesheet: {
                source: filePath,
                rules: rulesList,
                diagnostics: diagnostics
            }
        };
    }
    /**
     * Opening brace.
     */
    function open() {
        return match(/^{\s*/);
    }
    /**
     * Closing brace.
     */
    function close() {
        return match(/^}/);
    }
    /**
     * Parse ruleset.
     */
    function rules() {
        var node;
        var rules = [];
        whitespace();
        comments(rules);
        while (css.length && css.charAt(0) !== '}' && (node = atrule() || rule())) {
            if (node !== false) {
                rules.push(node);
                comments(rules);
            }
        }
        return rules;
    }
    /**
     * Match `re` and return captures.
     */
    function match(re) {
        var m = re.exec(css);
        if (!m)
            return;
        var str = m[0];
        updatePosition(str);
        css = css.slice(str.length);
        return m;
    }
    /**
     * Parse whitespace.
     */
    function whitespace() {
        match(/^\s*/);
    }
    /**
     * Parse comments;
     */
    function comments(rules) {
        var c;
        rules = rules || [];
        while (c = comment()) {
            if (c !== false) {
                rules.push(c);
            }
        }
        return rules;
    }
    /**
     * Parse comment.
     */
    function comment() {
        var pos = position();
        if ('/' !== css.charAt(0) || '*' !== css.charAt(1))
            return;
        var i = 2;
        while ('' !== css.charAt(i) && ('*' !== css.charAt(i) || '/' !== css.charAt(i + 1)))
            ++i;
        i += 2;
        if ('' === css.charAt(i - 1)) {
            return error('End of comment missing');
        }
        var str = css.slice(2, i - 2);
        column += 2;
        updatePosition(str);
        css = css.slice(i);
        column += 2;
        return pos({
            type: 'comment',
            comment: str
        });
    }
    /**
     * Parse selector.
     */
    function selector() {
        var m = match(/^([^{]+)/);
        if (!m)
            return;
        /* @fix Remove all comments from selectors
         * http://ostermiller.org/findcomment.html */
        return trim(m[0])
            .replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, '')
            .replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (m) {
            return m.replace(/,/g, '\u200C');
        })
            .split(/\s*(?![^(]*\)),\s*/)
            .map(function (s) {
            return s.replace(/\u200C/g, ',');
        });
    }
    /**
     * Parse declaration.
     */
    function declaration() {
        var pos = position();
        // prop
        var prop = match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
        if (!prop)
            return;
        prop = trim(prop[0]);
        // :
        if (!match(/^:\s*/))
            return error("property missing ':'");
        // val
        var val = match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/);
        var ret = pos({
            type: 'declaration',
            property: prop.replace(commentre, ''),
            value: val ? trim(val[0]).replace(commentre, '') : ''
        });
        // ;
        match(/^[;\s]*/);
        return ret;
    }
    /**
     * Parse declarations.
     */
    function declarations() {
        var decls = [];
        if (!open())
            return error("missing '{'");
        comments(decls);
        // declarations
        var decl;
        while (decl = declaration()) {
            if (decl !== false) {
                decls.push(decl);
                comments(decls);
            }
        }
        if (!close())
            return error("missing '}'");
        return decls;
    }
    /**
     * Parse keyframe.
     */
    function keyframe() {
        var m;
        var vals = [];
        var pos = position();
        while (m = match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/)) {
            vals.push(m[1]);
            match(/^,\s*/);
        }
        if (!vals.length)
            return;
        return pos({
            type: 'keyframe',
            values: vals,
            declarations: declarations()
        });
    }
    /**
     * Parse keyframes.
     */
    function atkeyframes() {
        var pos = position();
        var m = match(/^@([-\w]+)?keyframes\s*/);
        if (!m)
            return;
        var vendor = m[1];
        // identifier
        m = match(/^([-\w]+)\s*/);
        if (!m)
            return error("@keyframes missing name");
        var name = m[1];
        if (!open())
            return error("@keyframes missing '{'");
        var frame;
        var frames = comments();
        while (frame = keyframe()) {
            frames.push(frame);
            frames = frames.concat(comments());
        }
        if (!close())
            return error("@keyframes missing '}'");
        return pos({
            type: 'keyframes',
            name: name,
            vendor: vendor,
            keyframes: frames
        });
    }
    /**
     * Parse supports.
     */
    function atsupports() {
        var pos = position();
        var m = match(/^@supports *([^{]+)/);
        if (!m)
            return;
        var supports = trim(m[1]);
        if (!open())
            return error("@supports missing '{'");
        var style = comments().concat(rules());
        if (!close())
            return error("@supports missing '}'");
        return pos({
            type: 'supports',
            supports: supports,
            rules: style
        });
    }
    /**
     * Parse host.
     */
    function athost() {
        var pos = position();
        var m = match(/^@host\s*/);
        if (!m)
            return;
        if (!open())
            return error("@host missing '{'");
        var style = comments().concat(rules());
        if (!close())
            return error("@host missing '}'");
        return pos({
            type: 'host',
            rules: style
        });
    }
    /**
     * Parse media.
     */
    function atmedia() {
        var pos = position();
        var m = match(/^@media *([^{]+)/);
        if (!m)
            return;
        var media = trim(m[1]);
        if (!open())
            return error("@media missing '{'");
        var style = comments().concat(rules());
        if (!close())
            return error("@media missing '}'");
        return pos({
            type: 'media',
            media: media,
            rules: style
        });
    }
    /**
     * Parse custom-media.
     */
    function atcustommedia() {
        var pos = position();
        var m = match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
        if (!m)
            return;
        return pos({
            type: 'custom-media',
            name: trim(m[1]),
            media: trim(m[2])
        });
    }
    /**
     * Parse paged media.
     */
    function atpage() {
        var pos = position();
        var m = match(/^@page */);
        if (!m)
            return;
        var sel = selector() || [];
        if (!open())
            return error("@page missing '{'");
        var decls = comments();
        // declarations
        var decl;
        while (decl = declaration()) {
            decls.push(decl);
            decls = decls.concat(comments());
        }
        if (!close())
            return error("@page missing '}'");
        return pos({
            type: 'page',
            selectors: sel,
            declarations: decls
        });
    }
    /**
     * Parse document.
     */
    function atdocument() {
        var pos = position();
        var m = match(/^@([-\w]+)?document *([^{]+)/);
        if (!m)
            return;
        var vendor = trim(m[1]);
        var doc = trim(m[2]);
        if (!open())
            return error("@document missing '{'");
        var style = comments().concat(rules());
        if (!close())
            return error("@document missing '}'");
        return pos({
            type: 'document',
            document: doc,
            vendor: vendor,
            rules: style
        });
    }
    /**
     * Parse font-face.
     */
    function atfontface() {
        var pos = position();
        var m = match(/^@font-face\s*/);
        if (!m)
            return;
        if (!open())
            return error("@font-face missing '{'");
        var decls = comments();
        // declarations
        var decl;
        while (decl = declaration()) {
            decls.push(decl);
            decls = decls.concat(comments());
        }
        if (!close())
            return error("@font-face missing '}'");
        return pos({
            type: 'font-face',
            declarations: decls
        });
    }
    /**
     * Parse import
     */
    var atimport = _compileAtrule('import');
    /**
     * Parse charset
     */
    var atcharset = _compileAtrule('charset');
    /**
     * Parse namespace
     */
    var atnamespace = _compileAtrule('namespace');
    /**
     * Parse non-block at-rules
     */
    function _compileAtrule(name) {
        var re = new RegExp('^@' + name + '\\s*([^;]+);');
        return function () {
            var pos = position();
            var m = match(re);
            if (!m)
                return;
            var ret = { type: name };
            ret[name] = m[1].trim();
            return pos(ret);
        };
    }
    /**
     * Parse at rule.
     */
    function atrule() {
        if (css[0] !== '@')
            return;
        return atkeyframes()
            || atmedia()
            || atcustommedia()
            || atsupports()
            || atimport()
            || atcharset()
            || atnamespace()
            || atdocument()
            || atpage()
            || athost()
            || atfontface();
    }
    /**
     * Parse rule.
     */
    function rule() {
        var pos = position();
        var sel = selector();
        if (!sel)
            return error('selector missing');
        comments();
        return pos({
            type: 'rule',
            selectors: sel,
            declarations: declarations()
        });
    }
    return addParent(stylesheet());
}
/**
 * Trim `str`.
 */
function trim(str) {
    return str ? str.trim() : '';
}
/**
 * Adds non-enumerable parent node reference to each node.
 */
function addParent(obj, parent) {
    var isNode = obj && typeof obj.type === 'string';
    var childParent = isNode ? obj : parent;
    for (var k in obj) {
        var value = obj[k];
        if (Array.isArray(value)) {
            value.forEach(function (v) { addParent(v, childParent); });
        }
        else if (value && typeof value === 'object') {
            addParent(value, childParent);
        }
    }
    if (isNode) {
        Object.defineProperty(obj, 'parent', {
            configurable: true,
            writable: true,
            enumerable: false,
            value: parent || null
        });
    }
    return obj;
}

function getSelectors(sel) {
    // reusing global SELECTORS since this is a synchronous operation
    SELECTORS.tags.length = SELECTORS.classNames.length = SELECTORS.ids.length = SELECTORS.attrs.length = 0;
    sel = sel.replace(/\./g, ' .')
        .replace(/\#/g, ' #')
        .replace(/\[/g, ' [')
        .replace(/\>/g, ' > ')
        .replace(/\+/g, ' + ')
        .replace(/\~/g, ' ~ ')
        .replace(/\*/g, ' * ')
        .replace(/\:not\((.*?)\)/g, ' ');
    var items = sel.split(' ');
    for (var i = 0; i < items.length; i++) {
        items[i] = items[i].split(':')[0];
        if (items[i].length === 0)
            continue;
        if (items[i].charAt(0) === '.') {
            SELECTORS.classNames.push(items[i].substr(1));
        }
        else if (items[i].charAt(0) === '#') {
            SELECTORS.ids.push(items[i].substr(1));
        }
        else if (items[i].charAt(0) === '[') {
            items[i] = items[i].substr(1).split('=')[0].split(']')[0].trim();
            SELECTORS.attrs.push(items[i].toLowerCase());
        }
        else if (/[a-z]/g.test(items[i].charAt(0))) {
            SELECTORS.tags.push(items[i].toLowerCase());
        }
    }
    SELECTORS.classNames = SELECTORS.classNames.sort(function (a, b) {
        if (a.length < b.length)
            return -1;
        if (a.length > b.length)
            return 1;
        return 0;
    });
    return SELECTORS;
}
var SELECTORS = {
    tags: [],
    classNames: [],
    ids: [],
    attrs: []
};

/**
 * CSS stringify adopted from rework/css by
 * TJ Holowaychuk (@tj)
 * Licensed under the MIT License
 * https://github.com/reworkcss/css/blob/master/LICENSE
 */
var StringifyCss = /** @class */ (function () {
    function StringifyCss(usedSelectors) {
        this.usedSelectors = usedSelectors;
    }
    /**
     * Visit `node`.
     */
    StringifyCss.prototype.visit = function (node) {
        return this[node.type](node);
    };
    /**
     * Map visit over array of `nodes`, optionally using a `delim`
     */
    StringifyCss.prototype.mapVisit = function (nodes, delim) {
        var buf = '';
        delim = delim || '';
        for (var i = 0, length = nodes.length; i < length; i++) {
            buf += this.visit(nodes[i]);
            if (delim && i < length - 1)
                buf += delim;
        }
        return buf;
    };
    /**
     * Compile `node`.
     */
    StringifyCss.prototype.compile = function (node) {
        return node.stylesheet
            .rules.map(this.visit, this)
            .join('');
    };
    StringifyCss.prototype.comment = function () {
        return '';
    };
    /**
     * Visit import node.
     */
    StringifyCss.prototype.import = function (node) {
        return '@import ' + node.import + ';';
    };
    /**
     * Visit media node.
     */
    StringifyCss.prototype.media = function (node) {
        var mediaCss = this.mapVisit(node.rules);
        if (mediaCss === '') {
            return '';
        }
        return '@media ' + node.media + '{' + this.mapVisit(node.rules) + '}';
    };
    /**
     * Visit document node.
     */
    StringifyCss.prototype.document = function (node) {
        var documentCss = this.mapVisit(node.rules);
        if (documentCss === '') {
            return '';
        }
        var doc = '@' + (node.vendor || '') + 'document ' + node.document;
        return doc + '{' + documentCss + '}';
    };
    /**
     * Visit charset node.
     */
    StringifyCss.prototype.charset = function (node) {
        return '@charset ' + node.charset + ';';
    };
    /**
     * Visit namespace node.
     */
    StringifyCss.prototype.namespace = function (node) {
        return '@namespace ' + node.namespace + ';';
    };
    /**
     * Visit supports node.
     */
    StringifyCss.prototype.supports = function (node) {
        var supportsCss = this.mapVisit(node.rules);
        if (supportsCss === '') {
            return '';
        }
        return '@supports ' + node.supports + '{' + supportsCss + '}';
    };
    /**
     * Visit keyframes node.
     */
    StringifyCss.prototype.keyframes = function (node) {
        var keyframesCss = this.mapVisit(node.keyframes);
        if (keyframesCss === '') {
            return '';
        }
        return '@' + (node.vendor || '') + 'keyframes ' + node.name + '{' + keyframesCss + '}';
    };
    /**
     * Visit keyframe node.
     */
    StringifyCss.prototype.keyframe = function (node) {
        var decls = node.declarations;
        return node.values.join(',') + '{' + this.mapVisit(decls) + '}';
    };
    /**
     * Visit page node.
     */
    StringifyCss.prototype.page = function (node) {
        var sel = node.selectors.length
            ? node.selectors.join(', ')
            : '';
        return '@page ' + sel + '{' + this.mapVisit(node.declarations) + '}';
    };
    /**
     * Visit font-face node.
     */
    StringifyCss.prototype['font-face'] = function (node) {
        var fontCss = this.mapVisit(node.declarations);
        if (fontCss === '') {
            return '';
        }
        return '@font-face{' + fontCss + '}';
    };
    /**
     * Visit host node.
     */
    StringifyCss.prototype.host = function (node) {
        return '@host{' + this.mapVisit(node.rules) + '}';
    };
    /**
     * Visit custom-media node.
     */
    StringifyCss.prototype['custom-media'] = function (node) {
        return '@custom-media ' + node.name + ' ' + node.media + ';';
    };
    /**
     * Visit rule node.
     */
    StringifyCss.prototype.rule = function (node) {
        var decls = node.declarations;
        if (!decls.length)
            return '';
        var j;
        for (var i = node.selectors.length - 1; i >= 0; i--) {
            var sel = getSelectors(node.selectors[i]);
            var include = true;
            // classes
            var jlen = sel.classNames.length;
            if (jlen > 0) {
                for (j = 0; j < jlen; j++) {
                    if (this.usedSelectors.classNames.indexOf(sel.classNames[j]) === -1) {
                        include = false;
                        break;
                    }
                }
            }
            // tags
            if (include) {
                jlen = sel.tags.length;
                if (jlen > 0) {
                    for (j = 0; j < jlen; j++) {
                        if (this.usedSelectors.tags.indexOf(sel.tags[j]) === -1) {
                            include = false;
                            break;
                        }
                    }
                }
            }
            // attrs
            if (include) {
                jlen = sel.attrs.length;
                if (jlen > 0) {
                    for (j = 0; j < jlen; j++) {
                        if (this.usedSelectors.attrs.indexOf(sel.attrs[j]) === -1) {
                            include = false;
                            break;
                        }
                    }
                }
            }
            // ids
            if (include) {
                jlen = sel.ids.length;
                if (jlen > 0) {
                    for (j = 0; j < jlen; j++) {
                        if (this.usedSelectors.ids.indexOf(sel.ids[j]) === -1) {
                            include = false;
                            break;
                        }
                    }
                }
            }
            if (!include) {
                node.selectors.splice(i, 1);
            }
        }
        if (node.selectors.length === 0)
            return '';
        return node.selectors + '{' + this.mapVisit(decls) + '}';
    };
    /**
     * Visit declaration node.
     */
    StringifyCss.prototype.declaration = function (node) {
        return node.property + ':' + node.value + ';';
    };
    return StringifyCss;
}());

function removeUnusedStyles(config, usedSelectors, cssContent, cssFilePath, diagnostics) {
    var cleanedCss = cssContent;
    try {
        // parse the css from being applied to the document
        var cssAst = parseCss(config, cssContent, cssFilePath);
        if (cssAst.stylesheet.diagnostics.length) {
            cssAst.stylesheet.diagnostics.forEach(function (d) {
                diagnostics.push(d);
            });
            return cleanedCss;
        }
        try {
            // convert the parsed css back into a string
            // but only keeping what was found in our active selectors
            var stringify = new StringifyCss(usedSelectors);
            cleanedCss = stringify.compile(cssAst);
        }
        catch (e) {
            diagnostics.push({
                level: 'error',
                type: 'css',
                header: 'CSS Stringify',
                messageText: e
            });
        }
    }
    catch (e) {
        diagnostics.push({
            level: 'error',
            type: 'css',
            absFilePath: cssFilePath,
            header: 'CSS Parse',
            messageText: e
        });
    }
    return cleanedCss;
}

var UsedSelectors = /** @class */ (function () {
    function UsedSelectors(elm) {
        this.tags = [];
        this.classNames = [];
        this.ids = [];
        this.attrs = [];
        this.collectSelectors(elm);
    }
    UsedSelectors.prototype.collectSelectors = function (elm) {
        var i;
        if (elm && elm.tagName) {
            // tags
            var tagName = elm.tagName.toLowerCase();
            if (this.tags.indexOf(tagName) === -1) {
                this.tags.push(tagName);
            }
            // classes
            var classList = elm.classList;
            for (i = 0; i < classList.length; i++) {
                var className = classList[i];
                if (this.classNames.indexOf(className) === -1) {
                    this.classNames.push(className);
                }
            }
            // attributes
            var attributes = elm.attributes;
            for (i = 0; i < attributes.length; i++) {
                var attr = attributes[i];
                var attrName = attr.name.toLowerCase();
                if (!attrName || attrName === 'class' || attrName === 'id' || attrName === 'style')
                    continue;
                if (this.attrs.indexOf(attrName) === -1) {
                    this.attrs.push(attrName);
                }
            }
            // ids
            var idValue = elm.getAttribute('id');
            if (idValue) {
                idValue = idValue.trim();
                if (idValue && this.ids.indexOf(idValue) === -1) {
                    this.ids.push(idValue);
                }
            }
            // drill down
            for (i = 0; i < elm.children.length; i++) {
                this.collectSelectors(elm.children[i]);
            }
        }
    };
    return UsedSelectors;
}());

function inlineStyles(config, doc, stylesMap, opts, diagnostics) {
    var styleFileNames = Object.keys(stylesMap);
    if (!styleFileNames.length) {
        return;
    }
    var styles = [];
    if (opts.removeUnusedStyles !== false) {
        // removeUnusedStyles is the default
        try {
            // pick out all of the selectors that are actually
            // being used in the html document
            var usedSelectors_1 = new UsedSelectors(doc.documentElement);
            var cssFilePaths = Object.keys(stylesMap);
            styles = cssFilePaths.map(function (cssFilePath) {
                return removeUnusedStyles(config, usedSelectors_1, stylesMap[cssFilePath], cssFilePath, diagnostics);
            });
        }
        catch (e) {
            diagnostics.push({
                level: 'error',
                type: 'hydrate',
                header: 'HTML Selector Parse',
                messageText: e
            });
        }
    }
    else {
        // do not removeUnusedStyles
        styles = styleFileNames.map(function (styleFileName) { return stylesMap[styleFileName]; });
    }
    // insert our styles to the head of the document
    insertStyles(doc, styles);
}
function insertStyles(doc, styles) {
    if (!styles.length) {
        return;
    }
    var styleElm = doc.createElement('style');
    styleElm.setAttribute('data-styles', '');
    styleElm.innerHTML = styles.join('').trim();
    if (styleElm.innerHTML.length) {
        doc.head.insertBefore(styleElm, doc.head.firstChild);
    }
}

function insertCanonicalLink(config, doc, url) {
    if (!url)
        return;
    // https://webmasters.googleblog.com/2009/02/specify-your-canonical.html
    // <link rel="canonical" href="http://www.example.com/product.php?item=swedish-fish" />
    var canonicalLink = doc.querySelector('link[rel="canonical"]');
    if (canonicalLink)
        return;
    var parsedUrl = config.sys.url.parse(url);
    canonicalLink = doc.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    canonicalLink.setAttribute('href', parsedUrl.path);
    doc.head.appendChild(canonicalLink);
}

function optimizeHtml(config, ctx, doc, stylesMap, opts, results) {
    if (opts.isPrerender) {
        insertIsPrerendered(doc);
    }
    if (opts.canonicalLink !== false) {
        try {
            insertCanonicalLink(config, doc, results.url);
        }
        catch (e) {
            results.diagnostics.push({
                level: 'error',
                type: 'hydrate',
                header: 'Insert Canonical Link',
                messageText: e
            });
        }
    }
    if (opts.inlineStyles !== false) {
        try {
            inlineStyles(config, doc, stylesMap, opts, results.diagnostics);
        }
        catch (e) {
            results.diagnostics.push({
                level: 'error',
                type: 'hydrate',
                header: 'Inline Styles',
                messageText: e
            });
        }
    }
    if (opts.inlineLoaderScript !== false) {
        // remove the script to the external loader script request
        // inline the loader script at the bottom of the html
        try {
            inlineLoaderScript(config, ctx, doc);
        }
        catch (e) {
            results.diagnostics.push({
                level: 'error',
                type: 'hydrate',
                header: 'Inline Loader Script',
                messageText: e
            });
        }
    }
    if (opts.collapseWhitespace !== false && !config.devMode) {
        // collapseWhitespace is the default
        try {
            collapseHtmlWhitepace(doc.documentElement);
        }
        catch (e) {
            results.diagnostics.push({
                level: 'error',
                type: 'hydrate',
                header: 'Reduce HTML Whitespace',
                messageText: e
            });
        }
    }
}
function insertIsPrerendered(doc) {
    // <meta name="prerendered">
    var prerenderedMeta = doc.head.querySelector('meta[name="prerendered"]');
    if (prerenderedMeta)
        return;
    prerenderedMeta = doc.createElement('meta');
    prerenderedMeta.setAttribute('name', 'prerendered');
    doc.head.appendChild(prerenderedMeta);
}

function hydrateHtml(config, ctx, registry, opts) {
    return new Promise(function (resolve) {
        var hydrateResults = {
            diagnostics: [],
            url: opts.url,
            html: opts.html,
            styles: null,
            anchors: []
        };
        var registeredTags = Object.keys(registry || {});
        var ssrIds = 0;
        // if there are no components registered at all
        // then let's skip all this (and why didn't we get components!?)
        if (registeredTags.length === 0) {
            hydrateResults.diagnostics.push({
                header: 'Hydrate Components',
                messageText: "No registered components found",
                type: 'hydrate',
                level: 'info'
            });
            hydrateResults.html = opts.html;
            resolve(hydrateResults);
            return;
        }
        // create a emulated window
        // attach data the request to the window
        var dom = config.sys.createDom();
        var win = dom.parse(opts);
        var doc = win.document;
        // normalize dir and lang before connecting elements
        // so that the info is their incase they read it at runtime
        normalizeDirection(doc, opts);
        normalizeLanguage(doc, opts);
        // create the platform
        var plt = createPlatformServer(config, win, doc, hydrateResults.diagnostics, opts.isPrerender, ctx);
        // fully define each of our components onto this new platform instance
        registeredTags.forEach(function (registryTag) {
            // registry tags are always UPPER-CASE
            // component meta tags are lower-case
            registryTag = registryTag.toUpperCase();
            registry[registryTag].tagNameMeta = registryTag.toLowerCase();
            registry[registryTag].membersMeta = registry[registryTag].membersMeta || {};
            plt.defineComponent(registry[registryTag]);
        });
        // fire off this function when the app has finished loading
        // and all components have finished hydrating
        plt.onAppLoad = function (rootElm, stylesMap, failureDiagnostic) {
            if (config._isTesting) {
                hydrateResults.__testPlatform = plt;
            }
            if (failureDiagnostic) {
                hydrateResults.html = generateFailureDiagnostic(failureDiagnostic);
                resolve(hydrateResults);
                return;
            }
            hydrateResults.root = rootElm;
            // all synchronous operations next
            if (rootElm) {
                try {
                    // optimize this document!!
                    optimizeHtml(config, ctx, doc, stylesMap, opts, hydrateResults);
                    // gather up all of the <a> tag information in the doc
                    if (opts.collectAnchors !== false) {
                        collectAnchors(doc, hydrateResults);
                    }
                    // serialize this dom back into a string
                    if (opts.serializeHtml !== false) {
                        hydrateResults.html = dom.serialize();
                    }
                    // also collect up any dom errors that may have happened
                    hydrateResults.diagnostics = hydrateResults.diagnostics.concat(dom.getDiagnostics());
                }
                catch (e) {
                    // gahh, something's up
                    hydrateResults.diagnostics.push({
                        level: 'error',
                        type: 'hydrate',
                        header: 'DOM Serialize',
                        messageText: e
                    });
                    // idk, some error, just use the original html
                    hydrateResults.html = opts.html;
                }
            }
            // cool, all good here, even if there are errors
            // we're passing back the result object
            resolve(hydrateResults);
        };
        // keep a collection of all the host elements we connected
        var connectedInfo = {
            elementCount: 0
        };
        // patch the render function that we can add SSR ids
        // and to connect any elements it may have just appened to the DOM
        var pltRender = plt.render;
        plt.render = function render(oldVNode, newVNode, isUpdate, hostContentNodes) {
            var ssrId;
            var existingSsrId;
            if (opts.ssrIds !== false) {
                // this may have been patched more than once
                // so reuse the ssr id if it already has one
                if (oldVNode && oldVNode.elm) {
                    existingSsrId = oldVNode.elm.getAttribute(SSR_VNODE_ID);
                }
                if (existingSsrId) {
                    ssrId = parseInt(existingSsrId, 10);
                }
                else {
                    ssrId = ssrIds++;
                }
            }
            newVNode = pltRender(oldVNode, newVNode, isUpdate, hostContentNodes, ssrId);
            connectElement(plt, newVNode.elm, connectedInfo);
            return newVNode;
        };
        // loop through each node and start connecting/hydrating
        // any elements that are host elements to components
        // this kicks off all the async loading and hydrating
        connectElement(plt, win.document.body, connectedInfo);
        if (connectedInfo.elementCount === 0) {
            // what gives, never found ANY host elements to connect!
            // ok we're just done i guess, idk
            hydrateResults.diagnostics.push({
                header: 'Hydrate Components',
                level: 'info',
                type: 'hydrate',
                messageText: 'No elements connected'
            });
            hydrateResults.html = opts.html;
            resolve(hydrateResults);
        }
    });
}
function connectElement(plt, elm, connectedInfo) {
    if (!elm._hasConnected) {
        // only connect elements which is a registered component
        var cmpMeta = plt.getComponentMeta(elm);
        if (cmpMeta) {
            // init our host element functions
            // not using Element.prototype on purpose
            if (!elm.connectedCallback) {
                initHostConstructor(plt, elm);
            }
            // cool, let the element know it's been connected
            elm.connectedCallback();
            // keep count of how many host elements we actually connected
            connectedInfo.elementCount++;
        }
    }
    var elmChildren = elm.children;
    if (elmChildren) {
        // continue drilling down through child elements
        for (var i = 0, l = elmChildren.length; i < l; i++) {
            connectElement(plt, elmChildren[i], connectedInfo);
        }
    }
}
function collectAnchors(doc, hydrateResults) {
    var anchorElements = doc.querySelectorAll('a');
    for (var i = 0; i < anchorElements.length; i++) {
        var attrs = {};
        var anchorAttrs = anchorElements[i].attributes;
        for (var j = 0; j < anchorAttrs.length; j++) {
            attrs[anchorAttrs[j].nodeName.toLowerCase()] = anchorAttrs[j].nodeValue;
        }
        hydrateResults.anchors.push(attrs);
    }
}
function normalizeDirection(doc, opts) {
    var dir = doc.body.getAttribute('dir');
    if (dir) {
        dir = dir.trim().toLowerCase();
        if (dir.trim().length > 0) {
            console.warn("dir=\"" + dir + "\" should be placed on the <html> instead of <body>");
        }
    }
    if (opts.dir) {
        dir = opts.dir;
    }
    else {
        dir = doc.documentElement.getAttribute('dir');
    }
    if (dir) {
        dir = dir.trim().toLowerCase();
        if (dir !== 'ltr' && dir !== 'rtl') {
            console.warn("only \"ltr\" and \"rtl\" are valid \"dir\" values on the <html> element");
        }
    }
    if (dir !== 'ltr' && dir !== 'rtl') {
        dir = 'ltr';
    }
    doc.documentElement.dir = dir;
}
function normalizeLanguage(doc, opts) {
    var lang = doc.body.getAttribute('lang');
    if (lang) {
        lang = lang.trim().toLowerCase();
        if (lang.trim().length > 0) {
            console.warn("lang=\"" + lang + "\" should be placed on <html> instead of <body>");
        }
    }
    if (opts.lang) {
        lang = opts.lang;
    }
    else {
        lang = doc.documentElement.getAttribute('lang');
    }
    if (lang) {
        lang = lang.trim().toLowerCase();
        if (lang.length > 0) {
            doc.documentElement.lang = lang;
        }
    }
}
function generateFailureDiagnostic(d) {
    return "\n    <div style=\"padding: 20px;\">\n      <div style=\"font-weight: bold;\">" + d.header + "</div>\n      <div>" + d.messageText + "</div>\n    </div>\n  ";
}

function validateBuildConfig(config, setEnvVariables) {
    if (!config) {
        throw new Error("invalid build config");
    }
    if (config._isValidated) {
        // don't bother if we've already validated this config
        return config;
    }
    if (!config.logger) {
        throw new Error("config.logger required");
    }
    if (!config.rootDir) {
        throw new Error('config.rootDir required');
    }
    if (!config.sys) {
        throw new Error('config.sys required');
    }
    if (typeof config.namespace !== 'string') {
        config.namespace = DEFAULT_NAMESPACE;
    }
    var invalidNamespaceChars = config.namespace.replace(/\w/g, '');
    if (invalidNamespaceChars !== '') {
        throw new Error("Namespace \"" + config.namespace + "\" contains invalid characters: " + invalidNamespaceChars);
    }
    if (config.namespace.length < 3) {
        throw new Error("Namespace \"" + config.namespace + "\" must be at least 3 characters");
    }
    if (/^\d+$/.test(config.namespace.charAt(0))) {
        throw new Error("Namespace \"" + config.namespace + "\" cannot have a number for the first character");
    }
    var path = config.sys.path;
    if (typeof config.global === 'string' && !path.isAbsolute(config.global)) {
        config.global = normalizePath(path.join(config.rootDir, config.global));
    }
    if (typeof config.src === 'string') {
        // deprecated: 2017-08-14
        console.warn("stencil config property \"src\" has been renamed to \"srcDir\"");
        config.srcDir = config.src;
    }
    if (typeof config.srcDir !== 'string') {
        config.srcDir = DEFAULT_SRC_DIR;
    }
    if (!path.isAbsolute(config.srcDir)) {
        config.srcDir = normalizePath(path.join(config.rootDir, config.srcDir));
    }
    if (typeof config.wwwDir !== 'string') {
        config.wwwDir = DEFAULT_WWW_DIR;
    }
    if (!path.isAbsolute(config.wwwDir)) {
        config.wwwDir = normalizePath(path.join(config.rootDir, config.wwwDir));
    }
    if (typeof config.buildDir !== 'string') {
        config.buildDir = DEFAULT_BUILD_DIR;
    }
    if (!path.isAbsolute(config.buildDir)) {
        config.buildDir = normalizePath(path.join(config.wwwDir, config.buildDir));
    }
    if (typeof config.distDir !== 'string') {
        config.distDir = DEFAULT_DIST_DIR;
    }
    if (!path.isAbsolute(config.distDir)) {
        config.distDir = normalizePath(path.join(config.rootDir, config.distDir));
    }
    if (typeof config.collectionDir !== 'string') {
        config.collectionDir = DEFAULT_COLLECTION_DIR;
    }
    if (!path.isAbsolute(config.collectionDir)) {
        config.collectionDir = normalizePath(path.join(config.distDir, config.collectionDir));
    }
    if (typeof config.srcIndexHtml !== 'string') {
        config.srcIndexHtml = normalizePath(path.join(config.srcDir, DEFAULT_INDEX_HTML));
    }
    if (!path.isAbsolute(config.srcIndexHtml)) {
        config.srcIndexHtml = normalizePath(path.join(config.rootDir, config.srcIndexHtml));
    }
    if (typeof config.wwwIndexHtml !== 'string') {
        config.wwwIndexHtml = normalizePath(path.join(config.wwwDir, DEFAULT_INDEX_HTML));
    }
    if (!path.isAbsolute(config.wwwIndexHtml)) {
        config.wwwIndexHtml = normalizePath(path.join(config.rootDir, config.wwwDir));
    }
    if (typeof config.publicPath !== 'string') {
        // CLIENT SIDE ONLY! Do not use this for server-side file read/writes
        // this is a reference to the public static directory from the index.html running from a browser
        // in most cases it's just "build", as in index page would request scripts from `/build/`
        config.publicPath = normalizePath(path.relative(config.wwwDir, config.buildDir));
        if (config.publicPath.charAt(0) !== '/') {
            // ensure prefix / by default
            config.publicPath = '/' + config.publicPath;
        }
    }
    if (config.publicPath.charAt(config.publicPath.length - 1) !== '/') {
        // ensure there's a trailing /
        config.publicPath += '/';
    }
    // default devMode false
    config.devMode = !!config.devMode;
    // default watch false
    config.watch = !!config.watch;
    if (typeof config.minifyCss !== 'boolean') {
        // if no config, minify css when it's the prod build
        config.minifyCss = (!config.devMode);
    }
    config.logger.debug("minifyCss: " + config.minifyCss);
    if (typeof config.minifyJs !== 'boolean') {
        // if no config, minify js when it's the prod build
        config.minifyJs = (!config.devMode);
    }
    config.logger.debug("minifyJs: " + config.minifyJs);
    if (typeof config.hashFileNames !== 'boolean') {
        // hashFileNames config was not provided, so let's create the default
        if (config.devMode || config.watch) {
            // dev mode should not hash filenames
            // during watch rebuilds it should not hash filenames
            config.hashFileNames = false;
        }
        else {
            // prod builds should hash filenames
            config.hashFileNames = true;
        }
    }
    config.logger.debug("hashFileNames: " + config.hashFileNames);
    if (typeof config.hashedFileNameLength !== 'number') {
        config.hashedFileNameLength = DEFAULT_HASHED_FILENAME_LENTH;
    }
    if (config.hashFileNames) {
        if (config.hashedFileNameLength < 4) {
            throw new Error("config.hashedFileNameLength must be at least 4 characters");
        }
    }
    config.logger.debug("hashedFileNameLength: " + config.hashedFileNameLength);
    config.generateDistribution = !!config.generateDistribution;
    if (typeof config.generateWWW !== 'boolean') {
        config.generateWWW = true;
    }
    if (config.copy) {
        // merge user copy tasks into the default
        config.copy = Object.assign({}, DEFAULT_COPY_TASKS, config.copy);
    }
    else if (config.copy === null || config.copy === false) {
        // manually forcing to skip the copy task
        config.copy = null;
    }
    else {
        // use the default copy tasks
        config.copy = Object.assign({}, DEFAULT_COPY_TASKS);
    }
    if (!config.watchIgnoredRegex) {
        config.watchIgnoredRegex = DEFAULT_WATCH_IGNORED_REGEX;
    }
    config.emptyDist = !!config.emptyDist;
    config.emptyWWW = !!config.emptyWWW;
    config.collections = config.collections || [];
    config.collections = config.collections.map(validateDependentCollection);
    config.bundles = config.bundles || [];
    validateUserBundles(config.bundles);
    config.exclude = config.exclude || DEFAULT_EXCLUDES;
    // set to true so it doesn't bother going through all this again on rebuilds
    config._isValidated = true;
    config.logger.debug("validated build config");
    if (setEnvVariables !== false) {
        setProcessEnvironment(config);
    }
    return config;
}
function setProcessEnvironment(config) {
    process.env.NODE_ENV = config.devMode ? 'development' : 'production';
}
function validateDependentCollection(userInput) {
    if (!userInput || Array.isArray(userInput) || typeof userInput === 'number' || typeof userInput === 'boolean') {
        throw new Error("invalid collection: " + userInput);
    }
    var collection;
    if (typeof userInput === 'string') {
        collection = {
            name: userInput
        };
    }
    else {
        collection = userInput;
    }
    if (!collection.name || typeof collection.name !== 'string' || collection.name.trim() === '') {
        throw new Error("missing collection name");
    }
    collection.name = collection.name.trim();
    collection.includeBundledOnly = !!collection.includeBundledOnly;
    return collection;
}
function validateUserBundles(bundles) {
    if (!bundles) {
        throw new Error("Invalid bundles");
    }
    // normalize bundle component tags
    // sort by tag name and ensure they're lower case
    bundles.forEach(function (b) {
        if (!Array.isArray(b.components)) {
            throw new Error("manifest missing bundle components array, instead received: " + b.components);
        }
        b.components = b.components.filter(function (c) { return typeof c === 'string' && c.trim().length; });
        if (!b.components.length) {
            throw new Error("No valid bundle components found within stencil config");
        }
        b.components = b.components.map(function (tag) { return validateComponentTag(tag); }).sort();
    });
    bundles.sort(function (a, b) {
        if (a.components && a.components.length && b.components && b.components.length) {
            if (a.components[0].toLowerCase() < b.components[0].toLowerCase())
                return -1;
            if (a.components[0].toLowerCase() > b.components[0].toLowerCase())
                return 1;
        }
        return 0;
    });
}
function validateComponentTag(tag) {
    if (typeof tag !== 'string') {
        throw new Error("Tag \"" + tag + "\" must be a string type");
    }
    tag = tag.trim().toLowerCase();
    if (tag.length === 0) {
        throw new Error("Received empty tag value");
    }
    if (tag.indexOf(' ') > -1) {
        throw new Error("\"" + tag + "\" tag cannot contain a space");
    }
    if (tag.indexOf(',') > -1) {
        throw new Error("\"" + tag + "\" tag cannot be use for multiple tags");
    }
    var invalidChars = tag.replace(/\w|-/g, '');
    if (invalidChars !== '') {
        throw new Error("\"" + tag + "\" tag contains invalid characters: " + invalidChars);
    }
    if (tag.indexOf('-') === -1) {
        throw new Error("\"" + tag + "\" tag must contain a dash (-) to work as a valid web component");
    }
    if (tag.indexOf('--') > -1) {
        throw new Error("\"" + tag + "\" tag cannot contain multiple dashes (--) next to each other");
    }
    if (tag.indexOf('-') === 0) {
        throw new Error("\"" + tag + "\" tag cannot start with a dash (-)");
    }
    if (tag.lastIndexOf('-') === tag.length - 1) {
        throw new Error("\"" + tag + "\" tag cannot end with a dash (-)");
    }
    return tag;
}
var DEFAULT_SRC_DIR = 'src';
var DEFAULT_WWW_DIR = 'www';
var DEFAULT_BUILD_DIR = 'build';
var DEFAULT_INDEX_HTML = 'index.html';
var DEFAULT_DIST_DIR = 'dist';
var DEFAULT_COLLECTION_DIR = 'collection';
var DEFAULT_NAMESPACE = 'App';
var DEFAULT_HASHED_FILENAME_LENTH = 8;
var DEFAULT_EXCLUDES = ['node_modules', 'bower_components'];
var DEFAULT_WATCH_IGNORED_REGEX = /(\.(jpg|jpeg|png|gif|woff|woff2|ttf|eot)|(?:^|[\\\/])(\.(?!\.)[^\\\/]+)$)$/i;
var DEFAULT_COPY_TASKS = {
    assets: { src: 'assets' },
    manifestJson: { src: 'manifest.json' }
};

function mockStencilSystem() {
    var sys = {
        compiler: {
            name: 'test',
            version: 'test'
        },
        copy: function mockCopyDir(src, dest) {
            return new Promise(function (resolve) {
                resolve();
            });
        },
        createDom: mockCreateDom,
        emptyDir: function () {
            return new Promise(function (resolve) {
                resolve();
            });
        },
        ensureDir: function () {
            return new Promise(function (resolve) {
                resolve();
            });
        },
        generateContentHash: function mockGenerateContentHash(content, length) {
            var crypto = require('crypto');
            return crypto.createHash('sha1')
                .update(content)
                .digest('base64')
                .replace(/\W/g, '')
                .substr(0, length)
                .toLowerCase();
        },
        getClientCoreFile: mockGetClientCoreFile,
        fs: null,
        isGlob: function (str) {
            var isGlob = require('is-glob');
            return isGlob(str);
        },
        minifyCss: mockMinify,
        minifyJs: mockMinify,
        path: require('path'),
        remove: function mockRmDir(path) {
            return new Promise(function (resolve) {
                resolve();
            });
        },
        rollup: rollup,
        sass: {
            render: function (config, cb) {
                Promise.resolve().then(function () {
                    cb(null, {
                        css: "/** " + config.file + " mock css **/",
                        stats: []
                    });
                });
            }
        },
        typescript: require('typescript'),
        url: require('url'),
        vm: {
            createContext: function (ctx, wwwDir, sandbox) {
                return require('vm').createContext(sandbox);
            },
            runInContext: function (code, contextifiedSandbox, options) {
                require('vm').runInContext(code, contextifiedSandbox, options);
            }
        },
        watch: mockWatch
    };
    return sys;
}
function mockGetClientCoreFile(opts) {
    return Promise.resolve("\n    (function (window, document, apptNamespace, appFileName, appCore, appCorePolyfilled, components) {\n        // mock getClientCoreFile, staticName: " + opts.staticName + "\n    })(window, document, '__STENCIL__APP__');");
}
function mockWatch(paths) {
    var events = {};
    var watcher = {
        on: function (eventName, listener) {
            events[eventName] = listener;
            return watcher;
        },
        $triggerEvent: function (eventName, path) {
            events[eventName](path);
        }
    };
    return watcher;
}
function mockCreateDom() {
    var jsdom = require('jsdom');
    var dom;
    return {
        parse: function (opts) {
            dom = new jsdom.JSDOM(opts.html, {
                url: opts.url,
                referrer: opts.referrer,
                userAgent: opts.userAgent,
            });
            return dom.window;
        },
        serialize: function () {
            return dom.serialize();
        },
        destroy: function () {
            dom.window.close();
            dom = null;
        },
        getDiagnostics: function () {
            return [];
        }
    };
}
function mockMinify(input) {
    return {
        output: "/** mock minify **/\n" + input,
        diagnostics: []
    };
}
var rollup = require('rollup');
rollup.plugins = {
    commonjs: require('rollup-plugin-commonjs'),
    nodeResolve: require('rollup-plugin-node-resolve')
};

function mockLogger() {
    var logger = {
        level: 'info',
        debug: noop,
        info: noop,
        error: noop,
        warn: noop,
        createTimeSpan: function (startMsg, debug) {
            return {
                finish: function () {
                    
                }
            };
        },
        printDiagnostics: noop
    };
    return logger;
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function render(opts) {
    return __awaiter(this, void 0, void 0, function () {
        var config, ctx, registry, hydrateOpts, results, msg, rootElm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validateRenderOptions(opts);
                    config = getTestBuildConfig();
                    ctx = getBuildContext();
                    registry = {};
                    hydrateOpts = {
                        html: opts.html,
                        isPrerender: false,
                        collectAnchors: false,
                        serializeHtml: false,
                        inlineLoaderScript: false,
                        inlineStyles: false,
                        removeUnusedStyles: false,
                        canonicalLink: false,
                        collapseWhitespace: false,
                        ssrIds: false
                    };
                    opts.components.forEach(function (testCmp) {
                        if (testCmp && testCmp.metadata) {
                            var cmpMeta = testCmp.metadata;
                            cmpMeta.componentModule = testCmp;
                            registry[cmpMeta.tagNameMeta.toUpperCase()] = cmpMeta;
                        }
                    });
                    return [4 /*yield*/, hydrateHtml(config, ctx, registry, hydrateOpts)];
                case 1:
                    results = _a.sent();
                    if (results.diagnostics.length) {
                        msg = results.diagnostics.map(function (d) { return d.messageText; }).join('\n');
                        throw new Error(msg);
                    }
                    rootElm = (results.root && results.root.children.length > 1 && results.root.children[1].firstElementChild) || null;
                    if (rootElm) {
                        rootElm.__testPlatform = results.__testPlatform;
                        delete results.__testPlatform;
                    }
                    return [2 /*return*/, rootElm];
            }
        });
    });
}
function flush(root) {
    return new Promise(function (resolve, reject) {
        var plt = root.__testPlatform;
        if (!plt) {
            reject("invalid testing root node");
            return;
        }
        plt.queue.flush(function () {
            resolve();
        });
    });
}
function getTestBuildConfig() {
    var sys = mockStencilSystem();
    var config = {
        sys: sys,
        logger: mockLogger(),
        rootDir: '/',
        suppressTypeScriptErrors: true,
        devMode: true
    };
    config.prerender = false;
    config.devMode = true;
    config._isTesting = true;
    config.serviceWorker = false;
    config.emptyDist = false;
    config.emptyWWW = false;
    config.generateDistribution = false;
    config.generateWWW = false;
    return validateBuildConfig(config);
}
function validateRenderOptions(opts) {
    if (!opts) {
        throw new Error('missing render() options');
    }
    if (!opts.components) {
        throw new Error("missing render() components: " + opts);
    }
    if (!Array.isArray(opts.components)) {
        throw new Error("render() components must be an array: " + opts);
    }
    if (typeof opts.html !== 'string') {
        throw new Error("render() html must be a string: " + opts);
    }
}

function updateComponentClass(classNode) {
    return ts.createClassDeclaration(undefined, // <-- that's what's removing the decorator
    // Make the component the default export
    [ts.createToken(ts.SyntaxKind.ExportKeyword)], 
    // everything else should be the same
    classNode.name, classNode.typeParameters, classNode.heritageClauses, classNode.members);
}

function isInstanceOfObjectMap(object) {
    return !object.hasOwnProperty('kind') &&
        !object.hasOwnProperty('flags') &&
        !object.hasOwnProperty('pos') &&
        !object.hasOwnProperty('end');
}
function getTextOfPropertyName(name) {
    switch (name.kind) {
        case ts.SyntaxKind.Identifier:
            return name.text;
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NumericLiteral:
            return name.text;
        case ts.SyntaxKind.ComputedPropertyName:
            var expression = name.expression;
            if (ts.isStringLiteral(expression) || ts.isNumericLiteral(expression)) {
                return name.expression.text;
            }
    }
    return undefined;
}
function objectLiteralToObjectMap(objectLiteral) {
    var attrs = objectLiteral.properties;
    return attrs.reduce(function (final, attr) {
        var name = getTextOfPropertyName(attr.name);
        var val;
        switch (attr.initializer.kind) {
            case ts.SyntaxKind.ObjectLiteralExpression:
                val = objectLiteralToObjectMap(attr.initializer);
                break;
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.Identifier:
            case ts.SyntaxKind.PropertyAccessExpression:
            default:
                val = attr.initializer;
        }
        final[name] = val;
        return final;
    }, {});
}
function objectMapToObjectLiteral(objMap) {
    var newProperties = Object.keys(objMap).map(function (key) {
        var value = objMap[key];
        if (isInstanceOfObjectMap(value)) {
            return ts.createPropertyAssignment(ts.createLiteral(key), objectMapToObjectLiteral(value));
        }
        return ts.createPropertyAssignment(ts.createLiteral(key), value);
    });
    return ts.createObjectLiteral(newProperties);
}
/**
 * Convert a js value into typescript AST
 * @param val array, object, string, boolean, or number
 * @returns Typescript Object Literal, Array Literal, String Literal, Boolean Literal, Numeric Literal
 */
function convertValueToLiteral(val) {
    if (Array.isArray(val)) {
        return arrayToArrayLiteral(val);
    }
    if (typeof val === 'object') {
        return objectToObjectLiteral(val);
    }
    return ts.createLiteral(val);
}
/**
 * Convert a js object into typescript AST
 * @param obj key value object
 * @returns Typescript Object Literal Expression
 */
function objectToObjectLiteral(obj) {
    var newProperties = Object.keys(obj).map(function (key) {
        return ts.createPropertyAssignment(ts.createLiteral(key), convertValueToLiteral(obj[key]));
    });
    return ts.createObjectLiteral(newProperties);
}
/**
 * Convert a js array into typescript AST
 * @param list array
 * @returns Typescript Array Literal Expression
 */
function arrayToArrayLiteral(list) {
    var newList = list.map(convertValueToLiteral);
    return ts.createArrayLiteral(newList);
}
/**
 * Execute an array of transforms over a string containing typescript source
 * @param sourceText Typescript source as a string
 * @param transformers Array of transforms to run agains the source string
 * @returns a string
 */

/**
 * Execute transforms over a string containing typescript source
 * @param sourceText Typescript source as a string
 * @param transformers Object containing before and after transforms to run against the source string
 * @returns a string
 */

function addMetadataExport(moduleFile) {
    return function (transformContext) {
        function visitClass(classNode, cmpMeta) {
            var meta = convertValueToLiteral(cmpMeta);
            var metadataProperty = ts.createProperty(undefined, [ts.createToken(ts.SyntaxKind.StaticKeyword)], 'metadata', undefined, undefined, meta);
            return ts.updateClassDeclaration(classNode, classNode.decorators, classNode.modifiers, classNode.name, classNode.typeParameters, classNode.heritageClauses, classNode.members.concat(metadataProperty));
        }
        function visit(node, cmpMeta) {
            switch (node.kind) {
                case ts.SyntaxKind.ClassDeclaration:
                    return visitClass(node, cmpMeta);
                default:
                    return ts.visitEachChild(node, function (node) {
                        return visit(node, cmpMeta);
                    }, transformContext);
            }
        }
        return function (tsSourceFile) {
            return visit(tsSourceFile, moduleFile.cmpMeta);
        };
    };
}

// this maps the json data to our internal data structure
// apping is so that the internal data structure "could"
// change, but the external user data will always use the same api
// over the top lame mapping functions is basically so we can loosly
// couple core component meta data between specific versions of the compiler

/**
 * Ported from highlight.js
 * Syntax highlighting with language autodetection.
 * https://highlightjs.org/
 * Copyright (c) 2006, Ivan Sagalaev
 * https://github.com/isagalaev/highlight.js/blob/master/LICENSE
 */
var hljs = {};
// Convenience variables for build-in objects
var objectKeys = Object.keys;
// Global internal variables used within the highlight.js library.
var languages = {};
var aliases = {};
var spanEndTag = '</span>';
// Global options used when within external APIs. This is modified when
// calling the `hljs.configure` function.
var options = {
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: undefined
};
// Object map that is used to escape some common HTML characters.
var escapeRegexMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
/* Utility functions */
function escape(value) {
    return value.replace(/[&<>]/gm, function (character) {
        return escapeRegexMap[character];
    });
}
function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index === 0;
}
function inherit(parent, obj) {
    var key;
    var result = {};
    for (key in parent)
        result[key] = parent[key];
    if (obj)
        for (key in obj)
            result[key] = obj[key];
    return result;
}
/* Initialization */
function compileLanguage(language) {
    function reStr(re) {
        return (re && re.source) || re;
    }
    function langRe(value, global) {
        return new RegExp(reStr(value), 'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : ''));
    }
    function compileMode(mode, parent) {
        if (mode.compiled)
            return;
        mode.compiled = true;
        mode.keywords = mode.keywords || mode.beginKeywords;
        if (mode.keywords) {
            var compiled_keywords = {};
            var flatten = function (className, str) {
                if (language.case_insensitive) {
                    str = str.toLowerCase();
                }
                str.split(' ').forEach(function (kw) {
                    var pair = kw.split('|');
                    compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];
                });
            };
            if (typeof mode.keywords === 'string') {
                flatten('keyword', mode.keywords);
            }
            else {
                objectKeys(mode.keywords).forEach(function (className) {
                    flatten(className, mode.keywords[className]);
                });
            }
            mode.keywords = compiled_keywords;
        }
        mode.lexemesRe = langRe(mode.lexemes || /\w+/, true);
        if (parent) {
            if (mode.beginKeywords) {
                mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
            }
            if (!mode.begin)
                mode.begin = /\B|\b/;
            mode.beginRe = langRe(mode.begin);
            if (!mode.end && !mode.endsWithParent)
                mode.end = /\B|\b/;
            if (mode.end)
                mode.endRe = langRe(mode.end);
            mode.terminator_end = reStr(mode.end) || '';
            if (mode.endsWithParent && parent.terminator_end)
                mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
        }
        if (mode.illegal)
            mode.illegalRe = langRe(mode.illegal);
        if (mode.relevance == null)
            mode.relevance = 1;
        if (!mode.contains) {
            mode.contains = [];
        }
        var expanded_contains = [];
        mode.contains.forEach(function (c) {
            if (c.variants) {
                c.variants.forEach(function (v) { expanded_contains.push(inherit(c, v)); });
            }
            else {
                expanded_contains.push(c === 'self' ? mode : c);
            }
        });
        mode.contains = expanded_contains;
        mode.contains.forEach(function (c) { compileMode(c, mode); });
        if (mode.starts) {
            compileMode(mode.starts, parent);
        }
        var terminators = mode.contains.map(function (c) {
            return c.beginKeywords ? '\\.?(' + c.begin + ')\\.?' : c.begin;
        })
            .concat([mode.terminator_end, mode.illegal])
            .map(reStr)
            .filter(Boolean);
        mode.terminators = terminators.length ? langRe(terminators.join('|'), true) : { exec: function () { return null; } };
    }
    compileMode(language);
}

/*
Core highlighting function. Accepts a language name, or an alias, and a
string with the code to highlight. Returns an object with the following
properties:

- relevance (int)
- value (an HTML string with highlighting markup)

*/
function highlight(name, value, ignore_illegals, continuation) {
    function subMode(lexeme, mode) {
        var i, length;
        for (i = 0, length = mode.contains.length; i < length; i++) {
            if (testRe(mode.contains[i].beginRe, lexeme)) {
                return mode.contains[i];
            }
        }
    }
    function endOfMode(mode, lexeme) {
        if (testRe(mode.endRe, lexeme)) {
            while (mode.endsParent && mode.parent) {
                mode = mode.parent;
            }
            return mode;
        }
        if (mode.endsWithParent) {
            return endOfMode(mode.parent, lexeme);
        }
    }
    function isIllegal(lexeme, mode) {
        return !ignore_illegals && testRe(mode.illegalRe, lexeme);
    }
    function keywordMatch(mode, match) {
        var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
        return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
    }
    function buildSpan(classname, insideSpan, leaveOpen, noPrefix) {
        var classPrefix = noPrefix ? '' : options.classPrefix, openSpan = '<span class="' + classPrefix, closeSpan = leaveOpen ? '' : spanEndTag;
        openSpan += classname + '">';
        return openSpan + insideSpan + closeSpan;
    }
    function processKeywords() {
        var keyword_match, last_index, match, result;
        if (!top.keywords)
            return escape(mode_buffer);
        result = '';
        last_index = 0;
        top.lexemesRe.lastIndex = 0;
        match = top.lexemesRe.exec(mode_buffer);
        while (match) {
            result += escape(mode_buffer.substr(last_index, match.index - last_index));
            keyword_match = keywordMatch(top, match);
            if (keyword_match) {
                relevance += keyword_match[1];
                result += buildSpan(keyword_match[0], escape(match[0]));
            }
            else {
                result += escape(match[0]);
            }
            last_index = top.lexemesRe.lastIndex;
            match = top.lexemesRe.exec(mode_buffer);
        }
        return result + escape(mode_buffer.substr(last_index));
    }
    function processSubLanguage() {
        var explicit = typeof top.subLanguage === 'string';
        if (explicit && !languages[top.subLanguage]) {
            return escape(mode_buffer);
        }
        var result = explicit ?
            highlight(top.subLanguage, mode_buffer, true, continuations[top.subLanguage]) :
            highlightAuto(mode_buffer, top.subLanguage.length ? top.subLanguage : undefined);
        // Counting embedded language score towards the host language may be disabled
        // with zeroing the containing mode relevance. Usecase in point is Markdown that
        // allows XML everywhere and makes every XML snippet to have a much larger Markdown
        // score.
        if (top.relevance > 0) {
            relevance += result.relevance;
        }
        if (explicit) {
            continuations[top.subLanguage] = result.top;
        }
        return buildSpan(result.language, result.value, false, true);
    }
    function processBuffer() {
        result += (top.subLanguage != null ? processSubLanguage() : processKeywords());
        mode_buffer = '';
    }
    function startNewMode(mode) {
        result += mode.className ? buildSpan(mode.className, '', true) : '';
        top = Object.create(mode, { parent: { value: top } });
    }
    function processLexeme(buffer, lexeme) {
        mode_buffer += buffer;
        if (lexeme == null) {
            processBuffer();
            return 0;
        }
        var new_mode = subMode(lexeme, top);
        if (new_mode) {
            if (new_mode.skip) {
                mode_buffer += lexeme;
            }
            else {
                if (new_mode.excludeBegin) {
                    mode_buffer += lexeme;
                }
                processBuffer();
                if (!new_mode.returnBegin && !new_mode.excludeBegin) {
                    mode_buffer = lexeme;
                }
            }
            startNewMode(new_mode);
            return new_mode.returnBegin ? 0 : lexeme.length;
        }
        var end_mode = endOfMode(top, lexeme);
        if (end_mode) {
            var origin = top;
            if (origin.skip) {
                mode_buffer += lexeme;
            }
            else {
                if (!(origin.returnEnd || origin.excludeEnd)) {
                    mode_buffer += lexeme;
                }
                processBuffer();
                if (origin.excludeEnd) {
                    mode_buffer = lexeme;
                }
            }
            do {
                if (top.className) {
                    result += spanEndTag;
                }
                if (!top.skip) {
                    relevance += top.relevance;
                }
                top = top.parent;
            } while (top !== end_mode.parent);
            if (end_mode.starts) {
                startNewMode(end_mode.starts);
            }
            return origin.returnEnd ? 0 : lexeme.length;
        }
        if (isIllegal(lexeme, top))
            throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
        /*
        Parser should not reach this point as all types of lexemes should be caught
        earlier, but if it does due to some bug make sure it advances at least one
        character forward to prevent infinite looping.
        */
        mode_buffer += lexeme;
        return lexeme.length || 1;
    }
    var language = getLanguage(name);
    if (!language) {
        throw new Error('Unknown language: "' + name + '"');
    }
    compileLanguage(language);
    var top = continuation || language;
    var continuations = {}; // keep continuations for sub-languages
    var result = '', current;
    for (current = top; current !== language; current = current.parent) {
        if (current.className) {
            result = buildSpan(current.className, '', true) + result;
        }
    }
    var mode_buffer = '';
    var relevance = 0;
    try {
        var match, count, index = 0;
        while (true) {
            top.terminators.lastIndex = index;
            match = top.terminators.exec(value);
            if (!match)
                break;
            count = processLexeme(value.substr(index, match.index - index), match[0]);
            index = match.index + count;
        }
        processLexeme(value.substr(index));
        for (current = top; current.parent; current = current.parent) {
            if (current.className) {
                result += spanEndTag;
            }
        }
        return {
            relevance: relevance,
            value: result,
            language: name,
            top: top
        };
    }
    catch (e) {
        if (e.message && e.message.indexOf('Illegal') !== -1) {
            return {
                relevance: 0,
                value: escape(value)
            };
        }
        else {
            throw e;
        }
    }
}
/*
Highlighting with language detection. Accepts a string with the code to
highlight. Returns an object with the following properties:

- language (detected language)
- relevance (int)
- value (an HTML string with highlighting markup)
- second_best (object with the same structure for second-best heuristically
  detected language, may be absent)

*/
function highlightAuto(text, languageSubset) {
    languageSubset = languageSubset || options.languages || objectKeys(languages);
    var result = {
        relevance: 0,
        value: escape(text)
    };
    var second_best = result;
    languageSubset.filter(getLanguage).forEach(function (name) {
        var current = highlight(name, text, false);
        current.language = name;
        if (current.relevance > second_best.relevance) {
            second_best = current;
        }
        if (current.relevance > result.relevance) {
            second_best = result;
            result = current;
        }
    });
    if (second_best.language) {
        result.second_best = second_best;
    }
    return result;
}
/*
Updates highlight.js global options with values passed in the form of an object.
*/
function configure(user_options) {
    options = inherit(options, user_options);
}
function registerLanguage(name, language) {
    var lang = languages[name] = language(hljs);
    if (lang.aliases) {
        lang.aliases.forEach(function (alias) { aliases[alias] = name; });
    }
}
function listLanguages() {
    return objectKeys(languages);
}
function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
}
/* Interface definition */
hljs.highlight = highlight;
hljs.highlightAuto = highlightAuto;
hljs.configure = configure;
hljs.registerLanguage = registerLanguage;
hljs.listLanguages = listLanguages;
hljs.getLanguage = getLanguage;
hljs.inherit = inherit;
// Common regexps
hljs.IDENT_RE = '[a-zA-Z]\\w*';
hljs.UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
hljs.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
hljs.C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float
hljs.BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...
hljs.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';
// Common modes
hljs.BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]', relevance: 0
};
hljs.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'', end: '\'',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
};
hljs.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"', end: '"',
    illegal: '\\n',
    contains: [hljs.BACKSLASH_ESCAPE]
};
hljs.PHRASAL_WORDS_MODE = {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/
};
hljs.COMMENT = function (begin, end, inherits) {
    var mode = hljs.inherit({
        className: 'comment',
        begin: begin, end: end,
        contains: []
    }, inherits || {});
    mode.contains.push(hljs.PHRASAL_WORDS_MODE);
    mode.contains.push({
        className: 'doctag',
        begin: '(?:TODO|FIXME|NOTE|BUG|XXX):',
        relevance: 0
    });
    return mode;
};
hljs.C_LINE_COMMENT_MODE = hljs.COMMENT('//', '$');
hljs.C_BLOCK_COMMENT_MODE = hljs.COMMENT('/\\*', '\\*/');
hljs.HASH_COMMENT_MODE = hljs.COMMENT('#', '$');
hljs.NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE,
    relevance: 0
};
hljs.C_NUMBER_MODE = {
    className: 'number',
    begin: hljs.C_NUMBER_RE,
    relevance: 0
};
hljs.BINARY_NUMBER_MODE = {
    className: 'number',
    begin: hljs.BINARY_NUMBER_RE,
    relevance: 0
};
hljs.CSS_NUMBER_MODE = {
    className: 'number',
    begin: hljs.NUMBER_RE + '(' +
        '%|em|ex|ch|rem' +
        '|vw|vh|vmin|vmax' +
        '|cm|mm|in|pt|pc|px' +
        '|deg|grad|rad|turn' +
        '|s|ms' +
        '|Hz|kHz' +
        '|dpi|dpcm|dppx' +
        ')?',
    relevance: 0
};
hljs.REGEXP_MODE = {
    className: 'regexp',
    begin: /\//, end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [
        hljs.BACKSLASH_ESCAPE,
        {
            begin: /\[/, end: /\]/,
            relevance: 0,
            contains: [hljs.BACKSLASH_ESCAPE]
        }
    ]
};
hljs.TITLE_MODE = {
    className: 'title',
    begin: hljs.IDENT_RE,
    relevance: 0
};
hljs.UNDERSCORE_TITLE_MODE = {
    className: 'title',
    begin: hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
};
hljs.METHOD_GUARD = {
    // excludes method names from keyword processing
    begin: '\\.\\s*' + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0
};
hljs.registerLanguage('typescript', typescript);
function typescript(hljs) {
    var KEYWORDS = {
        keyword: 'in if for while finally var new function do return void else break catch ' +
            'instanceof with throw case default try this switch continue typeof delete ' +
            'let yield const class public private protected get set super ' +
            'static implements enum export import declare type namespace abstract',
        literal: 'true false null undefined NaN Infinity',
        built_in: 'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
            'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
            'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
            'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
            'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
            'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
            'module console window document any number boolean string void'
    };
    return {
        aliases: ['ts'],
        keywords: KEYWORDS,
        contains: [
            {
                className: 'meta',
                begin: /^\s*['"]use strict['"]/
            },
            hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE,
            {
                className: 'string',
                begin: '`', end: '`',
                contains: [
                    hljs.BACKSLASH_ESCAPE,
                    {
                        className: 'subst',
                        begin: '\\$\\{', end: '\\}'
                    }
                ]
            },
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            {
                className: 'number',
                variants: [
                    { begin: '\\b(0[bB][01]+)' },
                    { begin: '\\b(0[oO][0-7]+)' },
                    { begin: hljs.C_NUMBER_RE }
                ],
                relevance: 0
            },
            {
                begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
                keywords: 'return throw case',
                contains: [
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE,
                    hljs.REGEXP_MODE
                ],
                relevance: 0
            },
            {
                className: 'function',
                begin: 'function', end: /[\{;]/, excludeEnd: true,
                keywords: KEYWORDS,
                contains: [
                    'self',
                    hljs.inherit(hljs.TITLE_MODE, { begin: /[A-Za-z$_][0-9A-Za-z$_]*/ }),
                    {
                        className: 'params',
                        begin: /\(/, end: /\)/,
                        excludeBegin: true,
                        excludeEnd: true,
                        keywords: KEYWORDS,
                        contains: [
                            hljs.C_LINE_COMMENT_MODE,
                            hljs.C_BLOCK_COMMENT_MODE
                        ],
                        illegal: /["'\(]/
                    }
                ],
                illegal: /%/,
                relevance: 0 // () => {} is more typical in TypeScript
            },
            {
                beginKeywords: 'constructor', end: /\{/, excludeEnd: true
            },
            {
                begin: /module\./,
                keywords: { built_in: 'module' },
                relevance: 0
            },
            {
                beginKeywords: 'module', end: /\{/, excludeEnd: true
            },
            {
                beginKeywords: 'interface', end: /\{/, excludeEnd: true,
                keywords: 'interface extends'
            },
            {
                begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
            },
            {
                begin: '\\.' + hljs.IDENT_RE, relevance: 0 // hack: prevents detection of keywords after dots
            }
        ]
    };
}
hljs.registerLanguage('scss', scss);
function scss(hljs) {
    var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
    var VARIABLE = {
        className: 'variable',
        begin: '(\\$' + IDENT_RE + ')\\b'
    };
    var HEXCOLOR = {
        className: 'number', begin: '#[0-9A-Fa-f]+'
    };
    // var DEF_INTERNALS = {
    //   className: 'attribute',
    //   begin: '[A-Z\\_\\.\\-]+', end: ':',
    //   excludeEnd: true,
    //   illegal: '[^\\s]',
    //   starts: {
    //     endsWithParent: true, excludeEnd: true,
    //     contains: [
    //       HEXCOLOR,
    //       hljs.CSS_NUMBER_MODE,
    //       hljs.QUOTE_STRING_MODE,
    //       hljs.APOS_STRING_MODE,
    //       hljs.C_BLOCK_COMMENT_MODE,
    //       {
    //         className: 'meta', begin: '!important'
    //       }
    //     ]
    //   }
    // };
    return {
        case_insensitive: true,
        illegal: '[=/|\']',
        contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            {
                className: 'selector-id', begin: '\\#[A-Za-z0-9_-]+',
                relevance: 0
            },
            {
                className: 'selector-class', begin: '\\.[A-Za-z0-9_-]+',
                relevance: 0
            },
            {
                className: 'selector-attr', begin: '\\[', end: '\\]',
                illegal: '$'
            },
            {
                className: 'selector-tag',
                begin: '\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b',
                relevance: 0
            },
            {
                begin: ':(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)'
            },
            {
                begin: '::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)'
            },
            VARIABLE,
            {
                className: 'attribute',
                begin: '\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b',
                illegal: '[^\\s]'
            },
            {
                begin: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b'
            },
            {
                begin: ':', end: ';',
                contains: [
                    VARIABLE,
                    HEXCOLOR,
                    hljs.CSS_NUMBER_MODE,
                    hljs.QUOTE_STRING_MODE,
                    hljs.APOS_STRING_MODE,
                    {
                        className: 'meta', begin: '!important'
                    }
                ]
            },
            {
                begin: '@', end: '[{;]',
                keywords: 'mixin include extend for if else each while charset import debug media page content font-face namespace warn',
                contains: [
                    VARIABLE,
                    hljs.QUOTE_STRING_MODE,
                    hljs.APOS_STRING_MODE,
                    HEXCOLOR,
                    hljs.CSS_NUMBER_MODE,
                    {
                        begin: '\\s[A-Za-z0-9_.-]+',
                        relevance: 0
                    }
                ]
            }
        ]
    };
}
hljs.registerLanguage('xml', xml);
function xml(hljs) {
    var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
    var TAG_INTERNALS = {
        endsWithParent: true,
        illegal: /</,
        relevance: 0,
        contains: [
            {
                className: 'attr',
                begin: XML_IDENT_RE,
                relevance: 0
            },
            {
                begin: /=\s*/,
                relevance: 0,
                contains: [
                    {
                        className: 'string',
                        endsParent: true,
                        variants: [
                            { begin: /"/, end: /"/ },
                            { begin: /'/, end: /'/ },
                            { begin: /[^\s"'=<>`]+/ }
                        ]
                    }
                ]
            }
        ]
    };
    return {
        aliases: ['html', 'xhtml', 'rss', 'atom', 'xjb', 'xsd', 'xsl', 'plist'],
        case_insensitive: true,
        contains: [
            {
                className: 'meta',
                begin: '<!DOCTYPE', end: '>',
                relevance: 10,
                contains: [{ begin: '\\[', end: '\\]' }]
            },
            hljs.COMMENT('<!--', '-->', {
                relevance: 10
            }),
            {
                begin: '<\\!\\[CDATA\\[', end: '\\]\\]>',
                relevance: 10
            },
            {
                begin: /<\?(php)?/, end: /\?>/,
                subLanguage: 'php',
                contains: [{ begin: '/\\*', end: '\\*/', skip: true }]
            },
            {
                className: 'tag',
                /*
                The lookahead pattern (?=...) ensures that 'begin' only matches
                '<style' as a single word, followed by a whitespace or an
                ending braket. The '$' is needed for the lexeme to be recognized
                by hljs.subMode() that tests lexemes outside the stream.
                */
                begin: '<style(?=\\s|>|$)', end: '>',
                keywords: { name: 'style' },
                contains: [TAG_INTERNALS],
                starts: {
                    end: '</style>', returnEnd: true,
                    subLanguage: ['css', 'xml']
                }
            },
            {
                className: 'tag',
                // See the comment in the <style tag about the lookahead pattern
                begin: '<script(?=\\s|>|$)', end: '>',
                keywords: { name: 'script' },
                contains: [TAG_INTERNALS],
                starts: {
                    end: '\<\/script\>', returnEnd: true,
                    subLanguage: ['actionscript', 'javascript', 'handlebars', 'xml']
                }
            },
            {
                className: 'meta',
                variants: [
                    { begin: /<\?xml/, end: /\?>/, relevance: 10 },
                    { begin: /<\?\w+/, end: /\?>/ }
                ]
            },
            {
                className: 'tag',
                begin: '</?', end: '/?>',
                contains: [
                    {
                        className: 'name', begin: /[^\/><\s]+/, relevance: 0
                    },
                    TAG_INTERNALS
                ]
            }
        ]
    };
}

function normalizeAssetsDir(config, userOpts, moduleFile, cmpMeta) {
    if (userOpts.assetsDir) {
        normalizeAssetDir(config, moduleFile, cmpMeta, userOpts.assetsDir);
    }
    if (Array.isArray(userOpts.assetsDirs)) {
        userOpts.assetsDirs.forEach(function (assetsDir) {
            normalizeAssetDir(config, moduleFile, cmpMeta, assetsDir);
        });
    }
}
function normalizeAssetDir(config, moduleFile, cmpMeta, assetsDir) {
    if (typeof assetsDir !== 'string' || assetsDir.trim() === '')
        return;
    var assetsMeta = {};
    // get the absolute path of the directory which the component is sitting in
    var componentDir = normalizePath(config.sys.path.dirname(moduleFile.tsFilePath));
    // get the relative path from the component file to the assets directory
    assetsDir = normalizePath(assetsDir.trim());
    if (config.sys.path.isAbsolute(assetsDir)) {
        // this path is absolute already!
        // add as the absolute path
        assetsMeta.absolutePath = assetsDir;
        // if this is an absolute path already, let's convert it to be relative
        assetsMeta.cmpRelativePath = config.sys.path.relative(componentDir, assetsDir);
    }
    else {
        // this path is relative to the component
        assetsMeta.cmpRelativePath = assetsDir;
        // create the absolute path to the asset dir
        assetsMeta.absolutePath = normalizePath(config.sys.path.join(componentDir, assetsDir));
    }
    (cmpMeta.assetsDirsMeta = cmpMeta.assetsDirsMeta || []).push(assetsMeta);
}

function normalizeStyles(config, userOpts, moduleFile, cmpMeta) {
    normalizeStyleStr(userOpts, cmpMeta);
    normalizeStylePath(config, userOpts, moduleFile, cmpMeta);
    normalizeStylePaths(config, userOpts, moduleFile, cmpMeta);
}
function normalizeStyleStr(userOpts, cmpMeta) {
    if (typeof userOpts.styles === 'string' && userOpts.styles.trim().length) {
        cmpMeta.stylesMeta = cmpMeta.stylesMeta || {};
        cmpMeta.stylesMeta.$ = cmpMeta.stylesMeta.$ || {};
        cmpMeta.stylesMeta.$.styleStr = userOpts.styles.trim();
    }
}
function normalizeStylePath(config, userOpts, moduleFile, cmpMeta) {
    if (typeof userOpts.styleUrl === 'string' && userOpts.styleUrl.trim()) {
        // as a string
        // styleUrl: 'my-styles.scss'
        cmpMeta.stylesMeta = cmpMeta.stylesMeta || {};
        cmpMeta.stylesMeta.$ = cmpMeta.stylesMeta.$ || {};
        normalizeModeStylePaths(config, moduleFile, cmpMeta.stylesMeta.$, userOpts.styleUrl);
    }
}
function normalizeStylePaths(congif, userOpts, moduleFile, cmpMeta) {
    if (!userOpts.styleUrls) {
        return;
    }
    // normalize the possible styleUrl structures
    if (Array.isArray(userOpts.styleUrls)) {
        // as an array of strings
        // styleUrls: ['my-styles.scss', 'my-other-styles']
        userOpts.styleUrls.forEach(function (styleUrl) {
            if (styleUrl && typeof styleUrl === 'string' && styleUrl.trim()) {
                cmpMeta.stylesMeta = cmpMeta.stylesMeta || {};
                cmpMeta.stylesMeta.$ = cmpMeta.stylesMeta.$ || {};
                normalizeModeStylePaths(congif, moduleFile, cmpMeta.stylesMeta.$, userOpts.styleUrl);
            }
        });
        return;
    }
    // as an object
    // styleUrls: {
    //   ios: 'badge.ios.scss',
    //   md: 'badge.md.scss',
    //   wp: 'badge.wp.scss'
    // }
    var styleModes = userOpts.styleUrls;
    Object.keys(styleModes).forEach(function (styleModeName) {
        var modeName = styleModeName.trim().toLowerCase();
        if (typeof styleModes[styleModeName] === 'string' && styleModes[styleModeName].trim()) {
            cmpMeta.stylesMeta = cmpMeta.stylesMeta || {};
            cmpMeta.stylesMeta[modeName] = cmpMeta.stylesMeta[modeName] || {};
            normalizeModeStylePaths(congif, moduleFile, cmpMeta.stylesMeta[styleModeName], styleModes[styleModeName]);
        }
        else if (Array.isArray(styleModes[styleModeName])) {
            var styleUrls = userOpts.styleUrls;
            styleUrls.forEach(function (styleUrl) {
                if (styleUrl && typeof styleUrl === 'string' && styleUrl.trim().length) {
                    cmpMeta.stylesMeta = cmpMeta.stylesMeta || {};
                    cmpMeta.stylesMeta[modeName] = cmpMeta.stylesMeta[modeName] || {};
                    normalizeModeStylePaths(congif, moduleFile, cmpMeta.stylesMeta[styleModeName], styleUrl);
                }
            });
        }
    });
}
function normalizeModeStylePaths(config, moduleFile, modeStyleMeta, stylePath) {
    modeStyleMeta.cmpRelativePaths = modeStyleMeta.cmpRelativePaths || [];
    modeStyleMeta.absolutePaths = modeStyleMeta.absolutePaths || [];
    // get the absolute path of the directory which the component is sitting in
    var componentDir = normalizePath(config.sys.path.dirname(moduleFile.tsFilePath));
    // get the relative path from the component file to the style
    var componentRelativeStylePath = normalizePath(stylePath.trim());
    if (config.sys.path.isAbsolute(componentRelativeStylePath)) {
        // this path is absolute already!
        // add to our list of style absolute paths
        modeStyleMeta.absolutePaths.push(componentRelativeStylePath);
        // if this is an absolute path already, let's convert it to be relative
        componentRelativeStylePath = config.sys.path.relative(componentDir, componentRelativeStylePath);
        // add to our list of style relative paths
        modeStyleMeta.cmpRelativePaths.push(componentRelativeStylePath);
    }
    else {
        // this path is relative to the component
        // add to our list of style relative paths
        modeStyleMeta.cmpRelativePaths.push(componentRelativeStylePath);
        // create the absolute path to the style file
        var absoluteStylePath = normalizePath(config.sys.path.join(componentDir, componentRelativeStylePath));
        // add to our list of style absolute paths
        modeStyleMeta.absolutePaths.push(absoluteStylePath);
    }
}

function getComponentDecoratorData(config, moduleFile, diagnostics, classNode) {
    var metaData = null;
    if (!classNode.decorators) {
        return metaData;
    }
    var isComponent = false;
    classNode.decorators.forEach(function (decorator) {
        decorator.forEachChild(function (decoratorChild) {
            decoratorChild.forEachChild(function (componentChild) {
                if (componentChild.getText().trim() === 'Component') {
                    isComponent = true;
                }
                else if (isComponent) {
                    metaData = parseComponentMetaData(config, moduleFile, diagnostics, componentChild.getText());
                }
            });
        });
    });
    return metaData;
}
function parseComponentMetaData(config, moduleFile, diagnostics, text) {
    var cmpMeta = null;
    try {
        var fnStr = "return " + text + ";";
        // parse user component options
        var userOpts = new Function(fnStr)();
        if (!userOpts.tag || userOpts.tag.trim() === '') {
            throw new Error("tag missing in component decorator: " + text);
        }
        // convert user component options from user into component meta
        cmpMeta = {};
        // normalize user data
        normalizeTag(config, moduleFile, diagnostics, userOpts, cmpMeta, text);
        normalizeStyles(config, userOpts, moduleFile, cmpMeta);
        normalizeAssetsDir(config, userOpts, moduleFile, cmpMeta);
        normalizeHost(userOpts, cmpMeta);
        normalizeShadow(userOpts, cmpMeta);
    }
    catch (e) {
        // derp
        var d = catchError(diagnostics, e);
        d.absFilePath = moduleFile.tsFilePath;
        d.relFilePath = config.sys.path.relative(config.rootDir, moduleFile.tsFilePath);
        d.messageText = e + ": " + text;
    }
    return cmpMeta;
}
function normalizeTag(config, moduleFile, diagnostics, userOpts, cmpMeta, orgText) {
    if (userOpts.selector) {
        var d = buildError(diagnostics);
        d.messageText = "Please use \"tag\" instead of \"selector\" in component decorator: " + userOpts.selector;
        d.absFilePath = moduleFile.tsFilePath;
        d.relFilePath = config.sys.path.relative(config.rootDir, moduleFile.tsFilePath);
        cmpMeta.tagNameMeta = userOpts.selector;
    }
    if (!userOpts.tag || userOpts.tag.trim() === '') {
        throw new Error("tag missing in component decorator: " + orgText);
    }
    cmpMeta.tagNameMeta = validateComponentTag(userOpts.tag);
}
function normalizeShadow(userOpts, cmpMeta) {
    var rawShadowValue = userOpts.shadow;
    // default to NOT use shadow dom
    cmpMeta.isShadowMeta = false;
    // try to figure out a best guess depending on the value they put in
    if (rawShadowValue !== undefined) {
        if (typeof rawShadowValue === 'string') {
            if (rawShadowValue.toLowerCase().trim() === 'true') {
                cmpMeta.isShadowMeta = true;
            }
        }
        else {
            // ensure it's a boolean
            cmpMeta.isShadowMeta = !!rawShadowValue;
        }
    }
}
function normalizeHost(userOpts, cmpMeta) {
    cmpMeta.hostMeta = userOpts.host || {};
}

function getElementDecoratorMeta(classNode) {
    var membersMeta = {};
    var decoratedMembers = classNode.members.filter(function (n) { return n.decorators && n.decorators.length; });
    decoratedMembers.forEach(function (memberNode) {
        var isElement = false;
        var hostElementMember = null;
        memberNode.forEachChild(function (n) {
            if (n.kind === ts.SyntaxKind.Decorator && n.getChildCount() > 1) {
                var child = n.getChildAt(1);
                var firstToken = child.getFirstToken();
                // If the first token is @Element()
                if (firstToken && firstToken.getText() === 'Element') {
                    isElement = true;
                }
                else if (!firstToken && child.getText() === 'Element') {
                    // If the first token is @Element
                    isElement = true;
                }
            }
            else if (isElement) {
                if (n.kind === ts.SyntaxKind.Identifier && !hostElementMember) {
                    hostElementMember = n.getText();
                }
            }
        });
        if (isElement && hostElementMember) {
            membersMeta[hostElementMember] = {
                memberType: MEMBER_ELEMENT_REF
            };
            // Remove decorator
            memberNode.decorators = undefined;
        }
    });
    return membersMeta;
}

function getEventDecoratorMeta(tsFilePath, diagnostics, classNode) {
    var eventsMeta = [];
    var decoratedMembers = classNode.members.filter(function (n) { return n.decorators && n.decorators.length; });
    decoratedMembers.forEach(function (memberNode) {
        var isEvent = false;
        var methodName = null;
        var rawEventMeta = {};
        memberNode.forEachChild(function (n) {
            if (n.kind === ts.SyntaxKind.Decorator &&
                n.getChildCount() > 1 &&
                n.getChildAt(1).getFirstToken() &&
                n.getChildAt(1).getFirstToken().getText() === 'Event') {
                isEvent = true;
                n.getChildAt(1).forEachChild(function (n) {
                    if (n.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                        try {
                            var fnStr = "return " + n.getText() + ";";
                            Object.assign(rawEventMeta, new Function(fnStr)());
                        }
                        catch (e) {
                            var d = catchError(diagnostics, e);
                            d.messageText = "parse event options: " + e;
                            d.absFilePath = tsFilePath;
                        }
                    }
                });
            }
            else if (isEvent) {
                if (n.kind === ts.SyntaxKind.Identifier && !methodName) {
                    methodName = n.getText().trim();
                }
            }
        });
        if (isEvent && methodName) {
            var eventMeta = validateEvent(rawEventMeta, methodName);
            if (eventsMeta) {
                memberNode.decorators = undefined;
                eventsMeta.push(eventMeta);
            }
        }
    });
    return eventsMeta;
}
function validateEvent(rawEventOpts, methodName) {
    methodName = methodName.trim();
    if (!methodName) {
        return null;
    }
    var eventMeta = {
        eventMethodName: methodName,
        eventName: methodName
    };
    if (typeof rawEventOpts.eventName === 'string') {
        eventMeta.eventName = rawEventOpts.eventName;
    }
    eventMeta.eventBubbles = typeof rawEventOpts.bubbles === 'boolean' ? rawEventOpts.bubbles : true;
    eventMeta.eventCancelable = typeof rawEventOpts.cancelable === 'boolean' ? rawEventOpts.cancelable : true;
    eventMeta.eventComposed = typeof rawEventOpts.composed === 'boolean' ? rawEventOpts.composed : true;
    return eventMeta;
}

function getListenDecoratorMeta(tsFilePath, diagnostics, classNode) {
    var listenersMeta = [];
    var decoratedMembers = classNode.members.filter(function (n) { return n.decorators && n.decorators.length; });
    decoratedMembers.forEach(function (memberNode) {
        var isListen = false;
        var methodName = null;
        var eventName = null;
        var rawListenOpts = {};
        memberNode.forEachChild(function (n) {
            if (n.kind === ts.SyntaxKind.Decorator &&
                n.getChildCount() > 1 &&
                n.getChildAt(1).getFirstToken() &&
                n.getChildAt(1).getFirstToken().getText() === 'Listen') {
                isListen = true;
                n.getChildAt(1).forEachChild(function (n) {
                    if (n.kind === ts.SyntaxKind.StringLiteral && !eventName) {
                        eventName = n.getText().replace(/\s/g, '');
                        eventName = eventName.replace(/\'/g, '');
                        eventName = eventName.replace(/\"/g, '');
                        eventName = eventName.replace(/\`/g, '');
                    }
                    else if (n.kind === ts.SyntaxKind.ObjectLiteralExpression && eventName) {
                        try {
                            var fnStr = "return " + n.getText() + ";";
                            Object.assign(rawListenOpts, new Function(fnStr)());
                        }
                        catch (e) {
                            var d = catchError(diagnostics, e);
                            d.messageText = "parse listener options: " + e;
                            d.absFilePath = tsFilePath;
                        }
                    }
                });
            }
            else if (isListen) {
                if (n.kind === ts.SyntaxKind.Identifier && !methodName) {
                    methodName = n.getText().trim();
                }
            }
        });
        if (isListen && eventName && methodName) {
            eventName.split(',').forEach(function (evName) {
                var listenMeta = validateListener(tsFilePath, evName, rawListenOpts, methodName);
                if (listenMeta) {
                    listenersMeta.push(listenMeta);
                    memberNode.decorators = undefined;
                }
            });
        }
    });
    return listenersMeta.sort(function (a, b) {
        if (a.eventName.toLowerCase() < b.eventName.toLowerCase())
            return -1;
        if (a.eventName.toLowerCase() > b.eventName.toLowerCase())
            return 1;
        if (a.eventMethodName.toLowerCase() < b.eventMethodName.toLowerCase())
            return -1;
        if (a.eventMethodName.toLowerCase() > b.eventMethodName.toLowerCase())
            return 1;
        return 0;
    });
}
function validateListener(tsFilePath, eventName, rawListenOpts, methodName) {
    eventName = eventName && eventName.trim();
    if (!eventName)
        return null;
    var rawEventName = eventName;
    var splt = eventName.split(':');
    if (splt.length > 2) {
        throw "@Listen can only contain one colon: " + eventName + " in " + tsFilePath;
    }
    if (splt.length > 1) {
        var prefix = splt[0].toLowerCase().trim();
        if (!isValidElementRefPrefix(prefix)) {
            throw "invalid @Listen prefix \"" + prefix + "\" for \"" + eventName + "\" in " + tsFilePath;
        }
        rawEventName = splt[1].toLowerCase().trim();
    }
    splt = rawEventName.split('.');
    if (splt.length > 2) {
        throw "@Listen can only contain one period: " + eventName + " in " + tsFilePath;
    }
    if (splt.length > 1) {
        var suffix = splt[1].toLowerCase().trim();
        if (!isValidKeycodeSuffix(suffix)) {
            throw "invalid @Listen suffix \"" + suffix + "\" for \"" + eventName + "\" in " + tsFilePath;
        }
        rawEventName = splt[0].toLowerCase().trim();
    }
    var listenMeta = {
        eventName: eventName,
        eventMethodName: methodName
    };
    if (typeof rawListenOpts.capture === 'boolean') {
        listenMeta.eventCapture = rawListenOpts.capture;
    }
    else {
        // default to not use capture if it wasn't provided
        listenMeta.eventCapture = false;
    }
    if (typeof rawListenOpts.passive === 'boolean') {
        listenMeta.eventPassive = rawListenOpts.passive;
    }
    else {
        // they didn't set if it should be passive or not
        // so let's figure out some good defaults depending
        // on what type of event this is
        if (PASSIVE_TRUE_DEFAULTS.indexOf(rawEventName.toLowerCase()) > -1) {
            // good list of known events that we should default to passive
            listenMeta.eventPassive = true;
        }
        else {
            // play it safe and have all others default to NOT be passive
            listenMeta.eventPassive = false;
        }
    }
    // default to enabled=true if it wasn't provided
    listenMeta.eventDisabled = (rawListenOpts.enabled === false);
    return listenMeta;
}
function isValidElementRefPrefix(prefix) {
    return (VALID_ELEMENT_REF_PREFIXES.indexOf(prefix) > -1);
}
function isValidKeycodeSuffix(prefix) {
    return (VALID_KEYCODE_SUFFIX.indexOf(prefix) > -1);
}
var PASSIVE_TRUE_DEFAULTS = [
    'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
    'mouseenter', 'mouseover', 'mousemove', 'mousedown', 'mouseup', 'mouseleave', 'mouseout', 'mousewheel',
    'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave',
    'resize',
    'scroll',
    'touchstart', 'touchmove', 'touchend', 'touchenter', 'touchleave', 'touchcancel',
    'wheel',
];
var VALID_ELEMENT_REF_PREFIXES = [
    'child', 'parent', 'body', 'document', 'window'
];
var VALID_KEYCODE_SUFFIX = [
    'enter', 'escape', 'space', 'tab', 'up', 'right', 'down', 'left'
];

function getMethodDecoratorMeta(classNode) {
    var membersMeta = {};
    var decoratedMembers = classNode.members.filter(function (n) { return n.decorators && n.decorators.length; });
    var methodMembers = decoratedMembers.filter(function (n) { return n.kind === ts.SyntaxKind.MethodDeclaration; });
    methodMembers.forEach(function (methodNode) {
        var isMethod = false;
        var methodName = null;
        methodNode.forEachChild(function (n) {
            if (n.kind === ts.SyntaxKind.Decorator && n.getChildCount() > 1 && n.getChildAt(1).getFirstToken().getText() === 'Method') {
                isMethod = true;
            }
            else if (isMethod) {
                if (n.kind === ts.SyntaxKind.Identifier && !methodName) {
                    methodName = n.getText();
                }
            }
        });
        if (isMethod && methodName) {
            membersMeta[methodName] = {
                memberType: MEMBER_METHOD
            };
            // Remove decorator
            methodNode.decorators = undefined;
        }
    });
    return membersMeta;
}

function getPropDecoratorMeta(tsFilePath, diagnostics, classNode) {
    var membersMeta = {};
    var decoratedMembers = classNode.members.filter(function (n) { return n.decorators && n.decorators.length; });
    decoratedMembers.forEach(function (memberNode) {
        var isProp = false;
        var propName = null;
        var propType = null;
        var userPropOptions = null;
        var shouldObserveAttribute = false;
        memberNode.forEachChild(function (n) {
            if (n.kind === ts.SyntaxKind.Decorator && n.getChildCount() > 1) {
                var child = n.getChildAt(1);
                var firstToken = child.getFirstToken();
                // If the first token is @State()
                if (firstToken && firstToken.getText() === 'Prop') {
                    isProp = true;
                }
                else if (!firstToken && child.getText() === 'Prop') {
                    // If the first token is @State
                    isProp = true;
                }
                if (!isProp)
                    return;
                n.getChildAt(1).forEachChild(function (n) {
                    if (n.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                        try {
                            var fnStr = "return " + n.getText() + ";";
                            userPropOptions = Object.assign(userPropOptions || {}, new Function(fnStr)());
                        }
                        catch (e) {
                            var d = catchError(diagnostics, e);
                            d.messageText = "parse prop options: " + e;
                            d.absFilePath = tsFilePath;
                        }
                    }
                });
            }
            else if (isProp) {
                if (n.kind === ts.SyntaxKind.Identifier && !propName) {
                    propName = n.getText();
                }
                else if (!propType) {
                    if (n.kind === ts.SyntaxKind.BooleanKeyword) {
                        // @Prop() myBoolean: boolean;
                        propType = TYPE_BOOLEAN;
                        shouldObserveAttribute = true;
                    }
                    else if (n.kind === ts.SyntaxKind.NumberKeyword) {
                        // @Prop() myNumber: number;
                        propType = TYPE_NUMBER;
                        shouldObserveAttribute = true;
                    }
                    else if (n.kind === ts.SyntaxKind.StringKeyword) {
                        // @Prop() myString: string;
                        shouldObserveAttribute = true;
                    }
                    else if (n.kind === ts.SyntaxKind.AnyKeyword) {
                        // @Prop() myAny: any;
                        shouldObserveAttribute = true;
                    }
                }
            }
        });
        if (isProp && propName) {
            if (EXCLUDE_PROP_NAMES.indexOf(propName) > -1) {
                // these automatically get added at runtime, so don't bother here
                memberNode.decorators = undefined;
                return;
            }
            var propMeta = membersMeta[propName] = {
                memberType: MEMBER_PROP
            };
            if (propType) {
                propMeta.propType = propType;
            }
            if (userPropOptions) {
                if (typeof userPropOptions.connect === 'string') {
                    propMeta.memberType = MEMBER_PROP_CONNECT;
                    propMeta.ctrlId = userPropOptions.connect;
                }
                if (typeof userPropOptions.context === 'string') {
                    propMeta.memberType = MEMBER_PROP_CONTEXT;
                    propMeta.ctrlId = userPropOptions.context;
                }
                if (typeof userPropOptions.state === 'boolean') {
                    diagnostics.push({
                        level: 'warn',
                        type: 'build',
                        header: '@Prop({ state: true }) option has been deprecated',
                        messageText: "\"state\" has been renamed to @Prop({ mutable: true }) " + tsFilePath,
                        absFilePath: tsFilePath
                    });
                    userPropOptions.mutable = userPropOptions.state;
                }
                if (typeof userPropOptions.mutable === 'boolean') {
                    propMeta.memberType = MEMBER_PROP_MUTABLE;
                }
            }
            if (shouldObserveAttribute) {
                propMeta.attribName = propName;
            }
            // Remove decorator
            memberNode.decorators = undefined;
        }
    });
    return membersMeta;
}
var EXCLUDE_PROP_NAMES = ['mode', 'color'];

function getPropChangeDecoratorMeta(classNode) {
    return {
        propsWillChangeMeta: getPropChangeDecorator(classNode, 'PropWillChange'),
        propsDidChangeMeta: getPropChangeDecorator(classNode, 'PropDidChange')
    };
}
function getPropChangeDecorator(classNode, decoratorName) {
    var decoratedMembers = classNode.members.filter(function (n) { return n.decorators && n.decorators.length; });
    var propChangeMeta = [];
    decoratedMembers.forEach(function (memberNode) {
        var isPropChange = false;
        var propName = null;
        var methodName = null;
        memberNode.forEachChild(function (n) {
            if (n.kind === ts.SyntaxKind.Decorator &&
                n.getChildCount() > 1 &&
                n.getChildAt(1).getFirstToken() &&
                n.getChildAt(1).getFirstToken().getText() === decoratorName) {
                isPropChange = true;
                n.getChildAt(1).forEachChild(function (n) {
                    if (n.kind === ts.SyntaxKind.StringLiteral && !propName) {
                        propName = n.getText();
                        propName = propName.replace(/\'/g, '');
                        propName = propName.replace(/\"/g, '');
                        propName = propName.replace(/\`/g, '');
                    }
                });
            }
            else if (isPropChange) {
                if (n.kind === ts.SyntaxKind.Identifier && !methodName) {
                    methodName = n.getText();
                }
            }
        });
        if (isPropChange && propName && methodName) {
            var propChange = [];
            propChange[PROP_CHANGE_PROP_NAME] = propName;
            propChange[PROP_CHANGE_METHOD_NAME] = methodName;
            propChangeMeta.push(propChange);
            memberNode.decorators = undefined;
        }
    });
    return propChangeMeta.sort(function (a, b) {
        if (a[PROP_CHANGE_PROP_NAME].toLowerCase() < b[PROP_CHANGE_PROP_NAME].toLowerCase())
            return -1;
        if (a[PROP_CHANGE_PROP_NAME].toLowerCase() > b[PROP_CHANGE_PROP_NAME].toLowerCase())
            return 1;
        if (a[PROP_CHANGE_METHOD_NAME] < b[PROP_CHANGE_METHOD_NAME])
            return -1;
        if (a[PROP_CHANGE_METHOD_NAME] > b[PROP_CHANGE_METHOD_NAME])
            return 1;
        return 0;
    });
}

function getStateDecoratorMeta(classNode) {
    var membersMeta = {};
    var decoratedMembers = classNode.members.filter(function (n) { return n.decorators && n.decorators.length; });
    decoratedMembers.forEach(function (memberNode) {
        var isState = false;
        var propName = null;
        memberNode.forEachChild(function (n) {
            if (n.kind === ts.SyntaxKind.Decorator && n.getChildCount() > 1) {
                var child = n.getChildAt(1);
                var firstToken = child.getFirstToken();
                // If the first token is @State()
                if (firstToken && firstToken.getText() === 'State') {
                    isState = true;
                }
                else if (!firstToken && child.getText() === 'State') {
                    // If the first token is @State
                    isState = true;
                }
            }
            else if (isState) {
                if (n.kind === ts.SyntaxKind.Identifier && !propName) {
                    propName = n.getText();
                }
            }
        });
        if (isState && propName) {
            membersMeta[propName] = {
                memberType: MEMBER_STATE
            };
            memberNode.decorators = undefined;
        }
    });
    return membersMeta;
}

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function componentModuleFileClass(config, fileMeta, diagnostics) {
    return function (transformContext) {
        function visit(fileMeta, node) {
            switch (node.kind) {
                case ts.SyntaxKind.ClassDeclaration:
                    return visitClass(config, fileMeta, diagnostics, node);
                default:
                    return ts.visitEachChild(node, function (node) {
                        return visit(fileMeta, node);
                    }, transformContext);
            }
        }
        return function (tsSourceFile) {
            return visit(fileMeta, tsSourceFile);
        };
    };
}

function visitClass(config, moduleFile, diagnostics, classNode) {
    var cmpMeta = getComponentDecoratorData(config, moduleFile, diagnostics, classNode);
    if (!cmpMeta) {
        return classNode;
    }
    if (moduleFile.cmpMeta && moduleFile.cmpMeta.tagNameMeta !== cmpMeta.tagNameMeta) {
        var relPath = config.sys.path.relative(config.rootDir, moduleFile.tsFilePath);
        var d = buildError(diagnostics);
        d.messageText = "Cannot have multiple @Components in the same source file: " + relPath;
        d.absFilePath = moduleFile.tsFilePath;
        return classNode;
    }
    moduleFile.cmpMeta = __assign({}, cmpMeta, { componentClass: classNode.name.getText().trim(), membersMeta: __assign({}, getElementDecoratorMeta(classNode), getMethodDecoratorMeta(classNode), getStateDecoratorMeta(classNode), getPropDecoratorMeta(moduleFile.tsFilePath, diagnostics, classNode)), eventsMeta: getEventDecoratorMeta(moduleFile.tsFilePath, diagnostics, classNode), listenersMeta: getListenDecoratorMeta(moduleFile.tsFilePath, diagnostics, classNode) }, getPropChangeDecoratorMeta(classNode));
    // Return Class Declaration with Decorator removed and as default export
    return updateComponentClass(classNode);
}

function jsxToVNode(transformContext) {
    return function (tsSourceFile) {
        return visit(tsSourceFile, null);
        function visit(node, parentNamespace) {
            switch (node.kind) {
                case ts.SyntaxKind.CallExpression:
                    var callNode = node;
                    var parentNamespaceResponse = void 0;
                    if (callNode.expression.text === 'h') {
                        var tag = callNode.arguments[0];
                        if (tag && typeof tag.text === 'string') {
                            _a = convertJsxToVNode(callNode, parentNamespace), node = _a[0], parentNamespaceResponse = _a[1];
                            if (parentNamespaceResponse) {
                                parentNamespace = parentNamespaceResponse;
                            }
                        }
                    }
                default:
                    return ts.visitEachChild(node, function (node) {
                        return visit(node, parentNamespace);
                    }, transformContext);
            }
            var _a;
        }
    };
}
function convertJsxToVNode(callNode, parentNamespace) {
    var _a = callNode.arguments, tag = _a[0], props = _a[1], children = _a.slice(2);
    var tagName = tag.text.trim().toLowerCase();
    var newArgs = [];
    var vnodeData = {};
    var namespace = null;
    if (tagName === 'slot') {
        // this is a slot element
        newArgs.push(ts.createNumericLiteral(SLOT_TAG.toString()));
    }
    else {
        // normal html element
        newArgs.push(tag);
    }
    // check if there should be a namespace: <svg> or <math>
    namespace = parentNamespace || NAMESPACE_MAP[tagName];
    // If call has props and it is an object -> h('div', {})
    if (props && props.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        var jsxAttrs = objectLiteralToObjectMap(props);
        vnodeData = alterJsxAttrs(jsxAttrs, namespace);
        // create the vnode data arg, if there is any vnode data
        if (Object.keys(vnodeData).length) {
            newArgs.push(objectMapToObjectLiteral(vnodeData));
        }
        else {
            // If there are no props then set the value as a zero
            newArgs.push(ts.createLiteral(0));
        }
    }
    else if (props && props.kind === ts.SyntaxKind.CallExpression) {
        newArgs.push(props);
    }
    else {
        newArgs.push(ts.createLiteral(0));
    }
    // If there are children then add them to the end of the arg list.
    if (children && children.length > 0) {
        newArgs = newArgs.concat(updateVNodeChildren(children));
    }
    return [
        ts.updateCall(callNode, callNode.expression, null, newArgs),
        namespace
    ];
}
function alterJsxAttrs(jsxAttrs, namespace) {
    var classNameStr = '';
    var styleStr = '';
    var eventListeners = null;
    var attrs = null;
    var props = null;
    var vnodeData = {};
    if (namespace) {
        vnodeData.n = ts.createLiteral(namespace);
    }
    for (var jsxAttrName in jsxAttrs) {
        var exp = jsxAttrs[jsxAttrName];
        var jsxAttrNameSplit = jsxAttrName.split('-');
        if (isClassName(jsxAttrName)) {
            // class
            if (exp.kind === ts.SyntaxKind.StringLiteral) {
                classNameStr += ' ' + exp.getText().trim();
            }
            else {
                if (isInstanceOfObjectMap(exp)) {
                    vnodeData.c = objectMapToObjectLiteral(exp);
                }
                else {
                    vnodeData.c = exp;
                }
            }
        }
        else if (isStyle(jsxAttrName)) {
            // style
            if (exp.kind === ts.SyntaxKind.StringLiteral) {
                styleStr += ';' + exp.getText().trim();
            }
            else {
                if (isInstanceOfObjectMap(exp)) {
                    vnodeData.s = objectMapToObjectLiteral(exp);
                }
                else {
                    vnodeData.s = exp;
                }
            }
        }
        else if (isKey(jsxAttrName)) {
            // key
            vnodeData.k = exp;
        }
        else if (isHyphenedEventListener(jsxAttrNameSplit, exp)) {
            // on-click
            eventListeners = eventListeners || {};
            eventListeners[jsxAttrNameSplit.slice(1).join('-')] = exp;
        }
        else if (isStandardizedEventListener(jsxAttrName, exp)) {
            // onClick
            eventListeners = eventListeners || {};
            eventListeners[jsxAttrName.toLowerCase().substring(2)] = exp;
        }
        else if (isAttr(jsxAttrName, vnodeData, exp)) {
            // attrs
            attrs = attrs || {};
            var attrName = jsxAttrName;
            attrs[attrName] = exp;
        }
        else if (isPropsName(jsxAttrName)) {
            // passed an actual "props" attribute
            // probably containing an object of props data
            if (isInstanceOfObjectMap(exp)) {
                vnodeData.p = objectMapToObjectLiteral(exp);
            }
            else {
                vnodeData.p = exp;
            }
        }
        else {
            // props
            props = props || {};
            props[jsxAttrName] = exp;
        }
    }
    classNameStr = classNameStr.replace(/['"]+/g, '').trim();
    if (classNameStr.length) {
        vnodeData.c = classStringToClassObj(classNameStr);
    }
    styleStr = styleStr.replace(/['"]+/g, '').trim();
    if (styleStr.length) {
        vnodeData.s = styleStringToStyleObj(styleStr);
    }
    if (eventListeners) {
        vnodeData.o = objectMapToObjectLiteral(eventListeners);
    }
    if (attrs) {
        vnodeData.a = objectMapToObjectLiteral(attrs);
    }
    if (props) {
        vnodeData.p = objectMapToObjectLiteral(props);
    }
    return vnodeData;
}
function updateVNodeChildren(items) {
    return items.map(function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.NullKeyword:
                return ts.createCall(ts.createIdentifier('t'), null, [ts.createLiteral('')]);
            case ts.SyntaxKind.NumericLiteral:
                return ts.createCall(ts.createIdentifier('t'), null, [ts.createLiteral(node.text)]);
            case ts.SyntaxKind.StringLiteral:
                return ts.createCall(ts.createIdentifier('t'), null, [node]);
        }
        return node;
    });
}
function isClassName(attrName) {
    attrName = attrName.toLowerCase();
    return (attrName === 'class' || attrName === 'classname');
}
function isStyle(attrName) {
    return (attrName.toLowerCase() === 'style');
}
function isKey(attrName) {
    return (attrName.toLowerCase() === 'key');
}
function isHyphenedEventListener(attrNameSplit, exp) {
    if (exp.kind !== ts.SyntaxKind.FunctionExpression && exp.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }
    return (attrNameSplit.length > 1 && attrNameSplit[0].toLowerCase() === 'on');
}
function isStandardizedEventListener(attrName, exp) {
    if (exp.kind !== ts.SyntaxKind.FunctionExpression && exp.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }
    attrName = attrName.toLowerCase();
    if (attrName.substr(0, 2) !== 'on') {
        return false;
    }
    return (KNOWN_EVENT_LISTENERS.indexOf(attrName) > -1);
}
function isAttr(attrName, vnodeData, exp) {
    if (vnodeData.n) {
        // always use attributes when the element is namespaced
        return true;
    }
    if (exp.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        return false;
    }
    if (exp.kind === ts.SyntaxKind.CallExpression) {
        return false;
    }
    if (exp.kind === ts.SyntaxKind.ArrayLiteralExpression) {
        return false;
    }
    if (exp.kind === ts.SyntaxKind.FunctionExpression) {
        return false;
    }
    if (attrName.indexOf('-') > -1) {
        return true;
    }
    if (KNOWN_ATTR_NAMES.indexOf(attrName) > -1) {
        return true;
    }
    if (/[A-Z]/.test(attrName)) {
        return false;
    }
    if (exp.kind === ts.SyntaxKind.StringLiteral) {
        return true;
    }
    return false;
}
function isPropsName(attrName) {
    attrName = attrName.toLowerCase();
    return (attrName === 'props');
}
function classStringToClassObj(className) {
    var obj = className
        .split(' ')
        .reduce(function (obj, className) {
        var o = Object.assign({}, obj);
        o[className] = ts.createTrue();
        return o;
    }, {});
    return objectMapToObjectLiteral(obj);
}
function styleStringToStyleObj(styles) {
    return objectMapToObjectLiteral({});
}
var KNOWN_EVENT_LISTENERS = [
    'onabort', 'onanimationend', 'onanimationiteration', 'onanimationstart', 'onauxclick', 'onbeforecopy', 'onbeforecut', 'onbeforepaste', 'onbeforeunload', 'onblur',
    'oncancel', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'onclose', 'oncontextmenu', 'oncopy', 'oncuechange', 'oncut', 'ondblclick', 'ondevicemotion',
    'ondeviceorientation', 'ondeviceorientationabsolute', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange',
    'onemptied', 'onended', 'onerror', 'onfocus', 'ongotpointercapture', 'onhashchange', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onlanguagechange',
    'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onlostpointercapture', 'onmessage', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove',
    'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onoffline', 'ononline', 'onpagehide', 'onpageshow', 'onpaste', 'onpause', 'onplay', 'onplaying',
    'onpointercancel', 'onpointerdown', 'onpointerenter', 'onpointerleave', 'onpointermove', 'onpointerout', 'onpointerover', 'onpointerup', 'onpopstate', 'onprogress',
    'onratechange', 'onrejectionhandled', 'onreset', 'onresize', 'onscroll', 'onsearch', 'onseeked', 'onseeking', 'onselect', 'onselectstart', 'onshow', 'onstalled',
    'onstorage', 'onsubmit', 'onsuspend', 'ontimeupdate', 'ontoggle', 'ontransitionend', 'onunhandledrejection', 'onunload', 'onvolumechange', 'onwaiting',
    'onwebkitanimationend', 'onwebkitanimationiteration', 'onwebkitanimationstart', 'onwebkitfullscreenchange', 'onwebkitfullscreenerror', 'onwebkittransitionend', 'onwheel'
];
var KNOWN_ATTR_NAMES = ['slot', 'hidden', 'disabled', 'autoFocus', 'autoComplete', 'contenteditable'];
var NAMESPACE_MAP = {
    'svg': 'http://www.w3.org/2000/svg',
    'math': 'http://www.w3.org/1998/Math/MathML'
};

function updateModuleFileMetaFromSlot(moduleFile) {
    return function (transformContext) {
        return function (tsSourceFile) {
            return visit(tsSourceFile.fileName, tsSourceFile);
        };
        function visit(fileName, node) {
            switch (node.kind) {
                case ts.SyntaxKind.CallExpression:
                    updateFileMeta(node, moduleFile);
                default:
                    return ts.visitEachChild(node, function (node) {
                        return visit(fileName, node);
                    }, transformContext);
            }
        }
    };
}
function updateFileMeta(callNode, fileMeta) {
    if (fileMeta && callNode.expression.text === 'h') {
        var _a = callNode.arguments, tag = _a[0], props = _a[1];
        if (tag && typeof tag.text === 'string') {
            var tagName = tag.text.trim().toLowerCase();
            if (tagName === 'slot') {
                return updateFileMetaWithSlots(fileMeta, props);
            }
        }
    }
    return null;
}
function updateFileMetaWithSlots(fileMeta, props) {
    // checking if there is a default slot and/or named slots in the compiler
    // so that during runtime there is less work to do
    if (!fileMeta || !fileMeta.cmpMeta) {
        return fileMeta;
    }
    if (fileMeta.cmpMeta.slotMeta === undefined) {
        fileMeta.cmpMeta.slotMeta = HAS_SLOTS;
    }
    if (props && props.kind === ts.SyntaxKind.ObjectLiteralExpression) {
        var jsxAttrs = objectLiteralToObjectMap(props);
        for (var attrName in jsxAttrs) {
            if (attrName.toLowerCase().trim() === 'name') {
                var attrValue = jsxAttrs[attrName].text.trim();
                if (attrValue.length > 0) {
                    fileMeta.cmpMeta.slotMeta = HAS_NAMED_SLOTS;
                    break;
                }
            }
        }
    }
    return fileMeta;
}

/**
 * Ok, so formatting overkill, we know. But whatever, it makes for great
 * error reporting within a terminal. So, yeah, let's code it up, shall we?
 */
function loadTypeScriptDiagnostics(rootDir, resultsDiagnostics, tsDiagnostics) {
    var maxErrors = Math.min(tsDiagnostics.length, MAX_ERRORS);
    for (var i = 0; i < maxErrors; i++) {
        resultsDiagnostics.push(loadDiagnostic(rootDir, tsDiagnostics[i]));
    }
}
function loadDiagnostic(rootDir, tsDiagnostic) {
    var d = {
        level: 'error',
        type: 'typescript',
        language: 'typescript',
        header: 'typescript error',
        code: tsDiagnostic.code.toString(),
        messageText: ts.flattenDiagnosticMessageText(tsDiagnostic.messageText, '\n'),
        relFilePath: null,
        absFilePath: null,
        lines: []
    };
    if (tsDiagnostic.file) {
        d.absFilePath = tsDiagnostic.file.fileName;
        d.relFilePath = formatFileName(rootDir, d.absFilePath);
        var sourceText = tsDiagnostic.file.getText();
        var srcLines = splitLineBreaks(sourceText);
        var htmlLines = srcLines;
        try {
            htmlLines = splitLineBreaks(highlight(d.language, sourceText, true).value);
        }
        catch (e) { }
        var posData = tsDiagnostic.file.getLineAndCharacterOfPosition(tsDiagnostic.start);
        var errorLine = {
            lineIndex: posData.line,
            lineNumber: posData.line + 1,
            text: srcLines[posData.line],
            html: htmlLines[posData.line],
            errorCharStart: posData.character,
            errorLength: Math.max(tsDiagnostic.length, 1)
        };
        if (errorLine.html && errorLine.html.indexOf('class="hljs') === -1) {
            try {
                errorLine.html = highlight(d.language, errorLine.text, true).value;
            }
            catch (e) { }
        }
        d.lines.push(errorLine);
        if (errorLine.errorLength === 0 && errorLine.errorCharStart > 0) {
            errorLine.errorLength = 1;
            errorLine.errorCharStart--;
        }
        d.header = formatHeader('typescript', tsDiagnostic.file.fileName, rootDir, errorLine.lineNumber);
        if (errorLine.lineIndex > 0) {
            var previousLine = {
                lineIndex: errorLine.lineIndex - 1,
                lineNumber: errorLine.lineNumber - 1,
                text: srcLines[errorLine.lineIndex - 1],
                html: htmlLines[errorLine.lineIndex - 1],
                errorCharStart: -1,
                errorLength: -1
            };
            if (previousLine.html && previousLine.html.indexOf('class="hljs') === -1) {
                try {
                    previousLine.html = highlight(d.language, previousLine.text, true).value;
                }
                catch (e) { }
            }
            d.lines.unshift(previousLine);
        }
        if (errorLine.lineIndex + 1 < srcLines.length) {
            var nextLine = {
                lineIndex: errorLine.lineIndex + 1,
                lineNumber: errorLine.lineNumber + 1,
                text: srcLines[errorLine.lineIndex + 1],
                html: htmlLines[errorLine.lineIndex + 1],
                errorCharStart: -1,
                errorLength: -1
            };
            if (nextLine.html && nextLine.html.indexOf('class="hljs') === -1) {
                try {
                    nextLine.html = highlight(d.language, nextLine.text, true).value;
                }
                catch (e) { }
            }
            d.lines.push(nextLine);
        }
    }
    return d;
}

// same as the "declare" variables in the root index.ts file
var REMOVE_GLOBALS = [
    'Component',
    'Element',
    'Event',
    'h',
    'Listen',
    'Method',
    'Prop',
    'PropDidChange',
    'PropWillChange',
    'State'
];
function removeImports() {
    return function (transformContext) {
        function visitImport(importNode) {
            if (!importNode.importClause || typeof importNode.importClause.namedBindings === 'undefined') {
                return ts.visitEachChild(importNode, visit, transformContext);
            }
            var importSpecifiers = [];
            importNode.importClause.namedBindings.forEachChild(function (nb) {
                if (nb.kind === ts.SyntaxKind.ImportSpecifier) {
                    var importSpecifier = nb;
                    if (REMOVE_GLOBALS.indexOf(importSpecifier.name.text) === -1) {
                        importSpecifiers.push(importSpecifier);
                    }
                }
            });
            var namedImports = ts.createNamedImports(importSpecifiers);
            var newImportClause = ts.updateImportClause(importNode.importClause, importNode.importClause.name, namedImports);
            return ts.updateImportDeclaration(importNode, importNode.decorators, importNode.modifiers, newImportClause, importNode.moduleSpecifier);
        }
        function visit(node) {
            switch (node.kind) {
                case ts.SyntaxKind.ImportDeclaration:
                    return visitImport(node);
                default:
                    return ts.visitEachChild(node, visit, transformContext);
            }
        }
        return function (tsSourceFile) {
            return visit(tsSourceFile);
        };
    };
}

var LIFECYCLE_MAP = {
    'ionViewWillLoad': 'componentWillLoad',
    'ionViewDidLoad': 'componentDidLoad',
    'ionViewDidUnload': 'componentDidUnload',
    'ionViewWillUpdate': 'componentWillUpdate',
    'ionViewDidUpdate': 'componentDidUpdate',
};
function renameLifecycleMethods() {
    return function (transformContext) {
        function visitMethod(methodNode) {
            var methodName = null;
            methodNode.forEachChild(function (n) {
                if (n.kind === ts.SyntaxKind.Identifier && !methodName) {
                    methodName = n.getText();
                    return;
                }
            });
            var newName = LIFECYCLE_MAP[methodName];
            if (newName) {
                return ts.updateMethod(methodNode, methodNode.decorators, methodNode.modifiers, methodNode.asteriskToken, ts.createLiteral(newName), methodNode.questionToken, methodNode.typeParameters, methodNode.parameters, methodNode.type, methodNode.body);
            }
            return methodNode;
        }
        function visit(node) {
            switch (node.kind) {
                case ts.SyntaxKind.MethodDeclaration:
                    return visitMethod(node);
                default:
                    return ts.visitEachChild(node, function (node) {
                        return visit(node);
                    }, transformContext);
            }
        }
        return function (tsSourceFile) {
            return visit(tsSourceFile);
        };
    };
}

function transpileModule$1(config, input, compilerOptions, path) {
    var fileMeta = {
        tsFilePath: path || 'transpileModule.tsx'
    };
    var diagnostics = [];
    var results = {
        code: null,
        diagnostics: null,
        cmpMeta: null
    };
    var transpileOpts = {
        compilerOptions: compilerOptions,
        transformers: {
            before: [
                componentModuleFileClass(config, fileMeta, diagnostics),
                removeImports(),
                renameLifecycleMethods(),
                addMetadataExport(fileMeta)
            ],
            after: [
                updateModuleFileMetaFromSlot(fileMeta),
                jsxToVNode
            ]
        }
    };
    var tsResults = ts.transpileModule(input, transpileOpts);
    loadTypeScriptDiagnostics('', diagnostics, tsResults.diagnostics);
    if (diagnostics.length) {
        results.diagnostics = diagnostics;
    }
    results.code = tsResults.outputText;
    results.cmpMeta = fileMeta.cmpMeta;
    return results;
}

var TEST_CONFIG = {
    sys: {
        path: require('path'),
        fs: require('fs'),
        typescript: require('typescript'),
        url: require('url'),
        vm: require('vm')
    },
    rootDir: '/'
};
function transpile(src, opts, path) {
    var results = { diagnostics: null, code: null };
    var transpileResults = transpileModule$1(TEST_CONFIG, src, opts, path);
    results.code = transpileResults.code;
    results.diagnostics = transpileResults.diagnostics;
    return results;
}

exports.h = h;
exports.t = t;
exports.render = render;
exports.flush = flush;
exports.transpile = transpile;
