const assert = require('assert');
var DButils = require('./DButilsSqlLite');

describe('SelectQuery', () => {

    it('should return 2', () => {
        DButils.execSelectQuery("Select* from AlreadyTaggedCVEs")
    .then(function (result) {
        assert.equal(result.length, 2);

        })
    });

    it('should return 59', () => {
        DButils.execSelectQuery("Select* from Tags")
            .then(function (result) {
                assert.equal(result.length, 59);

            })
    });

    it('should return no such table', () => {
        DButils.execSelectQuery("Select* from ABC")
            .catch(function (err) {
                assert.equal(err, "Read error: SQLITE_ERROR: no such table: ABC");

            })
    });

    it('should return no such column', () => {
        DButils.execSelectQuery("select * from Tags where tags.name=\"name\"")
            .catch(function (err) {
                assert.equal(err, "Read error: SQLITE_ERROR: no such column: tags.name");

            })
    });


});


describe('insertQuery', () => {
    it('should return sucess', () => {
        DButils.execSelectQuery("insert into AlreadyTaggedCVEs(ID)values('CVE-2015-3048')")
            .then(function (result) {
                assert.equal(result, "Query executed successfully");
            })
    });

    it('should return insert sucess', () => {
        DButils.execSelectQuery("insert into Tags(CVEID,Position,Word,Tag) values('2015-3048','0','buffer','mean')")
            .then(function (result) {
                assert.equal(result, "Query executed successfully");
            })
    });

    it('should return no such column', () => {
        DButils.execSelectQuery("insert into AlreadyTaggedCVEs(ABC)values('CVE-2015-3048')")
            .catch(function (err) {
                assert.equal(err, "Read error: SQLITE_ERROR: table AlreadyTaggedCVEs has no column named ABC");
            })
    });

    it('should return no such table', () => {
        DButils.execSelectQuery("insert into ABC(ABC)values('CVE-2015-3048')")
            .catch(function (err) {
                assert.equal(err, "Read error: SQLITE_ERROR: no such table: ABC");
            })
    });

});

describe('updateQuery', () => {

    it('should return update sucess', () => {
        DButils.execSelectQuery("update users set NumberOfTags=NumberOfTags-1 Where username='shaytay@post.bgu.ac.il'")
            .then(function (result) {
                assert.equal(result, "Query executed successfully");
            })
    });



    it('should return no such column', () => {
        DButils.execSelectQuery("update users set NumberOfTags=NumberOfTags-1 Where ABC= 'shay'")
            .catch(function (err) {
                assert.equal(err, "'Read error: SQLITE_ERROR: no such column: ABC");
            })
    });

    it('should return no such table', () => {
        DButils.execSelectQuery("update ABC set NumberOfTags=NumberOfTags-1 Where username= 'shay'")
            .catch(function (err) {
                assert.equal(err, "Read error: SQLITE_ERROR: no such table: ABC");
            })
    });
});


var TagModule = require('./TagModule');
var nock = require('nock');

