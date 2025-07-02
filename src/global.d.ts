import type { AlertColor } from '@mui/material/Alert';

declare global {
  interface Window {
    showSnackbar?: (message: string, severity?: AlertColor) => void;
  }
}

export {};
