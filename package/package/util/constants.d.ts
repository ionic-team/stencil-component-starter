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
export declare const MEMBER_PROP = 1;
export declare const MEMBER_PROP_MUTABLE = 2;
export declare const MEMBER_PROP_CONTEXT = 3;
export declare const MEMBER_PROP_CONNECT = 4;
export declare const MEMBER_STATE = 5;
export declare const MEMBER_METHOD = 6;
export declare const MEMBER_ELEMENT_REF = 7;
/**
 * Prop Change Meta Indexes
 */
export declare const PROP_CHANGE_PROP_NAME = 0;
export declare const PROP_CHANGE_METHOD_NAME = 1;
/**
 * Property Types
 */
export declare const TYPE_ANY = 0;
export declare const TYPE_BOOLEAN = 1;
export declare const TYPE_NUMBER = 2;
/**
 * JS Property to Attribute Name Options
 */
export declare const ATTR_LOWER_CASE = 1;
/**
 * Priority Levels
 */
export declare const PRIORITY_HIGH = 3;
export declare const PRIORITY_MEDIUM = 2;
export declare const PRIORITY_LOW = 1;
/**
 * Slot Meta
 */
export declare const SLOT_TAG = 0;
export declare const HAS_SLOTS = 1;
export declare const HAS_NAMED_SLOTS = 2;
/**
 * SSR Attribute Names
 */
export declare const SSR_VNODE_ID = "data-ssrv";
export declare const SSR_CHILD_ID = "data-ssrc";
/**
 * Node Types
 */
export declare const ELEMENT_NODE = 1;
export declare const TEXT_NODE = 3;
export declare const COMMENT_NODE = 8;
/**
 * Key Name to Key Code Map
 */
export declare const KEY_CODE_MAP: {
    [key: string]: number;
};
/**
 * CSS class that gets added to the host element
 * after the component has fully hydrated
 */
export declare const HYDRATED_CSS = "💎";
/**
 * Namespaces
 */
export declare const SVG_NS = "http://www.w3.org/2000/svg";
export declare const XLINK_NS = "http://www.w3.org/1999/xlink";
export declare const XML_NS = "http://www.w3.org/XML/1998/namespace";
/**
 * File names and value
 */
export declare const BANNER = "Built with http://stenciljs.com";
export declare const COLLECTION_MANIFEST_FILE_NAME = "collection-manifest.json";
export declare const CORE_NAME = "core";
export declare const GLOBAL_NAME = "global";
export declare const LOADER_NAME = "loader";
export declare const APP_NAMESPACE_REGEX: RegExp;
/**
 * Errors
 */
export declare const LOAD_BUNDLE_ERROR = 1;
export declare const QUEUE_EVENTS_ERROR = 2;
export declare const WILL_LOAD_ERROR = 3;
export declare const DID_LOAD_ERROR = 4;
export declare const WILL_UPDATE_ERROR = 5;
export declare const DID_UPDATE_ERROR = 6;
export declare const INIT_INSTANCE_ERROR = 7;
export declare const RENDER_ERROR = 8;
