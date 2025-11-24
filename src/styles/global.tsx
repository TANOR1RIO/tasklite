import { Global, css } from '@emotion/react';

export const GlobalStyles = () => (
    <Global
        styles={css`
            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Inter', system-ui, sans-serif;
                font-size: 15px;
                color: rgb(26, 26, 26);
                min-height: 100vh;
                position: relative;
                overflow-x: hidden;
            }
            body::before {
                content: '';
                position: fixed;
                inset: 0;
                z-index: -1;
                background: radial-gradient(
                        circle at 20% 30%,
                        rgba(123, 94, 167, 0.25),
                        transparent 60%
                    ),
                    radial-gradient(
                        circle at 80% 20%,
                        rgba(255, 200, 150, 0.25),
                        transparent 60%
                    ),
                    radial-gradient(
                        circle at 50% 80%,
                        rgba(150, 220, 200, 0.25),
                        transparent 60%
                    );
                filter: blur(90px);
            }
            button {
                border: none;
                outline: none;
                font-size: inherit;
                color: inherit;
            }
            a {
                text-decoration: none;
                font-size: inherit;
                color: inherit;
            }
            ul {
                list-style: none;
            }
        `}
    />
);    