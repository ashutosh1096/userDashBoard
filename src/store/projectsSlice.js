import { createSlice } from '@reduxjs/toolkit';

const initialProjectsSample = [
  { id: 1, name: 'Website Redesign', description: 'Update UI/UX', status: 'active' },
  { id: 2, name: 'Mobile App', description: 'Cross-platform app', status: 'planning' }
];

function readFromStorage(){
  try{
    const raw = localStorage.getItem('demo_projects');
    if (!raw) return initialProjectsSample;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return initialProjectsSample;
  }catch(e){
    return initialProjectsSample;
  }
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: readFromStorage(),
  reducers: {
    addProject(state, action){
      state.unshift(action.payload);
    },
    deleteProject(state, action){
      return state.filter(p=> p.id !== action.payload);
    },
    updateProject(state, action){
      return state.map(p=> p.id === action.payload.id ? {...p, ...action.payload} : p);
    },
    resetProjects(){
      return initialProjectsSample;
    }
  }
});

export const { addProject, deleteProject, updateProject, resetProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
