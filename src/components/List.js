import { Col, ListGroup } from "react-bootstrap";
import Item from "./Item";

function List({ items, checkHandler, deleteHandler }) {
  return (
    <Col lg={6} xs={9}>
      <ListGroup as="ul">
        {items.map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              checkHandler={checkHandler}
              deleteHandler={deleteHandler}
            />
          );
        })}
      </ListGroup>
    </Col>
  );
}

export default List;
