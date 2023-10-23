import AuthGuard from 'components/authentication/AuthGuard';
import GuestGuard from 'components/authentication/GuestGuard';
import DashboardLayout from 'components/Layouts/DashboardLayout';
import LoadingScreen from 'components/LoadingScreen';
import { FC, lazy, LazyExoticComponent, Suspense } from 'react';

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// authentication pages
const Login = Loadable(lazy(() => import('./pages/authentication/Login')));
// const Register = Loadable(lazy(() => import('./pages/authentication/Register')));

// const ForgetPassword = Loadable(lazy(() => import('./pages/authentication/ForgetPassword')));

// Dashboard pages
const Dashboard = Loadable(lazy(() => import('./pages/dashboards')));

// user
const UserProfile = Loadable(lazy(() => import('./pages/UserProfile')));
const CreateArtist = Loadable(lazy(() => import('./pages/createAccout')));
const UpdatePassword = Loadable(lazy(() => import('./pages/updatePassword')));
const ResetPassword = Loadable(lazy(() => import('./pages/resetPassword')));
const ForgotPassword = Loadable(lazy(() => import('./pages/authentication/ForgetPassword')));
// user management
const UserList = Loadable(lazy(() => import('./pages/userManagement')));
const UserDetail = Loadable(lazy(() => import('./pages/userDetail')));
const AdminList = Loadable(lazy(() => import('./pages/adminManagement')));
const DetailAdmin = Loadable(lazy(() => import('./pages/adminDetail')));
const ArtistList = Loadable(lazy(() => import('./pages/artistManagement')));
const NFTList = Loadable(lazy(() => import('./pages/nftManagement')));
const MyNFT = Loadable(lazy(() => import('./pages/myNFTManagement')));
const NFTDetail = Loadable(lazy(() => import('./pages/nftDetail')));
const Royal = Loadable(lazy(() => import('./pages/userRoyal')));

//collection management
const CreateCollection = Loadable(lazy(() => import('./pages/createCollection')));
const CollectionDetail = Loadable(lazy(() => import('./pages/collectionDetail')));
const CollectionList = Loadable(lazy(() => import('./pages/collectionManagement')));
const CollectionEdit = Loadable(lazy(() => import('./pages/editCollection')));
const CollectionDraft = Loadable(lazy(() => import('./pages/draftNFT')));

// error
const Error = Loadable(lazy(() => import('./pages/404')));

//settings
const Settings = Loadable(lazy(() => import('./pages/royaltySettings')));

// routes
const routes = [
  // {
  //   path: '/',
  //   element: <Navigate to="dashboard" />,
  // },
  {
    path: 'login',
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  // {
  //   path: 'register',
  //   element: (
  //     <GuestGuard>
  //       <Register />
  //     </GuestGuard>
  //   ),
  // },
  {
    path: 'forget-password',
    element: (
      <GuestGuard>
        <ForgotPassword />
      </GuestGuard>
    ),
  },
  {
    path: 'reset-password',
    element: (
      <GuestGuard>
        <ResetPassword />
      </GuestGuard>
    ),
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'user-profile',
        element: <UserProfile />,
      },
      {
        path: 'admin-list',
        element: <AdminList />,
      },
      {
        path: 'artist-list',
        element: <ArtistList />,
      },
      {
        path: 'user-list',
        element: <UserList />,
      },
      {
        path: 'nft-list',
        element: <NFTList />,
      },
      {
        path: 'my-nft-list',
        element: <MyNFT />,
      },
      {
        path: 'create/artist',
        element: <CreateArtist />,
      },
      {
        path: 'update-password',
        element: <UpdatePassword />,
      },
      {
        path: 'collection-list',
        element: <CollectionList />,
      },
    ],
  },
  {
    path: 'account',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'create',
        element: <CreateArtist />,
      },
    ],
  },
  {
    path: 'admin',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'detail/:id',
        element: <DetailAdmin />,
      },
    ],
  },
  {
    path: 'artist',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'detail/:id',
        element: <DetailAdmin />,
      },
    ],
  },
  {
    path: 'user',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'detail/:id',
        element: <UserDetail />,
      },
      {
        path: 'royal',
        element: <Royal />,
      },
    ],
  },
  {
    path: 'nft',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'detail/:id',
        element: <NFTDetail />,
      },
    ],
  },
  {
    path: 'settings',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Settings />,
      },
    ],
  },
  {
    path: 'collection',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'create',
        element: <CreateCollection />,
      },
      {
        path: 'edit/:id',
        element: <CollectionEdit />,
      },
      // {
      //   path: 'edit/layer/:id',
      //   element: <CollectionLayerEdit />,
      // },
      {
        path: 'detail/:id',
        element: <CollectionDetail />,
      },
      {
        path: 'draft/:id',
        element: <CollectionDraft />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
  {
    path: '*',
    element: <Error />,
  },
];

export default routes;

export enum routesEnum {
  login = '/login',
  createAccout = '/account/create',
  adminManagement = 'admin/list',
  collectionDetail = 'collection/detail',
  adminDetail = 'admin/detail',
  artistDetail = 'artist/detail',
  userDetail = 'user/detail',
  nftDetail = 'nft/detail',
}
