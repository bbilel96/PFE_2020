import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer-log',
  templateUrl: './footer-log.component.html',
  styleUrls: ['./footer-log.component.scss'],
})
export class FooterLogComponent implements OnInit {
  data: any = { myToggle: true };
  @Input() msg:string;
  @Input() link:string;

  constructor(private router:Router) { }

  ngOnInit() {}
  nav(){
    this.router.navigate([this.link]);
  }
}
