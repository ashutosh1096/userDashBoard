import React, { createContext, useContext, useEffect, useReducer } from 'react';

const ProjectsStateContext = createContext(null);
const ProjectsDispatchContext = createContext(null);

const initialProjects = [
  { id: 1, name: 'Website Redesign', description: 'Update UI/UX', status: 'active' },
  { id: 2, name: 'Mobile App', description: 'Cross-platform app', status: 'planning' }
];

function readFromStorage(){
  try{
    const raw = localStorage.getItem('demo_projects');
    if (!raw) return initialProjects;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return initialProjects;
  }catch(e){
    return initialProjects;
  }
}

function projectsReducer(state, action){
  switch(action.type){
    case 'init':
      return action.payload;
    case 'add':
      return [action.payload, ...state];
    case 'delete':
      return state.filter(p=> p.id !== action.payload);
    case 'update':
      return state.map(p=> p.id === action.payload.id ? {...p, ...action.payload} : p);
    case 'reset':
      return initialProjects;
    default:
      return state;
  }
}

export const ProjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectsReducer, [], () => readFromStorage());

  useEffect(()=>{
    try { localStorage.setItem('demo_projects', JSON.stringify(state)); } catch (err) {}
  },[state]);

  return (
    <ProjectsStateContext.Provider value={state}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsStateContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectsStateContext);
export const useProjectsDispatch = () => useContext(ProjectsDispatchContext);

export const ACTIONS = {
  ADD: 'add',
  DELETE: 'delete',
  UPDATE: 'update',
  RESET: 'reset'
};
