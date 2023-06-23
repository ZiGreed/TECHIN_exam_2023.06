import { MdEditNote, MdDelete } from "react-icons/md";
import axios from "axios";
import { deleteHandler } from "../../services/deleteHandler";
import { Link } from "react-router-dom";

const baseURL = "http://localhost:3001/api/categories/";

function Category({ category, setDeletedCategory }) {
  
  function deleteCategory(id) {
    axios.delete(baseURL + id).then((response) => {
      setDeletedCategory(response.data);
    });
  }

  return (
    <tr>
      <td>{category.title}</td>
      <td>
        <Link to={"/EditCategoryPage/" + category._id} className="button">
          {" "}
          <MdEditNote size={25} color={"#F35932"} />
        </Link>
      </td>
      <td>
        <MdDelete
          size={25}
          color={"#F35932"}
          onClick={() => deleteHandler(category, deleteCategory)}
          className="button"
        />
      </td>
    </tr>
  );
}

export default Category;
