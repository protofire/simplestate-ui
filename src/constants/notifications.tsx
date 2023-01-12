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
  DEPOSIT_REVENUE_ERROR,
  REDEEM_TOKENS_SUCCESS,
  REDEEM_TOKENS_ERROR,
  IMPORT_TOKEN_SUCCESS,
  DEPOSIT_RENT_SUCCESS,
  DEPOSIT_RENT_ERROR
}

export const buildNotification = (type: NotificationType, props: any = {}): NotificationProps => {

  switch (type) {
    case NotificationType.CREATE_PROJECT_SUCCESS: {
      return {
        id: 'success',
        autoClose: 10000,
        title: "Proyecto creado",
        message: 'El proyecto fue creado exitosamente',
        color: 'teal',
        radius: 'md'
      };
    }
    case NotificationType.CREATE_PROJECT_ERROR: {
      return {
        id: 'error',
        autoClose: 10000,
        title: "Error",
        message: metamaskErrors[props.error.reason] ?? 'Ocurrió un error intentando crear el proyecto',
        color: 'red',
        radius: 'md'
      };
    }
    case NotificationType.INVEST_PROJECT_SUCCESS: {
      return {
        id: "success",
        autoClose: 10000,
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
        autoClose: 10000,
        title: "Ocurrió un error",
        icon:<IconX size={18} />,
        message: 'Es posible que la cuenta desde la que intentas invertir no esté en la whitelist o no cuente con suficientes fondos en USDC.',
        color: "red",
        radius: "md",
      }
    }
    case NotificationType.WITHDRAW_FUNDS_SUCCESS: {
      return {
        id: "success",
        autoClose: 10000,
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
        autoClose: 10000,
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
        autoClose: 10000,
        title: "Depósito exitoso",
        icon: <IconCheck size={18} />,
        message: 'Ganancia de venta depositada con éxito',
        color: "teal",
        radius: "md",
      }
    }
    case NotificationType.DEPOSIT_REVENUE_ERROR: {

      if ((props.error.message as string).includes('AccessControl')) {
        props.error.message = 'AccessControl';
      }
      return {
        id: "error",
        autoClose: 10000,
        title: "Ocurrió un error",
        icon:<IconX size={18} />,
        message: metamaskErrors[props.error.message] ?? 'Ha ocurrido un error intentando depositar la ganancia, puede que no tengas fondos suficientes o que no tengas el rol autorizado para esta operación',
        color: "red",
        radius: "md",
      }
    }
    case NotificationType.REDEEM_TOKENS_SUCCESS: {
      return {
        id: "success",
        autoClose: 10000,
        title: "Depósito exitoso",
        icon: <IconCheck size={18} />,
        message: 'Tokens redimidos con éxito',
        color: "teal",
        radius: "md",
      }
    }
    case NotificationType.REDEEM_TOKENS_ERROR: {
      return {
        id: "error",
        autoClose: 10000,
        title: "Ocurrió un error",
        icon:<IconX size={18} />,
        message: metamaskErrors[props.error.message] ?? 'Ha ocurrido un error intentando redimir tus tokens',
        color: "red",
        radius: "md",
      }
    }
    case NotificationType.IMPORT_TOKEN_SUCCESS: {
      return {
        id: "success",
        autoClose: 10000,
        title: "Token agregado",
        icon: <IconCheck size={18} />,
        message: 'Se ha agregado un nuevo token a tu wallet de Metamask.',
        color: "teal",
        radius: "md",
      }
    }
    case NotificationType.DEPOSIT_RENT_SUCCESS: {
      return {
        id: "success",
        autoClose: 10000,
        title: "Depósito exitoso",
        icon: <IconCheck size={18} />,
        message: 'Renta depositada con éxito',
        color: "teal",
        radius: "md",
      }
    }
    case NotificationType.DEPOSIT_RENT_ERROR: {
      return {
        id: "error",
        autoClose: 10000,
        title: "Ocurrió un error",
        icon:<IconX size={18} />,
        message: metamaskErrors[props.error.message] ?? 'Ha ocurrido un error intentando depositar la renta',
        color: "red",
        radius: "md",
      }
    }
  }
}