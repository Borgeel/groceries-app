import { useState } from "react";
import AddItem from "./components/AddItem";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("grocerieslist"))
  );
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  // Set and Save
  const setAndSave = (newItems) => {
    setItems(newItems);
    localStorage.setItem("grocerieslist", JSON.stringify(newItems));
  };

  // Add Item
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSave(listItems);
  };

  // Check Item
  const checkHandler = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setAndSave(listItems);
  };

  // Delete Item
  const deleteHandler = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSave(listItems);
  };

  // Submit Handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <>
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        submitHandler={submitHandler}
      />
      <Search search={search} setSearch={setSearch} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        setItems={setItems}
        checkHandler={checkHandler}
        deleteHandler={deleteHandler}
      />
      <Footer items={items} />
    </>
  );
}

export default App;
