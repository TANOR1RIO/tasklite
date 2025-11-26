export type Task = {
  readonly id: string;
  title: string;
  created: Date;
  createdText?: string;
  completed: boolean;
  deadline: string | null;
};

export type Filter = 'all' | 'active' | 'completed';

export function makeTask(title: string): Task {
  return {
    id: generateID(),
    title,
    created: new Date(),
    completed: false,
    deadline: null,
  };
}

function generateID(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}