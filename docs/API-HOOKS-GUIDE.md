# API Hooks Dokümantasyonu

Bu dokümantasyon, organize edilmiş API hooks yapısını açıklar.

## 📁 Yapı

```text
src/hooks/api/
├── endpoints/            # 🎯 Endpoint-based hooks
│   ├── use-auth.ts      #    Authentication hooks
│   ├── use-users.ts     #    User management hooks  
│   └── index.ts         #    Endpoints export
├── use-api.ts           # Base hook (core functionality)
├── use-get.ts           # GET base hook
├── use-post.ts          # POST base hook
├── use-put.ts           # PUT/PATCH base hook
├── use-delete.ts        # DELETE base hook
├── types.ts             # 📝 Tüm API types (merkezi)
├── use-login.ts         # (Legacy - backward compatibility)
└── index.ts             # Merkezi export noktası
```

## 🎯 Organizasyon Prensibi

### 1. Base Hooks (Ana Dizin)

Genel amaçlı HTTP method hooks:

- `use-api.ts` - Tüm hooks'ların kullandığı temel hook
- `use-get.ts`, `use-post.ts`, `use-put.ts`, `use-delete.ts`

### 2. Endpoint Hooks (`endpoints/` klasörü)

Endpoint gruplarına göre organize edilmiş spesifik hooks:

- Her endpoint grubu kendi dosyasında (`use-auth.ts`, `use-users.ts`)
- Type'sız, sadece hook fonksiyonları
- Base hooks'ları import ederek kullanır

### 3. Types (`types.ts` - Merkezi)

Tüm API tipleri organize edilmiş şekilde:

- **Base API Types**: `ApiState`, `ApiOptions`, `MutationOptions`
- **Auth Types**: `LoginRequest`, `LogoutResponse`, `MeResponse`
- **User Types**: `User`, `UserListResponse`, `CreateUserRequest`, vb.

## 🚀 Hızlı Başlangıç

### Import

```tsx
import { 
  useAuthLogin, 
  useUsers, 
  useCreateUser,
  type LoginRequest,
  type User 
} from "@/hooks/api";
```

### Kullanım Örnekleri

```tsx
// Authentication
const { mutate: login, loading } = useAuthLogin();
login({ username: "test", password: "1234" });

// Fetch users
const { data: users, loading, refetch } = useUsers();

// Create user
const { mutate: createUser } = useCreateUser();
createUser({ name: "John", username: "john123", password: "pass" });
```

#### `useAuthLogin()`

Kullanıcı girişi için.

```tsx
import { useAuthLogin } from "@/hooks/api";

function LoginPage() {
  const { mutate, loading, error, data } = useAuthLogin();

  const handleLogin = () => {
    mutate(
      { username: "test", password: "1234" },
      {
        onSuccess: (data) => {
          console.log("Giriş başarılı:", data);
        },
        onError: (error) => {
          console.error("Giriş hatası:", error);
        },
      }
    );
  };

  return (
    <button onClick={handleLogin} disabled={loading}>
      {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
    </button>
  );
}
```

#### `useAuthLogout()`

Kullanıcı çıkışı için.

```tsx
import { useAuthLogout } from "@/hooks/api";

function LogoutButton() {
  const { mutate, loading } = useAuthLogout();

  return (
    <button onClick={() => mutate()} disabled={loading}>
      Çıkış Yap
    </button>
  );
}
```

#### `useAuthMe()`

Mevcut kullanıcı bilgilerini almak için.

```tsx
import { useAuthMe } from "@/hooks/api";

function ProfilePage() {
  const { data, loading, error, refetch } = useAuthMe();

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <h1>Hoş geldin, {data?.student?.name}</h1>
      <button onClick={refetch}>Yenile</button>
    </div>
  );
}
```

### 2. **Users Hooks** (`endpoints/use-users.ts`)

Kullanıcı yönetimi işlemleri için hooks.

