import { getUnknownErrorMessage } from '@shared/lib/errors/getUnknownErrorMessage';

export function getAdminLoadError(errors: unknown[]) {
  for (const error of errors) {
    const message = getUnknownErrorMessage(error, '');

    if (message) {
      return message;
    }
  }

  return '';
}
