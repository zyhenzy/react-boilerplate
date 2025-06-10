import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Switch
} from '@mui/material';

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  editingId: string | null;
}

const sexOptions = [
  { value: 'M', label: '男' },
  { value: 'F', label: '女' },
  { value: 'O', label: '其他' },
];

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  setForm,
  editingId
}) => (
  <Dialog open={open} onClose={onClose}>
    <form onSubmit={onSubmit}>
      <DialogTitle>{editingId ? '编辑用户' : '新增用户'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="用户名"
          fullWidth
          value={form.userName || ''}
          onChange={e => setForm((f: any) => ({ ...f, userName: e.target.value }))}
          required
          inputProps={{ maxLength: 25 }}
        />
        <TextField
          margin="dense"
          label="姓名"
          fullWidth
          value={form.name || ''}
          onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))}
          required
          inputProps={{ maxLength: 25 }}
        />
        <TextField
          margin="dense"
          label="手机号"
          fullWidth
          value={form.phoneNumber || ''}
          onChange={e => setForm((f: any) => ({ ...f, phoneNumber: e.target.value }))}
          required
          inputProps={{ maxLength: 25 }}
        />
        <TextField
          margin="dense"
          label="国家号码"
          fullWidth
          value={form.countryNumber || ''}
          onChange={e => setForm((f: any) => ({ ...f, countryNumber: e.target.value }))}
          required
          inputProps={{ maxLength: 5 }}
        />
        <TextField
          margin="dense"
          label="性别"
          select
          fullWidth
          value={form.sex || ''}
          onChange={e => setForm((f: any) => ({ ...f, sex: e.target.value }))}
        >
          {sexOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          label="角色"
          fullWidth
          value={form.role || ''}
          onChange={e => setForm((f: any) => ({ ...f, role: e.target.value }))}
        />
        {!editingId && (
          <TextField
            margin="dense"
            label="密码"
            type="password"
            fullWidth
            value={form.password || ''}
            onChange={e => setForm((f: any) => ({ ...f, password: e.target.value }))}
            required
          />
        )}
        <FormControlLabel
          control={
            <Switch
              checked={form.enable ?? true}
              onChange={e => setForm((f: any) => ({ ...f, enable: e.target.checked }))}
            />
          }
          label="启用"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">取消</Button>
        <Button type="submit" variant="contained" color="primary">{editingId ? '更新' : '新增'}</Button>
      </DialogActions>
    </form>
  </Dialog>
);

export default UserFormDialog;

