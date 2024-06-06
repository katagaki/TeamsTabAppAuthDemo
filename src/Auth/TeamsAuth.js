import { app, authentication } from "@microsoft/teams-js";
import { jwtDecode } from "jwt-decode";

async function getTeamsClientAuthToken() {
  try {
    let authToken = await authentication.getAuthToken();
    return jwtDecode(authToken);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export { getTeamsClientAuthToken };