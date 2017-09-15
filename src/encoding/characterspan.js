import UriException from "../exception/UriException";

/**
 *
 */
export default class CharacterSpan {

    /**
     * Create a new {CharacterSpan} including all characters between startCharacter and endCharacter.
     * @param {String|Number} startCharacter First character (or char code) included in the span. Inclusive.
     * @param {String|Number} endCharacter Last character (or char code) included in the span. Inclusive.
     */
    constructor(startCharacter, endCharacter) {
        this._startCharCode = CharacterSpan._getCharCode(startCharacter);
        this._endCharCode = CharacterSpan._getCharCode(endCharacter);
        if (this._startCharCode > this._startCharCode) {
            throw new UriException("startCharacter is greater than endCharacter");
        }
    }

    /**
     * Return the char code of the character.
     * @param {String|Number} character String containing the character or char code of the character.
     * @return {Number} Char code of the character.
     */
    static _getCharCode(character) {
        if (typeof character === 'string' || character instanceof String) {
            return character.charCodeAt(0);
        } else {
            return character;
        }
    }

    /**
     * Create a new {CharacterSpan} including all characters between startCharacter and endCharacter.
     * @param {String} startCharacter First character included in the span.
     * @param {String} endCharacter Char code of the last character included in the span. Must be greater than or equals to startCharCode.
     * @return {CharacterSpan} a new span.
     */
    static newRange(startCharacter, endCharacter) {
        return new CharacterSpan(startCharacter, endCharacter);
    }

    /**
     * Create a new {CharacterSpan} including only the provided character.
     * @param charCode Character included in the span.
     * @return {CharacterSpan} a new span.
     */
    static newSingleCharacter(character) {
        return new CharacterSpan(character, character);
    }

    /**
     * Check if the span contains the provided character
     * @param {String|Number} character Char code or character to test.
     * @return {Boolean} true if span includes the character, false otherwise.
     */
    contains(character) {
        let charCode = CharacterSpan._getCharCode(character);
        return charCode >= this._startCharCode && charCode <= this._endCharCode;
    }
}
