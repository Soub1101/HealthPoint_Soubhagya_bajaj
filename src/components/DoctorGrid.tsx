
import React from 'react';
import { Doctor } from '../types/doctor';
import DoctorCard from './DoctorCard';

interface DoctorGridProps {
  doctors: Doctor[];
  isLoading: boolean;
}

const DoctorGrid: React.FC<DoctorGridProps> = ({ doctors, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md h-64 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 mx-auto text-gray-400" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13a4 4 0 100-8 4 4 0 000 8z" 
          />
        </svg>
        <h3 className="mt-4 text-xl font-semibold text-gray-700">No doctors found</h3>
        <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorGrid;
