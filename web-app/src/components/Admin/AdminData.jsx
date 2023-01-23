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
import { Grid, Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from '@mui/material/Alert';


const baseUrl = "http://192.168.1.22:3031/getAdmin";
const baseUrlAdd = "http://192.168.1.22:3031/AddAdmin";

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

const AdminData = () => {
  
  const [adminData, setAdminData] = React.useState([]);
  const [openAddAdminDialog, setOpenAddAdminDialog] = React.useState(false);
  const [openUpDateDelet, setOpenUpDateDelete] = React.useState(false);

  // console.log(adminData);

  const [adminSelect, setAdminSelect] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    modifydate: "",
  });

  const [adminAdd, setAdminAdd] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  // console.log(adminSelect);
  

  const handleClickOpenAddAdminDialog = () => {
    setOpenAddAdminDialog(true);
  };
  const handleCloseAddAdminDialog = () => {
    setOpenAddAdminDialog(false);
    setAdminAdd({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
  };
  const handleClickOpenUpDateDelete = () => {
    setOpenUpDateDelete(true);
  };
  const handleCloseUpDateDelete = () => {
    setOpenUpDateDelete(false);
  };

  const handleSubmitAddAdmin = () => {
    axios.put(baseUrlAdd, adminAdd).then((res) => {
      console.log(res.data.status);
      if (res.data.status === "success") {
        <Alert severity="success">This is a success alert — check it out!</Alert>
      }
    });
    // add Admin
    console.log("submit");
    console.log(adminAdd);
    setAdminAdd({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
    setOpenAddAdminDialog(false);
  };

  const handleSubmitModifyAdmin = () => {

    //modify admin
    console.log("submit modify");
    console.log("Admin Select = " + adminSelect.email);
    setAdminSelect({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
    setOpenUpDateDelete(false);
  };

  const handleSubmitDeleteAdmin = () => {

    // delete admin
    console.log("submit modify");
    console.log(adminSelect.email);
    setAdminSelect({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
    setOpenUpDateDelete(false);
  };

  React.useEffect(() => {
    getAdminData();
  }, []);

  function getAdminData() {
    axios.get(baseUrl).then((res) => {
      console.log(res.data);
      setAdminData(res.data.data);
    });
  }

  const onhandleSelect = (e) => {
    setAdminSelect({
      ...adminSelect,
      fname: e.fName,
      lname: e.lName,
      email: e.Email,
      password: e.passWord,
    });
    handleClickOpenUpDateDelete();
  };

  return (
    <React.Fragment>
      <Grid container width={"100%"} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          onClick={() => handleClickOpenAddAdminDialog()}
        >
          เพิ่มผู้ดูแลระบบ
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ลำดับที่</StyledTableCell>
              <StyledTableCell align="center">ชื่อ-นามสกุล</StyledTableCell>
              <StyledTableCell align="center">อีเมล</StyledTableCell>
              <StyledTableCell align="center">
                วันที่แก้ไขข้อมูล
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminData.map((adminData) => (
              <StyledTableRow
                key={adminData.adminID}
                onClick={() => onhandleSelect(adminData)}
              >
                <StyledTableCell component="th" scope="row">
                  {adminData.adminID}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {adminData.fName} {adminData.lName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {adminData.Email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {adminData.modifydate}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      
      
        <Dialog open={openAddAdminDialog} onClose={handleCloseAddAdminDialog}>
        <DialogContent>
          <DialogTitle>เพิ่มผู้ดูแลระบบ</DialogTitle>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                value={adminAdd.fname}
                id="fname"
                label="ชื่อ"
                variant="filled"
                required
                fullWidth
                name="fname"
                autoFocus
                onChange={e => {
                  setAdminAdd({
                    ...adminAdd,
                    fname: e.target.value
                  })
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={adminAdd.lname}
                id="lname"
                label="นามสกุล"
                variant="filled"
                required
                fullWidth
                name="lname"
                autoFocus
                onChange={e => {
                  setAdminAdd({
                    ...adminAdd,
                    lname: e.target.value
                  })
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={adminAdd.email}
                id="email"
                label="อีเมล"
                variant="filled"
                required
                fullWidth
                name="email"
                autoFocus
                onChange={e => {
                  setAdminAdd({
                    ...adminAdd,
                    email: e.target.value
                  })
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={adminAdd.password}
                id="password"
                label="รหัสผ่าน"
                variant="filled"
                required
                fullWidth
                name="password"
                autoFocus
                onChange={e => {
                  setAdminAdd({
                    ...adminAdd,
                    password: e.target.value
                  })
                }}
              />
            </Grid>
          </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitAddAdmin}>ยืนยัน</Button>
            <Button onClick={handleCloseAddAdminDialog}>ยกเลิก</Button>
          </DialogActions>
        </Dialog>

      <Dialog open={openUpDateDelet} onClose={handleCloseUpDateDelete}>
        <DialogContent>
          <DialogTitle>ข้อมูลผู้ดูแลระบบ</DialogTitle>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <DialogContentText>
                <TextField
                  
                  id="fname"
                  label="ชื่อ"
                  defaultValue={adminSelect.fname}
                  variant="filled"
                  onChange={e => {
                    setAdminSelect({
                      ...adminSelect,
                      fname: e.target.value
                    })
                  }
                }
                />
              </DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <DialogContentText>
                <TextField
                  id="lname"
                  label="นามสกุล"
                  defaultValue={adminSelect.lname}
                  variant="filled"
                  onChange={e => {
                    setAdminSelect({
                      ...adminSelect,
                      lname: e.target.value
                    })
                  }
                }
                />
              </DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <DialogContentText>
                <TextField
                  id="filled-helperText"
                  label="อีเมล"
                  defaultValue={adminSelect.email}
                  variant="filled"
                  onChange={e => {
                    setAdminSelect({
                      ...adminSelect,
                      email: e.target.value
                    })
                  }
                }
                />
              </DialogContentText>
            </Grid>
            <Grid item xs={6}>
              <DialogContentText>
                <TextField
                  id="filled-helperText"
                  label="รหัสผ่าน"
                  defaultValue={adminSelect.password}
                  variant="filled"
                  onChange={e => {
                    setAdminSelect({
                      ...adminSelect,
                      password: e.target.value
                    })
                  }
                }
                />
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitModifyAdmin}>แก้ไข</Button>
          <Button onClick={handleSubmitDeleteAdmin}>ลบผู้ดูแลระบบ</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AdminData;
