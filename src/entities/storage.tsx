import type { Task } from './task';

const STORAGE_KEY = 'tasks';

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasks(): Task[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return parsed.map((task: any) => {
      return {
        ...task,
        created: new Date(task.created),
      };
    });
  } catch (e) {
    console.error('Failed to parse tasks from localStorage', e);
    return [];
  }
}