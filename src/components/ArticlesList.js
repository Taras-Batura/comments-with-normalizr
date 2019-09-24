import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CommentsList from './CommentsList';
import { getArticlesList, clickLike } from '../reducers/articles/actions';
import { getNormalizeDate } from '../helpers';



const ArticlesList = ({
  actions,
  comments,
  article,
}) => {
  React.useEffect(() => {
    actions.getArticlesList()    
  }, [])

  const handleClickLike = React.useCallback(id => () =>     
    actions.clickLike(id)
  )

  const { entities, result } = comments;

  if (!article.id) {
    return null
  }

  return (
    <section className='pageWrapper'>
        <div>
            <h2>{article.title}</h2>
            <section dangerouslySetInnerHTML={{__html: article.text }} />
            <div>{getNormalizeDate(article.date)}</div>
        </div>
        <h4>Comments: </h4>
        {
            result && result.length &&
            <CommentsList
                list={entities.replies}
                commentsId={result}
                handleClickLike={handleClickLike}
            />
        }
    </section>
  )
}


ArticlesList.propTypes = {
    actions: PropTypes.shape({
        getArticlesList: PropTypes.func.isRequired,
    }).isRequired,
    article: PropTypes.object.isRequired,
    comments: PropTypes.object
};

const mapStateToProps = state => ({
  article: state.articlesList.articles,
  comments: state.articlesList.comments
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        getArticlesList,
        clickLike
    }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlesList)