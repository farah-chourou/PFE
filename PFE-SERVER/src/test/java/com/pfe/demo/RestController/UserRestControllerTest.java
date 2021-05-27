package com.pfe.demo.RestController;

import com.pfe.demo.DAO.UserRepository;
import com.pfe.demo.Entities.User;
import com.pfe.demo.Service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Description;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/*
@WebMvcTest(UserRestController.class)
class UserRestControllerTest {

    @Autowired
     MockMvc mockMvc;
    @Autowired
     UserService userService;
    @Autowired
    UserRestController userRestController;


    @Test
    @Description("user l9aah wala le")
   public void getUserById() throws Exception {
        User user = new User();
        user.setNom("farah");
        user.setId(2L);

        user.setUserName("fafa");

        user.setRole("responsable");


        when(userService.getUserById(anyLong())).thenReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.get("/getUser/{2}"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.nom").value("farah"))

                .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value("fafa"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.role").value("responsable"))


                .andExpect(status().isOk());

    }


    @Test
    @Description("yraja3 les responsable lkol")
   public void Responsables() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/getResponsables"))
                .andExpect(status().isOk());
    }
}*/