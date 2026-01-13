import { PiNoteDuotone } from "react-icons/pi";

const PartnerRequestComponent = ({
  partnerAgree,
  checkClassHandler,
  checkAgreeHandler,
  checkFileHandler,
  checkAllAgreeHandler,
  cancelHandler,
  requestHandler,
  fileName,
  resumeRef,
  allChecked,
  certRef,
  bankRef,
  statusCheck,
}) => {
  return (
    <>
      {statusCheck[0]?.status == "PENDING" ? (
        <div className="text-center mt-20 text-3xl font-extrabold text-blue-700 p-10 bg-white rounded-2xl max-w-3xl mx-auto shadow-2xl border border-blue-100">
          <PiNoteDuotone className="mx-auto text-6xl text-blue-950 mb-4" />
          <span className="text-3xl font-extrabold text-gray-900 block">
            파트너 신청서 검토 중
          </span>

          <p className="text-lg font-medium text-gray-600 mt-4 leading-relaxed">
            회원님의 파트너 신청서를 신중하게 심사하고 있습니다.
            <br />
            최대한 빠르게 결과를 안내해 드리겠습니다. 감사합니다.
          </p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-6 sm:p-10">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-900 inline-block pb-1">
              파트너 신청
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              파트너 회원이 되면 강사 활동이 가능합니다.
            </p>
          </div>

          <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 space-y-12 border border-gray-100">
            <section>
              <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
                1. 수업 분야 선택
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 mt-4 text-gray-800 text-base">
                <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
                  <input
                    type="checkbox"
                    name={"수영"}
                    onChange={checkClassHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
                  />
                  수영
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
                  <input
                    type="checkbox"
                    name={"헬스"}
                    onChange={checkClassHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
                  />
                  헬스
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
                  <input
                    type="checkbox"
                    name={"골프"}
                    onChange={checkClassHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
                  />
                  골프
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
                  <input
                    type="checkbox"
                    name={"무용"}
                    onChange={checkClassHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
                  />
                  무용
                </label>
                <label className="flex items-center gap-3 cursor-pointer p-1 hover:bg-blue-100 rounded transition">
                  <input
                    type="checkbox"
                    name={"풋살"}
                    onChange={checkClassHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition"
                  />
                  풋살
                </label>
              </div>
            </section>

            <section>
              <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
                2. 증빙 자료 업로드
              </h3>

              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-base text-gray-800 block mb-1">
                    이력서 (필수)
                  </span>
                  <input
                    type="file"
                    name="resumeFiles"
                    ref={resumeRef}
                    onChange={checkFileHandler}
                    accept=".pdf, .doc, .docx"
                    className="mt-2 block w-full text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-900 hover:file:bg-blue-200 transition duration-150 border-gray-300 rounded-lg p-2 bg-white cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    학력 및 경력 사항을 필수로 입력해 주세요. (PDF/DOC/DOCX)
                    <br />
                  </p>
                  {fileName.resumeFiles && (
                    <div className="text-sm text-gray-600 mt-3 space-y-1 p-2 bg-gray-100 rounded border border-gray-200">
                      {fileName.resumeFiles.map((i, idx) => (
                        <div key={idx} className="truncate">
                          <span className="font-semibold text-blue-900 mr-2">
                            {idx + 1}.
                          </span>
                          {i}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-base text-gray-800 block mb-1">
                    자격증
                  </span>
                  <input
                    type="file"
                    name="certFiles"
                    ref={certRef}
                    onChange={checkFileHandler}
                    multiple
                    accept=".jpg, .jpeg, .png"
                    className="mt-2 block w-full text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-900 hover:file:bg-blue-200 transition duration-150 border-gray-300 rounded-lg p-2 bg-white cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    관련 자격증을 첨부해 주세요. (JPG/JPEG/PNG) <br />
                  </p>
                  {fileName.certFiles && (
                    <div className="text-sm text-gray-600 mt-3 space-y-1 p-2 bg-gray-100 rounded border border-gray-200">
                      {fileName.certFiles.map((i, idx) => (
                        <div key={idx} className="truncate">
                          <span className="font-semibold text-blue-900 mr-2">
                            {idx + 1}.
                          </span>
                          {i}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold text-base text-gray-800 block mb-1">
                    계좌 사본(필수)
                  </span>
                  <input
                    type="file"
                    name="bankFiles"
                    ref={bankRef}
                    onChange={checkFileHandler}
                    accept=".jpg, .jpeg, .png"
                    className="mt-2 block w-full text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-900 hover:file:bg-blue-200 transition duration-150 border-gray-300 rounded-lg p-2 bg-white cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    예금주명은 실명과 동일해야 합니다. (JPG/JPEG/PNG) <br />
                  </p>
                  {fileName.bankFiles && (
                    <div className="text-sm text-gray-600 mt-3 space-y-1 p-2 bg-gray-100 rounded border border-gray-200">
                      {fileName.bankFiles.map((i, idx) => (
                        <div key={idx} className="truncate">
                          <span className="font-semibold text-blue-900 mr-2">
                            {idx + 1}.
                          </span>
                          {i}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section>
              <h3 className="font-extrabold text-xl text-gray-900 border-b border-gray-300 pb-3 mb-6">
                3. 동의 사항 (필수)
              </h3>

              <div className="p-4 mb-4 border-2 border-blue-800 rounded-xl bg-blue-50 shadow-inner">
                <label className="flex items-center gap-3 cursor-pointer text-blue-900 text-lg font-bold">
                  <input
                    type="checkbox"
                    name="privacyAgreement"
                    onChange={checkAllAgreeHandler}
                    className="w-5 h-5 text-blue-600 border-blue-500 rounded focus:ring-blue-500 transition"
                  />
                  전체 동의
                  <span className="text-sm font-medium text-blue-800 ml-auto">
                    아래 내용에 모두 동의합니다.
                  </span>
                </label>
              </div>

              <div className="space-y-4 pt-2">
                <label className="flex items-start gap-4 cursor-pointer text-gray-700 text-base border-b border-gray-100 pb-3 hover:bg-gray-50 p-2 rounded transition">
                  <input
                    type="checkbox"
                    name="privacyAgreement"
                    checked={partnerAgree.privacyAgreement}
                    onChange={checkAgreeHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">
                      개인정보 수집 및 이용 동의
                    </span>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      회원 정보, 사업자 정보, 결제 정보 등 수집 목적·보유 기간
                      명시 「개인정보 보호법」 관련 필수 항목
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer text-gray-700 text-base border-b border-gray-100 pb-3 hover:bg-gray-50 p-2 rounded transition">
                  <input
                    type="checkbox"
                    name="thirdAgreement"
                    checked={partnerAgree.thirdAgreement}
                    onChange={checkAgreeHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">제3자 정보 제공 동의</span>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      플랫폼 운영사(예: 본사)나 보험사, 정산 대행사 등에게 정보
                      제공 동의
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer text-gray-700 text-base border-b border-gray-100 pb-3 hover:bg-gray-50 p-2 rounded transition">
                  <input
                    type="checkbox"
                    name="serviceAgreement"
                    checked={partnerAgree.serviceAgreement}
                    onChange={checkAgreeHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">서비스 이용 약관 동의</span>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      파트너 회원의 권리·의무, 이용 제한, 탈퇴 절차 등
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer text-gray-700 text-base border-b border-gray-100 pb-3 hover:bg-gray-50 p-2 rounded transition">
                  <input
                    type="checkbox"
                    name="partnerAgreement"
                    checked={partnerAgree.partnerAgreement}
                    onChange={checkAgreeHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">
                      파트너 활동 규정 및 계약 조건 동의
                    </span>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      서비스 품질 유지 의무, 계약 해지 사유, 고객 응대 기준 등
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer text-gray-700 text-base border-b border-gray-100 pb-3 hover:bg-gray-50 p-2 rounded transition">
                  <input
                    type="checkbox"
                    name="taxAgreement"
                    checked={partnerAgree.taxAgreement}
                    onChange={checkAgreeHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">세금 및 정산 관련 동의</span>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      소득 신고, 수수료 공제, 전자세금계산서 발행 관련 내용
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-4 cursor-pointer text-gray-700 text-base hover:bg-gray-50 p-2 rounded transition">
                  <input
                    type="checkbox"
                    name="insuranceAgreement"
                    checked={partnerAgree.insuranceAgreement}
                    onChange={checkAgreeHandler}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-medium">
                      보험 가입 및 사고 책임 동의
                    </span>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      사고 발생 시 책임 범위, 보험 가입 의무 등 관련 내용
                    </p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={cancelHandler}
              className="px-8 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 transition duration-150"
            >
              취소
            </button>

            <button
              onClick={requestHandler}
              className="
                px-10 py-3 rounded-xl 
                font-extrabold text-lg 
                bg-blue-600 text-white 
                hover:bg-blue-700 
                shadow-lg hover:shadow-xl
                transition duration-150
              "
            >
              신청하기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PartnerRequestComponent;
