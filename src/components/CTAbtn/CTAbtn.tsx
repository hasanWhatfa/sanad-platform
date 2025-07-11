import './CTAbtn.css'
interface ctaBtnProps{
    text:string;
}

const CTAbtn = ({text} : ctaBtnProps) => {
  return (
    <button className='CTAbtnCmpnt'>
        {text}
    </button>
  )
}

export default CTAbtn
