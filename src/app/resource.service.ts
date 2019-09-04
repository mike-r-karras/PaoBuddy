import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  readonly MajorSystem: string[][] = [
    [ 's[^h]', 'z[^h]', 'c[ie]' ],
    [ 't[^h]', 'd' ],
    [ 'n' ],
    [ 'm' ],
    [ 'r' ],
    [ 'l' ],
    [ 'ch', 'sh', 'zh', 'h', 'w', 'j' ],
    [ 'c[^ieh]', 'k', 'q', 'g[^ie]' ],
    [ 'f', 'v', 'ph', 'th' ],
    [ 'p[^h]', 'b' ]
  ];
    readonly DominicSystem: string[][] = [
      [ 'a' ],
      [ 'b' ],
      [ 'c' ],
      [ 'd' ],
      [ 'e' ],
      [ 's' ],
      [ 'g' ],
      [ 'h' ],
      [ 'n' ],
      [ 'o' ]
    ]
  constructor() { }
}
