# CRUD Example

## Setup
1. Start the `MyDatabase` project via `Database Projects` extencsion and `Docker`
2. Set the database connection in `appsettings.json`. Example: 
   ```DefaultConnection": "Server=localhost, 1433;Database=MyDatabase;User ID=sa;Password=1234;MultipleActiveResultSets=true;TrustServerCertificate=True```
2. Create SQLite database with `dotnet ef database update` in dide the `backend` folder 
3. Start `MyWebApi` by running `dotnet run` inside the `backend` folder
4. Install frontend by running `npm install` inside the `frontend` folder
5. Start `MyReactApp` by running `npm run start` inside the `frontend` folder

## Debugging

The Api can be tested with `Swagger` at this localhost address `http://localhost:5093/swagger`.

## Roadmap

- [ ] Product categories and multiple types of products
- [ ] GUI Navbar
- [ ] Imporve edit / create product pages
- [ ] Use SQL Lite DB

## Questions

## Credits

This Project is a modify version of the one shown in this [Post](https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934).