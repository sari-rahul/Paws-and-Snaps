import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import styles from "../../styles/ArticleCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefault";
import Upload from "../../assets/upload.jpg";
import Asset from "../../components/Assets";

function BlogCreateForm() {
  const [errors, setErrors] = useState({});

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image: "",
    category:"",
  });
  const { title, content, image ,category} = blogData;

  const imageInput = useRef(null);
  const history = useHistory();
  const quillRef = useRef();

  const handleChange = (event) => {
    setBlogData({
      ...blogData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setBlogData({
        ...blogData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' },
       { 'indent': '-1'}, { 'indent': '+1' }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
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
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={5} lg={4}>
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
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
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

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={7} lg={8} className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                className={styles.quillEditor}
                onChange={handleChange}
                ref={quillRef}
                />
            </Container>
            <div>
                <label htmlFor="category" className={styles.category}>Category:</label>
                <select
                id="category"
                name="category"
                value={category}
                onChange={handleChange}
                required
                >
                <option value="">Select Category</option>
                <option value="wellness">Wellness</option>
                <option value="adoption">Adoption</option>
                <option value="wildlife">Wildlife</option>
                <option value="travel">Travel</option>
                <option value="general">General</option>
                <option value="training">Training</option>
                </select>
            </div>
            <button type="submit" className={styles.Button}>Create</button>
        </Col>
      </Row>
    </Form>
  );
}

export default BlogCreateForm;