#### `useUsers()`

Kullanıcı listesini almak için.

```tsx
import { useUsers } from "@/hooks/api";

function UsersPage() {
  const { data, loading, error, refetch } = useUsers({ page: 1, limit: 10 });

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <h1>Kullanıcılar ({data?.total})</h1>
      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={refetch}>Yenile</button>
    </div>
  );
}
```

#### `useUser(userId)`

Tek bir kullanıcının detaylarını almak için.

```tsx
import { useUser } from "@/hooks/api";

function UserProfile({ userId }: { userId: number }) {
  const { data, loading, error } = useUser(userId);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>Username: {data?.username}</p>
      <p>Email: {data?.email}</p>
    </div>
  );
}
```

#### `useCreateUser()`

Yeni kullanıcı oluşturmak için.

```tsx
import { useCreateUser } from "@/hooks/api";

function CreateUserForm() {
  const { mutate, loading, error } = useCreateUser();

  const handleSubmit = (formData: CreateUserRequest) => {
    mutate(formData, {
      onSuccess: (newUser) => {
        console.log("Kullanıcı oluşturuldu:", newUser);
        // Redirect veya başka işlemler...
      },
    });
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

#### `useUpdateUser()`

Mevcut kullanıcıyı güncellemek için.

```tsx
import { useUpdateUser } from "@/hooks/api";

function UpdateUserForm({ userId }: { userId: number }) {
  const { mutate, loading, error } = useUpdateUser();

  const handleUpdate = (updates: UpdateUserRequest) => {
    mutate({ id: userId, ...updates }, {
      onSuccess: (updatedUser) => {
        console.log("Kullanıcı güncellendi:", updatedUser);
      },
    });
  };

  return <form onSubmit={handleUpdate}>{/* Form fields */}</form>;
}
```

#### `useDeleteUser()`

Kullanıcı silmek için.

```tsx
import { useDeleteUser } from "@/hooks/api";

function DeleteUserButton({ userId }: { userId: number }) {
  const { mutate, loading } = useDeleteUser();

  const handleDelete = () => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      mutate({ id: userId }, {
        onSuccess: () => {
          console.log("Kullanıcı silindi");
          // Listeyi yenile veya redirect...
        },
      });
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? "Siliniyor..." : "Sil"}
    </button>
  );
}
```

## 🔧 Base Hooks

Genel amaçlı API işlemleri için hala base hooks'ları kullanabilirsiniz:

### `useGet<T>(url, options?)`

```tsx
import { useGet } from "@/hooks/api";

const { data, loading, error, refetch } = useGet<MyDataType>("/api/custom-endpoint");
```

### `usePost<TData, TVariables>(url, options?)`

```tsx
import { usePost } from "@/hooks/api";

const { mutate, loading, error } = usePost<ResponseType, RequestType>("/api/custom-endpoint");
mutate({ field: "value" });
```

### `usePut<TData, TVariables>(url, options?)`

```tsx
import { usePut } from "@/hooks/api";

const { mutate, loading, error } = usePut<ResponseType, RequestType>("/api/custom-endpoint");
mutate({ field: "updated value" });
```

### `useDelete<TData, TVariables>(url, options?)`

```tsx
import { useDelete } from "@/hooks/api";

const { mutate, loading, error } = useDelete("/api/custom-endpoint");
mutate({ id: 123 });
```

## 🎨 Options

Tüm hooks'lar aşağıdaki callback options'larını destekler:

```tsx
{
  onSuccess: (data) => {
    // İstek başarılı olduğunda çalışır
  },
  onError: (error) => {
    // Hata olduğunda çalışır
  },
  onFinally: () => {
    // Her durumda çalışır (finally)
  }
}
```

Örnek:

```tsx
const { mutate } = useAuthLogin();

