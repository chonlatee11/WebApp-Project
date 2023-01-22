import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
 const DiseaseReport = () => {
    const baseUrl = "https://jsonplaceholder.typicode.com/users"
    const [DiseaseReport, setDiseaseReport] = React.useState([])

    React.useEffect(() => {
        getDiseaseReport()
    }, [])

    console.log(DiseaseReport)

    function getDiseaseReport() {
        axios.get(baseUrl).then((res) => {
        console.log(res.data);
        setDiseaseReport(res.data)
      });
  };

    return(
        <React.Fragment>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ลำดับที่</StyledTableCell>
            <StyledTableCell align="center">ชื่อ-นามสกุล</StyledTableCell>
            <StyledTableCell align="center">เบอร์โทรศัพท์</StyledTableCell>
            <StyledTableCell align="center">ที่อยู่</StyledTableCell>
            <StyledTableCell align="center">โรคที่รายงาน</StyledTableCell>
            <StyledTableCell align="center">รูปภาพของโรค</StyledTableCell>
            <StyledTableCell align="center">ผลของการจำแนกโรค</StyledTableCell>
            <StyledTableCell align="center">วันที่รายงาน</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {DiseaseReport.map((DiseaseReport) => (
            <StyledTableRow key={DiseaseReport.id} >
              <StyledTableCell component="th" scope="row">
                {DiseaseReport.id}
              </StyledTableCell>
              <StyledTableCell align="center">{DiseaseReport.name}</StyledTableCell>
              <StyledTableCell align="center">{DiseaseReport.email}</StyledTableCell>
              <StyledTableCell align="center">{DiseaseReport.address.zipcode}</StyledTableCell>
              <StyledTableCell align="center">{DiseaseReport.address.zipcode}</StyledTableCell>
              <StyledTableCell align="center">{DiseaseReport.address.zipcode}</StyledTableCell>
              <StyledTableCell align="center">{DiseaseReport.address.zipcode}</StyledTableCell>
              <StyledTableCell align="center">{DiseaseReport.address.zipcode}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </React.Fragment>
    );
}

export default DiseaseReport