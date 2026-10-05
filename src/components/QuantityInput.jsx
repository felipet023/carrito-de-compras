const CARACTERES_BLOQUEADOS = ['e', 'E', '+', '-', '.', ','];

export default function QuantityInput({ value, onChange, onInvalid, ariaLabel, id }) {
  const manejarKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (CARACTERES_BLOQUEADOS.includes(e.key)) {
      e.preventDefault();
      onInvalid();
    }
  };

  const manejarChange = (e) => {
    const soloDigitos = e.target.value.replace(/[^0-9]/g, '');
    if (soloDigitos !== e.target.value) {
      onInvalid();
    }
    onChange(soloDigitos);
  };

  const manejarPaste = (e) => {
    e.preventDefault();
    const texto = e.clipboardData.getData('text').trim();
    if (/^[0-9]+$/.test(texto)) {
      onChange(texto);
    } else {
      onInvalid();
    }
  };

  const manejarWheel = (e) => {
    e.preventDefault();
    e.target.blur();
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={value}
      aria-label={ariaLabel}
      id={id}
      onKeyDown={manejarKeyDown}
      onChange={manejarChange}
      onPaste={manejarPaste}
      onWheel={manejarWheel}
    />
  );
}
