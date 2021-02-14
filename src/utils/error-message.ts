import { AxiosError } from 'axios';

export default function determineErrorMessage(error: Error) {
  const res = (error as AxiosError).response;
  const message = res
    ? res.data.error
    : 'An unexpected application error occurred';

  return message;
}
