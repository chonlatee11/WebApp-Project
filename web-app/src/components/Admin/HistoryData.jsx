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
  
 const HistoryData = () => {
    const baseUrl = "https://jsonplaceholder.typicode.com/users"
    const [historyData, sethistoryData] = React.useState([])

    React.useEffect(() => {
        gethistoryData()
    }, [])

    console.log(historyData)

    function gethistoryData() {
        axios.get(baseUrl).then((res) => {
        console.log(res.data);
        sethistoryData(res.data)
      });
  };

    return(
        <React.Fragment>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ลำดับที่</StyledTableCell>
            <StyledTableCell align="center">วันที่แก้ไข</StyledTableCell>
            <StyledTableCell align="center">โรคที่แก้ไข</StyledTableCell>
            <StyledTableCell align="center">รายละเอียดการแก้ไข</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyData.map((historyData) => (
            <StyledTableRow key={historyData.id} >
              <StyledTableCell component="th" scope="row">
                {historyData.id}
              </StyledTableCell>
              <StyledTableCell align="center">{historyData.name}</StyledTableCell>
              <StyledTableCell align="center">{historyData.email}</StyledTableCell>
              <StyledTableCell align="center">{historyData.address.zipcode}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </React.Fragment>
    );
}

export default HistoryData