import HomeIcon from '@mui/icons-material/Home';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
export const sidebarLinks = [
  {
    icon: <HomeIcon sx={{ color: "white", fontSize: "26px" }} />,
    route: "/",
    label: "Home",
  },
  {
    icon: (
      <AddPhotoAlternateIcon sx={{ color: "white", fontSize: "26px" }} />
    ),
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: <GroupIcon sx={{ color: "white", fontSize: "26px" }} />,
    route: "/people",
    label: "People",
  },
  {
    icon: <ManageAccountsIcon sx={{ color: "white", fontSize: "26px" }} />,
    route: "/edit-profile",
    label: "Edit Profile",
  },
];

export const pageTitles = [
  {
    title:'Home',
    url:'/'
  },
  {
    title:'Edit Profile',
    url:'/edit-profile'
  },
  {
    title:'Create Post',
    url:'/create-post'
  },
  {
    title:'Edit Post',
    url:'/edit-post'
  },
  {
    title:'Search',
    url:'/search'
  },
]
