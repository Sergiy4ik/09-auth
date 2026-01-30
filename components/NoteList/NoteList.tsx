import css from './NoteList.module.css';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface NoteListProps {
  notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success("The note has been successfully deleted.")
    },
    onError: () => {
      toast.error("Failed to delete note")
    }
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>

            <Link className={css.link} href={`/notes/${id}`}>View details</Link>

            <button
              className={css.button}
              onClick={() => deleteMutation.mutate(id)}
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

