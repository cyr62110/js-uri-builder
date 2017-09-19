import UnimplementedException from "../exception/UnimplementedException";

/**
 * Provide method to decode encoded uri components.
 * @abstract
 */
export default class UriDecoder {
    /**
     * Decode the encoded input string.
     * @param {String} input Encoded string to decode.
     * @return {String} decoded version of the input string.
     */
    decode(input) {
        throw new UnimplementedException();
    }
}
