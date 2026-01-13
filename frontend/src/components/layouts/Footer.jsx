import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-slate-300 py-8">
      <div className="w-full max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-3 mb-8 text-xs">
          <div>
            <div className="flex items-center text-base font-bold mb-2">
              <MapPin className="w-4 h-4 mr-2" /> 위치 및 안내
            </div>
            <p className="mb-1 pt-2">상호명: 그린체육관</p>
            <p className="mb-1">주소: 서울특별시 강남구 테헤란로 123 (06240)</p>
            <p>운영시간: 평일 06:00 ~ 22:00 (일/공휴일 휴관)</p>
          </div>

          <div>
            <div className="flex items-center text-base font-bold mb-2">
              <Phone className="w-4 h-4 mr-2" /> 연락처
            </div>
            <p className="text-lg font-extrabold mb-1 pt-3">02-1234-5678</p>
            <p className="mt-1">
              <Mail className="w-3 h-3 inline mr-1" /> support@greensports.co.kr
            </p>
          </div>

          <div>
            <div className="flex items-center text-base font-bold mb-2">
              사업자 정보
            </div>
            <p className="mb-1 pt-5">
              대표자: 김그린 | 사업자등록번호: 123-45-67890
            </p>
            <p className=" mt-1">통신판매업 신고: 제2025-서울강남-0001호</p>
          </div>
        </div>

        <div className="text-left text-xs">
          Copyright © 2025 GREEN SPORTS CENTER. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
