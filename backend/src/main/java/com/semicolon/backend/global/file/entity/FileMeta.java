package com.semicolon.backend.global.file.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "file_meta")
public class FileMeta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalName; //원본 파일명
    private String savedName; // UUID 적용된 실제 저장된 파일명
    private String filePath; // 파일 접근 경로
    private String fileType; // 확장자명 or MIME 타입
    private Long fileSize; // 파일 크기(용량제한 체크)
    private String domainType; // 테이블 구분용 notice gallery 등
    private Long domainId; // 테이블 구분 후 id PK
    private LocalDateTime regDate; // 저장 날짜

    @PrePersist
    public void prePersist(){
        this.regDate=LocalDateTime.now();
    }
}
