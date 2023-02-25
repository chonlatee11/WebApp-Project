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
  getResearch_API_URL,
  addResearch_API_URL,
  updateResearch_API_URL,
  deleteResearch_API_URL,
  sendEmailResearch_API_URL,
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

const ResearchData = () => {
  const [researchData, setresearchData] = React.useState([]);
  const [openAddResearchDialog, setOpenAddResearchDialog] =
    React.useState(false);
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
    // delete Research
    axios
      .delete(deleteResearch_API_URL, { data: { email: researchSelect.email } })
      .catch((error) => {});
    openAleartdel();
    setresearchSelect({
      fname: "",
      lname: "",
      email: "",
      password: "",
      phoneNumber: "",
    });
    setConfirmDeleteDialog(false);
    setOpenUpDateDelete(false);
    setConfirmDelete(false);
  };

  const handleCloseConfirmModify = () => {
    setConfirmModifyDialog(false);
  };

  const handleConfirmModify = () => {
    // modifyResearch
    setConfirmModify(true);
    let date = new Date();
    let dateNow = date.toLocaleDateString();
    let researchSelectEmail = researchSelect.email;
    let EmailVerify = "Verify";

    if (researchSelectEmail !== researchModify.email) {
      EmailVerify = "notVerify";
      axios
        .post(sendEmailResearch_API_URL, { email: researchModify.email })
        .then((res) => {
          //  console.log("🚀 ~ file: AdminData.jsx:179 ~ axios.post ~ res:", res)
        });
    }

    axios
      .patch(updateResearch_API_URL, {
        fname: researchModify.fname,
        lname: researchModify.lname,
        emailupdate: researchModify.email,
        password: researchModify.password,
        modifydate: dateNow,
        EmailVerify: EmailVerify,
        email: researchSelectEmail,
      })
      .then((response) => {
        // console.log(response.status);
        openAlertModSuccess();
      })
      .catch((error) => {
        // console.log(error);
      });
    setresearchSelect({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
    setConfirmModifyDialog(false);
    setOpenUpDateDelete(false);
    setConfirmModify(false);
  };

  const [researchSelect, setresearchSelect] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    modifydate: "",
    phoneNumber: "",
  });

  const [researchAdd, setresearchAdd] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [researchModify, setresearchModify] = React.useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    modifydate: "",
    phoneNumber: "",
  });

  const handleClickOpenAddResearchDialog = () => {
    setOpenAddResearchDialog(true);
  };

  const handleCloseAddResearchDialog = () => {
    setOpenAddResearchDialog(false);
    setresearchAdd({
      fname: "",
      lname: "",
      email: "",
      password: "",
      phoneNumber: "",
    });
  };

  const handleClickOpenUpDateDelete = () => {
    setOpenUpDateDelete(true);
  };
  const handleCloseUpDateDelete = () => {
    setOpenUpDateDelete(false);
  };

  const handleSubmitResearch = () => {
    axios.put(addResearch_API_URL, researchAdd).then((res) => {
      // console.log(res.data.status);
      if (res.data.status === "success") {
        openAlertAddSuccess();
      }
    });

    axios
      .post(sendEmailResearch_API_URL, { email: researchAdd.email })
      .then((res) => {
        //  console.log("🚀 ~ file: AdminData.jsx:179 ~ axios.post ~ res:", res)
      });

    // add Research
    // console.log("submit");
    // console.log(researchAdd);
    setresearchAdd({
      fname: "",
      lname: "",
      email: "",
      password: "",
      phoneNumber: "",
    });
    setOpenAddResearchDialog(false);
  };

  const handleSubmitModifyResearch = () => {
    setConfirmModifyDialog(true);
  };

  const handleSubmitDeleteResearch = () => {
    setConfirmDeleteDialog(true);
  };

  React.useEffect(() => {
    getresearchData();
    setresearchModify({
      fname: researchSelect.fname,
      lname: researchSelect.lname,
      email: researchSelect.email,
      password: researchSelect.password,
      phoneNumber: researchSelect.phoneNumber,
    });
  }, [researchSelect]);

  function getresearchData() {
    axios.get(getResearch_API_URL).then((res) => {
      // console.log(res.data);
      setresearchData(res.data.data);
    });
  }

  const onhandleSelect = (e) => {
    setresearchSelect({
      ...researchSelect,
      fname: e.fName,
      lname: e.lName,
      email: e.Email,
      password: e.passWord,
      phoneNumber: e.phoneNumber,
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

  function openAleartdel() {
    setOpenAleartDel(true);
    setTimeout(() => {
      setOpenAleartDel(false);
    }, 2000);
  }

  return (
    <React.Fragment>
      {openAlertMod && <Alert severity="success">แก้ไขข้อมูลสำเร็จ</Alert>}
      {openAlertAdd && <Alert severity="success">เพิ่มนักวิจัยสำเร็จ</Alert>}
      {openAleartDel && <Alert severity="success">ลบนักวิจัยสำเร็จ</Alert>}
      <Grid container width={"100%"} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          onClick={() => handleClickOpenAddResearchDialog()}
        >
          เพิ่มนักวิจัย
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">ลำดับที่</StyledTableCell>
              <StyledTableCell align="center">ชื่อ-นามสกุล</StyledTableCell>
              <StyledTableCell align="center">อีเมล</StyledTableCell>
              <StyledTableCell align="center">เบอร์โทรศัพท์</StyledTableCell>
              <StyledTableCell align="center">
                วันที่แก้ไขข้อมูล
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {researchData.map((researchData, index) => (
              <StyledTableRow
                key={researchData.researcherID}
                onClick={() => onhandleSelect(researchData)}
              >
                <StyledTableCell component="th" scope="row" align="center">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {researchData.fName} {researchData.lName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {researchData.Email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {researchData.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {researchData.Modifydate}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openAddResearchDialog}
        onClose={handleCloseAddResearchDialog}
      >
        <Box component="form" onSubmit={handleSubmitResearch}>
          <DialogContent>
            <DialogTitle>เพิ่มนักวิจัย</DialogTitle>

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <TextField
                  value={researchAdd.fname}
                  id="fname"
                  label="ชื่อ"
                  variant="filled"
                  required
                  fullWidth
                  name="fname"
                  autoFocus
                  onChange={(e) => {
                    setresearchAdd({
                      ...researchAdd,
                      fname: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={researchAdd.lname}
                  id="lname"
                  label="นามสกุล"
                  variant="filled"
                  required
                  fullWidth
                  name="lname"
                  autoFocus
                  onChange={(e) => {
                    setresearchAdd({
                      ...researchAdd,
                      lname: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={researchAdd.email}
                  id="email"
                  label="อีเมล"
                  variant="filled"
                  required
                  fullWidth
                  name="email"
                  type={"email"}
                  autoFocus
                  onChange={(e) => {
                    setresearchAdd({
                      ...researchAdd,
                      email: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={researchAdd.password}
                  id="password"
                  label="รหัสผ่าน"
                  variant="filled"
                  required
                  fullWidth
                  name="password"
                  autoFocus
                  type={"password"}
                  onChange={(e) => {
                    setresearchAdd({
                      ...researchAdd,
                      password: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={researchAdd.phoneNumber}
                  id="phoneNumber"
                  label="เบอร์โทรศัพท์"
                  variant="filled"
                  required
                  fullWidth
                  name="phoneNumber"
                  autoFocus
                  inputProps={{ pattern: "[0-9]{10}" }}
                  onChange={(e) => {
                    setresearchAdd({
                      ...researchAdd,
                      phoneNumber: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit">ยืนยัน</Button>
            <Button onClick={handleCloseAddResearchDialog}>ยกเลิก</Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={openUpDateDelet} onClose={handleCloseUpDateDelete}>
        <DialogContent>
          <DialogTitle>ข้อมูลนักวิจัย</DialogTitle>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                id="fname"
                label="ชื่อ"
                defaultValue={researchSelect.fname}
                variant="filled"
                onChange={(e) => {
                  setresearchModify({
                    ...researchModify,
                    fname: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lname"
                label="นามสกุล"
                defaultValue={researchSelect.lname}
                variant="filled"
                onChange={(e) => {
                  setresearchModify({
                    ...researchModify,
                    lname: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="email"
                label="อีเมล"
                defaultValue={researchSelect.email}
                variant="filled"
                onChange={(e) => {
                  setresearchModify({
                    ...researchModify,
                    email: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="password"
                label="รหัสผ่าน"
                defaultValue={researchSelect.password}
                variant="filled"
                type="password"
                onChange={(e) => {
                  setresearchModify({
                    ...researchModify,
                    password: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="phoneNumber"
                label="เบอร์โทรศัพท์"
                defaultValue={researchSelect.phoneNumber}
                variant="filled"
                onChange={(e) => {
                  setresearchModify({
                    ...researchModify,
                    phoneNumber: e.target.value,
                  });
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitModifyResearch}>แก้ไข</Button>
          <Button onClick={handleSubmitDeleteResearch}>ลบนักวิจัย</Button>
        </DialogActions>

        <Dialog
          open={confirmDeleteDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseConfirmDeleteDialog}
          aria-describedby="ConFirmDelete Desecription"
        >
          <DialogTitle>{"ยืนยันการลบ"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="ConFirmDelete Desecription">
              คุณต้องการลบนักวิจัยนี้ใช่หรือไม่ หากลบแล้วจะไม่สามารถกู้คืนได้
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDeleteDialog}>ยกเลิก</Button>
            <Button onClick={handleConfirmDelete}>ยืนยัน</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={confirmModifyDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseConfirmModify}
          aria-describedby="ConFirmDelete Desecription"
        >
          <DialogTitle>{"ยืนยันการแก้ไข"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="ConFirmDelete Desecription">
              คุณต้องการแก้ไขข้อมูลนักวิจัยนี้ใช่หรือไม่
              หากแก้ไขแล้วจะเปลี่ยนแปลงทันที
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmModify}>ยกเลิก</Button>
            <Button onClick={handleConfirmModify}>ยืนยัน</Button>
          </DialogActions>
        </Dialog>
      </Dialog>
    </React.Fragment>
  );
};

export default ResearchData;
