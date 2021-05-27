package com.pfe.demo.RestController;

import com.pfe.demo.DAO.NotificationRepository;
import com.pfe.demo.DAO.SuivisBullMedRepository;
import com.pfe.demo.DAO.SuivisBullRepository;
import com.pfe.demo.DAO.UserRepository;
import com.pfe.demo.Entities.Notification;
import com.pfe.demo.Entities.SuivisBullMed;
import com.pfe.demo.Entities.User;
import com.pfe.demo.Exception.RessourceNotFoundException;
import com.pfe.demo.RestController.Util.ApiResponse;
import com.pfe.demo.RestController.Util.Status;
import com.pfe.demo.Security.AES256;
import com.pfe.demo.Service.MailService;
import com.pfe.demo.Service.NotificationService;
import com.pfe.demo.Service.UserService;
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

public class UserRestController {

    @Autowired
    UserRepository userRepo;

    @Autowired
    SuivisBullMedRepository suivisBullMedRepo;

    @Autowired
    SuivisBullRepository suivisBullRepo;

    @Autowired
    NotificationRepository notificationRepo;

    @Autowired
    NotificationService notificationService;

    @Autowired
    UserService userService;

    @Autowired
    MailService mailService;
    
    @PostMapping("/register/{confirmPass}")
    public ResponseEntity<User> register (@RequestBody User user, @PathVariable String confirmPass) throws MessagingException {
    return userService.Register(user,confirmPass);
    }
    
    @PostMapping("/mailSend")
    public User sendMail(@RequestBody User user) {
    	   try { 
    	        mailService.userAccount(user);}
    	        catch(Exception e) {
    	        	
    	        }
    	return user;
    }

     @PostMapping("/login")
     public ResponseEntity<User> login(@RequestBody User user ) throws  Exception{
        User loginUser =userRepo.findByUserNameAndPassword(user.getUserName(), AES256.encrypt(user.getPassword()));
        if (loginUser == null ){

            return new ResponseEntity(new ApiResponse(false, "User not exist !"),
                    HttpStatus.ALREADY_REPORTED);
        }
         notificationService.Rappel(user);
         return  ResponseEntity.ok(loginUser);
    }


    @GetMapping("/getResponsables")
    public List<User> getAllResponsable(){
    return userService.getResponsables();
    }

    @GetMapping("/getValidateurs")
    public List<User> getAllValidateurs(){
        List<User> res= userRepo.findByRole("validateur");
        return res;
    }

    @GetMapping("/getMedecins")
    public List<User> getAllMedecin(){
        List<User> res= userRepo.findByRole("medecin");
        return res;
    }


   @GetMapping("/getUser/{id}")
   public User getUser(@PathVariable Long id ){
        return userService.getUserById(id);

   }


    @DeleteMapping("/deleteUser/{id}")
    public  Status getEtatUser(@PathVariable Long id){
     return userService.delete(id);
    }

    @PutMapping("/updateUserAdmin/{id}")
    public User updateUserAdmin(@PathVariable Long id, @RequestBody User newUser){

        return userService.UpdateUser(id, newUser);
    }


    @PutMapping("/lastConnect/{userName}/{date}") //dashbord
    public User lastConnect(@PathVariable String userName, @PathVariable Date date ){
        User user = userRepo.findByUserName(userName);
        user.setLastConnect(date);
        userRepo.save(user);
        return user;
    }

    @PutMapping("/deconnecte/{userName}") //dashbord
    public User decconnecte(@PathVariable String userName ){
        User user = userRepo.findByUserName(userName);
        user.setConnecte(false);
        userRepo.save(user);
        return user;
    }
      @PutMapping("/connecte/{userName}") //dashbord
        public User connecte(@PathVariable String userName ){
        User user = userRepo.findByUserName(userName);
        user.setConnecte(true);
        userRepo.save(user);
        return user;
    }

    @GetMapping("/getAllUsers") // dashbord tableau user
    public List<User> getAllUsers(){

        return  userRepo.findAll();
    }

    @PutMapping("/updateProfileUser/{userName}")
    public User updateUserProfile(@PathVariable String userName, @RequestBody User newUser){
        User user = userRepo.findByUserName(userName);
        user.setAdresse(newUser.getAdresse());
        user.setNom(newUser.getNom());
        user.setPrenom(newUser.getPrenom());
        user.setTel(newUser.getTel());
        user.setSpecialite((newUser.getSpecialite()));
        userRepo.save(user);
        return user;
    }

    @PutMapping("/updateUserPassword/{userName}")
    public User updateUserPassword(@PathVariable String userName, @RequestBody User newUser){
        User user = userRepo.findByUserName(userName);
        user.setPassword(AES256.encrypt(newUser.getPassword()));
        userRepo.save(user);
        return user;
    }
    @GetMapping("/getAllUsersConected") // dashbord tableau user
    public List<User> getAllUsersConnected(){
        return  userRepo.findAllByConnecte(true);
    }


    @GetMapping("/getUserwithPasswordEncrypt/{id}")
    public String getUserwithPasswordEncrypt(@PathVariable Long id ){
       User u= userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));

        return  AES256.decrypt(u.getPassword());

    }
}