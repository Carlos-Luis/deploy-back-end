import mongoose from "mongoose";

const patientsSchema = new mongoose.Schema({
    fullname: {type: String, 
        required: true},
    ci: {type: String,
        required: true,
        unique: true},
    birthDate: {type: Date,
        required: true},
    phone: {type: String,
        required: true}
});

export default mongoose.model('Patient', patientsSchema);