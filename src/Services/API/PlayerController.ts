import BaseApi from './baseAPI';
import { SetPlayerNameDTO } from './Models/SetPlayerNameDTO';

export class PlayerController {
  static getPlayerTelemetry = async (dto: SetPlayerNameDTO) => {
    const response = await BaseApi.AppAnonymous.put(`/Players`, dto);
    return response;
  }
}