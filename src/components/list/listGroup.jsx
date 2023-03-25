import React from "react";

const ListGroup = ({ items, selectedItem, onItemSelect }) => {
  return (<ul className="list-group">
    {items.map( item => (
      <li
        key={item}
        onClick={() => onItemSelect(item)}
        className={
          item === selectedItem ? "list-group-item active" : "list-group-item"
        }
      >{item}</li>
    ))}
  </ul>);
};

export default ListGroup;