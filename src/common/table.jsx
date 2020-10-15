import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const {
    sortColumn,
    onSort,
    onLike,
    onSelectChange,
    onAddtoCart,
    onDelete,
    totalcartItems,
    columns,
    items,
  } = props;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        data={items}
        columns={columns}
        onSelectChange={onSelectChange}
        onAddtoCart={onAddtoCart}
        totalcartItems={totalcartItems}
        onLike={onLike}
        onDelete={onDelete}
      />
    </table>
  );
};

export default Table;
