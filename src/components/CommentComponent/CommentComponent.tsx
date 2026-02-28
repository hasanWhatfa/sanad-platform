import type { RateResponse } from '../../data/generalTypes'
import './CommentComponent.css'
interface CommentProps{
    review:RateResponse;
}
const CommentComponent = ({review} : CommentProps) => {
  return (
    <div className='comment-container'>
        <div className="comment-header">
            <img src={`${review.patient.avatar}`} alt="User Image" />
            <h3>{review.patient.first_name + " " + review.patient.last_name}</h3>
        </div>
        <p>{review.comment}</p>
    </div>
  )
}

export default CommentComponent
