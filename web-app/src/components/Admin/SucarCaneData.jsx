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

const baseUrl = "http://127.0.0.1:3032/getDisease";
const baseUrlAdd = "http://127.0.0.1:3032/AddDisease";
const baseUrlupdate = "http://127.0.0.1:3032/updateDisease";
const baseUrlDelete = "http://127.0.0.1:3032/deleteDisease";
const baseUrlHistory = "http://127.0.0.1:3031/HistoryDiseaseModify";

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

const SucarCaneData = () => {
  const [sucarCaneData, setsucarCaneData] = React.useState([]);
  const [openAddSucarCaneDialog, setOpenAddSucarCaneDialog] =
    React.useState(false);
  const [openUpDateDelete, setopenUpDateDeletee] = React.useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = React.useState(false);
  const [conFirmDelete, setConfirmDelete] = React.useState(false);
  const [confirmModifyDialog, setConfirmModifyDialog] = React.useState(false);
  const [conFirmModify, setConfirmModify] = React.useState(false);
  const [DiseaseSelect, setDiseaseSelect] = React.useState({
    DiseaseName: "",
    InfoDisease: "",
    ProtectInfo: "",
    DiseaseNameEng: "",
    ImageName: "",
  });

  const [DiseaseAdd, setDiseaseAdd] = React.useState({
    DiseaseName: "",
    InfoDisease: "",
    ProtectInfo: "",
    DiseaseNameEng: "",
    file: "",
  });

  const [DiseaseModify, setDiseaseModify] = React.useState({
    DiseaseName: "",
    InfoDisease: "",
    ProtectInfo: "",
    DiseaseNameEng: "",
    file: "",
  });

  const updateHistory = (dateNow) => {
    const Admin = localStorage.getItem("User");
    // console.log(JSON.parse(Admin));
    let historyUpdate = {
      DiseaseID: DiseaseSelect.DiseaseID,
      DiseaseName: DiseaseSelect.DiseaseName,
      AdminEmail: JSON.parse(Admin).email,
      ModifyDate: dateNow,
      AdminID: JSON.parse(Admin).AdminID,
      InfoUpdate: DiseaseModify.InfoDisease,
      NameUpdate: DiseaseModify.DiseaseName,
      ProtectUpdate: DiseaseModify.ProtectInfo,
      NameEngUpdate: DiseaseModify.DiseaseNameEng,
      ImageNameUpdate: DiseaseModify.file.name,
    };
    // console.log("updatedata = " + historyUpdate);
    axios.put(baseUrlHistory, historyUpdate).then((res) => {
      // console.log(res.data);
      if (res.status === 200) {
        // console.log("updatehistory success");
      }
    });
  };

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
    // delete Research
    axios
      .delete(baseUrlDelete, { data: { DiseaseID: DiseaseSelect.DiseaseID } })
      .catch((error) => {
        <Alert severity="error">เกิดข้อผิดพลาด!!</Alert>;
      });
    setDiseaseSelect({
      DiseaseID: "",
      DiseaseName: "",
      InfoDisease: "",
      ProtectInfo: "",
      ImageName: "",
      DiseaseNameEng: "",
    });
    setConfirmDeleteDialog(false);
    setopenUpDateDeletee(false);
    setConfirmDelete(false);
  };

  const handleCloseConfirmModify = () => {
    setConfirmModifyDialog(false);
  };

  const handleConfirmModify = () => {
    // modifyDisease
    setConfirmModify(true);
    let DiseaseSelctID = DiseaseSelect.DiseaseID;
    let date = new Date();
    let dateNow = date.toLocaleDateString();
    updateHistory(dateNow);
    const formData = new FormData();
    formData.append("file", DiseaseModify.file);
    formData.append("DiseaseName", DiseaseModify.DiseaseName);
    formData.append("InfoDisease", DiseaseModify.InfoDisease);
    formData.append("ProtectInfo", DiseaseModify.ProtectInfo);
    formData.append("DiseaseNameEng", DiseaseModify.DiseaseNameEng);
    formData.append("DiseaseID", DiseaseSelctID);
    formData.append("Modifydate", dateNow);
    axios.patch(baseUrlupdate, formData).then((res) => {
      // console.log(res.data.status);
      if (res.data.status === "success") {
        // console.log("update success");
      }
    });
    setDiseaseSelect({
      DiseaseName: "",
      InfoDisease: "",
      ProtectInfo: "",
      DiseaseNameEng: "",
      DiseaseID: "",
      Modifydate: "",
    });
    setConfirmModifyDialog(false);
    setopenUpDateDeletee(false);
    setConfirmModify(false);
  };

  const handleClickOpenAddDiseaseDialog = () => {
    setOpenAddSucarCaneDialog(true);
  };

  const handleCloseAddDiseaseDialog = () => {
    setOpenAddSucarCaneDialog(false);
    setDiseaseAdd({
      DiseaseName: "",
      InfoDisease: "",
      ProtectInfo: "",
      DiseaseNameEng: "",
      Image: "",
    });
  };

  const handleClickopenUpDateDelete = () => {
    setopenUpDateDeletee(true);
  };
  const handleCloseUpDateDelete = () => {
    setopenUpDateDeletee(false);
  };

  const handleSubmitDisease = () => {
    // diseaseAdd
    const formData = new FormData();
    formData.append("file", DiseaseAdd.file);
    formData.append("DiseaseName", DiseaseAdd.DiseaseName);
    formData.append("InfoDisease", DiseaseAdd.InfoDisease);
    formData.append("ProtectInfo", DiseaseAdd.ProtectInfo);
    formData.append("DiseaseNameEng", DiseaseAdd.DiseaseNameEng);
    // console.log(DiseaseAdd);
    // console.log(formData.get("DiseaseName"));
    axios.put(baseUrlAdd, formData).then((res) => {
      // console.log(res.data.status);
      if (res.data.status === "success") {
        // console.log("add success");
      }
    });
    setDiseaseAdd({
      DiseaseName: "",
      InfoDisease: "",
      ProtectInfo: "",
      DiseaseNameEng: "",
      Image: "",
    });
    setOpenAddSucarCaneDialog(false);
  };

  const handleSubmitModifyDisease = () => {
    setConfirmModifyDialog(true);
  };

  const handleSubmitDeleteDisease = () => {
    setConfirmDeleteDialog(true);
  };

  React.useEffect(() => {
    getsucarCaneData();
    setDiseaseModify({
      DiseaseName: DiseaseSelect.DiseaseName,
      InfoDisease: DiseaseSelect.InfoDisease,
      ProtectInfo: DiseaseSelect.ProtectInfo,
      DiseaseNameEng: DiseaseSelect.DiseaseNameEng,
      file: DiseaseSelect.ImageUrl,
      
    });
  }, [DiseaseSelect]);

  function getsucarCaneData() {
    axios.get(baseUrl).then((res) => {
      // console.log(res.data.data);
      setsucarCaneData(res.data.data);
    });
  }

  const onhandleSelect = (e) => {
    setDiseaseSelect({
      ...DiseaseSelect,
      DiseaseName: e.DiseaseName,
      InfoDisease: e.InfoDisease,
      ProtectInfo: e.ProtectInfo,
      DiseaseNameEng: e.DiseaseNameEng,
      DiseaseID: e.DiseaseID,
      ImageUrl: e.ImageName,
    });
    handleClickopenUpDateDelete();
  };

  return (
    <React.Fragment>
      <Grid container width={"100%"} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          onClick={() => handleClickOpenAddDiseaseDialog()}
        >
          เพิ่มข้อมูลโรค
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ whiteSpace: "nowrap" }}>
            <TableRow>
              <StyledTableCell align="center">ลำดับที่</StyledTableCell>
              <StyledTableCell align="center">ชื่อของโรคอ้อย</StyledTableCell>
              <StyledTableCell align="center">ชื่อภาษาอังกฤษ</StyledTableCell>
              <StyledTableCell align="center">
                รายละเอียดข้อมูลโรคอ้อย
              </StyledTableCell>
              <StyledTableCell align="center">
                ข้อมูลการป้องกันโรคในอ้อย
              </StyledTableCell>
              <StyledTableCell align="center">รูปภาพของโรคอ้อย</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sucarCaneData.map((sucarCaneData, index) => (
              <StyledTableRow
                key={sucarCaneData.DiseaseID}
                onClick={() => onhandleSelect(sucarCaneData)}
              >
                <StyledTableCell component="th" scope="row" align="center">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell
                  style={{ whiteSpace: "nowrap" }}
                  align="center"
                >
                  {sucarCaneData.DiseaseName}
                </StyledTableCell>
                <StyledTableCell
                  style={{ whiteSpace: "nowrap" }}
                  align="center"
                >
                  {sucarCaneData.DiseaseNameEng}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {sucarCaneData.InfoDisease}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {sucarCaneData.ProtectInfo}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <img
                    src={sucarCaneData.ImageUrl}
                    loading="lazy"
                    style={{ width: "150px", height: "150px" }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openAddSucarCaneDialog}
        onClose={handleCloseAddDiseaseDialog}
      >
        <Box component="form"
        onSubmit={handleSubmitDisease}
            >
        <DialogContent>
          <DialogTitle>เพิ่มข้อมูลโรค</DialogTitle>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                value={DiseaseAdd.InfoDisease}
                id="InfoDisease"
                label="รายละเอียดข้อมูลโรคอ้อย"
                variant="filled"
                required
                fullWidth
                multiline
                name="InfoDisease"
                autoFocus
                onChange={(e) => {
                  setDiseaseAdd({
                    ...DiseaseAdd,
                    InfoDisease: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={DiseaseAdd.ProtectInfo}
                id="ProtectInfo"
                label="ข้อมูลการป้องกันโรคในอ้อย"
                variant="filled"
                required
                fullWidth
                multiline
                name="ProtectInfo"
                autoFocus
                onChange={(e) => {
                  setDiseaseAdd({
                    ...DiseaseAdd,
                    ProtectInfo: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={DiseaseAdd.DiseaseName}
                id="DiseaseName"
                label="ชิ่อของโรคอ้อย"
                variant="filled"
                required
                fullWidth
                name="DiseaseName"
                autoFocus
                onChange={(e) => {
                  setDiseaseAdd({
                    ...DiseaseAdd,
                    DiseaseName: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                value={DiseaseAdd.DiseaseNameEng}
                id="DiseaseNameEng"
                label="ชื่อภาษาอังกฤษ"
                variant="filled"
                required
                fullWidth
                name="DiseaseNameEng"
                autoFocus
                onChange={(e) => {
                  setDiseaseAdd({
                    ...DiseaseAdd,
                    DiseaseNameEng: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" component="label">
                รูปภาพของโรคอ้อย
                <input
                  hidden
                  accept="image/png, image/jpeg"
                  type="file"
                  onChange={(e) => {
                    setDiseaseAdd({
                      ...DiseaseAdd,
                      file: e.target.files[0],
                    });
                  }}
                />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit">ยืนยัน</Button>
          <Button onClick={handleCloseAddDiseaseDialog}>ยกเลิก</Button>
        </DialogActions>
        </Box>
      </Dialog>

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
                id="DiseaseNameData"
                label="ชิ่อของโรคอ้อย"
                defaultValue={DiseaseSelect.DiseaseName}
                variant="filled"
                fullWidth
                onChange={(e) => {
                  setDiseaseModify({
                    ...DiseaseModify,
                    DiseaseName: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="DiseaseNameEngData"
                label="ชิ่อภาษาอังกฤษ"
                defaultValue={DiseaseSelect.DiseaseNameEng}
                variant="filled"
                fullWidth
                onChange={(e) => {
                  setDiseaseModify({
                    ...DiseaseModify,
                    DiseaseNameEng: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="InfoDiseaseData"
                label="ข้อมูลโรคอ้อย"
                defaultValue={DiseaseSelect.InfoDisease}
                variant="filled"
                multiline
                rows={5}
                fullWidth
                onChange={(e) => {
                  setDiseaseModify({
                    ...DiseaseModify,
                    InfoDisease: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="ProtectInfoData"
                label="ข้อมูลการป้องกันโรคในอ้อย"
                defaultValue={DiseaseSelect.ProtectInfo}
                variant="filled"
                multiline
                rows={5}
                fullWidth
                onChange={(e) => {
                  setDiseaseModify({
                    ...DiseaseModify,
                    ProtectInfo: e.target.value,
                  });
                }}
              />
            </Grid>
            
            <Grid item xs={6}>
              <Button variant="contained" component="label">
                รูปภาพของโรคอ้อย
                <input
                  hidden
                  accept="image/png, image/jpeg"
                  type="file"
                  onChange={(e) => {
                    setDiseaseModify({
                      ...DiseaseModify,
                      file: e.target.files[0],
                    });
                  }}
                />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitModifyDisease}>แก้ไข</Button>
          <Button onClick={handleSubmitDeleteDisease}>ลบข้อมูลโรค</Button>
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
              คุณต้องการลบข้อมูลโรคอ้อยใช่หรือไม่ หากลบแล้วจะไม่สามารถกู้คืนได้
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
    </React.Fragment>
  );
};

export default SucarCaneData;
