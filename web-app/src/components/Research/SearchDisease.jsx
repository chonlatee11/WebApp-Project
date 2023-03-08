import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Grid, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getSelectDesease_API_URL } from "../API/config/api.config";

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

const SearchDisease = () => {
  const [diseaseData, setdiseaseData] = React.useState([]);
  const [diseaseSearch, setdiseaseSearch] = React.useState({
    Name: "",
  });
  const [diseaseDataSelect, setdiseaseDataSelect] = React.useState({
    UserFname: "",
    UserLname: "",
    PhoneNumber: "",
    AddressUser: "",
    ImageUrl: "",
    ResaultPredict: "",
    Detail: "",
    DiseaseName: "",
    DateReport: "",
  });
  const [openDialog, setopenDialog] = React.useState(false);

  const [sortConfig, setSortConfig] = React.useState({
    key: "DateReport",
    direction: "desc",
  });

  const onhandleSelectSort = (diseaseData) => {
    const newSortConfig = {
      key: "DateReport",
      direction: sortConfig.direction === "desc" ? "asc" : "desc",
    };
    setSortConfig(newSortConfig);
  };

  let sortedData = [];
  if (diseaseData.length > 0) {
    sortedData = diseaseData.sort((a, b) => {
      if (new Date(a[sortConfig.key]) < new Date(b[sortConfig.key])) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (new Date(a[sortConfig.key]) > new Date(b[sortConfig.key])) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }
  
  // console.log("🚀 ~ file: SearchDisease.jsx:84 ~ sortedData ~ sortedData:", sortedData)
  // console.log("🚀 ~ file: SearchDisease.jsx:46 ~ SearchDisease ~ diseaseData:", diseaseData)
  function getdiseaseSearch() {
    axios.post(getSelectDesease_API_URL, diseaseSearch).then((res) => {
      setdiseaseData(res.data.data);
    });
  }

  const onhandleSelect = (e) => {
    setdiseaseDataSelect({
      ...diseaseDataSelect,
      UserFname: e.UserFname,
      UserLname: e.UserLname,
      PhoneNumber: e.PhoneNumber,
      AddressUser: e.AddressUser,
      ImageUrl: e.ImageUrl,
      ResaultPredict: e.ResaultPredict,
      Detail: e.Detail,
      DiseaseName: e.DiseaseName,
      DateReport: e.DateReport,
    });
    setopenDialoge();
  };

  const setopenDialoge = () => {
    setopenDialog(true);
  };
  const setCloseDialog = () => {
    setopenDialog(false);
  };

  return (
    <React.Fragment>
      <Grid container width={"100%"} justifyContent={"center"}>
        <Box my={2}>
          <TextField
            id="outlined-search"
            label="ค้นหาโรคที่ระบาด"
            type="search"
            onChange={(e) => {
              setdiseaseSearch({
                ...diseaseSearch,
                Name: e.target.value,
              });
            }}
          />
          <IconButton
            size={"large"}
            color="primary"
            aria-label="Search-people"
            component="label"
            onClick={getdiseaseSearch}
          >
            <ContentPasteSearchIcon />
          </IconButton>
        </Box>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ลำดับที่</StyledTableCell>
              <StyledTableCell align="center">ชื่อโรค</StyledTableCell>
              <StyledTableCell align="center">ผู้รายงาน</StyledTableCell>
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
            {diseaseData == 401 ? (
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  ไม่มีข้อมูล
                </StyledTableCell>
                <StyledTableCell align="center">ไม่มีข้อมูล</StyledTableCell>
                <StyledTableCell align="center">ไม่มีข้อมูล</StyledTableCell>
                <StyledTableCell align="center">ไม่มีข้อมูล</StyledTableCell>
              </StyledTableRow>
            ) : (
              sortedData.map((diseaseData, index) => (
                <StyledTableRow key={diseaseData.ReportID}
                onClick={() => onhandleSelect(diseaseData)}>
                  <StyledTableCell component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  {diseaseData.DiseaseName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  {diseaseData.UserFname} {diseaseData.UserLname}              
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {diseaseData.DateReport}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={setCloseDialog}>
        <DialogContent>
          <DialogTitle>ข้อมูลเกษตรกร</DialogTitle>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                id="UserFname"
                label="ชื่อ"
                defaultValue={diseaseDataSelect.UserFname}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="UserLname"
                label="นามสกุล"
                defaultValue={diseaseDataSelect.UserLname}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="PhoneNumber"
                label="หมายเลขโทรศัพท์"
                defaultValue={diseaseDataSelect.PhoneNumber}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="DiseaseName"
                label="โรคที่รายงาน"
                defaultValue={diseaseDataSelect.DiseaseName}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="ResaultPredict"
                label="ผลการวิเคราะห์โรค"
                defaultValue={diseaseDataSelect.ResaultPredict}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="DateReport"
                label="วันที่รายงาน"
                defaultValue={diseaseDataSelect.DateReport}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={2}
                id="AddressUser"
                label="ที่อยู่"
                defaultValue={diseaseDataSelect.AddressUser}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <img
                src={diseaseDataSelect.ImageUrl}
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

export default SearchDisease;
