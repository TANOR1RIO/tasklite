import type { Task } from "../entities/task";
import styled from "@emotion/styled";

type TaskItemProps = {
    task: Task;
    onRemove: (id: string) => void;
    onEdit: (task: Task) => void;
    onToggle: (id: string) => void;
    showDescriptionId?: string | null; 
    onShowDescription?: (id: string) => void; 
};

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
`;

const TaskInfo = styled.div`
    flex-grow: 1;
    margin-right: 16px;
`;

const TaskTitle = styled.h3<{ completed: boolean }>`
    margin: 0 0 4px 0;
    color: ${p => p.completed ? p.theme.colors : p.theme.colors.text};
    text-decoration: ${p => p.completed ? 'line-through' : 'none'};
    font-size: 1rem;
    cursor: pointer;
    user-select: none;
`;

const TaskDescription = styled.p`
    margin: 0 0 4px 0;
    font-size: 0.85rem;
    color: #666;
    white-space: pre-wrap; /* чтобы сохранять переносы строк */
`;

const TaskDate = styled.p`
    margin: 0;
    font-size: 0.75rem;
    color: #888;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 8px;
`;

const EditButton = styled.button`
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;

    &:hover {
        background-color: #f0f0f0;
    }
`;

const DeleteButton = styled(EditButton)``;

const MoreButton = styled.button`
    background: none;
    border: none;
    font-size: 0.8rem;
    cursor: pointer;
    color: #666;
    margin-left: 8px;

    &:hover {
        color: #333;
    }
`;

export function TaskItem({
    task,
    onRemove,
    onEdit,
    onToggle,
    showDescriptionId,
    onShowDescription
}: TaskItemProps) {
    const isDescriptionVisible = showDescriptionId === task.id;

    return (
        <Item>
            <TaskInfo>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TaskTitle completed={task.completed} onClick={() => onToggle(task.id)}>
                        {task.title}
                    </TaskTitle>
                    {task.createdText && (
                        <MoreButton
                            onClick={() => onShowDescription?.(task.id)}
                            title={isDescriptionVisible ? "Скрыть описание" : "Показать описание"}
                        >
                            {isDescriptionVisible ? "..." : "..."}
                        </MoreButton>
                    )}
                </div>

                {task.createdText && isDescriptionVisible && (
                    <TaskDescription>{task.createdText}</TaskDescription>
                )}

                <TaskDate>{task.created.toLocaleString()}</TaskDate>
            </TaskInfo>

            <ButtonContainer>
                <EditButton 
                    onClick={() => onEdit(task)}
                    title="Редактировать"
                >
                    ✏️
                </EditButton>
                <DeleteButton 
                    onClick={() => onRemove(task.id)} 
                    title="Удалить"
                >
                    ❌
                </DeleteButton>
            </ButtonContainer>
        </Item>
    );
}