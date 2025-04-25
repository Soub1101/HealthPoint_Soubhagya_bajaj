
import React from 'react';
import { Doctor } from '../types/doctor';
import { Badge } from "@/components/ui/badge";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div 
      data-testid="doctor-card"
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="p-5">
        <div className="flex items-start">
          <div className="h-16 w-16 rounded-full bg-medical-100 flex items-center justify-center mr-4 flex-shrink-0">
            {doctor.image ? (
              <img 
                src={doctor.image} 
                alt={`Dr. ${doctor.name}`} 
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-8 h-8 text-medical-300"
              >
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div>
            <h2 
              data-testid="doctor-name"
              className="text-lg font-semibold text-medical-600"
            >
              Dr. {doctor.name}
            </h2>
            
            <div data-testid="doctor-specialty" className="mt-1 flex flex-wrap gap-1">
              {doctor.specialty.map((spec, index) => (
                <Badge key={index} variant="secondary" className="bg-medical-100 text-medical-500 border-none">
                  {spec}
                </Badge>
              ))}
            </div>
            
            <div className="mt-3 flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p data-testid="doctor-experience" className="font-medium">
                  {doctor.experience} {doctor.experience === 1 ? 'Year' : 'Years'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Fee</p>
                <p data-testid="doctor-fee" className="font-medium">
                  ₹{doctor.fee}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {doctor.consultationType.map((type, index) => (
              <span 
                key={index} 
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  type === 'Video Consult' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {type === 'Video Consult' ? (
                  <svg 
                    className="w-3 h-3 mr-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                ) : (
                  <svg 
                    className="w-3 h-3 mr-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                )}
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 flex justify-end">
        <button className="px-4 py-2 bg-medical-300 text-white rounded-md hover:bg-medical-400 transition-colors">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
