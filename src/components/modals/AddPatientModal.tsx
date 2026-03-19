import { useState, FormEvent } from 'react';
import { Patient } from '../../types';

interface AddPatientModalProps {
  onClose: () => void;
  onAdd: (patient: Patient) => void;
}

export function AddPatientModal({ onClose, onAdd }: AddPatientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    status: 'Admitted',
    department: 'Cardiology',
    gender: 'Male',
    bloodType: 'O+',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    allergies: '',
    medications: '',
    medicalHistory: '',
    insuranceProvider: '',
    insuranceNumber: '',
    admissionDate: new Date().toISOString().split('T')[0],
    assignedDoctor: '',
    roomNumber: '',
    notes: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.age) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new patient object
    const newPatient: Patient = {
      id: `P${Date.now().toString().slice(-6)}`,
      name: formData.name,
      age: parseInt(formData.age),
      status: formData.status,
      files: 0,
      department: formData.department,
      lastUpdated: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    // Store additional patient details in localStorage
    const patientDetails = {
      ...newPatient,
      ...formData,
      age: parseInt(formData.age),
      createdAt: new Date().toISOString(),
    };

    const existingDetails = JSON.parse(localStorage.getItem('patientDetails') || '{}');
    existingDetails[newPatient.id] = patientDetails;
    localStorage.setItem('patientDetails', JSON.stringify(existingDetails));

    onAdd(newPatient);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      {/* Section 1: Basic Information */}
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 1: Basic Information
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs text-gray-500 font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              className="input-field"
              placeholder="e.g., John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              className="input-field"
              placeholder="e.g., 45"
              value={formData.age}
              onChange={handleChange}
              min="0"
              max="150"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Gender</label>
            <select name="gender" className="input-field" value={formData.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Blood Type</label>
            <select
              name="bloodType"
              className="input-field"
              value={formData.bloodType}
              onChange={handleChange}
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="input-field"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs text-gray-500 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="patient@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs text-gray-500 font-medium">Address</label>
            <textarea
              name="address"
              className="input-field h-20 resize-none"
              placeholder="Street address, City, State, ZIP"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Emergency Contact */}
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 2: Emergency Contact
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Contact Name</label>
            <input
              type="text"
              name="emergencyContact"
              className="input-field"
              placeholder="e.g., Jane Doe"
              value={formData.emergencyContact}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Contact Phone</label>
            <input
              type="tel"
              name="emergencyPhone"
              className="input-field"
              placeholder="+1 (555) 000-0000"
              value={formData.emergencyPhone}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* Section 3: Medical Information */}
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 3: Medical Information
        </p>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Allergies</label>
            <textarea
              name="allergies"
              className="input-field h-20 resize-none"
              placeholder="List any known allergies (e.g., Penicillin, Peanuts)"
              value={formData.allergies}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Current Medications</label>
            <textarea
              name="medications"
              className="input-field h-20 resize-none"
              placeholder="List current medications and dosages"
              value={formData.medications}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Medical History</label>
            <textarea
              name="medicalHistory"
              className="input-field h-24 resize-none"
              placeholder="Previous conditions, surgeries, or relevant medical history"
              value={formData.medicalHistory}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* Section 4: Insurance Information */}
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 4: Insurance Information
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Insurance Provider</label>
            <input
              type="text"
              name="insuranceProvider"
              className="input-field"
              placeholder="e.g., Blue Cross Blue Shield"
              value={formData.insuranceProvider}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Policy Number</label>
            <input
              type="text"
              name="insuranceNumber"
              className="input-field"
              placeholder="e.g., ABC123456789"
              value={formData.insuranceNumber}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* Section 5: Admission Details */}
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 5: Admission Details
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Department</label>
            <select
              name="department"
              className="input-field"
              value={formData.department}
              onChange={handleChange}
            >
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Pediatrics</option>
              <option>Orthopedics</option>
              <option>Emergency</option>
              <option>Oncology</option>
              <option>Laboratory</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Status</label>
            <select name="status" className="input-field" value={formData.status} onChange={handleChange}>
              <option>Admitted</option>
              <option>Outpatient</option>
              <option>ICU</option>
              <option>Discharged</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Admission Date</label>
            <input
              type="date"
              name="admissionDate"
              className="input-field"
              value={formData.admissionDate}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Room Number</label>
            <input
              type="text"
              name="roomNumber"
              className="input-field"
              placeholder="e.g., 301-A"
              value={formData.roomNumber}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs text-gray-500 font-medium">Assigned Doctor</label>
            <input
              type="text"
              name="assignedDoctor"
              className="input-field"
              placeholder="e.g., Dr. Sarah Johnson"
              value={formData.assignedDoctor}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs text-gray-500 font-medium">Additional Notes</label>
            <textarea
              name="notes"
              className="input-field h-24 resize-none"
              placeholder="Any additional notes or special instructions"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> All patient information is confidential and will be stored securely
          in compliance with HIPAA regulations.
        </p>
      </div>

      <div className="flex gap-3 pt-4 bottom-0 pb-2">
        <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <button type="submit" className="btn-primary flex-1 justify-center">
          Add Patient
        </button>
      </div>
    </form>
  );
}
