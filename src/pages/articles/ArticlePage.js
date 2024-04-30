//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Imports from React
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Imports from React Bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Asset from "../../components/Assets";
import { Container } from "react-bootstrap";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Internal Imports 
import { axiosReq } from "../../api/axiosDefault";
import Article from "./Article";
import styles from '../../styles/ArticlePage.module.css'

function ArticlePage() {
    const { id } = useParams()
    const [article,setArticle] = useState({results:[]});
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(()=>{
        const handleMount = async ()=>{
            try{
                const [{data:article}] = await Promise.all([
                    axiosReq.get(`/articles/${id}`)
                ])
                setArticle({results:[article]})
                console.log(article)
                setHasLoaded(true);
            }catch(err){
                console.log(err)
            } 
        };
        handleMount();
    }, [id]);
  return (
    <Container className={styles.Container}>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={12}>
          {hasLoaded ?(
          <Article { ...article.results[0]} articlePage/>
          ):<Asset spinner />}  
        </Col>
      </Row>
    </Container>
  );
}

export default ArticlePage;