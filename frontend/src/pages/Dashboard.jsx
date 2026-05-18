import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Toast from '../components/Toast';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // null = create mode, task = edit mode
  const [toast, setToast] = useState(null);

  const notify = (msg, type = 'success') => setToast({ msg, type });

  const fetchTasks = useCallback(async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.data.tasks);
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleCreate = async (form) => {
    setFormLoading(true);
    try {
      await api.post('/tasks', form);
      await fetchTasks();
      setShowForm(false);
      notify('Task created!');
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (form) => {
    setFormLoading(true);
    try {
      await api.put(`/tasks/${editing.id}`, form);
      await fetchTasks();
      setEditing(null);
      notify('Task updated!');
    } catch (err) {
      notify(err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((t) => t.filter((x) => x.id !== id));
      notify('Task deleted.');
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openEdit = (task) => { setEditing(task); setShowForm(false); };
  const openCreate = () => { setEditing(null); setShowForm(true); };
  const closeForm = () => { setEditing(null); setShowForm(false); };

  const activeForm = showForm || editing !== null;

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.brand}>TaskFlow</div>
        <nav style={styles.nav}>
          <span style={styles.navItem}>My Tasks</span>
          {user?.role === 'admin' && (
            <span style={styles.navItem} onClick={() => navigate('/admin')}>Admin Panel</span>
          )}
        </nav>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{user?.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user?.role}</div>
          </div>
          <button className="btn-ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: 13 }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700 }}>My Tasks</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
          </div>
          <button className="btn-primary" onClick={openCreate}>+ New Task</button>
        </div>

        {/* Inline form panel */}
        {activeForm && (
          <div className="card" style={{ marginBottom: 24 }}>
            <h2 style={{ marginBottom: 20, fontSize: 16, fontWeight: 600 }}>
              {editing ? 'Edit Task' : 'New Task'}
            </h2>
            <TaskForm
              initial={editing}
              onSubmit={editing ? handleUpdate : handleCreate}
              onCancel={closeForm}
              loading={formLoading}
            />
          </div>
        )}

        {/* Task list */}
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
        ) : tasks.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>No tasks yet. Create one!</p>
            <button className="btn-primary" onClick={openCreate}>+ New Task</button>
          </div>
        ) : (
          <div style={styles.grid}>
            {tasks.map((t) => (
              <TaskCard key={t.id} task={t} onEdit={openEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

const styles = {
  layout: { display: 'flex', minHeight: '100vh' },
  sidebar: {
    width: 220, background: 'var(--surface)', borderRight: '1px solid var(--border)',
    padding: '24px 16px', display: 'flex', flexDirection: 'column', flexShrink: 0,
  },
  brand: {
    fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)',
    letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 32,
  },
  nav: { flex: 1, display: 'flex', flexDirection: 'column', gap: 4 },
  navItem: {
    padding: '10px 12px', borderRadius: 'var(--radius)', cursor: 'pointer',
    fontSize: 14, fontWeight: 500, color: 'var(--text)',
    background: 'var(--surface2)', display: 'block',
  },
  userInfo: {
    display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto',
    paddingTop: 16, borderTop: '1px solid var(--border)',
  },
  avatar: {
    width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 700, flexShrink: 0,
  },
  main: { flex: 1, padding: '32px', overflowY: 'auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 },
};

export default Dashboard;