describe('GetTagFromTheAlgorithm', () => {
    it('exceed limitations', () => {
            nock('http://localhost:3000')
                .post('/Tags/GetTagFromTheAlgorithm')
                .reply(500, {
                    "args": {response:res},
                    "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
                    "origin": "http://localhost:3000",
                    "url": "http://localhost:3000/Tags/GetTagFromTheAlgorithm"

});
        assert.equal(res,"You need to tag for us in order to use this service")

    });

    it('sucess', () => {
        t=["heap","buffer" ,"overflow","in","media","in"]
        CVEID="CVE-2019-3048"
        const tokens={
            tokens:t,
            CVEID:id,
        }

        nock('http://localhost:3000')
            .post('/Tags/GetTagFromTheAlgorithm',{tokens:tokens})
            .reply(200, {
                "args": {response:res},
                "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
                "origin": "http://localhost:3000",
                "url": "http://localhost:3000/Tags/GetTagFromTheAlgorithm"

            });
        assert.equal(res.length,6)

    });

    it('invalid token', () => {
    nock('http://localhost:3000')
        .post('/Tags/GetTagFromTheAlgorithm',{tokens:tokens})
        .reply(500, {
            "args": {response:res},
            "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
            "origin": "http://localhost:3000",
            "url": "http://localhost:3000/Tags/GetTagFromTheAlgorithm"

        });
         assert.equal(res,"Invalid Token")

});

    it('sucess2', () => {
        t=[]
        CVEID="CVE-2019-3048"
        const tokens={
            tokens:t,
            CVEID:id,
        }

        nock('http://localhost:3000')
            .post('/Tags/GetTagFromTheAlgorithm',{tokens:tokens})
            .reply(200, {
                "args": {response:res},
                "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
                "origin": "http://localhost:3000",
                "url": "http://localhost:3000/Tags/GetTagFromTheAlgorithm"

            });
        assert.equal(res.length,0)

    });

    it('sucess3', () => {
        t=["heap","buffer" ,"overflow","in","media","in"]
        CVEID="undefined"
        const tokens={
            tokens:t,
            CVEID:CVEID,
        }

        nock('http://localhost:3000')
            .post('/Tags/GetTagFromTheAlgorithm',{tokens:tokens})
            .reply(200, {
                "args": {response:res},
                "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
                "origin": "http://localhost:3000",
                "url": "http://localhost:3000/Tags/GetTagFromTheAlgorithm"

            });
        assert.equal(res.length,6)

    });



    it('sucess8', () => {
        nock('http://localhost:3000')
            .post('/Tags/GetUnTaggedCve')
            .reply(200, {
                "args": {response:res},
                "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
                "origin": "http://localhost:3000",
                "url": "http://localhost:3000/Tags/GetUnTaggedCve"

            });
        assert.equal(res.length,1)

    });

    it('invalid token5', () => {
        nock('http://localhost:3000')
            .post('/Tags/GetUnTaggedCve',{tokens:tokens})
            .reply(500, {
                "args": {response:res},
                "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
                "origin": "http://localhost:3000",
                "url": "http://localhost:3000/Tags/GetUnTaggedCve"

            });
        assert.equal(res,"Invalid Token")

    });

    it('sucess5', () => {
        nock('http://localhost:3000')
            .post('/Tags/getNumberOfTags')
            .reply(200, {
                "args": {response:res},
                "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
                "origin": "http://localhost:3000",
                "url": "http://localhost:3000/Tags/getNumberOfTags"

            });
        assert.equal(res,30)

    });


    it('invalid token3', () => {
        nock('http://localhost:3000')
            .post('/Tags/getNumberOfTags',{tokens:tokens})
            .reply(500, {
                "args": {response:res},
                "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
                "origin": "http://localhost:3000",
                "url": "http://localhost:3000/Tags/getNumberOfTags"

            });
        assert.equal(res,"Invalid Token")

    });



    it('sucess3', () => {
        t=["heap","buffer" ,"overflow","in","media","in"]
        l=["mean","mean","mean","mean","mean","port"]
        CVEID="undefined"
        const tokens={
            tokens:t,
            CVEID:CVEID,
            Labels:l,
        }

        nock('http://localhost:3000')
            .post('/Tags/SubmitTag',{tokens:tokens})
            .reply(200, {
                "args": {response:res},
                "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
                "origin": "http://localhost:3000",
                "url": "http://localhost:3000/Tags/SubmitTag"

            });
        assert.equal(res,"executed successfully")

    });


    it('sucess3', () => {
        t=["heap","buffer" ,"overflow","in","media","in"]
        l=["mean","mean","mean"]
        CVEID="undefined"
        const tokens={
            tokens:t,
            CVEID:CVEID,
            Labels:l,
        }

        nock('http://localhost:3000')
            .post('/Tags/SubmitTag',{tokens:tokens})
            .reply(400, {
                "args": {response:res},
                "headers": {Authorization: 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkZsMXJ3bjMtS1c2QWN6NlREdUpMZyJ9.eyJodHRwczovL2FwaS5leGFtcGxlY28uY29tL2VtYWlsIjoic2hheXRheUBwb3N0LmJndS5hYy5pbCIsImlzcyI6Imh0dHBzOi8vdGFnZ2luYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZTk1YzY1NzYxY2Q3YzBjODVkMTk1YjEiLCJhdWQiOiJUYWdnaW5nQXBwQW5ndWxhciIsImlhdCI6MTU4OTgwNDQ0OCwiZXhwIjoxNTg5ODExNjQ4LCJhenAiOiJnRFh4Zlo4VXF3M2ZjV2pUTm84Z2QyMFlJc3kyS1RCRSIsInNjb3BlIjoiIn0.Cz3DkdJtIc5IW9fxOUZ_Sob0FwQgpIJxT5IpQ18QS9Yp55qxlaKb1hKHgKoN1eAOl-CbKsHuw22mdwsmMkjVKD9Ku6Jk1ExDiZJKE_9ZSmvpAr16P9GomlGY0v7VohpcIzsJQqnJAJRPnf4D4Mm8zvmVuNjoa6mVINt-2ysjmHcPTPAVyqhHbxpJyplEHo0eHw1MvY7iRfraGyDt1OnsWlw-5OHyH20-rod2yZNsZSevMhEdT52TuYfAhSZ3e_tJpHiBqyecNPgEnLo6YMYJQnb1Hz0BXvfBfA4Qp5apaCU8kSD6RDzbkrmECJi5FC2cxh94WJYBXGke-g5JuO8WSw"},
                "origin": "http://localhost:3000",
                "url": "http://localhost:3000/Tags/SubmitTag"

            });
        assert.equal(res,"Opps..something worng, please try again")

    });

});




