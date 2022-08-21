import "./App.css";
import theme from "./theme/theme";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import routes from "./routes";
import Sidebar from "components/sidebar/Sidebar";
import AdminNavbar from "components/navbar/NavbarAdmin";
import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    fetch("https://hawkeye-1.herokuapp.com/data")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, []);
  console.log(data);
  return (
    <ChakraProvider theme={theme}>
      <Switch>
        {routes.map(({ Component, path, name }) => (
          <Route path={path} exact>
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
                <AdminNavbar brandText={name} />
                <Component data={data} pathname={pathname} />
              </Box>
            </Box>
          </Route>
        ))}
      </Switch>
    </ChakraProvider>
  );
}

export default App;
