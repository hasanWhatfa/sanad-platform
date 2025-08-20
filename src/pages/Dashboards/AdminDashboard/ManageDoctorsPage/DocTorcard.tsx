// DoctorCard.tsx
import React from 'react';
import './ManageDoctorsPage.css'
// تعريف بنية بيانات الطبيب باستخدام TypeScript
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  achievements: string[];
  email: string;
  phone: string;
  imageUrl: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-card-image-container">
        <img src={doctor.imageUrl} alt={`Dr. ${doctor.name}`} className="doctor-card-image" />
      </div>
      <div className="doctor-card-content">
        <div className="doctor-card-info">
          <h3 className="doctor-name" onClick={() => onViewDetails(doctor.id)}>
            {doctor.name}
          </h3>
          <p className="doctor-specialty">{doctor.specialty}</p>
        </div>
        <div className="doctor-card-actions">
          <button className="btn-edit" onClick={() => onEdit(doctor.id)}>تعديل</button>
          <button className="btn-delete" onClick={() => onDelete(doctor.id)}>حذف</button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;