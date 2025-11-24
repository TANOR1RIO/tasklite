import { ThemeProvider } from '@emotion/react';
import { TasksPage } from './pages/tasks-page';
import { GlobalStyles } from './styles/global';
import { theme } from './styles/theme';

export function App() {
return (
  <ThemeProvider theme={theme}>
    <GlobalStyles/>
    <TasksPage/>
  </ThemeProvider>



);
}