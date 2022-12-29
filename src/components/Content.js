import { Container } from "react-bootstrap";
import { List } from "./List";

function Content({ items, setItems, checkHandler, deleteHandler, error }) {
  return (
    <Container className="d-flex p-3 mt-4 justify-content-center">
      {items.length ? (
        <List
          items={items}
          setItems={setItems}
          checkHandler={checkHandler}
          deleteHandler={deleteHandler}
        />
      ) : (
        <h3 className="text-center mt-5">No Items to Show</h3>
      )}
    </Container>
  );
}

export default Content;
