import { app, authentication } from "@microsoft/teams-js";

async function getTeamsClientAuthToken() {
  try {
    return await authentication.getAuthToken();
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function getTeamsUserProfile() {
  try {
    const appContext = await app.getContext();
    return appContext.user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export { getTeamsClientAuthToken, getTeamsUserProfile };