import { useEffect, useState } from 'react';
import { catalogService, companyService, locationService } from '../modules/catalog/catalogService';
import type { Area, City, ContactDetails, ServiceOfferingView } from '../modules/catalog/types';

interface CatalogDataState {
  services: ServiceOfferingView[];
  cities: City[];
  areas: Area[];
  contactDetails: ContactDetails | null;
  isLoading: boolean;
}

export function useCatalogData() {
  const [state, setState] = useState<CatalogDataState>({
    services: [],
    cities: [],
    areas: [],
    contactDetails: null,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const [services, cities, areas, contactDetails] = await Promise.all([
        catalogService.getServiceViews(),
        locationService.getCities(),
        locationService.getAreas(),
        companyService.getContactDetails(),
      ]);

      if (!isMounted) return;
      setState({ services, cities, areas, contactDetails, isLoading: false });
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
