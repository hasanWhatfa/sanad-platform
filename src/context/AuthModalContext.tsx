import { createContext, useContext, useState,type ReactNode } from "react";

type AuthType = 'login' | 'signup' | null;

interface AuthModalContextProps {
  authType: AuthType;
  openModal: (type: AuthType) => void;
  closeModal: () => void;
  switchModals: ()=>void; 
}

const AuthModalContext = createContext<AuthModalContextProps | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [authType, setAuthType] = useState<AuthType>(null);
  const openModal = (type: AuthType) => setAuthType(type);
  const closeModal = () => setAuthType(null);
  const switchModals = ()=>setAuthType((prev)=> prev == "login" ? 'signup' : 'login')
  return (
    <AuthModalContext.Provider value={{ authType, openModal, closeModal ,switchModals }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be inside AuthModalProvider");
  return ctx;
};
