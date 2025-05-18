import path from 'node:path';
import * as fs from 'node:fs/promises';
import { Task, TaskStatus } from './types';

const FILE_PATH = path.resolve(__dirname, '..', 'tasks.json');

async function loadTasks(): Promise<Task[]> {
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

async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (error: any) {
    console.error('Error writing to tasks file:', error.message);
    process.exit(1);
  }
}
