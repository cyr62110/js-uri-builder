/**
 * Base class of all exception throw by the library.
 */
export default class UriException {

    constructor(message) {
        this.message = message;
    }

    toString() {
        return `UriException: ${this.message}`;
    }
}
