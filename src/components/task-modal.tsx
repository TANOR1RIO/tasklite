import { useState, useEffect } from 'react';
import type { Task } from '../entities/task';
import styled from '@emotion/styled';

type TaskModalProp = {
  task: Task;
  onSave: (
    id: string,
    newTitle: string,
    newDescription?: string,
    newDeadline?: string | null
  ) => void;
  onClose: () => void;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 4px;
  min-width: 300px;
  max-width: 400px;
  border: 1px solid #ccc;
`;

const ModalHeader = styled.h2`
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 0.9rem;

  &:focus {
    outline: 1px solid #999;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  resize: vertical;
  min-height: 80px;
  font-size: 0.9rem;

  &:focus {
    outline: 1px solid #999;
  }
`;

const StyledDeadlineInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 0.9rem;

  &:focus {
    outline: 1px solid #999;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

const CancelButton = styled.button`
  background: #f0f0f0;
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 0.85rem;
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background: #e0e0e0;
  }
`;

const SaveButton = styled.button`
  background-color: #8e6ce6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 3px;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background-color: #7a5bd9;
  }
`;

export function TaskModal(props: TaskModalProp) {
  const [title, setTitle] = useState(props.task.title);
  const [description, setDescription] = useState(props.task.createdText || '');
  const [deadline, setDeadline] = useState<string>(
    props.task.deadline ? new Date(props.task.deadline).toISOString().slice(0, 16) : ''
  );

  const handleSave = () => {
    const deadlineISO = deadline ? new Date(deadline).toISOString() : null;
    props.onSave(props.task.id, title, description, deadlineISO);
    props.onClose();
  };

  const handleCancel = () => {
    props.onClose();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        props.onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props]);

  return (
    <ModalOverlay onClick={handleCancel}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>Редактировать задачу</ModalHeader>
        <StyledInput
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Название"
        />
        <StyledTextarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Описание"
        />
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>
          Дедлайн
        </label>
        <StyledDeadlineInput
          type="datetime-local"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />
        <ButtonContainer>
          <CancelButton onClick={handleCancel}>Отмена</CancelButton>
          <SaveButton onClick={handleSave}>Сохранить</SaveButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}