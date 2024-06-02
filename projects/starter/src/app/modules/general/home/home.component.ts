import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { forkJoin } from 'rxjs';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pokemonList: any[] = [];
  pokemonDetailList: any[] = [];
  itemList: any[] = [];
  products: string;
  selectedPokemon: any;
  title: string;
  @ViewChild('contentModal') myDiv: ElementRef;
  constructor(
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.getPokemonList();
    this.getItemList();
  }


  getPokemonList() {
    // Get pokemon list
    const requestList: any = {}
    for (let i = 1; i<=10; i++) {
      requestList[`pokemon${i}`] = this.dataService.sendGetRequest("pokemon/"+i);
    }
    forkJoin(
      requestList
    ).subscribe(data => {
        for (let i = 1; i<=10; i++) {
          const pokeImage = data[`pokemon${i}`].sprites.back_default;
          const pokeName = data[`pokemon${i}`].name;
          if (pokeImage && pokeName) {
            this.pokemonDetailList.push(data);
            this.pokemonList.push({
              name: pokeName,
              urlImage: pokeImage
            })
          }
        }
      });
  }

  getItemList() {
    // Get pokemon list
    const requestList: any = {}
    for (let i = 1; i<=10; i++) {
      requestList[`item${i}`] = this.dataService.sendGetRequest("item/"+i);
    }
    forkJoin(
      requestList
    ).subscribe(data => {
        for (let i = 1; i<=10; i++) {
          const itemImage = data[`item${i}`].sprites.default;
          const itemName = data[`item${i}`].name;
          if (itemImage && itemName) {
            this.itemList.push({
              name: itemName,
              urlImage: itemImage
            })
          }
        }
      });
  }

  getDetailPokemon() {
    if (this.selectedPokemon) {
      if (this.selectedPokemon.results) {
        let resultList :string = '';
        this.selectedPokemon.results.forEach(element => {
          const item = `<b>Name:</b> ${element.name} - <b>Url:</b> ${element.url}</br>`;
          resultList+=item;
        });
        this.myDiv.nativeElement.innerHTML = resultList;
      } else {
        const abilities: string[] = this.selectedPokemon.abilities.map(ab => {
          return ab.ability.name;
        })
        const result: string = `<b>Abilities:</b> ${abilities.toString()}</br>
        <b>ID:</b> ${this.selectedPokemon.id}</br>
        <b>Name:</b> ${this.selectedPokemon.name}</br>
        <b>Order:</b> ${this.selectedPokemon.order}</br>
        <b>Weight:</b> ${this.selectedPokemon.weight}</br>
        `
        this.myDiv.nativeElement.innerHTML = result;
      }
    }
  }

  callModal(id : string) {
    if (!id) return;
    if (id == "getList") {
      this.title = "See more list"
      this.dataService.sendGetRequest("pokemon").subscribe(data => {
        this.selectedPokemon = data;
      })
    } else {
      this.title = "Pokemon detail"
      this.dataService.sendGetRequest("pokemon/"+id.toLowerCase()).subscribe(data => {
        this.selectedPokemon = data;
      })
    }
    this.getDetailPokemon();
  }
}
 