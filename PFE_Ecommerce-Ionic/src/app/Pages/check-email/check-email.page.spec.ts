import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckEmailPage } from './check-email.page';

describe('CheckEmailPage', () => {
  let component: CheckEmailPage;
  let fixture: ComponentFixture<CheckEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
