import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            required: true,
        },

        className: {
            type: String,
            required: true,
        },

        section: {
            type: String,
            required: true,
        },

        rollNumber: {
            type: String,
            required: true,
            unique: true,
        },
    },
);

const Student = mongoose.model("Student", studentSchema);

export default Student;