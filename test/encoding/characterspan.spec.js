import CharacterSpan from "../../src/encoding/characterspan";
import UriException from "../../src/exception/UriException";

describe("CharacterSpan", function() {

    /** WIP
    describe("constructor", () => {
        it("throws if start > end", () => {
            expect(CharacterSpan.newRange('b', 'a')).to.throw(UriException);
        });
    }); */

    describe("_getCharCode", () => {
        it("works", () => {
            expect(CharacterSpan._getCharCode('a')).to.equal(97);
            expect(CharacterSpan._getCharCode(97)).to.equal(97);
        });
    });

    describe("contains", () => {

        it("inside of range", () => {
            let span = CharacterSpan.newRange('a', 'b');
            expect(span.contains('a')).to.equal(true);
            expect(span.contains(97)).to.equal(true);
            expect(span.contains('b')).to.equal(true);
            expect(span.contains(98)).to.equal(true);
        });

        it("outside of range", () => {
            let span = CharacterSpan.newRange('a', 'b');
            expect(span.contains('c')).to.equal(false);
            expect(span.contains(99)).to.equal(false);
        });
    });
});
