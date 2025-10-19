import { create } from 'zustand';

interface EditorState {
  content: string;
  title: string;
  selectedCategories: number[];
  isPublished: boolean;
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  setSelectedCategories: (categories: number[]) => void;
  setIsPublished: (published: boolean) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  content: '',
  title: '',
  selectedCategories: [],
  isPublished: false,
  setContent: (content) => set({ content }),
  setTitle: (title) => set({ title }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),
  setIsPublished: (isPublished) => set({ isPublished }),
  reset: () => set({
    content: '',
    title: '',
    selectedCategories: [],
    isPublished: false,
  }),
}));
