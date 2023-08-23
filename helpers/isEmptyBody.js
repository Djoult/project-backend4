
import HttpErrors from "./HttpError.js";

const isEmptyBody = (req, res, next)=> {
    const {length} = Object.keys(req.body);
    if(!length) {
        next(HttpErrors(400, "fields have not to be empty"))
    }
    next()
}

export default isEmptyBody;