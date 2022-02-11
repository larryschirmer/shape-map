import React, { useEffect, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turfHelpers from '@turf/helpers'
import turfBBox from '@turf/bbox';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectSolution, toggleFeature } from 'app/slices/appData';

import styles from './WorkSurface.module.scss';

const WorkSurface = () => {
  const dispatch = useAppDispatch();
  const solution = useAppSelector(selectSolution);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [mapLayers, setMapLayers] = useState<string[]>([]);

  const mapRef = useRef<HTMLDivElement>(null);

  const handleToggleFeature = useCallback((featureId: number) => {
    dispatch(toggleFeature(featureId));
  }, [dispatch]);

  // load map
  useEffect(() => {
    if (mapRef.current !== null) {
      const map = new mapboxgl.Map({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN || '',
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
      });

      map.on('load', () => {
        setMapInstance(map)
      })

      return () => {
        map.remove();
        setMapInstance(null)
      };
    }
  }, []);

  // populate map when solution is selected
  useEffect(() => {
    if (mapInstance && solution) {
      const { history, historyIdx, features } = solution
      const activeFeatureIds = history[historyIdx].featureIds
      const activeShapes = activeFeatureIds.map(featureId => features[featureId])

      const bounds: [number, number][] = []

      activeShapes.forEach(({ polygon }, idx) => {
        const id = (type: "source" | "layer") => `${type}-${activeFeatureIds[idx]}-${solution.id}`
        mapInstance.addSource(id("source"), {
          type: 'geojson',
          data: {
            'type': 'Feature',
            properties: {
              name: `${activeFeatureIds[idx]}`,
            },
            geometry: {
              'type': 'Polygon',
              coordinates: polygon
            }
          }
        })
        polygon[0].forEach(position => {
          bounds.push([position[0], position[1]])
        })
        mapInstance.addLayer({
          id: id("layer"),
          type: 'fill',
          source: id("source"),
          paint: {
            'fill-color': 'rgba(4, 67, 179, 0.4)',
            'fill-outline-color': 'rgba(1, 48, 132, 0.4)'
          }
        })
        if (!mapLayers.includes(id("layer"))) {
          mapInstance.on('click', id('layer'), (e) => {
            const featureId = e.features?.[0].properties?.name || '';
            if (typeof Number(featureId) === 'number')
              handleToggleFeature(Number(featureId))
          });
          mapInstance.on('mouseenter', id('layer'), () => {
            mapInstance.getCanvas().style.cursor = 'pointer';
          });
          mapInstance.on('mouseleave', id('layer'), () => {
            mapInstance.getCanvas().style.cursor = '';
          });
          setMapLayers(prev => [...prev, id("layer")])
        }
      })
      const boundingLine = turfHelpers.lineString(bounds)
      const boundingBox = turfBBox(boundingLine)
      mapInstance.fitBounds([{ lat: boundingBox[1], lng: boundingBox[0] }, { lat: boundingBox[3], lng: boundingBox[2] }], { padding: 20 })
      return () => {
        activeShapes.forEach((_, idx) => {
          const id = (type: "source" | "layer") => `${type}-${activeFeatureIds[idx]}-${solution.id}`
          if (mapInstance?.getLayer(id("layer"))) {
            mapInstance.removeLayer(id("layer"));
          }
          if (mapInstance?.getSource(id("source"))) {
            mapInstance.removeSource(id("source"));
          }
        })
      }
    }
  }, [handleToggleFeature, mapInstance, mapLayers, solution]);

  // if shape is selected then change color
  useEffect(() => {
    if (!mapInstance || !solution) return () => { }
    const { selected = [] } = solution ?? {}
    selected.forEach(featureId => {
      const id = `layer-${featureId}-${solution.id}`
      if (selected.includes(featureId)) {
        mapInstance.setPaintProperty(id, 'fill-color', 'rgba(1, 48, 132, 0.7)')
        mapInstance.setPaintProperty(id, 'fill-outline-color', 'rgba(1, 48, 132, 1)')
      } else {
        mapInstance.setPaintProperty(id, 'fill-color', 'rgba(1, 48, 132, 0.4)')
        mapInstance.setPaintProperty(id, 'fill-outline-color', 'rgba(1, 48, 132, 0.4)')
      }
    })
  }, [mapInstance, solution])

  const mapClass = classNames(styles['map'], {
    [styles['selected']]: solution !== null
  })

  return (
    <section className={styles['work-surface']}>
      <div ref={mapRef} className={mapClass} />
    </section>
  );
};

export default WorkSurface;
