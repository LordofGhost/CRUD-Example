# CRUD Example

## Setup

1. Install frontend by running `npm install` inside the `frontend` folder
2. Start the frontend by running `npm run dev` inside the `fontend` folder
3. Start the SQL-Server by running `docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=UserDbPassword0!" -p 1433:1433 --name sqlserver --restart=always -d mcr.microsoft.com/mssql/server:2025-latest`
4. Create User database inside SQL-Server `dotnet ef database update --context UserDbContext` inside the `backend` folder
5. Create SQLite database with `dotnet ef database update --context ShopDbContext` inside the `backend` folder
6. Start the backend by running `dotnet run` inside the `backend` folder

## Commands

- Create database migrations for UserDb `dotnet ef migrations add InitialCreate --context UserDbContext -o src/Migrations/User`
- Update database migrations for UserDb `dotnet ef database update --context UserDbContext`
- Create database migrations for ShopDb `dotnet ef migrations add InitialCreate --context ShopDbContext -o src/Migrations/User`
- Update database migrations for ShopDb `dotnet ef database update --context ShopDbContext`

## Debugging

The Api can be tested with `Swagger` at this localhost address `http://localhost:5093/swagger`.

## Roadmap

- [ ] Product categories and multiple types of products
- [x] GUI Navbar
- [ ] Imporve edit / create product pages
- [x] Use SQL Lite DB
- [ ] Seperate Employees DB

## Questions

- How can I represent a model relation correctly in EF

## Credits

This Project is a modify version of the one shown in this [Post](https://medium.com/@hassanjabbar2017/performing-crud-operations-using-react-with-net-core-a-step-by-step-guide-0176efa86934).
