package com.pfe.demo.DAO;

import com.pfe.demo.Entities.SuivisBull;
import com.pfe.demo.Entities.SuivisBullMed;
import com.pfe.demo.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.transaction.Transactional;
import java.util.List;

public interface SuivisBullMedRepository extends JpaRepository<SuivisBullMed, Integer> {

    SuivisBullMed findByNumBull(int numBull);
    SuivisBullMed findByNumBullAndEtape(int numBull,int etape);


    List<SuivisBullMed> findAllByRecepteurAndEtape(String user, int etape);
    List<SuivisBullMed> findAllByExpediteurAndEtape(User u, int etape);
    List<SuivisBullMed> findAllByRecepteur(String userName);

}
