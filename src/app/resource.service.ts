import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  readonly MajorSystem: string[][] = [
    [ 's[^h]', 'z[^h]', 'c[ie]' ],
    [ 't', 'd' ],
    [ 'n' ],
    [ 'm' ],
    [ 'r' ],
    [ 'l' ],
    [ 'ch[^r]', 'sh', 'zh', 'h', 'w', 'j' ],
    [ 'c[^ieh]', 'chr', 'k', 'q', 'g[^ie]' ],
    [ 'f', 'v', 'ph' ],
    [ 'p[^h]', 'b' ]
  ];
    readonly DominicSystem: string[][] = [
      [ 'o' ],
      [ 'a' ],
      [ 'b' ],
      [ 'c' ],
      [ 'd' ],
      [ 'e' ],
      [ 's' ],
      [ 'g' ],
      [ 'h' ],
      [ 'n' ],
    ]
  constructor() { }
}
