import * as React from "react";
import axios from "axios";
import { Grid, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  getSelectResearch_API_URL,
  updataSelectResearch_API_URL,
} from "../API/config/api.config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
  const Research = localStorage.getItem("User");
  const [research, setresearch] = React.useState([]);
  const [openUpDateDelete, setopenUpDateDeletee] = React.useState(false);
  const [confirmModifyDialog, setConfirmModifyDialog] = React.useState(false);
  const [conFirmModify, setConfirmModify] = React.useState(false);
  const [researchSelect, setresearchSelect] = React.useState({
    researcherID: "",
    Email: "",
    passWord: "",
    fName: "",
    lName: "",
    phoneNumber: "",
    Modifydate: "",
  });
  const [researchModify, setresearchModify] = React.useState({
    researcherID: "",
    Email: "",
    passWord: "",
    fName: "",
    lName: "",
    phoneNumber: "",
    Modifydate: "",
  });

  const handleCloseConfirmModify = () => {
    setConfirmModifyDialog(false);
  };

  const handleConfirmModify = () => {
    let date = new Date();
    let dateNow = date.toLocaleDateString();
    axios
      .patch(updataSelectResearch_API_URL, {
        researcherID: researchModify.researcherID,
        Email: researchModify.Email,
        passWord: researchModify.passWord,
        fName: researchModify.fName,
        lName: researchModify.lName,
        phoneNumber: researchModify.phoneNumber,
        Modifydate: dateNow,
      })
      .then((res) => {
        if (res.data.status === "success") {
          // console.log("update success");
        }
      });
    setresearchSelect({
      researcherID: "",
      Email: "",
      passWord: "",
      fName: "",
      lName: "",
      phoneNumber: "",
      Modifydate: "",
    });
    setresearchModify({
      researcherID: "",
      Email: "",
      passWord: "",
      fName: "",
      lName: "",
      phoneNumber: "",
      Modifydate: "",
    });
    setConfirmModifyDialog(false);
    setopenUpDateDeletee(false);
    setConfirmModify(false);
  };

  const handleClickopenUpDateDeletee = () => {
    setopenUpDateDeletee(true);
  };
  const handleCloseUpDateDelete = () => {
    setopenUpDateDeletee(false);
  };
  const handleSubmitModifyDisease = () => {
    setConfirmModifyDialog(true);
  };

  const handleModify = () => {
    handleClickopenUpDateDeletee(true);
    setresearchSelect({
      researcherID: research.researcherID,
      Email: research.Email,
      passWord: research.passWord,
      fName: research.fName,
      lName: research.lName,
      phoneNumber: research.phoneNumber,
      Modifydate: research.Modifydate,
    });
  };

  function getresearch() {
    axios
      .post(getSelectResearch_API_URL, {
        researcherID: JSON.parse(Research).ReseachID,
      })
      .then((res) => {
        setresearch(res.data.data[0]);
      });
  }

  React.useEffect(() => {
    getresearch();
    setresearchModify({
      researcherID: researchSelect.researcherID,
      Email: researchSelect.Email,
      passWord: researchSelect.passWord,
      fName: researchSelect.fName,
      lName: researchSelect.lName,
      phoneNumber: researchSelect.phoneNumber,
      Modifydate: "",
    });
  }, [researchSelect]);

  return (
    <React.Fragment>
      <Grid width={"100%"} justifyContent={"flex-end"}>
        <Box height={500} width={"100%"}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={4}>
              <label>ชื่อ</label>
              <Box
                component="span"
                sx={{
                  display: "block",
                  p: 1,
                  m: 0,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#101010" : "#fff",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                  border: "1px solid",
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: "700",
                }}
              >
                {research.fName}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <label>นามสกุล</label>
              <Box
                component="span"
                sx={{
                  display: "block",
                  p: 1,
                  m: 0,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#101010" : "#fff",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                  border: "1px solid",
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: "700",
                }}
              >
                {research.lName}
              </Box>
            </Grid>

            <Grid item xs={4}>
              <label>อีเมล</label>
              <Box
                component="span"
                sx={{
                  display: "block",
                  p: 1,
                  m: 0,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#101010" : "#fff",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                  border: "1px solid",
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: "700",
                }}
              >
                {research.Email}
              </Box>
            </Grid>

            <Grid item xs={4}>
              <label>เบอร์โทรศัพท์</label>
              <Box
                component="span"
                sx={{
                  display: "block",
                  p: 1,
                  m: 0,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#101010" : "#fff",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                  border: "1px solid",
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: "700",
                }}
              >
                {research.phoneNumber}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <label>วันที่แก้ไขข้อมูลล่าสุด</label>
              <Box
                component="span"
                sx={{
                  display: "block",
                  p: 1,
                  m: 0,
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#101010" : "#fff",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                  border: "1px solid",
                  borderColor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: "700",
                }}
              >
                {research.Modifydate}
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" onClick={() => handleModify()}>
                แก้ไข
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Dialog open={openUpDateDelete} onClose={handleCloseUpDateDelete}>
        <Box component="form" onSubmit={handleConfirmModify}>
          <DialogContent>
            <DialogTitle>ข้อมูลนักวิจัย</DialogTitle>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <TextField
                  id="fName"
                  label="ชื่อ"
                  defaultValue={researchSelect.fName}
                  variant="filled"
                  fullWidth
                  onChange={(e) => {
                    setresearchModify({
                      ...researchModify,
                      fName: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="lName"
                  label="นามสกุล"
                  defaultValue={researchSelect.lName}
                  variant="filled"
                  fullWidth
                  onChange={(e) => {
                    setresearchModify({
                      ...researchModify,
                      lName: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="Email"
                  label="อีเมล"
                  defaultValue={researchSelect.Email}
                  variant="filled"
                  fullWidth
                  type={"email"}
                  onChange={(e) => {
                    setresearchModify({
                      ...researchModify,
                      Email: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="passWord"
                  label="รหัสผ่าน"
                  defaultValue={researchSelect.passWord}
                  variant="filled"
                  fullWidth
                  type={"password"}
                  onChange={(e) => {
                    setresearchModify({
                      ...researchModify,
                      passWord: e.target.value,
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
                  fullWidth
                  onChange={(e) => {
                    setresearchModify({
                      ...researchModify,
                      phoneNumber: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="Modifydate"
                  label="วันที่แก้ไขล่าสุด"
                  defaultValue={researchSelect.Modifydate}
                  variant="filled"
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmitModifyDisease}>แก้ไข</Button>
          </DialogActions>

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
                คุณต้องการแก้ไขข้อมูลส่วนตัวใช่หรือไม่
                หากแก้ไขแล้วจะเปลี่ยนแปลงทันที
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmModify}>ยกเลิก</Button>
              <Button onClick={handleConfirmModify}>ยืนยัน</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default Profile;
