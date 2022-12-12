import { ProjectState } from "../types/project";

export const projectStateLabels: Record<ProjectState, string> = {
  'created':	'Creado',
	'initialized':	'Inicializado',
	'funded':	'Fondeado',
	'finished':	'Finalizado'
};

export const colorsByState: Record<string, string> = {
  initialized: "green",
  funded: "blue",
  finished: "orange",
};