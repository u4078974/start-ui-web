import { create } from 'zustand';

type CmdkStore = {
  isOpen: boolean;
  search: string;
  currentPage?: string;
  pages: Array<string>;
  setIsOpen(newIsOpen: boolean): void;
  open(): void;
  close(): void;
  toggle(): void;
  setSearch(newSearch: string): void;
  setPages(newPages: Array<string>): void;
  appendPage(newPage: string, options?: { keepSearch?: boolean }): void;
  goBack(options?: { keepSearch?: boolean }): void;
};

export const useCmdkStore = create<CmdkStore>((set) => ({
  isOpen: false,
  search: '',
  pages: [],
  currentPage: undefined,
  setIsOpen: (newIsOpen) => set(() => ({ isOpen: newIsOpen })),
  open: () =>
    set(() => {
      return { isOpen: true };
    }),
  close: () =>
    set(() => {
      return { isOpen: false, pages: [], currentPage: undefined, search: '' };
    }),
  toggle: () =>
    set((state) => {
      return { isOpen: !state.isOpen };
    }),
  setSearch: (newSearch) => set(() => ({ search: newSearch })),
  setPages: (newPages) =>
    set(() => {
      return { pages: newPages, currentPage: newPages[newPages.length - 1] };
    }),
  appendPage: (newPage, options) =>
    set((state) => {
      state.setPages([...state.pages, newPage]);

      if (!options?.keepSearch) state.setSearch('');

      return { pages: state.pages, currentPage: newPage };
    }),
  goBack: (options) =>
    set((state) => {
      state.setPages(state.pages.slice(0, -1));

      if (!options?.keepSearch) state.setSearch('');

      return { pages: state.pages, currentPage: state.pages[-1] };
    }),
}));
