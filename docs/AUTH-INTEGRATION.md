# Login Entegrasyonu Dokümantasyonu

Bu dokümantasyon, axebug projesinde auth context ve login API entegrasyonunun nasıl yapılandırıldığını açıklar.

## Yapılan Değişiklikler

### 1. Auth Context Oluşturuldu
**Dosya:** `src/contexts/auth-context.tsx`

Auth context, kullanıcı kimlik doğrulama ve yetkilendirme işlemlerini merkezi olarak yönetir:
- Kullanıcı bilgilerini state'te tutar
- localStorage ile persist eder
- Role-based routing sağlar
- Login/logout işlemlerini yönetir

**Kullanım:**
```tsx
import { useAuth } from '@/contexts/auth-context';

const { isAuthenticated, user, userType, login, logout } = useAuth();
```

### 2. Login Hook Oluşturuldu
**Dosya:** `src/hooks/api/use-login.ts`

MD dosyasına göre `PUT /login/` endpoint'ini kullanan hook:

```tsx
import { useLogin } from '@/hooks/api';

const { mutate, loading, error, data } = useLogin();
mutate({ username: 'test', password: '1234' });
```

### 3. API Endpoint'leri Güncellendi
**Dosya:** `src/lib/api/endpoints.ts`
- Login endpoint: `/login/` (MD dosyasına göre)
- Base URL: `https://api.axebug.com/api`

### 4. Login Sayfası Entegre Edildi
**Dosya:** `src/app/auth/login/page.tsx`

Login sayfası artık:
- Auth context ile entegre
- API hook'ları kullanır
- Loading state gösterir
- Hata mesajlarını gösterir
- Başarılı girişte otomatik yönlendirir

### 5. Protected Guard Güncellendi
**Dosya:** `src/providers/guard/index.tsx`

Guard artık auth context ile çalışır:
- Yetkisiz erişimleri engeller
- Giriş yapmamış kullanıcıları login'e yönlendirir
- Role-based access control sağlar

### 6. Root Layout Güncellendi
**Dosya:** `src/app/layout.tsx`
- AuthProvider tüm uygulamayı sarmalıyor

## Rol Bazlı Yönlendirme

MD dosyasına göre rol bazlı yönlendirmeler:

| Kullanıcı Tipi | localStorage Key | Dashboard Route |
|----------------|------------------|-----------------|
| STUDENT | `student` | `/dashboard-student` |
| TEACHER | `teacher` | `/dashboard-teacher` |
| SCHOOL | `school` | `/dashboard-admin` |
| SYSTEM_ADMIN | `system_admin` | `/dashboard-system` |

## API Konfigürasyonu

### Environment Variables
`.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
NEXT_PUBLIC_API_URL=https://api.axebug.com/api
```

### Login API Detayları
- **Method:** PUT
- **Endpoint:** `/login/`
- **Base URL:** `https://api.axebug.com/api`
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "userType": "STUDENT" | "TEACHER" | "SCHOOL" | "SYSTEM_ADMIN",
    "student": { ... },
    "teacher": { ... },
    "school": { ... },
    "systemAdmin": { ... },
    "error": null | "string"
  }
  ```

## Kullanım Örnekleri

### Login Sayfasında
```tsx
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useLogin } from "@/hooks/api";

export default function LoginPage() {
  const { login: authLogin } = useAuth();
  const { mutate, loading, error, data } = useLogin();

  useEffect(() => {
    if (data && !data.error) {
      authLogin(data); // Otomatik yönlendirme yapılır
    }
  }, [data, authLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ username, password });
  };
}
```

### Protected Route'larda
```tsx
import { ProtectedGuard } from "@/providers/guard";
import { GuardType, UserType } from "@/enums";

export default function StudentDashboard() {
  return (
    <ProtectedGuard 
      guardType={GuardType.PROTECTED}
      allowedUserTypes={[UserType.STUDENT]}
    >
      {/* Sadece öğrenciler erişebilir */}
    </ProtectedGuard>
  );
}
```

### Logout
```tsx
import { useAuth } from "@/contexts/auth-context";

export default function Header() {
  const { logout } = useAuth();

  return (
    <button onClick={logout}>
      Çıkış Yap
    </button>
  );
}
```

## Sorun Giderme

### Login çalışmıyor
1. `.env.local` dosyasını kontrol edin
2. API URL'nin doğru olduğundan emin olun
3. Network tab'de request/response'u kontrol edin

### Yönlendirme çalışmıyor
1. Dashboard route'larının tanımlı olduğundan emin olun:
   - `/dashboard-student`
   - `/dashboard-teacher`
   - `/dashboard-admin`
   - `/dashboard-system`

### Token hatası
1. localStorage'da `accessToken` olup olmadığını kontrol edin
2. API response'da token dönüp dönmediğini kontrol edin

## Gelecek Geliştirmeler

- [ ] Token refresh mekanizması
- [ ] Remember me özelliği
- [ ] Çoklu oturum yönetimi
- [ ] Session timeout
