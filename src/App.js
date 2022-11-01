import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  const URL = "http://localhost:4000/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) throw Error("Did not receive expected data");
        const data = await res.json();
        setItems(data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  // Add Item
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  };

  // Check Item
  const checkHandler = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  // Delete Item
  const deleteHandler = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
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
      <>
        {isLoading && <p className="text-center">Items are loading...</p>}
        {fetchError && (
          <h4 className="text-center mt-5 text-danger">
            {`Error: ${fetchError}`}
          </h4>
        )}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            setItems={setItems}
            checkHandler={checkHandler}
            deleteHandler={deleteHandler}
            error={fetchError}
          />
        )}
      </>
      <Footer items={items} />
    </>
  );
}

export default App;
