import React, { useState, useEffect, useMemo } from 'react';
import { fetchDoctors, extractUniqueSpecialties, getSearchSuggestions } from '../services/doctorService';
import Logo from '../components/Logo';
import { Doctor, ConsultationType, SortOption, FilterState } from '../types/doctor';
import AutocompleteSearch from '../components/AutocompleteSearch';
import FilterPanel from '../components/FilterPanel';
import DoctorGrid from '../components/DoctorGrid';
import { updateUrlWithFilterState, getFilterStateFromUrl } from '../utils/urlParams';

const Index = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedConsultationType, setSelectedConsultationType] = useState<ConsultationType | null>(null);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption | null>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const uniqueSpecialties = useMemo(() => {
    return extractUniqueSpecialties(doctors);
  }, [doctors]);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadDoctors();
  }, []);

  useEffect(() => {
    if (doctors.length > 0) {
      const filterState = getFilterStateFromUrl();
      setSearchTerm(filterState.search);
      setSelectedConsultationType(filterState.consultationType);
      setSelectedSpecialties(filterState.specialties);
      setSortOption(filterState.sortBy);
    }
  }, [doctors]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const newSuggestions = getSearchSuggestions(doctors, searchTerm);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, doctors]);

  useEffect(() => {
    let result = [...doctors];

    if (searchTerm.trim()) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(doctor => {
        const nameMatch = doctor.name.toLowerCase().includes(lowerCaseSearchTerm);
        const specialtyMatch = doctor.specialty.some(specialty => specialty.toLowerCase().includes(lowerCaseSearchTerm));
        return nameMatch || specialtyMatch;
      });
    }

    if (selectedConsultationType) {
      result = result.filter(doctor => doctor.consultationType.includes(selectedConsultationType));
    }

    if (selectedSpecialties.length > 0) {
      result = result.filter(doctor => selectedSpecialties.some(selectedSpecialty => doctor.specialty.includes(selectedSpecialty)));
    }

    if (sortOption === SortOption.FEES_ASC) {
      result.sort((a, b) => a.fee - b.fee);
    } else if (sortOption === SortOption.EXPERIENCE_DESC) {
      result.sort((a, b) => b.experience - a.experience);
    }
    setFilteredDoctors(result);

    const filterState: FilterState = {
      search: searchTerm,
      consultationType: selectedConsultationType,
      specialties: selectedSpecialties,
      sortBy: sortOption
    };
    updateUrlWithFilterState(filterState);
  }, [doctors, searchTerm, selectedConsultationType, selectedSpecialties, sortOption]);

  useEffect(() => {
    const handlePopState = () => {
      const filterState = getFilterStateFromUrl();
      setSearchTerm(filterState.search);
      setSelectedConsultationType(filterState.consultationType);
      setSelectedSpecialties(filterState.specialties);
      setSortOption(filterState.sortBy);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev => {
      if (prev.includes(specialty)) {
        return prev.filter(s => s !== specialty);
      } else {
        return [...prev, specialty];
      }
    });
  };

  const handleConsultationTypeChange = (type: ConsultationType | null) => {
    setSelectedConsultationType(type);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option === sortOption ? null : option);
  };

  return <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Logo />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <AutocompleteSearch suggestions={suggestions} onSearch={handleSearch} value={searchTerm} onChange={setSearchTerm} />
        </div>

        {error && <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterPanel uniqueSpecialties={uniqueSpecialties} selectedSpecialties={selectedSpecialties} consultationType={selectedConsultationType} sortOption={sortOption} onSpecialtyChange={handleSpecialtyChange} onConsultationTypeChange={handleConsultationTypeChange} onSortChange={handleSortChange} />
          </div>

          <div className="flex-grow">
            <div className="mb-4">
              <p className="text-gray-600">
                {isLoading ? 'Loading doctors...' : `Showing ${filteredDoctors.length} ${filteredDoctors.length === 1 ? 'doctor' : 'doctors'}`}
              </p>
            </div>
            <DoctorGrid doctors={filteredDoctors} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>;
};

export default Index;
