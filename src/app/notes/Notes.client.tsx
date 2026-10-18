'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../lib/api';
import SearchBox from '../../components/SearchBox/SearchBox';
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import css from './notes.module.css';

const NotesClient = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearchDebounce = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    handleSearchDebounce(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    refetchOnMount: false,
  });

  return (
    <div className={css.app} suppressHydrationWarning>
      <header className={css.toolbar} suppressHydrationWarning>
        <SearchBox value={search} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onChange={(newPage: number) => setPage(newPage)}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main suppressHydrationWarning>
        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Something went wrong.</p>}

        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

        {data && data.notes.length === 0 && !isLoading && <p>No notes found. Create a new one!</p>}
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default NotesClient;
