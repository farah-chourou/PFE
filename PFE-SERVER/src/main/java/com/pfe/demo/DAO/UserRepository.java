package com.pfe.demo.DAO;

import com.pfe.demo.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <User,Long> {

 List<User> findAll();

 Optional<User> findById(Long id);

 User findByUserName(String username);
 User findByEmail(String email);
 User findByUserNameAndPassword(String username, String password);
 User findBySpecialite(String specialite);

 

 List<User> findByRole(String Role);


 List<User> findAllByConnecte(boolean connecte);
 void deleteById(Long id);



}
