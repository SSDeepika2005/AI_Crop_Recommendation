// package com.thalir.backend.payload.request;

// import jakarta.validation.constraints.NotBlank;
// import lombok.Data;

// @Data
// public class LoginRequest {
//     @NotBlank
//     private String username;

//     @NotBlank
//     private String password;
// }


package com.thalir.backend.payload.request;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    // ✅ GETTERS

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    // ✅ SETTERS

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}