import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormPages.css";

let baseURL = "http://localhost:3001/api/categories";

export default function CreateCategoryPage() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="form">
      <h1>Create new Category</h1>
      <Formik
        initialValues={{
          title: "",
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          axios
            .post(baseURL, values)
            .then((response) => console.log(response.data));
          resetForm();
          setSubmitted(true);
        }}
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
      {submitted && <h6>New Category successfuly created!</h6>}
    </div>
  );
}
