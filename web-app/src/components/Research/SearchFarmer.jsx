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
import { Grid, Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getSelectUser_API_URL } from "../API/config/api.config";

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

const SearchFarmer = () => {
  const [userData, setuserData] = React.useState([]);
  const [userSearch, setuserSearch] = React.useState({
    Name: "",
  });
  const [userDataSelect, setuserDataSelect] = React.useState({
    UserFname: "",
    UserLname: "",
    PhoneNumber: "",
    AddressUser: "",
    ReportCount: "",
  });
  const [openDialog, setopenDialog] = React.useState(false);

  function getUserSearch() {
    axios.post(getSelectUser_API_URL, userSearch).then((res) => {
      setuserData(res.data.data);
    });
  }

  const onhandleSelect = (e) => {
    setuserDataSelect({
      ...userDataSelect,
      UserFname: e.fName,
      UserLname: e.lName,
      PhoneNumber: e.PhoneNumber,
      ReportCount: e.ReportCount,
      detailAddress: e.detailAddress,
      subDistrict: e.subDistrict,
      district: e.district,
      province: e.province,
      zipCode: e.zipCode,
    });
    setopenDialoge();
  };

  const setopenDialoge = () => {
    setopenDialog(true);
  };
  const setCloseDialog = () => {
    setopenDialog(false);
  };

  return (
    <React.Fragment>
      <Grid container width={"100%"} justifyContent={"center"}>
        <Box my={2}>
          <TextField
            id="outlined-search"
            label="ค้นหาเกษตรกร"
            type="search"
            onChange={(e) => {
              setuserSearch({
                ...userSearch,
                Name: e.target.value,
              });
            }}
          />
          <IconButton
            size={"large"}
            color="primary"
            aria-label="Search-people"
            component="label"
            onClick={getUserSearch}
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
              <StyledTableCell align="center">ชื่อ-นามสกุล</StyledTableCell>
              <StyledTableCell align="center">ที่อยู่</StyledTableCell>
              <StyledTableCell align="center">เบอร์โทรศัพท์</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData == 401 ? (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  ไม่มีข้อมูล
                </StyledTableCell>
                <StyledTableCell align="center">ไม่มีข้อมูล</StyledTableCell>
                <StyledTableCell align="center">ไม่มีข้อมูล</StyledTableCell>
                <StyledTableCell align="center">ไม่มีข้อมูล</StyledTableCell>
              </StyledTableRow>
            ) : (
              userData.map((userData, index) => (
                <StyledTableRow
                  key={userData.UserID}
                  onClick={() => onhandleSelect(userData)}
                >
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {userData.fName} {userData.lName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {userData.detailAddress} ตำบล {userData.subDistrict}{" "}
                    อำเภอ/เขต {userData.district} จังหวัด {userData.province}{" "}
                    {userData.zipCode}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {userData.PhoneNumber}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={setCloseDialog}>
        <DialogContent sx={{ minWidth: 500 }}>
          <Grid
            container
            justifyContent={"center"}
            // rowSpacing={1}
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ p: 1 }}
            spacing={1}
          >
            <Grid>
              <Typography variant="h5">ข้อมูลเกษตรกร</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            // rowSpacing={1}
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ p: 1 }}
            spacing={1}
          >
            <Grid
              item
              xs={5}
              sx={{ border: "1px solid", borderRadius: 2, mr: 1, mb: 1 }}
            >
              <Typography color={"black"} variant={"caption"}>
                ชื่อ
              </Typography>
              <Typography color={"black"}>
                {userDataSelect.UserFname}
              </Typography>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{ border: "1px solid", borderRadius: 2, mr: 1, mb: 1 }}
            >
              <Typography color={"black"} variant={"caption"}>
                นามสกุล
              </Typography>
              <Typography color={"black"}>
                {userDataSelect.UserLname}
              </Typography>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{ border: "1px solid", borderRadius: 2, mr: 1, mb: 1 }}
            >
              <Typography color={"black"} variant={"caption"}>
                นามสกุล
              </Typography>
              <Typography color={"black"}>
                {userDataSelect.PhoneNumber}
              </Typography>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{ border: "1px solid", borderRadius: 2, mr: 1, mb: 1 }}
            >
              <Typography color={"black"} variant={"caption"}>
                จำนวนรายงานโรคอ้อย
              </Typography>
              <Typography color={"black"}>
                {userDataSelect.ReportCount}
              </Typography>
            </Grid>
            <Grid
              container
              justifyContent={"center"}
              width={460}
              height={150}
              sx={{ border: "1px solid", borderRadius: 2, mr: 1, mb: 1, p: 1 }}
            >
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography color={"black"} variant={"caption"}>
                    ที่อยู่
                  </Typography>
                </Grid>
                <Typography color={"black"}>
                  {`${userDataSelect.detailAddress} ตำบล ${userDataSelect.subDistrict} อำเภอ/เขต ${userDataSelect.district} จังหวัด ${userDataSelect.province} ${userDataSelect.zipCode}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default SearchFarmer;
