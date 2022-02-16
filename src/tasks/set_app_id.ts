import localStorage from '@/internal/localstorage';

export async function setDefaultAppId(appId: string) {
  return localStorage.setItem('default_app_id', appId);
}

export async function getDefaultAppId() {
  return localStorage.getItem('default_app_id');
}
