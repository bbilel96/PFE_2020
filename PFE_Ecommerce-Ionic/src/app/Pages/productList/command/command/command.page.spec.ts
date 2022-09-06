import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommandPage } from './command.page';

describe('CommandPage', () => {
  let component: CommandPage;
  let fixture: ComponentFixture<CommandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
