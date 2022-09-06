import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchCommandPage } from './search-command.page';

describe('SearchCommandPage', () => {
  let component: SearchCommandPage;
  let fixture: ComponentFixture<SearchCommandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCommandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCommandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
