import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

interface Company {
  name: string;
}
interface User {
  id: number;
  name: string;
  email: string;
  company?: Company;
  editing?: boolean;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [debouncedFilter, setDebouncedFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<{ id: number; name: string } | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("usersData");
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      axios.get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          const list: User[] = res.data.map((u: any) => ({ ...u, editing: false }));
          setUsers(list);
          localStorage.setItem("usersData", JSON.stringify(list));
        })
        .catch(() => { });
    }
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 350);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [filter]);

  function handleDeleteClick(id: number, name: string) {
    setToDelete({ id, name });
    setConfirmOpen(true);
  }

  function handleConfirmDelete() {
    if (!toDelete) return setConfirmOpen(false);
    setUsers((prev) => {
      const updated = prev.filter((u) => u.id !== toDelete.id);
      localStorage.setItem("usersData", JSON.stringify(updated));
      return updated;
    });
    setToDelete(null);
    setConfirmOpen(false);
  }

  function handleCancelDelete() {
    setToDelete(null);
    setConfirmOpen(false);
  }

  function openEditModal(user: User) {
    setEditUser({ ...user, company: { name: user.company?.name || "" } });
    setEditOpen(true);
  }

  function handleModalChange(field: keyof User, value: string) {
    setEditUser((prev) => prev ? { ...prev, [field]: value } : prev);
  }

  function handleModalChangeCompany(name: string) {
    setEditUser((prev) => prev ? {
      ...prev,
      company: { ...(prev.company || {}), name },
    } : prev);
  }

  function handleModalSave() {
    if (!editUser) return setEditOpen(false);
    setUsers((prev) => {
      const updated = prev.map((u) =>
        u.id === editUser.id ? { ...u, ...editUser } : u
      );
      localStorage.setItem("usersData", JSON.stringify(updated));
      return updated;
    });
    setEditUser(null);
    setEditOpen(false);
  }

  function handleModalCancel() {
    setEditUser(null);
    setEditOpen(false);
  }

  function handleChange(id: number, field: keyof User, value: any) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, [field]: value } : u))
    );
  }

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(debouncedFilter.toLowerCase()) ||
      u.email.toLowerCase().includes(debouncedFilter.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) return 0;
    const av = a[sortBy as keyof User] || "";
    const bv = b[sortBy as keyof User] || "";
    return av.toString().localeCompare(bv.toString());
  });

  return (
    <div className="page users-page">
      <h2>Users</h2>
      <div className="card">
        <div className="table-controls left">
          <div className="search-box">
            <span className="search-icon" aria-hidden>
              🔍
            </span>
            <input
              className="search-input"
              placeholder="Search name or email"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="sort-box">
            <label style={{ marginRight: 8, color: "#333", fontSize: 14 }}>
              Sort
            </label>
            <select
              value={sortBy || ""}
              onChange={(e) => setSortBy(e.target.value || null)}
              className="sort-select"
            >
              <option value="">None</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="company">Company</option>
            </select>
          </div>
        </div>

        <table className="users-table" style={{ tableLayout: 'auto', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ minWidth: 120, textAlign: 'left' }}>Name</th>
              <th style={{ minWidth: 180, textAlign: 'left' }}>Email</th>
              <th style={{ minWidth: 120, textAlign: 'left' }}>Company</th>
              <th style={{ minWidth: 120, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((u) => (
              <tr key={u.id}>
                <td>
                  {u.editing ? (
                    <input
                      value={u.name}
                      onChange={(e) =>
                        handleChange(u.id, "name", e.target.value)
                      }
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td>
                  {u.editing ? (
                    <input
                      value={u.email}
                      onChange={(e) =>
                        handleChange(u.id, "email", e.target.value)
                      }
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td>
                  {u.editing ? (
                    <input
                      value={u.company?.name || ""}
                      onChange={(e) =>
                        handleChange(u.id, "company", { name: e.target.value })
                      }
                    />
                  ) : (
                    u.company?.name
                  )}
                </td>
                <td>
                  <div className="row-actions" style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'nowrap' }}>
                    <button
                      onClick={() => openEditModal(u)}
                      className="btn-outline btn-sm"
                      aria-label={`Open editor for ${u.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(u.id, u.name)}
                      className="btn-danger btn-sm"
                      aria-label={`Delete ${u.name}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {confirmOpen && (
          <div className="confirm-modal" role="dialog" aria-modal="true">
            <div className="confirm-box card">
              <h3>Confirm delete</h3>
              <p>
                Are you sure you want to delete{" "}
                <strong>{toDelete?.name}</strong>?
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
        {editOpen && editUser && (
          <div className="edit-drawer-overlay" role="dialog" aria-modal="true">
            <aside className="edit-drawer card">
              <h3>Edit user</h3>
              <label style={{ display: "block", marginTop: 8 }}>Name</label>
              <input
                value={editUser.name}
                onChange={(e) => handleModalChange("name", e.target.value)}
              />
              <label style={{ display: "block", marginTop: 8 }}>Email</label>
              <input
                value={editUser.email}
                onChange={(e) => handleModalChange("email", e.target.value)}
              />
              <label style={{ display: "block", marginTop: 8 }}>Company</label>
              <input
                value={editUser.company?.name || ""}
                onChange={(e) => handleModalChangeCompany(e.target.value)}
              />

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
    </div>
  );
};

export default Users;
