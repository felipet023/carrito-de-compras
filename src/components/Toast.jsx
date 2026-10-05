import { useEffect } from 'react';

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div className="toast" role="alert" aria-live="assertive">
      <p>{toast.mensaje}</p>
      <div className="toast-acciones">
        {toast.accion && (
          <button
            className="toast-boton-accion"
            onClick={toast.accion.onClick}
          >
            {toast.accion.label}
          </button>
        )}
        <button
          className="toast-cerrar"
          aria-label="Cerrar mensaje"
          onClick={() => onClose(toast.id)}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default function Toast({ toasts, onClose }) {
  return (
    <div className="toast-contenedor" aria-label="Notificaciones">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  );
}
