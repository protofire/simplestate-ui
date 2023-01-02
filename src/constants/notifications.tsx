import { NotificationProps } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { NotificationMessage } from "../components/Notification/NotificationMessage";
import { metamaskErrors } from "./errors";


export enum NotificationType {
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  INVEST_PROJECT_SUCCESS,
  INVEST_PROJECT_ERROR,
  WITHDRAW_FUNDS_SUCCESS,
  WITHDRAW_FUNDS_ERROR,
  DEPOSIT_REVENUE_SUCCESS,
  DEPOSIT_REVENUE_ERROR
}

export const buildNotification = (type: NotificationType, props: any = {}): NotificationProps => {

  switch (type) {
    case NotificationType.CREATE_PROJECT_SUCCESS: {
      return {
        id: 'success',
        autoClose: 5000,
        title: "Proyecto creado",
        message: 'El proyecto fue creado exitosamente',
        color: 'teal',
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
    case NotificationType.WITHDRAW_FUNDS_SUCCESS: {
      return {
        id: "success",
        autoClose: 5000,
        title: "Fondos retirados",
        icon: <IconCheck size={18} />,
        message: 'Fondos retirados con éxito',
        color: "teal",
        radius: "md",
      }
    }
    case NotificationType.WITHDRAW_FUNDS_ERROR: {
      return {
        id: "error",
        autoClose: 5000,
        title: "Ocurrió un error",
        icon:<IconX size={18} />,
        message: metamaskErrors[props.error.reason] ?? 'Ha ocurrido un error intentando retirar los fondos',
        color: "red",
        radius: "md",
      }
    }

    case NotificationType.DEPOSIT_REVENUE_SUCCESS: {
      return {
        id: "success",
        autoClose: 5000,
        title: "Depósito exitoso",
        icon: <IconCheck size={18} />,
        message: 'Ganancia de venta depositada con éxito',
        color: "teal",
        radius: "md",
      }
    }
    case NotificationType.DEPOSIT_REVENUE_ERROR: {
      return {
        id: "error",
        autoClose: 5000,
        title: "Ocurrió un error",
        icon:<IconX size={18} />,
        message: metamaskErrors[props.error.reason] ?? 'Ha ocurrido un error intentando depositar la ganancia',
        color: "red",
        radius: "md",
      }
    }
  }
}