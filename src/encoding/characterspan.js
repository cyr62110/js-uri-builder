/**
 *
 */
export default class CharacterSpan {

    /**
     * Create a new {CharacterSpan} including all characters between startCharCode and endCharCode.
     * @param startCharCode Char code of the first character included in the span.
     * @param endCharCode Char code of the last character included in the span. Must be greater than or equals to startCharCode.
     */
    constructor(startCharCode, endCharCode) {
        this._startCharCode = startCharCode;
        this._endCharCode = endCharCode;
    }

    /**
     * Create a new {CharacterSpan} including all characters between startCharacter and endCharacter.
     * @param {String} startCharacter First character included in the span.
     * @param {String} endCharacter Char code of the last character included in the span. Must be greater than or equals to startCharCode.
     * @return {CharacterSpan} a new span.
     */
    static newRange(startCharacter, endCharacter) {

    }

    /**
     * Create a new {CharacterSpan} including only the provided character.
     * @param charCode Character included in the span.
     * @return {CharacterSpan} a new span.
     */
    static newSingleCharacter(character) {

    }

    /**
     * Check if the span contains the provided character
     * @param {String|Number} character Char code or character to test.
     * @return {Boolean} true if span includes the character, false otherwise.
     */
    contains(character) {
        let charCode;
        if (character instanceof String) {
            charCode = character.charCodeAt(0);
        } else {
            charCode = character;
        }
        return charCode >= this._startCharCode && charCode <= this._endCharCode;
    }
}
