// DoctorsManagementPage.tsx
import React, { useState } from 'react';
import DoctorCard, { type Doctor } from './DocTorcard';
import './ManageDoctorsPage.css';

// بيانات وهمية مؤقتة لعرضها
const mockDoctors: Doctor[] = [
  {
    id: 1,
    name: 'د. نورة عبدالله',
    specialty: 'طبيب أمراض جلدية',
    achievements: ['زمالة الأكاديمية الأمريكية للأمراض الجلدية', 'جائزة أفضل طبيب مقيم لعام 2022'],
    email: 'noura.a@clinic.com',
    phone: '+966 50 123 4567',
    imageUrl: 'https://placehold.co/600x400/CAF0F8/1D3557?text=Dr.+Noura',
  },
  {
    id: 2,
    name: 'د. أحمد المصري',
    specialty: 'استشاري طب أطفال',
    achievements: ['عضو الجمعية السعودية لطب الأطفال', 'نشر 5 أوراق بحثية في مجلات عالمية'],
    email: 'ahmed.m@clinic.com',
    phone: '+966 55 987 6543',
    imageUrl: 'https://placehold.co/600x400/B5D9C9/1D3557?text=Dr.+Ahmed',
  },
  {
    id: 3,
    name: 'د. سارة خان',
    specialty: 'أخصائية تغذية علاجية',
    achievements: ['ماجستير في التغذية السريرية من جامعة الملك سعود'],
    email: 'sara.k@clinic.com',
    phone: '+966 53 456 7890',
    imageUrl: 'https://placehold.co/600x400/EDF6F9/1D3557?text=Dr.+Sara',
  },
   {
    id: 4,
    name: 'د. خالد الغامدي',
    specialty: 'طبيب أعصاب',
    achievements: ['البورد السعودي في طب الأعصاب', 'متخصص في علاج الصداع النصفي'],
    email: 'khalid.g@clinic.com',
    phone: '+966 54 111 2233',
    imageUrl: 'https://placehold.co/600x400/457B9D/FFFFFF?text=Dr.+Khalid',
  },
];


const DoctorsManagementPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);

  // الدوال التالية هي مجرد محاكاة للوظائف المطلوبة
  // سيتم برمجتها لاحقاً لفتح نماذج التعديل أو الحذف
  const handleAddDoctor = () => {
    console.log('سيتم فتح نافذة إضافة طبيب جديد');
  };

  const handleEditDoctor = (id: number) => {
    console.log(`تعديل الطبيب رقم: ${id}`);
  };

  const handleDeleteDoctor = (id: number) => {
    console.log(`حذف الطبيب رقم: ${id}`);
    // كود مبدئي للحذف من الواجهة فقط
    setDoctors(doctors.filter(doc => doc.id !== id));
  };
  
  const handleViewDetails = (id: number) => {
    console.log(`عرض تفاصيل الطبيب رقم: ${id}`);
    // هنا سيتم الانتقال لصفحة التفاصيل لاحقًا
  };

  return (
    <div className="doctors-management-container">
      <header className="page-header">
        <h1>إدارة الأطباء</h1>
        <button className="btn-add" onClick={handleAddDoctor}>
          <span className="plus-icon">+</span> إضافة طبيب جديد
        </button>
      </header>

      <main className="doctors-grid">
        {doctors.map(doctor => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onEdit={handleEditDoctor}
            onDelete={handleDeleteDoctor}
            onViewDetails={handleViewDetails}
          />
        ))}
      </main>
    </div>
  );
};

export default DoctorsManagementPage;