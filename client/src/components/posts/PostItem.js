import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import {addlike,removelike} from '../../action/post'

const PostItem = ({addlike,removelike,auth,post:{_id,name,text,user,likes,comments,date,avatar}}) => {
    return <div class="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img
          class="round-img"
        src={avatar}
          alt=""
        />
    <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p class="my-1">
       {text}
      </p>
       <p class="post-date">
         Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
      </p>
      <button type="button" class="btn btn-light" onClick={e=>addlike(_id)}>
        <i class="fas fa-thumbs-up"></i>
                <span>
                    {likes.length > 0 && (
                 <span>{likes.length}</span>
                )}
                </span>
      </button>
      <button type="button" class="btn btn-light" onClick={e=>removelike(_id)}>
        <i class="fas fa-thumbs-down"></i>
      </button>
      <Link to={`/post/${_id}`} class="btn btn-primary">
                Discussion {comments.length > 0 && (
             <span class='comment-count'>{comments.length}</span>

        )}
            </Link>
            {!auth.loading && auth.user_id === user && (
                <button      
                type="button"
                class="btn btn-danger"
              >
                <i class="fas fa-times"></i>
              </button>    
      )}      
     
    </div>
  </div>
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired
}

const map = state => ({
    auth: state.auth,
    //post:state.post
   
})

export default connect(map,{addlike,removelike})(PostItem)
