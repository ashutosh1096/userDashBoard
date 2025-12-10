import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    auth: authReducer,
  }
});

store.subscribe(()=>{
  try{
    const state = store.getState();
    localStorage.setItem('demo_projects', JSON.stringify(state.projects));
  }catch(e){}
});

export default store;
