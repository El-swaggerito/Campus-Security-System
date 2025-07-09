# Campus Security System

## Overview
The Campus Security System is a web application designed to enhance safety and security on campus. It allows users to report incidents in real-time, alerts security personnel, and provides essential tools for managing campus safety. The system leverages a Next.js frontend for a modern user experience and a Python Flask backend for data processing and API services.

## Features

- **Real-time Incident Reporting**: Users can report suspicious activities instantly.
- **Alerts and Notifications**: Immediate alerts sent to security personnel upon incident reporting.
- **User Authentication**: Secure login for students and staff.
- **Location Tracking**: GPS functionality to assist in locating incidents.
- **Emergency Contacts**: Quick access to emergency services.
- **Dashboard for Security Personnel**: A dedicated interface for monitoring and managing incidents.
- **Data Analytics**: Insights into reported incidents to improve safety measures.
- **Feedback Mechanism**: Users can provide feedback to enhance the system.

## Project Structure

```
├── app/                            # Next.js app directory (frontend)
│   ├── api/                        # API routes for Next.js backend
│   ├── (pages)/                    # Page components
│   ├── globals.css
│   └── layout.tsx
├── components/                     # Shared React components
├── public/                         # Static assets
├── scripts/                        # SQL scripts for database setup
├── styles/                         # Global styles
├── app.py                          # Flask backend API
├── analysis.py                     # Python script for data analysis (likely generates static assets)
├── create_data.py                  # Python script for data generation
├── campus_incidents.csv            # Sample incident data (used by Flask API)
├── feature_importance.png          # Output from analysis.py
├── incident_map.html               # Output from analysis.py
├── severity_heatmap.png            # Output from analysis.py
├── next.config.js                  # Next.js configuration
├── package.json                    # Frontend dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## Technology Stack

- **Frontend**: Next.js (TypeScript, React)
- **Backend**: Python (Flask), Next.js (API Routes)
- **Database**: Supabase (PostgreSQL) - *inferred from `lib/supabase.ts` and `scripts/`*
- **Styling**: Tailwind CSS

## Installation

To set up the Campus Security System locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/El-swaggerito/Campus-Security-System.git
    cd Campus-Security-System
    ```

2.  **Set up Frontend:**
    Install Node.js dependencies:
    ```bash
    npm install
    ```
    *Note: You might need to configure Supabase environment variables. Create a `.env.local` file in the root directory and add your Supabase URL and Anon Key:*
    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

3.  **Set up Backend (Python Flask API):**
    It's recommended to use a virtual environment for Python projects.
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
    Install Python dependencies (assuming a `requirements.txt` file or manual installation of Flask and Pandas):
    ```bash
    pip install Flask pandas
    ```
    *(If a `requirements.txt` file is added in the future, use `pip install -r requirements.txt`)*

4.  **Database Setup (Optional - if using local Supabase/Postgres):**
    The `scripts/` directory contains SQL files (`create-tables.sql`, `seed-data.sql`) that can be used to set up the database schema and populate it with initial data if you are running a local PostgreSQL instance or want to set up your Supabase instance manually.

## Running the Application

1.  **Start the Frontend (Next.js):**
    ```bash
    npm run dev
    ```
    This will typically start the frontend on `http://localhost:3000`.

2.  **Start the Backend (Flask API):**
    Open a new terminal, navigate to the project root, and activate the virtual environment:
    ```bash
    source venv/bin/activate # On Windows use `venv\Scripts\activate`
    ```
    Run the Flask application:
    ```bash
    flask run
    ```
    This will typically start the Python backend API on `http://localhost:5000`. The `app.py` file provides endpoints like `/api/incidents`, `/api/trends`, etc.

    *Note: The `analysis.py` script seems to generate static files (`severity_heatmap.png`, `feature_importance.png`, `incident_map.html`) that are then served by the Flask API. You may need to run `python analysis.py` first to generate these files if they are not already present or if you update the data.*

## Usage

Once both frontend and backend servers are running:
- Access the web application via `http://localhost:3000` in your browser.
- Users can log in (if authentication is fully set up) and start reporting incidents.
- The Flask API serves data to the frontend and potentially directly for data visualization.

## Deployment

The application is deployed on Vercel. You can access the live version [here](https://vercel.com/muhammad-zayyad-mukhtars-projects/v0-campus-security-blgxqot2eef).
*(Note: The Vercel deployment likely only covers the Next.js frontend. The Python Flask backend might be deployed separately or its functionality might be partially replicated via Next.js API routes for the Vercel deployment.)*

## License

This project is licensed under the MIT License. See the `LICENSE` file (if it exists, otherwise assume MIT as per original README) for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## Contact

For any inquiries, please contact:
- **Name**: Muhammad Zayyad Mukhtar
- **Email**: [your-email@example.com](mailto:your-email@example.com)
