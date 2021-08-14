import React, { useEffect, useState } from "react";
import "./styles.scss";

export default function Input(props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.value) {
      setValue(props.value.toString());
    }
  }, [props.value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    props.onChange(e.target.value.toString());
  };

  const handleKeyDown = (e) => {
    e.persist();
    props.onKeyDown(e);
  };

  return (
    <div className="ui-input-outer-wrapper">
      <div className="ui-label">
        <label>{props.label}</label>
      </div>
      <div className="ui-input" onFocus={props.onFocus}>
        <div className="ui-input-wrapper">
          <input
            className="ui-input-field"
            value={value}
            onKeyDown={handleKeyDown}
            placeholder={props.placeholder}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
