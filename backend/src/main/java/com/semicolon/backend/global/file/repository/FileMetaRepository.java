package com.semicolon.backend.global.file.repository;

import com.semicolon.backend.global.file.entity.FileMeta;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileMetaRepository extends JpaRepository<FileMeta, Long> {
}
