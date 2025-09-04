import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../redux/store"
import { useEffect } from "react";
import { fetchDoctors } from "../../../../redux/slices/DoctorosSliceAdmin";
import './ManageDoctorsPage.css'
import { image_base } from "../../../../data/generalTypes";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const ManageDoctorsPage = () => {
  const {doctors} = useSelector((state : RootState)=>state.doctors);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleEditDoctor = (id:number | undefined)=>{
    navigate(`mainp-doc/edit/${id}`)
  }
  const handleDeleteDoctor = (id:number | undefined)=>{
    const base_url:string = `http://127.0.0.1:8000/api/admin/doctors/${id}/delete`;
    axios.delete(base_url,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
        Accept:"application/json"
      }
    })
    .then((res)=>{
      console.log(res)
      dispatch(fetchDoctors());
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    dispatch(fetchDoctors());
  },[])
  return (
    <main className="manage-doctors-page p60">
      <div className="header">
        <h1 className="title">ادارة الاطباء</h1>
        <button className="add-btn"
        onClick={()=>navigate(`mainp-doc/add`)}>اضافة طبيب</button>
      </div>
      <div className="doctors-grid">
        {
          doctors.map((doc)=>{
            return(
              <div className="doctorCard" key={doc.id}>
                  <div className="img_container">
                      <img src={`${image_base}/${doc.avatar}`}/>
                  </div>
                  <Link to={`doctor-details/${doc.id}`}>
                    <h3>{doc.first_name + " " + doc.last_name}</h3>
                  </Link>
                  <p>{doc.specialization}</p>
                  <div className="btn_container">
                    <button className="delete-doctor" onClick={()=>handleDeleteDoctor(doc.id)}>
                      <BiTrash />
                    </button>
                    <button className="edit-doctor" onClick={()=>handleEditDoctor(doc.id)}>
                      <BiEdit />
                    </button>
                  </div>
              </div>
            )
          })
        }
      </div>
    </main>
  )
}

export default ManageDoctorsPage
