import PathSegmentValidator from "../../src/path/pathsegmentvalidator";

describe("PathSegmentValidator", () => {
   describe("validate", () => {

       it("does nothing if valid", () => {
           let validator = new PathSegmentValidator();
           validator.validate("Hello_World");
           validator.validate(".");
           validator.validate("..");
           validator.validate("%01");
           validator.validate("-._~!$&'()*+,;=:@");
       });

       it("throws if malformed path segment", () => {
           let validator = new PathSegmentValidator();
           expect(() => {validator.validate("Hello_World#")}).to.throw();
       });

       it("throws if null param", () => {
           let validator = new PathSegmentValidator();
           expect(() => {validator.validate(null)}).to.throw();
       });
   });
});
