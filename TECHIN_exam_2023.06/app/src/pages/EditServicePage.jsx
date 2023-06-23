import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./FormPages.css";

let baseURL = "http://localhost:3001/api/services/";
const categoriesURL = "http://localhost:3001/api/categories";

function EditService() {
  let { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [activeService, setActiveService] = useState({
    title: "",
    description: "",
    price: 0.00,
    category: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseURL + id)
      .then((response) => setActiveService(response.data))
      .catch((err) => console.log(err.message));
  }, [id]);

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
      <h1>Edit Service</h1>
      <Formik
        initialValues={activeService}
        onSubmit={(values, { resetForm, setFieldValue }) => {
          console.log(values);
          axios
            .patch(baseURL + id, values)
            .then((response) => console.log(response.data));
          navigate("/CategoryAdministrationPage");
        }}
        enableReinitialize
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          dirty,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}
          className="formInputs">
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
                  <option key={category._id} value={category._id}>
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
                  handleChange(event);
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => navigate("/CategoryAdministrationPage/")}
            >
              Cancel
            </Button>

            <Button variant="secondary" type="submit" disabled={!dirty}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditService;
