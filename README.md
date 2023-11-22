# Project Name

Brief project description here.

## Nurse API Endpoints

### 1. Nurse LogIn

- **Method:** POST
- **URL:** `http://localhost:3000/nurse/LogIn`
- **Request Body:**
    ```json
    {
        "fName": "Muhammad Hammad",
        "lName": "Asghar",
        "password": "123"
    }
    ```
- **Response:**
    ```json
    {
        "success": true,
        "nurse": {
            "fName": 15,
            "mI": "Muhammad Hammad",
            "lName": "A",
            "age": "Asghar",
            "gender": 19,
            "phone": "MALE",
            "address": "306-488-9750",
            "password": "SinghPura"
        }
    }
    ```

### 2. Nurse SignUp

- **Method:** POST
- **URL:** `http://localhost:3005/nurse/SignUp`
- **Request Body:**
    ```json
    {
        "fName": "Muhammad Hammad",
        "mI": "A",
        "lName": "Asghar",
        "age": 19,
        "gender": "MALE",
        "phone": "306-488-9750",
        "address": "SinghPura",
        "password": "123"
    }
    ```
- **Response:**
    ```json
    {
        "success": true,
        "nurse": {
            "fName": "Muhammad Hammad",
            "mI": "A",
            "lName": "Asghar",
            "age": 19,
            "gender": "MALE",
            "phone": "306-488-9750",
            "address": "SinghPura"
        }
    }
    ```

### 4. Delete Nurse

- **Method:** Post
- **URL:** `http://localhost:3000/nurse/update`
- **Request Body:**
    ```json
    {
        "id": 1,
    }

    ```
- **Response:**
    ```json
    {
        "success": true,
        "nurse": {
            "employeeId": 1
        }
    }
    ```
