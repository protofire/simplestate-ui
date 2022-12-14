export const requiredValidation = (value: string) => {
  if (!value) return 'Campo requerido';
  return null;
}

export const addressValidation = (value: string) => {
  if (!(/^0x[a-fA-F0-9]{40}$/.test(value))) return 'Dirección inválida';
  return null;
}

export const positiveIntegerValidation = (value: string) => {
  if (!value)  return 'Campo requerido';
  if (!(/^\d+$/.test(value))) return 'Solo se admiten números enteros positivos';
  return null;
}

export const positiveNumberValidation = (value: string) => {
  if (!value)  return 'Campo requerido';
  if (!(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(value))) return 'Solo se admiten números positivos';
  return null;
}