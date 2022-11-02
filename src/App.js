import { useEffect, useState } from "react";
import apiRequest from "./apiRequest";
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
  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json ",
      },
      body: JSON.stringify(myNewItem),
    };

    const result = await apiRequest(URL, postOptions);
    if (result) setIsLoading(result);
  };

  // Check Item
  const checkHandler = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const theItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: theItem[0].checked }),
    };

    const reqUrl = `${URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  // Delete Item
  const deleteHandler = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: "DELETE" };

    const reqUrl = `${URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
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
