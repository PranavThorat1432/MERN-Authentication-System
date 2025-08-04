import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/UserModel.js';
import createTransporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

//user register
export const register = async (req, res) => {
    const { name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.json({
            message: "All Fields are required",
            success: false
        })

    } else {
        try {
            const existingUser = await userModel.findOne({email});
            if(existingUser) {
                return res.json({
                    message: "User already exist",
                    success: false
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new userModel({ name, email, password: hashedPassword});
            await user.save();

            const token = jwt.sign({id: user._id}, process.env.JWT, {
                expiresIn: "7d"
            });

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            //sending welcome email
            // console.log('=== EMAIL DEBUG ===');
            // console.log('SENDER_EMAIL:', process.env.SENDER_EMAIL);
            // console.log('TO_EMAIL:', email);
            // console.log('==================');

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'Welcome to our website',
                text: `Welcome to our website. Your account has been created with email id: ${email}`
            }

            try {
                const transporter = createTransporter();
                await transporter.sendMail(mailOptions);
                console.log('✅ Email sent successfully!');
            } catch (emailError) {
                console.error('❌ Email sending failed:', emailError.message);
                console.error('Full email error:', emailError);
                // Continue with registration even if email fails
                console.log('⚠️ Continuing with registration despite email failure');
            }

            return res.json({
                message: "User registered successfully",
                success: true
            })
            
        } catch (error) {
            res.json({
                message: error.message,
                success: false
            })
        }
    }
}

//user login
export const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.json({
            message: "Email and Password are required",
            success: false
        })

    } else {

        try {
            const user = await userModel.findOne({email});
            if(!user) {
                return res.json({
                    message: "Invalid Email",
                    success: false
                })
            } 

            const isMatched = await bcrypt.compare(password, user.password);
            if(!isMatched) {
                return res.json ({
                    message: "Invalid Password",
                    success: false
                })
            }

            const token = jwt.sign({id: user._id}, process.env.JWT, {
                expiresIn: "7d"
            });

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({
                message: "Logged In",
                success: true
            })

            
        } catch (error) {
            return res.json({
                message: error.message,
                success: false
            })
        }
    }
}

//user logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })

        return res.json({
            message: "Logged Out",
            success: true
        })
        
    } catch (error) {
        return res.json({
            message: error.message,
            success: false
        })
    }
}

//send verification OTP to the user's mail
export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId);
        if(user.isAccountVerified) {
            return res.json({
                message: "Account is already verified",
                success: false
            })

        } 

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account verification OTP',
            // text: `Your OTP is ${otp}. Verify your account with this OTP.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        const transporter = createTransporter();
        await transporter.sendMail(mailOption);

        res.json({
            message: "OTP sent to your email",
            success: true
        })

    } catch (error) {
        res.json({
            message: error.message,
            success: false
        })
    }
}

// verify email using OTP 
export const verifyEmail = async (req, res) => {
    const userId = req.userId;
    const {otp} = req.body;

    if(!userId || !otp) {
        return res.json({
            message: "Invalid request",
            success: false
        })
    } else {
        try {
            const user = await userModel.findById(userId);
            if(!user) {
                return res.json({
                    message: "User not found",
                    success: false
                })
            }

            if(user.verifyOtp === "" || user.verifyOtp !== otp) {
                return res.json({
                    message: "Invalid OTP",
                    success :false
                })
            }

            if(user.verifyOtpExpireAt < Date.now()) {
                return res.json({
                    message: "OTP Expired",
                    success: false
                })
            }

            user.isAccountVerified = true;
            user.verifyOtp = "";
            user.verifyOtpExpireAt = 0;

            await user.save();

            return res.json({
                message: "Email verified successfully",
                success: true
            })

        } catch (error) {
            return res.json({
                message: error.message,
                success: false
            })
        }
    }
}

//check if user is authenticated 
export const userIsAuthenticated = async (req, res) => {
    try {
        return res.json({
            message: "User is Authenticated",
            success: true
        });



    } catch (error) {
        return res.json({
                message: error.message,
                success: false
            })
    }
}


// Send OTP to Reset Password
export const sendRestOtp = async (req, res) => {
    const {email} = req.body;
    if(!email) {
        return res.json({
            message: "Email is required",
            success: false
        })
    } else {

        try {
            
            const user = await userModel.findOne({email});
            if(!user) {
                return res.json({
                    message: "User not found",
                    success: false
                })
            }

            const otp = String(Math.floor(100000 + Math.random() * 900000));

            user.resetOtp = otp;
            user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

            await user.save();

            const mailOption = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'Password reset OTP',
                // text: `Your OTP for reseting you password is ${otp}. Reset your account password with this OTP.`,
                html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
            };
            const transporter = createTransporter();
            await transporter.sendMail(mailOption);

            return res.json({
                message: "OTP sent to your Email",
                success: true
            })

        } catch (error) {
            res.json({
                message: error.message,
                success: false
            })
        }
    }
}

//Reset User Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if(!email || !otp || !newPassword) {
        return res.json({
            message: "Email, OTP, and New-password are required",
            success: false
        })
    } else {

        try {
            const user = await userModel.findOne({email});
            if(!user) {
                return res.json({
                    message: "User not found",
                    success: false
                })
            }

            if(user.resetOtp === "" || user.resetOtp !== otp) {
                return res.json({
                    message: "Invalid OTP",
                    success: false
                })
            }

            if(user.resetOtpExpireAt < Date.now()) {
                return res.json({
                    message: "OTP Expired",
                    success: false
                })
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            user.resetOtp = "";
            user.resetOtpExpireAt = 0;

            await user.save();

            res.json({
                message: "Password has been reset successfully...!",
                success: true
            })

        } catch (error) {
            res.json({
                message: error.message,
                success: false
            })
        }
    }
}