package com.pfe.demo.DAO;

import com.pfe.demo.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository <User,Long> {

 List<User> findAll();

 Optional<User> findById(Long id);

 User findByUserName(String username);
 User findByEmail(String email);
 User findByUserNameAndPassword(String username, String password);
 User findBySpecialite(String specialite);



 List<User> findByRole(String Role);



 void deleteById(Long id);



}
