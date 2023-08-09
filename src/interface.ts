export interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
      front_female: string;
      front_shiny: string;
      front_shiny_female: string;
    };
    types: {
      type : {
        name: string
      }
    }[]
  }
