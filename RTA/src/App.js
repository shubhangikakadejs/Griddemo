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
import { SelectColumnFilter } from "./filters";

const App = () => {
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

  const renderRowSubComponent = (row) => {
    const {
      name: { first, last },
      location: { city, street, postcode },
      picture,
      cell,
    } = row.original;

    return (
      <Card style={{ width: "18rem", margin: "0 auto" }}>
        <CardImg top src={picture.large} alt="Card image cap" />
        <CardBody>
          <CardTitle>
            <strong>{`${first} ${last}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Phone</strong>: {cell} <br />
            <strong>Address:</strong>{" "}
            {`${street.name} ${street.number} - ${postcode} - ${city}`}
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      // {
      //   Header: () => null,
      //   id: "expander", // 'id' is required
      //   Cell: ({ row }) => (
      //     <span {...row.getToggleRowExpandedProps()}>
      //       {row.isExpanded ? "👇" : "👉"}
      //     </span>
      //   ),
      // },
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
        id: "id",
        accessor: (values) => {
          const obj = values;
          return obj;
        },

        //cell opening tag
        Cell: (obj) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setCurrentRow(obj);
              console.log("RowData->>>>> :", obj.cell.value);
              handleDetailsButtonClick(obj.cell.value);
            }}
          >
            DETAILS
          </Button>
        ), //cell closing tag
      },
    ],

    []
  );

  const handleDetailsButtonClick = (user) => {
    setCurrentRow(user);
    setModalShow(true);
    console.log("current row ", currentRow);
    console.log("handleDetailsButtonClick->>>>> :", user);
  };

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer columns={columns} data={data} />
      <ModalComponent
        show={modalShow}
        onHide={() => setModalShow(false)}
        header="Shubhangi"
        data={currentRow}
      />
    </Container>
  );
};

export default App;
