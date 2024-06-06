async function getAppServiceAuthToken() {
  const response = await fetch("/.auth/me");
  let name;
  let emailAddress;
  if (response) {
    const responseJSON = await response.json();
    const firstAuthMeResponse = responseJSON[0];
    if (Object.hasOwn(firstAuthMeResponse, "user_claims")) {
      const userClaims = firstAuthMeResponse["user_claims"];
      for (let claim of userClaims) {
        if (Object.hasOwn(claim, "typ") && Object.hasOwn(claim, "val")) {
          if (claim["typ"] === "name") {
            name = claim["val"]
          } else if (claim["typ"] === "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress") {
            emailAddress = claim["val"]
          }
        }
      }
    }
    return {
      name: name,
      emailAddress: emailAddress
    }
  }
}

export { getAppServiceAuthToken };