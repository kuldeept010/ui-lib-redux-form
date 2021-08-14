import React from "react";
import { Field, reduxForm } from "redux-form";
import AutoComplete from "./components/AutoComplete";
import items from "./dataSource";

const required = (value) => (value ? undefined : "Required");

function AutoCompleteForm() {
  return (
    <div className="form">
      <h2>AutoComplete Form - Redux Form</h2>
      <h5 style={{ marginBottom: "0px" }}>Basic Usage</h5>
      <Field
        name="AutoComplete"
        label={"Search"}
        component={AutoComplete}
        placeholder={"Search"}
        items={items}
        validate={[required]}
      />
      <h4>Usage</h4>
      <ul>
        <li>
          Prop <b>items</b> must be available on the field.
        </li>
        <li>
          Each Item must have the key <b>value</b> inside the items array.
        </li>
        <li>
          Redux Form Usage Example: <br />
          <code style={{ fontSize: "14px" }}>
            <pre>
              {`<Field \n  name="AutoComplete"\n  label={"Search"}\n  component={AutoComplete}\n  placeholder={"Search"}\n  items={items}\n  validate={[required]}\n/>`}
            </pre>
          </code>
        </li>
      </ul>
    </div>
  );
}

export default reduxForm({
  form: "autoCompleteForm",
  onSubmit: () => {
    console.log("submitting");
  }
})(AutoCompleteForm);
