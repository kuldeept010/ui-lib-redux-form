import React from "react";
import { Field, reduxForm } from "redux-form";
import AutoComplete from "./components/AutoComplete";
import items from "./dataSource";

const required = (value) => (value  ? undefined : "Required");

function ReduxForm(props) {
  return (
    <div className="form">
      <h2>Form</h2>
      <Field
        name="AutoComplete"
        label={"Search Site"}
        component={AutoComplete}
        placeholder={"Search Site"}
        items={items}
        validate={required}
      />
      <Field
        name="name"
        type="text"
        component="input"
        validate={required}
        onFocus={(e) => console.log(e.target.value)}
      />
    </div>
  );
}

export default reduxForm({
  form: "reduxForm",
  initialValues: { AutoComplete: {} }
})(ReduxForm);
