#  ResumeX AI - AI-Powered Resume Analyzer 🚀

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E77D8?style=for-the-badge&logo=google-gemini&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Analyze your resume against any job description with the power of AI to get a detailed, professional report and land your dream job.



---

## ✨ About The Project

ResumeX AI is a full-stack web application built to give job seekers a critical advantage in today's competitive market. Instead of blindly submitting applications, users can get instant, data-driven feedback on their resume's compatibility with a specific role.

The application leverages the Google Gemini API to perform a deep, section-by-section analysis, providing a comprehensive report that includes an overall match score, keyword optimization, actionable suggestions, and even an AI-generated cover letter.

### Key Features

* **🤖 Detailed AI Analysis:** Get a multi-layered report on your resume's strengths and weaknesses.
* **📊 Dynamic Score & Rating:** Receive an overall compatibility score and a gamified star rating (from Bronze to Diamond) to track your improvements.
* **🔑 Keyword Matching:** Instantly see which critical keywords from the job description are present or missing in your resume.
* **✍️ AI Cover Letter Generation:** Create a tailored, professional cover letter with a single click.
* **📄 PDF & DOCX Export:** Download your full report and cover letter in universally accepted formats.
* **📱 Fully Responsive Design:** A beautiful and seamless experience on any device, from mobile to desktop.
* **🎨 Light & Dark Mode:** A manual theme toggle for user preference.

---

## 🛠️ Built With

This project utilizes a modern, powerful tech stack to deliver a fast and feature-rich experience.

* **Framework:** [Next.js](https://nextjs.org/) (with App Router)
* **Frontend:** [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/)
* **Animations & Charting:** [Framer Motion](https://www.framer.com/motion/), [Recharts](https://recharts.org/)
* **Backend:** Next.js Server Actions
* **AI Engine:** [Google Gemini API](https://ai.google.dev/)
* **Document Generation:** [jsPDF](https://github.com/parallax/jsPDF), [docx](https://docx.js.org/), [file-saver](https://github.com/eligrey/FileSaver.js/)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js (version 18.x or higher) and npm installed on your machine.

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/Sarkaris/ResumeX
    ```
2.  **Navigate to the project directory**
    ```sh
    cd ResumeX
    ```
3.  **Install NPM packages**
    ```sh
    npm install
    ```
4.  **Set up your environment variables**
    * Create a file named `.env.local` in the root of your project.
    * Add your Google Gemini API key to this file:
        ```env
        GOOGLE_API_KEY="YOUR_API_KEY_HERE"
        ```
5.  **Run the development server**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## ⚙️ How It Works

The application follows a modern Server Component-driven architecture.

1.  **User Input:** The user provides a resume, job title, and job description on a client-side form.
2.  **Server Action:** The form submission securely calls a Next.js Server Action.
3.  **Backend Processing:** The server action parses the resume file, formats the data, and sends a detailed prompt to the Google Gemini API.
4.  **AI Analysis:** The Gemini API returns a structured JSON object containing the complete analysis.
5.  **Data Transfer:** The server action encodes the result, stores it in a secure, temporary cookie, and redirects the user.
6.  **Results Page:** The dynamic results page reads the data from the cookie and renders the professional report dashboard.

---

## 📜 License

Will be Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

Made in India with ♥️ by Niranjan Kulkarni and Shivam Patil. 

Project Link: https://resume-x-orcin.vercel.app/
