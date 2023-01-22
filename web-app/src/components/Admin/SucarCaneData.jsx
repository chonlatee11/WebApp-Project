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
  
 const SucarCaneData = () => {
    const baseUrl = "https://jsonplaceholder.typicode.com/users"
    const [sucarCaneData, setsucarCaneData] = React.useState([])

    React.useEffect(() => {
        getsucarCaneData()
    }, [])

    console.log(sucarCaneData)

    function getsucarCaneData() {
        axios.get(baseUrl).then((res) => {
        console.log(res.data);
        setsucarCaneData(res.data)
      });
  };

  const onhandleSelect = (e) => {
    console.log("row clicked")
    }


    return(
        <React.Fragment>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >ลำดับที่</StyledTableCell>
            <StyledTableCell align="center">ชื่อของโรคอ้อย</StyledTableCell>
            <StyledTableCell align="center">รายละเอียดข้อมูลโรคอ้อย</StyledTableCell>
            <StyledTableCell align="center">ข้อมูลการป้องกันโรคในอ้อย</StyledTableCell>
            <StyledTableCell align="center">รูปภาพของโรคอ้อย</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sucarCaneData.map((sucarCaneData) => (
            <StyledTableRow key={sucarCaneData.id} onClick={onhandleSelect}>
              <StyledTableCell component="th" scope="row">
                {sucarCaneData.id}
              </StyledTableCell>
              <StyledTableCell align="center">{sucarCaneData.name}</StyledTableCell>
              <StyledTableCell align="center">{sucarCaneData.email}</StyledTableCell>
              <StyledTableCell align="center">{sucarCaneData.address.zipcode}</StyledTableCell>
              <StyledTableCell align="center">{sucarCaneData.address.zipcode}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </React.Fragment>
    );
}

export default SucarCaneData