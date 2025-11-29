# Zero-Waste FoodLink 🍎🤝

**Zero-Waste FoodLink** is a web platform designed to bridge the gap between abundance and scarcity. It connects restaurants with surplus food to NGOs and charities that feed the hungry, streamlining the donation process to reduce food waste and maximize social impact.

## ✨ Features

-   **Dual-Role Authentication**: Secure login and signup for both **Restaurants** (Donors) and **NGOs** (Recipients).
-   **Interactive Dashboards**:
    -   **Restaurant Dashboard**: Post new donations, track status, and view impact statistics (CO₂ saved, meals provided).
    -   **NGO Dashboard**: Browse available donations, claim food, and view pickup details.
-   **Smart Donation Flow**:
    -   Easy-to-use form for listing food items.
    -   **Image Upload**: Drag-and-drop functionality to add photos of food items.
    -   **AI-Ready**: Structure in place for AI-powered shelf-life predictions and matching.
-   **Visual Excellence**:
    -   **Food Doodles**: Custom, animated background patterns for a friendly and engaging user experience.
    -   **Dark Mode**: Fully supported system-wide dark theme.
    -   **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
-   **Real-time Status**: Track donations from "Pending" to "Collected".

## 🛠️ Tech Stack

### Frontend
-   **Framework**: [React](https://react.dev/) (v18+) with [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Font**: [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts)

### Backend
-   **Runtime**: Node.js
-   **Structure**: MVC Architecture (Controllers, Models, Routes)
-   *(Backend implementation is currently in progress)*

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/zero-waste-foodlink.git
    cd Zero-Waste-Foodlink
    ```

2.  **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    ```

3.  **Run the Development Server**
    ```bash
    npm run dev
    ```

4.  **Open the App**
    Visit `http://localhost:5173` in your browser.

## 📂 Project Structure

```
Zero-Waste-Foodlink/
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (ImageModal, ThemeToggle, etc.)
│   │   ├── pages/          # Application pages (Landing, Auth, Dashboards)
│   │   ├── types/          # TypeScript definitions
│   │   └── lib/            # Utilities
│   └── ...
├── backend/                # Node.js Backend (Structure)
│   ├── controllers/
│   ├── models/
│   └── routes/
└── README.md
```

## 🎨 Design System

The project uses a curated color palette:
-   **Primary**: Emerald Green (`emerald-600`) representing freshness and sustainability.
-   **Secondary**: Stone Grays (`stone-50` to `stone-900`) for a warm, organic background.
-   **Typography**: "Outfit" sans-serif font for a modern, clean aesthetic.

---

Made with ❤️ for a zero-waste future.
