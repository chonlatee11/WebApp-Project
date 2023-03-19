import * as React from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { Grid, Box, Typography } from "@mui/material";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { diseaseAllReport_API_URL, keygooglemap } from "../API/config/api.config";


const Marker = ({ children }) => children;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SucarCaneData = () => {
  const [duration, setDuration] = React.useState("all");
  // map setup
  const mapRef = React.useRef();

  //loaddata
  
  const [report, setReport] = React.useState([]);
  const [openDialog, setopenDialog] = React.useState(false);
  const [selectedReport, setselectedReport] = React.useState({
    ReportID: "",
    UserFname: "",
    UserLname: "",
    PhoneNumber: "",
    Detail: "",
    DiseaseName: "",
    ResaultPredict: "",
    DateReport: "",
    AddressUser: "",
    DiseaseNameEng: "",
  });

  const handleChange = (event) => {
    setDuration(event.target.value);
  };

  function getData() {
    axios.get(diseaseAllReport_API_URL).then((res) => {
      setReport(res.data.data);
    });
  }

  const onMarkerClick = (data) => {
    setselectedReport({
      ReportID: data.ReportID,
      UserFname: data.UserFname,
      UserLname: data.UserLname,
      PhoneNumber: data.PhoneNumber,
      Detail: data.Detail,
      DiseaseName: data.DiseaseName,
      ResaultPredict: data.ResaultPredict,
      DateReport: data.DateReport,
      AddressUser: data.AddressUser,
      DiseaseNameEng: data.DiseaseNameEng,
    });
    handleClickopenDialog();
  };

  const handleClickopenDialog = () => {
    setopenDialog(true);
  };
  const handleCloseDialog = () => {
    setopenDialog(false);
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <React.Fragment>
      <Box
        width={"100%"}
        height={"100%"}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Box mt={1} width={"20%"}>
          <InputLabel>เลือกช่วงเวลาการแสดงผล</InputLabel>
          <FormControl fullWidth>
            <Select
              labelId="duration-select-label"
              id="duration-select"
              value={duration}
              onChange={handleChange}
            >
              <MenuItem value="all">ทั้งหมด</MenuItem>
              <MenuItem value="week">1 สัปดาห์</MenuItem>
              <MenuItem value="month">1 เดือน</MenuItem>
              <MenuItem value="halfyear">6 เดือน</MenuItem>
              <MenuItem value="year">1 ปี</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={1} mt={1} mb={1}>
          <Grid item xs={3}>
            <Item>
              <CoronavirusIcon
                sx={{
                  color: "white",
                  backgroundColor: "#40E0D0",
                  borderRadius: "50%",
                }}
              />
              <InputLabel>โรคเส้นกลางใบแดง</InputLabel>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <CoronavirusIcon
                sx={{
                  color: "white",
                  backgroundColor: "#6495ED",
                  borderRadius: "50%",
                }}
              />
              <InputLabel>โรคใบด่าง</InputLabel>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <CoronavirusIcon
                sx={{
                  color: "white",
                  backgroundColor: "#125008",
                  borderRadius: "50%",
                }}
              />
              <InputLabel>โรคใบจุดเหลือง</InputLabel>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <CoronavirusIcon
                sx={{
                  color: "white",
                  backgroundColor: "#E1F307",
                  borderRadius: "50%",
                }}
              />
              <InputLabel>โรคราสนิม</InputLabel>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <CoronavirusIcon
                sx={{
                  color: "white",
                  backgroundColor: "#F33911",
                  borderRadius: "50%",
                }}
              />
              <InputLabel>โรคแส้ดำ</InputLabel>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <CoronavirusIcon
                sx={{
                  color: "white",
                  backgroundColor: "#EC07C6",
                  borderRadius: "50%",
                }}
              />
              <InputLabel>โรคใบจุดวงแหวน</InputLabel>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <CoronavirusIcon
                sx={{
                  color: "white",
                  backgroundColor: "#D35400",
                  borderRadius: "50%",
                }}
              />
              <InputLabel>โรคใบขีดสีน้ำตาล</InputLabel>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <CoronavirusIcon
                sx={{
                  color: "white",
                  backgroundColor: "#566573",
                  borderRadius: "50%",
                }}
              />
              <InputLabel>โรคใบจุดสีดำ</InputLabel>
            </Item>
          </Grid>
        </Grid>

        <Box height={"38rem"} width={"100%"}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: keygooglemap,
            }}
            defaultCenter={{ lat: 13.9344309, lng: 100.523186 }}
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map }) => {
              mapRef.current = map;
            }}
          >
            {report
              .filter((diseaseReport) => {
                if (duration === "all") {
                  return true;
                }
                const date = new Date(diseaseReport.DateReport);
                const now = new Date();
                if (duration === "week") {
                  return now - date <= 7 * 24 * 60 * 60 * 1000;
                }
                if (duration === "month") {
                  return now - date <= 30 * 24 * 60 * 60 * 1000;
                }
                if (duration === "halfyear") {
                  return now - date <= 182 * 24 * 60 * 60 * 1000;
                }
                if (duration === "year") {
                  return now - date <= 365 * 24 * 60 * 60 * 1000;
                }
              })
              .map((diseaseReport, index) => (
                <Marker
                  key={index}
                  lat={diseaseReport.Latitude}
                  lng={diseaseReport.Longitude}
                >
                  <IconButton
                    sx={{ display: "block" }}
                    id="button"
                    onClick={() => onMarkerClick(diseaseReport)}
                  >
                    <CoronavirusIcon
                      sx={{
                        color: "white",
                        backgroundColor: diseaseReport.colorShow,
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>
                </Marker>
              ))}
          </GoogleMapReact>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent sx={{minWidth: 500}}>
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
            <Grid item xs={5} sx={{border: "1px solid", borderRadius: 2,mr: 1, mb: 1}}>
            <Typography color={"black"} variant={'caption'}>
              ชื่อโรค
              </Typography>
              <Typography color={"black"}>
              {selectedReport.DiseaseName}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{border: "1px solid", borderRadius: 2,mr: 1, mb: 1}}>
            <Typography color={"black"} variant={'caption'}>
            ผลการวินิจฉัย
              </Typography>
              <Typography color={"black"}>
              {selectedReport.ResaultPredict}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{border: "1px solid", borderRadius: 2,mr: 1, mb: 1}}>
            <Typography color={"black"} variant={'caption'}>
            ชื่อผู้รายงาน
              </Typography>
              <Typography color={"black"}>
              {selectedReport.UserFname}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{border: "1px solid", borderRadius: 2,mr: 1, mb: 1}}>
            <Typography color={"black"} variant={'caption'}>
            นามสกุลผู้รายงาน
              </Typography>
              <Typography color={"black"}>
              {selectedReport.UserLname}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{border: "1px solid", borderRadius: 2,mr: 1, mb: 1}}>
            <Typography color={"black"} variant={'caption'}>
            หมายเลขโทรศัพท์
              </Typography>
              <Typography color={"black"}>
              {selectedReport.PhoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{border: "1px solid", borderRadius: 2,mr: 1, mb: 1}}>
            <Typography color={"black"} variant={'caption'}>
            วันที่รายงาน
              </Typography>
              <Typography color={"black"}>
              {selectedReport.DateReport}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default SucarCaneData;
