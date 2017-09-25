import PathSegmentValidator from "../../src/path/pathsegmentvalidator";
import UriEncoding from "../../src/encoding/uriencoding";
import PathBuilder from "../../src/path/pathbuilder";

describe("PathBuilder", () => {

    describe("build", () => {
        it("build", () => {
            let path = new PathBuilder(null, UriEncoding.getDefault(), new PathSegmentValidator())
                .build();

            expect(path.absolute).to.be.true;
        });
    });

    describe("appendEncodedPathSegment", () => {
        it("to validate and append", () => {
            let validator = new PathSegmentValidator();
            let encoding = UriEncoding.getDefault();

            let path = new PathBuilder(null, encoding, validator)
                .appendEncodedPathSegment("test")
                .build();

            expect(path.pathSegmentCount).to.equal(1);
            expect(path.getEncodedPathSegment(0)).to.equal("test");
        });

        it("throws if malformed path segment", () => {
            let builder = new PathBuilder(null, UriEncoding.getDefault(), new PathSegmentValidator());
            expect(() => {builder.appendEncodedPathSegment("test!")}).to.throw();
        });
    });

    describe("appendPathSegment", () => {
        it("to encode and append", () => {
            let validator = sinon.mock(PathSegmentValidator);
            let encoding = UriEncoding.getDefault();
            let builder = new PathBuilder(null, encoding, validator);

            sinon.stub(encoding, "encode").withArgs("test!").returns("test%21");
            sinon.spy(builder, "appendEncodedPathSegment");

            builder.appendPathSegment("test!");

            let path = builder.build();
            expect(path.pathSegmentCount).to.equal(1);
            expect(paht.getEncodedPathSegment(0)).to.equal("test%21");
            expect(encoding.encode.calledOnce).to.be.true;
        });
    })
});
