package com.pfe.demo.RestController;

import com.pfe.demo.DAO.*;
import com.pfe.demo.Entities.*;
import com.pfe.demo.Exception.RessourceNotFoundException;
import com.pfe.demo.RestController.Util.ApiResponse;
import com.pfe.demo.RestController.Util.Status;
import com.pfe.demo.Service.BullMedService;
import com.pfe.demo.Service.MailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
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

    @Autowired
    BullMedService bullMedService;
    @Autowired
    MailService mailService;
    
  @PostMapping("/addBullMed/{numBull}/{specialiteMed}/{userName}")
    public ResponseEntity<SuivisBullMed> addBullMed( @PathVariable int numBull, @PathVariable String specialiteMed , @PathVariable String userName) throws MessagingException {

        if(bullMedService.ajouterBullMed(numBull,specialiteMed,userName)==null) {
            return  new ResponseEntity(new ApiResponse(false, "Bull already exist !"),
                    HttpStatus.ALREADY_REPORTED);
        }else

        return ResponseEntity.ok(bullMedService.ajouterBullMed(numBull,specialiteMed,userName));
    }



    @GetMapping("/getAllBullMedEtape2/{userName}") //sprint2 ki tji l bul  lil med // kenit ismha getAllBullMed
    public List<SuivisBullMed> getAlBull(@PathVariable String userName){
        List<SuivisBullMed>  bull = suivisBullMedRepo.findAllByRecepteurAndEtape( userName, 2);
        return bull;
    }

    @GetMapping("/getBullMedEtape3/{userName}") //sprint 3 fi  dashbord
    public List<SuivisBullMed> getBullMedEtape3(@PathVariable String userName){
        List<SuivisBullMed>  bull = suivisBullMedRepo.findAllByRecepteurAndEtape( userName, 3);
        return bull;
    }

    @GetMapping("/getBullMedEtape4/{userName}") //sprint 3 fi  dashbord
    public List<SuivisBullMed> getBullMedEtape4(@PathVariable String userName){
        List<SuivisBullMed>  bull = suivisBullMedRepo.findAllByRecepteurAndEtape( userName, 4);
        return bull;
    }


    @GetMapping("/getAlBullMedEtape2/{userName}")
    public List<SuivisBullMed> getAlBullEtape2(@PathVariable String userName){
        User u = userRepo.findByUserName(userName);

        List<SuivisBullMed>  bull = suivisBullMedRepo.findAllByExpediteurAndEtape( u, 2);
        return bull;
    }

    @GetMapping("/getAllBullRespMedEtape3/{userName}") // ki tarja3 lil resp
    public List<SuivisBullMed> getAlBullResp(@PathVariable String userName){
        User u = userRepo.findByUserName(userName);
        List<SuivisBullMed>  bull = suivisBullMedRepo.findAllByExpediteurAndEtape( u, 3);
        return bull;
    }

    @GetMapping("/getAllBullRespMedEtape4/{userName}") // ki tarja3 lil valid  //fi dashbord
    public List<SuivisBullMed> getAllBullRespMedEtape4(@PathVariable String userName){
        User u = userRepo.findByUserName(userName);
        List<SuivisBullMed>  bull = suivisBullMedRepo.findAllByExpediteurAndEtape( u, 4);
        return bull;
    }
    @GetMapping("/getBullValiderEtape4")   //fi dashbord
    public List<SuivisBullMed> getBullValiderEtape4(){

        List<SuivisBullMed>  bull = suivisBullMedRepo.findAllByEtape(4);
        return bull;
    }
    @GetMapping("/getAllBullMed/{userName}") // historique med
    public List<SuivisBullMed> getAllBullMed(@PathVariable String userName){
        List<SuivisBullMed>  bull = suivisBullMedRepo.findAllByRecepteur(userName);
        return bull;
    }
    @GetMapping("/getAllBullDashbord/{userName}")
    public List<SuivisBullMed> getAllBullDashbord(@PathVariable String userName){
        User u = userRepo.findByUserName(userName);
        List<SuivisBullMed>  bull = suivisBullMedRepo.findAllByExpediteur(u);
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
    public SuivisBullMed addAvis( @PathVariable int numBull , @PathVariable String avis, @RequestBody SuivisBullMed bullMed) throws MessagingException {

        return bullMedService.ajouterAvis(numBull,avis,bullMed);
    }


    @PutMapping("/ajouterAvis/{numBull}/{avis}/{autreAvis}")
    public SuivisBullMed addOtherAvis( @PathVariable int numBull , @PathVariable String avis, @PathVariable String autreAvis, @RequestBody SuivisBullMed bullMed) throws MessagingException {

        return bullMedService.ajouterAutreAvis(numBull,avis,autreAvis,bullMed);
    }


    @PutMapping("/ajouterCommentaire/{numBull}/{comment}")
    public SuivisBullMed addCommentResp( @PathVariable int numBull ,@PathVariable String comment){
        SuivisBullMed bull = suivisBullMedRepo.findByNumBull(numBull);

        bull.setCommentaireResp(comment);
        suivisBullMedRepo.save(bull);
        return bull;
    }
    @PutMapping("/envoyer/{numBull}")
    public SuivisBullMed addCommentResp( @PathVariable int numBull ) throws MessagingException {
        return bullMedService.envoyer(numBull);
    }


   @GetMapping("/getPerfermantMed")
    public User getPerfermant(){

       return bullMedService.getPerfermantMedecin();
    }


}
