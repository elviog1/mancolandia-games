import HomeIcon from '@mui/icons-material/Home';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import GroupIcon from '@mui/icons-material/Group';
import { BookmarksOutlined, FavoriteBorder } from '@mui/icons-material';
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
    icon: <BookmarksOutlined sx={{ color: "white", fontSize: "26px" }} />,
    route: "/saved-posts",
    label: "Saved Posts",
  },
  {
    icon: <FavoriteBorder sx={{ color: "white", fontSize: "26px" }} />,
    route: "/liked-posts",
    label: "Liked Posts",
  },
];

export const pageTitles = [
  {
    title:'Home',
    url:'/'
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
  {
    title:'People',
    url:'/people'
  },
  {
    title:'Saved Posts',
    url:'/saved-posts'
  },
  {
    title:'Liked Posts',
    url:'/liked-posts'
  },
]

export const gamesOptions = [
  "League of Legends",
  "World of Warcraft",
  "Dota",
  "Mu Online",
  "Counter Strike",
  "Rocket League",
  "Diablo",
  "Call of Duty",
  "Other",
];

export const tabs = [
  {
    link:"posts",
    name:"Posts"
  },
  {
    link:"followers",
    name:"Followers"
  },
  {
    link:"following",
    name:"Following"
  },
]