import React from "react";
import "./CategoryAdministrationPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Service from "../components/service/ServiceAdmin";
import Category from "../components/category/CategoryAdmin";
import { Table } from "react-bootstrap";

const baseServiceURL = "http://localhost:3001/api/services";
const baseCategoryURL = "http://localhost:3001/api/categories";

export default function CategoryAdministrationPage() {
  const [services, setServices] = useState([]);
  const [deletedService, setDeletedService] = useState({});

  const [categories, setCategories] = useState([]);
  const [deletedCategory, setDeletedCategory] = useState({});

  useEffect(() => {
    axios
      .get(baseServiceURL)
      .then((response) => setServices(response.data))
      .catch((err) => console.log(err));

    axios
      .get(baseCategoryURL)
      .then((response) => setCategories(response.data))
      .catch((err) => console.log(err));
  }, [deletedService, deletedCategory]);

  let servicesjsx = services.map((service, index) => (
    <Service
      service={service}
      setDeletedService={setDeletedService}
      key={index}
    />
  ));

  let categoriesjsx = categories.map((category, index) => (
    <Category
      category={category}
      setDeletedCategory={setDeletedCategory}
      key={index}
    />
  ));

  return (
    <div className="categoryAdministrationPage">
      <div className="administrationTables">
        <div className="adminTable">
          <Link to="/CreateCategoryPage" className="linkBtn">
            Create Category
          </Link>
          <h1>Category list</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{categoriesjsx}</tbody>
          </Table>
        </div>

        <div className="adminTable">
          <Link to="/CreateServicePage" className="linkBtn">
            Create Service
          </Link>
          <h1>Service list</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{servicesjsx}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
