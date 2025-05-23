## Setup
1. Open the `VS-Code.code-workspace` file with `VS Code `
2. Start the `MyDatabase` project via `Database Projects` extencsion and `Docker`
3. Set the database connection in `appsettings.json`. Example: 
   ```DefaultConnection": "Server=localhost, 1433;Database=MyDatabase;User ID=sa;Password=1234;MultipleActiveResultSets=true;TrustServerCertificate=True```
4. Start `MyWebApi` by running `dotnet run` inside the project folder
5. Start `MyReactApp` by running `npm run start` inside the project folder

## Debugging

The Api can be tested with `Swagger` at this localhost address `localhost:5093/swagger`.

## Credits

This Project is a modify version of the one shown in this [Post](https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934)