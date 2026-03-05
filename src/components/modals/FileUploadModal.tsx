import { useState, useRef, ChangeEvent } from 'react';
import { Plus, Upload, X, FileText } from 'lucide-react';

interface FileUploadModalContentProps {
  onClose?: () => void;
  onUpload?: (fileData: UploadedFileData) => void;
}

interface UploadedFileData {
  file: File;
  department: string;
  patientId: string;
  patientName: string;
  category: string;
  title: string;
  medicalCategory: string;
  dateOfDocument: string;
  priorityLevel: string;
  attendingPhysician: string;
  tags: string;
  restrictToDepartment: boolean;
  markAsSensitive: boolean;
}

export function FileUploadModalContent({ onClose, onUpload }: FileUploadModalContentProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [department, setDepartment] = useState('Radiology');
  const [patientId, setPatientId] = useState('4421');
  const [patientName, setPatientName] = useState('John Okafor');
  const [category, setCategory] = useState('Imaging');
  const [title, setTitle] = useState('');
  const [medicalCategory, setMedicalCategory] = useState('Lab Results');
  const [dateOfDocument, setDateOfDocument] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('Normal');
  const [attendingPhysician, setAttendingPhysician] = useState('');
  const [tags, setTags] = useState('');
  const [restrictToDepartment, setRestrictToDepartment] = useState(false);
  const [markAsSensitive, setMarkAsSensitive] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const fileData: UploadedFileData = {
      file: selectedFile,
      department,
      patientId,
      patientName,
      category,
      title,
      medicalCategory,
      dateOfDocument,
      priorityLevel,
      attendingPhysician,
      tags,
      restrictToDepartment,
      markAsSensitive,
    };

    // Store in localStorage for persistence
    const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
    const fileInfo = {
      ...fileData,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      fileType: selectedFile.type,
      uploadDate: new Date().toISOString(),
      id: Date.now().toString(),
    };
    
    // Store file as base64 for persistence
    const reader = new FileReader();
    reader.onload = () => {
      const fileWithData = {
        ...fileInfo,
        fileData: reader.result,
      };
      existingFiles.push(fileWithData);
      localStorage.setItem('uploadedFiles', JSON.stringify(existingFiles));
      
      if (onUpload) {
        onUpload(fileData);
      }
      if (onClose) {
        onClose();
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 1: Location Context
        </p>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Department</label>
            <select
              className="input-field w-full"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>Radiology</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Pediatrics</option>
              <option>Orthopedics</option>
              <option>Emergency</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 font-medium">Patient ID</label>
              <input
                type="text"
                className="input-field"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                placeholder="Patient ID"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 font-medium">Patient Name</label>
              <input
                type="text"
                className="input-field"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Patient Name"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Category</label>
            <select
              className="input-field w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Imaging</option>
              <option>Lab Results</option>
              <option>Prescription</option>
              <option>Consultation</option>
              <option>Surgery</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 2: File Upload
        </p>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 md:p-8 text-center space-y-4 transition-colors cursor-pointer ${
            isDragging
              ? 'border-orange-primary bg-orange-primary/5'
              : 'border-white/10 hover:border-orange-primary/50'
          }`}
        >
          {selectedFile ? (
            <div className="flex items-center justify-center gap-3 p-4 md:p-0">
              <FileText className="w-8 h-8 text-orange-primary" />
              <div className="text-left">
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium">Drag & Drop Area</p>
                <p className="text-xs text-gray-500 mt-1">
                  Accepted Formats: PDF, JPG, PNG, DOCX, DICOM
                </p>
              </div>
              <button className="btn-secondary mx-auto">Browse File</button>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.docx,.dcm"
          onChange={handleFileChange}
        />
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 3: Required Metadata
        </p>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">File Title</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter file title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Medical Category</label>
            <select
              className="input-field appearance-none"
              value={medicalCategory}
              onChange={(e) => setMedicalCategory(e.target.value)}
            >
              <option>Lab Results</option>
              <option>Imaging</option>
              <option>Prescription</option>
              <option>Consultation Note</option>
              <option>Surgical Report</option>
              <option>Discharge Summary</option>
              <option>Insurance</option>
              <option>Administrative</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 font-medium">Date of Document</label>
              <input
                type="date"
                className="input-field"
                value={dateOfDocument}
                onChange={(e) => setDateOfDocument(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 font-medium">Priority Level</label>
              <select
                className="input-field"
                value={priorityLevel}
                onChange={(e) => setPriorityLevel(e.target.value)}
              >
                <option>Normal</option>
                <option>Urgent</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Attending Physician</label>
            <input
              type="text"
              className="input-field"
              placeholder="Dr. Name"
              value={attendingPhysician}
              onChange={(e) => setAttendingPhysician(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-gray-500 font-medium">Tags</label>
            <input
              type="text"
              className="input-field"
              placeholder="Condition, treatment type, keywords"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
          Section 4: Access Controls (Role-Aware)
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Restrict to Department Only</span>
            <button
              onClick={() => setRestrictToDepartment(!restrictToDepartment)}
              className={`w-10 h-5 rounded-full relative transition-colors ${
                restrictToDepartment ? 'bg-orange-primary' : 'bg-white/10'
              }`}
            >
              <div
                className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${
                  restrictToDepartment ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Mark as Sensitive</span>
            <input
              type="checkbox"
              className="w-4 h-4 accent-orange-primary"
              checked={markAsSensitive}
              onChange={(e) => setMarkAsSensitive(e.target.checked)}
            />
          </div>
        </div>
      </section>

      <div className="pt-6 flex gap-3">
        <button onClick={onClose} className="btn-secondary flex-1 justify-center">
          Cancel
        </button>
        <button onClick={handleUpload} className="btn-primary flex-1 justify-center">
          Upload File
        </button>
      </div>
    </div>
  );
}
