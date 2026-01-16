package com.semicolon.backend.global.file.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * 공통 파일 메타데이터 관리 엔티티
 * <p>
 * 시스템 전반에서 업로드되는 파일들의 메타 정보를 통합 관리합니다.
 * 실제 파일은 S3 또는 로컬 스토리지에 저장되며, DB에는 메타데이터만 저장합니다.
 * </p>
 * <ul>
 * <li>domainType과 domainId를 통해 논리적 연관관계를 맺습니다. (Polymorphic Association)</li>
 * </ul>
 */
@Getter
// @Setter -> 실무에서는 Entity에 Setter를 무분별하게 열지 않고, 필요한 필드만 메서드로 변경하거나 Builder를 사용합니다.
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA 기본 생성자는 Protected로 막아두는 것이 관례
@AllArgsConstructor
@Builder
@Entity
@Table(name = "file_meta")
public class FileMeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id") // 컬럼명은 명시적으로 주는 것이 유지보수에 좋습니다.
    private Long id;

    /**
     * 원본 파일명
     * <p>사용자가 업로드했을 때의 파일명입니다. (확장자 포함)</p>
     */
    @Column(nullable = false)
    private String originalName;

    /**
     * 저장된 파일명 (UUID)
     * <p>파일명 중복 방지 및 보안을 위해 UUID로 변환된 이름입니다.</p>
     */
    @Column(nullable = false, unique = true)
    private String savedName;

    /**
     * 파일 저장 경로
     * <p>S3 URL 혹은 로컬 절대/상대 경로가 저장됩니다.</p>
     */
    @Column(nullable = false)
    private String filePath;

    /**
     * 썸네일 이미지 경로
     * <p>이미지 파일인 경우 리사이징된 썸네일 경로를 저장합니다. 이미지가 아니면 null일 수 있습니다.</p>
     */
    private String thumbnailPath;

    /**
     * 파일 확장자 또는 MIME Type
     * 예: jpg, png, application/pdf
     */
    private String fileType;

    /**
     * 파일 크기 (Byte 단위)
     */
    private Long fileSize;

    // --- 연관관계 매핑 필드 ---

    /**
     * 도메인 타입 (구분자)
     * <p>어떤 기능에서 업로드된 파일인지 구분합니다. (예: NOTICE, GALLERY, REVIEW)</p>
     * TODO: 추후 String 대신 Enum 관리로 리팩토링 권장
     */
    @Column(nullable = false)
    private String domainType;

    /**
     * 도메인 ID (논리적 FK)
     * <p>해당 도메인 테이블(게시글 등)의 PK를 저장합니다.</p>
     */
    @Column(nullable = false)
    private Long domainId;

    @Column(updatable = false) // 생성일은 수정되지 않도록 설정
    private LocalDateTime regDate;

    @PrePersist
    public void prePersist() {
        this.regDate = LocalDateTime.now();
    }
}