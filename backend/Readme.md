# NDC-14 Webapp Backend
This is the backend for the NDC-14 Webapp project. It is written in Go and uses the Gorm ORM for database interactions.THe proeject is created by Tahcin Ul Karim (Mycin) and is maintained by him.

## Folder Structure

└── 📁backend
    └── 📁cmd
        └── main.go
    └── 📁config
        └── connectDB.go
        └── loadEnv.go
        └── syncDB.go
    └── 📁controllers
        └── contact.controller.go
        └── notice.controller.go
        └── user.controller.go
    └── 📁libs
        └── algorithms.go
    └── 📁middlewares
        └── auth.middleware.go
    └── 📁models
        └── attachment.model.go
        └── contact.model.go
        └── notice.model.go
        └── user.model.go
    └── 📁routes
        └── contact.route.go
        └── notice.route.go
        └── user.router.go
    └── 📁tests
        └── algorithm_test.go
        └── contactapi_test.go
        └── noticeapi_test.go
        └── userapi_test.go
    └── .env
    └── .gitignore
    └── Dockerfile
    └── go.mod
    └── go.sum
    └── Licence.md
    └── Makefile
    └── Readme.md

## Getting Started
To get started, you need to have Go installed on your machine. You can download it from the official website: https://go.dev/dl/.
Once you have Go installed, you can clone this repository and run the following commands in your terminal:

1. cd into the project directory
2. Run `go mod download` to download the required dependencies
3. Run `go run cmd/main.go` to start the server
4. Open your web browser and navigate to `http://localhost:8080/` documentation
5.  You can now start making changes to the code and see the changes in real-time.

```bash
git clone https://github.com/Mycin/NDC-14-Webapp.git
cd NDC-14-Webapp/backend
go mod download
make clean
make run
```

Using Docker:
```bash
docker build -t ndc-14-webapp .
docker run -p 8080:8080 -d ndc-14-webapp
```     

## Database
The backend uses a PostgreSQL database to store the data. You can create a new database using the following command:

`docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

You can then connect to the database using the following command:

`docker exec -it postgres psql -U postgres -d postgres`

## Docker
To run the backend in a Docker container, you can use the following command:

`docker build -t ndc-14-webapp-backend .`

`docker run -p 8080:8080 -d ndc-14-webapp-backend`

## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes and commit them
4. Push your changes to your forked repository
5. Create a pull request to the main repository

## License
This project is licensed under the MIT License. See the LICENSE file for more information.  
