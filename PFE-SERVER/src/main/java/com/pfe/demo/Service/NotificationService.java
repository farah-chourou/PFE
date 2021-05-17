package com.pfe.demo.Service;

import com.pfe.demo.DAO.*;
import com.pfe.demo.Entities.Notification;
import com.pfe.demo.Entities.SuivisBullMed;
import com.pfe.demo.Entities.User;
import com.pfe.demo.Security.AES256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class NotificationService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    SuivisBullMedRepository suivisBullMedRepo;

    @Autowired
    SuivisBullRepository suivisBullRepo;

    @Autowired
    NotificationRepository notificationRepo;

    @Autowired
    AvisRepository avisRepository;


    public void Rappel(User user) {

        User loginUser = userRepo.findByUserNameAndPassword(user.getUserName(), AES256.encrypt(user.getPassword()));

        LocalDate aujourdhui = LocalDate.now();
        LocalDate daysAgo = LocalDate.now().minusDays(1);
        List<SuivisBullMed> bull = suivisBullMedRepo.findAllByRecepteurAndEtape(loginUser.getUserName(), 2);


        for (SuivisBullMed bullMed : bull) {
            if (bullMed.getDate().isAfter(daysAgo) == false && bullMed.getDate().isBefore(aujourdhui) == true) {
                List<Notification> rappel = notificationRepo.findAllByRecepteurAndSuivisBullMed(loginUser.getUserName(), bullMed);
                Notification notif = new Notification();

                if (rappel == null) {
                    notif.setMessage("Rappel: vous avez un ancien bulletin a traiter");
                    notif.setDate(new Date());
                    notif.setRecepteur(loginUser.getUserName());
                    notif.setEtat(false);
                    notif.setVu(false);
                    notif.setSuivisBullMed(bullMed);
                    notificationRepo.save(notif);
                } else {
                    notif.setMessage("Rappel: vous avez un ancien bulletin a traiter");
                    notif.setDate(new Date());
                    notif.setRecepteur(loginUser.getUserName());
                    notif.setEtat(false);
                    notif.setVu(false);
                    notif.setSuivisBullMed(bullMed);
                    notificationRepo.save(notif);
                    for (Notification r : rappel) {
                    notificationRepo.deleteById(r.getId());}

                }
            }
        }
    }





}


