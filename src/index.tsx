import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import './i18n';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { zhCN as pickersZhCN, enUS as pickersEnUS } from '@mui/x-date-pickers/locales';

const theme = createTheme({
    palette: {
        primary: {
            // main: '#06BA85', // 主色
            main: '#135BAC', // 主色
            contrastText: '#ffffff', // 按钮文字颜色
        },
        secondary: {
            // main: '#3ED7A0', // 次色
            main: '#135BAC', // 次色
        },
        background: {
            default: '#f5f5f5', // 背景颜色
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiFormControl: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiSelect: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiInputBase: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiTable: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiCheckbox: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiRadio: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiSwitch: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiAutocomplete: {
            defaultProps: {
                size: 'small',
            },
        },
    },
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function RootApp() {
  const { i18n, t } = useTranslation();
  const getLocaleText = () => {
    const base = i18n.language === 'zh' ? pickersZhCN.components.MuiLocalizationProvider.defaultProps.localeText : pickersEnUS.components.MuiLocalizationProvider.defaultProps.localeText;
    return {
      ...base,
      okButtonLabel: t('common.confirm'),
      cancelButtonLabel: t('common.cancel'),
    };
  };
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language === 'zh' ? 'zh-cn' : 'en'} localeText={getLocaleText()}>
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
