package com.pfe.demo.Entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String message;
    private Date date;
    private String recepteur;
    private  Boolean vu;
    @Column(columnDefinition = "boolean default false")
    private  Boolean etat;



    @ManyToOne
    private User expediteurNotif;

    @OneToOne
    private SuivisBull suivisBull;

    @ManyToOne
    private SuivisBullMed suivisBullMed;
}
