package com.pfe.demo.DAO;

import com.pfe.demo.Entities.Avis;
import com.pfe.demo.Entities.Notification;
import com.pfe.demo.Entities.SuivisBullMed;
import com.pfe.demo.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    List<Notification> findByRecepteurAndEtat(String user , Boolean etat);
    List<Notification> findAll();
   List <Notification> findAllByRecepteurAndSuivisBullMed(String recepteur, SuivisBullMed suivisBullMed);

    Optional<Notification>  findById(Long id );

   List <Notification> findByRecepteur(String username);
   List <Notification> findByExpediteurNotif(User user);

   Notification findByRecepteurAndSuivisBullMed(String recepteur, SuivisBullMed suivisBullMed);

}

