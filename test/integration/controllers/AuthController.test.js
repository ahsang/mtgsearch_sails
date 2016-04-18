var request = require('supertest');

describe('AuthController', function () {

    describe('SignUp', function () {
        it('should sign up user', function (done) {
            request(sails.hooks.http.app)
                .post('/user')
                .send({username: 'test', password: 'test', email: 'test@test.test'})
                .expect(201, done);
        });
    });

    describe('LogIn', function () {
        it('should log me in', function (done) {
            request(sails.hooks.http.app)
                .post('/login')
                .send({username: 'test', password: 'test'})
                .expect(302)
                .expect('location', '/', done);
        });
    });

});
