import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useCommons } from "../../src/context/CommonsContextService";
import { PAGES, LOGO } from "../../src/constants";
import ClientErrorDisplayService from "../../src/context/ClientErrorDisplayService";
import withCommons from "../../src/hoc/withCommons";
import { getLogger } from "../../logger";
//import { extractExperimentalHeaders } from '../../src/utils/common'
const logger = getLogger("login:page");
import { useTheme } from "@mui/material/styles";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Home({ appBaseUrl, retailerOverride }) {
  const router = useRouter();
  const commonsContext = useCommons();
  const { utils } = commonsContext;
  const theme = useTheme();

  const errorMessageDisplayContext = useContext(ClientErrorDisplayService);
  const [loginCreds, setLoginCreds] = useState({
    userName: "",
    password: "",
    retailerOverride,
  });
  const onLoginFieldsChangeHandler = (event) => {
    setLoginCreds({
      ...loginCreds,
      ...{ [event.target.id]: event.target.value },
    });
  };
  const doLogin = async () => {
    /*     utils.toggleLoader(true)
    errorMessageDisplayContext.showError({
      message: 'helo',
      severity: 'success'
    }) */
    try {
      utils.toggleLoader(true);
      let brandLoginResp = await fetch(`${appBaseUrl}/api/login`, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCreds),
      });
      let parsedBrandLoginResp = await brandLoginResp.json();
      console.log(parsedBrandLoginResp);
      utils.toggleLoader(false);
      if (parsedBrandLoginResp?.success) {
        router.push({
          pathname: `${PAGES[0].target}`,
        });
      } else {
        throw new Error(parsedBrandLoginResp.message);
      }
    } catch (err) {
      utils.toggleLoader(false);
      errorMessageDisplayContext.showError({
        message: err.message,
      });
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Container
        maxWidth="xl"
        disableGutters={true}
        sx={{
          padding: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: theme.palette.primary.dark,
        }}
      >
        <Paper elevation={3}>
          <Box
            width={380}
            p={3}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            borderRadius={"6px"}
            backgroundColor={theme.palette.primary.light}
          >
            <Box display={"inline-block"} width={"100%"} marginBottom={1}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                App
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: "#a8a8a8",
                  fontSize: "0.9rem",
                  marginTop: 0.5,
                  marginBottom: 1,
                }}
              >
                Please login to continue
              </Typography>
            </Box>

            <TextField
              id="userName"
              label="Username"
              variant="standard"
              fullWidth
              value={loginCreds.userName}
              onChange={onLoginFieldsChangeHandler}
              sx={{ mt: 1 }}
              required
            />
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="standard"
              fullWidth
              value={loginCreds.password}
              onChange={onLoginFieldsChangeHandler}
              sx={{ mt: 2 }}
              required
            />
            <Box width={"100%"}>
              <Button
                variant="contained"
                sx={{ mt: 4, mb: 1, width: "40%" }}
                onClick={doLogin}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </QueryClientProvider>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  let appBaseUrl = res.getHeaders()["x-app-base-url"];

  return {
    props: {
      appBaseUrl,
      isLoggedIn: false,
    },
  };
}

export default withCommons(Home);
