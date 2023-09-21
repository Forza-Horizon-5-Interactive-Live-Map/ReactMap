export class MessageDTO {
  public ip: string = '';
  public playerName: string = '';
  public isPaused: boolean = false;
  public isDisconnecting: boolean = false;
  public posX: number = 0;
  public posXDisplay: string = '';
  public posY: number = 0;
  public posYDisplay: string = '';
  
  // Speed
  public speed: number = 0;
  public speedKmh: number = 0;
  public speedKmhDisplay: string = '';
  public speedMph: number = 0;
  public speedMphDisplay: string = '';

  // Car
  public model: string = '';
  public maker: string = '';
  public year: number = 0;
  public group: string = '';
  public carOrdinal: number = 0;
  public weight: number = 0;
}