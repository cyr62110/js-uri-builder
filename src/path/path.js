import UriEncoding from "../encoding/uriencoding";
import PathFormattingOptions from "./pathformattingoptions";
import UriException from "../exception/UriException";
import PathBuilder from "./pathbuilder";
import PathSegmentValidator from "./pathsegmentvalidator";

let ROOT_PATH = null;
let EMPTY_PATH = null;

/**
 * Representation of the path part of an URI.
 * Paths are immutable, use {buildUpon} to modify them.
 */
export default class Path {

    /**
     * Construct a new empty path.
     *
     * @param {UriEncoding} uriEncoding Encoding used to encode segments.
     * @param {Boolean} absolute true if the path is absolute.
     * @param {Array} pathSegments Array containing all the segments forming the path. Can be let undefined.
     * @private
     */
    constructor(uriEncoding, absolute, pathSegments) {
        this._uriEncoding = uriEncoding;
        this._absolute = absolute;
        if (pathSegments === null || pathSegments === undefined) {
            this._pathSegments = [];
        } else {
            this._pathSegments = pathSegments;
        }
    }

    /**
     * Returns an absolute empty path.
     *
     * @return {Path} an absolute empty path.
     */
    static rootPath() {
        if (ROOT_PATH === null) {
            ROOT_PATH = new Path(UriEncoding.getDefault(), true, []);
        }
        return ROOT_PATH;
    }

    /**
     * Returns a relative empty path.
     *
     * @return {Path} a relative empty path.
     */
    static emptyPath() {
        if (EMPTY_PATH === null) {
            EMPTY_PATH = new Path(UriEncoding.getDefault(), true, []);
        }
        return EMPTY_PATH;
    }

    /**
     * Parse the value passed in parameter and transform it into a Path.
     *
     * @param {String} sPath String containing the path to parse.
     * @param {PathFormattingOptions} pathFormattingOptions Options that should be used to parse from provided String.
     * If let undefined, assume default formatting options..
     * @return {Path} the parsed Path.
     * @throws UriException if the value is not a valid path according to the format defined in RFC3986.
     */
    static parse(sPath, options) {
        if (sPath === null || sPath === undefined) {
            throw new UriException('path cannot be null or undefined.');
        }
        if (options === null || options === undefined) {
            options = PathFormattingOptions.defaultOptions();
        }

        let pathBuilder = Path.newBuilder();
        pathBuilder.relative();

        let currentParsedCharacterIndex = 0;
        if (sPath.length() != 0) {
            //We parse the first character to determine if sPath is absolute
            if (sPath.charAt(currentParsedCharacterIndex) === options.pathSegmentSeparator) {
                pathBuilder.absolute();
                currentParsedCharacterIndex ++;
            }
            //Then we parse all segments.
            while (currentParsedCharacterIndex < sPath.length()) {
                let indexOfPathSeparatorCharacter = sPath.indexOf(options.pathSegmentSeparator, currentParsedCharacterIndex);
                if (indexOfPathSeparatorCharacter > 0) { //If it is not a trailing path separator character
                    let pathSegment = sPath.substring(currentParsedCharacterIndex, indexOfPathSeparatorCharacter);
                    pathBuilder.appendEncodedPathSegment(pathSegment);
                    currentParsedCharacterIndex = indexOfPathSeparatorCharacter + 1;
                } else {
                    let pathSegment = sPath.substring(currentParsedCharacterIndex, sPath.length());
                    pathBuilder.appendEncodedPathSegment(pathSegment);
                    currentParsedCharacterIndex = sPath.length();
                }
            }
        }
        return pathBuilder.build();
    }

    /**
     * Instantiate a new path builder with an absolute empty path.
     *
     * @return {PathBuilder} an empty path builder.
     */
    static newBuilder() {
        return new PathBuilder(
            null,
            UriEncoding.getDefault(),
            new PathSegmentValidator());
    }

    /**
     * Instantiate a new path builder with the current path so it can be modified.
     *
     * @return {PathBuilder} a path builder starting with the current path.
     */
    buildUpon() {
        return new PathBuilder(
            this,
            this._uriEncoding,
            new PathSegmentValidator());
    }

    /**
     * Returns the number of path segments.
     *
     * @return {Number} number of path segments.
     */
    get pathSegmentCount() {
        return this._pathSegments.length;
    }

    /**
     * Return the encoded path segment at index.
     * This function do not decode pct-encoded characters in returned value.
     *
     * @param {Number} index index of the segment to retrieve.
     * @return {String} encoded path segment at index.
     * @throws {UriException} if index is negative or greater or equals than the count of path segments.
     */
    getEncodedPathSegment(index) {
        if (index < 0 || index >= this._pathSegments.length) {
            throw new UriException('index out of bounds.');
        }
        return this._pathSegments[index];
    }

    /**
     * Return the path segment at index.
     *
     * @param {Number} index index of the segment to retrieve
     * @throws {UriException} if index is negative or greater or equals than the count of path segments.
     */
    getPathSegment(index) {
        return this._uriEncoding.decode(this.getEncodedPathSegment(index));
    }

    /**
     * According to RFC3986, an absolute path starts with a slash '/' character.
     *
     * @return {Boolean} true if this path is no-scheme, false otherwise.
     */
    get absolute() {
        return this._absolute;
    }

    /**
     * According to RFC3986, a no-scheme path starts with a segment that does not
     * contain a colon ':' character.
     *
     * @return {Boolean} true if this path is no-scheme, false otherwise.
     */
    get noScheme() {
        return false; // FIXME
    }

    /**
     * According to RFC3986, a rootless path do no start with a slash '/' character.
     *
     * @return {Boolean} true if this path is rootless, false otherwise.
     */
    get rootLess() {
        return !this.absolute;
    }

    /**
     * According to RFC3986, an empty path do not have any segment.
     *
     * @return {Boolean} true if this path is empty, false otherwise.
     */
    get empty() {
        return this.pathSegmentCount === 0;
    }

    /**
     * Format the path into a String.
     *
     * @param {PathFormattingOptions} options Options to control the formatting of the path.
     * If let undefined, default options will be assumed.
     * @return {String} formatted path.
     */
    toString(options) {
        if (options === null || options === undefined) {
            options = PathFormattingOptions.defaultOptions();
        }
        let path = '';
        if (this._absolute && !options.withoutRoot) {
            path += this._pathSegmentSeparator;
        }
        for (let i = 0; i < this._pathSegments.length; i++) {
            if (i !== 0) {
                path += this._pathSegmentSeparator;
            }

            let pathSegment = null;
            if (!options.nonEncoded) {
                pathSegment = this.getPathSegment(i);
            } else {
                pathSegment = this.getEncodedPathSegment(i);
            }
            path += pathSegment;
        }
        return path;
    }
}
