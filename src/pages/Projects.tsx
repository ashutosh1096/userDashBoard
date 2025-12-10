import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProject,
  deleteProject,
  updateProject,
} from "../store/projectsSlice";

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
}

const ProjectsRedux = () => {
  const [form, setForm] = useState<{ name: string; description: string; status: string }>({
    name: "",
    description: "",
    status: "planning",
  });
  const projects = useSelector((state: any) => state.projects as Project[]);
  const [editOpen, setEditOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<{ id: number; name: string } | null>(null);

  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Project = { ...form, id: Date.now() };
    dispatch(addProject(next));
    setForm({ name: "", description: "", status: "planning" });
  }

  function handleDeleteClick(id: number, name: string) {
    setToDelete({ id, name });
    setConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (!toDelete) return setConfirmOpen(false);
    dispatch(deleteProject(toDelete.id));
    setToDelete(null);
    setConfirmOpen(false);
  }

  function handleCancelDelete() {
    setToDelete(null);
    setConfirmOpen(false);
  }

  function openEditModal(project: Project) {
    setEditProject({ ...project });
    setEditOpen(true);
  }

  function handleModalChange(field: keyof Project, value: string) {
    setEditProject((prev) => prev ? { ...prev, [field]: value } : prev);
  }

  function handleModalSave() {
    if (!editProject) return setEditOpen(false);
    dispatch(updateProject(editProject));
    setEditProject(null);
    setEditOpen(false);
  }

  function handleModalCancel() {
    setEditProject(null);
    setEditOpen(false);
  }

  return (
    <div className="page projects-page">
      <h2>Projects</h2>

      <div className="card">
        <form onSubmit={handleSubmit} className="project-form">
          <input
            placeholder="Project name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="done">Done</option>
          </select>

          <button className="btn-primary" type="submit">
            Create project
          </button>
        </form>
      </div>

      <div className="card">
        {projects.length === 0 ? (
          <div style={{ padding: 12 }}>
            <p>No projects yet.</p>
          </div>
        ) : (
          <table className="projects-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.status}</td>
                  <td>
                    <div className="row-actions" style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'nowrap' }}>
                      <button
                        className="btn-outline btn-sm"
                        onClick={() => openEditModal(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger btn-sm"
                        onClick={() => handleDeleteClick(p.id, p.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {confirmOpen && (
        <div className="confirm-modal" role="dialog" aria-modal="true">
          <div className="confirm-box card">
            <h3>Confirm delete</h3>
            <p>
              Are you sure you want to delete <strong>{toDelete?.name}</strong>?
            </p>
            <div className="confirm-actions">
              <button className="btn-primary" onClick={handleConfirmDelete}>
                Yes
              </button>
              <button className="btn-secondary" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {editOpen && editProject && (
        <div className="edit-drawer-overlay" role="dialog" aria-modal="true">
          <aside className="edit-drawer card">
            <h3>Edit Project</h3>

            <label style={{ display: "block", marginTop: 8 }}>Name</label>
            <input
              value={editProject.name}
              onChange={(e) => handleModalChange("name", e.target.value)}
            />

            <label style={{ display: "block", marginTop: 8 }}>
              Description
            </label>
            <input
              value={editProject.description}
              onChange={(e) => handleModalChange("description", e.target.value)}
            />

            <label style={{ display: "block", marginTop: 8 }}>Status</label>
            <select
              value={editProject.status}
              onChange={(e) => handleModalChange("status", e.target.value)}
            >
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="done">Done</option>
            </select>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
                marginTop: 12,
              }}
            >
              <button className="btn-primary" onClick={handleModalSave}>
                Save
              </button>
              <button className="btn-secondary" onClick={handleModalCancel}>
                Cancel
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default ProjectsRedux;
