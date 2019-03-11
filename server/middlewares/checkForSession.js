import react from 'react';

module.exports =  function (req, res, next) {
    if(!session.user) {
        session.user = { username: '', cart: [], total: 0 };
    }
    next();
}