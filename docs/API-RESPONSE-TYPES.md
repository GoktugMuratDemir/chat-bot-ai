# API Response Tipleri ve Kullanımı

## Login API Response

Login API'den gelen gerçek response yapısı:

```json
{
  "userType": "STUDENT",
  "student": {
    "id": 300,
    "name": "Ferhat Sabri Kökdemir",
    "surname": ".",
    "grade": "GRADE_3",
    "username": "ferhat",
    "password": "sabri",
    "active": true,
    "avatar": "avatar.jpg",
    "school": {
      "id": 110,
      "name": "GAZİ SCHOOLS",
      "active": true,
      "username": "505200",
      "password": "1359500"
    },
    "schoolRoom": {
      "id": 118,
      "name": "5-Z",
      "active": true,
      "grade": "GRADE_3",
      "school": {
        "id": 110,
        "name": "GAZİ SCHOOLS",
        "active": true,
        "username": "505200",
        "password": "1359500"
      }
    }
  },
  "teacher": null,
  "school": null,
  "systemAdmin": null,
  "error": null
}
```

## TypeScript Interface'leri

### Student Interface

```typescript
interface Student {
  id: number;
  name: string;
  surname: string;
  grade: string; // GRADE_1, GRADE_2, ... GRADE_12
  username: string;
  password: string;
  active: boolean;
  avatar: string;
  school: School;
  schoolRoom: SchoolRoom;
}
```

### School Interface

```typescript
interface School {
  id: number;
  name: string;
  active: boolean;
  username: string;
  password: string;
}
```

### SchoolRoom Interface

```typescript
interface SchoolRoom {
  id: number;
  name: string;
  active: boolean;
  grade: string;
  school: School;
}
```

## Enum'lar

### UserType

```typescript
enum UserType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  SCHOOL = "SCHOOL",
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
}
```

### Grade

```typescript
enum Grade {
  GRADE_1 = "GRADE_1",
  GRADE_2 = "GRADE_2",
  // ... GRADE_12'ye kadar
}
```

## Kullanım Örnekleri

### Auth Context Kullanımı

```typescript
import { useAuth } from "@/contexts/auth-context";
import { Student } from "@/types";

function MyComponent() {
  const { user, userType, isAuthenticated } = useAuth();
  
  // Type casting
  const student = user as Student;
  
  if (isAuthenticated && student) {
    console.log(student.name); // "Ferhat Sabri Kökdemir"
    console.log(student.grade); // "GRADE_3"
    console.log(student.school.name); // "GAZİ SCHOOLS"
    console.log(student.schoolRoom.name); // "5-Z"
  }
}
```

### Helper Functions

```typescript
import { getFullName, getGradeLabel } from "@/utils";

const fullName = getFullName(student.name, student.surname);
// "Ferhat Sabri Kökdemir" veya sadece "Ferhat" (surname "." ise)

const gradeLabel = getGradeLabel(student.grade);
// "3. Sınıf"
```

### Dashboard Örneği

```typescript
"use client";

import { useAuth } from "@/contexts/auth-context";
import { Student } from "@/types";
import { getFullName, getGradeLabel } from "@/utils";

export default function StudentDashboard() {
  const { user } = useAuth();
  const student = user as Student;

  return (
    <div>
      <h1>Hoş geldin, {getFullName(student.name, student.surname)}! 👋</h1>
      <p>📚 {getGradeLabel(student.grade)}</p>
      <p>🏫 {student.school.name}</p>
      <p>🚪 {student.schoolRoom.name}</p>
    </div>
  );
}
```

## Oluşturulan Dosyalar

### Types

- [`src/types/auth.types.ts`](../src/types/auth.types.ts) - Tüm auth type'ları
- [`src/types/index.ts`](../src/types/index.ts) - Type export'ları

### Utils

- [`src/utils/user.utils.ts`](../src/utils/user.utils.ts) - Kullanıcı helper fonksiyonları
- [`src/utils/index.ts`](../src/utils/index.ts) - Util export'ları

### Context Güncellemeleri

- [`src/contexts/auth-context.tsx`](../src/contexts/auth-context.tsx) - Gerçek API response'una göre güncellendi

### Enum Güncellemeleri

- [`src/enums/index.ts`](../src/enums/index.ts) - UserType enum'ı API ile uyumlu hale getirildi

## localStorage Yapısı

Login başarılı olduğunda localStorage'a şunlar yazılır:

```javascript
localStorage.setItem("userType", "STUDENT"); // Enum değeri
localStorage.setItem("isAuthenticated", "true");
localStorage.setItem("student", JSON.stringify(studentData)); // Tüm student objesi
```

## Notlar

- `surname` değeri "." ise, sadece isim gösterilir
- `grade` değerleri "GRADE_X" formatındadır (X: 1-12)
- Nested `school` objeleri hem student hem schoolRoom içinde mevcuttur
- `avatar` dosya adı döner, tam URL oluşturmak için `getAvatarUrl()` kullanılabilir
