import React from 'react';
import PropTypes from 'prop-types';


const CommentsList = ({list, commentsId, handleClickLike}) => {  
  return (
    <div>
      {
        commentsId.map(id => (
            <div className='commentField' key={id}>
                <div dangerouslySetInnerHTML={{__html: list[id].commentText }} />
                <div className='commentInfo'>
                    <span>created by {list[id].name}</span>
                    <span
                        className='likeField'
                        onClick={handleClickLike(list[id].id)}
                    >&nbsp;{list[id].likes}</span>
                </div>
                <div className='commentDivider' />
                {
                    list[id].replies && !!list[id].replies.length &&
                    <CommentsList
                        list={list}
                        commentsId={list[id].replies}
                        handleClickLike={handleClickLike}
                    />
                }
            </div>
        ))
      }      
    </div>
  );
};

CommentsList.propTypes = {
    list: PropTypes.object.isRequired,
    commentsId: PropTypes.array.isRequired,
    handleClickLike: PropTypes.func
};

export default CommentsList;