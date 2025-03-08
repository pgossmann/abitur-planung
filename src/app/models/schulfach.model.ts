export interface Schulfach {
    id: number;
    name: string;
    startedInGrade: number;
    isAvailable: boolean;
    isUnwanted: boolean;
    category: string;
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