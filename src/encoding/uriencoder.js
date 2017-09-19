import UnimplementedException from "../exception/UnimplementedException";

/**
 * Provide method to encode uri components.
 * @abstract
 */
export default class UriEncoder {

    /**
     * Encode the input string.
     * @param {String} String to encode.
     * @return {String} Encoded version of the input string.
     * @abstract
     */
    encode(input) {
        throw new UnimplementedException();
    }
}
