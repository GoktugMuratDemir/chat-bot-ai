/**
 * Grade enum'ını human-readable formata çevirir
 * @param grade - Grade enum değeri
 * @returns Okunabilir sınıf seviyesi
 */
export const getGradeLabel = (grade: string): string => {
  const gradeMap: Record<string, string> = {
    GRADE_1: "1. Sınıf",
    GRADE_2: "2. Sınıf",
    GRADE_3: "3. Sınıf",
    GRADE_4: "4. Sınıf",
    GRADE_5: "5. Sınıf",
    GRADE_6: "6. Sınıf",
    GRADE_7: "7. Sınıf",
    GRADE_8: "8. Sınıf",
    GRADE_9: "9. Sınıf",
    GRADE_10: "10. Sınıf",
    GRADE_11: "11. Sınıf",
    GRADE_12: "12. Sınıf",
  };

  return gradeMap[grade] || grade;
};

/**
 * Öğrenci tam adını döndürür
 * @param name - İsim
 * @param surname - Soyisim
 * @returns Tam ad
 */
export const getFullName = (name: string, surname?: string): string => {
  if (!surname || surname === ".") {
    return name;
  }
  return `${name} ${surname}`;
};

/**
 * Avatar URL'ini döndürür
 * @param avatar - Avatar dosya adı
 * @param baseUrl - Base URL (opsiyonel)
 * @returns Tam avatar URL'i
 */
export const getAvatarUrl = (
  avatar: string,
  baseUrl: string = "/avatars",
): string => {
  if (avatar.startsWith("http")) {
    return avatar;
  }
  return `${baseUrl}/${avatar}`;
};
