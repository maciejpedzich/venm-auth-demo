import UserPayload from '../payloads/user';

export default interface AuthModuleState {
  access_token: string | null;
  current_user: UserPayload | null;
  next_refresh_timestamp: number | null;
  refresh_timeout_id: number | null;
}
