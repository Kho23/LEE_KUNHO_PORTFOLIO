package com.semicolon.backend.domain.admin.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class DashboardCountDTO {
    long memberCnt;
    long reservationCnt;
    long supportCnt;
} //깃 액션 테스트중
