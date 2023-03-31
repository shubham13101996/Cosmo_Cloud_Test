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
  const [options, setOptions] = useState("");

  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function
  const addItem = (option) => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton && option) {
      console.log(option);
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata, option };
          }
          return curElem;
        })
      );

      // setOptions(option);
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
  const editItem = (index, editoption) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setSelectedOption(item_todo_edited.option);
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
                  className="far fa-edit add-btn"
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
                      onClick={() => editItem(curElem.id, curElem.option)}
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

// create a code for user input with dropdown menu using react

// import React, { useState } from "react";

// function DropdownMenu() {
//   const [selectedOption, setSelectedOption] = useState("Option 1");

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   return (
//     <div>
//       <label htmlFor="dropdown">Select an option:</label>
//       <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
//         <option value="Option 1">Option 1</option>
//         <option value="Option 2">Option 2</option>
//         <option value="Option 3">Option 3</option>
//       </select>
//       <p>You selected: {selectedOption}</p>
//     </div>
//   );
// }

// export default DropdownMenu;

// import React from "react";
// import DropdownMenu from "./DropdownMenu";

// function App() {
//   return (
//     <div>
//       <DropdownMenu />
//     </div>
//   );
// }

// export default App;

// <-----====================------->
// import React, { useState } from 'react';

// function DropdownMenu() {
//   const [selectedOption, setSelectedOption] = useState("");

//   function handleOptionChange(event) {
//     setSelectedOption(event.target.value);
//   }

//   return (
//     <div>
//       <label htmlFor="dropdown">Select an option:</label>
//       <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
//         <option value="">--Please choose an option--</option>
//         <option value="option1">Option 1</option>
//         <option value="option2">Option 2</option>
//         <option value="option3">Option 3</option>
//       </select>
//       <p>You selected: {selectedOption}</p>
//     </div>
//   );
// }

// export default DropdownMenu;

// import React from 'react';
// import DropdownMenu from './DropdownMenu';

// function App() {
//   return (
//     <div>
//       <h1>My App</h1>
//       <DropdownMenu />
//     </div>
//   );
// }

// export default App;

// <<------------------=======================--------------------->>
// import React, { useState } from 'react';

// function Field({ name, type, onChange, onDelete, onAddNestedField, nestedFields }) {
//   const [fieldName, setFieldName] = useState(name);
//   const [fieldType, setFieldType] = useState(type);

//   function handleFieldNameChange(event) {
//     setFieldName(event.target.value);
//     onChange(name, event.target.value, fieldType);
//   }

//   function handleFieldTypeChange(event) {
//     setFieldType(event.target.value);
//     onChange(name, fieldName, event.target.value);
//   }

//   function handleDeleteClick() {
//     onDelete(name);
//   }

//   function handleAddNestedFieldClick() {
//     onAddNestedField(name);
//   }

//   return (
//     <div>
//       <input type="text" value={fieldName} onChange={handleFieldNameChange} />
//       <select value={fieldType} onChange={handleFieldTypeChange}>
//         <option value="string">String</option>
//         <option value="number">Number</option>
//         <option value="boolean">Boolean</option>
//         <option value="object">Object</option>
//       </select>
//       {type === "object" && (
//         <button onClick={handleAddNestedFieldClick}>Add Nested Field</button>
//       )}
//       <button onClick={handleDeleteClick}>Delete</button>
//       {type === "object" && nestedFields.map((nestedField) => (
//         <div key={nestedField.name} style={{ marginLeft: 20 }}>
//           <Field {...nestedField} onChange={onChange} onDelete={onDelete} onAddNestedField={onAddNestedField} />
//         </div>
//       ))}
//     </div>
//   );
// }

// function InterfaceEditor({ fields, onSave }) {
//   const [fieldsData, setFieldsData] = useState(fields);

//   function handleFieldChange(name, newName, newType) {
//     setFieldsData((prevState) =>
//       prevState.map((field) =>
//         field.name === name ? { ...field, name: newName, type: newType } : field
//       )
//     );
//   }

//   function handleFieldDelete(name) {
//     setFieldsData((prevState) => prevState.filter((field) => field.name !== name));
//   }

//   function handleAddFieldClick() {
//     setFieldsData((prevState) => [
//       ...prevState,
//       {
//         name: "",
//         type: "string",
//         nestedFields: [],
//       },
//     ]);
//   }

//   function handleAddNestedField(name) {
//     setFieldsData((prevState) =>
//       prevState.map((field) =>
//         field.name === name
//           ? {
//               ...field,
//               type: "object",
//               nestedFields: [
//                 ...field.nestedFields,
//                 {
//                   name: "",
//                   type: "string",
//                   nestedFields: [],
//                 },
//               ],
//             }
//           : field
//       )
//     );
//   }

//   function handleSaveClick() {
//     console.log(fieldsData);
//     onSave(fieldsData);
//   }

//   return (
//     <div>
//       {fieldsData.map((field) => (
//         <div key={field.name}>
//           <Field {...field} onChange={handleFieldChange} onDelete={handleFieldDelete} onAddNestedField={handleAddNestedField} />
//         </div>
//       ))}
//       <button onClick={handleAddFieldClick}>Add Field</button>
//       <button onClick={handleSaveClick}>Save</button>
//     </div>
//   );
// }

// export default InterfaceEditor;
