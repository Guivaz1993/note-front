import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&": {
    cursor: "pointer",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    opacity: 0.8,
  },
}));

function createData(id, area, topic, total, done) {
  return {
    id, area, topic, total, done,
  };
}

const rowsDefault = [
  createData(1, "Front End", "JavaScript", 10, 8),
  createData(2, "Front End", "React", 5, 4),
  createData(3, "Back end", "JavaScript", 6, 1),
  createData(4, "UX/UI", "UX Research", 8, 2),
  createData(5, "Mobile", "React Native", 2, 2),
];

export default function StudiesTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("area");
  const [rows, setRows] = useState(rowsDefault);

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
    console.log(colunm, rows, order);
  }

  return (
    <TableContainer component={Paper}>
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
              align="right"
              sortDirection={orderBy === "topic" ? order : false}
              onClick={() => handleSort("topic")}
            >
              Tópicos
            </StyledTableCell>
            <StyledTableCell
              align="right"
              sortDirection={orderBy === "total" ? order : false}
              onClick={() => handleSort("total")}
            >
              Total
            </StyledTableCell>
            <StyledTableCell
              align="right"
              sortDirection={orderBy === "done" ? order : false}
              onClick={() => handleSort("done")}
            >
              Finalizados
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id} onClick={() => console.log(`Clicou no ${row.area} - ${row.topic}`)}>
              <StyledTableCell component="th" scope="row">
                {row.area}
              </StyledTableCell>
              <StyledTableCell align="right">{row.topic}</StyledTableCell>
              <StyledTableCell align="right">{row.total}</StyledTableCell>
              <StyledTableCell align="right">{row.done}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
