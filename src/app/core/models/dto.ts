export type CreateCategoryDto = {
  name: string;
  slug: string;
};

export type UpdateCategoryDto = {
  name: string;
};

export type CreateLessonDto = {
  title: string;
  slug: string;
  categoryId: string;
  description?: string;
  author?: string;
  cover?: string;
};

export type UpdateLessonDto = {
  title?: string;
  description?: string;
  author?: string;
  cover?: string;
};

export type UpdateLessonContentDto = {
  content: string;
};
