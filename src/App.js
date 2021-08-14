import React, { useState } from "react";
import AutoComplete from "./components/AutoComplete";
import items from "./dataSource";
import ReduxForm from "./ReduxForm";
import "./styles.css";
import "./variables.scss";

export default function App() {
  const [selected, setSelected] = useState(items[0]);

  const handleChange = (v) => {
    setSelected(v);
    console.log(v);
  };

  return (
    <div className="App">
      <br />
      <br /> <br />
      <br /> <br />
      <br /> <br />
      <br /> <br />
      <br /> <br />
      <br /> <br />
      <br /> <br />
      <br /> <br />
      <br />
      <ReduxForm />
      <br />
      <br />
      <AutoComplete
        items={items}
        value={selected}
        placeholder="Search List"
        onChange={handleChange}
      />
      <p>
        Selected Value:{" "}
        {selected && selected.value !== undefined ? selected.value : selected}
      </p>
    </div>
  );
}
