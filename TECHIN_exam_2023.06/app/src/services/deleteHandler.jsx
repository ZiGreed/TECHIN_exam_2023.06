import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "./react-confirm-alert.css";

export let deleteHandler = (item, deleteFunction) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="react-confirm-alert-body">
          <h1>Are you sure?</h1>
          <p>{`You want to delete ${item.title}, id: ${item._id} ?`}</p>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              deleteFunction(item._id);
              onClose();
            }}
          >
            Delete!
          </Button>
        </div>
      );
    },
  });
};
