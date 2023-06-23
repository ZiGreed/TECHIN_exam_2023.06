import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./FormPages.css";

let baseURL = "http://localhost:3001/api/categories/";

function EditCategory() {
  let { id } = useParams();

  const [activeCategory, setActiveCategory] = useState({
    title: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseURL + id)
      .then((response) => setActiveCategory(response.data))
      .catch((err) => console.log(err.message));
  }, [id]);

  return (
    <div  className="form">
      <h1>Edit Category</h1>
      <Formik
        initialValues={activeCategory}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          axios
            .patch(baseURL + id, values)
            .then((response) => console.log(response.data));
          navigate("/CategoryAdministrationPage");
        }}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, handleSubmit, dirty }) => (
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

export default EditCategory;
