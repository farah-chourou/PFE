package com.pfe.demo.Service;

import com.pfe.demo.DAO.*;
import com.pfe.demo.Entities.*;
import com.pfe.demo.RestController.Util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;
import java.lang.reflect.Array;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Stack;

@Service
@Transactional
public class BullMedService {

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
    MailService mailService;

    public SuivisBullMed ajouterBullMed(int numBull,  String specialiteMed , String userName){

        if(suivisBullMedRepo.findByNumBull(numBull) !=null) {
            return  null;
        }

        SuivisBullMed bullMed =new SuivisBullMed();

        User recep = userRepo.findBySpecialite(specialiteMed);
        User exped = userRepo.findByUserName(userName);

        bullMed.setExpediteur(exped);
        bullMed.setRecepteur(recep.getUserName());
        bullMed.setSpecialiteMed(specialiteMed);
        bullMed.setNumBull(numBull);
        bullMed.setDate(LocalDate.now());
        bullMed.setEtape(2);
        bullMed.setEtat("En attente");

        SuivisBullMed bull =  suivisBullMedRepo.save(bullMed);

        Notification notif = new Notification();

        SuivisBullMed su = suivisBullMedRepo.findByNumBull(numBull);

        notif.setMessage("Vous avez un nouveau bulletin a traiter");
        notif.setDate(new Date());
        notif.setExpediteurNotif(exped);
        notif.setRecepteur(recep.getUserName());
        notif.setEtat(false);
        notif.setVu(false);
        notif.setSuivisBullMed(su);

        notificationRepo.save(notif);
         /* String expediteur=exped.getUserName();
        mailService.sendSimpleMessage(recep.getEmail(),"Nouvelle notification (MUTUAL by CODWAY)","Bonjour, \nvous avez une nouvelle notification de la part " + expediteur + " . \nBien recu a vous.");*/

       return bull;
    }


    public SuivisBullMed ajouterAvis(int numBull ,  String avis, SuivisBullMed bullMed){
        SuivisBullMed bull = suivisBullMedRepo.findByNumBull(numBull);
        Avis a = avisRepository.findByAvis(avis);
        bull.setAvis(a);
        bull.setCommentaireMed(bullMed.getCommentaireMed());
        bull.setEtape(3);
        bull.setEtat(a.getAvis());
        bull.setDate(LocalDate.now());
        bull.setDateEtape3(LocalDate.now());
        suivisBullMedRepo.save(bull);

        User expediteur = userRepo.findByUserName(bull.getRecepteur());
        String recepteur = bull.getExpediteur().getUserName();

        Notification notif = new Notification();
        notif.setMessage("Bulletin numero " + numBull +" est traité");
        notif.setDate(new Date());
        notif.setExpediteurNotif(expediteur);
        notif.setRecepteur(recepteur);
        notif.setEtat(false);
        notif.setVu(false);
        notif.setSuivisBullMed(bull);

        notificationRepo.save(notif);
          /* String expediteur=expediteur.getUserName();
        mailService.sendSimpleMessage(bull.getExpediteur().getEmail(),"Nouvelle notification (MUTUAL by CODWAY)","Bonjour, \nvous avez une nouvelle notification de la part " + expediteur + " . \nBien recu a vous.");*/
      return bull;
    }


    public SuivisBullMed ajouterAutreAvis(int numBull ,  String avis, String autreAvis,SuivisBullMed bullMed){
        SuivisBullMed bull = suivisBullMedRepo.findByNumBull(numBull);
        Avis a = new Avis();
        a.setAvis(autreAvis);
        avisRepository.save(a);
        bull.setAvis(a);
        bull.setCommentaireMed(bullMed.getCommentaireMed());
        bull.setEtape(3);
        bull.setEtat(a.getAvis());
        bull.setDate(LocalDate.now());
        suivisBullMedRepo.save(bull);
        User expediteur = userRepo.findByUserName(bull.getRecepteur());
        String recepteur = bull.getExpediteur().getUserName();
        Notification notif = new Notification();
        notif.setMessage("Bulletin numero " + numBull +" est traité");
        notif.setDate(new Date());
        notif.setExpediteurNotif(expediteur);
        notif.setRecepteur(recepteur);
        notif.setEtat(false);
        notif.setVu(false);
        notif.setSuivisBullMed(bull);
        notificationRepo.save(notif);
         /* String expediteur=expediteur.getUserName();
        mailService.sendSimpleMessage(bull.getExpediteur().getEmail(),"Nouvelle notification (MUTUAL by CODWAY)","Bonjour, \nvous avez une nouvelle notification de la part " + expediteur + " . \nBien recu a vous.");*/
        return bull;
    }


