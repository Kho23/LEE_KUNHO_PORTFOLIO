package com.semicolon.backend.domain.program.repository;

import com.semicolon.backend.domain.program.entity.ProgramCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgramCategoryRepository extends JpaRepository<ProgramCategory, Long> {
}
