import "bootstrap/dist/css/bootstrap.min.css";

// import {NavBar} from "./components/NavBar/navBar";
import {Index} from "./components/Index";
import React from "react";
import {Route, RouteComponentProps, Switch, withRouter} from "react-router";
import {Search} from "./pages/search";
import {getParam} from "./api/QueryCreator";
import {Details} from "./components/Details/Details";
import {HandleInvite, HandleToken, refresh_user} from "./api/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Profile} from "./components/profile/Profile";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./App.css";
import {BottomNav} from "./components/NavBar/BottomNav";

import {ThemeProvider} from "@mui/styles";
import {green, pink} from "@mui/material/colors";
import {Privacy} from "./components/Privacy/Privacy";
import {Add} from "./components/AddHospital/Add";
import {DoctorComponent} from "./components/Doctor/Doctor";
import {AddDoctorComponent} from "./components/AddDoctor/AddDoctor";
import {AddDepartmentComponent} from "./components/AddDepartment/AddDepartment";
import {Addpatient} from "./components/AddPatient/AddPatient";
import {Givehelp} from "./components/GiveHelp/GiveHelp";
import {AddHospitalReview} from "./components/AddReview/AddHospitalReview";
import { createTheme } from "@mui/material/styles";


const theme = createTheme({
    palette: {
        primary: {
            main: "#0091ea",
        },
        secondary: pink,
        success: green,
    }
});

interface AppRouterProps {
    title: string;   // This one is coming from the router

}

type AppProps = RouteComponentProps<AppRouterProps>



class AppLoc extends React.Component<AppProps>
{
    /**
     * Initialize props
     * Set the location into history stack
     */

    constructor(props: AppProps)
    {
        super(props);
        const location = this.props.location.pathname + this.props.location.search;
        this.props.history.replace(location);
        refresh_user();
    }

    /**
     * componentDidMount() method allows us to execute the React code even after component is rendered
     */
    componentDidMount() 
    {
        getParam("lat", "", true);
        getParam("lng", "", true);
        getParam("loc", "Search Location", true);
        getParam("query", "Search Hospital", true);
    }

    /**
     * componentDidUpdate() method use to execute the code when the state of component changes
     */
    componentDidUpdate()
    {
        getParam("lat", "", true);
        getParam("lng", "", true);
        getParam("loc", "Search Location", true);
        getParam("query", "Search Hospital", true);
    }

    render() 
    {


        return (
            <div className="App">
                {/*
                 * Initialize the theme
                 */}
                <ThemeProvider theme={theme}>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <BottomNav/>

                    <Switch>
                        <Route path="/doctor/add/:hospital" ><AddDoctorComponent/></Route>
                        <Route path="/department/add/:hospital" ><AddDepartmentComponent/></Route>
                        <Route path="/doctor/:docId" ><DoctorComponent/></Route> {/* Show details about a doctor */}
                        <Route path="/details/reviews/:hspId">
                            <AddHospitalReview/>
                        </Route>  
                        <Route path="/details/:hspId"> <Details/></Route>{/* Show details about a hospital */}
                        <Route path="/search">
                            {/*<NavBar/>*/}
                            <Search/>
                            <BottomNav/>
                        </Route>
                        {/* If the current URL is /profile, this route is rendered
            while the rest are ignored */}
                        <Route path="/profile/">

                            <Profile/>
                            {/* If the current URL is /set_token, this route is rendered
            while the rest are ignored */}
                        </Route>
                        <Route path="/set_token/">
                            <HandleToken/>
                        </Route>
                        {/* If the current URL is /invite, this route is rendered
            while the rest are ignored */}
                        <Route path="/invite/">
                            <HandleInvite/>
                        </Route>
                        {/* If the current URL is /AddHospital, this route is rendered
            while the rest are ignored */}
                        <Route path="/AddHospital/">
                            <BottomNav/>
                            <Add/>
                        </Route>
                        {/* If the current URL is /privacypolicy, this route is rendered
            while the rest are ignored */}
                        <Route path="/privacypolicy/">
                            <Privacy/>
                        </Route>
                        <Route path={"/addRequest"}>
                            <BottomNav/>
                            <Addpatient/>
                        </Route>
                        <Route path={"/help"}>
                            <BottomNav/>
                            <Givehelp/>
                        </Route>

                        {/* If the current URL is /, this route is rendered
            while the rest are ignored */}
                        <Route path="/">
                            {/*<NavBar/>*/}
                            <Index/>
                        </Route>


                    </Switch>
                </ThemeProvider>
            </div>
        );
    }
}

const App = withRouter(AppLoc);
export default App;
