import { NotificationProps } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { NotificationMessage } from "../components/Notification/NotificationMessage";
import { metamaskErrors } from "./errors";


export enum NotificationType {
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  INVEST_PROJECT_SUCCESS,
  INVEST_PROJECT_ERROR
}

export const buildNotification = (type: NotificationType, props: any = {}): NotificationProps => {

  switch (type) {
    case NotificationType.CREATE_PROJECT_SUCCESS: {
      return {
        id: 'success',
        autoClose: 5000,
        title: "Proyecto creado",
        message: 'El proyecto fue creado exitosamente',
        color: 'green',
        radius: 'md'
      };
    }
    case NotificationType.CREATE_PROJECT_ERROR: {
      return {
        id: 'error',
        autoClose: 5000,
        title: "Error",
        message: 'Ocurrió un error intentando crear el proyecto',
        color: 'red',
        radius: 'md'
      };
    }
    case NotificationType.INVEST_PROJECT_SUCCESS: {
      return {
        id: "success",
        autoClose: 5000,
        title: "Inversion realizada",
        icon: <IconCheck size={18} />,
        message: (
          <NotificationMessage
            investmentValue={props.investmentValue}
            projectName={props.name}
          />
        ),
        color: "teal",
        radius: "md",
      }
    }
    case NotificationType.INVEST_PROJECT_ERROR: {
      return {
        id: "error",
        autoClose: 5000,
        title: "Ocurrió un error",
        icon:<IconX size={18} />,
        message: metamaskErrors[props.error.reason] ?? '',
        color: "red",
        radius: "md",
      }
    }
  }
}