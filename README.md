Youtube Linki: https://youtube.com/shorts/uqifAAGKD8o?feature=share

# 🏥 MomyCare - Modern Sağlık İzleme

Modern ve kullanıcı dostu bir sağlık izleme uygulaması. Kan şekeri takibi, fiziksel aktivite kaydı ve beslenme değerlendirmesi gibi temel özelliklere sahip, şık bir arayüz sunar.

## 📱 Uygulamayı Başlatma

1. Projeyi indirin.
2. Terminalde `npm install` komutu ile bağımlılıkları yükleyin.
3. `npm start` komutu ile uygulamayı başlatın.
4. Telefonunuzda **Expo Go** uygulaması ile QR kodu tarayın.

Bu uygulama, React Native ve Expo kullanılarak geliştirilmiş modern bir sağlık izleme platformudur. **MomyCare**, anne adaylarının günlük sağlık verilerini kolayca takip etmelerini sağlar.

### ✨ Özellikler

- **Ana Sayfa**: Hoş geldin mesajı ve modül kartları (Formlar, Eğitimler, Günlük Hedefler, vb.)
- **Formlar Ekranı**: Kan Şekeri İzlem, Fiziksel Aktivite, Beslenme Değerlendirme modülleri
- **Kan Şekeri İzlem**: Kan şekeri değerlerini kaydetme ve görüntüleme
- **Fiziksel Aktiviteler**: Aktivite kayıtları ve takibi
- **Beslenme**: Besin ekleme ve kalori takibi
- **Mock API**: Gerçekçi veri simülasyonu ile 1.5-2.5 saniye arası yükleme süresi
- **State Yönetimi**: Loading, Empty ve Error state'leri ile kapsamlı durum yönetimi
- **Modern UI/UX**: Görüntülere göre özelleştirilmiş tasarım dili

## 🛠 Kullanılan Teknolojiler

- **React Native** (0.74.5)
- **Expo** (~51.0.0)
- **React Navigation**
- **React Hooks**
- **StyleSheet**

## 📦 Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go uygulaması (iOS/Android cihazınızda) veya iOS Simulator / Android Emulator

### Adımlar

1. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

2. **Uygulamayı başlatın:**
   ```bash
   npm start
   # veya
   expo start
   ```

3. **Cihazınızda çalıştırın:**
   - iOS için: `npm run ios` veya Expo Go uygulamasında QR kodu tarayın
   - Android için: `npm run android` veya Expo Go uygulamasında QR kodu tarayın
   - Web için: `npm run web`

## 📁 Proje Yapısı

```
mobileuyg/
├── App.js                      # Ana uygulama giriş noktası
├── package.json                 # Bağımlılıklar ve scriptler
├── app.json                    # Expo yapılandırması
├── babel.config.js             # Babel yapılandırması
├── README.md                   # Proje dokümantasyonu
└── src/
    ├── constants/
    │   └── colors.js           # Renk paleti tanımlamaları
    ├── navigation/
    │   └── AppNavigator.js     # Navigasyon yapılandırması
    ├── screens/
    │   ├── HomeScreen.js       # Ana sayfa
    │   ├── FormsScreen.js      # Formlar ekranı
    │   ├── BloodSugarScreen.js # Kan şekeri izlem ekranı
    │   ├── PhysicalActivityScreen.js # Fiziksel aktiviteler ekranı
    │   ├── NutritionScreen.js  # Beslenme ekranı
    │   └── FoodSelectionScreen.js # Besin seçim ekranı
    ├── components/
    │   ├── Button.js           # Yeniden kullanılabilir buton
    │   ├── SkeletonLoader.js   # Yükleme animasyonu
    │   ├── EmptyState.js       # Boş durum komponenti
    │   └── ErrorState.js       # Hata durumu komponenti
    └── data/
        └── mockData.js         # Mock API ve veri
```

## 🎨 Tasarım ve Renk Paleti

Tasarım dili, hocanın verdiği Pinterest panosundaki gestasyonel diyabet uygulaması referansından ilham alınarak oluşturulmuş, ancak modern bir dokunuşla **Premium Slate & Sky** (Lacivert & Gök Mavisi) temasına dönüştürülmüştür. Bu değişiklik, uygulamanın daha profesyonel, güvenilir ve kurumsal bir sağlık asistanı gibi hissettirmesi için yapılmıştır.

### 🎯 Pano İlhamı ve Kararlar

| Karar | Pano İlhamı | Geliştirme / Özelleştirme |
|---|---|---|
| **Renk Paleti** | Panoda kırmızı-beyaz hakimdi | Güven ve ciddiyet hissi için **Lacivert (`#0F172A`)** ve **Gök Mavisi (`#0EA5E9`)** paletine geçildi. |
| **Grid Düzeni** | Formlar ekranı 2 sütunluydu | Kart bazlı layout korunarak modern gradientler eklendi. |
| **İkonografi** | Gebelik ve sağlık temalıydı | 🤰, 🩸, 🏃 gibi anlamlı emojiler ve illüstrasyon tarzı ikonlar kullanıldı. |
| **Giriş Ekranı** | Gebe kadın silueti vardı | Gebe kadın emojisi ve temiz bir giriş kartı tasarımı korundu. |
| **Uyarı Badge'leri** | Kan şekeri limitleri için uyarılar vardı | Formlarda ⚠️ gibi görsel uyarıcılar ve bildirimler entegre edildi. |

### 📝 Proje Notu

**Hedef Kullanıcı Kitlesi:** Gestasyonel diyabet (gebelik şekeri) tanısı konmuş veya risk altındaki anne adayları.

