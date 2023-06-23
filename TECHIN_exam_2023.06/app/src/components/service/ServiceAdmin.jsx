import { MdEditNote, MdDelete } from "react-icons/md";
import axios from "axios";
import { deleteHandler } from "../../services/deleteHandler";
import { Link } from "react-router-dom";
import "./ServiceAdmin.css";

const baseURL = "http://localhost:3001/api/services/";

function Service({ service, setDeletedService }) {
  function deleteService(id) {
    axios.delete(baseURL + id).then((response) => {
      setDeletedService(response.data);
    });
  }

  return (
    <tr className="serviceTable">
      <td>{service.title}</td>
      <td>{service.category}</td>
      <td>{service.price} €</td>
      <td>{service.description}</td>
      <td>
        {service.image && (
          <img
            src={`./images/${service.image}`}
            alt={service.title}
          />
        )}
      </td>
      <td>
        <Link to={"/EditServicePage/" + service._id} className="button">
          <MdEditNote size={25} color={"#F35932"} />
        </Link>
      </td>
      <td>
        <MdDelete
          size={25}
          color={"#F35932"}
          onClick={() => deleteHandler(service, deleteService)}
          className="button"
        />
      </td>
    </tr>
  );
}

export default Service;
