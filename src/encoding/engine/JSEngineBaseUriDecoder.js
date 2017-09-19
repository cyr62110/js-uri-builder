import UriDecoder from "../uridecoder";

/**
 * UriDecoder using javascript library method to decode uri components.
 */
export default class JSEngineBaseUriDecoder extends UriDecoder {
    decode(input) {
        return decodeURIComponent(input);
    }
}
