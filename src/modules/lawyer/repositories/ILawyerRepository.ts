import { ILawyer } from "../dto/LawyerDTO";

export interface ILawyerRepository {
  create(data: ILawyer): Promise<void>;
  update(data: ILawyer): Promise<void>;
  deleteById(id: string): Promise<void>;
  listById(id: string): Promise<ILawyer>;
}
