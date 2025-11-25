# Mekanova

Mekanova; bar, restoran, kafe, kulüp, meyhane ve roof bar gibi tüm mekan konseptleri için rezervasyon, anlık doluluk oranı ve yakınlık bazlı keşif sunan siyah-beyaz minimalist bir Flutter uygulamasıdır. Android, iOS ve web (PWA) desteği hedeflenmektedir.

## Temel Özellikler
- **Yakındaki mekanlar**: Mesafeye göre sıralanmış liste ve harita görünümü arasında geçiş.
- **Harita entegrasyonu**: Google Maps marker'ları, pin tıklayınca bottom sheet kartı, kullanıcı konumu gösterimi.
- **Rezervasyon akışı**: Tarih/saat seçimi, kişi sayısı, özel istekler, özet ve onay, rezervasyon listesinden görüntüleme/iptal.
- **Doluluk rozetleri**: current_occupancy_percent alanına göre Sakin/Normal/Yoğun göstergesi.
- **Menü görüntüleme**: Menü başlıkları (venue_menu_sections) ve kalemler (menu_items) sekmeli/accordion görünümünde.
- **Favoriler**: Kalp ikonu ile favorilere ekleme ve Profil sekmesinde listeleme.

## Teknoloji ve Entegrasyonlar
- **Flutter** (Material + siyah-beyaz özel tema; bold tipografi, büyük fotoğraf kartları).
- **Supabase**: Auth, Postgres, Storage, Realtime (opsiyonel canlı doluluk güncellemesi).
- **Kimlik Doğrulama**: E-posta/şifre, Google OAuth (Supabase OAuth akışı veya benzeri).
- **Harita**: `google_maps_flutter`, mesafe hesabı (Haversine veya Maps API).
- **Depolama**: Supabase Storage ile kapak ve menü fotoğrafları.

## İzinler
- **Konum**: Yakındaki mekanları göstermek ve mesafeye göre sıralamak için (şehir + hassas GPS).
- **Bildirimler** (opsiyonel, sonraki faz): Rezervasyon onayı/güncellemesi, hatırlatma ve kampanyalar.

## Ekranlar ve Navigasyon
- **SplashScreen**: Logo, auth durumu ve konum izni kontrolü.
- **OnboardingLocation**: Konum izni açıklaması ve CTA.
- **AuthLanding / LoginEmailPassword / Register**: Google ile giriş, e-posta ile giriş ve kayıt.
- **HomeNearbyList**: Arama barı, filtre chip'leri, mekan kartları; Map toggle butonu.
- **MapScreen**: Google Maps widget, pin'ler, seçili mekan için bottom sheet.
- **VenueDetail**: Kapak fotoğrafı, konsept, rating, doluluk rozeti, adres/mesafe, çalışma saatleri, menü sekmeleri, rezervasyon CTA, favori butonu.
- **ReservationFlow**: Tarih & saat → kişi sayısı → özel istek → özet & onay.
- **ReservationsList**: Yaklaşan ve geçmiş rezervasyonlar.
- **ProfileScreen**: Kullanıcı bilgileri, şehir, profil düzenleme, çıkış.

Navigasyon yapısı: Bottom tab (Keşfet, Harita, Rezervasyonlar, Favoriler/Profil) + her tab altında stack ekranlar.

## Tema ve UX İlkeleri
- Siyah (#000) arka plan, koyu yüzeyler, beyaz aksanlar; yüksek kontrastlı tipografi (SF Pro/Inter, bold başlıklar).
- Kartlar: büyük fotoğraf, yüksek border radius, hafif gölge.
- Butonlar: full-width primary CTA, pill form; secondary için outline.
- Erişilebilirlik: Minimum 44x44dp dokunma alanı, okunaklı font boyutları, web uyumlu responsive layout.

## Veri Modeli (Supabase)
- **users**: auth_user_id, email, display_name, avatar_url, phone_number, city, created_at.
- **venues**: konsept, konum (city/district/address, latitude/longitude), iletişim, fiyat seviyesi, rating, cover_image_url, featured, open_hours_json, current_occupancy_percent, max_capacity.
- **venue_menu_sections** / **menu_items**: Menü başlıkları ve kalemleri; fiyat ve bayraklar (vegan/alkollü).
- **reservations**: user_id, venue_id, tarih, saat, kişi sayısı, özel istek, status (pending/approved/cancelled vb.).
- **favorites**: user_id + venue_id birleşik birincil anahtar.

Ayrıntılı tablo tanımları için `db/schema.sql` dosyasına bakın.

## Geliştirme Notları
- Flutter ortamını kurun (`flutter --version` ile doğrulayın). Hedef platformlar: Android, iOS, Web (PWA).
- Supabase projesi oluşturun; `.env.example` içindeki değerleri doldurup geliştirme sırasında `--dart-define-from-file` veya uygun yapılandırma ile uygulamaya iletin.
- Google OAuth web istemci kimliğini Supabase Auth sağlayıcısına ekleyin.
- Harita için Android/iOS API key yapılandırmasını platform dosyalarında unutmayın; web için Maps JavaScript API yetkilendirme gerekecektir.
- Performans: Liste/harita için sayfalama ve lazy loading; Realtime doluluk güncellemeleri opsiyonel.

## Yol Haritası (kısa vadeli)
1. Flutter proje iskeletini oluştur ve custom siyah-beyaz temayı uygula.
2. Supabase istemcisi ve auth (email/password + Google) akışlarını entegre et.
3. Yakındakiler listesi + harita toggle'ı; konum izni ve mesafe sıralama.
4. Venue detail + menü sekmeleri + doluluk rozeti.
5. Rezervasyon sihirbazı ve rezervasyon listesi.
6. Favoriler sekmesi; Supabase Storage entegrasyonu ile görseller.

## Lisans
Bu depo ürün gereksinimlerini ve şema tasarımını içerir; uygulama kodu eklendikçe lisans bilgisi güncellenecektir.

## Web Yayını (GitHub Pages)

Bu repo için GitHub Actions ile otomatik Flutter web build ve GitHub Pages deploy yapılandırılmıştır.

1. Değişikliklerini `main` branch’ine push et.
2. GitHub’da **Actions** sekmesinden `Deploy Flutter Web to GitHub Pages` workflow’unun başarıyla tamamlandığını kontrol et.
3. İlk çalıştırmadan sonra repo ayarlarından **Settings → Pages** bölümüne git:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`, Folder: `/`
4. Birkaç dakika içinde uygulama şu adresten erişilebilir olur:
 - https://umutablay47.github.io/mekanova/

Bu adres README yerine Flutter web uygulamasını çalıştıracaktır.

> Not: Workflow, Pages deploy adımında `GH_PAGES_TOKEN` secret'ını kullanır. Repo ayarlarında bu secret'ı tanımladığınızdan emin olun; aksi halde yetki hatası alabilirsiniz.
