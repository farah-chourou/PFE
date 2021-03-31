package com.pfe.demo.RestController;

import com.pfe.demo.DAO.*;
import com.pfe.demo.Entities.*;
import com.pfe.demo.Exception.RessourceNotFoundException;
import com.pfe.demo.RestController.Util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class BullMedRestController {


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


  @PostMapping("/addBullMed/{numBull}/{specialiteMed}/{userName}")
    public ResponseEntity<SuivisBullMed> addBullMed( @PathVariable int numBull, @PathVariable String specialiteMed , @PathVariable String userName){

        if(suivisBullMedRepo.findByNumBull(numBull) !=null) {
            return  new ResponseEntity(new ApiResponse(false, "Bull already exist !"),
                    HttpStatus.ALREADY_REPORTED);
        }

        SuivisBullMed bullMed =new SuivisBullMed();

        User recep = userRepo.findBySpecialite(specialiteMed);
        User exped = userRepo.findByUserName(userName);

        bullMed.setExpediteur(exped);
        bullMed.setRecepteur(recep.getUserName());
        bullMed.setSpecialiteMed(specialiteMed);
        bullMed.setNumBull(numBull);
        bullMed.setDate(new Date());
        bullMed.setEtape(2);
        bullMed.setEtat("en cours");

        SuivisBullMed bull =  suivisBullMedRepo.save(bullMed);

        Notification notif = new Notification();

        SuivisBullMed su = suivisBullMedRepo.findByNumBull(numBull);

        notif.setMessage("un nouveau msg du responsable");
        notif.setDate(new Date());
        notif.setExpediteurNotif(exped);
        notif.setRecepteur(recep.getUserName());
        notif.setEtat(false);
        notif.setVu(false);
        notif.setSuivisBullMed(su);

        notificationRepo.save(notif);



        return ResponseEntity.ok(bull);
    }


    @GetMapping("/getAllBullMed")
    public List<SuivisBullMed> getAlBull(){
        List<SuivisBullMed>  bull = suivisBullMedRepo.findAll();
        return bull;
    }

    @GetMapping("/getAllAvis")
    public List<Avis> getAllAvis(){
        List<Avis> avis = avisRepository.findAll();
        return avis;
    }

    @GetMapping("/getAllAvis/{numBull}")
    public SuivisBullMed getBullMed(@PathVariable int numBull){
        SuivisBullMed  bull = suivisBullMedRepo.findByNumBull(numBull);
        return bull;
    }



    @PutMapping("/ajouterAvis/{numBull}/{avis}")
    public SuivisBullMed addAvis( @PathVariable int numBull , @PathVariable String avis, @RequestBody SuivisBullMed bullMed){
        SuivisBullMed bull = suivisBullMedRepo.findByNumBull(numBull);
        Avis a = avisRepository.findByAvis(avis);
        bull.setAvis(a);
        bull.setCommentaireMed(bullMed.getCommentaireMed());
        bull.setEtape(3);
        bull.setEtat(a.getAvis());
        suivisBullMedRepo.save(bull);

        User expediteur = userRepo.findByUserName(bull.getRecepteur());
        String recepteur = bull.getExpediteur().getUserName();

        Notification notif = new Notification();
        notif.setMessage("un nouveau msg du medecin");
        notif.setDate(new Date());
        notif.setExpediteurNotif(expediteur);
        notif.setRecepteur(recepteur);
        notif.setEtat(false);
        notif.setVu(false);
        notif.setSuivisBullMed(bull);

        notificationRepo.save(notif);


        return bull;
    }


    @PutMapping("/ajouterAvis/{numBull}/{avis}/{autreAvis}")
    public SuivisBullMed addOtherAvis( @PathVariable int numBull , @PathVariable String avis, @PathVariable String autreAvis, @RequestBody SuivisBullMed bullMed){
        SuivisBullMed bull = suivisBullMedRepo.findByNumBull(numBull);
        Avis a = new Avis();
        a.setAvis(autreAvis);
        avisRepository.save(a);
        bull.setAvis(a);
        bull.setCommentaireMed(bullMed.getCommentaireMed());
        bull.setEtape(3);
        bull.setEtat(a.getAvis());
        suivisBullMedRepo.save(bull);


        User expediteur = userRepo.findByUserName(bull.getRecepteur());
        String recepteur = bull.getExpediteur().getUserName();

        Notification notif = new Notification();
        notif.setMessage("un nouveau msg du medecin");
        notif.setDate(new Date());
        notif.setExpediteurNotif(expediteur);
        notif.setRecepteur(recepteur);
        notif.setEtat(false);
        notif.setVu(false);
        notif.setSuivisBullMed(bull);

        notificationRepo.save(notif);

        return bull;
    }




}
