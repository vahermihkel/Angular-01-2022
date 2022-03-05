export class ParcelMachine {
  constructor(
    public ZIP: string,
    public NAME: string,
    public TYPE: string,
    public A0_NAME: string,
    public A1_NAME: string,
    public A2_NAME: string,
    public A3_NAME: string, 
    public A4_NAME: string,
    public A5_NAME: string,
    public A6_NAME: string,
    public A7_NAME: string,
    public A8_NAME: string,
    public X_COORDINATE: string,
    public Y_COORDINATE: string, 
    public SERVICE_HOURS: string,
    public TEMP_SERVICE_HOURS: string,
    public TEMP_SERVICE_HOURS_UNTIL: string,
    public TEMP_SERVICE_HOURS_2: string,
    public TEMP_SERVICE_HOURS_2_UNTIL: string,
    public comment_est: string,
    public comment_eng: string, 
    public comment_rus: string,
    public comment_lav: string,
    public comment_lit: string,
    public MODIFIED: string
  ) {}
}