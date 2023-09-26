import BaseApi from './baseAPI';
import { SetPlayerNameDTO } from './Models/SetPlayerNameDTO';

export class PlayerController {
  static UpdatePlayerName = async (dto: SetPlayerNameDTO) => {
    const response = await BaseApi.AppAnonymous.post(`/Players`, dto);
    return response;
  }
}