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
import "bootstrap/dist/css/bootstrap.min.css";
import { SelectColumnFilter } from "./filters";
import Modal from "./Modal";
const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const body = await response.json();
      console.log(body);
      // const contacts = body.results;
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
        Header: "Title",
        accessor: "name",
        // disableSortBy: true,
        // Filter: SelectColumnFilter,
        // filter: "equals",
      },
      {
        Header: "First Name",
        accessor: "username",
      },
      {
        Header: "Last Name",
        accessor: "email",
      },
      {
        Header: "Email",
        accessor: "phone",
      },
      {
        Header: "City",
        accessor: "website",
      },
      {
        Header: "Hemisphere",
        Cell: ({ cell }) => (
          <button
            type="button"
            class="btn btn-primary"
            value={cell.row.values.name}
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Launch demo modal
          </button>
        ),

        handleClickGroup() {
          alert("Shubhangi");
        },
        // accessor: (values) => {
        //   const { latitude, longitude } = values.location.coordinates;
        //   const first = Number(latitude) > 0 ? "N" : "S";
        //   const second = Number(longitude) > 0 ? "E" : "W";
        //   return first + "/" + second;
        // },
        // disableSortBy: true,
        // Filter: SelectColumnFilter,
        //  filter: "equals",
        //  Cell: ({ cell }) => {
        //    const { value } = cell;

        // const pickEmoji = (value) => {
        //   let first = value[0]; // N or S
        //   let second = value[2]; // E or W
        //   const options = ["⇖", "⇗", "⇙", "⇘"];
        //   let num = first === "N" ? 0 : 2;
        //   num = second === "E" ? num + 1 : num;
        //   return options[num];
        // };

        //  return <div style={{ textAlign: "center", fontSize: 18 }}>{}</div>;
        //  },
      },
    ],
    []
  );

  return (
    <Container style={{ marginTop: 100 }}>
      <TableContainer
        columns={columns}
        data={data}

        //   renderRowSubComponent={renderRowSubComponent}
      />
      <Modal />
    </Container>
  );
};

export default App;
