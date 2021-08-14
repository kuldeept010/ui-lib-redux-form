import React, { useEffect, useState } from "react";
import "./styles.scss";

export default function DropdownItem(props) {
  const [item, setItem] = useState(null);
  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setItem(props.item);
    setSelected(props.selected);
    setHovered(props.hovered);
  }, [props.item, props.selected, props.hovered]);

  const handleClick = () => {
    props.onSelect(item);
  };

  return (
    <>
      {item !== null && item.value !== undefined && (
        <div
          className={`ui-dropdown-item ${
            hovered ? "ui-dropdown-item-hovered" : ""
          }`}
          onClick={handleClick}
        >
          <div className="ui-dropdown-item-content">
            <div
              className={`
              ui-dropdown-item-content-text 
                ${selected ? "ui-dropdown-item-selected" : ""}
              `}
            >
              {item.value}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
