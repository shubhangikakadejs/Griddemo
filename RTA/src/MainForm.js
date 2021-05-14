import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import TableContainer from "./TableContainer";
import { Modal, Button, Form } from "react-bootstrap";
import ModalComponent from "./ModalComponent";

const MainForm = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const [currentRow, setCurrentRow] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const body = await response.json();
      setData(body);
    };
    doFetch();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "NAME",
        accessor: "name",
      },
      {
        Header: "USERNAME",
        accessor: "username",
      },
      {
        Header: "EMAIL",
        accessor: "email",
      },
      {
        Header: "ADDRESS",
        accessor: (values) => {
          const obj = values.address;
          return (
            obj.suite + " " + obj.street + " " + obj.city + " " + obj.zipcode
          );
        },
      },
      {
        Header: "COMPANY",
        accessor: "company.name",
      },
      {
        Header: "ACTIONS",
        disableSortBy: true,
        Filter: false,

        accessor: (values) => {
          const obj = values;
          return obj;
        },
        Cell: (obj) => (
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white", background: "DarkBlue" }}
            onClick={() => {
              setCurrentRow(obj);
              handleDetailsButtonClick(obj.cell.value);
            }}
          >
            Details
          </Button>
        ), //cell closing tag
      },
    ],

    []
  );

  const handleDetailsButtonClick = (user) => {
    setCurrentRow(user);
    setModalShow(true);
  };

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={data} />
      <ModalComponent
        show={modalShow}
        onHide={() => setModalShow(false)}
        header="Shubhangi"
        data={currentRow.company}
      />
    </Container>
  );
};

export default MainForm;
