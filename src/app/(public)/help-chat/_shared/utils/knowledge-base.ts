import type { Doc } from "../types";

// ─── Knowledge Base (RAG Context) ────────────────────────────────────────────
// Yeni belge eklemek için bu diziye yeni bir nesne ekleyin.

export const DOCS: Doc[] = [
  {
    id: 1,
    title: "Fatura Oluşturma",
    url: "/faturalar/yeni",
    category: "Fatura",
    content:
      "Yeni fatura oluşturmak için sol menüden Faturalar sekmesine gidin. Sağ üst köşedeki + Yeni Fatura butonuna tıklayın. Müşteri adını arama kutusundan seçin, ürün veya hizmetleri ekleyin, ardından Kaydet butonuna basın.",
  },
  {
    id: 2,
    title: "Fatura Kaydedilmiyor Sorunu",
    url: "/faturalar/yeni",
    category: "Sorun Giderme",
    content:
      "Fatura kaydedilemiyorsa şunları kontrol edin: Müşteri seçilmiş mi? En az bir kalem eklenmiş mi? Tutar alanları dolu mu? Hata devam ederse sayfayı yenileyip tekrar deneyin.",
  },
  {
    id: 3,
    title: "Kullanıcı Ekleme",
    url: "/ayarlar/kullanicilar",
    category: "Ayarlar",
    content:
      "Sisteme yeni kullanıcı eklemek için Ayarlar > Kullanıcılar menüsüne gidin. + Kullanıcı Ekle butonuna tıklayın. Ad, e-posta ve rol bilgilerini girin. Kaydet'e bastığınızda kullanıcıya aktivasyon e-postası gönderilir.",
  },
  {
    id: 4,
    title: "Şifremi Unuttum",
    url: "/giris",
    category: "Giriş",
    content:
      "Giriş sayfasında Şifremi Unuttum linkine tıklayın. E-posta adresinizi girin. Gelen kutunuza sıfırlama linki gelecektir. Link 24 saat geçerlidir.",
  },
  {
    id: 5,
    title: "Rapor İndirme",
    url: "/raporlar",
    category: "Raporlar",
    content:
      "Raporlar menüsünden istediğiniz rapor türünü seçin. Tarih aralığını belirleyin. PDF veya Excel formatında indirmek için İndir butonuna tıklayın.",
  },
];
