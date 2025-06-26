# HireGlance

HireGlance is a modern, full-featured job board application specifically designed for the healthcare industry in India. It provides a seamless platform for hospitals and clinics to post job openings and for healthcare professionals to find their next career opportunity.

The application features distinct user roles, including a public-facing job board, an administrator panel for managing postings, and a super-admin dashboard for site-wide analytics.

## ✨ Features

-   **Public Job Board:** A clean, responsive interface for job seekers to browse and apply for positions.
-   **Dynamic Ad System:** AI-powered ad generation for promotional content displayed on the site.
-   **Administrator Dashboard:** A secure area for authenticated admins to create, view, and manage job postings.
-   **Super Admin Dashboard:** A high-level analytics panel displaying key site metrics like total applications, ad performance, and more.
-   **Multi-tiered Authentication:** Separate, secure login flows for both administrators and super administrators.
-   **Modern Tech Stack:** Built with the latest web technologies for a fast, reliable, and scalable experience.

## 🚀 Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (with App Router)
-   **UI Library:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Component Library:** [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI:** [Firebase Genkit](https://firebase.google.com/docs/genkit)
-   **Icons:** [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm, pnpm, or yarn

### Installation & Running

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/hireglance-app.git
    cd hireglance-app
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key:
    ```env
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

4.  **Run the development server:**
    The application requires two concurrent processes: the Next.js app and the Genkit development server.

    *   In your first terminal, start the Next.js app:
        ```sh
        npm run dev
        ```
    *   In a second terminal, start the Genkit server:
        ```sh
        npm run genkit:dev
        ```

    The application will be available at `http://localhost:9002`.

## 📄 License

This project is licensed under a proprietary license. See the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Fidhaysha. All Rights Reserved.
