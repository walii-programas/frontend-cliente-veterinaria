export interface Vet {
  id: string;
  firstname: string;
  lastname: string;
  dni: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  state: string;
  cmvp: string;
}

export interface VetRoles {
  id: string;
  name: string;
  state: string;
  pivot: {
    role_id: string;
    user_id: string;
  }
}

export interface VetListAll {
  firstname: string;
  lastname: string;
  dni: string;
  cmvp: string;
}