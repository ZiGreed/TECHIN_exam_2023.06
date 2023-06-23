import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormPages.css";

const baseURL = "http://localhost:3001/api/services";
const categoriesURL = "http://localhost:3001/api/categories";

export default function CreateServicePage() {
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(categoriesURL)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="form">
      <h1>Create new Service</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: 0.0,
          category: "",
          image: null,
        }}
        onSubmit={async (values, { resetForm }) => {
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("description", values.description);
          formData.append("price", values.price);
          formData.append("category", values.category);
          formData.append("image", values.image);

          try {
            const response = await axios.post(baseURL, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });

            console.log(response.data);
            resetForm();
            setSubmitted(true);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          dirty,
        }) => (
          <Form onSubmit={handleSubmit} className="formInputs">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*,.png,.jpg,.gif,.web"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
              />
            </Form.Group>
            <div className="buttons">
              <Button
                variant="primary"
                onClick={() => navigate("/CategoriesAdministrationPage/")}
              >
                Cancel
              </Button>

              <Button variant="secondary" type="submit" disabled={!dirty}>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {submitted && <h6>New Service successfully created!</h6>}
    </div>
  );
}
