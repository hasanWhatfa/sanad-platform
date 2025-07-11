import './DropDownMenu.css'
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface DropDownProps {
  links: DropDownLink[];
  label: string;
}

export interface DropDownLink {
  linkText: string;
  linkTo: string;
}

const DropDownMenu = ({ links, label }: DropDownProps) => {
  return (
    <div className="DropDown">
      <div className="dropDown_title">
        <p>{label}</p>
        <IoIosArrowDown />
      </div>
      <div className="DropDownLinks">
        {links.map((item, index) => (
          <Link to={`test/${item.linkTo}`} key={index} className="dropdown-item">
            <MdOutlineKeyboardDoubleArrowLeft />
            {item.linkText}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropDownMenu;
