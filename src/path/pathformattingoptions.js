let DEFAULT_PATH_SEGMENT_SEPARATOR = '/';

/**
 * Class exposing some options that allow to control the formatting of path
 * when they are converted into String or parsed from String.
 */
export default class PathFormattingOptions {

    /**
     *
     */
    constructor() {
        /**
         * Absolute path will be printed, as relative path, without the
         * first separator char at the start of the path.
         *
         * Does not affect parsing behavior.
         */
        this.withoutRoot = false;

        /**
         * Path segment will be printed without pct-encoded characters.
         *
         * Does not affect parsing behavior.
         */
        this.nonEncoded = false;

        /**
         * Character used to separate path segments.
         */
        this.pathSegmentSeparator = DEFAULT_PATH_SEGMENT_SEPARATOR;
    }

    /**
     * Default formatting options.
     *
     * @return {PathFormattingOptions} default formatting options.
     */
    static defaultOptions() {

    }
}
