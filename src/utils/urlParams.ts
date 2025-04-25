
import { FilterState, ConsultationType, SortOption } from '../types/doctor';

export function getFilterStateFromUrl(): FilterState {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Parse specialties from comma-separated string
  const specialtiesStr = urlParams.get('specialties') || '';
  const specialties = specialtiesStr ? specialtiesStr.split(',') : [];
  
  // Parse consultation type
  let consultationType = null;
  const consultationTypeStr = urlParams.get('consultationType');
  if (consultationTypeStr === ConsultationType.VIDEO_CONSULT) {
    consultationType = ConsultationType.VIDEO_CONSULT;
  } else if (consultationTypeStr === ConsultationType.IN_CLINIC) {
    consultationType = ConsultationType.IN_CLINIC;
  }
  
  // Parse sort option
  let sortBy = null;
  const sortByStr = urlParams.get('sortBy');
  if (sortByStr === SortOption.FEES_ASC) {
    sortBy = SortOption.FEES_ASC;
  } else if (sortByStr === SortOption.EXPERIENCE_DESC) {
    sortBy = SortOption.EXPERIENCE_DESC;
  }
  
  return {
    search: urlParams.get('search') || '',
    consultationType,
    specialties,
    sortBy,
  };
}

export function updateUrlWithFilterState(filterState: FilterState): void {
  const urlParams = new URLSearchParams();
  
  if (filterState.search) {
    urlParams.set('search', filterState.search);
  }
  
  if (filterState.consultationType) {
    urlParams.set('consultationType', filterState.consultationType);
  }
  
  if (filterState.specialties.length > 0) {
    urlParams.set('specialties', filterState.specialties.join(','));
  }
  
  if (filterState.sortBy) {
    urlParams.set('sortBy', filterState.sortBy);
  }
  
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
}
