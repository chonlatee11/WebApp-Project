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
import { Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";


const baseUrl = "http://127.0.0.1:3031/getHistoryDiseaseModify";

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

const HistoryData = () => {
  const [historyData, sethistoryData] = React.useState([]);
  const [openUpDateDelet, setOpenUpDateDelete] = React.useState(false);
  const [hitorySelect, sethitorySelect] = React.useState({
    InfoUpdate: "",
    ModifyDate: "",
    NameEngUpdate: "",
    NameUpdate: "",
    ProtectUpdate: "",
  });

  
  React.useEffect(() => {
    getHistoryData();
  }, []);

  const handleClickOpenUpDateDelete = () => {
    setOpenUpDateDelete(true);
  };
  const handleCloseUpDateDelete = () => {
    setOpenUpDateDelete(false);
  };

  const onhandleSelect = (e) => {
    sethitorySelect({
      ...hitorySelect,
      InfoUpdate: e.InfoUpdate,
      ModifyDate: e.ModifyDate,
      NameEngUpdate: e.NameEngUpdate,
      NameUpdate: e.NameUpdate,
      ProtectUpdate: e.ProtectUpdate,
      ImageNameUpdate: e.ImageNameUpdate
    });
    handleClickOpenUpDateDelete();
  }

  function getHistoryData() {
    axios.get(baseUrl).then((res) => {
      console.log(res.data.data);
      sethistoryData(res.data.data);
    });
  }

  return (
    <React.Fragment>
      <Grid container width={"100%"} justifyContent={"flex-end"}></Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead style={{ whiteSpace: "nowrap" }}>
            <TableRow>
              <StyledTableCell align="center">ลำดับที่</StyledTableCell>
              <StyledTableCell align="center">ชื่อโรค</StyledTableCell>
              <StyledTableCell align="center">ผู้แก้ไข</StyledTableCell>
              <StyledTableCell align="center">วันที่แก้ไข</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((historyData) => (
              <StyledTableRow key={historyData.ReportID} onClick={() => onhandleSelect(historyData)}>
                <StyledTableCell component="th" scope="row" align="center">
                  {historyData.ReportID}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {historyData.DiseaseName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {historyData.AdminEmail}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {historyData.ModifyDate}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openUpDateDelet} onClose={handleCloseUpDateDelete}>
        <DialogContent>
          <DialogTitle>ข้อมูลโรค</DialogTitle>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                value={hitorySelect.InfoUpdate}
                id="InfoDiseaseData"
                label="ข้อมูลโรคอ้อย"
                
                variant="filled"
                multiline
                rows={5}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={hitorySelect.ProtectUpdate}
                id="ProtectInfoData"
                label="ข้อมูลการป้องกันโรคในอ้อย"
                
                variant="filled"
                multiline
                rows={5}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={hitorySelect.NameUpdate}
                id="DiseaseNameData"
                label="ชิ่อของโรคอ้อย"
                
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={hitorySelect.NameEngUpdate}
                id="DiseaseNameEngData"
                label="ชิ่อภาษาอังกฤษ"
                
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
               <img
                    src={hitorySelect.ImageNameUpdate}
                    loading="lazy"
                    style={{ width: "550px", height: "300px" }}
                  />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default HistoryData;
