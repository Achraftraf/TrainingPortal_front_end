// model.ts

export interface Trainer {
    id: number;
    name: string;
    password: string;
    email: string;
    roles: string[];
  }
  
  export interface Training {
    id: number;
    title: string;
    hours: number;
    cost: number;
    objectives: string;
    detailedProgram: string;
    category: string;
    city: string;
    enterprise: Enterprise;
    schedule: TrainingSchedule;
    // ... other properties
  }
  
  export interface TrainingSchedule {
    training: any;
    date: any;
    id: number;
    title: string;
    hours: number;
    cost: number;
    objectives: string;
    detailedProgram: string;
    category: string;
    city: string;
    enterprise: Enterprise;
    schedule: TrainingSchedule;
  }
  
  export interface Enterprise {
    id: number;
    nom: string;
    adresse: string;
    telephone: string;
    url: string;
    email: string;
    // ... other properties
  }
  