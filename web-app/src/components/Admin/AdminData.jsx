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
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import {
  getAdmin_API_URL,
  addAdmin_API_URL,
  updateAdmin_API_URL,
  deleteAdmin_API_URL,
  sendEmailAdmin_API_URL,
} from "../API/config/api.config";

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

const AdminData = () => {
  const adminLogin = localStorage.getItem("User");
  const [adminData, setAdminData] = React.useState([]);
  const [openAddAdminDialog, setOpenAddAdminDialog] = React.useState(false);
  const [openUpDateDelet, setOpenUpDateDelete] = React.useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = React.useState(false);
  const [conFirmDelete, setConfirmDelete] = React.useState(false);
  const [confirmModifyDialog, setConfirmModifyDialog] = React.useState(false);
  const [conFirmModify, setConfirmModify] = React.useState(false);
  const [openAlertMod, setOpenAlertMod] = React.useState(false);
  const [openAlertAdd, setOpenAlertAdd] = React.useState(false);
  const [openAleartDel, setOpenAleartDel] = React.useState(false);

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
    // delete admin
    axios
      .delete(deleteAdmin_API_URL, { data: { email: adminSelect.email } })
      .catch((error) => {
        <Alert severity="error">??????????????????????????????????????????!!</Alert>;
      });
    openAleartDelSuccess();
    setAdminSelect({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
    setConfirmDeleteDialog(false);
    setOpenUpDateDelete(false);
    setConfirmDelete(false);
  };

  const handleCloseConfirmModify = () => {
    setConfirmModifyDialog(false);
  };

  const handleConfirmModify = () => {
    // modifyAdmin
    setConfirmModify(true);
    let date = new Date();
    let dateNow = date.toLocaleDateString();
    let adminSelectEmail = adminSelect.email;
    let EmailVerify = "Verify";

    if (adminSelectEmail !== Adminmodify.email) {
      EmailVerify = "notVerify";
      axios
        .post(sendEmailAdmin_API_URL, { email: Adminmodify.email })
        .then((res) => {
          //  console.log("???? ~ file: AdminData.jsx:179 ~ axios.post ~ res:", res)
        });
    }

    axios
      .patch(updateAdmin_API_URL, {
        fname: Adminmodify.fname,
        lname: Adminmodify.lname,
        emailupdate: Adminmodify.email,
        password: Adminmodify.password,
        modifydate: dateNow,
        email: adminSelectEmail,
        EmailVerify: EmailVerify,
      })
      .then((response) => {
        // console.log(response.status);
        openAlertModSuccess();
      })
      .catch((error) => {
        // console.log(error);
      });

    setAdminSelect({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
    setConfirmModifyDialog(false);
    setOpenUpDateDelete(false);
    setConfirmModify(false);
  };

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

  const [Adminmodify, setAdminModify] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    modifydate: "",
  });

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
    axios.put(addAdmin_API_URL, adminAdd).then((res) => {
      // console.log(res.data.status);
      if (res.data.status === "success") {
        openAlertAdd();
      }
    });
    axios
      .post(sendEmailAdmin_API_URL, { email: adminAdd.email })
      .then((res) => {
        //  console.log("???? ~ file: AdminData.jsx:179 ~ axios.post ~ res:", res)
      });
    // add Admin
    // console.log("submit");
    // console.log(adminAdd);
    setAdminAdd({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
    setOpenAddAdminDialog(false);
  };

  const handleSubmitModifyAdmin = () => {
    setConfirmModifyDialog(true);
  };

  const handleSubmitDeleteAdmin = () => {
    setConfirmDeleteDialog(true);
  };

  React.useEffect(() => {
    getAdminData();
    setAdminModify({
      fname: adminSelect.fname,
      lname: adminSelect.lname,
      email: adminSelect.email,
      password: adminSelect.password,
    });
  }, [adminSelect]);

  function getAdminData() {
    axios.get(getAdmin_API_URL).then((res) => {
      // console.log(res.data);
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

  function openAlertModSuccess() {
    setOpenAlertMod(true);
    setTimeout(() => {
      setOpenAlertMod(false);
    }, 2000);
  }

  function openAlertAddSuccess() {
    setOpenAlertAdd(true);
    setTimeout(() => {
      setOpenAlertAdd(false);
    }, 2000);
  }

  function openAleartDelSuccess() {
    setOpenAleartDel(true);
    setTimeout(() => {
      setOpenAleartDel(false);
    }, 2000);
  }

  return (
    <React.Fragment>
      {openAlertMod && <Alert severity="success">???????????????????????????????????????????????????</Alert>}
      {openAlertAdd && <Alert severity="success">??????????????????????????????????????????????????????????????????</Alert>}
      {openAleartDel && <Alert severity="success">?????????????????????????????????????????????????????????</Alert>}
      <Grid container width={"100%"} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          onClick={() => handleClickOpenAddAdminDialog()}
        >
          ????????????????????????????????????????????????
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">????????????????????????</StyledTableCell>
              <StyledTableCell align="center">????????????-?????????????????????</StyledTableCell>
              <StyledTableCell align="center">???????????????</StyledTableCell>
              <StyledTableCell align="center">
                ???????????????????????????????????????????????????
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminData
              .filter((adminData) => {
                return (
                  adminData.Email !== JSON.parse(adminLogin).email &&
                  adminData.Email !== "admin"
                );
              })
              .map((adminData, index) => (
                <StyledTableRow
                  key={adminData.adminID}
                  onClick={() => onhandleSelect(adminData)}
                >
                  <StyledTableCell component="th" scope="row" align="center">
                    {index + 1}
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
        <Box component="form" onSubmit={handleSubmitAddAdmin}>
          <DialogContent>
            <DialogTitle>????????????????????????????????????????????????</DialogTitle>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <TextField
                  value={adminAdd.fname}
                  id="fname"
                  label="????????????"
                  variant="filled"
                  required
                  fullWidth
                  name="fname"
                  autoFocus
                  onChange={(e) => {
                    setAdminAdd({
                      ...adminAdd,
                      fname: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={adminAdd.lname}
                  id="lname"
                  label="?????????????????????"
                  variant="filled"
                  required
                  fullWidth
                  name="lname"
                  autoFocus
                  onChange={(e) => {
                    setAdminAdd({
                      ...adminAdd,
                      lname: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={adminAdd.email}
                  id="email"
                  label="???????????????"
                  variant="filled"
                  required
                  type={"email"}
                  fullWidth
                  name="email"
                  autoFocus
                  onChange={(e) => {
                    setAdminAdd({
                      ...adminAdd,
                      email: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={adminAdd.password}
                  id="password"
                  label="????????????????????????"
                  variant="filled"
                  required={true}
                  fullWidth
                  name="password"
                  type={"password"}
                  autoFocus
                  onChange={(e) => {
                    setAdminAdd({
                      ...adminAdd,
                      password: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit">??????????????????</Button>
            <Button onClick={handleCloseAddAdminDialog}>??????????????????</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={openUpDateDelet} onClose={handleCloseUpDateDelete}>
        <DialogContent>
          <DialogTitle>???????????????????????????????????????????????????</DialogTitle>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                id="fname"
                label="????????????"
                defaultValue={adminSelect.fname}
                variant="filled"
                onChange={(e) => {
                  setAdminModify({
                    ...Adminmodify,
                    fname: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lname"
                label="?????????????????????"
                defaultValue={adminSelect.lname}
                variant="filled"
                onChange={(e) => {
                  setAdminModify({
                    ...Adminmodify,
                    lname: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="email"
                label="???????????????"
                defaultValue={adminSelect.email}
                variant="filled"
                onChange={(e) => {
                  setAdminModify({
                    ...Adminmodify,
                    email: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="password"
                label="????????????????????????"
                defaultValue={adminSelect.password}
                variant="filled"
                type="password"
                onChange={(e) => {
                  setAdminModify({
                    ...Adminmodify,
                    password: e.target.value,
                  });
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitModifyAdmin}>???????????????</Button>
          <Button onClick={handleSubmitDeleteAdmin}>???????????????????????????????????????</Button>
        </DialogActions>

        <Dialog
          open={confirmDeleteDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseConfirmDeleteDialog}
          aria-describedby="ConFirmDelete Desecription"
        >
          <DialogTitle>{"?????????????????????????????????"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="ConFirmDelete Desecription">
              ???????????????????????????????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????????????????
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDeleteDialog}>??????????????????</Button>
            <Button onClick={handleConfirmDelete}>??????????????????</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={confirmModifyDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseConfirmModify}
          aria-describedby="ConFirmDelete Desecription"
        >
          <DialogTitle>{"??????????????????????????????????????????"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="ConFirmDelete Desecription">
              ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
              ??????????????????????????????????????????????????????????????????????????????????????????
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmModify}>??????????????????</Button>
            <Button onClick={handleConfirmModify}>??????????????????</Button>
          </DialogActions>
        </Dialog>
      </Dialog>
    </React.Fragment>
  );
};

export default AdminData;
