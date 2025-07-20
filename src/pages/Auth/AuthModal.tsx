import { createPortal } from "react-dom";
import { useAuthModal } from "../../context/AuthModalContext";
import AuthForm from "./AuthForm";
import "./Auth.css";
import { useEffect } from "react";

const AuthModal = () => {
  const { authType, closeModal } = useAuthModal();

  useEffect(() => {
    if (authType) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [authType]);

  return createPortal(
    authType ? (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
          <AuthForm />
        </div>
      </div>
    ) : null,
    document.body
  );
};

export default AuthModal;
