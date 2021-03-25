package com.pfe.demo.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import java.util.Date;
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
    private String commentaire;


    @ManyToOne
    private User expediteur;

   /* @ManyToOne
    private User recepteur;*/


    @OneToOne(mappedBy = "suivisBullMed")
    private Notification notification;


    @ManyToOne
    private Avis avis;

}
