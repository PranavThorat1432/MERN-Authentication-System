import userModel from "../models/UserModel.js";

export const getUserData = async (req, res) => {
    try {
        
        const userId = req.userId;
        const user = await userModel.findById(userId);

        if(!user) {
            return res.json({
                message: "User not found", 
                success: false
            })
        }

        res.json({
            message: "User data retrived successfully",
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified
            },
            success: true
        })

    } catch (error) {
        return res.json({
                message: error.message,
                success: false
            })
    }
}