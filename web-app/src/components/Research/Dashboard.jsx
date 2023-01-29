import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map";
import ReportIcon from "@mui/icons-material/Report";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import DiseaseReport from "./DiseaseReport";
import Profile from "./Profile";
import SucarCaneData from "./SucarCaneData";
import SearchFarmer from "./SearchFarmer";
import SearchDisease from "./SearchDisease";
import { UseAuth } from "../../context/AuthConext";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const Auth = UseAuth();

  const [selectedOption, setSelectedOption] = React.useState("sucarCaneReport");

  const handleLogOut = () => {
    Auth.logout();
  };

  const handleDiseaseReportSelection = () => {
    setSelectedOption("DiseaseReport");
  };
  const handleProfileSelection = () => {
    setSelectedOption("Profile");
  };
  const handlesucarCaneReportSelection = () => {
    setSelectedOption("sucarCaneReport");
  };
  const handleSearchFarmerSelection = () => {
    setSelectedOption("SearchFarmer");
  };
  const handleSearchDiseaseSelection = () => {
    setSelectedOption("SearchDisease");
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            ></Typography>

            <IconButton color="inherit" onClick={handleLogOut}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <List component="nav">
            <ListItemButton>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText
                primary="การระบาด"
                onClick={handlesucarCaneReportSelection}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                primary="ข้อมูลส่วนตัว"
                onClick={handleProfileSelection}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ReportIcon />
              </ListItemIcon>
              <ListItemText
                primary="การรายงานโรคอ้อย"
                onClick={handleDiseaseReportSelection}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PersonSearchIcon />
              </ListItemIcon>
              <ListItemText
                primary="ค้นหาข้อมูลเกษตรกร"
                onClick={handleSearchFarmerSelection}
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ImageSearchIcon />
              </ListItemIcon>
              <ListItemText
                primary="ค้นหาข้อมูลโรคที่ระบาด"
                onClick={handleSearchDiseaseSelection}
              />
            </ListItemButton>
          </List>
          <Divider sx={{ my: 1 }} />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {selectedOption === "sucarCaneReport" && <SucarCaneData />}
              {selectedOption === "Profile" && <Profile />}
              {selectedOption === "DiseaseReport" && <DiseaseReport />}
              {selectedOption === "SearchFarmer" && <SearchFarmer />}
              {selectedOption === "SearchDisease" && <SearchDisease />}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
