/**
 * True if Firebase has a saved login in this browser (it stores it in localStorage
 * under `firebase:authUser:<apiKey>:[DEFAULT]`). Read synchronously at startup so
 * a returning user can skip the landing page while Firebase re-validates the session
 * over the network. It's only a hint: RequireAuth still waits for the real auth state.
 */
export function hasPersistedSession(): boolean {
  try {
    return Object.keys(window.localStorage).some((key) => key.startsWith('firebase:authUser:'));
  } catch {
    return false;
  }
}
