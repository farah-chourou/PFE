package com.pfe.demo.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Avis {

    @Id
    private Long id;
    private String avis;


    @OneToMany(mappedBy = "avis")
    private Set< SuivisBullMed> suivisBulleteinMeds;
}
