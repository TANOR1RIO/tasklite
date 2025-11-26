import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { TasksList } from '../components/tasks-list';
import { makeTask, type Task } from '../entities/task';
import { saveTasks, loadTasks } from '../entities/storage';
import { TaskModal } from '../components/task-modal';

const TopProgressContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${p => p.theme.spacing(1)};
    margin: ${p => p.theme.spacing(2)} 0;
    padding: ${p => p.theme.spacing(1.5)};
    background-color: #f8f9fa;
    border-radius: ${p => p.theme.radius.sm};
`;

const ProgressBarContainer = styled.div`
    width: 100%;
    height: 6px;
    background: rgb(229, 229, 229);
    border-radius: 3px;
    overflow: hidden;
    flex-grow: 1;
`;

const ProgressBarFill = styled.div<{ percent: number }>`
    height: 100%;
    background: linear-gradient(90deg, rgb(155, 121, 207), rgb(103, 76, 140));
    width: ${p => p.percent}%;
    transition: width 0.4s ease;
`;

const ProgressText = styled.span`
    font-size: 0.9rem;
    color: #555;
    white-space: nowrap;
`;

const BottomStatsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${p => p.theme.spacing(2)};
    padding: ${p => p.theme.spacing(1.5)};
    background-color: #f8f9fa;
    border-radius: ${p => p.theme.radius.sm};
    font-size: 0.9rem;
    color: gray;
`;

const StatsText = styled.span`
    font-weight: bold;
`;

const Wrapper = styled.div`
    padding: ${p => p.theme.spacing(5)};
    max-width: 720px;
    margin: 100px auto 0 auto;
    background-color: #f0e6ff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ContainerInput = styled.div`
    display: flex;
    gap: ${p => p.theme.spacing(2)};
    margin-bottom: ${p => p.theme.spacing(3)};
`;

const StyledInput = styled.input`
    padding: ${p => p.theme.spacing(1.5)};
    border: 1px solid #ccc;
    border-radius: ${p => p.theme.radius.sm};
    flex-grow: 1;
    
    &:focus {
        outline: none;
        border-color: #80bdff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`;

const FiltersContainer = styled.div`
    display: flex;
    gap: ${p => p.theme.spacing(1)};
    margin-bottom: ${p => p.theme.spacing(2)};
    align-items: center;
    flex-wrap: wrap;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
    padding: ${p => p.theme.spacing(0.75)} ${p => p.theme.spacing(1.5)};
    border: none;
    border-radius: ${p => p.theme.radius.sm};
    background-color: ${p => p.isActive ? '#8e6ce6' : '#fff'};
    color: ${p => p.isActive ? '#fff' : '#495057'};
    cursor: pointer;
`;

const SortSelect = styled.select`
    padding: ${p => p.theme.spacing(0.75)} ${p => p.theme.spacing(1.5)};
    border: 1px solid #ccc;
    border-radius: ${p => p.theme.radius.sm};
    background-color: white;
    font-size: 0.9rem;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;

    &:focus {
        border-color: #8e6ce6;
        box-shadow: 0 0 0 0.2rem rgba(142, 108, 230, 0.25);
    }

    &::-ms-expand {
        display: none;
    }
`;

const ClearCompletedButton = styled.button`
    padding: ${p => p.theme.spacing(0.5)} ${p => p.theme.spacing(1.5)};
    border: 1px dashed #adb5bd;
    border-radius: ${p => p.theme.radius.sm};
    background-color: transparent;
    color: #6c757d;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #e9ecef;
        border-color: #6c757d;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(173, 181, 189, 0.25);
    }
`;

const TopProgress = ({ percent }: { percent: number }) => {
    return (
        <TopProgressContainer>
            <ProgressBarContainer>
                <ProgressBarFill percent={percent} />
            </ProgressBarContainer>
            <ProgressText>Завершено: {percent}%</ProgressText>
        </TopProgressContainer>
    );
};

const BottomStats = ({
    total,
    active,
    completed,
    onClearCompleted
}: {
    total: number;
    active: number;
    completed: number;
    onClearCompleted: () => void;
}) => {
    return (
        <BottomStatsContainer>
            <StatsText>
                Всего: {total} | Активных: {active} | Выполненных: {completed}
            </StatsText>
            <ClearCompletedButton onClick={onClearCompleted}>
                Очистить выполненные
            </ClearCompletedButton>
        </BottomStatsContainer>
    );
};

export function TasksPage() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [showDescriptionId, setShowDescriptionId] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [query, setQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const searchedTasks = filteredTasks.filter(task => {
        return task.title.toLowerCase().includes(query.toLowerCase());
    });

    const sortedTasks = [...searchedTasks].sort((a, b) => {
        const timeA = a.created.getTime();
        const timeB = b.created.getTime();
        return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const activeTasks = totalTasks - completedTasks;
    const percentCompleted = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    function handleRemoveItem(idTarget: string) {
        setTasks(tasks.filter(t => t.id !== idTarget));
    }

    function handleAddItem(title: string) {
        if (!title.trim()) return;
        const newTask = makeTask(title);
        setTasks([newTask, ...tasks]);
        setTask('');
    }

    function handleEditTask(task: Task) {
        setEditingTask(task);
    }

    function handleToggleItem(id: string) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }
            return task;
        }));
    }

        function handleSaveTask(
        id: string,
        newTitle: string,
        newDescription?: string,
        newDeadline?: string | null
        ) {
        setTasks(
            tasks.map(task => {
            if (task.id === id) {
                return {
                ...task,
                title: newTitle,
                createdText: newDescription,
                deadline: newDeadline ?? null,
                };
            }
            return task;
            })
        );
        setEditingTask(null);
        }

    function toggleDescription(taskId: string) {
        if (showDescriptionId === taskId) {
            setShowDescriptionId(null);
        } else {
            setShowDescriptionId(taskId);
        }
    }

    function handleClearCompleted() {
        setTasks(tasks.filter(task => !task.completed));
    }

    return (
        <Wrapper>
            <ContainerInput>
                <StyledInput
                    value={task}
                    onChange={event => setTask(event.target.value)}
                    type="text"
                    placeholder="Введите задачу..."
                />
                <Button onClick={() => handleAddItem(task)} label="Добавить" />
            </ContainerInput>
            <ContainerInput>
                <StyledInput
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    type="text"
                    placeholder="Поиск задач..."
                />
            </ContainerInput>

            <FiltersContainer>
                <FilterButton isActive={filter === 'all'} onClick={() => setFilter('all')}>
                    All
                </FilterButton>
                <FilterButton isActive={filter === 'active'} onClick={() => setFilter('active')}>
                    Active
                </FilterButton>
                <FilterButton
                    isActive={filter === 'completed'}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </FilterButton>
            </FiltersContainer>

            <FiltersContainer>
                <SortSelect
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value as 'newest' | 'oldest')}
                >
                    <option value="newest">Сначала новые</option>
                    <option value="oldest">Сначала старые</option>
                </SortSelect>
            </FiltersContainer>

            <TopProgress percent={percentCompleted} />
            <TasksList
                tasks={sortedTasks}
                onEdit={handleEditTask}
                onRemove={handleRemoveItem}
                onToggle={handleToggleItem}
                showDescriptionId={showDescriptionId}
                onShowDescription={toggleDescription}
            />
            <BottomStats
                total={totalTasks}
                active={activeTasks}
                completed={completedTasks}
                onClearCompleted={handleClearCompleted}
            />

            {editingTask && (
                <TaskModal
                    task={editingTask}
                    onSave={handleSaveTask}
                    onClose={() => setEditingTask(null)}
                />
            )}
        </Wrapper>
    );
}