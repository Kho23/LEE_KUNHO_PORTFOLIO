package com.semicolon.backend.domain.program.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "program_category")
public class ProgramCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private boolean isActive; // 화면 표시 여부

    @OneToMany(mappedBy = "category")
    @Builder.Default
    private List<Program> programs = new ArrayList<>();
}
