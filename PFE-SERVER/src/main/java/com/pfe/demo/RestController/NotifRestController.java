package com.pfe.demo.RestController;

import com.pfe.demo.DAO.NotificationRepository;
import com.pfe.demo.DAO.SuivisBullMedRepository;
import com.pfe.demo.DAO.SuivisBullRepository;
import com.pfe.demo.DAO.UserRepository;
import com.pfe.demo.Entities.Notification;
import com.pfe.demo.Entities.SuivisBull;
import com.pfe.demo.Entities.User;
import com.pfe.demo.Exception.RessourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class NotifRestController {

    @Autowired
    UserRepository userRepo;

    @Autowired
    SuivisBullMedRepository suivisBullMedRepo;

    @Autowired
    SuivisBullRepository suivisBullRepo;

    @Autowired
    NotificationRepository notificationRepo;




    @GetMapping("/getNotif")
    public List<Notification> getAllNotif(){
        List<Notification> notifs = notificationRepo.findAllByOrderById();
        return notifs;
    }

    @GetMapping("/getUserNotif/{userName}")
    public List<Notification> getNotif(@PathVariable String userName){
       List<Notification> notifss = notificationRepo.findByRecepteurAndEtat(userName, false);
        return notifss;
    }

    @GetMapping("/getNotif/{id}")
    public Notification getNotifById(@PathVariable Long id){
        Notification notif = notificationRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));
        return notif;
    }

    @PutMapping("/updateNotif/{id}")
    public Notification updateNotif(@PathVariable Long id){
     Optional<Notification> notif = notificationRepo.findById(id);

     Notification n=notif.get();
     n.setEtat(true);
     notificationRepo.save(n);

     return n;
    }

    @PutMapping("/updateVuNotif/{id}")
    public Notification updateVuNotif(@PathVariable Long id){
        Optional<Notification> notif = notificationRepo.findById(id);

        Notification n=notif.get();
        n.setVu(true);
        notificationRepo.save(n);

        return n;
    }

    @GetMapping("/getBullFromNotif/{id}")
    public SuivisBull getBull(@PathVariable Long id ){
        Notification notif = notificationRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));
        return  notif.getSuivisBull();
    }
/*
    @GetMapping("/getBullMedFromNotif/{id}")
    public SuivisBull getBullMed (@PathVariable Long id ){
        Optional<Notification> notif = notificationRepo.findById(id);
        Notification n=notif.get();
        return  n.getSuivisBullMed();
    }*/


    @GetMapping("/getBullfromNotif/{userName}") // lil afichage mta3 suivis bull Med lil validateur
    public List<Notification> getUserNotif(@PathVariable String userName){
        List<Notification> notifss = notificationRepo.findByRecepteur(userName);
        return notifss;
    }


    @GetMapping("/getNotifByExpediteur/{userName}") // historique admin
    public List<Notification> getBullFromNotif(@PathVariable String userName){
        User expediteur = userRepo.findByUserName(userName);

        List<Notification> notifs = notificationRepo.findByExpediteurNotif(expediteur);
        return notifs;
    }

}
