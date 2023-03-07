import Container from "@mui/material/Container";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/Header";
import {
  createTheme,
  Slider,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { purple } from "@mui/material/colors";

import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TwoFactor from "./pages/TwoFactor";
import Layout from "./components/Layout";
import DashLayout from "./components/DashLayout";

import Login from "./features/auth/Login";
import Forgot from "./features/auth/Forgot";
import Reset from "./features/auth/Reset";
import VerifyingEmail from "./features/auth/VerifyingEmail";
import RequireAuth from "./features/auth/RequireAuth";

import Signup from "./features/user/Signup";
import VerifyEmail from "./features/user/VerifyEmail";

import Reports from "./features/reports/Reports";

import NoteList from "./features/notes/NoteList";
import EditNote from "./features/notes/EditNote";
import PostNote from "./features/notes/PostNote";
import ViewNote from "./features/notes/ViewNote";

import Settings from "./features/account/settings/Settings";
import Wallet from "./features/account/Wallet";
import Prefetch from "./features/auth/Prefetch";

function App() {
  //add mui theme provider here

  //code below changes the theme auto to dark or light based on user setting in os or browser
  //uses 'prefers-color-scheme' media query
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    //palette colors can be accessed as color ='primary' or bg color: "primary.main/light/dark"(just primary won't work here)
    palette: {
      // mode: prefersDarkMode ? "dark" : "light",
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#1976d2",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      error: {
        main: "#d32f2f",
      },
      info: {
        main: "#0288d1",
      },
      success: {
        main: "#2e7d32",
      },
      secondary: {
        // main: "#9c27b0",
        main: "#673ab7",
      },
      warning: {
        main: "#ed6c02",
      },

      // Provide every color token (light, main, dark, and contrastText)//optional/main only is ok// when using
      // custom colors for props in Material UI's components.
      // Then you will be able to use it like this: `<Button color="custom">`//in others as custom.main
      // (For TypeScript, you need to add module augmentation for the `custom` value)
      //you can call custom.dark or .light in other props or sx//not in color prop
      custom: {
        light: "#ffa726",
        main: "#f57c00",
        dark: "#ef6c00",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
      muted: {
        main: "rgba(0, 0, 0, 0.6)",
      },
      //dull background
      grey: {
        main: "rgb(249, 250, 251)",
        dark: "rgb(158, 158, 158)", //for progress/spinner
      },
      //lavender//eg in iconBtn background
      dull: {
        main: "#f0f1fd",
      },
      dark: {
        main: "rgb(16, 24, 40)",
      },
    },

    typography: {
      h1: {
        fontWeight: 700,
      },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 500 },
      h4: { fontWeight: 500 },
      h5: { fontWeight: 500 },
      h6: { fontWeight: 500 },
      body1: {},
      body2: {},
      subtitle1: { fontWeight: 500 },
      subtitle2: {},
    },
    //can also add color outside of pallette//but you will have to get it manually
    //const theme = useTheme();
    // const status = theme.status.danger;
    status: {
      danger: "red",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* //fluid sets width to 100% in BStrap//here maxWidth is used //default is maxWidth="md" not full width//
      //set maxWidth={false} to have 100% width// can also have sm - xl//not 100%// 
      //disableGutters removes px padding. 
      //put all your components inside Router/BrowserRouter to use router dom hooks in them//Routes only has <route /> children */}
      <Router>
        <Container maxWidth={false} disableGutters>
          <Routes>
            <Route path="/">
              {/* public routes */}
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="features" element={<Features />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgot" element={<Forgot />} />
                <Route path="reset/:token" element={<Reset />} />
                <Route path="verify" element={<VerifyEmail />} />
                <Route path="verifying/:token" element={<VerifyingEmail />} />
                <Route path="two-factor" element={<TwoFactor />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<RequireAuth />}>
                <Route element={<Prefetch />}>
                  <Route element={<DashLayout />}>
                    <Route path="reports" element={<Reports />} />
                    <Route path="notes">
                      <Route index element={<NoteList />} />
                      <Route path="edit/:id" element={<EditNote />} />
                      <Route path="new" element={<PostNote />} />
                      <Route path="view/:id" element={<ViewNote />} />
                      <Route path="search?q=''&page=1" element={<ViewNote />} />
                    </Route>
                    <Route path="account">
                      <Route index element={<Settings />} />
                      <Route path="wallet" element={<Wallet />} />
                    </Route>
                  </Route>
                  {/* End Dash */}
                </Route>
              </Route>
              {/* End Protected Routes */}
            </Route>
          </Routes>
        </Container>
      </Router>
      <ToastContainer
        theme="dark"
        autoClose={5000} //toggle progress bar
        //hideProgressBar={false}
        pauseOnHover
        closeOnClick //disabled autoClose
        draggable
      />
    </ThemeProvider>
  );
}

export default App;
