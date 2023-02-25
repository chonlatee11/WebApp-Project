import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { diseaseReport_API_URL } from "../API/config/api.config";

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

const DiseaseReport = () => {
  const [reportData, setreportData] = React.useState([]);
  const [openUpDateDelet, setOpenUpDateDelete] = React.useState(false);
  const [reportDataSelect, setreportDataSelect] = React.useState({
    UserFname: "",
    UserLname: "",
    PhoneNumber: "",
    DiseaseName: "",
    ResaultPredict: "",
    DateReport: "",
    ImageUrl: "",
    AddressUser: "",
  });
  const [sortConfig, setSortConfig] = React.useState({
    key: "DateReport",
    direction: "desc",
  });

  const onhandleSelectSort = (historyData) => {
    const newSortConfig = {
      key: "DateReport",
      direction: sortConfig.direction === "desc" ? "asc" : "desc",
    };
    setSortConfig(newSortConfig);
  };

  const sortedData = reportData.sort((a, b) => {
    if (new Date(a[sortConfig.key]) < new Date(b[sortConfig.key])) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (new Date(a[sortConfig.key]) > new Date(b[sortConfig.key])) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  React.useEffect(() => {
    getreportData();
  }, []);

  const handleClickOpenUpDateDelete = () => {
    setOpenUpDateDelete(true);
  };
  const handleCloseUpDateDelete = () => {
    setOpenUpDateDelete(false);
  };

  const onhandleSelect = (e) => {
    setreportDataSelect({
      ...reportDataSelect,
      UserFname: e.UserFname,
      UserLname: e.UserLname,
      PhoneNumber: e.PhoneNumber,
      DiseaseName: e.DiseaseName,
      ResaultPredict: e.ResaultPredict,
      DateReport: e.DateReport,
      ImageUrl: e.ImageUrl,
      AddressUser: e.AddressUser,
    });
    handleClickOpenUpDateDelete();
  };

  function getreportData() {
    axios.get(diseaseReport_API_URL).then((res) => {
      // console.log(res.data.data);
      setreportData(res.data.data);
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
              <StyledTableCell align="center">ชื่อ-นามสกุล</StyledTableCell>
              <StyledTableCell align="center">เบอร์โทรศัพท์</StyledTableCell>
              <StyledTableCell align="center">ที่อยู่</StyledTableCell>
              <StyledTableCell align="center">โรคที่รายงาน</StyledTableCell>
              <StyledTableCell align="center">
                วันที่รายงาน
                <TableSortLabel
                  active={sortConfig.key === "DateReport"}
                  direction={sortConfig.direction}
                  onClick={() => onhandleSelectSort("DateReport")}
                  sx={{
                    "&.MuiTableSortLabel-root": {
                      color: "white",
                    },
                    "&.MuiTableSortLabel-root:hover": {
                      color: "white",
                    },
                    "&.Mui-active": {
                      color: "white",
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: "white !important",
                    },
                  }}
                ></TableSortLabel>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((reportData, index) => (
              <StyledTableRow
                key={reportData.ReportID}
                onClick={() => onhandleSelect(reportData)}
              >
                <StyledTableCell component="th" scope="row" align="center">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {reportData.UserFname} {reportData.UserLname}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {reportData.PhoneNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {reportData.AddressUser}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {reportData.DiseaseName}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {reportData.DateReport}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openUpDateDelet} onClose={handleCloseUpDateDelete}>
        <DialogContent>
          <DialogTitle>ข้อมูลโรคการรายงานโรค</DialogTitle>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                id="DiseaseName"
                label="ชื่อโรคที่รายงาน"
                defaultValue={reportDataSelect.DiseaseName}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="ResaultPredict"
                label="ผลการจำแนกโรค"
                defaultValue={reportDataSelect.ResaultPredict}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="DateReport"
                label="วันที่รายงาน"
                defaultValue={reportDataSelect.DateReport}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={reportDataSelect.Detail}
                id="Detail"
                label="ข้อมูลเพิ่มเติม"
                defaultValue={reportDataSelect.Detail}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={reportDataSelect.ImageUrl}
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

export default DiseaseReport;
