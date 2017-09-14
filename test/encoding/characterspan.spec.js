import CharacterSpan from "../../src/encoding/characterspan";

describe("CharacterSpan", function() {

    describe("contains", function() {

        it("inside of range", function() {
            let span = CharacterSpan.newRange('a', 'b');
            expect(span.contains('a')).to.equal(true);
            expect(span.contains('b')).to.equal(true);
        });

    });

});
