import { AppConfig } from './app';
import Home from '@/pages/Home.vue';
import Ordering from '@/pages/Ordering/Ordering.vue';
import Booking from '@/pages/Booking.vue';

const appConfig: AppConfig = {
  appId: '<%= appId %>',
  appName: '<%= appName %>',
  logo: 'http://si1.go2yd.com/get-image/0ZAJxXeZ6iu',
  menuItems: [
    {
      path: '/',
      name: '首页',
      component: Home,
      icon: 'home',
    },
    {
      path: '/booking',
      name: '预订服务',
      component: Booking,
      icon: 'account-book',
    },
    {
      name: '立即下单',
      icon: 'check-circle',
      subMenu: [
        {
          path: '/ordering/chinese-cuisine',
          name: '中华小吃',
          component: Ordering,
          icon: 'red-envelope',
        },
      ],
    },
  ],
  miscellaneous: {
    // 配置当用户头像不存在时使用的fallback头像图URL
    defaultAvatar: '//s.go2yd.com/a/thead_meiguoduizhang.png',
  },
};

export default appConfig;
