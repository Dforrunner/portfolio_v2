import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

export const NavLinks = [
  {
    section: 'Home',
    icon: <HomeIcon fontSize='medium' />,
  },
  {
    section: 'About',
    icon: <PersonIcon fontSize='medium' />,
  },
  {
    section: 'Skills',
    icon: <HomeRepairServiceIcon fontSize='medium' />,
  },
  // {
  //   section: 'Services',
  //   icon: <RoomServiceIcon fontSize='medium' />,
  // },
  // {
  //   section: 'Portfolio',
  //   icon: <BusinessCenterIcon fontSize='medium' />,
  // },
  {
    section: 'Contact',
    icon: <EmailIcon fontSize='medium' />,
  },
];
