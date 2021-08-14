import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import Input from "../Input";

export default function AutoComplete(props) {
  const [dropdownItems, setDropdownItems] = useState(props.items);
  const [value, setValue] = useState();
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    setDropdownItems(props.items);
    if (props.input && props.input.value !== undefined) {
      setValue(props.input.value.value);
      setSelected(props.input.value);
      let search = "";
      if (typeof props.input.value === "string") {
        search = props.input.value.toLowerCase();
      } else if (props.input.value.value !== undefined) {
        search = props.input.value.value.toLowerCase();
      }
      setDropdownItems(
        props.items &&
          props.items.filter((item) =>
            item.value.toString().toLowerCase().includes(search)
          )
      );
    }

    if (props.disabled) {
      setDisabled(props.disabled);
    }
  }, [props.input, props.disabled, props.items]);

  const onChange = (v) => {
    if (props.input.onChange !== undefined) {
      props.input.onChange(v);
    }
    setValue(v);
    setSelected(null);
    if (v !== "") {
      if (!visible) {
        setVisible(true);
      }
      setDropdownItems(
        props.items &&
          props.items.filter((item) =>
            item.value.toString().toLowerCase().includes(v.toLowerCase())
          )
      );
    } else {
      setDropdownItems(props.items);
    }
    setHoveredItem(null);
    setHoveredIndex(-1);
  };

  const handleSelect = (v) => {
    setSelected(v);
    setValue(v.value.toString());
    setVisible(false);
    if (props.input.onChange) {
      props.input.onChange(v);
    }
    setHoveredItem(null);
    setHoveredIndex(-1);
  };

  const handleOnKeyDown = (e) => {
    if (e.code === "ArrowDown") {
      e.preventDefault();
      if (!visible) {
        setVisible(true);
      }
      var goto = hoveredIndex + 1;
      if (goto < dropdownItems.length) {
        setHoveredItem(dropdownItems[goto]);
        setHoveredIndex(goto);
      }
    }

    if (e.code === "ArrowUp") {
      e.preventDefault();
      if (!visible) {
        setVisible(true);
      }
      goto = hoveredIndex - 1;
      if (goto >= 0) {
        setHoveredItem(dropdownItems[goto]);
        setHoveredIndex(goto);
      }
    }

    if (
      (e.code === "Enter" || e.code === "NumpadEnter") &&
      hoveredItem !== null
    ) {
      e.preventDefault();
      var item = dropdownItems[hoveredIndex];
      setVisible(false);
      setSelected(item);
      setValue(item.value.toString());
      if (props.input.onChange) {
        props.input.onChange(item);
      }
      setHoveredItem(null);
      setHoveredIndex(-1);
    }

    if (e.code === "Escape") {
      e.preventDefault();
      setVisible(false);
      setHoveredItem(null);
      setHoveredIndex(-1);
    }
  };

  return (
    <div
      className="ui-autocomplete"
      onFocus={() => setVisible(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setVisible(false);
          if (props.input.onBlur) {
            props.input.onBlur(e);
          }
        }
      }}
      tabIndex={-1}
    >
      <div className="ui-autocomplete-wrapper">
        <div className="ui-autocomplete-input">
          <Input
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={props.placeholder}
            onKeyDown={handleOnKeyDown}
            label={props.label}
            meta={props.meta}
          />
        </div>
        {visible && (
          <div className="ui-autocomplete-dropdown">
            <Dropdown
              items={dropdownItems}
              onSelect={handleSelect}
              selected={selected}
              hoveredItem={hoveredItem}
            />
          </div>
        )}
      </div>
      {props.meta !== undefined &&
        props.meta.touched !== undefined &&
        props.meta.touched &&
        ((props.meta.error !== undefined && props.meta.error && (
          <span className="error-input">{props.meta.error}</span>
        )) ||
          (props.meta.warning && <span>{props.meta.warning}</span>))}
    </div>
  );
}
