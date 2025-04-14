'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current || !inputRef.current) return;

    // 1. 지도 생성 (일반지도 고정 + 타입 선택 비활성화)
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 48.8566, lng: 2.3522 }, // 🇫🇷 파리
      zoom: 5,
      mapTypeControl: false,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
    });

    // 2. 검색창 + 자동완성 연결
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
    autocomplete.bindTo('bounds', map);

    // 3. 마커 및 InfoWindow 구성
    const marker = new window.google.maps.Marker({ map });
    const infoWindow = new window.google.maps.InfoWindow();

    autocomplete.addListener('place_changed', () => {
      infoWindow.close();
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) return;

      map.panTo(place.geometry.location);
      map.setZoom(15);

      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      infoWindow.setContent(`📍 ${place.name}`);
      infoWindow.open(map, marker);
    });

    // ✅ POI 클릭 시 InfoWindow는 Google Maps가 기본적으로 처리함
  }, []);

  return (
    <>
      <input
        ref={inputRef}
        placeholder="Search for a place"
        style={{
          position: 'absolute',
          top: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          width: '90%',
          maxWidth: '400px',
          height: '40px',
          padding: '0 12px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'black',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        }}
      />
      <div
        ref={mapRef}
        style={{ width: '100%', height: '100vh' }}
      />
    </>
  );
}