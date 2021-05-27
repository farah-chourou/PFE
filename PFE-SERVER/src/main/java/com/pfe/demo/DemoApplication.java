package com.pfe.demo;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.pfe.demo.DAO.UserRepository;
import com.pfe.demo.Entities.User;
import com.pfe.demo.Security.AES256;

@SpringBootApplication
/*@ComponentScan(basePackages={"com.pfe.demo.DAO", "com.pfe.demo.RestController",
        "com.pfe.demo.Service",
        "com.pfe.demo.Entities",
})*/
public class DemoApplication implements CommandLineRunner{

   
    @Autowired
    UserRepository userRepo;
  
    
    
    public void run (String... args) throws Exception { 
        System.out.println("aaa");

        if(userRepo.findByUserName("farah13")==null){
            System.out.println("ffff");
            User admin = new User();
            admin.setUserName("farah13");
            admin.setNom("farah");
            admin.setPrenom("chourou");
            admin.setSex("femme");
            admin.setAdresse("7 rue mohamed Ali jannah");
            admin.setMembreDepuis(new Date());
            admin.setCouleur("#ff3300");
            admin.setEmail("chouroufarah@gmail.com");
            admin.setTel("27893558");
            AES256 aes = new AES256();
            admin.setPassword(aes.encrypt("admin2021"));
            admin.setRole("responsable");
            userRepo.save(admin);
        }
    }
    
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        System.out.println(new Date());

    }
    

}
