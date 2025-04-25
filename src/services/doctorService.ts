
import { Doctor } from "../types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch doctors: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
}

export function extractUniqueSpecialties(doctors: Doctor[]): string[] {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach(doctor => {
    doctor.specialty.forEach(specialty => {
      specialtiesSet.add(specialty);
    });
  });
  
  return Array.from(specialtiesSet).sort();
}

export function getSearchSuggestions(
  doctors: Doctor[], 
  searchTerm: string,
  maxResults: number = 3
): string[] {
  if (!searchTerm) return [];
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  const matchingNames = new Set<string>();
  
  // Check doctor names
  doctors.forEach(doctor => {
    if (doctor.name.toLowerCase().includes(lowerCaseSearchTerm)) {
      matchingNames.add(doctor.name);
    }
    
    // Check specialties
    doctor.specialty.forEach(specialty => {
      if (specialty.toLowerCase().includes(lowerCaseSearchTerm)) {
        matchingNames.add(specialty);
      }
    });
  });
  
  return Array.from(matchingNames).slice(0, maxResults);
}
