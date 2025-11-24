import type { Task } from "./task";

const STORAGE_KEY = 'tasks'; // ← одинаковый ключ

export function saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function loadTasks(): Task[] {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    try {
        const parsed = JSON.parse(saved);
        return parsed.map((task: any) => {
            // Если в задаче есть поле created — восстановим дату
            if (task.created) {
                return { ...task, created: new Date(task.created) };
            }
            return task;
        });
    } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
        return [];
    }
}