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
  getDisease_API_URL,
  addDisease_API_URL,
  updateDisease_API_URL,
  deleteDisease_API_URL,
  historyDiseaseModify_API_URL,
} from "../API/config/api.config";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "../CustomInput/CustomInput";

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
  const { control, handleSubmit , reset } = useForm({
    defaultValues: {
      DiseaseName: "",
      DiseaseNameEng: "",
      InfoDisease: "",
      ProtectInfo: "",
      file: "",
    },
  });
  const [sucarCaneData, setsucarCaneData] = React.useState([]);
  const [openAlertMod, setOpenAlertMod] = React.useState(false);
  const [openAlertAdd, setOpenAlertAdd] = React.useState(false);
  const [openAleartDel, setOpenAleartDel] = React.useState(false);
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
    // console.log(DiseaseModify)
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
    axios.put(historyDiseaseModify_API_URL, historyUpdate).then((res) => {
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
      .delete(deleteDisease_API_URL, {
        data: { DiseaseID: DiseaseSelect.DiseaseID },
      }).then((res) => {
        if (res.status === 200) {
          // console.log("delete success");
          openAleartDelSuccess();
        }
      })
      .catch((error) => {
        <Alert severity="error">??????????????????????????????????????????!!</Alert>;
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
    axios.patch(updateDisease_API_URL, formData).then((res) => {
      // console.log(res.data.status);
      if (res.data.status === "success") {
        openAlertModSuccess();
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
      ImageName: "",
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
    reset();
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

  // const handleSubmitDisease = () => {
  //   // diseaseAdd
  //   const formData = new FormData();
  //   formData.append("file", DiseaseAdd.file);
  //   formData.append("DiseaseName", DiseaseAdd.DiseaseName);
  //   formData.append("InfoDisease", DiseaseAdd.InfoDisease);
  //   formData.append("ProtectInfo", DiseaseAdd.ProtectInfo);
  //   formData.append("DiseaseNameEng", DiseaseAdd.DiseaseNameEng);
  //   console.log(DiseaseAdd);
  //   // console.log(formData.get("DiseaseName"));
  //   axios.put(addDisease_API_URL, formData).then((res) => {
  //     // console.log(res.data.status);
  //     if (res.data.status === "success") {
  //       openAlertAddSuccess();
  //       // console.log("add success");
  //     }
  //   });
  //   setDiseaseAdd({
  //     DiseaseName: "",
  //     InfoDisease: "",
  //     ProtectInfo: "",
  //     DiseaseNameEng: "",
  //     Image: "",
  //   });
  //   setOpenAddSucarCaneDialog(false);
  // };

  const onSubmit = data => {
    // console.log(data);
    // console.log(DiseaseAdd.file);
    const formData = new FormData();
    formData.append("file", DiseaseAdd.file);
    formData.append("DiseaseName", data.DiseaseName);
    formData.append("InfoDisease", data.InfoDisease);
    formData.append("ProtectInfo", data.ProtectInfo);
    formData.append("DiseaseNameEng", data.DiseaseNameEng);
    // console.log(DiseaseAdd);
    // console.log(formData.get("DiseaseName"));
    axios.put(addDisease_API_URL, formData).then((res) => {
      // console.log(res.data.status);
      if (res.data.status === "success") {
        openAlertAddSuccess();
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
    reset();
  }

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
      file: {name: DiseaseSelect.ImageName},
    });
  }, [DiseaseSelect]);

  function getsucarCaneData() {
    axios.get(getDisease_API_URL).then((res) => {
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
      ImageName: e.ImageName,
    });
    handleClickopenUpDateDelete();
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
      {openAlertAdd && <Alert severity="success">????????????????????????????????????????????????????????????</Alert>}
      {openAleartDel && <Alert severity="success">???????????????????????????????????????????????????</Alert>}
      <Grid container width={"100%"} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          onClick={() => handleClickOpenAddDiseaseDialog()}
        >
          ??????????????????????????????????????????
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ whiteSpace: "nowrap" }}>
            <TableRow>
              <StyledTableCell align="center">????????????????????????</StyledTableCell>
              <StyledTableCell align="center">??????????????????????????????????????????</StyledTableCell>
              <StyledTableCell align="center">??????????????????????????????????????????</StyledTableCell>
              <StyledTableCell align="center">
                ?????????????????????????????????????????????????????????????????????
              </StyledTableCell>
              <StyledTableCell align="center">
                ???????????????????????????????????????????????????????????????????????????
              </StyledTableCell>
              <StyledTableCell align="center">????????????????????????????????????????????????</StyledTableCell>
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
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogTitle>??????????????????????????????????????????</DialogTitle>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <CustomInput 
                name={"DiseaseName"}
                label={"??????????????????????????????????????????"}
                value={DiseaseAdd.DiseaseName}
                required={true}
                control={control}
                id={"DiseaseName"}
                 />
                {/* <TextField
                  value={DiseaseAdd.DiseaseName}
                  id="DiseaseName"
                  label="??????????????????????????????????????????"
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
                  }
                }
                /> */}
              </Grid>

              <Grid item xs={6}>
              <CustomInput 
                name={"DiseaseNameEng"}
                label={"??????????????????????????????????????????"}
                value={DiseaseAdd.DiseaseNameEng}
                required={true}
                control={control}
                id={"DiseaseNameEng"}
                 />
                {/* <TextField
                  value={DiseaseAdd.DiseaseNameEng}
                  id="DiseaseNameEng"
                  label="??????????????????????????????????????????"
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
                /> */}
              </Grid>

              <Grid item xs={6}>
              <CustomInput 
                name={"InfoDisease"}
                label={"????????????????????????????????????????????????"}
                value={DiseaseAdd.InfoDisease}
                required={true}
                control={control}
                id={"InfoDisease"}
                multiline={true}
                 />
                {/* <TextField
                  value={DiseaseAdd.InfoDisease}
                  id="InfoDisease"
                  label="?????????????????????????????????????????????????????????????????????"
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
                /> */}
              </Grid>

              <Grid item xs={6}>
              <CustomInput 
                name={"ProtectInfo"}
                label={"???????????????????????????????????????????????????????????????????????????"}
                value={DiseaseAdd.ProtectInfo}
                required={true}
                control={control}
                id={"ProtectInfo"}
                multiline={true}
                 />
                {/* <TextField
                  value={DiseaseAdd.ProtectInfo}
                  id="ProtectInfo"
                  label="???????????????????????????????????????????????????????????????????????????"
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
                /> */}
              </Grid>

              <Grid item xs={12}>
              {/* <CustomInput
                name={"ImageUrl"}
                label={"????????????????????????????????????????????????"}
                value={DiseaseAdd.ImageUrl}
                required={true}
                control={control}
                id={"ImageUrl"}
                type={"file"}
                /> */}
                <Button variant="contained" component="label">
                  ????????????????????????????????????????????????
                  <input
                    required
                    hidden
                    accept="image/png, image/jpeg"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files.length === 1) { // check that only one file is selected
                        const file = e.target.files[0];
                        setDiseaseAdd({
                          ...DiseaseAdd,
                          file: file,
                          imageUrl: URL.createObjectURL(file) // create a temporary URL for the selected image
                        });
                      }
                      else {
                        setDiseaseAdd({
                          ...DiseaseAdd,
                          file: null,
                          imageUrl: null // clear the imageUrl state
                        });
                      }
                    }}
                  />
                </Button>
                {DiseaseAdd.imageUrl && <img 
                loading="lazy"
                style={{ width: "100%", height: 400 , marginTop: 10}}
                src={DiseaseAdd.imageUrl} alt="Selected Image" />}
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit">??????????????????</Button>
            <Button onClick={handleCloseAddDiseaseDialog}>??????????????????</Button>
          </DialogActions>
          </form>
        </Box>
      </Dialog>

      <Dialog open={openUpDateDelete} onClose={handleCloseUpDateDelete}>
        <DialogContent>
          <DialogTitle>???????????????????????????</DialogTitle>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                
                id="DiseaseNameData"
                label="??????????????????????????????????????????"
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
                label="??????????????????????????????????????????"
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
                label="???????????????????????????????????????"
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
                label="???????????????????????????????????????????????????????????????????????????"
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

            <Grid item xs={12}>
                <Button variant="contained" component="label">
                  ????????????????????????????????????????????????
                  <input
                    hidden
                    accept="image/png, image/jpeg"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files.length === 1) { // check that only one file is selected
                        const file = e.target.files[0];
                        setDiseaseModify({
                          ...DiseaseModify,
                          file: file,
                          imageUrl: URL.createObjectURL(file) // create a temporary URL for the selected image
                        });
                      }
                      else {
                        setDiseaseAdd({
                          ...DiseaseModify,
                          file: null,
                          imageUrl: null // clear the imageUrl state
                        });
                      }
                    }}
                  />
                </Button>
                {DiseaseModify.imageUrl && <img 
                loading="lazy"
                style={{ width: "100%", height: 400 , marginTop: 10}}
                src={DiseaseModify.imageUrl} alt="Selected Image" />}
              </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitModifyDisease}>???????????????</Button>
          <Button onClick={handleSubmitDeleteDisease}>?????????????????????????????????</Button>
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
              ????????????????????????????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????????????????????????????????
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
              ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
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

export default SucarCaneData;
