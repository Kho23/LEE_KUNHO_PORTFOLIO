import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fileRegister, getOneGallery, updateGallery } from '../../../../api/galleryApi'

const GalleryEditPageComponent = () => {
    const { id } = useParams()
    const [oldGallery, setOldGallery] = useState({title:"",content:""})
    const [images, setImages] = useState(null)
    const [currentImages, setCurrentImages] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getOneGallery(id).then(data => {
            setOldGallery(data)
            if (data.images) {
                setCurrentImages(data.images) //현재 이미지 리스트를 설정
            }
        })
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setOldGallery({ ...oldGallery, [name]: value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let finalImageList = currentImages.map(img => ({
                imageUrl: img.imageUrl,
                thumbnailUrl: img.thumbnailUrl
            })); //수정버튼 눌리면 현재 설정되어있는 모든 이미지들을 객체화시킨다

            if (images && images.length > 0) { //이미지 존재여부 확인 후 
                const uploadRes = await fileRegister(images); //실제 파일 업로드
                const newUploadedImages = uploadRes.fileData.map(file => ({//수정된 dto 이미지 경로 리스트화
                    imageUrl: file.imageUrl,
                    thumbnailUrl: file.thumbnailUrl
                }));
                // 기존 거 뒤에 새 거 이어붙이기
                finalImageList = [...finalImageList, ...newUploadedImages];
            }

            // (3) 최종 DTO 구성
            const dto = {
                title: oldGallery.title,
                content: oldGallery.content,
                images: finalImageList // 합쳐진 이미지 리스트 전송
            }
            // (4) 수정 요청
            await updateGallery(id, dto);
            alert("수정이 완료되었습니다.");
            navigate(`/admin/gallery/${id}`)
        } catch (error) {
            console.log("에러발생",error)
            alert("수정 중 오류가 발생했습니다.")
        }
    }

    const handleFileChange = (e) => {
        setImages(e.target.files)
        console.log(images)
    }

    const handleDeleteImage = (indexToDelete) => {
        setCurrentImages(currentImages.filter((_, index) => index !== indexToDelete))
    }

    // 파일명 추출 함수 (URL에서 마지막 부분 가져오기)
    const getFileName = (url) => {
        if (!url) return "";
        const parts = url.split('/');
        return parts[parts.length - 1];
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-2xl font-bold text-gray-800">갤러리 수정</h2>
                </div>
                <div className="p-8">
                    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">제목</label>
                            <input
                                name="title"
                                placeholder="제목"
                                onChange={(e) => handleChange(e)}
                                value={oldGallery.title || ''}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg outline-none transition duration-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-2">내용</label>
                            <textarea
                                name="content"
                                placeholder="내용"
                                onChange={(e) => handleChange(e)}
                                value={oldGallery.content || ''}
                                className="w-full p-3 h-80 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg resize-none outline-none transition duration-200"
                            />
                        </div>

                        {/* 현재 등록된 이미지 파일명 리스트 및 삭제 버튼 */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">현재 등록된 이미지</label>
                            {currentImages.length > 0 ? (
                                <ul className="border border-gray-300 rounded-md divide-y divide-gray-200 bg-gray-50">
                                    {currentImages.map((img, index) => (
                                        <li key={index} className="flex items-center justify-between p-3">
                                            <span className="text-sm text-gray-700 truncate pr-4">
                                                {getFileName(img.imageUrl)}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(index)}
                                                className="text-red-500 hover:text-red-700 font-medium text-sm focus:outline-none transition duration-200"
                                            >
                                                삭제
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 p-3 border border-gray-300 rounded-md bg-gray-50">
                                    등록된 이미지가 없습니다.
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                이미지 추가 <span className="text-xs font-normal text-gray-500 ml-1">(새 파일을 선택하면 목록에 추가됩니다)</span>
                            </label>
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
                                onClick={()=>handleFileChange}
                            >
                                수정하기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GalleryEditPageComponent