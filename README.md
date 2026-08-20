 # TransitGo

TransitGo is a full-stack public transport management platform designed to make public transportation easier, smarter, and more efficient.

The system provides separate interfaces for commuters, transport operators, and administrators. Users can discover routes, book tickets, track their trips, while operators can manage assigned trips and administrators can manage the overall transport system.

---

## Features

### Commuter

- User registration and login
- Secure authentication
- Browse available transport routes
- View detailed route information
- Book transport tickets
- View booked tickets
- Cancel tickets
- View trip history
- Saved routes
- Notifications and alerts
- Profile management
- Change password
- Emergency contact information
- Profile image upload

### Operator

- Operator dashboard
- View assigned routes
- View route details and stops
- Manage assigned trips
- Start trips
- Complete trips
- Cancel trips
- View passenger information
- View daily trip schedule

### Administrator

- Admin dashboard
- User management
- Add and view users
- Route management
- Add routes
- View route details
- Edit routes
- Delete routes
- Operator management
- Add and view operators
- Booking management
- View all passenger bookings
- View booking details
- Monitor system activity

---

## Technology Stack

### Frontend

- React.js
- React Router
- Axios
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Tools

- Git
- GitHub
- VS Code
- Postman

---

## System Architecture

```text
                    TransitGo
                        |
          +-------------+-------------+
          |             |             |
      Commuter       Operator       Admin
          |             |             |
          +-------------+-------------+
                        |
                    React Frontend
                        |
                      Axios
                        |
                   Express API
                        |
              Authentication Layer
                        |
               Role Authorization
                        |
                    MongoDB
