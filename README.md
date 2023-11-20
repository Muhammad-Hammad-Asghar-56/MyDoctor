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
- **URL:** `http://localhost:3000/nurse/SignUp`
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

### 3. Get Nurses

- **Method:** GET
- **URL:** `http://localhost:3000/admin/getNurses`
- **Response:**
    ```json
    {
        "success": true,
        "nurses": [
            {
                "fName": 1,
                "mI": "Alice",
                "lName": "M",
                "age": "Smith",
                "gender": 32,
                "phone": "Female",
                "address": "123-456-7890",
                "password": "123 Main St"
            },
            {
                "fName": 2,
                "mI": "Bob",
                "lName": "J",
                "age": "Johnson",
                "gender": 28,
                "phone": "Male",
                "address": "987-654-3210",
                "password": "456 Elm St"
            }
        ]
    }
    ```
