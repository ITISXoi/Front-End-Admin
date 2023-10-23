import Icons from 'icons/sidebar';

export const adminRoutes = [
  {
    title: 'Dashboard',
    Icon: Icons.DashboardIcon,
    path: '',
  },
  {
    title: 'Admin List',
    Icon: Icons.AdminPanelSettingsIcon,
    path: '/admin-list',
  },
  {
    title: 'Arist List',
    Icon: Icons.UserManagementIcon,
    path: '/artist-list',
  },
  {
    title: 'User List',
    Icon: Icons.PeopleRoundedIcon,
    path: '/user-list',
  },
  {
    title: 'Create Account',
    Icon: Icons.AccountCircle,
    path: '/account/create',
  },
  {
    title: 'List Collection',
    Icon: Icons.CollectionsIcon,
    path: '/collection-list',
  },
  {
    title: 'List NFT',
    Icon: Icons.FaceRetouchingNaturalIcon,
    path: '/nft-list',
  },
  {
    title: 'Royal Settings',
    Icon: Icons.SettingsIcon,
    path: '/settings',
  },
];

export const artistRoutes = [
  {
    title: 'Dashboard',
    Icon: Icons.DashboardIcon,
    path: '',
  },
  {
    title: 'List Collection',
    Icon: Icons.CollectionsIcon,
    path: '/collection-list',
  },
  {
    title: 'My NFT',
    Icon: Icons.FaceRetouchingNaturalIcon,
    path: '/my-nft-list',
  },
  {
    title: 'Premium',
    Icon: Icons.SettingsIcon,
    path: '/user/royal',
  },
];
