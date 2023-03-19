import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getHistoryDiseaseModify_API_URL, ip } from "../API/config/api.config";


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
  const [sortConfig, setSortConfig] = React.useState({
    key: "ModifyDate",
    direction: "desc",
  });

  const onhandleSelectSort = (historyData) => {
    const newSortConfig = {
      key: "ModifyDate",
      direction: sortConfig.direction === "desc" ? "asc" : "desc",
    };
    setSortConfig(newSortConfig);
  };

  const sortedData = historyData.sort((a, b) => {
    if (new Date(a[sortConfig.key]) < new Date(b[sortConfig.key])) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (new Date(a[sortConfig.key]) > new Date(b[sortConfig.key])) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
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
      ImageNameUpdate: e.ImageNameUpdate,
    });
    handleClickOpenUpDateDelete();
  };

  function getHistoryData() {
    axios.get(getHistoryDiseaseModify_API_URL).then((res) => {
      // console.log(res.data.data);
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
              <StyledTableCell align="center">
                วันที่แก้ไข
                <TableSortLabel
                  active={sortConfig.key === "ModifyDate"}
                  direction={sortConfig.direction}
                  onClick={() => onhandleSelectSort("ModifyDate")}
                  sx = {
                    {
                        '&.MuiTableSortLabel-root': {
                            color: 'white',
                        },
                        '&.MuiTableSortLabel-root:hover': {
                            color: 'white',
                        },
                        '&.Mui-active': {
                            color: 'white',
                        },
                        '& .MuiTableSortLabel-icon': {
                            color: 'white !important',
                        },
                    }
                }
                ></TableSortLabel>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((historyData, index) => (
              <StyledTableRow
                key={historyData.ReportID}
                onClick={() => onhandleSelect(historyData)}
              >
                <StyledTableCell component="th" scope="row" align="center">
                  {index + 1}
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
        <Grid container
            justifyContent={"center"}
            // rowSpacing={1}
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ p: 1 }}
            spacing={1}>
        <Grid>
        <Typography variant="h5">ข้อมูลโรค</Typography>
          </Grid>
          </Grid>
          
          <Grid
            container
            justifyContent={"center"}
            // rowSpacing={1}
            // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ p: 1 }}
            spacing={1}
          >
            <Grid item xs={10} sx={{border: "1px solid", borderRadius: 2,mr: 1, mb: 1}}>
            <Typography color={"black"} variant={'caption'}>
            ข้อมูลโรคอ้อย
              </Typography>
              <Typography color={"black"}>
              {hitorySelect.InfoUpdate}
              </Typography>
            </Grid>
              <Grid item xs={10} sx={{border: "1px solid", borderRadius: 2,mr: 1, mb: 1}}>
              <Typography color={"black"} variant={'caption'} >
              ข้อมูลการป้องกันโรคในอ้อย
              </Typography>
              <Typography color={"black"} align={'left'}>
              {hitorySelect.ProtectUpdate}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{border: "1px solid", borderRadius: 2,mr: 1, mb: 1}}>
              <Typography color={"black"} variant={'caption'}>
              ชิ่อของโรคอ้อย
              </Typography>
              <Typography color={"black"}>
              {hitorySelect.NameUpdate}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{border: "1px solid", borderRadius: 2,mr: 1, mb: 1}}>
              <Typography color={"black"} variant={'caption'}>
              ชิ่อภาษาอังกฤษ
              </Typography>
              <Typography color={"black"}>
              {hitorySelect.NameEngUpdate}
              </Typography>
            </Grid>
            <Grid minWidth={455}>
              <img
                src={`${ip}${hitorySelect.ImageNameUpdate}`}
                loading="lazy"
                style={{ width: "100%", height: "300px" }}
              />
            </Grid>
            {/* <Grid item xs={6}>
              {hitorySelect.ImageNameUpdate === "null" ? (
                <></>
              ) : (
                <>
                  <img
                    src={`${ip}${hitorySelect.ImageNameUpdate}`}
                    loading="lazy"
                    style={{ width: "550px", height: "300px" }}
                  />
                </>
              )}
            </Grid> */}
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default HistoryData;
