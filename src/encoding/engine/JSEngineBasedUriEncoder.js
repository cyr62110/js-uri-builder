import UriEncoder from "../uriencoder";

/**
 * UriEncoder using javascript library method to encode uri components.
 */
export default class JSEngineBasedUriEncoder extends UriEncoder {
    encode(input) {
        return encodeURIComponent(input);
    }
}
