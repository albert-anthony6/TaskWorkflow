import { useEffect, useState } from 'react';
import { AnyAction, Dispatch } from 'redux';

export function useDebouncedSearch(
  searchTerm: string,
  dispatch: Dispatch<AnyAction>,
  action: (args: any) => any,
  userId: string | null = null,
  filterProjects = false,
  helperFunction?: (arg: any) => void
) {
  const [isLoadingSearch, setIsLoadingSearch] = useState(true);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        setIsLoadingSearch(true);
        dispatch(
          action({
            searchTerm,
            id: userId,
            pagingParams: { pageNumber: 1, pageSize: 12 },
            filterProjects
          })
        )
          .then((resp: any) => {
            helperFunction?.(resp);
          })
          .finally(() => {
            setIsLoadingSearch(false);
          });
      },
      searchTerm ? 500 : 0
    );

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch, action, userId, filterProjects, helperFunction]);

  return isLoadingSearch;
}
