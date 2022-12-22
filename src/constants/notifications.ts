import { NotificationProps } from "@mantine/notifications";

const createProjectSuccess: NotificationProps = {
  id: 'success',
  autoClose: 5000,
  title: "Proyecto creado",
  message: 'El proyecto fue creado exitosamente',
  color: 'green',
  radius: 'md'
};

const createProjectError: NotificationProps = {
  id: 'error',
  autoClose: 5000,
  title: "Error",
  message: 'Ocurrió un error intentando crear el proyecto',
  color: 'red',
  radius: 'md'
};

export { createProjectSuccess, createProjectError };