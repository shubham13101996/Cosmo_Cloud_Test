import React, { useState, useEffect } from "react";
import "./style.css";

// get the localStorage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mylist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const App = () => {
  //  hooks
  const [inputdata, setInputData] = useState("");
  const [selectedOption, setSelectedOption] = useState("Object");

  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function
  const addItem = (option) => {
    if (!inputdata) {
      alert("**Please Add The Field**");
    } else if (inputdata && toggleButton && option) {
      // console.log(option);
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata, option };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      // fill all the prev item using spread operator and set new item also
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
        option: selectedOption,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  // edit item by finding them with help of id
  const editItem = (index) => {
    const item_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_edited.name);
    setSelectedOption(item_edited.option);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // remove particular item using filter function with help of unique identifier that is id
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // here we store the item state in local storage basically we want when there
  // is change in item state data automatically store in local storage
  // aur jaha Automatic kaam aye waha "useEffect" ka use hoga
  useEffect(() => {
    localStorage.setItem("mylist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="                Add Field"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            <div>
              <select
                id="dropdown"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="Object">Object</option>
                <option value="String">String</option>
                <option value="Number">Number</option>
                <option value="Boolean">Boolean</option>
              </select>
            </div>
            <div id="toggle">
              {toggleButton ? (
                <i
                  className=" fa-regular fa-floppy-disk add-btn"
                  // far fa-edit
                  onClick={() => addItem(selectedOption)}
                ></i>
              ) : (
                <i
                  className="fa fa-plus add-btn"
                  onClick={() => addItem(selectedOption)}
                ></i>
              )}
            </div>
          </div>
          {/* show our items  */}
          <div className="showItems">
            {/* here loop over the items state to show each item  */}

            {items.map((curElem) => {
              return (
                //  remember to pass key to div
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <h3 id="selected">{curElem.option}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
