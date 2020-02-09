import { Component } from '@angular/core';



interface SongInterface {
  title: string;
  file: string;
  image: string;
  playing: boolean;

}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  comptines: Array<SongInterface> = [
    {
      'title': 'Alouette gentille alouette',
      'file': '/sound/alouette gentille alouette.mp3',
      'image': '/img/alouette.JPG',
      'playing': false
    },
    {
      'title': 'Les petits poissons dans leau',
      'file': '/sound/les petits poissons dans leau.mp3',
      'image': '/img/poissons.JPG',
      'playing': false
    },
    {
      'title': 'Ah les crocodiles',
      'file': '/sound/ah les crocodiles.mp3',
      'image': '/img/cocrodiles.JPG',
      'playing': false
    },
    {
      'title': 'Loup y es tu',
      'file': '/sound/loup y es tu.mp3',
      'image': '/img/loup.JPG',
      'playing': false
    },
    {
      'title': 'Dans sa maison un grand cerf',
      'file': '/sound/dans sa maison un grand cerf.mp3',
      'image': '/img/cerf.JPG',
      'playing': false
    },
  ];


  pickedSong: SongInterface = null;
  //pour selectionner la song et ajouter dans la liste
  playList: Array<SongInterface> = [];

  2//Creation variable audio
  audio: HTMLAudioElement = null;


  constructor() { }

  addToPlayList() {
    if (this.pickedSong) {
      this.playList.push(this.pickedSong);
      //une fois selecctione et ajouter dans la liste je vais le deselectionne
      this.pickedSong = null;
    }
  }


  //function pour supprimer le chanson de la playlist une fois terminé
  playSound() {                    //pour eviter que la chanson sonne plusiers fois si on click plusieurs fois
    if (this.playList.length > 0 && !this.playList[0].playing) {
      1//creation variable "audio"
      //creation et lecture de son
      this.audio = new Audio("/assets" + this.playList[0].file);
      this.audio.load();
      this.audio.play();

      //afichage de la note de musique
      this.playList[0].playing = true;


      this.audio.ontimeupdate = () => {
        //si je suis a la fin de son
        if (this.audio.currentTime == this.audio.duration) {

          this.playList[0].playing = false;
          //suppresion de la première position de la playlist
          this.playList.shift();
          //nouvel appel à Playsound pour jouer la chanson suivant
          this.playSound();
        }
      }
    } else {
      this.audio.ontimeupdate = null;
      this.audio = null;
    }
  }

  reorderPlaylist(even) {
    //sauvegarde de l'emement déplace
    let song = this.playList[even.detail.from];
    //suppresiona a position de depart
    this.playList.splice(even.detail.from, 1);
    //insertion a la position d'arrivee
    this.playList.splice(even.detail.to, 0, song)
    //fin de l'operation de reorganisation
    even.detail.complete();

    console.log(this.playList);
  }

}




