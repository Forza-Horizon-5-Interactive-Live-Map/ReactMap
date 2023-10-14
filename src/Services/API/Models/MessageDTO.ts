export class MessageDTO {
  public id: string = '';
  public playerName: string = '';
  public isPaused: boolean = false;
  public isDisconnecting: boolean = false;
  public posX: number = 0;
  public posXDisplay: string = '';
  public posY: number = 0;
  public posYDisplay: string = '';
  public posZ: number = 0;
  public posZDisplay: string = '';
  
  // computed position for map
  public lat: number = 0;
  public lng: number = 0;

  // car data
  public speed: number = 0;
  public speedKmh: number = 0;
  public speedKmhDisplay: string = '';
  public speedMph: number = 0;
  public speedMphDisplay: string = '';
  public power: number = 0;
  public powerKw: number = 0;
  public powerKwDisplay: string = '';
  public powerCh: number = 0;
  public powerChDisplay: string = '';
  public torqueNm: number = 0;
  public torqueNmDisplay: string = '';
  public torqueFtLbs: number = 0;
  public torqueFtLbsDisplay: string = '';
  public gear: number = 0;
  
  //car
  public carClass: string = '';
  public carIndex: number = 0;
  public carIndexDisplay: string = '';
  public carDrivetrain: string = '';
  public cylindersCount: number = 0;


  // car model
  public model: string = '';
  public maker: string = '';
  public year: number = 0;
  public group: string = '';
  public carOrdinal: number = 0;
  public weight: number = 0;
}