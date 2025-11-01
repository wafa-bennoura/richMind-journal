# RichMind Journal

A personal development website inspired by Rich Dad Poor Dad that helps people build a strong financial mindset and daily money discipline.

## Features

- **Daily Journal**: Write short reflections about financial actions and decisions
- **Habits Tracker**: Track daily financial habits like saving, investing, and learning
- **Vision Board**: Set and visualize long-term financial goals
- **Secure Authentication**: JWT-based authentication with protected routes
- **Dark Mode**: Toggle between light and dark themes
- **Multi-Language Support**: Available in English, French, Arabic, and Spanish
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Motivational Quotes**: Inspiring quotes from financial experts on the landing page

## Tech Stack

### Frontend
- React 19+
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Express.js
- SQLite3
- JWT (15-minute expiration)
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file:
```bash
# On Windows (PowerShell)
copy .env.example .env

# On Mac/Linux
cp .env.example .env
```

4. Edit the `.env` file and set your JWT secret:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

5. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the example environment file (optional):
```bash
# On Windows (PowerShell)
copy .env.example .env

# On Mac/Linux
cp .env.example .env
```

4. Edit the `.env` file if needed:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Running Both Servers

You need to run both backend and frontend servers simultaneously:
- Terminal 1: `cd backend && npm run dev`
- Terminal 2: `cd frontend && npm run dev`

## API Endpoints

### Authentication

- `POST /api/auth/register`
  - Body: `{ email: string, password: string }`
  - Validation: Email must be unique, password must be at least 8 characters

- `POST /api/auth/login`
  - Body: `{ email: string, password: string }`
  - Returns: `{ accessToken: string, userId: number, email: string }`

### Tasks (Protected - requires authentication)

- `GET /api/tasks` - Get all journal entries and habits
- `POST /api/tasks` - Create a new journal entry or habit
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Vision Board (Protected - requires authentication)

- `GET /api/tasks/vision-board` - Get all goals
- `POST /api/tasks/vision-board` - Create a new goal
- `PUT /api/tasks/vision-board/:id` - Update a goal
- `DELETE /api/tasks/vision-board/:id` - Delete a goal

## Authentication

All `/api/tasks/*` routes are protected by the `requireAuth` middleware. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-access-token>
```

Tokens expire after 15 minutes. The user will need to log in again after expiration.

## Project Structure

```
richMind journal/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── requireAuth.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── database.sqlite (created automatically - ignored by git)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── LanguageContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Journal.jsx
│   │   │   ├── Habits.jsx
│   │   │   └── VisionBoard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Features Details

### Dark Mode
Toggle between light and dark themes. Your preference is saved in localStorage and persists across sessions.

### Multi-Language Support
The application supports 4 languages:
- English (en)
- French (fr)
- Arabic (ar) - with RTL support
- Spanish (es)

Language preference is saved in localStorage.

### Motivational Quotes
The landing page features inspiring quotes from financial experts, including:
- Robert Kiyosaki (Rich Dad Poor Dad)
- Warren Buffett
- Charlie Munger
- And more...

All quotes are available in all supported languages.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

## Acknowledgments

- Inspired by "Rich Dad Poor Dad" by Robert Kiyosaki
- Built with React, Express, and modern web technologies


