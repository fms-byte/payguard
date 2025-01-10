# PayGuard: Payment Tracking and Verification System

PayGuard is a secure, robust system for tracking and verifying payments. This application leverages modern web technologies to provide seamless user authentication, efficient payment management, and document verification.

---

## **Project Overview**

**Deadline:** January 13th, 2025, 05:00 UTC  
**Tech Stack:**
- **Frontend:** Next.js (TypeScript, Tailwind CSS, Shadcn UI)
- **Backend:** Supabase (Auth and Database)
- **Core Features:** User authentication, admin dashboard, document uploads, payment tracking

---

## **Features**

### **Authentication**
- Secure user authentication using Supabase.
- Role-based access control for users and admins.

### **Payment Management**
- Create, track, and manage payments.
- Admins can approve or reject payments.

### **Document Upload**
- Upload and verify documents with real-time status tracking.
- Admins manage and verify uploaded files.

### **Dashboards**
- User Dashboard: Track payment status and manage uploads.
- Admin Dashboard: Monitor and control payments and documents.

---

## **Project Progress**

### **Completed Tasks**
1. Set up Next.js project with required configurations.
2. Installed and configured Supabase SSR (`@supabase/ssr`, `@supabase/supabase-js`).
3. Established basic project structure and middleware.
4. Developed frontend pages using Shadcn components and Tailwind CSS.
5. Built reusable components for the frontend.

### **Upcoming Tasks**
- **Authentication System:** Implement authentication with Supabase.
- **Data Validation:** Add validation using `zod`.
- **Database Design:** Finalize and connect the database (Supabase schema).
- **Payment Management System:** Create APIs for payment processing.
- **Document Upload Functionality:** Integrate Supabase Storage for file uploads.
- **Dashboards:** Build detailed user and admin dashboards.
- **Deployment:** Deploy the application to production.

---

## **Folder Structure**

```
payguard/
├── app/
│   ├── auth/            # Authentication Pages
│   ├── (dashboard)/     # User Dashboard Pages
│   ├── admin/           # Admin Dashboard Pages
│   ├── api/             # API Endpoints
│   ├── layout.tsx       # Root Layout
│   └── page.tsx         # Landing Page
├── components/          # Reusable Components
│   ├── auth/            # Authentication Components
│   ├── dashboard/       # Dashboard Components
│   ├── admin/           # Admin Components
│   ├── layout/          # Layout Components (Header, Footer, Sidebar)
│   ├── ui/              # UI Components (Button, Card, etc.)
│   └── shared/          # Shared Components (Loading Spinner, etc.)
├── lib/                 # Utilities and Configuration
│   ├── supabase/        # Supabase Client and Server
│   ├── utils/           # Helper Functions (Auth, Date Formatting)
│   └── validations/     # Data Validation Schemas (zod)
├── public/              # Public Assets (Images, Icons)
├── middleware.ts        # Middleware for Authentication
├── next.config.js       # Next.js Configuration
├── tailwind.config.ts   # Tailwind CSS Configuration
└── tsconfig.json        # TypeScript Configuration
```

---

## **Database Design**

### **Users Table**
| Field      | Type      | Description                           |
|------------|-----------|---------------------------------------|
| `id`       | UUID      | Primary Key                          |
| `email`    | VARCHAR   | Unique email                         |
| `password` | HASHED    | Managed by Supabase                  |
| `role`     | VARCHAR   | User role: `admin` or `user`          |
| `created_at` | TIMESTAMP | Account creation date               |

### **Payments Table**
| Field      | Type      | Description                           |
|------------|-----------|---------------------------------------|
| `id`       | UUID      | Primary Key                          |
| `title`    | VARCHAR   | Payment description/title            |
| `amount`   | NUMERIC   | Payment amount                       |
| `status`   | VARCHAR   | Status: `pending`, `approved`, `rejected` |
| `user_id`  | UUID      | Foreign Key (references Users.id)     |
| `created_at` | TIMESTAMP | Payment creation date               |

### **Documents Table**
| Field      | Type      | Description                           |
|------------|-----------|---------------------------------------|
| `id`       | UUID      | Primary Key                          |
| `user_id`  | UUID      | Foreign Key (references Users.id)     |
| `file_url` | TEXT      | File URL in Supabase Storage         |
| `status`   | VARCHAR   | Status: `pending`, `approved`, `rejected` |
| `uploaded_at` | TIMESTAMP | Upload date                        |

---

## **API Endpoints**

### **1. Authentication**
- **POST** `/api/auth/signup`: Register users.
- **POST** `/api/auth/login`: Login users.

### **2. Payment Management**
- **POST** `/api/payments`: Create a payment request.
  - Validate input (title, amount).
  - Assign the logged-in user as `user_id`.
  - Default status: `pending`.
- **GET** `/api/payments`: Retrieve payment records.
  - Users: View their payments.
  - Admins: View all payments.
- **PUT** `/api/payments/:id`: Update payment status (admin only).
  - Approve or reject payments.

### **3. Document Upload**
- **POST** `/api/documents`: Upload a document.
  - Validate file type and size (max: 5 MB).
  - Store the file in Supabase Storage and save metadata in the `Documents` table.
  - Default status: `pending`.
- **PUT** `/api/documents/:id`: Update verification status (admin only).
  - Mark documents as `approved` or `rejected`.

### **4. Admin Dashboard**
- **GET** `/api/dashboard/payments-summary`: Retrieve payment summaries (total payments, breakdown by status).
- **GET** `/api/dashboard/payments`: Filter payments by status/date.

---

## **How to Run the Project**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/payguard.git
   cd payguard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Supabase:
   - Add your Supabase credentials in `.env`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
     NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`.

---

## **Deployment**

- Use **Vercel** for deploying the frontend.
- Use **Supabase** for database and authentication.

---

## **Contributing**

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add feature name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## **License**

This project is licensed under the MIT License.
