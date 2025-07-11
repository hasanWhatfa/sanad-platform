import './CommentComponent.css'
interface CommentProps{
    review:{
        userName:string;
        userImage:string;
        comment:string;
    }
}
const CommentComponent = ({review} : CommentProps) => {
  return (
    <div className='comment-container'>
        <div className="comment-header">
            <img src={review.userImage} alt="User Image" />
            <h3>{review.userName}</h3>
        </div>
        <p>{review.comment}</p>
    </div>
  )
}

export default CommentComponent
