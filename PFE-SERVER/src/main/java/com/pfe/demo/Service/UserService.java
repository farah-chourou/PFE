package com.pfe.demo.Service;


import com.pfe.demo.DAO.*;
import com.pfe.demo.Entities.Notification;
import com.pfe.demo.Entities.User;
import com.pfe.demo.Exception.RessourceNotFoundException;
import com.pfe.demo.RestController.Util.ApiResponse;
import com.pfe.demo.RestController.Util.Status;
import com.pfe.demo.Security.AES256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;


@Service
@Transactional
public class UserService {
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

   public ResponseEntity<User> Register (User user,  String confirmPass) throws MessagingException {
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
        user.setPassword(AES256.encrypt(user.getPassword()));
        user.setCouleur(  user.RandomColor());
        user.setSex(user.getSex());
        User u = userRepo.save(user);
     

        return ResponseEntity.ok(u);


    }

    public Status delete(Long id){
        User user = userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));

        List<Notification> n= notificationRepo.findByRecepteur(user.getUserName());
        List <Notification> b = notificationRepo.findByExpediteurNotif(user);
        if ( b.isEmpty() == true && n.isEmpty() == true ){
            userRepo.deleteById(id);
            return Status.OK;
        }else
            return Status.Not_OK;
    }


    public  User UpdateUser( Long id,  User newUser)  {
        User user = userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));
        user.setAdresse(newUser.getAdresse());
        user.setNom(newUser.getNom());
        user.setPrenom(newUser.getPrenom());
        user.setRole(newUser.getRole());
        user.setTel(newUser.getTel());
        user.setSpecialite(newUser.getSpecialite());

        userRepo.save(user);
        return user;
    }

    public User getUserById(Long id){
      return  userRepo.findById(id).orElseThrow(()-> new RessourceNotFoundException("mafamech"));
    }

    public List<User> getResponsables(){
            List<User> res= userRepo.findByRole("responsable");
            return res;
    }
    
    public void SetConnected(User user) {
    	if(user.getRole() != "Responsable") {
    		user.setConnecte(true);
    		userRepo.save(user);
    	}
    }
}
