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

const baseUrl = "http://localhost:3031/getSelectResearch";
const baseUrlupdate = "http://localhost:3031/updataSelectResearch";

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
      .patch(baseUrlupdate, {
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
          console.log("update success");
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
      .post(baseUrl, { researcherID: JSON.parse(Research).ReseachID })
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
      <Grid container width={"100%"} justifyContent={"flex-end"}>
        <Box container height={500} width={"100%"} component={"form"}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                value={research.fName}
                id="fName"
                variant="filled"
                label="ชื่อ"
                fullWidth
                name="fName"
                autoFocus
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={research.lName}
                id="lName"
                variant="filled"
                label="นามสกุล"
                required
                fullWidth
                name="lName"
                autoFocus
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={research.Email}
                label="อีเมล"
                id="Email"
                variant="filled"
                required
                fullWidth
                name="Email"
                autoFocus
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={research.passWord}
                id="passWord"
                variant="filled"
                label="รหัสผ่าน"
                required
                fullWidth
                name="passWord"
                autoFocus
                type={"password"}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={research.phoneNumber}
                label="เบอร์โทรศัพท์"
                id="phoneNumber"
                variant="filled"
                required
                fullWidth
                name="phoneNumber"
                autoFocus
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={research.Modifydate}
                id="Modifydate"
                variant="filled"
                label="วันที่แก้ไขล่าสุด"
                required
                fullWidth
                name="Modifydate"
                autoFocus
                disabled
                
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" onClick={() => handleModify()}>
                แก้ไข
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Dialog open={openUpDateDelete} onClose={handleCloseUpDateDelete}>
          <DialogContent>
            <DialogTitle>ข้อมูลโรค</DialogTitle>
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
                คุณต้องการแก้ไขข้อมูลโรคอ้อยใช่หรือไม่
                หากแก้ไขแล้วจะเปลี่ยนแปลงทันที
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmModify}>ยกเลิก</Button>
              <Button onClick={handleConfirmModify}>ยืนยัน</Button>
            </DialogActions>
          </Dialog>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
