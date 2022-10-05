import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from './NotFoundPage';
import CommentsList from '../components/CommentsList';
import articles from './article-content';


const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };
    
    loadArticleInfo();
  }, []);

  const article = articles.find(article=>article.name === articleId);
  if(!article) {
    return <NotFoundPage />
  }
  console.log(articleInfo.comments);
  return(
    <>
    <h1>{article.title}</h1>
    <p> This is a test {articleInfo.upvotes} upvote(s) </p>
    {article.content.map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ))}
    <CommentsList comments={articleInfo.comments} />
    </>
  );
}

export default ArticlePage;