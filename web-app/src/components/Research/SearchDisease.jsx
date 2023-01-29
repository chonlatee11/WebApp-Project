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
import TextField from "@mui/material/TextField";
import { Grid, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const baseUrl = "http://localhost:3031/getSelectDesease";

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
}));

const SearchDisease = () => {
  const [diseaseData, setdiseaseData] = React.useState([]);
  const [diseaseSearch, setdiseaseSearch] = React.useState({
    Name: "",
  });

  function getdiseaseSearch() {
    axios.post(baseUrl, diseaseSearch).then((res) => {
      setdiseaseData(res.data.data);
    });
  }

  return (
    <React.Fragment>
      <Grid container width={"100%"} justifyContent={"center"}>
        <Box my={2}>
          <TextField
            id="outlined-search"
            label="ค้นหาโรคที่ระบาด"
            type="search"
            onChange={(e) => {
              setdiseaseSearch({
                ...diseaseSearch,
                Name: e.target.value,
              });
            }}
          />
          <IconButton
            size={"large"}
            color="primary"
            aria-label="Search-people"
            component="label"
            onClick={getdiseaseSearch}
          >
            <PersonSearchIcon />
          </IconButton>
        </Box>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ลำดับที่</StyledTableCell>
              <StyledTableCell align="center">ชื่อโรค</StyledTableCell>
              <StyledTableCell align="center">ผู้รายงาน</StyledTableCell>
              <StyledTableCell align="center">วันที่รายงาน</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diseaseData == 401 ? (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  ไม่มีข้อมูล
                </StyledTableCell>
                <StyledTableCell align="center">ไม่มีข้อมูล</StyledTableCell>
                <StyledTableCell align="center">ไม่มีข้อมูล</StyledTableCell>
                <StyledTableCell align="center">ไม่มีข้อมูล</StyledTableCell>
              </StyledTableRow>
            ) : (
              diseaseData.map((diseaseData) => (
                <StyledTableRow key={diseaseData.ReportID}>
                  <StyledTableCell component="th" scope="row">
                    {diseaseData.ReportID}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {diseaseData.UserFname} {diseaseData.UserLname}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {diseaseData.DiseaseName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {diseaseData.DateReport}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default SearchDisease;
