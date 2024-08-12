## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/yourusername/your-repository.git
cd your-repository
```
### 2. Build and Run the Containers
To build and start the services defined in docker-compose.yml, run:
```
docker-compose up --build
```
### 3. Access the Services
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- phpMyAdmin: http://localhost:8080 (Login with root and pass123)

### 4. Stopping the Containers
To stop and remove the running containers, use:
```
docker-compose down
```
