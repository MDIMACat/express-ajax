# Node-SQL Backend Project Documentation

## Prerequisites

 - Node.js (version 18.19.1)
 - Docker and Docker Compose
 - PostgreSQL
 - Express
 - Pug
 - Postman
 - Ajax

## Setup Instructions

### 1. Clone the Repository

```sh
    git clone <repository-url>
    cd node-sql-backend
```

### 2. Configure Environment Variables

Create a .env file in the root of the directory with the following content:

    POSTGRES_USER="user"
    POSTGRES_PASSWORD="pass"
    POSTGRES_DB="db2"
    POSTGRES_HOST="localhost"
    POSTGRES_PORT="5432"

### 3. Start the Database and Adminer

Ensure Docker is running and then execute the following command to start the PostgreSQL and Adminer containers:

```sh
docker-compose up -d
```

This will start PostgreSQL on port 5432 and Adminer on port 8080.

### 4. Install Node.js Dependencies

Navigate to the project root directory and run:

```sh
npm install
```

### 5. Run Express server
To run the express application and access the visitor form:

Please ensure that Docker is running and the commands related to PostgreSQL and Adminer have been executed.

#### Command to perform on the terminal

```sh
npm start 

```

This will run the express server on the terminal.

To access the form please go to the following site

#### Link to Site

```sh
http://localhost:5000/new_visitor

```

## NOTE
Please be advised to first run the docker compose command to have the docker container running before running npm start.
If you dont it will produce an error.

## Run Application

All the given commands are designed to be ran in the command line.

### 1. Create the Database Table

To create the visitors table, you can run the following script:

```sh
node -e 'require("./src/visitor").createTable().then(console.log).catch(console.error)'
```

### 2. Add a New Visitor

To add a new visitor, use the addNewVisitor method. Here is an example script:

```sh
node -e 'require("./src/visitor").addNewVisitor("John Doe", 30, "2024-07-12", "10:00:00", "First visit", "Alice Jonas").then(console.log).catch(console.error)'

```


### 3. List All Visitors

To list all visitors, use the listAllVisitors method:

```sh
node -e 'require("./src/visitor").listAllVisitors().then(console.log).catch(console.error)'

```

### 4. Delete a Visitor

To delete a visitor by ID, use the deleteAVisitor method:

```sh
node -e 'require("./src/visitor").deleteAVisitor(1).then(console.log).catch(console.error)'

```

### 5. Update a Visitor

To update a visitor by ID, use the updateAVisitor method:

```sh
node -e 'require("./src/visitor").updateAVisitor(1, "visitor_name", "Sam Smith").then(console.log).catch(console.error)'

```

### 6. View a Visitor

To view a visitor by ID, use the viewAVisitor method:
```sh
node -e 'require("./src/visitor").viewAVisitor(1).then(console.log).catch(console.error)'

```

### 7. Delete All Visitors

To delete all visitors, use the deleteAllVisitors method:
```sh
node -e 'require("./src/visitor").deleteAllVisitors().then(console.log).catch(console.error)'

```

### 8. View Last Visitor

To view the last added visitor, use the viewLastVisitor method:
```sh
node -e 'require("./src/visitor").viewLastVisitor().then(console.log).catch(console.error)'

```


# Visitor API Documentation

The Visitor API allows you to manage visitor data through various endpoints.

## Available Endpoints

| Method | Endpoint                | Description                              |
|--------|-------------------------|------------------------------------------|
| GET    | /visitors               | Retrieve a list of all visitors         |
| POST   | /visitors               | Create a new visitor                     |
| GET    | /visitors/:id           | Retrieve details of a specific visitor   |
| PUT    | /visitors/:id           | Update a specific visitor                |
| DELETE | /visitors/:id           | Delete a specific visitor                |
| DELETE | /visitors               | Delete all visitors                      |

## How to Use the API

1. **Ensure Docker is Running**: Make sure that your Docker container for the application is up and running.
   
2. **Start the Express Server**: Verify that the Express server is operational.

3. **Use Postman**: Sign up or log in to the Postman application.

4. **Set Up Your Request**:
   - Enter the URL for the endpoint you wish to access.
   - Select the appropriate HTTP method (GET, POST, PUT, DELETE).

5. **Check the Response**:
   - **Successful Request**: A successful request will return a **200 OK** status code along with the corresponding JSON data.
   - **Unsuccessful Request**: If the request fails, you will receive an error message with a status code between **400** and **500**. This could indicate issues such as client errors (e.g., bad request) or server errors.

# Testing Exposed Routes

You can check the exposed routes of the Visitor API using both `curl` from the command line and Postman. Below are the detailed steps for each method.

## Using Postman

1. **Open Postman**: If you haven't already, download and install Postman from [Postman’s official website](https://www.postman.com/downloads/).

2. **Create a New Request**: Click on "New" and select "HTTP Request".

3. **Set the URL**: Use the base URL `http://localhost:5000` and append the appropriate endpoint for the route you want to test.

### Available Endpoints

| Method | Endpoint                | Request Body                                       | Description                              |
|--------|-------------------------|---------------------------------------------------|------------------------------------------|
| GET    | /visitors               | None                                              | Retrieve a list of all visitors         |
| POST   | /visitors               | `{ "visitor_name": "John Doe", "assisted_by": "Alice", "visitor_age": 30, "date_of_visit": "2024-07-12", "time_of_visit": "10:00:00", "comment": "First visit" }` | Create a new visitor                     |
| GET    | /visitors/:id           | None                                              | Retrieve details of a specific visitor   |
| PUT    | /visitors/:id           | `{ "visitor_name": "Jane Doe" }` (optional fields) | Update a specific visitor                |
| DELETE | /visitors/:id           | None                                              | Delete a specific visitor                |
| DELETE | /visitors               | None                                              | Delete all visitors                      |

