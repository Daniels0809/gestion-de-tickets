# HelpDeskPro

**HelpDeskPro** is an internal web application for managing **technical support tickets** for internal and external clients. Its goal is to replace emails, chats, and spreadsheets by centralizing tickets, users, and comments in a modern, typed system using **Next.js + TypeScript**, **App Router**, **MongoDB**, and **Axios**.

---

## 🏢 Use Case

Previously, HelpDeskPro managed support requests through emails, chats, and spreadsheets, which caused problems such as:

- No centralized ticket registry.
- Emails get lost or answered late, affecting customer experience.
- No clear tracking of each ticket's status (open, in progress, resolved, closed).
- Agents don't have priority or reminders for unanswered tickets.
- Management cannot measure response times or global support status.

The solution was to build this **internal web application** that digitizes and optimizes ticket management, users, responses, notifications, and automatic reminders.

---

## 🎯 Project Objectives

- Centralize tickets, users, and comments in a single system.
- Facilitate ticket management: creation, update, agent assignment, and closure.
- Separate views and permissions between clients and agents.
- Send email notifications on key events (creation, response, closure).
- Automate reminders for unanswered tickets through **cron jobs**.
- Apply strong typing, reusable componentization, and development best practices.

---

## 🛠 Technologies Used

- **Next.js (App Router) + TypeScript**
- **React Hooks and Context API** (global state management and authentication)
- **MongoDB with Mongoose** (models: User, Ticket, Comment)
- **Axios** for API consumption
- **NodeMailer** for email sending
- **Tailwind CSS** for responsive UI
- **Cron jobs** for automatic reminders

---

## ⚙ Main Features

### 1. Ticket Management

- Create new tickets from the client panel.
- Edit and update relevant information from the agent panel:
  - Status (`open`, `in_progress`, `resolved`, `closed`)
  - Priority (`low`, `medium`, `high`)
  - Assigned agent
- Close tickets by changing status to `closed`.
- List tickets:
  - Client: only their own tickets.
  - Agent: all tickets with filters by status and priority.
- Typed forms in TypeScript.

### 2. User Management and Authentication

- Login with credential validation.
- Roles: `client` and `agent`.
- Role-based redirection:
  - `client` → User panel.
  - `agent` → Agent dashboard.
- Route protection by role using **App Router** and middleware.
- Centralized session state with Context API.

### 3. Comments and Responses

- Each ticket has a comment thread with:
  - `ticketId`, `author`, `message`, `createdAt`
- Client can add additional comments.
- Agent can respond to tickets.
- Comments displayed in chronological order in ticket detail.

### 4. Reusable UI

- Typed and reusable components:
  - **Button** (variants and sizes)
  - **Badge** (status and priority)
  - **Card** (ticket summary)
- Cards display: title, status, priority, creation date, and actions (view detail, change status).

### 5. API and Services

- Mongoose models: **User**, **Ticket**, **Comment**.
- Endpoints in Next.js App Router:
  - `/api/tickets` → GET, POST, PUT/PATCH, DELETE
  - `/api/comments` → GET by ticket, POST
  - `/api/auth/login` → POST
- Axios services for frontend consumption:
  - `getTickets`, `createTicket`, `updateTicket`, `getCommentsByTicket`, `createComment`

### 6. Email Notifications

- When creating a ticket → email to client.
- When adding comment/response → email to client.
- When closing a ticket → email to client.
- Logic centralized in a reusable email helper or service.

### 7. Error Handling and Validations

- Error capture with try/catch in API and services.
- Clear messages to users:
  - E.g., "Ticket created successfully", "Could not update ticket".
- Validation of required fields (`title`, `description`).
- Role-protected actions: only agents can close tickets or change status to `resolved`.

---

## ✅ Acceptance Criteria

1. **Tickets**:
   - Create, edit, close, list, and filter correctly.
2. **Users and roles**:
   - Functional login and correct redirection.
   - Routes protected by role.
3. **Comments**:
   - Visible threads ordered chronologically.
   - Permissions respected by role.
4. **UI**:
   - Cards with Badge and Button.
   - Typed props and reusable components.
5. **API and Dashboard**:
   - Functional endpoints.
   - Dashboard allows listing, creating, responding, and updating tickets.
6. **Email notifications**:
   - Automatic sending on key events.
7. **Errors and validations**:
   - Clear messages.
   - Roles and required fields respected.

---

## 📂 Project Structure (App Router)

```
/app
  /agentDashboard
    page.tsx
  /clientDashboard
    page.tsx
  /login
    page.tsx
  /register
    page.tsx
  /api
    /tickets
      route.ts
      [id]/route.ts
    /comments
      route.ts
    /auth
      [...nextauth]/route.ts
      /login/route.ts
      /register/route.ts
/components
  Button.tsx
  Badge.tsx
  Card.tsx
  TicketCard.tsx
  TicketModal.tsx
  Navbar.tsx
/database/models
  User.ts
  Ticket.ts
  Comment.ts
/lib
  dbconection.ts
  sendMail.ts
/services
  tikets.ts
  comment.ts
  login.ts
  register.ts
/types
  index.ts
```

---

## 🚀 Installation and Execution

1. Clone the repository:

```bash
git clone <REPOSITORY_URL>
cd gestion-de-tickets
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env`:
4. Run the project in development mode:

```bash
npm run dev
```

5. Access the application:

```
http://localhost:3000
```

---

## 👤 Coder Information

**Name:** Daniel Ospina

**Clan:** Be a Codernnn

**Email:** correo@example.com

**ID Document:** <ID Number>

---

## 📦 Deliverables

1. Link to public GitHub repository.
2. Compressed project (.zip).
3. README with clear instructions and coder information.
4. Screenshots or GIFs of the main flow:
   - Ticket creation (client).
   - Ticket management (agent).
   - Comments view.
