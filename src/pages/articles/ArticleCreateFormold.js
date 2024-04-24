import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from '../../styles/ArticleCreateEditForm.module.css';
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefault";


function BlogForm() {
  const [errors, setErrors] = useState({});
  const [blogData, setBlogData] = useState({
    title: "",
    article: "",
    category: "",
  });
  const { title, article, category ,image} = blogData;
  const history = useHistory();
  const quillRef = useRef();
  const imageInput = useRef(null);

  const handleChange = (event) => {
    setBlogData({
      ...blogData,
      [event.target.name]: event.target.value,
    });
  };

  const handleArticleChange = (value) => {
    setBlogData({
      ...blogData,
      article: value,
    });
  };
  
  // eslint-disable-next-line
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axiosReq.post("/upload/image", formData);
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' },
       { 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
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
    formData.append("article", article);
    formData.append("category", category);

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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className={styles.title}>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="content" className={styles.content}>Content:</label>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={article}
          className={styles.quillEditor}
          onChange={handleArticleChange}
          ref={quillRef}
        />
      </div>
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
    </form>
  );
};

export default BlogForm;