### Steps to Test Each Route in Postman

1. **GET /visitors**:
   - **Method**: GET
   - **URL**: `http://localhost:5000/visitors`
   - **Click "Send"**: You should receive a list of all visitors with a `200 OK` status.

2. **POST /visitors**:
   - **Method**: POST
   - **URL**: `http://localhost:5000/visitors`
   - **Body**: Select "Body" -> "Raw" -> "JSON" and enter:
     ```json
     {
       "visitor_name": "John Doe",
       "assisted_by": "Alice Smith",
       "visitor_age": 30,
       "date_of_visit": "2024-07-12",
       "time_of_visit": "10:00",
       "comment": "First visit"
     }
     ```
   - **Click "Send"**: You should receive a success message with a `200 OK` status.

3. **GET /visitors/:id**:
   - **Method**: GET
   - **URL**: `http://localhost:5000/visitors/1` (replace `1` with the actual ID of a visitor)
   - **Click "Send"**: You should see the details of the specified visitor.

4. **PUT /visitors/:id**:
   - **Method**: PUT
   - **URL**: `http://localhost:5000/visitors/1` (replace `1` with the actual ID)
   - **Body**: Enter the fields you want to update:
     ```json
     {
       "visitor_name": "Jane Doe"
     }
     ```
   - **Click "Send"**: You should receive a success message confirming the update.

5. **DELETE /visitors/:id**:
   - **Method**: DELETE
   - **URL**: `http://localhost:5000/visitors/1` (replace `1` with the actual ID)
   - **Click "Send"**: You should receive a success message confirming the deletion.

6. **DELETE /visitors**:
   - **Method**: DELETE
   - **URL**: `http://localhost:5000/visitors`
   - **Click "Send"**: You should receive a success message confirming that all visitors have been deleted.

## Using curl

You can also use `curl` in the command line to test the API endpoints. Here’s how to do it:

### Examples of curl Commands

1. **GET /visitors**:
   ```bash
   curl -X GET http://localhost:5000/visitors
   ```

2. **POST / /visitors**:

    ```bash
    curl -X POST http://localhost:5000/visitors \
        -H "Content-Type: application/json" \
        -d '{
        "visitor_name": "John Doe",
        "assisted_by": "Alice Smith",
        "visitor_age": 30,
        "date_of_visit": "2024-07-12",
        "time_of_visit": "10:00:00",
        "comment": "First visit"
        }'

    ```

3. **GET /visitors/**

```bash
    curl -X GET http://localhost:5000/visitors/1

```

4. **PUT /visitors/**

```bash
    curl -X PUT http://localhost:5000/visitors/1 \
    -H "Content-Type: application/json" \
    -d '{
    "visitor_name": "Jane Doe"
    }'

```

5. **DELETE /visitors/**
```bash
    curl -X DELETE http://localhost:5000/visitors/1

```

6. **DELETE /visitors**
```bash
    curl -X DELETE http://localhost:5000/visitors

```

## How to use the Application to gain access to the Web Page for Visitors

To access the listed individuals web page on the application you would first need to:

### 1. Configure Environment Variables

Create a .env file in the root of the directory with the following content:

    POSTGRES_USER="user"
    POSTGRES_PASSWORD="pass"
    POSTGRES_DB="db2"
    POSTGRES_HOST="localhost"
    POSTGRES_PORT="5432"

### 2. Run the docker compose using this link:

```sh
docker-compose up -d
```

This will run the container, making it ready to accept connections

### 3. Run Express server 

Run the express server using the following command:
```sh
npm run start
```
This command will run the express server allowing you to then enter the url to the static page on the web browser

## Accessing the Web Page

#### Link to Site
```sh
http://localhost:5000/app

```

This URl will open up the web page , where you will see and be exposed to a empty list of visitors.

Use the `New Visitors` Button to Populate the list.

Once this list has been poopulated.

Use the `Delete` Button to delete a particular visitor on the list.

Use the `Update` Button to Update the information of a visitor on the list.


# Troubleshooting Steps

To resolve any issues or errors that arise during setup or usage, you can follow the steps below:

## Restarting Containers

If you experience any issues, try stopping all containers and then restarting them:

```sh
docker-compose down
docker-compose up -d
```
This will ensure that your containers are properly restarted and any changes are applied.

## AggregateError

If when running the express server you experience the above error, please ensure that you have created a .env file and populated it correctly with the following values:

```sh
    POSTGRES_USER="user"
    POSTGRES_PASSWORD="pass"
    POSTGRES_DB="db2"
    POSTGRES_HOST="localhost"
    POSTGRES_PORT="5432"
```

Before running the server.

If you experience further errors in relation to connection, its advised to:

## Restarting Containers

If you experience any issues, try stopping all containers and then restarting them:

```sh
docker-compose down
docker-compose up -d
```
This will ensure that your containers are properly restarted and any changes are applied.

Or

Stop all containers, remove the gitignore folder using the following command:
```sh
sudo rm -rf gitignore/
```
And restart the container again.