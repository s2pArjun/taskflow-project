const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, flex: 1, marginRight: 12 }}>{task.title}</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost" style={{ padding: '5px 12px', fontSize: 13 }} onClick={() => onEdit(task)}>Edit</button>
          <button className="btn-danger" style={{ padding: '5px 12px', fontSize: 13 }} onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>

      {task.description && (
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{task.description}</p>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        <span className={`badge ${task.status}`}>{task.status.replace('_', ' ')}</span>
        <span className={`badge ${task.priority}`}>{task.priority}</span>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
        {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskCard;
