
import React from 'react';
import { ConsultationType, SortOption } from '../types/doctor';

interface FilterPanelProps {
  uniqueSpecialties: string[];
  selectedSpecialties: string[];
  consultationType: ConsultationType | null;
  sortOption: SortOption | null;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: ConsultationType | null) => void;
  onSortChange: (sortOption: SortOption) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  uniqueSpecialties,
  selectedSpecialties,
  consultationType,
  sortOption,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Consultation Type */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc" 
          className="text-lg font-semibold mb-3 text-medical-600"
        >
          Consultation Type
        </h3>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="video-consult"
              data-testid="filter-video-consult"
              checked={consultationType === ConsultationType.VIDEO_CONSULT}
              onChange={() => onConsultationTypeChange(ConsultationType.VIDEO_CONSULT)}
              className="w-4 h-4 text-medical-300 focus:ring-medical-300"
            />
            <label htmlFor="video-consult" className="ml-2 text-gray-700">
              Video Consult
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="in-clinic"
              data-testid="filter-in-clinic"
              checked={consultationType === ConsultationType.IN_CLINIC}
              onChange={() => onConsultationTypeChange(ConsultationType.IN_CLINIC)}
              className="w-4 h-4 text-medical-300 focus:ring-medical-300"
            />
            <label htmlFor="in-clinic" className="ml-2 text-gray-700">
              In Clinic
            </label>
          </div>
          {consultationType && (
            <button 
              onClick={() => onConsultationTypeChange(null)}
              className="text-sm text-medical-400 hover:text-medical-500 mt-1"
            >
              Clear selection
            </button>
          )}
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-speciality" 
          className="text-lg font-semibold mb-3 text-medical-600"
        >
          Specialties
        </h3>
        <div className="flex flex-col space-y-2 max-h-60 overflow-y-auto">
          {uniqueSpecialties.map((specialty) => (
            <div key={specialty} className="flex items-center">
              <input
                type="checkbox"
                id={`specialty-${specialty}`}
                data-testid={`filter-specialty-${specialty.replace(/\s+/g, '-')}`}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => onSpecialtyChange(specialty)}
                className="w-4 h-4 text-medical-300 focus:ring-medical-300 rounded"
              />
              <label htmlFor={`specialty-${specialty}`} className="ml-2 text-gray-700">
                {specialty}
              </label>
            </div>
          ))}
        </div>
        {selectedSpecialties.length > 0 && (
          <button 
            onClick={() => selectedSpecialties.forEach(s => onSpecialtyChange(s))}
            className="text-sm text-medical-400 hover:text-medical-500 mt-3"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Sort Options */}
      <div>
        <h3 
          data-testid="filter-header-sort" 
          className="text-lg font-semibold mb-3 text-medical-600"
        >
          Sort By
        </h3>
        <div className="flex flex-col space-y-2">
          <button
            data-testid="sort-fees"
            onClick={() => onSortChange(SortOption.FEES_ASC)}
            className={`px-3 py-2 border rounded-md text-left ${
              sortOption === SortOption.FEES_ASC
                ? 'border-medical-300 bg-medical-100 text-medical-500'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Fees (Low to High)
          </button>
          <button
            data-testid="sort-experience"
            onClick={() => onSortChange(SortOption.EXPERIENCE_DESC)}
            className={`px-3 py-2 border rounded-md text-left ${
              sortOption === SortOption.EXPERIENCE_DESC
                ? 'border-medical-300 bg-medical-100 text-medical-500'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            Experience (High to Low)
          </button>
          {sortOption && (
            <button 
              onClick={() => onSortChange(sortOption === SortOption.FEES_ASC ? SortOption.EXPERIENCE_DESC : SortOption.FEES_ASC)}
              className="text-sm text-medical-400 hover:text-medical-500 mt-1"
            >
              Toggle sort
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
