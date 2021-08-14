import React, { createRef, useEffect, useState } from "react";
import DropdownItem from "./DropdownItem";
import "./styles.scss";

export default function Dropdown(props) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(null);
  const refs =
    props.items.length > 0
      ? props.items.reduce((acc, val, i) => {
          acc[i] = createRef(val);
          return acc;
        }, [])
      : [];

  useEffect(() => {
    setItems(props.items);
    setVisible(props.visible ? false : true);
    setSelected(props.selected);
    setHovered(props.hoveredItem);
  }, [props.items, props.visible, props.selected, props.hoveredItem]);

  const isItemSelected = (value) => {
    if (selected === value) {
      return true;
    } else {
      return false;
    }
  };

  const isHovered = (value, index) => {
    if (hovered !== null && hovered === value) {
      if (refs[index] !== undefined && refs[index].current) {
        refs[index].current.scrollIntoView({
          block: "nearest",
          inline: "start"
        });
      }
      return true;
    } else {
      return false;
    }
  };

  const handleClick = (s) => {
    props.onSelect(s);
    setSelected(s);
  };

  return (
    <div
      className="ui-dropdown"
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      tabIndex={-1}
    >
      {visible && (
        <div className="ui-dropdown-wrapper">
          {items.map((item, index) => (
            <div
              className="ui-dropdown-item-over-wrapper"
              ref={refs[index]}
              key={index}
              tabIndex={-1}
            >
              <DropdownItem
                item={item}
                selected={() => isItemSelected(item)}
                onSelect={() => handleClick(item)}
                hovered={() => isHovered(item, index)}
                tabIndex={-1}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
