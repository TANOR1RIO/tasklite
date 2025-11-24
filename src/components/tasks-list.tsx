import type { Task } from "../entities/task";
import { TaskItem } from "./task-item";
import styled from "@emotion/styled";

type TasksListProp = {
  tasks: Task[];
  onRemove: (id: string) => void;
  onEdit: (task: Task) => void;
   onToggle: (id: string) => void 
  showDescriptionId?: string | null; 
  onShowDescription?: (id: string) => void;
};

const StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 12px; 
    list-style: none;
    padding: 0;
`;

export function TasksList(props: TasksListProp) {
    const list = props.tasks.map(task => 
        <TaskItem 
            task={task} 
            key={task.id} 
            onEdit={props.onEdit} 
            onRemove={props.onRemove}
            onToggle={props.onToggle}
            showDescriptionId={props.showDescriptionId}
            onShowDescription={props.onShowDescription}
        />
    );
    
    const result = list.length > 0 ? list : <li style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Список пуст</li>;
    return <StyledUl>{result}</StyledUl>;
}