import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { Table, Row, Col, Button, Input, CustomInput } from "reactstrap";
import { Filter, DefaultColumnFilter, GlobalFilter } from "./filters";
import "./TableContainer.css";

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const [filterInput, setFilterInput] = useState("");

  const styleforHeader = {
    color: "white",
    backgroundColor: "Darkblue",
    textAlign: "center",
  };
  const widthGlobalSearch = {
    width: "300px",
    color: "white",
    backgroundColor: "Darkblue",
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setFilter,
    setAllFilters,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,

    useSortBy,
    useAsyncDebounce,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;

    //  const valuess = ["name", "email"];
    setFilter("name", value);

    // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  return (
    <Fragment>
      {/* <div style ={{display:inline-block}, {margin-right:10px}; width:200px; background-color:red;}} > */}
      <label className="globalSearch">Show </label>
      <CustomInput
        style={{ width: "7%" }}
        type="select"
        value={pageSize}
        onChange={onChangeInSelect}
      >
        {[5, 10].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </CustomInput>
      <label>Results</label>
      {/* </div> */}
      <div style={{ marginLeft: "75%" }}>
        <GlobalFilter
          style={widthGlobalSearch}
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>

      <Table striped bordered hover {...getTableProps()}>
        <thead style={styleforHeader}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </Table>

      <Row
        style={{
          maxWidth: 1000,
          marginLeft: "450px",
          textAlign: "center",
        }}
      >
        <Col md={4}>
          <Button
            style={{
              maxWidth: 1000,
              textAlign: "center",
              color: "white",
              backgroundColor: "DarkBlue",
            }}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            Previous{" "}
          </Button>
        </Col>
        <Col md={2} style={({ marginTop: 7 }, { width: 200 })}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={2}>
          <Input
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>
        <Col md={2}>
          <Button
            style={{ color: "white", backgroundColor: "DarkBlue" }}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            Next{" "}
          </Button>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Fragment>
  );
};

export default TableContainer;
