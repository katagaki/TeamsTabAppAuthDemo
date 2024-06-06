# TeamsTabAppAuthDemo

Demo showcasing authentication using Microsoft Team's built-in user token.

## Running

```zsh
npm install
npm start
```

## Deploying

Before you deploy this application, you will need to set up the following:

### 1. A Microsoft Entra ID app registration

Firstly, set up a new app registration in Azure (skip to the next section if you have already done so).

1. Open the [Azure Portal](https://portal.azure.com).
2. Head to 'Microsoft Entra ID' > 'App registrations'.
3. Select 'New registration'.
4. Follow the on-screen instructions to create a new app registration.

Next, you will need to expose an API for the Microsoft Teams client to use to perform authentication as the app.

1. In the 'App registrations' page, open your app registration.
2. Select 'Manage' > 'Expose an API' from the left sidebar.
3. At the top, select 'Add' next to 'Application ID URI'.
4. In the 'Application ID URI' field, you should see a value similar to the below:
   
   ```api://00000000-0000-0000-0000-000000000069```
   
   Change the value to the below format, retaining the GUID portion.
   
   ```api://your-applications-domain.net/00000000-0000-0000-0000-000000000069```

5. Select 'Save'.

Once you have exposed the API, you will need to grant access to the Microsoft Teams clients.

1. Under 'Scopes defined by this API', select 'Add a scope'.
2. In the 'Scope name' field, enter ```access_as_user```.
3. Set 'Who can consent?' to either 'Admins and users', or 'Admins only'.
4. In the 'Admin consent display name' and 'Admin consent description' fields, enter a suitable value.
5. Select 'Save'.
6. Under 'Authorized client applications', select 'Add a client application', and add the below clients:
    
   - ```1fec8e78-bce4-4aaf-ab1b-5451cc387264``` : Microsoft Teams desktop/web application
   - ```5e3ce6c0-2b1f-4285-8d4b-75ee78787346``` : Microsoft Teams website
    
   In each authorized client application, assign the authorized scope that was created earlier on.

### 2. A Microsoft Teams app that contains your tab app

Once you have your Microsoft Entra ID app registration ready, set up the Microsoft Teams app (skip to the next section if you have already done so).

1. Open the [Microsoft Teams Dev Center](https://dev.teams.microsoft.com/apps)
2. Select 'New app'.
3. Follow the on-screen instructions to create a new Microsoft Teams app.
4. Configure your Microsoft Teams app.

Next, you will need to connect your Microsoft Teams app and the Microsoft Entra ID app registration.

1. In your Microsoft Teams app, select 'Basic information' under 'Configure' from the left sidebar.
2. Under 'Application (client) ID', enter the 'Application (client) ID' found on the 'Overview' page of the Microsoft Entra ID app registration page.
3. Select 'Save'.
4. Select 'Single sign-on' under 'Configure' from the left sidebar.
5. Under 'Application ID URI', enter the 'Application ID URI' as was set up in your Microsoft Entra ID app registration:
   
   ```api://your-applications-domain.net/00000000-0000-0000-0000-000000000069```
   
Once that is completed, either set up the tab app directly, or add a new domain by heading to 'Domains' under 'Configure' in the left sidebar.

When everything is completed, you can deploy your Microsoft Teams app manifest.