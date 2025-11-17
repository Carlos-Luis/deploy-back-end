import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient:{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient',
        required: true},
    doctor:{type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true},
    motivo:{type: String,
        required: true},
    estado:{type: String,
        enum: ['PROGRAMADO', 'ATENDIDO', 'CANCELADO'],
        default: 'PROGRAMADO'},
    scheduledAt:{type: Date,
        required: true},
}, {
    timestamps: true,
});
export default mongoose.model('Appointment', appointmentSchema);