import { Component, OnInit, Injector } from '@angular/core';
import { PaoEncodeService } from '../pao-encode.service';
import { range } from 'rxjs';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.less']
})
export class OutputComponent implements OnInit {
  paoEncodeService: PaoEncodeService;
  celebData: string[];
  celebDescription: string;
  celebImage: string;
  firstDigit: number = 0;
  secondDigit: number = 0;
  celebSelected: any;
  generateForm = new FormGroup({
    firstDig: new FormControl(),
    secondDig: new FormControl(),
    systemName: new FormControl(),
    celebData: new FormControl(),
    celebDescription: new FormControl(),
    celebImage: new FormControl()
  });;
  system: string = 'MajorSystem';
  optionRange: number[];

  constructor(
    private injector: Injector,
    private fb: FormBuilder
  ){ 
    this.optionRange = [...Array(10).keys()];
    console.log(this.optionRange);
    this.generateForm = this.fb.group({
      firstDig: 0,
      secondDig:0,
      systemName: 'MajorSystem',
      celebData: [],
      celebDescription: '',
      celebImage: ''
    })
  }

  ngOnInit() {
    this.paoEncodeService = this.injector.get(PaoEncodeService);
  }

  generate() {
    console.log(this.generateForm.controls['firstDig'].value, this.generateForm.controls['secondDig'].value, this.generateForm.controls['systemName'].value);
    const position: number = parseFloat(this.generateForm.controls['firstDig'].value)*10 + parseFloat(this.generateForm.controls['secondDig'].value);
    this.celebData = this.paoEncodeService.generateCelebs(position, this.generateForm.controls['systemName'].value);
  }

  celebSelect() {
    console.log("Selected",this.generateForm.controls['celebData'].value[0]['description']);
    this.generateForm.controls['celebDescription'].setValue(this.generateForm.controls['celebData'].value[0]['description']);
    this.celebImage = this.generateForm.controls['celebData'].value[0]['image'];
    this.celebSelected = this.generateForm.controls['celebData'].value['person'];
  }
}
