# 📋 `Tasks-CLI` (Node.js Version)

## 🧰 task-cli — Node.js Task Manager (TypeScript)

A lightweight, command-line task manager written in **TypeScript/Node.js**
Manage your to-do list using Node.js and TypeScript — no external libraries required.

### 🚀 Features

- ✅ Add, update, delete tasks
- 🔁 Mark tasks as `in-progress` or `done`
- 📄 List all tasks or by status (`todo`, `in-progress`, `done`)
- 🗃️ Stores data in `tasks.json` in the project directory
- ⚡ Built with **Node.js + TypeScript**, using **only standard modules**

## 📦 Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/node-tasks-cli.git
cd node-tasks-cli
```

### 2. Install dependencies

```bash
npm install
```

### 3. Compile the TypeScript files

```bash
npm run build
```

OR

```bash
npx tsc
```

> This compiles the `src/` directory into `dist/`.

## 🛠️ Usage

```bash
# Add a new task
node dist/index.js add "Buy groceries"

# Update a task
node dist/index.js update 1747603283430 "Buy groceries and cook dinner"

# Delete a task
node dist/index.js delete 1747603283430

# Mark as in progress or done
node dist/index.js mark-in-progress 1747603678253
node dist/index.js mark-done 1747603678253

# List all tasks
node dist/index.js list

# List tasks by status
node dist/index.js list todo
node dist/index.js list in-progress
node dist/index.js list done
```

## 📁 Task Storage Format

Your tasks are stored in a `tasks.json` file like this:

```json
[
  {
    "id": 1747603283430,
    "description": "Buy groceries",
    "status": "todo",
    "createdAt": "2025-05-13T15:00:00Z",
    "updatedAt": "2025-05-13T15:00:00Z"
  }
]
```

## 🧪 Example

```bash
$ node dist/index.js add "Read a book"
Task added successfully (ID: 1747603162675)

$ node dist/index.js list
Tasks:
  ID: 1747603162675
  Description: Read a book
  Status: todo
  Created At: 2025-05-18T21:19:22.675Z
  Updated At: 2025-05-18T21:19:22.675Z
---
```

## 🧼 Clean Build

To rebuild the project after making changes:

```bash
npx tsc
```

## 💡 Make it global (optional)

To use `task-cli` as a command:

1. Add this to `package.json`:

```json
"bin": {
  "task-cli": "./dist/index.js"
}
```

2. Make it executable and link:

```bash
chmod +x dist/index.js
npm link
```

Now you can run:

```bash
task-cli add "Finish the CLI"
```

## ⚖️ License

This project is open-source and free to use under the MIT License.
