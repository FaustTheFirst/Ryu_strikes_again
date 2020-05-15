const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
   
   if(Array.isArray(req.body)) {
       req.body.forEach(elem => {
           delete elem.id;
           delete elem.password;
        });
    } else {
        delete req.body.id;
        delete req.body.password;
    }

    next();
}

exports.responseMiddleware = responseMiddleware;