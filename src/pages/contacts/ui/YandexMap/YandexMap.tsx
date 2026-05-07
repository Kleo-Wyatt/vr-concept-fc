import { useEffect, useRef } from 'react';

import styles from './YandexMap.module.css';

const YANDEX_MAP_SCRIPT_ID = 'yandex-map-script';
const YANDEX_MAP_SCRIPT_SRC = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

const MAP_CENTER: [number, number] = [55.772168, 37.648465];
const MAP_ZOOM = 16;

type YandexMapInstance = {
  destroy: () => void;
  geoObjects: {
    add: (placemark: YandexPlacemarkInstance) => void;
  };
};

type YandexPlacemarkInstance = {
  balloon: {
    open: () => void;
  };
};

type YandexMapsApi = {
  ready: (callback: () => void) => void;
  Map: new (
    element: HTMLElement,
    options: {
      center: [number, number];
      zoom: number;
      controls: string[];
    },
  ) => YandexMapInstance;
  Placemark: new (
    coordinates: [number, number],
    properties: {
      balloonContentHeader: string;
      balloonContentBody: string;
      balloonContentFooter: string;
      hintContent: string;
    },
    options: {
      preset: string;
      iconColor: string;
      hideIconOnBalloonOpen: boolean;
    },
  ) => YandexPlacemarkInstance;
};

declare global {
  interface Window {
    ymaps?: YandexMapsApi;
  }
}

function loadYandexMapScript() {
  return new Promise<void>((resolve, reject) => {
    if (window.ymaps) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(YANDEX_MAP_SCRIPT_ID);

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(), { once: true });
      return;
    }

    const script = document.createElement('script');

    script.id = YANDEX_MAP_SCRIPT_ID;
    script.src = YANDEX_MAP_SCRIPT_SRC;
    script.async = true;

    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(), { once: true });

    document.head.appendChild(script);
  });
}

export function YandexMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<YandexMapInstance | null>(null);

  useEffect(() => {
    let isMounted = true;

    loadYandexMapScript()
      .then(() => {
        if (!window.ymaps || !mapContainerRef.current || !isMounted) {
          return;
        }

        window.ymaps.ready(() => {
          if (!window.ymaps || !mapContainerRef.current || !isMounted) {
            return;
          }

          if (mapInstanceRef.current) {
            mapInstanceRef.current.destroy();
            mapInstanceRef.current = null;
          }

          const map = new window.ymaps.Map(mapContainerRef.current, {
            center: MAP_CENTER,
            zoom: MAP_ZOOM,
            controls: ['zoomControl', 'fullscreenControl'],
          });

          const placemark = new window.ymaps.Placemark(
            MAP_CENTER,
            {
              balloonContentHeader: 'VR CONCEPT FC',
              balloonContentBody:
                '<strong>Адрес:</strong><br />Москва, ул. Маши Порываевой, д. 34',
              balloonContentFooter: 'Координаты: 55.772168, 37.648465',
              hintContent: 'VR CONCEPT FC — Москва, ул. Маши Порываевой, д. 34',
            },
            {
              preset: 'islands#redDotIcon',
              iconColor: '#00c4be',
              hideIconOnBalloonOpen: false,
            },
          );

          map.geoObjects.add(placemark);
          placemark.balloon.open();

          mapInstanceRef.current = map;
        });
      })
      .catch(() => {
        // Не ломаем страницу, если карта не загрузилась.
      });

    return () => {
      isMounted = false;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.mapRoot}>
      <div
        ref={mapContainerRef}
        className={styles.map}
        aria-label="Яндекс Карта — VR CONCEPT FC"
      />
    </div>
  );
}
