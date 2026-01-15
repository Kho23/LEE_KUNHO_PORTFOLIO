package com.semicolon.backend.domain.program.service;


import com.semicolon.backend.domain.program.dto.ProgramDTO;
import com.semicolon.backend.domain.program.dto.ProgramReqDTO;
import com.semicolon.backend.domain.program.dto.ProgramUploadDTO;
import com.semicolon.backend.domain.program.entity.Program;
import com.semicolon.backend.domain.program.entity.ProgramUpload;
import com.semicolon.backend.domain.program.repository.ProgramCategoryRepository;
import com.semicolon.backend.domain.program.repository.ProgramRepository;
import com.semicolon.backend.global.file.entity.FileMeta;
import com.semicolon.backend.global.file.repository.FileMetaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProgramServiceImpl implements ProgramService {


    private final FileMetaRepository fileMetaRepository;
    private final ProgramCategoryRepository programCategoryRepository;
    private final ProgramRepository programRepository;

    @Override
    public ProgramDTO getOne(long pno) {
        Program program = programRepository.findById(pno)
                .orElse(null);
        if (program == null) {
            return ProgramDTO.builder()
                    .pno(0L)
                    .content("")
                    .programName("")
                    .uploadFiles(Collections.emptyList())
                    .build();
        }
        List<ProgramUploadDTO> forUploadFiles = program.getUploads().stream().map(i ->
                ProgramUploadDTO.builder()
                        .fileNo(i.getFileNo())
                        .filePath(i.getFilePath())
                        .fileName(i.getFileName())
                        .savedName(i.getSavedName())
                        .build()
        ).toList();
        return ProgramDTO.builder()
                .pno(program.getPno())
                .programName(program.getProgramName())
                .content(program.getContent())
                .uploadFiles(forUploadFiles)
                .build();
    }

    @Override
    public void update(ProgramReqDTO programReqDTO) {
        Program program;
        Long originProgramId = programReqDTO.getPno();
        if(originProgramId==null || originProgramId==0L){
            program = Program.builder()
                    .programName(programReqDTO.getProgramName())
                    .content(programReqDTO.getContent())
                    .build();
        }else{
            program=programRepository.findById(originProgramId).orElseThrow(()->
                    new IllegalArgumentException("존재하지 않는 프로그램입니다."));
        }
        program.setContent(programReqDTO.getContent());
        programRepository.save(program);
        if (programReqDTO.getDeletedNo() != null) {
            for (String fnoStr : programReqDTO.getDeletedNo()) {
                Long fno = Long.valueOf(fnoStr);
                FileMeta fileMeta = fileMetaRepository.findById(fno).orElseThrow();
                fileMetaRepository.delete(fileMeta);
            }
        }

        if (!programReqDTO.getFnoList().isEmpty() && programReqDTO.getFnoList().size() > 0) {
            for(Long fno : programReqDTO.getFnoList()){
                fileMetaRepository.findById(fno).ifPresent(fileMeta -> {
                    fileMeta.setDomainType("PROGRAM");
                    fileMeta.setDomainId(program.getPno());
                });
            }
        }
    }

    @Override
    public List<ProgramDTO> getList() {
        return List.of();
    }

//    @Override
//    public List<ProgramDTO> getList() {
//        List<ProgramDTO> list = repository.findAll().stream().map(i->ProgramDTO.builder()
//                .content(i.getContent())
//                .programName(i.getProgramName())
//                .pno(i.getPno())
//                .uploadFiles(i.getUploads().get(1))
//                .build()).toList();
//        return list;
//    }
}