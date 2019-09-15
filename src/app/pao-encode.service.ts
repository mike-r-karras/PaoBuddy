import { Injectable, OnInit, Injector, ɵɵi18nAttributes } from '@angular/core';
import { ResourceService } from './resource.service';
import * as celebData from './celebdata';
import { NgxXml2jsonService } from 'ngx-xml2json';

import { DBService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class PaoEncodeService implements OnInit {
  system: string[][];
  celebs: any = celebData;
  output: string[];

  constructor(
    private ngxXml2jsonService: NgxXml2jsonService, 
    private resourceService: ResourceService,
    private DBService: DBService
  ) { }

  ngOnInit(): void {
  }

  generateCelebs(position: number, system: string): any {
    console.log('got here!', position, system);
    const parser = new DOMParser();
    const xml = parser.parseFromString(this.celebs.celebdata, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    console.log(obj);
    let people: any[] = [];
    let images: string[] = [];
    let descriptions: string[] = [];
    const firstDigit: number = (position < 10) ? 0 : Math.floor(position / 10);
    const secondDigit: number = position - (firstDigit * 10);
    const encoding = this.resourceService[system];
    let firstLetter: string;
    let secondLetter: string;
    let output: string[] = [];
    let pattern: string;
    console.log(obj);
    const peoplemine = obj['xml'].div;
    console.log(peoplemine.length);
    for (let i in [...Array(peoplemine.length)]) {
      //if (!peoplemine[i].hasOwnProperty('div')) {
        //continue;
      //}
      if (!peoplemine[i].div.hasOwnProperty('a')) {
        if (peoplemine[i].div.hasOwnProperty('span')) {
          people.push({"person": peoplemine[i].div.span[0]});
          people[people.length - 1]['description'] = peoplemine[i].div.span[1];
          people[people.length - 1]['image'] = peoplemine[i].div.img['@attributes']['src'];
        }
      } else if (typeof peoplemine[i].div.a  === "string") {
        people.push({"person": peoplemine[i].div.a});
        people[people.length - 1]['description'] = peoplemine[i].div.span;
        if (typeof peoplemine[i].div.img !== 'undefined') {
          if (typeof peoplemine[i].div.img['@attributes'] !== 'undefined') {
            if (typeof peoplemine[i].div.img['@attributes']['src'] !== 'undefined') {
               people[people.length - 1]['image'] = peoplemine[i].div.img['@attributes']['src'];
            }
          }
        }
      } else if(typeof peoplemine[i].div.a === "undefined") {
        console.log("*****unmined", peoplemine[i]);
        continue;
      } else {
        people.push({"person": peoplemine[i].div.a[1]});
        people[people.length - 1]['description'] = peoplemine[i].div.span;
        if (typeof peoplemine[i].div.a[0].img !== 'undefined') {
          if (typeof peoplemine[i].div.a[0].img['@attributes']['src'] !== 'undefined') {
            people[people.length - 1]['image'] = peoplemine[i].div.a[0].img['@attributes']['src'];
          }
        }
        // images.push(obj.xml.div[i].div.a[0].img['@attributes']['src']);
        // descriptions.push(obj.xml.div[i].div.span);
      }
      let celeb = new DBService.Models.Celebs({
        name: people[people.length - 1]['person'],
        description: people[people.length - 1]['description'],
        image: people[people.length - 1]['image']
      });
      celeb.save((err) => {
        if (err) {
          console.log('Err:', err);
        }
      });
    }

    console.log("People!", people);
    console.log(firstDigit, secondDigit, system);
    for(let j in [...Array(encoding[firstDigit].length).keys()]) {
      for (let k in [...Array(encoding[secondDigit].length).keys()]) {
         firstLetter = encoding[firstDigit][j]; 
         secondLetter = encoding[secondDigit][k];
         pattern = `^(Dr. )?([aeiouy])?${firstLetter}\\w+\\W(\\w+\\W+)?([aeiouy])?${secondLetter}\\w+( Jr.| Sr.)?$`;
         console.log('pattern:', pattern);
         let batch: string[] = people.filter((v: string, i: number) => { if( RegExp(pattern, "i").test(v['person']) ) return v; });
         console.log(batch);
         if (batch.length > 0) {
          output = output.concat(batch);
        }
         console.log(firstLetter, secondLetter);
      }
    }
    console.log(output);
    this.output = output;
    return this.output;
  }
}
