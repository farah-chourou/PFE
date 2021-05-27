package com.pfe.demo.Service;

import com.pfe.demo.Entities.SuivisBull;
import com.pfe.demo.Entities.SuivisBullMed;
import com.pfe.demo.Entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

@Service
public class MailService {
    @Autowired
    private JavaMailSender emailSender;

    public  void MedResp(String to, User expediteur, SuivisBullMed bull) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setText(" <div style='font-size:20px;color:#1976d2'>  <img src='cid:myLogo' style='width:55px;height:55px;'> Vous avez une nouvelle notification de la part Dr <strong>"+expediteur.getNom() +" " +expediteur.getPrenom()+"</strong>.</div>  <div style='font-size:15px;'> &nbsp;&nbsp;&nbsp; Bulletin numéro <strong>'"+ bull.getNumBull()+ "'</strong> est en attente de votre validation.</div> <div style='font-size:15px;'>&nbsp;&nbsp;&nbsp;  Bon travail a vous.</div>", true);
        helper.addInline("myLogo", new ClassPathResource("static/image/a.png"));
        helper.setFrom("noreply@baeldung.com");
        helper.setTo(to);
        helper.setSubject("MUTUAL by CODWAY");
        emailSender.send(message);
        // ...
    }

    public  void validResp(String to, User expediteur, SuivisBull bull) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setText(" <div style='font-size:20px;color:#1976d2'>  <img src='cid:myLogo' style='width:55px;height:55px;'> Vous avez une nouvelle notification de la part  <strong>"+expediteur.getNom() +" " +expediteur.getPrenom()+"</strong>.</div>  <div style='font-size:15px;'> &nbsp;&nbsp;&nbsp; Nouveau bulletin ajouté (N° <strong>'"+ bull.getNumBull()+ "'</strong>)</div> <div style='font-size:15px;'>&nbsp;&nbsp;&nbsp;  Bon travail a vous.</div>", true);
        helper.addInline("myLogo", new ClassPathResource("static/image/a.png"));
        helper.setFrom("noreply@baeldung.com");
        helper.setTo(to);
        helper.setSubject("MUTUAL by CODWAY");
        emailSender.send(message);
        // ...
    }
    public  void respMed(String to, User expediteur, SuivisBullMed bull) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setText(" <div style='font-size:20px;color:#1976d2'>  <img src='cid:myLogo' style='width:55px;height:55px;'> Vous avez une nouvelle notification de la part du responsable <strong>"+expediteur.getNom() +" " +expediteur.getPrenom()+"</strong>.</div>  <div style='font-size:15px;'> &nbsp;&nbsp;&nbsp; Nouveau bulletin (N° '<strong>"+ bull.getNumBull()+ "'</strong>) est besoin d'un avis médicale.</div> <div style='font-size:15px;'>&nbsp;&nbsp;&nbsp;  Bon travail a vous.</div>", true);
        helper.addInline("myLogo", new ClassPathResource("static/image/a.png"));
        helper.setFrom("noreply@baeldung.com");
        helper.setTo(to);
        helper.setSubject("MUTUAL by CODWAY");
        emailSender.send(message);
        // ...
    }
    public  void respValid(String to, User expediteur, SuivisBullMed bull) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setText(" <div style='font-size:20px;color:#1976d2'>  <img src='cid:myLogo' style='width:55px;height:55px;'> Vous avez une nouvelle notification de la part du responsable <strong>"+expediteur.getNom() +" " +expediteur.getPrenom()+"</strong>.</div>  <div style='font-size:15px;'> &nbsp;&nbsp;&nbsp; Bulletin numéro <strong>'"+ bull.getNumBull()+ "'</strong> est traité, vous pouvez le consulter et voir son etat.</div> <div style='font-size:15px;'>&nbsp;&nbsp;&nbsp;  Bon travail a vous.</div>", true);
        helper.addInline("myLogo", new ClassPathResource("static/image/a.png"));
        helper.setFrom("noreply@baeldung.com");
        helper.setTo(to);
        helper.setSubject("MUTUAL by CODWAY");
        emailSender.send(message);
        // ...
    }
    public  void userAccount( User user ) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setText(" <div style='font-size:20px;color:1976d2'>Bienvenu notre nouveau utilisateur </div>  <div style='font-size:15px;'>Voila les détails de votre compte a notre platforme 'Mutual By CODWAY'</div> " +
                "<div style='font-size:15px;'> <img src='cid:username' style='width:20px;height:20px;'> <strong> Nom d'utilisateur:</strong> " +user.getUserName()+ "</div> " +
                "<div style='font-size:15px;'> <img src='cid:password' style='width:20px;height:20px;'> <strong> Mot de passe:</strong> " +user.getPassword()+ "</div> " +
                "<div style='font-size:15px;'> <img src='cid:attention' style='width:20px;height:20px;color:red'> Une fois que vous  connectez, vous devez modifier vos informations d'identification.</div>" +
                "<div style='font-size:15px;'> Bon travail.</div>", true);
       helper.addInline("username", new ClassPathResource("static/image/user.png"));
       helper.addInline("password", new ClassPathResource("static/image/padlock.png"));
       helper.addInline("attention", new ClassPathResource("static/image/warning.png"));

        helper.setFrom("noreply@baeldung.com");
        helper.setTo(user.getEmail());
        helper.setSubject("MUTUAL by CODWAY");
        emailSender.send(message);
        // ...
    }

}
