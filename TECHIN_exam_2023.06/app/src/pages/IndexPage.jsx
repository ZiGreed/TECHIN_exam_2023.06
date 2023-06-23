import React, { useEffect, useState } from "react";
import Filter from "../components/filter/Filter";

export default function IndexPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/services").then((response) => {
      response.json().then((data) => {
        setServices(data);
      });
    });
  }, []);

  return (
    <>
      {services.length > 0 && (
        <>
          <Filter services={services} />
        </>
      )}
    </>
  );
}
