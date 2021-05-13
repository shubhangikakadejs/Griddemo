import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input, CustomInput } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const [filterInput, setFilterInput] = useState("");

  const styleforHeader = {
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
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
    console.log(value);
  };

  return (
    <Fragment>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
      />
      <label>Show</label>
      <CustomInput
        style={{ width: "10%" }}
        type="select"
        value={pageSize}
        onChange={onChangeInSelect}
      >
        {[5, 10, 20, 30, 40].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </CustomInput>

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
            console.log(row);
            console.log(prepareRow(row));
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
        <Col md={3}>
          <Button
            style={{
              maxWidth: 1000,
              textAlign: "center",
            }}
            color="primary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            Previous{" "}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
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
          {/* <CustomInput
            type="select"
            value={pageSize}
            onChange={onChangeInSelect}
          >
            >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </CustomInput> */}
        </Col>
        <Col md={3}>
          <Button
            color="primary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            Next{" "}
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TableContainer;
