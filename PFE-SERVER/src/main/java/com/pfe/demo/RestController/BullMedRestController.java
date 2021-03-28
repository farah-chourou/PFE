package com.pfe.demo.RestController;

import com.pfe.demo.DAO.NotificationRepository;
import com.pfe.demo.DAO.SuivisBullMedRepository;
import com.pfe.demo.DAO.SuivisBullRepository;
import com.pfe.demo.DAO.UserRepository;
import com.pfe.demo.Entities.Notification;
import com.pfe.demo.Entities.SuivisBull;
import com.pfe.demo.Entities.SuivisBullMed;
import com.pfe.demo.Entities.User;
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
   /* User recepteur = userRepo.findByUserName(username);
    List<SuivisBull> bull = suivisBullRepo.findByRecepteurAndEtat(recepteur, "en cours");*/
        List<SuivisBullMed>  bull = suivisBullMedRepo.findAll();
        return bull;
    }





}
