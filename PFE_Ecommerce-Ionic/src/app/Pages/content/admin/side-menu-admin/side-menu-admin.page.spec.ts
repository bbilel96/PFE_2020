import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SideMenuAdminPage } from './side-menu-admin.page';

describe('SideMenuAdminPage', () => {
  let component: SideMenuAdminPage;
  let fixture: ComponentFixture<SideMenuAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
