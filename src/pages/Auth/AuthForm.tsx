import { useAuthModal } from "../../context/AuthModalContext"
import Login from "./Login"
import Signup from "./Signup"
import { authDataFinal, type AuthData } from "../../data/AuthData"
import './Auth.css'
const AuthForm = () => {
    const {authType} = useAuthModal();
    const formData :AuthData | undefined = authDataFinal.find((dat)=>dat.type == authType);
  return (
    <div className="auth_form">
      <div className="form_side">
        {authType === 'login' ? <Login formData={formData}/> : <Signup formData={formData}/>}
      </div>
    </div>
  )
}

export default AuthForm
