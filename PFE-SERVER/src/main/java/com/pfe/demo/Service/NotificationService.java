package com.pfe.demo.Service;

import com.pfe.demo.DAO.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class NotificationService {
@Autowired NotificationRepository notificationRepo;



}