**Çözülen Problem:** Anne adaylarının gün içinde takip etmesi gereken kan şekeri ölçümlerini, yaptıkları aktiviteleri ve aldıkları öğünleri tek bir platformda kaydedip, bu verileri düzenli bir şekilde görebilmelerini sağlamak. Karmaşık kayıt defterleri yerine dijital ve hızlı bir çözüm sunulmaktadır.

### Renk Paleti (Slate & Sky)

- **Ana Renk**: `#0F172A` (Koyu Lacivert) — Güven ve kurumsallık
- **Aksiyon Butonu**: `#0EA5E9` (Sky Blue) — Canlı ve kullanıcıyı yönlendiren tonlar
- **Başarı**: `#10B981` (Zümrüt Yeşili) — Tamamlanan hedefler
- **Arka Plan**: `#F8FAFC` — Gözü yormayan temiz, ferah görünüm

### Tasarım Prensipleri

1. **Border Radius**: 12-16px arası yuvarlatılmış köşeler
2. **Shadow/Elevation**: Kartlar ve butonlarda hafif gölgeler
3. **Typography**: 
   - Başlıklar: 700 ağırlığı, büyük font boyutları
   - Alt metinler: 400-500 ağırlığı, gri renkler
4. **Spacing**: Tutarlı padding ve margin değerleri
5. **Animasyonlar**: Skeleton loader'da shimmer efekti, butonlarda activeOpacity

## 🚦 Navigasyon Akışı

```
Login Screen (Giriş)
    └── GİRİŞ butonu → Home Screen (Ana Sayfa)

Home Screen (Ana Sayfa)
    ├── Formlar kartına tıkla → Forms Screen
    │   ├── Kan Şekeri İzlem → BloodSugar Screen
    │   ├── Fiziksel Aktivite → PhysicalActivity Screen
    │   └── Beslenme Değerlendirme → Nutrition Screen
    │       └── Besin Seçimine Git → FoodSelection Screen
    └── Diğer kartlar (yakında eklenecek)
```

## 📝 Mock Data Yapısı

Mock data dosyası (`src/data/mockData.js`) şu özellikleri içerir:

- **Kan Şekeri Verileri**: Öğün, açlık durumu, tarih, saat, kan şekeri değeri, insülin dozu
- **Fiziksel Aktivite Verileri**: Aktivite türü, süre, durum, tarih-saat
- **Beslenme Verileri**: Besin adı, kalori, ölçüm birimi, açıklama
- **Formlar ve Ana Sayfa Kartları**: Modül listeleri

## 🎯 Ekranlar

### 1. Ana Sayfa (HomeScreen)
- Koral/pembe arka plan
- Hoş geldin kartı
- Grid düzeninde modül kartları (Formlar, Eğitimler, Günlük Hedefler, vb.)

### 2. Formlar Ekranı (FormsScreen)
- 3 ana modül kartı
- Kan Şekeri İzlem, Fiziksel Aktivite, Beslenme Değerlendirme

### 3. Kan Şekeri İzlem Ekranı (BloodSugarScreen)
- Kırmızı header
- Tarih seçim çubuğu
- Mavi "Ekle" butonu
- Beyaz kartlarda veri gösterimi

### 4. Fiziksel Aktiviteler Ekranı (PhysicalActivityScreen)
- Koral arka plan
- Mavi "Ekle" butonu
- Yeşil/kırmızı kenarlıklı aktivite kartları
- Aktivite detayları

### 5. Beslenme Ekranı (NutritionScreen)
- Koral arka plan
- Gebelik haftası ve öğün seçimi
- Turuncu "Besin Seçimine Git" butonu
- Toplam kalori gösterimi

### 6. Besin Seçim Ekranı (FoodSelectionScreen)
- Besin detay kartı
- Miktar girişi
- Açık mavi "Listeye Kaydet" butonu

## 🔄 State Yönetimi

### Loading State
- Veri yüklenirken SkeletonLoader komponenti gösterilir
- ActivityIndicator ile basit yükleme göstergesi
- 1.5-2.5 saniye arası simüle edilmiş gecikme

### Empty State
- Liste boş olduğunda EmptyState komponenti gösterilir
- Kullanıcıyı yönlendiren mesajlar

### Error State
- Hata durumunda ErrorState komponenti gösterilir
- "Tekrar Dene" butonu ile yeniden deneme imkanı
- %10 şansla simüle edilmiş hata durumları

## 🎓 Hackathon Kriterleri Karşılanması

✅ **Proje Yapısı ve Navigasyon**: React Navigation ile çoklu ekran yapısı  
✅ **Mock API**: Fake Promise yapısı ile simüle edilmiş API çağrıları  
✅ **State Yönetimi**: Loading, Empty ve Error state'leri  
✅ **Tasarım**: Görüntülere göre özelleştirilmiş modern UI/UX  
✅ **Dokümantasyon**: Kapsamlı README.md dosyası  

## 🔮 Gelecek Geliştirmeler

- [ ] Gerçek API entegrasyonu
- [ ] Veri kaydetme ve silme işlevleri
- [ ] Grafik ve istatistik görüntüleme
- [ ] Bildirimler sistemi
- [ ] Kullanıcı profili
- [ ] Eğitimler modülü
- [ ] Günlük hedefler takibi
- [ ] Dark mode

## 📸 Ekran Görüntüleri

<!-- Screenshot'lar eklenecek -->
- Ana Sayfa
- Kan Şekeri İzlem Ekranı
- Fiziksel Aktiviteler
- Beslenme Formu

---

**Geliştirici Notu**: Bu uygulama, modern React Native pratikleri takip edilerek geliştirilmiştir. Kod yapısı modüler ve bakımı kolaydır.
