import Patient from "../models/Patient.js";

export const createPatient = async (req, res) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json({ message: 'Paciente creado', patient });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const listPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndUpdate(id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.json({ message: 'Paciente actualizado', patient });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndDelete(id);
        if (!patient) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.json({ message: 'Paciente eliminado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

