export interface Lesson {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  content?: string;
  description?: string;
  cover?: string;
  author?: string;
  updateTime?: Date;
}