mutate(
  { username, password },
  {
    onSuccess: (data) => {
      toast.success("Giriş başarılı!");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(`Hata: ${error}`);
    },
    onFinally: () => {
      console.log("İstek tamamlandı");
    },
  }
);
```

## 📝 Yeni Endpoint Grubu Ekleme

Yeni bir endpoint grubu eklemek için:

1. **Endpoint'leri tanımlayın** (`src/lib/api/endpoints.ts`):
```tsx
export const API_ENDPOINTS = {
  // ... mevcut endpoints
  PRODUCTS: {
    LIST: "/products",
    BY_ID: (id: string | number) => `/products/${id}`,
  },
} as const;
```

2. **Type'ları ekleyin** (`src/hooks/api/types.ts`):
```tsx
// ... mevcut types

/**
 * ==================== PRODUCT TYPES ====================
 * Product endpoint tipleri
 */

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
}

export interface CreateProductRequest {
  name: string;
  price: number;
}
```

3. **Hook dosyası oluşturun** (`src/hooks/api/endpoints/use-products.ts`):
```tsx
"use client";
   - Base hooks ana dizinde
   - Endpoint hooks `endpoints/` klasöründe
   - Tüm types merkezi `types.ts` dosyasında

2. **🔍 Kolay Bulma**: 
   - Hangi hook'u kullanacağınızı kolayca bulabilirsiniz
   - Type definitions tek bir yerde

3. **📝 TypeScript Desteği**: 
   - Tam tip güvenliği
   - Merkezi type management

4. **♻️ Yeniden Kullanılabilir**: 
   - Base hooks hala mevcut
   - Modüler yapı

5. **🔄 Geriye Dönük Uyumlu**: 
   - Eski `useLogin` gibi hooks hala çalışıyor

6. **📦 Ölçeklenebilir**: 
   - Yeni endpoint grubu eklemek kolay
   - Organize klasör yapısı
import { useDelete } from "../use-delete";
import { API_ENDPOINTS } from "@/lib/api";
import type {
  Product,
  ProductListResponse,
  CreateProductRequest,
} from "../types";

/**
 * ==================== PRODUCTS API HOOKS ====================
 */

export const useProducts = () => {
  return useGet<ProductListResponse>(API_ENDPOINTS.PRODUCTS.LIST);
};

export const useProduct = (productId: string | number) => {
  return useGet<Product>(API_ENDPOINTS.PRODUCTS.BY_ID(productId));
};

export const useCreateProduct = () => {
  return usePost<Product, CreateProductRequest>(
    API_ENDPOINTS.PRODUCTS.LIST
  );
};

// ... diğer hooks
```

4. **Export edin** (`src/hooks/api/endpoints/index.ts`):
```tsx
export * from "./use-auth";
export * from "./use-users";
export * from "./use-products"; // Yeni eklendi
```

## ✅ Avantajlar

1. **📁 Organize Yapı**: Her endpoint grubu kendi dosyasında
2. **🔍 Kolay Bulma**: Hangi hook'u kullanacağınızı kolayca bulabilirsiniz
3. **📝 TypeScript Desteği**: Tam tip güvenliği
4. **♻️ Yeniden Kullanılabilir**: Base hooks'lar hala mevcut
5. **🔄 Geriye Dönük Uyumlu**: Eski `useLogin` gibi hooks hala çalışıyor

## 🚀 Migration (Eski Kodları Güncelleme)

Eski kod:
```tsx
import { useLogin } from "@/hooks/api";
```

Yeni kod (tercih edilen):
```tsx
import { useAuthLogin } from "@/hooks/api";
// veya hala eski import çalışır (backward compatible)
import { useLogin } from "@/hooks/api";
```

## 📚 İlgili Dosyalar

- [API Endpoints](../lib/api/endpoints.ts) - Tüm API endpoint'leri
- [API Client](../lib/api/client.ts) - Axios yapılandırması
- [API Types](../lib/api/types.ts) - Ortak API tipleri
- [Auth Context](../contexts/auth-context.tsx) - Authentication context
