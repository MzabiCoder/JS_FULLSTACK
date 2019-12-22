import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get_posts } from '../../action/post'
import Spinner from '../layouts/Spinner'
import PostItem from './PostItem'

const Posts = ({get_posts,post:{posts,loading}}) => {
    useEffect(() => {
        get_posts()
    },[get_posts])
    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
            <i className="fas fa-user"></i>Welcom ro the community
            </p>
            <div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post}/>
            ))}
            </div>
        
        </Fragment>
    )
}

Posts.propTypes = {
    get_posts: PropTypes.func.isRequired,
    post:PropTypes.object.isRequired
}

const map = state => ({
    post:state.post
})

export default connect(map,{get_posts})(Posts)
