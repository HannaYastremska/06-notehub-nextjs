import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface Props {
  params: Promise<{ id: string }> | { id: string };
}

const NoteDetailsPage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;
