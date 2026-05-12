import { message } from 'antd';

import { getUnknownErrorMessage } from '@shared/lib/errors/getUnknownErrorMessage';

export function showMutationError(error: unknown, fallbackMessage: string) {
  void message.error(getUnknownErrorMessage(error, fallbackMessage));
}
