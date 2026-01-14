import React, {
  Suspense,
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import { Router, Switch, Route } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { routes } from "src/routes";
import { createBrowserHistory } from "history";
import AuthContext from "src/context/Auth";
import UserContext from "src/context/User";
import PageLoading from "src/component/PageLoading";
import AuthGuard from "src/component/AuthGuard";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "src/theme";
import SettingsContext from "src/context/SettingsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiConfig from "src/config/APIConfig";
import Axios from "axios";
import Maintenance from "./views/pages/maintenance/index";

const history = createBrowserHistory();

function App() {
  const [data, setData] = useState([]);
  const themeSeeting = useContext(SettingsContext);
  const theme = createTheme({
    theme: themeSeeting.settings.theme,
  });

  const getMaintenance = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.getMaintenance,
      });

      if (res.data.responseCode === 200) {
        setData(res.data.result[0]);
      }
    } catch (error) {
      console.error("Error fetching maintenance status:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getMaintenance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      {data?.siteMaintainanceMode === "DISABLE" && (
        <>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <AuthContext>
                <UserContext>
                  <Router history={history}>
                    <RenderRoutes data={routes} />
                  </Router>
                </UserContext>
              </AuthContext>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </>
      )}

      {data?.siteMaintainanceMode === "ENABLE" && (
        <>
          <Maintenance data={data} />
        </>
      )}
    </div>
  );
}

export default App;

function RenderRoutes({ data }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        {data.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard ? AuthGuard : Fragment;

          const Layout = route.layout || Fragment;
          return (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(routeProps) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      <RenderRoutes data={route.routes} />
                    ) : (
                      <Component {...routeProps} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}
