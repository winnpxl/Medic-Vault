# Medic Vault - Medical Cloud Services

A modern medical records management system built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Dashboard**: Overview of patient access, file reviews, external shares, and access alerts
- **Patient Management**: Complete patient registry with search, filtering, and detailed profiles
- **Department Management**: Organize and manage medical departments (Cardiology, Oncology, Pediatrics, Laboratory)
- **File Management**: Upload and organize medical files with metadata
- **Public Medical Folders**: Share medical records externally with access controls
- **Notifications**: Real-time notifications for patient updates, access requests, and system alerts
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, Custom CSS
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Backend**: Express.js, Node.js
- **Database**: Better-SQLite3 (for future use)

## Project Structure

```
src/
├── api/                 # API calls and data fetching
├── components/
│   ├── common/          # Reusable UI components (StatCard, DefaultView)
│   ├── dashboard/       # Dashboard-specific components
│   ├── departments/     # Department views and management
│   ├── folders/         # Public folder management
│   ├── layout/          # Layout components (Sidebar, Header)
│   ├── modals/          # Modal components (upload, create, notifications)
│   └── patients/        # Patient-related components
├── constants/           # Constants and configuration
├── types/               # TypeScript interfaces and types
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles

server/
└── index.ts             # Express server with API endpoints
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (optional):
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key if needed.

### Development

Run the development server:
```bash
npm run dev
```

This will start:
- Express server on `http://localhost:3000`
- Vite dev server with HMR
- API endpoints at `/api/*`

The app will be available at `http://localhost:3000`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Type Checking

Run TypeScript type checking:
```bash
npm run lint
```

## API Endpoints

- `GET /api/patients` - Fetch all patients
- `GET /api/stats` - Fetch dashboard statistics

## Available Scripts

- `npm run dev` - Start development server with Express and Vite
- `npm run dev:vite` - Start Vite dev server only (for frontend development)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run clean` - Clean build directory
- `npm run lint` - Run TypeScript type checking

## Features in Detail

### Patient Management
- View all patients in a searchable, filterable table
- Click on any patient to view their detailed profile
- View patient files and medical records
- Filter by status (Discharged, ICU, Admitted, Outpatient)
- Filter by department

### Department Management
- View all departments with patient counts and storage usage
- Click on a department to see department-specific patients and files
- Create new departments with custom settings
- Manage department permissions and access controls

### File Upload
- Upload medical files with drag-and-drop support
- Add metadata (title, category, date, priority, physician, tags)
- Set access controls and sensitivity levels
- Support for multiple file formats (PDF, JPG, PNG, DOCX, DICOM)

### Notifications
- Real-time notifications for patient updates
- Access request notifications
- External share activity tracking
- System alerts and unusual access patterns
- Customizable notification settings

## Contributing

This project follows industry-standard React and TypeScript conventions. When contributing:

1. Keep components small and focused
2. Use TypeScript interfaces for all props
3. Follow the existing folder structure
4. Write clean, readable code with proper comments
5. Test your changes before submitting

## License

Private - All rights reserved

## Support

For support, please contact the development team.
