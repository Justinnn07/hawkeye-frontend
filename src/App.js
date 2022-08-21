import "./App.css";
import theme from "./theme/theme";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import routes from "./routes";
import Sidebar from "components/sidebar/Sidebar";
import AdminNavbar from "components/navbar/NavbarAdmin";
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          {routes.map((res) => (
            <Route path={res.path} exact>
              <Box>
                <Sidebar routes={routes} />
                <Box
                  mx="auto"
                  p={{ base: "20px", md: "30px" }}
                  pe="20px"
                  minH="100vh"
                  pt="50px"
                  float="right"
                  height="100%"
                  overflow="auto"
                  maxHeight="100%"
                  w={{ base: "100%", xl: "calc( 100% - 290px )" }}
                  maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
                  transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                  transitionDuration=".2s, .2s, .35s"
                  transitionProperty="top, bottom, width"
                  transitionTimingFunction="linear, linear, ease"
                >
                  <AdminNavbar brandText={res.name} />
                  {res.component}
                </Box>
              </Box>
            </Route>
          ))}
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
