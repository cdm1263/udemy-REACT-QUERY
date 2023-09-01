import { createStandaloneToast } from '@chakra-ui/react';
import { QueryCache, QueryClient } from 'react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient({
  // defaultOptions를 사용하지 않는 이유는 42번 강의문서 참고
  // defaultOptions: {
  //   queries: {
  //     onError: queryErrorHandler,
  //   },
  // },
  queryCache: new QueryCache({
    onError: queryErrorHandler,
  }),
});
