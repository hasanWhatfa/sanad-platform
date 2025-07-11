import './TopArariclesComponent.css'
import type { ReactNode } from "react";
import { type Article } from "../../data/atriclesData";
import TopPostComponent from '../TopPostComponent/TopPostComponent';

interface TopArariclesComponentProps{
    heading:string;
    arrayOfObject:Array<Article>;

}
const TopArariclesComponent = ({heading ,arrayOfObject} : TopArariclesComponentProps) => {
  return (
    <div className='TopArariclesComponent'>
        <h3>{heading}</h3>
        <div className="topPostsContainer">
             {arrayOfObject.map((article, index) => (
                <TopPostComponent
                  key={index}
                  num={index + 1}
                  article={article}
                  Goto={`/article/${article.id}`}
                />
              ))}
        </div>
    </div>
  )
}

export default TopArariclesComponent
