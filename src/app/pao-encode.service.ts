import { Injectable, OnInit, Injector, ɵɵi18nAttributes } from '@angular/core';
import { ResourceService } from './resource.service';
import * as celebData from './celebdata';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { range } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaoEncodeService implements OnInit {
  system: string[][];
  celebs: any = celebData;
  ;
  output: string[];

  constructor(
    private ngxXml2jsonService: NgxXml2jsonService, 
    private resourceService: ResourceService,
  ) { }

  ngOnInit(): void {
  }

  generateCelebs(position: number, system: string): any {
    console.log('got here!', position, system);
    const parser = new DOMParser();
    const xml = parser.parseFromString(this.celebs.celebdata, 'text/xml');
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    console.log(obj);
    let people: string[] = [];
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
    console.log(obj.xml.div.length);
    for (let i in [...Array(obj.xml.div.length)]) {
      if (!obj.xml.div[i].hasOwnProperty('div')) {
        continue;
      }
      if (!obj.xml.div[i].hasOwnProperty('a')) {
        if (obj.xml.div[i].hasOwnProperty('span')) {
          people.push(obj.xml.div[i].span[0]);
          
          
        }
      }
      if (typeof obj.xml.div[i].div.a  === "string") {
        people.push(obj.xml.div[i].div.a);
      } else if(typeof obj.xml.div[i].div.a === "undefined") {
        continue;
      } else {
        people.push(obj.xml.div[i].div.a[1]);
        // images.push(obj.xml.div[i].div.a[0].img['@attributes']['src']);
        // descriptions.push(obj.xml.div[i].div.span);
      }
    }
    console.log(people);
    console.log(firstDigit, secondDigit, system);
    for(let j in [...Array(encoding[firstDigit].length).keys()]) {
      for (let k in [...Array(encoding[secondDigit].length).keys()]) {
         firstLetter = encoding[firstDigit][j]; 
         secondLetter = encoding[secondDigit][k];
         pattern = `^(Dr. )?${firstLetter}\\w+\\W(\\w+\\W)?${secondLetter}\\w+( Jr.| Sr.)?$`;
         console.log('pattern:', pattern);
         let batch: string[] = people.filter((v: string, i: number) => { if( RegExp(pattern, "i").test(v) ) return v; });
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
