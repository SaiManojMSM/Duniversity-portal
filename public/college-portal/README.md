# College Portal

This project is a college portal application built using Node.js and Express. It provides functionalities for managing grievances, leave requests, timetables, and exam schedules for students and administrators.

## Project Structure

- **server.js**: Main entry point of the application. Sets up the Express server and defines routes.
- **db.js**: Contains database connection logic and exports database instances.
- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **Dockerfile**: Instructions for building a Docker image for the application.
- **public/**: Directory containing HTML files served by the application.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd college-portal
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   node server.js
   ```
   The application will be available at `http://localhost:3000`.

## Docker Instructions

To build and run the application using Docker:

1. **Build the Docker image**:
   ```
   docker build -t college-portal .
   ```

2. **Run the Docker container**:
   ```
   docker run -p 3000:3000 college-portal
   ```

The application will be accessible at `http://localhost:3000`.

## Usage

- Navigate to the home page to access various functionalities.
- Users can submit grievances, leave requests, and view timetables and exam schedules.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.