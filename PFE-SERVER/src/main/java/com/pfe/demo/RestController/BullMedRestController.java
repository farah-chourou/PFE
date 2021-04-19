package com.pfe.demo.RestController;

import com.pfe.demo.DAO.*;
import com.pfe.demo.Entities.*;
import com.pfe.demo.Exception.RessourceNotFoundException;
import com.pfe.demo.RestController.Util.ApiResponse;
import com.pfe.demo.RestController.Util.Status;
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

        notif.setMessage("Vous avez un nouveau bulletin a traiter");
        notif.setDate(new Date());
        notif.setExpediteurNotif(exped);
        notif.setRecepteur(recep.getUserName());
        notif.setEtat(false);
        notif.setVu(false);
        notif.setSuivisBullMed(su);

        notificationRepo.save(notif);



        return ResponseEntity.ok(bull);
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

    /*
    @GetMapping("/getAlBullMedEtape2/{userName}")
    public List<SuivisBullMed> getAlBullEtape2(@PathVariable String userName){
        User u = userRepo.findByUserName(userName);

        List<SuivisBullMed>  bull = suivisBullMedRepo.findAllByExpediteurAndEtape( u, 2);
        return bull;
    }*/

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
    public SuivisBullMed addAvis( @PathVariable int numBull , @PathVariable String avis, @RequestBody SuivisBullMed bullMed){
        SuivisBullMed bull = suivisBullMedRepo.findByNumBull(numBull);
        Avis a = avisRepository.findByAvis(avis);
        bull.setAvis(a);
        bull.setCommentaireMed(bullMed.getCommentaireMed());
        bull.setEtape(3);
        bull.setEtat(a.getAvis());
        bull.setDate(new Date());
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
        bull.setDate(new Date());

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

        return bull;
    }


    @PutMapping("/ajouterCommentaire/{numBull}/{comment}")
    public SuivisBullMed addCommentResp( @PathVariable int numBull ,@PathVariable String comment){
        SuivisBullMed bull = suivisBullMedRepo.findByNumBull(numBull);

        bull.setCommentaireResp(comment);
        suivisBullMedRepo.save(bull);
        return bull;
    }
    @PutMapping("/envoyer/{numBull}")
    public SuivisBullMed addCommentResp( @PathVariable int numBull ){
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

        return bull;
    }


 


}
