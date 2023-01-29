import * as React from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import { Grid, Box } from "@mui/material";
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

const Marker = ({ children }) => children;

const SucarCaneData = () => {
  const [duration, setDuration] = React.useState("all");
  // map setup
  const mapRef = React.useRef();

  //loaddata
  const url = "http://localhost:3031/DiseaseAllReport";
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
    axios.get(url).then((res) => {
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
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Box mt={1} width={"20%"}>
          <InputLabel>
            เลือกช่วงเวลาการแสดงผล
          </InputLabel>
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
              <MenuItem value="halfyear">6เดือน</MenuItem>
              <MenuItem value="year">1 ปี</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box container height={750} width={"100%"}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAm5Ee4TqV8Vr6MxtTmuRZKrXPAPQCiRuU",
            }}
            defaultCenter={{ lat: 14.475, lng: 100.523186 }}
            defaultZoom={9}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map }) => {
              mapRef.current = map;
            }}
          >
            {report
              .filter((crime) => {
                if (duration === "all") {
                  return true;
                }
                const date = new Date(crime.DateReport);
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
              .map((crime) => (
                <Marker
                  key={crime.id}
                  lat={crime.Latitude}
                  lng={crime.Longitude}
                >
                  <IconButton
                    sx={{ display: "block" }}
                    id="button"
                    onClick={() => onMarkerClick(crime)}
                  >
                    <CoronavirusIcon
                      sx={{
                        color: "white",
                        backgroundColor: crime.colorShow,
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
        <DialogContent>
          <DialogTitle>ข้อมูลโรค</DialogTitle>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                id="DiseaseName"
                label="ชื่อโรค"
                defaultValue={selectedReport.DiseaseName}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="ResaultPredict"
                label="ผลการวินิจฉัย"
                defaultValue={selectedReport.ResaultPredict}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="UserFname"
                label="ชื่อผู้รายงาน"
                defaultValue={selectedReport.UserFname}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="UserLname"
                label="นามสกุลผู้รายงาน"
                defaultValue={selectedReport.UserLname}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="phoneNumber"
                label="เบอร์โทรศัพท์"
                defaultValue={selectedReport.PhoneNumber}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="DateReport"
                label="วันที่รายงาน"
                defaultValue={selectedReport.DateReport}
                variant="filled"
                fullWidth
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default SucarCaneData;
