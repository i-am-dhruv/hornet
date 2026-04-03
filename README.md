# Hornet - Next.js Web Application

A modern Next.js application built with React, TypeScript, Tailwind CSS, and Three.js.

## 🚀 Quick Start

### Option 1: Automatic Setup (Recommended)

#### For Linux/Mac:
```bash
chmod +x setup.sh
./setup.sh
```

#### For Windows (PowerShell):
```powershell
npm run dev:auto
```

The script will:
- ✅ Install all dependencies (with `--legacy-peer-deps`)
- ✅ Start the development server on `http://localhost:9002`
- ✅ Open the application in your browser

---

### Option 2: Using VS Code Tasks

1. Open the project in VS Code
2. Press `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
3. Select **Tasks: Run Task**
4. Choose **"Install & Run Dev Server"**

The server will start automatically with all dependencies installed!

---

### Option 3: Dev Container (Docker)

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Install VS Code Extension: [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Click on **"Reopen in Container"** when prompted (or press `Ctrl+Shift+P` → "Reopen in Container")
4. VS Code will automatically:
   - Set up the container
   - Install dependencies
   - Start the dev server

Everything runs inside a containerized environment!

---

### Option 4: Manual Setup

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

The app will be available at **http://localhost:9002**

---

## 📦 Available Scripts

- `npm run dev` - Start development server (port 9002)
- `npm run setup` - Install dependencies only
- `npm run dev:auto` - Install dependencies + start dev server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

---

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Headless UI components
- **Three.js** - 3D graphics
- **React Three Fiber** - Three.js + React
- **Firebase** - Backend & Authentication
- **GSAP** - Animation library
- **React Hook Form** - Form management
- **Zod** - Data validation

---

## 🌐 Project Structure

```
hornet/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   │   └── ui/          # Shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── .vscode/             # VS Code configuration
├── .devcontainer/       # Dev container setup
├── setup.sh            # Quick setup script
└── package.json        # Dependencies
```

---

## 🔧 Environment Setup

For Firebase and other services, create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 🐛 Troubleshooting

### Dependencies won't install?
This project uses `--legacy-peer-deps` due to Three.js version compatibility.
```bash
npm install --legacy-peer-deps
```

### Port 9002 already in use?
Kill the process or use a different port:
```bash
npm run dev -- -p 3000
```

### Module warnings in Node console?
These are normal warnings. The `"type": "module"` in `package.json` handles ES modules correctly.

---

## 📝 Notes

- The development server runs on **port 9002** (configurable in `package.json`)
- Hot reload is enabled - changes are reflected instantly
- Type checking is enforced with TypeScript

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

---

## 📄 License

MIT

---

Made with ❤️ by one of the hornet's fan
