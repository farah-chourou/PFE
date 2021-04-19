package com.pfe.demo.RestController;

import com.pfe.demo.DAO.NotificationRepository;
import com.pfe.demo.DAO.SuivisBullMedRepository;
import com.pfe.demo.DAO.SuivisBullRepository;
import com.pfe.demo.DAO.UserRepository;
import com.pfe.demo.Entities.Notification;
import com.pfe.demo.Entities.User;
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

public class UserRestController {

    @Autowired
    UserRepository userRepo;

    @Autowired
    SuivisBullMedRepository suivisBullMedRepo;

    @Autowired
    SuivisBullRepository suivisBullRepo;

    @Autowired
    NotificationRepository notificationRepo;


    @PostMapping("/register/{confirmPass}")
    public ResponseEntity<User> register (@RequestBody User user, @PathVariable String confirmPass){

       if( userRepo.findByUserName(user.getUserName()) !=  null &&  userRepo.findByEmail(user.getEmail()) != null){

           return new ResponseEntity(new ApiResponse(false, "Email and Username is already taken!"),
                   HttpStatus.ALREADY_REPORTED);
       }
          else if( userRepo.findByUserName(user.getUserName()) !=  null ){

            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.ALREADY_REPORTED);
        } else if ( userRepo.findByEmail(user.getEmail()) != null){

            return new ResponseEntity(new ApiResponse(false, "Email is already taken!"),
                    HttpStatus.ALREADY_REPORTED);
        }else if (user.getPassword().equals(confirmPass) == false){

           return new ResponseEntity(new ApiResponse(false, "Password not confirm"),
                   HttpStatus.ALREADY_REPORTED);
       }

        user.setMembreDepuis(new Date());

        user.setCouleur(  user.RandomColor());
        User u = userRepo.save(user);
        return ResponseEntity.ok(u);}




     @PostMapping("/login")
     public ResponseEntity<User> login(@RequestBody User user ) throws  Exception{
        User loginUser =userRepo.findByUserNameAndPassword(user.getUserName(), user.getPassword());
        if (loginUser == null ){

            return new ResponseEntity(new ApiResponse(false, "User not exist !"),
                    HttpStatus.ALREADY_REPORTED);
        }
        return  ResponseEntity.ok(loginUser);
    }


    @GetMapping("/getResponsables")
    public List<User> getAllResponsable(){
        List<User> res= userRepo.findByRole("responsable");
    return res;
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
        return   userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));

   }


    @DeleteMapping("/deleteUser/{id}")
    public  Status getEtatUser(@PathVariable Long id){

        User user = userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));

        List <Notification> n= notificationRepo.findByRecepteur(user.getUserName());
        List <Notification> b = notificationRepo.findByExpediteurNotif(user);

        if ( b.isEmpty() == true && n.isEmpty() == true ){
            userRepo.deleteById(id);
            return Status.OK;
        }else
            return Status.Not_OK;
    }

    @PutMapping("/updateUserAdmin/{id}")
    public User updateUserAdmin(@PathVariable Long id, @RequestBody User newUser){
        User user = userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));
        user.setAdresse(newUser.getAdresse());
        user.setNom(newUser.getUserName());
        user.setPrenom(newUser.getPrenom());
        user.setRole(newUser.getRole());
        user.setTel(newUser.getTel());
        userRepo.save(user);
        return user;
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

}