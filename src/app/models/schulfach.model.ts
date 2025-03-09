export interface Schulfach {
    id: number;
    name: string;
    startedInGrade: number;
    isAvailable: boolean;
    isSelected: boolean;
    category: string;
    hoursEF: number;
    isMandatory?: boolean;
  }
  
  export enum SchulfachCategory {
    SPRACHEN = 'Sprachen',
    GESELLSCHAFTSWISSENSCHAFTEN = 'Gesellschaftswissenschaften',
    MATHEMATIK = 'Mathematik',
    NATURWISSENSCHAFTEN = 'Naturwissenschaften',
    RELIGION_ETHIK = 'Religion/Ethik',
    SPORT = 'Sport',
    KUNST_MUSIK = 'Kunst/Musik'
  }