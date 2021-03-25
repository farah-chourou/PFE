package com.pfe.demo.DAO;

import com.pfe.demo.Entities.Avis;
import com.pfe.demo.Entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    List<Notification> findByRecepteurAndEtat(String user , Boolean etat);

    Optional<Notification>  findById(Long id );

    List<Notification> findAll();



}

