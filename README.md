# Task Management API

## Overview
This is a simple Task Management API built using Node.js and Express. 
It allows users to create, retrieve, update, and delete tasks. Tasks are stored in a JSON file (`task.`).

## API Endpoints

### 1. Get All Tasks
   - Endpoint: `GET /tasks`
   - Query Parameters:
     - `completed` (boolean, optional) - Filter tasks by completion status.
     - `sortBy` (string, optional) - Sort by `dateTime`.
     - `order` (string, optional) - Sorting order (`asc` or `desc`).
   - Response: Returns a list of tasks.
   - Example Request:
     
    curl -X GET "http://localhost:3000/tasks?completed=true&sortBy=dateTime&order=asc"
    

### 2. Get Task By ID
   - Endpoint: `GET /tasks/:id`
   - Response: Returns task details for the given `id`.
   - Example Request:
     
    curl -X GET "http://localhost:3000/tasks/1"
    

### 3. Get Tasks by Priority
   - Endpoint: `GET /tasks/priority/:level`
   - Response: Returns tasks matching the given priority level.
   - Example Request:
     
    curl -X GET "http://localhost:3000/tasks/priority/high"
    

### 4. Create a Task
   - Endpoint: `POST /tasks`
   - Headers: `Content-Type: application/`
   - Body Parameters:
        {
            "title": "Task 1",
            "description": "This is a sample task.",
            "completed": false,
            "priority": "high"
        }
        
   - Response: Task created successfully.
   - Example Request:
     
    curl -X POST "http://localhost:3000/tasks" \
    -H "Content-Type: application/" \
    -d '{"title": "Task 1", "description": "This is a sample task.", "completed": false, "priority": "high"}'
    

### 5. Update a Task
   - Endpoint: `PUT /tasks/:id`
   - Headers: `Content-Type: application/`
   - Body Parameters:
        {
            "description": "Updated task description.",
            "priority": "low"
        }
    
   - Response: Task updated successfully.
   - Example Request:
     
    curl -X PUT "http://localhost:3000/tasks/1"
    -H "Content-Type: application/" \
    -d '{"description": "Updated task description.", "priority": "low"}'
    

### 6. Delete a Task
   - Endpoint: `DELETE /tasks/:id`
   - Response: Task deleted successfully.
   - Example Request:
     
    curl -X DELETE "http://localhost:3000/tasks/1"
    

## Error Handling
- If a task is not found, a `404 Not Found` response is returned.
- If there is an issue with the request, a `400 Bad Request` or `500 Internal Server Error` is returned.