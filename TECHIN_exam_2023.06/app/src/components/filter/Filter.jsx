import React, { useState } from "react";
import Service from "./../service/Service";
import "./Filter.css"

function Filter({ services }) {
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleCategoryFilter = (event) => {
    setCategoryFilter(event.target.value);
  };

  const filteredServices = services.filter((service) => {
    return !categoryFilter || service.category === categoryFilter;
  });

  const uniqueCategories = [...new Set(services.map((service) => service.category))];

  return (
    <div className="filterDiv">
      <div className="filter">
        <label htmlFor="categoryFilter">Categories:</label>
        <select
          id="categoryFilter"
          value={categoryFilter}
          onChange={handleCategoryFilter}
        >
          <option value="">All</option>
          {uniqueCategories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Service services={filteredServices} />
    </div>
  );
}

export default Filter;
