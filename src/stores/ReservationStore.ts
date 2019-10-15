import { PlacePassApi } from "../apis/PlacePassApi";
import { Reservation } from "../models/Reservation";

export class ReservationStore{

  private static instance: ReservationStore;
  private reservations: Array<Reservation>
  private reservationsByUserId: Map<number, Array<Reservation>>

  private constructor(){
    this.reservations = []
    this.reservationsByUserId = new Map()
  }

  static getInstance(){
    if(!ReservationStore.instance){
      ReservationStore.instance = new ReservationStore();
    }
    return ReservationStore.instance
  }

  getReservationsByUser(){
    return this.reservationsByUserId
  }


  async loadReservationsForEnvironment(environment: string){
    const result = await PlacePassApi.getAppsAndReservationsForEnvironment(environment);
    const reservations: Array<any> = result.reservations;

    reservations.forEach(reservation => {
      let r = reservation as Reservation;
      this.reservations.push(r)
      if(this.reservationsByUserId.get(r.user.id) == undefined){
        this.reservationsByUserId.set(r.user.id, [])
      }
      (this.reservationsByUserId.get(r.user.id) as Array<Reservation>).push(r)
    })
  }

}