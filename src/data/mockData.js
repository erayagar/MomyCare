// Mock Data - Sağlık İzleme Uygulaması
// Görüntülere göre uyarlanmış veri yapısı

const mockBloodSugarData = [
  {
    id: '1',
    meal: 'Sabah',
    fastingStatus: 'Açlık',
    date: '05-03-2023',
    time: '16:58:00',
    bloodSugarValue: 60,
    insulinDose: '',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
  },
  {
    id: '2',
    meal: 'Öğle',
    fastingStatus: 'Tokluk',
    date: '05-03-2023',
    time: '13:30:00',
    bloodSugarValue: 95,
    insulinDose: '10',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
  },
  {
    id: '3',
    meal: 'Akşam',
    fastingStatus: 'Açlık',
    date: '04-03-2023',
    time: '20:15:00',
    bloodSugarValue: 75,
    insulinDose: '',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
  },
];

const mockPhysicalActivities = [
  {
    id: '1',
    day: 1,
    activityType: 'yürüyüş',
    duration: 30,
    status: 'Yapıldı',
    dateTime: '23-08-2022 08:25',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    borderColor: 'green',
  },
  {
    id: '2',
    day: 2,
    activityType: 'yürüyüş',
    duration: 20,
    status: 'Yapıldı',
    dateTime: '05-03-2023 14:17',
    description: '',
    borderColor: 'green',
  },
  {
    id: '3',
    day: 0,
    activityType: 'koşu',
    duration: 45,
    status: 'Planlandı',
    dateTime: '29-06-2022 13:58',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    borderColor: 'red',
  },
];

const mockNutritionData = [
  {
    id: '1',
    foodName: 'Ayran',
    calories: 114,
    unit: 'Cc',
    measurement: '300 Cc',
    description: '1,5 su bardağı = 300 ml',
    pregnancyWeek: 12,
    meal: 'Sabah',
  },
  {
    id: '2',
    foodName: 'Yumurta',
    calories: 155,
    unit: 'Adet',
    measurement: '1 Adet',
    description: '1 adet haşlanmış yumurta',
    pregnancyWeek: 12,
    meal: 'Sabah',
  },
];

const mockForms = [
  {
    id: '1',
    title: 'Kan Şekeri İzlem',
    icon: '🩸',
    screen: 'BloodSugar',
  },
  {
    id: '2',
    title: 'Fiziksel Aktivite',
    icon: '🏃',
    screen: 'PhysicalActivity',
  },
  {
    id: '3',
    title: 'Beslenme Değerlendirme',
    icon: '🥗',
    screen: 'Nutrition',
  },
];

const mockHomeCards = [
  {
    id: '1',
    title: 'Formlar',
    icon: '📋',
    screen: 'Forms',
  },
  {
    id: '2',
    title: 'Eğitimler',
    icon: '📚',
    screen: 'Education',
  },
  {
    id: '3',
    title: 'Günlük Hedefler',
    icon: '🎯',
    screen: 'DailyGoals',
  },
  {
    id: '4',
    title: 'SSS',
    icon: '❓',
    screen: 'FAQ',
  },
  {
    id: '5',
    title: 'Bildirimler',
    icon: '🔔',
    screen: 'Notifications',
  },
  {
    id: '6',
    title: 'Anket',
    icon: '📊',
    screen: 'Survey',
  },
  {
    id: '7',
    title: 'Whatsapp Acil',
    icon: '🚨',
    screen: 'WhatsappEmergency',
  },
];

// Fake API fonksiyonları
export const fetchBloodSugarData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Ağ hatası oluştu. Lütfen tekrar deneyin.'));
        return;
      }
      resolve({
        data: mockBloodSugarData,
        total: mockBloodSugarData.length,
        timestamp: new Date().toISOString()
      });
    }, 1500 + Math.random() * 1000);
  });
};

export const fetchPhysicalActivities = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Ağ hatası oluştu. Lütfen tekrar deneyin.'));
        return;
      }
      resolve({
        data: mockPhysicalActivities,
        total: mockPhysicalActivities.length,
        timestamp: new Date().toISOString()
      });
    }, 1500 + Math.random() * 1000);
  });
};

export const fetchNutritionData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Ağ hatası oluştu. Lütfen tekrar deneyin.'));
        return;
      }
      resolve({
        data: mockNutritionData,
        total: mockNutritionData.length,
        timestamp: new Date().toISOString()
      });
    }, 1200 + Math.random() * 800);
  });
};

export const fetchForms = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockForms,
        total: mockForms.length,
      });
    }, 500);
  });
};

export const fetchHomeCards = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockHomeCards,
        total: mockHomeCards.length,
      });
    }, 500);
  });
};

export const getMeals = () => {
  return ['Sabah', 'Öğle', 'Akşam', 'Ara Öğün'];
};

export const getFastingStatuses = () => {
  return ['Açlık', 'Tokluk'];
};

export const getActivityTypes = () => {
  return ['yürüyüş', 'koşu', 'yüzme', 'bisiklet', 'yoga'];
};

export const getActivityStatuses = () => {
  return ['Yapıldı', 'Planlandı', 'İptal Edildi'];
};

export default {
  mockBloodSugarData,
  mockPhysicalActivities,
  mockNutritionData,
  mockForms,
  mockHomeCards,
};
