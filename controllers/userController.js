import User from "../models/User.js";
// createUser
export const createUser =  async(req,res)=>{
    const newUser = new User(req.body)
    try {
        const savedUser = await newUser.save()
        res.status(200).json({success:true,message:"SuccessFully created",data:savedUser})
    } catch (error) {
        res.status(500).json({success:false,message:"Failed to create. Try Again"})
        
    }
    
}

// update User 
export const updateUser =  async(req,res)=>{
    const id = req.params.id
    try {
        const updateedUser = await User.findByIdAndUpdate(id,{
            $set : req.body
        },{new:true})
        res.status(200).json({success:true,message:"SuccessFully update",data:updateUser})
        
        
    } catch (error) {
        res.status(500).json({success:false,message:"failed to update"})
        
    }
}

// delete User 
export const deleteUser =  async(req,res)=>{
    const id = req.params.id
    try {
         await User.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"SuccessFully delete"})
        
        
    } catch (error) {
        res.status(500).json({success:false,message:"failed to detele"})
        
    }
}

// getSingleUser User 
export const getSingleUser =  async(req,res)=>{
    const id = req.params.id
    try {
       const user =  await User.findById(id)
        res.status(200).json({success:true,message:"SuccessFully found Data",data:user})
        
        
    } catch (error) {
        res.status(404).json({success:false,message:"not Found"})
        
    }
}

// getAll User 
export const getAllUser =  async(req,res)=>{
    
    try {
        const users = await User.find({})
        res.status(200).json({success:true,message:"SuccessFully found Data",data:users})
        
    } catch (error) {
        res.status(404).json({success:false,message:"not Found"})
        
    }
}
