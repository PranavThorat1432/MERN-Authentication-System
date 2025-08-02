import jwt from 'jsonwebtoken';

const isAuthentication = async (req, res, next) => {
    const { token } = req.cookies;
    if(!token) {
        return res.json({
            message: "Not authorised login again",
            success: false
        })
    } else {

        try {
            
            const tokenDecode = jwt.verify(token, process.env.JWT);

            if(tokenDecode.id) {
                req.userId = tokenDecode.id;
            } else {
                return res.json({
                    message: "Not authorised, Login again",
                    success: true
                })
            }
            next();

        } catch (error) {
            return res.json({
                message: error.message,
                success: false
            })
        }
    }
}

export default isAuthentication;