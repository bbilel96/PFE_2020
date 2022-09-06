import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExplorationPage } from './exploration.page';

describe('ExplorationPage', () => {
  let component: ExplorationPage;
  let fixture: ComponentFixture<ExplorationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
