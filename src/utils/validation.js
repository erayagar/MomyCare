// Form Validasyon Utility Fonksiyonları

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

export const validateBloodSugar = (value) => {
  const num = Number(value);
  if (isNaN(num)) return { valid: false, message: 'Geçerli bir sayı giriniz' };
  if (num < 0) return { valid: false, message: 'Kan şekeri değeri negatif olamaz' };
  if (num > 600) return { valid: false, message: 'Kan şekeri değeri çok yüksek' };
  return { valid: true };
};

export const validateInsulinDose = (value) => {
  const num = Number(value);
  if (isNaN(num)) return { valid: false, message: 'Geçerli bir sayı giriniz' };
  if (num < 0) return { valid: false, message: 'İnsülin dozu negatif olamaz' };
  if (num > 100) return { valid: false, message: 'İnsülin dozu çok yüksek' };
  return { valid: true };
};

export const validateActivityDuration = (value) => {
  const num = Number(value);
  if (isNaN(num)) return { valid: false, message: 'Geçerli bir sayı giriniz' };
  if (num < 0) return { valid: false, message: 'Süre negatif olamaz' };
  if (num > 480) return { valid: false, message: 'Süre çok uzun (maksimum 8 saat)' };
  return { valid: true };
};

export const validateQuantity = (value, unit) => {
  const num = Number(value);
  if (isNaN(num)) return { valid: false, message: 'Geçerli bir sayı giriniz' };
  if (num <= 0) return { valid: false, message: 'Miktar sıfırdan büyük olmalıdır' };
  if (unit === 'Cc' && num > 5000) return { valid: false, message: 'Miktar çok yüksek' };
  return { valid: true };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

export const validateRequired = (value, fieldName = 'Alan') => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return { valid: false, message: `${fieldName} zorunludur` };
  }
  return { valid: true };
};

export const validatePregnancyWeek = (week) => {
  const num = Number(week);
  if (isNaN(num)) return { valid: false, message: 'Geçerli bir hafta giriniz' };
  if (num < 1 || num > 42) return { valid: false, message: 'Gebelik haftası 1-42 arasında olmalıdır' };
  return { valid: true };
};
