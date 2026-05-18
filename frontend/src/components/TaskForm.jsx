import { useState, useEffect } from 'react';

const EMPTY = { title: '', description: '', status: 'todo', priority: 'medium' };

const TaskForm = ({ initial = null, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(initial || EMPTY);

  useEffect(() => { setForm(initial || EMPTY); }, [initial]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handle = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div className="form-group">
        <label>Title *</label>
        <input value={form.title} onChange={(e) => set('title', e.target.value)} required placeholder="Task title" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Optional details" rows={3} style={{ resize: 'vertical' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="form-group">
          <label>Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)}>
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select value={form.priority} onChange={(e) => set('priority', e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving…' : initial ? 'Update Task' : 'Create Task'}
        </button>
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default TaskForm;
