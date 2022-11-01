import { Form, InputGroup } from "react-bootstrap";

function Search({ search, setSearch }) {
  return (
    <InputGroup className="p-1">
      <Form.Label htmlFor="search" visuallyHidden>
        Search for an Item
      </Form.Label>
      <Form.Control
        id="search"
        placeholder="Search Items"
        aria-label="Search"
        role="searchbox"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </InputGroup>
  );
}

export default Search;
