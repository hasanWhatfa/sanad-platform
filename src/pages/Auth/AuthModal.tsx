import { createPortal } from "react-dom";
import { useAuthModal } from "../../context/AuthModalContext";
import AuthForm from "./AuthForm";
import "./Auth.css";
import { useEffect, useState } from "react";

const AuthModal = () => {
  const { authType, closeModal } = useAuthModal();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.getElementById("custom-portal-root");
    setPortalContainer(container);
  }, []);

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

  if (!portalContainer) return null;

  return createPortal(
    authType ? (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
          <AuthForm />
        </div>
      </div>
    ) : null,
    portalContainer
  );
};

export default AuthModal;
