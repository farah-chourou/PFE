package com.pfe.demo.DAO;

import com.pfe.demo.Entities.Avis;
import com.pfe.demo.Entities.SuivisBullMed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvisRepository extends JpaRepository<Avis,Long> {
}
