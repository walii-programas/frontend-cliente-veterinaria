export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  color: string;
  birthdate: string;
  sex: string;
  photo?: string;
  fk_id_user: string;
}

export interface PetListAll {
  name: string;
  species: string;
  breed: string;
  color: string;
  birthdate: string;
  sex: string;
  photo?: string;
  fk_id_user: string;
}
