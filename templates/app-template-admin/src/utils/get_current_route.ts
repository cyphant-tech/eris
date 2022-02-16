export default function getCurrentRoute(appId: string) {
  const reg = new RegExp(`/app/${appId}(/(\w*))?`);
  let currentRoute = location.pathname.replace(reg, '$1');

  if (currentRoute.endsWith('/')) {
    currentRoute = currentRoute.substring(0, currentRoute.length - 1);
  }

  let splitedRoute = currentRoute.split('/');

  if (splitedRoute.length >= 2) {
    splitedRoute = splitedRoute.filter(item => item !== '').map(item => `/${item}`);
  } else {
    splitedRoute = ['/'];
  }

  return { original: currentRoute, splited: splitedRoute };
}
