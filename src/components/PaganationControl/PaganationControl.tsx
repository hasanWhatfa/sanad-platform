import type { Dispatch, ReactNode, SetStateAction } from "react";
import './PaganationControl.css'
interface PaganationControlProps{
    onClick : ()=>void;
    className:string;
    currentIndex?:number;
    setCurrentIndex?:Dispatch<SetStateAction<number>>;
    children:ReactNode;
}
const PaganationControl = ({onClick,className,currentIndex,setCurrentIndex,children} : PaganationControlProps) => {
  return (
    <button className={`${className} paganationControl`} onClick={onClick} >
      {children}
    </button>
  )
}

export default PaganationControl
