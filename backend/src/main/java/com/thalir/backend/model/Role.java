// package com.thalir.backend.model;

// import jakarta.persistence.*;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @Table(name = "roles")
// @Data
// @NoArgsConstructor
// public class Role {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Integer id;

//     @Enumerated(EnumType.STRING)
//     @Column(unique = true, length = 20)
//     private ERole name;

//     public Role(ERole name) {
//         this.name = name;
//     }
// }


package com.thalir.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(unique = true, length = 20)
    private ERole name;

    public Role() {}

    public Role(ERole name) {
        this.name = name;
    }

    public Integer getId() { return id; }

    public ERole getName() { return name; }

    public void setName(ERole name) { this.name = name; }
}