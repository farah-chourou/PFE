package com.pfe.demo.RestController;

import com.pfe.demo.DAO.NotificationRepository;
import com.pfe.demo.DAO.SuivisBullMedRepository;
import com.pfe.demo.DAO.SuivisBullRepository;
import com.pfe.demo.DAO.UserRepository;
import com.pfe.demo.Entities.Notification;
import com.pfe.demo.Entities.SuivisBull;
import com.pfe.demo.Entities.User;
import com.pfe.demo.Exception.RessourceNotFoundException;
import com.pfe.demo.RestController.Util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class BullRestController {

    @Autowired
    UserRepository userRepo;

    @Autowired
    SuivisBullMedRepository suivisBullMedRepo;

    @Autowired
    SuivisBullRepository suivisBullRepo;

    @Autowired
    NotificationRepository notificationRepo;

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
   @PostMapping("/addBull/{id}/{recepteur}")
    public ResponseEntity<SuivisBull> addBull(@RequestBody SuivisBull suivisBulletein, @PathVariable Long id, @PathVariable String recepteur){

      if(suivisBullRepo.findByNumBull(suivisBulletein.getNumBull()) != null){
          return  new ResponseEntity(new ApiResponse(false, "Bull already exist !"),
                  HttpStatus.ALREADY_REPORTED);
      }

        User recep= userRepo.findByUserName(recepteur);
        suivisBulletein.setRecepteur(recep);


        User exp= userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));
       // expediteur.addS(suivisBulletein);
        suivisBulletein.setExpediteur(exp);

        suivisBulletein.setDate(LocalDate.now());
        suivisBulletein.setEtape(1);
        suivisBulletein.setEtat("en cours");

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
        return ResponseEntity.ok(bull);
    }

    @GetMapping("/getAllBull")
    public List<SuivisBull> getAlBull(){

    List<SuivisBull>  bull = suivisBullRepo.findAll();
    return bull;
    }


    @GetMapping("/getAllBullEtape1")
    public List<SuivisBull> getAlBullEtape1(){

        List<SuivisBull>  bull = suivisBullRepo.findAllByEtape(1);
        return bull;
    }

    @GetMapping("/getAllBullEtape2")
    public List<SuivisBull> getAlBullEtape2(){

        List<SuivisBull>  bull = suivisBullRepo.findAllByEtape(2);
        return bull;
    }


    @GetMapping("/getAllBullUser/{id}")
    public List<SuivisBull> getAlBullUser(@PathVariable Long id ){
        User user = userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));
        List<SuivisBull>  bull = suivisBullRepo.findByExpediteur(user);
        return bull;
    }



    @DeleteMapping("/deleteBull/{numBull}")
    public void deleteBull(@PathVariable int numBull ){
        suivisBullRepo.deleteByNumBull(numBull);

    }

    @PutMapping("/updateEtapeBull/{numBull}")
    public SuivisBull updateEtatBull(@PathVariable int numBull){
        SuivisBull bull = suivisBullRepo.findByNumBull(numBull);
        bull.setEtape(2);
        suivisBullRepo.save(bull);
        return bull;

    }



}
