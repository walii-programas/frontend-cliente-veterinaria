export interface PetVaccinationCardDetails {
  fk_id_vaccine: string;
  fk_id_pet_vaccination_card: string;
  fk_id_vet: string;
  date: Date;
  state: string;

  // data temporal
  name: string;
  pivot: {
    vaccine_id,
    date,
    dateForPipe,
    state,
    fk_id_vet
    vet: {
        firstname: string,
        lastname: string,
        dni: string,
        cmvp: string
      }
  };
}