import PathSegmentValidator from "./pathsegmentvalidator";
import Path from "./path";

export default class PathBuilder {

    /**
     * Construct a new path builder.
     *
     * @param {Path} path Path to use as base. Can be null.
     * @param {UriEncoding} uriEncoding Encoding that will be used to encode path segments.
     * @param {PathSegmentValidator} pathSegmentValidator Validator that will be used to check if segment are properly encoded.
     * @private
     */
    constructor(path, uriEncoding, pathSegmentValidator) {
        this._absolute = true;
        this._pathSegments = [];
        this._uriEncoding = uriEncoding;
        this._pathSegmentValidator = pathSegmentValidator;

        if (path !== null) {
            this._absolute = path.absolute;
            for (let i = 0; i < path.pathSegmentCount; i++) {
                this._pathSegments.push(path.getEncodedPathSegment(i));
            }
        }
    }

    /**
     * Create a new instance of Path from the path segments passed to the builder.
     * A builder can build multiple times, each time a new instance will be created.
     *
     * @return {Path} a new Path.
     */
    build() {
        return new Path(this._uriEncoding, this._absolute, this._pathSegments);
    }

    /**
     * Append a relative path at the end of the path constructed using the builder.
     *
     * @param {Path} path Must be relative
     * @return {PathBuilder} the current builder.
     * @throws UriException if path is not relative
     */
    appendPath(path) {

    }

    /**
     * Append a new segment at the end of the path constructed using the builder.
     * The segment will be encoded before being appended to the path.
     *
     * @param {String} pathSegment Segment to append.
     * @return {PathBuilder} the current builder.
     * @throws UriException if pathSegment is null or empty.
     */
    appendPathSegment(pathSegment) {
        return this.appendEncodedPathSegment(this._uriEncoding.encode(pathSegment));
    }

    /**
     * Append a new segment at the end of the path constructed using the builder.
     * The segment must already be encoded if it contains non-valid character according to RFC3986.
     *
     * @param {String} pathSegment Encoded segment to append. Must respect the format defined in RFC3986.
     * @return {PathBuilder} the current builder.
     */
    appendEncodedPathSegment(pathSegment) {
        this._pathSegmentValidator.validate(pathSegment);
        this._pathSegments.push(pathSegment);
        return this;
    }

    /**
     * Remove the i-th segment.
     *
     * @param {Number} index of the segment to remove. 0 is the first.
     * @return {PathBuilder} the current builder.
     * @throws UriException if the index is greater or equals to the number of segments.
     */
    removePathSegment(index) {

    }

    /**
     * Remove the last segment. Do nothing if the path is empty.
     *
     * @return {PathBuilder} the current builder.
     */
    removeLastPathSegment() {

    }

    /**
     * Remove the first segment. Do nothing if the path is empty.
     *
     * @return {PathBuilder} the current builder.
     */
    removeFirstPathSegment() {

    }

    /**
     * Make the path built by this instance absolute.
     * Only the last absolute() or relative() call executed on the builder before build() call will count.
     * By default, a PathBuilder will build an absolute path.
     *
     * @return {PathBuilder} the current builder.
     */
    absolute() {
        this._absolute = true;
    }

    /**
     * Make the path built by this instance relative.
     * Only the last absolute() or relative() call executed on the builder before build() call will count.
     * By default, a PathBuilder will build an absolute path.
     *
     * @return {PathBuilder} the current builder.
     */
    relative() {
        this._absolute = false;
    }
}
