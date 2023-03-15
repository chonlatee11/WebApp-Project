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
  sendEmailResearch_API_URL,
} from "../API/config/api.config";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../CustomInput/CustomInput";
import Alert from "@mui/material/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
  const Research = localStorage.getItem("User");
  const [openAlertMod, setOpenAlertMod] = React.useState(false);
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
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      fnameModify: "",
      lnameModify: "",
      emailModify: "",
      passwordModify: "",
      phoneNumberModify: "",
    },
  });

  const handleCloseConfirmModify = () => {
    setConfirmModifyDialog(false);
  };

  const onSubmitModifyResearch = (data) => {
    console.log(data);
    // setConfirmModifyDialog(true);
    setresearchModify({
      researcherID: research.researcherID,
      Email: data.emailModify,
      passWord: data.passwordModify,
      fName: data.fnameModify,
      lName: data.lnameModify,
      phoneNumber: data.phoneNumberModify,
    });
    setConfirmModifyDialog(true);
  };

  const handleConfirmModify = () => {
    // console.log(researchModify);
    let date = new Date();
    let dateNow = date.toLocaleDateString();
    let researchSelectEmail = researchSelect.Email;
    let EmailVerify = "Verify";
    // console.log(researchSelectEmail);
    // console.log(researchModify.Email);
    // console.log(researchSelectEmail === researchModify.Email)

    if ((researchSelectEmail !== researchModify.Email) === true) {
      // console.log("email is truerue");
      EmailVerify = "notVerify";
      axios
        .post(sendEmailResearch_API_URL, { email: researchModify.Email })
        .then((res) => {
          //  console.log("🚀 ~ file: AdminData.jsx:179 ~ axios.post ~ res:", res)
        });
    }

    axios
      .patch(updataSelectResearch_API_URL, {
        researcherID: researchModify.researcherID,
        Email: researchModify.Email,
        passWord: researchModify.passWord,
        fName: researchModify.fName,
        lName: researchModify.lName,
        phoneNumber: researchModify.phoneNumber,
        Modifydate: dateNow,
        EmailVerify: EmailVerify,
      })
      .then((res) => {
        if (res.data.status === "success") {
          openAlertModSuccess();
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
    reset();
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
    reset({
      fnameModify: research.fName,
      lnameModify: research.lName,
      emailModify: research.Email,
      passwordModify: '',
      phoneNumberModify: research.phoneNumber,
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

  function openAlertModSuccess() {
    setOpenAlertMod(true);
    setTimeout(() => {
      setOpenAlertMod(false);
    }, 2000);
  }

  return (
    <React.Fragment>
      {openAlertMod && <Alert severity="info">แก้ไขข้อมูลสำเร็จ</Alert>}
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
                {research.Modifydate ? research.Modifydate : "ยังไม่มีการแก้ไข"}
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
        <Box>
        <form onSubmit={handleSubmit(onSubmitModifyResearch)}>
          <DialogContent>
            <DialogTitle>ข้อมูลนักวิจัย</DialogTitle>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
              
                <CustomInput
                    name={"fnameModify"}
                    label={"ชื่อ"}
                    value={researchModify.fName}
                    // required={true}
                    control={control}
                    id={"fnameModify"}
                  />
              </Grid>
              <Grid item xs={6}>
            
                <CustomInput
                    name={"lnameModify"}
                    label={"นามสกุล"}
                    value={researchModify.lName}
                    // required={true}
                    control={control}
                    id={"lnameModify"}
                  />
              </Grid>
              <Grid item xs={6}>
             
                <CustomInput
                    name={"emailModify"}
                    label={"อีเมล"}
                    value={researchModify.Email}
                    // required={true}
                    control={control}
                    id={"emailModify"}
                    type={"email"}
                  />
              </Grid>
              <Grid item xs={6}>
                
                <CustomInput
                    name={"passwordModify"}
                    label={"รหัสผ่าน"}
                    value={researchModify.passWord}
                    // required={true}
                    control={control}
                    id={"passwordModify"}
                    type={"password"}
                  />
              </Grid>
              <Grid item xs={6}>
                
                <CustomInput
                    name={"phoneNumberModify"}
                    label={"เบอร์โทรศัพท์"}
                    value={researchModify.phoneNumber}
                    // required={true}
                    control={control}
                    id={"phoneNumberModify"}
                    inputProps={{ pattern: "[0-9]{10}" }}
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
            <Button type="submit">แก้ไข</Button>
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
        </form>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default Profile;
