import { NotificationManager } from "react-notifications";


export const  MyAlert =({type,message})=>{
    switch (type) {
        case 'info':
          NotificationManager.info(message.text,message.title, 3000);
          break;
        case 'success':
          NotificationManager.success(message.text, message.title, 3000);
          break;
        case 'warning':
          NotificationManager.warning(message.text, message.title, 3000);
          break;
        case 'error':
          NotificationManager.error(message.text, message.title, 3000, () => {
            alert('callback');
          });
          break;
          default:
              NotificationManager.error('Error message', 'Click me!', 5000, () => {
                  alert('callback');
                });
                break;
            }
}