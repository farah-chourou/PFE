package com.pfe.demo.DAO;

import com.pfe.demo.Entities.SuivisBull;
import com.pfe.demo.Entities.SuivisBullMed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.transaction.Transactional;

public interface SuivisBullMedRepository extends JpaRepository<SuivisBullMed, Integer> {

    SuivisBullMed findByNumBull(int numBull);




}
