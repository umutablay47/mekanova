# Mekanova CI/CD Notları

- `.github/workflows/deploy_flutter_web.yml` dosyası, `main` branch’ine her push geldiğinde çalışır.
- Workflow, stable Flutter sürümünü kurup `flutter build web --release --base-href /mekanova/` komutu ile web build alır.
 codex/add-location-based-venue-discovery-fopecz
- Deploy adımı, GitHub Pages yetkisi için `GH_PAGES_TOKEN` secrets anahtarını kullanır; repo ayarlarında bu secret'ı eklediğinizden emin olun.

 main
- `build/web` klasörü, `gh-pages` branch’ine deploy edilir.
- GitHub Pages ayarlarında Source olarak `gh-pages` branch’i seçildiğinde, proje şu URL üzerinden Flutter web olarak yayına çıkar:
  - https://umutablay47.github.io/mekanova/
