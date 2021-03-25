package com.pfe.demo.Entities;

import com.fasterxml.jackson.annotation.*;
import com.pfe.demo.DAO.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import javax.persistence.*;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data/*
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")*/
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nom;
    private String prenom;
    private String adresse;
    private String tel;
    private String email;
    private String password;
    private String userName;
    private String role;
    private String specialite;


    @JsonIgnore
    @OneToMany(mappedBy = "expediteur", cascade = CascadeType.ALL,fetch=FetchType.LAZY )
    private Set<SuivisBull> suivisBulleteinset;

    @JsonIgnore
    @OneToMany(mappedBy = "recepteur", cascade = CascadeType.ALL,fetch=FetchType.LAZY )
    private Set<SuivisBull> suivisBulleteinsets;

    @JsonIgnore
    @OneToMany(mappedBy = "expediteurNotif" , cascade = CascadeType.ALL,fetch=FetchType.LAZY )
    private Set<Notification> notifications;


 public void updateProfile (String adresse, String telephone){
    this.adresse = adresse;
    this.tel=telephone;
 }

 public void addS(SuivisBull suivisBull){
     getSuivisBulleteinset().add(suivisBull);
     suivisBull.setExpediteur(this);
 }



}