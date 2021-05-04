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
import java.util.Date;
import java.util.Random;
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
    private String couleur;
    private Date membreDepuis;
    private Date lastConnect;
    private Boolean connecte;
    private String sex;

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

public String RandomColor(){
    String[] arr={"#4d004d", "#ff00ff", "#ff3300", "#0033cc", "#ffaa00","#009999","#666699","#ff8080","#3399ff","#b30000"};
    Random r=new Random();
    int randomNumber=r.nextInt(arr.length);

    return (arr[randomNumber]);

}

}