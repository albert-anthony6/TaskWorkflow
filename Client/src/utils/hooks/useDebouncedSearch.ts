import { useEffect, useState } from 'react';
import { AnyAction, Dispatch } from 'redux';

export function useDebouncedSearch(
  searchTerm: string,
  dispatch: Dispatch<AnyAction>,
  action: (params: any) => any,
  userId: string | null = null,
  filterProjects = false
) {
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        setIsLoadingSearch(true);
        dispatch(
          action({
            searchTerm,
            userId,
            pagingParams: { pageNumber: 1, pageSize: 12 },
            filterProjects
          })
        ).finally(() => {
          setIsLoadingSearch(false);
        });
      },
      searchTerm ? 500 : 0
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch, action, userId, filterProjects]);

  return isLoadingSearch;
}
