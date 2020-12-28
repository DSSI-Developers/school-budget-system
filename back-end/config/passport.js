const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('../models/users.model');
const config = require('../config/database');
// const dotenv = require('dotenv');
// dotenv.config();

// module.exports = function(passport) {
//     var opts = {}
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//     opts.secretOrKey = config.secret;
//     passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
//         Users.getUserById(jwt_payload._doc._id, (err, user) => {
//             if (err) {
//                 return done(err, false);
//             }
//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//             }
//         });
//     }));
// }
module.exports = passport => {
    // let opts = {};
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
    // opts.secretOrKey = config.secret;
    // passport.use(
    //     new JwtStrategy(opts, (jwt_payload, done) => {
    //         console.log(jwt_payload._id);
    //         User.findOne({ id: jwt_payload.sub }, (err, user) => {
    //             if (err) {
    //                 return done(err, false);
    //             }
    //             if (user) {
    //                 return done(null, user);
    //             } else {
    //                 return done(null, false);
    //             }
    //         });
    //     })
    // );
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //Here you have to put the same name inside quotes '' like you put inside token but without space after name
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload);
        Users.getUserById(
            jwt_payload._doc._id,
            function(err, user) {
                if (err) {
                    return done(err, false);
                }

                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
    }));
}