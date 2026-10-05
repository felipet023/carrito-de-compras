const formatoCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
});

export function formatCOP(valor) {
  return formatoCOP.format(valor).replace(/\s/g, '');
}
