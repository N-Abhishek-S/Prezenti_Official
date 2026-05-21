import { useEffect, useState } from 'react';
import { initialAreas, initialCities, type Area, type City } from '../modules/catalog/locationData';

interface CatalogDataState {
  cities: City[];
  areas: Area[];
  isLoading: boolean;
}

export function useCatalogData() {
  const [state, setState] = useState<CatalogDataState>({
    cities: [],
    areas: [],
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const cities = [...initialCities].sort((a, b) => a.displayOrder - b.displayOrder);
      const areas = [...initialAreas].sort((a, b) => a.displayOrder - b.displayOrder);

      if (!isMounted) return;
      setState({ cities, areas, isLoading: false });
    }

    load().catch(() => {
      if (isMounted) {
        setState((current) => ({ ...current, isLoading: false }));
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
