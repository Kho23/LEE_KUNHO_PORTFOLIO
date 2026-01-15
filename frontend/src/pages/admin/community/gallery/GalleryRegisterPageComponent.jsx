import React, { useState } from 'react'
import { fileRegister, register } from '../../../../api/galleryApi';
import useCustomMove from '../../../../hooks/useCustomMove';

const initState = {
  title: "",
  content: "",
}
const GalleryRegisterPageComponent = () => {
  const [input, setInput] = useState(initState)
  const [images, setImages] = useState(null);
  const{moveToAdminGallery}=useCustomMove()

  const handleFileChange = (e) => {
    setImages(e.target.files)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!images) {
      alert("이미지를 등록해주세요.")
      return;
    }
    try {
      const imageData = await fileRegister(images)
      const imageUrls = imageData.fileData.map(file => ({
        imageUrl: file.imageUrl,
        thumbnailUrl: file.thumbnailUrl
      }))
      const galleryDto = {
        title: input.title,
        content: input.content,
        images: imageUrls
      }
      const galleryData = await register(galleryDto)
      alert("등록이 완료되었습니다.", galleryData)
      moveToAdminGallery()
    } catch (error) {
      console.log("등록 중 오류 발생 오류내용=", error)
      alert("등록에 실패했습니다.")
    } 
  }
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">갤러리 등록</h2>
        </div>
        <div className="p-8">
          <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">제목</label>
              <input
                id="title"
                name="title"
                placeholder="제목을 입력하세요"
                onChange={(e) => handleChange(e)}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg outline-none transition duration-200"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-2">내용</label>
              <textarea
                id="content"
                name="content"
                placeholder="내용을 입력하세요"
                onChange={(e) => handleChange(e)}
                className="w-full p-3 h-80 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg resize-none outline-none transition duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">이미지 첨부</label>
              <input
                type="file"
                onChange={(e) => { handleFileChange(e) }}
                multiple
                className="block w-full text-sm text-slate-500
                          file:mr-4 file:py-3 file:px-6
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100
                          border border-gray-300 rounded-md p-2 bg-gray-50 transition duration-200"
              />
            </div>

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white text-lg font-bold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GalleryRegisterPageComponent