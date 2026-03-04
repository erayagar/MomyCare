// Constants - Tüm sabitlerin merkezi yönetimi

export const APP_CONFIG = {
  APP_NAME: 'Sağlık İzleme',
  VERSION: '1.0.0',
  API_TIMEOUT: 30000, // 30 saniye
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 1000,
};

export const VALIDATION_LIMITS = {
  BLOOD_SUGAR_MIN: 0,
  BLOOD_SUGAR_MAX: 600,
  INSULIN_DOSE_MIN: 0,
  INSULIN_DOSE_MAX: 100,
  ACTIVITY_DURATION_MIN: 0,
  ACTIVITY_DURATION_MAX: 480, // 8 saat
  QUANTITY_MAX: 5000,
  PREGNANCY_WEEK_MIN: 1,
  PREGNANCY_WEEK_MAX: 42,
};

export const DATE_FORMATS = {
  DISPLAY: 'DD-MM-YYYY',
  DISPLAY_WITH_TIME: 'DD-MM-YYYY HH:mm:ss',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DD HH:mm:ss',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.',
  SERVER_ERROR: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
  UNKNOWN_ERROR: 'Beklenmeyen bir hata oluştu.',
  REQUIRED_FIELD: 'Bu alan zorunludur.',
  INVALID_INPUT: 'Geçersiz giriş. Lütfen kontrol edin.',
};

export const SUCCESS_MESSAGES = {
  SAVE_SUCCESS: 'Kayıt başarıyla oluşturuldu.',
  UPDATE_SUCCESS: 'Kayıt başarıyla güncellendi.',
  DELETE_SUCCESS: 'Kayıt başarıyla silindi.',
  SUBMIT_SUCCESS: 'Form başarıyla gönderildi.',
};

export const LOADING_MESSAGES = {
  LOADING: 'Yükleniyor...',
  SAVING: 'Kaydediliyor...',
  DELETING: 'Siliniyor...',
  SUBMITTING: 'Gönderiliyor...',
};

export const SCREEN_NAMES = {
  HOME: 'Home',
  FORMS: 'Forms',
  BLOOD_SUGAR: 'BloodSugar',
  PHYSICAL_ACTIVITY: 'PhysicalActivity',
  NUTRITION: 'Nutrition',
  FOOD_SELECTION: 'FoodSelection',
  EDUCATION: 'Education',
  DAILY_GOALS: 'DailyGoals',
  FAQ: 'FAQ',
  NOTIFICATIONS: 'Notifications',
  SURVEY: 'Survey',
  WHATSAPP_EMERGENCY: 'WhatsappEmergency',
};
