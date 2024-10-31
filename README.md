# Job Portal

## Overview
- Job Portal is a full-stack web application designed to connect job seekers with employers. 

- The platform allows users to log in, apply for jobs, and leave reviews, while companies can sign up and post job vacancies. 
- The application utilizes **Firebase** for authentication and MongoDB for storing job listings and applications.

## Table of Contents
- [Job Portal](#job-portal)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Authentication](#authentication)
    - [Jobs](#jobs)
    - [Applications](#applications)
    - [Reviews](#reviews)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Features
- **User Authentication**: Secure login and signup functionality for job seekers and employers using Firebase.
- **Job Listings**: Companies can post job vacancies with detailed descriptions.
- **Job Applications**: Users can apply for jobs directly through the platform.
- **Reviews**: Job seekers can leave reviews for companies based on their experiences.
- **Responsive Design**: The application is designed to work seamlessly across various devices.

## Tech Stack
- **Frontend**: 
  - React
  - Vite
  - CSS Modules / Tailwind CSS (or other CSS frameworks)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Firebase Authentication

## Installation

To run the Job Portal locally, follow these steps:

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Firebase project set up for authentication

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/preston176/job-portal-alx.git
   cd job-portal-alx
   ```

2. Install dependencies:
   ```bash
   npm install
   # or using yarn
   yarn install
   # or pnpm
   pnpm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `Server` folder of your project and add the following:
   ```env
   MONGODB_URI=your_mongodb_uri
   PASSWORD=your_password
   ```

4. Start the development server:
   ```bash
   cd client
    npm run dev
    cd server
    npm run dev
   ```
- Or use run Start.sh to start both the client and server
```
./start.sh
```

5. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Usage
1. **For Job Seekers**: 
   - Sign up using your email and password.
   - Browse job listings and apply for positions.
   - Leave reviews for companies you have interacted with.

2. **For Employers**: 
   - Sign up to create an account.
   - Post new job vacancies with relevant details.
   - Review applications and manage job listings.

## API Endpoints
Here are the main API endpoints used in the application:

### Authentication
- `POST /api/auth/signup`: Sign up a new user.
- `POST /api/auth/login`: Log in an existing user.
- `GET /api/auth/logout`: Log out the current user.

### Jobs
- `GET /api/jobs`: Retrieve all job listings.
- `POST /api/jobs`: Create a new job listing (requires authentication).
- `GET /api/jobs/:id`: Get details of a specific job.
- `DELETE /api/jobs/:id`: Delete a specific job listing (requires authentication).

### Applications
- `POST /api/applications`: Apply for a job (requires authentication).
- `GET /api/applications`: Retrieve all applications for the logged-in user.

### Reviews
- `POST /api/reviews`: Leave a review for a company (requires authentication).
- `GET /api/reviews`: Retrieve reviews for a specific company.

## Contributing
Contributions are welcome! If you'd like to contribute to Job Portal, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [ALX](https://www.alxafrica.com/) for providing the opportunity to learn and grow as a developer.
- Firebase for providing a robust authentication solution.
- MongoDB for offering a flexible database option.

---

Feel free to reach out if you have any questions or suggestions!
