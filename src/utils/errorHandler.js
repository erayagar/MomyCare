// Error Handling Utility

export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export const handleApiError = (error) => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error.response) {
    // API hatası
    switch (error.response.status) {
      case 400:
        return 'Geçersiz istek. Lütfen girdiğiniz bilgileri kontrol edin.';
      case 401:
        return 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.';
      case 403:
        return 'Bu işlem için yetkiniz bulunmamaktadır.';
      case 404:
        return 'İstenen kaynak bulunamadı.';
      case 500:
        return 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.';
      default:
        return 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
  }

  if (error.request) {
    // Network hatası
    return 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.';
  }

  // Genel hata
  return error.message || 'Beklenmeyen bir hata oluştu.';
};

export const logError = (error, context = '') => {
  // Production'da gerçek bir logging servisine gönderilebilir
  if (__DEV__) {
    console.error(`[ERROR] ${context}:`, error);
  }
  // TODO: Sentry, Firebase Crashlytics gibi servislere entegre edilebilir
};

export const createErrorHandler = (context) => {
  return (error) => {
    logError(error, context);
    return handleApiError(error);
  };
};
