# Activity 12 - Request Methods GET, POST, PUT, DELETE (Express + MongoDB)

Author: Nakshatra Gupta
ISU Netid: ng1308@iastate.edu
Date: November 17th, 2026

## Structure
- `backend/`  - Express + MongoDB API (port 8080, database `secoms319`, collection `robot`)
- `frontend/` - React (Vite) + React-Bootstrap app that calls the API with `fetch`
- `Activity12_Robots.postman_collection.json` - Postman requests for all methods

## Run
1. Start MongoDB (`mongodb://127.0.0.1:27017`).
2. Backend:
   ```
   cd backend
   npm install
   npm run seed    # loads robots.json into secoms319.robot
   npm run dev     # nodemon index.js -> http://localhost:8080
   ```
3. Frontend:
   ```
   cd frontend
   npm install
   npm run dev     # http://localhost:5173
   ```

## Endpoints
| Method | URL                  | Description                                      |
|--------|----------------------|--------------------------------------------------|
| GET    | /listRobots          | Read all robots                                  |
| GET    | /:id                 | Read one robot by id                             |
| POST   | /addRobots           | Add a robot (JSON body: id, name, price, description, imageUrl) |
| PUT    | /updateRobot/:id     | Update attributes, e.g. `{ "price": 48.90 }`     |
| DELETE | /deleteRobot/:id     | Delete a robot by id (returns the deleted robot) |

## Frontend components (src/components)
- `Robots.jsx` - GET all robots + GET one robot by id
- `AddRobots.jsx` - POST
- `UpdateRobot.jsx` - PUT
- `DeleteRobot.jsx` - DELETE
