import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { PiMapPinLineDuotone } from "react-icons/pi";

const MAP_CENTER = { lat: 37.3498095, lng: 127.1069927 };

const MapWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    if (isOpen && mapRef.current) {
      const timer = setTimeout(() => {
        try {
          mapRef.current.relayout();
          if (window.kakao && window.kakao.maps) {
            mapRef.current.setCenter(
              new window.kakao.maps.LatLng(MAP_CENTER.lat, MAP_CENTER.lng)
            );
          }
        } catch (err) {
          console.error("실패", err);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        position: "fixed",
        right: "30px",
        bottom: "30px",
        zIndex: 9999,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          position: "absolute",
          bottom: "80px",
          right: "0",
          width: "400px",
          height: "550px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow:
            "0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          transition: "all 0.3s ease-in-out",
          animation: "fadeIn 0.3s",
        }}
      >
        <div
          style={{
            padding: "20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "35px",
                height: "35px",
                background: "white",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#764ba2",
                fontSize: "20px",
              }}
            >
              <PiMapPinLineDuotone />
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                시설 위치 안내
              </div>
              <div className="mt-1" style={{ fontSize: "12px", opacity: 0.8 }}>
                주소 : 경기도 성남시 분당구 돌마로 46
              </div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                전화번호 : 02-1234-5678
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "20px",
              opacity: 0.8,
              alignSelf: "flex-start",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
          <Map
            center={MAP_CENTER}
            style={{ width: "100%", height: "100%" }}
            level={5}
            onCreate={(map) => (mapRef.current = map)}
          >
            <MapMarker position={MAP_CENTER} />
          </Map>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: isOpen
            ? "#333"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isOpen ? "✕" : <PiMapPinLineDuotone style={{ fontSize: "32px" }} />}
      </button>
    </div>
  );
};

export default MapWidget;
