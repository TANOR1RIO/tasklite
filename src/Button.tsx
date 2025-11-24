import styled from '@emotion/styled';

type ButtonProps = {
    label: string;
    onClick: () => void;
    disabled?: boolean; // Опционально, для отключения кнопки
}

const StyledButton = styled.button`
    background-color: ${p => p.theme.colors.accent};
    color: ${p => p.theme.colors};
    border: none;
    cursor: pointer;
    margin-bottom: ${p => p.theme.spacing(3)};
    border-radius: ${p => p.theme.radius.md};
    padding: ${p => p.theme.spacing(1.5)} ${p => p.theme.spacing(3)};

    &:hover {
        background-color: ${p => p.theme.colors.accentHover};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export function Button({ label, onClick, disabled = false }: ButtonProps) {
    return (
        <StyledButton onClick={onClick} disabled={disabled}>
            {label}
        </StyledButton>
    );
}