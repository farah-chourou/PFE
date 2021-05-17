
import Dashboard from "views/Responsable/Dashbord/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import AllBull from "views/Responsable/AllBull.js";
import UsersList from "views/Responsable/UsersList.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import BulletinNotif from "views/BulletinNotif";
import BullMed from "views/Medecin/BullMed";
import BullValid from "views/Validateur/BullValid";
import HistoriqueValid from "views/Validateur/HistoriqueValid"
import HistoriqueResp from "views/Responsable/HistoriqueResp"
import HistoriqueMed from "views/Medecin/HistoriqueMed"

var routes = [
  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/user",
    role: "responsable",
    dropdown :false

  },/*
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/user",
    
  },*//*
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/user",
  },*/

  {
    path: "/user-page",
    name: "profile utilisateur",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/user",
    dropdown :false

  },
  {
    path: "/ListesUtilisateurs",
    name: "liste des utlisateurs",
    icon: "nc-icon nc-tile-56",
    component: UsersList,
    layout: "/user",
    role:"responsable",
    dropdown :false


  },
  {
    path: "/bulletin",
    name: " Bulletin récu ",
    icon: "nc-icon nc-single-copy-04",
    component: AllBull,
    layout: "/user",
    role:"responsable",
    dropdown :true

  },
  {
    path: "/bulletinMedecin",
    name: " Bulletin récu",
    icon: "nc-icon nc-single-copy-04",
    component: BullMed,
    layout: "/user",
    role:"medecin",
    dropdown :false


  },

  {
    path: "/bulletinValidateur",
    name: " Bulletin récu",
    icon: "nc-icon nc-single-copy-04",
    component: BullValid,
    layout: "/user",
    role:"validateur",
    dropdown :false

  },
 
  {
    path: "/DétailsNotification/:id",
    name: "bulletin",
    icon: "nc-icon nc-spaceship",
    component: BulletinNotif,
    layout: "/user",
    invisible: true,

  },
  {
    path: "/historiqueBull",
    name: "historique",
    icon: "nc-icon nc-bullet-list-67",
    component: HistoriqueValid,
    layout: "/user",
    role:"validateur",
    dropdown :false

  },
  {
    path: "/historiqueBullMed",
    name: "historique",
    icon: "nc-icon  nc-bullet-list-67",
    component: HistoriqueMed,
    layout: "/user",
    role:"medecin",

  },
  {
    path: "/historiqueBulle",
    name: "historique",
    icon: "nc-icon nc-bullet-list-67",
    component: HistoriqueResp,
    layout: "/user",
    role:"responsable",
    dropdown :false

  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/user",
    dropdown :false

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
