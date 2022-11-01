import React, { useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BsPlusSquare } from "react-icons/bs";

function AddItem({ newItem, setNewItem, submitHandler }) {
  const inputRef = useRef();

  return (
    <Form onSubmit={submitHandler}>
      <InputGroup className="p-1">
        <Form.Label htmlFor="addItem" visuallyHidden>
          Add Item
        </Form.Label>
        <Form.Control
          autoFocus
          ref={inputRef}
          id="addItem"
          placeholder="Add Item"
          aria-label="Add Item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button
          variant="success"
          type="submit "
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <BsPlusSquare style={{ marginBottom: "0.25em" }} />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default AddItem;
