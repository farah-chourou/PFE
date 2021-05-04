package com.pfe.demo.Service;

import com.pfe.demo.DAO.*;
import com.pfe.demo.Entities.Notification;
import com.pfe.demo.Entities.SuivisBull;
import com.pfe.demo.Entities.SuivisBullMed;
import com.pfe.demo.Entities.User;
import com.pfe.demo.Exception.RessourceNotFoundException;
import com.pfe.demo.RestController.Util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class BullService {
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

    @Autowired
    private JavaMailSender emailSender;



    public void sendSimpleMessage(
         String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@baeldung.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }


    public SuivisBull ajouterBulletin(SuivisBull suivisBulletein,  Long id,  String recepteur){
        if(suivisBullRepo.findByNumBull(suivisBulletein.getNumBull()) != null){
            return null;
        }

        User recep= userRepo.findByUserName(recepteur);
        suivisBulletein.setRecepteur(recep);


        User exp= userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));
        // expediteur.addS(suivisBulletein);
        suivisBulletein.setExpediteur(exp);

        suivisBulletein.setDate(LocalDate.now());
        suivisBulletein.setEtape(1);
        suivisBulletein.setEtat("En attente");

        SuivisBull bull = suivisBullRepo.save(suivisBulletein);

        Notification notif = new Notification();
        notif.setMessage("Vous avez un nouveau bulletin a valider ");
        notif.setDate(new Date());
        notif.setExpediteurNotif(exp);
        notif.setRecepteur(recepteur);
        notif.setEtat(false);
        notif.setVu(false);

        SuivisBull s = suivisBullRepo.findByNumBull(suivisBulletein.getNumBull());
        notif.setSuivisBull(s);

        notificationRepo.save(notif);
       /* String expediteur=exp.getUserName();
        sendSimpleMessage(recep.getEmail(),"Nouvelle notification (MUTUAL by CODWAY)","Bonjour, \nvous avez une nouvelle notification de la part " + expediteur + " . \nBien recu a vous.");*/
       return bull;

    }


    public  User getPerfermantValid(){
        LocalDate aujourdhui = LocalDate.now();

        LocalDate startOfWeek =  aujourdhui.with(DayOfWeek.MONDAY);
        LocalDate endOfWeek =  aujourdhui.with(DayOfWeek.SUNDAY);

        List<SuivisBull> p = new ArrayList<SuivisBull>();
        List<SuivisBull> s =new ArrayList<SuivisBull>();
        List<SuivisBull> totale =new ArrayList<SuivisBull>();

        List<User> validateur = userRepo.findByRole("validateur");
        for (User l : validateur) {
            List <SuivisBullMed> bullEtape4= suivisBullMedRepo.findAllByRecepteurAndEtape(l.getUserName(),4);
            List <SuivisBull> bullTotale= suivisBullRepo.findByExpediteur(l);

            for(SuivisBull bullValid:bullTotale){
                if(bullValid.getDate().isAfter(startOfWeek.minusDays(1))==true && bullValid.getDate().isBefore(endOfWeek.plusDays(1))==true) {
                    s.add(bullValid);
                } }

            float sSize =s.size();
            float totaleSize = totale.size();

            System.out.println(startOfWeek.minusDays(1));
            System.out.println(endOfWeek.plusDays(1));


            if(s.size()> p.size()){
                p.clear();
                for(SuivisBull bullV:s){
                    p.add(bullV);
                }
                s.clear();} }
        return p.get(0).getExpediteur();
    }

}
