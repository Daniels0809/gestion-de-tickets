# HelpDeskPro

**HelpDeskPro** es una aplicación web interna para la gestión de **tickets de soporte técnico** de clientes internos y externos. Su objetivo es reemplazar correos, chats y hojas de cálculo, centralizando los tickets, usuarios y comentarios en un sistema moderno y tipado con **Next.js + TypeScript**, usando **App Router**, **MongoDB** y **Axios**.

---

## 🏢 Caso de uso

Actualmente, HelpDeskPro gestionaba los requerimientos de soporte mediante correos, chats y hojas de cálculo, lo que generaba problemas como:

- No hay un registro centralizado de los tickets.  
- Correos se pierden o se responden tarde, afectando la experiencia del cliente.  
- No hay seguimiento claro del estado de cada ticket (abierto, en progreso, resuelto, cerrado).  
- Los agentes no tienen prioridad ni recordatorios sobre tickets sin respuesta.  
- La gerencia no puede medir tiempos de respuesta ni estados globales del soporte.  

La solución fue construir esta **aplicación web interna** que digitaliza y optimiza la gestión de tickets, usuarios, respuestas, notificaciones y recordatorios automáticos.

---

## 🎯 Objetivos del proyecto

- Centralizar tickets, usuarios y comentarios en un único sistema.  
- Facilitar la gestión de tickets: creación, actualización, asignación de agente y cierre.  
- Separar vistas y permisos entre clientes y agentes.  
- Enviar notificaciones por correo en eventos clave (creación, respuesta, cierre).  
- Automatizar recordatorios para tickets sin respuesta mediante **cron jobs**.  
- Aplicar tipado fuerte, componentización reutilizable y buenas prácticas de desarrollo.

---

## 🛠 Tecnologías utilizadas

- **Next.js (App Router) + TypeScript**  
- **React Hooks y Context API** (gestión de estado global y autenticación)  
- **MongoDB con Mongoose** (modelos: User, Ticket, Comment)  
- **Axios** para consumo de API  
- **NodeMailer** o librería de envío de correos  
- **CSS/SCSS o Tailwind CSS** para UI responsiva  
- **Cron jobs** para recordatorios automáticos  

---

## ⚙ Funcionalidades principales

### 1. Gestión de Tickets

- Crear nuevos tickets desde el panel del cliente.  
- Editar y actualizar información relevante desde el panel del agente:
  - Estado (`open`, `in_progress`, `resolved`, `closed`)  
  - Prioridad (`low`, `medium`, `high`)  
  - Agente asignado  
- Cerrar tickets cambiando el estado a `closed`.  
- Listar tickets:
  - Cliente: solo sus propios tickets.  
  - Agente: todos los tickets con filtros por estado y prioridad.  
- Formularios tipados en TypeScript.

### 2. Gestión de Usuarios y Autenticación

- Login con validación de credenciales.  
- Roles: `client` y `agent`.  
- Redirección según rol:
  - `client` → Panel de usuario.  
  - `agent` → Dashboard de agente.  
- Protección de rutas según rol usando **App Router** y middleware.  
- Estado de sesión centralizado con Context API.

### 3. Comentarios y Respuestas

- Cada ticket tiene un hilo de comentarios con:
  - `ticketId`, `author`, `message`, `createdAt`  
- Cliente puede agregar comentarios adicionales.  
- Agente puede responder tickets.  
- Comentarios mostrados en orden cronológico en detalle de ticket.

### 4. UI Reutilizable

- Componentes tipados y reutilizables:
  - **Button** (variantes y tamaños)  
  - **Badge** (estado y prioridad)  
  - **Card** (resumen de ticket)  
- Cards muestran: título, estado, prioridad, fecha de creación y acciones (ver detalle, cambiar estado).  

### 5. API y Servicios

- Modelos Mongoose: **User**, **Ticket**, **Comment**.  
- Endpoints en Next.js App Router:
  - `/api/tickets` → GET, POST, PUT/PATCH, DELETE  
  - `/api/comments` → GET por ticket, POST  
  - `/api/auth/login` → POST  
- Servicios Axios para consumo en front:
  - `getTickets`, `createTicket`, `updateTicket`, `getCommentsByTicket`, `createComment`

### 6. Notificaciones por Correo

- Al crear un ticket → correo al cliente.  
- Al agregar comentario/respuesta → correo al cliente.  
- Al cerrar un ticket → correo al cliente.  
- Lógica centralizada en un helper o servicio de correo reutilizable.

### 7. Manejo de Errores y Validaciones

- Captura de errores en try/catch en API y servicios.  
- Mensajes claros al usuario:
  - Ej.: “Ticket creado correctamente”, “No se pudo actualizar el ticket”.  
- Validaciones de campos obligatorios (`title`, `description`).  
- Acciones protegidas según rol: solo agentes pueden cerrar tickets o cambiar estado a `resolved`.  

---

## ✅ Criterios de aceptación

1. **Tickets**:
   - Crear, editar, cerrar, listar y filtrar correctamente.  
2. **Usuarios y roles**:
   - Login funcional y redirección correcta.  
   - Rutas protegidas según rol.  
3. **Comentarios**:
   - Hilos visibles y ordenados cronológicamente.  
   - Permisos respetados según rol.  
4. **UI**:
   - Cards con Badge y Button.  
   - Props tipadas y componentes reutilizables.  
5. **API y Dashboard**:
   - Endpoints funcionales.  
   - Dashboard permite listar, crear, responder y actualizar tickets.  
6. **Notificaciones por correo**:
   - Envío automático en eventos clave.  
7. **Errores y validaciones**:
   - Mensajes claros.  
   - Roles y campos obligatorios respetados.  

---

## 📂 Estructura de proyecto (App Router)

/app
/dashboard # Panel de agente
page.tsx
ticket/[id]/page.tsx
/tickets # Panel de cliente
page.tsx
/auth
login/page.tsx
register/page.tsx
/api
/tickets
route.ts
/comments
route.ts
/auth
login/route.ts
/components
Button.tsx
Badge.tsx
Card.tsx
/context
AuthContext.tsx
/lib
db.ts # Conexión a MongoDB
mail.ts # Servicio de correos
/services
ticketService.ts
commentService.ts
/types
User.ts
Ticket.ts
Comment.ts

yaml
Copiar código

---

## 🚀 Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd helpdeskpro
Instalar dependencias:

bash
Copiar código
npm install
Configurar variables de entorno en .env:

ini
Copiar código
MONGODB_URI=<>
EMAIL_USER=<correo_remitente>
EMAIL_PASS=<contraseña_correo>
Ejecutar proyecto en modo desarrollo:

bash
Copiar código
npm run dev
Acceder a la aplicación:
http://localhost:3000

👤 Datos del Coder
Nombre: Daniel Ospina

Clan: Be a Codernnn

Correo: correo@example.com

Documento de identidad: <Número de documento>

📦 Entregables
Enlace al repositorio GitHub (público).

Proyecto comprimido (.zip).

README con instrucciones claras y datos del coder.

Capturas o GIFs del flujo principal:

Creación de ticket (cliente).

Gestión de ticket (agente).

Vista de comentarios.

