package com.pfe.demo.DAO;

import com.pfe.demo.Entities.SuivisBull;
import com.pfe.demo.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.management.ListenerNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

public interface SuivisBullRepository extends JpaRepository<SuivisBull,Long> {

  SuivisBull findByNumBull(int numBull);
  List<SuivisBull> findByRecepteurAndEtat(User user, String etat);
  List<SuivisBull> findByEtat( String etat);

  @Transactional
  void deleteByNumBull(int numBull);
}