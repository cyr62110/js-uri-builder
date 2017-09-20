import UriEncoder from "../../src/encoding/uriencoder";
import UriDecoder from "../../src/encoding/uridecoder";
import UriEncoding from "../../src/encoding/uriencoding";

describe("UriEncoding", function() {

    describe("encode", () => {
        it("pass to UriEncoder", () => {
            let uriEncoder = new UriEncoder();
            let uriDecoder = new UriDecoder();

            sinon.stub(uriEncoder, "encode").withArgs("Hello World").returns("Hello%20World");

            let uriEncoding = new UriEncoding(uriEncoder, uriDecoder);
            expect(uriEncoding.encode("Hello World")).to.equal("Hello%20World");
            expect(uriEncoder.encode.calledOnce).to.be.true;
        });
    });

    describe("decode", () => {
        it("pass to UriDecoder", () => {
            let uriEncoder = new UriEncoder();
            let uriDecoder = new UriDecoder();

            sinon.stub(uriDecoder, "decode").withArgs("Hello%20World").returns("Hello World");

            let uriEncoding = new UriEncoding(uriEncoder, uriDecoder);
            expect(uriEncoding.decode("Hello%20World")).to.equal("Hello World");
            expect(uriDecoder.decode.calledOnce).to.be.true;
        });
    });
});
