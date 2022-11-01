import { Container, ListGroup } from "react-bootstrap";
import Item from "./Item";

function List({ items, checkHandler, deleteHandler }) {
  return (
    <Container className="p-4">
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
    </Container>
  );
}

export default List;
