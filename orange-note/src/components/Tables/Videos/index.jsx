/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-toastify";
import { get } from "../../../services/functions";
import { getItem } from "../../../utils/Storage";

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

export default function VideosTable({ id, handleOpenVideo, openVideoModal }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("study");
  const [rows, setRows] = useState([]);

  const token = getItem("token");

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

  async function loadData() {
    try {
      const { data, status } = await get(`/videos/${id}`, token);
      if (data.message === "Nenhum vídeo encontrado.") {
        return setRows([]);
      }
      if (status !== 200) {
        return toast.error(data.message);
      }
      return setRows(data);
    } catch (error) {
      return toast.error(error.message);
    }
  }

  function videoDetail(row) {
    handleOpenVideo({ idVideo: row.id });
  }

  useEffect(() => {
    loadData();
  }, [openVideoModal]);

  return (

    <TableContainer sx={{ background: "var(--colour-black)" }}>
      {rows.length !== 0 ? (
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sortDirection={orderBy === "done" ? order : false}
                onClick={() => handleSort("done")}
              >
                Finalizado
              </StyledTableCell>
              <StyledTableCell
                sortDirection={orderBy === "video" ? order : false}
                onClick={() => handleSort("video")}
                align="center"
              >
                Título
              </StyledTableCell>
              <StyledTableCell
                sortDirection={orderBy === "description" ? order : false}
                onClick={() => handleSort("description")}
                align="center"
              >
                Descrição
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sortDirection={orderBy === "link" ? order : false}
                onClick={() => handleSort("link")}
              >
                Link
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sortDirection={orderBy === "last_change" ? order : false}
                onClick={() => handleSort("last_change")}
              >
                Ultima alteração
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow
                key={row.id}
                onClick={() => videoDetail(row)}
                hover
              >
                <StyledTableCell>
                  {row.done ? "Finalizado" : "Em aberto"}
                </StyledTableCell>
                <StyledTableCell>
                  {row.video}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                >
                  {row.description}

                </StyledTableCell>
                <StyledTableCell
                  align="center"
                >
                  {row.link}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                >
                  {(new Date(row.last_change)).toLocaleDateString()}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )
        : (
          <h1>Nenhum vídeo cadastrado</h1>
        )}
    </TableContainer>
  );
}
