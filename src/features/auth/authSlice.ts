import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, Role } from '../../types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const demoUsers: Record<Role, User> = {
  client: {
    id: 'usr_001',
    name: 'Rajesh Kumar',
    email: 'rajesh@techcorp.in',
    role: 'client',
    permissions: ['dashboard', 'tickets', 'attendance', 'sla', 'branches', 'compliance', 'invoices', 'reports'],
    organization: 'TechCorp India',
  },
  admin: {
    id: 'usr_002',
    name: 'Priya Sharma',
    email: 'priya@presenti.in',
    role: 'admin',
    permissions: ['*'],
    organization: 'Presenti',
  },
  executive: {
    id: 'usr_003',
    name: 'Vikram Singh',
    email: 'vikram@presenti.in',
    role: 'executive',
    permissions: ['dashboard', 'analytics', 'reports'],
    organization: 'Presenti',
  },
  supervisor: {
    id: 'usr_004',
    name: 'Anil Mehta',
    email: 'anil@presenti.in',
    role: 'supervisor',
    permissions: ['dashboard', 'attendance', 'tickets'],
    organization: 'Presenti',
  },
  workforce: {
    id: 'usr_005',
    name: 'Suresh Yadav',
    email: 'suresh@presenti.in',
    role: 'workforce',
    permissions: ['checkin', 'tasks', 'documents'],
    organization: 'Presenti',
  },
};

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('presenti_access_token'),
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    loginWithToken(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem('presenti_access_token', action.payload.accessToken);
    },
    loginAsRole(state, action: PayloadAction<Role>) {
      state.user = demoUsers[action.payload];
      state.accessToken = localStorage.getItem('presenti_access_token');
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem('presenti_access_token');
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginWithToken, loginAsRole, logout, setLoading } = authSlice.actions;
export { demoUsers };
export default authSlice.reducer;
