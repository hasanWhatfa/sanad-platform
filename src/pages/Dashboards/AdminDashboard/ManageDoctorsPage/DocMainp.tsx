import { useState, useEffect,type ChangeEvent,type FormEvent } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { RootState } from "../../../../redux/store";
import {image_base, type DoctorMainType } from "../../../../data/generalTypes";
import './DocManip.css';
import axios from "axios";

const DocMainp = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);
    const [submiting,setSumbmiting] = useState<boolean>(false);

    const { doctors } = useSelector((state: RootState) => state.doctors);
    
    const doctor = isEditing 
        ? doctors.find((doc: DoctorMainType) => doc.id === Number(id))
        : null;

    // ✅ أضفنا phone_number و password للفورم داتا
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',     // NEW
        specialization: '',
        achievements: '',
        password: '' ,         // NEW (يُستخدم فقط عند الإضافة)
        password_confirmation:'',
    });
    // const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (isEditing && doctor) {
            setFormData({
                first_name: doctor.first_name || '',
                last_name: doctor.last_name || '',
                email: doctor.email || '',
                phone_number: doctor.phone_number || '', // ✅ تعبئة الهاتف عند التعديل
                specialization: doctor.specialization || '',
                achievements: doctor.achievements || '',
                password: '', // عند التعديل ما منعرض/منرسل باسوورد,
                password_confirmation:''
            });
            setImagePreview(`${image_base}/${doctor.avatar}` || null);
        }
    }, [isEditing, doctor]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        if (!isEditing && formData.password !== formData.password_confirmation) {
            setError("كلمة المرور وتأكيد كلمة المرور غير متطابقين");
            return;
        }
        setError("");
        e.preventDefault();
        const submissionData = new FormData();

        // نضيف كل حقول الفورم كما هي
        Object.entries(formData).forEach(([key, value]) => {
            submissionData.append(key, value);
        });

        // ✅ لا ترسل كلمة السر أثناء التعديل
        if (isEditing) {
            submissionData.delete('password');
        }

        if (imageFile) {
            submissionData.append('avatar', imageFile);
        }

        if (isEditing) {
            setSumbmiting(true);
            axios.post(`http://127.0.0.1:8000/api/admin/doctors/${doctor?.id}/update`, submissionData, {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                    Accept:"application/json"
                }
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
            .finally(()=>{
                setSumbmiting(false);
            })
        } else {
            // ✅ إضافة طبيب: هنا الباسوورد مطلوب، وموجود داخل submissionData
            setSumbmiting(true);
            axios.post('http://127.0.0.1:8000/api/admin/doctors/add', submissionData, {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`,
                    Accept:"application/json"
                }
            })
            .then((res)=>{
                console.log(res);
                navigate('/admin-dash/manage-doctors');
            })
            .catch((err)=>{
                console.log(err);
            })
            .finally(()=>{
                setSumbmiting(false)
            })
        }
    };

    return (
        <main className="doc-manipulate">
            <div className="doc-mani-header">
                <h2>
                    {isEditing ? `تعديل بيانات الطبيب: ${doctor?.first_name || ''} ${doctor?.last_name || ''}` : 'إضافة طبيب جديد'}
                </h2>
            </div>

            <form className="doc-form" onSubmit={handleSubmit}>
                <div className="form-layout">
                    {/* Image Section */}
                    <div className="image-section">
                        <div className="image-preview">
                            {imagePreview ? (
                                <img src={imagePreview} alt="صورة الطبيب" />
                            ) : (
                                <div className="image-placeholder">
                                    <span>اختر صورة</span>
                                </div>
                            )}
                        </div>
                        <label htmlFor="image-upload" className="image-upload-label">
                            {isEditing ? 'تغيير الصورة' : 'تحميل صورة'}
                        </label>
                        <input 
                            id="image-upload" 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                        />
                    </div>

                    {/* Fields Section */}
                    <div className="fields-section">
                        <div className="form-group-row">
                            <div className="form-group">
                                <label htmlFor="first_name">الاسم الأول</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="مثال: أحمد"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">الاسم الأخير</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="مثال: المصري"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">البريد الإلكتروني</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@domain.com"
                                required
                            />
                        </div>

                        {/* ✅ رقم الهاتف */}
                        <div className="form-group">
                            <label htmlFor="phone_number">رقم الهاتف</label>
                            <input
                                type="tel"
                                id="phone_number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                placeholder="مثال: 0591234567"
                                required
                            />
                        </div>

                        {/* ✅ كلمة المرور — تظهر فقط عند الإضافة */}
                        {!isEditing && (
                            <>
                                <div className="form-group">
                                    <label htmlFor="password">كلمة المرور</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="اكتب كلمة مرور قوية..."
                                        required
                                    />
                                </div>

                                {/* ✅ تأكيد كلمة المرور */}
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">تأكيد كلمة المرور</label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="أعد كتابة كلمة المرور"
                                    required
                                />
                                </div>

                                {/* ✅ رسالة خطأ لو مش متطابقين */}
                                {error && <p style={{ color: "red" }}>{error}</p>}
                            </>
                        )}

                        <div className="form-group">
                            <label htmlFor="specialization">التخصص</label>
                            <input
                                type="text"
                                id="specialization"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                placeholder="مثال: طب الأطفال"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="achievements">الإنجازات والخبرات</label>
                            <textarea
                                id="achievements"
                                name="achievements"
                                value={formData.achievements}
                                onChange={handleChange}
                                placeholder="اكتب انجازات الطبيب وخبراتة, افصل بين كل انجاز والاخر باستخدام فاصلة."
                                rows={4}
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-btn" disabled={submiting}>
                        {submiting ? 
                            'جاري التحديث' 
                            : 
                            isEditing ? 'حفظ التعديلات' : 'إضافة الطبيب'
                        }
                    </button>
                </div>
            </form>
        </main>
    );
}

export default DocMainp;
