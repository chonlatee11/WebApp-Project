import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Grid } from "@mui/material";

const baseUrl = "http://192.168.1.22:3031/HistoryDiseaseModify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "skyblue",
  },
}));

const HistoryData = () => {
  const [historyData, sethistoryData] = React.useState([]);

  React.useEffect(() => {
    getHistoryData();
  }, []);

  function getHistoryData() {
    axios.get(baseUrl).then((res) => {
      console.log(res.data.data);
      sethistoryData(res.data.data);
    });
  }

  return (
    <React.Fragment>
      <Grid container width={"100%"} justifyContent={"flex-end"}></Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ whiteSpace: "nowrap" }}>
            <TableRow>
              <StyledTableCell align="center">ลำดับที่</StyledTableCell>
              <StyledTableCell align="center">ชื่อโรค</StyledTableCell>
              <StyledTableCell align="center">ผู้แก้ไข</StyledTableCell>
              <StyledTableCell align="center">
                รายละเอียดที่แก้ไข
              </StyledTableCell>
              <StyledTableCell align="center">วันที่แก้ไข</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((historyData) => (
              <StyledTableRow key={historyData.HistoryID}>
                <StyledTableCell component="th" scope="row" align="center">
                  {historyData.HistoryID}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {historyData.DiseaseName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {historyData.AdminEmail}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {historyData.ModifyDate}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {historyData.Detail}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default HistoryData;