    public SuivisBullMed envoyer (int numBull){
        SuivisBullMed bull = suivisBullMedRepo.findByNumBull(numBull);
        bull.setEtape(4);
        suivisBullMedRepo.save(bull);
        SuivisBull bullValid = suivisBullRepo.findByNumBull(numBull);
        Notification notif = new Notification();
        notif.setMessage("Bulletin numero "+numBull+" est traité");
        notif.setDate(new Date());
        notif.setExpediteurNotif(bull.getExpediteur());
        notif.setRecepteur(bullValid.getExpediteur().getUserName());
        notif.setEtat(false);
        notif.setVu(false);
        notif.setSuivisBullMed(bull);
        notificationRepo.save(notif);
         /* String expediteur=expediteur.getUserName();
        mailService.sendSimpleMessage(bullValid.getExpediteur().getEmail(),"Nouvelle notification (MUTUAL by CODWAY)","Bonjour, \nvous avez une nouvelle notification de la part " + expediteur + " . \nBien recu a vous.");*/
        return bull;
    }


    public User getPerfermantMedecin(){
        LocalDate aujourdhui = LocalDate.now();

        LocalDate startOfWeek =  aujourdhui.with(DayOfWeek.MONDAY);
        LocalDate endOfWeek =  aujourdhui.with(DayOfWeek.SUNDAY);

        List<SuivisBullMed> p = new ArrayList<SuivisBullMed>();
        List<SuivisBullMed> s =new ArrayList<SuivisBullMed>();
        List<SuivisBullMed> totale =new ArrayList<SuivisBullMed>();

        List<User> medecin = userRepo.findByRole("medecin");
        float lastPerfermant = 0;
        for (User l : medecin) {
            List <SuivisBullMed> bullEtape4= suivisBullMedRepo.findAllByRecepteurAndEtape(l.getUserName(),4);
            List <SuivisBullMed> bullEtape3= suivisBullMedRepo.findAllByRecepteurAndEtape(l.getUserName(),3);
            List <SuivisBullMed> bullTotale= suivisBullMedRepo.findAllByRecepteur(l.getUserName());

            for(SuivisBullMed bullMed:bullEtape4){
                if(bullMed.getDateEtape3().isAfter(startOfWeek.minusDays(1))==true && bullMed.getDateEtape3().isBefore(endOfWeek.plusDays(1))==true) {
                    s.add(bullMed);
                }

            }
            for(SuivisBullMed bullMed:bullEtape3){
                if(bullMed.getDateEtape3().isAfter(startOfWeek.minusDays(1))==true && bullMed.getDateEtape3().isBefore(endOfWeek.plusDays(1))==true) {
                    s.add(bullMed);
                } }
            for(SuivisBullMed bullMed:bullTotale){
                if(bullMed.getDate().isAfter(startOfWeek.minusDays(1))==true && bullMed.getDate().isBefore(endOfWeek.plusDays(1))==true) {
                    totale.add(bullMed);
                } }
            System.out.println(s.size());
            System.out.println(totale.size());
            float sSize =s.size();
            float totaleSize = totale.size();

            System.out.println(startOfWeek.minusDays(1));
            System.out.println(endOfWeek.plusDays(1));


            if(sSize/totaleSize >lastPerfermant){
                p.clear();
                for(SuivisBullMed bullMedd:s){
                    p.add(bullMedd);

                }
                float pSize= p.size();

                lastPerfermant=(pSize/totaleSize);
                s.clear();} }
            User perfermant = userRepo.findByUserName(p.get(0).getRecepteur() );

        return perfermant;
    }





    public User getPerfermantValidateur(){
        LocalDate aujourdhui = LocalDate.now();
        LocalDate startOfWeek =  aujourdhui.with(DayOfWeek.MONDAY);
        LocalDate endOfWeek =  aujourdhui.with(DayOfWeek.SUNDAY);

        List<SuivisBullMed> p = new ArrayList<SuivisBullMed>();
        List<SuivisBullMed> s =new ArrayList<SuivisBullMed>();

        List<User> validateur = userRepo.findByRole("medecin");

        for (User l : validateur) {
            List <SuivisBullMed> bul= suivisBullMedRepo.findAllByRecepteurAndEtape(l.getUserName(),4);
            for(SuivisBullMed bullMed:bul){
                if(bullMed.getDate().isAfter(startOfWeek.minusDays(1))==true && bullMed.getDate().isBefore(endOfWeek.plusDays(1))==true) {
                    s.add(bullMed);
                } }

            if(s.size()> p.size()){
                p.clear();
                for(SuivisBullMed bullMedd:s){
                    p.add(bullMedd);
                }
                s.clear();} }
        User perfermant = userRepo.findByUserName(p.get(0).getRecepteur() );
        return perfermant;
    }



}
