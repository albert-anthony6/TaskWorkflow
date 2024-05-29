import { useState } from 'react';
import { AnyAction, Dispatch } from 'redux';

export function usePagination(
  dispatch: Dispatch<AnyAction>,
  action: (params: any) => any,
  userId: string | null = null,
  searchTerm = ''
) {
  const [isLoadingPagination, setIsLoadingPagination] = useState(false);

  function handlePageClick(selectedPage: number, isMyProjects = false) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLoadingPagination(true);
    dispatch(
      action({
        pagingParams: { pageNumber: selectedPage, pageSize: 12 },
        userId,
        searchTerm,
        filterProjects: isMyProjects
      })
    ).finally(() => {
      setIsLoadingPagination(false);
    });
  }

  return { handlePageClick, isLoadingPagination };
}
