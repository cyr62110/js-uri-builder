import JSEngineBasedUriEncoder from "./engine/JSEngineBasedUriEncoder";
import JSEngineBasedUriDecoder from "./engine/JSEngineBasedUriDecoder";

/**
 * Class providing methods to encode and decode string according to RFC 3986.
 */
export default class UriEncoding {

    constructor(encoder, decoder) {
        if (encoder === null || encoder === undefined ||
            decoder === null || decoder === undefined) {
            throw new UriException("Both encoder and decoder are mandatory.");
        }
        this._encoder = encoder;
        this._decoder = decoder;
    }

    /**
     * Returns the default implementation of UriEncoding.
     *
     * @return {UriEncoding} Default UriEncoding.
     */
    static getDefault() {
        return new UriEncoding(new JSEngineBasedUriEncoder(), new JSEngineBasedUriDecoder());
    }

    /**
     * Encode the input.
     * @param {String} input String to encode.
     * @return {String} Encoded version of the input string.
     */
    encode(input) {
        return this._encoder.encode(input);
    }

    /**
     * Decode the input.
     * @param {String} input String to decode.
     * @return {String} Decoded version of the input string.
     */
    decode(input) {
        return this._decoder.decode(input);
    }
}
