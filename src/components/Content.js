import { Container } from "react-bootstrap";
import List from "./List";

function Content({ items, setItems, checkHandler, deleteHandler }) {
  return (
    <Container className="p-5">
      <List
        items={items}
        setItems={setItems}
        checkHandler={checkHandler}
        deleteHandler={deleteHandler}
      />
    </Container>
  );
}

export default Content;
