import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-log',
  templateUrl: './header-log.component.html',
  styleUrls: ['./header-log.component.scss'],
})
export class HeaderLogComponent implements OnInit {
  data: any = { myToggle: true };
  @Input() title:string;
  @Input() subTitle:string;
  @Input() link:string;
  constructor() { }

  ngOnInit() {}

}
