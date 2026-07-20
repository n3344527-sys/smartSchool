import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["admin", "teacher", "student", "parent"],
            // Enum means Enumeration. It is used when a value should be selected from a fixed list of allowed values.
            required: true,
        },
        
    }
    
)

const User = mongoose.model("User", userSchema);

export default User;