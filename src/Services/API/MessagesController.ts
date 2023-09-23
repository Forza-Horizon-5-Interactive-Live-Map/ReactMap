import { MessageDTO } from './Models/MessageDTO';
import BaseApi from './baseAPI';

export class MessagesController {
  static getPlayerTelemetry = async () :Promise<MessageDTO[]> => {
    const response = await BaseApi.AppAnonymous.get(`/Messages`);
    return response.data;
  }
}