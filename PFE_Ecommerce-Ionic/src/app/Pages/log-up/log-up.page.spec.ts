import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogUpPage } from './log-up.page';

describe('LogUpPage', () => {
  let component: LogUpPage;
  let fixture: ComponentFixture<LogUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
