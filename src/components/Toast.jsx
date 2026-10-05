import { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';

const ICONOS = {
  exito: <CheckCircle2 size={20} color="#4ade80" aria-hidden="true" />,
  advertencia: <AlertTriangle size={20} color="#facc15" aria-hidden="true" />,
  error: <XCircle size={20} color="#f87171" aria-hidden="true" />,
};

function ToastItem({ toast, onClose }) {
  const [saliendo, setSaliendo] = useState(false);

  useEffect(() => {
    const tSalida = setTimeout(() => setSaliendo(true), 4600);
    const tCierre = setTimeout(() => onClose(toast.id), 5000);
    return () => {
      clearTimeout(tSalida);
      clearTimeout(tCierre);
    };
  }, [toast.id, onClose]);

  return (
    <div className={`toast toast-${toast.tipo} ${saliendo ? 'saliendo' : ''}`} role="alert" aria-live="assertive">
      <span className="toast-icono">{ICONOS[toast.tipo] || ICONOS.advertencia}</span>
      <p>{toast.mensaje}</p>
      <div className="toast-acciones">
        {toast.accion && (
          <button className="toast-boton-accion" onClick={toast.accion.onClick}>
            {toast.accion.label}
          </button>
        )}
        <button className="toast-cerrar" aria-label="Cerrar mensaje" onClick={() => onClose(toast.id)}>
          <X size={16} />
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
