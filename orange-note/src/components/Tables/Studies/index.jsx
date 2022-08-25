import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const StyledTableCell = styled(TableCell)(() => ({
  "&": {
    fontFamily: "Metropolis,sans-serif",
    cursor: "pointer",
    // textAlign: "center",
  },
  [`&.${tableCellClasses.head}`]: {
    border: "0.05rem solid var(--colour-light-grey)",
    backgroundColor: "var(--colour-grey)",
    color: "var(--colour-white)",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.6rem",
    color: "var(--colour-grey)",
    border: "none",
  },
  [`&.${tableCellClasses.body}:first-of-type `]: {
    fontWeight: "bold",
    borderRadius: "12px 0 0 12px",
  },
  [` &.${tableCellClasses.body}:last-child `]: {
    borderRadius: "0 12px 12px 0 ",
  },
  [`&.${tableCellClasses.body}:hover`]: {
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "var(--colour-light-grey)",
  },
  "&:nth-of-type(odd):hover , &:nth-of-type(even):hover": {
    textDecoration: "underline",
    backgroundColor: "var(--colour-orange)",
    // border: "1px solid var(--colour-grey)",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#9f9b93",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function StudiesTable({ rows, setRows }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("area");

  function handleSort(colunm) {
    const localRows = rows;
    if (orderBy === colunm && order === "asc") {
      setOrder("desc");
      localRows.sort((a, b) => (a[colunm] < b[colunm] ? -1 : 1));
      setRows(localRows);
    } else {
      setOrder("asc");
      localRows.sort((a, b) => (a[colunm] > b[colunm] ? -1 : 1));
      setRows(localRows);
    }
    setOrderBy(colunm);
  }

  return (
    <TableContainer sx={{ background: "var(--colour-black)" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell
              sortDirection={orderBy === "area" ? order : false}
              onClick={() => handleSort("area")}
            >
              Área de estudo
            </StyledTableCell>
            <StyledTableCell
              sortDirection={orderBy === "topic" ? order : false}
              onClick={() => handleSort("topic")}
              align="center"
            >
              Tópicos
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sortDirection={orderBy === "total" ? order : false}
              onClick={() => handleSort("total")}
            >
              Conteúdos
            </StyledTableCell>
            <StyledTableCell
              align="center"
              sortDirection={orderBy === "done" ? order : false}
              onClick={() => handleSort("done")}
            >
              Finalizados
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.id}
              onClick={() => console.log(`Clicou no ${row.area} - ${row.topic}`)}
              hover
            >
              <StyledTableCell>
                {row.area}
              </StyledTableCell>
              <StyledTableCell
                align="center"
              >
                {row.topic}

              </StyledTableCell>
              <StyledTableCell
                align="center"
              >
                {row.total}

              </StyledTableCell>
              <StyledTableCell
                align="center"
              >
                {row.done}

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
