package com.pfe.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuivisBullMed {


    @Id
    private int numBull;
    private Date date;
    private  String etat;
    private  int etape;
    private String recepteur;
    private String specialiteMed;
    private String commentaireMed;
    private String commentaireResp;


    @ManyToOne
    private User expediteur;

   /* @ManyToOne
    private User recepteur;*/

    @JsonIgnore
    @OneToMany(mappedBy = "suivisBullMed")
    private Set<Notification> notifications;


    @ManyToOne
    private Avis avis;

}
