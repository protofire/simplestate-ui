import { ProjectState } from "../types/project";

export enum State {
  Created = 0,
  ReadyForApproove = 1,
  Initialized = 2,
  Funded = 3,
  Redeemable = 4,
  Closed = 5,
  Finalized = 6,
  Paused = 7
}

export const projectStateLabels: Record<State, string> = {
  [State.Created]:	'Creado',
  [State.ReadyForApproove]: 'Listo para aprobación',
	[State.Initialized]:	'Inicializado',
  [State.Funded]:	'Fondeado',
  [State.Redeemable]: 'Redimible',
	[State.Closed]:	'Cerrado',
	[State.Finalized]: 'Finalizado',
	[State.Paused]: 'Pausado',
};



export const colorsByState: Record<string, string> = {
  initialized: "green",
  funded: "blue",
  finished: "orange",
};