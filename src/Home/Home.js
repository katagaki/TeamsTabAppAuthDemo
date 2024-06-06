import "./Home.css";
import {forwardRef, useEffect, useState} from "react";
import {
  Button,
  FluentProvider,
  Menu,
  MenuItemLink,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Persona,
  Title3,
  Toolbar,
  webDarkTheme
} from "@fluentui/react-components";
import {getTeamsClientAuthToken} from "../Auth/TeamsAuth";
import {getAppServiceAuthToken} from "../Auth/EasyAuth";
import {app} from "@microsoft/teams-js";

function Login() {
  const [userName, setUserName] = useState(null);
  const [isAuthenticatedUsingTeams, setIsAuthenticatedUsingTeams] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onOpenChange = (e, data) => {
    setIsMenuOpen(data.open);
  };
  const PersonaMenuTrigger = forwardRef((props, ref) => (
      <Persona {...props}
               ref={ref}
               name={userName}
               secondaryText={isAuthenticatedUsingTeams ? "Signed in via Teams" : "Signed in"}
               presence={{status: "available"}}
      />
    ))
  ;

  async function getUserData() {
    let teamsClientSideToken;
    try {
      await app.initialize();
      teamsClientSideToken = await getTeamsClientAuthToken();
    } catch (error) {
      console.log(error);
    }
    try {
      if (teamsClientSideToken) {
        console.log("Using Teams auth");
        setUserName(teamsClientSideToken.name);
        setIsAuthenticatedUsingTeams(true)
      } else {
        console.log("Using Easy Auth");
        let userProfile = await getAppServiceAuthToken();
        if (userProfile.name !== undefined) {
          setUserName(userProfile.name);
        }
      }
    } catch (error) {
      console.log("User is not currently authenticated!");
    }
  }

  const signIn = () => {
    window.open("/.auth/login/aad", "_self");
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <FluentProvider theme={webDarkTheme}>
      <div className="toolbar">
        <Title3 className="title">TeamsTabAppAuthDemo</Title3>
        <div className="spacer"></div>
        <Toolbar size="large">
          {userName ? (
            <Menu open={isMenuOpen} onOpenChange={onOpenChange}>
              <MenuTrigger disableButtonEnhancement>
                <PersonaMenuTrigger className="persona"/>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  {isAuthenticatedUsingTeams ? (
                    <p>You are currently signed in using Microsoft Teams account.</p>
                  ) : (
                    <MenuItemLink href="/logout">Sign Out</MenuItemLink>
                  )}
                </MenuList>
              </MenuPopover>
            </Menu>
          ) : (
            <Button appearance="primary" onClick={signIn}>Sign In</Button>
          )}
        </Toolbar>
      </div>
      <div className="mainContent">
      </div>
    </FluentProvider>
  )
    ;
}

export default Login;
