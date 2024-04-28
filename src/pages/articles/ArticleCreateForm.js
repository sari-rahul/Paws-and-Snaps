import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Asset from "../../components/Assets";
import Upload from "../../assets/upload.png";
import styles from "../../styles/ArticleCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefault";

function ArticleCreateForm() {
  const [errors, setErrors] = useState({});
  const [articleData, setArticleData] = useState({
    title: "",
    article: "",
    image: "",
  });
  const { title, article, image } = articleData;
  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setArticleData({
        ...articleData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleArticleChange = (value) => {
    setArticleData({
      ...articleData,
      article: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("article", article);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/articles/", formData);
      history.push(`/articles/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label className={styles.label}>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          className={styles.Title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label className={styles.label}>Content</Form.Label>
        <ReactQuill
          theme="snow"
          value={article}
          className={styles.quillEditor}
          onChange={handleArticleChange}
        />
      </Form.Group>
      {errors?.article?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${styles.Button} ${btnStyles.Button} `}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${styles.Button}`} type="submit">
        Create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${styles.Button}`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Container>
          <Container className={appStyles.Content}>{textFields}</Container>
      </Row>
    </Form>
  );
}

export default ArticleCreateForm;
