import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.create(req.body);
        res.status(201).json({ message: 'Cita creada', appointment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const listAppointments = async (req, res) => {
    try {
        const {doctorId, patientId} = req.query;
        const filter = {};
        if (doctorId) filter.doctor = doctorId;
        if (patientId) filter.patient = patientId;
        const appointments = await Appointment.find(filter).populate('doctor patient');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const {estado} = req.body;
        const updated = await Appointment.findByIdAndUpdate(id, {estado}, { new: true });
        if (!updated) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json({ message: 'Cita actualizada', updated });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};