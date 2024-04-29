import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefault";
import Article from "./Article";

function ArticlePage() {
    const { id } = useParams()
    const [article,setArticle] = useState({results:[]});

    useEffect(()=>{
        const handleMount = async ()=>{
            try{
                const [{data:article}] = await Promise.all([
                    axiosReq.get(`/articles/${id}`)
                ])
                setArticle({results:[article]})
                console.log(article)

            }catch(err){
                console.log(err)
            } 
        };
        handleMount();
    }, [id]);
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <Article { ...article.results[0]}/>  
      </Col>
    </Row>
  );
}

export default ArticlePage;