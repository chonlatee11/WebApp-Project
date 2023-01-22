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
  
 const AdminData = () => {
    const baseUrl = "https://jsonplaceholder.typicode.com/users"
    const [adminData, setAdminData] = React.useState([])

    React.useEffect(() => {
        getAdminData()
    }, [])

    console.log(adminData)

    function getAdminData() {
        axios.get(baseUrl).then((res) => {
        console.log(res.data);
        setAdminData(res.data)
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
            <StyledTableCell>ลำดับที่</StyledTableCell>
            <StyledTableCell align="center">ชื่อ-นามสกุล</StyledTableCell>
            <StyledTableCell align="center">อีเมล</StyledTableCell>
            <StyledTableCell align="center">วันที่แก้ไขข้อมูล</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminData.map((adminData) => (
            <StyledTableRow key={adminData.id} onClick={onhandleSelect}>
              <StyledTableCell component="th" scope="row">
                {adminData.id}
              </StyledTableCell>
              <StyledTableCell align="center">{adminData.name}</StyledTableCell>
              <StyledTableCell align="center">{adminData.email}</StyledTableCell>
              <StyledTableCell align="center">{adminData.address.zipcode}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </React.Fragment>
    );
}

export default AdminData