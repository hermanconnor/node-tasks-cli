import path from 'node:path';
import * as fs from 'node:fs/promises';
import { Task, TaskStatus } from './types';

const FILE_PATH = path.resolve(__dirname, '..', 'tasks.json');

function generateId(): number {
  return Date.now();
}

export async function loadTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');

    return JSON.parse(data) as Task[];
  } catch (error: any) {
    if (error?.code === 'ENOENT') {
      await fs.writeFile(FILE_PATH, JSON.stringify([]));
      return [];
    }

    console.error('Error reading tasks file:', error.message);
    process.exit(1);
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (error: any) {
    console.error('Error writing to tasks file:', error.message);
    process.exit(1);
  }
}

export async function addTask(description: string): Promise<void> {
  const tasks = await loadTasks();

  const newTask: Task = {
    id: generateId(),
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  await saveTasks(tasks);

  console.log(`Task added successfully (ID: ${newTask.id})`);
}

export async function updateTask(
  id: string,
  description: string,
): Promise<void> {
  const tasks = await loadTasks();
  const taskId = parseInt(id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    console.error(`Task with ID ${taskId} not found.`);
    return;
  }

  task.description = description;
  task.updatedAt = new Date().toISOString();

  await saveTasks(tasks);

  console.log(`Task with ID ${taskId} updated successfully.`);
}

export async function deleteTask(id: string): Promise<void> {
  const tasks = await loadTasks();
  const taskId = parseInt(id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    console.error(`Task with ID ${taskId} not found.`);
    return;
  }

  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  await saveTasks(updatedTasks);

  console.log(`Task with ID ${taskId} deleted successfully.`);
}

export async function markStatus(
  id: string,
  status: TaskStatus,
): Promise<void> {
  const tasks = await loadTasks();
  const taskId = parseInt(id);

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    console.error(`Task with ID ${taskId} not found.`);
    return;
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();

  await saveTasks(tasks);
  console.log(`Task with ID ${taskId} marked as ${status}.`);
}

export async function listTasks(status?: TaskStatus): Promise<void> {
  const tasks = await loadTasks();

  let filteredTasks = tasks;

  if (status) {
    filteredTasks = tasks.filter((task) => task.status === status);
  }

  if (filteredTasks.length === 0) {
    console.log('No tasks found.');
    return;
  }

  console.log('Tasks:');
  filteredTasks.forEach((task) => {
    console.log(`  ID: ${task.id}`);
    console.log(`  Description: ${task.description}`);
    console.log(`  Status: ${task.status}`);
    console.log(`  Created At: ${task.createdAt}`);
    console.log(`  Updated At: ${task.updatedAt}`);
    console.log('---');
  });
}
