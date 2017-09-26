import {PCHAR} from '../uri/urivalidator';
import UriException from "../exception/UriException";

/**
 * Utility class that validate path segment according to RFC3986.
 */
export default class PathSegmentValidator {

    constructor() {
        this._pathSegmentPattern = new RegExp('^(' + PCHAR + ')+$');
    }

    /**
     * Validate if the value passed as parameter is a valid path segment according to RFC3986 or
     * throw an UriException.
     * <p/>
     * Format defined in RFC is : <p/>
     * segment       = *pchar <p/>
     * pchar         = unreserved / pct-encoded / sub-delims / ":" / "@" <p/>
     *
     * @param {String} pathSegment encoded path segment to validate.
     * @throws {UriException} if path segment is not valid according to RFC3986.
     */
    validate(pathSegment) {
        if (pathSegment === null || pathSegment === undefined) {
            throw new UriException('pathSegment must not be null nor undefined');
        }
        if (!this._pathSegmentPattern.test(pathSegment)) {
            throw new UriException(`Malformed path segment: ${pathSegment}`);
        }
    }
}
