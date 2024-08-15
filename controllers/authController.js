import User from "../models/User.js";

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// user Registerion

export const register = async (req, res) => {
    try {
        // Generate a salt
        const salt = bcrypt.genSaltSync(10);
        
        // Hash the password with the generated salt
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        // Create a new user instance
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            photo: req.body.photo,
        });
        
        // Save the user to the database
        await newUser.save();
        
        // Respond with success message
        res.status(200).json({ success: true, message: "User created successfully" ,data:newUser });
    } catch (error) {
        // Log the error for debugging
        console.error("Error creating user:", error);
        
        // Respond with failure message
        res.status(500).json({ success: false, message: "Failed to create user. Try again." });
    }
}
// user login
export const login = async(req,res)=>{
    const email = req.body.email
    try {
        const user = await User.findOne({email})
        if (!user) {
            
            res.status(404).json({ success: false, message: "User Not found" });
        }
        const checkCorrectPassword = await bcrypt.compare(req.body.password,user.password)
        if (!checkCorrectPassword) {
            
            res.status(401).json({ success: false, message: "Incorrect email or password" });
        }
        
        const {password,role, ...rest} = user._doc
        
        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'15d'})
        res.cookie('accessToken',token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({success:true,token,role,message:"successFully Login",data:{...rest}})
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to login" });

        
    }

}