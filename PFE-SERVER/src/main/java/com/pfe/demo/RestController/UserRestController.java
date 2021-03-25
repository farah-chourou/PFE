package com.pfe.demo.RestController;

import com.pfe.demo.DAO.NotificationRepository;
import com.pfe.demo.DAO.SuivisBullMedRepository;
import com.pfe.demo.DAO.SuivisBullRepository;
import com.pfe.demo.DAO.UserRepository;
import com.pfe.demo.Entities.User;
import com.pfe.demo.Exception.RessourceNotFoundException;
import com.pfe.demo.RestController.Util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id ){
     /*   userRepo.deleteById(id);
        User user = userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));
        suivisBullRepo.deleteByExpediteurId(id);
        notificationRepo.deleteByExpediteurNotifId(id);*/


    }
}