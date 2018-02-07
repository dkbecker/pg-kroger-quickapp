describe("Example Query Tests", function () {

    it("should select the column 'name' with value 'world' from row 2 (using a query file)", function (done) {
      this.queryToJson({}, 'src/queries/queries.spec.xml', function (results) {
        expect(results[0].name).toBe('world');
        done();
      });
    });

    it("should select the column 'name' with value 'world' from row 2 (using an inline query)", function (done) {
        var query =
            '<table cols="name,id">' +
            'hello,1;' +
            'world,2;' +
            '</table>' +
            '<sel value="id=\'2\'"/>' +
            '<colord cols="name"/>';
        this.queryToJson({isInlineQuery: true}, query, function (results) {
            expect(results[0].name).toBe('world');
            done();
        });
    });
});