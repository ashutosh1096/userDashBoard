import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
}

export const initialProjectsSample: Project[] = [
  {
    id: 1,
    name: 'Website Builder',
    description:
      'Created a drag-and-drop website builder using React, allowing users to add, move, and customize page elements easily. Implemented dynamic layout creation, sorting, pagination, data binding, and image upload features. Used state management and reusable components to deliver a smooth, real-time editing experience.',
    status: 'Done',
  },
  {
    id: 2,
    name: 'Calendar',
    description:
      'Built a Vagaro calendar scheduler using React and TypeScript with drag-and-drop appointments and classes. Created popups for booking, attendees, and repeat sessions with proper validation. Used Redux to manage bookings, popups, and real-time calendar update.',
    status: 'planning',
  },
  {
    id: 3,
    name: 'Time Cart',
    description: 'Developed a TimeCart application for managing employee work hours, attendance, and payroll calculations. Built features for time tracking, shift management, reports, and automated wage calculation. Used React, TypeScript, and APIs to provide a clean UI with accurate, real-time payroll and attendance data.',
    status: 'Done',
  },
];

function readFromStorage(): Project[] {
  try {
    const raw = localStorage.getItem('demo_projects');
    if (!raw) return initialProjectsSample;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Project[];
    return initialProjectsSample;
  } catch (e) {
    return initialProjectsSample;
  }
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: readFromStorage(),
  reducers: {
    addProject(state, action: PayloadAction<Project>) {
      state.unshift(action.payload);
    },
    deleteProject(state, action: PayloadAction<number>) {
      return state.filter((p) => p.id !== action.payload);
    },
    updateProject(state, action: PayloadAction<Project>) {
      return state.map((p) => (p.id === action.payload.id ? { ...p, ...action.payload } : p));
    },
    resetProjects() {
      return initialProjectsSample;
    },
  },
});

export const { addProject, deleteProject, updateProject, resetProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
