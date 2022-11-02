import { Form, ListGroup } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";

function Item({ item, checkHandler, deleteHandler }) {
  return (
    <ListGroup.Item
      action
      variant="secondary"
      as="li"
      className="d-inline-flex"
      onDoubleClick={() => checkHandler(item.id)}
    >
      <Form.Check
        type="checkbox"
        checked={item.checked}
        value={item.checked}
        onChange={() => checkHandler(item.id)}
      />
      <span
        className="mx-3"
        style={item.checked ? { textDecoration: "line-through" } : null}
      >
        {item.item}
      </span>
      <BsFillTrashFill
        role="button"
        className="delete-icon"
        onClick={() => deleteHandler(item.id)}
      />
    </ListGroup.Item>
  );
}

export default Item;
