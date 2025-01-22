import React, { useState, useEffect } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface House {
  id: string;
  lat: number;
  lng: number;
  issueType: "noise" | "bug" | "water";
  address: string;
  detailAddress?: string;
  content?: string;
  images?: string[];
  createdAt?: any;
}

declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}

const MapPage = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    issueType: "noise" as "noise" | "bug" | "water",
    address: "",
    detailAddress: "",
    content: "",
    images: [] as File[],
  });

  useEffect(() => {
    const q = query(collection(db, "houses"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const housesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as House[];
      setHouses(housesData);
    });

    return () => unsubscribe();
  }, []);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        const { address } = data;
        setFormData((prev) => ({ ...prev, address }));

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );
            setSelectedPosition({
              lat: coords.getLat(),
              lng: coords.getLng(),
            });
          }
        });
      },
    }).open();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...Array.from(files)],
      }));
    }
  };

  const uploadImages = async (images: File[]) => {
    const urls = [];
    for (const image of images) {
      const storageRef = ref(storage, `houses/${Date.now()}_${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPosition) {
      alert("위치를 선택해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const imageUrls = await uploadImages(formData.images);

      await addDoc(collection(db, "houses"), {
        lat: selectedPosition.lat,
        lng: selectedPosition.lng,
        issueType: formData.issueType,
        address: formData.address,
        detailAddress: formData.detailAddress,
        content: formData.content,
        images: imageUrls,
        createdAt: serverTimestamp(),
      });

      resetForm();
      alert("성공적으로 등록되었습니다!");
    } catch (error) {
      console.error("Error adding house:", error);
      alert("등록 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsWriting(false);
    setSelectedPosition(null);
    setFormData({
      issueType: "noise",
      address: "",
      detailAddress: "",
      content: "",
      images: [],
    });
  };

  const markerColors = {
    noise: "#FF0000",
    bug: "#4B0082",
    water: "#0000FF",
  };

  return (
    <div className="p-4 ">
      <div className="w-full h-[calc(100vh-8rem)] rounded-lg overflow-hidden shadow-lg relative">
        <Map
          center={{ lat: 37.5665, lng: 126.978 }}
          style={{ width: "100%", height: "100%" }}
          level={3}
        >
          {houses.map((house) => (
            <React.Fragment key={house.id}>
              <MapMarker
                position={{ lat: house.lat, lng: house.lng }}
                onClick={() => setSelectedHouse(house)}
              />
              {selectedHouse?.id === house.id && (
                <CustomOverlayMap
                  position={{ lat: house.lat, lng: house.lng }}
                  clickable={true}
                  xAnchor={0.5}
                  yAnchor={1.5}
                >
                  <div className="bg-white p-4 rounded-lg shadow-lg min-w-[300px]">
                    <button
                      onClick={() => setSelectedHouse(null)}
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                    <div className="mt-2">
                      <h3 className="font-medium">{house.address}</h3>
                      {house.detailAddress && (
                        <p className="text-sm text-gray-600">
                          {house.detailAddress}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-blue-600">
                        {house.issueType}
                      </p>
                      <p className="mt-2 text-sm">{house.content}</p>
                      {house.images && house.images.length > 0 && (
                        <div className="mt-2 flex gap-2 overflow-x-auto">
                          {house.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`이미지 ${index + 1}`}
                              className="w-20 h-20 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CustomOverlayMap>
              )}
            </React.Fragment>
          ))}
          {selectedPosition && <MapMarker position={selectedPosition} />}
        </Map>

        <button
          onClick={() => setIsWriting(!isWriting)}
          className="fixed right-6 bottom-24 px-4 py-2 bg-blue-600 text-white 
           rounded-full shadow-lg hover:bg-blue-700 transition-all 
           transform hover:scale-105 z-50 flex items-center gap-2"
        >
          {isWriting ? (
            <>
              <span className="text-xl">✕</span>
              <span>취소</span>
            </>
          ) : (
            <>
              <span className="text-xl">+</span>
              <span>후기 등록하기</span>
            </>
          )}
        </button>

        {isWriting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h2 className="text-lg font-semibold mb-4">새 글 작성</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    이슈 유형
                  </label>
                  <select
                    value={formData.issueType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        issueType: e.target.value as "noise" | "bug" | "water",
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="noise">소음</option>
                    <option value="bug">벌레</option>
                    <option value="water">누수</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    주소
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.address}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      placeholder="주소 검색을 클릭하세요"
                    />
                    <button
                      type="button"
                      onClick={handleAddressSearch}
                      className="mt-1 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      검색
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    상세주소
                  </label>
                  <input
                    type="text"
                    value={formData.detailAddress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        detailAddress: e.target.value,
                      }))
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    내용
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    placeholder="자세한 내용을 입력해주세요"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    이미지
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-full file:border-0
                             file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-700
                             hover:file:bg-blue-100"
                  />
                  {formData.images.length > 0 && (
                    <div className="mt-2 flex gap-2 overflow-x-auto">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`미리보기 ${index + 1}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                images: prev.images.filter(
                                  (_, i) => i !== index
                                ),
                              }))
                            }
                            className="absolute -top-2 -right-2 bg-red-500 text-white 
                                     rounded-full w-5 h-5 flex items-center justify-center 
                                     text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-gray-700 
                             bg-gray-100 rounded-md hover:bg-gray-200
                             disabled:opacity-50"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 text-sm font-medium text-white 
                             bg-blue-600 rounded-md hover:bg-blue-700
                             disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin">⟳</span>
                        저장 중...
                      </>
                    ) : (
                      "등록"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
