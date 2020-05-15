const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query

   let temp;

   if(Array.isArray(req.body)) {
       temp = [];
       req.body.forEach(elem => {
           temp.push({ ...elem });
        });

        temp.forEach(elem => {
            delete elem.id;
            delete elem.password;
        });
    } else {
        temp = { ...req.body };
        delete temp.id;
        delete temp.password;
    }

    req.body = temp;

    next();
}

exports.responseMiddleware = responseMiddleware;