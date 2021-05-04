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
import com.pfe.demo.Service.BullService;
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

    @Autowired
    BullService bullService;

   @PostMapping("/addBull/{id}/{recepteur}")
    public ResponseEntity<SuivisBull> addBull(@RequestBody SuivisBull suivisBulletein, @PathVariable Long id, @PathVariable String recepteur){

      if(bullService.ajouterBulletin(suivisBulletein,id,recepteur)== null){
          return  new ResponseEntity(new ApiResponse(false, "Bull already exist !"),
                  HttpStatus.ALREADY_REPORTED);
      }


        else return ResponseEntity.ok(bullService.ajouterBulletin(suivisBulletein,id,recepteur));
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
        bull.setDate(LocalDate.now());
        suivisBullRepo.save(bull);
        return bull;

    }

    @GetMapping("/getAlBullEtape1Byrecep/{userName}") // dashbord
    public List<SuivisBull> getAlBullEtape1Byrecep(@PathVariable String userName){
        User u = userRepo.findByUserName(userName);

        List<SuivisBull>  bull = suivisBullRepo.findAllByRecepteurAndEtape(u, 1 );
        return bull;
    }
    @GetMapping("/getPerfermantValid") // dashbord
    public User getPerfermant(){

        return bullService.getPerfermantValid();
    }

}
