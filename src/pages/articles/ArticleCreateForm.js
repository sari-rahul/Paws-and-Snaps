import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import styles from '../../styles/ArticleCreateEditForm.module.css'
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (html) => {
    setContent(html);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'], // Include image button in toolbar
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, content });
    // Reset form fields after submission
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="content" >Content:</label>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          className={styles.quillEditor}
          onChange={handleContentChange}
        />
      </div>
      <button type="submit" className={styles.Button}>Create</button>
    </form>
  );
};

export default BlogForm;