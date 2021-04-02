
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import AllBull from "views/Responsable/AllBull.js";
import UsersList from "views/Responsable/UsersList.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import AddBulletin from "views/AddBulletin.js";
import BulletinNotif from "views/BulletinNotif";
import BullMed from "views/Medecin/BullMed";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/user",
    role: "responsable"
  },
  /*{
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/user",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/user",
  },*/

  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/user",
  },
  {
    path: "/tables",
    name: "users List",
    icon: "nc-icon nc-tile-56",
    component: UsersList,
    layout: "/user",
    role:"responsable"

  },
  {
    path: "/bulletin",
    name: " Bulletin ",
    icon: "nc-icon nc-caps-small",
    component: AllBull,
    layout: "/user",
    role:"responsable"

  },
  {
    path: "/bulletinMedecin",
    name: " Bulletin recu",
    icon: "nc-icon nc-caps-small",
    component: BullMed,
    layout: "/user",
    role:"medecin"

  },

  {
    path: "/AddBulletin",
    name: "Add bulletin",
    icon: "nc-icon nc-spaceship",
    component: AddBulletin,
    layout: "/user",
    role:"validateur",

  },
  {
    path: "/soloBulletin:id",
    name: "bulletin",
    icon: "nc-icon nc-spaceship",
    component: BulletinNotif,
    layout: "/user",
    invisible: true,

  },
  {
    path: "/historiqueBull",
    name: "historique",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/user",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/user",
  },

 /* {
    
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: "/user",
  },*/


];
export default routes;
