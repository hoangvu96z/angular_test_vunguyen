import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "https://pokeapi.co/api/v2/";

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(suffixes ? :string){
    let url : string = this.REST_API_SERVER;
    if (suffixes) {
      url+=suffixes;
    }
    return this.httpClient.get(url);
  }
}