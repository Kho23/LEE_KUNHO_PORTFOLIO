import React, { useEffect, useState } from 'react'
import { getFaqCategory, getFaqList } from '../../api/faqApi'
import FaqListPageComponent from './FaqListPageComponent'

const FaqListPage = () => {
  const [faqs, setFaqs] = useState([])
  const [faqCategories, setFaqCategories] = useState([]) // (1) [수정] null 대신 빈 배열([])이 좋습니다.
  const [selectedCategory, setselectedCategory] = useState(null)

  // (2) [추가] 디자인에 있는 아코디언 UI를 위한 state
  const [openFaqId, setOpenFaqId] = useState(null)

  useEffect(() => {
    const getFaq = async () => {
      try {
        const faqsData = await getFaqList();
        setFaqs(faqsData)
        const categoryData = await getFaqCategory();
        setFaqCategories(categoryData)
      } catch (error) {
        console.error("FAQ 목록을 가져오는 중 오류 발생 오류내용: ", error)
      }
    };
    getFaq()
  }, [])

  const handleCategoryClick = (cat) => {
    // (3) [수정] 님(이건호 님)의 코드는 cat 객체 전체를 ID로 저장하려고 했습니다.
    // cat.faqCategoryId를 저장하도록 수정합니다.
    setselectedCategory(cat.faqCategoryId)
  }

  // (4) [추가] 아코디언 클릭 핸들러
  const handleQuestionClick = (faqId) => {
    // 이미 열려있는 FAQ를 다시 클릭하면 닫고, 아니면 새로 엽니다.
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  }

  const filteredFaq = (selectedCategory == null)
    ? faqs
    : faqs.filter(faq => faq.faqCategoryId == selectedCategory)

  return (
    <div>
      <FaqListPageComponent
      faqs={faqs}
      faqCategories={faqCategories}
      handleCategoryClick={handleCategoryClick}
      handleQuestionClick={handleQuestionClick}
      filteredFaq={filteredFaq}
      selectedCategory={selectedCategory}
      openFaqId={openFaqId}
      setselectedCategory={setselectedCategory}
      />
    </div>
  )
}

export default FaqListPage
