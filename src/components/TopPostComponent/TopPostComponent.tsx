import './TopPostComponent.css'
import { type Article } from '../../data/atriclesData';
import { Link } from 'react-router-dom';

interface TopPostComponentProps{
    num:number;
    article:Article;
    Goto:string;
}
const TopPostComponent = ({article,num,Goto}:TopPostComponentProps) => {
  return (
    <div className='topPostComponent'>
        <h2>{num}</h2>
        <div className="text">
            <h4><Link to={Goto} >{article.title}</Link></h4>
            <p>{article.description}</p>
        </div>
    </div>
  )
}

export default TopPostComponent

