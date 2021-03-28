package com.pfe.demo.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuivisBull {


    @Id
    private int numBull;
    private Date date;
    private  String etat;
    private  int etape;
    private String specialiteMed;


    @ManyToOne
    @NotNull
    private User expediteur;


    @ManyToOne
    @NotNull
    private User recepteur;


    @OneToOne(mappedBy = "suivisBull",cascade = CascadeType.ALL,fetch=FetchType.LAZY)
    private Notification notification;



}
